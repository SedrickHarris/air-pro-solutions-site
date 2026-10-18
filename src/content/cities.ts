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
  // Small fact cards (label/value rows plus a source note) shown above the official-link list on the same card.
  localCards?: { heading: string; rows: { label: string; value: string }[]; note: string }[];
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
  page?: CityPage; // full template content; torrance, los-angeles, long-beach, pasadena, culver-city, redondo-beach, el-segundo, gardena, irvine, anaheim, costa-mesa, huntington-beach, riverside, ontario, corona and glendale have this so far
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
    // TODO(copy): the housing card below restates figures already in the second local paragraph; client has not approved it.
    localCards: [
      {
        heading: "Irvine housing snapshot",
        rows: [
          { label: "Housing units", value: "102,474" },
          { label: "Single-family detached", value: "38.9%" },
          { label: "Single-family attached", value: "16.4%" },
          { label: "Buildings of 2 to 4 units", value: "6.2%" },
          { label: "Buildings of 5 or more units", value: "37.4%" },
          { label: "Built before 1970", value: "4.8%" },
        ],
        note: "California Department of Finance E-5 data for 2018 and 2017 American Community Survey data, both through SCAG's 2019 local profile. Figures are citywide and dated.",
      },
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
    // TODO(copy): the housing card below restates figures already in the second local paragraph; client has not approved it.
    localCards: [
      {
        heading: "Anaheim housing snapshot",
        rows: [
          { label: "Single-family detached", value: "41.7%" },
          { label: "Built before 1970", value: "44.6%" },
        ],
        note: "California Department of Finance E-5 data for 2018 and 2017 American Community Survey data, both through SCAG's local profile. Citywide and dated.",
      },
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

const huntingtonBeachOverrides: Partial<City> = {
  // TODO(data): add verified climate detail before treating this as a full local page.
  neighborhoods: [], // no official neighborhood list was verified; City sources document Huntington Harbour, Oak View and Sunset Beach, used in prose only
  zips: [], // the only ZIP list found is a water-service list (source PDF unreadable); the ZIP card is held out
  page: {
    metaDescription:
      "HVAC for Huntington Beach homes and businesses, from AC repair to installation. Know the HB ACA permit portal and noise limits. Licensed, 4.8-star rated.",
    lede:
      "AIRPRO SOLUTIONS provides HVAC services across Huntington Beach, including AC repair, heating repair, installation, and maintenance for homes and businesses.",
    heroCaption: { title: "Huntington Beach, CA", text: "Local HVAC service across Huntington Beach" },
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
      lead: "AIRPRO SOLUTIONS is a licensed HVAC contractor serving Huntington Beach",
      body:
        ", providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, subject to capacity, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.",
    },
    glance: {
      title: "Huntington Beach at a glance",
      stats: [
        { num: "198,711", label: "residents in the 2020 U.S. Census (U.S. Census Bureau QuickFacts)" },
        { num: "47.9%", label: "of 81,656 housing units are single-family detached, and 36.7% are in buildings of 2 or more units (California Department of Finance, 2018, per SCAG)" },
        { num: "43.5%", label: "of housing was built before 1970 (2017 American Community Survey, per SCAG)" },
      ],
      source: "Sources: U.S. Census Bureau QuickFacts and SCAG's local profile of Huntington Beach.",
    },
    localTitle: "Huntington Beach's HB ACA permits, communities, and noise limits",
    // Held out (no verified source): ZIP card (water-service ZIP list only, source PDF unreadable; 92605 and 92615 are not official), neighborhood pills, nearby row (no source names neighbors), climate and NOAA data (2014 visitor page only), humidity, SCE time-of-use plans, OCPA (customers returned to SCE in 2024), rebate dollar amounts, HEEHRA $8,000 figure, SCE Home Performance Plus (page does not say it covers HVAC), Edwards Hill and Seagate (records site blocked), setbacks, coastal or historic placement rules, any city code edition or local mechanical amendment (DGS code page not opened), any like-for-like exemption, AC charge verification (climate zone not found), competitor SERP table.
    // TODO(copy): client has not approved any Huntington Beach wording (every FAQ answer, the five local paragraphs, the noise sentences, the Title 24 sentences, the commercial sentence, the incentive wording). Keep flagged until the user says the client approved. Irvine, Gardena, Anaheim and Costa Mesa flags also stay.
    // TODO(copy): confirm with the City (general office number (714) 536-5241) which permit path each HVAC job needs, and whether AIRPRO SOLUTIONS holds a Huntington Beach business license (the City asks contractors for one).
    // TODO(copy): noise text is from ecode360 (third-party host; amendments cited 3940-7/12 and 4222-9/21). The nighttime row under Low-Density Residential is unlabeled on that host, so no nighttime number is stated; recheck against the official code before adding one.
    // Pre-launch recheck: SCE rebates page, SoCalGas rebates page (dated 2024-07-23), TECH Clean California and switchison.org, CEC HEEHRA status (notice dated 2026-02-24), the City utility services page, ecode360 Sec. 8.40.050 and 8.40.090, SCAG profile URL, QuickFacts, DGS code page (not opened), water-board ZIP source if a ZIP sentence is ever added.
    localParagraphs: [
      "Huntington Beach's Permit Center issues mechanical permits along with building, electrical, plumbing, and other construction permits, and its HB ACA portal handles online permit processing, payments, project status, and inspection scheduling. The City's forms page lists a Mechanical Permit Application, Mechanical Plan Requirements, and a Mechanical Plan Check Waiver Request, and it does not say when a waiver applies. The City pages we reviewed state no like-for-like exemption, so **AIRPRO SOLUTIONS confirms which permit path applies** with the City before work starts. The City asks contractors for a current Huntington Beach business license, the matching State contractor license, and workers' compensation proof unless working alone.",
      "Huntington Beach had 198,711 residents in the 2020 U.S. Census. City sources document communities such as Huntington Harbour, which the City's Harbour Commission advises on alongside its beaches, facilities, and parks, the Oak View community, which the City describes as a square mile area, and Sunset Beach, which is listed among the City's major projects. The City also adopts specific plans for planning districts, including Downtown, Bella Terra, and the Beach-Edinger Corridor. SCAG's local profile, using California Department of Finance data for 2018, counts **81,656 housing units: 47.9% single-family detached, 11.6% attached, 11.8% in buildings of 2 to 4 units, 24.9% in buildings of 5 or more, and 3.8% mobile homes**. The same profile, citing the 2017 American Community Survey, reports that **43.5% of housing was built before 1970**. These figures are dated, so we confirm the equipment, access, and ductwork at the property, and in a multi-unit building we confirm equipment access and placement.",
      "Municipal Code Sec. 8.40.050 sets exterior noise standards by land use. For low-density residential property, the table we read lists **55 dBA Leq from 7 a.m. to 10 p.m.**, with a lower limit at night, and each limit is reduced by 5 dBA for impact, simple tone, speech, or music sounds. The code defines fixed noise sources to include air conditioners and refrigeration equipment, and we did not see a section written only for HVAC equipment. The text we read comes from a third-party code host that may not reflect the most current legislation, so we confirm how the limits apply to your address before choosing a condenser location. The City's noise FAQ says work under a valid City permit may run from 7 a.m. to 7 p.m., Monday through Friday, including Saturday, and not on Sundays or federal holidays.",
      "Replacements are also subject to California's Title 24 energy code, and the 2025 Energy Code applies to permit applications submitted on or after January 1, 2026. For an existing single-family home, the Energy Commission says replacing the outdoor or indoor unit of a split system triggers duct sealing and field verification requirements, and the Certificate of Compliance (CF1R) specifies the required tests. We did not find a Huntington Beach rule that adds to the state requirements, and we confirm what your job needs with the City.",
      "For commercial work, the City's mechanical plan requirements ask for an equipment schedule, a scaled duct layout, air-conditioning condenser locations and equipment access, and Title 24 mechanical calculations for all new HVAC systems. The City's Zoning Code includes IG and IL industrial districts. The City's utility services page lists Southern California Edison for electricity and Southern California Gas Company for natural gas. Incentive programs and funding change, so we link the SCE rebates page and the state program pages rather than quote amounts. Official links are in the card beside this text.",
    ],
    // TODO(copy): the housing card below restates figures already in the second local paragraph; client has not approved it.
    localCards: [
      {
        heading: "Huntington Beach housing snapshot",
        rows: [
          { label: "Residents (2020 Census)", value: "198,711" },
          { label: "Housing units", value: "81,656" },
          { label: "Single-family detached", value: "47.9%" },
          { label: "Single-family attached", value: "11.6%" },
          { label: "Buildings of 2 to 4 units", value: "11.8%" },
          { label: "Buildings of 5 or more units", value: "24.9%" },
          { label: "Mobile homes", value: "3.8%" },
          { label: "Built before 1970", value: "43.5%" },
        ],
        note: "Housing counts: California Department of Finance E-5 data for 2018, and building age: 2017 American Community Survey data, both through SCAG's local profile. Population: 2020 U.S. Census. Figures are citywide and dated.",
      },
    ],
    neighborhoodsHeading: "Official Huntington Beach resources",
    officialResources: [
      {
        text: "Permit Center",
        href: "https://www.huntingtonbeachca.gov/departments/community_development/building_inspection/permit_center/index.php",
        note: "Issues mechanical and other construction permits and points to the HB ACA portal.",
      },
      {
        text: "HB ACA online portal",
        href: "https://aca-prod.accela.com/cohb/Default.aspx",
        note: "Applications, payments, project status, and inspection scheduling.",
      },
      {
        text: "Applications and forms",
        href: "https://www.huntingtonbeachca.gov/departments/community_development/building_inspection/permit_center/applications_forms.php",
        note: "Mechanical Permit Application, Mechanical Plan Requirements, and Mechanical Plan Check Waiver Request.",
      },
      {
        text: "Building Inspection and contractor requirements",
        href: "https://www.huntingtonbeachca.gov/departments/community_development/building_inspection/index.php",
        note: "Business license, State license, workers' compensation, owner-builder rules, and the general office number.",
      },
      {
        text: "Mechanical plan requirements (PDF)",
        href: "https://cms3.revize.com/revize/huntingtonbeachca/Documents/Departments/Community%20Development/Building%20Inspections/Permit%20Centre/Applications%20%26%20Forms/Plan%20Review%20Supplemental%20Forms/Mechanical-Plan-Requirements.pdf",
        note: "City checklist, written mainly for commercial projects.",
      },
      {
        text: "Municipal Code Sec. 8.40.050",
        href: "https://ecode360.com/43796779",
        note: "Exterior noise standards, on a third-party code host.",
      },
      {
        text: "City noise FAQ",
        href: "https://www.huntingtonbeachca.gov/services/report_an_issue/noise_complaint_faq.php",
        note: "Permitted construction and repair hours.",
      },
      {
        text: "Utility services",
        href: "https://www.huntingtonbeachca.gov/services/utility_services.php",
        note: "Electric and natural gas providers listed by the City.",
      },
      {
        text: "SCAG Huntington Beach local profile",
        href: "https://www.scag.ca.gov/sites/default/files/2024-05/huntingtonbeach_localprofile.pdf",
        note: "Housing counts and building age cited on this page.",
      },
      {
        text: "Census QuickFacts",
        href: "https://www.census.gov/quickfacts/huntingtonbeachcitycalifornia",
        note: "2020 Census population cited on this page.",
      },
    ],
    servicesTitle: "Everything we handle for Huntington Beach homes and businesses",
    serviceCards: [
      { slug: "ac-repair", name: "AC Repair", body: "Diagnosis and repair for cooling failures, weak airflow, and unusual noises, with the City's residential noise limits in mind for outdoor units." },
      { slug: "ac-installation", name: "AC Installation & Replacement", body: "New system sizing and installation, planned around the City's Permit Center process and Title 24 requirements." },
      { slug: "ac-maintenance", name: "AC Maintenance", body: "Seasonal AC tune-ups that catch small issues early." },
      { slug: "heating-repair", name: "Heating Repair", body: "Furnace and heating system diagnosis and repair." },
      { slug: "furnace-installation", name: "Furnace Installation & Replacement", body: "New furnace sizing and installation, with the City's permit path confirmed before work starts." },
      { slug: "heat-pump-services", name: "Heat Pump Services", body: "Installation, repair, and maintenance for heat pumps. Incentive availability changes, so we point you to the current program pages." },
      { slug: "ductless-mini-split", name: "Ductless Mini-Split", body: "Room-by-room comfort control for spaces where ductwork is not an option." },
      { slug: "ductwork", name: "Ductwork Services", body: "Duct repair, sealing, replacement, and installation, with Title 24 duct sealing and verification in mind." },
      { slug: "indoor-air-quality", name: "Indoor Air Quality", body: "Air filtration, whole-home purification, and ventilation options." },
      { slug: "emergency-hvac", name: "Emergency HVAC", body: "Dispatch for no-cool and no-heat emergencies in Huntington Beach." },
    ],
    resources: {
      eyebrow: "Know before you start",
      title: "Huntington Beach permits, noise limits, and incentive programs",
      intro: "Official sources for three local items worth checking before a Huntington Beach HVAC project.",
      cards: [
        // TODO(copy): incentive wording not yet client-approved. No dollar amounts on purpose; recheck links before launch.
        {
          amount: "Permit Center",
          description: "Huntington Beach's Permit Center issues mechanical permits, and applications and inspection scheduling run through the HB ACA portal. We do not assume a like-for-like replacement is exempt.",
          linkLabel: "HB ACA portal",
          linkHref: "https://aca-prod.accela.com/cohb/Default.aspx",
        },
        {
          amount: "Noise limits",
          description: "Municipal Code Sec. 8.40.050 sets exterior noise standards by land use, and air conditioners are defined as fixed noise sources. Check it before choosing a condenser location.",
          linkLabel: "Sec. 8.40.050",
          linkHref: "https://ecode360.com/43796779",
        },
        {
          amount: "Incentive programs",
          description: "Rebate terms and funding change, and we do not quote amounts. Confirm which program applies to your address and check current terms before you buy.",
          linkLabel: "SCE rebates page",
          linkHref: "https://www.sce.com/save-money/rebates-financial-assistance",
        },
      ],
    },
    // Nearby row held out: no source names Huntington Beach neighbors. The city page skips the section when this is empty.
    nearby: [],
    proof: {
      heading: "Licensed, reviewed, and ready across Huntington Beach",
      body: "AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.",
      stats: [
        { num: '4.8★', label: 'Google rating' },
        { num: '40', label: 'Google reviews' },
        { num: 'C-20', label: 'California license class' },
        { num: '24/7', label: 'Emergency dispatch' },
      ],
    },
    finalCtaBody: "Call or request service online to schedule a visit anywhere in Huntington Beach. Same-day service is typical, subject to capacity.",
    // TODO(copy): client has not confirmed any FAQ answer below.
    faqs: [
      {
        q: "Does AIRPRO SOLUTIONS service all of Huntington Beach?",
        a: "Yes. AIRPRO SOLUTIONS serves homes and businesses across Huntington Beach as part of our Orange County coverage. Huntington Beach takes permit applications through its HB ACA online portal, so we plan each visit around your specific address.",
        boldLead: "Yes.",
        links: [
          { text: "Orange County coverage", href: "/service-areas/orange-county/" },
        ],
      },
      {
        q: "How fast can a technician reach my Huntington Beach home?",
        a: "Same-day service is typical in Huntington Beach, subject to capacity. Call (323) 776-9047 to confirm a window for your address.",
        boldLead: "Same-day service is typical in Huntington Beach, subject to capacity.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Do I need a permit to replace an AC or furnace in Huntington Beach?",
        a: "Check with the City before work starts. Huntington Beach's Permit Center issues mechanical permits, and applications go through the HB ACA portal. The City's forms page lists a Mechanical Permit Application, Mechanical Plan Requirements, and a Mechanical Plan Check Waiver Request, and it does not say when a waiver applies. The City pages we reviewed state no like-for-like exemption, so we do not assume a replacement is exempt. To ask whether a permit is needed, call the City's general office number at (714) 536-5241. AIRPRO SOLUTIONS can walk you through the steps.",
        boldLead: "Check with the City before work starts.",
        links: [
          { text: "Permit Center", href: "https://www.huntingtonbeachca.gov/departments/community_development/building_inspection/permit_center/index.php" },
          { text: "HB ACA portal", href: "https://aca-prod.accela.com/cohb/Default.aspx" },
          { text: "forms page", href: "https://www.huntingtonbeachca.gov/departments/community_development/building_inspection/permit_center/applications_forms.php" },
        ],
      },
      {
        q: "What does the City require of a contractor who pulls the permit?",
        a: "The City says contractors need a current Huntington Beach business license, the matching State contractor license, and proof of workers' compensation coverage unless working alone. Owner-builders submit an Owner-Builder Verification Form with each application. The City's Building Inspection page also lists online applications and inspection scheduling through HB ACA.",
        boldLead: "The City says contractors need a current Huntington Beach business license, the matching State contractor license, and proof of workers' compensation coverage unless working alone.",
        links: [
          { text: "City's Building Inspection page", href: "https://www.huntingtonbeachca.gov/departments/community_development/building_inspection/index.php" },
        ],
      },
      {
        q: "What does the City ask to see with an HVAC permit?",
        a: "The City's mechanical plan requirements ask for an equipment schedule, a scaled duct layout, air-conditioning condenser locations and equipment access, and Title 24 mechanical calculations for all new HVAC systems. The checklist is written mainly for commercial projects, so what a home replacement needs can differ. Confirm yours with the City at (714) 536-5241.",
        boldLead: "The City's mechanical plan requirements ask for an equipment schedule, a scaled duct layout, air-conditioning condenser locations and equipment access, and Title 24 mechanical calculations for all new HVAC systems.",
        links: [
          { text: "mechanical plan requirements", href: "https://cms3.revize.com/revize/huntingtonbeachca/Documents/Departments/Community%20Development/Building%20Inspections/Permit%20Centre/Applications%20%26%20Forms/Plan%20Review%20Supplemental%20Forms/Mechanical-Plan-Requirements.pdf" },
        ],
      },
      {
        q: "Which building codes apply to HVAC work in Huntington Beach?",
        a: "The City says permits rely on city adopted state building codes as well as on local codes and ordinances. We did not find the City's adoption ordinance or any local mechanical amendments, so we do not state a code edition and we confirm current requirements with the City for your project. The Building Inspection page describes the City's framework.",
        boldLead: "The City says permits rely on city adopted state building codes as well as on local codes and ordinances.",
        links: [
          { text: "Building Inspection page", href: "https://www.huntingtonbeachca.gov/departments/community_development/building_inspection/index.php" },
        ],
      },
      {
        q: "Does Title 24 apply when I replace an AC or furnace in Huntington Beach?",
        a: "Yes, the applicable Title 24 energy requirements apply. California's 2025 Energy Code applies to permit applications submitted on or after January 1, 2026. For an existing single-family home, the Energy Commission says replacing the outdoor or indoor unit of a split system triggers duct sealing and field verification requirements. Depending on the job, that can include duct leakage testing, with limits of 10% total leakage or 7% leakage to outside for existing ducts, refrigerant charge verification for heat pumps, and a Certificate of Compliance (CF1R) that lists the required tests. Not every job needs every test.",
        boldLead: "Yes, the applicable Title 24 energy requirements apply.",
        links: [
          { text: "2025 Energy Code", href: "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/2025-building-energy-efficiency" },
          { text: "Energy Commission", href: "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/energy-code-support-center/hvac-0" },
        ],
      },
      {
        q: "Does Huntington Beach have a noise rule that affects AC equipment?",
        a: "Huntington Beach sets exterior noise standards by land use. Municipal Code Sec. 8.40.050 lists 55 dBA Leq from 7 a.m. to 10 p.m. for low-density residential property, with a lower limit at night, reduced by 5 dBA for impact, simple tone, speech, or music sounds. The code defines fixed noise sources to include air conditioners and refrigeration equipment, and we did not see a section written only for HVAC equipment. The text we read is from a third-party code host that may not reflect the most current legislation, so we confirm how the limits apply to your address before we choose a condenser location.",
        boldLead: "Huntington Beach sets exterior noise standards by land use.",
        links: [
          { text: "Sec. 8.40.050", href: "https://ecode360.com/43796779" },
        ],
      },
      {
        q: "What hours can permitted HVAC work happen in Huntington Beach?",
        a: "The City's noise FAQ allows construction, repair, remodeling, or grading under a valid City permit from 7 a.m. to 7 p.m., Monday through Friday, including Saturday. It says this work is not allowed on Sundays or federal holidays. Call (323) 776-9047 to schedule a visit.",
        boldLead: "The City's noise FAQ allows construction, repair, remodeling, or grading under a valid City permit from 7 a.m. to 7 p.m., Monday through Friday, including Saturday.",
        links: [
          { text: "noise FAQ", href: "https://www.huntingtonbeachca.gov/services/report_an_issue/noise_complaint_faq.php" },
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Do you work in condos and apartment buildings in Huntington Beach?",
        a: "Yes. SCAG's local profile of Huntington Beach, using California Department of Finance data for 2018, counts 81,656 housing units, with 47.9% single-family detached, 11.6% single-family attached, 11.8% in buildings of 2 to 4 units, 24.9% in buildings of 5 or more units, and 3.8% mobile homes. AIRPRO SOLUTIONS services condos, townhomes, and apartments as well as single-family homes, and in a multi-unit building we confirm equipment access and placement at the property. See our Residential HVAC page.",
        boldLead: "Yes.",
        links: [
          { text: "local profile", href: "https://www.scag.ca.gov/sites/default/files/2024-05/huntingtonbeach_localprofile.pdf" },
          { text: "Residential HVAC page", href: "/residential-hvac/" },
        ],
      },
      {
        q: "Does the age of Huntington Beach homes matter for HVAC work?",
        a: "It can, and we confirm it on site. SCAG's local profile, citing the 2017 American Community Survey, reports that 43.5% of Huntington Beach's housing stock was built before 1970. Older homes can mean older equipment, attic access, and ductwork, but those are still property-specific, so we check them at a site visit before recommending repair or replacement.",
        boldLead: "It can, and we confirm it on site.",
      },
      {
        q: "Do you service Huntington Harbour, Oak View, and Sunset Beach?",
        a: "Yes. AIRPRO SOLUTIONS serves homes and businesses across Huntington Beach. City sources document Huntington Harbour, the Oak View community, and Sunset Beach, which is listed among the City's major projects. We plan each visit around the address, including equipment access and placement.",
        boldLead: "Yes.",
        links: [
          { text: "Huntington Harbour", href: "https://www.huntingtonbeachca.gov/government/boards_commissions/harbour_commission.php" },
          { text: "Oak View", href: "https://www.huntingtonbeachca.gov/government/boards_commissions/oak_view_task_force.php" },
          { text: "major projects", href: "https://www.huntingtonbeachca.gov/departments/community_development/major_projects.php" },
        ],
      },
      {
        q: "Who provides electricity and gas in Huntington Beach?",
        a: "The City's utility services page lists Southern California Edison for electricity and Southern California Gas Company for natural gas. Programs, amounts, and funding change, so confirm current eligibility with your utility before scheduling installation.",
        boldLead: "The City's utility services page lists Southern California Edison for electricity and Southern California Gas Company for natural gas.",
        links: [
          { text: "utility services page", href: "https://www.huntingtonbeachca.gov/services/utility_services.php" },
        ],
      },
      {
        q: "Which rebate and incentive pages should I check before buying HVAC equipment in Huntington Beach?",
        a: "Check the utility and state program pages for current terms. We do not quote amounts, because availability and funding change. SCE lists its rebates and programs, SoCalGas lists furnace rebates with its own eligibility requirements, and heat-pump incentives are tracked by TECH Clean California and The Switch Is On. The Energy Commission's notice dated February 24, 2026 says single-family HEEHRA heat pump rebates are fully reserved statewide, with unapproved requests waitlisted. Confirm current eligibility and reservation status before scheduling installation.",
        boldLead: "Check the utility and state program pages for current terms.",
        links: [
          { text: "SCE", href: "https://www.sce.com/save-money/rebates-financial-assistance" },
          { text: "SoCalGas", href: "https://www.socalgas.com/savings/rebates-and-incentives" },
          { text: "TECH Clean California", href: "https://techcleanca.com/incentives/single-family-incentives/" },
          { text: "The Switch Is On", href: "https://switchison.org" },
          { text: "notice dated February 24, 2026", href: "https://www.energy.ca.gov/programs-and-topics/programs/inflation-reduction-act-residential-energy-rebate-programs" },
        ],
      },
      {
        q: "What HVAC services are available in Huntington Beach?",
        a: "AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout Huntington Beach, for both residential and commercial properties.",
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
        q: "Is emergency HVAC service available in Huntington Beach?",
        a: "Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in Huntington Beach. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.",
        boldLead: "Yes.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "How much does HVAC service cost in Huntington Beach?",
        a: "Cost depends on the problem, the equipment, and how accessible the system is. We do not publish one flat price, so call (323) 776-9047 or request service and we will quote your specific system.",
        boldLead: "Cost depends on the problem, the equipment, and how accessible the system is.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Does AIRPRO SOLUTIONS handle commercial HVAC in Huntington Beach?",
        a: "Yes. AIRPRO SOLUTIONS services commercial properties in Huntington Beach, including rooftop units. The City's mechanical plan requirements ask for an equipment schedule, a scaled duct layout, condenser locations and equipment access, and Title 24 mechanical calculations for new HVAC systems, and the City's Zoning Code includes IG and IL industrial districts. We confirm the permit path with the City before work starts. See our Commercial HVAC page for the full scope.",
        boldLead: "Yes.",
        links: [
          { text: "mechanical plan requirements", href: "https://cms3.revize.com/revize/huntingtonbeachca/Documents/Departments/Community%20Development/Building%20Inspections/Permit%20Centre/Applications%20%26%20Forms/Plan%20Review%20Supplemental%20Forms/Mechanical-Plan-Requirements.pdf" },
          { text: "IG and IL industrial districts", href: "https://ecode360.com/43803237" },
          { text: "Commercial HVAC page", href: "/commercial-hvac/" },
        ],
      },
    ],
  },
};

const riversideOverrides: Partial<City> = {
  // TODO(data): add verified climate detail before treating this as a full local page.
  neighborhoods: [], // no official neighborhood pill list was verified; the General Plan's 28 neighborhoods are cited in prose only
  zips: [], // the only official ZIP list is a 2024 grant-eligibility press release (not a service-area or postal list); the ZIP card is held out
  page: {
    metaDescription:
      "HVAC for Riverside homes and businesses, from AC repair to installation. Know the Public Permit Portal and RPU rebates. Licensed, 4.8-star rated.",
    lede:
      "AIRPRO SOLUTIONS provides HVAC services across Riverside, including AC repair, heating repair, installation, and maintenance for homes and businesses.",
    heroCaption: { title: "Riverside, CA", text: "Local HVAC service across Riverside" },
    heroProof: [
      { icon: 'shield', label: "Licensed, bonded & insured" },
      { icon: 'star', label: "4.8-star rated" },
      { icon: 'bolt', label: "24/7 emergency dispatch" },
      { icon: 'building', label: "Residential and commercial" },
    ],
    trustStats: [
      { num: "4.8★", label: "Google rating, 40 reviews" },
      { num: "C-20", label: "California licensed" },
      { num: "24/7", label: "emergency dispatch" },
      { num: "Same-day", label: "service typical" },
    ],
    answer: {
      lead: "AIRPRO SOLUTIONS is a licensed HVAC contractor serving Riverside",
      body:
        ", providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, subject to capacity, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.",
    },
    glance: {
      title: "Riverside at a glance",
      stats: [
        { num: "323,057", label: "residents in the Census Bureau's July 1, 2025 estimate (U.S. Census Bureau QuickFacts)" },
        { num: "64.0%", label: "of 100,515 housing units are single-family detached, and 29.9% are in buildings of 2 or more units (California Department of Finance, 2018, per SCAG)" },
        { num: "39.5%", label: "of housing was built before 1970 (2017 American Community Survey, per SCAG)" },
      ],
      source: "Sources: U.S. Census Bureau QuickFacts and SCAG's local profile of Riverside.",
    },
    localTitle: "Riverside's permit portal, neighborhoods, and noise limits",
    // Held out (no verified source): ZIP card: the only official list (92501, 92503-92509) is a January 2024 City press release about Earthquake Brace + Bolt grant eligibility, not a service-area or postal list; 92521 and 92522 appear only in a 2003 Council report; neighborhood pills and nearby row (no source names neighbors; neighborhoods and nearby stay empty); climate, NOAA and heat figures (no sourced Riverside figure found; the hub's NWS Riverside Municipal Airport figures could not be re-verified); gas provider (no City source names it); RPU rebate dollar amounts (pages are undated; the June 2026 application is dated); any local amendment to the 2025 codes (City page says nothing; Municipal Code Title 16 on Municode would not load); official Municode text of Title 7 noise (page would not load; numbers come from a third-party copy); named employers and employee counts (City employer page shows no data year); Alessandro Heights and Arlanza neighborhood details, 20 specific plans, General Plan land-use categories (cited in the research, not re-read); median year built, humidity and air quality, HOA and historic-district rules, outdoor-unit setbacks; competitor SERP table (every row NOT FOUND in the research).
    // TODO(copy): client has not approved any Riverside wording (every FAQ answer, the five local paragraphs, the noise sentences, the Title 24 sentences, the commercial sentence, the incentive wording). Keep flagged until the user says the client approved. Irvine, Gardena, Anaheim, Costa Mesa and Huntington Beach flags also stay.
    // TODO(copy): confirm with the City (permits page lists (951) 826-5800 for fee information) which permit path each HVAC job needs, and whether AIRPRO SOLUTIONS holds a City of Riverside business license (the City requires one of contractors).
    // TODO(copy): noise text is from a third-party copy of Title 7 on nonoise.org (no current date; latest amendment citations are from 2007). Recheck against the official Municode text before relying on the numbers.
    // Pre-launch recheck: RPU residential and business rebate pages and general program guidelines (pages undated; June 2026 application is dated), City permits page, Public Permit Portal, Bulletin 140, fee schedule, California Building Standards page, Title 7 official text, SCAG profile URL, QuickFacts, General Plan PDF, top employers page, Energy Commission pages.
    localParagraphs: [
      "Riverside's Building & Safety Division issues the City's building permits, and the City's Public Permit Portal lets applicants submit permit applications and electronic plans, pay fees, track progress, and schedule inspections online. Applications can also be made at the Permit Services counter in the One Stop Shop or by mail-in or fax. The City's permits page says a permit is needed to replace an electrical, gas, mechanical, or plumbing system when the work is regulated by code. Its Bulletin 140 on work exempt from permits lists portable cooling units and the replacement of a part that does not alter the equipment's approval, and it lists no like-for-like exemption for a whole unit, so **AIRPRO SOLUTIONS confirms which permit path applies** with the City before work starts. The City says contractors must show proof of licensing that can be verified with the California Contractors State License Board and hold a current City of Riverside business license, and contractors with employees present a workers' compensation certificate when the permit is issued. The City's California Building Standards page lists the 2025 California Building Code, Mechanical Code, and Energy Code, effective January 1, 2026, and it does not describe local amendments.",
      "Riverside had an estimated 323,057 residents on July 1, 2025, up from 314,998 in the 2020 U.S. Census, and QuickFacts reports a 56.8% owner-occupied housing rate for 2020-2024. The City's General Plan identifies 28 neighborhoods, including Downtown, Arlington, La Sierra, Casa Blanca, Canyon Crest, Orangecrest, and Mission Grove, and it calls Downtown, Arlington, and La Sierra historic communities. The City describes Orangecrest, in the most southeasterly portion of the city, as a master planned community of predominantly single-family homes, with a major portion annexed in 1986. SCAG's local profile, using California Department of Finance data for 2018, counts **100,515 housing units: 64.0% single-family detached, 3.9% attached, 6.4% in buildings of 2 to 4 units, 23.5% in buildings of 5 or more, and 2.2% mobile homes**. The same profile, citing the 2017 American Community Survey, reports that **39.5% of housing was built before 1970**. These figures are dated and citywide, so we confirm the equipment, access, and ductwork at the property, and in a multi-unit building we confirm equipment access and placement.",
      "Riverside's Municipal Code Title 7 sets exterior noise standards by land use. For residential property, the copy we read lists **55 dBA from 7 a.m. to 10 p.m. and 45 dBA from 10 p.m. to 7 a.m.** (Sec. 7.25.010), and it defines fixed noise sources to include air conditioners and refrigeration devices (Sec. 7.10.070). We did not see a section written only for new HVAC equipment. Construction and repair work that creates a disturbance across a property line is restricted on weekdays from 7 p.m. to 7 a.m., on Saturdays from 5 p.m. to 8 a.m., and all day on Sundays and federal holidays, with an exception for emergency work (Sec. 7.35.010). The text we read is a third-party copy with no current date, and its latest amendment citations are from 2007, so we confirm how the limits apply to your address before choosing a condenser location. Riverside County's code enforcement says it serves unincorporated areas and refers residents of incorporated cities to local code enforcement, so the City's own code is the one to check.",
      "Replacements are also subject to California's Title 24 energy code, and the 2025 Energy Code applies to permit applications submitted on or after January 1, 2026. For an existing single-family home, the Energy Commission says replacing the outdoor or indoor unit of a split system triggers duct sealing requirements, and field verification and diagnostic testing is prescriptively required for most HVAC alterations. We did not read any Riverside amendment that adds to the state requirements, and we confirm what your job needs with the City.",
      "For commercial work, the City's top employer list includes healthcare systems, universities, school districts, county government, a military installation, retail, and hospitality, so we plan commercial visits around the building and its equipment access. Riverside Public Utilities, which the City describes as providing water and electric service, lists business air conditioning incentives that pay by the ton by efficiency level, with caps that depend on the customer's rate class and a limit of one capped rebate per program per premises each fiscal year. For homes, it lists separate rebates for central AC, electric heat pumps, tune-ups, smart thermostats, and evaporative coolers for its electric customers. Incentive programs and funding change, and RPU's pages say programs can be cancelled, modified, or reduced, so we link the program pages rather than quote amounts. We did not find a City source naming the gas provider, so confirm yours by address. Official links are in the card beside this text.",
    ],
    // TODO(copy): the two cards below restate figures already in the local paragraphs; client has not approved them.
    localCards: [
      {
        heading: "Riverside housing snapshot",
        rows: [
          { label: "Housing units", value: "100,515" },
          { label: "Single-family detached", value: "64.0%" },
          { label: "Single-family attached", value: "3.9%" },
          { label: "Buildings of 2 to 4 units", value: "6.4%" },
          { label: "Buildings of 5 or more units", value: "23.5%" },
          { label: "Mobile homes", value: "2.2%" },
          { label: "Built before 1970", value: "39.5%" },
        ],
        note: "California Department of Finance E-5 data for 2018 and 2017 American Community Survey data, both through SCAG's local profile. Figures are citywide and dated.",
      },
      {
        heading: "Riverside noise and work hours",
        rows: [
          { label: "Residential, 7 a.m. to 10 p.m.", value: "55 dBA" },
          { label: "Residential, 10 p.m. to 7 a.m.", value: "45 dBA" },
          { label: "Restricted work, weekdays", value: "7 p.m. to 7 a.m." },
          { label: "Restricted work, Saturdays", value: "5 p.m. to 8 a.m." },
          { label: "Restricted work, Sundays and federal holidays", value: "All day" },
        ],
        note: "Municipal Code Title 7 (Sec. 7.25.010 and 7.35.010), from a third-party copy with no current date; its latest amendment citations are from 2007. Applies to work that creates a disturbance across a property line, with an exception for emergency work. We did not see a section written only for new HVAC equipment.",
      },
    ],
    neighborhoodsHeading: "Official Riverside resources",
    officialResources: [
      {
        text: "Permits",
        href: "https://riversideca.gov/cedd/building-safety/building-safety-services/permits",
        note: "Permit types, contractor requirements, and the Permit Services counter.",
      },
      {
        text: "Public Permit Portal",
        href: "https://riversideca.gov/cedd/building-safety/online-services/public-permit-portal",
        note: "Applications, electronic plans, fee payments, progress tracking, and inspection scheduling.",
      },
      {
        text: "Bulletin 140: work exempt from permits (PDF)",
        href: "http://riversideca.gov/cedd/sites/riversideca.gov.cedd/files/pdf/building/forms/140_WORK%20EXEMPTED%20FROM%20BUILDING%20PERMITS_V2.0.pdf",
        note: "Mechanical exemptions, including portable cooling units.",
      },
      {
        text: "Permit and plan check fees (PDF)",
        href: "https://riversideca.gov/cedd/sites/riversideca.gov.cedd/files/pdf/building/forms/126_BUILDING-FEES_V2.0.pdf",
        note: "Lists furnaces, air handling units, and air conditioning units as mechanical fee items.",
      },
      {
        text: "California Building Standards",
        href: "https://riversideca.gov/cedd/building-safety/building-codes-design-criteria/california-building-standards",
        note: "The 2025 codes the City lists, effective January 1, 2026.",
      },
      {
        text: "Municipal Code Title 7, noise control",
        href: "https://www.nonoise.org/regulation/ordinance/Riverside,%20California.pdf",
        note: "Exterior noise standards and work hours, on a third-party host.",
      },
      {
        text: "RPU residential HVAC rebates",
        href: "https://riversideca.gov/utilities/residents/rebates/energy-rebates/heat-pump-and-air-conditioning-rebates",
        note: "Central AC, electric heat pump, tune-up, thermostat, and evaporative cooler rebates.",
      },
      {
        text: "RPU business air conditioning incentives",
        href: "https://riversideca.gov/utilities/businesses/rebates/energy-rebates/air-conditioning-incentives",
        note: "Per-ton, thermostat, and tune-up incentives with caps by rate class.",
      },
      {
        text: "General Plan land use and neighborhoods (PDF)",
        href: "https://riversideca.gov/cedd/sites/riversideca.gov.cedd/files/pdf/planning/general-plan/vol2/5-9_Land_Use_Planning.pdf",
        note: "The 28 neighborhoods cited on this page.",
      },
      {
        text: "SCAG Riverside local profile",
        href: "https://www.scag.ca.gov/sites/default/files/2024-05/riverside_localprofile.pdf",
        note: "Housing counts and building age cited on this page.",
      },
      {
        text: "Census QuickFacts",
        href: "https://www.census.gov/quickfacts/riversidecitycalifornia",
        note: "Population and owner-occupied rate cited on this page.",
      },
    ],
    servicesTitle: "Everything we handle for Riverside homes and businesses",
    serviceCards: [
      { slug: "ac-repair", name: "AC Repair", body: "Diagnosis and repair for cooling failures, weak airflow, and unusual noises, with the City's residential noise limits in mind for outdoor units." },
      { slug: "ac-installation", name: "AC Installation & Replacement", body: "New system sizing and installation, planned around the City's Public Permit Portal process and Title 24 requirements." },
      { slug: "ac-maintenance", name: "AC Maintenance", body: "Seasonal AC tune-ups that catch small issues early. RPU lists a tune-up rebate for eligible electric customers." },
      { slug: "heating-repair", name: "Heating Repair", body: "Furnace and heating system diagnosis and repair." },
      { slug: "furnace-installation", name: "Furnace Installation & Replacement", body: "New furnace sizing and installation, with the City's permit path confirmed before work starts." },
      { slug: "heat-pump-services", name: "Heat Pump Services", body: "Installation, repair, and maintenance for heat pumps. RPU lists an electric heat pump rebate for its electric customers, and availability changes, so we point you to the current program page." },
      { slug: "ductless-mini-split", name: "Ductless Mini-Split", body: "Room-by-room comfort control for spaces where ductwork is not an option." },
      { slug: "ductwork", name: "Ductwork Services", body: "Duct repair, sealing, replacement, and installation, with Title 24 duct sealing and verification in mind." },
      { slug: "indoor-air-quality", name: "Indoor Air Quality", body: "Air filtration, whole-home purification, and ventilation options." },
      { slug: "emergency-hvac", name: "Emergency HVAC", body: "Dispatch for no-cool and no-heat emergencies in Riverside." },
    ],
    resources: {
      eyebrow: "Know before you start",
      title: "Riverside permits, noise limits, and incentive programs",
      intro: "Official sources for three local items worth checking before a Riverside HVAC project.",
      cards: [
        // TODO(copy): incentive wording not yet client-approved. No dollar amounts on purpose; recheck links before launch.
        {
          amount: "Public Permit Portal",
          description: "Riverside's Public Permit Portal accepts permit applications and electronic plans, fee payments, and inspection scheduling. The City's Bulletin 140 lists no like-for-like exemption for a whole unit, so we do not assume a replacement is exempt.",
          linkLabel: "Public Permit Portal",
          linkHref: "https://riversideca.gov/cedd/building-safety/online-services/public-permit-portal",
        },
        {
          amount: "Noise limits",
          description: "Riverside's Municipal Code Title 7 sets exterior noise standards by land use and defines air conditioners as fixed noise sources. Check it before choosing a condenser location.",
          linkLabel: "Title 7 (third-party copy)",
          linkHref: "https://www.nonoise.org/regulation/ordinance/Riverside,%20California.pdf",
        },
        {
          amount: "Incentive programs",
          description: "Riverside Public Utilities lists rebates for central AC, electric heat pumps, tune-ups, and smart thermostats for its electric customers. Terms and funding change, and we do not quote amounts, so check the current terms before you buy.",
          linkLabel: "RPU rebates",
          linkHref: "https://riversideca.gov/utilities/residents/rebates/energy-rebates/heat-pump-and-air-conditioning-rebates",
        },
      ],
    },
    // Nearby row held out: no source names Riverside neighbors. The city page skips the section when this is empty.
    nearby: [],
    proof: {
      heading: "Licensed, reviewed, and ready across Riverside",
      body: "AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.",
      stats: [
        { num: "4.8★", label: "Google rating" },
        { num: "40", label: "Google reviews" },
        { num: "C-20", label: "California license class" },
        { num: "24/7", label: "Emergency dispatch" },
      ],
    },
    finalCtaBody: "Call or request service online to schedule a visit anywhere in Riverside. Same-day service is typical, subject to capacity.",
    // TODO(copy): client has not confirmed any FAQ answer below.
    faqs: [
      {
        q: "Does AIRPRO SOLUTIONS service all of Riverside?",
        a: "Yes. AIRPRO SOLUTIONS serves homes and businesses across Riverside as part of our Inland Empire coverage. Riverside takes permit applications through its Public Permit Portal, so we plan each visit around your specific address.",
        boldLead: "Yes.",
        links: [
          { text: "Inland Empire coverage", href: "/service-areas/inland-empire/" },
          { text: "Public Permit Portal", href: "https://riversideca.gov/cedd/building-safety/online-services/public-permit-portal" },
        ],
      },
      {
        q: "How fast can a technician reach my Riverside home?",
        a: "Same-day service is typical in Riverside, subject to capacity. Call (323) 776-9047 to confirm a window for your address.",
        boldLead: "Same-day service is typical in Riverside, subject to capacity.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Do I need a permit to replace an AC or furnace in Riverside?",
        a: "Check with the City before work starts. The City's permits page says a permit is needed to replace an electrical, gas, mechanical, or plumbing system when the work is regulated by code, and applications go through the Public Permit Portal or the Permit Services counter. Bulletin 140 on work exempt from permits lists portable cooling units and replacing a part that does not alter the equipment's approval, and it lists no like-for-like exemption for a whole unit, so we do not assume a replacement is exempt. The permits page lists (951) 826-5800 for fee information. AIRPRO SOLUTIONS can walk you through the steps.",
        boldLead: "Check with the City before work starts.",
        links: [
          { text: "permits page", href: "https://riversideca.gov/cedd/building-safety/building-safety-services/permits" },
          { text: "Public Permit Portal", href: "https://riversideca.gov/cedd/building-safety/online-services/public-permit-portal" },
          { text: "Bulletin 140", href: "http://riversideca.gov/cedd/sites/riversideca.gov.cedd/files/pdf/building/forms/140_WORK%20EXEMPTED%20FROM%20BUILDING%20PERMITS_V2.0.pdf" },
        ],
      },
      {
        q: "What does the City require of a contractor who pulls the permit?",
        a: "The City says contractors must show proof of licensing that can be verified with the California Contractors State License Board and hold a current City of Riverside business license. Contractors with employees present a workers' compensation certificate when the permit is issued, and permits can go to the property owner, an authorized agent, or an appropriately licensed contractor. Details are on the City's permits page.",
        boldLead: "The City says contractors must show proof of licensing that can be verified with the California Contractors State License Board and hold a current City of Riverside business license.",
        links: [
          { text: "permits page", href: "https://riversideca.gov/cedd/building-safety/building-safety-services/permits" },
        ],
      },
      {
        q: "How do I apply for an HVAC permit in Riverside?",
        a: "Use the City's Public Permit Portal or the Permit Services counter. The portal accepts permit applications and electronic plans, fee payments, progress tracking, and inspection scheduling, and the City also takes mail-in and fax applications. Some projects need plan review, and the City's same-day permit examples are simple water heater change outs, residential service meter upgrades, reroofs, re-stucco, and simple patio covers, so we confirm the path for an HVAC job with the City. The City's fee schedule lists furnaces, air handling units, and air conditioning units as mechanical fee items, and we do not quote fees.",
        boldLead: "Use the City's Public Permit Portal or the Permit Services counter.",
        links: [
          { text: "Public Permit Portal", href: "https://riversideca.gov/cedd/building-safety/online-services/public-permit-portal" },
          { text: "fee schedule", href: "https://riversideca.gov/cedd/sites/riversideca.gov.cedd/files/pdf/building/forms/126_BUILDING-FEES_V2.0.pdf" },
        ],
      },
      {
        q: "Which building codes apply to HVAC work in Riverside?",
        a: "The City's California Building Standards page lists the 2025 California Building Code, Mechanical Code, and Energy Code, effective January 1, 2026. The page does not describe local amendments, and we have not read the City's Municipal Code amendments, so we confirm current requirements with the City for your project.",
        boldLead: "The City's California Building Standards page lists the 2025 California Building Code, Mechanical Code, and Energy Code, effective January 1, 2026.",
        links: [
          { text: "California Building Standards page", href: "https://riversideca.gov/cedd/building-safety/building-codes-design-criteria/california-building-standards" },
        ],
      },
      {
        q: "Does Title 24 apply when I replace an AC or furnace in Riverside?",
        a: "Yes, the applicable Title 24 energy requirements apply. California's 2025 Energy Code applies to permit applications submitted on or after January 1, 2026. For an existing single-family home, the Energy Commission says replacing the outdoor or indoor unit of a split system triggers duct sealing requirements, and field verification and diagnostic testing is prescriptively required for most HVAC alterations. Depending on the job, that can include duct leakage testing, with limits of 10% total leakage or 7% leakage to outside for existing ducts, and refrigerant charge verification for heat pumps. Not every job needs every test.",
        boldLead: "Yes, the applicable Title 24 energy requirements apply.",
        links: [
          { text: "2025 Energy Code", href: "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/2025-building-energy-efficiency" },
          { text: "Energy Commission", href: "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/energy-code-support-center/hvac-0" },
        ],
      },
      {
        q: "Does Riverside have a noise rule that affects AC equipment?",
        a: "Riverside sets exterior noise standards by land use. The Municipal Code copy we read lists 55 dBA from 7 a.m. to 10 p.m. and 45 dBA from 10 p.m. to 7 a.m. for residential property (Sec. 7.25.010), and it defines fixed noise sources to include air conditioners and refrigeration devices (Sec. 7.10.070). We did not see a section written only for new HVAC equipment. The text is a third-party copy with no current date, so we confirm how the limits apply to your address before we choose a condenser location. Riverside County's code enforcement serves unincorporated areas, so the City's code is the one to check.",
        boldLead: "Riverside sets exterior noise standards by land use.",
        links: [
          { text: "Municipal Code copy", href: "https://www.nonoise.org/regulation/ordinance/Riverside,%20California.pdf" },
          { text: "Riverside County's code enforcement", href: "https://ce.rctlma.org/faqs" },
        ],
      },
      {
        q: "What hours can HVAC work happen in Riverside?",
        a: "The Municipal Code copy we read restricts construction, repair, and similar work that creates a disturbance across a property line on weekdays from 7 p.m. to 7 a.m. and on Saturdays from 5 p.m. to 8 a.m., and it allows none on Sundays or federal holidays (Sec. 7.35.010), with an exception for emergency work. The text is a third-party copy, so we confirm current hours with the City. Call (323) 776-9047 to schedule a visit.",
        boldLead: "The Municipal Code copy we read restricts construction, repair, and similar work that creates a disturbance across a property line on weekdays from 7 p.m. to 7 a.m. and on Saturdays from 5 p.m. to 8 a.m., and it allows none on Sundays or federal holidays (Sec. 7.35.010), with an exception for emergency work.",
        links: [
          { text: "Municipal Code copy", href: "https://www.nonoise.org/regulation/ordinance/Riverside,%20California.pdf" },
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Do you work in condos and apartment buildings in Riverside?",
        a: "Yes. SCAG's local profile of Riverside, using California Department of Finance data for 2018, counts 100,515 housing units, with 64.0% single-family detached, 3.9% single-family attached, 6.4% in buildings of 2 to 4 units, 23.5% in buildings of 5 or more units, and 2.2% mobile homes. AIRPRO SOLUTIONS services condos, townhomes, and apartments as well as single-family homes, and in a multi-unit building we confirm equipment access and placement at the property. See our Residential HVAC page.",
        boldLead: "Yes.",
        links: [
          { text: "local profile", href: "https://www.scag.ca.gov/sites/default/files/2024-05/riverside_localprofile.pdf" },
          { text: "Residential HVAC page", href: "/residential-hvac/" },
        ],
      },
      {
        q: "Does the age of Riverside homes matter for HVAC work?",
        a: "It can, and we confirm it on site. SCAG's local profile, citing the 2017 American Community Survey, reports that 39.5% of Riverside's housing stock was built before 1970, and the City's General Plan calls Downtown, Arlington, and La Sierra historic communities. Older homes can mean older equipment, attic access, and ductwork, but those are still property-specific, so we check them at a site visit before recommending repair or replacement.",
        boldLead: "It can, and we confirm it on site.",
        links: [
          { text: "local profile", href: "https://www.scag.ca.gov/sites/default/files/2024-05/riverside_localprofile.pdf" },
          { text: "General Plan", href: "https://riversideca.gov/cedd/sites/riversideca.gov.cedd/files/pdf/planning/general-plan/vol2/5-9_Land_Use_Planning.pdf" },
        ],
      },
      {
        q: "Do you service Orangecrest, La Sierra, Downtown, and Mission Grove?",
        a: "Yes. AIRPRO SOLUTIONS serves homes and businesses across Riverside. The City's General Plan identifies 28 neighborhoods, including Downtown, Arlington, La Sierra, Casa Blanca, Canyon Crest, Orangecrest, and Mission Grove, and the City describes Orangecrest as a master planned community of predominantly single-family homes. We plan each visit around the address, including equipment access and placement.",
        boldLead: "Yes.",
        links: [
          { text: "General Plan", href: "https://riversideca.gov/cedd/sites/riversideca.gov.cedd/files/pdf/planning/general-plan/vol2/5-9_Land_Use_Planning.pdf" },
          { text: "master planned community", href: "https://riversideca.gov/athomeinriverside/neighborhoods-orangecrest.asp" },
        ],
      },
      {
        q: "Who provides electricity and gas in Riverside?",
        a: "The City describes Riverside Public Utilities as providing water and electric service in Riverside. Confirm your electric provider on your bill before counting on an RPU program, and confirm your gas provider by address, because we did not find a City source naming it. Programs, amounts, and funding change, so confirm current eligibility with your utility before scheduling installation.",
        boldLead: "The City describes Riverside Public Utilities as providing water and electric service in Riverside.",
        links: [
          { text: "Riverside Public Utilities", href: "https://riversideca.gov/utilities/residents" },
        ],
      },
      {
        q: "Which rebate and incentive pages should I check before buying HVAC equipment in Riverside?",
        a: "Check Riverside Public Utilities for current terms. RPU lists residential rebates for central air conditioners, electric heat pumps, HVAC tune-ups, smart thermostats, and evaporative coolers. Under its general program guidelines, the incentive is paid to the electric customer of record for new equipment only, and new construction does not qualify. The HVAC rebate page asks for a new matched condenser and evaporator coil listed together in the AHRI Directory for split systems, asks for applications within 90 days of purchase, and says the program is subject to fund availability and may be cancelled at any time. RPU's pages use SEER ratings, so confirm the rating thresholds with RPU. We do not quote amounts.",
        boldLead: "Check Riverside Public Utilities for current terms.",
        links: [
          { text: "Riverside Public Utilities", href: "https://riversideca.gov/utilities/residents/rebates/energy-rebates/heat-pump-and-air-conditioning-rebates" },
          { text: "general program guidelines", href: "https://riversideca.gov/utilities/residents/rebates/energy-rebates/general-program-guidelines" },
        ],
      },
      {
        q: "What HVAC services are available in Riverside?",
        a: "AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout Riverside, for both residential and commercial properties.",
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
        q: "Is emergency HVAC service available in Riverside?",
        a: "Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in Riverside. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.",
        boldLead: "Yes.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "How much does HVAC service cost in Riverside?",
        a: "Cost depends on the problem, the equipment, and how accessible the system is. We do not publish one flat price, so call (323) 776-9047 or request service and we will quote your specific system.",
        boldLead: "Cost depends on the problem, the equipment, and how accessible the system is.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Does AIRPRO SOLUTIONS handle commercial HVAC in Riverside?",
        a: "Yes. AIRPRO SOLUTIONS services commercial properties in Riverside, including rooftop units. The City's top employer list includes healthcare systems, universities, school districts, county government, a military installation, retail, and hospitality, and Riverside Public Utilities lists business air conditioning incentives that pay by the ton by efficiency level, with caps that depend on the customer's rate class and a matching evaporator coil required. We do not quote amounts, and we confirm the permit path with the City before work starts. See our Commercial HVAC page for the full scope.",
        boldLead: "Yes.",
        links: [
          { text: "top employer list", href: "https://riversideca.gov/cedd/economic-development/data-reports/top-employers" },
          { text: "business air conditioning incentives", href: "https://riversideca.gov/utilities/businesses/rebates/energy-rebates/air-conditioning-incentives" },
          { text: "Commercial HVAC page", href: "/commercial-hvac/" },
        ],
      },
    ],
  },
};

const ontarioOverrides: Partial<City> = {
  // TODO(data): add verified climate detail before treating this as a full local page.
  neighborhoods: [], // no official neighborhood list was verified (only a third-party ZIP site names neighbors); nothing is shown
  zips: [], // ZIP list held out: sources were Wikipedia, a third-party aggregator and an unreadable court PDF; the CEQA record lists project metadata, not a postal list
  page: {
    metaDescription:
      "HVAC for Ontario homes and businesses, from AC repair to installation. Know the City's permit steps and noise rules. Licensed, 4.8-star rated.",
    lede:
      "AIRPRO SOLUTIONS provides HVAC services across Ontario, including Ontario Ranch and the airport area, with AC repair, heating repair, installation, and maintenance for homes and businesses.",
    heroCaption: { title: "Ontario, CA", text: "Local HVAC service across Ontario" },
    heroProof: [
      { icon: "shield", label: "Licensed, bonded & insured" },
      { icon: "star", label: "4.8-star rated" },
      { icon: "bolt", label: "24/7 emergency dispatch" },
      { icon: "building", label: "Residential and commercial" },
    ],
    trustStats: [
      { num: "4.8★", label: "Google rating, 40 reviews" },
      { num: "C-20", label: "California licensed" },
      { num: "24/7", label: "emergency dispatch" },
      { num: "Same-day", label: "service typical" },
    ],
    answer: {
      lead: "AIRPRO SOLUTIONS is a licensed HVAC contractor serving Ontario",
      body:
        ", providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, subject to capacity, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.",
    },
    glance: {
      title: "Ontario at a glance",
      stats: [
        { num: "187,013", label: "residents in the Census Bureau's July 1, 2025 estimate (U.S. Census Bureau QuickFacts)" },
        { num: "59.0%", label: "of 49,648 housing units are single-family detached, and 30.3% are in buildings of 2 or more units (California Department of Finance, 2018, per SCAG)" },
        { num: "36.1%", label: "of housing was built before 1970 (American Community Survey, per SCAG)" },
      ],
      source: "Sources: U.S. Census Bureau QuickFacts and SCAG's local profile of Ontario.",
    },
    localTitle: "Ontario's permit rules, Ontario Ranch, and noise limits",
    // Held out (no verified source): ZIP card: the research's list (91758, 91761, 91762, 91764) was cited to Wikipedia and a third-party aggregator, and the follow-up court filing-venue PDF returned no readable text; the CEQA record that lists six ZIPs is project location metadata, not a postal or service-area list; neighborhood pills and nearby row (the only neighbor list is a third-party ZIP site; neighborhoods and nearby stay empty); Ontario Mills, Holt Boulevard, Toyota Arena, Convention Center and Downtown Ontario landmarks (the City pages read do not mention them); climate, NOAA and heat figures including the hub's Ontario 114F on September 6, 2024 and the 93 to 95F late-summer normals (no sourced Ontario figure found); South Coast AQMD and Ontario's air-basin membership (the AQMD page names San Bernardino County but not Ontario); City permit trigger for like-for-like replacement, any HVAC permit checklist, contractor and business-license requirement, local code amendments and the current adopted code edition (Applicable Codes page is undated and lists 2022 editions); official Municipal Code text of Chapter 29 noise (not found; numbers come from a third-party copy); fixed noise source definition for air conditioners; outdoor-unit setbacks, historic and HOA rules; median year built, humidity, decade-by-decade housing age (the SCAG chart values have no bin labels); single-family, multifamily and commercial split beyond the SCAG DOF table; SCE and SoCalGas rebate dollar amounts; competitor SERP table (gap analysis only).
    // TODO(copy): client has not approved any Ontario wording (every FAQ answer, the five local paragraphs, the noise sentences, the Title 24 sentences, the commercial sentence, the incentive wording). Keep flagged until the user says the client approved.
    // TODO(copy): confirm with the City which permit path each HVAC job needs (Building Department lists (909) 395-2023 for plan check and counter services).
    // TODO(copy): noise text is from a third-party copy of Title 5, Chapter 29 on nonoise.org (undated; cites Ord. 2888, effective March 6, 2008). Recheck against the official Municipal Code before relying on the numbers.
    // Pre-launch recheck: Applicable Codes page, fee schedule, online permitting portal, Building Permit FAQs, Chapter 5 (Aug 18, 2026 revision exists) and Chapter 6, Euclid plan guidelines, SCE and SoCalGas rebate pages, Ontario Ranch and logistics pages, SCAG profile URL, QuickFacts.
    localParagraphs: [
      "Ontario's Building Department provides plan review and inspection services, and the City's online permitting portal lets applicants apply for permits, upload plans, and pay fees after staff review. The Building Department also offers appointments and counter service at City Hall, 303 East B Street, and lists (909) 395-2023 for plan check and counter services. The City's Building Permit FAQs say no permit is required for portable comfort-cooling or evaporative cooler equipment, and the City's fee schedule, as of July 1, 2026, lists mechanical permit fees for furnaces, air handler units, evaporative coolers, wall heaters, and mini splits, with flat-fee reviews for single-family and multi-family homes. We did not find a City rule or exemption that addresses replacing a whole air conditioner or furnace like for like, so **AIRPRO SOLUTIONS confirms which permit path applies** with the City before work starts. The City's Applicable Codes page lists 2022 editions of the California Mechanical Code and Energy Code, among others, for plans filed on or after January 1, 2023, and the page is undated, so we confirm which edition applies to your project. We did not read any local amendments.",
      "Ontario had an estimated 187,013 residents on July 1, 2025, up from 175,265 in the 2020 U.S. Census, and QuickFacts reports a 58.0% owner-occupied housing rate for 2020-2024. The City's economic development site describes Ontario Ranch as a 13-square-mile master-planned community planned for 69,000 residential units at completion, with 1,200 new homes built in 2023, so Ontario's housing includes new construction as well as older homes. SCAG's local profile, using California Department of Finance data for 2018, counts **49,648 housing units: 59.0% single-family detached, 6.3% attached, 10.2% in buildings of 2 to 4 units, 20.1% in buildings of 5 or more, and 4.4% mobile homes**. The same profile, citing the American Community Survey, reports that **36.1% of housing was built before 1970**. The City's Ontario Ranch page is undated and the SCAG figures are dated and citywide, so we confirm the equipment, access, and ductwork at the property, and in a multi-unit building we confirm equipment access and placement.",
      "Ontario's Development Code points to Title 5, Chapter 29 of the Municipal Code for noise. The third-party copy we read lists exterior limits for single-family residential property of **65 dBA from 7 a.m. to 10 p.m. and 45 dBA from 10 p.m. to 7 a.m.**, and 65 dBA by day and 50 dBA at night for multi-family residential (Sec. 5-29.04). It says that when ambient noise exceeds a standard, the ambient level becomes the standard, and it does not mention air conditioners, so we did not find a rule written only for HVAC equipment. Construction activity noise is limited to weekdays from 7 a.m. to 6 p.m. and Saturdays and Sundays from 9 a.m. to 6 p.m., with exceptions including emergency work (Sec. 5-29.09). The copy cites Ord. 2888, effective March 6, 2008, comes from a host that is not the City, and has no current date, so we confirm how the limits apply to your address before choosing a condenser location.",
      "For equipment placement, the December 3, 2024 revision of Ontario's Development Code that we read sets screening standards for residential districts: for single-family dwellings, **new exterior roof-mounted mechanical, heating and air conditioning equipment is prohibited**, and for multiple-family development, roof-mounted equipment must be completely screened from public view by parapet walls or roof screens (Sec. 6.01.010). We did not confirm how those standards apply to replacing existing equipment, so we check placement with the City. Development Plan applications ask for the location of roof-mounted mechanical equipment and equipment screens, and the Euclid Mixed-Use Specific Plan in Ontario Ranch calls for screening ground- and roof-mounted mechanical equipment from public view. Replacements are also subject to California's Title 24 energy code, and the 2025 Energy Code applies to permit applications submitted on or after January 1, 2026. For an existing single-family home, the Energy Commission says replacing the outdoor or indoor unit of a split system triggers duct sealing requirements, and field verification and diagnostic testing is prescriptively required for most HVAC alterations.",
      "For commercial work, the City's economic development site reports that Ontario International Airport served 6.5 million passengers in 2023 and handled over 750,000 tons of freight, lists logistics and distribution among its target industries, and shows Ontario Ranch planning 12 million square feet of commercial and office space and 31 million square feet of industrial space, so we plan commercial visits around the building and its rooftop or ground equipment access. The City's contact pages name Southern California Edison for electric service and Southern California Gas Company for gas, and eligibility for a program follows your utility account, so confirm both on your bill. SCE's rebates page lists Golden State Rebates coupons for air conditioners and smart thermostats and a Smart Energy Program bill credit, and SoCalGas lists a rebate for qualifying gas furnaces. Programs and funding change, so we link the program pages rather than quote amounts. Official links are in the card beside this text.",
    ],
    // TODO(copy): the card below restates figures already in the second and fifth local paragraphs; client has not approved it.
    localCards: [
      {
        heading: "Ontario Ranch and the airport",
        rows: [
          { label: "Ontario Ranch size", value: "13 square miles" },
          { label: "Planned residential units", value: "69,000 at completion" },
          { label: "New homes built in 2023", value: "1,200" },
          { label: "Planned commercial and office space", value: "12 million square feet" },
          { label: "Planned industrial space", value: "31 million square feet" },
          { label: "Airport passengers, 2023", value: "6.5 million" },
          { label: "Airport freight, 2023", value: "Over 750,000 tons" },
        ],
        note: "From the City's economic development pages, which are undated. Figures are as the City reports them.",
      },
    ],
    neighborhoodsHeading: "Official Ontario resources",
    officialResources: [
      {
        text: "Building Department",
        href: "https://www.ontarioca.gov/government/community-development/building",
        note: "Plan review, inspections, counter services, and contact numbers.",
      },
      {
        text: "Building Permit FAQs",
        href: "https://www.ontarioca.gov/government/community-development/building/general-requirements/building-permit-faqs",
        note: "Lists portable comfort-cooling and evaporative cooler equipment as not needing a permit.",
      },
      {
        text: "Applicable Codes",
        href: "https://ontarioca.gov/node/137",
        note: "Code editions the City lists for plans filed on or after January 1, 2023 (undated page).",
      },
      {
        text: "Citywide fee schedule (PDF)",
        href: "https://content.ontarioca.gov/sites/default/files/2026-06/FY%202026-27%20Citywide%20Fee%20Schedule%2007.01.26.pdf",
        note: "Mechanical permit fee items, as of July 1, 2026.",
      },
      {
        text: "Online permitting portal guide (PDF)",
        href: "https://content.ontarioca.gov/sites/default/files/2026-03/ACA%20User%20Guide%20-%203.9.2026.pdf",
        note: "How to apply, upload plans, and pay fees online.",
      },
      {
        text: "Development Code Chapter 6 (PDF)",
        href: "https://content.ontarioca.gov/sites/default/files/2025-01/Chapter%206.0%20-%20Development%20%26%20Subdivision%20Regs_Rev%2012-03-2024.pdf",
        note: "Equipment screening in residential districts (December 2024 revision).",
      },
      {
        text: "Euclid Mixed-Use Specific Plan guidelines (PDF)",
        href: "https://content.ontarioca.gov/sites/default/files/2025-01/EMUSP_Ch5_Design%20Guidelines.pdf",
        note: "Mechanical equipment screening in that Ontario Ranch plan area.",
      },
      {
        text: "Municipal Code Title 5, Chapter 29, noise",
        href: "https://nonoise.org/regulation/ordinance/Ontario,%20California.pdf",
        note: "Exterior noise standards and construction hours, on a third-party host.",
      },
      {
        text: "City utility contacts",
        href: "https://www.ontariothinksbusiness.com/node/71",
        note: "Names the electric and gas utilities.",
      },
      {
        text: "SCE rebates",
        href: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace",
        note: "Golden State Rebates coupons, Smart Energy Program, and Home Performance Plus.",
      },
      {
        text: "SoCalGas rebates",
        href: "https://www.socalgas.com/savings/rebates-and-incentives",
        note: "Natural gas furnace rebate and program terms.",
      },
      {
        text: "Ontario Ranch",
        href: "https://www.ontariothinksbusiness.com/develop-ontario/district-information/ontario-ranch",
        note: "Size, planned units, and 2023 new-home figures cited on this page.",
      },
      {
        text: "Logistics and distribution",
        href: "https://www.ontariothinksbusiness.com/develop-ontario/target-industries/logistics-distribution",
        note: "Airport passenger and freight figures cited on this page.",
      },
      {
        text: "SCAG Ontario local profile",
        href: "https://sp.scag.ca.gov/sites/default/files/2024-05/ontario_localprofile.pdf",
        note: "Housing counts and building age cited on this page.",
      },
      {
        text: "Census QuickFacts",
        href: "https://www.census.gov/quickfacts/fact/table/ontariocitycalifornia/PST045224",
        note: "Population and owner-occupied rate cited on this page.",
      },
    ],
    servicesTitle: "Everything we handle for Ontario homes and businesses",
    serviceCards: [
      { slug: "ac-repair", name: "AC Repair", body: "Diagnosis and repair for cooling failures, weak airflow, and unusual noises, with the limits in the City's Municipal Code in mind for outdoor units." },
      { slug: "ac-installation", name: "AC Installation & Replacement", body: "New system sizing and installation, planned around the City's permit process, equipment screening standards, and Title 24 requirements." },
      { slug: "ac-maintenance", name: "AC Maintenance", body: "Seasonal AC tune-ups that catch small issues early, for homes and for commercial rooftop and ground units." },
      { slug: "heating-repair", name: "Heating Repair", body: "Furnace and heating system diagnosis and repair. The City's contact pages name Southern California Gas Company as the gas utility." },
      { slug: "furnace-installation", name: "Furnace Installation & Replacement", body: "New furnace sizing and installation, with the City's permit path confirmed before work starts. SoCalGas lists a gas furnace rebate, and funding changes, so we point you to the current program page." },
      { slug: "heat-pump-services", name: "Heat Pump Services", body: "Installation, repair, and maintenance for heat pumps. Heat pump work starts with your electric utility, which the City's contact pages list as SCE, and incentive programs change." },
      { slug: "ductless-mini-split", name: "Ductless Mini-Split", body: "Room-by-room comfort control for spaces where ductwork is not an option. The City's fee schedule lists a mini split base fee." },
      { slug: "ductwork", name: "Ductwork Services", body: "Duct repair, sealing, replacement, and installation, with Title 24 duct sealing and verification in mind." },
      { slug: "indoor-air-quality", name: "Indoor Air Quality", body: "Air filtration, whole-home purification, and ventilation options." },
      { slug: "emergency-hvac", name: "Emergency HVAC", body: "Dispatch for no-cool and no-heat emergencies in Ontario." },
    ],
    resources: {
      eyebrow: "Know before you start",
      title: "Ontario permits, noise limits, and incentive programs",
      intro: "Official sources for three local items worth checking before an Ontario HVAC project.",
      cards: [
        // TODO(copy): incentive wording not yet client-approved. No dollar amounts on purpose; recheck links before launch.
        {
          amount: "Permits and codes",
          description: "Ontario's Building Department provides plan review and inspection, and the City's fee schedule lists mechanical permit items. We found no City rule on replacing a whole unit like for like, so we do not assume a replacement is exempt.",
          linkLabel: "Building Department",
          linkHref: "https://www.ontarioca.gov/government/community-development/building",
        },
        {
          amount: "Noise limits",
          description: "Title 5, Chapter 29 of Ontario's Municipal Code sets exterior noise standards by land use. The copy we read does not mention air conditioners, so check it before choosing a condenser location.",
          linkLabel: "Noise code (third-party copy)",
          linkHref: "https://nonoise.org/regulation/ordinance/Ontario,%20California.pdf",
        },
        {
          amount: "Incentive programs",
          description: "SCE and SoCalGas list HVAC-related programs for their customers, including Golden State Rebates coupons, a Smart Energy Program bill credit, and a gas furnace rebate. Terms and funding change, and we do not quote amounts, so check the current terms before you buy.",
          linkLabel: "SCE rebates",
          linkHref: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace",
        },
      ],
    },
    nearby: [],
    proof: {
      heading: "Licensed, reviewed, and ready across Ontario",
      body: "AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.",
      stats: [
        { num: "4.8★", label: "Google rating" },
        { num: "40", label: "Google reviews" },
        { num: "C-20", label: "California license class" },
        { num: "24/7", label: "Emergency dispatch" },
      ],
    },
    finalCtaBody: "Call or request service online to schedule a visit anywhere in Ontario. Same-day service is typical, subject to capacity.",
    // TODO(copy): client has not confirmed any FAQ answer below.
    faqs: [
      {
        q: "Does AIRPRO SOLUTIONS service all of Ontario?",
        a: "Yes. AIRPRO SOLUTIONS serves homes and businesses across Ontario as part of our Inland Empire coverage. Ontario's Building Department handles permits, so we plan each visit around your specific address.",
        boldLead: "Yes.",
        links: [
          { text: "Inland Empire coverage", href: "/service-areas/inland-empire/" },
          { text: "Building Department", href: "https://www.ontarioca.gov/government/community-development/building" },
        ],
      },
      {
        q: "How fast can a technician reach my Ontario home?",
        a: "Same-day service is typical in Ontario, subject to capacity. Call (323) 776-9047 to confirm a window for your address.",
        boldLead: "Same-day service is typical in Ontario, subject to capacity.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Do I need a permit to replace an AC or furnace in Ontario?",
        a: "Check with the City before work starts. Ontario's Building Department issues permits, and its Building Permit FAQs say no permit is required for portable comfort-cooling or evaporative cooler equipment. The City's fee schedule lists mechanical permit fees, including furnaces, air handler units, and mini splits, but we found no City rule or exemption that addresses replacing a whole air conditioner or furnace like for like, so we do not assume a replacement is exempt. The Building Department lists (909) 395-2023 for plan check and counter services. AIRPRO SOLUTIONS can walk you through the steps.",
        boldLead: "Check with the City before work starts.",
        links: [
          { text: "Building Permit FAQs", href: "https://www.ontarioca.gov/government/community-development/building/general-requirements/building-permit-faqs" },
          { text: "fee schedule", href: "https://content.ontarioca.gov/sites/default/files/2026-06/FY%202026-27%20Citywide%20Fee%20Schedule%2007.01.26.pdf" },
        ],
      },
      {
        q: "How do I apply for an HVAC permit in Ontario?",
        a: "Use the City's online permitting portal or the Building Department counter. The portal's user guide says applicants can apply for permits, upload plans, and pay fees after staff review, and the Building Department also offers appointments and counter service at City Hall, 303 East B Street. The City's fee schedule lists a mechanical permit issuance fee and flat-fee reviews for single-family and multi-family homes, and we do not quote fees. We did not find a City list of HVAC permit types or a checklist for an equipment changeout, so we confirm the path with the City.",
        boldLead: "Use the City's online permitting portal or the Building Department counter.",
        links: [
          { text: "online permitting portal", href: "https://content.ontarioca.gov/sites/default/files/2026-03/ACA%20User%20Guide%20-%203.9.2026.pdf" },
          { text: "fee schedule", href: "https://content.ontarioca.gov/sites/default/files/2026-06/FY%202026-27%20Citywide%20Fee%20Schedule%2007.01.26.pdf" },
        ],
      },
      {
        q: "Which building codes apply to HVAC work in Ontario?",
        a: "The City's Applicable Codes page lists 2022 editions of the California Building, Mechanical, and Energy Codes for plans filed on or after January 1, 2023. The page is undated, and California's 2025 Energy Code applies to permit applications submitted on or after January 1, 2026, so we confirm which edition applies to your project with the City. We did not read any local amendments.",
        boldLead: "The City's Applicable Codes page lists 2022 editions of the California Building, Mechanical, and Energy Codes for plans filed on or after January 1, 2023.",
        links: [
          { text: "Applicable Codes page", href: "https://ontarioca.gov/node/137" },
          { text: "2025 Energy Code", href: "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/2025-building-energy-efficiency" },
        ],
      },
      {
        q: "Does Title 24 apply when I replace an AC or furnace in Ontario?",
        a: "Yes, the applicable Title 24 energy requirements apply. California's 2025 Energy Code applies to permit applications submitted on or after January 1, 2026. For an existing single-family home, the Energy Commission says replacing the outdoor or indoor unit of a split system triggers duct sealing requirements, and field verification and diagnostic testing is prescriptively required for most HVAC alterations. Depending on the job, that can include duct leakage testing, with limits of 10% total leakage or 7% leakage to outside for existing ducts, and refrigerant charge verification for heat pumps. Not every job needs every test.",
        boldLead: "Yes, the applicable Title 24 energy requirements apply.",
        links: [
          { text: "2025 Energy Code", href: "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/2025-building-energy-efficiency" },
          { text: "Energy Commission", href: "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/energy-code-support-center/hvac-0" },
        ],
      },
      {
        q: "Does Ontario have a noise rule that affects AC equipment?",
        a: "Ontario sets exterior noise standards by land use. The Municipal Code copy we read lists 65 dBA from 7 a.m. to 10 p.m. and 45 dBA from 10 p.m. to 7 a.m. for single-family residential property (Sec. 5-29.04), and it does not mention air conditioners, so we did not find a rule written only for HVAC equipment. Ontario's Development Code points to Title 5, Chapter 29 for noise. The text is a third-party copy with no current date, so we confirm how the limits apply to your address before we choose a condenser location.",
        boldLead: "Ontario sets exterior noise standards by land use.",
        links: [
          { text: "Municipal Code copy", href: "https://nonoise.org/regulation/ordinance/Ontario,%20California.pdf" },
          { text: "Development Code", href: "https://content.ontarioca.gov/sites/default/files/2025-01/Chapter%206.0%20-%20Development%20%26%20Subdivision%20Regs_Rev%2012-03-2024.pdf" },
        ],
      },
      {
        q: "What hours can HVAC work happen in Ontario?",
        a: "The Municipal Code copy we read limits construction activity noise to weekdays from 7 a.m. to 6 p.m. and Saturdays and Sundays from 9 a.m. to 6 p.m., with exceptions including emergency work (Sec. 5-29.09). The text is a third-party copy, so we confirm current hours with the City. Call (323) 776-9047 to schedule a visit.",
        boldLead: "The Municipal Code copy we read limits construction activity noise to weekdays from 7 a.m. to 6 p.m. and Saturdays and Sundays from 9 a.m. to 6 p.m., with exceptions including emergency work (Sec. 5-29.09).",
        links: [
          { text: "Municipal Code copy", href: "https://nonoise.org/regulation/ordinance/Ontario,%20California.pdf" },
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Does Ontario have rules for where rooftop and exterior AC equipment can go?",
        a: "Ontario's Development Code has equipment screening standards for residential districts. For single-family dwellings, the December 2024 revision we read prohibits new exterior roof-mounted mechanical, heating and air conditioning equipment, and for multiple-family development it requires roof-mounted equipment to be completely screened from public view by parapet walls or roof screens (Sec. 6.01.010). We did not confirm how those standards apply to replacing existing equipment, and we did not find a numeric condenser setback, so we confirm placement with the City before choosing a unit and location. Development Plan applications also ask for the location of roof-mounted mechanical equipment and equipment screens.",
        boldLead: "Ontario's Development Code has equipment screening standards for residential districts.",
        links: [
          { text: "Development Code", href: "https://content.ontarioca.gov/sites/default/files/2025-01/Chapter%206.0%20-%20Development%20%26%20Subdivision%20Regs_Rev%2012-03-2024.pdf" },
          { text: "Development Plan applications", href: "https://content.ontarioca.gov/sites/default/files/2025-01/FILLABLE%20FORM_Application_Discretionary%20Permits%20%26%20Actions_Rev%209.9.2024.pdf" },
        ],
      },
      {
        q: "Do you work in condos and apartment buildings in Ontario?",
        a: "Yes. SCAG's local profile of Ontario, using California Department of Finance data for 2018, counts 49,648 housing units, with 59.0% single-family detached, 6.3% single-family attached, 10.2% in buildings of 2 to 4 units, 20.1% in buildings of 5 or more units, and 4.4% mobile homes. AIRPRO SOLUTIONS services condos, townhomes, and apartments as well as single-family homes, and in a multi-unit building we confirm equipment access and placement at the property. See our Residential HVAC page.",
        boldLead: "Yes.",
        links: [
          { text: "local profile", href: "https://sp.scag.ca.gov/sites/default/files/2024-05/ontario_localprofile.pdf" },
          { text: "Residential HVAC page", href: "/residential-hvac/" },
        ],
      },
      {
        q: "Does the age of Ontario homes matter for HVAC work?",
        a: "It can, and we confirm it on site. SCAG's local profile, citing the American Community Survey, reports that 36.1% of Ontario's housing stock was built before 1970. The City describes Ontario Ranch as a 13-square-mile master-planned community with 1,200 new homes built in 2023, so Ontario's housing includes new construction as well. Older homes can mean older equipment, attic access, and ductwork, but those are still property-specific, so we check them at a site visit before recommending repair or replacement.",
        boldLead: "It can, and we confirm it on site.",
        links: [
          { text: "local profile", href: "https://sp.scag.ca.gov/sites/default/files/2024-05/ontario_localprofile.pdf" },
          { text: "Ontario Ranch", href: "https://www.ontariothinksbusiness.com/develop-ontario/district-information/ontario-ranch" },
        ],
      },
      {
        q: "Do you service Ontario Ranch and the airport area?",
        a: "Yes. AIRPRO SOLUTIONS serves homes and businesses across Ontario. The City describes Ontario Ranch as a master-planned community of 13 square miles planned for 69,000 residential units, and it reports that Ontario International Airport served 6.5 million passengers in 2023. We plan each visit around the address, including equipment access and placement.",
        boldLead: "Yes.",
        links: [
          { text: "Ontario Ranch", href: "https://www.ontariothinksbusiness.com/develop-ontario/district-information/ontario-ranch" },
          { text: "Ontario International Airport", href: "https://www.ontariothinksbusiness.com/develop-ontario/target-industries/logistics-distribution" },
        ],
      },
      {
        q: "Who provides electricity and gas in Ontario?",
        a: "The City's utility contacts name Southern California Edison for electric service and Southern California Gas Company for gas. The City's ADU contact page lists SCE and SoCalGas as well. Confirm both on your bill before counting on a program, because eligibility follows your utility account. Programs, amounts, and funding change, so confirm current eligibility with your utility before scheduling installation.",
        boldLead: "The City's utility contacts name Southern California Edison for electric service and Southern California Gas Company for gas.",
        links: [
          { text: "utility contacts", href: "https://www.ontariothinksbusiness.com/node/71" },
          { text: "ADU contact page", href: "https://www.ontarioca.gov/government/community-development/building/accessory-dwelling-units-adus/adu-contact-information" },
        ],
      },
      {
        q: "Which rebate and incentive pages should I check before buying HVAC equipment in Ontario?",
        a: "Check SCE and SoCalGas for current terms. SCE's rebates page lists Golden State Rebates instant coupons for air conditioners and smart thermostats, a Smart Energy Program bill credit for letting SCE adjust an eligible smart thermostat, and Home Performance Plus for eligible customers in disadvantaged or low-income communities. SoCalGas lists a rebate for qualifying natural gas furnaces that requires installation by a licensed contractor with proof of permit closure and is limited to one per household. Funds are first come, first served and programs can change, so confirm eligibility with each utility. We do not quote amounts.",
        boldLead: "Check SCE and SoCalGas for current terms.",
        links: [
          { text: "SCE's rebates page", href: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace" },
          { text: "SoCalGas", href: "https://www.socalgas.com/savings/rebates-and-incentives" },
        ],
      },
      {
        q: "What HVAC services are available in Ontario?",
        a: "AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout Ontario, for both residential and commercial properties.",
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
        q: "Is emergency HVAC service available in Ontario?",
        a: "Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in Ontario. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.",
        boldLead: "Yes.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "How much does HVAC service cost in Ontario?",
        a: "Cost depends on the problem, the equipment, and how accessible the system is. We do not publish one flat price, so call (323) 776-9047 or request service and we will quote your specific system.",
        boldLead: "Cost depends on the problem, the equipment, and how accessible the system is.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Does AIRPRO SOLUTIONS handle commercial HVAC in Ontario?",
        a: "Yes. AIRPRO SOLUTIONS services commercial properties in Ontario, including rooftop units. The City's economic development site reports that Ontario International Airport handled over 750,000 tons of freight in 2023, lists logistics and distribution among its target industries, and shows Ontario Ranch planning 12 million square feet of commercial and office space and 31 million square feet of industrial space. Development Plan applications ask for the location of roof-mounted mechanical equipment and equipment screens, and we confirm the permit path with the City before work starts. See our Commercial HVAC page for the full scope.",
        boldLead: "Yes.",
        links: [
          { text: "logistics and distribution", href: "https://www.ontariothinksbusiness.com/develop-ontario/target-industries/logistics-distribution" },
          { text: "Ontario Ranch", href: "https://www.ontariothinksbusiness.com/develop-ontario/district-information/ontario-ranch" },
          { text: "Development Plan applications", href: "https://content.ontarioca.gov/sites/default/files/2025-01/FILLABLE%20FORM_Application_Discretionary%20Permits%20%26%20Actions_Rev%209.9.2024.pdf" },
          { text: "Commercial HVAC page", href: "/commercial-hvac/" },
        ],
      },
    ],
  },
};

const coronaOverrides: Partial<City> = {
  // TODO(data): add verified climate detail before treating this as a full local page.
  neighborhoods: ["Dos Lagos", "Eagle Glen", "Downtown Corona", "Sierra Del Oro", "Corona Ranch", "Mountain Gate", "Chase Ranch", "Corona Vista", "Green River Ranch", "Sierra Bella", "Arantine Hills", "Crown Ranch Estates", "The Cimarron", "Skyline Heights"], // plan names from the City's specific plans list, not neighborhood boundaries; partial list
  zips: [], // ZIP list held out: sources were a third-party aggregator and a court venue order, not a City or USPS-grade list
  page: {
    metaDescription:
      "HVAC for Corona homes and businesses, from AC repair to installation. Know the City's 10-foot setback rule and permit steps. Licensed, 4.8-star rated.",
    lede:
      "AIRPRO SOLUTIONS provides HVAC services across Corona, with AC repair, heating repair, installation, and maintenance for homes and businesses, and with the City's setback and noise rules for outdoor units in mind.",
    heroCaption: { title: "Corona, CA", text: "Local HVAC service across Corona" },
    heroProof: [
      { icon: "shield", label: "Licensed, bonded & insured" },
      { icon: "star", label: "4.8-star rated" },
      { icon: "bolt", label: "24/7 emergency dispatch" },
      { icon: "building", label: "Residential and commercial" },
    ],
    trustStats: [
      { num: "4.8★", label: "Google rating, 40 reviews" },
      { num: "C-20", label: "California licensed" },
      { num: "24/7", label: "emergency dispatch" },
      { num: "Same-day", label: "service typical" },
    ],
    answer: {
      lead: "AIRPRO SOLUTIONS is a licensed HVAC contractor serving Corona",
      body:
        ", providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, subject to capacity, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.",
    },
    glance: {
      title: "Corona at a glance",
      stats: [
        { num: "161,734", label: "residents in the Census Bureau's July 1, 2025 estimate (U.S. Census Bureau QuickFacts)" },
        { num: "66.9%", label: "of 49,277 housing units are single-family detached, and 20.9% are in buildings of 5 or more units (California Department of Finance E-5, 2018, per SCAG)" },
        { num: "15.6%", label: "of housing was built before 1970 (U.S. Census American Community Survey, 2017; Nielsen Co., per SCAG)" },
      ],
      source: "Sources: U.S. Census Bureau QuickFacts and SCAG's local profile of Corona.",
    },
    localTitle: "Corona's condenser setback, noise limits, and electric service",
    // Held out (no verified source): ZIP card (the research's 92877, 92878, 92879, 92880, 92881, 92882 and 92883 come from a third-party aggregator and from a Riverside County Superior Court order about where to file civil documents, a court venue list that does not describe them as postal delivery areas; the City's ZIP Code Map is a PDF link whose contents are not in text, and the City pages show only 92880 and 92882, which conflict with each other for the same Vicentia Avenue address); neighborhood claims beyond the City's specific plan names (the research's 'major neighborhoods' were plan names, and the City page calls them specific plans, not neighborhoods; Corona Hills, Corona West, Circle City, Kellogg Village and Buena Vista came only from Wikipedia; Grand Boulevard Historic District and any historic HVAC restriction have no City source read); nearby row; climate, NOAA normals, heat and humidity figures (the NCEI source was not retrieved, so no Corona station values); the research's air quality conclusions beyond AQMD listing Corona among its Riverside County cities (the AQMD data page does not name Corona); SCE TOU-D-PRIME (source is a March 2020 fact sheet, current availability not read); expedited permit pathway (the City's expedited page covers solar, EV charging and solar water heating only, not HVAC); City business license or contractor requirement; HVAC permit checklist and like-for-like rule (none found); local code amendments; median year built; single-family, multifamily and commercial split beyond the SCAG DOF table; employers, hospitals, school districts, shopping centers and industrial parks (the City page names only four industries, undated, and no employers); zoning map; all rebate dollar amounts; HEEHRA, ESA, Building Electrification and Whole Home pilot status claims (not independently verified); competitor SERP table (gap analysis only, never on the page).
    // TODO(verify): confirm with the City which permit path each HVAC job needs (Building Division lists 951-736-2250 and BuildingPlanCheck@CoronaCA.gov) and whether AIRPRO SOLUTIONS needs a City business license (none found on the pages read).
    // TODO(verify): setback, noise and construction-hour text is from the American Legal Publishing copy of Sec. 17.84.040, labeled 2025 S-56 (current) on both reads; the research said 2026 S-57. The publisher says its copy may not reflect the latest legislation. Recheck against the official code and confirm subsection letters (C)(2), (D)(1), (D)(2), (E)(6) before launch.
    // TODO(verify): the fee schedule PDF names only the Building Division, not the City, and says effective October 4, 2026 inside the file; the file name says 10.4.26. Fees are not on the page.
    // Pre-launch recheck: Sec. 17.84.040 (edition label and subsections), Chapters 15.04 and 15.08 adoption text, Building Division page (ZIP shown as 92880 in one place and 92882 in another), eTRAKiT portal (not opened), mechanical fee schedule (effective October 4, 2026), City electric service and new-resident pages, SCE and SoCalGas rebate pages and SoCalGas application PDF, SCE TOU page, specific plans list, economic development page, SCAG profile URL, QuickFacts, AQMD jurisdiction list, Energy Commission pages.
    localParagraphs: [
      "Corona's Municipal Code sets a numeric placement rule for outdoor units. Under Sec. 17.84.040(D)(1), when a building permit is requested to install mechanical equipment such as an air conditioner in a residential zone, **the equipment must be set back at least 10 feet from an adjoining property line**, unless a 5-foot-high block sound wall extends 2 feet on each side of the equipment, or the Building Official approves sound attenuation devices that keep the noise within the code's limits. The same section exempts repairs to and replacement of residential mechanical equipment installed by permit before May 20, 1993 from that division (Sec. 17.84.040(E)(6)). The text comes from the American Legal Publishing copy of the code, which says it may not reflect the latest legislation, so we confirm how the rule applies to your lot before choosing a condenser location.",
      "Section 17.84.040 also sets stationary noise standards by land use. For single-, double-, and multi-family residential uses it lists **55 dBA from 7 a.m. to 10 p.m. and 50 dBA from 10 p.m. to 7 a.m.** outdoors, with each limit reduced by 5 dBA for impulse or simple-tone noise, and the ambient level becoming the standard when it is higher (Sec. 17.84.040(C)(2)). Commercial uses are listed at 65 dBA by day and 60 dBA at night. The code measures noise on the neighboring property over time, so these limits are not a rating for a condenser, and we did not find a limit written only for HVAC equipment. Construction noise is prohibited from 8 p.m. to 7 a.m. Monday through Saturday and from 6 p.m. to 10 a.m. on Sundays and federal holidays (Sec. 17.84.040(D)(2)). We did not confirm whether that provision applies to a service call or an installation, so we confirm hours with the City before scheduling work.",
      "Corona's Building Division handles permits at 400 South Vicentia Avenue, Suite 120, and lists 951-736-2250. The City's permits directory groups building, electrical, mechanical, and plumbing permits under one entry, and the Building Division page links its online building portal, eTRAKiT, to apply for a permit, check plan status, request inspections, and search permit history. The page lists counter hours of Monday through Thursday, 7 a.m. to 6 p.m., and closed Friday. The City's mechanical fee schedule, effective October 4, 2026, has line items for a residential furnace change-out in the same location, a residential A/C condenser change-out, and a combined change-out, but we did not find a City checklist for an HVAC replacement or a written rule on which replacements need a permit, so **AIRPRO SOLUTIONS confirms the permit path** with the City before work starts, and we do not quote fees. Corona's Municipal Code adopts the 2025 California Mechanical Code (Sec. 15.08.020) and the 2025 California Building Code (Sec. 15.04.020), and California's 2025 Energy Code applies to permit applications submitted on or after January 1, 2026. We did not read any local amendments. For an existing single-family home, the Energy Commission says replacing the outdoor or indoor unit of a split system triggers duct sealing requirements, and field verification and diagnostic testing is prescriptively required for most HVAC alterations.",
      "Corona had an estimated 161,734 residents on July 1, 2025, up from 157,136 in the 2020 U.S. Census, and QuickFacts reports a 63.8% owner-occupied housing rate for 2020-2024. SCAG's local profile, using California Department of Finance E-5 data for 2018, counts **49,277 housing units: 66.9% single-family detached, 4.3% attached, 4.5% in buildings of 2 to 4 units, 20.9% in buildings of 5 or more, and 3.4% mobile homes**. The same profile reports that **15.6% of housing was built before 1970**, citing the U.S. Census American Community Survey, 2017, and Nielsen Co. Those figures are citywide and dated, so we confirm the equipment, roof or attic access, and ductwork at the property, and in a multi-unit building we confirm equipment access and placement. The City's list of specific plans, linked in the card beside this text, names plan areas such as Dos Lagos, Eagle Glen, and Downtown Corona, but a plan name does not tell us a home's age or equipment, so we draw no conclusions from it.",
      "Corona has two electric providers. The City's new-resident page says a majority of Corona residents are served by Southern California Edison, and that small areas near Dos Lagos, The Crossings, Corona Pointe, and Princeland are served by the City's Department of Water & Power. The City's electric service page says its rebates are for City of Corona electric customers, who do not receive an electric bill from Southern California Edison, so **confirm your electric provider on your bill before counting on a program**. SCE's time-of-use plan page lists summer weekday peak hours of 4 to 9 p.m. for TOU-D 4-9 PM and 5 to 8 p.m. for TOU-D 5-8 PM. Those are SCE plans, and we did not read the City's electric rate schedules. The new-resident page also links SoCalGas assistance programs. SCE's rebates page lists Golden State Rebates coupons for air conditioners and smart thermostats and a Smart Energy Program bill credit, SoCalGas lists a rebate for qualifying gas furnaces, and the City's electric service page lists residential and commercial programs for its electric customers. Programs and funding change, so we link the program pages rather than quote amounts. For commercial work, the City's economic development site says Corona's largest industries include construction, manufacturing, health care, and retail services, and the page is undated, so we plan commercial visits around the building and its rooftop or ground equipment access. Official links are in the card beside this text.",
    ],
    // TODO(copy): client approved the Corona local paragraphs on 2026-10-18; this card restates the first paragraph and is new wording, so it is not approved yet.
    // TODO(verify): Sec. 17.84.040 subsection letters and edition label come from the American Legal Publishing copy; recheck against the official code.
    localCards: [
      {
        heading: "Corona outdoor equipment rule",
        rows: [
          { label: "Setback from the adjoining property line", value: "At least 10 feet (Sec. 17.84.040(D)(1))" },
          { label: "Alternative", value: "A 5-foot block sound wall, or sound attenuation the Building Official approves" },
          { label: "Exemption", value: "Repair and replacement of residential equipment installed by permit before May 20, 1993 (Sec. 17.84.040(E)(6))" },
        ],
        note: "Municipal Code Sec. 17.84.040, American Legal Publishing copy, which may not reflect the latest legislation. We confirm how the rule applies to your lot.",
      },
    ],
    neighborhoodsHeading: "Specific plan areas and official resources",
    neighborhoodsNote: "Partial list of area names from the City's specific plans. These are land-use plans, not neighborhood boundaries.",
    officialResources: [
      {
        text: "Building Division",
        href: "https://www.coronaca.gov/departments/building-division",
        note: "Plan check, inspections, counter hours, and contact details.",
      },
      {
        text: "Online building portal (eTRAKiT)",
        href: "https://etrakit.coronaca.gov/etrakit/",
        note: "Apply for permits, check plan status, and request inspections.",
      },
      {
        text: "Mechanical fee schedule (PDF)",
        href: "https://cdn.prod.website-files.com/65799af8ef225180fdf1ba2e/6ac53e8948e0160eee30ddbf_Table%20E%20Mechancial%20Fees%20-%2010.4.26.pdf",
        note: "Table E, effective October 4, 2026, with furnace and A/C condenser change-out items.",
      },
      {
        text: "Municipal Code Sec. 17.84.040",
        href: "https://codelibrary.amlegal.com/codes/corona/latest/corona_ca/0-0-0-55028",
        note: "Equipment setback, stationary noise limits, and construction hours (American Legal Publishing copy).",
      },
      {
        text: "Municipal Code Chapter 15.08, Mechanical Code",
        href: "https://codelibrary.amlegal.com/codes/corona/latest/corona_ca/0-0-0-61229",
        note: "Adopts the 2025 California Mechanical Code (American Legal Publishing copy).",
      },
      {
        text: "Municipal Code Chapter 15.04, Building Code",
        href: "https://codelibrary.amlegal.com/codes/corona/latest/corona_ca/0-0-0-60978",
        note: "Adopts the 2025 California Building Code (American Legal Publishing copy).",
      },
      {
        text: "City electric service",
        href: "https://coronaca.gov/departments/utilities/customer-care/services/electric-service",
        note: "Service area and rebate programs for City electric customers.",
      },
      {
        text: "New resident utilities",
        href: "https://www.coronaca.gov/community/getting-involved/new-residents",
        note: "Names the SCE and City electric areas and links gas assistance programs.",
      },
      {
        text: "SCE rebates",
        href: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace",
        note: "Golden State Rebates coupons, Smart Energy Program, and Home Performance Plus.",
      },
      {
        text: "SoCalGas rebates",
        href: "https://www.socalgas.com/savings/rebates-and-incentives",
        note: "Natural gas furnace rebate and program terms.",
      },
      {
        text: "SCE time-of-use plans",
        href: "https://www.sce.com/save-money/rates-financing/residential-rate-plans/time-of-use-plans",
        note: "Peak hours for the TOU-D plans cited on this page.",
      },
      {
        text: "Specific plans",
        href: "https://www.coronaca.gov/departments/planning-and-development/planning-division/specific-plans",
        note: "Source of the plan area names in the pills above (plan names, not boundaries).",
      },
      {
        text: "Corona business community",
        href: "https://coronaca.gov/departments/economic-development/data-demographics/corona-business-community",
        note: "Largest industries cited on this page (undated).",
      },
      {
        text: "SCAG Corona local profile",
        href: "https://sp.scag.ca.gov/sites/default/files/2024-05/corona_localprofile.pdf",
        note: "Housing counts and building age cited on this page.",
      },
      {
        text: "Census QuickFacts",
        href: "https://www.census.gov/quickfacts/fact/table/coronacitycalifornia/PST045224",
        note: "Population and owner-occupied rate cited on this page.",
      },
      {
        text: "South Coast AQMD cities",
        href: "https://www.aqmd.gov/nav/about/jurisdiction",
        note: "Lists Corona among the Riverside County cities in its jurisdiction.",
      },
    ],
    servicesTitle: "Everything we handle for Corona homes and businesses",
    serviceCards: [
      { slug: "ac-repair", name: "AC Repair", body: "Diagnosis and repair for cooling failures, weak airflow, and unusual noises, with the City's outdoor-unit setback and noise limits in mind." },
      { slug: "ac-installation", name: "AC Installation & Replacement", body: "New system sizing and installation, planned around the City's 10-foot setback rule for residential outdoor units, its permit process, and Title 24 requirements." },
      { slug: "ac-maintenance", name: "AC Maintenance", body: "Seasonal AC tune-ups that catch small issues early, for homes and for commercial rooftop and ground units. The City's electric service page lists an AC tune-up program for its electric customers." },
      { slug: "heating-repair", name: "Heating Repair", body: "Furnace and heating system diagnosis and repair. The City's new-resident page links SoCalGas assistance programs for gas customers." },
      { slug: "furnace-installation", name: "Furnace Installation & Replacement", body: "New furnace sizing and installation, with the City's permit path confirmed before work starts. SoCalGas lists a gas furnace rebate, and funding changes, so we point you to the current program page." },
      { slug: "heat-pump-services", name: "Heat Pump Services", body: "Installation, repair, and maintenance for heat pumps. Heat pump work starts with your electric utility, SCE for most of Corona and the City's electric utility in small areas, and incentive programs change." },
      { slug: "ductless-mini-split", name: "Ductless Mini-Split", body: "Room-by-room comfort control for spaces where ductwork is not an option, with outdoor-unit placement checked against the City's setback rule." },
      { slug: "ductwork", name: "Ductwork Services", body: "Duct repair, sealing, replacement, and installation, with Title 24 duct sealing and verification in mind." },
      { slug: "indoor-air-quality", name: "Indoor Air Quality", body: "Air filtration, whole-home purification, and ventilation options. South Coast AQMD lists Corona among the Riverside County cities in its jurisdiction." },
      { slug: "emergency-hvac", name: "Emergency HVAC", body: "Dispatch for no-cool and no-heat emergencies in Corona." },
    ],
    resources: {
      eyebrow: "Know before you start",
      title: "Corona setbacks, permits, and incentive programs",
      intro: "Official sources for three local items worth checking before a Corona HVAC project.",
      cards: [
        // TODO(verify): no dollar amounts on purpose (link-only); recheck links before launch.
        {
          amount: "Outdoor unit setback",
          description: "Corona's Municipal Code asks for equipment in residential zones to be set back at least 10 feet from an adjoining property line, with a block-wall or approved sound-attenuation alternative. Check how it applies to your lot before choosing a condenser location.",
          linkLabel: "Municipal Code Sec. 17.84.040",
          linkHref: "https://codelibrary.amlegal.com/codes/corona/latest/corona_ca/0-0-0-55028",
        },
        {
          amount: "Permits and codes",
          description: "Corona's Building Division handles permits through its online building portal, and its mechanical fee schedule lists furnace and A/C condenser change-out items. We found no City checklist for a replacement, so we confirm the path with the City.",
          linkLabel: "Building Division",
          linkHref: "https://www.coronaca.gov/departments/building-division",
        },
        {
          amount: "Incentive programs",
          description: "Your electric provider decides which programs apply. SCE lists Golden State Rebates coupons and a Smart Energy Program bill credit, SoCalGas lists a gas furnace rebate, and the City lists programs for its own electric customers. Terms and funding change, and we do not quote amounts, so check the current terms before you buy.",
          linkLabel: "City electric service",
          linkHref: "https://coronaca.gov/departments/utilities/customer-care/services/electric-service",
        },
      ],
    },
    nearby: [],
    proof: {
      heading: "Licensed, reviewed, and ready across Corona",
      body: "AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.",
      stats: [
        { num: "4.8★", label: "Google rating" },
        { num: "40", label: "Google reviews" },
        { num: "C-20", label: "California license class" },
        { num: "24/7", label: "Emergency dispatch" },
      ],
    },
    finalCtaBody: "Call or request service online to schedule a visit anywhere in Corona. Same-day service is typical, subject to capacity.",
    faqs: [
      {
        q: "Does AIRPRO SOLUTIONS service all of Corona?",
        a: "Yes. AIRPRO SOLUTIONS serves homes and businesses across Corona as part of our Inland Empire coverage. Corona's Building Division handles permits, so we plan each visit around your specific address.",
        boldLead: "Yes.",
        links: [
          { text: "Inland Empire coverage", href: "/service-areas/inland-empire/" },
          { text: "Building Division", href: "https://www.coronaca.gov/departments/building-division" },
        ],
      },
      {
        q: "How fast can a technician reach my Corona home?",
        a: "Same-day service is typical in Corona, subject to capacity. Call (323) 776-9047 to confirm a window for your address.",
        boldLead: "Same-day service is typical in Corona, subject to capacity.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Do I need a permit to replace an AC or furnace in Corona?",
        a: "Check with the City before work starts. Corona's Building Division handles permits, and the City's mechanical fee schedule lists line items for a residential furnace change-out in the same location, a residential A/C condenser change-out, and a combined change-out. We found no City checklist or written rule that says whether a given replacement needs a permit, so we do not assume a replacement is exempt. The Building Division lists 951-736-2250. AIRPRO SOLUTIONS can walk you through the steps.",
        boldLead: "Check with the City before work starts.",
        links: [
          { text: "Building Division", href: "https://www.coronaca.gov/departments/building-division" },
          { text: "mechanical fee schedule", href: "https://cdn.prod.website-files.com/65799af8ef225180fdf1ba2e/6ac53e8948e0160eee30ddbf_Table%20E%20Mechancial%20Fees%20-%2010.4.26.pdf" },
        ],
      },
      {
        q: "How do I apply for an HVAC permit in Corona?",
        a: "Use the City's online building portal, eTRAKiT, or the Building Division counter. The Building Division's page says the portal is used to apply for a permit, check plan status, request inspections, and search permit history, and it lists the counter at 400 South Vicentia Avenue, Suite 120, open Monday through Thursday, 7 a.m. to 6 p.m., and closed Friday. We did not find a City list of HVAC permit types or a checklist for an equipment change-out, and we do not quote fees, so we confirm the path with the City.",
        boldLead: "Use the City's online building portal, eTRAKiT, or the Building Division counter.",
        links: [
          { text: "online building portal, eTRAKiT", href: "https://etrakit.coronaca.gov/etrakit/" },
          { text: "Building Division", href: "https://www.coronaca.gov/departments/building-division" },
        ],
      },
      {
        q: "Which building codes apply to HVAC work in Corona?",
        a: "Corona's Municipal Code adopts the 2025 California Mechanical Code (Sec. 15.08.020) and the 2025 California Building Code (Sec. 15.04.020). California's 2025 Energy Code applies to permit applications submitted on or after January 1, 2026. The code publisher says its online copy may not reflect the latest legislation, and we did not read any local amendments, so we confirm which provisions apply to your project with the City.",
        boldLead: "Corona's Municipal Code adopts the 2025 California Mechanical Code (Sec. 15.08.020) and the 2025 California Building Code (Sec. 15.04.020).",
        links: [
          { text: "2025 California Mechanical Code", href: "https://codelibrary.amlegal.com/codes/corona/latest/corona_ca/0-0-0-61229" },
          { text: "2025 California Building Code", href: "https://codelibrary.amlegal.com/codes/corona/latest/corona_ca/0-0-0-60978" },
          { text: "2025 Energy Code", href: "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/2025-building-energy-efficiency" },
        ],
      },
      {
        q: "Does Title 24 apply when I replace an AC or furnace in Corona?",
        a: "Yes, the applicable Title 24 energy requirements apply. California's 2025 Energy Code applies to permit applications submitted on or after January 1, 2026. For an existing single-family home, the Energy Commission says replacing the outdoor or indoor unit of a split system triggers duct sealing requirements, and field verification and diagnostic testing is prescriptively required for most HVAC alterations. Depending on the job, that can include duct leakage testing, with limits of 10% total leakage or 7% leakage to outside as a share of system air handler airflow, and refrigerant charge verification for new heat pump systems. Not every job needs every test.",
        boldLead: "Yes, the applicable Title 24 energy requirements apply.",
        links: [
          { text: "2025 Energy Code", href: "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/2025-building-energy-efficiency" },
          { text: "Energy Commission", href: "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/energy-code-support-center/hvac-0" },
        ],
      },
      {
        q: "Does Corona limit where an outdoor AC unit can go?",
        a: "Yes, in residential zones. Corona's Municipal Code (Sec. 17.84.040(D)(1)) says that when a building permit is requested to install mechanical equipment such as an air conditioner, the equipment must be set back at least 10 feet from an adjoining property line, unless a 5-foot-high block sound wall extends 2 feet on each side of the equipment or the Building Official approves sound attenuation devices. That section covers residential zones, and we did not read the standards for other zones. The code publisher says its copy may not reflect the latest legislation, so we confirm placement with the City before choosing a unit and location.",
        boldLead: "Yes, in residential zones.",
        links: [
          { text: "Municipal Code", href: "https://codelibrary.amlegal.com/codes/corona/latest/corona_ca/0-0-0-55028" },
        ],
      },
      {
        q: "Does the 10-foot setback apply when I replace an old unit in Corona?",
        a: "Corona's code treats equipment installed by permit before May 20, 1993 differently. The Municipal Code exempts repairs to and replacement of residential mechanical equipment installed by permit before that date from the requirements in division (D) of Sec. 17.84.040, which includes the setback rule (Sec. 17.84.040(E)(6)). The exemption names that division only, so we confirm with the City whether your existing unit qualifies and what still applies before we plan a replacement.",
        boldLead: "Corona's code treats equipment installed by permit before May 20, 1993 differently.",
        links: [
          { text: "Municipal Code", href: "https://codelibrary.amlegal.com/codes/corona/latest/corona_ca/0-0-0-55028" },
        ],
      },
      {
        q: "Does Corona have a noise rule that affects AC equipment?",
        a: "Corona sets stationary noise standards by land use. For single-, double-, and multi-family residential uses, the Municipal Code lists 55 dBA from 7 a.m. to 10 p.m. and 50 dBA from 10 p.m. to 7 a.m. outdoors, reduced by 5 dBA for impulse or simple-tone noise, and the ambient level becomes the standard when it is higher (Sec. 17.84.040(C)(2)). Noise is measured on the neighboring property over time, so the limits are not a condenser rating, and we did not find a limit written only for HVAC equipment. The code publisher says its copy may not reflect the latest legislation, so we confirm how the limits apply to your address before we choose a condenser location.",
        boldLead: "Corona sets stationary noise standards by land use.",
        links: [
          { text: "Municipal Code", href: "https://codelibrary.amlegal.com/codes/corona/latest/corona_ca/0-0-0-55028" },
        ],
      },
      {
        q: "What hours can HVAC work happen in Corona?",
        a: "The Municipal Code prohibits construction noise from 8 p.m. to 7 a.m. Monday through Saturday and from 6 p.m. to 10 a.m. on Sundays and federal holidays (Sec. 17.84.040(D)(2)). It defines construction noise as disturbing, excessive, or offensive noise generated by tools, machinery, or equipment used in connection with construction operations. We did not confirm whether that provision applies to an HVAC service call or an installation, so we confirm current hours with the City. Call (323) 776-9047 to schedule a visit.",
        boldLead: "The Municipal Code prohibits construction noise from 8 p.m. to 7 a.m. Monday through Saturday and from 6 p.m. to 10 a.m. on Sundays and federal holidays (Sec. 17.84.040(D)(2)).",
        links: [
          { text: "Municipal Code", href: "https://codelibrary.amlegal.com/codes/corona/latest/corona_ca/0-0-0-55028" },
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Do you work in condos and apartment buildings in Corona?",
        a: "Yes. SCAG's local profile of Corona, using California Department of Finance E-5 data for 2018, counts 49,277 housing units, with 66.9% single-family detached, 4.3% single-family attached, 4.5% in buildings of 2 to 4 units, 20.9% in buildings of 5 or more units, and 3.4% mobile homes. AIRPRO SOLUTIONS services condos, townhomes, and apartments as well as single-family homes, and in a multi-unit building we confirm equipment access and placement at the property. See our Residential HVAC page.",
        boldLead: "Yes.",
        links: [
          { text: "local profile", href: "https://sp.scag.ca.gov/sites/default/files/2024-05/corona_localprofile.pdf" },
          { text: "Residential HVAC page", href: "/residential-hvac/" },
        ],
      },
      {
        q: "Does the age of Corona homes matter for HVAC work?",
        a: "It can, and we confirm it on site. SCAG's local profile reports that 15.6% of Corona's housing stock was built before 1970, citing the U.S. Census American Community Survey, 2017, and Nielsen Co. That is a citywide share, and age alone does not tell us about attic access, foundation type, or original ductwork, so we check them at a site visit before recommending repair or replacement.",
        boldLead: "It can, and we confirm it on site.",
        links: [
          { text: "local profile", href: "https://sp.scag.ca.gov/sites/default/files/2024-05/corona_localprofile.pdf" },
        ],
      },
      {
        q: "Do you service Dos Lagos, Eagle Glen, and other Corona communities?",
        a: "Yes. AIRPRO SOLUTIONS serves homes and businesses across Corona. The City's list of specific plans includes Dos Lagos, Eagle Glen, and Downtown Corona, and its new-resident page says small areas near Dos Lagos and The Crossings are served by the City's electric utility, so we confirm your electric provider by address before pointing you to a program.",
        boldLead: "Yes.",
        links: [
          { text: "list of specific plans", href: "https://www.coronaca.gov/departments/planning-and-development/planning-division/specific-plans" },
          { text: "new-resident page", href: "https://www.coronaca.gov/community/getting-involved/new-residents" },
        ],
      },
      {
        q: "Who provides electricity and gas in Corona?",
        a: "Two providers serve electricity in Corona. The City's new-resident page says a majority of Corona residents are served by Southern California Edison, and that small areas near Dos Lagos, The Crossings, Corona Pointe, and Princeland are served by the City's Department of Water & Power. The page also links SoCalGas assistance programs for gas customers. Confirm your provider on your bill before counting on a program, because eligibility follows your utility account.",
        boldLead: "Two providers serve electricity in Corona.",
        links: [
          { text: "new-resident page", href: "https://www.coronaca.gov/community/getting-involved/new-residents" },
        ],
      },
      {
        q: "Can I get a rebate if I am a City of Corona electric customer?",
        a: "Possibly, if your electric bill comes from the City. The City's electric service page says its rebates are for City of Corona electric customers, meaning you do not receive an electric bill from Southern California Edison, and it lists residential programs for a smart thermostat, an AC tune-up, and an AC purchase, new or replacement, each with a limit on how often it can be used. Amounts, limits, and funding change, so we link the page and do not quote them. Check your bill first.",
        boldLead: "Possibly, if your electric bill comes from the City.",
        links: [
          { text: "electric service page", href: "https://coronaca.gov/departments/utilities/customer-care/services/electric-service" },
        ],
      },
      {
        q: "Which rebate and incentive pages should I check before buying HVAC equipment in Corona?",
        a: "Check the pages for your electric provider and for SoCalGas. SCE's rebates page lists Golden State Rebates instant coupons for air conditioners and smart thermostats, and a Smart Energy Program bill credit for letting SCE adjust an eligible smart thermostat. SoCalGas lists a rebate for qualifying natural gas furnaces that requires installation by a licensed contractor with proof of permit closure and is limited to one per household. The City's electric service page lists programs for City electric customers. Funding is limited and programs can change, so confirm eligibility with each utility. We do not quote amounts.",
        boldLead: "Check the pages for your electric provider and for SoCalGas.",
        links: [
          { text: "SCE's rebates page", href: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace" },
          { text: "SoCalGas", href: "https://www.socalgas.com/savings/rebates-and-incentives" },
          { text: "electric service page", href: "https://coronaca.gov/departments/utilities/customer-care/services/electric-service" },
        ],
      },
      {
        q: "What HVAC services are available in Corona?",
        a: "AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout Corona, for both residential and commercial properties.",
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
        q: "Is emergency HVAC service available in Corona?",
        a: "Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in Corona. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.",
        boldLead: "Yes.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "How much does HVAC service cost in Corona?",
        a: "Cost depends on the problem, the equipment, and how accessible the system is. We do not publish one flat price, so call (323) 776-9047 or request service and we will quote your specific system.",
        boldLead: "Cost depends on the problem, the equipment, and how accessible the system is.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Does AIRPRO SOLUTIONS handle commercial HVAC in Corona?",
        a: "Yes. AIRPRO SOLUTIONS services commercial properties in Corona, including rooftop units. The City's economic development site says Corona's largest industries include construction, manufacturing, health care, and retail services, and the page is undated. The Municipal Code lists 65 dBA by day and 60 dBA at night for commercial uses (Sec. 17.84.040(C)(2)), and the City's electric service page lists commercial programs for its electric customers. We confirm the permit path with the City before work starts. See our Commercial HVAC page for the full scope.",
        boldLead: "Yes.",
        links: [
          { text: "economic development site", href: "https://coronaca.gov/departments/economic-development/data-demographics/corona-business-community" },
          { text: "Municipal Code", href: "https://codelibrary.amlegal.com/codes/corona/latest/corona_ca/0-0-0-55028" },
          { text: "electric service page", href: "https://coronaca.gov/departments/utilities/customer-care/services/electric-service" },
          { text: "Commercial HVAC page", href: "/commercial-hvac/" },
        ],
      },
    ],
  },
};

const glendaleOverrides: Partial<City> = {
  // TODO(data): add verified climate detail before treating this as a full local page.
  neighborhoods: [], // neighborhood list held out: no official City source
  zips: [], // ZIP list held out: no City or USPS-grade list read
  page: {
    metaDescription: "HVAC for Glendale homes and businesses, from AC repair to installation. Know the City's AC replacement code and noise limits. Licensed, 4.8-star rated.",
    lede: "AIRPRO SOLUTIONS provides HVAC services across Glendale, with AC repair, heating repair, installation, and maintenance for homes and businesses, and with the City's AC replacement code and noise limits in mind.",
    heroCaption: { title: "Glendale, CA", text: "Local HVAC service across Glendale" },
    heroProof: [
      { icon: "shield", label: "Licensed, bonded & insured" },
      { icon: "star", label: "4.8-star rated" },
      { icon: "bolt", label: "24/7 emergency dispatch" },
      { icon: "building", label: "Residential and commercial" },
    ],
    trustStats: [
      { num: "4.8★", label: "Google rating, 40 reviews" },
      { num: "C-20", label: "California licensed" },
      { num: "24/7", label: "emergency dispatch" },
      { num: "Same-day", label: "service typical" },
    ],
    answer: {
      lead: "AIRPRO SOLUTIONS is a licensed HVAC contractor serving Glendale",
      body: ", providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, subject to capacity, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.",
    },
    glance: {
      title: "Glendale at a glance",
      stats: [
        {
          num: "187,160",
          label: "residents in the Census Bureau's July 1, 2025 estimate (U.S. Census Bureau QuickFacts)",
        },
        {
          num: "34.6%",
          label: "of 80,176 housing units are single-family detached, and 52.3% are in buildings of 5 or more units (California Department of Finance E-5, 2018, per SCAG)",
        },
        {
          num: "61.8%",
          label: "of housing was built before 1970 (U.S. Census American Community Survey, 2017; Nielsen Co., per SCAG)",
        },
      ],
      source: "Sources: U.S. Census Bureau QuickFacts and SCAG's 2019 Local Profile of Glendale.",
    },
    localTitle: "Glendale's AC replacement code, noise limits, and electric service",
    // Held out (no verified source): ZIP card (the City finance dashboard list of 91020, 91201-91208, 91210 and 91214 is a tax heat map, not a postal list, includes 91020, and could not be read here; the California CSD list of 91201-91205 could not be read; the research's other ZIPs came from a third-party compilation); neighborhood names (Montrose, La Crescenta, Kenneth Village, Adams Square, Verdugo Woodlands and others came from the Chamber of Commerce site, a property-management blog and Wikipedia, none an official City source); nearby row (neighbors came from Wikipedia); climate, NOAA normals, marine layer, heat island and humidity (NCEI source not retrieved); City housing statements (most units built 1960-1979, 77,783 units in 2024, about 7 percent vacant, 222 new units since 2020: the City demographics pages could not be read); GWP Time-of-Use seasons, eligibility and business peak hours (GWP rate pages could not be read); the 'simple residential HVAC change-outs on the Glendale Permits Portal' claim (the City online-services page read does not mention it); Glendale gas provider (no service-territory source); GWP-serves-all-of-Glendale (no source); Permit Services Center hours (page text garbled); GMC 30.30.020 rooftop equipment rule (read only through a summary); zoning map, employers, hospitals, schools, shopping centers, industrial areas, HOA areas, historic-district equipment rules, setback rules (none found); all rebate dollar amounts; competitor SERP table (gap analysis only, never on the page).
    // TODO(copy): client has not approved any Glendale wording (every FAQ answer, the five local paragraphs, the AC2HP, noise and construction-hour sentences, the utility and incentive sentences, the commercial sentence). Keep flagged until the user says the client approved.
    // TODO(verify): AC2HP status. The City page says adopted in Fall 2025 and gives no effective date; the Permit Services page says the 2026 Glendale Reach Code took effect January 1, 2026; a third-party report dated August 7, 2026 says the ordinance was submitted to state agencies in December 2025 and the California Building Standards Commission is still reviewing it. Confirm with the City whether the ordinance is in force before launch.
    // TODO(verify): the City page says AC2HP covers single-family homes, duplexes and townhomes; the unsigned draft ordinance text (AAGLA-hosted copy) says existing single-family residential buildings only. The page follows the City page wording. Confirm against the adopted ordinance.
    // TODO(verify): Chapter 8.36 text is from the ecode360 publisher copy, which shows no edition date. Recheck against the official code before launch.
    // TODO(verify): GWP is described as a City department from the City URL path and its rebate page; rate pages were not readable. Confirm which parts of Glendale GWP serves.
    // Pre-launch recheck: AC2HP page and adopted ordinance, Permit Services page and building code notice (Jan 1, 2026), permit guidance page, Chapter 8.36 (ecode360), GWP Smart Home Rebate Program page (amounts and dates), City residential resources page, AQMD jurisdiction list, SCAG profile URL (2019 Local Profile in a 2024-05 folder), QuickFacts.
    localParagraphs: [
      "Glendale has its own rule for replacing an air conditioner. The City's AC to Heat Pump (AC2HP) Reach Code page says the code was adopted in Fall 2025 and applies when an existing air conditioning system in a single-family home, duplex, or townhome is replaced or altered, or when a new system is installed. **Repairs are not affected by the code change.** The page says the owner either installs a heat pump as the primary heating and cooling system, or installs a new air conditioner along with efficiency measures such as duct sealing, insulation, and system performance improvements. It lists exceptions, including an electrical panel without enough capacity for a properly sized heat pump and a required heat pump that would be more than 12,000 Btu/h larger than the existing system. The City's Permit Services page says the 2025 California Building Standards Code, Glendale's 2026 amendments, and the 2026 Glendale Reach Code took effect January 1, 2026, but the AC2HP page gives no effective date for the ordinance and we did not read the adopted text, so we confirm with the City whether and how the code applies to your replacement before we price a system.",
      "Glendale's Municipal Code Chapter 8.36 sets exterior noise standards by zone, and it names air-conditioning equipment. Section 8.36.040(A) lists **45 dBA at night and 55 dBA by day for single-family and duplex residential areas**, 60 dBA at any time for multifamily residential, hotels, motels, and transient lodgings, 65 dBA at any time for the central business district and commercial areas, and 70 dBA at any time for industrial areas. Nighttime runs from 10 p.m. to 7 a.m. (Sec. 8.36.020). Section 8.36.060 lists air-conditioning apparatus among the devices that may not create noise above those levels, Sec. 8.36.050 compares noise to the actual ambient level and allows 5 dBA above it, and a pure tone, impulsive sound, or rapidly varying sound is held to a standard 5 dBA lower (Sec. 8.36.030(K)). Section 8.36.080 bars construction work on buildings within a residential zone, or within 500 feet of one, from 7 p.m. to 7 a.m., and from 7 p.m. Saturday to 7 a.m. Monday and around holidays, unless the person first obtains a permit from the building official. The standards are not a condenser rating, the publisher's copy shows no edition date, and we did not confirm whether Sec. 8.36.080 applies to a service call or an installation, so we confirm how these rules apply to your address and schedule before choosing a condenser location or a work time.",
      "Glendale's Building & Safety Division answers permit questions at (818) 548-3200. The City's permit guidance page says a C-20 Warm-Air Heating, Ventilating, and Air-Conditioning contractor, a B General Building contractor, an A General Engineering contractor, or an owner-builder may apply for a mechanical single-family residential permit, and that **owner-builders may not apply for a mechanical multifamily residential permit**. We did not find a City checklist for an HVAC replacement or a written rule on which replacements need a permit, so **AIRPRO SOLUTIONS confirms the permit path** with the City before work starts, and we do not quote fees. For a single-family replacement, we also check the AC2HP code described above, because the choice between a heat pump and an air conditioner with efficiency measures affects the equipment and the permit.",
      "Glendale had an estimated 187,160 residents on July 1, 2025, and QuickFacts reports a 35.2% owner-occupied housing rate for 2020-2024. SCAG's 2019 Local Profile, using California Department of Finance E-5 data for 2018, counts **80,176 housing units: 34.6% single-family detached, 4.4% attached, 8.6% in buildings of 2 to 4 units, 52.3% in buildings of 5 or more, and 0.1% mobile homes**. The same profile reports that **61.8% of housing was built before 1970**, citing the U.S. Census American Community Survey, 2017, and Nielsen Co. Those figures are citywide and dated, so we confirm the equipment, roof or attic access, and ductwork at the property, and in a multi-unit building we confirm equipment access and placement.",
      "Glendale Water & Power is a City of Glendale department, and its Smart Home Rebate Program page lists rebates for ENERGY STAR room air conditioners and for heat pumps and mini-splits. The page says you must be a Glendale Water & Power customer and that the product must be installed in a home it serves, so **confirm your electric provider on your bill before counting on a program**. The City's residential resources page also links SoCalGas rebate information and lists the federal Energy Efficient Home Improvement Credit. We did not confirm Glendale's gas provider from a service-territory page and we did not read Glendale Water & Power's rate schedules. Programs and funding change, so we link the program pages rather than quote amounts. For commercial work, the City's noise code lists higher limits for commercial and industrial areas, and we plan commercial visits around the building and its rooftop or ground equipment access. Official links are in the card beside this text.",
    ],
    localCards: [
      {
        heading: "Glendale noise limits",
        rows: [
          { label: "Single-family and duplex homes", value: "45 dBA at night, 55 dBA by day" },
          { label: "Multifamily, hotels, motels", value: "60 dBA at any time" },
          { label: "Commercial and central business district", value: "65 dBA at any time" },
          { label: "Industrial", value: "70 dBA at any time" },
        ],
        note: "Municipal Code Sec. 8.36.040(A). Night is 10 p.m. to 7 a.m. These are zone limits, not a condenser rating.",
      },
      {
        heading: "Replacing an AC in Glendale",
        rows: [
          { label: "Heat pump path", value: "A heat pump as the primary heating and cooling system" },
          {
            label: "Air conditioner path",
            value: "A new air conditioner with measures such as duct sealing, insulation, and system performance improvements",
          },
          { label: "Repairs", value: "Not affected by the code change" },
          {
            label: "Exceptions",
            value: "A panel without enough capacity for a properly sized heat pump, or a required heat pump more than 12,000 Btu/h larger than the existing system",
          },
        ],
        note: "From the City's AC2HP page, which gives no effective date. We confirm with the City how it applies to your home.",
      },
      // TODO(copy): the housing card below restates figures already in the fourth local paragraph; client has not approved it.
      {
        heading: "Glendale housing snapshot",
        rows: [
          { label: "Housing units", value: "80,176" },
          { label: "Single-family detached", value: "34.6%" },
          { label: "Buildings of 5 or more units", value: "52.3%" },
          { label: "Built before 1970", value: "61.8%" },
        ],
        note: "California Department of Finance E-5 data for 2018 and 2017 American Community Survey data, both through SCAG's 2019 Local Profile. Citywide and dated.",
      },
    ],
    neighborhoodsHeading: "Official Glendale resources",
    officialResources: [
      {
        text: "AC to Heat Pump Reach Code",
        href: "https://www.glendaleca.gov/government/departments/office-of-the-city-manager/office-of-sustainability/sustainability-initiatives/heat-pump-information",
        note: "The City's page on the AC2HP code, its requirements, and its exceptions.",
      },
      {
        text: "Permit guidance",
        href: "https://www.glendaleca.gov/government/departments/community-development/development-services/permit-guidance",
        note: "Who may apply for mechanical permits and the Building & Safety phone number.",
      },
      {
        text: "Development Services",
        href: "https://www.glendaleca.gov/government/departments/community-development/development-services",
        note: "Permit Services Center information and the building code notice.",
      },
      {
        text: "Municipal Code Chapter 8.36, Noise Control",
        href: "https://ecode360.com/43345448",
        note: "Exterior noise standards and construction hours (publisher copy).",
      },
      {
        text: "Smart Home Rebate Program",
        href: "https://www.glendaleca.gov/government/departments/glendale-water-and-power/residential-customers/residential-programs/smart-home-rebate-program",
        note: "Glendale Water & Power rebates for room air conditioners and heat pumps.",
      },
      {
        text: "Residential resources",
        href: "https://www.glendaleca.gov/government/departments/office-of-the-city-manager/glendale-office-of-sustainability/resources-for-residents-businesses/residential-resources",
        note: "SoCalGas rebate link and federal tax credit information.",
      },
      {
        text: "South Coast AQMD cities",
        href: "https://www.aqmd.gov/nav/about/jurisdiction",
        note: "Lists Glendale among the Los Angeles County cities in its jurisdiction.",
      },
      {
        text: "SCAG Glendale local profile",
        href: "https://sp.scag.ca.gov/sites/default/files/2024-05/glendale_localprofile.pdf",
        note: "Housing counts and building age cited on this page.",
      },
      {
        text: "Census QuickFacts",
        href: "https://www.census.gov/quickfacts/fact/table/glendalecitycalifornia/PST045224",
        note: "Population and owner-occupied rate cited on this page.",
      },
    ],
    servicesTitle: "Everything we handle for Glendale homes and businesses",
    serviceCards: [
      {
        slug: "ac-repair",
        name: "AC Repair",
        body: "Diagnosis and repair for cooling failures, weak airflow, and unusual noises, with the City's noise limits for air-conditioning equipment in mind. The City's AC2HP page says repairs are not affected by the code change.",
      },
      {
        slug: "ac-installation",
        name: "AC Installation & Replacement",
        body: "New system sizing and installation, planned around the City's AC to Heat Pump Reach Code, its permit process, and Title 24 requirements.",
      },
      {
        slug: "ac-maintenance",
        name: "AC Maintenance",
        body: "Seasonal AC tune-ups that catch small issues early, for homes and for commercial rooftop and ground units.",
      },
      {
        slug: "heating-repair",
        name: "Heating Repair",
        body: "Furnace and heating system diagnosis and repair. The City's residential resources page links SoCalGas rebate information.",
      },
      {
        slug: "furnace-installation",
        name: "Furnace Installation & Replacement",
        body: "New furnace sizing and installation, with the City's permit path confirmed before work starts. The City's AC2HP page covers air conditioner replacements, so we check whether a heat pump path applies to your home.",
      },
      {
        slug: "heat-pump-services",
        name: "Heat Pump Services",
        body: "Installation, repair, and maintenance for heat pumps. The City's AC2HP page names a heat pump as one path for air conditioner replacements, and Glendale Water & Power lists heat pump rebates for its customers, so we confirm your electric provider and current terms.",
      },
      {
        slug: "ductless-mini-split",
        name: "Ductless Mini-Split",
        body: "Room-by-room comfort control for spaces where ductwork is not an option, with outdoor-unit placement checked against the City's noise limits.",
      },
      {
        slug: "ductwork",
        name: "Ductwork Services",
        body: "Duct repair, sealing, replacement, and installation. The City's AC2HP page lists duct sealing among the efficiency measures for a new air conditioner.",
      },
      {
        slug: "indoor-air-quality",
        name: "Indoor Air Quality",
        body: "Air filtration, whole-home purification, and ventilation options. South Coast AQMD lists Glendale among the Los Angeles County cities in its jurisdiction.",
      },
      {
        slug: "emergency-hvac",
        name: "Emergency HVAC",
        body: "Dispatch for no-cool and no-heat emergencies in Glendale.",
      },
    ],
    resources: {
      eyebrow: "Know before you start",
      title: "Glendale AC replacement code, permits, and incentive programs",
      intro: "Official sources for three local items worth checking before a Glendale HVAC project.",
      cards: [
        {
          amount: "AC replacement code",
          description: "The City's AC2HP Reach Code page says replacing or altering an air conditioner in a single-family home, duplex, or townhome calls for a heat pump or an air conditioner with efficiency measures, and that repairs are not affected. Check how it applies to your home before choosing equipment.",
          linkLabel: "AC to Heat Pump Reach Code",
          linkHref: "https://www.glendaleca.gov/government/departments/office-of-the-city-manager/office-of-sustainability/sustainability-initiatives/heat-pump-information",
        },
        {
          amount: "Permits and codes",
          description: "Glendale's Building & Safety Division answers permit questions, and the City's guidance says a C-20 contractor may apply for a single-family mechanical permit. We found no City checklist for a replacement, so we confirm the path with the City.",
          linkLabel: "Permit guidance",
          linkHref: "https://www.glendaleca.gov/government/departments/community-development/development-services/permit-guidance",
        },
        {
          amount: "Incentive programs",
          description: "Your electric provider decides which programs apply. Glendale Water & Power lists rebates for room air conditioners and heat pumps for its customers, and the City's residential resources page links SoCalGas rebate information. Terms and funding change, and we do not quote amounts, so check the current terms before you buy.",
          linkLabel: "Smart Home Rebate Program",
          linkHref: "https://www.glendaleca.gov/government/departments/glendale-water-and-power/residential-customers/residential-programs/smart-home-rebate-program",
        },
      ],
    },
    nearby: [],
    proof: {
      heading: "Licensed, reviewed, and ready across Glendale",
      body: "AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.",
      stats: [
        { num: "4.8★", label: "Google rating" },
        { num: "40", label: "Google reviews" },
        { num: "C-20", label: "California license class" },
        { num: "24/7", label: "Emergency dispatch" },
      ],
    },
    finalCtaBody: "Call or request service online to schedule a visit anywhere in Glendale. Same-day service is typical, subject to capacity.",
    faqs: [
      {
        q: "Does AIRPRO SOLUTIONS service all of Glendale?",
        a: "Yes. AIRPRO SOLUTIONS serves homes and businesses across Glendale as part of our Los Angeles County coverage. Glendale's Building & Safety Division answers permit questions, so we plan each visit around your specific address.",
        boldLead: "Yes.",
        links: [
          { text: "Los Angeles County coverage", href: "/service-areas/los-angeles-county/" },
          {
            text: "Building & Safety Division",
            href: "https://www.glendaleca.gov/government/departments/community-development/development-services/permit-guidance",
          },
        ],
      },
      {
        q: "How fast can a technician reach my Glendale home?",
        a: "Same-day service is typical in Glendale, subject to capacity. Call (323) 776-9047 to confirm a window for your address.",
        boldLead: "Same-day service is typical in Glendale, subject to capacity.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Do I need a permit to replace an AC or furnace in Glendale?",
        a: "Check with the City before work starts. Glendale's Building & Safety Division answers permit questions at (818) 548-3200. On the City pages we read, we found no checklist or written rule that says whether a given replacement needs a permit, so we do not assume a replacement is exempt. AIRPRO SOLUTIONS can walk you through the steps.",
        boldLead: "Check with the City before work starts.",
        links: [
          {
            text: "Building & Safety Division",
            href: "https://www.glendaleca.gov/government/departments/community-development/development-services/permit-guidance",
          },
        ],
      },
      {
        q: "Who can apply for an HVAC permit in Glendale?",
        a: "A C-20 contractor, a B or A licensee, or an owner-builder may apply for a single-family mechanical permit. The City's permit guidance page says a C-20 Warm-Air Heating, Ventilating, and Air-Conditioning contractor, a B General Building contractor, an A General Engineering contractor, or an owner-builder may apply for a mechanical single-family residential permit, and that owner-builders may not apply for a mechanical multifamily residential permit. Call (818) 548-3200 with permit questions.",
        boldLead: "A C-20 contractor, a B or A licensee, or an owner-builder may apply for a single-family mechanical permit.",
        links: [
          {
            text: "permit guidance page",
            href: "https://www.glendaleca.gov/government/departments/community-development/development-services/permit-guidance",
          },
        ],
      },
      {
        q: "Which building codes apply to HVAC work in Glendale?",
        a: "The City says the 2025 California Building Standards Code (Title 24), Glendale's 2026 amendments, and the 2026 Glendale Reach Code took effect January 1, 2026. We did not read the amendments, so we confirm with the City which provisions apply to your project.",
        boldLead: "The City says the 2025 California Building Standards Code (Title 24), Glendale's 2026 amendments, and the 2026 Glendale Reach Code took effect January 1, 2026.",
        links: [
          {
            text: "The City says",
            href: "https://www.glendaleca.gov/government/departments/community-development/development-services",
          },
        ],
      },
      {
        q: "What is Glendale's AC to heat pump code?",
        a: "The City's page says Glendale adopted an AC to Heat Pump (AC2HP) Reach Code in Fall 2025. It applies when an existing air conditioning system in a single-family home, duplex, or townhome is replaced or altered, or when a new system is installed. The owner either installs a heat pump as the primary heating and cooling system, or installs a new air conditioner with measures such as duct sealing, insulation, and system performance improvements. The page gives no effective date for the ordinance and we did not read the adopted text, so we confirm with the City how it applies to your replacement.",
        boldLead: "The City's page says Glendale adopted an AC to Heat Pump (AC2HP) Reach Code in Fall 2025.",
        links: [
          {
            text: "The City's page",
            href: "https://www.glendaleca.gov/government/departments/office-of-the-city-manager/office-of-sustainability/sustainability-initiatives/heat-pump-information",
          },
        ],
      },
      {
        q: "Does the AC to heat pump code apply if I only need an AC repair in Glendale?",
        a: "No. The City's AC2HP page says repairs are not affected by the code change. A replacement, an alteration, or a new installation is what the code addresses, and we confirm with the City how it applies to your job.",
        boldLead: "No.",
        links: [
          {
            text: "AC2HP page",
            href: "https://www.glendaleca.gov/government/departments/office-of-the-city-manager/office-of-sustainability/sustainability-initiatives/heat-pump-information",
          },
        ],
      },
      {
        q: "What exceptions does Glendale's AC to heat pump code list?",
        a: "The City's page lists an electrical panel without enough capacity for a properly sized heat pump, and a required heat pump that would be more than 12,000 Btu/h larger than the existing system. It also lists alternative compliance methods for duct sealing and airflow requirements, and says all applicable exceptions in the California Energy Code apply. We confirm with the City which exception, if any, fits your home.",
        boldLead: "The City's page lists an electrical panel without enough capacity for a properly sized heat pump, and a required heat pump that would be more than 12,000 Btu/h larger than the existing system.",
        links: [
          {
            text: "The City's page",
            href: "https://www.glendaleca.gov/government/departments/office-of-the-city-manager/office-of-sustainability/sustainability-initiatives/heat-pump-information",
          },
        ],
      },
      {
        q: "Does Glendale have a noise rule that affects AC equipment?",
        a: "Yes. Glendale's Municipal Code Chapter 8.36 sets exterior noise standards by zone and names air-conditioning equipment. Section 8.36.040(A) lists 45 dBA at night and 55 dBA by day for single-family and duplex residential areas, and 60 dBA at any time for multifamily residential, hotels, motels, and transient lodgings. Nighttime runs from 10 p.m. to 7 a.m., and a pure tone, impulsive sound, or rapidly varying sound is held to a standard 5 dBA lower. The limits are not a condenser rating, and the publisher's copy shows no edition date, so we confirm how they apply to your address before we choose a condenser location.",
        boldLead: "Yes.",
        links: [
          { text: "Municipal Code Chapter 8.36", href: "https://ecode360.com/43345448" },
        ],
      },
      {
        q: "What hours can HVAC work happen in Glendale?",
        a: "Section 8.36.080 bars construction work within a residential zone, or within 500 feet of one, from 7 p.m. to 7 a.m., and from 7 p.m. Saturday to 7 a.m. Monday and around holidays, unless the person first obtains a permit from the building official. We did not confirm whether that section applies to an HVAC service call or an installation, so we confirm current hours with the City. Call (323) 776-9047 to schedule a visit.",
        boldLead: "Section 8.36.080 bars construction work within a residential zone, or within 500 feet of one, from 7 p.m. to 7 a.m., and from 7 p.m. Saturday to 7 a.m. Monday and around holidays, unless the person first obtains a permit from the building official.",
        links: [
          { text: "Section 8.36.080", href: "https://ecode360.com/43345448" },
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Do you work in condos and apartment buildings in Glendale?",
        a: "Yes. SCAG's local profile of Glendale, using California Department of Finance E-5 data for 2018, counts 80,176 housing units, with 34.6% single-family detached, 4.4% single-family attached, 8.6% in buildings of 2 to 4 units, 52.3% in buildings of 5 or more units, and 0.1% mobile homes. AIRPRO SOLUTIONS services condos, townhomes, and apartments as well as single-family homes, and in a multi-unit building we confirm equipment access and placement at the property. See our Residential HVAC page.",
        boldLead: "Yes.",
        links: [
          {
            text: "local profile",
            href: "https://sp.scag.ca.gov/sites/default/files/2024-05/glendale_localprofile.pdf",
          },
          { text: "Residential HVAC page", href: "/residential-hvac/" },
        ],
      },
      {
        q: "Does the age of Glendale homes matter for HVAC work?",
        a: "It can, and we confirm it on site. SCAG's local profile reports that 61.8% of Glendale's housing stock was built before 1970, citing the U.S. Census American Community Survey, 2017, and Nielsen Co. That is a citywide share, and age alone does not tell us about attic access, foundation type, or original ductwork, so we check them at a site visit before recommending repair or replacement.",
        boldLead: "It can, and we confirm it on site.",
        links: [
          {
            text: "local profile",
            href: "https://sp.scag.ca.gov/sites/default/files/2024-05/glendale_localprofile.pdf",
          },
        ],
      },
      {
        q: "Can I get a rebate if I am a Glendale Water & Power customer?",
        a: "Possibly, if your electric service comes from Glendale Water & Power. The City's Smart Home Rebate Program page lists rebates for ENERGY STAR room air conditioners and for heat pumps and mini-splits. It says you must be a Glendale Water & Power customer, the product must be installed in a home it serves, and applications are due within 12 months of purchase. It also says rebates are first-come, first-served until funds run out, and that the program may be changed or ended without notice. We link the page and do not quote amounts. Check your bill first.",
        boldLead: "Possibly, if your electric service comes from Glendale Water & Power.",
        links: [
          {
            text: "Smart Home Rebate Program page",
            href: "https://www.glendaleca.gov/government/departments/glendale-water-and-power/residential-customers/residential-programs/smart-home-rebate-program",
          },
        ],
      },
      {
        q: "Which rebate and incentive pages should I check before buying HVAC equipment in Glendale?",
        a: "Check the page for your electric provider first. Glendale Water & Power's Smart Home Rebate Program page lists rebates for its customers. The City's residential resources page links SoCalGas rebate information and lists the federal Energy Efficient Home Improvement Credit. Funding is limited and programs can change, so confirm eligibility with each program. We do not quote amounts.",
        boldLead: "Check the page for your electric provider first.",
        links: [
          {
            text: "Smart Home Rebate Program page",
            href: "https://www.glendaleca.gov/government/departments/glendale-water-and-power/residential-customers/residential-programs/smart-home-rebate-program",
          },
          {
            text: "residential resources page",
            href: "https://www.glendaleca.gov/government/departments/office-of-the-city-manager/glendale-office-of-sustainability/resources-for-residents-businesses/residential-resources",
          },
        ],
      },
      {
        q: "What HVAC services are available in Glendale?",
        a: "AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout Glendale, for both residential and commercial properties.",
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
        q: "Is emergency HVAC service available in Glendale?",
        a: "Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in Glendale. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.",
        boldLead: "Yes.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "How much does HVAC service cost in Glendale?",
        a: "Cost depends on the problem, the equipment, and how accessible the system is. We do not publish one flat price, so call (323) 776-9047 or request service and we will quote your specific system.",
        boldLead: "Cost depends on the problem, the equipment, and how accessible the system is.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Does AIRPRO SOLUTIONS handle commercial HVAC in Glendale?",
        a: "Yes. AIRPRO SOLUTIONS services commercial properties in Glendale, including rooftop units. The Municipal Code lists 65 dBA at any time for the central business district and commercial areas and 70 dBA at any time for industrial areas (Sec. 8.36.040(A)). We confirm the permit path with the City before work starts. See our Commercial HVAC page for the full scope.",
        boldLead: "Yes.",
        links: [
          { text: "Municipal Code", href: "https://ecode360.com/43345448" },
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
    : c.slug === 'huntington-beach' ? huntingtonBeachOverrides
    : c.slug === 'riverside' ? riversideOverrides
    : c.slug === 'ontario' ? ontarioOverrides
    : c.slug === 'corona' ? coronaOverrides
    : c.slug === 'glendale' ? glendaleOverrides
    : undefined;
  const withOverrides = overrides ? { ...c, ...overrides } : c;
  return cardImages[c.slug] ? { ...withOverrides, cardImage: cardImages[c.slug] } : withOverrides;
});

export const wave1Cities = cities.filter((c) => c.wave === 1);

export const getCity = (slug: string) => cities.find((c) => c.slug === slug);
