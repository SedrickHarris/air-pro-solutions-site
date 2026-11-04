// Generates responsive webp variants (480, 800 and 1200 px wide) for every hero image, and the manifest
// src/content/hero-variants.json that <HeroImage> reads. Original files are never modified.
//
//   npm run images:hero
//
// Hero images are found by scanning src/ for /images/... .webp paths that look like hero images:
//   - .../hero.webp or anything under a /hero/ folder
//   - names containing "-hero-"
//   - the four region hub service-area maps
// Output sits next to each source: <name>-480w.webp, <name>-800w.webp, <name>-1200w.webp.
// Quality is lowered per variant (never below 50) until the 480 and 800 files are at most 80 KB.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(path.join(root, 'package.json'));
const sharp = require('sharp');

const WIDTHS = [480, 800, 1200];
const MAX_KB = { 480: 80, 800: 80 };
const START_Q = { 480: 76, 800: 74, 1200: 78 };

const HUB_MAPS = /service-area-map-(south-bay|orange-county|inland-empire|los-angeles-county)-ca\.webp$/;
const isHero = (p) => /\/hero\.webp$/.test(p) || /\/hero\//.test(p) || /-hero-/.test(p) || HUB_MAPS.test(p);
const isVariant = (p) => /-(480|800|1200)w\.webp$/.test(p);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(e.name)) out.push(p);
  }
  return out;
}

const found = new Set();
for (const f of walk(path.join(root, 'src'))) {
  const s = fs.readFileSync(f, 'utf8');
  for (const m of s.matchAll(/['"`](\/images\/[^'"`\s]+?\.webp)['"`]/g)) {
    if (isHero(m[1]) && !isVariant(m[1])) found.add(m[1]);
  }
}

// Region hub heroes are built from a template in src/content/regions.ts, so list them explicitly.
for (const slug of ['los-angeles-county', 'south-bay', 'orange-county', 'inland-empire']) {
  found.add(`/images/locations/${slug}/air-pro-solutions-hvac-service-area-map-${slug}-ca.webp`);
}

const manifest = {};
let made = 0;
for (const src of [...found].sort()) {
  const file = path.join(root, 'public', src);
  if (!fs.existsSync(file)) { console.warn('skip (file missing):', src); continue; }
  const meta = await sharp(file).metadata();
  const base = src.replace(/\.webp$/, '');
  const entry = { w: meta.width, h: meta.height, widths: [] };
  for (const w of WIDTHS) {
    if (w > meta.width) continue; // never upscale
    const out = path.join(root, 'public', `${base}-${w}w.webp`);
    let q = START_Q[w];
    let buf;
    do {
      buf = await sharp(file).resize({ width: w, withoutEnlargement: true }).webp({ quality: q, effort: 5 }).toBuffer();
      q -= 4;
    } while (MAX_KB[w] && buf.length > MAX_KB[w] * 1024 && q >= 50);
    if (w === 1200 && fs.statSync(file).size <= buf.length && meta.width === 1200) buf = fs.readFileSync(file); // already 1200 wide and smaller
    fs.writeFileSync(out, buf);
    entry.widths.push({ w, kb: Math.round(buf.length / 1024) });
    made++;
  }
  manifest[src] = entry;
}

fs.writeFileSync(path.join(root, 'src/content/hero-variants.json'), JSON.stringify(manifest, null, 1) + '\n');
console.log(`Hero images: ${Object.keys(manifest).length}, variants written: ${made}`);
for (const [src, e] of Object.entries(manifest)) console.log(`${e.w}x${e.h}`, e.widths.map((x) => `${x.w}:${x.kb}KB`).join(' '), src.split('/').slice(-2).join('/'));
