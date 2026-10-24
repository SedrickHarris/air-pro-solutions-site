// Fails if any hero photo caption (title + space + text, as rendered) is longer than MAX characters.
// Hero captions are one centered line at every width (.photo-caption-band is nowrap), so long copy gets clipped.
// Reads the static export, so it covers data-driven captions (cities, services, matrix) and hardcoded ones (home, hubs).
// Run after the build: npm run check:hero-captions (the build script does this automatically).
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { root } from './lib/load-ts.mjs';

const MAX = 40;
const out = join(root, 'out');
if (!existsSync(out)) {
  console.error('FAIL: out/ not found. Run next build first.');
  process.exit(1);
}

const decode = (t) => t.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const errors = [];
let pages = 0;
let captions = 0;

function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'index.html') check(p);
  }
}

function check(file) {
  const html = readFileSync(file, 'utf8');
  if (!html.includes('photo-caption')) return;
  pages++;
  const path = '/' + relative(out, join(file, '..')).split(sep).join('/') + '/';
  for (const m of html.matchAll(/<span class="photo-caption[^"]*">([\s\S]*?)<\/span>(?=<\/div>)/g)) {
    // Replace tags with a space only where one is needed; "<strong>A</strong> b" must stay "A b", and "<span>A</span>B" becomes "A B".
    const text = decode(m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
    captions++;
    if (text.length > MAX) errors.push(`${path.replace('//', '/')}: ${text.length} chars (max ${MAX}): "${text}"`);
  }
}

walk(out);
console.log(`Checked ${captions} hero captions on ${pages} pages.`);
if (errors.length) {
  console.error(`\nFAIL: ${errors.length} caption(s) over ${MAX} characters:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log(`OK: every hero caption is ${MAX} characters or fewer.`);
