# ⚡ Actions Immédiates - Déploiement Correction

## 🎯 Objectif
Déployer la correction de l'erreur 500 sur Vercel

---

## 📝 Étape 1 : Commit et Push (2 min)

```bash
# Ajouter les fichiers modifiés
git add app/api/contact/route.js DEBUG_PRODUCTION.md ACTIONS_IMMEDIATES.md

# Commit
git commit -m "fix: correction erreur 500 API contact + logs debug"

# Push (trigger auto-deploy Vercel)
git push
```

---

## ⏳ Étape 2 : Attendre le Déploiement (1-2 min)

1. Allez sur https://vercel.com/
2. Ouvrez votre projet **jetc-solution**
3. Allez dans **Deployments**
4. Attendez que le statut passe à **Ready** ✅

---

## 🧪 Étape 3 : Test Immédiat (1 min)

### Test A : Endpoint de diagnostic
```bash
curl https://jetc-solution.vercel.app/api/contact
```

**Attendu :**
```json
{
  "ok": true,
  "env_check": {
    "SMTP_HOST": true,
    "SMTP_PORT": true,
    "SMTP_USER": true,
    "SMTP_PASS": true,
    "SMTP_FROM": true
  }
}
```

**⚠️ Si un champ est `false` :**
→ Allez à l'Étape 4 (Variables manquantes)

**✅ Si tous sont `true` :**
→ Passez au Test B

### Test B : Envoi réel
```bash
curl -X POST https://jetc-solution.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Production",
    "email": "VOTRE_EMAIL_ICI",
    "requestType": "Test",
    "message": "Test après correction du bug 500"
  }'
```

**Remplacez** `VOTRE_EMAIL_ICI` par votre vrai email.

**Attendu :**
```json
{
  "ok": true,
  "message": "Emails envoyés avec succès"
}
```

**Vérifiez vos emails :**
- [ ] Email reçu dans contact@jetc-immo.ch
- [ ] Accusé de réception reçu sur votre email

---

## ⚠️ Étape 4 : Si Variables Manquantes

### 4.1 Vérifier les Variables
1. Allez dans Vercel > **jetc-solution** > **Settings**
2. Cliquez sur **Environment Variables**
3. Vérifiez que ces 5 variables existent pour **Production** :

```
SMTP_HOST = mail.infomaniak.com
SMTP_PORT = 587
SMTP_USER = contact@jetc-immo.ch
SMTP_PASS = [votre mot de passe]
SMTP_FROM = contact@jetc-immo.ch
```

### 4.2 Si Manquantes : Ajouter
Cliquez **Add New** pour chaque variable manquante :
- Sélectionnez **Production** ✅
- Ajoutez la valeur
- Cliquez **Save**

### 4.3 Redéployer
**Important :** Les variables ajoutées nécessitent un redéploiement !

1. Allez dans **Deployments**
2. Cliquez sur les **...** du dernier déploiement
3. Cliquez **Redeploy**
4. Attendez le build
5. Retournez à l'Étape 3

---

## 📊 Étape 5 : Consulter les Logs (1 min)

1. Vercel > **jetc-solution** > **Functions** (ou **Runtime Logs**)
2. Filtrez par `contact` ou `[contact api]`
3. Vérifiez les logs du dernier test

**Logs attendus :**
```
[contact api] POST called
[contact api] Env vars check: { hasHost: true, ... }
[contact api] Form data received: ...
[contact api] Creating SMTP transporter: ...
[contact api] Sending emails to: ...
[contact api] Emails sent successfully
```

---

## 🌐 Étape 6 : Test depuis le Formulaire Web (1 min)

1. Allez sur https://jetc-solution.vercel.app/contact
2. Remplissez le formulaire :
   - Nom : Votre nom
   - Email : **Votre email personnel**
   - Type : Au choix
   - Message : "Test après correction"
3. Cliquez **Envoyer**

**Attendu :**
- ✅ Message "Merci, votre message a bien été envoyé..."
- ✅ Email reçu dans contact@jetc-immo.ch
- ✅ Accusé reçu sur votre email

---

## ✅ Checklist Finale

- [ ] Code pushé sur Git
- [ ] Déploiement Vercel terminé (Status: Ready)
- [ ] Test GET : tous les env_check sont `true`
- [ ] Test POST : status 200 + `{ "ok": true }`
- [ ] Email reçu dans contact@jetc-immo.ch
- [ ] Accusé de réception reçu
- [ ] Test depuis formulaire web réussi
- [ ] Logs Vercel affichent succès

---

## 🎉 C'est Réglé !

Si tous les tests passent :
- ✅ L'erreur 500 est corrigée
- ✅ Les emails sont envoyés
- ✅ Le formulaire fonctionne en production
- ✅ Les logs permettent le debug

### Prochaine Étape (Optionnel)
Après validation complète, vous pouvez **supprimer l'endpoint GET de test** en modifiant [app/api/contact/route.js](../app/api/contact/route.js).

Voir [DEBUG_PRODUCTION.md](DEBUG_PRODUCTION.md) section "Validation Finale".

---

## 🚨 Si Ça Ne Marche Toujours Pas

**Consultez :** [DEBUG_PRODUCTION.md](DEBUG_PRODUCTION.md)

**Ou contactez le support avec :**
- Logs Vercel complets
- Résultat du test GET
- Résultat du test POST
- Confirmation que les variables sont configurées

---

**Temps total estimé :** 5-10 minutes
