import { citySlug, regionCityNames } from './regions';
import type { ServiceImage } from './services';
import type { Faq } from './faq';

// Highest-priority city launch pages (4 per region), confirmed by the client team.
const wave1 = new Set([
  'Los Angeles', 'Long Beach', 'Pasadena', 'Culver City',
  'Torrance', 'Redondo Beach', 'El Segundo', 'Gardena',
  'Irvine', 'Anaheim', 'Costa Mesa', 'Huntington Beach',
  'Riverside', 'Ontario', 'Rancho Cucamonga', 'Corona',
].map(citySlug));

// Full city-page template content. Only populated for cities with real, approved copy;
// see the "page" field below. Cities without it build as noindex stubs.
export type CityPage = {
  metaDescription: string;
  // Title/H1 are built from src/lib/seo.ts (cityTitle/cityH1) per CLAUDE.md, not hand-written here.
  lede: string; // also the Service JSON-LD description - must stay word-for-word identical to the visible copy
  heroImage?: ServiceImage;
  heroCaption?: { title: string; text: string };
  heroProof: { icon: string; label: string }[];
  trustStats: { num: string; label: string }[];
  answer: { lead: string; body: string };
  // Each string may contain **bold** segments, rendered as <strong> at display time.
  localParagraphs: string[];
  serviceCards: { slug: string; name: string; body: string }[]; // slug indexes services.ts for href/icon/image
  nearby: string[]; // city slugs
  proof: { heading: string; body: string; stats: { num: string; label: string }[] };
  faqs: Faq[];
};

export type City = {
  slug: string; // always ends in -ca, e.g. torrance-ca
  name: string; // display name without state, e.g. Torrance
  region: string; // region slug; city URLs stay flat so reassigning a region never breaks them
  neighborhoods: string[];
  zips: string[];
  housingNotes: string;
  wave: 1 | 2; // 1 = highest-priority launch city (16); 2 = first expansion (the other 16), built as noindex stubs until real content exists.
  page?: CityPage; // full template content; only torrance-ca has this so far
};

// TODO(data): neighborhoods, zips and housingNotes are intentionally empty for every city below
// except the overrides applied after generation. Fill each with real, verified local data before
// building that city page or its matrix pages. Never invent it.
const baseCities: City[] = regionCityNames.flatMap((r) =>
  r.cityNames.map((name) => ({
    slug: citySlug(name),
    name,
    region: r.slug,
    neighborhoods: [],
    zips: [],
    housingNotes: '',
    wave: wave1.has(citySlug(name)) ? (1 as const) : (2 as const),
  })),
);

