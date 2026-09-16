# Repositionnement JETC Solution — Mémoire de mission

> Ce fichier est la mémoire permanente de la mission de repositionnement du site JETC Solution.
> Il doit être relu avant chaque nouvelle étape et mis à jour après chaque implémentation validée.

## 1. Objectif général

Repositionner progressivement le site vitrine JETC Solution (contenu, discours, structure de page)
sans dégrader l'existant : conserver le design, l'identité visuelle, le fonctionnement responsive,
la sécurité en place, et sans jamais inventer de partenaires, chiffres, résultats, témoignages ou
certifications non validés.

## 2. Décisions validées

- Repositionnement de JETC Solution : passage d'un discours "agence de création de sites" à un
  discours "analyse opérationnelle, automatisation et simulation".
- Étape 1 de repositionnement = uniquement le bandeau d'annonce, l'accroche, le titre principal,
  le texte d'introduction, le bloc complémentaire, les CTA et les métadonnées de la page d'accueil
  (`components/Hero.js` + `app/layout.js`). Les autres sections (`Solutions`, `Signature`,
  `WorkProcess`, `Projects`, `ImageCarousel`, `Benefits`, `Pricing`, `ContactCTA`, `Navbar`,
  `Footer`) ne sont pas touchées.
- Aucune mention de Migros Online, RELEX, ProcSim ou SimWell à ce stade.
- Design, structure graphique, comportement responsive et carte identité (partie droite du Hero)
  conservés à l'identique.
- Étape 3 : actualisation de la section "parcours" (`components/Signature.js`). Le nom "RELEX"
  y est mentionné car il s'agit d'un logiciel de pilotage cité par l'utilisateur (pas un
  employeur, ni un client, ni un partenaire officiel) ; aucun employeur/client nommé, aucune
  donnée confidentielle, aucun montant d'économies affiché. "Six ans" remplacé par "près de huit
  ans" ; la formulation "je pilote le périmètre packing" est supprimée.
- Étape 4 : le projet "ProdOrga" (identifiant technique `id: 'prodorga'` conservé) est renommé
  publiquement "JETC OrgaPulse", statut "Pilote opérationnel". L'intitulé partagé "Impact mesuré
  / attendu" (utilisé par les 3 cartes projets) devient "Résultats évalués et fonctionnalités".
  Aucun résultat présenté comme définitif (formulation "estimée jusqu'à"), aucune entreprise
  d'accueil du projet citée, aucun partenaire externe cité. KPIs, features, screenshots, liens et
  logique de rendu du prototype non modifiés (seules les mentions textuelles publiques "ProdOrga"
  encore visibles à l'écran ont été harmonisées en "JETC OrgaPulse" pour éviter une incohérence
  de marque, sans toucher aux chemins de fichiers/assets ni aux identifiants internes).
- Étape 5 : ajout d'une 4e carte "Analyse & Simulation opérationnelle" (nouveau projet, id
  technique `analyse-simulation`) dans "Travaux & Projets en Cours". Aucun KPI ni résultat
  chiffré inventé (champs `kpis`/`features`/`screenshots` volontairement omis, ils sont
  conditionnels dans `ProjectModal.js`). Statut "Recherche d'un partenaire pilote" : aucune
  entreprise ni discussion externe décrite, aucun partenaire présenté comme acquis, aucun logo
  externe affiché. L'intitulé de la liste devient configurable par projet (`impactLabel`) pour
  permettre "Périmètre du pilote" sur cette carte sans changer le libellé partagé des 3 autres.
  Grille adaptée à 4 cartes (`grid-cols-1 md:grid-cols-2 xl:grid-cols-4`, `max-w-7xl`). Nouvel
  asset visuel `public/images/analyse-simulation-bg.svg` (illustration abstraite générique,
  aucun logo ni marque tierce).

## 3. Liste complète des étapes

| # | Étape | Statut |
|---|-------|--------|
| 1 | Inspection du projet, de l'état Git, des composants de la page d'accueil, des routes et des commandes de validation. Création du fichier de suivi. | ✅ Fait |
| 2 | Repositionnement de la page d'accueil : bandeau d'annonce, accroche, titre principal, texte
  d'introduction, bloc complémentaire, CTA et métadonnées (titre/description). | ✅ Fait |
| 3 | Actualisation de la section "parcours" de Johnny Fleury (`Signature.js`) : titre conservé,
  contenu remplacé, conclusion conservée. | ✅ Fait |
