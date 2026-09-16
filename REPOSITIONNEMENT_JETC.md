# Repositionnement JETC Solution — Mémoire de mission

> Ce fichier est la mémoire permanente de la mission de repositionnement du site JETC Solution.
> Il doit être relu avant chaque nouvelle étape et mis à jour après chaque implémentation validée.

## 1. Objectif général

Repositionner progressivement le site vitrine JETC Solution (contenu, discours, structure de page)
sans dégrader l'existant : conserver le design, l'identité visuelle, le fonctionnement responsive,
la sécurité en place, et sans jamais inventer de partenaires, chiffres, résultats, témoignages ou
certifications non validés.

## 2. Décisions validées

- Aucune décision de contenu/repositionnement n'est encore validée à ce stade (étape 1 = cadrage uniquement).
- Aucune modification du site n'a été effectuée pendant cette étape.

## 3. Liste complète des étapes

| # | Étape | Statut |
|---|-------|--------|
| 1 | Inspection du projet, de l'état Git, des composants de la page d'accueil, des routes et des commandes de validation. Création du fichier de suivi. | ✅ Fait |
| 2 | (à définir avec l'utilisateur) | ⏳ À venir |

## 4. Fichiers modifiés à chaque étape

### Étape 1
- Création de `REPOSITIONNEMENT_JETC.md` (nouveau fichier, aucun autre fichier touché).

## 5. Textes définitifs intégrés

_Aucun texte définitif validé pour l'instant._

## 6. Tests réalisés et leurs résultats

_Aucun test exécuté à cette étape (aucune modification de code)._

## 7. Points restant à traiter

- Définir avec l'utilisateur le contenu exact du repositionnement (message, cible, arguments,
  sections impactées).
- Étape 2 et suivantes à planifier une fois les décisions de contenu validées.

## 8. Hash des commits

| Étape | Hash | Message |
|-------|------|---------|
| 1 | `67223ad`* | docs: init suivi repositionnement JETC |

\* auto-référence impossible (le hash change dès qu'on l'inscrit) : voir `git log --oneline -1`
pour le hash exact du commit courant de cette étape.

---

## Annexe — État du projet au démarrage (étape 1)

### Git

- Branche courante : `chore/repository-cleanup-security-audit`
- Suivi de `origin/chore/repository-cleanup-security-audit`, à jour, aucune modification en attente
  (`working tree clean`).
- Derniers commits :
  - `0e35ce0` security: update Next.js to patched version
  - `994390a` security: harden contact form validation
  - `2d9c80b` chore: reorganize repository documentation
  - `6045d4e` (origin/main, origin/HEAD, main) vitese
  - `9a71e48` image

### Commandes disponibles (package.json)

- `npm run dev` — serveur de développement Next.js
- `npm run build` — build de production Next.js
- `npm run start` — démarrage en mode production
- `npm run lint` — `next lint`
- `npm run test:security` — tests sécurité Node (`security/tests/*.test.mjs`)

Stack : Next.js 15 (App Router), React 18, Tailwind CSS, framer-motion, lucide-react,
@vercel/analytics, nodemailer, @upstash/redis.

### Page d'accueil (`app/page.js`)

Composition actuelle (ordre d'affichage) :
1. `Hero`
2. `Solutions`
3. `Signature`
4. `WorkProcess`
5. `Projects`
6. `ImageCarousel`
7. `Benefits`
8. `Pricing`
9. `ContactCTA`

`app/layout.js` encapsule toutes les pages avec : `PingClient`, un bandeau d'annonce
("Entreprise prête, ouverture officielle prochainement."), `Navbar`, `<main>`, `Footer`,
et `Analytics` (Vercel).

### Composants (`components/`)

`Benefits.js`, `ContactCTA.js`, `ContactForm.js`, `Footer.js`, `Hero.js`, `ImageCarousel.js`,
`Navbar.js`, `PingClient.js`, `Pricing.js`, `ProjectModal.js`, `Projects.js`, `Signature.js`,
`Solutions.js`, `StatsWidget.js`, `WorkProcess.js`.

### Routes existantes (`app/`)

- `/` — page d'accueil (`app/page.js`)
- `/contact` — `app/contact/page.js`
- `/confidentialite` — `app/confidentialite/page.js`
- API :
  - `app/api/active/route.js`
  - `app/api/contact/route.js`
  - `app/api/ping/route.js`
  - `app/api/stats/route.js`

### Sécurité / contraintes à respecter en continu

- Aucune migration Supabase (`0001` à `0006`) trouvée dans ce dépôt — règle « ne jamais y toucher »
  reste valable si elles apparaissent ailleurs/plus tard.
- Aucune authentification, session, cookie, rôle ou route admin identifiés dans le code actuel —
  à re-vérifier si un module de ce type apparaît.
- Aucune mention de "ProcSim", "SimWell" ou "Migros" trouvée dans le code actuel (recherche
  effectuée sur tout le dépôt) : à ne jamais introduire comme partenaire officiel / donnée
  confidentielle.
- Module sécurité présent : `utils/security/` (`contactValidation.js`, `guard.js`, `logger.js`,
  `monitor.js`, `rateLimit.js`, `responses.js`, `turnstile.js`) + `security/` (tests, architecture).
  Ne pas modifier sans nécessité liée au repositionnement.
