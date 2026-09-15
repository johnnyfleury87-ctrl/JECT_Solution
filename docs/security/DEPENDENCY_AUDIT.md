# Suivi de l’audit des dépendances

Ce document conserve les résultats de l’audit réalisé le 15 septembre 2026. Aucune mise à jour de dépendance n’est appliquée dans le commit de classement documentaire.

## Résultats

`npm audit --omit=dev` a signalé 5 vulnérabilités :

| Gravité | Dépendance | Nature | Suite recommandée |
|---|---|---|---|
| Critique | `next@15.5.15` | Plusieurs avis de sécurité Next.js, dont cache poisoning, SSRF, DoS et Server Actions | Mettre à jour vers la dernière version corrective compatible de la branche Next.js, puis tester lint, build et routes API. |
| Élevée | `nodemailer@8.0.5` | Injections, validation de domaines et accès de contenu | Évaluer `nodemailer@10.0.10`, migration majeure séparée et tests SMTP non destructifs. |
| Élevée | `nanoid` transitive | Génération avec tailles invalides et débordement | Mettre à jour la dépendance par l’arbre Next.js/PostCSS, puis vérifier le lockfile. |
| Élevée | `postcss` transitive | Risques liés aux source maps et à la sortie CSS | Mettre à jour dans une modification dédiée et reconstruire. |
| Élevée | `sharp` transitive | Vulnérabilités libvips/libheif | Mettre à jour via Next.js ou la dépendance concernée et tester l’optimisation d’images. |

## Règles de traitement

- Ne pas exécuter `npm audit fix` automatiquement.
- Séparer les mises à jour patch/minor des mises à jour majeures.
- Vérifier le changelog et les avis de sécurité de chaque version.
- Exécuter `npm run lint`, `npm run test:security` et `npm run build` après chaque groupe cohérent.
- Ne jamais afficher de contenu `.env`, de token ou de sortie contenant des secrets.