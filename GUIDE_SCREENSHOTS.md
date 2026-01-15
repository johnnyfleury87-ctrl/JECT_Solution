# Guide : Ajouter les Captures d'Écran ProdOrga

## 🎯 Objectif
Remplacer les placeholders par de vraies captures d'écran de ProdOrga en production pour maximiser l'impact visuel.

## 📸 Captures d'Écran Recommandées

### 1. Planning 28 Jours (Prioritaire)
**Ce qu'il faut montrer :**
- Vue calendrier / Gantt de la production
- Barres de charge vs capacité par poste/atelier
- Codes couleurs (vert = OK, rouge = surcharge)
- Période visible (ex: 4 semaines)

**Conseils de prise de vue :**
- Zoom pour avoir un bon niveau de détail
- Si données sensibles : flouter les noms clients/produits
- Garder lisibles : dates, couleurs, indicateurs
- Format recommandé : 1600x900px minimum

**Nom du fichier :** `planning-28-jours.png` ou `.jpg`

---

### 2. Fiche Collaborateur (Important)
**Ce qu'il faut montrer :**
- Nom/photo collaborateur (peut être flouté)
- Heures pointées / taux d'activité
- Tâches affectées / en cours
- Graphique ou indicateur de charge

**Conseils de prise de vue :**
- Vue complète de la fiche
- Données réalistes mais anonymisées si besoin
- Montrer 2-3 tâches pour exemple
- Format recommandé : 1600x900px minimum

**Nom du fichier :** `fiche-collaborateur.png` ou `.jpg`

---

### 3. Dashboard Temps Réel (Impactant)
**Ce qu'il faut montrer :**
- Vue synthétique : graphiques, KPIs, jauges
- Charge globale atelier / usine
- Alertes ou notifications si disponibles
- Impression de "pilotage en direct"

**Conseils de prise de vue :**
- Capture plein écran
- Plusieurs widgets/cartes visibles
- Données actualisées (horodatage visible = bonus)
- Format recommandé : 1920x1080px minimum

**Nom du fichier :** `dashboard-temps-reel.png` ou `.jpg`

---

## 📁 Où Placer les Fichiers

```
/workspaces/JECT_Solution/
└── public/
    └── images/
        └── prodorga/
            ├── planning-28-jours.png       ← Capture 1
            ├── fiche-collaborateur.png     ← Capture 2
            └── dashboard-temps-reel.png    ← Capture 3
```

---

## 🔧 Comment Intégrer les Images

### Étape 1 : Placer les images
Copiez vos 3 captures d'écran dans `/public/images/prodorga/`

### Étape 2 : Mettre à jour le code

Ouvrir le fichier : `components/Projects.js`

Trouver la section `screenshots` de ProdOrga (ligne ~28-32) :

```javascript
screenshots: [
  { id: 1, title: 'Planning 28 jours', description: 'Vue complète charge/capacité' },
  { id: 2, title: 'Fiche collaborateur', description: 'Suivi individuel détaillé' },
  { id: 3, title: 'Dashboard temps réel', description: 'Pilotage de la production' }
],
```

**Ajouter la propriété `image` à chaque screenshot :**

```javascript
screenshots: [
  { 
    id: 1, 
    title: 'Planning 28 jours', 
    description: 'Vue complète charge/capacité',
    image: '/images/prodorga/planning-28-jours.png'
  },
  { 
    id: 2, 
    title: 'Fiche collaborateur', 
    description: 'Suivi individuel détaillé',
    image: '/images/prodorga/fiche-collaborateur.png'
  },
  { 
    id: 3, 
    title: 'Dashboard temps réel', 
    description: 'Pilotage de la production',
    image: '/images/prodorga/dashboard-temps-reel.png'
  }
],
```

### Étape 3 : Mettre à jour le composant Modal

Ouvrir le fichier : `components/ProjectModal.js`

Trouver la section "L'outil en action" (ligne ~120-150)

**Remplacer le placeholder par l'image réelle :**

```jsx
<div className="aspect-video bg-white rounded-lg mb-3 flex items-center justify-center border-2 border-gray-200 group-hover:border-green-300 transition-colors overflow-hidden">
  {screenshot.image ? (
    <img 
      src={screenshot.image} 
      alt={screenshot.title}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="text-center p-4">
      <div className="text-4xl mb-2">📊</div>
      <p className="text-xs text-gray-500">Capture d'écran</p>
    </div>
  )}
</div>
```

### Étape 4 : Tester

```bash
npm run dev
```

Ouvrir http://localhost:3000, cliquer sur ProdOrga, scroller jusqu'à "L'outil en action"

---

## ✨ Améliorations Optionnelles

### Ajouter un effet Lightbox (Zoom sur clic)
Si vous voulez que les screenshots soient cliquables pour les agrandir :

1. Installer `react-image-lightbox` :
   ```bash
   npm install react-image-lightbox
   ```

2. Modifier `ProjectModal.js` pour ajouter l'état et le handler :
   ```jsx
   const [lightboxIndex, setLightboxIndex] = useState(null);
   ```

3. Ajouter l'événement onClick sur chaque screenshot
4. Afficher le lightbox quand `lightboxIndex !== null`

### Ajouter une vidéo courte (15-30s)
Au lieu d'une 3e capture, intégrer une vidéo :

```javascript
{
  id: 3,
  title: 'ProdOrga en action',
  description: 'Démonstration rapide',
  type: 'video',
  video: '/videos/prodorga-demo.mp4'
}
```

---

## 🎨 Conseils Qualité Image

✅ **Format recommandé :** PNG (si beaucoup de texte) ou JPG (si photos/graphiques)
✅ **Résolution :** 1600x900px minimum (Full HD idéal)
✅ **Poids :** < 500KB par image (compresser avec TinyPNG si besoin)
✅ **Ratio :** 16:9 (correspond au `aspect-video` du CSS)
✅ **Nommage :** kebab-case, descriptif (planning-28-jours.png)

---

## 📊 Checklist Finale

- [ ] 3 captures d'écran haute qualité créées
- [ ] Images placées dans `/public/images/prodorga/`
- [ ] Propriété `image` ajoutée dans `Projects.js`
- [ ] Affichage conditionnel mis à jour dans `ProjectModal.js`
- [ ] Test en local : images s'affichent correctement
- [ ] Images optimisées (< 500KB chacune)
- [ ] Commit et push des modifications

---

**Une fois fait, la présentation ProdOrga sera complète et extrêmement professionnelle ! 🚀**
