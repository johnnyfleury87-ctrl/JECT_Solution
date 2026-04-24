/**
 * Security tests – Monitor (event tracking)
 *
 * Run with:  node --test security/tests/monitor.test.mjs
 */

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

const { monitor } = await import('../../utils/security/monitor.js');

describe('monitor', () => {
  beforeEach(() => {
    monitor.reset();
  });

  it('increments a counter', () => {
    monitor.increment('rate_limit_hit', { route: 'contact' });
    assert.equal(monitor.getMetrics()['rate_limit_hit'], 1);
  });

  it('accumulates multiple increments', () => {
    monitor.increment('forbidden_access');
    monitor.increment('forbidden_access');
    monitor.increment('forbidden_access');
    assert.equal(monitor.getMetrics()['forbidden_access'], 3);
  });

  it('appends to event log', () => {
    monitor.increment('burst_detected', { route: 'ping', strikes: 2 });
    const events = monitor.getRecentEvents(5);
    assert.equal(events.length, 1);
    assert.equal(events[0].type, 'burst_detected');
    assert.equal(events[0].strikes, 2);
  });

  it('sanitizes sensitive metadata keys', () => {
    monitor.increment('test_event', { token: 'secret123', route: 'api' });
    const events = monitor.getRecentEvents(1);
    assert.ok(!('token' in events[0]));
    assert.equal(events[0].route, 'api');
  });

  it('calls external sink when set', () => {
    let received = null;
    monitor.setSink((e) => { received = e; });
    monitor.increment('sink_test', { route: 'x' });
    assert.ok(received !== null);
    assert.equal(received.type, 'sink_test');
    monitor.setSink(null);
  });

  it('caps event log at MAX_EVENT_LOG entries', () => {
    for (let i = 0; i < 250; i++) {
      monitor.increment('spam');
    }
    const events = monitor.getRecentEvents(300);
    assert.ok(events.length <= 200, `Expected ≤ 200, got ${events.length}`);
  });
});
