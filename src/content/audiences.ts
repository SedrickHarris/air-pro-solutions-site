// TODO(data): confirm final audience list with the client.
// Do NOT build residential + service combo pages: service pages already serve homeowners.
export const audiences = [
  'residential-hvac',
  'commercial-hvac',
  'property-management-hvac',
  'multifamily-hvac',
  'restaurant-hvac',
  'office-building-hvac',
] as const;

export type Audience = (typeof audiences)[number];

// Audiences with a real, indexable page built. The other four are still noindex PendingNote
// stubs (src/app/<slug>/page.tsx) - keep this list in sync as each one gets built.
export const builtAudiences: Audience[] = ['residential-hvac', 'commercial-hvac'];
