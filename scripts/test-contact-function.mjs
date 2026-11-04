// Unit tests for functions/api/contact.js. No network, no real credentials: fetch is mocked.
// Run: npm run test:contact
import test from 'node:test';
import assert from 'node:assert/strict';
import { onRequest } from '../functions/api/contact.js';

const ENV = {
  TURNSTILE_SECRET_KEY: 'test-turnstile-secret',
  GHL_PRIVATE_INTEGRATION_TOKEN: 'test-ghl-token',
  GHL_LOCATION_ID: 'test-location',
  GHL_FIELD_SERVICE_ID: 'fld-service',
  GHL_FIELD_SMS_CONSENT_NONMARKETING_ID: 'fld-nonmarketing',
  GHL_FIELD_SMS_CONSENT_MARKETING_ID: 'fld-marketing',
  GHL_FIELD_CONSENT_AT_ID: 'fld-consent-at',
  GHL_FIELD_SOURCE_PAGE_ID: 'fld-source',
};
const URL_ = 'https://example.test/api/contact';
const GOOD = {
  name: 'Test Person',
  phone: '(310) 555-0101',
  email: 'test.person@example.com',
  service: 'ac-repair',
  message: 'Fictional test message.',
  source_page: '/services/ac-repair/',
  'cf-turnstile-response': 'test-token',
};

function makeRequest(fields = GOOD, { method = 'POST', headers = {}, raw } = {}) {
  let body;
  if (raw !== undefined) body = raw;
  else if (method === 'POST') {
    body = new FormData();
    for (const [k, v] of Object.entries(fields)) if (v !== undefined) body.set(k, v);
  }
  return new Request(URL_, { method, body, headers });
}

// Mock fetch + console capture. handlers override Turnstile / upsert / note behaviour.
async function run(req, { env = ENV, turnstile, upsert, note } = {}) {
  const calls = [];
  const logs = [];
  const realFetch = globalThis.fetch;
  const realLog = console.log;
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), init });
    const u = String(url);
    const h = u.includes('siteverify') ? turnstile : u.endsWith('/contacts/upsert') ? upsert : note;
    if (h) return h();
    if (u.includes('siteverify')) return Response.json({ success: true, hostname: 'example.test' });
    if (u.endsWith('/contacts/upsert')) return Response.json({ contact: { id: 'c1' }, new: true });
    return Response.json({ note: { id: 'n1' } }, { status: 201 });
  };
  console.log = (...a) => logs.push(a.join(' '));
  try {
    const res = await onRequest({ request: req, env });
    return { res, calls, logs, body: await res.json() };
  } finally {
    globalThis.fetch = realFetch;
    console.log = realLog;
  }
}
const ghl = (calls, suffix) => calls.find((c) => c.url.endsWith(suffix));
const upsertPayload = (calls) => JSON.parse(ghl(calls, '/contacts/upsert').init.body);

test('non-POST returns 405', async () => {
  const { res, body } = await run(makeRequest(GOOD, { method: 'GET' }));
  assert.equal(res.status, 405);
  assert.equal(body.error, 'method_not_allowed');
});

test('missing env returns 500 not_configured and logs only names', async () => {
  const { res, logs } = await run(makeRequest(), { env: { ...ENV, GHL_LOCATION_ID: '' } });
  assert.equal(res.status, 500);
  assert.match(logs.join('\n'), /GHL_LOCATION_ID/);
});

test('cross-origin returns 403', async () => {
  const { res } = await run(makeRequest(GOOD, { headers: { Origin: 'https://evil.test' } }));
  assert.equal(res.status, 403);
});

test('same-origin Origin is accepted', async () => {
  const { res } = await run(makeRequest(GOOD, { headers: { Origin: 'https://example.test' } }));
  assert.equal(res.status, 200);
});

test('JSON content type returns 415', async () => {
  const { res } = await run(makeRequest(GOOD, { raw: '{}', headers: { 'Content-Type': 'application/json' } }));
  assert.equal(res.status, 415);
});

test('oversize body returns 413', async () => {
  const { res } = await run(makeRequest({ ...GOOD, message: 'x'.repeat(25 * 1024) }));
  assert.equal(res.status, 413);
});

test('honeypot returns silent 200 with zero fetch calls', async () => {
  const { res, body, calls } = await run(makeRequest({ ...GOOD, company_website: 'spam.example' }));
  assert.equal(res.status, 200);
  assert.deepEqual(body, { ok: true });
  assert.equal(calls.length, 0);
});

