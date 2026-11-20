// Fails the build when the sitemap and the built site disagree. Run after next build: npm run check:sitemap [path-to-out]
// Reads the rendered HTML in out/, not the source. Checks:
//  1. every indexable built route (no noindex robots tag) is in out/sitemap.xml
//  2. every sitemap URL is absolute https on the site origin, ends in "/", is unique, has a built page, is indexable,
//     has a self-referencing canonical equal to its <loc>, and is not the source of a _redirects rule
//  3. every corePages registry flag (src/content/core-pages.ts) matches the page's built robots tag
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, join, relative, sep } from 'node:path';
import { loadContent, root } from './lib/load-ts.mjs';

const out = resolve(process.argv[2] ?? join(root, 'out'));
if (!existsSync(join(out, 'sitemap.xml'))) {
  console.error(`check:sitemap: no ${join(out, 'sitemap.xml')}. Run next build first.`);
  process.exit(1);
}
const { siteConfig } = loadContent('site-config');
const { corePages } = loadContent('core-pages');
const origin = siteConfig.url;

function* pages(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* pages(p);
    else if (name === 'index.html') yield p;
  }
}
const built = new Map();
for (const f of pages(out)) {
  const rel = relative(out, f).split(sep).slice(0, -1).join('/');
  const route = rel ? `/${rel}/` : '/';
  const html = readFileSync(f, 'utf8');
  const robots = (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] ?? '';
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] ?? null;
  built.set(route, { indexable: !/noindex/i.test(robots), robots, canonical });
}

const locs = [...readFileSync(join(out, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
const redirects = existsSync(join(out, '_redirects'))
  ? readFileSync(join(out, '_redirects'), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')).map((l) => l.split(/\s+/)[0])
  : [];
const redirected = (path) => redirects.some((r) => (r.includes('*') ? path.startsWith(r.slice(0, r.indexOf('*'))) : r === path || r === path.replace(/\/$/, '')));

const errors = [];
const seen = new Set();
const listed = new Set();
for (const loc of locs) {
  if (seen.has(loc)) errors.push(`duplicate sitemap URL: ${loc}`);
  seen.add(loc);
  if (!loc.startsWith(`${origin}/`)) { errors.push(`not absolute https on ${origin}: ${loc}`); continue; }
  const path = loc.slice(origin.length);
  listed.add(path);
  if (!path.endsWith('/')) errors.push(`missing trailing slash: ${loc}`);
  const b = built.get(path);
  if (!b) { errors.push(`sitemap URL has no built page (404): ${loc}`); continue; }
  if (!b.indexable) errors.push(`sitemap URL is noindex (${b.robots}): ${loc}`);
  if (b.canonical !== loc) errors.push(`sitemap URL canonical differs (${b.canonical ?? 'none'}): ${loc}`);
  if (redirected(path)) errors.push(`sitemap URL is redirected by _redirects: ${loc}`);
}
for (const [route, b] of built) {
  if (b.indexable && !listed.has(route)) errors.push(`indexable built route missing from sitemap: ${route}`);
}
for (const c of corePages) {
  const b = built.get(c.path);
  if (!b) errors.push(`corePages path has no built page: ${c.path}`);
  else if (b.indexable !== c.indexable) errors.push(`corePages flag disagrees with built robots tag: ${c.path} registry indexable=${c.indexable}, built robots="${b.robots || 'index'}"`);
}

if (errors.length) {
  console.error(`check:sitemap FAILED (${errors.length}):\n  - ${errors.join('\n  - ')}`);
  process.exit(1);
}
console.log(`check:sitemap OK: ${locs.length} sitemap URLs, ${[...built.values()].filter((b) => b.indexable).length} indexable built routes, ${built.size} built routes, ${corePages.length} registry entries.`);
