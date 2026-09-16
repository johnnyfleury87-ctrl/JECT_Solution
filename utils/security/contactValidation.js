export const CONTACT_REQUEST_MAX_BYTES = 12_000;

const MAX_LENGTHS = {
  name: 100,
  email: 254,
  company: 100,
  requestType: 20,
  message: 2_000,
};

// Valeurs techniques courtes et stables : les libellés publics ne doivent
// jamais être utilisés comme valeur transmise par le formulaire.
export const REQUEST_TYPES = [
  { value: 'information', label: 'Demande de renseignements' },
  { value: 'pilot', label: 'Je souhaite devenir pilote' },
];

export const REQUEST_TYPE_LABELS = Object.fromEntries(
  REQUEST_TYPES.map(({ value, label }) => [value, label])
);

const ALLOWED_REQUEST_TYPES = new Set(REQUEST_TYPES.map(({ value }) => value));

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
    return { valid: false, code: 'invalid_payload', field: null };
  }

  const fields = ['name', 'email', 'company', 'requestType', 'message', 'honeypot', 'turnstileToken'];
  for (const field of fields) {
    if (payload[field] !== undefined && typeof payload[field] !== 'string') {
      return { valid: false, code: 'invalid_fields', field: null };
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

  // Le honeypot est vérifié en premier : un bot qui le remplit ne doit
  // recevoir aucune information exploitable sur la validation des autres champs.
  if (data.honeypot !== '') {
    return { valid: false, code: 'invalid_fields', field: null };
  }

  if (data.name.length < 2 || data.name.length > MAX_LENGTHS.name) {
    return { valid: false, code: 'invalid_name', field: 'name' };
  }

  if (data.company.length > MAX_LENGTHS.company) {
    return { valid: false, code: 'invalid_company', field: 'company' };
  }

  if (data.requestType.length === 0 || !ALLOWED_REQUEST_TYPES.has(data.requestType)) {
    return { valid: false, code: 'invalid_request_type', field: 'requestType' };
  }

  if (data.email.length === 0 || data.email.length > MAX_LENGTHS.email || !EMAIL_PATTERN.test(data.email)) {
    return { valid: false, code: 'invalid_email', field: 'email' };
  }

  if (data.message.length < 10) {
    return { valid: false, code: 'message_too_short', field: 'message' };
  }

  if (data.message.length > MAX_LENGTHS.message) {
    return { valid: false, code: 'message_too_long', field: 'message' };
  }

  if ([data.name, data.email, data.company, data.requestType, data.message].some((value) => HEADER_BREAK_PATTERN.test(value))) {
    return { valid: false, code: 'invalid_fields', field: null };
  }

  return { valid: true, data };
}