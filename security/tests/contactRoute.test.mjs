/**
 * Contact route security tests. Every request fails before SMTP transport
 * creation, so these tests cannot send an email.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

process.env.NODE_ENV = 'production';

const { POST } = await import('../../app/api/contact/route.js');

const payload = {
  name: 'Jean Dupont',
  email: 'jean@example.com',
  company: 'Example SA',
  requestType: 'Discussion',
  message: 'Bonjour, je souhaite échanger au sujet de votre activité.',
};

function request(body, ip = '198.51.100.10', headers = {}) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': ip,
      ...headers,
    },
    body,
  });
}

async function responseBody(response) {
  return response.json();
}

describe('POST /api/contact security boundary', () => {
  it('returns a generic 400 for invalid JSON without technical details', async () => {
    const response = await POST(request('{'));
    const body = await responseBody(response);
    assert.equal(response.status, 400);
    assert.deepEqual(body, { error: 'Données invalides.' });
  });

  it('rejects a non-JSON content type', async () => {
    const response = await POST(request(JSON.stringify(payload), '198.51.100.11', {
      'content-type': 'text/plain',
    }));
    assert.equal(response.status, 400);
  });

  it('rejects a filled honeypot before Turnstile or SMTP', async () => {
    const response = await POST(request(JSON.stringify({ ...payload, honeypot: 'bot' }), '198.51.100.12'));
    const body = await responseBody(response);
    assert.equal(response.status, 400);
    assert.deepEqual(body, { error: 'Données invalides.' });
  });

  it('rejects missing and malformed Turnstile tokens without sending email', async () => {
    const missing = await POST(request(JSON.stringify(payload), '198.51.100.13'));
    const malformed = await POST(request(JSON.stringify({ ...payload, turnstileToken: 'short' }), '198.51.100.14'));
    assert.equal(missing.status, 400);
    assert.equal(malformed.status, 400);
    assert.match((await responseBody(missing)).error, /anti-bot/i);
    assert.match((await responseBody(malformed)).error, /anti-bot/i);
  });

  it('returns 429 after the contact rate limit is exceeded', async () => {
    const ip = '198.51.100.15';
    let response;
    for (let attempt = 0; attempt < 7; attempt += 1) {
      response = await POST(request(JSON.stringify(payload), ip));
      if (response.status === 429) break;
      assert.equal(response.status, 400);
    }
    assert.equal(response.status, 429);
    const body = await responseBody(response);
    assert.equal(typeof body.error, 'string');
    assert.doesNotMatch(JSON.stringify(body), /stack|SMTP_PASS|SMTP_USER|secret|token/i);
  });
});