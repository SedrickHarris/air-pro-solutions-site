export type City = {
  slug: string; // always ends in -ca, e.g. torrance-ca
  name: string; // display name without state, e.g. Torrance
  region: string; // region slug; city URLs stay flat so reassigning a region never breaks them
  neighborhoods: string[];
  zips: string[];
  housingNotes: string;
};

// TODO(data): PLACEHOLDER entry exists only so the static export has at least one
// param for city routes. Replace with real, verified local data. Never invent it.
export const cities: City[] = [
  { slug: 'placeholder-city-ca', name: 'PLACEHOLDER City', region: 'los-angeles-county', neighborhoods: [], zips: [], housingNotes: '' },
];

export const getCity = (slug: string) => cities.find((c) => c.slug === slug);