test('missing token returns 400 verification_failed, no fetch', async () => {
  const { res, body, calls } = await run(makeRequest({ ...GOOD, 'cf-turnstile-response': undefined }));
  assert.equal(res.status, 400);
  assert.equal(body.error, 'verification_failed');
  assert.equal(calls.length, 0);
});

const invalid = {
  'CR/LF in name': { name: 'Test\r\nBcc: x' },
  'missing name': { name: '' },
  'bad email': { email: 'not-an-email' },
  'bad phone': { phone: '12345' },
  'letters in phone': { phone: 'call me maybe' },
  'bad service': { service: 'AC Repair!' },
  'bad source_page': { source_page: 'https://other.test/x' },
  'oversize message': { message: 'x'.repeat(2001) },
};
for (const [label, patch] of Object.entries(invalid)) {
  test(`invalid: ${label} returns 400 and makes no fetch`, async () => {
    const { res, body, calls } = await run(makeRequest({ ...GOOD, ...patch }));
    assert.equal(res.status, 400);
    assert.equal(body.error, 'invalid');
    assert.equal(calls.length, 0);
  });
}

test('Turnstile rejection returns 400', async () => {
  const { res, body, calls } = await run(makeRequest(), {
    turnstile: () => Response.json({ success: false, 'error-codes': ['invalid-input-response'] }),
  });
  assert.equal(res.status, 400);
  assert.equal(body.error, 'verification_failed');
  assert.equal(calls.length, 1);
});

test('Turnstile unreachable returns 503', async () => {
  const { res } = await run(makeRequest(), { turnstile: () => Promise.reject(new Error('net')) });
  assert.equal(res.status, 503);
});

test('Turnstile hostname mismatch returns 400 when allow-list set', async () => {
  const { res } = await run(makeRequest(), { env: { ...ENV, TURNSTILE_ALLOWED_HOSTNAMES: 'other.test, third.test' } });
  assert.equal(res.status, 400);
});

test('Turnstile hostname match passes', async () => {
  const { res } = await run(makeRequest(), { env: { ...ENV, TURNSTILE_ALLOWED_HOSTNAMES: 'a.test, example.test' } });
  assert.equal(res.status, 200);
});

test('GHL upsert 4xx and 5xx return 502', async () => {
  for (const status of [400, 401, 429, 500]) {
    const { res, body, calls } = await run(makeRequest(), { upsert: () => new Response('{}', { status }) });
    assert.equal(res.status, 502);
    assert.equal(body.error, 'delivery_failed');
    assert.equal(calls.filter((c) => c.url.includes('/notes')).length, 0);
  }
});

test('GHL upsert without contact id returns 502', async () => {
  const { res } = await run(makeRequest(), { upsert: () => Response.json({}) });
  assert.equal(res.status, 502);
});

test('GHL note failure returns 502', async () => {
  const { res } = await run(makeRequest(), { note: () => new Response('{}', { status: 500 }) });
  assert.equal(res.status, 502);
});

