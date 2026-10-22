// Matrix pages published so far. Add a pair ONLY after the quality gate is met:
// a service+city page needs at least 3-4 elements genuinely specific to that city
// (climate/sizing, local utility rebate, permit/Title 24 notes, housing-stock fit,
// local reviews/job photos, real neighborhood/response-time detail).
// Thin pages are held for a later wave, not shipped.

// /services/[service]/[city]/
// ac-repair/torrance was rebuilt on 2026-10-21 from verified facts only. Local elements now on the page:
// the Building and Safety permit route and the January 5, 2026 electronic-submittal date, the AC equipment
// noise code (TMC 46.2.6) with Code Enforcement, the April 2021 SCAG housing mix, the Torrance Tract (Old Torrance)
// housing era, and official-source neighborhood names and mailing ZIPs (matrix-content.ts, not the shared cities.ts). Held out until sourced: neighborhood
// housing age, climate, equipment-failure patterns, utility providers, rebates, and the adopted code edition.
// Still missing: a real local review or job photo (TODO(data) in matrix-content.ts) and response-time detail.
// Full record: docs/open-items.md, "AC Repair x Torrance".
export const matrixPages: { service: string; city: string }[] = [
  { service: 'ac-repair', city: 'torrance' },
];

// Level 3 commercial pages (/commercial-hvac/<slug>/) live in content/commercial.ts.
