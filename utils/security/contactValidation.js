export const CONTACT_REQUEST_MAX_BYTES = 12_000;

const MAX_LENGTHS = {
  name: 100,
  email: 254,
  company: 100,
  requestType: 30,
  message: 2_000,
};

const ALLOWED_REQUEST_TYPES = new Set([
  'Diagnostic opérationnel',
  'Partenariat pilote',
  'Analyse et simulation',
  'JETC OrgaPulse',
  "Automatisation d'un processus",
  'Solution métier sur mesure',
  'Autre demande',
]);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HEADER_BREAK_PATTERN = /[\r\n]/;

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    && Object.getPrototypeOf(value) === Object.prototype;
}

export async function parseContactRequest(request) {
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.toLowerCase().startsWith('application/json')) {
    return { ok: false, error: 'invalid_content_type' };
  }

  const contentLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(contentLength) && contentLength > CONTACT_REQUEST_MAX_BYTES) {
    return { ok: false, error: 'body_too_large' };
  }

  let rawBody;
  try {
    rawBody = await request.text();
  } catch {
    return { ok: false, error: 'invalid_body' };
  }

  if (!rawBody || Buffer.byteLength(rawBody, 'utf8') > CONTACT_REQUEST_MAX_BYTES) {
    return { ok: false, error: 'body_too_large' };
  }

  let data;
  try {
    data = JSON.parse(rawBody);
  } catch {
    return { ok: false, error: 'invalid_json' };
  }

  if (!isPlainObject(data)) {
    return { ok: false, error: 'invalid_payload' };
  }

  return { ok: true, data };
}

export function validateContactPayload(payload) {
  if (!isPlainObject(payload)) {
    return { valid: false, error: 'invalid_payload' };
  }

  const fields = ['name', 'email', 'company', 'requestType', 'message', 'honeypot', 'turnstileToken'];
  for (const field of fields) {
    if (payload[field] !== undefined && typeof payload[field] !== 'string') {
      return { valid: false, error: 'invalid_fields' };
    }
  }

  const data = {
    name: payload.name?.trim() || '',
    email: payload.email?.trim() || '',
    company: payload.company?.trim() || '',
    requestType: payload.requestType?.trim() || '',
    message: payload.message?.trim() || '',
    honeypot: payload.honeypot?.trim() || '',
    turnstileToken: payload.turnstileToken?.trim() || '',
  };

  if (
    data.name.length < 2 || data.name.length > MAX_LENGTHS.name
    || data.email.length === 0 || data.email.length > MAX_LENGTHS.email
    || data.company.length > MAX_LENGTHS.company
    || data.requestType.length === 0 || data.requestType.length > MAX_LENGTHS.requestType
    || data.message.length < 10 || data.message.length > MAX_LENGTHS.message
  ) {
    return { valid: false, error: 'invalid_fields' };
  }

  if (!EMAIL_PATTERN.test(data.email) || !ALLOWED_REQUEST_TYPES.has(data.requestType)) {
    return { valid: false, error: 'invalid_fields' };
  }

  if (
    data.honeypot !== ''
    || [data.name, data.email, data.company, data.requestType, data.message].some((value) => HEADER_BREAK_PATTERN.test(value))
  ) {
    return { valid: false, error: 'invalid_fields' };
  }

  return { valid: true, data };
}