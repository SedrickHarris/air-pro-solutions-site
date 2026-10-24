// Measures WCAG contrast of the white hero caption text against the rendered .photo-caption-silver band
// (dark navy glass, rgba(7, 22, 56, 0.60)) on every page that has a hero caption, at 1440px and 375px in
// light and dark mode. Method: hide the caption text and its shadow, screenshot the hero photo, take the mean
// color of the middle half of the band (the band blended over the photo), and compute the contrast of #fff
// against it. Fixed-position elements (the mobile CTA bar) are hidden first because they cover the band at 375px.
// Also reports the lightest 10% of band pixels as a worst case. Fails (exit 1) if any mean ratio is under 5.0
// or any lightest-10% ratio is under 4.5.
//
// Not part of `npm run build`: it needs a browser and is slow (about 3 minutes).
// Prerequisites: a finished static export in out/ (npm run build), and two packages that are NOT devDependencies:
//   npm i --no-save playwright-core pngjs
// Browser: set CHROME_PATH to a Chromium or Chrome executable, or install Playwright's browsers
//   (npx playwright-core install chromium) and leave CHROME_PATH unset.
// Run: node scripts/check-caption-contrast.mjs
// Rerun whenever hero photos or the band styling change. Optional: OUT=<file.json> writes every measurement.
import { chromium } from 'playwright-core';
import { PNG } from 'pngjs';
import http from 'node:http';
import { readdirSync, readFileSync, existsSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, extname, sep } from 'node:path';
import { root } from './lib/load-ts.mjs';

const out = join(root, 'out');
if (!existsSync(out)) {
  console.error('FAIL: out/ not found. Run npm run build first.');
  process.exit(1);
}

const MIN_MEAN = 5.0;
const MIN_LIGHTEST = 4.5;

const pages = [];
(function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'index.html' && readFileSync(p, 'utf8').includes('photo-caption')) {
      pages.push('/' + relative(out, join(p, '..')).split(sep).join('/') + '/');
    }
  }
})(out);

const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png' };
const server = http.createServer((q, r) => {
  let f = join(out, decodeURIComponent(q.url.split('?')[0]));
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) { r.statusCode = 404; return r.end(); }
  r.setHeader('content-type', types[extname(f)] || 'application/octet-stream');
  r.end(readFileSync(f));
}).listen(0);
const base = `http://localhost:${server.address().port}`;

const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (L) => 1.05 / (L + 0.05); // white text has luminance 1

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const rows = [];
for (const width of [1440, 375]) {
  for (const theme of ['light', 'dark']) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme });
    const pg = await ctx.newPage();
    for (const page of pages) {
      await pg.goto(base + page, { waitUntil: 'load' });
      await pg.evaluate((t) => {
        document.querySelectorAll('*').forEach((e) => { if (getComputedStyle(e).position === 'fixed') e.style.display = 'none'; });
        document.documentElement.setAttribute('data-theme', t);
        const c = document.querySelector('.hero-photo .photo-caption');
        for (const e of [c, ...c.querySelectorAll('*')]) { e.style.color = 'transparent'; e.style.textShadow = 'none'; }
      }, theme);
      await pg.waitForTimeout(150);
      const buf = await pg.locator('.hero-photo').first().screenshot();
      const box = await pg.evaluate(() => {
        const cap = document.querySelector('.hero-photo .photo-caption');
        const c = cap.getBoundingClientRect(), h = document.querySelector('.hero-photo').getBoundingClientRect();
        return { x: c.left - h.left, y: c.top - h.top, w: c.width, h: c.height, text: cap.textContent.trim() };
      });
      const png = PNG.sync.read(buf);
      const x0 = Math.round(box.x + box.w * 0.25), x1 = Math.round(box.x + box.w * 0.75);
      const y0 = Math.round(box.y + box.h * 0.2), y1 = Math.round(box.y + box.h * 0.8);
      let R = 0, G = 0, B = 0, n = 0;
      const Ls = [];
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const i = (y * png.width + x) * 4;
          R += png.data[i]; G += png.data[i + 1]; B += png.data[i + 2]; n++;
          Ls.push(lum(png.data[i], png.data[i + 1], png.data[i + 2]));
        }
      }
      Ls.sort((a, b) => a - b);
      rows.push({
        page, width, theme, text: box.text,
        rgb: [R / n, G / n, B / n].map(Math.round).join(','),
        ratio: +ratio(lum(R / n, G / n, B / n)).toFixed(2),
        ratioLightest10pct: +ratio(Ls[Math.floor(Ls.length * 0.9)]).toFixed(2),
      });
    }
    await ctx.close();
  }
}
await browser.close();
server.close();

if (process.env.OUT) writeFileSync(process.env.OUT, JSON.stringify(rows, null, 1));
const bad = rows.filter((r) => r.ratio < MIN_MEAN || r.ratioLightest10pct < MIN_LIGHTEST);
const means = rows.map((r) => r.ratio);
console.log(`Measured ${rows.length} captions (${pages.length} pages x 2 widths x 2 themes).`);
console.log(`Worst mean-color ratio: ${Math.min(...means)}. Worst lightest-10% ratio: ${Math.min(...rows.map((r) => r.ratioLightest10pct))}.`);
if (bad.length) {
  console.error(`\nFAIL: ${bad.length} measurement(s) below ${MIN_MEAN} (mean) or ${MIN_LIGHTEST} (lightest 10%):`);
  for (const r of bad.sort((a, b) => a.ratio - b.ratio)) console.error(`  ${r.page} ${r.width}px ${r.theme}: mean ${r.ratio}, lightest ${r.ratioLightest10pct}`);
  process.exit(1);
}
console.log(`OK: every caption is at least ${MIN_MEAN} (mean) and ${MIN_LIGHTEST} (lightest 10%).`);
