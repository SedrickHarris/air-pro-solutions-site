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
  // Official-link list shown on the right-hand card instead of ZIPs (set when no verified ZIP list exists).
  officialResources?: { text: string; href: string; note: string }[];
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
  page?: CityPage; // full template content; torrance, los-angeles, long-beach, pasadena, culver-city, redondo-beach, el-segundo, gardena, irvine, anaheim and costa-mesa have this so far
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
    // Client approved every FAQ answer above on 2026-10-15.
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
    heroCaption: { title: 'Los Angeles, CA', text: 'Local HVAC service across the City of Los Angeles' },
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
      // Client approved the "can walk you through" permit wording on 2026-10-15.
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
      // Client approved the "& Replacement" card names on 2026-10-15.
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
    // Client approved every FAQ answer above on 2026-10-15.
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
    heroCaption: { title: 'Long Beach, CA', text: 'Local HVAC service across Long Beach' },
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
      // Client approved the "can walk you through" permit wording on 2026-10-15.
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
          // TODO(data): PRE-LAUNCH LIVE CHECK. The SCE pages show no update date. Reconfirm the Golden State Rebates coupons (air conditioners, smart thermostats, participating retailers), the $75 demand-response credit (up to four degrees) and Energy Savings Assistance. Wording to verify is listed in docs/open-items.md. Keep this card and the matching FAQ in step.
        },
        {
          amount: 'Noise code',
          description: "Long Beach's Noise Control Program enforces Municipal Code Chapter 8.80 and names air conditioners among equipment that can exceed noise standards.",
          linkLabel: 'Noise Control Program',
          linkHref: 'https://www.longbeach.gov/health/inspections-and-reporting/reporting/noise-monitoring/',
        },
      ],
    },
    // Torrance, Los Angeles and Redondo Beach have live pages. TODO(data): Carson has no city page yet, so its card links to a noindex stub.
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
        // TODO(data): PRE-LAUNCH LIVE CHECK of every SCE program named in this answer (see docs/open-items.md).
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
    // Client approved every FAQ answer above on 2026-10-15.
  },
};

// Pasadena (location page, built from the Long Beach template). Facts come from City of Pasadena pages and NOAA station
// metadata and the USPS Postal Bulletin ZIP list. The electric provider and rebates are not published here,
// and noise-standard adoption is unconfirmed - see docs/open-items.md "/service-areas/pasadena/".
const pasadenaOverrides: Partial<City> = {
  // TODO(data): add verified housing-age and climate detail before treating this as a full local page.
  neighborhoods: [], // named areas (San Rafael Heights, Linda Vista, Victory Rose, Upper Hastings Ranch) appear in the lede
  // ZIPs below are the six Pasadena ZIPs from the research (USPS Postal Bulletin), grouped by area in page.zipGroups.
  zips: ['91101', '91103', '91104', '91105', '91106', '91107'],
  page: {
    metaDescription:
      'Residential and commercial HVAC in Pasadena, from San Rafael Heights to Upper Hastings Ranch. Know the City permit steps and site-plan rules. Schedule service.',
    lede:
      'AIRPRO SOLUTIONS provides HVAC services across Pasadena, including AC repair, heating repair, installation, and maintenance for homes and businesses - from San Rafael Heights and Linda Vista to Victory Rose and Upper Hastings Ranch.',
    heroCaption: { title: 'Pasadena, CA', text: 'Local HVAC service across Pasadena' },
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
      lead: 'AIRPRO SOLUTIONS is a licensed HVAC contractor serving Pasadena',
      body:
        ', providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.',
    },
    glance: {
      title: 'Pasadena at a glance',
      stats: [
        { num: '6', label: 'ZIP codes listed for Pasadena in the USPS Postal Bulletin' },
        { num: '180 days', label: 'a Pasadena building permit is valid from issuance' },
        { num: '1893', label: "year the record begins at NOAA's Pasadena, CA weather station" },
      ],
      source: 'Sources: USPS Postal Bulletin, City of Pasadena Permit Center, and NOAA NCEI.',
    },
    localTitle: 'Pasadena handles HVAC permits through its own Permit Center',
    localParagraphs: [
      'Pasadena runs **its own City Permit Center** at 175 North Garfield Ave. The City lists heating, ventilating and air conditioning work for installing or replacing heating and cooling units among its plan and submittal items, and the Permit Center is a one-stop location for permitting, permit search, case status, and inspection scheduling. Neighboring South Pasadena has its own Building Division and permit process, so **AIRPRO SOLUTIONS plans each job around your address** and walks you through what your project needs.',
      'Filing and timing matter too. The City accepts electronic subtrade permit and plan submissions through its **Citizen Self Service portal**, and some project types must be submitted online. The City states that building permits are valid for 180 days from issuance and that regular inspections keep a permit valid. Its **site-plan requirement can apply to equipment placed outside**, so it helps to know where a new outdoor unit will sit before you apply.',
      "Two more local items are worth knowing. Pasadena's online **Zoning Code** defines zoning districts, land-use classifications, development standards, and environmental performance standards, and the City has documented work on **revised exterior noise standards**, covered in the section that follows. Official links are below.",
    ],
    neighborhoodsHeading: 'Pasadena ZIP codes by area',
    zipsLabel: 'From the USPS Postal Bulletin ZIP-code list',
    zipGroups: [
      { label: 'Downtown Pasadena / Plaza Pasadena area', zips: ['91101'] },
      { label: 'Northwest Pasadena', zips: ['91103'] },
      { label: 'North-central Pasadena / Jackie Robinson Post Office area', zips: ['91104'] },
      { label: 'Southwest Pasadena / Orangewood Post Office area', zips: ['91105'] },
      { label: 'East-central Pasadena / Catalina Post Office area', zips: ['91106'] },
      { label: 'East Pasadena / East Pasadena Post Office area', zips: ['91107'] },
    ],
    localLinks: [
      { text: 'City permit application guide', href: 'https://www.cityofpasadena.net/planning/permit-center/apply-for-permit/' },
      { text: 'City Permit Center and Zoning Code', href: 'https://www.cityofpasadena.net/planning/permit-center/' },
      { text: 'City neighborhood associations', href: 'https://www.cityofpasadena.net/district4/neighborhood-associations/' },
      { text: 'USPS Postal Bulletin ZIP-code list', href: 'https://about.usps.com/postal-bulletin/2023/pb22633/html/info_001.htm' },
    ],
    servicesTitle: 'Everything we handle for Pasadena homes and businesses',
    serviceCards: [
      { slug: 'ac-repair', name: 'AC Repair', body: 'Diagnosis and repair for cooling failures, weak airflow, and unusual noises.' },
      { slug: 'ac-installation', name: 'AC Installation & Replacement', body: 'New system sizing and installation, including the City of Pasadena permit steps that apply to your project.' },
      { slug: 'ac-maintenance', name: 'AC Maintenance', body: 'Seasonal AC tune-ups that catch small issues early.' },
      { slug: 'heating-repair', name: 'Heating Repair', body: 'Furnace and heating system diagnosis and repair.' },
      { slug: 'furnace-installation', name: 'Furnace Installation & Replacement', body: 'New furnace sizing and installation, including the City of Pasadena permit steps that apply to your project.' },
      { slug: 'heat-pump-services', name: 'Heat Pump Services', body: 'Installation, repair, and maintenance for heat pumps.' },
      { slug: 'ductless-mini-split', name: 'Ductless Mini-Split', body: 'Room-by-room comfort control for spaces where ductwork is not an option.' },
      { slug: 'ductwork', name: 'Ductwork Services', body: 'Duct repair, sealing, replacement, and installation.' },
      { slug: 'indoor-air-quality', name: 'Indoor Air Quality', body: 'Air filtration, whole-home purification, and ventilation options.' },
      { slug: 'emergency-hvac', name: 'Emergency HVAC', body: 'Dispatch for no-cool and no-heat emergencies in Pasadena.' },
    ],
    resources: {
      eyebrow: 'Know before you start',
      title: 'Pasadena permits, site plans, and noise standards',
      intro: 'Official sources for three local items worth checking before a Pasadena HVAC project.',
      cards: [
        {
          amount: 'City permit',
          description: 'The City of Pasadena Permit Center, 175 North Garfield Ave., handles HVAC permits and lists installing or replacing heating and cooling units among its plan and submittal items.',
          linkLabel: 'Pasadena permit guide',
          linkHref: 'https://www.cityofpasadena.net/planning/permit-center/apply-for-permit/',
        },
        {
          amount: 'Site plan',
          description: "The City's site-plan requirement can apply to equipment placed outside, and a building permit is valid for 180 days from issuance as long as regular inspections continue.",
          linkLabel: 'Permit application details',
          linkHref: 'https://www.cityofpasadena.net/planning/permit-center/apply-for-permit/',
        },
        {
          amount: 'Noise standards',
          description: 'A City of Pasadena agenda document from October 2024 describes revised exterior noise standards that would vary by land use and time of day. Confirm the current standards with the City before you choose a location.',
          linkLabel: 'City noise standards document',
          linkHref: 'https://ww2.cityofpasadena.net/2024%20Agendas/Oct_28_24/AR%2027.pdf',
        },
      ],
    },
    // TODO(data): Glendale and Burbank are noindex stubs, so their cards render without a link; Los Angeles and Long Beach link.
    nearby: ['los-angeles', 'long-beach', 'glendale', 'burbank'],
    proof: {
      heading: 'Licensed, reviewed, and ready across Pasadena',
      body: 'AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.',
      stats: [
        { num: '4.8★', label: 'Google rating' },
        { num: '40', label: 'Google reviews' },
        { num: 'C-20', label: 'California license class' },
        { num: '24/7', label: 'Emergency dispatch' },
      ],
    },
    finalCtaBody: 'Call or request service online to schedule a visit anywhere in Pasadena. Same-day service is typical.',
    faqs: [
      {
        q: 'Does AIRPRO SOLUTIONS service all of Pasadena?',
        a: 'Yes. AIRPRO SOLUTIONS serves homes and businesses across Pasadena as part of our LA County coverage. Pasadena runs its own Permit Center, separate from the Building Division in neighboring South Pasadena, so we plan each visit around your specific address.',
        links: [{ text: 'LA County coverage', href: '/service-areas/los-angeles-county/' }],
      },
      {
        q: 'How fast can a technician reach my Pasadena home?',
        a: 'Same-day service is typical in Pasadena, subject to capacity. Call (323) 776-9047 to confirm a window for your address.',
        links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
      },
      {
        q: 'Where do I get an HVAC permit in Pasadena?',
        a: 'Through the City of Pasadena Permit Center. The Permit Center is at 175 North Garfield Ave., and the City lists heating, ventilating and air conditioning work for installing or replacing heating and cooling units among its plan and submittal items. The City accepts electronic subtrade permit and plan submissions through its Citizen Self Service portal, and some project types must be submitted online. Ask the Permit Center what your specific project requires. AIRPRO SOLUTIONS can walk you through the steps.',
      },
      {
        q: 'How long is a Pasadena building permit valid?',
        a: 'A Pasadena building permit is valid for 180 days from issuance. According to the City, regular inspections keep the permit valid. Ask the Permit Center how this applies to your project.',
      },
      {
        q: 'Does Pasadena require a site plan for outdoor HVAC equipment?',
        a: "It can. The City's permit guidance says its site-plan requirement can apply to equipment placed outside. Decide where a new outdoor unit will sit before you apply, and ask the Permit Center whether a site plan applies to your project.",
      },
      {
        q: 'What should I know about Pasadena noise standards before installing outdoor equipment?',
        a: 'Check the current City code first. A City of Pasadena agenda document from October 2024 describes revised exterior noise standards that would vary by land use and time of day. The document does not confirm they have been adopted, so confirm the current standards with the City before you decide where outdoor equipment will go.',
      },
      {
        q: 'What HVAC services are available in Pasadena?',
        a: 'AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout Pasadena, for both residential and commercial properties.',
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
        q: 'Is emergency HVAC service available in Pasadena?',
        a: 'Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in Pasadena. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.',
        links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
      },
      {
        q: 'How much does HVAC service cost in Pasadena?',
        a: 'Cost depends on the problem, the equipment, and how accessible the system is. We do not publish one flat price, so call (323) 776-9047 or request service and we will quote your specific system.',
        links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
      },
      {
        q: 'Does AIRPRO SOLUTIONS handle commercial HVAC in Pasadena?',
        a: 'Yes. AIRPRO SOLUTIONS services commercial properties in Pasadena, including rooftop units, office buildings, and retail spaces. See our Commercial HVAC page for the full scope.',
        links: [{ text: 'Commercial HVAC page', href: '/commercial-hvac/' }],
      },
    ],
    // Client approved every FAQ answer above on 2026-10-15.
  },
};

