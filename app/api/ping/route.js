import { Redis } from '@upstash/redis';

// Initialiser Redis uniquement si les variables d'environnement sont présentes
let redis = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

// Génère un hash simple pour anonymiser les sessions
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

export async function POST(request) {
  if (!redis) {
    return Response.json({ error: 'Analytics not configured' }, { status: 503 });
  }

  try {
    const userAgent = request.headers.get('user-agent') || '';
    const forwarded = request.headers.get('x-forwarded-for') || '';
    const timestamp = Date.now();
    
    // Créer une clé de session anonyme (hash du user-agent + timestamp tronqué)
    const sessionKey = simpleHash(`${userAgent}-${Math.floor(timestamp / 3600000)}`);
    const activeKey = `active:${sessionKey}`;
    
    // Stocker le timestamp avec TTL de 10 minutes
    await redis.set(activeKey, timestamp, { ex: 600 });
    
    // Incrémenter les compteurs quotidiens
    const today = new Date().toISOString().split('T')[0];
    await redis.incr(`visits:${today}`);
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Ping error:', error);
    return Response.json({ error: 'Failed to record visit' }, { status: 500 });
  }
}
