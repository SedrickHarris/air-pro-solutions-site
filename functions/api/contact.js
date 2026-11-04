// Cloudflare Pages Function: POST /api/contact
// Verifies Cloudflare Turnstile, then writes the lead to HighLevel (GHL): contact upsert + note.
// Secrets come only from context.env (Cloudflare dashboard or .dev.vars locally). See README "Contact form".
// Logs contain codes and statuses only, never submission data.

const TOKEN_FIELD = 'cf-turnstile-response'; // default field the Turnstile widget injects; the form also sets it explicitly
const MAX_BODY_BYTES = 20 * 1024;
const LIMITS = { name: 100, phone: 30, email: 254, service: 60, message: 2000, source_page: 200 };
const GHL_BASE = 'https://services.leadconnectorhq.com';
const SITEVERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const REQUIRED_ENV = [
  'TURNSTILE_SECRET_KEY',
  'GHL_PRIVATE_INTEGRATION_TOKEN',
  'GHL_LOCATION_ID',
  'GHL_FIELD_SERVICE_ID',
  'GHL_FIELD_SMS_CONSENT_NONMARKETING_ID',
  'GHL_FIELD_SMS_CONSENT_MARKETING_ID',
  'GHL_FIELD_CONSENT_AT_ID',
  'GHL_FIELD_SOURCE_PAGE_ID',
];

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
const fail = (status, code) => json(status, { ok: false, error: code });

const str = (v) => (typeof v === 'string' ? v.trim() : '');
const singleLine = (s) => !/[\u0000-\u001F\u007F]/.test(s); // blocks CR/LF and control chars
// A consent box counts as ticked only when the value is exactly "yes". Anything else or absent is unticked.
const ticked = (v) => typeof v === 'string' && v === 'yes';

function normalizePhone(p) {
  if (!/^[0-9+()\-.\s]{7,30}$/.test(p)) return null;
  const d = p.replace(/\D/g, '');
  if (d.length === 10) return '+1' + d;
  if (d.length === 11 && d[0] === '1') return '+' + d;
  return null; // US numbers only; TODO(client): confirm this assumption
}

