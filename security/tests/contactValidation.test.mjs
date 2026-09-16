/**
 * Security contract tests for contact request parsing and validation.
 * These tests never create an SMTP transporter or send an email.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  CONTACT_REQUEST_MAX_BYTES,
  parseContactRequest,
  validateContactPayload,
} from '../../utils/security/contactValidation.js';

const validPayload = {
  name: 'Jean Dupont',
  email: 'jean@example.com',
  company: 'Example SA',
  requestType: 'Diagnostic opérationnel',
  message: 'Bonjour, je souhaite échanger au sujet de votre activité.',
  honeypot: '',
  turnstileToken: 'test-token',
};

function makeJsonRequest(value, headers = {}) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: value === undefined ? undefined : JSON.stringify(value),
  });
}

describe('parseContactRequest', () => {
  it('rejects an absent body and invalid JSON', async () => {
    assert.equal((await parseContactRequest(makeJsonRequest(undefined))).ok, false);
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{',
    });
    assert.equal((await parseContactRequest(request)).ok, false);
  });

  it('requires an application/json content type', async () => {
    const request = makeJsonRequest(validPayload, { 'content-type': 'text/plain' });
    assert.equal((await parseContactRequest(request)).ok, false);
  });

  it('rejects arrays, strings, numbers and null JSON values', async () => {
    for (const value of [[], 'text', 42, null]) {
      assert.equal((await parseContactRequest(makeJsonRequest(value))).ok, false);
    }
  });

  it('rejects an oversized request body', async () => {
    const request = makeJsonRequest({ ...validPayload, message: 'x'.repeat(CONTACT_REQUEST_MAX_BYTES) });
    assert.equal((await parseContactRequest(request)).ok, false);
  });
});

describe('validateContactPayload', () => {
  it('accepts the form values used by the contact component', () => {
    const result = validateContactPayload(validPayload);
    assert.equal(result.valid, true);
    assert.equal(result.data.name, 'Jean Dupont');
  });

  it('trims whitespace and rejects blank required fields', () => {
    const result = validateContactPayload({ ...validPayload, name: '   ', message: '  message valide  ' });
    assert.equal(result.valid, false);
    assert.equal(result.error, 'invalid_fields');
  });

  it('rejects non-string field values', () => {
    for (const field of ['name', 'email', 'company', 'requestType', 'message', 'honeypot', 'turnstileToken']) {
      assert.equal(validateContactPayload({ ...validPayload, [field]: 42 }).valid, false);
    }
  });

  it('enforces field lengths and email syntax', () => {
    assert.equal(validateContactPayload({ ...validPayload, name: 'x'.repeat(101) }).valid, false);
    assert.equal(validateContactPayload({ ...validPayload, company: 'x'.repeat(101) }).valid, false);
    assert.equal(validateContactPayload({ ...validPayload, email: `${'x'.repeat(250)}@x.com` }).valid, false);
    assert.equal(validateContactPayload({ ...validPayload, email: 'not-an-email' }).valid, false);
    assert.equal(validateContactPayload({ ...validPayload, message: 'x'.repeat(2001) }).valid, false);
  });

  it('allows only the request types exposed by the form', () => {
    for (const requestType of [
      'Diagnostic opérationnel',
      'Partenariat pilote',
      'Analyse et simulation',
      'JETC OrgaPulse',
      "Automatisation d'un processus",
      'Solution métier sur mesure',
      'Autre demande',
    ]) {
      assert.equal(validateContactPayload({ ...validPayload, requestType }).valid, true);
    }
    assert.equal(validateContactPayload({ ...validPayload, requestType: '' }).valid, false);
    assert.equal(validateContactPayload({ ...validPayload, requestType: 'Admin' }).valid, false);
    assert.equal(validateContactPayload({ ...validPayload, requestType: 'Discussion' }).valid, false);
  });

  it('rejects CRLF characters and a filled honeypot', () => {
    for (const field of ['name', 'email', 'company', 'requestType', 'message']) {
      assert.equal(validateContactPayload({ ...validPayload, [field]: `safe\r\nvalue` }).valid, false);
    }
    assert.equal(validateContactPayload({ ...validPayload, honeypot: 'filled' }).valid, false);
  });
});