| 4 | Nouvelle présentation du projet "ProdOrga" renommé "JETC OrgaPulse" (`Projects.js` +
  `ProjectModal.js`) : statut, description, intitulé des résultats, liste de résultats et
  fonctionnalités, courte explication ajoutée. | ✅ Fait |
| 5 | Ajout d'une 4e carte projet "Analyse & Simulation opérationnelle" (recherche de partenaire
  pilote) et adaptation de la grille à 4 cartes. | ✅ Fait |
| 6 | (à définir avec l'utilisateur) | ⏳ À venir |

## 4. Fichiers modifiés à chaque étape

### Étape 1
- Création de `REPOSITIONNEMENT_JETC.md` (nouveau fichier, aucun autre fichier touché).

### Étape 2 — Repositionnement page d'accueil
- `app/layout.js` : texte du bandeau d'annonce + métadonnées globales (`title`, `description`).
- `components/Hero.js` : accroche au-dessus du titre, titre principal (`h1`), texte
  d'introduction, bloc complémentaire encadré, libellés des deux boutons CTA.

### Étape 3 — Section parcours (Signature)
- `components/Signature.js` : contenu des 4 paragraphes de la section "parcours" (titre `h2` et
  conclusion en italique conservés à l'identique ; signature "— Johnny Fleury, Fondateur JETC
  Solution" inchangée).

### Étape 4 — JETC OrgaPulse (ex-ProdOrga)
- `components/Projects.js` : `name`, `status`, `description`, `descriptionShort` (harmonisation
  du nom), `impact` (nouvelle liste de 5 éléments), nouveau champ `resultsNote` (courte
  explication affichée sur la carte), intitulé de section renommé ("Résultats évalués et
  fonctionnalités", partagé par les 3 cartes projets).
- `components/ProjectModal.js` : deux mentions textuelles publiques "ProdOrga" remplacées par
  "JETC OrgaPulse" (texte explicatif sous les captures d'écran + légende des captures).
  `id`, `kpis`, `features`, `screenshots`, `link` et logique de rendu non modifiés.

### Étape 5 — 4e carte projet (Analyse & Simulation opérationnelle)
- `components/Projects.js` : nouvel objet projet `analyse-simulation` ajouté en fin de tableau
  (titre, statut, description, `impactLabel`, liste "Périmètre du pilote", `resultsNote`, `link`
  de contact). Intitulé de section rendu configurable via `project.impactLabel` (fallback
  "Résultats évalués et fonctionnalités" pour les 3 cartes existantes, inchangé). Grille adaptée
  à 4 cartes (`grid-cols-1 md:grid-cols-2 xl:grid-cols-4`, conteneur élargi à `max-w-7xl`).
- `public/images/analyse-simulation-bg.svg` : nouveau fichier, illustration SVG abstraite
  (grille, barres, courbes, loupe) dans la palette violet/indigo, sans logo ni marque.

## 5. Textes définitifs intégrés

### Étape 2 — Page d'accueil

- Bandeau d'annonce (`app/layout.js`) :
  « JETC Solution entre en phase pilote — premières collaborations ouvertes. »
- Accroche au-dessus du titre (`components/Hero.js`) :
  « ANALYSE OPÉRATIONNELLE • AUTOMATISATION • SIMULATION »
- Titre principal (`components/Hero.js`, mot-clé "coûts cachés" mis en évidence en orange,
  identique au traitement visuel précédent) :
  « Rendez visibles vos coûts cachés. Testez vos décisions avant d'investir. »
- Texte d'introduction :
  « J'analyse vos flux, vos temps, vos ressources et vos outils existants afin d'identifier les
  pertes invisibles et de simuler différents scénarios d'amélioration. »
- Bloc complémentaire (encadré) :
  « Pas de solution générique ni de remplacement imposé : je m'appuie sur votre environnement
  existant pour construire une démarche mesurable, adaptée à la réalité du terrain. »
- CTA principal : « Étudier un processus » (lien `/contact`, inchangé).
- CTA secondaire : « Découvrir la méthode » (lien `/#process`, inchangé).
- Métadonnées (`app/layout.js`) :
  - Titre : « JETC Solution | Analyse opérationnelle, automatisation et simulation »
  - Description : « JETC Solution accompagne les entreprises dans l'analyse de leurs flux,
    l'identification des coûts cachés, l'automatisation des processus et la simulation de
    scénarios d'amélioration. »

### Étape 3 — Section parcours (`components/Signature.js`)

- Titre (`h2`, conservé à l'identique) : « Un parcours terrain, des solutions concrètes »
- Paragraphe 1 :
  « Mon parcours a commencé sur le terrain, de la restauration à la préparation de commandes,
  avant d'évoluer vers l'assistance opérationnelle, les ressources humaines, la coordination de
  projets, les achats indirects et la qualité. »
- Paragraphe 2 :
  « Depuis près de huit ans, j'évolue dans un environnement e-commerce alimentaire multi-sites
  comprenant plus de 12 500 références, trois sites logistiques et un nouveau dépôt automatisé.
  Cette expérience m'a permis de développer une vision transversale des opérations : flux,
  ressources, qualité, coûts, approvisionnements et outils de pilotage. »
- Paragraphe 3 :
  « J'ai notamment piloté l'intégration dans RELEX de l'ensemble des achats indirects et du
  packaging de plusieurs entrepôts. Mon travail consiste à rendre visibles les pertes de temps,
  les déplacements inutiles, les erreurs et les coûts qui se cachent entre les différentes
  étapes d'un processus. »
- Paragraphe 4 :
  « JETC Solution est née de cette expérience : comprendre le terrain, structurer les données et
  construire des améliorations mesurables, sans imposer un nouvel outil lorsque l'existant peut
  être mieux exploité. »
- Conclusion (conservée à l'identique) : « Clarté, fiabilité, utilité réelle : ce sont mes
  priorités. »

### Étape 4 — JETC OrgaPulse (`components/Projects.js` + `components/ProjectModal.js`)

- Titre : « JETC OrgaPulse »
- Statut : « Pilote opérationnel »
- Description : « Solution d'analyse et d'organisation des opérations permettant de
  centraliser les données, visualiser la charge, structurer la planification et identifier les
  points de friction dans les flux de travail. »
- Intitulé de section (remplace « Impact mesuré / attendu », partagé par les 3 cartes projets) :
  « Résultats évalués et fonctionnalités »
- Liste de résultats et fonctionnalités :
  - « Réduction estimée jusqu'à 30 % du temps de planification »
  - « Visualisation de la charge et de l'activité »
  - « Centralisation des données horaires »
  - « Identification des temps morts et des contraintes »
  - « Comparaison de différents scénarios d'organisation »
- Courte explication (nouveau champ `resultsNote`, affichée sous la liste) :
  « JETC OrgaPulse s'appuie sur les données disponibles pour rendre l'activité compréhensible et
  faciliter les décisions opérationnelles. »

### Étape 5 — 4e carte projet (`components/Projects.js`)

- Titre : « Analyse & Simulation opérationnelle »
- Statut : « Recherche d'un partenaire pilote »
- Description (réutilisée comme `descriptionShort`, aucun texte supplémentaire inventé) :
  « Démarche d'analyse permettant de cartographier les flux, mesurer les temps et les capacités,
  identifier les coûts cachés et comparer plusieurs scénarios avant une décision
  d'investissement ou de réorganisation. »
- Intitulé de la liste (`impactLabel`, propre à cette carte) : « Périmètre du pilote »
- Éléments :
  - « Cartographie des flux et des contraintes »
  - « Identification des temps et coûts cachés »
  - « Mesure des capacités et des ressources »
  - « Comparaison de scénarios opérationnels »
  - « Évaluation avant et après expérimentation »
- Conclusion (`resultsNote`) :
  « L'objectif est de tester cette approche sur un périmètre réel et limité afin d'en mesurer
  concrètement la valeur. »
- CTA : « Échanger sur cette démarche » (lien `#contact`, même modèle que le CTA "contact"
  déjà utilisé par JETC OrgaPulse).
- Aucun KPI, aucune fonctionnalité détaillée ni capture d'écran ajoutés (champs volontairement
  omis pour ne créer aucun résultat chiffré ni contenu non fourni).

## 6. Tests réalisés et leurs résultats

### Étape 2
- `npm run lint` → OK. Seul avertissement préexistant, non lié à cette étape
  (`components/ProjectModal.js:156` — usage de `<img>` au lieu de `next/image`).
- `npm run test:security` → 33/33 tests passés (7 suites), 0 échec.
- `npm run build` → build de production réussi (`✓ Compiled successfully`), 8 pages générées,
  route `/` = 13 kB / 159 kB First Load JS. Aucune régression détectée.

### Étape 3
- `npm run lint` → OK. Même avertissement préexistant non lié (`components/ProjectModal.js:156`).
- `npm run test:security` → 33/33 tests passés (7 suites), 0 échec.
- `npm run build` → build de production réussi, 8 pages générées, route `/` = 13 kB / 159 kB
  First Load JS (taille identique à l'étape précédente). Aucune régression détectée.
- Équilibre visuel texte/image vérifié : la grille `items-center` de `Signature.js` centre
  verticalement la photo (aspect carré) et le logo en incrustation par rapport au bloc de texte,
  désormais un peu plus long (4 paragraphes + conclusion) ; structure et classes Tailwind
  inchangées, aucun ajustement de mise en page nécessaire.

### Étape 4
- `npm run lint` → OK. Même avertissement préexistant non lié (`components/ProjectModal.js:156`).
- `npm run test:security` → 33/33 tests passés (7 suites), 0 échec.
- `npm run build` → build de production réussi, 8 pages générées, route `/` = 13,1 kB / 160 kB
  First Load JS (légère hausse de 0,1 kB liée aux 2 éléments de texte supplémentaires dans le
  bundle statique). Aucune régression détectée.

### Étape 5
- `npm run lint` → OK. Même avertissement préexistant non lié (`components/ProjectModal.js:156`).
- `npm run test:security` → 33/33 tests passés (7 suites), 0 échec.
- `npm run build` → build de production réussi, 8 pages générées, route `/` = 13,5 kB / 160 kB
  First Load JS. Aucune régression détectée.
- Rendu responsive : vérifié par analyse des classes Tailwind (aucun outil de capture
  d'écran/navigateur disponible dans cet environnement) : `grid-cols-1` (mobile, 1 colonne
  empilée), `md:grid-cols-2` (tablette et petits ordinateurs portables, grille 2x2 sans carte
  orpheline), `xl:grid-cols-4` (grands écrans, les 4 cartes sur une ligne). Container élargi
  (`max-w-7xl`) pour laisser respirer les 4 cartes en ligne. À confirmer visuellement par
  l'utilisateur sur son propre navigateur/appareils si possible.

## 7. Points restant à traiter

- Repositionner les autres sections de la page d'accueil (`Solutions`, `WorkProcess`, `Benefits`,
  `Pricing`, `ContactCTA`) si demandé dans une étape suivante.
- Vérifier si `Navbar`/`Footer` ou les pages `/contact` et `/confidentialite` nécessitent un
  alignement avec le nouveau discours (à valider avec l'utilisateur).
- Les KPIs affichés dans le modal (`kpis` : "-30% vs Excel manuel", "100% fiables", etc.) restent
  formulés comme des résultats fermes plutôt qu'estimés ; non modifiés à l'étape 4 car non
  demandé explicitement, mais à harmoniser avec la formulation "estimée" si une étape future le
  demande.
- Les deux autres projets ("JETC Immo", "Traçabilité & Spotting Produits") n'ont pas été revus à
  cette étape ; leur section utilise désormais aussi l'intitulé "Résultats évalués et
  fonctionnalités" (changement de libellé partagé).
- Vérification visuelle du rendu responsive (mobile/tablette/ordinateur) de la nouvelle grille à
  4 cartes non effectuée dans un vrai navigateur (aucun outil de capture d'écran disponible) :
  seule une analyse des classes Tailwind a été faite. À confirmer par l'utilisateur.
- Étapes suivantes à définir avec l'utilisateur.

## 8. Hash des commits

| Étape | Hash | Message |
|-------|------|---------|
| 1 | `7fee2d0` | docs: init suivi repositionnement JETC |
| 2 | `f4523fa` | feat: repositionnement hero page d'accueil (analyse operationnelle, automatisation, simulation) |
| 3 | `391df91` | feat: actualisation section parcours Johnny Fleury |
| 4 | `2748968` | feat: repositionnement JETC OrgaPulse (ex-ProdOrga) |
| 5 | `6f66225`* | feat: ajout carte Analyse & Simulation opérationnelle |

\* auto-référence impossible (le hash change dès qu'on l'inscrit dans le fichier qu'il décrit) :
faire foi de `git log --oneline -1` pour le hash exact du commit courant de chaque étape.

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
