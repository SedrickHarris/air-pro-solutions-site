// Generates responsive webp variants (480, 700, 800 and 1200 px wide) for every hero image, and the manifest
// src/content/hero-variants.json that <HeroImage> reads. Original files are never modified.
//
//   npm run images:hero
//
// Hero images are found by scanning src/ for /images/... .webp paths that look like hero images:
//   - .../hero.webp or anything under a /hero/ folder
//   - names containing "-hero-"
//   - the four region hub service-area maps (listed explicitly below, they come from a template)
// Output sits next to each source: <name>-480w.webp, -700w.webp, -800w.webp, -1200w.webp.
//
// Quality is chosen per image and width: the lowest webp quality (never below 50) whose PSNR against a
// near-lossless resize of the source is still at least PSNR_TARGET dB. That keeps every variant visually equivalent
// while smooth images (maps, skies) shrink a lot and detailed photos keep more bytes.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(path.join(root, 'package.json'));
const sharp = require('sharp');

const WIDTHS = [480, 700, 800, 1200];
const PSNR_TARGET = Number(process.env.HERO_PSNR || 33); // dB; the sources are already lossy webp, 33 matches what the first variant set measured
const MAX_KB = { 480: 45, 700: 65, 800: 80 }; // size caps for the phone-sized variants; quality may drop below the target (never below q50) to respect them
const Q_START = 82;
const Q_MIN = 50;

const HUB_MAPS = /service-area-map-(south-bay|orange-county|inland-empire|los-angeles-county)-ca\.webp$/;
const isHero = (p) => /\/hero\.webp$/.test(p) || /\/hero\//.test(p) || /-hero-/.test(p) || HUB_MAPS.test(p);
const isVariant = (p) => /-(480|700|800|1200)w\.webp$/.test(p);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(e.name)) out.push(p);
  }
  return out;
}

function psnr(a, b) {
  let se = 0;
  for (let i = 0; i < a.length; i++) { const d = a[i] - b[i]; se += d * d; }
  const mse = se / a.length;
  return mse === 0 ? 99 : 10 * Math.log10((255 * 255) / mse);
}

const found = new Set();
for (const f of walk(path.join(root, 'src'))) {
  const s = fs.readFileSync(f, 'utf8');
  for (const m of s.matchAll(/['"`](\/images\/[^'"`\s]+?\.webp)['"`]/g)) {
    if (isHero(m[1]) && !isVariant(m[1])) found.add(m[1]);
  }
}
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
    const resized = () => sharp(file).resize({ width: w, withoutEnlargement: true });
    const ref = await resized().removeAlpha().raw().toBuffer();
    // Walk quality down. Keep the lowest quality that still meets the PSNR target; if that file is over the size cap,
    // keep walking down until it fits (or q50).
    let best = null;
    const fitsCap = (buf) => !MAX_KB[w] || buf.length <= MAX_KB[w] * 1024;
    for (let q = Q_START; q >= Q_MIN; q -= 3) {
      const buf = await resized().webp({ quality: q, effort: 5 }).toBuffer();
      const dec = await sharp(buf).removeAlpha().raw().toBuffer();
      if (psnr(ref, dec) >= PSNR_TARGET) { best = { buf, q }; continue; } // still meets the target: try smaller
      if (best && fitsCap(best.buf)) break; // the previous (lowest passing) file fits the cap: done
      best = { buf, q }; // over the cap or never passed: accept lower quality until it fits
      if (fitsCap(buf)) break;
    }
    fs.writeFileSync(path.join(root, 'public', `${base}-${w}w.webp`), best.buf);
    entry.widths.push({ w, kb: Math.round(best.buf.length / 1024), q: best.q });
    made++;
  }
  manifest[src] = entry;
}

fs.writeFileSync(path.join(root, 'src/content/hero-variants.json'), JSON.stringify(manifest, null, 1) + '\n');
console.log(`Hero images: ${Object.keys(manifest).length}, variants written: ${made}, PSNR target ${PSNR_TARGET} dB`);
for (const [src, e] of Object.entries(manifest)) console.log(`${e.w}x${e.h}`, e.widths.map((x) => `${x.w}:${x.kb}KB(q${x.q})`).join(' '), src.split('/').slice(-2).join('/'));
