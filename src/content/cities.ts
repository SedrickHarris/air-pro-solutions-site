import { citySlug, regionCityNames } from './regions';
import { serviceHref } from './services';
import type { ServiceImage } from './services';
import type { Faq } from './faq';
import type { RebateCard } from '@/components/sections/RebateCards';

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
  // --- Optional fields. Torrance sets none of them, so its page renders exactly as before. ---
  // Use the "Across" title variant (seoTitle.cityTitleAcross) when cityTitle() would collide with homeTitle().
  distinctTitle?: boolean;
  // Card shown beside the quick answer in place of the photo (verified city facts only).
  glance?: { title: string; stats: { num: string; label: string }[]; source: string };
  // LocalKnowledge extras: external lookup links, a partial-list note and a ZIP label.
  localLinks?: { text: string; href: string }[];
  neighborhoodsHeading?: string;
  neighborhoodsNote?: string;
  zipGroups?: { label: string; zips: string[] }[]; // grouped ZIP pills, replaces the flat ZIP line
  zipsLabel?: string;
  // "Know before you start" official-source cards (permits, rebates, air quality).
  resources?: { eyebrow: string; title: string; intro: string; cards: RebateCard[] };
  localTitle?: string; // overrides the default local-knowledge H2 ("HVAC work built around {City}'s housing stock")
  servicesTitle?: string;
  finalCtaBody?: string;
};

