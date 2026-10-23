// Validates the featuredCities data on each service page that has full content.
// Fails on: slug that is not a live city, a count other than 4/6/8, a duplicate city in one service, a missing
// region (that has live cities), a live city with zero inbound service links, two services sharing more than
// MAX_OVERLAP cities, or a service with more than FOOTER_CAP footer cities.
// Reports the pairwise overlap (max and top 3 pairs).
// Warns on: a featured city with no card description or image. Reports inbound counts per city and counts per service.
// Inbound counts cover service-page links only (nearby-row links are not counted).
// Run: npm run check:featured-cities
import { featuredServices, liveCities, regions, cityBySlug, hasDescription, ALLOWED_COUNTS, MAX_OVERLAP, FOOTER_CAP, FOOTER_CITIES } from './lib/featured.mjs';

const errors = [];
const warns = [];
const inbound = new Map(liveCities.map((c) => [c.slug, 0]));
const perService = [];
const sets = new Map();

for (const svc of featuredServices) {
  const list = svc.featuredCities ?? [];
  perService.push(`${svc.slug}: ${list.length}`);
  if (!ALLOWED_COUNTS.includes(list.length)) errors.push(`${svc.slug}: ${list.length} cards (allowed: ${ALLOWED_COUNTS.join(', ')})`);
  const seen = new Set();
  sets.set(svc.slug, seen);
  for (const { citySlug } of list) {
    const c = cityBySlug.get(citySlug);
    if (!c?.page) { errors.push(`${svc.slug}: "${citySlug}" is not a live city`); continue; }
    if (seen.has(citySlug)) errors.push(`${svc.slug}: "${citySlug}" appears twice`);
    seen.add(citySlug);
    inbound.set(citySlug, inbound.get(citySlug) + 1);
    if (!hasDescription(citySlug)) warns.push(`${svc.slug}: ${citySlug} has no card description`);
    if (!c.cardImage) warns.push(`${svc.slug}: ${citySlug} has no card image`);
  }
  const footerN = [...seen].filter((s) => FOOTER_CITIES.has(s)).length;
  if (footerN > FOOTER_CAP) errors.push(`${svc.slug}: ${footerN} footer cities (max ${FOOTER_CAP})`);
  for (const r of regions) {
    const live = liveCities.some((c) => c.region === r.slug);
    if (live && ![...seen].some((s) => cityBySlug.get(s)?.region === r.slug)) errors.push(`${svc.slug}: no city from ${r.slug}`);
  }
}
const pairs = [];
const names = [...sets.keys()];
for (let i = 0; i < names.length; i++) for (let j = i + 1; j < names.length; j++) {
  const n = [...sets.get(names[i])].filter((c) => sets.get(names[j]).has(c)).length;
  pairs.push({ pair: `${names[i]} / ${names[j]}`, n });
  if (n > MAX_OVERLAP) errors.push(`${names[i]} and ${names[j]} share ${n} cities (max ${MAX_OVERLAP})`);
}
pairs.sort((a, b) => b.n - a.n || a.pair.localeCompare(b.pair));
const zeros = [...inbound].filter(([, n]) => n === 0).map(([s]) => s);
for (const s of zeros) errors.push(`${s}: zero inbound service links`);

const counts = [...inbound.values()];
console.log(`Checked ${featuredServices.length} services, ${liveCities.length} live cities.`);
console.log(`Per service: ${perService.join(', ')}`);
console.log(`Inbound per city: min ${Math.min(...counts)}, max ${Math.max(...counts)}, zero: ${zeros.join(', ') || 'none'}`);
for (const [s, n] of [...inbound].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) console.log(`  ${String(n).padStart(2)}  ${s}`);
console.log(`Overlap: max ${pairs[0]?.n ?? 0}; top 3: ${pairs.slice(0, 3).map((p) => `${p.pair} (${p.n})`).join('; ')}`);
for (const w of warns) console.log(`WARN ${w}`);
if (errors.length) {
  console.error(`\nFAIL: ${errors.length} problem(s):`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log('\nOK: featured cities valid.');
