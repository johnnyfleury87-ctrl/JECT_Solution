# 🔧 Guide de Debug - Erreur 500 Production (RÉSOLU)

## ❌ Problème Initial
Erreur 500 sur POST https://jetc-solution.vercel.app/api/contact en production.

---

## ✅ Corrections Appliquées

### 1️⃣ Vérification des Variables d'Environnement
L'API vérifie maintenant au démarrage que toutes les variables SMTP sont présentes :
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`

**Si manquante :** Retourne 500 avec `{ ok: false, error: 'smtp_env_missing' }`

### 2️⃣ Logs de Debug Détaillés
Tous les logs incluent maintenant le préfixe `[contact api]` pour faciliter la recherche dans Vercel :

```
[contact api] POST called
[contact api] Env vars check: { hasHost: true, hasPort: true, ... }
[contact api] Form data received: { hasName: true, ... }
[contact api] Creating SMTP transporter: { host: 'mail.infomaniak.com', ... }
[contact api] Sending emails to: { jetc: '...', client: '...' }
[contact api] Emails sent successfully
```

**⚠️ Aucun secret n'est loggé** (pas de `SMTP_PASS`)

### 3️⃣ Gestion d'Erreurs Améliorée
Chaque type d'erreur a maintenant un code et un status HTTP approprié :

| Erreur | Code | Status | Message |
|--------|------|--------|---------|
| Variables SMTP manquantes | `smtp_env_missing` | 500 | Configuration SMTP manquante |
| JSON invalide | `invalid_json` | 400 | Données invalides |
| Champs manquants | `missing_fields` | 400 | Champs obligatoires manquants |
| Email invalide | `invalid_email` | 400 | Email invalide |
| Échec SMTP | `smtp_failed` | 502 | Erreur lors de l'envoi |
| Erreur inattendue | `unexpected_error` | 500 | Erreur inattendue |

### 4️⃣ Configuration SMTP Robuste
```javascript
const port = Number(SMTP_PORT);
const smtpConfig = {
  host: SMTP_HOST,
  port: port,
  secure: port === 465, // Auto-détection 465 vs 587
  auth: { user: SMTP_USER, pass: SMTP_PASS },
  tls: { rejectUnauthorized: true },
};
```

### 5️⃣ Endpoint de Test GET
**Nouveau :** `GET /api/contact` retourne maintenant l'état des variables :

```json
{
  "ok": true,
  "message": "Contact API is reachable",
  "env_check": {
    "SMTP_HOST": true,
    "SMTP_PORT": true,
    "SMTP_USER": true,
    "SMTP_PASS": true,
    "SMTP_FROM": true
  }
}
```

**⚠️ À supprimer après validation !**

---

## 🧪 Comment Tester

### Test 1 : Endpoint de test (GET)
```bash
curl https://jetc-solution.vercel.app/api/contact
```

**Attendu :**
```json
{
  "ok": true,
  "message": "Contact API is reachable",
  "env_check": {
    "SMTP_HOST": true,
    "SMTP_PORT": true,
    "SMTP_USER": true,
    "SMTP_PASS": true,
    "SMTP_FROM": true
  }
}
```

**Si false :** Les variables ne sont pas configurées ou nécessitent un redéploiement.

### Test 2 : Envoi réel (POST)
```bash
curl -X POST https://jetc-solution.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Debug",
    "email": "votre-email@test.com",
    "requestType": "Test",
    "message": "Test de debug production"
  }'
