# 📧 Formulaire de Contact JETC - Configuration Rapide

> **Status:** ✅ Production Ready | **Dernière MAJ:** 15 janvier 2026

---

## 🎯 Ce qui a été fait

### ✨ Formulaire complet
- Nom complet ✅
- Email ✅  
- Entreprise (optionnel) ✅
- Type de demande (5 choix) ✅
- Message ✅

### 📨 Double envoi automatique
1. **Email vers vous** : contact@jetc-immo.ch
2. **Accusé de réception** : au client

### 🔒 Sécurité
- Validation complète
- Protection anti-spam
- Pas de service tiers

---

## ⚡ Configuration en 3 étapes

### 1️⃣ Créer .env.local

```bash
cp .env.example .env.local
```

Puis éditez `.env.local` et remplacez le mot de passe :

```env
SMTP_HOST=mail.infomaniak.com
SMTP_PORT=587
SMTP_USER=contact@jetc-immo.ch
SMTP_PASS=VOTRE_VRAI_MOT_DE_PASSE_ICI  ← Changez ici !
SMTP_FROM=contact@jetc-immo.ch
```

### 2️⃣ Test local

```bash
npm run dev
```

Allez sur http://localhost:3000/contact et testez !

### 3️⃣ Déployer sur Vercel

**Dans Vercel :**
- Settings > Environment Variables
- Ajoutez les 5 variables SMTP_*
- Redéployez

**Puis push sur Git :**
```bash
git add .
git commit -m "feat: formulaire contact Infomaniak"
git push
```

---

## 📚 Documentation complète

| Document | Description |
|----------|-------------|
| [IMPLEMENTATION_COMPLETE.md](IMPLEMENTATION_COMPLETE.md) | 📋 Résumé complet de l'implémentation |
| [CONFIG_FORMULAIRE_CONTACT.md](CONFIG_FORMULAIRE_CONTACT.md) | 🔧 Guide technique + troubleshooting |
| [DEPLOIEMENT_FORMULAIRE.md](DEPLOIEMENT_FORMULAIRE.md) | 🚀 Checklist de déploiement |
| [.env.example](.env.example) | ⚙️ Template des variables |

---

## 🧪 Test rapide

**Local :**
1. Créez `.env.local` avec le bon mot de passe
2. `npm run dev`
3. Allez sur `/contact`
4. Testez avec votre email

**Production :**
1. Configurez les variables Vercel
2. Déployez
3. Testez sur votre-site.vercel.app/contact

---

## ✅ Checklist de validation

- [ ] `.env.local` créé avec le bon mot de passe
- [ ] Test local réussi
- [ ] Email reçu dans contact@jetc-immo.ch
- [ ] Accusé de réception reçu
- [ ] Variables Vercel configurées
- [ ] Push Git effectué
- [ ] Test production réussi

---

## 🚨 Problèmes courants

| Problème | Solution |
|----------|----------|
| Erreur 500 | Variables d'environnement manquantes |
| Pas d'email | Vérifiez spams + mot de passe Infomaniak |
| Build fail | `npm run build` pour voir l'erreur |

---

## 📁 Fichiers modifiés

```
components/ContactForm.js       ← Frontend avec nouveaux champs
app/api/contact/route.js       ← Backend avec double envoi
.env.example                   ← Template configuration
```

**Aucune nouvelle dépendance** (nodemailer déjà installé)

---

## 💡 Prêt à commencer ?

1. **Lisez** [IMPLEMENTATION_COMPLETE.md](IMPLEMENTATION_COMPLETE.md)
2. **Suivez** [DEPLOIEMENT_FORMULAIRE.md](DEPLOIEMENT_FORMULAIRE.md)  
3. **Testez** en local
4. **Déployez** sur Vercel

---

**🎉 Votre formulaire est prêt à être configuré et déployé !**
