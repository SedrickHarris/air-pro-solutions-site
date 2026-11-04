// Replays the fictional submissions in scripts/test-data/contact-submissions.json to a contact endpoint.
// Usage: node scripts/send-test-submissions.mjs <endpoint-url> [--dry-run] [--only 1,2] [--repeat N]
//
// Uses a dummy Turnstile token, so it only succeeds where the server uses Cloudflare's TEST Turnstile secret
// (or the local mock harness). Each accepted run against a real endpoint creates a real GHL contact and note and
// may fire notification workflows: delete the test contacts afterward.
// Output is statuses and error codes only, never submission data.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const TOKEN_FIELD = 'cf-turnstile-response'; // must match TOKEN_FIELD in functions/api/contact.js and the form
const DUMMY_TOKEN = 'XXXX.DUMMY.TOKEN.XXXX';

const args = process.argv.slice(2);
const url = args.find((a) => /^https?:\/\//.test(a));
const flag = (n) => args.includes(n);
const val = (n) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined);
if (!url) {
  console.error('Usage: node scripts/send-test-submissions.mjs <endpoint-url> [--dry-run] [--only 1,2] [--repeat N]');
  process.exit(2);
}
const only = val('--only')?.split(',').map(Number);
const repeat = Math.max(1, Number(val('--repeat') ?? 1));
const dry = flag('--dry-run');

const here = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(here, 'test-data', 'contact-submissions.json'), 'utf8'));

let accepted = 0;
let failed = 0;
for (let r = 0; r < repeat; r++) {
  for (let i = 0; i < data.length; i++) {
    const n = i + 1;
    if (only && !only.includes(n)) continue;
    const s = data[i];
    const fd = new FormData();
    for (const k of ['name', 'phone', 'email', 'service', 'message']) fd.set(k, s[k]);
    if (s.sms_consent_non_marketing) fd.set('sms_consent_non_marketing', 'yes');
    if (s.sms_consent_marketing) fd.set('sms_consent_marketing', 'yes');
    fd.set('source_page', '/contact/');
    fd.set(TOKEN_FIELD, DUMMY_TOKEN);
    if (dry) {
      console.log(`#${n} DRY RUN: would POST ${[...fd.keys()].length} fields, consent nm=${!!s.sms_consent_non_marketing} m=${!!s.sms_consent_marketing}`);
      continue;
    }
    try {
      const res = await fetch(url, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok) accepted++;
      else failed++;
      console.log(`#${n} status=${res.status} ok=${body.ok === true}${body.error ? ` error=${body.error}` : ''}`);
    } catch {
      failed++;
      console.log(`#${n} request_failed`);
    }
  }
}
if (!dry) console.log(`accepted=${accepted} failed=${failed}`);
process.exit(failed ? 1 : 0);
