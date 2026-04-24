/**
 * Security tests – Rate Limiting
 *
 * Run with:  node --test security/tests/rateLimit.test.mjs
 *
 * These tests exercise the in-memory sliding-window rate limiter directly,
 * without spinning up a Next.js server.
 */

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';

// ---------------------------------------------------------------------------
// Minimal shims so we can import the ESM module from a plain Node process.
// ---------------------------------------------------------------------------

// Simulate a Next.js Request with a specific IP.
function makeRequest(ip = '1.2.3.4') {
  return {
    headers: {
      get(name) {
        if (name === 'x-forwarded-for') return ip;
        return null;
      },
    },
  };
}

// We import the module via a file-relative path rather than the '@/' alias.
const { checkSlidingWindowRateLimit, getClientIp } = await import(
  '../../utils/security/rateLimit.js'
);

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('getClientIp', () => {
  it('extracts IP from x-forwarded-for', () => {
    const req = makeRequest('10.0.0.1');
    assert.equal(getClientIp(req), '10.0.0.1');
  });

  it('returns "unknown" when no header present', () => {
    const req = { headers: { get: () => null } };
    assert.equal(getClientIp(req), 'unknown');
  });

  it('picks first IP from a comma-separated list', () => {
    const req = { headers: { get: (h) => (h === 'x-forwarded-for' ? '9.9.9.9, 1.1.1.1' : null) } };
    assert.equal(getClientIp(req), '9.9.9.9');
  });
});

describe('checkSlidingWindowRateLimit', () => {
  const route = `test-rl-${Date.now()}`;

  it('allows requests under the limit', () => {
    const req = makeRequest('2.2.2.2');
    const result = checkSlidingWindowRateLimit({ request: req, routeKey: route, limit: 5, windowMs: 60_000, blockDurationMs: 5_000 });
    assert.equal(result.allowed, true);
  });

  it('blocks after limit is exceeded', () => {
    const ip = '3.3.3.3';
    const req = makeRequest(ip);
    const opts = { request: req, routeKey: `${route}-block`, limit: 3, windowMs: 60_000, blockDurationMs: 10_000 };
    // Exhaust the limit.
    checkSlidingWindowRateLimit(opts);
    checkSlidingWindowRateLimit(opts);
    checkSlidingWindowRateLimit(opts);
    // Next call should be blocked.
    const result = checkSlidingWindowRateLimit(opts);
    assert.equal(result.allowed, false);
    assert.ok(result.retryAfterSeconds > 0);
  });

  it('applies progressive backoff on repeated blocks', () => {
    const ip = '4.4.4.4';
    const req = makeRequest(ip);
    const opts = { request: req, routeKey: `${route}-backoff`, limit: 1, windowMs: 60_000, blockDurationMs: 1_000 };
    // First block.
    checkSlidingWindowRateLimit(opts);
    const r1 = checkSlidingWindowRateLimit(opts); // triggers block (strike 1)
    assert.equal(r1.allowed, false);
  });

  it('includes IP in result', () => {
    const req = makeRequest('5.5.5.5');
    const result = checkSlidingWindowRateLimit({ request: req, routeKey: `${route}-ip`, limit: 10 });
    assert.equal(result.ip, '5.5.5.5');
  });
});