// Culver City (location page, built from the Pasadena template). Facts come from Culver City pages (Building Safety,
// Mechanical Permit Application, City Maps, Parks, Hayden Tract Specific Plan) and the City's Zoning Code and Municipal
// Code on amlegal. The electric and gas providers, rebates, climate, housing figures and ZIP list are not published here -
// see docs/open-items.md "/service-areas/culver-city/".
const culverCityOverrides: Partial<City> = {
  // TODO(data): add verified housing-age, climate and utility detail before treating this as a full local page.
  neighborhoods: [], // named areas (Fox Hills, Hayden Tract) appear in the lede; the right-hand card lists official City links, not ZIPs
  zips: [], // no verified citywide ZIP list: the research ZIPs were Medium confidence and the USPS record links could not be read
  page: {
    metaDescription:
      'Residential and commercial HVAC in Culver City, from Fox Hills to Hayden Tract. Know the City permit steps. Licensed, 4.8-star rated. Schedule service.',
    lede:
      'AIRPRO SOLUTIONS provides HVAC services across Culver City, including AC repair, heating repair, installation, and maintenance for homes and businesses - from Fox Hills to Hayden Tract.',
    heroCaption: { title: 'Culver City, CA', text: 'Local HVAC service across Culver City' },
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
      lead: 'AIRPRO SOLUTIONS is a licensed HVAC contractor serving Culver City',
      body:
        ', providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.',
    },
    glance: {
      title: 'Culver City at a glance',
      stats: [
        { num: '5', label: 'residential zoning districts in the City Zoning Code' },
        { num: 'Mechanical', label: 'permit covers AC, heating units, duct changes, and ventilation' },
        { num: 'Ch. 9.07', label: 'Municipal Code chapter on noise regulations' },
      ],
      source: 'Sources: Culver City Zoning Code, City list of required building permits, and Municipal Code Chapter 9.07.',
    },
    localTitle: 'Culver City handles HVAC permits through its own Building Safety Division',
    localParagraphs: [
      "Culver City runs **its own Building Safety Division** at City Hall, 9770 Culver Blvd. The City's list of items that require a permit from Building Safety includes a Mechanical Permits category covering air conditioning, heating units, duct system extension or relocation, and ventilation systems. Applications go through the **Culver City Permit Portal**: choose the Building tab, then Create an Application, then Mechanical. **AIRPRO SOLUTIONS plans each job around your address** and walks you through what your project needs.",
      "Equipment that sits outside can need extra paperwork. The City's Mechanical permit page lists required documents for any exterior mechanical or utility equipment, when applicable, so it helps to know where a new outdoor unit will go before you apply. Culver City's noise regulations are in **Municipal Code Chapter 9.07**, so ask the City how they apply to outdoor equipment before you choose a spot.",
      'Commercial and mixed-use work looks different in **Hayden Tract**, a former industrial area with an artistic community, located between two Metro E Line stations and near the Ballona Creek Bike Path. The City has published a public review draft of a Hayden Tract Specific Plan, and its Zoning Code separates residential districts (R1, R2, RLD, RMD, and RHD) from mixed-use districts. Official links are in the card beside this text.',
    ],
    neighborhoodsHeading: 'Official Culver City resources',
    officialResources: [
      {
        text: 'Mechanical permit application',
        href: 'https://www.culvercity.gov/Services/Building-Development/11-Mechanical-Permit-Application',
        note: 'How to apply through the Culver City Permit Portal.',
      },
      {
        text: 'Building Safety Division',
        href: 'https://www.culvercity.gov/City-Hall/City-Departments/Planning-Development-Department/Building-Safety',
        note: 'City Hall, 9770 Culver Blvd., 2nd floor, Culver City, CA 90232.',
      },
      {
        text: 'City maps',
        href: 'https://www.culvercity.gov/Explore/City-Maps',
        note: "Includes the City's published neighborhoods map (PDF).",
      },
      {
        text: 'Hayden Tract Specific Plan',
        href: 'https://www.culvercity.gov/City-Hall/City-Departments/Planning-Development-Department/Advance-Planning-Division/B.-Hayden-Tract-Specific-Plan',
        note: "The City's page on the plan and its public review draft.",
      },
    ],
    servicesTitle: 'Everything we handle for Culver City homes and businesses',
    serviceCards: [
      { slug: 'ac-repair', name: 'AC Repair', body: 'Diagnosis and repair for cooling failures, weak airflow, and unusual noises.' },
      { slug: 'ac-installation', name: 'AC Installation & Replacement', body: 'New system sizing and installation, including the Culver City permit steps that apply to your project.' },
      { slug: 'ac-maintenance', name: 'AC Maintenance', body: 'Seasonal AC tune-ups that catch small issues early.' },
      { slug: 'heating-repair', name: 'Heating Repair', body: 'Furnace and heating system diagnosis and repair.' },
      { slug: 'furnace-installation', name: 'Furnace Installation & Replacement', body: 'New furnace sizing and installation, including the Culver City permit steps that apply to your project.' },
      { slug: 'heat-pump-services', name: 'Heat Pump Services', body: 'Installation, repair, and maintenance for heat pumps.' },
      { slug: 'ductless-mini-split', name: 'Ductless Mini-Split', body: 'Room-by-room comfort control for spaces where ductwork is not an option.' },
      { slug: 'ductwork', name: 'Ductwork Services', body: 'Duct repair, sealing, replacement, and installation.' },
      { slug: 'indoor-air-quality', name: 'Indoor Air Quality', body: 'Air filtration, whole-home purification, and ventilation options.' },
      { slug: 'emergency-hvac', name: 'Emergency HVAC', body: 'Dispatch for no-cool and no-heat emergencies in Culver City.' },
    ],
    resources: {
      eyebrow: 'Know before you start',
      title: 'Culver City permits, zoning, and noise rules',
      intro: 'Official sources for three local items worth checking before a Culver City HVAC project.',
      cards: [
        {
          amount: 'Mechanical permit',
          description: 'Culver City requires a Mechanical permit for air conditioning, heating units, duct system extension or relocation, and ventilation systems. Apply through the Culver City Permit Portal.',
          linkLabel: 'Mechanical permit page',
          linkHref: 'https://www.culvercity.gov/Services/Building-Development/11-Mechanical-Permit-Application',
        },
        {
          amount: 'Zoning Code',
          description: "The City's Zoning Code establishes residential districts (R1, R2, RLD, RMD, RHD) and mixed-use districts, and refers to an official Zoning Map.",
          linkLabel: 'Culver City Zoning Code',
          linkHref: 'https://codelibrary.amlegal.com/codes/culvercity/latest/culvercity_ca/0-0-0-17892',
        },
        {
          amount: 'Noise rules',
          description: "Culver City's noise regulations are in Municipal Code Chapter 9.07. Confirm with the City how they apply to outdoor equipment before you choose a location.",
          linkLabel: 'Chapter 9.07',
          linkHref: 'https://codelibrary.amlegal.com/codes/culvercity/latest/culvercity_ca/0-0-0-6230',
        },
      ],
    },
    nearby: ['los-angeles', 'long-beach', 'pasadena', 'torrance'],
    proof: {
      heading: 'Licensed, reviewed, and ready across Culver City',
      body: 'AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.',
      stats: [
        { num: '4.8★', label: 'Google rating' },
        { num: '40', label: 'Google reviews' },
        { num: 'C-20', label: 'California license class' },
        { num: '24/7', label: 'Emergency dispatch' },
      ],
    },
    finalCtaBody: 'Call or request service online to schedule a visit anywhere in Culver City. Same-day service is typical.',
    faqs: [
      {
        q: 'Does AIRPRO SOLUTIONS service all of Culver City?',
        a: 'Yes. AIRPRO SOLUTIONS serves homes and businesses across Culver City as part of our LA County coverage. Culver City has its own Building Safety Division, so we plan each visit around your specific address.',
        links: [{ text: 'LA County coverage', href: '/service-areas/los-angeles-county/' }],
      },
      {
        q: 'How fast can a technician reach my Culver City home?',
        a: 'Same-day service is typical in Culver City, subject to capacity. Call (323) 776-9047 to confirm a window for your address.',
        links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
      },
      {
        q: 'Do I need a permit for HVAC work in Culver City?',
        a: 'Usually, yes. Culver City requires a Mechanical permit for air conditioning, heating units, duct system extension or relocation, and ventilation systems. The City describes its permit list as a partial list, so ask Building Safety what your specific project needs. AIRPRO SOLUTIONS can walk you through the steps.',
      },
      {
        q: 'How do I apply for a Mechanical permit in Culver City?',
        a: "Through the Culver City Permit Portal. Choose the Building tab, then Create an Application, then Mechanical. You can also submit in person at Building Safety, 9770 Culver Blvd., 2nd floor. Check the City's website for current hours before you visit.",
      },
      {
        q: 'Do I need extra documents for outdoor HVAC equipment in Culver City?',
        a: "Possibly. The City's Mechanical permit page lists required documents for any exterior mechanical or utility equipment, when applicable. Decide where a new outdoor unit will sit before you apply, and ask Building Safety which documents apply to your project.",
      },
      {
        q: 'What should I know about Culver City noise rules before installing outdoor equipment?',
        a: "Start with Municipal Code Chapter 9.07. Culver City's noise regulations are in Chapter 9.07 of the Municipal Code. This page does not state a decibel limit for outdoor HVAC equipment, so ask the City how the chapter applies before you decide where a unit will go.",
      },
      {
        q: 'What HVAC services are available in Culver City?',
        a: 'AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout Culver City, for both residential and commercial properties.',
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
        q: 'Is emergency HVAC service available in Culver City?',
        a: 'Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in Culver City. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.',
        links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
      },
      {
        q: 'How much does HVAC service cost in Culver City?',
        a: 'Cost depends on the problem, the equipment, and how accessible the system is. We do not publish one flat price, so call (323) 776-9047 or request service and we will quote your specific system.',
        links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
      },
      {
        q: 'Does AIRPRO SOLUTIONS handle commercial HVAC in Culver City?',
        a: 'Yes. AIRPRO SOLUTIONS services commercial properties in Culver City, including rooftop units, office buildings, and retail spaces. See our Commercial HVAC page for the full scope.',
        links: [{ text: 'Commercial HVAC page', href: '/commercial-hvac/' }],
      },
    ],
    // Client approved every FAQ answer above on 2026-10-15.
  },
};

// Redondo Beach (location page, built from the Culver City template). Facts come only from City of Redondo Beach pages
// (Building & Safety, plan check submittal process, scheduling inspections, interactive zoning map, New Resident Guide),
// the Municipal Code (Title 10 Chapter 5, Coastal Land Use Plan Implementing Ordinance) and SCE program pages. Held out:
// ZIP list, 2022 code adoption, pre-sale building report, CTS portal name/date, climate, housing figures, noise limits -
// see docs/open-items.md "/service-areas/redondo-beach/".
const redondoBeachOverrides: Partial<City> = {
  // TODO(data): add verified housing-age, climate and commercial detail before treating this as a full local page.
  neighborhoods: [], // North Redondo Beach appears in the lede; the right-hand card lists official City links, not ZIPs
  zips: [], // no verified ZIP list: the USPS record links could not be read (the City pages only show 90277 and 90278 on municipal addresses)
  page: {
    metaDescription:
      'HVAC for Redondo Beach homes and businesses, from North Redondo Beach to the Coastal Zone. Know the permit steps. Licensed, 4.8-star rated. Schedule service.',
    // Client approved the "from North Redondo Beach to the Coastal Zone" wording on 2026-10-15.
    lede:
      'AIRPRO SOLUTIONS provides HVAC services across Redondo Beach, including AC repair, heating repair, installation, and maintenance for homes and businesses - from North Redondo Beach to the Coastal Zone.',
    heroCaption: { title: 'Redondo Beach, CA', text: 'Local HVAC service across Redondo Beach' },
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
      lead: 'AIRPRO SOLUTIONS is a licensed HVAC contractor serving Redondo Beach',
      body:
        ', providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.',
    },
    glance: {
      title: 'Redondo Beach at a glance',
      stats: [
        { num: 'Online', label: "all building applications and plans are submitted through the City's Citizen Portal" },
        { num: 'Art. 10', label: 'of the Coastal Zone ordinance covers Coastal Development Permits' },
        { num: '2', label: "utilities listed in the City's New Resident Guide: SCE for electricity, SoCalGas for gas" },
      ],
      source: "Sources: City of Redondo Beach Building & Safety pages, Municipal Code Title 10 Chapter 5, and the City's New Resident Guide.",
    },
    localTitle: 'Redondo Beach permits are submitted online, with Coastal Zone rules for some addresses',
    localParagraphs: [
      "The City of Redondo Beach provides **permitting, planning, and inspection services** through its Community Development Department at 415 Diamond Street. Applications, plans, and related documents must be submitted electronically through the City's **Citizen Portal**, and inspections are scheduled there too. For projects that need plan check, Planning and Zoning reviews the plans first and stamps them as ready to submit to Building & Safety. **AIRPRO SOLUTIONS plans each job around your address** and walks you through what your project needs.",
      "On inspection day, approved plans and the Inspection Card must be onsite. If the approved plans are missing, the inspector issues a Not Ready correction and the visit has to be rescheduled, so keep the approved plans with the job. Part of the city also sits in the **Coastal Zone**. The City's zoning regulations apply to all land in the Coastal Zone, and developments there are subject to Coastal Development Permit requirements under Article 10 of the City's coastal ordinance. This page does not say whether outdoor equipment at a given address is affected, so check with the City before you plan an installation.",
      "City pages refer to **North Redondo Beach** as a local area. To see how a property is zoned, use the City's interactive zoning map; the Planning and Zoning Ordinance governs land use. For power and fuel, the City's New Resident Guide lists **Southern California Edison** for electricity and **SoCalGas** for gas. SCE lists summer demand-response programs with bill credits and TECH Clean California incentives for heat-pump HVAC, subject to equipment eligibility and available funding, so confirm current terms with SCE before you buy. Official links are in the card beside this text.",
    ],
    neighborhoodsHeading: 'Official Redondo Beach resources',
    officialResources: [
      {
        text: 'Building & Safety and the Citizen Portal',
        href: 'https://www.redondo.org/departments/community_development/building_and_safety/index.php',
        note: "Permit applications and plans are submitted electronically through the City's Citizen Portal.",
      },
      {
        text: 'Plan check submittal process',
        href: 'https://redondo.org/departments/community_development/building_and_safety/plan_check_submittal_process_for_residential_and_commercial_projects.php',
        note: 'Planning and Zoning review comes before Building & Safety plan check.',
      },
      {
        text: 'Interactive zoning map',
        href: 'https://www.redondo.org/departments/community_development/planning/property_data_and_maps/index.php',
        note: 'Look up how a property is zoned.',
      },
      {
        text: 'Coastal Zone ordinance',
        href: 'https://ecode360.com/42657615',
        note: 'Coastal Development Permit requirements for land in the Coastal Zone.',
      },
    ],
    servicesTitle: 'Everything we handle for Redondo Beach homes and businesses',
    serviceCards: [
      { slug: 'ac-repair', name: 'AC Repair', body: 'Diagnosis and repair for cooling failures, weak airflow, and unusual noises.' },
      { slug: 'ac-installation', name: 'AC Installation & Replacement', body: 'New system sizing and installation, including the Redondo Beach permit steps that apply to your project.' },
      { slug: 'ac-maintenance', name: 'AC Maintenance', body: 'Seasonal AC tune-ups that catch small issues early.' },
      { slug: 'heating-repair', name: 'Heating Repair', body: 'Furnace and heating system diagnosis and repair.' },
      { slug: 'furnace-installation', name: 'Furnace Installation & Replacement', body: 'New furnace sizing and installation, including the Redondo Beach permit steps that apply to your project.' },
      { slug: 'heat-pump-services', name: 'Heat Pump Services', body: 'Installation, repair, and maintenance for heat pumps.' },
      { slug: 'ductless-mini-split', name: 'Ductless Mini-Split', body: 'Room-by-room comfort control for spaces where ductwork is not an option.' },
      { slug: 'ductwork', name: 'Ductwork Services', body: 'Duct repair, sealing, replacement, and installation.' },
      { slug: 'indoor-air-quality', name: 'Indoor Air Quality', body: 'Air filtration, whole-home purification, and ventilation options.' },
      { slug: 'emergency-hvac', name: 'Emergency HVAC', body: 'Dispatch for no-cool and no-heat emergencies in Redondo Beach.' },
    ],
    resources: {
      eyebrow: 'Know before you start',
      title: 'Redondo Beach permits, Coastal Zone, and SCE programs',
      intro: 'Official sources for three local items worth checking before a Redondo Beach HVAC project.',
      cards: [
        {
          amount: 'Citizen Portal',
          description: "Redondo Beach requires building applications, plans, and related documents to be submitted electronically through the City's Citizen Portal. Inspections are scheduled there too.",
          linkLabel: 'Building & Safety page',
          linkHref: 'https://www.redondo.org/departments/community_development/building_and_safety/index.php',
        },
        {
          amount: 'Coastal Zone',
          description: "The City's zoning regulations apply to all land in the Coastal Zone, and developments there are subject to Coastal Development Permit requirements. Confirm with the City whether your address is affected.",
          linkLabel: 'Coastal Zone ordinance',
          linkHref: 'https://ecode360.com/42657615',
        },
        {
          amount: 'SCE programs',
          description: 'SCE offers summer demand-response programs with bill credits and TECH Clean California incentives for heat-pump HVAC, subject to equipment eligibility and available funding. Confirm current terms with SCE before you buy.',
          linkLabel: 'SCE heat pump programs',
          linkHref: 'https://www.sce.com/factsheet/ConsolidatedHeatPumpPrograms',
        },
      ],
    },
    nearby: ['torrance', 'los-angeles', 'long-beach', 'culver-city'],
    proof: {
      heading: 'Licensed, reviewed, and ready across Redondo Beach',
      body: 'AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.',
      stats: [
        { num: '4.8★', label: 'Google rating' },
        { num: '40', label: 'Google reviews' },
        { num: 'C-20', label: 'California license class' },
        { num: '24/7', label: 'Emergency dispatch' },
      ],
    },
    finalCtaBody: 'Call or request service online to schedule a visit anywhere in Redondo Beach. Same-day service is typical.',
    faqs: [
      {
        q: 'Does AIRPRO SOLUTIONS service all of Redondo Beach?',
        a: 'Yes. AIRPRO SOLUTIONS serves homes and businesses across Redondo Beach as part of our South Bay coverage. Redondo Beach handles permits through its own Community Development Department, so we plan each visit around your specific address.',
        links: [{ text: 'South Bay coverage', href: '/service-areas/south-bay/' }],
      },
      {
        q: 'How fast can a technician reach my Redondo Beach home?',
        a: 'Same-day service is typical in Redondo Beach, subject to capacity. Call (323) 776-9047 to confirm a window for your address.',
        links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
      },
      {
        q: 'Do I need a permit for HVAC work in Redondo Beach?',
        a: 'Check with the City before work starts. Redondo Beach provides permitting, planning, and inspection services through its Community Development Department, and we cannot list one rule for every project. Ask the City what your specific project needs. AIRPRO SOLUTIONS can walk you through the steps.',
      },
      {
        q: 'How do I submit permit paperwork in Redondo Beach?',
        a: "Electronically, through the City's Citizen Portal. The City says all applications, plans, and related documents must be submitted electronically. For projects that need plan check, Planning and Zoning reviews the plans first and stamps them as ready to submit to Building & Safety. For process questions, the City lists a Building Division line at (310) 318-0636.",
        links: [{ text: '(310) 318-0636', href: 'tel:+13103180636' }],
      },
      {
        q: 'What happens at a permit inspection in Redondo Beach?',
        a: "Approved plans and the Inspection Card must be onsite. You request inspections through the City's Citizen Portal. If approved plans are not onsite, the inspector issues a Not Ready correction and the inspection must be rescheduled, so keep the approved plans with the job.",
      },
      {
        q: 'Does the Coastal Zone affect HVAC work in Redondo Beach?',
        a: "Possibly. Redondo Beach's zoning regulations apply to all land in the Coastal Zone, and developments there are subject to Coastal Development Permit requirements. This page does not say whether outdoor HVAC equipment at a specific address needs one, so ask the City, and use its interactive zoning map to see how your property is zoned.",
      },
      {
        q: 'What HVAC services are available in Redondo Beach?',
        a: 'AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout Redondo Beach, for both residential and commercial properties.',
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
        q: 'Is emergency HVAC service available in Redondo Beach?',
        a: 'Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in Redondo Beach. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.',
        links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
      },
      {
        q: 'How much does HVAC service cost in Redondo Beach?',
        a: 'Cost depends on the problem, the equipment, and how accessible the system is. We do not publish one flat price, so call (323) 776-9047 or request service and we will quote your specific system.',
        links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
      },
      {
        q: 'Does AIRPRO SOLUTIONS handle commercial HVAC in Redondo Beach?',
        a: 'Yes. AIRPRO SOLUTIONS services commercial properties in Redondo Beach, including rooftop units, office buildings, and retail spaces. See our Commercial HVAC page for the full scope.',
        links: [{ text: 'Commercial HVAC page', href: '/commercial-hvac/' }],
      },
    ],
    // Client approved every FAQ answer above on 2026-10-15.
  },
};

