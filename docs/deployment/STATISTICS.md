# Statistiques et visiteurs actifs

Les routes `/api/ping`, `/api/active` et `/api/stats` utilisent Upstash Redis lorsque les variables correspondantes sont configurées. Le widget est désactivé par défaut lorsque `NEXT_PUBLIC_ENABLE_STATS` n’est pas égal à `true`.

## Variables Vercel

Configurer uniquement les noms suivants dans Vercel, sans les commiter :

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `STATS_API_TOKEN` pour les routes statistiques protégées en production
- `NEXT_PUBLIC_ENABLE_STATS=true` uniquement si le widget doit être exposé

Les valeurs doivent être créées dans le tableau de bord du fournisseur puis appliquées à Production, Preview ou Development selon le besoin. Ne jamais publier un token dans un document, une capture ou une commande shell.

## Vérification

Après redéploiement, vérifier les réponses des routes et l’absence d’erreurs dans les logs Vercel. Les commandes suivantes utilisent une URL fictive et ne doivent pas contenir de secret :

```bash
curl -X POST https://example.invalid/api/ping \
  -H 'Content-Type: application/json' \
  -d '{"sessionId":"test-session"}'
curl https://example.invalid/api/active
```

Le code actuel utilise les variables `UPSTASH_*`. Les variables `KV_REST_API_*` ne sont pas prises en charge automatiquement et ne doivent pas être documentées comme équivalentes sans modification future du code.

## Limites connues

- Le rate limiting applicatif est actuellement en mémoire locale.
- Les statistiques nécessitent un stockage Redis partagé pour être cohérentes entre instances.
- Les tests multi-utilisateurs et les quotas doivent être validés sur l’environnement de déploiement.