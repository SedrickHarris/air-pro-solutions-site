// Validates the city card lists on the four region hubs (cities.items in each hub's content file).
// Fails on: a card slug that is not a live city, a live city on more than one hub, a live city missing from its
// region's hub, or a card twice on one hub.
// Warns (does not fail) on: a card whose hub differs from the city's region in cities.ts, or a card href that is
// not /service-areas/<slug>/.
// Run: npm run check:hub-links
import { loadContent } from './lib/load-ts.mjs';

const { cities } = loadContent('cities');
const { regions, citySlug } = loadContent('regions');
const hubs = {
  'los-angeles-county': loadContent('la-county-hub').laCountyHub,
  'south-bay': loadContent('south-bay').southBayHub,
  'orange-county': loadContent('orange-county').orangeCountyHub,
  'inland-empire': loadContent('inland-empire').inlandEmpireHub,
};
const bySlug = new Map(cities.map((c) => [c.slug, c]));
const errors = [];
const warns = [];
const onHubs = new Map(); // slug -> hubs listing it

for (const r of regions) {
  const hub = hubs[r.slug];
  if (!hub) { errors.push(`${r.slug}: no hub content found`); continue; }
  const seen = new Set();
  for (const item of hub.cities.items) {
    const slug = citySlug(item.name);
    const city = bySlug.get(slug);
    if (!city?.page) { errors.push(`${r.slug}: card "${item.name}" is not a live city`); continue; }
    if (seen.has(slug)) errors.push(`${r.slug}: card "${item.name}" appears twice`);
    seen.add(slug);
    onHubs.set(slug, [...(onHubs.get(slug) ?? []), r.slug]);
    if (city.region !== r.slug) warns.push(`${slug} is shown on ${r.slug} but belongs to ${city.region} in cities.ts`);
    if (item.href !== `/service-areas/${slug}/`) warns.push(`${r.slug}: card "${item.name}" href is ${item.href}, expected /service-areas/${slug}/`);
  }
  for (const c of cities.filter((c) => c.page && c.region === r.slug)) {
    if (!seen.has(c.slug)) errors.push(`${c.slug} is missing from the ${r.slug} hub`);
  }
}
for (const [slug, list] of onHubs) if (list.length > 1) errors.push(`${slug} appears on more than one hub: ${list.join(', ')}`);

console.log(`Checked ${regions.length} hubs: ${[...regions].map((r) => `${r.slug} ${hubs[r.slug]?.cities.items.length ?? 0}`).join(', ')}.`);
for (const w of warns) console.log(`WARN ${w}`);
if (errors.length) {
  console.error(`\nFAIL: ${errors.length} problem(s):`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log('\nOK: every live city is on exactly one hub, in its own region.');