// El Segundo (location page, built from the Redondo Beach template). Facts come only from City of El Segundo pages
// (Building and Safety Division, Building Codes and Regulations, Planning Division, demographics, economic-development site),
// SCE's and SoCalGas's own service-area documents and their rebate pages. Held out: ZIP card (90245 is not source-verified),
// Chevron figures, specific-plan names and zoning map (unofficial source), noise section and decibels, code year, Census
// tenure and unit counts, climate, neighbor list - see docs/open-items.md "/service-areas/el-segundo/".
const elSegundoOverrides: Partial<City> = {
  // TODO(data): add verified housing-age, climate and commercial detail before treating this as a full local page.
  neighborhoods: [], // no community names are used: the City pages checked did not give a neighborhood list
  zips: [], // no verified ZIP list: 90245 appears only in a CEQA notice and a third-party list, and the USPS pages could not be read
  page: {
    metaDescription:
      'HVAC for El Segundo homes and businesses, from AC repair to installation. Know the local construction hours and permit steps. Licensed, 4.8-star rated.',
    lede:
      'AIRPRO SOLUTIONS provides HVAC services across El Segundo, including AC repair, heating repair, installation, and maintenance for homes and businesses.',
    heroCaption: { title: 'El Segundo, CA', text: 'Local HVAC service across El Segundo' },
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
      lead: 'AIRPRO SOLUTIONS is a licensed HVAC contractor serving El Segundo',
      body:
        ', providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.',
    },
    glance: {
      title: 'El Segundo at a glance',
      stats: [
        { num: '53%', label: 'of households are multi-unit and 46.9% are single-unit (2021 ACS 5-year estimates, per the City)' },
        { num: '7a-6p', label: 'construction hours Monday through Saturday, with no work on Sunday or legal holidays' },
        { num: '2', label: 'utilities serve the city: SCE for electricity and SoCalGas for natural gas' },
      ],
      source: "Sources: City of El Segundo demographics and Building and Safety pages, SCE's service-area filing, and SoCalGas's city list.",
    },
    localTitle: 'El Segundo has more multi-unit than single-unit households, and set construction hours',
    // Client approved the wording and content of this page (local paragraphs included) on 2026-10-15.
    // Code edition: ESMC 13-4-1 (amlegal) adopts the 2025 California Mechanical Code with amendments, Ord. 1680, 12-3-2025 (checked 2026-10-15).
    localParagraphs: [
      "The City of El Segundo handles **plan check, permits, and inspections** through the Building and Safety Division of its Community Development Department. El Segundo's municipal code adopts the **2025 California Mechanical Code with local amendments**, and the City's Building and Safety page does not list HVAC permit requirements, so ask the division what your project needs before work starts. **AIRPRO SOLUTIONS plans each job around your address** and can walk you through the steps.",
      "The City sets construction hours at **Monday through Saturday, 7 a.m. to 6 p.m.**, with no work allowed on Sunday or legal holidays, so keep that window in mind when you schedule an installation. The City's demographics page, citing 2021 American Community Survey 5-year estimates, reports that **53% of households are multi-unit and 46.9% are single-unit**. In a multi-unit building, equipment access and placement can depend on the building, so we confirm those details at the property.",
      "Electricity comes from **Southern California Edison** and natural gas from **SoCalGas**, and each utility's own service-area listing includes El Segundo. Both publish rebate programs, and terms and funding change, so confirm current details with the utility before you buy. For commercial properties, the City's economic-development site names **Los Angeles Air Force Base** and The Aerospace Corporation among the organizations located in El Segundo. Official links are in the card beside this text.",
    ],
    neighborhoodsHeading: 'Official El Segundo resources',
    officialResources: [
      {
        text: 'Building and Safety Division',
        href: 'https://www.elsegundo.gov/government/departments/community-development/building-and-safety-division',
        note: 'Plan check, permits, inspections, and construction hours.',
      },
      {
        text: 'Building codes and regulations',
        href: 'https://www.elsegundo.gov/government/departments/community-development/building-and-safety-division/building-codes-and-regulations',
        note: "Lists the City's building codes and regulations.",
      },
      {
        text: 'Planning Division',
        href: 'https://www.elsegundo.gov/government/departments/community-development/planning-division',
        note: 'Administers the General Plan and the Zoning Code.',
      },
      {
        text: 'City demographics',
        href: 'https://www.elsegundo.gov/our-city/demographics',
        note: 'Housing structure estimates cited by the City.',
      },
    ],
    servicesTitle: 'Everything we handle for El Segundo homes and businesses',
    serviceCards: [
      { slug: 'ac-repair', name: 'AC Repair', body: 'Diagnosis and repair for cooling failures, weak airflow, and unusual noises.' },
      { slug: 'ac-installation', name: 'AC Installation & Replacement', body: 'New system sizing and installation, including the El Segundo permit steps that apply to your project.' },
      { slug: 'ac-maintenance', name: 'AC Maintenance', body: 'Seasonal AC tune-ups that catch small issues early.' },
      { slug: 'heating-repair', name: 'Heating Repair', body: 'Furnace and heating system diagnosis and repair.' },
      { slug: 'furnace-installation', name: 'Furnace Installation & Replacement', body: 'New furnace sizing and installation, including the El Segundo permit steps that apply to your project.' },
      { slug: 'heat-pump-services', name: 'Heat Pump Services', body: 'Installation, repair, and maintenance for heat pumps.' },
      { slug: 'ductless-mini-split', name: 'Ductless Mini-Split', body: 'Room-by-room comfort control for spaces where ductwork is not an option.' },
      { slug: 'ductwork', name: 'Ductwork Services', body: 'Duct repair, sealing, replacement, and installation.' },
      { slug: 'indoor-air-quality', name: 'Indoor Air Quality', body: 'Air filtration, whole-home purification, and ventilation options.' },
      // Client approved the emergency card wording on 2026-10-15.
      { slug: 'emergency-hvac', name: 'Emergency HVAC', body: 'Dispatch for no-cool and no-heat emergencies in El Segundo.' },
    ],
    resources: {
      eyebrow: 'Know before you start',
      title: 'El Segundo construction hours, code amendments, and utility rebates',
      intro: 'Official sources for three local items worth checking before an El Segundo HVAC project.',
      cards: [
        {
          amount: 'Mon-Sat 7a-6p',
          description: 'El Segundo lists construction hours of Monday through Saturday, 7 a.m. to 6 p.m., with no work allowed on Sunday or legal holidays.',
          linkLabel: 'Building and Safety page',
          linkHref: 'https://www.elsegundo.gov/government/departments/community-development/building-and-safety-division',
        },
        {
          amount: 'Code amendments',
          description: "El Segundo's municipal code adopts the 2025 California Mechanical Code with local amendments. Ask the Building and Safety Division which requirements apply to your project.",
          linkLabel: 'Building codes and regulations',
          linkHref: 'https://www.elsegundo.gov/government/departments/community-development/building-and-safety-division/building-codes-and-regulations',
        },
        {
          amount: 'Utility rebates',
          description: 'SCE and SoCalGas both publish rebate programs for qualifying equipment. Terms, eligibility, and funding change, so confirm current details before you buy.',
          linkLabel: 'SCE rebates',
          linkHref: 'https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace',
        },
      ],
    },
    // Nearby row: only cities with real pages. The research has no neighbor list, so adjacency is not claimed.
    nearby: ['redondo-beach', 'torrance', 'los-angeles', 'culver-city'],
    proof: {
      heading: 'Licensed, reviewed, and ready across El Segundo',
      body: 'AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.',
      stats: [
        { num: '4.8★', label: 'Google rating' },
        { num: '40', label: 'Google reviews' },
        { num: 'C-20', label: 'California license class' },
        { num: '24/7', label: 'Emergency dispatch' },
      ],
    },
    finalCtaBody: 'Call or request service online to schedule a visit anywhere in El Segundo. Same-day service is typical.',
    faqs: [
      {
        q: 'Does AIRPRO SOLUTIONS service all of El Segundo?',
        a: 'Yes. AIRPRO SOLUTIONS serves homes and businesses across El Segundo as part of our South Bay coverage. El Segundo handles permits through its own Community Development Department, so we plan each visit around your specific address.',
        links: [{ text: 'South Bay coverage', href: '/service-areas/south-bay/' }],
      },
      {
        q: 'How fast can a technician reach my El Segundo home?',
        a: 'Same-day service is typical in El Segundo, subject to capacity. Call (323) 776-9047 to confirm a window for your address.',
        links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
      },
      {
        q: 'Do I need a permit for HVAC work in El Segundo?',
        a: 'Check with the City before work starts. El Segundo handles plan check, permits, and inspections through its Building and Safety Division. Its municipal code adopts the 2025 California Mechanical Code with local amendments, and its Building and Safety page does not list HVAC permit requirements, so ask the City what your specific project needs. AIRPRO SOLUTIONS can walk you through the steps.',
      },
      {
        q: 'What hours can HVAC work happen in El Segundo?',
        a: "Monday through Saturday, 7 a.m. to 6 p.m. The City's Building and Safety page lists those construction hours and says no work is allowed on Sunday or legal holidays. Confirm with the City whether the hours apply to your specific job.",
        boldLead: 'Monday through Saturday, 7 a.m. to 6 p.m.',
      },
      {
        q: 'Do you work in condos and apartment buildings in El Segundo?',
        a: "Yes. The City's demographics page, citing 2021 American Community Survey 5-year estimates, reports that 53% of El Segundo households are multi-unit and 46.9% are single-unit. AIRPRO SOLUTIONS services condos, townhomes, and apartments as well as single-family homes, and in a multi-unit building we confirm equipment access and placement at the property. See our Residential HVAC page.",
        links: [{ text: 'Residential HVAC page', href: '/residential-hvac/' }],
      },
      {
        q: 'Which utilities serve El Segundo, and are there HVAC rebates?',
        a: "Southern California Edison provides electricity and SoCalGas provides natural gas. Each utility's own service-area listing includes El Segundo. Both publish rebate programs for qualifying equipment, and terms and funding change, so confirm current details on the SCE rebates page and the SoCalGas rebates page before you buy.",
        links: [
          { text: 'SCE rebates page', href: 'https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace' },
          { text: 'SoCalGas rebates page', href: 'https://www.socalgas.com/savings/rebates-and-incentives' },
        ],
      },
      {
        q: 'What HVAC services are available in El Segundo?',
        a: 'AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout El Segundo, for both residential and commercial properties.',
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
        q: 'Is emergency HVAC service available in El Segundo?',
        a: 'Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in El Segundo. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.',
        links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
      },
      {
        q: 'How much does HVAC service cost in El Segundo?',
        a: 'Cost depends on the problem, the equipment, and how accessible the system is. We do not publish one flat price, so call (323) 776-9047 or request service and we will quote your specific system.',
        links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
      },
      {
        q: 'Does AIRPRO SOLUTIONS handle commercial HVAC in El Segundo?',
        a: "Yes. AIRPRO SOLUTIONS services commercial properties in El Segundo, including rooftop units, office buildings, and retail spaces. The City's economic-development site names Los Angeles Air Force Base and The Aerospace Corporation among the organizations located in El Segundo. See our Commercial HVAC page for the full scope.",
        links: [{ text: 'Commercial HVAC page', href: '/commercial-hvac/' }],
      },
    ],
    // Client confirmed every FAQ answer above on 2026-10-15, and approved the full page wording and content the same day.
  },
};

