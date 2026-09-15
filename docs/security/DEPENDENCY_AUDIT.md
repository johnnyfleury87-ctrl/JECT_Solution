# Suivi de l’audit des dépendances

Ce document conserve les résultats des audits réalisés le 15 septembre 2026. La correction Next.js est suivie dans un commit séparé ; Nodemailer et les autres dépendances restent volontairement inchangés.

## Résultats

Avant correction, `npm audit --omit=dev` signalait une vulnérabilité critique dans Next.js `15.5.15`. Les avis concernés imposaient au minimum Next.js `15.5.24`.

Après passage à Next.js `15.5.24`, l’audit production signale encore 5 vulnérabilités, dont aucune critique :

| Gravité | Dépendance | Nature | Suite recommandée |
|---|---|---|---|
| Modérée | `next@15.5.24` via `postcss` | Avis PostCSS liés aux source maps et à la sortie CSS | Traiter PostCSS ou étudier la migration majeure vers Next.js `16.3.5` dans une étape séparée. |
| Élevée | `nodemailer@8.0.5` | Injections, validation de domaines et accès de contenu | Évaluer `nodemailer@10.0.10`, migration majeure séparée et tests SMTP non destructifs. |
| Élevée | `nanoid` transitive | Génération avec tailles invalides et débordement | Mettre à jour la dépendance par l’arbre Next.js/PostCSS, puis vérifier le lockfile. |
| Élevée | `postcss` transitive | Risques liés aux source maps et à la sortie CSS | Mettre à jour PostCSS dans une modification dédiée et reconstruire. |
| Élevée | `sharp` transitive | Vulnérabilités libvips/libheif | Mettre à jour via Next.js ou la dépendance concernée et tester l’optimisation d’images. |

## Règles de traitement

- Ne pas exécuter `npm audit fix` automatiquement.
- Séparer les mises à jour patch/minor des mises à jour majeures.
- Vérifier le changelog et les avis de sécurité de chaque version.
- Exécuter `npm run lint`, `npm run test:security` et `npm run build` après chaque groupe cohérent.
- Ne jamais afficher de contenu `.env`, de token ou de sortie contenant des secrets.