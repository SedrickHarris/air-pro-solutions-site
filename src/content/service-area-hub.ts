import { siteConfig } from '@/content/site-config';
import type { Faq } from '@/content/faq';

// TODO(data): city lists come from the four approved regional hub pages. Confirm the final
// service-area city list with the client before launch, then fold into regions.ts/cities.ts.

export const hubDescription =
  'Licensed, 4.8-star rated HVAC contractor serving Los Angeles County, the South Bay, Orange County, and the Inland Empire. Find your region and schedule service.';

export const hubHero = {
  lede: 'Air Pro Solutions provides HVAC services in Los Angeles County, the South Bay, Orange County, and the Inland Empire, with permits, utilities, and equipment matched to each city.',
  photoCaptionTitle: 'Southern California',
  photoCaptionBody: 'Four regions, 32 cities across the region pages',
  proof: [
    { icon: 'shield-check', text: 'Licensed' },
    { icon: 'star', text: '4.8-star rated' },
    { icon: 'home', text: 'Residential & commercial' },
    { icon: 'pin', text: 'Four regions covered' },
  ],
};

export const hubTrust = [
  { num: '4 regions', label: 'LA County to the Inland Empire' },
  { num: '32 cities', label: 'covered on the region pages' },
  { num: `${siteConfig.rating}★`, label: `average rating, ${siteConfig.reviewCount} reviews` },
  { num: 'Licensed', label: `CA LIC #${siteConfig.licenses.join(', #')}` },
];

export const hubAnswer = {
  lead: 'Air Pro Solutions is a licensed HVAC contractor serving four Southern California regions',
  rest: ', Los Angeles County, the South Bay, Orange County, and the Inland Empire, for homes, multifamily buildings, and commercial properties. Each region page covers eight cities. Climate, electric utility, and permit rules change by city and sometimes by address, so every recommendation starts with the property, not a region-wide assumption.',
};

export type RegionCard = { name: string; slug: string; description: string; cities: string[] };

export const hubRegions: RegionCard[] = [
  {
    name: 'Los Angeles County',
    slug: 'los-angeles-county',
    description: 'Coast, valley, and foothill service across eight cities, with a different electric utility and permit office in most of them.',
    cities: ['Los Angeles', 'Long Beach', 'Pasadena', 'Glendale', 'Burbank', 'Culver City', 'Santa Monica', 'Inglewood'],
  },
  {
    name: 'South Bay',
    slug: 'south-bay',
    description: 'Beach cities, the LAX edge, and the inland South Bay, each with its own permit office and equipment placement rules.',
    cities: ['Torrance', 'Redondo Beach', 'Manhattan Beach', 'Hermosa Beach', 'El Segundo', 'Gardena', 'Hawthorne', 'Carson'],
  },
  {
    name: 'Orange County',
    slug: 'orange-county',
    description: 'North county, central county, and the coast, where the ocean moderates the shore and inland cities run hotter.',
    cities: ['Irvine', 'Anaheim', 'Santa Ana', 'Costa Mesa', 'Huntington Beach', 'Newport Beach', 'Fullerton', 'Tustin'],
  },
  {
    name: 'Inland Empire',
    slug: 'inland-empire',
    description: 'Riverside and San Bernardino county cities where long, hot summers put the cooling system under the heaviest load.',
    cities: ['Riverside', 'Corona', 'Ontario', 'Rancho Cucamonga', 'Chino', 'Fontana', 'Upland', 'Eastvale'],
  },
];

export type TableRow = { region: string; slug: string; cities: string; climate: string; checksFirst: string };

// Derived from hubRegions for the city list; climate/checksFirst come from the region pages
// themselves (see comments there), sourced separately since the table's wording differs from the
// card description above.
export const hubTableRows: TableRow[] = [
  {
    region: 'Los Angeles County',
    slug: 'los-angeles-county',
    cities: hubRegions[0].cities.join(', '),
    climate: 'Several climates in one county: the ocean buffers the coast while inland areas run hotter.',
    checksFirst: 'Electric utility and the city permit path. Multifamily is 77.5% of housing units in Santa Monica (2018).',
  },
  {
    region: 'South Bay',
    slug: 'south-bay',
    cities: hubRegions[1].cities.join(', '),
    climate: 'Beach cities in the west, El Segundo by LAX, Torrance, Gardena, and Hawthorne inland, Carson in the southeast.',
    checksFirst: "The property's city, since ZIP codes are not city boundaries, then noise and screening rules.",
  },
  {
    region: 'Orange County',
    slug: 'orange-county',
    cities: hubRegions[2].cities.join(', '),
    climate: 'Mild coast and hotter inland cities, with a real heating season in winter.',
    checksFirst: 'The permit office for each city and the electric utility that serves the address.',
  },
  {
    region: 'Inland Empire',
    slug: 'inland-empire',
    cities: hubRegions[3].cities.join(', '),
    climate: 'Long, hot summers and cool nights. Ontario and Riverside reached 114-115°F on September 6, 2024.',
    checksFirst: 'Equipment sizing for heat, and whether the building is older or newer housing.',
  },
];

