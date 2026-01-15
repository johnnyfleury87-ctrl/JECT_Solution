# 🚀 Guide de Déploiement - Formulaire de Contact JETC

## ⚡ Checklist Rapide

### ✅ Avant de déployer

- [x] Le formulaire a les bons champs (nom, email, entreprise, type, message)
- [x] L'API route envoie 2 emails (JETC + client)
- [x] Le build Next.js passe : `npm run build`
- [ ] Les variables d'environnement sont prêtes
- [ ] Test local effectué avec succès

---

## 🔧 Étape 1 : Configuration locale

### Créer le fichier .env.local

```bash
cp .env.example .env.local
```

### Éditer .env.local

Remplacez `VOTRE_MOT_DE_PASSE_ICI` par le vrai mot de passe :

```env
SMTP_HOST=mail.infomaniak.com
SMTP_PORT=587
SMTP_USER=contact@jetc-immo.ch
SMTP_PASS=VOTRE_VRAI_MOT_DE_PASSE
SMTP_FROM=contact@jetc-immo.ch
```

### Test local

```bash
npm run dev
```

Allez sur http://localhost:3000/contact et testez le formulaire.

**Attendu :**
- ✅ Message "Merci, votre message a bien été envoyé..."
- ✅ Email reçu dans contact@jetc-immo.ch
- ✅ Accusé de réception reçu sur votre email test

---

## ☁️ Étape 2 : Déploiement Vercel

### Option A : Via l'interface Vercel

1. **Allez dans votre projet Vercel**
2. **Settings** > **Environment Variables**
3. **Ajoutez ces 5 variables** (Production, Preview, Development) :

```
SMTP_HOST = mail.infomaniak.com
SMTP_PORT = 587
SMTP_USER = contact@jetc-immo.ch
SMTP_PASS = votre_mot_de_passe
SMTP_FROM = contact@jetc-immo.ch
```

4. **Redéployez**
   - Allez dans **Deployments**
   - Cliquez sur les "..." du dernier déploiement
   - Cliquez "Redeploy"

### Option B : Via Git (recommandé)

1. **Commitez les changements**

```bash
git add .
git commit -m "feat: formulaire de contact connecté à Infomaniak"
git push
```

2. **Vercel déploie automatiquement**

3. **Ajoutez les variables d'environnement** (voir Option A, étape 3)

4. **Redéployez** si les variables n'étaient pas présentes

---

## 🧪 Étape 3 : Test en production

1. **Allez sur votre site en production**
   - https://votre-site.vercel.app/contact

2. **Testez le formulaire**
   - Remplissez avec votre email personnel
   - Soumettez

3. **Vérifiez**
   - ✅ Message de succès affiché
   - ✅ Email reçu dans contact@jetc-immo.ch
   - ✅ Accusé de réception reçu sur votre email

---

## 🚨 En cas de problème

### Erreur 500 en production

**Cause :** Variables d'environnement manquantes ou incorrectes

**Solution :**
1. Vérifiez dans Vercel > Settings > Environment Variables
2. Assurez-vous que les 5 variables sont présentes
3. Redéployez après ajout/modification

### Emails non reçus

**Vérifiez :**
1. Les spams/courriers indésirables
2. Le mot de passe Infomaniak est correct
3. Le compte contact@jetc-immo.ch est actif
4. Les logs Vercel pour les erreurs

### Test des variables en production

Ajoutez temporairement dans `app/api/contact/route.js` :

```javascript
console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_HOST:', process.env.SMTP_HOST);
```

Puis consultez les logs dans Vercel.

**⚠️ Supprimez ces logs après test !**

---

## 📦 Résumé des fichiers modifiés

```
/components/ContactForm.js          ← Formulaire frontend
/app/api/contact/route.js          ← API avec double envoi email
/.env.example                       ← Template variables
/CONFIG_FORMULAIRE_CONTACT.md      ← Documentation complète
/DEPLOIEMENT_FORMULAIRE.md         ← Ce fichier
```

---

## ✅ Validation finale

Avant de considérer le déploiement terminé :

- [ ] Test local réussi
- [ ] Push sur Git effectué
- [ ] Variables Vercel configurées
- [ ] Déploiement Vercel terminé
- [ ] Test en production réussi
- [ ] Email reçu dans contact@jetc-immo.ch
- [ ] Accusé de réception reçu
- [ ] Formulaire affiche message de succès
- [ ] Messages d'erreur fonctionnent (test avec email invalide)

---

## 🎯 Commandes utiles

```bash
# Développement local
npm run dev

# Build de production
npm run build

# Démarrer en mode production
npm start

# Voir les logs Git
git log --oneline

# État Git
git status

# Push vers GitHub (trigger Vercel)
git push
```

---

**Dernière mise à jour :** 15 janvier 2026  
**Statut :** ✅ Ready to deploy
