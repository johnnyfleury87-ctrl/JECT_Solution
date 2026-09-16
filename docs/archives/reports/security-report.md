# Security Report

## Contexte
Ce document couvre les corrections de securite appliquees apres audit, sans suppression des fonctionnalites metier existantes.

## Score global estime
- Avant: 58/100
- Apres (Phase 1-3): 86/100
- Apres (Phase 4-9): 92/100

## Vulnerabilites corrigees

### V1 - Route diagnostic contact exposee (Critique)
- Avant: la route GET de contact exposait des informations de configuration SMTP.
- Apres: suppression complete de la route GET sur l'API contact.
- Fichiers:
  - app/api/contact/route.js

### V2 - Fuite d'informations par erreurs API (Eleve)
- Avant: champs details et erreurs techniques renvoyes au client.
- Apres: erreurs homogenes et generiques cote client (`Une erreur est survenue.`), details limites aux logs serveur.
- Fichiers:
  - app/api/contact/route.js
  - app/api/ping/route.js
  - app/api/active/route.js
  - app/api/stats/route.js
  - utils/security/responses.js

### V3 - Absence de rate limiting (Eleve)
- Avant: routes publiques sans limitation d'abus.
- Apres (Phase 1-3): fenetre glissante en memoire par IP + blocage temporaire.
- Apres (Phase 4-9):
  - backoff progressif (duree de blocage croissante par strike)
  - detection comportementale simple (burst 5 requetes/5 secondes)
  - support dual-key IP + sessionId (quand disponible)
  - journalisation des abus via monitor
- Couverture:
  - /api/contact (6 req/min, blocage 10 min)
  - /api/ping (10 req/min, blocage 5 min)
  - /api/active (10 req/min, blocage 5 min)
  - /api/stats (10 req/min, blocage 5 min)
- Fichiers:
  - utils/security/rateLimit.js
  - app/api/contact/route.js
  - app/api/ping/route.js
  - app/api/active/route.js
  - app/api/stats/route.js

### V4 - Dependances vulnerables (Eleve)
- Avant: vulnerabilites npm audit sur next, nodemailer et transitive deps.
- Apres: dependances mises a jour et audit propre (`found 0 vulnerabilities`).
- Actions:
  - npm audit fix
  - mise a jour `next@15.5.15`
  - mise a jour `eslint-config-next@15.5.15`
  - mise a jour `nodemailer@8.0.5`
- Fichiers:
  - package.json
  - package-lock.json

### V5 - Absence de headers de securite explicites (Moyen)
- Avant: pas de configuration defensive explicite.
- Apres (Phase 1-3): headers globaux ajoutes via Next.js.
- Apres (Phase 4-9): CSP durcie (liste blanche explicite, suppression des wildcards `https:` non necessaires, ajout `frame-src` pour Turnstile).
- Headers deployes:
  - Content-Security-Policy
  - Strict-Transport-Security
  - X-Frame-Options
  - X-Content-Type-Options
  - Referrer-Policy
  - Permissions-Policy
- Fichier:
  - next.config.js

### V6 - Endpoints analytics sensibles non proteges (Moyen)
- Avant: acces public direct aux routes stats/active.
- Apres (Phase 1-3): protection par token en production (`STATS_API_TOKEN`) et conservation de l'acces dev.
- Apres (Phase 4-9):
  - comparaison timing-safe (`timingSafeEqual` sur hash SHA-256)
  - longueur minimale token enforcee (>= 32)
  - fail-secure si token absent/mal configure
  - events `forbidden_access` traces dans monitor
- Fichiers:
  - utils/security/guard.js
  - app/api/active/route.js
  - app/api/stats/route.js

### V7 - Identifiant session genere via Math.random (Moyen)
- Avant: identifiant base sur `Math.random` et persistance indefinie.
- Apres:
  - generation via `crypto.randomUUID()`
  - rotation automatique a 24h
  - structure stockee avec timestamp
- Fichier:
  - components/PingClient.js

### V9 - Logs trop verbeux / potentiellement sensibles (Moyen)
- Avant: logs techniques detailles dans les routes API.
- Apres:
  - logger centralise avec niveaux (`info`, `warn`, `error`, `debug`)
  - filtrage simple des cles sensibles
  - suppression des logs inutiles cote client
- Fichiers:
  - utils/security/logger.js
  - app/api/contact/route.js
  - app/api/ping/route.js
  - app/api/active/route.js
  - app/api/stats/route.js
  - components/ContactForm.js

### V10 - Conformite RGPD insuffisamment exposee (Moyen)
- Avant: absence de page de politique publique dediee.
- Apres: page de confidentialite creee et lien ajoute dans le footer.
- Fichiers:
  - app/confidentialite/page.js
  - components/Footer.js

### V11 - Anti-bot applicatif avance absent (Eleve)
- Avant: protection honeypot seule contre le spam automatise.
- Apres: Cloudflare Turnstile integre et valide cote serveur (obligatoire en production).
- Mecanisme:
  - widget frontend injecte dans le formulaire
  - token verifie cote backend via API Cloudflare
  - rejet de la requete si verification invalide ou indisponible
- Fichiers:
  - utils/security/turnstile.js
  - components/ContactForm.js
  - app/api/contact/route.js

### V12 - Monitoring securite insuffisant (Moyen)
- Avant: logs securite presents mais pas de compteurs consolides.
- Apres:
  - monitor centralise (compteurs + rolling log)
  - events de securite traces (`rate_limit_hit`, `burst_detected`, `forbidden_access`, `turnstile_rejected`, `api_error`)
  - point d'extension pour outillage externe (Sentry / Logtail)
- Fichiers:
  - utils/security/monitor.js
  - utils/security/logger.js
  - utils/security/rateLimit.js
  - utils/security/guard.js

## Validation
- Lint: OK (warnings non bloquants existants sur `img` dans ProjectModal)
- Build production: OK
- API contact: conserve le flux d'envoi sans fuite d'informations internes
- Tests securite: OK (18/18)

## Limites connues
- Rate limit en memoire: efficace sur une instance, non partage entre instances serverless.
- Turnstile exige une configuration env complete (`NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`) pour etre actif en production.

## Recommandations post-livraison
1. Migrer le rate limit vers Redis (Upstash) pour couverture multi-instances.
2. Activer rotation periodique de `STATS_API_TOKEN` (mensuelle/trimestrielle).
3. Brancher `monitor.setSink()` vers Sentry/Logtail en production.
4. Automatiser un controle securite CI (`npm audit --audit-level=high` + `npm run test:security`).
