// Fails the production build when the contact form is not fully configured.
// NEXT_PUBLIC_* values are inlined into the static export, so they must exist at build time.
// Set ALLOW_MISSING_FORM_ENV=1 only for local verification builds (the form then shows a call fallback).
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(join(root, 'package.json'));
const { loadEnvConfig } = require('@next/env');
loadEnvConfig(root, false);

const required = [
  ['NEXT_PUBLIC_FORM_ENDPOINT', 'URL that receives the contact form POST and delivers it to contact@airprosolutionsheatingandcooling.com'],
  ['NEXT_PUBLIC_TURNSTILE_SITE_KEY', 'Cloudflare Turnstile site key (public key, not the secret key)'],
];
const missing = required.filter(([k]) => !(process.env[k] ?? '').trim());

if (missing.length && process.env.ALLOW_MISSING_FORM_ENV !== '1') {
  console.error('\nBUILD STOPPED: the contact form is not configured.');
  for (const [k, what] of missing) console.error(`  - ${k} is missing: ${what}`);
  console.error('Set them in Cloudflare Pages > Settings > Environment variables (Production) or in .env.local, then rebuild.');
  console.error('See README.md "Contact form" and .env.example.\n');
  process.exit(1);
}
if (missing.length) console.warn(`WARNING: building without ${missing.map(([k]) => k).join(', ')} (ALLOW_MISSING_FORM_ENV=1).`);
else console.log('Contact form env: OK');
