export type RegionImage = { src: string; alt: string };

export type Region = {
  slug: string;
  name: string;
  image: RegionImage; // 800x416 map card; source files (1300x676) live in public/images/locations/<slug>/
  cities: string[]; // city slugs (end in -ca), keys into cities.ts
};

export const citySlug = (name: string) => `${name.toLowerCase().replace(/\s+/g, '-')}-ca`;

// Tier-1 city lists, confirmed by the client team (8 per region).
// South Bay is carved out of LA County so the two hubs never compete for the same cities:
// "LA County" here means LA County minus South Bay.
const regionData: { slug: string; name: string; cityNames: string[] }[] = [
  { slug: 'los-angeles-county', name: 'Los Angeles County', cityNames: ['Los Angeles', 'Long Beach', 'Pasadena', 'Glendale', 'Burbank', 'Culver City', 'Santa Monica', 'Inglewood'] },
  { slug: 'south-bay', name: 'South Bay', cityNames: ['Torrance', 'Redondo Beach', 'Manhattan Beach', 'Hermosa Beach', 'El Segundo', 'Gardena', 'Hawthorne', 'Carson'] },
  { slug: 'orange-county', name: 'Orange County', cityNames: ['Irvine', 'Anaheim', 'Santa Ana', 'Costa Mesa', 'Huntington Beach', 'Newport Beach', 'Fullerton', 'Tustin'] },
  { slug: 'inland-empire', name: 'Inland Empire', cityNames: ['Riverside', 'Corona', 'Ontario', 'Rancho Cucamonga', 'Chino', 'Fontana', 'Upland', 'Eastvale'] },
];

export const regionCityNames = regionData;

export const regions: Region[] = regionData.map((r) => ({
  slug: r.slug,
  name: r.name,
  image: {
    src: `/images/locations/${r.slug}/air-pro-solutions-hvac-service-area-map-${r.slug}-ca.webp`,
    alt: `Map showing the ${r.name} service area`,
  },
  cities: r.cityNames.map(citySlug),
}));

export const getRegion = (slug: string) => regions.find((r) => r.slug === slug);
