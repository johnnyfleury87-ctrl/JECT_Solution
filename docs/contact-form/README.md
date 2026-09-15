# Formulaire de contact

## Fonctionnement

Le formulaire public se trouve sur `/contact` et utilise :

- nom, adresse e-mail, entreprise facultative, type de demande et message ;
- validation côté navigateur et côté serveur ;
- Cloudflare Turnstile en production ;
- limitation des soumissions répétées ;
- envoi de deux messages texte : notification interne et accusé de réception.

Le traitement serveur est dans [app/api/contact/route.js](../../app/api/contact/route.js) et le composant dans [components/ContactForm.js](../../components/ContactForm.js).

## Configuration locale

```bash
cp .env.example .env.local
npm run dev
```

Les variables SMTP doivent être créées dans `.env.local` ou dans Vercel. Les valeurs réelles ne doivent jamais être ajoutées au dépôt, aux captures d’écran ou aux logs.

Variables serveur utilisées par le code :

| Variable | Usage |
|---|---|
| `SMTP_HOST` | Hôte SMTP |
| `SMTP_PORT` | Port SMTP |
| `SMTP_USER` | Identifiant SMTP |
| `SMTP_PASS` | Secret SMTP |
| `SMTP_FROM` | Expéditeur |
| `CONTACT_RECEIVER_EMAIL` | Destinataire interne facultatif |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Clé publique Turnstile uniquement |
| `TURNSTILE_SECRET_KEY` | Secret Turnstile serveur uniquement |

Ne jamais utiliser de préfixe `NEXT_PUBLIC_` pour un secret.

## Déploiement Vercel

Ajouter les variables nécessaires dans **Settings > Environment Variables**, pour les environnements concernés, puis redéployer. La configuration Vercel n’est pas stockée dans ce dépôt.

## Essai sans message réel

Les tests de validation et de sécurité peuvent être exécutés sans envoyer de message :

```bash
npm run lint
npm run test:security
```

Pour tester l’envoi réel, utiliser uniquement une boîte de test autorisée et les variables locales appropriées. Ne pas ajouter de commande de diagnostic qui affiche les variables d’environnement.

## Contenu des e-mails

La notification interne contient le nom, l’e-mail, l’entreprise si fournie, le type de demande et le message. L’accusé de réception confirme la prise en compte de la demande. Les messages sont envoyés en texte brut et ne sont pas stockés par l’application.

La notification utilise l’objet `Nouvelle demande de contact – JETC` et l’accusé de réception `JETC – Nous avons bien reçu votre demande`. L’adresse du visiteur est utilisée comme `replyTo` pour faciliter la réponse, sans devenir l’expéditeur SMTP. Une soumission produit deux messages au maximum ; les retours à la ligne du message sont conservés.

Les cas particuliers à vérifier sont : entreprise absente, chacun des cinq types de demande, message à plusieurs lignes et adresse e-mail de réponse. Les exemples de contenu de l’ancien document d’aperçu sont conservés dans l’archive, sans valeur SMTP réelle.

Les cas à vérifier sont détaillés dans [docs/contact-form/TESTS_FORMULAIRE.md](./TESTS_FORMULAIRE.md).
Les cas à vérifier sont détaillés dans [TESTS_FORMULAIRE.md](./TESTS_FORMULAIRE.md).