test('success path with no consent boxes: exact payloads, no consent fields, no timestamp', async () => {
  const { res, body, calls } = await run(makeRequest());
  assert.equal(res.status, 200);
  assert.deepEqual(body, { ok: true });
  const p = upsertPayload(calls);
  assert.deepEqual(p, {
    locationId: 'test-location',
    firstName: 'Test',
    lastName: 'Person',
    email: 'test.person@example.com',
    phone: '+13105550101',
    source: 'Website contact form',
    customFields: [
      { id: 'fld-service', fieldValue: 'ac-repair' },
      { id: 'fld-source', fieldValue: '/services/ac-repair/' },
    ],
  });
  const up = ghl(calls, '/contacts/upsert');
  assert.equal(up.init.headers.Authorization, 'Bearer test-ghl-token');
  assert.equal(up.init.headers.Version, 'v3');
  const note = ghl(calls, '/contacts/c1/notes');
  const n = JSON.parse(note.init.body);
  assert.equal(n.title, 'Website contact form');
  assert.match(n.body, /SMS consent, non-marketing: unchecked/);
  assert.match(n.body, /SMS consent, marketing: unchecked/);
  assert.match(n.body, /Referred from: \/services\/ac-repair\//);
  assert.match(n.body, /Message:\nFictional test message\./);
});

test('turnstile siteverify receives secret and token', async () => {
  const { calls } = await run(makeRequest());
  const tv = calls[0].init.body;
  assert.equal(tv.get('secret'), 'test-turnstile-secret');
  assert.equal(tv.get('response'), 'test-token');
});

test('non-marketing only: that field plus timestamp, marketing omitted', async () => {
  const { calls } = await run(makeRequest({ ...GOOD, sms_consent_non_marketing: 'yes' }));
  const cf = upsertPayload(calls).customFields;
  const ids = cf.map((f) => f.id);
  assert.ok(ids.includes('fld-nonmarketing') && ids.includes('fld-consent-at'));
  assert.ok(!ids.includes('fld-marketing'));
  assert.equal(cf.find((f) => f.id === 'fld-nonmarketing').fieldValue, 'Yes');
  assert.match(cf.find((f) => f.id === 'fld-consent-at').fieldValue, /^\d{4}-\d\d-\d\dT/);
});

test('marketing only: that field plus timestamp, non-marketing omitted', async () => {
  const { calls } = await run(makeRequest({ ...GOOD, sms_consent_marketing: 'yes' }));
  const ids = upsertPayload(calls).customFields.map((f) => f.id);
  assert.ok(ids.includes('fld-marketing') && ids.includes('fld-consent-at'));
  assert.ok(!ids.includes('fld-nonmarketing'));
});

test('both ticked: both fields and timestamp, note says checked', async () => {
  const { calls } = await run(makeRequest({ ...GOOD, sms_consent_non_marketing: 'yes', sms_consent_marketing: 'yes' }));
  const ids = upsertPayload(calls).customFields.map((f) => f.id);
  for (const id of ['fld-nonmarketing', 'fld-marketing', 'fld-consent-at']) assert.ok(ids.includes(id));
  const n = JSON.parse(ghl(calls, '/notes').init.body);
  assert.match(n.body, /non-marketing: checked/);
  assert.match(n.body, /marketing: checked/);
});

test('values other than "yes" count as unchecked', async () => {
  for (const v of ['on', 'true', 'YES', 'Yes', '1', '', 'no']) {
    const { res, calls } = await run(makeRequest({ ...GOOD, sms_consent_non_marketing: v, sms_consent_marketing: v }));
    assert.equal(res.status, 200);
    const ids = upsertPayload(calls).customFields.map((f) => f.id);
    assert.deepEqual(ids, ['fld-service', 'fld-source'], `value ${JSON.stringify(v)}`);
  }
});

test('"No" is never written for any field', async () => {
  const { calls } = await run(makeRequest());
  assert.ok(!JSON.stringify(upsertPayload(calls).customFields).includes('"No"'));
});

test('no dnd keys and no tags are ever sent', async () => {
  for (const f of [GOOD, { ...GOOD, sms_consent_non_marketing: 'yes', sms_consent_marketing: 'yes' }]) {
    const { calls } = await run(makeRequest(f));
    for (const c of calls.filter((x) => x.url.includes('leadconnectorhq'))) {
      assert.ok(!/dnd/i.test(c.init.body), 'dnd key found');
      assert.ok(!/"tags"/.test(c.init.body), 'tags key found');
    }
  }
});

test('single-word name sends no lastName; missing source_page sends "(none)"', async () => {
  const { calls } = await run(makeRequest({ ...GOOD, name: 'Cher', source_page: undefined }));
  const p = upsertPayload(calls);
  assert.equal(p.firstName, 'Cher');
  assert.ok(!('lastName' in p));
  assert.equal(p.customFields.find((f) => f.id === 'fld-source').fieldValue, '(none)');
});

test('11-digit phone with leading 1 normalizes', async () => {
  const { calls } = await run(makeRequest({ ...GOOD, phone: '1-310-555-0102' }));
  assert.equal(upsertPayload(calls).phone, '+13105550102');
});

test('logs never contain submission data or secrets', async () => {
  const f = { ...GOOD, sms_consent_non_marketing: 'yes', 'cf-turnstile-response': 'tok-unique-123' };
  const scenarios = [
    {},
    { turnstile: () => Response.json({ success: false, 'error-codes': ['x'] }) },
    { turnstile: () => Promise.reject(new Error('Test Person test.person@example.com')) },
    { upsert: () => new Response('Test Person', { status: 500 }) },
    { note: () => new Response('{}', { status: 500 }) },
  ];
  for (const s of scenarios) {
    const { logs } = await run(makeRequest(f), s);
    const out = logs.join('\n');
    for (const bad of ['Test Person', '555-0101', '5550101', 'test.person@example.com', 'Fictional test message',
      'tok-unique-123', ...Object.values(ENV)]) {
      assert.ok(!out.includes(bad), `log leaked ${bad}`);
    }
    assert.ok(out.includes('contact_form'));
  }
});
