// Matrix pages published so far. Add a pair ONLY after the quality gate is met:
// a service+city page needs at least 3-4 elements genuinely specific to that city
// (climate/sizing, local utility rebate, permit/Title 24 notes, housing-stock fit,
// local reviews/job photos, real neighborhood/response-time detail).
// Thin pages are held for a later wave, not shipped.

// /[service]/[city]-ca/
// ac-repair/torrance-ca meets the gate on paper (climate/sizing, housing-stock fit, neighborhood +
// ZIP detail, condo/HOA coordination) but is still missing a verified local utility rebate,
// Title 24/permit notes, a real local review or job photo (see the PendingNote on the page), and
// real response-time detail. Confirm those with the client before this page is considered launch-ready.
export const matrixPages: { service: string; city: string }[] = [
  { service: 'ac-repair', city: 'torrance-ca' },
];

// Level 3 commercial pages (/commercial-hvac/<slug>/) live in content/commercial.ts.
