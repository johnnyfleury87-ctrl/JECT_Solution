# 📸 Comment Ajouter vos Captures d'Écran ProdOrga

## 🎯 Résumé Rapide

1. Placez vos 3 images dans : `/public/images/prodorga/`
2. Nommez-les exactement comme indiqué ci-dessous
3. Vos images s'afficheront automatiquement !

---

## 📁 Structure des Fichiers

```
JECT_Solution/
└── public/
    └── images/
        └── prodorga/
            ├── planning-28-jours.png       ← Votre capture planning
            ├── fiche-collaborateur.png     ← Votre capture fiche
            └── dashboard-temps-reel.png    ← Votre capture dashboard
```

---

## 🖼️ Détails pour Chaque Capture

### 1️⃣ Planning 28 Jours
**Nom exact du fichier :** `planning-28-jours.png` (ou .jpg)

**Ce qu'il faut capturer :**
- La vue planning/calendrier de production
- Les barres de charge vs capacité
- Les codes couleurs (vert/rouge pour surcharges)
- Au moins 3-4 semaines visibles

**Taille recommandée :** 1600x900px ou plus
**Format :** PNG ou JPG
**Poids max :** 500 KB (compresser si besoin)

---

### 2️⃣ Fiche Collaborateur
**Nom exact du fichier :** `fiche-collaborateur.png` (ou .jpg)

**Ce qu'il faut capturer :**
- Vue d'une fiche individuelle
- Heures, tâches, indicateurs visibles
- Peut être anonymisé/flouté si nécessaire

**Taille recommandée :** 1600x900px ou plus
**Format :** PNG ou JPG
**Poids max :** 500 KB

---

### 3️⃣ Dashboard Temps Réel
**Nom exact du fichier :** `dashboard-temps-reel.png` (ou .jpg)

**Ce qu'il faut capturer :**
- Vue tableau de bord principal
- Graphiques, KPIs, jauges
- Plusieurs widgets visibles

**Taille recommandée :** 1920x1080px (Full HD)
**Format :** PNG ou JPG
**Poids max :** 500 KB

---

## 🚀 Mise en Place - 3 Méthodes

### Méthode 1 : Via l'Explorateur de Fichiers (Plus Simple)

1. Ouvrez l'explorateur VS Code (icône 📁 à gauche)
2. Naviguez vers : `public/images/prodorga/`
3. Glissez-déposez vos 3 images dans ce dossier
4. Renommez-les si nécessaire pour correspondre aux noms exacts

### Méthode 2 : Via le Terminal

```bash
# Depuis la racine du projet
cp /chemin/vers/votre/capture1.png public/images/prodorga/planning-28-jours.png
cp /chemin/vers/votre/capture2.png public/images/prodorga/fiche-collaborateur.png
cp /chemin/vers/votre/capture3.png public/images/prodorga/dashboard-temps-reel.png
```

### Méthode 3 : Upload via Interface Web

Si vous utilisez GitHub/Codespaces :
1. Allez dans GitHub → votre repo
2. Naviguez vers `public/images/prodorga/`
3. Cliquez "Add file" → "Upload files"
4. Uploadez vos 3 images

---

## ✅ Vérification

Une fois les images placées, lancez :

```bash
npm run dev
```

Puis :
1. Ouvrez http://localhost:3000
2. Cliquez sur la carte **ProdOrga** 🏭
3. Scrollez jusqu'à la section **"L'outil en action"**
4. Vos captures d'écran devraient s'afficher !

---

## 🔄 Si les Images ne S'affichent Pas

### Vérifiez :

1. **Les noms sont EXACTEMENT corrects** (sensible à la casse)
   - ✅ `planning-28-jours.png`
   - ❌ `Planning-28-jours.png`
   - ❌ `planning_28_jours.png`

2. **Les images sont dans le bon dossier**
   - ✅ `/public/images/prodorga/planning-28-jours.png`
   - ❌ `/public/images/planning-28-jours.png`
   - ❌ `/images/prodorga/planning-28-jours.png`

3. **Redémarrez le serveur**
   ```bash
   # Ctrl+C pour arrêter
   npm run dev
   ```

4. **Videz le cache du navigateur**
   - Chrome/Edge : Ctrl+Shift+R
   - Firefox : Ctrl+F5

---

## 📝 Extensions de Fichiers Acceptées

- ✅ `.png` (recommandé pour texte/interface)
- ✅ `.jpg` ou `.jpeg` (ok pour photos/graphiques)
- ✅ `.webp` (format moderne, bonne compression)
- ❌ `.gif` (pas recommandé)
- ❌ `.bmp` (trop lourd)

---

## 💡 Bonus : Optimiser vos Images

Si vos images sont trop lourdes :

**Option 1 : TinyPNG (en ligne)**
- https://tinypng.com
- Drag & drop vos images
- Téléchargez les versions compressées

**Option 2 : Via Terminal (si ImageMagick installé)**
```bash
cd public/images/prodorga/
mogrify -resize 1600x900 -quality 85 *.png
```

---

## 🎯 Récapitulatif - Checklist

- [ ] J'ai 3 captures d'écran prêtes
- [ ] Elles sont nommées correctement
- [ ] Elles sont dans `/public/images/prodorga/`
- [ ] Elles pèsent moins de 500 KB chacune
- [ ] J'ai relancé `npm run dev`
- [ ] Les images s'affichent dans le modal ProdOrga

---

**Une fois fait, vos captures seront visibles immédiatement ! 🚀**
