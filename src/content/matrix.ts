// Matrix pages published so far. Add a pair ONLY after the quality gate is met:
// a service+city page needs at least 3-4 elements genuinely specific to that city
// (climate/sizing, local utility rebate, permit/Title 24 notes, housing-stock fit,
// local reviews/job photos, real neighborhood/response-time detail).
// Thin pages are held for a later wave, not shipped.

// /[service]/[city]-ca/
// TODO(data): PLACEHOLDER pair so the export has one param. Replace with real pairs.
export const matrixPages: { service: string; city: string }[] = [
  { service: 'ac-repair', city: 'placeholder-city-ca' },
];

// /[audience]-hvac/[service]/ (never residential-hvac)
// TODO(data): PLACEHOLDER pair so the export has one param.
export const audienceServicePages: { audience: string; service: string }[] = [
  { audience: 'commercial-hvac', service: 'ac-repair' },
];
