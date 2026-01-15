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
nano .env.local
```

Dans `.env.local`, remplacez cette ligne :
```
SMTP_PASS=VOTRE_MOT_DE_PASSE_ICI
```

Par :
```
SMTP_PASS=le_vrai_mot_de_passe_infomaniak
```

Sauvegardez et fermez.

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
- Un email dans contact@jetc-immo.ch
- Un accusé de réception sur votre email

### 3️⃣ Déploiement (1 min)

**Dans Vercel** (Settings > Environment Variables), ajoutez :

```
SMTP_HOST = mail.infomaniak.com
SMTP_PORT = 587
SMTP_USER = contact@jetc-immo.ch
SMTP_PASS = le_vrai_mot_de_passe
SMTP_FROM = contact@jetc-immo.ch
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
| Je veux comprendre tout ce qui a été fait | [IMPLEMENTATION_COMPLETE.md](IMPLEMENTATION_COMPLETE.md) |
| J'ai un problème | [CONFIG_FORMULAIRE_CONTACT.md](CONFIG_FORMULAIRE_CONTACT.md) |
| Je veux tester en détail | [TESTS_FORMULAIRE.md](TESTS_FORMULAIRE.md) |
| Je veux voir les emails | [EMAILS_APERCU.md](EMAILS_APERCU.md) |

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
