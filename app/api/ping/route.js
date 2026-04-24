import { Redis } from '@upstash/redis';
import { checkSlidingWindowRateLimit } from '@/utils/security/rateLimit';
import { genericErrorResponse, noStoreHeaders, rateLimitExceededResponse } from '@/utils/security/responses';
import { logger } from '@/utils/security/logger';

export const dynamic = 'force-dynamic';

// Initialiser Redis uniquement si les variables d'environnement sont présentes
let redis = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

export async function POST(request) {
  const rateCheck = checkSlidingWindowRateLimit({
    request,
    routeKey: 'ping',
    limit: 10,
    windowMs: 60_000,
    blockDurationMs: 5 * 60_000,
  });

  if (!rateCheck.allowed) {
    logger.warn('Ping route rate limited', { route: 'ping' });
    return rateLimitExceededResponse(rateCheck.retryAfterSeconds);
  }

  if (!redis) {
    return Response.json({ error: 'Une erreur est survenue.' }, {
      status: 503,
      headers: noStoreHeaders()
    });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const sessionId = body.sessionId;
    
    if (!sessionId || typeof sessionId !== 'string' || sessionId.length < 10 || sessionId.length > 80) {
      return Response.json({ error: 'Données invalides.' }, {
        status: 400,
        headers: noStoreHeaders()
      });
    }
    
    const timestamp = Date.now();
    const activeKey = `active:${sessionId}`;
    
    // Stocker le timestamp avec TTL de 10 minutes (600 secondes)
    await redis.set(activeKey, timestamp, { ex: 600 });
    
    // Incrémenter les compteurs quotidiens
    const today = new Date().toISOString().split('T')[0];
    await redis.incr(`visits:${today}`);
    
    return Response.json({ ok: true }, {
      headers: noStoreHeaders()
    });
  } catch {
    logger.error('Ping route unexpected failure', { route: 'ping' });
    return genericErrorResponse(500);
  }
}
