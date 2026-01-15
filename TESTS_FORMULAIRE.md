# 🧪 Guide de Test - Formulaire de Contact

## ✅ Checklist de test complète

---

## 1️⃣ Test Local (Développement)

### Pré-requis
- [ ] Fichier `.env.local` créé avec les bonnes credentials
- [ ] Serveur de développement lancé (`npm run dev`)
- [ ] Navigateur ouvert sur http://localhost:3000/contact

### Tests fonctionnels

#### Test 1 : Soumission réussie
```
Données :
- Nom : Jean Dupont
- Email : votre.email@test.com
- Entreprise : Test SA
- Type : Site web / plateforme
- Message : Ceci est un message de test
```

**Attendu :**
- [ ] Message "Merci, votre message a bien été envoyé..."
- [ ] Formulaire réinitialisé (champs vides)
- [ ] Email reçu dans contact@jetc-immo.ch avec toutes les infos
- [ ] Accusé de réception reçu sur votre.email@test.com

#### Test 2 : Champs obligatoires
```
Action : Soumettre avec seulement le nom
```

**Attendu :**
- [ ] Le navigateur affiche "Ce champ est requis" sur les champs vides
- [ ] Le formulaire ne se soumet pas

#### Test 3 : Email invalide
```
Données :
- Nom : Jean Dupont
- Email : email-invalide
- Type : Autre
- Message : Test
```

**Attendu :**
- [ ] Message d'erreur "Email invalide"
- [ ] Formulaire ne se soumet pas

#### Test 4 : Entreprise optionnelle
```
Données :
- Nom : Jean Dupont
- Email : test@test.com
- Entreprise : (vide)
- Type : Discussion / échange
- Message : Test sans entreprise
```

**Attendu :**
- [ ] Soumission réussie
- [ ] Email reçu avec "Entreprise : Non renseignée"

#### Test 5 : Tous les types de demande
Testez chaque option du select :
- [ ] Site web / plateforme
- [ ] Amélioration ou optimisation existante
- [ ] Besoin métier concret
- [ ] Discussion / échange
- [ ] Autre

**Attendu :**
- [ ] Chaque type apparaît correctement dans l'email reçu

#### Test 6 : Message long
```
Message : Un message de plus de 500 caractères...
```

**Attendu :**
- [ ] Soumission réussie
- [ ] Message complet reçu (pas tronqué)

---

## 2️⃣ Test de Sécurité

#### Test 7 : Protection anti-spam
```
Action : Remplir le champ honeypot caché (via console navigateur)
document.querySelector('[name="honeypot"]').value = 'spam';
```

**Attendu :**
- [ ] Formulaire ne se soumet pas
- [ ] Pas d'email envoyé
- [ ] Console affiche "Bot détecté"

#### Test 8 : Injection HTML
```
Nom : <script>alert('test')</script>
Message : <img src=x onerror=alert('xss')>
```

