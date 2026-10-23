// Prints a proposed `featuredCities` per service and a coverage table. Writes nothing.
// Rules, in order: (a) matrix cities, (b) one anchor city per region, (c) fill to 8 by lowest inbound coverage.
// Coverage counts service-page links only (nearby-row links are not counted).
// Order within a rule: lowest coverage, then cities the footer does not link, then the region with fewer picks on
// this service, then slug. Cities with no existing card description are skipped and listed.
// Run: npm run propose:featured-cities. Pass --ts to print the content file body (redirect it to
// src/content/featured-cities.ts yourself; this script never writes files).
import { featuredServices, liveCities, regions, hasMatrix, hasDescription, ALLOWED_COUNTS, MAX_CARDS } from './lib/featured.mjs';

// The cities the footer "Areas We Serve" column links sitewide (src/components/layout/Footer.tsx, areaSlugs).
// Keep in sync with that list; service pages favor the cities it leaves out.
const FOOTER_CITIES = new Set(['los-angeles', 'long-beach', 'torrance', 'redondo-beach', 'irvine', 'anaheim', 'riverside', 'ontario']);

const asTs = process.argv.includes('--ts');
const eligible = liveCities.filter((c) => hasDescription(c.slug));
const skipped = liveCities.filter((c) => !hasDescription(c.slug)).map((c) => c.slug);
const coverage = new Map(liveCities.map((c) => [c.slug, 0]));
const proposal = [];

for (const svc of featuredServices) {
  const picked = [];
  const regionCount = new Map(regions.map((r) => [r.slug, 0]));
  const add = (c, matrix = false) => {
    picked.push({ citySlug: c.slug, matrix });
    regionCount.set(c.region, regionCount.get(c.region) + 1);
    coverage.set(c.slug, coverage.get(c.slug) + 1);
  };
  const order = (a, b) =>
    coverage.get(a.slug) - coverage.get(b.slug) ||
    Number(FOOTER_CITIES.has(a.slug)) - Number(FOOTER_CITIES.has(b.slug)) ||
    regionCount.get(a.region) - regionCount.get(b.region) ||
    a.slug.localeCompare(b.slug);
  const open = () => eligible.filter((c) => !picked.some((p) => p.citySlug === c.slug));

  for (const c of eligible.filter((c) => hasMatrix(svc.slug, c.slug))) add(c, true); // a
  for (const r of regions) { // b: a region already holding a matrix city counts as anchored
    if (regionCount.get(r.slug) > 0) continue;
    const best = open().filter((c) => c.region === r.slug).sort(order)[0];
    if (best) add(best);
  }
  while (picked.length < MAX_CARDS && open().length) add(open().sort(order)[0]); // c

  // Only trims when fewer than 8 were eligible. Matrix and anchor picks come first, so they survive.
  const size = Math.max(0, ...ALLOWED_COUNTS.filter((n) => n <= picked.length));
  for (const dropped of picked.splice(size)) coverage.set(dropped.citySlug, coverage.get(dropped.citySlug) - 1);
  proposal.push({ slug: svc.slug, picked });
}

if (asTs) {
  console.log("// Cities featured in each service page's \"Where we do this\" section, in display order.");
  console.log('// Chosen by scripts/propose-featured-cities.mjs (lowest inbound coverage first, matrix pages always included).');
  console.log('// Edit here, then run npm run check:featured-cities.');
  console.log('// serviceNote is an optional service-specific description; without it the card uses the city\'s hub note.');
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
