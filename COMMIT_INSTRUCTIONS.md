# 📝 Commit & Déploiement - Fix Compteur "En ligne"

## 🔍 Fichiers modifiés

Voici la liste complète des fichiers créés et modifiés pour ce fix:

### Nouveaux fichiers
```
components/PingClient.js                    ← Composant ping automatique
scripts/test-api.sh                         ← Script de test des API
FIX_COMPTEUR_EN_LIGNE.md                   ← Documentation du fix
TEST_ACTIVE_USERS.md                        ← Guide de test
DEPLOIEMENT_STATS_PRODUCTION.md            ← Guide de déploiement
COMMIT_INSTRUCTIONS.md                      ← Ce fichier
```

### Fichiers modifiés
```
app/api/ping/route.js                       ← Cache + sessionId + logs
app/api/active/route.js                     ← Cache + logs
app/api/stats/route.js                      ← Cache
app/layout.js                               ← Intégration PingClient
components/StatsWidget.js                   ← Optimisation polling
```

## 📦 Commandes Git

### 1. Vérifier les changements
```bash
cd /workspaces/JECT_Solution

# Voir tous les fichiers modifiés
git status

# Voir les différences
git diff

# Voir les fichiers créés
git ls-files --others --exclude-standard
```

### 2. Ajouter les fichiers

**Option A: Ajouter tous les changements**
```bash
git add .
```

**Option B: Ajouter fichier par fichier (recommandé)**
```bash
# Fichiers API modifiés
git add app/api/ping/route.js
git add app/api/active/route.js
git add app/api/stats/route.js

# Composants
git add components/PingClient.js
git add components/StatsWidget.js

# Layout
git add app/layout.js

# Documentation
git add FIX_COMPTEUR_EN_LIGNE.md
git add TEST_ACTIVE_USERS.md
git add DEPLOIEMENT_STATS_PRODUCTION.md
git add COMMIT_INSTRUCTIONS.md

# Scripts
git add scripts/test-api.sh
```

### 3. Commit
```bash
git commit -m "fix(stats): Correction compteur 'En ligne' affichant 0

Corrections appliquées:
- ✅ Ajout dynamic='force-dynamic' et Cache-Control sur toutes les routes API
- ✅ Création composant PingClient avec sessionId persistante (localStorage)
- ✅ Intégration ping automatique dans layout.js (toutes les pages)
- ✅ Optimisation polling StatsWidget (30s → 15s)
- ✅ Amélioration logs et gestion d'erreurs
- ✅ Documentation complète et scripts de test

Détails:
- /api/ping accepte maintenant sessionId du client
- Cache désactivé sur /api/ping, /api/active, /api/stats
- Logs uniquement en développement (NODE_ENV check)
- TTL Redis: 10min, Window actif: 5min

Closes #XX (si vous avez une issue GitHub)
"
```

### 4. Push vers GitHub
```bash
# Vérifier la branche actuelle
git branch

# Push
git push origin main

# Ou si vous êtes sur une autre branche
git push origin [nom-de-votre-branche]
```

## 🚀 Déploiement Vercel

### Option A: Déploiement automatique (recommandé)
Si vous avez configuré Vercel avec GitHub:
```
1. Push vers GitHub (voir ci-dessus)
2. Vercel détecte automatiquement le push
3. Déploiement automatique en production
4. Vérifier sur: https://vercel.com/dashboard
```

### Option B: Déploiement manuel via CLI
```bash
# Installer Vercel CLI si pas déjà fait
npm i -g vercel

# Login
vercel login

# Déployer en production
vercel --prod

# Ou juste tester en preview
vercel
```

## ⚙️ Configuration post-déploiement

**IMPORTANT:** Après le premier déploiement, configurez Redis!

### 1. Ajouter les variables d'environnement

**Via Dashboard Vercel:**
```
1. Aller sur https://vercel.com/dashboard
2. Sélectionner votre projet
3. Settings > Environment Variables
4. Ajouter:
   - UPSTASH_REDIS_REST_URL = https://xxxxx.upstash.io
   - UPSTASH_REDIS_REST_TOKEN = AxxxxxxxxxxxxxxxxQ
5. Cocher: Production + Preview + Development
6. Save
```

