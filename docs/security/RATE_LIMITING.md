# Rate limiting

## État actuel

Les routes API utilisent `utils/security/rateLimit.js`, un limiteur en mémoire avec fenêtre glissante, blocage temporaire, backoff progressif, détection de rafale et clés IP/session lorsque disponibles.

Cette protection reste utile sur une instance unique, mais elle n’est pas cohérente entre plusieurs instances serverless Vercel : chaque instance possède son propre état mémoire et les compteurs peuvent être perdus lors d’un redémarrage.

## Migration future vers une solution distribuée

Une étape distincte devra :

1. choisir un stockage partagé compatible avec le déploiement, par exemple Upstash Redis ;
2. définir des clés avec expiration pour l’IP, la session et la route ;
3. conserver les réponses 429 et les valeurs `Retry-After` actuelles ;
4. limiter les données conservées et vérifier la politique de confidentialité ;
5. tester la concurrence entre plusieurs instances et les pannes du stockage ;
6. documenter les variables serveur sans jamais publier leurs valeurs.

Aucun service externe n’est configuré par le présent durcissement et aucun changement de variable Vercel n’est nécessaire ici.