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
