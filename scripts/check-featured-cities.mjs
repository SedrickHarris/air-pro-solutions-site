// Validates the featuredCities data on each service page that has full content.
// Fails on: slug that is not a live city, a count other than 4/6/8, a duplicate city in one service, a missing
// region (that has live cities), or a live city with zero inbound service links.
// Warns on: a featured city with no card description or image. Reports inbound counts per city and counts per service.
// Inbound counts cover service-page links only (nearby-row links are not counted).
// Run: npm run check:featured-cities
import { featuredServices, liveCities, regions, cityBySlug, hasDescription, ALLOWED_COUNTS } from './lib/featured.mjs';

const errors = [];
const warns = [];
const inbound = new Map(liveCities.map((c) => [c.slug, 0]));
const perService = [];

for (const svc of featuredServices) {
  const list = svc.featuredCities ?? [];
  perService.push(`${svc.slug}: ${list.length}`);
  if (!ALLOWED_COUNTS.includes(list.length)) errors.push(`${svc.slug}: ${list.length} cards (allowed: ${ALLOWED_COUNTS.join(', ')})`);
  const seen = new Set();
  for (const { citySlug } of list) {
    const c = cityBySlug.get(citySlug);
    if (!c?.page) { errors.push(`${svc.slug}: "${citySlug}" is not a live city`); continue; }
    if (seen.has(citySlug)) errors.push(`${svc.slug}: "${citySlug}" appears twice`);
    seen.add(citySlug);
    inbound.set(citySlug, inbound.get(citySlug) + 1);
    if (!hasDescription(citySlug)) warns.push(`${svc.slug}: ${citySlug} has no card description`);
    if (!c.cardImage) warns.push(`${svc.slug}: ${citySlug} has no card image`);
  }
  for (const r of regions) {
    const live = liveCities.some((c) => c.region === r.slug);
    if (live && ![...seen].some((s) => cityBySlug.get(s)?.region === r.slug)) errors.push(`${svc.slug}: no city from ${r.slug}`);
  }
}
const zeros = [...inbound].filter(([, n]) => n === 0).map(([s]) => s);
for (const s of zeros) errors.push(`${s}: zero inbound service links`);

const counts = [...inbound.values()];
console.log(`Checked ${featuredServices.length} services, ${liveCities.length} live cities.`);
console.log(`Per service: ${perService.join(', ')}`);
console.log(`Inbound per city: min ${Math.min(...counts)}, max ${Math.max(...counts)}, zero: ${zeros.join(', ') || 'none'}`);
for (const [s, n] of [...inbound].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) console.log(`  ${String(n).padStart(2)}  ${s}`);
for (const w of warns) console.log(`WARN ${w}`);
if (errors.length) {
  console.error(`\nFAIL: ${errors.length} problem(s):`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log('\nOK: featured cities valid.');
