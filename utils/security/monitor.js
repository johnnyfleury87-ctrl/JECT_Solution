/**
 * In-memory event monitor.
 *
 * Tracks security events (rate limit hits, forbidden accesses, errors, …)
 * and exposes counters + a rolling event log.
 *
 * Compatible with external sinks: set NEXT_PUBLIC_MONITORING_DSN or call
 * monitor.setSink() to forward events to Sentry / Logtail / any service.
 */

const METRICS = new Map();
const EVENT_LOG = [];
const MAX_EVENT_LOG = 200;

/** Optional external sink: (event) => void */
let externalSink = null;

const BLOCKED_KEYS = /(pass|token|secret|key|auth|cookie|email|user)/i;

function sanitize(meta) {
  const safe = {};
  for (const [k, v] of Object.entries(meta || {})) {
    if (!BLOCKED_KEYS.test(k) && ['string', 'number', 'boolean'].includes(typeof v)) {
      safe[k] = v;
    }
  }
  return safe;
}

export const monitor = {
  /**
   * Increment a named counter and append to the rolling event log.
   * @param {string} eventType - e.g. 'rate_limit_hit', 'forbidden_access', 'turnstile_rejected'
   * @param {object} metadata  - Additional context (sanitized before storage)
   */
  increment(eventType, metadata = {}) {
    METRICS.set(eventType, (METRICS.get(eventType) || 0) + 1);

    const entry = {
      type: eventType,
      ts: Date.now(),
      ...sanitize(metadata),
    };

    EVENT_LOG.push(entry);
    if (EVENT_LOG.length > MAX_EVENT_LOG) {
      EVENT_LOG.shift();
    }

    if (typeof externalSink === 'function') {
      try {
        externalSink(entry);
      } catch {
        // Never crash the app because of a sink failure.
      }
    }
  },

  /**
   * Returns a snapshot of all counters since last reset.
   * @returns {Record<string, number>}
   */
  getMetrics() {
    return Object.fromEntries(METRICS.entries());
  },

  /**
   * Returns the N most recent security events.
   * @param {number} n
   * @returns {Array}
   */
  getRecentEvents(n = 20) {
    return EVENT_LOG.slice(-Math.min(n, MAX_EVENT_LOG));
  },

  /**
   * Register an external sink for forwarding events.
   * Example: monitor.setSink((e) => Sentry.addBreadcrumb({ message: e.type }))
   * @param {(event: object) => void} fn
   */
  setSink(fn) {
    externalSink = typeof fn === 'function' ? fn : null;
  },

  /** Reset all counters and event log (useful in tests). */
  reset() {
    METRICS.clear();
    EVENT_LOG.length = 0;
  },
};
