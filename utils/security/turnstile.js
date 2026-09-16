const TURNSTILE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/**
 * Determines whether Cloudflare Turnstile should be enforced.
 * - 'disabled'      : neither key configured — Turnstile is skipped entirely.
 * - 'enabled'       : both keys configured — a valid token is required.
 * - 'misconfigured' : only one of the two keys configured — refuse safely
 *                     instead of silently succeeding or silently failing open.
 * @returns {'disabled'|'enabled'|'misconfigured'}
 */
export function getTurnstileMode() {
  const hasSecretKey = Boolean(process.env.TURNSTILE_SECRET_KEY);
  const hasSiteKey = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  if (hasSecretKey && hasSiteKey) return 'enabled';
  if (!hasSecretKey && !hasSiteKey) return 'disabled';
  return 'misconfigured';
}

/**
 * Validates a Cloudflare Turnstile token server-side. Only call this when
 * `getTurnstileMode()` returned 'enabled' (a secret key is then guaranteed).
 * @param {string} token  - The cf-turnstile-response token from the frontend.
 * @param {string} ip     - Client IP (optional, forwarded for additional binding).
 * @returns {{ success: boolean, error?: string }}
 */
export async function validateTurnstileToken(token, ip = '') {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!token || typeof token !== 'string' || token.length < 10) {
    return { success: false, error: 'missing_token' };
  }

  try {
    const body = new URLSearchParams({ secret: secretKey, response: token });
    if (ip && ip !== 'unknown') {
      body.set('remoteip', ip);
    }

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      // Abort after 5 s to avoid hanging the contact route.
      signal: AbortSignal.timeout(5_000),
    });

    if (!response.ok) {
      return { success: false, error: 'turnstile_api_error' };
    }

    const result = await response.json();
    return { success: Boolean(result.success) };
  } catch {
    return { success: false, error: 'turnstile_fetch_failed' };
  }
}
