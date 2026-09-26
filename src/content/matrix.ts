// Matrix pages published so far. Add a pair ONLY after the quality gate is met:
// a service+city page needs at least 3-4 elements genuinely specific to that city
// (climate/sizing, local utility rebate, permit/Title 24 notes, housing-stock fit,
// local reviews/job photos, real neighborhood/response-time detail).
// Thin pages are held for a later wave, not shipped.

// /[service]/[city]-ca/
// TODO(data): PLACEHOLDER pair so the static export has one param. It has NOT passed the quality
// gate. Remove it from the sitemap/launch until the page has real Torrance content.
export const matrixPages: { service: string; city: string }[] = [
  { service: 'ac-repair', city: 'torrance-ca' },
];

// Level 3 commercial pages (/commercial-hvac/<slug>/) live in content/commercial.ts.