// Locked copy for /service-areas/torrance-ca/. See CLAUDE.md "Claims that must not ship" pattern:
// no pricing, timing/same-day, brand-list, or unconfirmed licensing claims.
const torranceOverrides: Partial<City> = {
  neighborhoods: ['Old Torrance', 'North Torrance', 'West Torrance', 'Walteria', 'Hollywood Riviera', 'Del Amo', 'Torrance Gardens', 'South Torrance'],
  zips: ['90501', '90502', '90503', '90504', '90505'],
  housingNotes:
    'Old Torrance and North Torrance: many homes built in the 1940s through 1960s with narrow attic space and older ductwork. Hollywood Riviera and West Torrance: newer construction with more attic clearance.',
  // TODO(data): verify neighborhood names, ZIP list, and housing-stock statements against a local source before launch.
  page: {
    metaDescription:
      'Air Pro Solutions provides AC repair, heating, installation, and maintenance for Torrance homes and businesses. Licensed HVAC contractor. Schedule service.',
    lede:
      'Air Pro Solutions provides AC repair, heating, installation, and maintenance across Torrance - from Old Torrance and North Torrance to Walteria and the Hollywood Riviera border.',
    heroCaption: { title: 'Torrance, CA', text: 'Heating and cooling service across the South Bay' },
    heroProof: [
      { icon: 'shield', label: 'Licensed contractor' },
      { icon: 'star', label: '4.8-star rated' },
      { icon: 'building', label: 'Residential and commercial' },
      { icon: 'pin', label: 'Serving all of Torrance' },
    ],
    trustStats: [
      { num: 'South Bay', label: 'coverage area' },
      { num: '4.8★', label: 'Google rating, 40 reviews' },
      { num: 'C-20', label: 'California licensed' },
      { num: 'Residential and commercial', label: 'one local team' },
    ],
    answer: {
      lead: 'Air Pro Solutions is a licensed HVAC contractor serving Torrance',
      body:
        ', providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Call or request service online to schedule a visit.',
    },
    localParagraphs: [
      "Torrance sits at the edge of the South Bay's marine layer, which means homes closer to PCH and the coast run several degrees cooler than homes inland near the 110 and 405 interchange. **Air Pro Solutions sizes and services systems for the specific microclimate your address sits in**, rather than a one-size answer for the whole city.",
      "Housing stock varies block to block. **Old Torrance and North Torrance** have a large share of homes built in the 1940s through 1960s, often with narrow attic space, older ductwork, and single-stage systems that were never sized for today's insulation and window upgrades. Newer construction near **Hollywood Riviera and West Torrance** typically has more attic clearance and can support higher-efficiency equipment without major duct rework.",
      'We also service Torrance\'s condo and townhome communities and can coordinate with property managers and HOA boards on scheduling and any building approvals.',
    ],
    serviceCards: [
      { slug: 'ac-repair', name: 'AC Repair', body: 'Diagnosis and repair for cooling failures, weak airflow, and unusual noises.' },
      { slug: 'ac-installation', name: 'AC Installation and Replacement', body: "New system sizing and installation matched to your home's layout and attic access." },
      { slug: 'heating-repair', name: 'Heating Repair', body: 'Furnace and heating system diagnosis and repair for reliable winter comfort.' },
      { slug: 'heat-pump-services', name: 'Heat Pump Services', body: 'Installation, repair, and maintenance for heat pump heating and cooling systems.' },
      { slug: 'ductless-mini-split', name: 'Ductless Mini-Splits', body: 'A strong fit for Old Torrance homes with limited duct space - room-by-room comfort control.' },
      { slug: 'ac-maintenance', name: 'HVAC Maintenance', body: 'Seasonal tune-ups that catch small issues before they become no-cool or no-heat calls.' },
      { slug: 'commercial-hvac', name: 'Commercial HVAC', body: 'Rooftop units, office buildings, and retail spaces across Torrance and the South Bay.' },
      { slug: 'emergency-hvac', name: 'Emergency HVAC Repair', body: 'Call about urgent no-cool and no-heat problems in Torrance.' },
    ],
    nearby: ['redondo-beach-ca', 'manhattan-beach-ca', 'gardena-ca', 'carson-ca'],
    proof: {
      heading: "Licensed technicians and a clear explanation of the work",
      body:
        'Air Pro Solutions is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.',
      stats: [
        { num: '4.8★', label: 'Google rating' },
        { num: '40', label: 'Google reviews' },
        { num: 'C-20', label: 'California license class' },
        { num: '4', label: 'Regions served' },
      ],
    },
    faqs: [
      {
        q: 'Does Air Pro Solutions service all of Torrance?',
        a: "Yes. Air Pro Solutions covers all of Torrance, including Old Torrance, North Torrance, West Torrance, and Walteria. Torrance's coastal air keeps homes near PCH cooler, while inland neighborhoods run several degrees warmer, so we size and service systems for the specific microclimate your home sits in.",
      },
      {
        q: 'How do I schedule HVAC service in Torrance?',
        a: 'Call (323) 776-9047 or request service online and we will follow up with you. Availability varies, so call to ask about the next open appointment.',
        links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
      },
      {
        q: 'Do older Torrance homes need different HVAC work?',
        a: 'Often, yes. Many homes in Old Torrance and North Torrance were built in the 1940s through 1960s with narrow attic space and older ductwork, which can limit airflow or require modified equipment sizing. Air Pro Solutions evaluates the existing ducting and attic access before recommending a repair or replacement approach.',
      },
      {
        q: 'Does Air Pro Solutions handle HOA and condo HVAC work in Torrance?',
        a: 'Yes. Air Pro Solutions services condos, townhomes, and HOA-managed properties throughout Torrance, and can coordinate with property managers or HOA boards on scheduling and any required approvals.',
      },
      {
        q: 'What HVAC services are available in Torrance?',
        a: 'Air Pro Solutions provides AC repair, AC installation and replacement, heating repair, heat pump service, ductless mini-splits, routine maintenance, commercial HVAC, and urgent repair calls throughout Torrance, for both residential and commercial properties.',
      },
      {
        q: 'What should I do if my AC or heat stops working in Torrance?',
        a: 'Call (323) 776-9047 and tell us your system is down. We prioritize no-cool and no-heat calls and will confirm availability when you call. If you smell gas, leave the home and call 911 or your gas utility.',
        links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
      },
      {
        // TODO(data): confirm Torrance permit requirements and the client's permit process before launch.
        q: 'Does Air Pro Solutions pull permits for HVAC work in Torrance?',
        a: 'Often, yes. Equipment replacements and new installations generally require a permit and inspection through the City of Torrance. Air Pro Solutions can walk you through what your project needs.',
      },
      {
        q: 'How much does HVAC service cost in Torrance?',
        a: 'Repair cost depends on the part, the age of the system, and how accessible the unit is. Replacement cost depends on system size and your home\'s ductwork. The most accurate answer comes from an on-site evaluation, so contact us to talk through your system.',
      },
      {
        q: 'Does Air Pro Solutions service all HVAC brands in Torrance?',
        a: 'Yes. Air Pro Solutions services major residential and commercial HVAC brands, whether the equipment was installed by us or another contractor. Call to confirm your specific make and model.',
      },
    ],
    // TODO(copy): client review of every FAQ answer above before launch.
  },
};

export const cities: City[] = baseCities.map((c) => (c.slug === 'torrance-ca' ? { ...c, ...torranceOverrides } : c));

export const wave1Cities = cities.filter((c) => c.wave === 1);

export const getCity = (slug: string) => cities.find((c) => c.slug === slug);
