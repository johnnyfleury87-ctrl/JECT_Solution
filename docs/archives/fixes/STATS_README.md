# Système de Statistiques - JETC Solution

## Vue d'ensemble

Système de statistiques discret et respectueux de la vie privée pour suivre les visites du site.

**Caractéristiques :**
- ✅ Aucune donnée personnelle collectée
- ✅ Respect RGPD (pas de cookies invasifs)
- ✅ Icône discrète dans la navbar
- ✅ Visiteurs en ligne (5 dernières minutes)
- ✅ Stats : Jour / Semaine / Mois / Année

## Architecture

### Composants
- **StatsWidget.js** : Icône + tooltip + modal de statistiques
- **Navbar.js** : Intégration du widget dans la barre de navigation

### API Routes
- **/api/ping** (POST) : Enregistre une visite anonyme
- **/api/active** (GET) : Retourne le nombre de visiteurs actifs
- **/api/stats** (GET) : Retourne les statistiques complètes

## Configuration

### 1. Créer un compte Upstash Redis

1. Aller sur [https://upstash.com](https://upstash.com)
2. Créer un compte gratuit
3. Créer une nouvelle base de données Redis
4. Copier l'URL et le token

### 2. Variables d'environnement

Dans Vercel (ou `.env.local` pour le dev) :

```bash
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxQ
```

#### Sur Vercel

1. Aller dans **Settings** > **Environment Variables**
2. Ajouter les deux variables :
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
3. Sélectionner tous les environnements (Production, Preview, Development)
4. Sauvegarder

### 3. Redéployer

Après avoir ajouté les variables d'environnement :

```bash
git push
```

Vercel redéploiera automatiquement avec les nouvelles variables.

## Fonctionnement

### Visiteurs en ligne

- Définition : visiteurs ayant chargé une page dans les **5 dernières minutes**
- Mise à jour : toutes les 30 secondes
- Stockage : Redis avec TTL de 10 minutes

### Anonymisation

- Chaque session est identifiée par un **hash** du user-agent + timestamp tronqué
- Aucune IP stockée en clair
- TTL automatique sur toutes les clés

### Compteurs

- **Aujourd'hui** : visites du jour en cours
- **7 jours** : total des 7 derniers jours
- **30 jours** : total des 30 derniers jours
- **Mois en cours** : visites du 1er au dernier jour du mois
- **Année** : total depuis le 1er janvier

## Interface utilisateur

### Icône dans la navbar

Petite icône `BarChart3` discrète à droite de la navbar (version desktop).

### Tooltip au survol

Au survol de l'icône :
```
🟢 En ligne : 3
Aujourd'hui : 42 visites
```

### Modal au clic

Panneau détaillé avec :
- Visiteurs en ligne (carte verte avec animation)
- Statistiques par période (cartes colorées)
- Note de confidentialité

## Dépendances ajoutées

```json
{
  "lucide-react": "^0.x.x",
  "@upstash/redis": "^1.x.x"
}
```

## Plan gratuit Upstash

Le plan gratuit d'Upstash inclut :
- 10 000 commandes par jour
- 256 Mo de stockage
- Largement suffisant pour un site vitrine

## Désactivation

Si vous ne configurez pas les variables d'environnement, le système :
- Ne génèrera pas d'erreurs
- Retournera des valeurs à 0
- L'icône sera toujours visible mais non fonctionnelle

Pour retirer complètement le système :
1. Supprimer `<StatsWidget />` de `Navbar.js`
2. Supprimer le dossier `/app/api/ping`, `/app/api/active`, `/app/api/stats`
3. Supprimer `components/StatsWidget.js`

## Sécurité

- ✅ Pas d'IP en clair
- ✅ Hash de session anonyme
- ✅ TTL sur toutes les données
- ✅ Pas de cookies tiers
- ✅ RGPD compliant

## Support

Pour toute question ou problème :
- Vérifier que les variables d'environnement sont bien configurées
- Consulter les logs Vercel
- Tester l'API : `/api/active` et `/api/stats`