**Attendu :**
- [ ] Soumission réussie
- [ ] Email reçu avec le texte brut (pas d'exécution de code)

---

## 3️⃣ Test UX/UI

#### Test 9 : États visuels
- [ ] État normal : bouton bleu "Envoyer le message"
- [ ] État loading : bouton grisé "Envoi en cours..."
- [ ] État succès : bandeau vert avec message
- [ ] État erreur : bandeau rouge avec message

#### Test 10 : Responsive
Testez sur différentes tailles :
- [ ] Mobile (375px)
- [ ] Tablette (768px)
- [ ] Desktop (1440px)

**Attendu :**
- [ ] Formulaire lisible et utilisable sur toutes les tailles

---

## 4️⃣ Test Email

#### Test 11 : Contenu email JETC
Vérifiez l'email reçu dans contact@jetc-immo.ch :
- [ ] Objet : "Nouvelle demande de contact – JETC"
- [ ] Nom du client présent
- [ ] Email du client présent (cliquable)
- [ ] Entreprise présente (ou "Non renseignée")
- [ ] Type de demande présent
- [ ] Message complet présent
- [ ] Retours à la ligne préservés

#### Test 12 : Accusé de réception client
Vérifiez l'email reçu par le client :
- [ ] Objet : "JETC – Nous avons bien reçu votre demande"
- [ ] Commence par "Bonjour {{nom}}"
- [ ] Ton professionnel
- [ ] Signature "L'équipe JETC"
- [ ] Email contact@jetc-immo.ch présent

#### Test 13 : Reply-to
Dans l'email reçu par JETC :
- [ ] Cliquer sur "Répondre" pré-remplit avec l'email du client

---

## 5️⃣ Test Production (Vercel)

### Pré-requis
- [ ] Variables d'environnement configurées dans Vercel
- [ ] Déploiement effectué

#### Test 14 : Formulaire en production
```
URL : https://votre-site.vercel.app/contact
```

Répétez les tests 1 à 5 en production :
- [ ] Test 1 : Soumission réussie ✅
- [ ] Test 2 : Champs obligatoires ✅
- [ ] Test 3 : Email invalide ✅
- [ ] Test 4 : Entreprise optionnelle ✅
- [ ] Test 5 : Tous les types ✅

#### Test 15 : Logs Vercel
Dans Vercel > Functions :
- [ ] Pas d'erreurs visibles
- [ ] Pas de logs sensibles (pas de mot de passe affiché)

---

## 6️⃣ Test de Performance

#### Test 16 : Temps de réponse
- [ ] Soumission prend moins de 5 secondes
- [ ] Message "Envoi en cours..." visible pendant le chargement

#### Test 17 : Simultanéité
Soumettez 3 formulaires en même temps :
- [ ] Tous les emails arrivent
- [ ] Pas d'erreur

---

## 7️⃣ Test d'Erreur

#### Test 18 : SMTP incorrect (à faire en dev)
Modifiez temporairement `.env.local` avec un mauvais mot de passe :
```
SMTP_PASS=mauvais_mot_de_passe
```

**Attendu :**
- [ ] Message d'erreur : "Une erreur est survenue..."
- [ ] Pas de crash de l'application
- [ ] Erreur loggée dans la console serveur

#### Test 19 : Sans connexion internet (dev)
Coupez votre connexion et soumettez :

**Attendu :**
- [ ] Message : "Erreur de connexion. Veuillez vérifier..."

---

## 8️⃣ Test de Validation Backend

Utilisez Postman ou curl pour tester l'API directement :

#### Test 20 : Champ manquant
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com"}'
```

**Attendu :**
- [ ] Status 400
- [ ] Message : "Tous les champs obligatoires doivent être remplis"

#### Test 21 : Nom trop court
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"A","email":"test@test.com","requestType":"Autre","message":"Test message long"}'
```

**Attendu :**
- [ ] Status 400
- [ ] Message : "Le nom doit contenir entre 2 et 100 caractères"

---

## ✅ Résumé des Tests

| Catégorie | Tests | Statut |
|-----------|-------|--------|
| Fonctionnels | 1-6 | ⏳ À faire |
| Sécurité | 7-8 | ⏳ À faire |
| UX/UI | 9-10 | ⏳ À faire |
| Email | 11-13 | ⏳ À faire |
| Production | 14-15 | ⏳ À faire |
| Performance | 16-17 | ⏳ À faire |
| Erreurs | 18-19 | ⏳ À faire |
| Validation | 20-21 | ⏳ À faire |

---

## 📋 Checklist Finale

Avant de considérer le formulaire validé :

- [ ] Tous les tests fonctionnels passent (1-6)
- [ ] Tests de sécurité OK (7-8)
- [ ] Tests email OK (11-13)
- [ ] Tests production OK (14-15)
- [ ] Aucune erreur dans les logs
- [ ] Client satisfait de l'UX

---

## 🔍 Commandes utiles pour tester

```bash
# Lancer le serveur dev
npm run dev

# Voir les logs en temps réel
# (dans un autre terminal)
tail -f .next/cache/webpack/server-development.log

# Build de production (pour tester avant deploy)
npm run build
npm start

# Tester l'API avec curl
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","requestType":"Autre","message":"Test message"}'
```

---

**Bon courage pour les tests ! 🚀**
