/**
 * Contact route security tests.
 *
 * Requests that fail before Turnstile/SMTP are asserted directly.
 * Requests that must reach the SMTP transport use a mocked `nodemailer`
 * module (via node:test module mocking) and a mocked Turnstile `fetch`
 * verification call, so no real network/email is ever sent.
 */

import { describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';

process.env.NODE_ENV = 'production';

// Turnstile: configured with a fake secret, but the verification call itself
// is mocked below so no real request reaches Cloudflare.
process.env.TURNSTILE_SECRET_KEY = 'test-turnstile-secret-key-0000000000';

// SMTP: fake, non-secret placeholder values. The transporter is mocked below,
// so these never reach a real network socket.
process.env.SMTP_HOST = 'smtp.test.invalid';
process.env.SMTP_PORT = '587';
process.env.SMTP_USER = 'test-smtp-user';
process.env.SMTP_PASS = 'test-smtp-pass';
process.env.SMTP_FROM = 'contact@jetc-immo.ch';
process.env.CONTACT_RECEIVER_EMAIL = 'contact@jetc-immo.ch';

// Cloudflare Turnstile verification always succeeds in this suite; the
// negative Turnstile tests below never trigger a fetch (token too short/absent).
mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify({ success: true }), { status: 200 }));

const smtpState = {
  // null | 'internal' | 'confirmation' | 'both'
  failOn: null,
  calls: [],
};

function smtpError() {
  const error = new Error('SMTP failure (test double)');
  error.code = 'ECONNECTION';
  return error;
}

mock.module('nodemailer', {
  exports: {
    default: {
      createTransport: () => ({
        sendMail: async (options) => {
          smtpState.calls.push(options);
          const isInternal = options.subject === 'Nouvelle demande de contact – JETC';
          const shouldFail =
            smtpState.failOn === 'both' ||
            (smtpState.failOn === 'internal' && isInternal) ||
            (smtpState.failOn === 'confirmation' && !isInternal);
          if (shouldFail) {
            throw smtpError();
          }
          return { messageId: 'test-message-id' };
        },
      }),
    },
  },
});

const { POST } = await import('../../app/api/contact/route.js');

const payload = {
  name: 'Jean Dupont',
  email: 'jean@example.com',
  company: 'Example SA',
  requestType: 'information',
  message: 'Bonjour, nous souhaitons échanger au sujet de votre activité.',
};

const validTurnstileToken = 'valid-test-turnstile-token-1234567890';

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

function assertNoSecretLeak(body) {
  assert.doesNotMatch(
    JSON.stringify(body),
    /SMTP_PASS|SMTP_USER|test-smtp-pass|test-smtp-user|stack|secret|password/i
  );
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
    assert.equal(smtpState.calls.length, 0);
  });

  it('rejects a request with missing required fields (message)', async () => {
    const { message, ...withoutMessage } = payload;
    const response = await POST(request(
      JSON.stringify({ ...withoutMessage, turnstileToken: validTurnstileToken }),
      '198.51.100.16'
    ));
    const body = await responseBody(response);
    assert.equal(response.status, 400);
    assert.deepEqual(body, { error: 'Votre message est trop court.', field: 'message' });
  });

  it('rejects an invalid email address', async () => {
    const response = await POST(request(
      JSON.stringify({ ...payload, email: 'not-an-email', turnstileToken: validTurnstileToken }),
      '198.51.100.17'
    ));
    const body = await responseBody(response);
    assert.equal(response.status, 400);
    assert.deepEqual(body, { error: 'Veuillez saisir une adresse e-mail valide.', field: 'email' });
    assert.equal(smtpState.calls.length, 0);
  });

  it('rejects an unselected or obsolete request type', async () => {
    const missing = await POST(request(
      JSON.stringify({ ...payload, requestType: '', turnstileToken: validTurnstileToken }),
      '198.51.100.21'
    ));
    const obsolete = await POST(request(
      JSON.stringify({ ...payload, requestType: 'Diagnostic opérationnel', turnstileToken: validTurnstileToken }),
      '198.51.100.22'
    ));
    assert.equal(missing.status, 400);
    assert.equal(obsolete.status, 400);
    assert.deepEqual(await responseBody(missing), {
      error: 'Veuillez sélectionner le motif de votre demande.',
      field: 'requestType',
    });
    assert.deepEqual(await responseBody(obsolete), {
      error: 'Veuillez sélectionner le motif de votre demande.',
      field: 'requestType',
    });
  });

  it('sends the internal and confirmation emails and returns a real success for a valid request', async () => {
    smtpState.failOn = null;
    smtpState.calls.length = 0;

    const response = await POST(request(
      JSON.stringify({ ...payload, turnstileToken: validTurnstileToken }),
      '198.51.100.18'
    ));
    const body = await responseBody(response);

    assert.equal(response.status, 200);
    assert.deepEqual(body, { ok: true, message: 'Emails envoyés avec succès' });
    assert.equal(smtpState.calls.length, 2);
    assert.equal(smtpState.calls[0].from, 'contact@jetc-immo.ch');
    assert.equal(smtpState.calls[0].to, 'contact@jetc-immo.ch');
    assert.equal(smtpState.calls[0].replyTo, payload.email);
    assert.equal(smtpState.calls[1].to, payload.email);
    assertNoSecretLeak(body);
  });

  it('returns 502 without leaking technical details when the internal SMTP send fails', async () => {
    smtpState.failOn = 'internal';
    smtpState.calls.length = 0;

    const response = await POST(request(
      JSON.stringify({ ...payload, turnstileToken: validTurnstileToken }),
      '198.51.100.19'
    ));
    const body = await responseBody(response);

    assert.equal(response.status, 502);
    assert.deepEqual(body, { error: 'Une erreur est survenue.' });
    assertNoSecretLeak(body);

    smtpState.failOn = null;
  });

  it('still reports success when only the confirmation email fails (real demand was received)', async () => {
    smtpState.failOn = 'confirmation';
    smtpState.calls.length = 0;

    const response = await POST(request(
      JSON.stringify({ ...payload, turnstileToken: validTurnstileToken }),
      '198.51.100.20'
    ));
    const body = await responseBody(response);

    assert.equal(response.status, 200);
    assert.deepEqual(body, { ok: true, message: 'Emails envoyés avec succès' });

    smtpState.failOn = null;
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