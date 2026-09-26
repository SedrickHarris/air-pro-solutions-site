export type Region = {
  slug: string;
  name: string;
  cities: string[]; // city slugs (end in -ca), keys into cities.ts
};

// TODO(data): city lists must come from the actual service area given by the client. Do not guess.
// South Bay is carved out of LA County so the two hubs never compete for the same cities:
// "LA County" here means LA County minus South Bay.
export const regions: Region[] = [
  { slug: 'los-angeles-county', name: 'Los Angeles County', cities: ['placeholder-city-ca'] },
  { slug: 'south-bay', name: 'South Bay', cities: [] },
  { slug: 'orange-county', name: 'Orange County', cities: [] },
  { slug: 'inland-empire', name: 'Inland Empire', cities: [] },
];

export const getRegion = (slug: string) => regions.find((r) => r.slug === slug);
