# 🚀 Configuration rapide des statistiques sur Vercel

## Étape 1 : Créer un compte Upstash (gratuit)

1. Aller sur **https://upstash.com**
2. S'inscrire (gratuit, pas de CB requise)
3. Cliquer sur **"Create Database"**
4. Choisir **Redis**
5. Sélectionner la région la plus proche (ex: EU-West-1)
6. Cliquer sur **"Create"**

## Étape 2 : Récupérer les credentials

Dans le dashboard Upstash :

1. Cliquer sur votre database
2. Onglet **"REST API"**
3. Copier :
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

## Étape 3 : Configurer Vercel

1. Aller sur **vercel.com**
2. Sélectionner votre projet **JECT_Solution**
3. **Settings** → **Environment Variables**
4. Ajouter les 2 variables :

```
Name: UPSTASH_REDIS_REST_URL
Value: https://xxxxx.upstash.io
Environments: ☑ Production ☑ Preview ☑ Development
```

```
Name: UPSTASH_REDIS_REST_TOKEN
Value: AxxxxxxxxxxxxxxxxxxxQ
Environments: ☑ Production ☑ Preview ☑ Development
```

5. Cliquer **"Save"**

## Étape 4 : Redéployer

Option A - Automatique :
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

Option B - Manuel :
- Aller dans **Deployments**
- Cliquer sur les **"..."** du dernier déploiement
- **"Redeploy"**

## ✅ Vérification

Après le redéploiement :

1. Visiter votre site
2. Vérifier l'icône 📊 dans la navbar
3. Survoler → voir le tooltip
4. Cliquer → voir les stats

## Limites du plan gratuit Upstash

- ✅ 10 000 commandes/jour
- ✅ 256 Mo de stockage
- ✅ Largement suffisant pour un site vitrine

## Dépannage

**"Analytics not configured" dans l'API** :
→ Vérifier que les variables sont bien configurées dans Vercel

**Compteur à 0** :
→ Attendre quelques minutes, les stats se mettent à jour progressivement

**Tooltip ne s'affiche pas** :
→ Les variables ne sont peut-être pas encore actives, redéployer

## Sécurité

✅ Aucune IP stockée  
✅ Sessions anonymisées  
✅ TTL automatique (10 minutes)  
✅ RGPD compliant  
✅ Pas de cookies tiers  

---

**Temps estimé** : 5-10 minutes