export type City = {
  slug: string; // lowercase hyphenated city name with no -ca suffix, e.g. torrance
  name: string; // display name without state, e.g. Torrance
  region: string; // region slug; city URLs stay flat so reassigning a region never breaks them
  neighborhoods: string[];
  zips: string[];
  housingNotes: string;
  wave: 1 | 2; // 1 = highest-priority launch city (16); 2 = first expansion (the other 16), built as noindex stubs until real content exists.
  page?: CityPage; // full template content; torrance, los-angeles and long-beach have this so far
  cardImage?: ServiceImage; // 800x600 card image used when this city appears in a nearby-areas row
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

// Locked copy for /service-areas/torrance/. See CLAUDE.md "Claims that must not ship" pattern:
// no pricing, timing/same-day, brand-list, or unconfirmed licensing claims.
const torranceOverrides: Partial<City> = {
  neighborhoods: ['Old Torrance', 'North Torrance', 'West Torrance', 'Walteria', 'Hollywood Riviera', 'Del Amo', 'Torrance Gardens', 'South Torrance'],
  zips: ['90501', '90502', '90503', '90504', '90505'],
  housingNotes:
    'Old Torrance and North Torrance: many homes built in the 1940s through 1960s with narrow attic space and older ductwork. Hollywood Riviera and West Torrance: newer construction with more attic clearance.',
  // TODO(data): verify neighborhood names, ZIP list, and housing-stock statements against a local source before launch.
  page: {
    metaDescription:
      'AIRPRO SOLUTIONS provides AC repair, heating, installation, and maintenance for Torrance homes and businesses. Licensed HVAC contractor. Schedule service.',
    lede:
      'AIRPRO SOLUTIONS provides AC repair, heating, installation, and maintenance across Torrance - from Old Torrance and North Torrance to Walteria and the Hollywood Riviera border.',
    heroImage: {
      src: '/images/service-location/hvac-services-torrance-ca/hero.webp',
      alt: 'Outdoor AC condenser beside a Torrance home with drought-tolerant landscaping',
    },
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
      lead: 'AIRPRO SOLUTIONS is a licensed HVAC contractor serving Torrance',
      body:
        ', providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Call or request service online to schedule a visit.',
    },
    localParagraphs: [
      "Torrance sits at the edge of the South Bay's marine layer, which means homes closer to PCH and the coast run several degrees cooler than homes inland near the 110 and 405 interchange. **AIRPRO SOLUTIONS sizes and services systems for the specific microclimate your address sits in**, rather than a one-size answer for the whole city.",
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
    nearby: ['redondo-beach', 'manhattan-beach', 'gardena', 'carson'],
    proof: {
      heading: "Licensed technicians and a clear explanation of the work",
      body:
        'AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.',
      stats: [
        { num: '4.8★', label: 'Google rating' },
        { num: '40', label: 'Google reviews' },
        { num: 'C-20', label: 'California license class' },
        { num: '4', label: 'Regions served' },
      ],
    },
    faqs: [
      {
        q: 'Does AIRPRO SOLUTIONS service all of Torrance?',
        a: "Yes. AIRPRO SOLUTIONS covers all of Torrance, including Old Torrance, North Torrance, West Torrance, and Walteria. Torrance's coastal air keeps homes near PCH cooler, while inland neighborhoods run several degrees warmer, so we size and service systems for the specific microclimate your home sits in.",
      },
      {
        q: 'How do I schedule HVAC service in Torrance?',
        a: 'Call (323) 776-9047 or request service online and we will follow up with you. Availability varies, so call to ask about the next open appointment.',
        links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
      },
      {
        q: 'Do older Torrance homes need different HVAC work?',
        a: 'Often, yes. Many homes in Old Torrance and North Torrance were built in the 1940s through 1960s with narrow attic space and older ductwork, which can limit airflow or require modified equipment sizing. AIRPRO SOLUTIONS evaluates the existing ducting and attic access before recommending a repair or replacement approach.',
      },
      {
        q: 'Does AIRPRO SOLUTIONS handle HOA and condo HVAC work in Torrance?',
        a: 'Yes. AIRPRO SOLUTIONS services condos, townhomes, and HOA-managed properties throughout Torrance, and can coordinate with property managers or HOA boards on scheduling and any required approvals.',
      },
      {
        q: 'What HVAC services are available in Torrance?',
        a: 'AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, heating repair, heat pump service, ductless mini-splits, routine maintenance, commercial HVAC, and urgent repair calls throughout Torrance, for both residential and commercial properties.',
      },
      {
        q: 'What should I do if my AC or heat stops working in Torrance?',
        a: 'Call (323) 776-9047 and tell us your system is down. We prioritize no-cool and no-heat calls and will confirm availability when you call. If you smell gas, leave the home and call 911 or your gas utility.',
        links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
      },
      {
        // TODO(data): confirm Torrance permit requirements and the client's permit process before launch.
        q: 'Does AIRPRO SOLUTIONS pull permits for HVAC work in Torrance?',
        a: 'Often, yes. Equipment replacements and new installations generally require a permit and inspection through the City of Torrance. AIRPRO SOLUTIONS can walk you through what your project needs.',
      },
      {
        q: 'How much does HVAC service cost in Torrance?',
        a: 'Repair cost depends on the part, the age of the system, and how accessible the unit is. Replacement cost depends on system size and your home\'s ductwork. The most accurate answer comes from an on-site evaluation, so contact us to talk through your system.',
      },
      {
        q: 'Does AIRPRO SOLUTIONS service all HVAC brands in Torrance?',
        a: 'Yes. AIRPRO SOLUTIONS services major residential and commercial HVAC brands, whether the equipment was installed by us or another contractor. Call to confirm your specific make and model.',
      },
    ],
    // TODO(copy): client review of every FAQ answer above before launch.
  },
};

// Copy for /service-areas/los-angeles/. Facts come only from the verified Los Angeles research (City of Los
// Angeles, LADBS, LADWP and South Coast AQMD pages). Climate, housing age, terrain, noise and HOA detail were
// NOT FOUND in that research, so none of it appears here. On-page claims use the client-approved wording
// from CLAUDE.md "Approved claims" and nothing stronger.
const losAngelesOverrides: Partial<City> = {
  // TODO(data): add verified neighborhood detail (climate, housing, terrain) before treating this as a full local page.
  neighborhoods: [], // named communities (Arleta, Athens, Atwater, Baldwin Hills) appear in the lede; the card shows the City ZIP listing only
  // ZIPs below are the City's own listing (grouped by area in page.zipGroups).
  zips: ['90001', '90002', '90003', '90004', '90005', '90006', '90007', '90008', '90010', '90011', '90012', '90013', '90014', '90015', '90017', '90018', '90019', '90020', '90021', '90024', '90025', '90026', '90027', '90028', '90029', '90031', '90032', '90033', '90034', '90035', '90036', '90037', '90038', '90039', '90041', '90042', '90043', '90044', '90045', '90046', '90047', '90048', '90049', '90056', '90057', '90058', '90059', '90061', '90062', '90063', '90064', '90065', '90066', '90067', '90068', '90071', '90074', '90077', '90078', '90079', '90089', '90094', '90095', '90272', '90291', '90292', '90293', '90710', '90731', '90732', '90733', '90734', '90744', '90748', '91040', '91041', '91042', '91043', '91302', '91303', '91304', '91306', '91307', '91308', '91311', '91312', '91313', '91316', '91324', '91325', '91326', '91330', '91331', '91333', '91334', '91335', '91337', '91340', '91342', '91343', '91344', '91345', '91346', '91352', '91353', '91356', '91357', '91364', '91365', '91367', '91371', '91372', '91399', '91401', '91402', '91403', '91406', '91407', '91408', '91409', '91410', '91411', '91412', '91413', '91416', '91423', '91426', '91436', '91601', '91602', '91604', '91606', '91607', '91608', '91610', '91614', '91615', '91616', '91617', '91618'],
  page: {
    distinctTitle: true,
    metaDescription:
      'Residential and commercial HVAC in the City of Los Angeles, from Arleta to Baldwin Hills. Know the LADBS permit steps and LADWP rebate. Schedule service.',
    lede:
      'AIRPRO SOLUTIONS provides HVAC services across the City of Los Angeles, including AC repair, heating repair, installation, and maintenance for homes and businesses - from Arleta and Atwater to Athens and Baldwin Hills.',
    heroProof: [
      { icon: 'shield', label: 'Licensed, bonded & insured' },
      { icon: 'star', label: '4.8-star rated' },
      { icon: 'bolt', label: '24/7 emergency dispatch' },
      { icon: 'building', label: 'Residential and commercial' },
    ],
    trustStats: [
      { num: '4.8★', label: 'Google rating, 40 reviews' },
      { num: 'C-20', label: 'California licensed' },
      { num: '24/7', label: 'emergency dispatch' },
      { num: 'Same-day', label: 'service typical' },
    ],
    answer: {
      lead: 'AIRPRO SOLUTIONS is a licensed HVAC contractor serving the City of Los Angeles',
      body:
        ', providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.',
    },
    glance: {
      title: 'Los Angeles at a glance',
      stats: [
        { num: '99', label: 'Neighborhood Councils' },
        { num: '34', label: 'Community Plans in the General Plan' },
        { num: 'LADBS', label: 'issues HVAC permits inside city limits' },
      ],
      source: 'Source: City of Los Angeles Neighborhood Councils, Planning, and LADBS pages.',
    },
    localParagraphs: [
      'The City of Los Angeles is organized into **99 Neighborhood Councils**, and its General Plan is built from **34 Community Plans**. A call in one community can look very different from a call in another, so **AIRPRO SOLUTIONS plans each visit around your specific address** instead of treating the whole city as a single market.',
      // TODO(data): "can walk you through" is a practice claim carried over from the Torrance page; client to confirm the permit process.
      'Permits also work differently here than in a smaller suburb. Heating and cooling work inside city limits goes through **LADBS, the Los Angeles Department of Building and Safety**. LADBS requires a mechanical permit to install or modify a heating or cooling system, and covered work needs HVAC plan check approval before the permit is issued. Qualifying small projects can be filed online through PermitLA, and projects that need plan review go through ePlanLA. AIRPRO SOLUTIONS can walk you through what your project needs.',
      'Two more local resources are worth knowing. **LADWP** lists a heat-pump HVAC rebate of up to $2,500 per ton/unit through its Home Electrification Savings program, and **South Coast AQMD** publishes current air quality readings at the neighborhood level. Details and links are in the section below.',
    ],
    neighborhoodsHeading: 'Los Angeles ZIP codes by area',
    zipsLabel: "From the City of Los Angeles ZIP-code listing",
    zipGroups: [
      { label: 'Central / Downtown', zips: ['90012', '90013', '90014', '90015', '90017', '90021', '90057', '90071', '90074', '90079'] },
      { label: 'Eastside / Northeast', zips: ['90031', '90032', '90033', '90039', '90041', '90042', '90063', '90065'] },
      { label: 'Hollywood / Mid-City', zips: ['90004', '90005', '90006', '90010', '90018', '90019', '90020', '90026', '90027', '90028', '90029', '90035', '90036', '90038', '90046', '90048', '90057', '90068', '90078'] },
      { label: 'Westside', zips: ['90024', '90025', '90034', '90043', '90045', '90049', '90056', '90064', '90066', '90067', '90077', '90089', '90094', '90095', '90272', '90291', '90292', '90293'] },
      { label: 'South LA / Harbor', zips: ['90001', '90002', '90003', '90007', '90008', '90011', '90037', '90043', '90044', '90047', '90058', '90059', '90061', '90062', '90710', '90731', '90732', '90733', '90734', '90744', '90748'] },
      { label: 'San Fernando Valley', zips: ['91040', '91041', '91042', '91043', '91302', '91303', '91304', '91306', '91307', '91308', '91311', '91312', '91313', '91316', '91324', '91325', '91326', '91330', '91331', '91333', '91334', '91335', '91337', '91340', '91342', '91343', '91344', '91345', '91346', '91352', '91353', '91356', '91357', '91364', '91365', '91367', '91371', '91372', '91399', '91401', '91402', '91403', '91406', '91407', '91408', '91409', '91410', '91411', '91412', '91413', '91416', '91423', '91426', '91436', '91601', '91602', '91604', '91606', '91607', '91608', '91610', '91614', '91615', '91616', '91617', '91618'] },
    ],
    localLinks: [
      { text: 'City neighborhood lookup', href: 'https://neighborhoodinfo.lacity.org/' },
      { text: 'ZIMAS zoning lookup', href: 'https://planning.lacity.gov/zoning/zoning-search' },
    ],
    servicesTitle: 'Everything we handle for Los Angeles homes and businesses',
    serviceCards: [
      { slug: 'ac-repair', name: 'AC Repair', body: 'Diagnosis and repair for cooling failures, weak airflow, and unusual noises.' },
      // TODO(copy): "& Replacement" card names pending client confirmation, same as the Torrance cards.
      { slug: 'ac-installation', name: 'AC Installation & Replacement', body: 'New system sizing and installation, including the LADBS permit steps that apply to your project.' },
      { slug: 'ac-maintenance', name: 'AC Maintenance', body: 'Seasonal AC tune-ups that catch small issues early.' },
      { slug: 'heating-repair', name: 'Heating Repair', body: 'Furnace and heating system diagnosis and repair.' },
      { slug: 'furnace-installation', name: 'Furnace Installation & Replacement', body: 'New furnace sizing and installation, including the LADBS permit steps that apply to your project.' },
      { slug: 'heat-pump-services', name: 'Heat Pump Services', body: 'Installation, repair, and maintenance for heat pumps, which may qualify for an LADWP rebate.' },
      { slug: 'ductless-mini-split', name: 'Ductless Mini-Split', body: 'Room-by-room comfort control for spaces where ductwork is not an option.' },
      { slug: 'ductwork', name: 'Ductwork Services', body: 'Duct repair, sealing, replacement, and installation.' },
      { slug: 'indoor-air-quality', name: 'Indoor Air Quality', body: 'Air filtration, whole-home purification, and ventilation options.' },
      { slug: 'emergency-hvac', name: 'Emergency HVAC', body: 'Dispatch for no-cool and no-heat emergencies in Los Angeles.' },
    ],
    resources: {
      eyebrow: 'Know before you start',
      title: 'Los Angeles permits, rebates, and air quality',
      intro: 'Official sources for the three local items that come up most on Los Angeles HVAC projects.',
      cards: [
        {
          amount: 'Up to $2,500',
          description: 'per ton/unit, LADWP heat-pump HVAC rebate through Home Electrification Savings. Listed May 22, 2026. Confirm current terms with LADWP before you buy.',
          linkLabel: 'LADWP rebate details',
          linkHref: 'https://www.ladwp.com/pt-pt/node/10406',
          // TODO(data): the research source for this figure is undated; reconfirm the amount and terms before launch.
        },
        {
          amount: 'LADBS permit',
          description: 'Mechanical HVAC permits and plan check apply when installing or modifying heating and cooling systems in the City of Los Angeles.',
          linkLabel: 'LADBS HVAC permit page',
          linkHref: 'http://dbs.lacity.gov/services/plan-review-permitting/mechanical-hvac-permits',
        },
        {
          amount: 'AQMD air quality',
          description: 'South Coast AQMD publishes current AQI data, forecasts, and health recommendations at the neighborhood level.',
          linkLabel: 'Current air quality data',
          linkHref: 'https://www.aqmd.gov/home/air-quality/current-air-quality-data',
        },
      ],
    },
    nearby: ['torrance', 'long-beach', 'pasadena', 'culver-city'],
    proof: {
      heading: 'Licensed, reviewed, and ready across the City of Los Angeles',
      body: 'AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.',
      stats: [
        { num: '4.8★', label: 'Google rating' },
        { num: '40', label: 'Google reviews' },
        { num: 'C-20', label: 'California license class' },
        { num: '24/7', label: 'Emergency dispatch' },
      ],
    },
    finalCtaBody: 'Call or request service online to schedule a visit anywhere in Los Angeles. Same-day service is typical.',
    faqs: [
      {
        q: 'Does AIRPRO SOLUTIONS service all of Los Angeles?',
        a: 'Yes. AIRPRO SOLUTIONS serves homes and businesses across the City of Los Angeles as part of our LA County coverage. The city has 99 Neighborhood Councils and 34 Community Plans, so we plan each visit around your specific address instead of treating the whole city as one market.',
      },
      {
        q: 'How fast can a technician reach my Los Angeles home?',
        a: 'Same-day service is typical in Los Angeles, subject to capacity. Call (323) 776-9047 to confirm a window for your address.',
        links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
      },
      {
        q: 'Do I need a permit for HVAC work in Los Angeles?',
        a: 'Usually, yes. The Los Angeles Department of Building and Safety (LADBS) requires a mechanical permit to install or modify a heating or cooling system, and covered work needs HVAC plan check approval before the permit is issued. Smaller qualifying projects can be filed online through PermitLA, while projects that need plan review go through ePlanLA. AIRPRO SOLUTIONS can walk you through what your project needs.',
      },
      {
        q: 'How do I look up my Los Angeles neighborhood or zoning?',
        a: "The City publishes free lookup tools. The City's neighborhood lookup tool identifies neighborhood information from an address, and ZIMAS is the City's property-level zoning and land-use lookup. Both are useful to have on hand before a larger HVAC project.",
        links: [
          { text: "City's neighborhood lookup tool", href: 'https://neighborhoodinfo.lacity.org/' },
          { text: 'ZIMAS', href: 'https://planning.lacity.gov/zoning/zoning-search' },
        ],
      },
      {
        q: 'Is there a rebate for a heat pump in Los Angeles?',
        a: 'LADWP lists a heat-pump HVAC rebate of up to $2,500 per ton/unit. It is offered through the LADWP Home Electrification Savings program and was listed on May 22, 2026. Terms and eligibility can change, so confirm the current details with LADWP before you buy.',
      },
      {
        q: 'Where can I check air quality before I decide on filtration or ventilation?',
        a: 'South Coast AQMD publishes current air quality data. Its readings, AQI categories, forecasts, and health recommendations are available at the neighborhood level across its jurisdiction, which includes major portions of Los Angeles County. If indoor air quality is a concern, AIRPRO SOLUTIONS can talk through your options.',
      },
      {
        q: 'What HVAC services are available in Los Angeles?',
        a: 'AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout Los Angeles, for both residential and commercial properties.',
      },
      {
        q: 'Is emergency HVAC service available in Los Angeles?',
        a: 'Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in Los Angeles. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.',
        links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
      },
      {
        q: 'How much does HVAC service cost in Los Angeles?',
        a: 'Cost depends on the problem, the equipment, and how accessible the system is. Because Los Angeles covers many different home and building types, we do not publish one flat price for the whole city. Call (323) 776-9047 or request service and we will quote your specific system.',
        links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
      },
      {
        q: 'Does AIRPRO SOLUTIONS handle commercial HVAC in Los Angeles?',
        a: 'Yes. AIRPRO SOLUTIONS services commercial properties in Los Angeles, including rooftop units, office buildings, and retail spaces. See our Commercial HVAC page for the full scope.',
        links: [{ text: 'Commercial HVAC page', href: '/commercial-hvac/' }],
      },
    ],
    // TODO(copy): client review of every FAQ answer above before launch.
  },
};

// Copy for /service-areas/long-beach/. Facts come only from the verified Long Beach research (U.S. Census
// Bureau, City of Long Beach Permit Center, Noise Control Program, zoning and ZIP maps, Long Beach
// Utilities and SCE pages). Climate, median build year, housing-type split, exact noise limits, major
// employers and the port were NOT FOUND in that research, so none of it appears here. On-page claims use
// the client-approved wording from CLAUDE.md "Approved claims" and nothing stronger.
const longBeachOverrides: Partial<City> = {
  // TODO(data): add verified neighborhood, housing-age and climate detail before treating this as a full local page.
  neighborhoods: [], // named communities (Belmont Shore, Bixby Knolls, Los Cerritos, Lakewood Village) appear in the lede; the card shows the City ZIP listing only
  // ZIPs below are the High-confidence entries from the City ZIP-code map (grouped by area in page.zipGroups).
  // TODO(data): 90744 and 90831 (Medium confidence) and the institutional/PO-box ZIPs are held out until confirmed against USPS/City GIS.
  zips: ['90801', '90802', '90803', '90804', '90805', '90806', '90807', '90808', '90810', '90813', '90814', '90815'],
  page: {
    metaDescription:
      'Residential and commercial HVAC in Long Beach, from Belmont Shore to Bixby Knolls. Know the City permit steps and SCE rebates. Schedule service.',
    lede:
      'AIRPRO SOLUTIONS provides HVAC services across Long Beach, including AC repair, heating repair, installation, and maintenance for homes and businesses - from Belmont Shore and Bixby Knolls to Los Cerritos and Lakewood Village.',
    heroProof: [
      { icon: 'shield', label: 'Licensed, bonded & insured' },
      { icon: 'star', label: '4.8-star rated' },
      { icon: 'bolt', label: '24/7 emergency dispatch' },
      { icon: 'building', label: 'Residential and commercial' },
    ],
    trustStats: [
      { num: '4.8★', label: 'Google rating, 40 reviews' },
      { num: 'C-20', label: 'California licensed' },
      { num: '24/7', label: 'emergency dispatch' },
      { num: 'Same-day', label: 'service typical' },
    ],
    answer: {
      lead: 'AIRPRO SOLUTIONS is a licensed HVAC contractor serving Long Beach',
      body:
        ', providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.',
    },
    glance: {
      title: 'Long Beach at a glance',
      stats: [
        { num: '181,216', label: 'housing units, 2024 ACS 1-Year estimate' },
        { num: '40.9%', label: 'owner-occupied housing units, 2019-2023' },
        { num: '1,900+', label: 'miles of gas pipeline run by Long Beach Utilities' },
      ],
      source: 'Sources: U.S. Census Bureau (ACS, QuickFacts) and Long Beach Utilities.',
    },
    localTitle: 'Long Beach has its own permits, gas utility, and zoning map',
    localParagraphs: [
      'Long Beach has **its own municipal gas utility**. Long Beach Utilities provides natural gas in Long Beach and Signal Hill and to parts of nearby communities, while **Southern California Edison** provides electricity. Gas and electric programs come from different places, so **AIRPRO SOLUTIONS can help you sort out which ones apply** before you choose equipment.',
      // TODO(data): "can walk you through" is a practice claim carried over from the Torrance page; client to confirm the permit process.
      'Permits run through the City itself. **Long Beach issues building, electrical, plumbing, and mechanical permits through its Permit Center** at 411 West Ocean Blvd., 3rd Floor, and permits and plans for mechanical construction on private property are issued and processed there, separate from LADBS in the City of Los Angeles. AIRPRO SOLUTIONS can walk you through what your project needs.',
      "Two more local items are worth knowing. The City's **Noise Control Program** enforces Municipal Code Chapter 8.80 and names air conditioners among equipment that can exceed noise standards, so it helps to plan where new equipment will sit. The City's **zoning and land-use map** shows a property's zoning, historic-district status, coastal-zone status, and parking-impacted areas. Official links are below and in the section that follows.",
    ],
    neighborhoodsHeading: 'Long Beach ZIP codes by area',
    zipsLabel: 'From the City of Long Beach ZIP-code map',
    zipGroups: [
      { label: 'Downtown & Central', zips: ['90801', '90802', '90806', '90813'] },
      { label: 'Belmont Shore & Belmont Heights', zips: ['90803', '90814'] },
      { label: 'Eastside & East Long Beach', zips: ['90804', '90808', '90815'] },
      { label: 'North Long Beach & Bixby Knolls', zips: ['90805', '90807'] },
      { label: 'West Long Beach', zips: ['90810'] },
    ],
    localLinks: [
      { text: 'Long Beach Utilities gas service', href: 'https://www.lbutilities.org/Gas' },
      { text: 'City zoning and land-use map', href: 'https://www.longbeach.gov/lbcd/planning/current/maps/' },
      { text: 'City ZIP-code map', href: 'https://maps.longbeach.gov/datasets/zip-codes/about' },
    ],
    servicesTitle: 'Everything we handle for Long Beach homes and businesses',
    serviceCards: [
      { slug: 'ac-repair', name: 'AC Repair', body: 'Diagnosis and repair for cooling failures, weak airflow, and unusual noises.' },
      { slug: 'ac-installation', name: 'AC Installation & Replacement', body: 'New system sizing and installation, including the City of Long Beach permit steps that apply to your project.' },
      { slug: 'ac-maintenance', name: 'AC Maintenance', body: 'Seasonal AC tune-ups that catch small issues early.' },
      { slug: 'heating-repair', name: 'Heating Repair', body: 'Furnace and heating system diagnosis and repair.' },
      { slug: 'furnace-installation', name: 'Furnace Installation & Replacement', body: 'New furnace sizing and installation, including the City of Long Beach permit steps that apply to your project.' },
      { slug: 'heat-pump-services', name: 'Heat Pump Services', body: 'Installation, repair, and maintenance for heat pumps.' },
      { slug: 'ductless-mini-split', name: 'Ductless Mini-Split', body: 'Room-by-room comfort control for spaces where ductwork is not an option.' },
      { slug: 'ductwork', name: 'Ductwork Services', body: 'Duct repair, sealing, replacement, and installation.' },
      { slug: 'indoor-air-quality', name: 'Indoor Air Quality', body: 'Air filtration, whole-home purification, and ventilation options.' },
      { slug: 'emergency-hvac', name: 'Emergency HVAC', body: 'Dispatch for no-cool and no-heat emergencies in Long Beach.' },
    ],
    resources: {
      eyebrow: 'Know before you start',
      title: 'Long Beach permits, rebates, and noise rules',
      intro: 'Official sources for three local items worth checking before a Long Beach HVAC project.',
      cards: [
        {
          amount: 'City permit',
          description: 'Building, electrical, plumbing, and mechanical construction permits are handled at the City of Long Beach Permit Center, 411 West Ocean Blvd., 3rd Floor.',
          linkLabel: 'Long Beach Permit Center',
          linkHref: 'https://www.longbeach.gov/lbcd/building/permit-center/',
        },
        {
          amount: 'SCE rebates',
          description: 'SCE lists Golden State Rebates instant coupons for air conditioners and smart thermostats at participating retailers, plus a $75 bill credit through eligible smart-thermostat demand-response programs. Confirm current terms with SCE before you buy.',
          linkLabel: 'SCE rebate details',
          linkHref: 'https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace',
          // TODO(data): the SCE rebate pages show no update date; reconfirm the coupon and credit terms before launch.
        },
        {
          amount: 'Noise code',
          description: "Long Beach's Noise Control Program enforces Municipal Code Chapter 8.80 and names air conditioners among equipment that can exceed noise standards.",
          linkLabel: 'Noise Control Program',
          linkHref: 'https://www.longbeach.gov/health/inspections-and-reporting/reporting/noise-monitoring/',
        },
      ],
    },
    // TODO(data): Carson and Redondo Beach have no city pages yet, so their cards render without a link; Torrance and Los Angeles link.
    nearby: ['torrance', 'los-angeles', 'carson', 'redondo-beach'],
    proof: {
      heading: 'Licensed, reviewed, and ready across Long Beach',
      body: 'AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.',
      stats: [
        { num: '4.8★', label: 'Google rating' },
        { num: '40', label: 'Google reviews' },
        { num: 'C-20', label: 'California license class' },
        { num: '24/7', label: 'Emergency dispatch' },
      ],
    },
    finalCtaBody: 'Call or request service online to schedule a visit anywhere in Long Beach. Same-day service is typical.',
    faqs: [
      {
        q: 'Does AIRPRO SOLUTIONS service all of Long Beach?',
        a: 'Yes. AIRPRO SOLUTIONS serves homes and businesses across Long Beach as part of our LA County coverage. Long Beach runs its own permit office and its own municipal gas utility, so we plan each visit around your specific address.',
        links: [{ text: 'LA County coverage', href: '/service-areas/los-angeles-county/' }],
      },
      {
        q: 'How fast can a technician reach my Long Beach home?',
        a: 'Same-day service is typical in Long Beach, subject to capacity. Call (323) 776-9047 to confirm a window for your address.',
        links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
      },
      {
        q: 'Where do I get an HVAC permit in Long Beach?',
        a: 'Through the City of Long Beach Permit Center. The City issues and processes mechanical construction permits for private property at its Permit Center, 411 West Ocean Blvd., 3rd Floor, alongside building, electrical, and plumbing permits. Ask the Permit Center what your specific project requires. AIRPRO SOLUTIONS can walk you through the steps.',
      },
      {
        q: 'Does Long Beach regulate air conditioner noise?',
        a: "The City's Noise Control Program covers air conditioners. The program enforces Municipal Code Chapter 8.80 and names air conditioners and other equipment among sources that can exceed noise standards. Enforcement follows a written sworn complaint from a resident or property owner in the affected noise district. Check the current code text for exact limits before you decide where new equipment will go.",
      },
      {
        q: 'Who supplies gas and electricity in Long Beach?',
        a: 'Natural gas comes from Long Beach Utilities, and electricity comes from Southern California Edison (SCE). Long Beach Utilities provides gas in Long Beach and Signal Hill and to parts of nearby communities, and operates more than 1,900 miles of gas pipeline. Because the two services come from different utilities, gas and electric programs are separate, so check each one before you buy.',
      },
      {
        q: 'Is there a rebate for AC or a smart thermostat in Long Beach?',
        a: 'SCE lists Golden State Rebates instant coupons for air conditioners and smart thermostats at participating retailers. SCE also lists a $75 bill credit through eligible demand-response programs when it temporarily adjusts an eligible smart thermostat by up to four degrees, and free upgrades for eligible households through its Energy Savings Assistance Program. Long Beach Utilities lists natural-gas efficiency programs as well. Terms and eligibility can change, so confirm current details with SCE and Long Beach Utilities before you buy.',
      },
      {
        q: 'What HVAC services are available in Long Beach?',
        a: 'AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout Long Beach, for both residential and commercial properties.',
        boldLead: 'AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC',
        links: [
          { text: 'AC repair', href: serviceHref('ac-repair') },
          { text: 'AC installation and replacement', href: serviceHref('ac-installation') },
          { text: 'AC maintenance', href: serviceHref('ac-maintenance') },
          { text: 'heating repair', href: serviceHref('heating-repair') },
          { text: 'furnace installation and replacement', href: serviceHref('furnace-installation') },
          { text: 'heat pump services', href: serviceHref('heat-pump-services') },
          { text: 'ductless mini-splits', href: serviceHref('ductless-mini-split') },
          { text: 'ductwork', href: serviceHref('ductwork') },
          { text: 'indoor air quality', href: serviceHref('indoor-air-quality') },
          { text: 'emergency HVAC', href: serviceHref('emergency-hvac') },
        ],
      },
      {
        q: 'Is emergency HVAC service available in Long Beach?',
        a: 'Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in Long Beach. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.',
        links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
      },
      {
        q: 'How much does HVAC service cost in Long Beach?',
        a: 'Cost depends on the problem, the equipment, and how accessible the system is. We do not publish one flat price, so call (323) 776-9047 or request service and we will quote your specific system.',
        links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
      },
      {
        q: 'Does AIRPRO SOLUTIONS handle commercial HVAC in Long Beach?',
        a: 'Yes. AIRPRO SOLUTIONS services commercial properties in Long Beach, including rooftop units, office buildings, and retail spaces. See our Commercial HVAC page for the full scope.',
        links: [{ text: 'Commercial HVAC page', href: '/commercial-hvac/' }],
      },
    ],
    // TODO(copy): client review of every FAQ answer above before launch.
  },
};

// Map-card image for every city, used in nearby-areas rows (and city-page heroes once a city has
// real content). Source files (1300x676) live in public/images/locations/<region-slug>/.
const cardImages: Record<string, ServiceImage> = Object.fromEntries(
  regionCityNames.flatMap((r) =>
    r.cityNames.map((name) => {
      const slug = citySlug(name);
      return [
        slug,
        {
          src: `/images/locations/${r.slug}/air-pro-solutions-hvac-service-area-map-${slug}-ca.webp`,
          alt: `Map showing the ${name}, CA service area`,
        },
      ];
    }),
  ),
);

export const cities: City[] = baseCities.map((c) => {
  const overrides =
    c.slug === 'torrance' ? torranceOverrides
    : c.slug === 'los-angeles' ? losAngelesOverrides
    : c.slug === 'long-beach' ? longBeachOverrides
    : undefined;
  const withOverrides = overrides ? { ...c, ...overrides } : c;
  return cardImages[c.slug] ? { ...withOverrides, cardImage: cardImages[c.slug] } : withOverrides;
});

export const wave1Cities = cities.filter((c) => c.wave === 1);

export const getCity = (slug: string) => cities.find((c) => c.slug === slug);
