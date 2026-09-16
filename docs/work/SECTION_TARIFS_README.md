# Section Transparence & Rémunération

## Vue d'ensemble

Nouvelle section ajoutée au site JETC pour expliquer de manière transparente et humaine la politique de rémunération, avec des exemples concrets et non contractuels.

## Emplacement

- **Fichier composant** : `/components/Pricing.js`
- **Position dans la page** : Ajoutée dans `/app/page.js` juste avant le formulaire de contact (ContactCTA)

## Structure de la section

### 1. En-tête
- **Titre** : "Une rémunération claire, sans surprise"
- **Introduction** : Explication du modèle sans abonnements imposés ni grilles tarifaires floues

### 2. Cartes de tarifs (4 cartes)

#### Carte 1 : Site vitrine / site professionnel
- 🌐 Icône
- **Contenu** :
  - Site vitrine 3–5 pages
  - Formulaire de contact
  - Mise en ligne + configuration de base
- **Temps** : 3 à 10 jours
- **Budget** : 1 200 € – 2 500 €
- **Note** : exemple indicatif

#### Carte 2 : Évolutions & mises à jour
- ⚙️ Icône
- **Contenu** :
  - Ajout de pages
  - Ajustements design
  - Corrections / optimisations
- **Temps** : Intervention ponctuelle
- **Tarif** : 60 € – 90 € / heure
- **Note** : selon complexité

#### Carte 3 : Outil métier sur mesure
- ⚡ Icône
- **Contenu** :
  - Automatisation Excel / VBA
  - Tableaux de pilotage
  - Outils logistique, RH, qualité, production
- **Temps** : Variable selon besoin
- **Budget** : 800 € – 3 000 €
- **Note** : exemple indicatif

#### Carte 4 : SaaS / plateforme métier
- 🚀 Icône
- **Contenu** :
  - Prototype / démo
  - Développement progressif
  - Maintenance & évolutions
- **Temps** : Projet structurant
- **Prix** : Modèle discuté au cas par cas
- **Note** : périmètre défini ensemble

### 3. Hébergement & technique
Bloc expliquant que l'hébergement et les services techniques peuvent être :
- Gérés par le client
- Ou mis en place avec accompagnement

**Message clé** : Aucun verrou technique. Aucune dépendance imposée.

### 4. Ce que JETC ne facture pas
Liste de 5 points affichés sur 2 colonnes :
- ❌ Pas d'abonnements imposés
- ❌ Pas de promesses irréalistes
- ❌ Pas de fonctionnalités inutiles
- ❌ Pas de formations interminables
- ❌ Pas d'outils qui ne servent pas le terrain

### 5. Phrase de clôture
Message final dans un encadré mis en valeur :
> "L'objectif n'est pas de vendre plus.
> **L'objectif est de faire juste, avec des solutions utiles, durables et adaptées à la réalité du terrain.**"

## Caractéristiques techniques

### Animations
- Animations au scroll avec Framer Motion
- Effet hover sur les cartes (légère translation vers le haut)
- Stagger animation pour un affichage progressif des éléments
- Animations discrètes et professionnelles

### Design
- Utilisation des couleurs du thème (primary-600, gray-900, etc.)
- Design cohérent avec le reste du site
- Cartes avec bordure et ombre légère
- Responsive : 1 colonne mobile, 2 colonnes tablette, 4 colonnes desktop

### Accessibilité
- Icônes SVG avec chemins vectoriels
- Emojis pour les icônes principales
- Textes lisibles et contrastés
- Structure sémantique HTML

## Modifications apportées

### Fichiers créés
- `/components/Pricing.js` - Nouveau composant

### Fichiers modifiés
- `/app/page.js` - Ajout de l'import et du composant Pricing avant ContactCTA

### Sections non modifiées
Toutes les autres sections du site restent intactes :
- Hero
- Solutions
- Signature
- WorkProcess
- Projects
- Benefits
- ContactCTA

## Build et déploiement

✅ Build réussi sans erreurs
✅ Aucune erreur ESLint (hormis un warning préexistant sur ProjectModal.js)
✅ Compatible avec l'environnement de production

## Notes importantes

- **Aucun caractère HTML encodé** : Tous les textes utilisent des caractères normaux (pas de `&apos;`, etc.)
- **Ton humain et authentique** : Pas de marketing agressif
- **Transparence** : Tous les montants sont clairement indiqués comme "exemples indicatifs"
- **Pas de promesses trompeuses** : Aucun "à partir de" trompeur

## Serveur de développement

Le site est disponible en développement sur : `http://localhost:3002`

Pour lancer le serveur :
```bash
npm run dev
```

Pour compiler en production :
```bash
npm run build
```
