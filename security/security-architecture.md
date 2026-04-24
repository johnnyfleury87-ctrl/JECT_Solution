# Security Architecture

## Vue d'ensemble
La securite est desormais structuree autour de quatre couches:
1. Durcissement HTTP global
2. Protection anti-abus des API
3. Gestion defensive des erreurs
4. Journalisation securisee

## 1) Durcissement HTTP global
Configuration centralisee dans `next.config.js`:
- CSP
- HSTS
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

Objectif: limiter les risques XSS, clickjacking, sniffing et fuites de referrer.

## 2) Flux API securises
Routes publiques:
- `POST /api/contact`
- `POST /api/ping`

Routes sensibles:
- `GET /api/active`
- `GET /api/stats`

Protections appliquees:
- Rate limiting glissant par IP sur toutes les routes ci-dessus
- Erreurs client standardisees et non verbeuses
- Endpoints sensibles proteges par token en production (`STATS_API_TOKEN`)

## 3) Gestion des erreurs
Principes:
- Aucune stack trace en reponse HTTP
- Aucune information SMTP/config exposee
- Message client neutre et stable

Implementation:
- `utils/security/responses.js`
- `genericErrorResponse`, `rateLimitExceededResponse`, `forbiddenResponse`

## 4) Strategie anti-abus
Implementation actuelle:
- Fenetre glissante en memoire (`utils/security/rateLimit.js`)
- Blocage temporaire automatique apres depassement

Valeurs appliquees:
- Contact: 6/minute, blocage 10 minutes
- Ping/Stats/Active: 10/minute, blocage 5 minutes

Evolution conseillee:
- Basculer sur stockage distribue (Redis) pour serverless multi-instances.

## 5) Logging securise
Implementation:
- Logger centralise `utils/security/logger.js`

Regles:
- Niveaux de log (`info`, `warn`, `error`, `debug`)
- Filtrage de cles sensibles
- Pas de donnees utilisateur ni secrets dans les logs applicatifs

## 6) Confidentialite et conformite
- Page publique RGPD/Confidentialite: `app/confidentialite/page.js`
- Lien acces rapide dans le footer

## 7) Variables d'environnement attendues
- SMTP_HOST
- SMTP_PORT
- SMTP_USER
- SMTP_PASS
- SMTP_FROM
- CONTACT_RECEIVER_EMAIL (optionnel)
- UPSTASH_REDIS_REST_URL (si analytics)
- UPSTASH_REDIS_REST_TOKEN (si analytics)
- STATS_API_TOKEN (requis en production pour stats/active)
