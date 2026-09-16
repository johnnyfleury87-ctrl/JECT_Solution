# Sécurité Avancée – Architecture des mécanismes (Phase 4–9)

> Complément du fichier `security-architecture.md` — mécanismes avancés mis en place après la Phase 1–3.

---

## 1. Protection Anti-bot – Cloudflare Turnstile (Phase 4)

### Principe
Cloudflare Turnstile est une alternative moderne et respectueuse de la vie privée au reCAPTCHA. Il analyse silencieusement le comportement du navigateur et délivre un **jeton signé** que seul Cloudflare peut vérifier.

### Flux de validation

```
Navigateur                  Serveur Next.js           Cloudflare API
    │                             │                         │
    │── formulaire rempli ──────▶ │                         │
    │   (+ turnstileToken)        │── POST /siteverify ────▶ │
    │                             │◀── { success: true } ───│
    │◀── 200 OK (email envoyé) ── │                         │
```

### Fichiers impliqués
| Fichier | Rôle |
|---|---|
| `utils/security/turnstile.js` | Validation server-side via `https://challenges.cloudflare.com/turnstile/v0/siteverify` |
| `components/ContactForm.js` | Widget frontend + envoi du token |
| `app/api/contact/route.js` | Extraction + appel `validateTurnstileToken()` |

### Variables d'environnement requises
| Variable | Description |
|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Clé publique (dashboard Cloudflare → Turnstile) |
| `TURNSTILE_SECRET_KEY` | Clé secrète (jamais exposée côté client) |

### Comportement si non configuré
- En **développement** : si `TURNSTILE_SECRET_KEY` est absent, la validation est **ignorée** (aucun blocage en local).
- En **production** : si la clé est absente, toutes les soumissions sont **refusées** (fail-secure).

---

## 2. Rate Limiting Avancé – Backoff progressif + Détection burst (Phase 5)

### Fonctionnalités ajoutées

#### 2.1 Backoff progressif
Chaque blocage consécutif double la durée de blocage :

| Strike | Multiplicateur | Durée (base 10 min) |
|---|---|---|
| 1ᵉʳ | ×1 | 10 min |
| 2ᵉ | ×2 | 20 min |
| 3ᵉ | ×4 | 40 min |
| 4ᵉ | ×8 | 80 min |
| 5ᵉ+ | ×16 | 160 min |

#### 2.2 Détection burst
Si **5 requêtes** arrivent en moins de **5 secondes**, un blocage progressif est déclenché immédiatement, sans attendre d'atteindre la limite de la fenêtre glissante.

#### 2.3 Dual-key (IP + Session)
Le paramètre optionnel `sessionId` permet d'appliquer une deuxième limite par session (80 % de la limite IP), bloquant les abus qui opèrent depuis plusieurs sessions sur la même IP.

### Fichier : `utils/security/rateLimit.js`

---

## 3. Durcissement CSP (Phase 6)

### Avant → Après

| Directive | Avant | Après |
|---|---|---|
| `img-src` | `'self' data: https:` | `'self' data:` (wildcards supprimés) |
| `script-src` | `'self' 'unsafe-inline'` | `+ challenges.cloudflare.com + va.vercel-scripts.com` |
| `style-src` | `'self' 'unsafe-inline' https:` | `'self' 'unsafe-inline'` |
| `font-src` | `'self' data: https:` | `'self' data:` (Next.js auto-héberge les polices) |
| `connect-src` | `'self' https:` | `'self' + Turnstile + Vercel Analytics + Upstash` |
| `frame-src` | *(absent)* | `https://challenges.cloudflare.com` |

### Domaines autorisés

```
CLOUDFLARE_TURNSTILE  = https://challenges.cloudflare.com
VERCEL_ANALYTICS      = https://va.vercel-scripts.com + https://vitals.vercel-insights.com
UPSTASH               = https://*.upstash.io
```

---

## 4. Monitoring & Détection (Phase 7)

### Fichier : `utils/security/monitor.js`

Le monitor centralise les événements de sécurité en mémoire (rolling log de 200 entrées) et expose :

| Méthode | Rôle |
|---|---|
| `monitor.increment(type, meta)` | Incrémente un compteur + écrit dans le log |
| `monitor.getMetrics()` | Snapshot de tous les compteurs |
| `monitor.getRecentEvents(n)` | N événements les plus récents |
| `monitor.setSink(fn)` | Branch externe (Sentry, Logtail, …) |
| `monitor.reset()` | Remise à zéro (utile en tests) |

### Événements trackés automatiquement

| Type | Déclencheur |
|---|---|
| `rate_limit_hit` | Limite IP ou session dépassée |
| `burst_detected` | Burst de 5+ hits en 5 secondes |
| `forbidden_access` | Token interne invalide ou absent |
| `turnstile_rejected` | Validation Turnstile échouée |
| `api_error` | `logger.error()` appelé dans une route |

### Intégration Sentry / Logtail (optionnelle)
```javascript
// Dans app/layout.js ou un middleware :
import { monitor } from '@/utils/security/monitor';

monitor.setSink((event) => {
  // Sentry :
  Sentry.addBreadcrumb({ category: 'security', message: event.type, data: event });
  // Logtail :
  logger.info('[security-event]', event);
});
```

---

## 5. STATS_API_TOKEN – Durcissement (Phase 8)

### Améliorations dans `utils/security/guard.js`

1. **Longueur minimale** : les tokens < 32 caractères sont rejetés immédiatement, même s'ils correspondent. Prévient les tokens faibles par erreur de configuration.

2. **Comparaison timing-safe** via `node:crypto.timingSafeEqual` :
   - Les deux valeurs sont hashées SHA-256 avant comparaison.
   - Empêche les attaques de timing side-channel (mesure du temps de comparaison pour deviner octet par octet).

3. **Monitoring** : chaque accès refusé incrémente `forbidden_access` dans le monitor avec la raison (`token_not_configured` ou `invalid_token`).

### Rotation du token
Pour effectuer une rotation :
1. Générer un nouveau token : `openssl rand -hex 32`
2. Mettre à jour `STATS_API_TOKEN` dans Vercel Dashboard
3. Redéployer (le redéploiement est instantané sur Vercel)

---

## 6. Tests de sécurité (Phase 9)

### Exécution
```bash
npm run test:security
# ou individuellement :
node --import ./security/tests/register.mjs --test security/tests/rateLimit.test.mjs
node --import ./security/tests/register.mjs --test security/tests/guard.test.mjs
node --import ./security/tests/register.mjs --test security/tests/monitor.test.mjs
```

### Couverture

| Fichier de test | Cas couverts |
|---|---|
| `rateLimit.test.mjs` | Extraction IP, limite normale, blocage, backoff progressif |
| `guard.test.mjs` | Token absent, trop court, invalide, valide, header alternatif |
| `monitor.test.mjs` | Compteurs, log, sanitisation, sink externe, cap 200 entrées |

### Infrastructure
- `security/tests/loader.mjs` : resolve hook ESM pour l'alias `@/`
- `security/tests/register.mjs` : bootstrap du loader
- Aucune dépendance externe (Node.js `node:test` natif)
