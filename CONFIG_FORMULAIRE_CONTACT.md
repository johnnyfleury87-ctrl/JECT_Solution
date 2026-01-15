# 📧 Configuration du Formulaire de Contact JETC

## ✅ Statut
**Production-ready** - Formulaire connecté à Infomaniak avec double envoi d'email.

---

## 🎯 Fonctionnalités

### Formulaire
- **Nom complet** (obligatoire)
- **Email** (obligatoire)
- **Entreprise** (optionnel)
- **Type de demande** (obligatoire) - 5 choix disponibles
- **Message** (obligatoire)
- Protection anti-spam (honeypot)

### Emails automatiques

#### 1. Email vers JETC (contact@jetc-immo.ch)
```
Objet : Nouvelle demande de contact – JETC

Contenu :
- Nom du client
- Email du client
- Entreprise (si renseignée)
- Type de demande
- Message complet
```

#### 2. Accusé de réception au client
```
Objet : JETC – Nous avons bien reçu votre demande

Contenu personnalisé avec le nom du client
Confirmation de prise en compte
Ton professionnel et rassurant
```

---

## ⚙️ Configuration

### 1️⃣ En local

1. Créez le fichier `.env.local` à la racine du projet :
```bash
cp .env.example .env.local
```

2. Modifiez `.env.local` avec les vraies credentials :
```env
SMTP_HOST=mail.infomaniak.com
SMTP_PORT=587
SMTP_USER=contact@jetc-immo.ch
SMTP_PASS=VOTRE_MOT_DE_PASSE_ICI
SMTP_FROM=contact@jetc-immo.ch
```

3. Redémarrez le serveur de développement :
```bash
npm run dev
```

### 2️⃣ Sur Vercel (Production)

1. Allez dans votre projet Vercel
2. **Settings** > **Environment Variables**
3. Ajoutez les 5 variables suivantes :

| Variable | Valeur |
|----------|--------|
| `SMTP_HOST` | `mail.infomaniak.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `contact@jetc-immo.ch` |
| `SMTP_PASS` | Votre mot de passe |
| `SMTP_FROM` | `contact@jetc-immo.ch` |

4. **Redéployez** votre application pour appliquer les variables

---

## 🧪 Test en local

1. Lancez le serveur :
```bash
npm run dev
```

2. Ouvrez http://localhost:3000/contact

3. Remplissez le formulaire avec :
   - Votre nom
   - Votre email personnel
   - Un type de demande
   - Un message de test

4. Vérifiez :
   - ✅ Le formulaire affiche "Message envoyé avec succès"
   - ✅ Vous recevez l'email dans contact@jetc-immo.ch
   - ✅ Vous recevez l'accusé de réception sur votre email personnel

---

## 📁 Fichiers modifiés

### Frontend
- **`/components/ContactForm.js`**
  - Ajout du champ "Entreprise"
  - Ajout du select "Type de demande"
  - Messages de succès/erreur personnalisés
  - Validation frontend

### Backend
- **`/app/api/contact/route.js`**
  - Validation des champs (nom, email, type, message)
  - Configuration SMTP Infomaniak
  - Double envoi d'email (JETC + client)
  - Gestion d'erreurs robuste
  - Pas de logs sensibles en production

### Configuration
- **`.env.example`**
  - Variables SMTP Infomaniak
  - Instructions de configuration

---

## 🔒 Sécurité

✅ Validation serveur des champs requis  
✅ Validation format email  
✅ Protection anti-spam (honeypot)  
✅ Pas de logs de données sensibles  
✅ Pas de stockage des messages  
✅ Variables d'environnement sécurisées  

---

## 🚨 Troubleshooting

### ❌ Erreur "Tous les champs obligatoires doivent être remplis"
→ Vérifiez que vous avez bien rempli : nom, email, type de demande, message

### ❌ Erreur "Email invalide"
→ Vérifiez le format de l'email

### ❌ Erreur 500 lors de l'envoi
→ Vérifiez que les variables d'environnement SMTP sont correctement configurées
→ Vérifiez le mot de passe Infomaniak dans `.env.local` ou Vercel

### ❌ Emails non reçus
→ Vérifiez les spams/courriers indésirables
→ Testez avec `console.log(process.env.SMTP_USER)` dans l'API route
→ Vérifiez que le port 587 n'est pas bloqué

---

## 📞 Support

En cas de problème :
1. Vérifiez les logs dans la console du navigateur (F12)
2. Vérifiez les logs Vercel si déployé
3. Testez d'abord en local avec `.env.local`
4. Vérifiez que nodemailer est installé : `npm list nodemailer`

---

## ✨ Prochaines améliorations possibles

- [ ] Stockage des messages en base de données (optionnel)
- [ ] Dashboard admin pour consulter les demandes
- [ ] Notifications Slack/Discord en plus des emails
- [ ] Analytics sur les types de demandes
- [ ] Rate limiting pour éviter le spam

---

**Date de mise en place :** 15 janvier 2026  
**Statut :** ✅ Production Ready