// Gardena (location page, built from the El Segundo template). Facts come only from City of Gardena pages (utility providers page,
// Building & Safety "Schedule An Appointment" page dated 2026-08-05), SCE's and SoCalGas's own service-area documents and rebate pages,
// and SCAG's 2019 Gardena local profile (California Department of Finance E-5 2018 housing counts; ACS 2017 building age).
// Held out: ZIP card (the research's 90247/90248/90249 list rests on an undated, unsourced PDF and its USPS link shows no Gardena data),
// neighborhoods, climate, noise, municipal code edition, commercial and industrial detail, neighbor adjacency, the 1950-59 and 1960-69
// decade shares (not readable from the SCAG chart), the Census profile figure of 21,837 units - see docs/open-items.md "/service-areas/gardena/".
const gardenaOverrides: Partial<City> = {
  // TODO(data): add verified climate, commercial and neighborhood detail before treating this as a full local page.
  neighborhoods: [], // the research found no official neighborhood list
  zips: [], // no USPS or City listing confirms a ZIP list (90247 is only the City Hall address ZIP)
  page: {
    metaDescription:
      "HVAC for Gardena homes and businesses, from AC repair to installation. Know the local over-the-counter permit path and your utilities. Licensed, 4.8-star rated.",
    lede:
      "AIRPRO SOLUTIONS provides HVAC services across Gardena, including AC repair, heating repair, installation, and maintenance for homes and businesses.",
    heroCaption: { title: 'Gardena, CA', text: 'Local HVAC service across Gardena' },
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
      lead: 'AIRPRO SOLUTIONS is a licensed HVAC contractor serving Gardena',
      body:
        ', providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.',
    },
    glance: {
      title: 'Gardena at a glance',
      stats: [
        { num: '52%', label: 'of housing units are single-family and 42.3% are multifamily (California Department of Finance, 2018, per SCAG)' },
        { num: '68%', label: 'of housing was built before 1970 (2017 American Community Survey, per SCAG)' },
        { num: '2', label: 'utilities serve the city: SCE for electricity and SoCalGas for natural gas' },
      ],
      source: "Sources: SCAG's 2019 Gardena local profile, the City of Gardena utility providers page, SCE's service-area filing, and SoCalGas's city list.",
    },
    localTitle: "Gardena's older housing, multifamily mix, and permit path",
    // TODO(copy): client has not approved any Gardena wording yet (local paragraphs, every FAQ answer, emergency card, SCE program wording, commercial FAQ).
    // Code edition intentionally not stated: Gardena Municipal Code 15.06.010 adopts the 2022 California Building Code, and the ordinance table lists
    // Ord. 1888 (2026-03-10) as amending the Mechanical and Energy Codes with no edition or text. Confirm before stating any year.
    localParagraphs: [
      "Gardena's Building & Safety Division lists a **New HVAC Permit and a Forced Air Unit Permit** among its over-the-counter permits. The New HVAC Permit lists a CF1R form, and the City says permits will not be processed without the completed CF1R forms. The division accepts walk-in counter visits and appointments and asks you to bring all documents completed. **AIRPRO SOLUTIONS plans each job around your address** and can walk you through the steps.",
      "The housing is older and mixed. SCAG's 2019 local profile, using California Department of Finance data for 2018, counts about **52% of units as single-family and 42.3% as multifamily**, with 30.6% in buildings of five or more units and 5.7% as mobile homes. The same profile, citing the 2017 American Community Survey, reports that **68% of housing was built before 1970**. These figures are dated, so we confirm the equipment, access, and ductwork at the property before recommending repair or replacement.",
      "Electricity comes from **Southern California Edison** and natural gas from **SoCalGas**. The City's utility page lists both, and each utility's own service-area list includes Gardena. Both publish rebate programs, and SCE lists an Energy Savings Assistance program for income-qualified households that includes central AC and central heat pump replacement among its upgrades. SCE says some options may not be available in all areas, and terms and funding change, so confirm current details with the utility before you buy. Official links are in the card beside this text.",
    ],
    neighborhoodsHeading: 'Official Gardena resources',
    officialResources: [
      {
        text: 'Building & Safety: over-the-counter permits',
        href: "https://cityofgardena.org/schedule-an-appointment/",
        note: 'Lists the New HVAC and Forced Air Unit permits and the CF1R requirement.',
      },
      {
        text: 'City utility providers',
        href: "https://cityofgardena.org/utility-providers/",
        note: 'Lists SCE for electricity and SoCalGas for natural gas, with rebate links.',
      },
      {
        text: 'SCE rebates and incentives',
        href: "https://www.sce.com/residential/rebates-savings/rebates",
        note: "Linked from the City's utility page.",
      },
      {
        text: 'SoCalGas rebates and incentives',
        href: "https://www.socalgas.com/savings/rebates-and-incentives",
        note: "Linked from the City's utility page.",
      },
      {
        text: 'SCAG Gardena local profile',
        href: "https://www.scag.ca.gov/sites/default/files/2024-05/gardena_localprofile.pdf",
        note: 'Housing counts and building age cited on this page.',
      },
    ],
    servicesTitle: 'Everything we handle for Gardena homes and businesses',
    serviceCards: [
      { slug: "ac-repair", name: "AC Repair", body: "Diagnosis and repair for cooling failures, weak airflow, and unusual noises." },
      { slug: "ac-installation", name: "AC Installation & Replacement", body: "New system sizing and installation, including the Gardena permit steps that apply to your project." },
      { slug: "ac-maintenance", name: "AC Maintenance", body: "Seasonal AC tune-ups that catch small issues early." },
      { slug: "heating-repair", name: "Heating Repair", body: "Furnace and heating system diagnosis and repair." },
      { slug: "furnace-installation", name: "Furnace Installation & Replacement", body: "New furnace sizing and installation, including the Gardena permit steps that apply to your project." },
      { slug: "heat-pump-services", name: "Heat Pump Services", body: "Installation, repair, and maintenance for heat pumps." },
      { slug: "ductless-mini-split", name: "Ductless Mini-Split", body: "Room-by-room comfort control for spaces where ductwork is not an option." },
      { slug: "ductwork", name: "Ductwork Services", body: "Duct repair, sealing, replacement, and installation." },
      { slug: "indoor-air-quality", name: "Indoor Air Quality", body: "Air filtration, whole-home purification, and ventilation options." },
      // TODO(copy): emergency card wording not yet client-approved for Gardena.
      { slug: "emergency-hvac", name: "Emergency HVAC", body: "Dispatch for no-cool and no-heat emergencies in Gardena." },
    ],
    resources: {
      eyebrow: 'Know before you start',
      title: 'Gardena permits, appointments, and utility rebates',
      intro: 'Official sources for three local items worth checking before a Gardena HVAC project.',
      cards: [
        {
          amount: 'Over-the-counter',
          description: 'Gardena lists the New HVAC Permit and the Forced Air Unit Permit among its over-the-counter permits. The New HVAC Permit lists a CF1R form.',
          linkLabel: 'Building & Safety page',
          linkHref: "https://cityofgardena.org/schedule-an-appointment/",
        },
        {
          amount: 'Appointments',
          description: 'The division accepts walk-in counter visits and appointments, and asks you to bring all documents completed. A permit that is not on its over-the-counter list cannot be submitted in person.',
          linkLabel: 'Schedule an appointment',
          linkHref: "https://cityofgardena.org/schedule-an-appointment/",
        },
        {
          // TODO(copy): rebate wording not yet client-approved. No dollar amounts on purpose.
          amount: 'Utility rebates',
          description: "SCE and SoCalGas both publish rebate programs, and the City's utility page links to both. Terms, eligibility, and funding change, so confirm current details before you buy.",
          linkLabel: 'SCE rebates',
          linkHref: "https://www.sce.com/residential/rebates-savings/rebates",
        },
      ],
    },
    // Nearby row: only cities with real pages. The research has no neighbor list, so adjacency is not claimed.
    nearby: ['torrance', 'redondo-beach', 'el-segundo', 'los-angeles'],
    proof: {
      heading: 'Licensed, reviewed, and ready across Gardena',
      body: 'AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.',
      stats: [
        { num: '4.8★', label: 'Google rating' },
        { num: '40', label: 'Google reviews' },
        { num: 'C-20', label: 'California license class' },
        { num: '24/7', label: 'Emergency dispatch' },
      ],
    },
    finalCtaBody: 'Call or request service online to schedule a visit anywhere in Gardena. Same-day service is typical.',
    // TODO(copy): client has not confirmed any FAQ answer below. The over-the-counter permit FAQ, the SCE Energy Savings Assistance FAQ and the
    // commercial FAQ are new for Gardena (not in the El Segundo set).
    faqs: [
      {
        q: "Does AIRPRO SOLUTIONS service all of Gardena?",
        a: "Yes. AIRPRO SOLUTIONS serves homes and businesses across Gardena as part of our South Bay coverage. Gardena handles permits through its own Building & Safety Division, so we plan each visit around your specific address.",
        links: [
          { text: "South Bay coverage", href: "/service-areas/south-bay/" },
        ],
      },
      {
        q: "How fast can a technician reach my Gardena home?",
        a: "Same-day service is typical in Gardena, subject to capacity. Call (323) 776-9047 to confirm a window for your address.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Do I need a permit for HVAC work in Gardena?",
        a: "Check with the City before work starts. Gardena's Building & Safety Division lists a New HVAC Permit and a Forced Air Unit Permit among its over-the-counter permits, and the New HVAC Permit lists a CF1R form. The City says permits will not be processed without the completed CF1R forms, so ask the City what your specific project needs. AIRPRO SOLUTIONS can walk you through the steps.",
      },
      {
        q: "Can I get an HVAC permit at the counter in Gardena?",
        a: "Yes, for the permit types the City lists. Gardena's Building & Safety Division accepts walk-in counter visits and appointments for over-the-counter permits, and it asks you to bring all documents completed before you arrive. If a permit is not on the City's over-the-counter list, it cannot be submitted in person. AIRPRO SOLUTIONS can walk you through the steps.",
      },
      {
        q: "Do you work in condos and apartment buildings in Gardena?",
        a: "Yes. SCAG's 2019 profile of Gardena, using California Department of Finance data for 2018, counts about 52% of housing units as single-family, 42.3% as multifamily, and 5.7% as mobile homes. AIRPRO SOLUTIONS services condos, townhomes, and apartments as well as single-family homes, and in a multi-unit building we confirm equipment access and placement at the property. See our Residential HVAC page.",
        links: [
          { text: "Residential HVAC page", href: "/residential-hvac/" },
        ],
      },
      {
        q: "Does the age of Gardena homes matter for HVAC work?",
        a: "We confirm building age and construction on site. SCAG's 2019 profile, citing the 2017 American Community Survey, reports that 68% of Gardena's housing was built before 1970. Equipment, attic access, and original ductwork are property-specific, so we check them at a site visit before recommending repair or replacement.",
      },
      {
        q: "Which utilities serve Gardena, and are there HVAC rebates?",
        a: "Southern California Edison provides electricity and SoCalGas provides natural gas. The City's utility page lists both, and each utility's own service-area list includes Gardena. Both publish rebate programs for qualifying equipment, and the City links to both. Terms and funding change, so confirm current details on the SCE rebates page and the SoCalGas rebates page before you buy.",
        links: [
          { text: "SCE rebates page", href: "https://www.sce.com/residential/rebates-savings/rebates" },
          { text: "SoCalGas rebates page", href: "https://www.socalgas.com/savings/rebates-and-incentives" },
        ],
      },
      {
        q: "Does SCE have an income-qualified HVAC program for Gardena households?",
        a: "SCE lists one. Its Energy Savings Assistance program lists central AC and central heat pump replacement among the upgrades for income-qualified households with an active SCE residential account. SCE also says some options may not be available in all areas, and eligibility and income limits change, so check SCE's page before you plan around it.",
        links: [
          { text: "Energy Savings Assistance program", href: "https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program" },
        ],
      },
      {
        q: "What HVAC services are available in Gardena?",
        a: "AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout Gardena, for both residential and commercial properties.",
        boldLead: "AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC",
        links: [
          { text: "AC repair", href: serviceHref("ac-repair") },
          { text: "AC installation and replacement", href: serviceHref("ac-installation") },
          { text: "AC maintenance", href: serviceHref("ac-maintenance") },
          { text: "heating repair", href: serviceHref("heating-repair") },
          { text: "furnace installation and replacement", href: serviceHref("furnace-installation") },
          { text: "heat pump services", href: serviceHref("heat-pump-services") },
          { text: "ductless mini-splits", href: serviceHref("ductless-mini-split") },
          { text: "ductwork", href: serviceHref("ductwork") },
          { text: "indoor air quality", href: serviceHref("indoor-air-quality") },
          { text: "emergency HVAC", href: serviceHref("emergency-hvac") },
        ],
      },
      {
        q: "Is emergency HVAC service available in Gardena?",
        a: "Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in Gardena. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "How much does HVAC service cost in Gardena?",
        a: "Cost depends on the problem, the equipment, and how accessible the system is. We do not publish one flat price, so call (323) 776-9047 or request service and we will quote your specific system.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Does AIRPRO SOLUTIONS handle commercial HVAC in Gardena?",
        a: "Yes. AIRPRO SOLUTIONS services commercial properties in Gardena, including rooftop units, office buildings, and retail spaces. See our Commercial HVAC page for the full scope.",
        links: [
          { text: "Commercial HVAC page", href: "/commercial-hvac/" },
        ],
      },
    ],
  },
};

