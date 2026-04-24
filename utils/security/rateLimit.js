import { logger } from '@/utils/security/logger';
import { monitor } from '@/utils/security/monitor';

const RATE_LIMIT_STORE = new Map();

// Progressive backoff: each consecutive block doubles the duration (up to ×16).
const BACKOFF_MULTIPLIERS = [1, 2, 4, 8, 16];

// Burst detection: too many hits in a very short window → immediate block.
const BURST_WINDOW_MS = 5_000;
const BURST_THRESHOLD = 5;

function nowMs() {
  return Date.now();
}

export function getClientIp(request) {
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();

  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) return xForwardedFor.split(',')[0].trim();

  const xRealIp = request.headers.get('x-real-ip');
  if (xRealIp) return xRealIp.trim();

  return 'unknown';
}

function progressiveBlock(strikes, baseMs) {
  const multiplier = BACKOFF_MULTIPLIERS[Math.min(strikes, BACKOFF_MULTIPLIERS.length - 1)];
  return baseMs * multiplier;
}

function cleanupOldEntries(maxIdleMs) {
  const now = nowMs();
  for (const [key, value] of RATE_LIMIT_STORE.entries()) {
    if (now - value.lastSeenAt > maxIdleMs) {
      RATE_LIMIT_STORE.delete(key);
    }
  }
}

/**
 * Core sliding-window check for a single store key.
 */
function checkKey(key, limit, windowMs, blockDurationMs, now) {
  const existing = RATE_LIMIT_STORE.get(key) || {
    hits: [],
    blockedUntil: 0,
    strikes: 0,
    lastSeenAt: now,
  };

  existing.lastSeenAt = now;

  // Still within an active block.
  if (existing.blockedUntil > now) {
    const retryAfterSeconds = Math.ceil((existing.blockedUntil - now) / 1000);
    RATE_LIMIT_STORE.set(key, existing);
    return { allowed: false, retryAfterSeconds, remaining: 0 };
  }

  // Slide the window.
  const windowStart = now - windowMs;
  existing.hits = existing.hits.filter((t) => t > windowStart);

  // Burst detection: N hits in a very short time → instant progressive block.
  const burstStart = now - BURST_WINDOW_MS;
  const burstCount = existing.hits.filter((t) => t > burstStart).length;
  if (burstCount >= BURST_THRESHOLD) {
    existing.strikes += 1;
    const blockMs = progressiveBlock(existing.strikes, blockDurationMs);
    existing.blockedUntil = now + blockMs;
    RATE_LIMIT_STORE.set(key, existing);
    monitor.increment('burst_detected', { route: key.split(':')[0], strikes: existing.strikes });
    logger.warn('Burst attack detected', {
      route: key.split(':')[0],
      strikes: existing.strikes,
      burstCount,
    });
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil(blockMs / 1000),
      remaining: 0,
    };
  }

  // Standard limit reached → progressive block.
  if (existing.hits.length >= limit) {
    existing.strikes += 1;
    const blockMs = progressiveBlock(existing.strikes, blockDurationMs);
    existing.blockedUntil = now + blockMs;
    RATE_LIMIT_STORE.set(key, existing);
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil(blockMs / 1000),
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
    retryAfterSeconds: 0,
    remaining: Math.max(0, limit - existing.hits.length),
  };
}

/**
 * Dual-key (per-IP + optional per-session) sliding-window rate limiter
 * with burst detection and progressive backoff.
 *
 * @param {{ request, routeKey, limit?, windowMs?, blockDurationMs?, sessionId? }} options
 */
export function checkSlidingWindowRateLimit({
  request,
  routeKey,
  limit = 10,
  windowMs = 60_000,
  blockDurationMs = 5 * 60_000,
  sessionId = null,
}) {
  const ip = getClientIp(request);
  const now = nowMs();

  // Per-IP check.
  const ipKey = `${routeKey}:${ip}`;
  const ipResult = checkKey(ipKey, limit, windowMs, blockDurationMs, now);
  if (!ipResult.allowed) {
    monitor.increment('rate_limit_hit', { route: routeKey, type: 'ip' });
    logger.warn('Rate limit exceeded', { route: routeKey, type: 'ip' });
    return { ...ipResult, ip };
  }

  // Optional per-session check (session limit is 80 % of IP limit for tighter control).
  if (sessionId && typeof sessionId === 'string' && sessionId.length >= 10) {
    // Truncate to avoid storing full session IDs.
    const sessionKey = `${routeKey}:session:${sessionId.substring(0, 40)}`;
    const sessionLimit = Math.max(1, Math.ceil(limit * 0.8));
    const sessionResult = checkKey(sessionKey, sessionLimit, windowMs, blockDurationMs, now);
    if (!sessionResult.allowed) {
      monitor.increment('rate_limit_hit', { route: routeKey, type: 'session' });
      logger.warn('Rate limit exceeded', { route: routeKey, type: 'session' });
      return { ...sessionResult, ip };
    }
  }

  return { ...ipResult, ip };
}
