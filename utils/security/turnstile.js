const TURNSTILE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/**
 * Validates a Cloudflare Turnstile token server-side.
 * @param {string} token  - The cf-turnstile-response token from the frontend.
 * @param {string} ip     - Client IP (optional, forwarded for additional binding).
 * @returns {{ success: boolean, error?: string }}
 */
export async function validateTurnstileToken(token, ip = '') {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // If no secret key is configured, skip validation in development.
  if (!secretKey) {
    if (process.env.NODE_ENV !== 'production') {
      return { success: true };
    }
    return { success: false, error: 'turnstile_not_configured' };
  }

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
