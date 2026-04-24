const RATE_LIMIT_STORE = new Map();

function nowMs() {
  return Date.now();
}

export function getClientIp(request) {
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();

  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }

  const xRealIp = request.headers.get('x-real-ip');
  if (xRealIp) return xRealIp.trim();

  return 'unknown';
}

function cleanupOldEntries(maxIdleMs) {
  const now = nowMs();
  for (const [key, value] of RATE_LIMIT_STORE.entries()) {
    if (now - value.lastSeenAt > maxIdleMs) {
      RATE_LIMIT_STORE.delete(key);
    }
  }
}

export function checkSlidingWindowRateLimit({
  request,
  routeKey,
  limit = 10,
  windowMs = 60_000,
  blockDurationMs = 5 * 60_000,
}) {
  const ip = getClientIp(request);
  const key = `${routeKey}:${ip}`;
  const now = nowMs();

  const existing = RATE_LIMIT_STORE.get(key) || {
    hits: [],
    blockedUntil: 0,
    lastSeenAt: now,
  };

  existing.lastSeenAt = now;

  if (existing.blockedUntil > now) {
    const retryAfterSeconds = Math.ceil((existing.blockedUntil - now) / 1000);
    RATE_LIMIT_STORE.set(key, existing);
    return {
      allowed: false,
      ip,
      retryAfterSeconds,
      remaining: 0,
    };
  }

  const windowStart = now - windowMs;
  existing.hits = existing.hits.filter((timestamp) => timestamp > windowStart);

  if (existing.hits.length >= limit) {
    existing.blockedUntil = now + blockDurationMs;
    RATE_LIMIT_STORE.set(key, existing);
    return {
      allowed: false,
      ip,
      retryAfterSeconds: Math.ceil(blockDurationMs / 1000),
      remaining: 0,
    };
  }

  existing.hits.push(now);
  RATE_LIMIT_STORE.set(key, existing);

  // Opportunistic cleanup to keep memory bounded.
  if (RATE_LIMIT_STORE.size > 1000) {
    cleanupOldEntries(Math.max(windowMs, blockDurationMs) * 2);
  }

  return {
    allowed: true,
    ip,
    retryAfterSeconds: 0,
    remaining: Math.max(0, limit - existing.hits.length),
  };
}
