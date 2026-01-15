# 🔐 Guide de Rotation des Credentials SMTP

## 🎯 Objectif
Changer le mot de passe SMTP et mettre à jour tous les emplacements.

**Durée :** 10 minutes

---

## ⚡ Étapes Rapides

### 1️⃣ Changer le Mot de Passe Infomaniak (5 min)

1. **Connectez-vous à Infomaniak**
   - https://manager.infomaniak.com/

2. **Accédez aux emails**
   - Menu > Email > Gestion des emails

3. **Sélectionnez contact@jetc-immo.ch**
   - Cliquez sur l'email

4. **Changez le mot de passe**
   - Onglet "Paramètres" ou "Mot de passe"
   - Générez un nouveau mot de passe fort
   - **Copiez-le** (vous en aurez besoin)

💡 **Conseil :** Utilisez un mot de passe de 20+ caractères avec lettres, chiffres et symboles.

---

### 2️⃣ Mettre à Jour en Local (1 min)

**Si `.env.local` existe déjà :**
```bash
# Éditez le fichier
nano .env.local
# ou
code .env.local
```

**Si `.env.local` n'existe pas encore :**
```bash
# Créez-le depuis le template
cp .env.example .env.local

# Éditez-le
nano .env.local
```

**Remplacez :**
```env
SMTP_PASS=ANCIEN_MOT_DE_PASSE
```

**Par :**
```env
SMTP_PASS=NOUVEAU_MOT_DE_PASSE_INFOMANIAK
```

**Vérifiez que toutes les variables sont correctes :**
```env
SMTP_HOST=mail.infomaniak.com
SMTP_PORT=587
SMTP_USER=contact@jetc-immo.ch
SMTP_PASS=VOTRE_NOUVEAU_MOT_DE_PASSE
SMTP_FROM=contact@jetc-immo.ch
```

**Sauvegardez et fermez.**

---

### 3️⃣ Tester en Local (2 min)

```bash
# Lancez le serveur
npm run dev
```

**Dans le navigateur :**
1. Allez sur http://localhost:3000/contact
2. Remplissez le formulaire avec **votre email personnel**
3. Soumettez

**Vérifiez :**
- [ ] Message "Merci, votre message a bien été envoyé..."
- [ ] Email reçu dans contact@jetc-immo.ch
- [ ] Accusé de réception reçu sur votre email

**Si erreur :**
- Vérifiez le nouveau mot de passe dans `.env.local`
- Consultez la console du terminal pour les erreurs

---

### 4️⃣ Mettre à Jour Vercel (3 min)

**Option A : Via l'interface web**

1. **Allez sur Vercel**
   - https://vercel.com/

2. **Ouvrez votre projet**
   - Cliquez sur **jetc-solution**

3. **Allez dans Settings**
   - Onglet **Settings**
   - Section **Environment Variables**

4. **Trouvez SMTP_PASS**
   - Cherchez la variable `SMTP_PASS`

5. **Éditez la variable**
   - Cliquez sur le bouton "Edit" (crayon) à droite
   - Remplacez par le nouveau mot de passe
   - Cliquez **Save**

6. **Redéployez**
   - Allez dans l'onglet **Deployments**
   - Cliquez sur "..." du dernier déploiement
   - Cliquez **Redeploy**
   - Attendez la fin du build

**Option B : Via CLI**

```bash
# Installez Vercel CLI si nécessaire
npm i -g vercel

# Connectez-vous
vercel login

# Mettez à jour la variable
vercel env rm SMTP_PASS production
vercel env add SMTP_PASS production
# Collez le nouveau mot de passe

# Redéployez
vercel --prod
```

---

### 5️⃣ Tester en Production (2 min)

**Test A : Endpoint de diagnostic**
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

**Si SMTP_PASS est false :**
- Les variables n'ont pas été prises en compte
- Redéployez une fois de plus

**Test B : Envoi réel**
```bash
curl -X POST https://jetc-solution.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Rotation",
    "email": "votre-email@test.com",
    "requestType": "Test",
    "message": "Test après rotation du mot de passe"
  }'
```