export const hubTableNote = 'Climate and housing figures come from the individual region pages, which cite their sources. City placement is general, not a climate-zone or permit boundary.';

export const hubCityIndexNote = 'Individual city pages are coming. Torrance is live today, and each region page covers the rest.';

export const hubProof = {
  eyebrow: 'Why Air Pro',
  heading: 'Recommendations that start with your address',
  body: 'Climate, building type, electric utility, and city permit rules all change across Southern California. We check them for your property before recommending equipment, so the plan fits where you actually live or work.',
  stats: [
    { num: `${siteConfig.rating}★`, label: 'Google rating' },
    { num: String(siteConfig.reviewCount), label: 'Google reviews' },
    { num: '4', label: 'Regions served' },
    { num: 'Licensed', label: `CA LIC #${siteConfig.licenses.join(', #')}` },
  ],
};

export type HubFaq = { q: string; lead: string; rest: string; links?: Faq['links'] };

export const hubFaqs: HubFaq[] = [
  {
    q: 'Which regions does Air Pro Solutions serve?',
    lead: 'Air Pro Solutions serves four regions: Los Angeles County, the South Bay, Orange County, and the Inland Empire.',
    rest: ' Each region has its own page that lists eight cities and explains the local climate, electric utility, and permit rules.',
  },
  {
    q: 'Why is the South Bay separate from Los Angeles County?',
    lead: 'The South Bay has its own mix of beach cities, LAX-edge, and inland cities, so it has its own page.',
    rest: ' The Los Angeles County page covers the cities outside the South Bay, so the two pages never cover the same city.',
  },
  {
    q: 'What if my city is not listed?',
    lead: 'Call us and give us the address.',
    rest: ' Coverage, permits, and utilities depend on the property, and unincorporated areas follow county rules instead of city rules. We confirm the jurisdiction before quoting.',
    links: [{ text: 'Call us', href: siteConfig.phoneHref }],
  },
  {
    q: 'Do permit rules differ between cities?',
    lead: 'Yes, each city runs its own permit process.',
    rest: ' Most HVAC replacements, new installations, duct changes, and gas or electrical changes need permits and inspections. We verify the applicable local permit path before work begins.',
  },
  {
    q: 'Does the electric utility change by region?',
    lead: 'It changes by city and sometimes by address.',
    rest: ' Los Angeles County alone includes LADWP, Pasadena Water and Power, Burbank Water and Power, Glendale Water & Power, and SCE. Rebate amounts and funding change, so confirm current eligibility with your utility before installation.',
  },
  {
    q: 'Is the climate the same across all four regions?',
    lead: 'No, and that is why we size equipment from a load calculation for your property.',
    rest: ' The ocean moderates the coast, while inland cities run hotter. Inland Empire summers are a cooling-load story: Ontario reached 114°F and Riverside 115°F on September 6, 2024.',
  },
  {
    q: 'Do you serve homes and commercial properties in every region?',
    lead: 'Yes, each region page covers homes, multifamily buildings, and commercial properties.',
    rest: ' Start with the region page for your city, or go straight to Residential HVAC or Commercial HVAC.',
    links: [{ text: 'Residential HVAC', href: '/residential-hvac/' }, { text: 'Commercial HVAC', href: '/commercial-hvac/' }],
  },
  {
    q: 'How quickly can a technician reach me?',
    lead: 'Travel time depends on traffic and where your property is.',
    rest: ' Dispatch timing is confirmed when service is scheduled, based on your location and technician availability.',
  },
];

export const hubFinalCta = {
  title: 'Get HVAC service anywhere we work',
  body: 'Tell us your address and we will confirm the region, utility, permit path, and equipment options that apply.',
};
