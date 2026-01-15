# 🔧 FIX: Compteur "En ligne" affichant 0

## 📋 Résumé du problème

Le compteur d'utilisateurs "En ligne" affichait toujours **0**, même avec des utilisateurs actifs sur le site.

## 🐛 Bugs identifiés et corrigés

### 1. ❌ Pas de désactivation du cache
**Problème:** Next.js et Vercel peuvent cacher les réponses des routes API.

**Solution:**
- ✅ Ajout de `export const dynamic = 'force-dynamic'` dans chaque route
- ✅ Headers `Cache-Control: no-store, must-revalidate` sur toutes les réponses

**Fichiers modifiés:**
- [app/api/ping/route.js](app/api/ping/route.js)
- [app/api/active/route.js](app/api/active/route.js)
- [app/api/stats/route.js](app/api/stats/route.js)

### 2. ❌ SessionId non persistante
**Problème:** Chaque ping créait une nouvelle session basée sur `hash(userAgent + timestamp/heure)`, donc la même personne créait une nouvelle session toutes les heures.

**Solution:**
- ✅ Création d'un composant `PingClient` qui génère une `sessionId` unique
- ✅ Stockage de la `sessionId` dans `localStorage` (persiste entre reloads)
- ✅ Envoi de cette `sessionId` à chaque ping

**Fichier créé:**
- [components/PingClient.js](components/PingClient.js)

### 3. ❌ Pas de ping global
**Problème:** Le ping était uniquement dans `StatsWidget`, donc pas de ping si le widget n'était pas ouvert.

**Solution:**
- ✅ Intégration de `PingClient` dans le `layout.js` racine
- ✅ Ping automatique au chargement + toutes les 30 secondes
- ✅ Fonctionne sur TOUTES les pages du site

**Fichier modifié:**
- [app/layout.js](app/layout.js)

### 4. ❌ Polling trop lent
**Problème:** Le widget rafraîchissait le compteur toutes les 30 secondes, pas assez réactif.

**Solution:**
- ✅ Polling réduit à 15 secondes pour meilleure réactivité
- ✅ Ajout de `cache: 'no-store'` dans les fetch
- ✅ Logs de debug uniquement en développement

**Fichier modifié:**
- [components/StatsWidget.js](components/StatsWidget.js)

### 5. ❌ Gestion d'erreurs insuffisante
**Problème:** Messages d'erreur génériques, difficile de diagnostiquer.

**Solution:**
- ✅ Messages d'erreur explicites: `env_missing`, `sessionId required`
- ✅ Logs serveur avec préfixes `[/api/ping]`, `[/api/active]`
- ✅ Logs client avec préfixes `[PingClient]`, `[StatsWidget]`
- ✅ Logs uniquement en développement (NODE_ENV check)

## 📦 Fichiers modifiés/créés

### Créés
```
components/PingClient.js          ← Nouveau composant pour le ping automatique
TEST_ACTIVE_USERS.md              ← Guide de test
DEPLOIEMENT_STATS_PRODUCTION.md   ← Guide de déploiement
FIX_COMPTEUR_EN_LIGNE.md          ← Ce fichier
```

### Modifiés
```
app/api/ping/route.js             ← Cache-Control + sessionId + logs
app/api/active/route.js           ← Cache-Control + logs
app/api/stats/route.js            ← Cache-Control
app/layout.js                     ← Intégration PingClient
components/StatsWidget.js         ← Polling optimisé + logs
```

## 🔄 Flux de fonctionnement (après fix)

```
1. Utilisateur charge une page
   ↓
2. PingClient s'initialise (layout.js)
   ↓
3. Génère/récupère sessionId depuis localStorage
   ↓
4. POST /api/ping avec { sessionId: "xxxxx" }
   ↓
5. Redis: SET active:xxxxx = timestamp (TTL 10min)
   ↓
6. Toutes les 30s: répète le ping
   ↓
7. StatsWidget: GET /api/active toutes les 15s
   ↓
8. /api/active:
   - Récupère toutes les clés active:*
   - Filtre celles < 5 minutes
   - Compte = nombre d'utilisateurs actifs
   ↓
9. Affichage: "En ligne: N"
```

## ⚙️ Configuration technique

