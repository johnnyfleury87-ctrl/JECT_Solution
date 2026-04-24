import { monitor } from '@/utils/security/monitor';

const SENSITIVE_KEY_PATTERN = /(pass|password|token|secret|smtp|stack|config|authorization|cookie|email|user)/i;

function sanitizeMeta(meta) {
  if (!meta || typeof meta !== 'object') {
    return undefined;
  }

  const sanitized = {};

  for (const [key, value] of Object.entries(meta)) {
    if (SENSITIVE_KEY_PATTERN.test(key)) {
      continue;
    }

    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      value === null
    ) {
      sanitized[key] = value;
    }
  }

  return Object.keys(sanitized).length > 0 ? sanitized : undefined;
}

function write(level, message, meta) {
  if (level === 'debug' && process.env.NODE_ENV === 'production') {
    return;
  }

  const safeMeta = sanitizeMeta(meta);
  const payload = safeMeta ? [message, safeMeta] : [message];

  if (level === 'error') {
    console.error('[security]', ...payload);
    monitor.increment('api_error', { route: safeMeta?.route });
    return;
  }

  if (level === 'warn') {
    console.warn('[security]', ...payload);
    return;
  }

  console.info('[security]', ...payload);
}

export const logger = {
  info: (message, meta) => write('info', message, meta),
  warn: (message, meta) => write('warn', message, meta),
  error: (message, meta) => write('error', message, meta),
  debug: (message, meta) => write('debug', message, meta),
};
