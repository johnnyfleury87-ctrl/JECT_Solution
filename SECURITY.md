# SECURITY

## Politique securite du projet
Ce projet suit une approche defensive orientee production.

## Regles obligatoires pour les developpements futurs
1. Ne jamais exposer de diagnostics techniques en production.
2. Ne jamais renvoyer stack trace, `details` techniques ou secrets au client.
3. Toute route publique doit etre protegee par rate limiting.
4. Les endpoints sensibles doivent etre proteges (token ou authentification).
5. Les logs ne doivent contenir ni donnees personnelles ni secrets.
6. Tout identifiant client persistant doit etre genere de facon cryptographique.
7. Les headers de securite HTTP doivent rester actifs.
8. Toute mise a jour doit etre accompagnee d'un `npm audit` et d'un build.

## Exigences minimum de configuration
Variables critiques:
- SMTP_HOST
- SMTP_PORT
- SMTP_USER
- SMTP_PASS
- SMTP_FROM

Variables de securisation:
- STATS_API_TOKEN (production)
- CONTACT_RECEIVER_EMAIL (optionnel)

## Procedure de verification avant merge
1. `npm run lint`
2. `npm run build`
3. `npm audit --audit-level=high`
4. Verification manuelle:
   - POST /api/contact (OK)
   - depassement rate limit (429)
   - acces /api/stats sans token en prod (403)

## Signalement de vulnerabilite
En cas de faille suspectee:
1. Isoler le composant concerne.
2. Appliquer un correctif minimal et testable.
3. Documenter dans `security/security-report.md`.
4. Faire valider avant de deployer.
