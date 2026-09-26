import { citySlug, regionCityNames } from './regions';

export type City = {
  slug: string; // always ends in -ca, e.g. torrance-ca
  name: string; // display name without state, e.g. Torrance
  region: string; // region slug; city URLs stay flat so reassigning a region never breaks them
  neighborhoods: string[];
  zips: string[];
  housingNotes: string;
};

// TODO(data): neighborhoods, zips and housingNotes are intentionally empty. Fill each with real,
// verified local data before building that city page or its matrix pages. Never invent it.
export const cities: City[] = regionCityNames.flatMap((r) =>
  r.cityNames.map((name) => ({
    slug: citySlug(name),
    name,
    region: r.slug,
    neighborhoods: [],
    zips: [],
    housingNotes: '',
  })),
);

export const getCity = (slug: string) => cities.find((c) => c.slug === slug);