const irvineOverrides: Partial<City> = {
  // TODO(data): add verified climate and neighborhood detail before treating this as a full local page.
  neighborhoods: [], // no official neighborhood list was verified
  zips: [], // no USPS or City listing was verified for the research's ZIP list, so the ZIP card is held out
  page: {
    metaDescription:
      "HVAC for Irvine homes and businesses, from AC repair to installation. Know the online replacement permit path and your utilities. Licensed, 4.8-star rated.",
    lede:
      "AIRPRO SOLUTIONS provides HVAC services across Irvine, including AC repair, heating repair, installation, and maintenance for homes and businesses.",
    heroCaption: { title: 'Irvine, CA', text: 'Local HVAC service across Irvine' },
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
      lead: 'AIRPRO SOLUTIONS is a licensed HVAC contractor serving Irvine',
      body:
        ', providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.',
    },
    glance: {
      title: 'Irvine at a glance',
      stats: [
        { num: '43.6%', label: 'of housing units are in multifamily buildings, and 38.9% are single-family detached (California Department of Finance, 2018, per SCAG)' },
        { num: '4.8%', label: 'of housing was built before 1970 (2017 American Community Survey, per SCAG)' },
        { num: '2', label: 'utilities named by the City: SCE for electricity and SoCalGas for natural gas' },
      ],
      source: "Sources: SCAG's 2019 Irvine local profile and the City of Irvine local utility companies page.",
    },
    localTitle: "Irvine's online permit path, HOA approvals, and equipment rules",
    // TODO(copy): client has not approved any Irvine wording yet (local paragraphs, every FAQ answer, emergency card, PermitsDIRECT sentence,
    // code-adoption sentence, SCE program wording, commercial FAQ). Keep flagged until the user says the client approved.
    // TODO(copy): confirm with the City which portal handles the residential replacement permit after 2026-09-14 (PermitsDIRECT! vs the self-service page).
    // Code edition: Irvine Municipal Code Sec. 5-9-101 (Ord. 25-26, 11-12-25) adopts the 2025 California Mechanical Code subject to Division 9 modifications.
    // The Chapter 4 mechanical amendments were not read, so the page states the edition and "local modifications" and nothing about their content.
    // Municode (Supp. 20, codified through Ord. 26-05) says it may not reflect the most current legislation.
    // Pre-launch recheck: SCE and SoCalGas program pages, Municode, the SCAG profile URL, and the City utility, rebate and permit pages.
    // OCPA intentionally left off the page.
    localParagraphs: [
      "Irvine offers an **online self-service permit for residential air conditioner and furnace replacements**. The City says the new condensing unit must be in the same location as the existing unit and at least 2 feet from any property line, and that you must obtain approval from your Homeowner's Association, if applicable, before the work. Since September 14, 2026, the City has directed new online no-plan-check applications to its PermitsDIRECT! portal, powered by Symbium, so confirm which route your project uses. **AIRPRO SOLUTIONS plans each job around your address** and can walk you through the steps.",
      "Irvine's housing leans newer and mixed. SCAG's 2019 local profile, using California Department of Finance data for 2018, counts **102,474 housing units: 38.9% single-family detached, 16.4% attached, 6.2% in buildings of 2 to 4 units, and 37.4% in buildings of 5 or more**. The same profile, citing the 2017 American Community Survey, reports that **only 4.8% of housing was built before 1970**. These figures are dated, so we confirm the equipment, access, and ductwork at the property. The City publishes an HOA map and notes that not every single-family neighborhood has an association, so we check whether one applies before choosing equipment or placement.",
      "For outdoor equipment, the City says **rooftop and ground-mounted mechanical equipment must be screened**, citing Section 3-20-1.B of its zoning ordinance. Irvine Municipal Code Sec. 6-8-205 limits noise from air conditioning, refrigeration, or heating equipment to the higher of the land-use noise standard in Sec. 6-8-204 or five decibels above the ambient noise level, and the City's code adopts the 2025 California Mechanical Code with local modifications. The City's online code notes it may not reflect the most current legislation, so confirm current rules with the City. For commercial buildings, the City has an **automated permit path for like-for-like rooftop packaged heat-pump change-outs of 20 tons or less**, with weight, roof-slope, and curb conditions, and plans prepared by the licensed mechanical contractor doing the work or the Mechanical Engineer of Record.",
      "Electricity comes from **Southern California Edison** and natural gas from **SoCalGas**, as named on the City's utility page. The City's residential rebates page links to SCE and SoCalGas programs, and SCE lists an Energy Savings Assistance program for income-qualified households that includes central AC and central heat pump replacement among its upgrades. SCE says some options may not be available in all areas, and terms and funding change, so confirm current details with the utility before you buy. Official links are in the card beside this text.",
    ],
    neighborhoodsHeading: 'Official Irvine resources',
    officialResources: [
      {
        text: "Self-service permits",
        href: "https://cityofirvine.gov/community-development/self-service-permits",
        note: "Lists the online residential air conditioner and furnace replacement permit and its location condition.",
      },
      {
        text: "HVAC change-out (commercial rooftop)",
        href: "https://www.cityofirvine.gov/building-permits-and-inspections/hvac-change-out",
        note: "Automated permit path, screening rule, and plan requirements.",
      },
      {
        text: "Homeowners associations",
        href: "https://cityofirvine.gov/community-development/irvine-homeowners-associations",
        note: "HOA map and notes on neighborhoods without an association.",
      },
      {
        text: "City utility companies",
        href: "https://cityofirvine.gov/node/13136",
        note: "Names SCE for electricity and SoCalGas for natural gas.",
      },
      {
        text: "City residential rebates page",
        href: "https://cityofirvine.gov/sustainability-division/rebates-residents",
        note: "Links to SCE and SoCalGas programs.",
      },
      {
        text: "Irvine Municipal Code (Municode)",
        href: "https://library.municode.com/ca/irvine/codes/code_of_ordinances",
        note: "Sec. 6-8-205 equipment noise and Sec. 5-9-101 code adoption.",
      },
      {
        text: "SCAG Irvine local profile",
        href: "https://www.scag.ca.gov/sites/default/files/2024-05/irvine_localprofile.pdf",
        note: "Housing counts and building age cited on this page.",
      },
    ],
    servicesTitle: 'Everything we handle for Irvine homes and businesses',
    serviceCards: [
      { slug: "ac-repair", name: "AC Repair", body: "Diagnosis and repair for cooling failures, weak airflow, and unusual noises, with Irvine's equipment noise limit in mind for outdoor units." },
      { slug: "ac-installation", name: "AC Installation & Replacement", body: "New system sizing and installation, including Irvine's replacement permit and its condensing-unit placement condition." },
      { slug: "ac-maintenance", name: "AC Maintenance", body: "Seasonal AC tune-ups that catch small issues early." },
      { slug: "heating-repair", name: "Heating Repair", body: "Furnace and heating system diagnosis and repair." },
      { slug: "furnace-installation", name: "Furnace Installation & Replacement", body: "New furnace sizing and installation, including Irvine's furnace replacement permit, which lists a same-location condition." },
      { slug: "heat-pump-services", name: "Heat Pump Services", body: "Installation, repair, and maintenance for heat pumps, including like-for-like rooftop units on commercial buildings." },
      { slug: "ductless-mini-split", name: "Ductless Mini-Split", body: "Room-by-room comfort control for spaces where ductwork is not an option." },
      { slug: "ductwork", name: "Ductwork Services", body: "Duct repair, sealing, replacement, and installation." },
      { slug: "indoor-air-quality", name: "Indoor Air Quality", body: "Air filtration, whole-home purification, and ventilation options." },
      // TODO(copy): emergency card wording not yet client-approved for Irvine.
      { slug: "emergency-hvac", name: "Emergency HVAC", body: "Dispatch for no-cool and no-heat emergencies in Irvine." },
    ],
    resources: {
      eyebrow: 'Know before you start',
      title: 'Irvine permits, HOA approval, and utility rebates',
      intro: 'Official sources for three local items worth checking before an Irvine HVAC project.',
      cards: [
        {
          amount: "Online permit",
          description: "Irvine offers an online self-service permit for residential air conditioner and furnace replacements. The condensing unit must stay in its existing location and at least 2 feet from any property line.",
          linkLabel: "Self-service permits page",
          linkHref: "https://cityofirvine.gov/community-development/self-service-permits",
        },
        {
          amount: "HOA approval",
          description: "The City says you must obtain approval from your Homeowner's Association, if applicable, before doing the work. It publishes an HOA map and notes that not all single-family neighborhoods have an HOA.",
          linkLabel: "HOA page",
          linkHref: "https://cityofirvine.gov/community-development/irvine-homeowners-associations",
        },
        // TODO(copy): rebate wording not yet client-approved. No dollar amounts on purpose.
        {
          amount: "Utility rebates",
          description: "SCE and SoCalGas both publish rebate programs, and the City's rebates page links to both. Terms, eligibility, and funding change, so confirm current details before you buy.",
          linkLabel: "City rebates page",
          linkHref: "https://cityofirvine.gov/sustainability-division/rebates-residents",
        },
      ],
    },
    // Nearby row held out: no Orange County city page is live yet and the research has no neighbor list, so adjacency is not claimed.
    // The city page skips the section when this is empty. Add Orange County cities here as their pages go live.
    nearby: [],
    proof: {
      heading: 'Licensed, reviewed, and ready across Irvine',
      body: 'AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.',
      stats: [
        { num: '4.8★', label: 'Google rating' },
        { num: '40', label: 'Google reviews' },
        { num: 'C-20', label: 'California license class' },
        { num: '24/7', label: 'Emergency dispatch' },
      ],
    },
    finalCtaBody: 'Call or request service online to schedule a visit anywhere in Irvine. Same-day service is typical.',
    // TODO(copy): client has not confirmed any FAQ answer below.
    faqs: [
      {
        q: "Does AIRPRO SOLUTIONS service all of Irvine?",
        a: "Yes. AIRPRO SOLUTIONS serves homes and businesses across Irvine as part of our Orange County coverage. Irvine runs its own permit process, so we plan each visit around your specific address.",
        links: [
          { text: "Orange County coverage", href: "/service-areas/orange-county/" },
        ],
      },
      {
        q: "How fast can a technician reach my Irvine home?",
        a: "Same-day service is typical in Irvine, subject to capacity. Call (323) 776-9047 to confirm a window for your address.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Do I need a permit to replace an AC or furnace in Irvine?",
        a: "Check with the City before work starts. Irvine offers an online self-service permit for residential air conditioner and furnace replacements. The City says the new condensing unit must be in the same location as the existing unit and at least 2 feet from any property line. The City also lists limited cases where a mechanical permit is not required, such as portable equipment, and says separate permits can still apply. AIRPRO SOLUTIONS can walk you through the steps.",
      },
      {
        q: "Where do I apply for an Irvine HVAC permit online?",
        a: "Confirm the route with the City. Starting September 14, 2026, the City's older permits site no longer accepts online no-plan-check applications, and it directs new online permit applications to PermitsDIRECT!, powered by Symbium. The older site stays available for plan check inquiries, permit inquiries, and inspection requests. Ask the City which route your project uses. AIRPRO SOLUTIONS can walk you through the steps.",
      },
      {
        q: "Do I need homeowners association approval for HVAC work in Irvine?",
        a: "If an association applies, yes. The City's permit page says you must obtain approval from your Homeowner's Association, if applicable, before doing the work. The City publishes an HOA map and guidance and notes that not all single-family neighborhoods have an HOA, including portions of Lower Peters Canyon, Northwood, and El Camino Real, though some may still have deed restrictions. We check whether an association applies to your address before we choose equipment or placement.",
        links: [
          { text: "HOA map and guidance", href: "https://cityofirvine.gov/community-development/irvine-homeowners-associations" },
        ],
      },
      {
        q: "Does Irvine have rules for where AC equipment goes and how loud it can be?",
        a: "Yes. The City says rooftop and ground-mounted mechanical equipment must be screened, citing Section 3-20-1.B of its zoning ordinance. Irvine Municipal Code Sec. 6-8-205 says noise from air conditioning, refrigeration, or heating equipment may not exceed the higher of the land-use noise standard in Sec. 6-8-204 or five decibels above the ambient noise level. The City's code adopts the 2025 California Mechanical Code with local modifications. The City's online code notes it may not reflect the most current legislation, so we confirm current rules with the City for your project.",
      },
      {
        q: "Do you work in condos and apartment buildings in Irvine?",
        a: "Yes. SCAG's 2019 profile of Irvine, using California Department of Finance data for 2018, counts 102,474 housing units, with 38.9% single-family detached, 16.4% single-family attached, 6.2% in buildings of 2 to 4 units, and 37.4% in buildings of 5 or more units. AIRPRO SOLUTIONS services condos, townhomes, and apartments as well as single-family homes, and in a multi-unit building we confirm equipment access and placement at the property. See our Residential HVAC page.",
        links: [
          { text: "Residential HVAC page", href: "/residential-hvac/" },
        ],
      },
      {
        q: "Does the age of Irvine homes matter for HVAC work?",
        a: "We confirm building age and construction on site. SCAG's 2019 profile, citing the 2017 American Community Survey, reports that 4.8% of Irvine's housing stock was built before 1970. Equipment, attic access, and ductwork are still property-specific, so we check them at a site visit before recommending repair or replacement.",
      },
      {
        q: "Which utilities serve Irvine, and are there HVAC rebates?",
        a: "Southern California Edison provides electricity and SoCalGas provides natural gas. The City's utility page names both, and its residential rebates page links to SCE and SoCalGas programs. Terms and funding change, so confirm current details on the SCE rebates page and the SoCalGas rebates page before you buy.",
        links: [
          { text: "utility page", href: "https://cityofirvine.gov/node/13136" },
          { text: "residential rebates page", href: "https://cityofirvine.gov/sustainability-division/rebates-residents" },
          { text: "SCE rebates page", href: "https://www.sce.com/residential/rebates-savings/rebates" },
          { text: "SoCalGas rebates page", href: "https://www.socalgas.com/save-money-and-energy/rebates-and-incentives" },
        ],
      },
      {
        q: "Does SCE have an income-qualified HVAC program for Irvine households?",
        a: "SCE lists one. Its Energy Savings Assistance program lists central AC and central heat pump replacement among the upgrades for income-qualified households with an active SCE residential account. SCE also says some options may not be available in all areas, and eligibility and income limits change, so check SCE's page before you plan around it.",
        links: [
          { text: "Energy Savings Assistance program", href: "https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program" },
        ],
      },
      {
        q: "What HVAC services are available in Irvine?",
        a: "AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout Irvine, for both residential and commercial properties.",
        boldLead: "AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC",
        links: [
          { text: "AC repair", href: serviceHref("ac-repair") },
          { text: "AC installation and replacement", href: serviceHref("ac-installation") },
          { text: "AC maintenance", href: serviceHref("ac-maintenance") },
          { text: "heating repair", href: serviceHref("heating-repair") },
          { text: "furnace installation and replacement", href: serviceHref("furnace-installation") },
          { text: "heat pump services", href: serviceHref("heat-pump-services") },
          { text: "ductless mini-splits", href: serviceHref("ductless-mini-split") },
          { text: "ductwork", href: serviceHref("ductwork") },
          { text: "indoor air quality", href: serviceHref("indoor-air-quality") },
          { text: "emergency HVAC", href: serviceHref("emergency-hvac") },
        ],
      },
      {
        q: "Is emergency HVAC service available in Irvine?",
        a: "Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in Irvine. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "How much does HVAC service cost in Irvine?",
        a: "Cost depends on the problem, the equipment, and how accessible the system is. We do not publish one flat price, so call (323) 776-9047 or request service and we will quote your specific system.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Does AIRPRO SOLUTIONS handle commercial HVAC in Irvine?",
        a: "Yes. AIRPRO SOLUTIONS services commercial properties in Irvine, including rooftop units. The City has an automated permit path for like-for-like commercial rooftop packaged heat-pump change-outs of 20 tons or less, where new units weigh no more than the existing units and no more than 2,000 pounds each, the roof slope is 2% or less, and no curb change is needed. Anything outside those limits is a different review. See our Commercial HVAC page for the full scope.",
        links: [
          { text: "automated permit path", href: "https://www.cityofirvine.gov/building-permits-and-inspections/hvac-change-out" },
          { text: "Commercial HVAC page", href: "/commercial-hvac/" },
        ],
      },
    ],
  },
};