**Via CLI:**
```bash
vercel env add UPSTASH_REDIS_REST_URL
# Coller l'URL, appuyer sur Entrée
# Sélectionner les environnements (Espace pour sélectionner, Entrée pour valider)

vercel env add UPSTASH_REDIS_REST_TOKEN
# Coller le token, etc.
```

### 2. Redéployer (obligatoire après ajout de variables)
```bash
vercel --prod --force
```

## 🧪 Tests post-déploiement

### Test automatique
```bash
# Tester la production
./scripts/test-api.sh https://votre-domaine.vercel.app

# Ou en local (serveur doit tourner)
./scripts/test-api.sh http://localhost:3000
```

### Test manuel
```bash
# Vérifier /api/active
curl https://votre-domaine.vercel.app/api/active

# Devrait retourner: {"active":0} ou {"active":N}
```

### Test visuel
```
1. Ouvrir https://votre-domaine.vercel.app
2. F12 > Network
3. Chercher: /api/ping et /api/active
4. Vérifier: 200 OK
5. Cliquer sur l'icône 📊 Stats
6. "En ligne" devrait être > 0
```

## 📊 Vérification des logs Vercel

```
1. Dashboard Vercel > Votre projet
2. Functions > Sélectionner /api/ping
3. View Logs
4. Chercher des erreurs comme:
   "[/api/ping] Redis non configuré: ..."
```

Si vous voyez cette erreur → Variables d'env pas configurées.

## 🔄 Workflow complet (TL;DR)

```bash
# 1. Commit
git add .
git commit -m "fix(stats): Correction compteur En ligne"
git push origin main

# 2. Attendre déploiement auto Vercel (ou déployer manuellement)
vercel --prod

# 3. Configurer Redis sur Vercel Dashboard
# Settings > Environment Variables > Ajouter UPSTASH_*

# 4. Forcer redéploiement
vercel --prod --force

# 5. Tester
./scripts/test-api.sh https://votre-domaine.vercel.app

# 6. Vérifier visuellement
# Ouvrir le site > Icône Stats > "En ligne" > Devrait être > 0
```

## ✅ Checklist finale

- [ ] Tous les fichiers committés et pushés
- [ ] Déploiement Vercel réussi (pas d'erreur de build)
- [ ] Variables Redis configurées sur Vercel
- [ ] Redéploiement après ajout des variables
- [ ] `/api/active` retourne 200 OK
- [ ] Le compteur affiche > 0 quand on est sur le site
- [ ] Test multi-onglets fonctionne (compteur s'incrémente)
- [ ] Logs Vercel ne montrent pas d'erreur Redis

## 🆘 En cas de problème

### Build error sur Vercel
```bash
# Vérifier en local d'abord
npm run build

# Si ça passe en local mais pas sur Vercel:
# Vérifier Node version dans package.json
{
  "engines": {
    "node": ">=18.17.0"
  }
}
```

### Variables d'env non trouvées
```bash
# Lister les variables
vercel env ls

# Pull les variables localement (pour tester)
vercel env pull .env.local
```

### Redis ne fonctionne toujours pas
```bash
# Vérifier les credentials Upstash
# Tester manuellement avec curl + API Upstash
curl -X GET https://xxxxx.upstash.io/keys/* \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📚 Documentation

- [FIX_COMPTEUR_EN_LIGNE.md](FIX_COMPTEUR_EN_LIGNE.md) - Détails techniques du fix
- [TEST_ACTIVE_USERS.md](TEST_ACTIVE_USERS.md) - Guide de test complet
- [DEPLOIEMENT_STATS_PRODUCTION.md](DEPLOIEMENT_STATS_PRODUCTION.md) - Configuration Vercel

## 🎯 Commandes de référence rapide

```bash
# Status
git status
git diff

# Commit & Push
git add .
git commit -m "fix(stats): message"
git push origin main

# Déploiement
vercel --prod

# Variables env
vercel env ls
vercel env add VAR_NAME

# Tests
./scripts/test-api.sh https://votre-domaine.com
curl https://votre-domaine.com/api/active

# Logs
vercel logs --follow
```

---

**Prêt à déployer?** Suivez les étapes ci-dessus dans l'ordre! 🚀