export async function onRequest({ request, env }) {
  if (request.method !== 'POST') return fail(405, 'method_not_allowed');
  const rid = crypto.randomUUID().slice(0, 8);
  const log = (code, extra = {}) => console.log(JSON.stringify({ event: 'contact_form', code, rid, ...extra }));

  const missing = REQUIRED_ENV.filter((k) => !env[k]);
  if (missing.length) {
    log('CONFIG_MISSING', { names: missing });
    return fail(500, 'not_configured');
  }

  const origin = request.headers.get('Origin');
  if (origin) {
    try {
      if (new URL(origin).host !== new URL(request.url).host) return fail(403, 'forbidden');
    } catch {
      return fail(403, 'forbidden');
    }
  }

  const ct = request.headers.get('Content-Type') || '';
  if (!/multipart\/form-data|application\/x-www-form-urlencoded/i.test(ct)) return fail(415, 'unsupported_type');
  const len = Number(request.headers.get('Content-Length') || 0);
  if (len > MAX_BODY_BYTES) return fail(413, 'too_large');
  const buf = await request.arrayBuffer();
  if (buf.byteLength > MAX_BODY_BYTES) return fail(413, 'too_large');
  let form;
  try {
    form = await new Response(buf, { headers: { 'Content-Type': ct } }).formData();
  } catch {
    return fail(400, 'bad_request');
  }

  // Honeypot: generic success, no Turnstile or GHL call.
  if (str(form.get('company_website')) !== '') {
    log('HONEYPOT');
    return json(200, { ok: true });
  }

  const name = str(form.get('name'));
  const email = str(form.get('email'));
  const phoneRaw = str(form.get('phone'));
  const service = str(form.get('service'));
  const sourcePage = str(form.get('source_page'));
  const message = str(form.get('message')).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
  const consentNonMarketing = ticked(form.get('sms_consent_non_marketing'));
  const consentMarketing = ticked(form.get('sms_consent_marketing'));
  const token = str(form.get(TOKEN_FIELD));

  // SMS consent is optional and never a condition of submitting.
  if (!name || !email || !phoneRaw || !service) return fail(400, 'invalid');
  for (const [v, k] of [
    [name, 'name'],
    [email, 'email'],
    [phoneRaw, 'phone'],
    [service, 'service'],
    [sourcePage, 'source_page'],
  ]) {
    if (v.length > LIMITS[k] || !singleLine(v)) return fail(400, 'invalid');
  }
  if (message.length > LIMITS.message) return fail(400, 'invalid');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail(400, 'invalid');
  if (!/^[a-z0-9-]{1,60}$/.test(service)) return fail(400, 'invalid');
  if (sourcePage && !/^\/[A-Za-z0-9\-._~\/]*$/.test(sourcePage)) return fail(400, 'invalid');
  const phone = normalizePhone(phoneRaw);
  if (!phone) return fail(400, 'invalid');
  if (!token || token.length > 2048) return fail(400, 'verification_failed');

  // Turnstile (tokens are single use and expire after 5 minutes; reuse fails with timeout-or-duplicate)
  const tv = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token });
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) tv.set('remoteip', ip);
  let v;
  try {
    v = await (await fetch(SITEVERIFY, { method: 'POST', body: tv, signal: AbortSignal.timeout(8000) })).json();
  } catch {
    log('TURNSTILE_UNREACHABLE');
    return fail(503, 'unavailable');
  }
  if (!v || v.success !== true) {
    log('TURNSTILE_REJECTED', { codes: v?.['error-codes'] || [] });
    return fail(400, 'verification_failed');
  }
  if (
    env.TURNSTILE_ALLOWED_HOSTNAMES &&
    !env.TURNSTILE_ALLOWED_HOSTNAMES.split(',').map((s) => s.trim()).includes(v.hostname)
  ) {
    log('TURNSTILE_HOSTNAME');
    return fail(400, 'verification_failed');
  }

  const iso = new Date().toISOString();
  const headers = {
    Authorization: `Bearer ${env.GHL_PRIVATE_INTEGRATION_TOKEN}`,
    Version: env.GHL_API_VERSION || 'v3',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  // Consent fields are written only when ticked (value "Yes"), so a returning contact's earlier consent is never
  // erased. We only record consent: no DND/dnd settings are ever sent. No tags either (GHL tags overwrite).
  const customFields = [
    { id: env.GHL_FIELD_SERVICE_ID, fieldValue: service },
    { id: env.GHL_FIELD_SOURCE_PAGE_ID, fieldValue: sourcePage || '(none)' },
  ];
  if (consentNonMarketing) customFields.push({ id: env.GHL_FIELD_SMS_CONSENT_NONMARKETING_ID, fieldValue: 'Yes' });
  if (consentMarketing) customFields.push({ id: env.GHL_FIELD_SMS_CONSENT_MARKETING_ID, fieldValue: 'Yes' });
  if (consentNonMarketing || consentMarketing) customFields.push({ id: env.GHL_FIELD_CONSENT_AT_ID, fieldValue: iso });

  const [firstName, ...rest] = name.split(/\s+/);
  const upsert = {
    locationId: env.GHL_LOCATION_ID,
    firstName,
    ...(rest.length ? { lastName: rest.join(' ') } : {}),
    email,
    phone,
    source: 'Website contact form',
    customFields,
  };

  let contactId;
  let isNew;
  try {
    const r = await fetch(`${GHL_BASE}/contacts/upsert`, {
      method: 'POST',
      headers,
      body: JSON.stringify(upsert),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) {
      log('GHL_UPSERT_FAILED', { status: r.status });
      return fail(502, 'delivery_failed');
    }
    const d = await r.json();
    contactId = d?.contact?.id;
    isNew = d?.new;
  } catch {
    log('GHL_UPSERT_ERROR');
    return fail(502, 'delivery_failed');
  }
  if (!contactId) {
    log('GHL_NO_CONTACT_ID');
    return fail(502, 'delivery_failed');
  }

  const noteBody = [
    'Website contact form submission',
    `Submitted (UTC): ${iso}`,
    `Service: ${service}`,
    `Referred from: ${sourcePage || '(none)'}`,
    `SMS consent, non-marketing: ${consentNonMarketing ? 'checked' : 'unchecked'}`,
    `SMS consent, marketing: ${consentMarketing ? 'checked' : 'unchecked'}`,
    'Message:',
    message || '(none)',
  ].join('\n');
  try {
    const r = await fetch(`${GHL_BASE}/contacts/${encodeURIComponent(contactId)}/notes`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ title: 'Website contact form', body: noteBody }),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) {
      log('GHL_NOTE_FAILED', { status: r.status });
      return fail(502, 'delivery_failed');
    }
  } catch {
    log('GHL_NOTE_ERROR');
    return fail(502, 'delivery_failed');
  }

  log('SUBMITTED', { isNew: !!isNew });
  return json(200, { ok: true });
}