**Attendu :**
```json
{
  "ok": true,
  "message": "Emails envoyés avec succès"
}
```

**Test C : Depuis le formulaire web**
1. https://jetc-solution.vercel.app/contact
2. Remplissez et soumettez
3. Vérifiez les emails

---

## ✅ Checklist de Validation

### Configuration
- [ ] Nouveau mot de passe Infomaniak généré
- [ ] `.env.local` mis à jour
- [ ] Variables Vercel mises à jour
- [ ] Redéploiement Vercel effectué

### Tests
- [ ] Test local réussi
- [ ] Email reçu en local
- [ ] Test GET production OK (toutes les variables true)
- [ ] Test POST production OK (status 200)
- [ ] Email reçu en production
- [ ] Formulaire web fonctionne

### Sécurité
- [ ] Ancien mot de passe supprimé de tous les fichiers
- [ ] `.env.local` n'est pas commité (vérifié avec `git status`)
- [ ] Aucun secret visible dans les logs Vercel

---

## 🚨 Troubleshooting

### Erreur "SMTP authentication failed" en local
**Cause :** Mauvais mot de passe dans `.env.local`

**Solution :**
1. Vérifiez que vous avez bien copié le nouveau mot de passe
2. Pas d'espaces avant/après le mot de passe
3. Relancez `npm run dev`

### Erreur 500 en production
**Cause :** Variables Vercel pas à jour

**Solution :**
1. Vérifiez que `SMTP_PASS` est bien édité dans Vercel
2. **Redéployez** (les variables ne s'appliquent qu'au build)
3. Testez à nouveau

### SMTP_PASS à false dans le test GET
**Cause :** Variable non définie ou redéploiement nécessaire

**Solution :**
1. Vérifiez dans Vercel > Settings > Environment Variables
2. Assurez-vous que `SMTP_PASS` existe pour **Production**
3. Redéployez
4. Retestez

---

## 🔍 Vérifications de Sécurité Post-Rotation

### 1. Aucun secret dans Git
```bash
cd /workspaces/JECT_Solution
git status
```

**Attendu :**
- `.env.local` ne doit **PAS** apparaître
- Si il apparaît → C'est qu'il n'est pas dans `.gitignore` ⚠️

### 2. Logs Vercel propres
1. Vercel > Functions > Runtime Logs
2. Filtrez par `contact`
3. Vérifiez qu'aucun mot de passe n'est visible

### 3. Code propre
```bash
# Recherche de secrets en dur
grep -r "SMTP_PASS.*=" --include="*.js" --exclude-dir=node_modules .
```

**Attendu :**
- Uniquement `process.env.SMTP_PASS` dans le code
- Jamais de valeur en dur

---

## 📝 Commandes de Vérification

```bash
# Vérifier que .env.local n'est pas tracké
git check-ignore .env.local
# Attendu: .env.local (confirmé ignoré)

# Vérifier le contenu de .env.local (sans afficher les secrets)
cat .env.local | sed 's/SMTP_PASS=.*/SMTP_PASS=***MASQUÉ***/'

# Tester localement
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","requestType":"Test","message":"Test local"}'
```

---

## 🎉 Validation Finale

Quand tout est OK :

✅ Ancien mot de passe révoqué  
✅ Nouveau mot de passe en place (local + Vercel)  
✅ Tests locaux passent  
✅ Tests production passent  
✅ Aucun secret dans Git  
✅ Formulaire fonctionne parfaitement  

**→ La rotation est terminée ! 🎉**

---

## 📖 Documents Connexes

- [RAPPORT_SECURITE_GITGUARDIAN.md](RAPPORT_SECURITE_GITGUARDIAN.md) - Analyse complète
- [DEBUG_PRODUCTION.md](DEBUG_PRODUCTION.md) - Debug en cas de problème
- [QUICKSTART.md](QUICKSTART.md) - Configuration initiale

---

**Dernière MAJ :** 15 janvier 2026  
**Temps estimé :** 10 minutes
