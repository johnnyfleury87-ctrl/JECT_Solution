/**
 * Security tests – Guard (internal token protection)
 *
 * Run with:  node --test security/tests/guard.test.mjs
 */

import { describe, it, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';

function makeRequest(token, headerName = 'authorization') {
  return {
    headers: {
      get(name) {
        if (name === headerName) {
          if (headerName === 'authorization') return token ? `Bearer ${token}` : null;
          return token || null;
        }
        return null;
      },
    },
  };
}

const { requireInternalTokenInProduction } = await import(
  '../../utils/security/guard.js'
);

describe('requireInternalTokenInProduction', () => {
  const originalEnv = process.env.NODE_ENV;
  const originalToken = process.env.TEST_GUARD_TOKEN;

  beforeEach(() => {
    // Force production mode for these tests via direct assignment.
    process.env.NODE_ENV = 'production';
  });

  after(() => {
    process.env.NODE_ENV = originalEnv;
    if (originalToken === undefined) {
      delete process.env.TEST_GUARD_TOKEN;
    } else {
      process.env.TEST_GUARD_TOKEN = originalToken;
    }
  });

  it('returns 403 when env var is not set', async () => {
    delete process.env.TEST_GUARD_TOKEN;
    const req = makeRequest('any-token-here-that-is-long-enough-32chars');
    const response = requireInternalTokenInProduction(req, 'TEST_GUARD_TOKEN');
    assert.ok(response !== null);
    assert.equal(response.status, 403);
  });

  it('returns 403 when env token is too short (< 32 chars)', async () => {
    process.env.TEST_GUARD_TOKEN = 'short';
    const req = makeRequest('short');
    const response = requireInternalTokenInProduction(req, 'TEST_GUARD_TOKEN');
    assert.ok(response !== null);
    assert.equal(response.status, 403);
  });

  it('returns 403 when provided token does not match', async () => {
    process.env.TEST_GUARD_TOKEN = 'a'.repeat(32);
    const req = makeRequest('wrong-token-that-is-long-enough-32chars');
    const response = requireInternalTokenInProduction(req, 'TEST_GUARD_TOKEN');
    assert.ok(response !== null);
    assert.equal(response.status, 403);
  });

  it('returns null (allowed) when token matches', async () => {
    const validToken = 'v4lid-t0ken-that-is-long-enough-32chars';
    process.env.TEST_GUARD_TOKEN = validToken;
    const req = makeRequest(validToken);
    const response = requireInternalTokenInProduction(req, 'TEST_GUARD_TOKEN');
    assert.equal(response, null);
  });

  it('reads token from x-internal-token header', async () => {
    const validToken = 'v4lid-t0ken-via-custom-header-32chars!';
    process.env.TEST_GUARD_TOKEN = validToken;
    const req = makeRequest(validToken, 'x-internal-token');
    const response = requireInternalTokenInProduction(req, 'TEST_GUARD_TOKEN');
    assert.equal(response, null);
  });
});
