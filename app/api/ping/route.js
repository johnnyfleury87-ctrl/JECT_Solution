import { Redis } from '@upstash/redis';

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
  if (!redis) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[/api/ping] Redis non configuré: UPSTASH_REDIS_REST_URL ou UPSTASH_REDIS_REST_TOKEN manquants');
    }
    return Response.json({ error: 'env_missing', message: 'Analytics not configured' }, { 
      status: 503,
      headers: { 'Cache-Control': 'no-store, must-revalidate' }
    });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const sessionId = body.sessionId;
    
    if (!sessionId) {
      return Response.json({ error: 'sessionId required' }, { 
        status: 400,
        headers: { 'Cache-Control': 'no-store, must-revalidate' }
      });
    }
    
    const timestamp = Date.now();
    const activeKey = `active:${sessionId}`;
    
    // Stocker le timestamp avec TTL de 10 minutes (600 secondes)
    await redis.set(activeKey, timestamp, { ex: 600 });
    
    // Incrémenter les compteurs quotidiens
    const today = new Date().toISOString().split('T')[0];
    await redis.incr(`visits:${today}`);
    
    return Response.json({ ok: true, sessionId }, {
      headers: { 'Cache-Control': 'no-store, must-revalidate' }
    });
  } catch (error) {
    console.error('[/api/ping] Erreur:', error);
    return Response.json({ error: 'Failed to record visit' }, { 
      status: 500,
      headers: { 'Cache-Control': 'no-store, must-revalidate' }
    });
  }
}
