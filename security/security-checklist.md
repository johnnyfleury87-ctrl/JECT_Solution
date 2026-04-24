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

## Anti-bot avance (Phase 4)
- [x] Cloudflare Turnstile integre cote frontend (widget + Script lazyOnload)
- [x] Validation Turnstile server-side obligatoire (/api/contact)
- [x] Fail-secure en production si TURNSTILE_SECRET_KEY absent
- [x] Timeout 5 s sur l'appel API Cloudflare
- [x] Reset du widget apres soumission reussie

## Rate limiting avance (Phase 5)
- [x] Backoff progressif (×1 / ×2 / ×4 / ×8 / ×16)
- [x] Compteur de strikes par IP
- [x] Detection burst (5 hits en 5 secondes)
- [x] Dual-key : limite par IP + par session (80 %)
- [x] Journalisation des tentatives abusives via monitor

## Durcissement CSP (Phase 6)
- [x] img-src restreint (suppression wildcard https:)
- [x] font-src restreint (suppression wildcard https:)
- [x] style-src restreint (suppression wildcard https:)
- [x] connect-src liste blanche explicite (Turnstile + Vercel + Upstash)
- [x] frame-src ajoutee pour Turnstile iframe
- [x] script-src liste blanche explicite (Turnstile + Vercel Analytics)

## Monitoring & detection (Phase 7)
- [x] monitor.js centralise les evenements de securite
- [x] Compteurs par type d'evenement
- [x] Rolling event log (200 entrees)
- [x] Sanitisation des metadonnees sensibles
- [x] Hook externe (Sentry / Logtail) via monitor.setSink()
- [x] logger.error() remonte automatiquement dans monitor (api_error)

## STATS_API_TOKEN hardening (Phase 8)
- [x] Comparaison timing-safe (crypto.timingSafeEqual sur SHA-256)
- [x] Longueur minimale 32 caracteres verifiee
- [x] Acces refuse si token non configure (fail-secure)
- [x] Tentatives refusees journalisees dans monitor

## Tests de securite (Phase 9)
- [x] Tests rate limit (7 cas)
- [x] Tests guard/token (5 cas)
- [x] Tests monitor (6 cas)
- [x] Script npm run test:security
- [x] Loader ESM pour alias @/ en contexte Node.js natif
