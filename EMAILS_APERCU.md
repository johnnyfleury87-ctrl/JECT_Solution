# 📨 Aperçu des Emails - Formulaire de Contact JETC

---

## 📧 Email 1 : Notification JETC

**Destinataire :** contact@jetc-immo.ch  
**Objet :** Nouvelle demande de contact – JETC

### Contenu (texte brut)

```
Nom : Jean Dupont
Email : jean.dupont@exemple.com
Entreprise : Dupont SA
Type de demande : Site web / plateforme

Message :
Bonjour,

Je souhaite développer un site web pour ma société.
Pouvons-nous en discuter ?

Cordialement,
Jean
```

### Caractéristiques
- ✅ Format texte clair et lisible
- ✅ Toutes les informations du formulaire
- ✅ "Entreprise : Non renseignée" si non fournie
- ✅ Reply-to configuré vers l'email du client
- ✅ Retours à la ligne préservés dans le message

---

## 📬 Email 2 : Accusé de Réception Client

**Destinataire :** jean.dupont@exemple.com  
**Objet :** JETC – Nous avons bien reçu votre demande

### Contenu

```
Bonjour Jean Dupont,

Nous avons bien reçu votre message et vous remercions pour l'intérêt porté à JETC.

Votre demande a été transmise et sera analysée dans les plus brefs délais.
Nous reviendrons vers vous rapidement si des informations complémentaires sont nécessaires.

Cordialement,

L'équipe JETC
contact@jetc-immo.ch
```

### Caractéristiques
- ✅ Personnalisé avec le nom du client
- ✅ Ton professionnel et rassurant
- ✅ Confirme la réception
- ✅ Pas de promesse de délai précis
- ✅ Email de contact visible

---

## 🔄 Flux d'Envoi

```
Client remplit le formulaire
         ↓
Soumission du formulaire
         ↓
Validation des données
         ↓
    ┌─────────────────────┐
    │  Envoi simultané    │
    │  (Promise.all)      │
    └─────────┬───────────┘
              │
      ┌───────┴───────┐
      ↓               ↓
Email JETC      Email Client
(notification)   (accusé)
      ↓               ↓
contact@        client@
jetc-immo.ch    exemple.com
```

---

## 📋 Tableau Récapitulatif

| Aspect | Email JETC | Email Client |
|--------|------------|--------------|
| **Destinataire** | contact@jetc-immo.ch | Email du client |
| **Objet** | Nouvelle demande de contact – JETC | JETC – Nous avons bien reçu votre demande |
| **Type** | Notification | Confirmation |
| **Contenu** | Toutes les infos du formulaire | Message de remerciement |
| **Reply-to** | Email du client | contact@jetc-immo.ch |
| **Format** | Texte brut | Texte brut |

---

## 🎯 Exemples selon les Types de Demande

### Type : "Site web / plateforme"

**Email JETC :**
```
Type de demande : Site web / plateforme
```

### Type : "Amélioration ou optimisation existante"

**Email JETC :**
```
Type de demande : Amélioration ou optimisation existante
```

### Type : "Besoin métier concret"

**Email JETC :**
```
Type de demande : Besoin métier concret
```

### Type : "Discussion / échange"

**Email JETC :**
```
Type de demande : Discussion / échange
```

### Type : "Autre"

**Email JETC :**
```
Type de demande : Autre
```

---

## 💡 Cas Particuliers

### Sans entreprise

**Email JETC :**
```
Nom : Jean Dupont
Email : jean.dupont@exemple.com
Entreprise : Non renseignée
Type de demande : Discussion / échange
...
```

### Avec entreprise

**Email JETC :**
```
Nom : Jean Dupont
Email : jean.dupont@exemple.com
Entreprise : Dupont SA
Type de demande : Site web / plateforme
...
```

### Message multi-lignes

**Email JETC :**
```
Message :
Ligne 1 du message
Ligne 2 du message
Ligne 3 du message
```

Les retours à la ligne sont préservés.

---

## 🧪 Test des Emails

### Comment tester en local

1. Configurez `.env.local` avec les vraies credentials
2. Lancez `npm run dev`
3. Remplissez le formulaire avec **votre email personnel** dans le champ Email
4. Soumettez

**Vous recevrez :**
- ✅ L'accusé de réception sur votre email personnel
- ✅ La notification dans contact@jetc-immo.ch

### Vérifications à faire

#### Dans l'email JETC :
- [ ] Objet correct
- [ ] Nom du client visible
- [ ] Email du client cliquable
- [ ] Entreprise (ou "Non renseignée")
- [ ] Type de demande
- [ ] Message complet
- [ ] Reply-to fonctionne (cliquer Répondre)

#### Dans l'email client :
- [ ] Objet correct
- [ ] Personnalisation avec le nom
- [ ] Ton professionnel
- [ ] Contact visible
- [ ] Pas de fautes d'orthographe

---

## 📊 Statistiques d'Envoi

| Métrique | Valeur |
|----------|--------|
| Nombre d'emails par soumission | 2 |
| Temps moyen d'envoi | < 3 secondes |
| Format | Texte brut |
| Taille moyenne | ~500 bytes |
| Provider SMTP | Infomaniak |
| Port | 587 (STARTTLS) |

---

## 🔐 Sécurité et Confidentialité

### Ce qui est envoyé
- ✅ Nom complet
- ✅ Email
- ✅ Entreprise (optionnel)
- ✅ Type de demande
- ✅ Message

### Ce qui n'est PAS envoyé
- ❌ Pas d'IP du client
- ❌ Pas de données de navigation
- ❌ Pas de cookies
- ❌ Pas de user-agent
- ❌ Pas de timestamp précis
- ❌ Pas de données sensibles

### Stockage
- ❌ Aucun message n'est stocké en base de données
- ✅ Seul le provider email (Infomaniak) conserve les emails

---

## ✨ Améliorations Futures Possibles

### Email HTML (optionnel)
Ajouter une version HTML des emails avec :
- Logo JETC
- Mise en forme professionnelle
- Bouton "Répondre"

### Template Variables
Créer des fichiers de templates :
- `templates/email-jetc.txt`
- `templates/email-client.txt`

### Personnalisation par Type
Adapter le message d'accusé selon le type de demande.

---

**Note :** Les emails sont volontairement en texte brut pour :
- ✅ Compatibilité maximale
- ✅ Pas de filtre anti-spam
- ✅ Lisibilité optimale
- ✅ Charge minimale

---

**Dernière mise à jour :** 15 janvier 2026
