# 🔧 TEST: Système de comptage des utilisateurs actifs

## ✅ Corrections appliquées

### 1. **Cache désactivé sur toutes les routes API**
- ✅ Ajout de `export const dynamic = 'force-dynamic'` sur `/api/ping`, `/api/active`, `/api/stats`
- ✅ Headers `Cache-Control: no-store, must-revalidate` sur toutes les réponses

### 2. **SessionId persistante côté client**
- ✅ Nouveau composant `PingClient.js` qui:
  - Génère un `sessionId` unique et le stocke dans `localStorage`
  - Envoie un ping automatique au chargement + toutes les 30s
  - Logs en développement uniquement (console.debug)

### 3. **Backend corrigé**
- ✅ `/api/ping` accepte maintenant la `sessionId` du client
- ✅ Stockage: `active:{sessionId}` = timestamp avec TTL 10 minutes
- ✅ `/api/active` compte les sessions actives < 5 minutes
- ✅ Messages d'erreur clairs (env_missing, sessionId required)

### 4. **Intégration globale**
- ✅ `PingClient` ajouté dans `layout.js` → ping sur TOUTES les pages
- ✅ `StatsWidget` polling réduit à 15s pour meilleure réactivité
- ✅ Suppression du ping dans StatsWidget (doublon)

## 🧪 Comment tester

### En local (développement)

1. **Démarrer le serveur:**
   ```bash
   npm run dev
   ```

2. **Ouvrir la console du navigateur (F12)** et vérifier les logs:
   ```
   [PingClient] Nouvelle session créée: 1234567890-abc123
   [PingClient] Ping envoyé: { ok: true, sessionId: "1234567890-abc123" }
   [StatsWidget] Visiteurs actifs: 1
   ```

3. **Tester manuellement les endpoints:**
   ```bash
   # Test ping (sans sessionId - devrait échouer)
   curl -X POST http://localhost:3000/api/ping \
     -H "Content-Type: application/json"
   
   # Test ping (avec sessionId - devrait réussir)
   curl -X POST http://localhost:3000/api/ping \
     -H "Content-Type: application/json" \
     -d '{"sessionId": "test-session-123"}'
   
   # Test active (devrait retourner le nombre d'actifs)
   curl http://localhost:3000/api/active
   ```

4. **Vérifier dans l'interface:**
   - Ouvrir le site
   - Cliquer sur l'icône 📊 (BarChart) dans la navbar
   - Le compteur "En ligne" devrait afficher **1**
   - Ouvrir dans un autre onglet/navigateur → devrait afficher **2**

### En production (Vercel)

1. **Vérifier les variables d'environnement:**
   - Aller sur [Vercel Dashboard](https://vercel.com/dashboard)
   - Projet → Settings → Environment Variables
   - Vérifier que `UPSTASH_REDIS_REST_URL` et `UPSTASH_REDIS_REST_TOKEN` sont définis
   - **Important:** Vérifier pour Production ET Preview

2. **Tester les endpoints en prod:**
   ```bash
   # Remplacer YOUR_DOMAIN par votre domaine
   curl https://YOUR_DOMAIN/api/active
   
   # Devrait retourner: {"active":0} ou {"active":N}
   ```

3. **Voir les logs Vercel:**
   - Dashboard → Votre projet → Deployments
   - Cliquer sur le deployment actif
   - Onglet "Functions" → Sélectionner une fonction (ping, active, etc.)
   - Cliquer sur "View logs"

4. **Test réel:**
   - Ouvrir le site en production
   - Ouvrir la console (F12)
   - Vérifier les pings (en prod, pas de console.debug car NODE_ENV=production)
   - Ouvrir le panneau Stats → "En ligne" devrait être > 0

## 🐛 Diagnostic des erreurs

### Problème: "En ligne" reste à 0

**1. Vérifier les variables d'env:**
```bash
# Dans un terminal Vercel Functions log, chercher:
[/api/ping] Redis non configuré: UPSTASH_REDIS_REST_URL ou UPSTASH_REDIS_REST_TOKEN manquants
```
→ Ajouter les variables manquantes dans Vercel Settings

**2. Vérifier les pings:**
- Console navigateur: chercher `[PingClient]`
- Si aucun log: problème côté client
- Si erreur 503: problème Redis/env
- Si erreur 400: sessionId non envoyée

**3. Vérifier Redis:**
```bash
# Dans le dashboard Upstash Redis
# Chercher des clés: active:*
# Vérifier leur TTL
```

### Problème: sessionId ne persiste pas

- Vérifier que localStorage est disponible (pas en navigation privée)
- Vérifier dans DevTools → Application → Local Storage
- Clé: `jetc_session_id`

### Problème: Cache toujours actif

- Vérifier que les headers `Cache-Control` sont bien envoyés
- Dans Network tab: vérifier Response Headers
- Si cache Vercel: forcer un redéploiement

## 📊 Flux de données

```
1. Utilisateur ouvre une page
   ↓
2. PingClient (layout.js) s'initialise
   ↓
3. Génère/récupère sessionId (localStorage)
   ↓
4. POST /api/ping { sessionId }
   ↓
5. Redis: SET active:{sessionId} = timestamp (TTL 10min)
   ↓
6. Toutes les 30s: répète le ping
   ↓
7. StatsWidget: GET /api/active toutes les 15s
   ↓
8. Redis: KEYS active:* → compte ceux < 5min
   ↓
9. Affichage: "En ligne: N"
```

## 🎯 Checklist de validation

- [ ] Variables env configurées sur Vercel (Production + Preview)
- [ ] Deployment réussi sans erreur
- [ ] Console navigateur affiche les pings (en dev)
- [ ] /api/active retourne un nombre ≥ 0
- [ ] Ouvrir 2 onglets → compteur passe à 2
- [ ] Après 5 min d'inactivité → compteur retombe
- [ ] Logs Vercel ne montrent pas d'erreur 500

## 📝 Notes importantes

- **TTL Redis:** 10 minutes (600s)
- **Window "actif":** 5 minutes (300s)
- **Ping interval:** 30 secondes
- **Polling interval:** 15 secondes
- **SessionId:** Stockée dans localStorage (persiste entre reloads)
- **Logs:** Uniquement en développement (NODE_ENV=development)