```

**Attendu :**
```json
{
  "ok": true,
  "message": "Emails envoyés avec succès"
}
```

### Test 3 : Consulter les logs Vercel
1. Allez dans votre projet Vercel
2. **Functions** (ou **Runtime Logs**)
3. Filtrez par `[contact api]`
4. Vérifiez les logs :

```
[contact api] POST called
[contact api] Env vars check: ...
[contact api] Form data received: ...
[contact api] Creating SMTP transporter: ...
[contact api] Sending emails to: ...
[contact api] Emails sent successfully ✅
```

---

## 🚨 Troubleshooting

### Problème 1 : Variables env_check à false

**Cause :** Variables d'environnement non configurées ou non prises en compte

**Solution :**
1. Vérifiez dans Vercel > Settings > Environment Variables
2. Assurez-vous que les 5 variables sont présentes
3. **Redéployez** (important !)
   - Allez dans Deployments
   - Cliquez "..." sur le dernier déploiement
   - "Redeploy"

### Problème 2 : smtp_env_missing

**Cause :** Variables manquantes au runtime

**Solution :**
- Même solution que Problème 1
- Vérifiez qu'elles sont configurées pour **Production** (pas seulement Preview/Development)

### Problème 3 : smtp_failed

**Cause :** Connexion SMTP échoue

**Logs à vérifier :**
```
[contact api] SMTP send error: {
  message: "...",
  code: "...",
  response: "..."
}
```

**Solutions possibles :**
- Mot de passe Infomaniak incorrect
- Compte Infomaniak bloqué/suspendu
- Port 587 bloqué par Vercel (peu probable)
- Vérifier les credentials Infomaniak

### Problème 4 : invalid_json

**Cause :** Données envoyées ne sont pas du JSON valide

**Solution :**
- Vérifiez le header `Content-Type: application/json`
- Vérifiez la structure du body

### Problème 5 : missing_fields

**Cause :** Champs obligatoires manquants

**Solution :**
- Assurez-vous d'envoyer : `name`, `email`, `requestType`, `message`
- Le champ `company` est optionnel

---

## 📋 Checklist de Résolution

### Étape 1 : Redéployer
- [ ] Allez dans Vercel > Deployments
- [ ] Redéployez le dernier commit
- [ ] Attendez la fin du build

### Étape 2 : Tester l'endpoint GET
```bash
curl https://jetc-solution.vercel.app/api/contact
```
- [ ] Tous les env_check sont `true`

### Étape 3 : Tester un POST
```bash
curl -X POST https://jetc-solution.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","requestType":"Test","message":"Test message de debug"}'
```
- [ ] Status 200
- [ ] `{ "ok": true }`

### Étape 4 : Vérifier les emails
- [ ] Email reçu dans contact@jetc-immo.ch
- [ ] Accusé reçu sur test@test.com

### Étape 5 : Consulter les logs
- [ ] Logs Vercel affichent `[contact api] Emails sent successfully`

### Étape 6 : Tester depuis le formulaire web
- [ ] https://jetc-solution.vercel.app/contact
- [ ] Remplir et soumettre
- [ ] Message de succès affiché
- [ ] Emails reçus

---

## 🔍 Commandes de Debug

### Tester en local avec les mêmes env vars
```bash
# Dans .env.local, utilisez les mêmes valeurs que Vercel
npm run dev

# Testez
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Local","email":"test@test.com","requestType":"Test","message":"Test local"}'
```

### Voir les logs Vercel en temps réel
```bash
# Installez Vercel CLI si pas déjà fait
npm i -g vercel

# Connectez-vous
vercel login

# Voir les logs en live
vercel logs jetc-solution --follow
```

---

## ✅ Validation Finale

Une fois tout fonctionnel :

1. **Supprimer l'endpoint GET de test**
   - Modifier [app/api/contact/route.js](../app/api/contact/route.js)
   - Supprimer la fonction `export async function GET()`
   - Ou la remplacer par :
   ```javascript
   export async function GET() {
     return NextResponse.json(
       { error: 'Méthode non autorisée' },
       { status: 405 }
     );
   }
   ```

2. **Réduire les logs** (optionnel)
   - Garder les logs d'erreur
   - Retirer les logs de succès si vous voulez

3. **Tester une dernière fois**

---

## 📊 Résumé des Changements

| Aspect | Avant | Après |
|--------|-------|-------|
| Vérification env | ❌ Non | ✅ Oui |
| Logs debug | ⚠️ Minimal | ✅ Complet |
| Codes d'erreur | ⚠️ Générique | ✅ Spécifique |
| Status HTTP | ⚠️ 500 pour tout | ✅ 400/500/502 |
| Endpoint test | ❌ Non | ✅ GET temporaire |
| Config SMTP | ⚠️ Basique | ✅ Robuste |
| Messages client | ⚠️ Vague | ✅ Clair |

---

**Date de correction :** 15 janvier 2026  
**Statut :** ✅ Corrections appliquées - À tester sur Vercel
