import { createHash, timingSafeEqual } from 'node:crypto';
import { forbiddenResponse } from '@/utils/security/responses';
import { monitor } from '@/utils/security/monitor';

/** Minimum acceptable token length. Anything shorter is rejected even if it matches. */
const MIN_TOKEN_LENGTH = 32;

/**
 * Timing-safe string comparison.
 * Both values are hashed to equal length before comparing,
 * preventing length-based timing attacks.
 */
function timingSafeStringEqual(a, b) {
  const ha = createHash('sha256').update(String(a)).digest();
  const hb = createHash('sha256').update(String(b)).digest();
  return timingSafeEqual(ha, hb);
}

function readTokenFromRequest(request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }

  const customHeader = request.headers.get('x-internal-token');
  if (customHeader) {
    return customHeader.trim();
  }

  return '';
}

export function requireInternalTokenInProduction(request, envVarName) {
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    return null;
  }

  const expectedToken = process.env[envVarName];

  // Reject immediately if token is absent or too short (misconfiguration).
  if (!expectedToken || expectedToken.length < MIN_TOKEN_LENGTH) {
    monitor.increment('forbidden_access', { reason: 'token_not_configured', env: envVarName });
    return forbiddenResponse();
  }

  const providedToken = readTokenFromRequest(request);

  if (!providedToken || !timingSafeStringEqual(providedToken, expectedToken)) {
    monitor.increment('forbidden_access', { reason: 'invalid_token' });
    return forbiddenResponse();
  }

  return null;
}
