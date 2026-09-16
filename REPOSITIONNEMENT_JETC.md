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
- Étape 6 : clarification des résultats/estimations/objectifs sur les 4 cartes projets.
  L'intitulé de section devient spécifique à chaque projet (`impactLabel`) : "Résultats évalués
  et fonctionnalités" (JETC OrgaPulse, valeur par défaut), "Objectifs de conception" (JETC
  Immo), "Objectifs du prototype" (Traçabilité), "Périmètre du pilote" (Analyse & Simulation,
  inchangé). Suppression de l'affirmation "100% fiables" (KPI JETC OrgaPulse) et du
  pourcentage "~60%" (KPI JETC Immo, remplacé par une formulation qualitative sans chiffre,
  par cohérence avec le libellé public modifié sur la même carte). Les éléments de
  Traçabilité sont reformulés comme des objectifs recherchés (verbes "viser", "contribuer à",
  "faciliter") plutôt que des résultats acquis. Aucun nouveau pourcentage créé, aucune
  entreprise tierce citée. Ajout d'une note de qualification globale sous les 4 cartes.
- Étape 7 : inventaire des images existantes (`public/image/image1-7.png` pour le carrousel
  "Nos réalisations", `public/images/prodorga/*.png` utilisées séparément dans le modal JETC
  OrgaPulse). Aucune n'affiche de nom d'entreprise, de logo externe ou de donnée confidentielle ;
  les noms de personnes visibles ("Jean Dupont", "Marie Curie", "Élodie Martin", etc.) sont des
  données de démonstration synthétiques. Réorganisation du carrousel `ImageCarousel.js` selon le
  nouvel ordre imposé (JETC OrgaPulse en premier, JETC Immo n'est plus la première image).
  Chaque diapositive est désormais qualifiée (titre, catégorie, description, statut parmi
  "Prototype"/"Pilote opérationnel"/"Solution déployée"/"Développement en cours"). Aucune fausse
  capture inventée : les diapositives "Application QHSE" et "Traçabilité des produits", pour
  lesquelles aucune vraie capture n'existe, utilisent des visuels graphiques neutres (nouveau
  `public/images/qhse-visual.svg` + réutilisation de `public/images/tracabilite-bg.svg`).
  Aucun fichier existant supprimé (`image2.png` et `image5.png` conservés mais non utilisés dans
  le carrousel actuel). Contrôles du carrousel conservés ; navigation clavier renforcée
  (flèches gauche/droite sur la zone `region`) ; textes alternatifs rendus descriptifs.
- Étape 8 : refonte de "Pourquoi nous choisir ?" (`Benefits.js`, 5 nouveaux axes remplacent les
  4 arguments génériques "agence web"/SEO) et de "Une logique simple : vous gagnez, je gagne"
  (`Pricing.js`, 3 étapes de démarche remplacent les 3 anciens "forfaits" tarifaires). Suppression
  de "Contribution mensuelle légère", "Solution installée et utilisable immédiatement" et de
  toute promesse de rapidité non démontrée (ces éléments disparaissent avec le remplacement
  complet du tableau `pricingExamples`). Nouvelle phrase de clôture sur le périmètre/la
  rémunération définis à l'avance. Section "Ce que JETC ne fait pas" conservée sans modification
  (non concernée par la demande, contenu déjà conforme). Aucune entreprise tierce citée.
- Étape 9 : cohérence page Contact + pied de page. Bandeau/introduction de `app/contact/page.js`
  alignés sur le discours "phase pilote". Types de demande du formulaire (`ContactForm.js`)
  remplacés (7 nouvelles options). Puisque la liste blanche `ALLOWED_REQUEST_TYPES` de
  `utils/security/contactValidation.js` doit correspondre exactement aux options du
  formulaire (sinon toute soumission serait rejetée), elle a été mise à jour avec les 7 mêmes
  libellés ; il s'agit d'une mise à jour de contenu (liste de valeurs autorisées), pas d'une
  modification de la logique d'envoi/anti-abus (rate limiting, honeypot, Turnstile, Nodemailer
  inchangés). Les fixtures des tests de sécurité (`security/tests/contactRoute.test.mjs`,
  `security/tests/contactValidation.test.mjs`) ont été alignées sur les nouveaux types pour
  éviter une régression des tests ; une assertion supplémentaire vérifie qu'un ancien type
  ("Discussion") est désormais rejeté. CTA harmonisés : "Étudier un processus" et "Découvrir la
  méthode" (Hero, déjà conformes, inchangés), "Présenter votre situation" (ContactCTA, remplace
  "Nous contacter"), "Proposer un partenariat pilote" (carte Analyse & Simulation
  opérationnelle, remplace "Échanger sur cette démarche"). Pied de page (`Footer.js`) : phrase
  d'entreprise remplacée. Aucune entreprise tierce citée. Aucun envoi réel effectué (validation
  testée localement via `npm run test:security`).
- Étape 10 : création de la route `/mentions-legales` (8 sections demandées). Hébergeur
  identifié à partir de la configuration réelle du projet (`vercel.json`, dépendance
  `@vercel/analytics`, README de déploiement, liens de démo sur *.vercel.app) : Vercel Inc.
  L'adresse postale de l'hébergeur, non vérifiable avec certitude dans cet environnement, est
  signalée explicitement dans la page comme à confirmer par l'éditeur avant publication
  officielle (aucune information inventée présentée comme certaine). Aucun employeur, client ou
  partenaire cité dans les pages juridiques. Lien "Mentions légales" ajouté dans le pied de
  page à côté de "Confidentialite". Politique de confidentialité (`/confidentialite`) mise à
  jour (section "Destinataires des données") pour refléter les prestataires techniques réels
  identifiés dans le code (Vercel, SMTP, Cloudflare Turnstile si activé, Vercel Analytics,
  Upstash Redis) au lieu d'une formulation générique ; aucune logique de sécurité/backend
  modifiée, uniquement le texte descriptif.
