// Validates the `nearby` arrays in src/content/cities.ts.
// Fails on: slug that is not a live city (has a `page` block), self-link, duplicate in one array, or more than 5 neighbors.
// Reports (does not fail): one-way links, where A lists B but B does not list A.
// Run: npm run check:nearby. Loads the TS content files directly, so no extra runner is needed.
import { loadContent } from './lib/load-ts.mjs';

const { cities } = loadContent('cities');
const bySlug = new Map(cities.map((c) => [c.slug, c]));
const errors = [];
const links = new Map();

for (const c of cities) {
  if (!c.page) continue;
  const list = c.page.nearby;
  links.set(c.slug, list);
  const seen = new Set();
  if (list.length > 5) errors.push(`${c.slug}: ${list.length} neighbors (max 5)`);
  for (const s of list) {
    if (s === c.slug) errors.push(`${c.slug}: lists itself`);
    else if (!bySlug.get(s)?.page) errors.push(`${c.slug}: "${s}" is not a live city`);
    if (seen.has(s)) errors.push(`${c.slug}: "${s}" appears twice`);
    seen.add(s);
  }
}

const oneWay = [];
for (const [a, list] of links) for (const b of list) if (links.has(b) && !links.get(b).includes(a)) oneWay.push(`${a} -> ${b}`);
const empty = [...links].filter(([, l]) => l.length === 0).map(([s]) => s);

console.log(`Checked ${links.size} live cities.`);
if (empty.length) console.log(`No nearby row: ${empty.join(', ')}`);
console.log(`One-way links (${oneWay.length}), report only:`);
for (const l of oneWay) console.log(`  ${l}`);
if (errors.length) {
  console.error(`\nFAIL: ${errors.length} problem(s):`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log('\nOK: all nearby slugs resolve, no self-links or duplicates.');
