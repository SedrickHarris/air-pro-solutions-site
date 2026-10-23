// Reports inbound internal links per city page from the built site (out/). Report only, never fails.
// Counts unique source pages per city href, with the header, footer and scripts stripped. Footer-city links count
// once in total (the footer is on every page). Source types: footer, nearby (other city pages), hub (region hubs),
// index (/service-areas/), service (/services/<service>/), matrix (/services/<service>/<city>/), other.
// Run: npm run build, then npm run report:inbound-links [path-to-out]
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, join, relative, sep } from 'node:path';
import { loadContent, root } from './lib/load-ts.mjs';

const out = resolve(process.argv[2] ?? join(root, 'out'));
if (!existsSync(join(out, 'index.html'))) {
  console.log(`No built site at ${out}. Run npm run build first (or pass the path to an out/ folder).`);
  process.exit(0);
}

const { cities } = loadContent('cities');
const { footerCities } = loadContent('footer-cities');
const slugs = new Set(cities.filter((c) => c.page).map((c) => c.slug));
const hubs = new Set(['los-angeles-county', 'south-bay', 'orange-county', 'inland-empire']);
const types = ['footer', 'nearby', 'hub', 'index', 'service', 'matrix', 'other'];
const table = new Map([...slugs].map((s) => [s, Object.fromEntries(types.map((t) => [t, 0]))]));
for (const s of footerCities) if (table.has(s)) table.get(s).footer = 1;

function* pages(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* pages(p);
    else if (name === 'index.html') yield p;
  }
}

for (const file of pages(out)) {
  const src = '/' + relative(out, file).split(sep).slice(0, -1).join('/') + '/';
  const html = readFileSync(file, 'utf8')
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<header[\s\S]*?<\/header>/g, '')
    .replace(/<footer[\s\S]*?<\/footer>/g, '');
  const parts = src.split('/').filter(Boolean);
  const type =
    src === '/service-areas/' ? 'index'
    : parts[0] === 'service-areas' && parts.length === 2 ? (hubs.has(parts[1]) ? 'hub' : 'nearby')
    : parts[0] === 'services' && parts.length === 2 ? 'service'
    : parts[0] === 'services' && parts.length === 3 ? 'matrix'
    : 'other';
  for (const m of new Set([...html.matchAll(/href="\/service-areas\/([a-z-]+)\/"/g)].map((x) => x[1]))) {
    if (!table.has(m) || src === `/service-areas/${m}/`) continue;
    table.get(m)[type] += 1;
  }
}

const rows = [...table].map(([slug, t]) => ({ slug, t, total: types.reduce((n, k) => n + t[k], 0) }))
  .sort((a, b) => a.total - b.total || a.slug.localeCompare(b.slug));
console.log(`${'city'.padEnd(18)}${types.map((t) => t.padStart(8)).join('')}${'total'.padStart(7)}`);
for (const r of rows) console.log(`${r.slug.padEnd(18)}${types.map((t) => String(r.t[t]).padStart(8)).join('')}${String(r.total).padStart(7)}`);
console.log(`\nLowest 8:  ${rows.slice(0, 8).map((r) => `${r.slug} (${r.total})`).join(', ')}`);
console.log(`Highest 8: ${rows.slice(-8).reverse().map((r) => `${r.slug} (${r.total})`).join(', ')}`);
