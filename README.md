# JETC Solution - Site Vitrine

Template de site vitrine moderne pour JETC Solution, prêt pour déploiement sur Vercel.

## 🚀 Stack Technique

- **Next.js 14** (App Router)
- **React 18**
- **JavaScript** (pas de TypeScript)
- **TailwindCSS** pour le styling
- **Framer Motion** pour les animations
- **Nodemailer** pour l'envoi d'emails

## 📋 Fonctionnalités

- ✅ Page d'accueil avec Hero, Solutions, Avantages
- ✅ Page de contact avec formulaire
- ✅ Envoi d'emails via API route
- ✅ Protection anti-spam (honeypot)
- ✅ Design responsive (mobile + desktop)
- ✅ Animations légères et modernes
- ✅ Navigation sticky
- ✅ Footer complet
- ✅ Optimisé pour le SEO
- ✅ Compatible Vercel

## 🛠️ Installation

### 1. Cloner le projet

```bash
git clone <votre-repo>
cd JECT_Solution
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Copiez le fichier `.env.example` en `.env.local` :

```bash
cp .env.example .env.local
```

Puis éditez `.env.local` avec vos credentials SMTP :

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@gmail.com
SMTP_PASSWORD=votre-mot-de-passe-application
MAIL_TO=contact@jetc-solution.com
```

#### Configuration Gmail (recommandé pour tester)

1. Activez l'authentification à 2 facteurs sur votre compte Google
2. Créez un "App Password" : https://support.google.com/accounts/answer/185833
3. Utilisez ce mot de passe dans `SMTP_PASSWORD`

#### Alternatives SMTP

- **SendGrid** : Gratuit jusqu'à 100 emails/jour
- **Mailgun** : Gratuit jusqu'à 5000 emails/mois
- **Resend** : Moderne et simple à configurer
- **Amazon SES** : Très économique

### 4. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📦 Déploiement sur Vercel

### Méthode 1 : Via l'interface Vercel (recommandé)

1. Poussez votre code sur GitHub/GitLab/Bitbucket
2. Connectez-vous sur [vercel.com](https://vercel.com)
3. Cliquez sur "Import Project"
4. Sélectionnez votre repository
5. Ajoutez vos variables d'environnement dans les paramètres
6. Cliquez sur "Deploy"

### Méthode 2 : Via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Ajouter les variables d'environnement
vercel env add SMTP_HOST
vercel env add SMTP_PORT
vercel env add SMTP_USER
vercel env add SMTP_PASSWORD
vercel env add MAIL_TO

# Redéployer avec les nouvelles variables
vercel --prod
```

## 📁 Structure du Projet

```
JECT_Solution/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.js         # API route pour l'envoi d'emails
│   ├── contact/
│   │   └── page.js              # Page de contact
│   ├── layout.js                # Layout principal
│   ├── page.js                  # Page d'accueil
│   └── globals.css              # Styles globaux
├── components/
│   ├── Benefits.js              # Section avantages
│   ├── ContactCTA.js            # Call-to-action contact
│   ├── ContactForm.js           # Formulaire de contact
│   ├── Footer.js                # Footer du site
│   ├── Hero.js                  # Section hero
│   ├── Navbar.js                # Barre de navigation
│   └── Solutions.js             # Section solutions
├── .env.example                 # Exemple de variables d'environnement
├── .gitignore
├── next.config.js               # Configuration Next.js
├── package.json
├── postcss.config.js
├── tailwind.config.js           # Configuration TailwindCSS
└── README.md
```

## 🎨 Personnalisation

### Couleurs

Les couleurs principales sont définies dans `tailwind.config.js` :

```js
colors: {
  primary: {
    // Modifiez ces valeurs pour changer la palette
    500: '#0ea5e9',
    600: '#0284c7',
    // ...
  },
}
```

### Contenu

- **Hero** : Modifiez `components/Hero.js`
- **Solutions** : Éditez le tableau `solutions` dans `components/Solutions.js`
- **Avantages** : Éditez le tableau `benefits` dans `components/Benefits.js`

### Métadonnées SEO

Modifiez les métadonnées dans `app/layout.js` :

```js
export const metadata = {
  title: 'Votre titre',
  description: 'Votre description',
  keywords: 'vos, mots, clés',
};
```

## 🔒 Sécurité

- ✅ Protection anti-spam avec honeypot
- ✅ Validation des inputs côté serveur
- ✅ Limitation de la longueur des messages
- ✅ Variables d'environnement sécurisées
- ✅ Pas de stockage de données sensibles

## 📝 Scripts Disponibles

```bash
npm run dev      # Lancer le serveur de développement
npm run build    # Compiler pour la production
npm run start    # Lancer le serveur de production
npm run lint     # Lancer le linter
```

## 🆘 Support

Pour toute question ou problème :

1. Vérifiez que toutes les dépendances sont installées
2. Vérifiez que les variables d'environnement sont correctement configurées
3. Consultez les logs d'erreur dans la console

## 📄 Licence

Ce projet est privé et destiné à JETC Solution.

## 🚀 Prochaines Étapes

Suggestions d'améliorations futures :

- [ ] Ajouter un blog
- [ ] Intégrer Google Analytics
- [ ] Ajouter des témoignages clients
- [ ] Créer une page portfolio
- [ ] Ajouter un mode sombre
- [ ] Intégrer un chat en direct

---

Développé avec ❤️ pour JETC Solution
