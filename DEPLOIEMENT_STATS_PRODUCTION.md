# 🚀 Déploiement et Configuration - Compteur "En ligne"

## ⚙️ Configuration Vercel (OBLIGATOIRE)

### Variables d'environnement à ajouter sur Vercel

1. **Aller sur Vercel Dashboard:**
   ```
   https://vercel.com/[votre-compte]/[votre-projet]/settings/environment-variables
   ```

2. **Ajouter les variables Redis/KV:**

   **Option A: Upstash Redis (Externe)**
   ```
   UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
   UPSTASH_REDIS_REST_TOKEN=AxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxQ
   ```

   **Option B: Vercel KV (Intégré)**
   - Aller dans l'onglet "Storage" de votre projet
   - Créer une base Vercel KV
   - Les variables seront automatiquement ajoutées:
     - `KV_REST_API_URL`
     - `KV_REST_API_TOKEN`
   - ⚠️ **Important:** Votre code utilise `UPSTASH_*`, donc soit:
     - Renommer dans le code (voir ci-dessous)
     - OU créer des alias dans Vercel:
       ```
       UPSTASH_REDIS_REST_URL = @kv-rest-api-url
       UPSTASH_REDIS_REST_TOKEN = @kv-rest-api-token
       ```

3. **Vérifier pour tous les environnements:**
   - [x] Production
   - [x] Preview
   - [x] Development (optionnel pour local)

4. **Redéployer après ajout des variables:**
   ```bash
   # Via CLI
   vercel --prod
   
   # Ou via Dashboard: Deployments > ... > Redeploy
   ```

## 🔄 Alternative: Adapter le code pour Vercel KV

Si vous utilisez Vercel KV, modifiez les 3 fichiers API:

### `/app/api/ping/route.js`
```javascript
// Remplacer:
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

// Par:
if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
  redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });
} else if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}
```

Faire la même modification dans:
- `/app/api/active/route.js`
- `/app/api/stats/route.js`

## 📝 Checklist de déploiement

### Avant le déploiement

- [ ] Variables d'environnement Redis configurées sur Vercel
- [ ] Code committé et pushé sur GitHub
- [ ] Tests locaux réussis (optionnel si pas de Redis local)

### Après le déploiement

1. **Vérifier les variables:**
   ```bash
   # Tester /api/ping
   curl -X POST https://votre-domaine.vercel.app/api/ping \
     -H "Content-Type: application/json" \
     -d '{"sessionId": "test-123"}'
   
   # Devrait retourner:
   # {"ok":true,"sessionId":"test-123"}
   
   # Tester /api/active
   curl https://votre-domaine.vercel.app/api/active
   
   # Devrait retourner:
   # {"active":0} ou {"active":1}
   ```

2. **Vérifier les logs Vercel:**
   - Dashboard > Deployments > [Latest] > Functions
   - Sélectionner `/api/ping` ou `/api/active`
   - Chercher des erreurs comme:
     ```
     [/api/ping] Redis non configuré: UPSTASH_REDIS_REST_URL ou UPSTASH_REDIS_REST_TOKEN manquants
     ```

3. **Test réel dans le navigateur:**
   - Ouvrir le site en production
   - F12 > Console (pas de logs en prod, c'est normal)
   - F12 > Network > chercher `/api/ping` et `/api/active`
   - Vérifier que les requêtes retournent 200 OK
   - Cliquer sur l'icône 📊 Stats
   - "En ligne" devrait afficher **1** ou plus

4. **Test multi-utilisateurs:**
   - Ouvrir le site dans 2 navigateurs différents
   - Ou 1 normal + 1 privé
   - Le compteur devrait afficher **2**

## 🐛 Troubleshooting Production

### Erreur: "En ligne" reste à 0

**Cause 1: Variables d'env manquantes**
```bash
# Vérifier dans Vercel Dashboard > Settings > Environment Variables
# Ou via CLI:
vercel env ls
```

**Cause 2: Cache Vercel**
```bash
# Forcer un redéploiement:
vercel --prod --force
```

**Cause 3: Redis non accessible**
- Vérifier que votre compte Upstash/Vercel KV est actif
- Tester la connexion Redis manuellement
- Vérifier les quotas (gratuit Upstash = 10k commandes/jour)

### Erreur: sessionId non envoyée

- Vérifier que PingClient.js est bien dans layout.js
- Vérifier que localStorage fonctionne (pas de navigation privée bloquant localStorage)
- Network tab: vérifier le payload de POST /api/ping

### Erreur 503: Analytics not configured

```bash
# Cela signifie que Redis n'est pas initialisé
# Vérifier les variables d'environnement
# Vérifier les logs Vercel pour le message exact
```

## 📊 Monitoring Production

### Voir les logs en temps réel

**Via Dashboard Vercel:**
1. Dashboard > Votre projet > Functions
2. Sélectionner la fonction (ping, active, etc.)
3. "View Logs" → logs en temps réel

**Via CLI:**
```bash
vercel logs [deployment-url]
```

### Métriques importantes

- **Nombre d'appels /api/ping:** ~120/heure par utilisateur (1 ping/30s)
- **Nombre d'appels /api/active:** ~240/heure par utilisateur (1 req/15s si widget ouvert)
- **Quota Redis:**
  - Upstash Free: 10,000 commandes/jour
  - Vercel KV Hobby: 30,000 requêtes/mois

### Optimisations possibles

Si vous dépassez les quotas:

1. **Augmenter l'interval de ping:**
   ```javascript
   // PingClient.js, ligne ~59
   const interval = setInterval(sendPing, 60000); // 60s au lieu de 30s
   ```

2. **Augmenter l'interval de polling:**
   ```javascript
   // StatsWidget.js
   const interval = setInterval(fetchActive, 30000); // 30s au lieu de 15s
   ```

3. **Utiliser un plan payant:**
   - Upstash: $10/mois → 1M commandes
   - Vercel KV: $20/mois → 3M requêtes

## ✅ Validation finale

Une fois déployé, validez que:

- [ ] `/api/ping` répond 200 avec `{"ok":true}`
- [ ] `/api/active` répond 200 avec `{"active":N}`
- [ ] Headers `Cache-Control: no-store` présents
- [ ] Le compteur "En ligne" s'incrémente quand on ouvre plusieurs onglets
- [ ] Le compteur retombe après 5 minutes d'inactivité
- [ ] Aucune erreur dans les logs Vercel

## 🎯 Commandes utiles

```bash
# Déployer en production
vercel --prod

# Voir les logs
vercel logs --follow

# Lister les variables d'env
vercel env ls

# Ajouter une variable
vercel env add UPSTASH_REDIS_REST_URL

# Tester les endpoints
curl https://votre-domaine.vercel.app/api/active
```