const anaheimOverrides: Partial<City> = {
  // TODO(data): add verified climate and neighborhood detail before treating this as a full local page.
  neighborhoods: [], // no official neighborhood list was verified
  zips: [], // only third-party ZIP lists exist (data.mongabay, hometownlocator); the ZIP card is held out
  page: {
    metaDescription:
      "HVAC for Anaheim homes and businesses, from AC repair to installation. Know the City's permit steps and your electric utility. Licensed, 4.8-star rated.",
    lede:
      "AIRPRO SOLUTIONS provides HVAC services across Anaheim, including AC repair, heating repair, installation, and maintenance for homes and businesses.",
    heroCaption: { title: 'Anaheim, CA', text: 'Local HVAC service across Anaheim' },
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
      lead: 'AIRPRO SOLUTIONS is a licensed HVAC contractor serving Anaheim',
      body:
        ', providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.',
    },
    glance: {
      title: 'Anaheim at a glance',
      stats: [
        { num: '45.4%', label: 'of housing units are in multifamily buildings, and 41.7% are single-family detached (California Department of Finance, 2018, per SCAG)' },
        { num: '44.6%', label: 'of housing was built before 1970 (2017 American Community Survey, per SCAG)' },
        { num: '1', label: 'city-owned electric utility, Anaheim Public Utilities, the only municipal electric utility in Orange County (City of Anaheim)' },
      ],
      source: "Sources: SCAG's local profile of Anaheim and the City of Anaheim utilities pages.",
    },
    localTitle: "Anaheim's mechanical permits, older housing, and municipal electric utility",
    // TODO(copy): client has not approved any Anaheim wording yet (local paragraphs, every FAQ answer, emergency card, permit-application sentence,
    // code-adoption and sound-limit sentences, APU and GO ZERO wording, commercial Resort sentence). Keep flagged until the user says the client approved.
    // TODO(copy): confirm with the City Building Division (714-765-5153) which permits an HVAC replacement needs. Do not state any same-location exemption:
    // the Form B713 footnote "No Building Permit required for replacement in same location (Residential - R3 sf only)" is attached to the ventilation fan line, not to HVAC equipment.
    // Code edition: Anaheim Municipal Code Sec. 15.03.010.0104 (Ord. 6613, 9-23-2025) adopts the 2025 California Mechanical Code; American Legal supplement 2026 S-28
    // says it may not reflect the most current legislation. The only mechanical amendment in Sec. 15.03.060 is a Chapter 1 substitution, so the page states the edition and nothing more.
    // Sound limit: Sec. 6.70.010 is a general property-line limit (60 dB(A)), not HVAC-specific; the rest of its measurement conditions were not stated on the page.
    // Pre-launch recheck: APU rebate pages (anaheim.net/2579 and /936), AQMD GO ZERO page, the municipal code supplement, the SCAG profile URL, Form B713, the City building codes page.
    // Held out: ZIPs, neighborhoods, same-location exemption, permit fees and resolution number, gas provider, Resort shielding claim, rooftop screening, rebate dollar amounts, commercial APU incentives, Manual J, nearby row.
    localParagraphs: [
      "Anaheim's Building Division issues mechanical permits through its **Mechanical Permit Application, Form B713**. The form asks for the project address, a description of the work, the contractor's state license number, and proof of workers' compensation coverage, and the Building Division's number printed on it is (714) 765-5153. We do not assume that a furnace or AC replacement is exempt, so **AIRPRO SOLUTIONS confirms which permits your project needs with the City** before work starts and can walk you through the steps.",
      "Anaheim's housing is mixed, and much of it is older. SCAG's local profile, using California Department of Finance data for 2018, counts **108,222 housing units: 41.7% single-family detached, 8.6% attached, 10.5% in buildings of 2 to 4 units, 34.9% in buildings of 5 or more, and 4.3% mobile homes**. The same profile, citing the 2017 American Community Survey, reports that **44.6% of housing was built before 1970**. These figures are dated, so we confirm the equipment, access, and ductwork at the property, and in a multi-unit building we confirm equipment access and placement.",
      "The City lists **Climate Zone 8** as a local design criterion and says the 2025 codes apply to projects submitted on or after January 1, 2026. Anaheim Municipal Code Sec. 15.03.010.0104 adopts the 2025 California Mechanical Code, and the City's online code notes it may not reflect the most current legislation, so confirm current rules with the City. Sec. 6.70.010 sets a general sound limit of 60 decibels on the A-scale at the property line for sound radiated for extended periods. It is not written for HVAC equipment, and we confirm how it applies to your address before choosing a condenser location.",
      "Electricity comes from **Anaheim Public Utilities**, which the City describes as a city-owned, not-for-profit utility and the only municipal electric utility in Orange County. Its rebate pages list residential incentives, and South Coast AQMD runs a separate GO ZERO heat-pump program, so confirm current terms with each before you buy. For commercial work, the City's Anaheim Resort page describes a 581-acre specific plan area of hotels, convention and conference facilities, restaurants, retail, and entertainment, and each rooftop project there is its own review. Official links are in the card beside this text.",
    ],
    neighborhoodsHeading: 'Official Anaheim resources',
    officialResources: [
      {
        text: "Mechanical Permit Application (Form B713)",
        href: "https://www.anaheim.net/DocumentCenter/View/39695/Mechanical-Permit-Application---B713",
        note: "Building Division application, with the contractor license and workers' compensation fields.",
      },
      {
        text: "Current building codes and design criteria",
        href: "https://www.anaheim.net/6018/Current-Building-Codes-and-Design-Criter",
        note: "Lists Climate Zone 8 and the 2025 codes for projects submitted from January 1, 2026.",
      },
      {
        text: "Anaheim Municipal Code",
        href: "https://codelibrary.amlegal.com/codes/anaheim/latest/overview",
        note: "Sec. 15.03.010.0104 code adoption and Sec. 6.70.010 sound limit.",
      },
      {
        text: "About the Utilities",
        href: "https://www.anaheim.net/1067/About-the-Utilities",
        note: "Describes Anaheim Public Utilities as city-owned and not-for-profit.",
      },
      {
        text: "APU heating and cooling systems rebates",
        href: "https://www.anaheim.net/2579/Heating-Cooling-Systems",
        note: "Residential HVAC incentive terms from Anaheim Public Utilities.",
      },
      {
        text: "South Coast AQMD GO ZERO",
        href: "https://www.aqmd.gov/go-zero",
        note: "Separate heat-pump program; check its page for current status.",
      },
      {
        text: "Anaheim Resort",
        href: "https://www.anaheim.gov/1009/Anaheim-Resort",
        note: "The 581-acre Anaheim Resort specific plan area.",
      },
      {
        text: "SCAG Anaheim local profile",
        href: "https://www.scag.ca.gov/sites/default/files/2024-05/anaheim_localprofile.pdf",
        note: "Housing counts and building age cited on this page.",
      },
    ],
    servicesTitle: 'Everything we handle for Anaheim homes and businesses',
    serviceCards: [
      { slug: "ac-repair", name: "AC Repair", body: "Diagnosis and repair for cooling failures, weak airflow, and unusual noises, with Anaheim's property-line sound limit in mind for outdoor units." },
      { slug: "ac-installation", name: "AC Installation & Replacement", body: "New system sizing and installation, planned around Anaheim's mechanical permit application and Building Division review." },
      { slug: "ac-maintenance", name: "AC Maintenance", body: "Seasonal AC tune-ups that catch small issues early." },
      { slug: "heating-repair", name: "Heating Repair", body: "Furnace and heating system diagnosis and repair." },
      { slug: "furnace-installation", name: "Furnace Installation & Replacement", body: "New furnace sizing and installation, with Anaheim's mechanical permit process confirmed before work starts." },
      { slug: "heat-pump-services", name: "Heat Pump Services", body: "Installation, repair, and maintenance for heat pumps, including how the work fits your Anaheim Public Utilities electric account." },
      { slug: "ductless-mini-split", name: "Ductless Mini-Split", body: "Room-by-room comfort control for spaces where ductwork is not an option." },
      { slug: "ductwork", name: "Ductwork Services", body: "Duct repair, sealing, replacement, and installation." },
      { slug: "indoor-air-quality", name: "Indoor Air Quality", body: "Air filtration, whole-home purification, and ventilation options." },
      { slug: "emergency-hvac", name: "Emergency HVAC", body: "Dispatch for no-cool and no-heat emergencies in Anaheim." },
    ],
    resources: {
      eyebrow: 'Know before you start',
      title: 'Anaheim permits, utility, and rebate programs',
      intro: 'Official sources for three local items worth checking before an Anaheim HVAC project.',
      cards: [
        // TODO(copy): rebate wording not yet client-approved. No dollar amounts on purpose.
        {
          amount: "Mechanical permit",
          description: "Anaheim's Building Division issues mechanical permits and publishes an application, Form B713. Confirm which permits your project needs before work starts.",
          linkLabel: "Form B713",
          linkHref: "https://www.anaheim.net/DocumentCenter/View/39695/Mechanical-Permit-Application---B713",
        },
        {
          amount: "City-owned utility",
          description: "Anaheim Public Utilities is a city-owned, not-for-profit utility and the only municipal electric utility in Orange County. Its rebate terms and funding change, so confirm current details before you buy.",
          linkLabel: "APU rebates page",
          linkHref: "https://www.anaheim.net/2579/Heating-Cooling-Systems",
        },
        {
          amount: "Heat-pump program",
          description: "South Coast AQMD runs a separate GO ZERO program. It is not an Anaheim Public Utilities rebate, and its status and terms change, so check the program page first.",
          linkLabel: "GO ZERO page",
          linkHref: "https://www.aqmd.gov/go-zero",
        },
      ],
    },
    // Nearby row held out: no sourced adjacency, and no other Orange County city page links are claimed here. The city page skips the section when this is empty.
    nearby: [],
    proof: {
      heading: 'Licensed, reviewed, and ready across Anaheim',
      body: 'AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.',
      stats: [
        { num: '4.8★', label: 'Google rating' },
        { num: '40', label: 'Google reviews' },
        { num: 'C-20', label: 'California license class' },
        { num: '24/7', label: 'Emergency dispatch' },
      ],
    },
    finalCtaBody: 'Call or request service online to schedule a visit anywhere in Anaheim. Same-day service is typical.',
    // TODO(copy): client has not confirmed any FAQ answer below.
    faqs: [
      {
        q: "Does AIRPRO SOLUTIONS service all of Anaheim?",
        a: "Yes. AIRPRO SOLUTIONS serves homes and businesses across Anaheim as part of our Orange County coverage. Anaheim issues its own mechanical permits through its Building Division, so we plan each visit around your specific address.",
        boldLead: "Yes.",
        links: [
          { text: "Orange County coverage", href: "/service-areas/orange-county/" },
        ],
      },
      {
        q: "How fast can a technician reach my Anaheim home?",
        a: "Same-day service is typical in Anaheim, subject to capacity. Call (323) 776-9047 to confirm a window for your address.",
        boldLead: "Same-day service is typical in Anaheim, subject to capacity.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Do I need a permit to replace an AC or furnace in Anaheim?",
        a: "Check with the City before work starts. Anaheim's Building Division issues mechanical permits and publishes a Mechanical Permit Application (Form B713). The form asks for the project address, a description of the work, the contractor's state license number, and proof of workers' compensation coverage. We do not assume a replacement is exempt, so confirm which permits your project needs with the Building Division at (714) 765-5153. AIRPRO SOLUTIONS can walk you through the steps.",
        boldLead: "Check with the City before work starts.",
        links: [
          { text: "Mechanical Permit Application (Form B713)", href: "https://www.anaheim.net/DocumentCenter/View/39695/Mechanical-Permit-Application---B713" },
        ],
      },
      {
        q: "Where is Anaheim's Building Division?",
        a: "200 S. Anaheim Blvd., Suite 145, Anaheim, CA 92805. The address and the (714) 765-5153 phone number are printed on the City's Mechanical Permit Application. The form is headed City of Anaheim Planning Department, Building Division.",
        boldLead: "200 S. Anaheim Blvd., Suite 145, Anaheim, CA 92805.",
      },
      {
        q: "Which building codes apply to HVAC work in Anaheim?",
        a: "Anaheim lists Climate Zone 8 and the 2025 California codes. The City's current building codes page lists Climate Zone 8 as a local design criterion and says the 2025 codes apply to projects submitted on or after January 1, 2026. Anaheim Municipal Code Sec. 15.03.010.0104 adopts the 2025 California Mechanical Code (Ordinance 6613, September 23, 2025). The City's online code notes it may not reflect the most current legislation, so we confirm current rules with the City for your project.",
        boldLead: "Anaheim lists Climate Zone 8 and the 2025 California codes.",
        links: [
          { text: "current building codes page", href: "https://www.anaheim.net/6018/Current-Building-Codes-and-Design-Criter" },
        ],
      },
      {
        q: "Does Anaheim have a noise rule that affects AC equipment?",
        a: "Anaheim has a general sound limit. Anaheim Municipal Code Sec. 6.70.010 prohibits sound radiated for extended periods from a premises that produces a sound pressure level above 60 decibels on the A-scale at the property line. It is a general rule, not one written for HVAC equipment, and it sets measurement conditions of its own, so we confirm how it applies to your address before we choose a condenser location.",
        boldLead: "Anaheim has a general sound limit.",
      },
      {
        q: "Do you work in condos and apartment buildings in Anaheim?",
        a: "Yes. SCAG's local profile of Anaheim, using California Department of Finance data for 2018, counts 108,222 housing units, with 41.7% single-family detached, 8.6% single-family attached, 10.5% in buildings of 2 to 4 units, 34.9% in buildings of 5 or more units, and 4.3% mobile homes. AIRPRO SOLUTIONS services condos, townhomes, and apartments as well as single-family homes, and in a multi-unit building we confirm equipment access and placement at the property. See our Residential HVAC page.",
        boldLead: "Yes.",
        links: [
          { text: "Residential HVAC page", href: "/residential-hvac/" },
        ],
      },
      {
        q: "Does the age of Anaheim homes matter for HVAC work?",
        a: "It can, and we confirm it on site. SCAG's local profile, citing the 2017 American Community Survey, reports that 44.6% of Anaheim's housing stock was built before 1970. Older homes can mean older equipment, attic access, and ductwork, but those are still property-specific, so we check them at a site visit before recommending repair or replacement.",
        boldLead: "It can, and we confirm it on site.",
      },
      {
        q: "Who provides electricity in Anaheim, and are there HVAC rebates?",
        a: "Anaheim Public Utilities, the City's own utility. The City describes Anaheim Public Utilities as a city-owned, not-for-profit utility, and says it operates the only municipal electric utility in Orange County. Its Heating & Cooling Systems page and rebate programs page list its residential incentives. Terms and funding change, so confirm current details with Anaheim Public Utilities before you buy.",
        boldLead: "Anaheim Public Utilities, the City's own utility.",
        links: [
          { text: "Heating & Cooling Systems page", href: "https://www.anaheim.net/2579/Heating-Cooling-Systems" },
          { text: "rebate programs page", href: "https://www.anaheim.net/936/Energy-Rebates-Programs" },
        ],
      },
      {
        q: "Is there another rebate program for heat pumps in Anaheim?",
        a: "South Coast AQMD runs a separate program called GO ZERO. It is not an Anaheim Public Utilities rebate. Its status and terms change, so check the GO ZERO page for whether it is accepting applications and whether your property and project qualify before you plan around it.",
        boldLead: "South Coast AQMD runs a separate program called GO ZERO.",
        links: [
          { text: "GO ZERO page", href: "https://www.aqmd.gov/go-zero" },
        ],
      },
      {
        q: "What HVAC services are available in Anaheim?",
        a: "AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout Anaheim, for both residential and commercial properties.",
        boldLead: "AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC",
        links: [
          { text: "AC repair", href: serviceHref("ac-repair") },
          { text: "AC installation and replacement", href: serviceHref("ac-installation") },
          { text: "AC maintenance", href: serviceHref("ac-maintenance") },
          { text: "heating repair", href: serviceHref("heating-repair") },
          { text: "furnace installation and replacement", href: serviceHref("furnace-installation") },
          { text: "heat pump services", href: serviceHref("heat-pump-services") },
          { text: "ductless mini-splits", href: serviceHref("ductless-mini-split") },
          { text: "ductwork", href: serviceHref("ductwork") },
          { text: "indoor air quality", href: serviceHref("indoor-air-quality") },
          { text: "emergency HVAC", href: serviceHref("emergency-hvac") },
        ],
      },
      {
        q: "Is emergency HVAC service available in Anaheim?",
        a: "Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in Anaheim. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.",
        boldLead: "Yes.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "How much does HVAC service cost in Anaheim?",
        a: "Cost depends on the problem, the equipment, and how accessible the system is. We do not publish one flat price, so call (323) 776-9047 or request service and we will quote your specific system.",
        boldLead: "Cost depends on the problem, the equipment, and how accessible the system is.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Does AIRPRO SOLUTIONS handle commercial HVAC in Anaheim?",
        a: "Yes. AIRPRO SOLUTIONS services commercial properties in Anaheim, including rooftop units. The City's Anaheim Resort page describes a 581-acre specific plan area with hotels, convention and conference facilities, restaurants, retail, and entertainment, and the Mechanical Permit Application's component worksheet lists package units as typically commercial and on the rooftop and counts commercial systems per 1,000 square feet. Each project is a different review, so we confirm the permit path with the Building Division. See our Commercial HVAC page for the full scope.",
        boldLead: "Yes.",
        links: [
          { text: "Anaheim Resort page", href: "https://www.anaheim.gov/1009/Anaheim-Resort" },
          { text: "Commercial HVAC page", href: "/commercial-hvac/" },
        ],
      },
    ],
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

const costaMesaOverrides: Partial<City> = {
  // TODO(data): add verified climate and neighborhood detail before treating this as a full local page.
  neighborhoods: [], // no official neighborhood list was verified
  zips: [], // only the City About page lists 92626, 92627 and 92628 (used as one attributed sentence); the ZIP card is held out
  page: {
    metaDescription:
      "HVAC for Costa Mesa homes and businesses, from AC repair to installation. Know the City's Insta-Permit rules and noise limits. Licensed, 4.8-star rated.",
    lede:
      "AIRPRO SOLUTIONS provides HVAC services across Costa Mesa, including AC repair, heating repair, installation, and maintenance for homes and businesses.",
    heroCaption: { title: "Costa Mesa, CA", text: "Local HVAC service across Costa Mesa" },
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
      lead: "AIRPRO SOLUTIONS is a licensed HVAC contractor serving Costa Mesa",
      body:
        ", providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.",
    },
    glance: {
      title: "Costa Mesa at a glance",
      stats: [
        { num: "48%", label: "of housing units are in multifamily buildings, and 39.6% are single-family detached (California Department of Finance, 2018, per SCAG)" },
        { num: "49.6%", label: "of housing was built before 1970 (2017 American Community Survey, per SCAG)" },
        { num: "16", label: "square miles, just one mile from the Pacific Coast (City of Costa Mesa)" },
      ],
      source: "Sources: SCAG's local profile of Costa Mesa and the City of Costa Mesa About page.",
    },
    localTitle: "Costa Mesa's single-family Insta-Permit, multifamily housing, and noise limits",
    // Held out (no verified source): neighboring cities and any adjacency (nearby row empty), ZIP card and neighborhoods (only the City About page ZIP sentence is used; zips and neighborhoods empty), named electric or gas provider (no Costa Mesa source opened names SCE or SoCalGas; links only), OCPA membership, rebate dollar amounts, General Plan unit counts and the 30% figure (conflict with Table LU-2 and SCAG), Noise Element and CNEL (PDF could not be opened), median home age, climate and NOAA data, humidity and AQI, Building Safety street address (77 Fair Drive, 2nd Floor appears only on City Clerk notices; the Building Safety page redirected), competitor SERP table, Jaspector and zip-codes.com (third-party), the Insta-Permit standard plan contents (image-only PDF), any Planning review or CF1R statement.
    // TODO(copy): client has not approved any Costa Mesa wording (every FAQ answer, the four local paragraphs, the Insta-Permit scope and placement sentences, the noise and code sentences, the commercial General Plan sentence, the incentive wording). Keep flagged until the user says the client approved. Irvine, Gardena and Anaheim flags also stay.
    // TODO(copy): confirm with Building Safety (714-754-5273) which permit path each HVAC job needs, including condos and townhomes, and whether AIRPRO SOLUTIONS holds a Costa Mesa business license (the City requires one for Insta-Permit contractors).
    // TODO(copy): noise text is from GoCodebook (2026-10 edition, text as of 2026-10-04), not the City's official publication; recheck against the official code. The code-adoption sentence does not name the Mechanical Code (Titles 5 and 7 not read).
    // Pre-launch recheck: SCE rebates, Energy Savings Assistance and Time-Of-Use pages; SoCalGas rebates page (page dated 2024-07-23, mentions 2026 funds); TECH Clean California and switchison.org status; the City's utility page (add providers only if a source names them); GoCodebook Sec. 13-280 and 13-281 against the official code; Insta-Permit page and standard plan; TESSA links; SCAG profile URL; Building Safety address.
    localParagraphs: [
      "Costa Mesa has a **Residential HVAC Insta-Permit** through its online TESSA portal, but the City limits it to a single-family dwelling on a single parcel. Its scope can include A/C condensers, forced air units, furnaces, heat pumps, mini splits, and new ductwork, and the City says exterior equipment must be installed at ground level on the side or rear of the home, where it is not visible to the public. Work beyond that scope goes to a Mechanical - Residential permit application, so **AIRPRO SOLUTIONS confirms which permit path applies** with the City before work starts, including for condos, townhomes, and apartments.",
      "The City's About page lists ZIP codes 92626, 92627, and 92628 and describes Costa Mesa as 16 square miles, just one mile from the Pacific Coast. SCAG's local profile, using California Department of Finance data for 2018, counts **42,836 housing units: 39.6% single-family detached, 10.2% attached, 13.3% in buildings of 2 to 4 units, 34.7% in buildings of 5 or more, and 2.2% mobile homes**, which makes about 48% of housing multifamily. The same profile, citing the 2017 American Community Survey, reports that **49.6% of housing was built before 1970**. These figures are dated, so we confirm the equipment, access, and ductwork at the property, and in a multi-unit building we confirm equipment access and placement.",
      "Municipal Code Sec. 13-280 sets an exterior noise standard for all residential property of **55 dB(A) from 7 a.m. to 11 p.m. and 50 dB(A) from 11 p.m. to 7 a.m.**, reduced by 5 dB(A) for impact, simple tone, speech, or music sounds, with additional duration tiers. Sec. 13-281 sets interior limits of 55 dB(A) by day and 45 dB(A) at night. The code has no section written for HVAC equipment, and the text we read comes from a third-party code host that may not reflect the most current legislation, so we confirm how the limits apply to your address before choosing a condenser location. The City's notice says it adopted the 2025 California Building Standards Code with local amendments, effective January 1, 2026.",
      "For commercial work, the City's General Plan Land Use Element describes South Coast Plaza, along the Bristol Street corridor, as the largest single concentration of retail uses in the city, a 92-acre East 17th Street commercial corridor, and a Westside with an intertwined mix of industrial, commercial, and residential uses. The City lists a separate Mechanical - Commercial permit application. Utility and state incentive programs change, so we link the SCE, SoCalGas, TECH Clean California, and The Switch Is On pages rather than quote amounts. Confirm which utility serves your address and check current eligibility before you buy. Official links are in the card beside this text.",
    ],
    neighborhoodsHeading: "Official Costa Mesa resources",
    officialResources: [
      {
        text: "Insta-Permit: Residential HVAC",
        href: "https://www.costamesaca.gov/trending/insta-permit",
        note: "Single-family scope, ground-level side or rear equipment, issued by email after payment.",
      },
      {
        text: "Mechanical - Residential permit application",
        href: "https://permits.costamesaca.gov/energov_prod/selfservice#/permit/apply/275/0/0",
        note: "TESSA application for work beyond the Insta-Permit scope.",
      },
      {
        text: "Mechanical - Commercial permit application",
        href: "https://permits.costamesaca.gov/energov_prod/selfservice#/permit/apply/354/0/0",
        note: "The City's separate commercial mechanical permit type.",
      },
      {
        text: "Building permits and TESSA",
        href: "https://www.costamesaca.gov/government/departments-and-divisions/community-development/building-safety/permit-types-submittal-requirements/building-permits",
        note: "Application information is entered directly in TESSA; paper forms are ignored.",
      },
      {
        text: "Replacement of mechanical, electrical, and plumbing fixtures",
        href: "https://www.costamesaca.gov/home/showpublisheddocument/63188/639135790567430000",
        note: "City handout listing Title 24 energy forms and a site plan for submittals.",
      },
      {
        text: "Municipal Code Sec. 13-280",
        href: "https://gocodebook.com/library/us/ca/costa-mesa-zoning/title-13-planning-zoning-and-development/chapter-xiii-noise-control/13-280.-exterior-noise-standards",
        note: "Exterior noise standards, on a third-party code host.",
      },
      {
        text: "Municipal Code Sec. 13-281",
        href: "https://gocodebook.com/library/us/ca/costa-mesa-zoning/title-13-planning-zoning-and-development/chapter-xiii-noise-control/13-281.-interior-noise-standards",
        note: "Interior noise standards, on a third-party code host.",
      },
      {
        text: "General Plan Land Use Element",
        href: "http://ftp.costamesaca.gov/costamesaca/generalplan2015-2035/adopted/02_FinalDraftLandUseElement_02-2016.pdf",
        note: "Source for the commercial corridors described on this page.",
      },
      {
        text: "About Costa Mesa",
        href: "https://www.costamesaca.gov/community/about",
        note: "City description, size, and ZIP codes.",
      },
      {
        text: "SCAG Costa Mesa local profile",
        href: "https://scag.ca.gov/sites/main/files/file-attachments/costamesa_localprofile.pdf",
        note: "Housing counts and building age cited on this page.",
      },
    ],
    servicesTitle: "Everything we handle for Costa Mesa homes and businesses",
    serviceCards: [
      { slug: "ac-repair", name: "AC Repair", body: "Diagnosis and repair for cooling failures, weak airflow, and unusual noises, with the City's residential noise limits in mind for outdoor units." },
      { slug: "ac-installation", name: "AC Installation & Replacement", body: "New system sizing and installation, planned around the City's Insta-Permit for single-family homes and its Mechanical - Residential permit for other work." },
      { slug: "ac-maintenance", name: "AC Maintenance", body: "Seasonal AC tune-ups that catch small issues early." },
      { slug: "heating-repair", name: "Heating Repair", body: "Furnace and heating system diagnosis and repair." },
      { slug: "furnace-installation", name: "Furnace Installation & Replacement", body: "New furnace sizing and installation, with the City's permit path confirmed before work starts. Furnaces are within the Insta-Permit scope for single-family homes." },
      { slug: "heat-pump-services", name: "Heat Pump Services", body: "Installation, repair, and maintenance for heat pumps. Incentive availability changes, so we point you to the current program pages." },
      { slug: "ductless-mini-split", name: "Ductless Mini-Split", body: "Room-by-room comfort control for spaces where ductwork is not an option. Mini splits are within the Insta-Permit scope for single-family homes." },
      { slug: "ductwork", name: "Ductwork Services", body: "Duct repair, sealing, replacement, and installation. New ductwork is within the Insta-Permit scope for single-family homes." },
      { slug: "indoor-air-quality", name: "Indoor Air Quality", body: "Air filtration, whole-home purification, and ventilation options." },
      { slug: "emergency-hvac", name: "Emergency HVAC", body: "Dispatch for no-cool and no-heat emergencies in Costa Mesa." },
    ],
    resources: {
      eyebrow: "Know before you start",
      title: "Costa Mesa permits, noise limits, and incentive programs",
      intro: "Official sources for three local items worth checking before a Costa Mesa HVAC project.",
      cards: [
        // TODO(copy): incentive wording not yet client-approved. No dollar amounts on purpose; recheck links before launch.
        {
          amount: "Insta-Permit",
          description: "Costa Mesa's Residential HVAC Insta-Permit covers a single-family dwelling on a single parcel and is issued by email within minutes of payment. Work beyond that scope uses a Mechanical - Residential permit application.",
          linkLabel: "Insta-Permit page",
          linkHref: "https://www.costamesaca.gov/trending/insta-permit",
        },
        {
          amount: "Noise limits",
          description: "The Municipal Code sets exterior limits of 55 dB(A) by day and 50 dB(A) at night on residential property. Check Sec. 13-280 before choosing a condenser location.",
          linkLabel: "Sec. 13-280",
          linkHref: "https://gocodebook.com/library/us/ca/costa-mesa-zoning/title-13-planning-zoning-and-development/chapter-xiii-noise-control/13-280.-exterior-noise-standards",
        },
        {
          amount: "Incentive programs",
          description: "Rebate terms and funding change, and we do not quote amounts. Confirm which utility serves your address and check current terms before you buy.",
          linkLabel: "SCE rebates page",
          linkHref: "https://www.sce.com/save-money/rebates-financial-assistance",
        },
      ],
    },
    // Nearby row held out: no source names Costa Mesa neighbors. The city page skips the section when this is empty.
    nearby: [],
    proof: {
      heading: "Licensed, reviewed, and ready across Costa Mesa",
      body: "AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.",
      stats: [
        { num: '4.8★', label: 'Google rating' },
        { num: '40', label: 'Google reviews' },
        { num: 'C-20', label: 'California license class' },
        { num: '24/7', label: 'Emergency dispatch' },
      ],
    },
    finalCtaBody: "Call or request service online to schedule a visit anywhere in Costa Mesa. Same-day service is typical.",
    // TODO(copy): client has not confirmed any FAQ answer below.
    faqs: [
      {
        q: "Does AIRPRO SOLUTIONS service all of Costa Mesa?",
        a: "Yes. AIRPRO SOLUTIONS serves homes and businesses across Costa Mesa as part of our Orange County coverage. Costa Mesa takes permit applications through its online TESSA portal, so we plan each visit around your specific address.",
        boldLead: "Yes.",
        links: [
          { text: "Orange County coverage", href: "/service-areas/orange-county/" },
        ],
      },
      {
        q: "How fast can a technician reach my Costa Mesa home?",
        a: "Same-day service is typical in Costa Mesa, subject to capacity. Call (323) 776-9047 to confirm a window for your address.",
        boldLead: "Same-day service is typical in Costa Mesa, subject to capacity.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Do I need a permit to replace an AC or furnace in Costa Mesa?",
        a: "Check with the City before work starts. Costa Mesa offers a Residential HVAC Insta-Permit for a single-family dwelling on a single parcel, issued by email within minutes of payment, and a Mechanical - Residential permit application for work beyond that scope. Applications are entered directly in TESSA, and the City says paper forms are ignored. We do not assume a replacement is exempt, so confirm your project's permit path with Building Safety at 714-754-5273. AIRPRO SOLUTIONS can walk you through the steps.",
        boldLead: "Check with the City before work starts.",
        links: [
          { text: "Residential HVAC Insta-Permit", href: "https://www.costamesaca.gov/trending/insta-permit" },
          { text: "Mechanical - Residential permit application", href: "https://permits.costamesaca.gov/energov_prod/selfservice#/permit/apply/275/0/0" },
        ],
      },
      {
        q: "Can a condo, townhome, or apartment use the Insta-Permit?",
        a: "The Insta-Permit is limited to single-family homes. The City describes it as a limited permit for a single-family dwelling on a single parcel, and says work beyond that scope goes to a Mechanical - Residential permit application. For a condo, townhome, or apartment, we confirm the permit path with Building Safety before work starts.",
        boldLead: "The Insta-Permit is limited to single-family homes.",
      },
      {
        q: "Where can the outdoor unit go under the Insta-Permit?",
        a: "Outdoor equipment goes on the ground at the side or rear of the home. The City's Insta-Permit page says exterior equipment must be installed at ground level, with no roof-top equipment, on the side or rear of the building, where it is not visible to the public. All components must be in a privately owned location, and the City's standard plans for HVAC must be used.",
        boldLead: "Outdoor equipment goes on the ground at the side or rear of the home.",
        links: [
          { text: "Insta-Permit page", href: "https://www.costamesaca.gov/trending/insta-permit" },
        ],
      },
      {
        q: "What does the City require of a contractor who pulls the permit?",
        a: "The City says contractors need an active State contractor's license and a Costa Mesa business license. Owner-builders use a separate Owner-Builder application. Insta-Permit requests are submitted through TESSA.",
        boldLead: "The City says contractors need an active State contractor's license and a Costa Mesa business license.",
      },
      {
        q: "What does the City ask to see with an HVAC replacement permit?",
        a: "The City's handout for replacing mechanical, electrical, and plumbing fixtures lists Title 24 energy forms and a 24 by 36 inch site plan showing the equipment location and property line. Requirements vary by project, so confirm yours with Building Safety at 714-754-5273 or buildinginfo@costamesaca.gov.",
        boldLead: "The City's handout for replacing mechanical, electrical, and plumbing fixtures lists Title 24 energy forms and a 24 by 36 inch site plan showing the equipment location and property line.",
        links: [
          { text: "handout", href: "https://www.costamesaca.gov/home/showpublisheddocument/63188/639135790567430000" },
        ],
      },
      {
        q: "Which building codes apply to HVAC work in Costa Mesa?",
        a: "The City's notice says Costa Mesa adopted the 2025 California Building Standards Code with local amendments, effective January 1, 2026. The notice describes Ordinance 2025-08 as adopting the code by reference. We confirm current requirements with the City for your project.",
        boldLead: "The City's notice says Costa Mesa adopted the 2025 California Building Standards Code with local amendments, effective January 1, 2026.",
        links: [
          { text: "notice", href: "https://www.costamesaca.gov/home/showpublisheddocument/61746/639001965494430000" },
        ],
      },
      {
        q: "Does Costa Mesa have a noise rule that affects AC equipment?",
        a: "Costa Mesa has general residential noise limits. Municipal Code Sec. 13-280 sets an exterior standard of 55 dB(A) from 7 a.m. to 11 p.m. and 50 dB(A) from 11 p.m. to 7 a.m. on residential property, reduced by 5 dB(A) for impact, simple tone, speech, or music sounds. Sec. 13-281 sets interior limits of 55 dB(A) by day and 45 dB(A) at night. The code has no section written for HVAC equipment, and the text we read is from a third-party code host that may not reflect the most current legislation, so we confirm how the limits apply to your address before we choose a condenser location.",
        boldLead: "Costa Mesa has general residential noise limits.",
        links: [
          { text: "Sec. 13-280", href: "https://gocodebook.com/library/us/ca/costa-mesa-zoning/title-13-planning-zoning-and-development/chapter-xiii-noise-control/13-280.-exterior-noise-standards" },
          { text: "Sec. 13-281", href: "https://gocodebook.com/library/us/ca/costa-mesa-zoning/title-13-planning-zoning-and-development/chapter-xiii-noise-control/13-281.-interior-noise-standards" },
        ],
      },
      {
        q: "Do you work in condos and apartment buildings in Costa Mesa?",
        a: "Yes. SCAG's local profile of Costa Mesa, using California Department of Finance data for 2018, counts 42,836 housing units, with 39.6% single-family detached, 10.2% single-family attached, 13.3% in buildings of 2 to 4 units, 34.7% in buildings of 5 or more units, and 2.2% mobile homes. AIRPRO SOLUTIONS services condos, townhomes, and apartments as well as single-family homes, and in a multi-unit building we confirm equipment access and placement at the property. See our Residential HVAC page.",
        boldLead: "Yes.",
        links: [
          { text: "Residential HVAC page", href: "/residential-hvac/" },
        ],
      },
      {
        q: "Does the age of Costa Mesa homes matter for HVAC work?",
        a: "It can, and we confirm it on site. SCAG's local profile, citing the 2017 American Community Survey, reports that 49.6% of Costa Mesa's housing stock was built before 1970. Older homes can mean older equipment, attic access, and ductwork, but those are still property-specific, so we check them at a site visit before recommending repair or replacement.",
        boldLead: "It can, and we confirm it on site.",
      },
      {
        q: "Which rebate and incentive pages should I check before buying HVAC equipment in Costa Mesa?",
        a: "Check the utility and state program pages for current terms. We do not quote amounts, because availability and funding change. SCE publishes rebates and an income-qualified Energy Savings Assistance program, SoCalGas lists furnace rebates with its own eligibility requirements, and heat-pump incentives are tracked by TECH Clean California and The Switch Is On. Confirm which utility serves your address, and confirm current eligibility and reservation status before scheduling installation.",
        boldLead: "Check the utility and state program pages for current terms.",
        links: [
          { text: "SCE", href: "https://www.sce.com/save-money/rebates-financial-assistance" },
          { text: "Energy Savings Assistance", href: "https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program" },
          { text: "SoCalGas", href: "https://www.socalgas.com/savings/rebates-and-incentives" },
          { text: "TECH Clean California", href: "https://techcleanca.com/incentives/single-family-incentives/" },
          { text: "The Switch Is On", href: "https://switchison.org" },
        ],
      },
      {
        q: "What HVAC services are available in Costa Mesa?",
        a: "AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout Costa Mesa, for both residential and commercial properties.",
        boldLead: "AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC",
        links: [
          { text: "AC repair", href: "/services/ac-repair/" },
          { text: "AC installation and replacement", href: "/services/ac-installation/" },
          { text: "AC maintenance", href: "/services/ac-maintenance/" },
          { text: "heating repair", href: "/services/heating-repair/" },
          { text: "furnace installation and replacement", href: "/services/furnace-installation/" },
          { text: "heat pump services", href: "/services/heat-pump-services/" },
          { text: "ductless mini-splits", href: "/services/ductless-mini-split/" },
          { text: "ductwork", href: "/services/ductwork/" },
          { text: "indoor air quality", href: "/services/indoor-air-quality/" },
          { text: "emergency HVAC", href: "/services/emergency-hvac/" },
        ],
      },
      {
        q: "Is emergency HVAC service available in Costa Mesa?",
        a: "Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in Costa Mesa. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.",
        boldLead: "Yes.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "How much does HVAC service cost in Costa Mesa?",
        a: "Cost depends on the problem, the equipment, and how accessible the system is. We do not publish one flat price, so call (323) 776-9047 or request service and we will quote your specific system.",
        boldLead: "Cost depends on the problem, the equipment, and how accessible the system is.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Does AIRPRO SOLUTIONS handle commercial HVAC in Costa Mesa?",
        a: "Yes. AIRPRO SOLUTIONS services commercial properties in Costa Mesa, including rooftop units. The City's General Plan Land Use Element describes South Coast Plaza, along the Bristol Street corridor, as the largest single concentration of retail uses in the city, a 92-acre East 17th Street commercial corridor, and a Westside with an intertwined mix of industrial, commercial, and residential uses. The City lists a separate Mechanical - Commercial permit application, so we confirm the permit path with Building Safety. See our Commercial HVAC page for the full scope.",
        boldLead: "Yes.",
        links: [
          { text: "General Plan Land Use Element", href: "http://ftp.costamesaca.gov/costamesaca/generalplan2015-2035/adopted/02_FinalDraftLandUseElement_02-2016.pdf" },
          { text: "Mechanical - Commercial permit application", href: "https://permits.costamesaca.gov/energov_prod/selfservice#/permit/apply/354/0/0" },
          { text: "Commercial HVAC page", href: "/commercial-hvac/" },
        ],
      },
    ],
  },
};

export const cities: City[] = baseCities.map((c) => {
  const overrides =
    c.slug === 'torrance' ? torranceOverrides
    : c.slug === 'los-angeles' ? losAngelesOverrides
    : c.slug === 'long-beach' ? longBeachOverrides
    : c.slug === 'pasadena' ? pasadenaOverrides
    : c.slug === 'culver-city' ? culverCityOverrides
    : c.slug === 'redondo-beach' ? redondoBeachOverrides
    : c.slug === 'el-segundo' ? elSegundoOverrides
    : c.slug === 'gardena' ? gardenaOverrides
    : c.slug === 'irvine' ? irvineOverrides
    : c.slug === 'anaheim' ? anaheimOverrides
    : c.slug === 'costa-mesa' ? costaMesaOverrides
    : undefined;
  const withOverrides = overrides ? { ...c, ...overrides } : c;
  return cardImages[c.slug] ? { ...withOverrides, cardImage: cardImages[c.slug] } : withOverrides;
});

export const wave1Cities = cities.filter((c) => c.wave === 1);

export const getCity = (slug: string) => cities.find((c) => c.slug === slug);
