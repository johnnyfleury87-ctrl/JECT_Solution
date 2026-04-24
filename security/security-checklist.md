# Security Checklist

## API & abus
- [x] Rate limit actif sur /api/contact
- [x] Rate limit actif sur /api/ping
- [x] Rate limit actif sur /api/active
- [x] Rate limit actif sur /api/stats
- [x] Blocage temporaire apres depassement

## Erreurs & fuites
- [x] Plus de route GET de diagnostic contact exposee
- [x] Reponses API sans `details` ni stack
- [x] Messages d'erreur client generiques

## Endpoints sensibles
- [x] /api/active protege en production
- [x] /api/stats protege en production
- [x] Token interne requis (`STATS_API_TOKEN`)

## Hardening HTTP
- [x] CSP configure
- [x] HSTS configure
- [x] X-Frame-Options configure
- [x] X-Content-Type-Options configure
- [x] Referrer-Policy configure
- [x] Permissions-Policy configure

## Session & stockage
- [x] Suppression de Math.random pour sessionId
- [x] Utilisation de crypto.randomUUID
- [x] Rotation session appliquee (24h)

## Logs
- [x] Logger centralise par niveaux
- [x] Filtrage des metadonnees sensibles
- [x] Logs client inutiles supprimes

## Dependances
- [x] npm audit fixe
- [x] next mis a jour
- [x] nodemailer mis a jour
- [x] Audit final: 0 vulnerabilite

## Conformite
- [x] Page de confidentialite publiee
- [x] Finalites, conservation, droits et contact documentes
