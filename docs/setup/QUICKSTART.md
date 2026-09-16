# ⚡ QUICKSTART - Formulaire de Contact JETC

> **Temps estimé :** 5 minutes ⏱️

---

## 🎯 Ce que vous allez faire

1. Créer le fichier de configuration locale
2. Tester le formulaire
3. Déployer sur Vercel

---

## 🚀 3 Commandes pour démarrer

### 1️⃣ Configuration (2 min)

```bash
# Créer le fichier de config
cp .env.example .env.local

# L'éditer (remplacez le mot de passe)
# L’éditer avec les valeurs de votre environnement local
nano .env.local
```

Dans `.env.local`, renseignez les variables SMTP avec les valeurs fournies par votre service de messagerie. Ne copiez jamais ces valeurs dans Git ou dans la documentation.

### 2️⃣ Test (2 min)

```bash
# Lancer le serveur
npm run dev
```

Ouvrez http://localhost:3000/contact

Testez avec :
- Votre nom
- **Votre email personnel** (pour recevoir l'accusé)
- Un type de demande
- Un message

Cliquez "Envoyer".

**✅ Vous devez recevoir :**
**✅ Vous devez recevoir :**
- Une notification dans la boîte interne configurée
- Un accusé de réception sur votre adresse de test

### 3️⃣ Déploiement (1 min)

**Dans Vercel** (Settings > Environment Variables), ajoutez :

```
SMTP_HOST = smtp.example.invalid
SMTP_PORT = 587
SMTP_USER = utilisateur-smtp
SMTP_PASS=valeur-locale-uniquement
SMTP_FROM = expediteur@example.invalid
```

**Puis push sur Git :**

```bash
git add .
git commit -m "feat: formulaire contact Infomaniak"
git push
```

**C'est tout ! ✅**

---

## 🧪 Validation rapide

- [ ] Test local réussi
- [ ] Email reçu dans contact@jetc-immo.ch
- [ ] Accusé reçu sur votre email
- [ ] Variables Vercel configurées
- [ ] Push Git effectué
- [ ] Test production réussi

---

## 📚 Besoin d'aide ?

| Situation | Document |
|-----------|----------|
| Je veux comprendre tout ce qui a été fait | [docs/contact-form/README.md](../contact-form/README.md) |
| J'ai un problème | [docs/contact-form/README.md](../contact-form/README.md) |
| Je veux tester en détail | [docs/contact-form/TESTS_FORMULAIRE.md](../contact-form/TESTS_FORMULAIRE.md) |
| Je veux voir les emails | [EMAILS_APERCU.md](../archives/fixes/EMAILS_APERCU.md) |

---

## 🎉 C'est fait !

Votre formulaire de contact est maintenant :
- ✅ Connecté à Infomaniak
- ✅ Avec envoi automatique d'accusés de réception
- ✅ Sécurisé et validé
- ✅ Production-ready

**Durée totale :** ~5 minutes ⚡

---

**Note :** Ne commitez JAMAIS le fichier `.env.local` (déjà dans .gitignore)