### Timings
| Action | Intervalle | Raison |
|--------|-----------|---------|
| Ping client | 30 secondes | Maintenir la session active |
| TTL Redis | 10 minutes | Éviter accumulation de clés |
| Window "actif" | 5 minutes | Considéré actif si ping < 5min |
| Polling widget | 15 secondes | Réactivité UI |

### Stockage

**Client (localStorage):**
```
jetc_session_id = "1234567890-abc123"
```

**Redis:**
```
active:1234567890-abc123 = 1705331234567 (TTL 600s)
active:9876543210-xyz789 = 1705331230123 (TTL 600s)
visits:2026-01-15 = 42
```

## 🧪 Tests à effectuer

### En développement (local)
```bash
npm run dev
```

1. Ouvrir la console navigateur (F12)
2. Vérifier les logs:
   ```
   [PingClient] Nouvelle session créée: xxxxx
   [PingClient] Ping envoyé: { ok: true, sessionId: "xxxxx" }
   [StatsWidget] Visiteurs actifs: 1
   ```

3. Ouvrir 2 onglets → compteur passe à 2
4. Fermer 1 onglet → après 5min, compteur retombe à 1

### En production (Vercel)

1. **Vérifier variables d'environnement:**
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
   - (ou `KV_REST_API_URL` + `KV_REST_API_TOKEN` si Vercel KV)

2. **Tester les endpoints:**
   ```bash
   curl https://votre-domaine.com/api/active
   # → {"active":0} ou {"active":N}
   ```

3. **Vérifier les logs Vercel:**
   - Dashboard > Functions > `/api/ping`
   - Chercher des erreurs

4. **Test visuel:**
   - Ouvrir le site
   - Cliquer sur l'icône 📊
   - "En ligne" devrait être > 0

## 📊 Logs & Monitoring

### Logs de debug (développement uniquement)

**Client:**
```
[PingClient] Nouvelle session créée: 1705331234-abc123
[PingClient] Ping envoyé: { ok: true, sessionId: "..." }
[StatsWidget] Visiteurs actifs: 2
```

**Serveur:**
```
[/api/ping] Redis non configuré: UPSTASH_REDIS_REST_URL ou UPSTASH_REDIS_REST_TOKEN manquants
[/api/ping] Erreur: ...
```

### Pas de logs en production
Les `console.debug()` sont désactivés automatiquement (`NODE_ENV=production`).
Seuls les `console.error()` sont loggés sur Vercel.

## 🚀 Déploiement

Voir le guide complet: [DEPLOIEMENT_STATS_PRODUCTION.md](DEPLOIEMENT_STATS_PRODUCTION.md)

**Checklist rapide:**
1. ✅ Commit + push des changements
2. ✅ Configurer les variables Redis sur Vercel
3. ✅ Déployer: `vercel --prod`
4. ✅ Tester les endpoints
5. ✅ Vérifier les logs Vercel
6. ✅ Validation visuelle

## 🎯 Résultat attendu

Après le fix:
- ✅ Le compteur "En ligne" affiche le nombre réel d'utilisateurs
- ✅ Incrémentation instantanée quand un utilisateur arrive
- ✅ Décrémentation après 5 minutes d'inactivité
- ✅ Même session persistante entre reloads de page
- ✅ Fonctionne sur mobile et desktop
- ✅ Pas de cache qui bloque les updates

## 📚 Références

- [TEST_ACTIVE_USERS.md](TEST_ACTIVE_USERS.md) - Guide de test complet
- [DEPLOIEMENT_STATS_PRODUCTION.md](DEPLOIEMENT_STATS_PRODUCTION.md) - Guide de déploiement
- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Upstash Redis Docs](https://upstash.com/docs/redis)
- [Vercel KV Docs](https://vercel.com/docs/storage/vercel-kv)

## ✅ Validation

Le fix est considéré réussi si:
- [ ] Le compteur affiche > 0 quand vous êtes sur le site
- [ ] Ouvrir 2 navigateurs → compteur = 2
- [ ] Aucune erreur dans la console (dev) ou les logs Vercel (prod)
- [ ] Les sessions persistent après reload de page
- [ ] Le compteur retombe après 5 min d'inactivité

---

**Date du fix:** 15 janvier 2026  
**Version:** 1.0.0  
**Statut:** ✅ Implémenté, en attente de test production
