export type RegionImage = { src: string; alt: string };

export type Region = {
  slug: string;
  name: string;
  image: RegionImage; // 800x416 map card; originals (2600x1352) live in public/images/locations/<slug>/
  cities: string[]; // city slugs (end in -ca), keys into cities.ts
};

export const citySlug = (name: string) => `${name.toLowerCase().replace(/\s+/g, '-')}-ca`;

// Tier-1 city lists (6 per region), confirmed in the homepage build brief.
// South Bay is carved out of LA County so the two hubs never compete for the same cities:
// "LA County" here means LA County minus South Bay.
const regionData: { slug: string; name: string; cityNames: string[] }[] = [
  { slug: 'los-angeles-county', name: 'Los Angeles County', cityNames: ['Los Angeles', 'Long Beach', 'Pasadena', 'Glendale', 'Burbank', 'Santa Monica'] },
  { slug: 'south-bay', name: 'South Bay', cityNames: ['Torrance', 'Redondo Beach', 'Manhattan Beach', 'Gardena', 'Carson', 'Hawthorne'] },
  { slug: 'orange-county', name: 'Orange County', cityNames: ['Anaheim', 'Irvine', 'Santa Ana', 'Huntington Beach', 'Costa Mesa', 'Fullerton'] },
  { slug: 'inland-empire', name: 'Inland Empire', cityNames: ['Riverside', 'Ontario', 'Rancho Cucamonga', 'Fontana', 'Corona', 'San Bernardino'] },
];

export const regionCityNames = regionData;

export const regions: Region[] = regionData.map((r) => ({
  slug: r.slug,
  name: r.name,
  image: { src: `/images/locations/cards/${r.slug}.webp`, alt: `Map showing the ${r.name} service area` },
  cities: r.cityNames.map(citySlug),
}));

export const getRegion = (slug: string) => regions.find((r) => r.slug === slug);
