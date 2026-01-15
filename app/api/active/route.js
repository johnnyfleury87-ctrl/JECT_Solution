import { Redis } from '@upstash/redis';

export const dynamic = 'force-dynamic';

let redis = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

export async function GET() {
  if (!redis) {
    return Response.json({ active: 0 }, {
      headers: { 'Cache-Control': 'no-store, must-revalidate' }
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
      headers: { 'Cache-Control': 'no-store, must-revalidate' }
    });
  } catch (error) {
    console.error('Active visitors error:', error);
    return Response.json({ active: 0 });
  }
}
