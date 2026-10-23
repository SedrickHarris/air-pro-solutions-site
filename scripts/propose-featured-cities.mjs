// Prints a proposed `featuredCities` per service plus coverage and overlap tables. Writes nothing.
// Per service, in order: (a) matrix cities, (b) one anchor city per region, (c) fill to 8.
// Hard limits: no two services share more than MAX_OVERLAP cities, at most FOOTER_CAP footer cities per service,
// at most MAX_COVERAGE inbound service links per city. A pick that would break one is skipped for the next city.
// Order within a rule: cities that must be picked now to still reach MIN_COVERAGE, then lowest inbound coverage (service-page links only), then non-footer cities, then least overlap
// with services already assigned, then the region with fewer picks on this service, then slug.
// Cities with no existing card description are skipped and listed.
// Run: npm run propose:featured-cities. Pass --ts to print the content file body (redirect it to
// src/content/featured-cities.ts yourself; this script never writes files).
import {
  featuredServices, liveCities, regions, hasMatrix, hasDescription,
  ALLOWED_COUNTS, MAX_CARDS, MAX_OVERLAP, MIN_COVERAGE, MAX_COVERAGE, FOOTER_CAP, FOOTER_CITIES,
} from './lib/featured.mjs';

const asTs = process.argv.includes('--ts');
const eligible = liveCities.filter((c) => hasDescription(c.slug));
const skipped = liveCities.filter((c) => !hasDescription(c.slug)).map((c) => c.slug);
const coverage = new Map(liveCities.map((c) => [c.slug, 0]));
const proposal = [];

for (const [idx, svc] of featuredServices.entries()) {
  const remainingAfter = featuredServices.length - idx - 1;
  const picked = [];
  const regionCount = new Map(regions.map((r) => [r.slug, 0]));
  const has = (slug) => picked.some((p) => p.citySlug === slug);
  const sharedWith = (prior) => prior.picked.filter((p) => has(p.citySlug)).length;
  // Number of cities already shared with each earlier service that also features `c`.
  const overlapOf = (c) => proposal.filter((p) => p.picked.some((x) => x.citySlug === c.slug)).map(sharedWith);
  const allowed = (c) =>
    !has(c.slug) &&
    coverage.get(c.slug) < MAX_COVERAGE &&
    (!FOOTER_CITIES.has(c.slug) || picked.filter((p) => FOOTER_CITIES.has(p.citySlug)).length < FOOTER_CAP) &&
    overlapOf(c).every((n) => n + 1 <= MAX_OVERLAP);
  const add = (c, matrix = false) => {
    picked.push({ citySlug: c.slug, matrix });
    regionCount.set(c.region, regionCount.get(c.region) + 1);
    coverage.set(c.slug, coverage.get(c.slug) + 1);
  };
  // A city is urgent when the services still to come cannot lift it to MIN_COVERAGE, so it must be picked now.
  // Footer cities also become urgent when the footer cap on the remaining services could not absorb what they still need.
  const footerNeed = () => [...FOOTER_CITIES].reduce((n, slug) => n + Math.max(0, MIN_COVERAGE - coverage.get(slug)), 0);
  const urgent = (c) =>
    MIN_COVERAGE - coverage.get(c.slug) > remainingAfter ||
    (FOOTER_CITIES.has(c.slug) && coverage.get(c.slug) < MIN_COVERAGE && footerNeed() > remainingAfter * FOOTER_CAP);
  const order = (a, b) =>
    Number(urgent(b)) - Number(urgent(a)) ||
    coverage.get(a.slug) - coverage.get(b.slug) ||
    Number(FOOTER_CITIES.has(a.slug)) - Number(FOOTER_CITIES.has(b.slug)) ||
    overlapOf(a).reduce((x, y) => x + y, 0) - overlapOf(b).reduce((x, y) => x + y, 0) ||
    regionCount.get(a.region) - regionCount.get(b.region) ||
    a.slug.localeCompare(b.slug);
  const open = () => eligible.filter(allowed);

  for (const c of eligible.filter((c) => hasMatrix(svc.slug, c.slug))) add(c, true); // a
  for (const r of regions) { // b: a region already holding a matrix city counts as anchored
    if (regionCount.get(r.slug) > 0) continue;
    const best = open().filter((c) => c.region === r.slug).sort(order)[0];
    if (best) add(best);
  }
  while (picked.length < MAX_CARDS && open().length) add(open().sort(order)[0]); // c

  // Only trims when fewer than 8 could be placed. Matrix and anchor picks come first, so they survive.
  const size = Math.max(0, ...ALLOWED_COUNTS.filter((n) => n <= picked.length));
  for (const dropped of picked.splice(size)) coverage.set(dropped.citySlug, coverage.get(dropped.citySlug) - 1);
  proposal.push({ slug: svc.slug, picked });
}

if (asTs) {
  console.log("// Cities featured in each service page's \"Where we do this\" section, in display order.");
  console.log('// Chosen by scripts/propose-featured-cities.mjs (lowest inbound coverage first, matrix pages always included,');
  console.log('// no two services sharing more than 3 cities, at most 2 footer cities per service).');
  console.log('// Edit here, then run npm run check:featured-cities.');
  console.log("// serviceNote is an optional service-specific description; without it the card uses the city's hub note.");
  console.log('export type FeaturedCity = { citySlug: string; serviceNote?: string };\n');
  console.log('export const featuredCitiesByService: Record<string, FeaturedCity[]> = {');
  for (const p of proposal) {
    console.log(`  '${p.slug}': [`);
    for (const c of p.picked) console.log(`    { citySlug: '${c.citySlug}' },${c.matrix ? ' // matrix page exists' : ''}`);
    console.log('  ],');
  }
  console.log('};');
  process.exit(0);
}

for (const p of proposal) {
  console.log(`${p.slug} (${p.picked.length})`);
  console.log('  ' + p.picked.map((c) => c.citySlug + (c.matrix ? ' [matrix]' : '')).join(', '));
}
const counts = [...coverage.values()];
console.log(`\nInbound coverage (service pages only): min ${Math.min(...counts)}, max ${Math.max(...counts)}, zero: ${[...coverage].filter(([, n]) => n === 0).map(([s]) => s).join(', ') || 'none'}`);
for (const [s, n] of [...coverage].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) console.log(`  ${String(n).padStart(2)}  ${s}`);
console.log(`\nSkipped (no card description): ${skipped.join(', ') || 'none'}`);
