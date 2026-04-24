import { Redis } from '@upstash/redis';
import { requireInternalTokenInProduction } from '@/utils/security/guard';
import { checkSlidingWindowRateLimit } from '@/utils/security/rateLimit';
import { genericErrorResponse, noStoreHeaders, rateLimitExceededResponse } from '@/utils/security/responses';
import { logger } from '@/utils/security/logger';

export const dynamic = 'force-dynamic';

let redis = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

export async function GET(request) {
  const protectionResponse = requireInternalTokenInProduction(request, 'STATS_API_TOKEN');
  if (protectionResponse) {
    return protectionResponse;
  }

  const rateCheck = checkSlidingWindowRateLimit({
    request,
    routeKey: 'active',
    limit: 10,
    windowMs: 60_000,
    blockDurationMs: 5 * 60_000,
  });

  if (!rateCheck.allowed) {
    logger.warn('Active route rate limited', { route: 'active' });
    return rateLimitExceededResponse(rateCheck.retryAfterSeconds);
  }

  if (!redis) {
    return Response.json({ active: 0 }, {
      headers: noStoreHeaders()
    });
  }

  try {
    const now = Date.now();
    const fiveMinutesAgo = now - 300000; // 5 minutes
    
    // Récupérer toutes les clés de session active
    const keys = await redis.keys('active:*');
    
    let activeCount = 0;
    
    // Vérifier chaque session
    if (keys && keys.length > 0) {
      const values = await redis.mget(...keys);
      activeCount = values.filter(timestamp => {
        return timestamp && parseInt(timestamp) > fiveMinutesAgo;
      }).length;
    }
    
    return Response.json({ active: activeCount }, {
      headers: noStoreHeaders()
    });
  } catch {
    logger.error('Active route unexpected failure', { route: 'active' });
    return genericErrorResponse(500);
  }
}