- Étape 12 (Phase A) : remplacement de la voix « je » par une voix institutionnelle « nous »
  sur l'ensemble du site public (Hero, WorkProcess, Pricing, ProjectModal, page Contact).
  Exception volontaire : la section "parcours" de `Signature.js` présente l'expérience
  individuelle réelle de Johnny Fleury et a été réécrite à la 3e personne ("Le parcours du
  fondateur…", "Johnny Fleury évolue…", "Il a notamment piloté…", "Son travail consiste…",
  "ce sont ses priorités") plutôt que transformée artificiellement en "nous". La signature a
  été alignée sur le libellé exact demandé : « — Johnny Fleury, Fondateur de JETC Solution »
  (ajout du mot "de", absent du texte précédent). La carte identité interactive du Hero
  (survol/tactile) reste personnelle : « Passez la souris pour me découvrir » devient « Passez
  la souris pour découvrir le fondateur » (formulation imposée, pas de "nous") ; « Touchez pour
  voir la photo » et « Passez la souris pour voir la photo » restent inchangés (pas de "je").
  Les mentions légales (`app/mentions-legales/page.js`) conservent l'identité personnelle réelle
  de l'éditeur et du directeur de publication (Johnny Fleury), aucune modification nécessaire
  (aucune formulation en "je" n'y était présente). Aucun chiffre, résultat, entreprise tierce ou
  route API/Supabase/authentification modifié.
- Étape 11 : contrôle final complet (audit des 10 étapes précédentes selon 21 critères).
  Deux anomalies corrigées, strictement liées à la mission : (1) le KPI "Temps de
  planification : -30%" de JETC OrgaPulse (visible dans le modal) ne portait pas la même
  qualification d'estimation que l'item public équivalent ("estimée jusqu'à 30 %") — reformulé
  en "Jusqu'à -30% / estimation vs Excel manuel" ; (2) les cartes de "Travaux & Projets en
  Cours" (`Projects.js`, composant massivement modifié aux étapes 4/5/6/9) n'étaient pas
  accessibles au clavier (div cliquable sans `role`/`tabIndex`/gestion clavier) — ajout de
  `role="button"`, `tabIndex={0}`, gestion Entrée/Espace et focus visible, sans changement
  visuel. Aucune autre anomalie corrigible n'a été trouvée dans le périmètre de la mission ;
  les points ne relevant pas de régressions causées par la mission (ex. sections `Solutions`/
  `WorkProcess` non repositionnées, KPI "démo"/"estimation" de Traçabilité déjà qualifiés,
  accessibilité clavier de `Solutions.js` non touché par la mission) sont listés comme points
  restants nécessitant un arbitrage humain, pas corrigés d'office.

- Étape 12 (Phase A) : remplacement de la voix « je » par une voix institutionnelle « nous »
  sur l'ensemble du site public (Hero, WorkProcess, Pricing, ProjectModal, page Contact).
  Exception volontaire : la section "parcours" de `Signature.js` présente l'expérience
  individuelle réelle de Johnny Fleury et a été réécrite à la 3e personne ("Le parcours du
  fondateur…", "Johnny Fleury évolue…", "Il a notamment piloté…", "Son travail consiste…",
  "ce sont ses priorités") plutôt que transformée artificiellement en "nous". La signature a
  été alignée sur le libellé exact demandé : « — Johnny Fleury, Fondateur de JETC Solution »
  (ajout du mot "de", absent du texte précédent). La carte identité interactive du Hero
  (survol/tactile) reste personnelle : « Passez la souris pour me découvrir » devient « Passez
  la souris pour découvrir le fondateur » (formulation imposée, pas de "nous") ; « Touchez pour
  voir la photo » et « Passez la souris pour voir la photo » restent inchangés (pas de "je").
  Les mentions légales (`app/mentions-legales/page.js`) conservent l'identité personnelle réelle
  de l'éditeur et du directeur de publication (Johnny Fleury), aucune modification nécessaire
  (aucune formulation en "je" n'y était présente). Aucun chiffre, résultat, entreprise tierce ou
  route API/Supabase/authentification modifié.
- Étape 13 (Phase B) : diagnostic et fiabilisation de la chaîne d'envoi du formulaire de
  contact (`app/api/contact/route.js`). Constat : le code métier (validation, anti-spam,
  rate limiting, Turnstile, choix de l'expéditeur/destinataire/`replyTo`, absence d'exposition
  de secrets) était déjà conforme aux règles de sécurité avant cette étape — aucune fausse
  réussite n'était affichée, `from` = adresse professionnelle authentifiée (`SMTP_FROM`),
  `replyTo` = adresse du visiteur, destinataire = adresse professionnelle configurée
  (`CONTACT_RECEIVER_EMAIL`, repli sur `contact@jetc-immo.ch`). Deux fragilités réelles ont
  été corrigées : (1) l'envoi des deux emails (interne + accusé de réception) via `Promise.all`
  faisait échouer toute la demande si seul l'accusé de réception au visiteur échouait, alors que
  la demande était bien reçue par JETC — désormais l'email interne fait foi de la réussite et
  l'échec de l'accusé de réception est journalisé sans faire échouer la réponse ; (2) absence de
  timeouts sur le transport SMTP, pouvant bloquer la fonction serverless jusqu'au timeout de la
  plateforme au lieu d'une erreur claire et rapide — ajout de `connectionTimeout`,
  `greetingTimeout`, `socketTimeout`. Aucune validation, protection anti-abus ou vérification de
  sécurité désactivée ou affaiblie. Aucune migration Supabase, authentification, session, cookie,
  rôle ou route admin présents dans ce dépôt (reconfirmé). Cause la plus probable d'un
  éventuel échec en production : variables d'environnement manquantes ou incomplètes sur Vercel
  (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` obligatoires ; `TURNSTILE_SECRET_KEY`
  obligatoire en production sinon la vérification anti-bot échoue systématiquement par conception
  — comportement "fail-secure" documenté et volontaire, non modifié) — non vérifiable depuis cet
  environnement (aucun accès à Vercel/aux secrets réels, voir section 7).
- Étape 14 : harmonisation des noms de projets, réécriture de la section "parcours" et
  correction de la carte du fondateur. Renommage public : « Traçabilité & Spotting Produits »
  → **JETC TracePilot** (badge « Prototype », inchangé) ; « Analyse & Simulation
  opérationnelle » → **JETC FlowPilot** (badge « Recherche d'une entreprise partenaire »,
  reformulé pour ne plus répéter le mot "pilote" déjà présent dans le nom). « JETC OrgaPulse »
  et « JETC Immo » conservés à l'identique. Identifiants techniques internes `id: 'tracabilite'`
  et `id: 'analyse-simulation'` volontairement conservés (jamais affichés publiquement, utilisés
  uniquement comme clés React/logique conditionnelle ; les renommer aurait un risque
  fonctionnel sans bénéfice public). Le terme "Spotting Produits" ne subsiste nulle part.
  Section "parcours" (`Signature.js`) entièrement réécrite à la 3e personne (nouveau titre,
  nouveau texte) selon le texte exact fourni. Ancienne phrase de clôture générique de la
  section "Notre Vision" (`Solutions.js`) remplacée par une citation attribuée à Johnny
  Fleury ; en conséquence, l'ancienne phrase de clôture et la signature isolée de
  `Signature.js` ont été supprimées (redondantes, Johnny Fleury étant déjà nommé dans le
  corps du texte et dans la nouvelle citation). Carte interactive du fondateur (`Hero.js`) :
  une seule indication (« Découvrez le fondateur »), interaction fonctionnelle à la souris, au
  clic, au toucher et au clavier (`role="button"`, `tabIndex={0}`, `onKeyDown` Entrée/Espace,
  anneau de focus visible). Aucune entreprise tierce citée, aucun chiffre ni résultat inventé,
  RELEX mentionné uniquement comme outil utilisé par Johnny Fleury (aucun partenariat
  commercial sous-entendu).

### Règles de rédaction validées à l'étape 14 (à respecter dans les prochaines étapes)
- Voix du site : le **« nous »** est réservé aux textes où JETC Solution s'exprime en tant
  qu'entreprise ou décrit sa coopération avec le client (Hero, WorkProcess, Pricing,
  ProjectModal, Contact, Solutions...). La **3e personne** (« Johnny Fleury », « il », « son
  parcours », « son expérience », « son travail ») est réservée au récit du parcours
  professionnel individuel de Johnny Fleury (`Signature.js`). Ne jamais mélanger les deux dans
  un même passage, ne jamais utiliser artificiellement "nous" pour raconter un vécu personnel.
- Ne jamais écrire « moi et mon équipe », ni laisser entendre l'existence d'une équipe
  permanente non établie (point de vigilance signalé en section 7 pour un contenu existant hors
  périmètre de cette étape : signature d'email "L'équipe JETC" dans `app/api/contact/route.js`).
- Une citation attribuée à Johnny Fleury (avec sa signature « — Johnny Fleury, fondateur de
  JETC Solution ») ne doit apparaître qu'une seule fois sur le site.
- Apostrophe typographique « ’ » et guillemets français « » à utiliser dans tout nouveau texte
  rédigé pour le site (règle appliquée aux textes modifiés par cette étape ; le reste du code
  existant, hors périmètre, n'a pas été retouché pour cette seule raison).
- La marque s'écrit toujours **JETC** (jamais « JECT »).

- Étape 18 (Phase C) : réparation et simplification du formulaire de contact. Cause exacte du
  `400 Bad Request` générique (« Données invalides. ») identifiée : le client
  (`components/ContactForm.js`) n'appliquait aucune validation de champ au-delà de l'attribut
  HTML `required` (pas de longueur minimale, pas de format d'email, pas de vérification du
  type de demande), alors que le serveur (`utils/security/contactValidation.js`) applique des
  règles strictes (nom ≥ 2 caractères, email au format valide, message ≥ 10 caractères, type de
  demande dans une liste fermée) et renvoyait volontairement un message générique unique pour
  ne jamais exposer sa logique de validation. Un utilisateur pouvait donc soumettre un
  formulaire « complet » selon le navigateur (ex. message de quelques caractères) et recevoir
  un rejet serveur sans aucune indication exploitable. Correction à la source : alignement
  strict des règles côté client sur les règles côté serveur (mêmes seuils, même format), et
  ajout de codes d'erreur précis côté serveur (`invalid_name`, `invalid_email`,
  `invalid_request_type`, `message_too_short`, `message_too_long`, `invalid_company`) traduits
  en messages publics clairs et associés au champ concerné (`field`) dans la réponse JSON,
  sans jamais exposer de détail technique, de nom de variable secrète ni de trace serveur (les
  cas non attribuables à un champ précis — JSON invalide, honeypot rempli, caractères de saut
  de ligne — conservent le message générique « Données invalides. », par conception, pour ne
  pas aider un attaquant à sonder la validation). Simplification du champ « Type de demande » :
  les 7 anciennes options sont remplacées par 2 choix (« Demande de renseignements » = valeur
  technique `information`, « Je souhaite devenir pilote » = valeur technique `pilot`), avec un
  texte non sélectionnable « Sélectionnez le motif de votre demande » ; la liste blanche
  serveur, le corps de l'email interne (qui affiche désormais le libellé public plutôt que la
  valeur technique) et les tests de sécurité ont été mis à jour en conséquence. Comportement du
  bouton renforcé : garde anti-double-soumission par référence (en plus de l'attribut
  `disabled` déjà présent), conservation des données saisies et réactivation du bouton en cas
  d'échec, focus replacé sur le message de confirmation en cas de succès réel (accessibilité).
  Aucune protection existante (rate limiting, honeypot, Turnstile, choix de `from`/`replyTo`,
  timeouts SMTP) n'a été modifiée ou affaiblie. Aucun envoi réel n'a pu être testé depuis cet
  environnement : aucune variable SMTP/Turnstile n'est configurée localement (pas de fichier
  `.env`/`.env.local`) et aucun accès aux variables Vercel de production n'est disponible ; le
  test contrôlé demandé (`[TEST FORMULAIRE JETC] Validation de l'envoi`) reste à réaliser par
  l'utilisateur (voir section 7).

- Étape 19 (Phase D) : allégement de l'accueil et déplacement de la photo du fondateur.
  Suppression complète de la grande carte identité interactive du Hero (logo JETC, « Johnny
  Fleury », « Fondateur », « Découvrez le fondateur », interaction souris/clic/tactile/clavier
  et bascule logo↔photo au survol) : cette carte occupait toute la colonne droite de la
  première vue et déséquilibrait l'accueil. Le contenu éditorial de gauche (accroche, titre,
  paragraphes, encadré, CTA) est conservé à l'identique. La colonne droite (desktop) / zone
  sous le contenu (mobile/tablette) accueille désormais une illustration SVG animée sobre
  représentant une analyse opérationnelle : quatre sources (« Flux », « Temps », « Ressources »,
  « Outils ») convergent par des courbes vers une zone centrale « Analyse », d'où émergent
  ensuite trois trajectoires pointillées symbolisant la comparaison de scénarios — aucun
  chiffre, pourcentage, résultat ni nom tiers affiché. L'animation (bibliothèque `framer-motion`
  déjà présente dans le projet, aucune dépendance ajoutée) dessine progressivement les lignes de
  convergence, fait apparaître les nœuds avec un léger décalage, révèle la zone d'analyse, puis
  fait apparaître les trajectoires de scénarios avec un décalage propre ; elle respecte
  `prefers-reduced-motion` via le hook `useReducedMotion` de `framer-motion` (état final affiché
  immédiatement, sans dépendance JavaScript supplémentaire au-delà de ce qui existe déjà pour
  `WorkProcess.js`). Le soulignement orange de « coûts cachés » se dessine désormais
  progressivement (animation `pathLength`), avec le même repli en cas d'animations réduites.
  Comme l'illustration suit le contenu éditorial dans l'ordre naturel du DOM (plus d'attributs
  `order-*` artificiels), elle apparaît automatiquement sous le texte en pile mobile/tablette et
  à droite en grille à deux colonnes sur ordinateur, sans classes de réordonnancement
  spécifiques. La photo réelle de Johnny Fleury (`public/images/johnny-hero.jpg`, déjà présente
  dans le dépôt, aucun fichier créé ni dupliqué) remplace le logo JETC dans le petit carré en
  incrustation de la section « Du terrain à une vision transversale » (`components/
  Signature.js`) : bordure bleue, coins arrondis et ombre conservés, cadrage `object-cover` avec
  `object-position` centré sur le visage (`object-[center_20%]`), texte alternatif
  « Portrait de Johnny Fleury, fondateur de JETC Solution ». `public/images/logo-jetc.png` n'est
  pas supprimé (toujours utilisé par `Navbar.js`).

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
| 6 | Clarification des résultats, estimations et objectifs sur les 4 cartes projets (intitulés
  spécifiques par projet, suppression des affirmations "100%"/"60%", reformulation des objectifs
  du prototype Traçabilité, note de qualification globale). | ✅ Fait |
| 7 | Réorganisation de la section "Nos réalisations" (carrousel) : inventaire des images,
  nouvel ordre imposé, qualification de chaque diapositive (titre/catégorie/statut). | ✅ Fait |
| 8 | Refonte de "Pourquoi nous choisir ?" (5 axes) et de "Une logique simple : vous gagnez, je
  gagne" (3 étapes de démarche + nouvelle phrase de clôture). | ✅ Fait |
| 9 | Cohérence page Contact et pied de page : bandeau, introduction, types de demande, CTA
  harmonisés, phrase du pied de page. | ✅ Fait |
| 10 | Création de la page "Mentions légales" (`/mentions-legales`) et mise à jour de la
  politique de confidentialité pour refléter les prestataires techniques réels. | ✅ Fait |
| 11 | Contrôle final complet (audit 21 critères + corrections ciblées + validations). | ✅ Fait |
| 12 | Phase A : remplacement de la voix « je » par « nous » (site institutionnel), à
  l'exception de la section parcours personnel de Johnny Fleury réécrite à la 3e personne. | ✅ Fait |
| 13 | Phase B : diagnostic complet et fiabilisation de l'envoi du formulaire de contact
  (gestion des échecs partiels, timeouts SMTP, tests couvrant le transport réel mocké). | ✅ Fait |
| 14 | Harmonisation des noms de projets (JETC TracePilot, JETC FlowPilot), réécriture de la
  section parcours à la 3e personne, remplacement de la phrase générique par une citation,
  correction de la carte du fondateur (accessibilité multi-modale). | ✅ Fait |
| 15 | Réécriture du contenu textuel de la section « Notre Vision » (`Solutions.js`) pour
  supprimer le discours critique envers les solutions standards et Excel, au profit d'un
  discours valorisant l'existant du client (outils, méthodes, expertise). | ✅ Fait |
| 16 | Réécriture du titre et des paragraphes de la section « parcours » (`Signature.js`) :
  suppression du titre redondant, de la mention RELEX et du paragraphe réduisant le parcours
  à un projet précis, au profit d'un discours centré sur la vision transversale acquise entre
  terrain et fonctions support. | ✅ Fait |
| 17 | Fusion des 4 cartes « Écoute Active… » (`Solutions.js`) et de la méthode en 4 étapes
  « Comment nous travaillons » (`WorkProcess.js`) en une seule nouvelle section animée
  « Analyser. Structurer. Optimiser. » (3 étapes, parcours horizontal/vertical). | ✅ Fait |
| 18 | Phase C — Réparation du formulaire de contact (cause du 400, validation client/serveur
  alignée, messages d'erreur par champ), simplification du type de demande à 2 choix. | ✅ Fait |
| 19 | Phase D — Suppression de la grande carte du fondateur de l'accueil, nouvelle
  illustration animée d'analyse opérationnelle, déplacement de la photo du fondateur dans le
  petit carré de la section parcours. | ✅ Fait |

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

### Étape 6 — Clarification résultats / estimations / objectifs
- `components/Projects.js` :
  - JETC OrgaPulse : item "Centralisation des données horaires" → "Centralisation et
    fiabilisation des données horaires" ; KPI "Données horaires : 100% fiables" →
    "Données horaires : Centralisées (issues du timbrage, fiabilisées progressivement)".
  - JETC Immo : nouveau champ `impactLabel: 'Objectifs de conception'` ; item "Gain de temps
    administratif estimé : 60%" → "Réduction attendue des tâches administratives répétitives" ;
    KPI "Gain de temps : ~60%" → "Tâches administratives : Réduction attendue" (cohérence avec
    le libellé public de la même carte).
  - Traçabilité & Spotting Produits : nouveau champ `impactLabel: 'Objectifs du prototype'` ;
    les 3 items reformulés en objectifs recherchés plutôt qu'en résultats acquis.
  - Analyse & Simulation opérationnelle : `impactLabel: 'Périmètre du pilote'` conservé sans
    modification.
  - Ajout d'une note de qualification globale sous les 4 cartes (bloc `mt-12 text-center`).

### Étape 7 — Réorganisation "Nos réalisations" (carrousel)
- `components/ImageCarousel.js` : remplacement du tableau `images` (généré automatiquement,
  sans métadonnées) par un tableau `slides` explicite de 7 éléments dans le nouvel ordre imposé,
  chacun avec `title`, `category`, `description`, `status`. Légende affichée en surimpression
  (titre, catégorie, statut, description) sur un dégradé renforcé pour la lisibilité. Navigation
  clavier ajoutée (flèches gauche/droite) sur la zone `region` ; pause au focus clavier (en plus
  du survol souris) ; libellés ARIA des boutons/puces mis à jour avec le titre de la
  réalisation ; `unoptimized` appliqué aux sources `.svg` pour éviter une erreur de
  l'optimiseur d'images Next.js (aucun changement de configuration de sécurité globale).
- `public/images/qhse-visual.svg` : nouveau fichier, illustration SVG abstraite (bouclier,
  checklist, goutte) en palette sarcelle/émeraude, pour la diapositive "Application QHSE"
  (aucune vraie capture disponible).
- Aucun fichier supprimé. `public/image/image2.png` et `public/image/image5.png` conservés
  mais non référencés dans le carrousel actuel (voir inventaire ç-dessous).

### Étape 8 — Refonte "Pourquoi nous choisir ?" et "Une logique simple"
- `components/Benefits.js` : tableau `benefits` remplacé (4 → 5 éléments), sous-titre de section
  mis à jour (retrait de la formulation "réussite digitale"), grille adaptée à 5 cartes
  (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, `max-w-6xl`).
- `components/Pricing.js` : tableau `pricingExamples` (3 "forfaits" avec prix) remplacé par
  `processSteps` (3 étapes de démarche sans mention de prix par étape) ; JSX simplifié (suppression
  du rendu conditionnel `description`/`price`/`subPrice`/`note`) ; phrase de clôture remplacée.
  Section "Ce que JETC ne fait pas" (`notIncluded`) et paragraphes d'introduction non modifiés
  (non concernés par la demande).

### Étape 9 — Cohérence page Contact et pied de page
- `app/contact/page.js` : introduction et bandeau d'annonce remplacés (titre `h1` "Discutons"
  conservé à l'identique).
- `components/ContactForm.js` : 7 options du champ "Type de demande" remplacées.
- `utils/security/contactValidation.js` : `ALLOWED_REQUEST_TYPES` mis à jour avec les 7 mêmes
  libellés (contenu de validation, aucune logique d'envoi/anti-abus modifiée).
- `security/tests/contactRoute.test.mjs`, `security/tests/contactValidation.test.mjs` :
  fixtures `requestType` alignées sur les nouveaux libellés pour éviter une régression des
  tests de sécurité.
- `components/ContactCTA.js` : bouton "Nous contacter" → "Présenter votre situation".
- `components/Projects.js` : lien de la carte "Analyse & Simulation opérationnelle"
  "Échanger sur cette démarche" → "Proposer un partenariat pilote".
- `components/Footer.js` : phrase de présentation de l'entreprise remplacée.

### Étape 10 — Page "Mentions légales"
- `app/mentions-legales/page.js` : nouvelle route, 8 sections (Éditeur du site, Directeur de la
  publication, Hébergement, Propriété intellectuelle, Responsabilité, Liens externes, Données
  personnelles, Contact). Style visuel identique à `app/confidentialite/page.js`.
- `components/Footer.js` : ajout du lien "Mentions légales" à côté de "Confidentialite".
- `app/confidentialite/page.js` : section "6. Destinataires des données" précisée avec la liste
  réelle des prestataires techniques (Vercel, SMTP, Cloudflare Turnstile, Vercel Analytics,
  Upstash Redis) identifiés dans le code, au lieu d'une formulation générique. Aucun changement
  de logique de sécurité/backend, uniquement le texte descriptif de la politique.

### Étape 11 — Contrôle final complet
- `components/Projects.js` :
  - KPI JETC OrgaPulse "Temps de planification" : `-30%` / `vs Excel manuel` →
    `Jusqu'à -30%` / `estimation vs Excel manuel` (cohérence avec l'item public équivalent).
  - Cartes projets (`motion.div` cliquable) : ajout `role="button"`, `tabIndex={0}`,
    `onKeyDown` (Entrée/Espace), `aria-label` et anneau de focus visible
    (`focus:ring-2 focus:ring-primary-500`). Aucun changement visuel par défaut.

### Étape 12 — Phase A : voix « nous »
- `components/Hero.js` : texte d'introduction (« Nous analysons vos flux… »), bloc
  complémentaire (« … nous nous appuyons sur votre environnement… »), texte de la carte
  identité au survol (« Passez la souris pour découvrir le fondateur »).
- `components/WorkProcess.js` : titre de section (« Comment nous travaillons »), descriptions
  des étapes « Écoute & Découverte » et « Immersion Métier ».
- `components/Pricing.js` : titre de section (« … vous gagnez, nous gagnons »).
- `components/ProjectModal.js` : phrase explicative JETC OrgaPulse (« … que nous adaptons et
  faisons évoluer… »).
- `app/contact/page.js` : phrase d'introduction (« Présentez-nous simplement votre situation »).
- `components/Signature.js` (exception personnelle, réécriture à la 3e personne et non en
  « nous ») : 3 paragraphes du parcours, conclusion italique (« ce sont ses priorités »),
  signature harmonisée sur « — Johnny Fleury, Fondateur de JETC Solution ».
- Aucun autre fichier ne contenait de formulation en « je »/« j' »/« me »/« moi »/« mon »/
  « ma »/« mes » (recherche exhaustive sur `app/` et `components/`).

### Étape 13 — Phase B : fiabilisation de l'envoi du formulaire de contact
- `app/api/contact/route.js` : ajout de `connectionTimeout`/`greetingTimeout`/`socketTimeout`
  sur la configuration SMTP ; validation du port SMTP (entier positif) avant création du
  transport ; envoi de l'email interne (JETC) isolé de l'envoi de l'accusé de réception
  (le premier conditionne le succès réel renvoyé au client, le second est best-effort et
  seulement journalisé en cas d'échec) ; ajout d'un code d'erreur technique (`error.code`
  Nodemailer, ex. `ECONNECTION`) dans les logs d'échec, sans aucune donnée personnelle ni
  secret. Aucun changement de `from`/`replyTo`/destinataire (déjà conformes), aucune
  validation ni protection anti-abus retirée ou affaiblie.
- `security/tests/contactRoute.test.mjs` : suite étendue (mock du module `nodemailer` via
  `node:test` module mocking + mock de la vérification Turnstile via `fetch`) pour couvrir
  réellement, sans jamais toucher un vrai serveur SMTP : champs obligatoires manquants,
  email invalide, requête valide (succès réel des deux envois), échec du transport SMTP sur
  l'email interne (502, aucun détail technique exposé), succès malgré l'échec du seul accusé
  de réception, limitation des envois abusifs (429), absence d'exposition de secrets dans
  toutes les réponses API testées.
- `package.json` : script `test:security` exécuté avec le flag Node
  `--experimental-test-module-mocks` (nécessaire pour le mock de `nodemailer` ; aucune
  dépendance ajoutée/modifiée).

### Étape 14 — Harmonisation des noms, parcours, citation, carte du fondateur
- `components/Projects.js` : `name` du projet `id: 'tracabilite'` (« Traçabilité & Spotting
  Produits » → « JETC TracePilot », `status` « Prototype » inchangé) ; `name` et `status` du
  projet `id: 'analyse-simulation'` (« Analyse & Simulation opérationnelle » →
  « JETC FlowPilot », « Recherche d'un partenaire pilote » → « Recherche d'une entreprise
  partenaire »). Descriptions, KPI, `impactLabel`, liens et identifiants techniques (`id`,
  `backgroundImage`) non modifiés.
- `components/ImageCarousel.js` : `title` de deux diapositives harmonisé avec les nouveaux
  noms (« Traçabilité des produits » → « JETC TracePilot », « Analyse et simulation
  opérationnelle » → « JETC FlowPilot »). `category`, `description`, `status`, `alt` et `src`
  non modifiés.
- `components/Signature.js` : titre `h2` (« Un parcours terrain, des solutions concrètes » →
  « Près de huit ans au cœur des opérations ») et corps du texte entièrement remplacés par le
  texte fourni (5 paragraphes + phrase finale « Analyser. Structurer. Optimiser. », 3e
  personne). Suppression de l'ancienne phrase de clôture (« Clarté, fiabilité, utilité
  réelle… ») et du bloc de signature isolé (« — Johnny Fleury, Fondateur de JETC Solution »),
  désormais redondants avec la nouvelle citation ajoutée dans `Solutions.js`.
- `components/Solutions.js` : phrase de clôture de la section « Notre Vision » (« Cette vision
  guide chaque projet… ») remplacée par la citation « Avant d'automatiser, il faut
  comprendre. Avant d'investir, il faut mesurer. » avec sa signature « — Johnny Fleury,
  fondateur de JETC Solution » (mise en page sobre : `blockquote`/`footer`).
- `components/Hero.js` : carte identité interactive du fondateur. Suppression du texte
  dupliqué (« Passez la souris pour découvrir le fondateur », « Touchez pour voir la photo »,
  « Passez la souris pour voir la photo ») au profit d'une indication unique « Découvrez le
  fondateur ». Ajout de `role="button"`, `tabIndex={0}`, `aria-pressed`, `aria-label` et d'un
  gestionnaire `onKeyDown` (Entrée/Espace) sur le conteneur de la carte, en plus des
  gestionnaires existants (`onMouseEnter`/`onMouseLeave`/`onClick`) : l'interaction fonctionne
  désormais à la souris, au clic, au toucher et au clavier. Anneau de focus visible ajouté
  (`focus-visible:ring-4 focus-visible:ring-primary-300`). Le contenu (logo ou photo) reste
  affiché selon l'état `isHovered`, indépendamment de l'exécution des animations CSS.

### Étape 15 — Réécriture du contenu de « Notre Vision »
- `components/Solutions.js` : les deux paragraphes d'introduction, la phrase centrale mise en
  avant (bloc bleu `text-primary-700`) et la dernière phrase en italique de la section « Notre
  Vision » ont été intégralement remplacés. Suppression des phrases critiquant les « solutions
  standards » et Excel (« lourdes, coûteuses et rigides », « couleurs, formules cassées »,
  « beaucoup de ressources consommées pour peu de valeur créée »). Structure graphique
  (titre, deux paragraphes, phrase centrale en bleu, séparateur, phrase finale en italique)
  inchangée ; classes Tailwind existantes conservées, aucun ajustement d'espacement n'a été
  nécessaire. Les 4 cartes interactives (« Écoute Active »…) et la citation de Johnny Fleury
  (ajoutée à l'étape 14) ne sont pas concernées par cette étape.

### Étape 16 — Réécriture de la section « parcours »
- `components/Signature.js` : titre `h2` (« Près de huit ans au cœur des opérations » →
  « Du terrain à une vision transversale ») et les 4 derniers paragraphes remplacés (le premier
  paragraphe, factuel, est inchangé). Suppression de la phrase « Cette expérience lui a permis
  de développer une vision transversale des opérations : flux, ressources, qualité, coûts,
  approvisionnements et outils de pilotage », du paragraphe « Il a notamment piloté
  l'intégration dans RELEX… » et de toute mention de RELEX. La citation de Johnny Fleury
  ajoutée à l'étape 14 dans `components/Solutions.js` (« Avant d'automatiser, il faut
  comprendre… ») n'est pas concernée par cette étape.

### Étape 17 — Fusion des cartes et de la méthode en une section animée
- `components/Solutions.js` : suppression complète du bloc « Cartes interactives » (tableau
  `visionItems` des 4 cartes « Écoute Active », « Accompagnement Personnalisé », « Immersion
  Métier », « Impact Business », leurs icônes/emoji, indicateurs « Survolez pour en savoir
  plus »/« Touchez pour développer », et toute la logique associée : états `hoveredIndex`/
  `expandedMobile`, imports `useState`/`AnimatePresence` devenus inutiles). La section
  « Notre Vision » (titre, 2 paragraphes, phrase centrale bleue, citation de clôture) est
  strictement inchangée.
- `components/WorkProcess.js` : contenu entièrement remplacé (méthode en 4 étapes « Écoute &
  Découverte », « Immersion Métier », « Co-construction », « Déploiement & Suivi » et la
  phrase de clôture « Cette démarche garantit… » supprimées) par une nouvelle section unique
  « Analyser. Structurer. Optimiser. » à 3 étapes, avec parcours animé horizontal (ordinateur)
  devenant vertical (mobile/tablette), trois icônes SVG originales illustrant chaque étape
  (balayage de flux, alignement de points, convergence de trajectoires), interaction clavier/
  souris/tactile et respect de `prefers-reduced-motion` (voir section 6 pour le détail
  technique). L'identifiant `id="process"` est conservé à l'identique (ancre utilisée par
  `Navbar.js`, `Footer.js` et `Hero.js`, non modifiés).
- Aucun autre composant, style global (`app/globals.css`) ou fichier asset n'a nécessité de
  nettoyage : les 4 cartes et les 4 étapes n'étaient définies que dans ces deux fichiers, sans
  dépendance externe.

### Étape 18 — Phase C : réparation et simplification du formulaire de contact
- `utils/security/contactValidation.js` : `ALLOWED_REQUEST_TYPES` remplacé par `REQUEST_TYPES`
  (tableau `{ value, label }`, valeurs techniques `information`/`pilot`) et `REQUEST_TYPE_LABELS`
  exportés pour réutilisation côté route. `MAX_LENGTHS.requestType` réduit de 30 à 20 (les deux
  nouvelles valeurs sont courtes). `validateContactPayload` retourne désormais un `code` et un
  `field` précis par type d'échec (`invalid_name`, `invalid_company`, `invalid_request_type`,
  `invalid_email`, `message_too_short`, `message_too_long`, `invalid_fields` pour les cas non
  attribuables à un champ) au lieu d'un seul `error: 'invalid_fields'` générique ; ordre des
  vérifications conservé pour ne pas exposer d'information avant le contrôle honeypot.
- `app/api/contact/route.js` : ajout de `VALIDATION_MESSAGES` (association code → message public
  + champ) pour transformer les codes de validation en réponses JSON `{ error, field }` claires
  et actionnables, sans jamais exposer de détail technique ; import de `REQUEST_TYPE_LABELS`
  utilisé pour afficher le libellé public (« Demande de renseignements »/« Je souhaite devenir
  pilote ») dans le corps de l'email interne au lieu de la valeur technique. `from`/`replyTo`/
  destinataire/timeouts SMTP non modifiés (déjà conformes depuis l'étape 13).
- `components/ContactForm.js` : réécriture complète. Options du champ « Type de demande »
  réduites à 2 (`information`/`pilot`), première option non sélectionnable (`disabled`)
  « Sélectionnez le motif de votre demande ». Ajout d'une fonction `validateFields` cliente
  reproduisant exactement les règles serveur (nom ≥ 2 caractères, format email, message entre
  10 et 2000 caractères, type de demande obligatoire) exécutée avant tout appel réseau ; erreurs
  affichées sous chaque champ concerné (`aria-invalid`, `aria-describedby`, bordure rouge) et
  effacées dès correction. Ajout d'une garde `isSubmittingRef` contre la double soumission (en
  plus de l'attribut `disabled` déjà présent), gestion différenciée des réponses serveur (champ
  précis via `data.field`, limitation de débit 429, échec générique 5xx/réseau avec le message
  « L'envoi du message a échoué. Veuillez réessayer dans quelques instants. »), conservation des
  données saisies en cas d'échec, réinitialisation du formulaire et focus replacé sur le message
  de confirmation (`statusRef`) uniquement en cas de succès réel confirmé par le serveur.
- `security/tests/contactValidation.test.mjs` : `validPayload.requestType` aligné sur
  `'information'` ; test des types de demande mis à jour pour les 2 nouvelles valeurs et pour
  vérifier le rejet explicite des anciens libellés (`'Diagnostic opérationnel'`,
  `'Partenariat pilote'`) ; assertion de l'étape « champs vides » adaptée au nouveau `code`
  (`invalid_name` au lieu d'`invalid_fields`).
- `security/tests/contactRoute.test.mjs` : `payload.requestType` aligné sur `'information'` ;
  assertions du message manquant et de l'email invalide mises à jour pour vérifier le message
  public précis et le champ (`field`) désormais renvoyés ; ajout d'un test dédié au rejet d'un
  type de demande vide ou obsolète.

### Étape 19 — Phase D : accueil allégé et photo du fondateur déplacée
- `components/Hero.js` : suppression complète de la carte identité interactive (logo, texte,
  état `isHovered`, gestionnaires souris/clic/clavier, imports `Image`/`useState` devenus
  inutiles). Ajout d'un composant local `OperationalAnalysisIllustration` (SVG + `framer-motion`,
  aucune dépendance ajoutée) affiché à droite du contenu (desktop) / sous le contenu
  (mobile/tablette), avec repli statique complet lorsque `useReducedMotion()` est actif. Ajout
  de l'animation de tracé (`pathLength`) du soulignement orange de « coûts cachés », avec le
  même repli. Suppression des classes `order-2 lg:order-1` / `order-1 lg:order-2` devenues
  inutiles (l'ordre naturel du DOM suffit désormais).
- `components/Signature.js` : contenu du petit carré en incrustation remplacé (logo JETC →
  photo `public/images/johnny-hero.jpg`, déjà présente dans le dépôt), bordure/coins
  arrondis/ombre conservés, `object-cover` + `object-position` centré visage, texte alternatif
  imposé. Commentaire de section mis à jour (« Photo et Logo » → « Photo principale + portrait
  en incrustation »).

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
  déjà utilisé par JETC OrgaPulse). **Mis à jour à l'étape 9** → « Proposer un partenariat
  pilote » (harmonisation des CTA, voir étape 9).
- Aucun KPI, aucune fonctionnalité détaillée ni capture d'écran ajoutés (champs volontairement
  omis pour ne créer aucun résultat chiffré ni contenu non fourni).

### Étape 6 — Clarification résultats / estimations / objectifs (`components/Projects.js`)

- JETC OrgaPulse : intitulé « Résultats évalués et fonctionnalités » (inchangé, valeur par
  défaut) ; « Réduction estimée jusqu'à 30 % du temps de planification » (conservé) ; «
  Visualisation de la charge et de l'activité » (conservé) ; « Centralisation et fiabilisation
  des données horaires » (nouvelle formulation, remplace « Centralisation des données
  horaires ») ; suppression de l'affirmation « 100% fiables » (KPI modal).
- JETC Immo : intitulé « Objectifs de conception » (remplace « Impact mesuré / attendu ») ;
  « Centralisation des documents et contrats » (conservé) ; « Automatisation des relances et
  rappels » (conservé) ; « Réduction attendue des tâches administratives répétitives »
  (remplace « Gain de temps administratif estimé : 60% »).
- Traçabilité & Spotting Produits : intitulé « Objectifs du prototype » (remplace « Impact
  mesuré / attendu ») ; éléments reformulés comme fonctions recherchées : « Viser une
  transparence accrue de la chaîne d'approvisionnement », « Contribuer à la lutte contre la
  contrefaçon », « Faciliter la conformité réglementaire ».
- Analyse & Simulation opérationnelle : intitulé « Périmètre du pilote » conservé.
- Note ajoutée sous les 4 cartes :
  « Les informations sont qualifiées selon le niveau d'avancement du projet : fonctionnalité
  disponible, estimation issue d'une étude, objectif de conception ou périmètre expérimental. »

### Étape 7 — Inventaire et réorganisation "Nos réalisations" (`components/ImageCarousel.js`)

Inventaire des images existantes (aucune suppression) :
- `public/image/image1.png` — tableau "Dashboard de Pilotage Logistique" (planning/charge) →
  utilisée pour JETC OrgaPulse.
- `public/image/image2.png` — fiche collaborateur (nom synthétique) → conservée, non utilisée
  dans le carrousel actuel (réserve).
- `public/image/image3.png` — module "Coût Entrepôt / Gestion des segments" → utilisée pour
  "Autres réalisations digitales existantes".
- `public/image/image4.png` — page d'accueil JETC Immo → utilisée pour JETC Immo.
- `public/image/image5.png` — scénario de démo JETC Immo (ticket → mission → facture) →
  conservée, non utilisée dans le carrousel actuel (réserve).
- `public/image/image6.png` — simulation 3D convoyeur/palettes avec panneau de contrôle →
  utilisée pour "Optimisation des achats indirects et du packaging".
- `public/image/image7.png` — simulation 3D convoyeur (vue large, sans panneau) → utilisée pour
  "Analyse et simulation opérationnelle".
- `public/images/prodorga/*.png` (captures déjà utilisées dans `ProjectModal.js`, non touchées) :
  confirment que tous les noms de personnes affichés ("Jean Dupont", "Marie Curie", "Paul
  Martin", etc.) sont des données de démonstration synthétiques ; aucune entreprise, logo
  externe ni donnée confidentielle visible sur aucune image inventée.

Nouvel ordre du carrousel (avec qualification titre / catégorie / description / statut) :
1. « JETC OrgaPulse » — Analyse & organisation des opérations — « Tableau de pilotage temps
   réel : planning, charge par zone et suivi d'équipe. » — Statut : Pilote opérationnel.
2. « Application QHSE » — Qualité, hygiène, sécurité, environnement — « Prototype de suivi des
   contrôles qualité et de la conformité réglementaire. » — Statut : Prototype (visuel graphique
   neutre `qhse-visual.svg`, aucune vraie capture disponible).
3. « Optimisation des achats indirects et du packaging » — Achats indirects & packaging —
   « Simulation 3D des flux de conditionnement pour comparer différentes configurations. » —
   Statut : Prototype.
4. « Analyse et simulation opérationnelle » — Analyse & simulation — « Modélisation visuelle
   des flux logistiques pour tester des scénarios avant décision. » — Statut : Prototype.
5. « Traçabilité des produits » — Traçabilité & conformité — « Illustration du principe de
   suivi des lots tout au long de la chaîne logistique. » — Statut : Prototype (réutilise le
   visuel graphique neutre `tracabilite-bg.svg`, aucune vraie capture disponible).
6. « JETC Immo » — Gestion immobilière — « Plateforme de gestion locative : baux, quittances,
   charges et suivi technique. » — Statut : Développement en cours.
7. « Autres réalisations digitales existantes » — Autres outils numériques — « Autres modules
   internes développés dans la même démarche : suivi des coûts et pilotage d'activité. » —
   Statut : Prototype.

### Étape 8 — "Pourquoi nous choisir ?" (`components/Benefits.js`)

1. « Expérience terrain » — « Une compréhension directe des contraintes opérationnelles, des
   équipes et des flux. »
2. « Approche par les données » — « Des décisions appuyées par des mesures, des faits et des
   indicateurs compréhensibles. »
3. « Vision transversale » — « Une lecture combinant logistique, qualité, ressources humaines,
   achats et coûts. »
4. « Simulation avant investissement » — « Plusieurs scénarios comparés avant d'engager une
   transformation ou une dépense importante. »
5. « Résultats mesurables » — « Un état initial, des objectifs définis et une mesure concrète
   de l'évolution. »

### Étape 8 — "Une logique simple : vous gagnez, je gagne" (`components/Pricing.js`)

1. « Diagnostic ciblé » : compréhension du besoin ; cartographie d'un processus ; définition
   des données disponibles ; identification des premières hypothèses.
2. « Partenariat pilote » : périmètre volontairement limité ; état initial mesurable ; analyse
   et simulation ; test d'une ou plusieurs améliorations.
3. « Déploiement progressif » : validation des résultats ; ajustement avec les équipes ;
   extension uniquement si la valeur est démontrée ; accompagnement adapté au besoin réel.

Conclusion (remplace l'ancienne phrase de clôture) :
« Le périmètre et la rémunération sont définis à l'avance selon le besoin et la valeur
recherchée. Aucun abonnement ou déploiement global n'est imposé avant la validation des
résultats du pilote. »

### Étape 9 — Page Contact et pied de page

- Bandeau (`app/contact/page.js`) :
  « JETC Solution entre en phase pilote. Les prises de contact et propositions de
  collaboration sont ouvertes. »
- Titre (`h1`, conservé à l'identique) : « Discutons »
- Introduction :
  « Un processus difficile à mesurer, un coût qui reste invisible ou un projet que vous
  souhaitez tester avant d'investir ? Présentez-moi simplement votre situation. »
- Types de demande (`components/ContactForm.js` + liste blanche
  `utils/security/contactValidation.js`) : « Diagnostic opérationnel », « Partenariat pilote »,
  « Analyse et simulation », « JETC OrgaPulse », « Automatisation d'un processus », « Solution
  métier sur mesure », « Autre demande ».
- CTA harmonisés : « Étudier un processus » et « Découvrir la méthode » (Hero, inchangés),
  « Présenter votre situation » (ContactCTA), « Proposer un partenariat pilote » (carte
  Analyse & Simulation opérationnelle).
- Pied de page (`components/Footer.js`) :
  « Analyse opérationnelle, automatisation et simulation au service de résultats mesurables. »

### Étape 10 — Page "Mentions légales" (`app/mentions-legales/page.js`)

1. Éditeur du site : Johnny Fleury, entrepreneur individuel, nom commercial JETC Solution,
   SIRET 994 308 757, 415 Route de Champagnole, 39300 Sapois, France, contact@jetc-immo.ch.
2. Directeur de la publication : Johnny Fleury.
3. Hébergement : Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis (identifié à
   partir de `vercel.json`, `@vercel/analytics`, README de déploiement, liens *.vercel.app).
   Adresse signalée dans la page comme à confirmer par l'éditeur avant publication officielle.
4. Propriété intellectuelle : contenus (textes, illustrations, logos, code) propriété de Johnny
   Fleury / JETC Solution, reproduction interdite sans autorisation.
5. Responsabilité : informations (statuts, résultats évalués/estimés) fournies à titre indicatif,
   sans garantie contractuelle.
6. Liens externes : JETC Solution non responsable du contenu des sites tiers liés (démonstrations
   hébergées ailleurs).
7. Données personnelles : renvoi vers la Politique de confidentialité ; aucune donnée
   confidentielle de tiers traitée ou publiée.
8. Contact : contact@jetc-immo.ch ou formulaire de contact.

Mise à jour corollaire de `app/confidentialite/page.js` (section 6, prestataires techniques
réels) :
« Hébergement du site (Vercel) ; Envoi des emails transactionnels du formulaire de contact
(fournisseur SMTP) ; Protection anti-robot du formulaire de contact, lorsqu'elle est activée
(Cloudflare Turnstile) ; Mesure d'audience anonymisée (Vercel Analytics) ; Compteur technique
de visiteurs en ligne (Upstash Redis). »

### Étape 11 — Rapport d'audit final (21 critères)

| # | Critère | Résultat |
|---|---------|----------|
| 1 | Aucune occurrence publique de "ProdOrga" | ✅ Conforme. Seules occurrences restantes : identifiant technique `id: 'prodorga'`, chemins d'assets (`/images/prodorga-bg.svg`, `/images/prodorga/*.png`), IDs internes de gradients SVG — aucune n'est un texte affiché. Le fichier `public/images/prodorga/placeholder.svg` contient un texte "ProdOrga" mais n'est référencé par aucun composant (asset mort, non affiché). |
| 2 | Utilisation cohérente de "JETC OrgaPulse" | ✅ Conforme (8 occurrences : `Projects.js`, `ProjectModal.js`, `ImageCarousel.js`, `ContactForm.js`). |
| 3 | Aucun employeur/client/prestataire de simulation/partenaire externe | ✅ Conforme. Aucune trace de Migros, ProcSim, SimWell ; "RELEX" mentionné une fois (`Signature.js`) comme logiciel, pas comme employeur (décision validée étape 3). |
| 4 | Aucun logo tiers | ✅ Conforme. Seul logo utilisé : `logo-jetc.png` (propre). |
| 5 | Aucun partenariat présenté comme signé | ✅ Conforme. Statuts "Recherche d'un partenaire pilote" / CTA "Proposer un partenariat pilote" formulés au conditionnel/prospectif. |
| 6 | Aucune donnée professionnelle confidentielle | ✅ Conforme (confirmé étapes 3, 7, 10). |
| 7 | Cohérence analyse / automatisation / simulation | ⚠️ Partielle. Hero, Projects, Benefits, Pricing, Contact alignés. `Solutions.js` ("Notre Vision") et `WorkProcess.js` ("Comment je travaille") n'ont pas été repositionnés (hors périmètre explicite jusqu'ici, déjà signalé en points restants) : langage générique pré-existant, sans mention explicite analyse/simulation. Non corrigé (pas une régression de la mission, décision déjà tracée). |
| 8 | Qualification des estimations/objectifs/résultats | ⚠️ 1 anomalie corrigée (KPI OrgaPulse, voir ci-dessus). KPI Traçabilité ("100%"/"(démo)", "-40%"/"estimation") déjà correctement qualifiés, non modifiés. |
| 9 | Liens, ancres, boutons, carrousel | ✅ Conforme. Toutes les ancres (`#solutions`, `#process`, `#projects`, `#contact`) correspondent à des `id` réels. Carrousel : contrôles (flèches, puces, clavier) fonctionnels. Test HTTP : `/`, `/contact`, `/confidentialite`, `/mentions-legales` → 200. |
| 10 | Formulaire de contact sans envoi réel | ✅ Conforme. Validation testée uniquement via `npm run test:security` (33 tests, aucun email réel envoyé, SMTP jamais atteint dans les tests). |
| 11 | Métadonnées SEO | ✅ Présentes sur toutes les pages (`app/layout.js`, `app/contact/page.js`, `app/confidentialite/page.js`, `app/mentions-legales/page.js`). |
| 12 | Hiérarchie H1/H2 | ✅ Conforme. Un seul `h1` par page (`Hero.js` pour `/`, un par page statique) ; toutes les sections utilisent `h2` (`Solutions`, `Signature`, `WorkProcess`, `Projects`, `ImageCarousel`, `Benefits`, `Pricing`, `ContactCTA`, `ProjectModal`). |
| 13 | Textes alternatifs | ✅ Conforme. Toutes les `<Image>` et l'unique `<img>` (captures dans `ProjectModal.js`) ont un `alt` descriptif non vide. |
| 14 | Navigation clavier | ⚠️ 1 anomalie corrigée (cartes `Projects.js`, voir ci-dessus). Carrousel déjà accessible (étape 7). `Solutions.js` (cartes cliquables sans clavier) non touché par la mission, signalé en points restants. |
| 15 | Contrastes | ✅ Revue de code : overlay assombri à `black/70` sur le carrousel (texte blanc), textes gris foncé sur fond blanc/clair partout ailleurs — pas de nouvelle combinaison à risque introduite par la mission. Non vérifié avec un outil de mesure de contraste (indisponible). |
| 16 | Affichage 375/768/1024/1440 px | ✅ Revue des classes Tailwind (`grid-cols-1 md:grid-cols-2 xl:grid-cols-4` etc., cf. étapes 5, 8) : pas de carte orpheline aux breakpoints. Non vérifié visuellement (aucun outil de capture d'écran disponible dans cet environnement). |
| 17 | Absence d'erreurs propres au site en console | ✅ `npm run build` sans erreur ; aucun `console.log` de debug laissé dans le code modifié ; test HTTP 200 sur toutes les routes. Pas de vérification des avertissements React côté client en conditions réelles (pas de navigateur disponible). |
| 18 | Absence de secrets exposés | ✅ Seuls `.env.example` et `.env.local.example` sont suivis par Git ; `.gitignore` exclut `.env`/`.env*.local` ; aucune valeur de secret réelle trouvée dans le code (seuls des jetons factices dans les tests). |
| 19 | Pages Confidentialité et Mentions légales présentes | ✅ `/confidentialite` et `/mentions-legales` existent et se construisent (9 pages générées). |
| 20 | Migrations `0001`–`0006` | ✅ Aucune migration Supabase présente dans ce dépôt (confirmé étape 1 et reconfirmé ici) — rien n'a donc pu être modifié. |
| 21 | Supabase / authentification / sessions / routes admin | ✅ Aucun code de ce type présent dans le dépôt (confirmé par recherche globale) — rien n'a été touché. |

Anomalies corrigées (strictement liées à la mission) :
- KPI JETC OrgaPulse "Temps de planification" (`components/Projects.js`) : `-30%` / `vs Excel
  manuel` → `Jusqu'à -30%` / `estimation vs Excel manuel`.
- Cartes projets (`components/Projects.js`) : ajout de `role="button"`, `tabIndex={0}`, gestion
  clavier Entrée/Espace, `aria-label` et anneau de focus visible.

### Étape 14 — Textes définitifs (noms, parcours, citation)

Noms et badges de projets (`components/Projects.js`, `components/ImageCarousel.js`) :
- « JETC TracePilot » (ex-« Traçabilité & Spotting Produits ») — badge : « Prototype ».
- « JETC FlowPilot » (ex-« Analyse & Simulation opérationnelle ») — badge : « Recherche d'une
  entreprise partenaire ».
- « JETC OrgaPulse » et « JETC Immo » : inchangés.

Section « parcours » (`components/Signature.js`) :
- Titre : « Près de huit ans au cœur des opérations »
- Texte (5 paragraphes, 3e personne) :
  « Depuis près de huit ans, Johnny Fleury évolue au sein d'un environnement de commerce en
  ligne alimentaire multisite, comptant environ 12 500 références et intégrant un nouvel
  entrepôt automatisé.
  Cette expérience lui a permis de développer une vision transversale des opérations : flux,
  ressources, qualité, coûts, approvisionnements et outils de pilotage.
  Son parcours a commencé sur le terrain, dans la préparation de commandes, avant d'évoluer
  vers l'assistance opérationnelle, les ressources humaines, la coordination de projets, les
  achats indirects et la qualité.
  Il a notamment piloté l'intégration dans RELEX des achats indirects et des emballages de
  plusieurs entrepôts. Son travail consiste à rendre visibles les pertes de temps, les
  déplacements inutiles, les erreurs et les coûts cachés entre les différentes étapes d'un
  processus.
  JETC Solution est née de cette expérience avec une conviction simple : les meilleures
  améliorations partent du terrain, s'appuient sur des données concrètes et valorisent
  l'environnement existant.
  Analyser. Structurer. Optimiser. »

Citation (`components/Solutions.js`, remplace l'ancienne phrase de clôture « Cette vision
guide chaque projet… ») :
« Avant d'automatiser, il faut comprendre. Avant d'investir, il faut mesurer. »
— Johnny Fleury, fondateur de JETC Solution

Carte du fondateur (`components/Hero.js`) : indication unique « Découvrez le fondateur »
(remplace les 3 indications précédentes dépendantes du survol/tactile).

### Étape 15 — Textes définitifs (section « Notre Vision »)

Section « Notre Vision » (`components/Solutions.js`) :
« Chaque entreprise possède ses propres outils, ses méthodes et une expertise construite sur
le terrain.
Nous nous appuyons sur cet environnement pour comprendre les flux, structurer les données et
identifier les améliorations réellement utiles.
Notre rôle : valoriser l'existant et concentrer les efforts là où ils produisent un impact
concret.
Une démarche adaptée à votre réalité pour simplifier, structurer et améliorer durablement vos
opérations. »

### Étape 16 — Textes définitifs (section « parcours »)

Section « parcours » (`components/Signature.js`) :
« Du terrain à une vision transversale
Depuis près de huit ans, Johnny Fleury évolue au sein d'un environnement de commerce en ligne
alimentaire multisite, comptant environ 12 500 références et intégrant un nouvel entrepôt
automatisé.
Son parcours a commencé sur le terrain, dans la préparation de commandes, avant d'évoluer vers
l'assistance opérationnelle, le management, les ressources humaines, la coordination de
projets, les achats indirects et la qualité.
Ce passage entre les fonctions opérationnelles et les différents services support lui a permis
d'observer une même organisation sous plusieurs angles. Chaque fonction possède ses priorités
et ses contraintes, mais leurs décisions interagissent et influencent l'ensemble des
opérations.
Ce parcours a construit sa vision : les améliorations les plus utiles apparaissent lorsque la
réalité du terrain, les données disponibles et les fonctions support sont reliées autour d'un
objectif commun.
JETC Solution est née de cette approche terrain et transversale. Son objectif est de
comprendre le fonctionnement existant, de structurer les informations disponibles et de
construire avec les équipes des améliorations concrètes, adaptées à leur réalité.
Analyser. Structurer. Optimiser. »

### Étape 17 — Textes définitifs (section « Analyser. Structurer. Optimiser. »)

Titre et introduction (`components/WorkProcess.js`) :
« Analyser. Structurer. Optimiser.
Une démarche progressive pour comprendre votre fonctionnement, rendre les informations
exploitables et concentrer les efforts sur les améliorations les plus utiles. »

Étape 01 — Analyser :
« Observer les flux, écouter les équipes et étudier les temps, les capacités ainsi que les
points de friction rencontrés dans le fonctionnement quotidien. »

Étape 02 — Structurer :
« Relier les données, les contraintes et les priorités afin de rendre visibles les
interactions, les coûts cachés et les leviers d'amélioration. »

Étape 03 — Optimiser :
« Comparer les scénarios, construire les améliorations avec les équipes et accompagner leur
mise en œuvre de manière progressive. »

Phrase de clôture :
« Chaque étape s'appuie sur votre environnement, vos outils et l'expertise de vos équipes. »

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

### Étape 6
- `npm run lint` → OK. Même avertissement préexistant non lié (`components/ProjectModal.js:156`).
- `npm run test:security` → 33/33 tests passés (7 suites), 0 échec.
- `npm run build` → build de production réussi, 8 pages générées, route `/` = 13,6 kB / 160 kB
  First Load JS. Aucune régression détectée.

### Étape 7
- `npm run lint` → OK. Même avertissement préexistant non lié (`components/ProjectModal.js:156`).
- `npm run test:security` → 33/33 tests passés (7 suites), 0 échec.
- `npm run build` → build de production réussi, 8 pages générées, route `/` = 14,4 kB / 161 kB
  First Load JS. Aucune régression détectée.
- Correction en cours de route : les SVG (`qhse-visual.svg`, `tracabilite-bg.svg`) utilisés via
  `next/image` renvoyaient une erreur 400 de l'optimiseur ("dangerouslyAllowSVG is disabled").
  Corrigé en ajoutant la prop `unoptimized` sur les sources `.svg` du carrousel (aucune
  modification de `next.config.js` ni de la configuration de sécurité globale). Vérifié par
  test direct de l'endpoint `/_next/image` avant/après correctif, et par récupération directe
  du fichier SVG (200 OK).
- Navigation clavier : flèches gauche/droite ajoutées sur la zone `region` (en plus des boutons
  précédent/suivant déjà focalisables nativement) ; pause automatique au focus clavier ajoutée
  (`onFocus`/`onBlur`), en complément du `onMouseEnter`/`onMouseLeave` existant.
- Textes alternatifs : remplacés (`Réalisation N` générique → description précise de chaque
  visuel, ex. "Tableau de bord JETC OrgaPulse affichant le planning et la charge par zone").

### Étape 8
- `npm run lint` → OK. Même avertissement préexistant non lié (`components/ProjectModal.js:156`).
- `npm run test:security` → 33/33 tests passés (7 suites), 0 échec.
- `npm run build` → build de production réussi, 8 pages générées, route `/` = 14,1 kB / 160 kB
  First Load JS. Aucune régression détectée.

### Étape 9
- `npm run lint` → OK. Même avertissement préexistant non lié (`components/ProjectModal.js:156`).
- `npm run test:security` → 33/33 tests passés (7 suites), 0 échec, y compris la suite
  `contactValidation.test.mjs` mise à jour (nouveaux types de demande acceptés, ancien type
  "Discussion" désormais rejeté, honeypot/CRLF/longueurs toujours bloqués) et
  `contactRoute.test.mjs` (rate limiting, Turnstile, honeypot inchangés). Validation testée
  uniquement en local (`node --test`), aucun email réel envoyé.
- `npm run build` → build de production réussi, 8 pages générées, route `/contact` = 3,71 kB /
  142 kB First Load JS (légère hausse liée aux nouvelles options du sélecteur). Aucune
  régression détectée.

### Étape 10
- `npm run lint` → OK. Même avertissement préexistant non lié (`components/ProjectModal.js:156`).
- `npm run test:security` → 33/33 tests passés (7 suites), 0 échec (aucun test lié aux pages
  juridiques statiques, non affectées).
- `npm run build` → build de production réussi, **9 pages générées** (nouvelle route
  `/mentions-legales` = 139 B / 103 kB First Load JS). Aucune régression détectée.

### Étape 11
- `npm run lint` → OK. Même avertissement préexistant non lié (`components/ProjectModal.js:156`).
- `npm run test:security` → 33/33 tests passés (7 suites), 0 échec (seule suite de tests
  automatisés du projet ; aucune suite "tests applicatifs" distincte n'existe dans
  `package.json`).
- `npm run build` → build de production réussi, 9 pages générées, route `/` = 14,2 kB /
  161 kB First Load JS. Aucune régression détectée.
- Vérification runtime : serveur de production démarré localement (`npm run start`), les 4
  routes `/`, `/contact`, `/confidentialite`, `/mentions-legales` répondent toutes en HTTP 200.

### Étape 12 (Phase A)
- `npm run lint` → OK. Même avertissement préexistant non lié (`components/ProjectModal.js:156`).
- `npm run test:security` → 33/33 tests passés (7 suites), 0 échec.
- `npm run build` → build de production réussi, 9 pages générées, route `/` = 14,2 kB /
  161 kB First Load JS (taille identique, changement de texte uniquement). Aucune régression
  détectée.
- Vérification manuelle : recherche exhaustive `je|j'|j’|moi|mon|ma|mes|me` sur `app/**/*.js`
  et `components/**/*.js` après correction → 0 occurrence restante.

### Étape 13 (Phase B)
- `npm run lint` → OK. Même avertissement préexistant non lié (`components/ProjectModal.js:156`).
- `npm run test:security` → **38/38 tests passés** (7 suites, 0 échec), incluant 5 nouveaux
  cas sur `app/api/contact/route.js` (champs manquants, email invalide, requête valide avec
  succès SMTP mocké, échec SMTP interne avec réponse 502 sans fuite technique, succès malgré
  l'échec du seul accusé de réception). Aucun email réel envoyé, aucun secret réel utilisé
  (valeurs SMTP/Turnstile factices, module `nodemailer` mocké).
- `npm run build` → build de production réussi, 9 pages générées, tailles identiques à
  l'étape 12 (`/api/contact` reste une route dynamique de 139 B). Aucune régression détectée.
- Aucune suite "tests applicatifs" distincte n'existe dans `package.json` : `test:security`
  reste la seule suite automatisée du projet (confirmé aux étapes 9 et 11).
- Formulaire côté client (`components/ContactForm.js`) vérifié par revue de code (aucun
  navigateur disponible dans cet environnement) : bouton désactivé pendant l'envoi
  (`disabled={status.type === 'loading'}`), réactivé automatiquement après une erreur
  (`status.type` repasse à `'error'`), formulaire et widget Turnstile réinitialisés
  uniquement dans la branche de succès confirmée par la réponse serveur (`response.ok`) —
  déjà conforme, aucune modification nécessaire côté client.
- Vérification des variables de production : **non réalisable depuis cet environnement**
  (aucune CLI/API Vercel accessible, aucun jeton, aucun fichier `.env.local`/`.vercel` présent).
  Voir section 7 pour la liste exacte des variables à vérifier et l'endroit où les ajouter.
- Test contrôlé en production (`[TEST FORMULAIRE JETC] Validation de l'envoi`) : **non
  effectué**, faute d'accès au déploiement de production et à ses variables réelles. À réaliser
  par l'utilisateur une fois les variables confirmées (voir section 7).

### Étape 14
- `npm run lint` → OK. Même avertissement préexistant non lié (`components/ProjectModal.js:156`).
- `npm run test:security` → 38/38 tests passés (7 suites), 0 échec (renommage de projets et
  contenu textuel sans impact sur la logique testée).
- `npm run build` → build de production réussi, 9 pages générées, tailles identiques à
  l'étape 13. Aucune régression détectée.
- Recherche exhaustive post-implémentation : 0 occurrence restante de « Traçabilité & Spotting
  Produits », « Analyse & Simulation opérationnelle », « Spotting Produits », des 3 anciennes
  formulations de la carte du fondateur, de l'ancienne phrase de clôture « Cette vision guide
  chaque projet… » et de l'ancienne signature isolée dans `Signature.js`. 0 occurrence publique
  de « JECT » (recherche `\bJECT\b` sur `app/**/*.js` et `components/**/*.js`).
- Affichage responsive : vérifié par revue des classes Tailwind (grilles, `aspect-[4/5]` de la
  carte du fondateur, `blockquote` centré) — aucun outil de capture d'écran/navigateur
  disponible dans cet environnement pour une vérification visuelle réelle sur ordinateur,
  tablette et mobile.
- Carte du fondateur : comportement vérifié par revue de code — `onMouseEnter`/`onMouseLeave`
  (souris), `onClick` (clic et toucher tactile, un `<div>` avec `onClick` réagissant nativement
  aux évènements `pointerup`/`tap` des navigateurs mobiles), `onKeyDown` sur Entrée/Espace
  (clavier) avec `role="button"`/`tabIndex={0}`/anneau de focus visible ; le contenu affiché
  dépend uniquement de l'état React `isHovered`, pas de l'achèvement d'une animation, donc
  reste lisible et fonctionnel même animations réduites/désactivées. Non testé avec un lecteur
  d'écran ou un appareil tactile réel (indisponibles dans cet environnement).

### Étape 15
- Recherche exhaustive post-implémentation : 0 occurrence restante des 4 anciennes phrases
  (« solutions "standards" […] lourdes, coûteuses et rigides », « Excel est puissant […]
  couleurs, formules cassées », « beaucoup de ressources consommées pour peu de valeur créée »,
  « Notre vision : simplifier, structurer, automatiser ») sur l'ensemble du dépôt.
- `npm run lint` → OK. Même avertissement préexistant non lié (`components/ProjectModal.js:156`).
- `npm run test:security` → 38/38 tests passés (7 suites), 0 échec (contenu textuel sans
  rapport avec la logique testée).
- `npm run build` → build de production réussi, 9 pages générées, tailles identiques à
  l'étape 14. Aucune régression détectée.
- Affichage responsive : structure graphique (titre, deux paragraphes, phrase centrale en
  bleu, séparateur, phrase finale en italique) et classes Tailwind existantes conservées à
  l'identique ; aucun ajustement d'espacement nécessaire. Vérifié par revue de code (aucun
  outil de capture d'écran/navigateur disponible dans cet environnement).

### Étape 16
- Recherche exhaustive post-implémentation : 0 occurrence restante de « Près de huit ans au
  cœur des opérations », de « Cette expérience lui a permis de développer une vision
  transversale des opérations : flux, ressources... », du paragraphe « Il a notamment piloté... »
  et de la mention RELEX dans `components/`. Aucun doublon avec la section « Notre Vision »
  (`Solutions.js`).
- `npm run lint` → OK. Même avertissement préexistant non lié (`components/ProjectModal.js:156`).
- `npm run test:security` → 38/38 tests passés (7 suites), 0 échec (contenu textuel sans
  rapport avec la logique testée).
- `npm run build` → build de production réussi, 9 pages générées, tailles identiques à
  l'étape 15. Aucune régression détectée.
- Titre : structure `h2` à deux segments conservée ("Du terrain" en texte neutre, "à une
  vision transversale" en bleu `text-primary-600`), classes `text-4xl md:text-5xl` inchangées ;
  répartition des mots vérifiée par revue de code pour éviter qu'un seul mot soit isolé sur une
  ligne aux largeurs mobile/tablette/ordinateur. Non vérifié visuellement (aucun outil de
  capture d'écran/navigateur disponible dans cet environnement).

### Étape 17
- Recherche exhaustive post-implémentation : 0 occurrence restante de « Écoute Active »,
  « Accompagnement Personnalisé », « Immersion Métier » (carte), « Impact Business »,
  « Écoute & Découverte », « Co-construction », « Déploiement & Suivi », « Comment nous
  travaillons », « Survolez pour en savoir plus » et de la phrase « Cette démarche garantit
  que chaque solution est parfaitement alignée… » dans `components/` et `app/`.
- `npm run lint` → OK. Même avertissement préexistant non lié (`components/ProjectModal.js:156`).
- `npm run test:security` → 38/38 tests passés (7 suites), 0 échec (contenu et animation
  d'affichage sans rapport avec la logique testée).
- `npm run build` → build de production réussi, 9 pages générées, route `/` = 14,3 kB /
  161 kB First Load JS (légère hausse de 0,2 kB liée aux nouvelles icônes SVG et à la logique
  d'animation ; aucune régression). Vérification runtime : serveur de production démarré
  localement (`npm run start`), route `/` répondant en HTTP 200, présence confirmée du texte
  « Analyser. Structurer. Optimiser. » et absence totale des anciens textes dans le HTML rendu.
- Animation (revue de code, aucun navigateur disponible dans cet environnement pour un rendu
  visuel réel) :
  - Entrée : titre en fondu + léger déplacement vertical, ligne de progression qui se dessine
    (`scaleX`/`scaleY` de 0 à 1 selon l'orientation), 3 étapes qui apparaissent en cascade
    (`staggerChildren`), le tout déclenché une seule fois par chargement de page
    (`viewport={{ once: true }}` sur tous les blocs animés).
  - Bascule horizontal (ordinateur, `md:flex-row` + ligne `scaleX` `origin-left`) / vertical
    (mobile et tablette, `flex-col` + ligne `scaleY` `origin-top`) : gérée uniquement par les
    classes Tailwind responsives, sans dupliquer la logique JavaScript.
  - Chaque icône (balayage de flux pour Analyser, alignement de points pour Structurer,
    convergence de trajectoires pour Optimiser) rejoue une version courte de son animation au
    survol, au focus clavier ou au toucher (remontage ciblé via une clé React incrémentée à
    l'activation), sans jamais masquer le texte descriptif, déjà visible en permanence.
  - Aucune boucle infinie ni mouvement permanent : toutes les transitions sont `transform`/
    `opacity`, à durée finie, déclenchées uniquement par l'entrée dans le viewport ou une
    interaction ponctuelle.
- Clavier : chaque étape est focalisable (`tabIndex={0}`, `role="group"`, `aria-label`
  explicite « Étape 0X : Titre »), avec anneau de focus visible
  (`focus-visible:ring-4 focus-visible:ring-primary-200`) et mise en valeur identique au survol
  souris (`onFocus`/`onBlur` en plus de `onMouseEnter`/`onMouseLeave`/`onClick` pour le tactile).
- `prefers-reduced-motion` : hook `useReducedMotion` de `framer-motion` (déjà présente comme
  dépendance du projet, aucune nouvelle dépendance ajoutée). Lorsqu'il est actif, tous les
  blocs animés reçoivent `initial={false}` (état final affiché immédiatement, sans jouer
  l'animation d'entrée) et les 3 icônes basculent sur un rendu SVG statique déjà dans sa
  position finale (aucun élément `motion.*` utilisé dans ce mode).
- Absence de déblocage brutal de la mise en page (CLS) : dimensions des icônes (`h-9 w-9`),
  des badges numérotés et des cartes fixées par des classes Tailwind indépendantes de l'état
  d'animation ; seules les propriétés `transform`/`opacity`/couleur de fond changent, aucune
  propriété affectant la mise en page (`width`/`height`/`margin`) n'est animée.
- Aucun débordement horizontal : disposition en colonne sur mobile (`flex-col`), largeur du
  texte de description plafonnée (`max-w-xs`), aucune largeur fixe supérieure à la largeur du
  conteneur.

### Étape 18 — Phase C : formulaire de contact
- `npm run lint` → OK. Même avertissement préexistant non lié (`components/ProjectModal.js:156`).
- `npm run test:security` → **39/39 tests passés** (7 suites, 0 échec), incluant les nouveaux
  cas ajoutés pour cette étape (message manquant → message public précis + `field`, email
  invalide → message public précis + `field`, type de demande vide/obsolète rejeté). Aucun
  email réel envoyé, aucun secret réel utilisé.
- `npm run build` → build de production réussi, 9 pages générées, `/contact` = 4,25 kB /
  143 kB First Load JS (légère hausse liée à la validation cliente ajoutée). Aucune régression
  détectée.
- Vérification responsive/fonctionnelle : effectuée par revue de code (aucun navigateur
  disponible dans cet environnement) — la structure visuelle du formulaire (`bg-white p-8
  rounded-xl shadow-lg`, empilement vertical des champs) n'a pas été modifiée, seuls les
  libellés du champ « Type de demande », les messages d'erreur sous les champs et l'état du
  bouton ont changé ; le comportement responsive existant (hérité de `app/contact/page.js`,
  non modifié) reste donc inchangé sur ordinateur et mobile.
- Test d'envoi réel contrôlé (`[TEST FORMULAIRE JETC] Validation de l'envoi`) : **non
  effectué**. Aucune variable SMTP/Turnstile n'est configurée dans cet environnement (pas de
  fichier `.env`/`.env.local`) et aucun accès aux variables Vercel de production n'est
  disponible ; voir section 7.

### Étape 19 — Phase D : accueil et photo du fondateur
- Recherche exhaustive post-implémentation : 0 occurrence restante de « Découvrez le
  fondateur », de « Johnny Fleury<br » (bloc nom/statut de l'ancienne carte) ou de la classe
  `isHovered` dans `components/Hero.js`. `public/images/logo-jetc.png` toujours référencé par
  `components/Navbar.js` (non supprimé, à juste titre).
- `npm run lint` → OK. Même avertissement préexistant non lié (`components/ProjectModal.js:156`).
- `npm run test:security` → 39/39 tests passés (7 suites), 0 échec (modifications purement
  visuelles/structurelles du Hero et de la section parcours, sans rapport avec la logique
  testée).
- `npm run build` → build de production réussi, 9 pages générées, route `/` = 14,8 kB /
  161 kB First Load JS (légère hausse liée à l'illustration SVG animée, aucune régression).
- Vérification runtime : serveur de production démarré localement (`npm run start`), route `/`
  répondant en HTTP 200 ; présence confirmée de l'illustration animée (`aria-label`
  « Illustration d'une analyse opérationnelle… ») dans le HTML rendu.
- Affichage responsive : vérifié par revue des classes Tailwind (aucun outil de capture
  d'écran/navigateur disponible dans cet environnement) — l'illustration suit l'ordre naturel
  du DOM, donc `grid-cols-1` (mobile/tablette) l'affiche sous le texte et `lg:grid-cols-2`
  (ordinateur) l'affiche à droite, sans classe `order-*` ; largeur en pourcentage (`w-full`,
  `max-w-sm mx-auto lg:max-w-none`) et `viewBox` SVG évitant tout débordement horizontal.
- Accessibilité/réduction des animations : `useReducedMotion()` (déjà utilisé par
  `WorkProcess.js`) bascule l'illustration et le soulignement du titre sur un rendu statique
  complet et immédiat, sans élément `motion.*`, conformément à `prefers-reduced-motion`. Non
  vérifié avec un lecteur d'écran ou un appareil tactile réel (indisponibles dans cet
  environnement).
- Photo du petit carré (`Signature.js`) : fichier réutilisé sans duplication
  (`public/images/johnny-hero.jpg`, déjà présent dans le dépôt et déjà utilisé par l'ancienne
  carte du Hero) ; cadrage vérifié par revue de code (`object-cover` + `object-[center_20%]`,
  conteneur `w-28 h-28` avec `overflow-hidden`), non vérifié visuellement dans un navigateur
  réel.

## 7. Points restant à traiter

### À valider par l'utilisateur avant publication
- ⚠️ **Variables d'environnement de production (Vercel)** — non vérifiables depuis cet
  environnement (aucun accès Vercel). À vérifier par l'utilisateur dans **Vercel → Project →
  Settings → Environment Variables**, pour les environnements concernés :
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` — **obligatoires** pour les
    environnements Production et Preview (sans ces 5 variables, l'API renvoie une erreur 500
    générique, par conception, sans jamais afficher de faux succès).
  - `CONTACT_RECEIVER_EMAIL` — optionnelle, sinon repli automatique sur `contact@jetc-immo.ch`.
  - `TURNSTILE_SECRET_KEY` — **obligatoire en production** : si absente, la vérification
    anti-bot échoue systématiquement (comportement « fail-secure » documenté et volontaire,
    non modifié par cette mission) et **aucun email ne peut être envoyé** tant qu'elle n'est
    pas configurée.
  - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — doit être configurée de manière cohérente avec
    `TURNSTILE_SECRET_KEY` (même paire de clés Cloudflare Turnstile), sinon le widget côté
    client et la vérification côté serveur ne correspondront pas.
  - Aucune valeur de secret n'a été consultée, devinée ni affichée : seuls les **noms** de
    variables ci-dessus doivent être vérifiés par l'utilisateur.
- ⚠️ **Test contrôlé en production** (objet `[TEST FORMULAIRE JETC] Validation de l'envoi`,
  destinataire = adresse professionnelle JETC configurée) : à réaliser par l'utilisateur une
  fois les variables ci-dessus confirmées, ce test n'ayant pas pu être effectué depuis cet
  environnement (aucun accès au déploiement de production).
- ⚠️ **Rate limiting en mémoire** (`utils/security/rateLimit.js`) : le compteur est stocké dans
  une `Map` en mémoire du processus, réinitialisée à chaque démarrage/instance serverless sur
  Vercel. La protection anti-abus reste active mais peut être moins stricte en production
  multi-instance qu'en environnement mono-processus. Non modifié dans le cadre de cette
  mission (changement d'infrastructure hors périmètre, nécessiterait un store partagé type
  Upstash Redis déjà présent pour les stats mais pas branché sur le rate limiting).
- ⚠️ **Adresse de l'hébergeur** : l'adresse postale de Vercel Inc. indiquée dans
  `/mentions-legales` correspond aux informations publiques habituellement communiquées, mais
  n'a pas pu être vérifiée avec certitude dans cet environnement (pas d'accès à une source
  officielle en direct). À confirmer auprès de Vercel Inc. avant mise en ligne définitive.
- ⚠️ **Rendu visuel réel** : aucun outil de capture d'écran/navigateur n'est disponible dans cet
  environnement. Le rendu responsive (375/768/1024/1440 px), les contrastes, la navigation
  clavier/lecteur d'écran et l'absence d'avertissements console côté client ont été vérifiés
  par revue de code et tests HTTP, pas par un rendu réel dans un navigateur. À confirmer par
  l'utilisateur sur ses propres appareils.

### Hors périmètre de cette mission (non corrigé, à arbitrer si besoin)
- `Solutions.js` (« Notre Vision ») : seules la voix « je »→« nous » (étape 12) et la phrase de
  clôture (étape 14, remplacée par la citation de Johnny Fleury) ont été traitées. Les 4 cartes
  de la section (« Écoute Active », « Accompagnement Personnalisé »…) et leur discours restent
  génériques, sans mention explicite analyse/automatisation/simulation. À traiter dans une
  étape dédiée si souhaité.
- `Navbar.js` n'a pas été revu pour un éventuel alignement avec le nouveau discours.
- Les KPI « Traçabilité : 100% » et « Délais réduits : -40% » (carte JETC TracePilot, ex-
  « Traçabilité & Spotting Produits ») contiennent encore des pourcentages, mais portent déjà
  des notes qualificatives (« (démo) », « estimation en cas de rappel ») : jugés suffisamment
  qualifiés, non modifiés.
- `Solutions.js` contient des cartes cliquables (`onClick` sans support clavier) non corrigées
  car ce composant n'a jamais été modifié par cette mission (contrairement aux cartes de
  `Projects.js`, corrigées à l'étape 11).
- ⚠️ **Signature d'email « L'équipe JETC »** (`app/api/contact/route.js`, email de confirmation
  envoyé au visiteur) : laisse entendre l'existence d'une équipe, non établie par ailleurs sur
  le site (JETC Solution est présentée comme le travail de Johnny Fleury, entrepreneur
  individuel). Non modifiée dans le cadre de cette étape (hors périmètre : renommage de
  projets, parcours, citation, carte du fondateur) ; à corriger dans une étape dédiée si
  souhaité, en cohérence avec la règle validée en section 2 (ne pas laisser entendre qu'une
  équipe permanente existe).
- `public/image/image2.png` et `public/image/image5.png` (captures OrgaPulse et JETC Immo)
  restent dans le dépôt mais ne sont plus référencées par le carrousel ; conservées sans
  suppression, réutilisables si besoin.
- `public/images/prodorga/placeholder.svg` contient encore un texte "ProdOrga" mais n'est
  référencé par aucun composant (asset mort, jamais affiché) ; laissé en l'état, aucun fichier
  supprimé sans justification.
- Étapes suivantes à définir avec l'utilisateur.

## 8. Hash des commits

| Étape | Hash | Message |
|-------|------|---------|
| 1 | `7fee2d0` | docs: init suivi repositionnement JETC |
| 2 | `f4523fa` | feat: repositionnement hero page d'accueil (analyse operationnelle, automatisation, simulation) |
| 3 | `391df91` | feat: actualisation section parcours Johnny Fleury |
| 4 | `2748968` | feat: repositionnement JETC OrgaPulse (ex-ProdOrga) |
| 5 | `bafa04a` | feat: ajout carte Analyse & Simulation opérationnelle |
| 6 | `36235e9` | feat: clarification résultats, estimations et objectifs des projets |
| 7 | `bcd9356` | feat: reorganisation section Nos realisations (carrousel) |
| 8 | `5eea279` | feat: refonte pourquoi-nous-choisir et logique tarifaire |
| 9 | `5da2898` | feat: coherence page contact et pied de page |
| 10 | `e16f615` | feat: ajout page mentions legales |
| 11 | `9fa850b`* | fix: corrections issues de l'audit final |
| 12 | `e6eefb2` | feat: voix institutionnelle nous (phase A repositionnement) |
| 13 | `f26a05a`* | fix: fiabilisation envoi formulaire de contact (phase B) |
| 14 | `003d88b`* | feat: harmonisation noms projets, parcours 3e personne, citation fondateur |
| 15 | `7b35219`* | content: réécriture du contenu de la section Notre Vision |
| 16 | `58a6eb7`* | content: réécriture titre et paragraphes de la section parcours |
| 17 | `9af7695`* | feat: fusion cartes et méthode en section Analyser Structurer Optimiser |

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
