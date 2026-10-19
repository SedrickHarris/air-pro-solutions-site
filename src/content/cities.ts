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
  page?: CityPage; // full template content; torrance, los-angeles, long-beach, pasadena, culver-city, redondo-beach, el-segundo, gardena, irvine, anaheim, costa-mesa, huntington-beach, riverside, ontario, corona, glendale, burbank, santa-monica, inglewood, manhattan-beach, hermosa-beach, rancho-cucamonga, hawthorne, carson, santa-ana and newport-beach have this so far
  cardImage?: ServiceImage; // 800x600 card image used when this city appears in a nearby-areas row
};

// The closing sentence "Official links are in the card for this section." replaced "...beside this text." in the local
// paragraphs of Culver City, Redondo Beach, El Segundo, Gardena, Irvine, Anaheim, Costa Mesa, Huntington Beach, Riverside, Ontario,
// Corona (two places), Glendale, Burbank, Santa Monica, Inglewood, Manhattan Beach, Hermosa Beach and Hawthorne, because under 920px the card sits below the text. Carson's, Santa Ana's and Newport Beach's local paragraphs use the new sentence from the start. The client approved all city page copy, including Newport Beach, on 2026-10-19 (per the user).
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
    // Torrance, Los Angeles and Redondo Beach have live pages. Carson's page is live (carsonOverrides).
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
    // TODO(data): Glendale and Burbank now have page content (both are in sitemap.xml, which lists every city with page content); all four cards link.
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
      'Commercial and mixed-use work looks different in **Hayden Tract**, a former industrial area with an artistic community, located between two Metro E Line stations and near the Ballona Creek Bike Path. The City has published a public review draft of a Hayden Tract Specific Plan, and its Zoning Code separates residential districts (R1, R2, RLD, RMD, and RHD) from mixed-use districts. Official links are in the card for this section.',
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
      "City pages refer to **North Redondo Beach** as a local area. To see how a property is zoned, use the City's interactive zoning map; the Planning and Zoning Ordinance governs land use. For power and fuel, the City's New Resident Guide lists **Southern California Edison** for electricity and **SoCalGas** for gas. SCE lists summer demand-response programs with bill credits and TECH Clean California incentives for heat-pump HVAC, subject to equipment eligibility and available funding, so confirm current terms with SCE before you buy. Official links are in the card for this section.",
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
      "Electricity comes from **Southern California Edison** and natural gas from **SoCalGas**, and each utility's own service-area listing includes El Segundo. Both publish rebate programs, and terms and funding change, so confirm current details with the utility before you buy. For commercial properties, the City's economic-development site names **Los Angeles Air Force Base** and The Aerospace Corporation among the organizations located in El Segundo. Official links are in the card for this section.",
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
    // Client approved all Gardena wording on 2026-10-19 (per the user).
    // Code edition intentionally not stated: Gardena Municipal Code 15.06.010 adopts the 2022 California Building Code, and the ordinance table lists
    // Ord. 1888 (2026-03-10) as amending the Mechanical and Energy Codes with no edition or text. Confirm before stating any year.
    localParagraphs: [
      "Gardena's Building & Safety Division lists a **New HVAC Permit and a Forced Air Unit Permit** among its over-the-counter permits. The New HVAC Permit lists a CF1R form, and the City says permits will not be processed without the completed CF1R forms. The division accepts walk-in counter visits and appointments and asks you to bring all documents completed. **AIRPRO SOLUTIONS plans each job around your address** and can walk you through the steps.",
      "The housing is older and mixed. SCAG's 2019 local profile, using California Department of Finance data for 2018, counts about **52% of units as single-family and 42.3% as multifamily**, with 30.6% in buildings of five or more units and 5.7% as mobile homes. The same profile, citing the 2017 American Community Survey, reports that **68% of housing was built before 1970**. These figures are dated, so we confirm the equipment, access, and ductwork at the property before recommending repair or replacement.",
      "Electricity comes from **Southern California Edison** and natural gas from **SoCalGas**. The City's utility page lists both, and each utility's own service-area list includes Gardena. Both publish rebate programs, and SCE lists an Energy Savings Assistance program for income-qualified households that includes central AC and central heat pump replacement among its upgrades. SCE says some options may not be available in all areas, and terms and funding change, so confirm current details with the utility before you buy. Official links are in the card for this section.",
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
      // Client approved the emergency card wording for Gardena on 2026-10-19 (per the user).
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
          // Client approved the rebate wording on 2026-10-19 (per the user). No dollar amounts on purpose.
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
    // Client approved every FAQ answer below on 2026-10-19 (per the user). The over-the-counter permit FAQ, the SCE Energy Savings Assistance FAQ and the commercial FAQ are new for Gardena (not in the El Segundo set).
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
    // Client approved all Irvine wording on 2026-10-19 (per the user).
    // TODO(verify): confirm with the City which portal handles the residential replacement permit after 2026-09-14 (PermitsDIRECT! vs the self-service page).
    // Code edition: Irvine Municipal Code Sec. 5-9-101 (Ord. 25-26, 11-12-25) adopts the 2025 California Mechanical Code subject to Division 9 modifications.
    // The Chapter 4 mechanical amendments were not read, so the page states the edition and "local modifications" and nothing about their content.
    // Municode (Supp. 20, codified through Ord. 26-05) says it may not reflect the most current legislation.
    // Pre-launch recheck: SCE and SoCalGas program pages, Municode, the SCAG profile URL, and the City utility, rebate and permit pages.
    // OCPA intentionally left off the page.
    localParagraphs: [
      "Irvine offers an **online self-service permit for residential air conditioner and furnace replacements**. The City says the new condensing unit must be in the same location as the existing unit and at least 2 feet from any property line, and that you must obtain approval from your Homeowner's Association, if applicable, before the work. Since September 14, 2026, the City has directed new online no-plan-check applications to its PermitsDIRECT! portal, powered by Symbium, so confirm which route your project uses. **AIRPRO SOLUTIONS plans each job around your address** and can walk you through the steps.",
      "Irvine's housing leans newer and mixed. SCAG's 2019 local profile, using California Department of Finance data for 2018, counts **102,474 housing units: 38.9% single-family detached, 16.4% attached, 6.2% in buildings of 2 to 4 units, and 37.4% in buildings of 5 or more**. The same profile, citing the 2017 American Community Survey, reports that **only 4.8% of housing was built before 1970**. These figures are dated, so we confirm the equipment, access, and ductwork at the property. The City publishes an HOA map and notes that not every single-family neighborhood has an association, so we check whether one applies before choosing equipment or placement.",
      "For outdoor equipment, the City says **rooftop and ground-mounted mechanical equipment must be screened**, citing Section 3-20-1.B of its zoning ordinance. Irvine Municipal Code Sec. 6-8-205 limits noise from air conditioning, refrigeration, or heating equipment to the higher of the land-use noise standard in Sec. 6-8-204 or five decibels above the ambient noise level, and the City's code adopts the 2025 California Mechanical Code with local modifications. The City's online code notes it may not reflect the most current legislation, so confirm current rules with the City. For commercial buildings, the City has an **automated permit path for like-for-like rooftop packaged heat-pump change-outs of 20 tons or less**, with weight, roof-slope, and curb conditions, and plans prepared by the licensed mechanical contractor doing the work or the Mechanical Engineer of Record.",
      "Electricity comes from **Southern California Edison** and natural gas from **SoCalGas**, as named on the City's utility page. The City's residential rebates page links to SCE and SoCalGas programs, and SCE lists an Energy Savings Assistance program for income-qualified households that includes central AC and central heat pump replacement among its upgrades. SCE says some options may not be available in all areas, and terms and funding change, so confirm current details with the utility before you buy. Official links are in the card for this section.",
    ],
    // the housing card below restates figures already in the second local paragraph; client approved it on 2026-10-19 (per the user).
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
      // Client approved the emergency card wording for Irvine on 2026-10-19 (per the user).
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
        // Client approved the rebate wording on 2026-10-19 (per the user). No dollar amounts on purpose.
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
    // Client approved every FAQ answer below on 2026-10-19 (per the user).
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
    // Client approved all Anaheim wording on 2026-10-19 (per the user).
    // TODO(verify): confirm with the City Building Division (714-765-5153) which permits an HVAC replacement needs. Do not state any same-location exemption:
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
      "Electricity comes from **Anaheim Public Utilities**, which the City describes as a city-owned, not-for-profit utility and the only municipal electric utility in Orange County. Its rebate pages list residential incentives, and South Coast AQMD runs a separate GO ZERO heat-pump program, so confirm current terms with each before you buy. For commercial work, the City's Anaheim Resort page describes a 581-acre specific plan area of hotels, convention and conference facilities, restaurants, retail, and entertainment, and each rooftop project there is its own review. Official links are in the card for this section.",
    ],
    // the housing card below restates figures already in the second local paragraph; client approved it on 2026-10-19 (per the user).
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
        // Client approved the rebate wording on 2026-10-19 (per the user). No dollar amounts on purpose.
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
    // Client approved every FAQ answer below on 2026-10-19 (per the user).
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
    // Client approved all Costa Mesa wording on 2026-10-19 (per the user).
    // TODO(verify): confirm with Building Safety (714-754-5273) which permit path each HVAC job needs, including condos and townhomes, and whether AIRPRO SOLUTIONS holds a Costa Mesa business license (the City requires one for Insta-Permit contractors).
    // TODO(verify): noise text is from GoCodebook (2026-10 edition, text as of 2026-10-04), not the City's official publication; recheck against the official code. The code-adoption sentence does not name the Mechanical Code (Titles 5 and 7 not read).
    // Pre-launch recheck: SCE rebates, Energy Savings Assistance and Time-Of-Use pages; SoCalGas rebates page (page dated 2024-07-23, mentions 2026 funds); TECH Clean California and switchison.org status; the City's utility page (add providers only if a source names them); GoCodebook Sec. 13-280 and 13-281 against the official code; Insta-Permit page and standard plan; TESSA links; SCAG profile URL; Building Safety address.
    localParagraphs: [
      "Costa Mesa has a **Residential HVAC Insta-Permit** through its online TESSA portal, but the City limits it to a single-family dwelling on a single parcel. Its scope can include A/C condensers, forced air units, furnaces, heat pumps, mini splits, and new ductwork, and the City says exterior equipment must be installed at ground level on the side or rear of the home, where it is not visible to the public. Work beyond that scope goes to a Mechanical - Residential permit application, so **AIRPRO SOLUTIONS confirms which permit path applies** with the City before work starts, including for condos, townhomes, and apartments.",
      "The City's About page lists ZIP codes 92626, 92627, and 92628 and describes Costa Mesa as 16 square miles, just one mile from the Pacific Coast. SCAG's local profile, using California Department of Finance data for 2018, counts **42,836 housing units: 39.6% single-family detached, 10.2% attached, 13.3% in buildings of 2 to 4 units, 34.7% in buildings of 5 or more, and 2.2% mobile homes**, which makes about 48% of housing multifamily. The same profile, citing the 2017 American Community Survey, reports that **49.6% of housing was built before 1970**. These figures are dated, so we confirm the equipment, access, and ductwork at the property, and in a multi-unit building we confirm equipment access and placement.",
      "Municipal Code Sec. 13-280 sets an exterior noise standard for all residential property of **55 dB(A) from 7 a.m. to 11 p.m. and 50 dB(A) from 11 p.m. to 7 a.m.**, reduced by 5 dB(A) for impact, simple tone, speech, or music sounds, with additional duration tiers. Sec. 13-281 sets interior limits of 55 dB(A) by day and 45 dB(A) at night. The code has no section written for HVAC equipment, and the text we read comes from a third-party code host that may not reflect the most current legislation, so we confirm how the limits apply to your address before choosing a condenser location. The City's notice says it adopted the 2025 California Building Standards Code with local amendments, effective January 1, 2026.",
      "For commercial work, the City's General Plan Land Use Element describes South Coast Plaza, along the Bristol Street corridor, as the largest single concentration of retail uses in the city, a 92-acre East 17th Street commercial corridor, and a Westside with an intertwined mix of industrial, commercial, and residential uses. The City lists a separate Mechanical - Commercial permit application. Utility and state incentive programs change, so we link the SCE, SoCalGas, TECH Clean California, and The Switch Is On pages rather than quote amounts. Confirm which utility serves your address and check current eligibility before you buy. Official links are in the card for this section.",
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
        // Client approved the incentive wording on 2026-10-19 (per the user). No dollar amounts on purpose; recheck links before launch.
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
    // Client approved every FAQ answer below on 2026-10-19 (per the user).
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
    // Client approved all Huntington Beach wording on 2026-10-19 (per the user).
    // TODO(verify): confirm with the City (general office number (714) 536-5241) which permit path each HVAC job needs, and whether AIRPRO SOLUTIONS holds a Huntington Beach business license (the City asks contractors for one).
    // TODO(verify): noise text is from ecode360 (third-party host; amendments cited 3940-7/12 and 4222-9/21). The nighttime row under Low-Density Residential is unlabeled on that host, so no nighttime number is stated; recheck against the official code before adding one.
    // Pre-launch recheck: SCE rebates page, SoCalGas rebates page (dated 2024-07-23), TECH Clean California and switchison.org, CEC HEEHRA status (notice dated 2026-02-24), the City utility services page, ecode360 Sec. 8.40.050 and 8.40.090, SCAG profile URL, QuickFacts, DGS code page (not opened), water-board ZIP source if a ZIP sentence is ever added.
    localParagraphs: [
      "Huntington Beach's Permit Center issues mechanical permits along with building, electrical, plumbing, and other construction permits, and its HB ACA portal handles online permit processing, payments, project status, and inspection scheduling. The City's forms page lists a Mechanical Permit Application, Mechanical Plan Requirements, and a Mechanical Plan Check Waiver Request, and it does not say when a waiver applies. The City pages we reviewed state no like-for-like exemption, so **AIRPRO SOLUTIONS confirms which permit path applies** with the City before work starts. The City asks contractors for a current Huntington Beach business license, the matching State contractor license, and workers' compensation proof unless working alone.",
      "Huntington Beach had 198,711 residents in the 2020 U.S. Census. City sources document communities such as Huntington Harbour, which the City's Harbour Commission advises on alongside its beaches, facilities, and parks, the Oak View community, which the City describes as a square mile area, and Sunset Beach, which is listed among the City's major projects. The City also adopts specific plans for planning districts, including Downtown, Bella Terra, and the Beach-Edinger Corridor. SCAG's local profile, using California Department of Finance data for 2018, counts **81,656 housing units: 47.9% single-family detached, 11.6% attached, 11.8% in buildings of 2 to 4 units, 24.9% in buildings of 5 or more, and 3.8% mobile homes**. The same profile, citing the 2017 American Community Survey, reports that **43.5% of housing was built before 1970**. These figures are dated, so we confirm the equipment, access, and ductwork at the property, and in a multi-unit building we confirm equipment access and placement.",
      "Municipal Code Sec. 8.40.050 sets exterior noise standards by land use. For low-density residential property, the table we read lists **55 dBA Leq from 7 a.m. to 10 p.m.**, with a lower limit at night, and each limit is reduced by 5 dBA for impact, simple tone, speech, or music sounds. The code defines fixed noise sources to include air conditioners and refrigeration equipment, and we did not see a section written only for HVAC equipment. The text we read comes from a third-party code host that may not reflect the most current legislation, so we confirm how the limits apply to your address before choosing a condenser location. The City's noise FAQ says work under a valid City permit may run from 7 a.m. to 7 p.m., Monday through Friday, including Saturday, and not on Sundays or federal holidays.",
      "Replacements are also subject to California's Title 24 energy code, and the 2025 Energy Code applies to permit applications submitted on or after January 1, 2026. For an existing single-family home, the Energy Commission says replacing the outdoor or indoor unit of a split system triggers duct sealing and field verification requirements, and the Certificate of Compliance (CF1R) specifies the required tests. We did not find a Huntington Beach rule that adds to the state requirements, and we confirm what your job needs with the City.",
      "For commercial work, the City's mechanical plan requirements ask for an equipment schedule, a scaled duct layout, air-conditioning condenser locations and equipment access, and Title 24 mechanical calculations for all new HVAC systems. The City's Zoning Code includes IG and IL industrial districts. The City's utility services page lists Southern California Edison for electricity and Southern California Gas Company for natural gas. Incentive programs and funding change, so we link the SCE rebates page and the state program pages rather than quote amounts. Official links are in the card for this section.",
    ],
    // the housing card below restates figures already in the second local paragraph; client approved it on 2026-10-19 (per the user).
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
        // Client approved the incentive wording on 2026-10-19 (per the user). No dollar amounts on purpose; recheck links before launch.
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
    // Client approved every FAQ answer below on 2026-10-19 (per the user).
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
    // Client approved all Riverside wording on 2026-10-19 (per the user).
    // TODO(verify): confirm with the City (permits page lists (951) 826-5800 for fee information) which permit path each HVAC job needs, and whether AIRPRO SOLUTIONS holds a City of Riverside business license (the City requires one of contractors).
    // TODO(verify): noise text is from a third-party copy of Title 7 on nonoise.org (no current date; latest amendment citations are from 2007). Recheck against the official Municode text before relying on the numbers.
    // Pre-launch recheck: RPU residential and business rebate pages and general program guidelines (pages undated; June 2026 application is dated), City permits page, Public Permit Portal, Bulletin 140, fee schedule, California Building Standards page, Title 7 official text, SCAG profile URL, QuickFacts, General Plan PDF, top employers page, Energy Commission pages.
    localParagraphs: [
      "Riverside's Building & Safety Division issues the City's building permits, and the City's Public Permit Portal lets applicants submit permit applications and electronic plans, pay fees, track progress, and schedule inspections online. Applications can also be made at the Permit Services counter in the One Stop Shop or by mail-in or fax. The City's permits page says a permit is needed to replace an electrical, gas, mechanical, or plumbing system when the work is regulated by code. Its Bulletin 140 on work exempt from permits lists portable cooling units and the replacement of a part that does not alter the equipment's approval, and it lists no like-for-like exemption for a whole unit, so **AIRPRO SOLUTIONS confirms which permit path applies** with the City before work starts. The City says contractors must show proof of licensing that can be verified with the California Contractors State License Board and hold a current City of Riverside business license, and contractors with employees present a workers' compensation certificate when the permit is issued. The City's California Building Standards page lists the 2025 California Building Code, Mechanical Code, and Energy Code, effective January 1, 2026, and it does not describe local amendments.",
      "Riverside had an estimated 323,057 residents on July 1, 2025, up from 314,998 in the 2020 U.S. Census, and QuickFacts reports a 56.8% owner-occupied housing rate for 2020-2024. The City's General Plan identifies 28 neighborhoods, including Downtown, Arlington, La Sierra, Casa Blanca, Canyon Crest, Orangecrest, and Mission Grove, and it calls Downtown, Arlington, and La Sierra historic communities. The City describes Orangecrest, in the most southeasterly portion of the city, as a master planned community of predominantly single-family homes, with a major portion annexed in 1986. SCAG's local profile, using California Department of Finance data for 2018, counts **100,515 housing units: 64.0% single-family detached, 3.9% attached, 6.4% in buildings of 2 to 4 units, 23.5% in buildings of 5 or more, and 2.2% mobile homes**. The same profile, citing the 2017 American Community Survey, reports that **39.5% of housing was built before 1970**. These figures are dated and citywide, so we confirm the equipment, access, and ductwork at the property, and in a multi-unit building we confirm equipment access and placement.",
      "Riverside's Municipal Code Title 7 sets exterior noise standards by land use. For residential property, the copy we read lists **55 dBA from 7 a.m. to 10 p.m. and 45 dBA from 10 p.m. to 7 a.m.** (Sec. 7.25.010), and it defines fixed noise sources to include air conditioners and refrigeration devices (Sec. 7.10.070). We did not see a section written only for new HVAC equipment. Construction and repair work that creates a disturbance across a property line is restricted on weekdays from 7 p.m. to 7 a.m., on Saturdays from 5 p.m. to 8 a.m., and all day on Sundays and federal holidays, with an exception for emergency work (Sec. 7.35.010). The text we read is a third-party copy with no current date, and its latest amendment citations are from 2007, so we confirm how the limits apply to your address before choosing a condenser location. Riverside County's code enforcement says it serves unincorporated areas and refers residents of incorporated cities to local code enforcement, so the City's own code is the one to check.",
      "Replacements are also subject to California's Title 24 energy code, and the 2025 Energy Code applies to permit applications submitted on or after January 1, 2026. For an existing single-family home, the Energy Commission says replacing the outdoor or indoor unit of a split system triggers duct sealing requirements, and field verification and diagnostic testing is prescriptively required for most HVAC alterations. We did not read any Riverside amendment that adds to the state requirements, and we confirm what your job needs with the City.",
      "For commercial work, the City's top employer list includes healthcare systems, universities, school districts, county government, a military installation, retail, and hospitality, so we plan commercial visits around the building and its equipment access. Riverside Public Utilities, which the City describes as providing water and electric service, lists business air conditioning incentives that pay by the ton by efficiency level, with caps that depend on the customer's rate class and a limit of one capped rebate per program per premises each fiscal year. For homes, it lists separate rebates for central AC, electric heat pumps, tune-ups, smart thermostats, and evaporative coolers for its electric customers. Incentive programs and funding change, and RPU's pages say programs can be cancelled, modified, or reduced, so we link the program pages rather than quote amounts. We did not find a City source naming the gas provider, so confirm yours by address. Official links are in the card for this section.",
    ],
    // the two cards below restate figures already in the local paragraphs; client approved them on 2026-10-19 (per the user).
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
        // Client approved the incentive wording on 2026-10-19 (per the user). No dollar amounts on purpose; recheck links before launch.
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
    // Client approved every FAQ answer below on 2026-10-19 (per the user).
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
    // Client approved all Ontario wording on 2026-10-19 (per the user).
    // TODO(verify): confirm with the City which permit path each HVAC job needs (Building Department lists (909) 395-2023 for plan check and counter services).
    // TODO(verify): noise text is from a third-party copy of Title 5, Chapter 29 on nonoise.org (undated; cites Ord. 2888, effective March 6, 2008). Recheck against the official Municipal Code before relying on the numbers.
    // Pre-launch recheck: Applicable Codes page, fee schedule, online permitting portal, Building Permit FAQs, Chapter 5 (Aug 18, 2026 revision exists) and Chapter 6, Euclid plan guidelines, SCE and SoCalGas rebate pages, Ontario Ranch and logistics pages, SCAG profile URL, QuickFacts.
    localParagraphs: [
      "Ontario's Building Department provides plan review and inspection services, and the City's online permitting portal lets applicants apply for permits, upload plans, and pay fees after staff review. The Building Department also offers appointments and counter service at City Hall, 303 East B Street, and lists (909) 395-2023 for plan check and counter services. The City's Building Permit FAQs say no permit is required for portable comfort-cooling or evaporative cooler equipment, and the City's fee schedule, as of July 1, 2026, lists mechanical permit fees for furnaces, air handler units, evaporative coolers, wall heaters, and mini splits, with flat-fee reviews for single-family and multi-family homes. We did not find a City rule or exemption that addresses replacing a whole air conditioner or furnace like for like, so **AIRPRO SOLUTIONS confirms which permit path applies** with the City before work starts. The City's Applicable Codes page lists 2022 editions of the California Mechanical Code and Energy Code, among others, for plans filed on or after January 1, 2023, and the page is undated, so we confirm which edition applies to your project. We did not read any local amendments.",
      "Ontario had an estimated 187,013 residents on July 1, 2025, up from 175,265 in the 2020 U.S. Census, and QuickFacts reports a 58.0% owner-occupied housing rate for 2020-2024. The City's economic development site describes Ontario Ranch as a 13-square-mile master-planned community planned for 69,000 residential units at completion, with 1,200 new homes built in 2023, so Ontario's housing includes new construction as well as older homes. SCAG's local profile, using California Department of Finance data for 2018, counts **49,648 housing units: 59.0% single-family detached, 6.3% attached, 10.2% in buildings of 2 to 4 units, 20.1% in buildings of 5 or more, and 4.4% mobile homes**. The same profile, citing the American Community Survey, reports that **36.1% of housing was built before 1970**. The City's Ontario Ranch page is undated and the SCAG figures are dated and citywide, so we confirm the equipment, access, and ductwork at the property, and in a multi-unit building we confirm equipment access and placement.",
      "Ontario's Development Code points to Title 5, Chapter 29 of the Municipal Code for noise. The third-party copy we read lists exterior limits for single-family residential property of **65 dBA from 7 a.m. to 10 p.m. and 45 dBA from 10 p.m. to 7 a.m.**, and 65 dBA by day and 50 dBA at night for multi-family residential (Sec. 5-29.04). It says that when ambient noise exceeds a standard, the ambient level becomes the standard, and it does not mention air conditioners, so we did not find a rule written only for HVAC equipment. Construction activity noise is limited to weekdays from 7 a.m. to 6 p.m. and Saturdays and Sundays from 9 a.m. to 6 p.m., with exceptions including emergency work (Sec. 5-29.09). The copy cites Ord. 2888, effective March 6, 2008, comes from a host that is not the City, and has no current date, so we confirm how the limits apply to your address before choosing a condenser location.",
      "For equipment placement, the December 3, 2024 revision of Ontario's Development Code that we read sets screening standards for residential districts: for single-family dwellings, **new exterior roof-mounted mechanical, heating and air conditioning equipment is prohibited**, and for multiple-family development, roof-mounted equipment must be completely screened from public view by parapet walls or roof screens (Sec. 6.01.010). We did not confirm how those standards apply to replacing existing equipment, so we check placement with the City. Development Plan applications ask for the location of roof-mounted mechanical equipment and equipment screens, and the Euclid Mixed-Use Specific Plan in Ontario Ranch calls for screening ground- and roof-mounted mechanical equipment from public view. Replacements are also subject to California's Title 24 energy code, and the 2025 Energy Code applies to permit applications submitted on or after January 1, 2026. For an existing single-family home, the Energy Commission says replacing the outdoor or indoor unit of a split system triggers duct sealing requirements, and field verification and diagnostic testing is prescriptively required for most HVAC alterations.",
      "For commercial work, the City's economic development site reports that Ontario International Airport served 6.5 million passengers in 2023 and handled over 750,000 tons of freight, lists logistics and distribution among its target industries, and shows Ontario Ranch planning 12 million square feet of commercial and office space and 31 million square feet of industrial space, so we plan commercial visits around the building and its rooftop or ground equipment access. The City's contact pages name Southern California Edison for electric service and Southern California Gas Company for gas, and eligibility for a program follows your utility account, so confirm both on your bill. SCE's rebates page lists Golden State Rebates coupons for air conditioners and smart thermostats and a Smart Energy Program bill credit, and SoCalGas lists a rebate for qualifying gas furnaces. Programs and funding change, so we link the program pages rather than quote amounts. Official links are in the card for this section.",
    ],
    // the card below restates figures already in the second and fifth local paragraphs; client approved it on 2026-10-19 (per the user).
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
      // the housing card below restates figures already in the second local paragraph; client approved it on 2026-10-19 (per the user).
      {
        heading: "Ontario housing snapshot",
        rows: [
          { label: "Single-family detached", value: "59.0%" },
          { label: "Buildings of 5 or more units", value: "20.1%" },
          { label: "Built before 1970", value: "36.1%" },
        ],
        note: "SCAG's local profile: California Department of Finance 2018 data and American Community Survey data (year not stated).",
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
        // Client approved the incentive wording on 2026-10-19 (per the user). No dollar amounts on purpose; recheck links before launch.
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
    // Client approved every FAQ answer below on 2026-10-19 (per the user).
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
      "Corona had an estimated 161,734 residents on July 1, 2025, up from 157,136 in the 2020 U.S. Census, and QuickFacts reports a 63.8% owner-occupied housing rate for 2020-2024. SCAG's local profile, using California Department of Finance E-5 data for 2018, counts **49,277 housing units: 66.9% single-family detached, 4.3% attached, 4.5% in buildings of 2 to 4 units, 20.9% in buildings of 5 or more, and 3.4% mobile homes**. The same profile reports that **15.6% of housing was built before 1970**, citing the U.S. Census American Community Survey, 2017, and Nielsen Co. Those figures are citywide and dated, so we confirm the equipment, roof or attic access, and ductwork at the property, and in a multi-unit building we confirm equipment access and placement. The City's list of specific plans, linked in the card for this section, names plan areas such as Dos Lagos, Eagle Glen, and Downtown Corona, but a plan name does not tell us a home's age or equipment, so we draw no conclusions from it.",
      "Corona has two electric providers. The City's new-resident page says a majority of Corona residents are served by Southern California Edison, and that small areas near Dos Lagos, The Crossings, Corona Pointe, and Princeland are served by the City's Department of Water & Power. The City's electric service page says its rebates are for City of Corona electric customers, who do not receive an electric bill from Southern California Edison, so **confirm your electric provider on your bill before counting on a program**. SCE's time-of-use plan page lists summer weekday peak hours of 4 to 9 p.m. for TOU-D 4-9 PM and 5 to 8 p.m. for TOU-D 5-8 PM. Those are SCE plans, and we did not read the City's electric rate schedules. The new-resident page also links SoCalGas assistance programs. SCE's rebates page lists Golden State Rebates coupons for air conditioners and smart thermostats and a Smart Energy Program bill credit, SoCalGas lists a rebate for qualifying gas furnaces, and the City's electric service page lists residential and commercial programs for its electric customers. Programs and funding change, so we link the program pages rather than quote amounts. For commercial work, the City's economic development site says Corona's largest industries include construction, manufacturing, health care, and retail services, and the page is undated, so we plan commercial visits around the building and its rooftop or ground equipment access. Official links are in the card for this section.",
    ],
    // Client approved the Corona local paragraphs on 2026-10-18 and this card on 2026-10-19 (per the user); the card restates the first paragraph.
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
    // Client approved all Glendale wording on 2026-10-19 (per the user).
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
      "Glendale Water & Power is a City of Glendale department, and its Smart Home Rebate Program page lists rebates for ENERGY STAR room air conditioners and for heat pumps and mini-splits. The page says you must be a Glendale Water & Power customer and that the product must be installed in a home it serves, so **confirm your electric provider on your bill before counting on a program**. The City's residential resources page also links SoCalGas rebate information and lists the federal Energy Efficient Home Improvement Credit. We did not confirm Glendale's gas provider from a service-territory page and we did not read Glendale Water & Power's rate schedules. Programs and funding change, so we link the program pages rather than quote amounts. For commercial work, the City's noise code lists higher limits for commercial and industrial areas, and we plan commercial visits around the building and its rooftop or ground equipment access. Official links are in the card for this section.",
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
      // the housing card below restates figures already in the fourth local paragraph; client approved it on 2026-10-19 (per the user).
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

const burbankOverrides: Partial<City> = {
  // TODO(data): add verified climate detail before treating this as a full local page.
  neighborhoods: [], // neighborhood list held out: the cited Land Use Element does not name the research's neighborhoods
  zips: [], // ZIP list held out: the City ZIP map mixes non-Burbank ZIPs and cannot be read as a City list
  page: {
    metaDescription: "HVAC for Burbank homes and businesses, from AC repair to installation. Know the City's permit tiers and Burbank Water and Power. Licensed, 4.8-star rated.",
    lede: "AIRPRO SOLUTIONS provides HVAC services across Burbank, with AC repair, heating repair, installation, and maintenance for homes and businesses, and with the City's permit tiers and Burbank Water and Power electric service in mind.",
    heroCaption: { title: "Burbank, CA", text: "Local HVAC service across Burbank" },
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
      lead: "AIRPRO SOLUTIONS is a licensed HVAC contractor serving Burbank",
      body: ", providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, subject to capacity, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.",
    },
    glance: {
      title: "Burbank at a glance",
      stats: [
        {
          num: "102,988",
          label: "residents in the Census Bureau's July 1, 2025 estimate (U.S. Census Bureau QuickFacts)",
        },
        {
          num: "44.4%",
          label: "of 44,642 housing units are single-family detached, and 40.4% are in buildings of 5 or more units (California Department of Finance E-5, 2018, per SCAG)",
        },
        {
          num: "62.9%",
          label: "of housing was built before 1970 (U.S. Census American Community Survey, 2017; Nielsen Co., per SCAG)",
        },
      ],
      source: "Sources: U.S. Census Bureau QuickFacts and SCAG's 2019 Local Profile of Burbank.",
    },
    localTitle: "Burbank's permit tiers, codes, noise levels, and electric service",
    // Held out (no verified source): ZIP card: City 'Zip Code Areas' map lists 18 ZIPs including non-Burbank ZIPs; cannot tell which are inside the City.; Neighborhood list (Magnolia Park, Elmwood, Lake-Alameda, Peyton-Grismer, Verdugo Lake): not named in the cited Land Use Element.; Municipal Code 9-3-208 noise specifics: only a 2016 third-party copy was readable.; 2024 staff report '45 dBA most restrictive' figure: no code section or zone cited.; Gas provider: no service-territory page found.; Rebate dollar amounts (BWP heat pump, room AC, thermostat, business): link-only by rule.; BWP heat pump installer condition (licensed electrical contractor): kept off the page.; 9.9% BWP rate increase and TOU hours: not on the page read.; SoCalGas ESA no-cost furnace: research only.; Permit counter hours: conflict on the City page itself.; Outdoor-unit setbacks, historic rules, duct testing thresholds, employers, Valley-edge climate: no source.; Zoneomics rooftop-height rule: unofficial.
    // Client approved all Burbank wording on 2026-10-19 (per the user).
    // TODO(verify): code editions. The building-codes page says 2025 but its Energy Standards link points to the 2022 standards; reach-code status was not stated on the City pages read; the full Title 9 amendments were not read.
    // TODO(verify): construction-hour section number (City ordinance says 9-1-1-105.10; third-party copies say 105.8). Municipal Code text is a publisher copy.
    // Pre-launch recheck: Building Permits page, Building Codes page, Ordinance 25-4,034, Noise Element Table N-4, BWP Electrify Your Home, residential and business rebate pages, SCAG profile, QuickFacts.
    localParagraphs: [
      "Burbank's Building Permits page sorts work into two tiers. Tier 1 covers simple permits for repair and maintenance type work that do not require plan check, and the City says these can generally be obtained over the counter. Tier 2 covers work that needs plan check or zoning approval, such as commercial tenant improvements, additions, new buildings, and accessory dwelling units, and it is submitted electronically through the City's ProjectDox system after contacting Building & Safety. The page lists HVAC changeouts and mechanical ducting among the single-family permits available through Burbank Online Permits, and it names two Tier 1 HVAC scopes that need an energy report: **replacing a unit located on the roof or at the rear of the property**, and **replacing an HVAC system with new ducts or installing a new HVAC system**. It also lists mechanical exemptions, including portable cooling units, portable evaporative coolers, and replacing a part that does not change the equipment's approval or make it unsafe, and it says exemptions do not authorize work that violates the code. Which tier applies depends on the scope of the job, so **AIRPRO SOLUTIONS confirms the tier and the permit path** with the City before work starts, and we do not quote fees.",
      "The City's building codes page says Burbank adopted the 2025 California Building Code with local amendments, effective January 1, 2026. The adopted set it lists includes the California Mechanical, Electrical, and Plumbing Codes, CALGreen, and the Building Energy Efficiency Standards, and it says applications received before noon on December 31, 2025 follow the 2022 codes. The local amendments are in Title 9 of the Municipal Code, which adopts Ordinance No. 25-4,034. We did not find a Burbank reach code on the City pages we read, and we did not read the full text of the local amendments, so **we confirm the code edition and any local amendment** that applies to your project before work starts.",
      "Burbank's General Plan Noise Element, in Table N-4, lists typical hourly noise levels for stationary sources at exterior spaces: **55 dBA by day (7 a.m. to 10 p.m.) and 45 dBA at night (10 p.m. to 7 a.m.)**, and 50 dBA by day and 40 dBA at night for tonal, impulsive, repetitive, or speech and music sounds. A footnote says the City may apply stricter or looser standards depending on ambient levels. That table is part of the General Plan, not a Municipal Code limit and not a condenser rating, and we did not confirm how the City applies it to a specific air conditioner. Construction hours in Municipal Code Sec. 9-1-1-105.10, as adopted by Ordinance No. 25-4,034, are **7 a.m. to 7 p.m. Monday to Friday and 8 a.m. to 5 p.m. on Saturday**, with no construction work on Sundays and City holidays, and exceptions that include owner-builder and emergency work. We have not confirmed how those hours apply to a particular installation, so ask us about timing for your address.",
      "Burbank had an estimated 102,988 residents on July 1, 2025, and QuickFacts reports a 43.3% owner-occupied housing rate for 2020-2024. SCAG's 2019 Local Profile, using California Department of Finance E-5 data for 2018, counts **44,642 housing units: 44.4% single-family detached, 4.3% attached, 10.6% in buildings of 2 to 4 units, 40.4% in buildings of 5 or more, and 0.3% mobile homes**. The same profile reports that **62.9% of housing was built before 1970**, citing the U.S. Census American Community Survey, 2017, and Nielsen Co. Those figures are citywide and dated, so we confirm the equipment, roof or attic access, and ductwork at the property, and in a multi-unit building we confirm equipment access and placement. The City's Land Use Element describes the Rancho neighborhood's equestrian character and describes the Media District Commercial designation as a regional employment center of media-oriented and commercial uses, with a Media District Specific Plan adopted in 1991. A Rancho home, an apartment building, and a commercial site each have different access and equipment placement, so we look at each property on its own terms.",
      "Burbank Water and Power (BWP) describes itself as a not-for-profit organization owned by the citizens of Burbank. Its Electrify Your Home page lists a heat pump HVAC rebate for central heat pumps and mini-splits, with conditions that include replacing a gas appliance, no new construction, an application within six months, and first-come, first-served funding that is not guaranteed. BWP's residential rebates page lists rebates for ENERGY STAR room air conditioners and smart thermostats, and its business rebates page lists a catalog that includes package terminal and heat pump HVAC equipment. Programs and funding change, so we link the program pages rather than quote amounts, and **confirm your electric provider on your bill before counting on a program**. We did not confirm Burbank's gas provider from a service-territory page, so we ask which utility serves the address. For commercial work, we plan rooftop access and equipment placement with the building owner or manager. Official links are in the card for this section.",
    ],
    localCards: [
      {
        heading: "Burbank permit tiers",
        rows: [
          { label: "Tier 1", value: "Simple repair and maintenance permits with no plan check, generally over the counter" },
          { label: "Tier 2", value: "Work needing plan check or zoning approval, submitted through ProjectDox" },
          { label: "Energy report (Tier 1)", value: "Roof or rear-of-property unit replacement, and replacement with new ducts or a new HVAC system" },
          { label: "Online permits", value: "HVAC changeout and mechanical ducting for single-family homes" },
        ],
        note: "From the City's Building Permits page, which shows no update date. We confirm the tier with the City.",
      },
      {
        heading: "Burbank noise levels and work hours",
        rows: [
          { label: "Stationary sources, day", value: "55 dBA typical hourly level (7 a.m. to 10 p.m.)" },
          { label: "Stationary sources, night", value: "45 dBA (10 p.m. to 7 a.m.)" },
          { label: "Tonal or impulsive, day and night", value: "50 dBA and 40 dBA" },
          { label: "Construction hours", value: "7 a.m. to 7 p.m. Monday to Friday, 8 a.m. to 5 p.m. Saturday" },
          { label: "Sundays and City holidays", value: "No construction work, with exceptions" },
        ],
        note: "Noise Element Table N-4 is a General Plan table, not a Municipal Code limit or a condenser rating. Hours are from Municipal Code Sec. 9-1-1-105.10 (Ordinance No. 25-4,034).",
      },
    ],
    neighborhoodsHeading: "Official Burbank resources",
    officialResources: [
      {
        text: "Building Permits",
        href: "https://www.burbankca.gov/web/community-development/building-permits",
        note: "Permit tiers, energy report scopes, and exemptions.",
      },
      {
        text: "Building Codes",
        href: "https://www.burbankca.gov/web/community-development/building-codes",
        note: "The 2025 code set, the 2022 transition, and local amendments.",
      },
      {
        text: "Ordinance No. 25-4,034",
        href: "https://www.burbankca.gov/documents/d/community-development/25-4-034-adopting-by-reference-2025-ca-building-standards-code?download=true",
        note: "Adopts the 2025 California Building Standards Code.",
      },
      {
        text: "Municipal Code, Title 9",
        href: "https://ecode360.com/BU4369",
        note: "Buildings and construction, as the City links it (publisher copy).",
      },
      {
        text: "General Plan Noise Element",
        href: "https://www.burbankca.gov/documents/173607/1541047/20130213_Chapter+5+-+Noise.pdf/49ad50b9-b22c-299c-8072-9a6709a62802?version=1.0&imagePreview=1",
        note: "Table N-4 stationary source levels and the ambient footnote.",
      },
      {
        text: "General Plan Land Use Element",
        href: "https://www.burbankca.gov/documents/173607/1541047/20130213_Chapter+3+-+Land+Use.pdf/8130d103-3e0c-ac0d-9e31-99802742bb9a?t=1637190558920",
        note: "Rancho and Media District Commercial descriptions.",
      },
      {
        text: "Electrify Your Home",
        href: "https://www.burbankwaterandpower.com/electrify-your-home",
        note: "Burbank Water and Power heat pump HVAC rebate and its conditions.",
      },
      {
        text: "Residential rebates",
        href: "https://www.burbankwaterandpower.com/residential-rebates",
        note: "Room air conditioner and smart thermostat rebates.",
      },
      {
        text: "Business rebates",
        href: "https://www.burbankwaterandpower.com/business-rebates",
        note: "Burbank Water and Power catalog and custom rebates for businesses.",
      },
      {
        text: "SCAG Burbank local profile",
        href: "https://sp.scag.ca.gov/sites/default/files/2024-05/burbank_localprofile.pdf",
        note: "Housing counts and building age cited on this page.",
      },
      {
        text: "Census QuickFacts",
        href: "https://www.census.gov/quickfacts/fact/table/burbankcitycalifornia/PST045224",
        note: "Population and owner-occupied rate cited on this page.",
      },
    ],
    servicesTitle: "Everything we handle for Burbank homes and businesses",
    serviceCards: [
      {
        slug: "ac-repair",
        name: "AC Repair",
        body: "Diagnosis and repair for cooling failures, weak airflow, and unusual noises, with the City's published noise levels for stationary equipment in mind.",
      },
      {
        slug: "ac-installation",
        name: "AC Installation & Replacement",
        body: "New system sizing and installation, planned around the City's permit tiers, the energy report scopes it lists, and the 2025 codes.",
      },
      {
        slug: "ac-maintenance",
        name: "AC Maintenance",
        body: "Seasonal AC tune-ups that catch small issues early, for homes and for commercial rooftop and ground units.",
      },
      {
        slug: "heating-repair",
        name: "Heating Repair",
        body: "Furnace and heating system diagnosis and repair for Burbank homes and businesses.",
      },
      {
        slug: "furnace-installation",
        name: "Furnace Installation & Replacement",
        body: "Furnace sizing and installation, planned around Burbank's permit process. We confirm the permit path with the City first.",
      },
      {
        slug: "heat-pump-services",
        name: "Heat Pump Services",
        body: "Heat pump installation, repair, and maintenance, with Burbank Water and Power's heat pump rebate conditions in mind. Check the program page for current terms.",
      },
      {
        slug: "ductless-mini-split",
        name: "Ductless Mini-Split",
        body: "Ductless systems for additions, converted spaces, and rooms the existing ducts do not reach. Burbank Water and Power also lists mini-splits in its heat pump rebate.",
      },
      {
        slug: "ductwork",
        name: "Ductwork Services",
        body: "Duct repair, sealing, and replacement. The City lists replacement with new ducts as a Tier 1 scope that needs an energy report.",
      },
      {
        slug: "indoor-air-quality",
        name: "Indoor Air Quality",
        body: "Filtration, ventilation, and air-quality upgrades for Burbank homes and offices.",
      },
      {
        slug: "emergency-hvac",
        name: "Emergency HVAC",
        body: "24/7 emergency dispatch for no-cool and no-heat problems. If you smell gas, leave the building and call 911 or your gas utility.",
      },
    ],
    resources: {
      eyebrow: "Know before you start",
      title: "Burbank permits, codes, and incentive programs",
      intro: "Official sources for three local items worth checking before a Burbank HVAC project.",
      cards: [
        {
          amount: "Permit tiers",
          description: "The City's Building Permits page sorts work into Tier 1 simple permits and Tier 2 permits that need plan check or zoning approval, and it lists two HVAC scopes that need an energy report. Check which tier your project falls in before choosing equipment.",
          linkLabel: "Building Permits page",
          linkHref: "https://www.burbankca.gov/web/community-development/building-permits",
        },
        {
          amount: "Codes",
          description: "The City's building codes page says Burbank adopted the 2025 California codes with local amendments, effective January 1, 2026. We did not find a Burbank reach code, and we confirm what applies to your project.",
          linkLabel: "Building Codes",
          linkHref: "https://www.burbankca.gov/web/community-development/building-codes",
        },
        {
          amount: "Incentive programs",
          description: "Your electric provider decides which programs apply. Burbank Water and Power lists a heat pump HVAC rebate, room air conditioner and smart thermostat rebates, and business rebates. Terms and funding change, and we do not quote amounts, so check the current terms before you buy.",
          linkLabel: "Electrify Your Home",
          linkHref: "https://www.burbankwaterandpower.com/electrify-your-home",
        },
      ],
    },
    nearby: [],
    proof: {
      heading: "Licensed, reviewed, and ready across Burbank",
      body: "AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.",
      stats: [
        { num: "4.8★", label: "Google rating" },
        { num: "40", label: "Google reviews" },
        { num: "C-20", label: "California license class" },
        { num: "24/7", label: "Emergency dispatch" },
      ],
    },
    finalCtaBody: "Call or request service online to schedule a visit anywhere in Burbank. Same-day service is typical, subject to capacity.",
    faqs: [
      {
        q: "Does AIRPRO SOLUTIONS service all of Burbank?",
        a: "Yes. AIRPRO SOLUTIONS serves homes and businesses across Burbank as part of our Los Angeles County coverage. Burbank's Building & Safety office answers permit questions at (818) 238-5220, so we plan each visit around your specific address.",
        boldLead: "Yes.",
        links: [
          { text: "Los Angeles County coverage", href: "/service-areas/los-angeles-county/" },
          { text: "Building & Safety office", href: "https://www.burbankca.gov/web/community-development/building-permits" },
        ],
      },
      {
        q: "How fast can a technician reach my Burbank home?",
        a: "Same-day service is typical in Burbank, subject to capacity. Call (323) 776-9047 to confirm a window for your address.",
        boldLead: "Same-day service is typical in Burbank, subject to capacity.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Do I need a permit to replace an air conditioner in Burbank?",
        a: "The City lists HVAC replacement as permit work. Its Building Permits page includes HVAC changeouts among the single-family permits available through Burbank Online Permits, and it lists mechanical exemptions such as portable cooling units, portable evaporative coolers, and replacing a part that does not change the equipment's approval or make it unsafe. AIRPRO SOLUTIONS confirms the permit path with the City before work starts, and we do not quote fees.",
        boldLead: "The City lists HVAC replacement as permit work.",
        links: [
          { text: "Building Permits page", href: "https://www.burbankca.gov/web/community-development/building-permits" },
        ],
      },
      {
        q: "Which Burbank HVAC replacements need an energy report?",
        a: "The City lists two Tier 1 scopes. Its Building Permits page says an energy report is required when a unit on the roof or at the rear of the property is replaced, and when an HVAC system is replaced with new ducts or a new HVAC system is installed. We confirm the requirement for your project with the City before work starts.",
        boldLead: "The City lists two Tier 1 scopes.",
        links: [
          { text: "Building Permits page", href: "https://www.burbankca.gov/web/community-development/building-permits" },
        ],
      },
      {
        q: "What is the difference between Tier 1 and Tier 2 permits in Burbank?",
        a: "Tier 1 is for simple permits with no plan check. The City describes them as repair and maintenance type work and says they can generally be obtained over the counter. Tier 2 is for work that needs plan check or zoning approval, such as commercial tenant improvements, additions, new buildings, and accessory dwelling units, and it is submitted electronically through ProjectDox after contacting Building & Safety. Which tier applies depends on the scope, so we confirm it with the City.",
        boldLead: "Tier 1 is for simple permits with no plan check.",
        links: [
          { text: "Building & Safety", href: "https://www.burbankca.gov/web/community-development/building-permits" },
        ],
      },
      {
        q: "Which building codes apply to a new HVAC project in Burbank?",
        a: "The 2025 California codes with Burbank's local amendments. The City's building codes page says Burbank adopted the 2025 California Building Code with local amendments, effective January 1, 2026, and that applications received before noon on December 31, 2025 follow the 2022 codes. The local amendments are in Title 9 of the Municipal Code and Ordinance No. 25-4,034. We confirm the edition for your permit with the City.",
        boldLead: "The 2025 California codes with Burbank's local amendments.",
        links: [
          { text: "building codes page", href: "https://www.burbankca.gov/web/community-development/building-codes" },
          { text: "Ordinance No. 25-4,034", href: "https://www.burbankca.gov/documents/d/community-development/25-4-034-adopting-by-reference-2025-ca-building-standards-code?download=true" },
        ],
      },
      {
        q: "Does Burbank have a reach code that changes AC replacement?",
        a: "We did not find a Burbank reach code on the City pages we read, but we did not read the full text of the local amendments in Title 9 of the Municipal Code. We confirm what applies to your project before work starts.",
        boldLead: "We did not find a Burbank reach code on the City pages we read,",
        links: [
          { text: "Title 9 of the Municipal Code", href: "https://ecode360.com/BU4369" },
        ],
      },
      {
        q: "How loud can an outdoor AC unit be in Burbank?",
        a: "The City publishes noise levels in its General Plan. Table N-4 of the Noise Element lists typical hourly levels for stationary sources at exterior spaces of 55 dBA by day and 45 dBA at night, and 50 and 40 dBA for tonal, impulsive, repetitive, or speech and music sounds. A footnote says the City may apply stricter or looser standards by ambient level. This is a General Plan table, not a Municipal Code limit and not a condenser rating, and we did not confirm how the City applies it to a specific air conditioner.",
        boldLead: "The City publishes noise levels in its General Plan.",
        links: [
          { text: "Noise Element", href: "https://www.burbankca.gov/documents/173607/1541047/20130213_Chapter+5+-+Noise.pdf/49ad50b9-b22c-299c-8072-9a6709a62802?version=1.0&imagePreview=1" },
        ],
      },
      {
        q: "What hours can HVAC installation work happen in Burbank?",
        a: "Municipal Code construction hours are 7 a.m. to 7 p.m. Monday to Friday and 8 a.m. to 5 p.m. on Saturday, with no construction work on Sundays and City holidays, and exceptions that include owner-builder and emergency work. They come from Sec. 9-1-1-105.10, adopted by Ordinance No. 25-4,034. We have not confirmed how the hours apply to a particular installation, so ask us about timing for your address.",
        boldLead: "Municipal Code construction hours are 7 a.m. to 7 p.m. Monday to Friday and 8 a.m. to 5 p.m. on Saturday,",
        links: [
          { text: "Ordinance No. 25-4,034", href: "https://www.burbankca.gov/documents/d/community-development/25-4-034-adopting-by-reference-2025-ca-building-standards-code?download=true" },
        ],
      },
      {
        q: "What about HVAC in Burbank condos and apartment buildings?",
        a: "Multi-unit buildings add access and placement questions. About 40.4% of Burbank's 44,642 housing units are in buildings of 5 or more units, according to SCAG's 2019 Local Profile using California Department of Finance data for 2018, so we confirm equipment access and placement with the property owner or manager at the address.",
        boldLead: "Multi-unit buildings add access and placement questions.",
        links: [
          { text: "SCAG's 2019 Local Profile", href: "https://sp.scag.ca.gov/sites/default/files/2024-05/burbank_localprofile.pdf" },
        ],
      },
      {
        q: "Does the age of my Burbank home matter for HVAC?",
        a: "Age is one factor we check. SCAG's 2019 Local Profile reports that 62.9% of Burbank housing was built before 1970, citing the U.S. Census American Community Survey, 2017, and Nielsen Co. That is a citywide, dated figure, so we confirm the equipment, roof or attic access, and ductwork at your property.",
        boldLead: "Age is one factor we check.",
        links: [
          { text: "SCAG's 2019 Local Profile", href: "https://sp.scag.ca.gov/sites/default/files/2024-05/burbank_localprofile.pdf" },
        ],
      },
      {
        q: "Does Burbank Water and Power offer HVAC rebates?",
        a: "Burbank Water and Power lists heat pump, room air conditioner, and smart thermostat rebates. Its Electrify Your Home page lists a heat pump HVAC rebate for central heat pumps and mini-splits, and its residential rebates page lists rebates for ENERGY STAR room air conditioners and smart thermostats. The heat pump page says the equipment must replace a gas appliance, new construction does not qualify, and funding is first-come, first-served and not guaranteed. Terms and funding change, and we do not quote amounts, so check the current terms before you buy.",
        boldLead: "Burbank Water and Power lists heat pump, room air conditioner, and smart thermostat rebates.",
        links: [
          { text: "Electrify Your Home page", href: "https://www.burbankwaterandpower.com/electrify-your-home" },
          { text: "residential rebates page", href: "https://www.burbankwaterandpower.com/residential-rebates" },
        ],
      },
      {
        q: "Are there Burbank rebates for commercial HVAC?",
        a: "Burbank Water and Power lists business rebates. Its business rebates page lists a catalog and custom rebates. The catalog includes package terminal HVAC and heat pump equipment, with amounts in the downloadable catalog. Terms and funding change, so check the current terms before you buy.",
        boldLead: "Burbank Water and Power lists business rebates.",
        links: [
          { text: "business rebates page", href: "https://www.burbankwaterandpower.com/business-rebates" },
        ],
      },
      {
        q: "Which utility serves my Burbank address?",
        a: "Your bill answers it. Check which company provides your electric and gas service before counting on a program. We did not confirm Burbank's gas provider from a service-territory page, so we ask which utility serves the address.",
        boldLead: "Your bill answers it.",
        links: [],
      },
      {
        q: "What HVAC services are available in Burbank?",
        a: "AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout Burbank, for both residential and commercial properties.",
        boldLead: "AIRPRO SOLUTIONS provides",
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
        q: "Is emergency HVAC service available in Burbank?",
        a: "Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in Burbank. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.",
        boldLead: "Yes.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "How much does HVAC service cost in Burbank?",
        a: "Cost depends on the problem, the equipment, and how accessible the system is. We do not publish one flat price, so call (323) 776-9047 or request service and we will quote your specific system.",
        boldLead: "Cost depends on the problem, the equipment, and how accessible the system is.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Does AIRPRO SOLUTIONS handle commercial HVAC in Burbank?",
        a: "Yes. AIRPRO SOLUTIONS services commercial properties in Burbank, including rooftop units. The City's Land Use Element describes the Media District Commercial designation as a regional employment center of media-oriented and commercial uses. Work that needs plan check or zoning approval, such as commercial tenant improvements, follows Tier 2 on the City's Building Permits page, and we confirm the permit path with the City before work starts. See our Commercial HVAC page for the full scope.",
        boldLead: "Yes.",
        links: [
          { text: "Land Use Element", href: "https://www.burbankca.gov/documents/173607/1541047/20130213_Chapter+3+-+Land+Use.pdf/8130d103-3e0c-ac0d-9e31-99802742bb9a?t=1637190558920" },
          { text: "Building Permits page", href: "https://www.burbankca.gov/web/community-development/building-permits" },
          { text: "Commercial HVAC page", href: "/commercial-hvac/" },
        ],
      },
    ],
  },
};

const santaMonicaOverrides: Partial<City> = {
  // TODO(data): add verified climate detail before treating this as a full local page.
  neighborhoods: [], // neighborhood list held out: the City land use document would not load, so the names are unverified
  zips: [], // ZIP list held out: no official source states the City's ZIPs (see held out comment below)
  page: {
    metaDescription: "HVAC for Santa Monica homes and businesses, from AC repair to installation. Know the City's permit review and equipment noise rules. Licensed, 4.8-star rated.",
    lede: "AIRPRO SOLUTIONS provides HVAC services across Santa Monica, with AC repair, heating repair, installation, and maintenance for homes and businesses, and with the City's permit review and equipment noise rules in mind.",
    heroCaption: { title: "Santa Monica, CA", text: "Local HVAC service across Santa Monica" },
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
      lead: "AIRPRO SOLUTIONS is a licensed HVAC contractor serving Santa Monica",
      body: ", providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, subject to capacity, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.",
    },
    glance: {
      title: "Santa Monica at a glance",
      stats: [
        {
          num: "90,082",
          label: "residents in the Census Bureau's July 1, 2025 estimate (U.S. Census Bureau QuickFacts)",
        },
        {
          num: "67.4%",
          label: "of 52,441 housing units are in buildings of 5 or more units, and 18.6% are single-family detached (California Department of Finance E-5, 2018, per SCAG)",
        },
        {
          num: "56.2%",
          label: "of housing was built before 1970 (U.S. Census American Community Survey, 2017; Nielsen Co., per SCAG)",
        },
      ],
      source: "Sources: U.S. Census Bureau QuickFacts and SCAG's 2019 Local Profile of Santa Monica.",
    },
    localTitle: "Santa Monica's permit review, equipment noise rules, codes, and electric service",
    // Held out (no verified source): ZIP card: the only ZIP source is a Housing Authority payment-standard table (90401 to 90405) that does not say these are the City's ZIPs; SoCalGas lists 90402 and 90403 in a wildfire section without naming the City. | Neighborhood names (North of Montana, Wilshire-Montana, Pico, Sunset Park, Ocean Park, Mid-City, Northeast, Downtown): the City land use PDF (LUCE) would not load, so the names are unverified. | Climate, NOAA normals and heat-day counts: NOAA ICAC1 is a National Ocean Service water level and meteorological station, not a buoy and not a normals source; the Wikipedia 63 to 71F range is third-party. | Permit Services Center address, hours and paperless wording: the City page returned a bot-detection page. | Express Permit HVAC scopes: not named on the pages read. | MEP Plan Check Thresholds values: separate PDF not read. | Zero Emission Building Code status: City page says enforcement is paused (no date), a news report says Council replaced it in September 2024 with an Energy Performance Approach effective October 24, 2024. | SMMC 9.21.140 screening rule: seen only in a project approval. | Gas provider: no service-territory page found. | All rebate dollar amounts and wildfire-related SoCalGas items: link-only by rule. | SCE Smart Energy Program authorized-service-provider condition: kept off the page. | Outdoor-unit setbacks, historic-property rules, duct testing thresholds, zoning map, HOA areas: no source. | Competitor SERP table: never on the page.
    // Client approved all Santa Monica wording on 2026-10-19 (per the user).
    // TODO(verify): Sec. 4.12.130 applies to 'development project applications'. Whether the City applies it to a like-for-like AC replacement permit is unconfirmed. Chapter 4.12 text is the ecode360 publisher copy (core sections added by Ord. 2115CCS, 2/24/04; 4.12.020 and 4.12.050 amended by Ord. 2679CCS, 8/24/21); no overall edition date shown.
    // TODO(verify): code edition: the plan review page says 2025 California Standards Code effective January 1, 2026; reach-code and Zero Emission Building Code status are unresolved (see held out list) and are not on the page.
    // Pre-launch recheck: plan review page, Same-Day Review page, Permit Services Center page (hours, address; blocked here), noise program page, Chapter 4.12 (official code), SCE Golden State Rebates and Smart Energy Program pages, SoCalGas rebates page, City Clean Power Alliance post (2019), SCAG profile, QuickFacts, Principal Employers report.
    localParagraphs: [
      "The City's plan review page lists **mechanical installations among the minor projects that may qualify for Same-Day Review**, approved at the public counter, and says mechanical, electrical, or plumbing work over the City's thresholds is not eligible and goes to formal Plan Review. It also says Santa Monica evaluates applications under the 2025 California Standards Code, effective January 1, 2026, and that submittals received on or before December 31, 2025 stay on the 2022 code cycle unless major plan revisions or permit expirations require re-evaluation. The threshold table is in a City PDF we did not read, so we do not assume which track a job gets. A Title 24 report is among the supporting documents the page lists. Applications start in Citizen Access, with the application and supporting documents uploaded to ProjectDox, and the City assigns a project number before the counter visit. A licensed contractor, or in certain circumstances the property owner, can pull the permit in person or through Virtual Permit Issuance, and inspections are scheduled through the City's eInspections site. The page also says plan review timelines are delayed beyond the estimated timeframes, so **AIRPRO SOLUTIONS confirms the review track and the code edition with the City** before work starts, and we do not quote fees or promise permit dates.",
      "Santa Monica's noise code reaches the equipment itself. Chapter 4.12 of the Municipal Code defines mechanical equipment to include air conditioners, and Sec. 4.12.130 says development project applications must list permanent mechanical equipment placed outdoors and indoor equipment that can be heard outdoors. **Before a building permit is issued, that equipment needs a noise analysis showing it meets the Sec. 4.12.060 limits.** The same section says equipment may not sit on the side of a building next to a residential building on the adjoining lot unless compliance is shown, allows roof locations when the equipment is inside a noise-attenuating structure, and requires a noise test for final approval of the location, with the owner or contractor supplying the test equipment and sending the results to the Community Noise Officer. Sec. 4.12.130 is written for development project applications, and we did not confirm how the City applies it to a like-for-like air conditioner replacement, so **AIRPRO SOLUTIONS asks the City whether an analysis or test applies to your job** before we place or replace outdoor equipment. The code text we read is the ecode360 publisher copy, not the official code.",
      "The limits that analysis points to are measured community noise levels, not a condenser's manufacturer rating. The City sorts property into three noise zones: Zone I is residential districts and excludes the Santa Monica Pier, Zone II is non-residential districts and includes the Pier, and Zone III is the industrial conservation district. In Zone I, Sec. 4.12.060(a) sets **50 dBA over a 15-minute measurement from 10 p.m. to 7 a.m. Monday to Friday and from 10 p.m. to 8 a.m. on weekends, and 60 dBA during the day**. Zone II is 60 dBA at night and 65 dBA by day, and Zone III is 70 dBA at any time. The table also lists 5-minute limits that run 5 dBA higher, the standard drops by 5 dBA for impulsive or simple tone noise, and where ambient noise already exceeds the standard the ambient level becomes the standard. Construction hours in Sec. 4.12.110 are **8 a.m. to 6 p.m. Monday to Friday and 9 a.m. to 5 p.m. on Saturday**, with no construction on Sundays and eight listed holidays unless the City permits otherwise. We have not confirmed how those hours apply to a particular installation, so ask us about timing for your address.",
      "Santa Monica had an estimated 90,082 residents on July 1, 2025, and QuickFacts reports a 27.9% owner-occupied housing rate for 2020-2024. SCAG's 2019 Local Profile, using California Department of Finance E-5 data for 2018, counts **52,441 housing units: 18.6% single-family detached, 3.5% attached, 10.1% in buildings of 2 to 4 units, 67.4% in buildings of 5 or more, and 0.4% mobile homes**. The same profile reports that **56.2% of housing was built before 1970**, citing the U.S. Census American Community Survey, 2017, and Nielsen Co. Those figures are citywide and dated, so we confirm the equipment, roof or attic access, and ductwork at the property. In a multi-unit building we confirm equipment access and placement with the owner or manager, and we check the lot against the City's rule on equipment next to residential buildings. On the commercial side, the City's October 2024 Principal Employers report lists UCLA Medical Center Santa Monica, Providence Saint John's Health Center, Amazon, Snap, and Santa Monica College among the largest employers, and for commercial work we plan rooftop access and equipment placement with the building owner or manager.",
      "Southern California Edison delivers electricity in Santa Monica. A City post dated April 12, 2019 says Clean Power Alliance buys the power while SCE still owns and reads the meter and sends the bill, so SCE's programs are the first place to look. SCE lists Golden State Rebates coupons for air conditioners, smart thermostats, and heat pump and gas water heaters, redeemed at participating retailers, and its Smart Energy Program offers a bill credit for enrolling a qualifying smart thermostat. SoCalGas lists a rebate for ENERGY STAR furnaces, with funding first come, first served through December 31, 2026 or until it runs out. Programs and funding change and some restrict combining incentives on the same equipment, so we link the program pages rather than quote amounts, and **confirm your utility accounts on your bills before counting on a program**. We did not confirm Santa Monica's gas provider from a service-territory page, so we ask which utility serves the address. Official links are in the card for this section.",
    ],
    localCards: [
      {
        heading: "Santa Monica permit path",
        rows: [
          { label: "Same-Day Review", value: "Certain minor projects, including mechanical installations, approved at the counter" },
          { label: "Plan Review", value: "Mechanical, electrical, or plumbing work over the City's thresholds" },
          { label: "Code edition", value: "2025 California Standards Code, effective January 1, 2026" },
          { label: "Earlier submittals", value: "On or before December 31, 2025 stay on the 2022 code cycle, with exceptions" },
          { label: "How to apply", value: "Citizen Access, then ProjectDox uploads" },
        ],
        note: "From the City's plan review and Same-Day Review pages. The threshold table is a separate City PDF we did not read.",
      },
      {
        heading: "Santa Monica equipment noise rules",
        rows: [
          { label: "Applies to", value: "Development project applications with permanent outdoor mechanical equipment, or indoor equipment audible outdoors" },
          { label: "Before the permit", value: "Noise analysis showing compliance with Sec. 4.12.060" },
          { label: "Siting", value: "Not on a building side adjacent to a residential building on the adjoining lot, unless compliance is shown" },
          { label: "Roof", value: "Allowed inside a noise-attenuating structure" },
          { label: "Final approval", value: "Noise test run by the owner or contractor, results to the Community Noise Officer" },
        ],
        note: "Sec. 4.12.130, from the ecode360 publisher copy, which shows no overall edition date. We confirm with the City whether it applies to a replacement.",
      },
    ],
    neighborhoodsHeading: "Official Santa Monica resources",
    officialResources: [
      {
        text: "Plan review",
        href: "https://www.santamonica.gov/plan-review",
        note: "Same-Day Review, Plan Review, and the 2025 code edition.",
      },
      {
        text: "Same-Day Review steps",
        href: "https://www.santamonica.gov/process-explainers/how-to-submit-for-same-day-review-at-building-permit-counter",
        note: "Citizen Access, ProjectDox, and what qualifies.",
      },
      {
        text: "eInspections",
        href: "https://einspections.smgov.net",
        note: "Schedule inspections for issued permits.",
      },
      {
        text: "Noise program",
        href: "https://www.santamonica.gov/programs/noise",
        note: "Noise zones, limits, and construction hours.",
      },
      {
        text: "Municipal Code, Chapter 4.12",
        href: "https://ecode360.com/42727200",
        note: "Noise ordinance, including Sec. 4.12.130 (publisher copy).",
      },
      {
        text: "SCE Golden State Rebates",
        href: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace",
        note: "Instant rebate coupons at participating retailers.",
      },
      {
        text: "SCE Smart Energy Program",
        href: "https://www.sce.com/save-money/savings-programs/enroll-in-savings-programs/smart-energy-program",
        note: "Smart thermostat enrollment credit and event rules.",
      },
      {
        text: "SoCalGas rebates",
        href: "https://www.socalgas.com/savings/rebates-and-incentives",
        note: "ENERGY STAR furnace rebate and program period.",
      },
      {
        text: "City post on Clean Power Alliance",
        href: "https://santamonica.gov/blog/answering-questions-about-the-clean-power-alliance",
        note: "Who buys power and who delivers it (dated April 12, 2019).",
      },
      {
        text: "SCAG Santa Monica local profile",
        href: "https://sp.scag.ca.gov/sites/default/files/2024-05/santamonica_localprofile.pdf",
        note: "Housing counts and building age cited on this page.",
      },
      {
        text: "Census QuickFacts",
        href: "https://www.census.gov/quickfacts/fact/table/santamonicacitycalifornia/PST045224",
        note: "Population and owner-occupied rate cited on this page.",
      },
      {
        text: "Principal Employers 2024",
        href: "https://www.santamonica.gov/media/Economic_Recovery/2024_Principal_Employers.pdf",
        note: "The City's October 2024 employer report.",
      },
    ],
    servicesTitle: "Everything we handle for Santa Monica homes and businesses",
    serviceCards: [
      {
        slug: "ac-repair",
        name: "AC Repair",
        body: "Diagnosis and repair for cooling failures, weak airflow, and unusual noises, with the City's measured noise limits for outdoor equipment in mind.",
      },
      {
        slug: "ac-installation",
        name: "AC Installation & Replacement",
        body: "New system sizing and installation, planned around the City's review tracks, the 2025 code edition, and the noise rules that can apply to outdoor equipment.",
      },
      {
        slug: "ac-maintenance",
        name: "AC Maintenance",
        body: "Seasonal AC tune-ups that catch small issues early, for homes and for commercial rooftop and ground units.",
      },
      {
        slug: "heating-repair",
        name: "Heating Repair",
        body: "Furnace and heating system diagnosis and repair for Santa Monica homes and businesses.",
      },
      {
        slug: "furnace-installation",
        name: "Furnace Installation & Replacement",
        body: "Furnace sizing and installation, planned around the City's permit process. We confirm the review track with the City first.",
      },
      {
        slug: "heat-pump-services",
        name: "Heat Pump Services",
        body: "Heat pump installation, repair, and maintenance, with the City's equipment noise rules and your electric utility's program pages in mind.",
      },
      {
        slug: "ductless-mini-split",
        name: "Ductless Mini-Split",
        body: "Ductless systems for additions, converted spaces, and rooms the existing ducts do not reach, with outdoor unit placement checked against the City's noise rules.",
      },
      {
        slug: "ductwork",
        name: "Ductwork Services",
        body: "Duct repair, sealing, and replacement for Santa Monica homes and buildings.",
      },
      {
        slug: "indoor-air-quality",
        name: "Indoor Air Quality",
        body: "Filtration, ventilation, and air-quality upgrades for Santa Monica homes and offices.",
      },
      {
        slug: "emergency-hvac",
        name: "Emergency HVAC",
        body: "24/7 emergency dispatch for no-cool and no-heat problems. If you smell gas, leave the building and call 911 or your gas utility.",
      },
    ],
    resources: {
      eyebrow: "Know before you start",
      title: "Santa Monica noise rules, permits, and incentive programs",
      intro: "Official sources for three local items worth checking before a Santa Monica HVAC project.",
      cards: [
        {
          amount: "Equipment noise",
          description: "Chapter 4.12 of the Municipal Code sets noise limits by zone, and Sec. 4.12.130 covers the location and testing of mechanical equipment. Check how it applies to your project before choosing equipment and a location.",
          linkLabel: "Noise Ordinance, Chapter 4.12",
          linkHref: "https://ecode360.com/42727200",
        },
        {
          amount: "Permit review",
          description: "The City's plan review page lists mechanical installations among the minor projects that may qualify for Same-Day Review, and says work over its thresholds goes to formal Plan Review. We confirm the review track with the City.",
          linkLabel: "Plan review page",
          linkHref: "https://www.santamonica.gov/plan-review",
        },
        {
          amount: "Incentive programs",
          description: "Your utility accounts decide which programs apply. SCE lists Golden State Rebates and a Smart Energy Program, and SoCalGas lists an ENERGY STAR furnace rebate. Terms and funding change, and we do not quote amounts, so check the current terms before you buy.",
          linkLabel: "SCE Golden State Rebates",
          linkHref: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace",
        },
      ],
    },
    nearby: [],
    proof: {
      heading: "Licensed, reviewed, and ready across Santa Monica",
      body: "AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.",
      stats: [
        { num: "4.8★", label: "Google rating" },
        { num: "40", label: "Google reviews" },
        { num: "C-20", label: "California license class" },
        { num: "24/7", label: "Emergency dispatch" },
      ],
    },
    finalCtaBody: "Call or request service online to schedule a visit anywhere in Santa Monica. Same-day service is typical, subject to capacity.",
    faqs: [
      {
        q: "Does AIRPRO SOLUTIONS service all of Santa Monica?",
        a: "Yes. AIRPRO SOLUTIONS serves homes and businesses across Santa Monica as part of our Los Angeles County coverage. The City runs its own plan review and permit process, so we plan each visit around your specific address.",
        boldLead: "Yes.",
        links: [
          { text: "Los Angeles County coverage", href: "/service-areas/los-angeles-county/" },
          { text: "plan review and permit process", href: "https://www.santamonica.gov/plan-review" },
        ],
      },
      {
        q: "How fast can a technician reach my Santa Monica home?",
        a: "Same-day service is typical in Santa Monica, subject to capacity. Call (323) 776-9047 to confirm a window for your address.",
        boldLead: "Same-day service is typical in Santa Monica, subject to capacity.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Do I need a permit to replace an air conditioner in Santa Monica?",
        a: "The City reviews mechanical installations through its permit process. Its plan review page lists mechanical installations among the minor projects that may qualify for Same-Day Review at the counter, and says mechanical, electrical, or plumbing work over the City's thresholds goes to formal Plan Review. We did not read the threshold table or confirm which like-for-like replacements, if any, are exempt, so AIRPRO SOLUTIONS confirms the permit path with the City before work starts, and we do not quote fees.",
        boldLead: "The City reviews mechanical installations through its permit process.",
        links: [
          { text: "plan review page", href: "https://www.santamonica.gov/plan-review" },
        ],
      },
      {
        q: "What is Same-Day Review in Santa Monica?",
        a: "It is a counter review track for certain minor projects. The City says projects such as reroofs, mechanical installations, facade remodels and repairs, and patio covers may be reviewed and approved in one counter visit, and that work over its mechanical, electrical, and plumbing thresholds is not eligible. Applicants start in Citizen Access and upload documents to ProjectDox first, and the City warns that incomplete uploads can delay the visit. See the City's Same-Day Review page for the steps.",
        boldLead: "It is a counter review track for certain minor projects.",
        links: [
          { text: "Same-Day Review page", href: "https://www.santamonica.gov/process-explainers/how-to-submit-for-same-day-review-at-building-permit-counter" },
        ],
      },
      {
        q: "Which building codes apply to a new HVAC project in Santa Monica?",
        a: "The 2025 California Standards Code. The City's plan review page says current submittals are evaluated under it, effective January 1, 2026, and that submittals received on or before December 31, 2025 remain on the 2022 code cycle unless major plan revisions or permit expirations require re-evaluation. A Title 24 report is among the supporting documents the page lists. We confirm the edition for your permit with the City.",
        boldLead: "The 2025 California Standards Code.",
        links: [
          { text: "plan review page", href: "https://www.santamonica.gov/plan-review" },
        ],
      },
      {
        q: "How do I apply for a Santa Monica HVAC permit, and who can pull it?",
        a: "Applications start in Citizen Access. The application, plans if applicable, and supporting documents are uploaded to ProjectDox, and the City assigns a project number before the counter visit. The City's plan review page says a licensed contractor, or a property owner under certain circumstances, can pull the permit in person or through Virtual Permit Issuance, and inspections are scheduled through eInspections. AIRPRO SOLUTIONS confirms the process for your job with the City.",
        boldLead: "Applications start in Citizen Access.",
        links: [
          { text: "plan review page", href: "https://www.santamonica.gov/plan-review" },
          { text: "eInspections", href: "https://einspections.smgov.net" },
        ],
      },
      {
        q: "How long does plan review take in Santa Monica?",
        a: "The City says plan review timelines are delayed. Its plan review page says timelines are delayed beyond the estimated timeframes. We do not promise permit dates, and we confirm the review track with the City before we schedule work.",
        boldLead: "The City says plan review timelines are delayed.",
        links: [
          { text: "plan review page", href: "https://www.santamonica.gov/plan-review" },
        ],
      },
      {
        q: "How does Santa Monica's noise code apply to an outdoor AC unit?",
        a: "The City sets measured limits by noise zone. In residential Zone I, Sec. 4.12.060(a) lists 50 dBA over a 15-minute measurement at night and 60 dBA by day. Zone II is 60 dBA at night and 65 dBA by day, and Zone III is 70 dBA at any time. These are community noise levels measured at an exterior location on the affected property, not a condenser's manufacturer rating, and the standard drops by 5 dBA for impulsive or simple tone noise. We confirm the zone for your address before choosing equipment and a location.",
        boldLead: "The City sets measured limits by noise zone.",
        links: [
          { text: "Sec. 4.12.060(a)", href: "https://ecode360.com/42727200" },
        ],
      },
      {
        q: "Does Santa Monica require a noise analysis for HVAC equipment?",
        a: "The code requires one for development project applications. Sec. 4.12.130 says those applications must list permanent outdoor mechanical equipment and indoor equipment audible outdoors, that the equipment needs a noise analysis showing compliance before a building permit is issued, and that final approval of the location requires a noise test. The code defines mechanical equipment to include air conditioners. We did not confirm whether the City applies this to a like-for-like replacement, so we ask the City before we install.",
        boldLead: "The code requires one for development project applications.",
        links: [
          { text: "Sec. 4.12.130", href: "https://ecode360.com/42727200" },
        ],
      },
      {
        q: "Where can an outdoor AC unit go on a Santa Monica property?",
        a: "The code limits equipment on the side of a building next to a residence. Sec. 4.12.130(b) says mechanical equipment may not be on the side of a building adjacent to a residential building on the adjoining lot unless compliance with the noise limits is shown, and that roof locations may be used when the equipment is inside a noise-attenuating structure. We did not confirm a separate citywide condenser setback rule, so we check the property before recommending a location.",
        boldLead: "The code limits equipment on the side of a building next to a residence.",
        links: [
          { text: "Sec. 4.12.130(b)", href: "https://ecode360.com/42727200" },
        ],
      },
      {
        q: "What hours can HVAC installation work happen in Santa Monica?",
        a: "Municipal Code construction hours are 8 a.m. to 6 p.m. Monday to Friday and 9 a.m. to 5 p.m. on Saturday, with no construction on Sundays or on eight listed holidays. They come from Sec. 4.12.110 of Chapter 4.12, and the City can allow work outside those hours by permit when it finds that in the public interest. We have not confirmed how the hours apply to a particular installation, so ask us about timing for your address.",
        boldLead: "Municipal Code construction hours are 8 a.m. to 6 p.m. Monday to Friday and 9 a.m. to 5 p.m. on Saturday,",
        links: [
          { text: "Chapter 4.12", href: "https://ecode360.com/42727200" },
        ],
      },
      {
        q: "What about HVAC in Santa Monica condos and apartment buildings?",
        a: "Multi-unit buildings add access and placement questions. About 67.4% of Santa Monica's 52,441 housing units are in buildings of 5 or more units, according to SCAG's 2019 Local Profile using California Department of Finance data for 2018, so we confirm equipment access and placement with the property owner or manager, and we check the lot against the City's rule on equipment next to residential buildings.",
        boldLead: "Multi-unit buildings add access and placement questions.",
        links: [
          { text: "SCAG's 2019 Local Profile", href: "https://sp.scag.ca.gov/sites/default/files/2024-05/santamonica_localprofile.pdf" },
        ],
      },
      {
        q: "Does the age of my Santa Monica home matter for HVAC?",
        a: "Age is one factor we check. SCAG's 2019 Local Profile reports that 56.2% of Santa Monica housing was built before 1970, citing the U.S. Census American Community Survey, 2017, and Nielsen Co. That is a citywide, dated figure, so we confirm the equipment, roof or attic access, and ductwork at your property.",
        boldLead: "Age is one factor we check.",
        links: [
          { text: "SCAG's 2019 Local Profile", href: "https://sp.scag.ca.gov/sites/default/files/2024-05/santamonica_localprofile.pdf" },
        ],
      },
      {
        q: "Which utility serves my Santa Monica address?",
        a: "Your bill answers it. Check which companies provide your electric and gas service before counting on a program. A City post dated April 12, 2019 says Clean Power Alliance buys the electricity and Southern California Edison delivers it, owns and reads the meter, and sends the bill. We did not confirm Santa Monica's gas provider from a service-territory page, so we ask which utility serves the address.",
        boldLead: "Your bill answers it.",
        links: [
          { text: "City post", href: "https://santamonica.gov/blog/answering-questions-about-the-clean-power-alliance" },
        ],
      },
      {
        q: "Are there HVAC rebates for Santa Monica customers?",
        a: "SCE and SoCalGas list programs. SCE lists Golden State Rebates coupons for air conditioners, smart thermostats, and water heaters, redeemed at participating retailers, and a Smart Energy Program with a bill credit for enrolling a qualifying smart thermostat. SoCalGas lists a rebate for ENERGY STAR furnaces, with funding first come, first served through December 31, 2026 or until it runs out. Terms and funding change, some programs restrict combining incentives on the same equipment, and we do not quote amounts, so check the current terms before you buy.",
        boldLead: "SCE and SoCalGas list programs.",
        links: [
          { text: "Golden State Rebates", href: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace" },
          { text: "Smart Energy Program", href: "https://www.sce.com/save-money/savings-programs/enroll-in-savings-programs/smart-energy-program" },
          { text: "ENERGY STAR furnaces", href: "https://www.socalgas.com/savings/rebates-and-incentives" },
        ],
      },
      {
        q: "What HVAC services are available in Santa Monica?",
        a: "AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout Santa Monica, for both residential and commercial properties.",
        boldLead: "AIRPRO SOLUTIONS provides",
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
        q: "Is emergency HVAC service available in Santa Monica?",
        a: "Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in Santa Monica. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.",
        boldLead: "Yes.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "How much does HVAC service cost in Santa Monica?",
        a: "Cost depends on the problem, the equipment, and how accessible the system is. We do not publish one flat price, so call (323) 776-9047 or request service and we will quote your specific system.",
        boldLead: "Cost depends on the problem, the equipment, and how accessible the system is.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Does AIRPRO SOLUTIONS handle commercial HVAC in Santa Monica?",
        a: "Yes. AIRPRO SOLUTIONS services commercial properties in Santa Monica, including rooftop units. The City's October 2024 Principal Employers report lists UCLA Medical Center Santa Monica, Providence Saint John's Health Center, Amazon, Snap, and Santa Monica College among the largest employers. Commercial properties fall in different noise zones than residential ones, and we confirm the zone and the permit path with the City before work starts. See our Commercial HVAC page for the full scope.",
        boldLead: "Yes.",
        links: [
          { text: "Principal Employers report", href: "https://www.santamonica.gov/media/Economic_Recovery/2024_Principal_Employers.pdf" },
          { text: "Commercial HVAC page", href: "/commercial-hvac/" },
        ],
      },
    ],
  },
};

const inglewoodOverrides: Partial<City> = {
  // TODO(data): add verified climate detail before treating this as a full local page.
  neighborhoods: [], // neighborhood list held out: Wikipedia is the only source, so the names are unverified
  zips: [], // ZIP list held out: no official City or USPS source in the research (see held out comment below)
  page: {
    metaDescription: "HVAC for Inglewood homes and businesses, from AC repair to installation. Know the City's permit process and local housing. Licensed, 4.8-star rated.",
    lede: "AIRPRO SOLUTIONS provides HVAC services across Inglewood, with AC repair, heating repair, installation, and maintenance for homes and businesses, and with the City's permit process and local housing stock in mind.",
    heroCaption: { title: "Inglewood, CA", text: "Local HVAC service across Inglewood" },
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
      lead: "AIRPRO SOLUTIONS is a licensed HVAC contractor serving Inglewood",
      body: ", providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, subject to capacity, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.",
    },
    glance: {
      title: "Inglewood at a glance",
      stats: [
        { num: "101,662", label: "residents in the Census Bureau's July 1, 2025 estimate (U.S. Census Bureau QuickFacts)" },
        {
          num: "41.0%",
          label: "of 38,655 housing units are in buildings of 5 or more units, and 38.2% are single-family detached (California Department of Finance E-5, 2018, per SCAG)",
        },
        { num: "70%", label: "of housing was built before 1970 (U.S. Census American Community Survey, 2017; Nielsen Co., per SCAG)" },
      ],
      source: "Sources: U.S. Census Bureau QuickFacts and SCAG's 2019 Local Profile of Inglewood.",
    },
    localTitle: "Inglewood's permits, housing stock, and utility programs",
    // Held out (no verified source): Noise code: Municipal Code Chapter 5, Article 2 (Sec. 5-27 base levels, Sec. 5-39 machinery, equipment, fans and air conditioning) was read only in a third-party copy (nonoise.org, printed date 6/11/2016, no edition line, official code location not confirmed). Not published (user decision needed, see open-items). | ZIP card (90301 to 90312) and neighborhood names (Morningside Park, Downtown, Fairview Heights, Arbor Village, Hollypark Knolls, Centinela Heights, Century Heights, Inglewood Knolls, Lockhaven): Wikipedia only, no official City or USPS source. | Climate, NOAA normals, heat-day counts, humidity: no station verified for Inglewood. | Neighboring cities and the nearby row: no official source named them. | Building Safety address, phone, hours, QLESS appointments, the dedicated HVAC application and the January 5, 2026 engineer stamp rule: the City Building Safety page returned only an intro line and the applications and fees page would not load. | Electric and gas provider (SCE and SoCalGas): the City New to the City page would not load, so neither is stated for Inglewood. | Zoning Chapter 12, zoning map and overlay map: the City Zoning Codes and Map Gallery pages would not load. | South Coast AQMD: Inglewood is listed under Los Angeles County Western Region (verified), and the basin exceeded the 8-hour ozone standard on 124 days in 2022 (preliminary). No sourced HVAC tie, so not used on the page. | Employers, shopping centers, schools, hospitals, industrial areas, HOA areas, setbacks, historic-district rules, median year built: no source. | All rebate dollar amounts; federal Section 25C and 25D status; HEEHRA status; SCE older heat pump discounts and the TECH $1,000 incentive; SCE Building Electrification (closed); Clean Power Alliance room AC coupon (Inglewood account eligibility unconfirmed). | SoCalGas licensed-contractor and permit-closure conditions and SCE approved-contractor wording: kept off the page. | Competitor SERP table: never on the page.
    // Client approved all Inglewood wording on 2026-10-19 (per the user).
    // TODO(verify): General Information page (City page 237) was read through a fetch summary: it lists building, electrical, plumbing, sewer, mechanical, and grading permits, shows no date, and does not use the term HVAC. Re-read it directly.
    // TODO(verify): Online permit portal: only the navigation menu was readable (Building, Planning/Zoning, Public Works permits). It does not mention HVAC, inspections or fees.
    // TODO(verify): SoCalGas terms come from the 2026 residential application PDF (form code J087-228EEC 0926, no stated publication date). SCE Energy Savings Assistance page shows no publication date (income limits June 1, 2026 to May 31, 2027).
    // Pre-launch recheck: City Building Safety page, General Information page, applications and fees page, online permit portal, New to the City page, Chapter 5 noise text (official code), SoCalGas rebates page and 2026 application, SCE Energy Savings Assistance, rebate directory and service area pages, SCAG profile, QuickFacts.
    localParagraphs: [
      "The City of Inglewood's Building Safety Division issues building, electrical, plumbing, sewer, mechanical, and grading permits, according to the City's General Information page, which shows no update date. The page does not use the term HVAC, so **AIRPRO SOLUTIONS confirms the permit path for your job with the City** before work starts. The City also runs an online permit portal where applicants can start a Building Permit, Planning/Zoning Permits, or Public Works Permits, but the pages we read do not say which application an air conditioner or furnace replacement uses, whether any like-for-like replacement is exempt, or which code edition applies. The General Information page says fees depend on the project's type and complexity, so we do not quote permit fees or promise permit dates.",
      "Inglewood had an estimated 101,662 residents on July 1, 2025, and QuickFacts reports a 36.2% owner-occupied housing rate for 2020-2024. SCAG's 2019 Local Profile, using California Department of Finance E-5 data for 2018, counts **38,655 housing units: 38.2% single-family detached, 6.0% attached, 14.3% in buildings of 2 to 4 units, 41.0% in buildings of 5 or more, and 0.5% mobile homes**. The same profile reports that **70 percent of the housing stock was built before 1970**, citing the U.S. Census American Community Survey, 2017, and Nielsen Co. Those figures are citywide and dated, so we confirm the equipment, roof or attic access, and ductwork at the property. In a multi-unit building we confirm equipment access and placement with the owner or manager, and for commercial work we plan rooftop access and equipment placement with the building owner or manager.",
      "SoCalGas and Southern California Edison each publish their own programs, and your bills show which companies serve your address. We did not confirm Inglewood's electric or gas provider from a service-territory page, so we ask which utility serves the address before counting on a program. SoCalGas lists a 2026 rebate for ENERGY STAR central natural gas furnaces in existing occupied homes, with purchase and installation from January 1 to December 31, 2026 and funding first come, first served until that date or until it runs out. SCE's Energy Savings Assistance program lists central AC or central heat pump replacement among the upgrades income-qualified households may receive at no cost, and says services may not be available in all areas and a co-payment may be required for some services. SCE's rebate directory lists Golden State Rebates coupons for air conditioners and smart thermostats at participating retailers, and a Home Performance Plus program for customers in disadvantaged or low-income communities, and we did not confirm whether an Inglewood address qualifies. Terms and funding change and some programs restrict combining incentives on the same equipment, so we link the program pages rather than quote amounts, and **confirm your utility accounts on your bills before counting on a program**. Official links are in the card for this section.",
    ],
    localCards: [
      {
        heading: "Inglewood permit path",
        rows: [
          { label: "Permit types listed", value: "Building, electrical, plumbing, sewer, mechanical, and grading" },
          { label: "HVAC replacement", value: "Application, exemptions, and code edition are not stated on the pages we read" },
        ],
        note: "From the City's General Information page, which shows no update date, and the menu of its online permit portal. We confirm the path with the City.",
      },
    ],
    neighborhoodsHeading: "Official Inglewood resources",
    officialResources: [
      {
        text: "Building Safety Division",
        href: "https://www.cityofinglewood.org/236/Building-Safety",
        note: "The City's Building Safety Division page.",
      },
      {
        text: "General Information",
        href: "https://www.cityofinglewood.org/237/General-Information",
        note: "Permit types the Division issues and fee wording.",
      },
      {
        text: "Online permit portal",
        href: "https://aca-prod.accela.com/inglewood/Default.aspx",
        note: "Search applications and start a Building Permit.",
      },
      {
        text: "SoCalGas rebates",
        href: "https://www.socalgas.com/savings/rebates-and-incentives",
        note: "ENERGY STAR furnace rebate and program period.",
      },
      {
        text: "SoCalGas 2026 rebate application",
        href: "https://www.socalgas.com/sites/default/files/2026-03/SCG-HEER-Application.pdf.pdf",
        note: "Furnace terms and program dates (PDF).",
      },
      {
        text: "SCE Energy Savings Assistance",
        href: "https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program",
        note: "Income-qualified no-cost upgrades and eligibility.",
      },
      {
        text: "SCE Golden State Rebates",
        href: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace",
        note: "Instant coupons and Home Performance Plus.",
      },
      {
        text: "SCE service area",
        href: "https://www.sce.com/customer-service-center/help-center/stop-start-move-service/faq/how-to-know-if-sce-is-my-electric-utility",
        note: "Check whether SCE serves your address.",
      },
      {
        text: "SCAG Inglewood local profile",
        href: "https://sp.scag.ca.gov/sites/default/files/2024-05/inglewood_localprofile.pdf",
        note: "Housing counts and building age cited on this page.",
      },
      {
        text: "Census QuickFacts",
        href: "https://www.census.gov/quickfacts/fact/table/inglewoodcitycalifornia/PST045224",
        note: "Population and owner-occupied rate cited on this page.",
      },
    ],
    servicesTitle: "Everything we handle for Inglewood homes and businesses",
    serviceCards: [
      {
        slug: "ac-repair",
        name: "AC Repair",
        body: "Diagnosis and repair for cooling failures, weak airflow, and unusual noises in Inglewood homes and businesses.",
      },
      {
        slug: "ac-installation",
        name: "AC Installation & Replacement",
        body: "New system sizing and installation, planned around the City's permit process. We confirm the permit path with the City first.",
      },
      {
        slug: "ac-maintenance",
        name: "AC Maintenance",
        body: "Seasonal AC tune-ups that catch small issues early, for homes and for commercial rooftop and ground units.",
      },
      { slug: "heating-repair", name: "Heating Repair", body: "Furnace and heating system diagnosis and repair for Inglewood homes and businesses." },
      {
        slug: "furnace-installation",
        name: "Furnace Installation & Replacement",
        body: "Furnace sizing and installation, planned around the City's permit process. SoCalGas lists a furnace rebate with its own terms.",
      },
      {
        slug: "heat-pump-services",
        name: "Heat Pump Services",
        body: "Heat pump installation, repair, and maintenance, with the City's permit process and your utilities' program pages in mind.",
      },
      {
        slug: "ductless-mini-split",
        name: "Ductless Mini-Split",
        body: "Ductless systems for additions, converted spaces, and rooms the existing ducts do not reach.",
      },
      { slug: "ductwork", name: "Ductwork Services", body: "Duct repair, sealing, and replacement for Inglewood homes and buildings." },
      {
        slug: "indoor-air-quality",
        name: "Indoor Air Quality",
        body: "Filtration, ventilation, and air-quality upgrades for Inglewood homes and offices.",
      },
      {
        slug: "emergency-hvac",
        name: "Emergency HVAC",
        body: "24/7 emergency dispatch for no-cool and no-heat problems. If you smell gas, leave the building and call 911 or your gas utility.",
      },
    ],
    resources: {
      eyebrow: "Know before you start",
      title: "Inglewood permits and incentive programs",
      intro: "Official sources for three items worth checking before an Inglewood HVAC project.",
      cards: [
        {
          amount: "Permit review",
          description: "The City's General Information page lists mechanical permits among the permits its Building Safety Division issues, and says fees depend on the project's type and complexity. We confirm the permit path with the City.",
          linkLabel: "General Information page",
          linkHref: "https://www.cityofinglewood.org/237/General-Information",
        },
        {
          amount: "Furnace rebate",
          description: "SoCalGas lists a 2026 rebate for ENERGY STAR central natural gas furnaces in existing occupied homes, with purchase and installation between January 1 and December 31, 2026. Funding is first come, first served and may run out, and we do not quote amounts.",
          linkLabel: "SoCalGas rebates",
          linkHref: "https://www.socalgas.com/savings/rebates-and-incentives",
        },
        {
          amount: "No-cost assistance",
          description: "SCE's Energy Savings Assistance program lists central AC or central heat pump replacement among the upgrades income-qualified households may receive at no cost. It says services may not be available in all areas, so check eligibility with SCE.",
          linkLabel: "SCE Energy Savings Assistance",
          linkHref: "https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program",
        },
      ],
    },
    nearby: [],
    proof: {
      heading: "Licensed, reviewed, and ready across Inglewood",
      body: "AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.",
      stats: [
        { num: "4.8★", label: "Google rating" },
        { num: "40", label: "Google reviews" },
        { num: "C-20", label: "California license class" },
        { num: "24/7", label: "Emergency dispatch" },
      ],
    },
    finalCtaBody: "Call or request service online to schedule a visit anywhere in Inglewood. Same-day service is typical, subject to capacity.",
    faqs: [
      {
        q: "Does AIRPRO SOLUTIONS service all of Inglewood?",
        a: "Yes. AIRPRO SOLUTIONS serves homes and businesses across Inglewood as part of our Los Angeles County coverage. The City's Building Safety Division runs its own permits, so we plan each visit around your specific address.",
        boldLead: "Yes.",
        links: [
          { text: "Los Angeles County coverage", href: "/service-areas/los-angeles-county/" },
          { text: "Building Safety Division", href: "https://www.cityofinglewood.org/236/Building-Safety" },
        ],
      },
      {
        q: "How fast can a technician reach my Inglewood home?",
        a: "Same-day service is typical in Inglewood, subject to capacity. Call (323) 776-9047 to confirm a window for your address.",
        boldLead: "Same-day service is typical in Inglewood, subject to capacity.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Do I need a permit to replace an air conditioner in Inglewood?",
        a: "The City's Building Safety Division issues mechanical permits. Its General Information page lists mechanical permits among the permits the Division issues, and says fees depend on the project's type and complexity. We did not find which like-for-like replacements, if any, are exempt, so AIRPRO SOLUTIONS confirms the permit path with the City before work starts, and we do not quote permit fees.",
        boldLead: "The City's Building Safety Division issues mechanical permits.",
        links: [
          { text: "General Information page", href: "https://www.cityofinglewood.org/237/General-Information" },
        ],
      },
      {
        q: "How do I start an Inglewood permit application?",
        a: "Start with the City's online portal. The City's permit portal menu lets applicants search applications and start a Building Permit, Planning/Zoning Permits, or Public Works Permits. The pages we read do not say which one an HVAC replacement uses, so AIRPRO SOLUTIONS confirms the application and the process for your job with the City.",
        boldLead: "Start with the City's online portal.",
        links: [
          { text: "permit portal", href: "https://aca-prod.accela.com/inglewood/Default.aspx" },
        ],
      },
      {
        q: "Does the age of my Inglewood home matter for HVAC?",
        a: "Age is one factor we check. SCAG's 2019 Local Profile reports that 70 percent of Inglewood's housing stock was built before 1970, citing the U.S. Census American Community Survey, 2017, and Nielsen Co. That is a citywide, dated figure, so we confirm the equipment, roof or attic access, and ductwork at your property.",
        boldLead: "Age is one factor we check.",
        links: [
          { text: "SCAG's 2019 Local Profile", href: "https://sp.scag.ca.gov/sites/default/files/2024-05/inglewood_localprofile.pdf" },
        ],
      },
      {
        q: "What about HVAC in Inglewood condos and apartment buildings?",
        a: "Multi-unit buildings add access and placement questions. About 41.0% of Inglewood's 38,655 housing units are in buildings of 5 or more units, according to SCAG's 2019 Local Profile using California Department of Finance data for 2018, so we confirm equipment access and placement with the property owner or manager before installation or replacement.",
        boldLead: "Multi-unit buildings add access and placement questions.",
        links: [
          { text: "SCAG's 2019 Local Profile", href: "https://sp.scag.ca.gov/sites/default/files/2024-05/inglewood_localprofile.pdf" },
        ],
      },
      {
        q: "Which utility serves my Inglewood address?",
        a: "Your bill answers it. Check which companies provide your electric and gas service before counting on a program. SCE publishes a service area page for checking its territory. We did not confirm Inglewood's electric or gas provider from a service-territory page, so we ask which utility serves the address.",
        boldLead: "Your bill answers it.",
        links: [
          {
            text: "service area page",
            href: "https://www.sce.com/customer-service-center/help-center/stop-start-move-service/faq/how-to-know-if-sce-is-my-electric-utility",
          },
        ],
      },
      {
        q: "Are there HVAC rebates for Inglewood customers?",
        a: "SoCalGas and SCE list programs. SoCalGas lists a rebate for ENERGY STAR central natural gas furnaces in existing occupied homes, with purchase and installation from January 1 to December 31, 2026 and funding first come, first served. SCE lists Golden State Rebates coupons for air conditioners and smart thermostats at participating retailers, and Home Performance Plus for customers in disadvantaged or low-income communities. We did not confirm whether an Inglewood address qualifies for the SCE programs. Terms and funding change, some programs restrict combining incentives on the same equipment, and we do not quote amounts, so check the current terms before you buy.",
        boldLead: "SoCalGas and SCE list programs.",
        links: [
          { text: "rebate for ENERGY STAR central natural gas furnaces", href: "https://www.socalgas.com/savings/rebates-and-incentives" },
          { text: "Golden State Rebates", href: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace" },
          { text: "Home Performance Plus", href: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace" },
        ],
      },
      {
        q: "Is there no-cost HVAC help for income-qualified Inglewood households?",
        a: "Possibly, for income-qualified households. SCE's Energy Savings Assistance program lists central AC or central heat pump replacement among the upgrades eligible households may receive for free, and says services may not be available in all areas, restrictions may apply, and a co-payment may be required for some services. Eligibility depends on household income and the property, so check with SCE before counting on it.",
        boldLead: "Possibly, for income-qualified households.",
        links: [
          { text: "Energy Savings Assistance program", href: "https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program" },
        ],
      },
      {
        q: "What HVAC services are available in Inglewood?",
        a: "AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout Inglewood, for both residential and commercial properties.",
        boldLead: "AIRPRO SOLUTIONS provides",
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
        q: "Is emergency HVAC service available in Inglewood?",
        a: "Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in Inglewood. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.",
        boldLead: "Yes.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "How much does HVAC service cost in Inglewood?",
        a: "Cost depends on the problem, the equipment, and how accessible the system is. We do not publish one flat price, so call (323) 776-9047 or request service and we will quote your specific system.",
        boldLead: "Cost depends on the problem, the equipment, and how accessible the system is.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Does AIRPRO SOLUTIONS handle commercial HVAC in Inglewood?",
        a: "Yes. AIRPRO SOLUTIONS services commercial properties in Inglewood, including rooftop units. We confirm the permit path with the City before commercial work starts, and we plan rooftop access and equipment placement with the building owner or manager. See our Commercial HVAC page for the full scope.",
        boldLead: "Yes.",
        links: [
          { text: "Commercial HVAC page", href: "/commercial-hvac/" },
        ],
      },
    ],
  },
};

const manhattanBeachOverrides: Partial<City> = {
  // TODO(data): add verified climate detail before treating this as a full local page.
  neighborhoods: [], // neighborhood list held out: no official City source read, so no names are published
  zips: [], // ZIP list held out: no official City or USPS list of Manhattan Beach ZIPs (see held out comment below)
  page: {
    metaDescription: "HVAC for Manhattan Beach homes and businesses, from AC repair to installation. Know the City's permit process and local housing. Licensed, 4.8-star rated.",
    lede: "AIRPRO SOLUTIONS provides HVAC services across Manhattan Beach, with AC repair, heating repair, installation, and maintenance for homes and businesses, and with the City's permit process and mechanical equipment requirements in mind.",
    heroCaption: { title: "Manhattan Beach, CA", text: "Local HVAC service across Manhattan Beach" },
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
      lead: "AIRPRO SOLUTIONS is a licensed HVAC contractor serving Manhattan Beach",
      body: ", providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, subject to capacity, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.",
    },
    glance: {
      title: "Manhattan Beach at a glance",
      stats: [
        {
          num: "33,122",
          label: "residents in the Census Bureau's July 1, 2025 estimate (U.S. Census Bureau QuickFacts)",
        },
        {
          num: "69.3%",
          label: "of 15,059 housing units are single-family detached, and 16.3% are in buildings of 2 to 4 units (California Department of Finance E-5, 2018, per SCAG)",
        },
        {
          num: "57.2%",
          label: "of housing was built before 1970 (U.S. Census American Community Survey, 2017; Nielsen Co., per SCAG)",
        },
      ],
      source: "Sources: U.S. Census Bureau QuickFacts and SCAG's 2019 Local Profile of Manhattan Beach.",
    },
    localTitle: "Manhattan Beach's permits, housing stock, and utility programs",
    // Held out (no verified source): Noise code: the only HVAC noise figures found (a 55 dBA daytime and 50 dBA nighttime threshold, nighttime 10 p.m. to 7 a.m., cited as MBMC 5.48.160 and Table 6) come from a January 19, 2021 consultant memo attached to a hotel project staff report, not from the code text. The official Municipal Code location was not readable. Not published (user decision needed, see open-items). | ZIP card (90266 appears only as the City Community Development street address, 90267 only on third-party lists): no official City or USPS list of Manhattan Beach ZIPs. | Neighborhood names and any flat, hillside or coastal labels: no official City source read. | Climate, NOAA normals, heat-day counts, humidity, marine layer: no station verified for Manhattan Beach. | Neighboring cities (adjacency): no official source named them, so the nearby row claims none. | 2025 California Mechanical Code and local amendment Ordinances 25-0009 and 25-0010: the City current-building-codes page could not be read, and the research says its amendments heading reads 2022. Only the permits page notice (2025 California Building Codes in effect January 1, 2026) is on the page. | Whether any like-for-like replacement is exempt, the HVAC Replacement Plan for Ground Units and plan check submittal requirements (listed by title only, PDFs not read), duct testing, coastal review of an HVAC job: not stated. | Natural gas provider (SoCalGas): no service-territory page read. | South Coast AQMD jurisdiction page: would not load. | General Plan EIR wording that the City is largely built out (2003 document, not read here) and the Census Reporter 15,281 housing units figure (aggregator): not used. | Employers, shopping centers, schools, hospitals, industrial areas, HOA areas, historic-district rules, median year built: no source. | All rebate dollar amounts; federal Section 25C and 25D status; HEEHRA status; SoCalGas wildfire thermostat; SCE Smart Energy Program credit. | SoCalGas licensed-contractor and permit-closure conditions and SCE approved-contractor wording: kept off the page. | Competitor SERP table: never on the page.
    // Client approved all Manhattan Beach wording on 2026-10-19 (per the user).
    // TODO(verify): Mechanical Equipment Permit Requirements handout (showpublisheddocument/39726) is undated, cites the 2022 California Building Standards Codes, and was read through a fetch summary. The permits page lists a handout titled Mechanical Equipment Requirements without a URL, so it is not confirmed to be the same file. Re-read the PDF directly and confirm which handout is current.
    // TODO(verify): Municipal Code Sections 10.52.050, 10.60.050 and 10.60.090 are quoted only as the handout cites them. The official Municipal Code location (the City page labels a link View Manhattan Beach Municipal Code with no visible URL) was not read, and a publisher copy would not be the official code.
    // TODO(verify): Apply-for page lists Building Permit and Construction Permits as online with no date, and does not mention mechanical or HVAC permits. The building-permit page (services/apply-for/building-permit) and current-building-codes page returned fetch errors.
    // TODO(verify): SoCalGas terms come from the SoCalGas rebates page (no start date shown). The 2026 application PDF was not re-read for this page. SCE Energy Savings Assistance page shows income limits for June 1, 2026 to May 31, 2027.
    // Pre-launch recheck: City permits-handouts-and-forms page, current-building-codes page, building-permit page, both HVAC handouts, Municipal Code Title 9 and Title 10 sections 10.52.050, 10.60.050, 10.60.090 and Chapter 5.48 (official code), inspection information page, Citizen Self Service, City electric utility and Clean Power Alliance pages, SCE community choice page, SoCalGas rebates page and 2026 application, SCE Energy Savings Assistance and rebate directory, SCAG profile, QuickFacts.
    localParagraphs: [
      "The City's Community Development Department publishes a Mechanical Equipment Permit Requirements handout that says **mechanical permits are required to install, alter, repair, replace, or remodel a mechanical system**. The handout shows no date and refers to the 2022 California Building Standards Codes, while the City's permits page says the 2025 California Building Codes took effect January 1, 2026, so **AIRPRO SOLUTIONS confirms the current requirements with the City** before work starts. The handout lists a site plan showing the equipment location and setbacks, and signed energy certificates (CF1R or NRCC). The City also posts an HVAC Replacement Plan for Ground Units handout, which we did not read, so we do not state what it requires. The City says Community Development accepts permit applications online. Inspections are requested through the City's Citizen Self Service portal by 3:00 p.m. on the business day before, and no work or inspections can take place until the permit has been approved and issued.",
      "For outdoor equipment, the same handout cites Municipal Code Section 10.52.050, which says **mechanical equipment, platforms, and screening may not be located beyond the front building line or in the side yard setback or building separation yards**. It also cites Section 10.60.090 for screening from view on all sides, Section 10.60.050 for height limits, and a 30-inch working clear space in the California Mechanical Code. We read these through the City's handout, not the Municipal Code text, so we plan the equipment location around your property and confirm the current rules with the City. The City's Planning Division reviews proposals for compliance with the General Plan, Zoning Ordinance, and Local Coastal Program, and we did not find whether an HVAC replacement needs coastal review.",
      "Manhattan Beach had an estimated 33,122 residents on July 1, 2025, and QuickFacts reports a 64.8% owner-occupied housing rate for 2020-2024. SCAG's 2019 Local Profile, using California Department of Finance E-5 data for 2018, counts **15,059 housing units: 69.3% single-family detached, 7.8% attached, 16.3% in buildings of 2 to 4 units, 6.5% in buildings of 5 or more, and 0.1% mobile homes**. The same profile reports that **57.2 percent of the housing stock was built before 1970**, citing the U.S. Census American Community Survey, 2017, and Nielsen Co. Those figures are citywide and dated, so we confirm the equipment, roof or attic access, and ductwork at the property. In a multi-unit building we confirm equipment access and placement with the owner or manager, and for commercial work we plan rooftop access and equipment placement with the building owner or manager.",
      "The City says Southern California Edison provides electric service in Manhattan Beach, and that Clean Power Alliance buys the electricity while SCE delivers it, so **SCE still handles delivery, billing, and service issues**. The City says customers can opt out of Clean Power Alliance. We did not confirm Manhattan Beach's natural gas provider from a service-territory page, so we ask which company serves the address before counting on a gas program. SoCalGas lists a 2026 rebate for ENERGY STAR furnaces in existing residential properties, with funding first come, first served until December 31, 2026 or until it runs out. SCE's Energy Savings Assistance program lists central AC or central heat pump replacement among its upgrades for income-qualified households, and says services may not be available in all areas and a co-payment may be required for some services. SCE's rebate directory lists Golden State Rebates coupons for air conditioners and smart thermostats at participating retailers, and Home Performance Plus for customers in disadvantaged or low-income communities, and we did not confirm whether a Manhattan Beach address qualifies. Terms and funding change, so we link the program pages rather than quote amounts, and **confirm your utility accounts on your bills before counting on a program**. Official links are in the card for this section.",
    ],
    localCards: [
      {
        heading: "Manhattan Beach permit path",
        rows: [
          { label: "Permit required", value: "To install, alter, repair, replace, or remodel a mechanical system" },
          { label: "Application", value: "Submitted online through Community Development" },
          { label: "Submittal items", value: "Site plan and signed energy certificates (CF1R or NRCC)" },
          {
            label: "Inspections",
            value: "Request in the Citizen Self Service portal by 3:00 p.m. the business day before",
          },
          { label: "Before the permit", value: "No work or inspections until it is approved and issued" },
        ],
        note: "From the City's Mechanical Equipment Permit Requirements handout (shows no date, cites the 2022 codes), its apply-for page and its inspection page (no dates). We confirm current requirements with the City.",
      },
    ],
    neighborhoodsHeading: "Official Manhattan Beach resources",
    officialResources: [
      {
        text: "Permits, handouts and forms",
        href: "https://www.manhattanbeach.gov/departments/community-development/building-and-safety/permits-handouts-and-forms",
        note: "Handout list and the January 1, 2026 code notice.",
      },
      {
        text: "Mechanical Equipment Permit Requirements",
        href: "https://manhattanbeach.gov/home/showpublisheddocument/39726/638284064687370000",
        note: "City handout cited on this page (PDF).",
      },
      {
        text: "Apply for a permit",
        href: "https://www.manhattanbeach.gov/services/apply-for",
        note: "Online applications and Citizen Self Service.",
      },
      {
        text: "Inspection information",
        href: "https://www.manhattanbeach.gov/departments/community-development/building-and-safety/inspection-information",
        note: "Portal, 3:00 p.m. cutoff and permit rule.",
      },
      {
        text: "Planning and zoning",
        href: "https://www.manhattanbeach.gov/departments/community-development/planning-zoning",
        note: "Planning Division and Local Coastal Program review.",
      },
      {
        text: "Electric utility services",
        href: "https://www.manhattanbeach.gov/departments/public-works/utilities-division/electric-utility-services",
        note: "City statement that SCE provides electric service.",
      },
      {
        text: "Clean Power Alliance",
        href: "https://manhattanbeach.gov/departments/environmental-sustainability/clean-power-alliance",
        note: "City page on delivery, opt-out and rate options.",
      },
      {
        text: "SoCalGas rebates",
        href: "https://www.socalgas.com/savings/rebates-and-incentives",
        note: "ENERGY STAR furnace rebate and program period.",
      },
      {
        text: "SCE Energy Savings Assistance",
        href: "https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program",
        note: "Income-qualified upgrades and eligibility.",
      },
      {
        text: "SCAG Manhattan Beach local profile",
        href: "https://sp.scag.ca.gov/sites/default/files/2024-05/manhattanbeach_localprofile.pdf",
        note: "Housing counts and building age cited on this page.",
      },
      {
        text: "Census QuickFacts",
        href: "https://www.census.gov/quickfacts/manhattanbeachcitycalifornia",
        note: "Population and owner-occupied rate cited on this page.",
      },
    ],
    servicesTitle: "Everything we handle for Manhattan Beach homes and businesses",
    serviceCards: [
      {
        slug: "ac-repair",
        name: "AC Repair",
        body: "Diagnosis and repair for cooling failures, weak airflow, and unusual noises in Manhattan Beach homes and businesses.",
      },
      {
        slug: "ac-installation",
        name: "AC Installation & Replacement",
        body: "New system sizing and installation, planned around the City's mechanical permit requirements and equipment placement rules.",
      },
      {
        slug: "ac-maintenance",
        name: "AC Maintenance",
        body: "Seasonal AC tune-ups that catch small issues early, for homes and for commercial rooftop and ground units.",
      },
      {
        slug: "heating-repair",
        name: "Heating Repair",
        body: "Furnace and heating system diagnosis and repair for Manhattan Beach homes and businesses.",
      },
      {
        slug: "furnace-installation",
        name: "Furnace Installation & Replacement",
        body: "Furnace sizing and installation, planned around the City's permit process. SoCalGas lists a furnace rebate with its own terms.",
      },
      {
        slug: "heat-pump-services",
        name: "Heat Pump Services",
        body: "Heat pump installation, repair, and maintenance, with the City's permit process and your utilities' program pages in mind.",
      },
      {
        slug: "ductless-mini-split",
        name: "Ductless Mini-Split",
        body: "Ductless systems for additions, converted spaces, and rooms the existing ducts do not reach.",
      },
      {
        slug: "ductwork",
        name: "Ductwork Services",
        body: "Duct repair, sealing, and replacement for Manhattan Beach homes and buildings.",
      },
      {
        slug: "indoor-air-quality",
        name: "Indoor Air Quality",
        body: "Filtration, ventilation, and air-quality upgrades for Manhattan Beach homes and offices.",
      },
      {
        slug: "emergency-hvac",
        name: "Emergency HVAC",
        body: "24/7 emergency dispatch for no-cool and no-heat problems. If you smell gas, leave the building and call 911 or your gas utility.",
      },
    ],
    resources: {
      eyebrow: "Know before you start",
      title: "Manhattan Beach permits and incentive programs",
      intro: "Official sources for three items worth checking before a Manhattan Beach HVAC project.",
      cards: [
        {
          amount: "Permit requirements",
          description: "The City's Mechanical Equipment Permit Requirements handout says mechanical permits are required to install, alter, repair, replace, or remodel a mechanical system. It shows no date and cites the 2022 codes, so we confirm current requirements with the City.",
          linkLabel: "City handout",
          linkHref: "https://manhattanbeach.gov/home/showpublisheddocument/39726/638284064687370000",
        },
        {
          amount: "Furnace rebate",
          description: "SoCalGas lists a 2026 rebate for ENERGY STAR furnaces in existing residential properties, with funding first come, first served until December 31, 2026 or until it runs out. We did not confirm Manhattan Beach's gas provider, and we do not quote amounts.",
          linkLabel: "SoCalGas rebates",
          linkHref: "https://www.socalgas.com/savings/rebates-and-incentives",
        },
        {
          amount: "Income-qualified help",
          description: "SCE's Energy Savings Assistance program lists central AC or central heat pump replacement among its upgrades for income-qualified households. It says services may not be available in all areas and a co-payment may be required for some services, so check eligibility with SCE.",
          linkLabel: "SCE Energy Savings Assistance",
          linkHref: "https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program",
        },
      ],
    },
    nearby: ["redondo-beach", "el-segundo", "torrance", "gardena"],
    proof: {
      heading: "Licensed, reviewed, and ready across Manhattan Beach",
      body: "AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.",
      stats: [
        { num: "4.8★", label: "Google rating" },
        { num: "40", label: "Google reviews" },
        { num: "C-20", label: "California license class" },
        { num: "24/7", label: "Emergency dispatch" },
      ],
    },
    finalCtaBody: "Call or request service online to schedule a visit anywhere in Manhattan Beach. Same-day service is typical, subject to capacity.",
    faqs: [
      {
        q: "Does AIRPRO SOLUTIONS service all of Manhattan Beach?",
        a: "Yes. AIRPRO SOLUTIONS serves homes and businesses across Manhattan Beach as part of our South Bay coverage. The City's Community Development Department handles permits and inspections, so we plan each visit around your specific address.",
        boldLead: "Yes.",
        links: [
          { text: "South Bay coverage", href: "/service-areas/south-bay/" },
        ],
      },
      {
        q: "How fast can a technician reach my Manhattan Beach home?",
        a: "Same-day service is typical in Manhattan Beach, subject to capacity. Call (323) 776-9047 to confirm a window for your address.",
        boldLead: "Same-day service is typical in Manhattan Beach, subject to capacity.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Do I need a permit to replace an air conditioner in Manhattan Beach?",
        a: "Plan on one. The City's Mechanical Equipment Permit Requirements handout says mechanical permits are required to install, alter, repair, replace, or remodel a mechanical system. The handout shows no date and cites the 2022 codes, and we did not find a City statement on whether any like-for-like replacement is exempt, so AIRPRO SOLUTIONS confirms the permit path with the City before work starts, and we do not quote permit fees.",
        boldLead: "Plan on one.",
        links: [
          {
            text: "Mechanical Equipment Permit Requirements handout",
            href: "https://manhattanbeach.gov/home/showpublisheddocument/39726/638284064687370000",
          },
        ],
      },
      {
        q: "What does the City ask for with a Manhattan Beach HVAC permit application?",
        a: "Start with the City's online application process. The City says Community Development accepts permit applications online, and its handout lists a site plan showing the equipment location and setbacks and signed energy certificates (CF1R or NRCC). The City also posts an HVAC Replacement Plan for Ground Units handout that we did not read, so AIRPRO SOLUTIONS confirms what your job needs with the City.",
        boldLead: "Start with the City's online application process.",
        links: [
          { text: "accepts permit applications online", href: "https://www.manhattanbeach.gov/services/apply-for" },
          {
            text: "HVAC Replacement Plan for Ground Units handout",
            href: "https://www.manhattanbeach.gov/departments/community-development/building-and-safety/permits-handouts-and-forms",
          },
        ],
      },
      {
        q: "How do inspections work in Manhattan Beach?",
        a: "Inspections are requested through the City's Citizen Self Service portal. The City's inspection information page says requests must come in by 3:00 p.m. on the business day before the inspection, the requester must be an active contact listed on the permit, and no work or inspections can take place until the permit has been approved and issued.",
        boldLead: "Inspections are requested through the City's Citizen Self Service portal.",
        links: [
          {
            text: "inspection information page",
            href: "https://www.manhattanbeach.gov/departments/community-development/building-and-safety/inspection-information",
          },
        ],
      },
      {
        q: "Where can an outdoor AC unit go on my Manhattan Beach property?",
        a: "Placement rules apply to outdoor equipment. The City's handout cites Municipal Code Section 10.52.050, which says mechanical equipment, platforms, and screening may not be located beyond the front building line or in the side yard setback or building separation yards, and Section 10.60.090 on screening from view on all sides. We read these through the handout, not the Municipal Code text, and the handout shows no date, so AIRPRO SOLUTIONS confirms the current rules and your property's layout with the City before choosing a location.",
        boldLead: "Placement rules apply to outdoor equipment.",
        links: [
          { text: "handout", href: "https://manhattanbeach.gov/home/showpublisheddocument/39726/638284064687370000" },
        ],
      },
      {
        q: "Does the Local Coastal Program affect HVAC work in Manhattan Beach?",
        a: "We did not find a City statement either way. The City's Planning Division reviews proposals for compliance with the General Plan, Zoning Ordinance, and Local Coastal Program. We did not find whether an HVAC replacement needs coastal review, so AIRPRO SOLUTIONS asks the City about your address before work starts.",
        boldLead: "We did not find a City statement either way.",
        links: [
          {
            text: "Planning Division",
            href: "https://www.manhattanbeach.gov/departments/community-development/planning-zoning",
          },
        ],
      },
      {
        q: "Does the age of my Manhattan Beach home matter for HVAC?",
        a: "Age is one factor we check. SCAG's 2019 Local Profile reports that 57.2 percent of Manhattan Beach's housing stock was built before 1970, citing the U.S. Census American Community Survey, 2017, and Nielsen Co. That is a citywide, dated figure, so we confirm the equipment, roof or attic access, and ductwork at your property.",
        boldLead: "Age is one factor we check.",
        links: [
          {
            text: "SCAG's 2019 Local Profile",
            href: "https://sp.scag.ca.gov/sites/default/files/2024-05/manhattanbeach_localprofile.pdf",
          },
        ],
      },
      {
        q: "What about HVAC in Manhattan Beach condos and apartment buildings?",
        a: "Multi-unit buildings add access and placement questions. About 16.3% of Manhattan Beach's 15,059 housing units are in buildings of 2 to 4 units and 6.5% are in buildings of 5 or more, according to SCAG's 2019 Local Profile using California Department of Finance data for 2018, so we confirm equipment access and placement with the property owner or manager before installation or replacement.",
        boldLead: "Multi-unit buildings add access and placement questions.",
        links: [
          {
            text: "SCAG's 2019 Local Profile",
            href: "https://sp.scag.ca.gov/sites/default/files/2024-05/manhattanbeach_localprofile.pdf",
          },
        ],
      },
      {
        q: "Which utility serves my Manhattan Beach address?",
        a: "Your bill answers it. The City says Southern California Edison provides electric service in Manhattan Beach, and that Clean Power Alliance buys the electricity while SCE delivers it. We did not confirm the natural gas provider from a service-territory page, so check your bill before counting on a gas program.",
        boldLead: "Your bill answers it.",
        links: [
          {
            text: "Southern California Edison",
            href: "https://www.manhattanbeach.gov/departments/public-works/utilities-division/electric-utility-services",
          },
          {
            text: "Clean Power Alliance",
            href: "https://manhattanbeach.gov/departments/environmental-sustainability/clean-power-alliance",
          },
        ],
      },
      {
        q: "Are there HVAC rebates for Manhattan Beach customers?",
        a: "SoCalGas and SCE list programs. SoCalGas lists a rebate for ENERGY STAR furnaces in existing residential properties, with funding first come, first served until December 31, 2026 or until it runs out. SCE lists Golden State Rebates coupons for air conditioners and smart thermostats at participating retailers, and Home Performance Plus for customers in disadvantaged or low-income communities. We did not confirm the gas provider or whether a Manhattan Beach address qualifies for Home Performance Plus. Terms and funding change and we do not quote amounts, so check the current terms before you buy.",
        boldLead: "SoCalGas and SCE list programs.",
        links: [
          { text: "rebate for ENERGY STAR furnaces", href: "https://www.socalgas.com/savings/rebates-and-incentives" },
          {
            text: "Golden State Rebates",
            href: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace",
          },
          {
            text: "Home Performance Plus",
            href: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace",
          },
        ],
      },
      {
        q: "Is there HVAC help for income-qualified Manhattan Beach households?",
        a: "Possibly, for income-qualified households. SCE's Energy Savings Assistance program lists central AC or central heat pump replacement among its upgrades, and says services may not be available in all areas, restrictions may apply, and a co-payment may be required for some services. Eligibility depends on household income and the property, so check with SCE before counting on it.",
        boldLead: "Possibly, for income-qualified households.",
        links: [
          {
            text: "Energy Savings Assistance program",
            href: "https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program",
          },
        ],
      },
      {
        q: "What HVAC services are available in Manhattan Beach?",
        a: "AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout Manhattan Beach, for both residential and commercial properties.",
        boldLead: "AIRPRO SOLUTIONS provides",
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
        q: "Is emergency HVAC service available in Manhattan Beach?",
        a: "Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in Manhattan Beach. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.",
        boldLead: "Yes.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "How much does HVAC service cost in Manhattan Beach?",
        a: "Cost depends on the problem, the equipment, and how accessible the system is. We do not publish one flat price, so call (323) 776-9047 or request service and we will quote your specific system.",
        boldLead: "Cost depends on the problem, the equipment, and how accessible the system is.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Does AIRPRO SOLUTIONS handle commercial HVAC in Manhattan Beach?",
        a: "Yes. AIRPRO SOLUTIONS services commercial properties in Manhattan Beach, including rooftop units. We confirm the permit path with the City before commercial work starts, and we plan rooftop access and equipment placement with the building owner or manager. The City posts separate plan check submittal requirements for multi-residential and commercial projects, and we did not confirm which HVAC jobs they apply to. See our Commercial HVAC page for the full scope.",
        boldLead: "Yes.",
        links: [
          { text: "Commercial HVAC page", href: "/commercial-hvac/" },
        ],
      },
    ],
  },
};

const hermosaBeachOverrides: Partial<City> = {
  // TODO(data): add verified climate detail before treating this as a full local page.
  neighborhoods: [], // neighborhood list held out: no official City source read, so no names are published
  zips: [], // ZIP list held out: the City maps page would not load and 90254 appears only on third-party lists in the research
  page: {
    metaDescription: "HVAC for Hermosa Beach homes and businesses, from AC repair to installation. Know the City's permit forms and local housing. Licensed, 4.8-star rated.",
    lede: "AIRPRO SOLUTIONS provides HVAC services across Hermosa Beach, with AC repair, heating repair, installation, and maintenance for homes and businesses, and with the City's permit forms and Coastal Zone note in mind.",
    heroCaption: {
      title: "Hermosa Beach, CA",
      text: "Local HVAC service across Hermosa Beach",
    },
    heroProof: [
      {
        icon: "shield",
        label: "Licensed, bonded & insured",
      },
      {
        icon: "star",
        label: "4.8-star rated",
      },
      {
        icon: "bolt",
        label: "24/7 emergency dispatch",
      },
      {
        icon: "building",
        label: "Residential and commercial",
      },
    ],
    trustStats: [
      {
        num: "4.8★",
        label: "Google rating, 40 reviews",
      },
      {
        num: "C-20",
        label: "California licensed",
      },
      {
        num: "24/7",
        label: "emergency dispatch",
      },
      {
        num: "Same-day",
        label: "service typical",
      },
    ],
    answer: {
      lead: "AIRPRO SOLUTIONS is a licensed HVAC contractor serving Hermosa Beach",
      body: ", providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, subject to capacity, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.",
    },
    glance: {
      title: "Hermosa Beach at a glance",
      stats: [
        {
          num: "18,513",
          label: "residents in the Census Bureau's July 1, 2025 estimate (U.S. Census Bureau QuickFacts)",
        },
        {
          num: "43.5%",
          label: "of 10,026 housing units are single-family detached, and 22.4% are in buildings of 2 to 4 units (California Department of Finance E-5, 2018, per SCAG)",
        },
        {
          num: "52.9%",
          label: "of housing was built before 1970 (U.S. Census American Community Survey, 2017; Nielsen Co., per SCAG)",
        },
      ],
      source: "Sources: U.S. Census Bureau QuickFacts and SCAG's 2019 Local Profile of Hermosa Beach.",
    },
    localTitle: "Hermosa Beach's permit forms, housing stock, and utility programs",
    // Held out (no verified source): Online-only submittals beginning October 1, 2026: not on the City applications page or the online access page. The South Bay hub claim is removed in hub wiring. | Municipal Code Chapter 15.10 (clearances 15.10.030, rooftop 15.10.040, noise 15.10.050, exhaust 15.10.060, seismic anchorage 15.10.070), Chapter 8.24 noise and the 3 foot equipment setback: read only through a publisher copy (online.encodeplus.com), not the official code, and no operative text or numeric limit was readable. Not published. | City Building and Safety page (hermosabeach.gov/services/inspections-building) and the inspection scheduling page (ServiceDirectory/218/237): would not load here, so inspection days and hours, the phone number, the public counter hours and the department email are not on the page. The Building Division page (community-development/building-division) was read and supports the permit, inspection and construction hours wording. Its geotechnical report note concerns construction and groundwater and is not tied to HVAC, so it is not stated. | City maps page (hermosabeach.gov/services/maps): would not load here, so ZIP 90254, the Coastal Zone Map and the zoning, elevation and contour maps are not on the page. 90254 also appears only on third-party lists in the research. ZIP card and neighborhoods held out. | Pre-1980 asbestos survey or abatement wording and the 100 square foot threshold: the applications page fetch summary quotes only that the requirement applies to projects constructed before 1980, which conflicts with the research reading of a disturbance threshold. Not stated. | Code edition conflict: the applications page says the 2025 codes took effect January 1, 2026, and the Building Division page says the 2022 codes took effect January 1, 2023. Both are undated. The page states both and says we confirm with the City. | Fee schedules effective July 1, 2026 and any permit fee: not on the applications page as read. No fees are quoted. | Building department phone and email and the 1315 Valley Drive address with ZIP: from an Accela permit-picker page not read here. Not on the page. | Whether any like-for-like replacement is exempt, HVAC inspection stages and required test documents: no City statement found. | Clean Power Alliance room AC instant coupon (CARE or FERA customers), CPA Energy Team, SoCalGas Energy Savings Assistance furnace replacement, SoCalGas multifamily rebate, TECH $1,000 incentive, Comfortably CA, SWITCH: from the research only, pages not read here, and amounts are not published. | Climate, NOAA normals, heat-day counts, humidity, marine layer: no station verified for Hermosa Beach. | Beach city, coastal, flat, hillside labels, borders with neighboring cities, Pacific Coast Highway layout, 15 by 40 block size: Wikipedia only. | SCAG 2021 housing element local data (10,092 or 8,979 units, 52 percent single-family share, 1970 to 1979 largest decade, renter and owner counts): the document gives conflicting unit totals (10,092, 8,979 and 9,565 occupied), so the 2019 Local Profile is used instead. | QuickFacts 18,687 residents (July 1, 2024), 50.7 percent owner-occupied (2019 to 2023), households, rent, income: the pasted research disagrees with the QuickFacts page read directly (V2025). Median income and rent are not used. | Employers, schools, hospitals, shopping areas, HOA areas, historic-district rules, median year built: no source. | All rebate dollar amounts; federal Section 25C and 25D status; HEEHRA status; SoCalGas wildfire thermostat; SCE Smart Energy Program credit. | SoCalGas licensed-contractor and permit-closure conditions and SCE approved-contractor wording: kept off the page. | Competitor SERP table: never on the page.
    // Client approved all Hermosa Beach wording on 2026-10-19 (every FAQ answer, the four local paragraphs, the local card, the permit, coastal, utility, rebate and assistance sentences, the commercial sentence). The TODO(verify) items below still stand.
    // TODO(verify): City applications page, online access page and utilities page were read through fetch summaries and show no date. The Mechanical Permit Application (showpublisheddocument/19385) and the combined application (showpublisheddocument/20511) were also read through fetch summaries and show no date. Re-read the PDFs directly.
    // TODO(verify): The City Building Division page was read through a fetch summary and shows no date. It states the 2022 California Building Codes effective January 1, 2023, which conflicts with the applications page 2025 notice. Ask the City which is current.
    // TODO(verify): The coastal permit note and the LA County Fire, Public Works and Waste Reduction Plan note come from the permit form affidavit text as summarized. Confirm the wording in the PDF and whether it applies to an HVAC replacement.
    // TODO(verify): The City Clean Power Alliance page (public-works/environmental-programs) was read through a fetch summary: membership, CPA buys the electricity, SCE still delivers and bills, opt-out. It was not checked for a date. Confirm directly.
    // TODO(verify): SoCalGas rebate terms were read on the SoCalGas rebates page and the 2026 application PDF (form code J087-228EEC 0926). The SCE Energy Savings Assistance and rebate directory pages show no date.
    // Pre-launch recheck: City applications page, Mechanical Permit Application and combined application PDFs, online access page, utilities page, Building and Safety page, maps page, official Municipal Code (Chapter 15.10 and Chapter 8.24), SoCalGas rebates page and 2026 application, SCE Energy Savings Assistance and rebate directory, SCAG profile, QuickFacts.
    localParagraphs: [
      "The City's Community Development Department posts separate permit applications for building, mechanical, electrical, and plumbing work, plus a combined form that **can only be used when one contractor or owner is acquiring all of the associated permits**. The City's Mechanical Permit Application lists fee items for HVAC equipment, including an air handler only, an air conditioner condenser or compressor, and a forced-air or gravity-type furnace, so **AIRPRO SOLUTIONS confirms which application and fee items fit your job** with the City before work starts. The City's Building Division page says the division is responsible for issuing building, plumbing, electrical, and mechanical permits, among others, and performs field inspections for structural, fire, energy, and life safety requirements. The City's applications page says the 2025 California Building Standards Codes took effect January 1, 2026, while the Building Division page still states that the 2022 California Building Codes took effect January 1, 2023, so **AIRPRO SOLUTIONS confirms the current code edition with the City**. The City's online access page lists select building, electrical, plumbing, and planning applications that can be submitted online, and mechanical or HVAC permits are not among them. We did not find a City statement that permit applications must be submitted online, so we confirm how to submit with the City. None of these City pages shows a date.",
      "The City's permit forms add conditions beyond the mechanical application. The Mechanical Permit Application's affidavit says that if the property is in the Coastal Zone, **the applicant may need a Coastal Development Permit or an exemption**, and it says additional reviews and submittals may be required for LA County Fire, Public Works, and a Waste Reduction Plan. We did not find whether an HVAC replacement needs coastal review or any of those reviews, so we ask the City about your address before work starts. The forms show no date. The Building Division page lists permitted construction hours of 8:00 a.m. to 6:00 p.m. Monday through Friday and 9:00 a.m. to 5:00 p.m. Saturday, with no work on Sundays or National Holidays. Those are construction hours, not outdoor-unit operating hours. We did not read the Municipal Code text, so we do not state equipment placement, setback, or noise limits.",
      "Hermosa Beach had an estimated 18,513 residents on July 1, 2025, and QuickFacts reports a 50.6% owner-occupied housing rate for 2020 to 2024. SCAG's 2019 Local Profile, using California Department of Finance E-5 data for 2018, counts **10,026 housing units: 43.5% single-family detached, 8.0% attached, 22.4% in buildings of 2 to 4 units, 23.9% in buildings of 5 or more, and 2.2% mobile homes**. The same profile reports that **52.9 percent of the housing stock was built before 1970**, citing the U.S. Census American Community Survey, 2017, and Nielsen Co. Those figures are citywide and dated, so we confirm the equipment, roof or attic access, and ductwork at the property. In a multi-unit building we confirm equipment access and placement with the owner or manager, and for commercial work we plan rooftop access and equipment placement with the building owner or manager.",
      "The City's utilities page lists **Southern California Edison for electric service and Southern California Gas Company for natural gas**, and shows no date. The City's Clean Power Alliance page says Hermosa Beach is a member, that Clean Power Alliance buys the electricity, and that **SCE still delivers the power and sends the monthly bill**. The City says customers can opt out and stay with SCE. SoCalGas lists a 2026 rebate for ENERGY STAR furnaces in existing residential properties, with funding first come, first served until December 31, 2026 or until it runs out. SCE's Energy Savings Assistance program lists central AC or central heat pump replacement among its upgrades for income-qualified households, and says services may not be available in all areas and a co-payment may be required for some services. SCE's rebate directory lists Golden State Rebates coupons for air conditioners and smart thermostats at participating retailers, and Home Performance Plus for customers in disadvantaged or low-income communities, and we did not confirm whether a Hermosa Beach address qualifies. Terms and funding change, so we link the program pages rather than quote amounts, and **confirm your utility accounts on your bills before counting on a program**. Official links are in the card for this section.",
    ],
    localCards: [
      {
        heading: "Hermosa Beach permit path",
        rows: [
          {
            label: "Applications",
            value: "Separate building, mechanical, electrical, and plumbing applications",
          },
          {
            label: "Combined form",
            value: "Only when one contractor or owner is acquiring all the permits",
          },
          {
            label: "Mechanical fee items",
            value: "Air handler only, AC condenser or compressor, forced-air or gravity-type furnace",
          },
          {
            label: "Online applications",
            value: "Select building, electrical, plumbing, and planning types; HVAC not listed",
          },
          {
            label: "Coastal Zone",
            value: "A Coastal Development Permit or exemption may be needed",
          },
          {
            label: "Code edition",
            value: "Applications page: 2025 codes, effective January 1, 2026. Building Division page: 2022 codes. Confirm with the City",
          },
          {
            label: "Construction hours",
            value: "Mon to Fri 8:00 a.m. to 6:00 p.m., Sat 9:00 a.m. to 5:00 p.m., none Sundays or National Holidays",
          },
        ],
        note: "From the City's applications page, Building Division page, online access page and Mechanical Permit Application (none shows a date). We confirm current requirements with the City.",
      },
    ],
    neighborhoodsHeading: "Official Hermosa Beach resources",
    officialResources: [
      {
        text: "Applications, forms and handouts",
        href: "https://www.hermosabeach.gov/our-government/community-development/applications-forms-handouts",
        note: "Separate permit applications and the January 1, 2026 code notice.",
      },
      {
        text: "Building Division",
        href: "https://www.hermosabeach.gov/our-government/community-development/building-division",
        note: "Permits issued, inspections and construction hours.",
      },
      {
        text: "Mechanical Permit Application",
        href: "https://hermosabeach.gov/home/showpublisheddocument/19385/638598171245530000",
        note: "City form cited on this page (PDF).",
      },
      {
        text: "Combined permit application",
        href: "https://hermosabeach.gov/home/showpublisheddocument/20511/638598172243600000",
        note: "Building, mechanical, electrical, and plumbing form (PDF).",
      },
      {
        text: "Online access",
        href: "https://www.hermosabeach.gov/our-government/city-departments/community-development/online-citizen-access",
        note: "Applications the City accepts online.",
      },
      {
        text: "City utilities page",
        href: "https://www.hermosabeach.gov/services/utilities",
        note: "City listing of electric and natural gas providers.",
      },
      {
        text: "Clean Power Alliance",
        href: "https://www.hermosabeach.gov/our-government/city-departments/public-works/environmental-programs/clean-power-alliance",
        note: "City page on delivery, opt-out and rate options.",
      },
      {
        text: "SoCalGas rebates",
        href: "https://www.socalgas.com/savings/rebates-and-incentives",
        note: "ENERGY STAR furnace rebate and program period.",
      },
      {
        text: "SCE Energy Savings Assistance",
        href: "https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program",
        note: "Income-qualified upgrades and eligibility.",
      },
      {
        text: "SCAG Hermosa Beach local profile",
        href: "https://sp.scag.ca.gov/sites/default/files/2024-05/hermosabeach_localprofile.pdf",
        note: "Housing counts and building age cited on this page.",
      },
      {
        text: "Census QuickFacts",
        href: "https://www.census.gov/quickfacts/hermosabeachcitycalifornia",
        note: "Population and owner-occupied rate cited on this page.",
      },
    ],
    servicesTitle: "Everything we handle for Hermosa Beach homes and businesses",
    serviceCards: [
      {
        slug: "ac-repair",
        name: "AC Repair",
        body: "Diagnosis and repair for cooling failures, weak airflow, and unusual noises in Hermosa Beach homes and businesses.",
      },
      {
        slug: "ac-installation",
        name: "AC Installation & Replacement",
        body: "New system sizing and installation, planned around the City's mechanical permit application.",
      },
      {
        slug: "ac-maintenance",
        name: "AC Maintenance",
        body: "Seasonal AC tune-ups that catch small issues early, for homes and for commercial rooftop and ground units.",
      },
      {
        slug: "heating-repair",
        name: "Heating Repair",
        body: "Furnace and heating system diagnosis and repair for Hermosa Beach homes and businesses.",
      },
      {
        slug: "furnace-installation",
        name: "Furnace Installation & Replacement",
        body: "Furnace sizing and installation, planned around the City's permit process. SoCalGas lists a furnace rebate with its own terms.",
      },
      {
        slug: "heat-pump-services",
        name: "Heat Pump Services",
        body: "Heat pump installation, repair, and maintenance, with the City's permit process and your utilities' program pages in mind.",
      },
      {
        slug: "ductless-mini-split",
        name: "Ductless Mini-Split",
        body: "Ductless systems for additions, converted spaces, and rooms the existing ducts do not reach.",
      },
      {
        slug: "ductwork",
        name: "Ductwork Services",
        body: "Duct repair, sealing, and replacement for Hermosa Beach homes and buildings.",
      },
      {
        slug: "indoor-air-quality",
        name: "Indoor Air Quality",
        body: "Filtration, ventilation, and air-quality upgrades for Hermosa Beach homes and offices.",
      },
      {
        slug: "emergency-hvac",
        name: "Emergency HVAC",
        body: "24/7 emergency dispatch for no-cool and no-heat problems. If you smell gas, leave the building and call 911 or your gas utility.",
      },
    ],
    resources: {
      eyebrow: "Know before you start",
      title: "Hermosa Beach permits and incentive programs",
      intro: "Official sources for three items worth checking before a Hermosa Beach HVAC project.",
      cards: [
        {
          amount: "Permit applications",
          description: "The City posts separate building, mechanical, electrical, and plumbing permit applications, and a Mechanical Permit Application with fee items for HVAC equipment. The pages show no date, so we confirm current requirements with the City.",
          linkLabel: "City applications",
          linkHref: "https://www.hermosabeach.gov/our-government/community-development/applications-forms-handouts",
        },
        {
          amount: "Furnace rebate",
          description: "SoCalGas lists a 2026 rebate for ENERGY STAR furnaces in existing residential properties, with funding first come, first served until December 31, 2026 or until it runs out. The City's utilities page lists SoCalGas for natural gas, and we do not quote amounts.",
          linkLabel: "SoCalGas rebates",
          linkHref: "https://www.socalgas.com/savings/rebates-and-incentives",
        },
        {
          amount: "Income-qualified help",
          description: "SCE's Energy Savings Assistance program lists central AC or central heat pump replacement among its upgrades for income-qualified households. It says services may not be available in all areas and a co-payment may be required for some services, so check eligibility with SCE.",
          linkLabel: "SCE Energy Savings Assistance",
          linkHref: "https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program",
        },
      ],
    },
    nearby: ["manhattan-beach", "redondo-beach", "torrance", "el-segundo"],
    proof: {
      heading: "Licensed, reviewed, and ready across Hermosa Beach",
      body: "AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.",
      stats: [
        {
          num: "4.8★",
          label: "Google rating",
        },
        {
          num: "40",
          label: "Google reviews",
        },
        {
          num: "C-20",
          label: "California license class",
        },
        {
          num: "24/7",
          label: "Emergency dispatch",
        },
      ],
    },
    finalCtaBody: "Call or request service online to schedule a visit anywhere in Hermosa Beach. Same-day service is typical, subject to capacity.",
    faqs: [
      {
        q: "Does AIRPRO SOLUTIONS service all of Hermosa Beach?",
        a: "Yes. AIRPRO SOLUTIONS serves homes and businesses across Hermosa Beach as part of our South Bay coverage. The City's Community Development Department handles permit applications, so we plan each visit around your specific address.",
        boldLead: "Yes.",
        links: [
          {
            text: "South Bay coverage",
            href: "/service-areas/south-bay/",
          },
        ],
      },
      {
        q: "How fast can a technician reach my Hermosa Beach home?",
        a: "Same-day service is typical in Hermosa Beach, subject to capacity. Call (323) 776-9047 to confirm a window for your address.",
        boldLead: "Same-day service is typical in Hermosa Beach, subject to capacity.",
        links: [
          {
            text: "(323) 776-9047",
            href: "tel:+13237769047",
          },
        ],
      },
      {
        q: "Do I need a permit to replace an air conditioner in Hermosa Beach?",
        a: "Expect to apply. The City's Building Division page says the division issues mechanical permits, and the City posts a Mechanical Permit Application with fee items for an air conditioner condenser or compressor, an air handler, and a forced-air or gravity-type furnace. We did not find a City statement on whether any like-for-like replacement is exempt, so AIRPRO SOLUTIONS confirms the permit path with the City before work starts, and we do not quote permit fees.",
        boldLead: "Expect to apply.",
        links: [
          {
            text: "Building Division page",
            href: "https://www.hermosabeach.gov/our-government/community-development/building-division",
          },
          {
            text: "Mechanical Permit Application",
            href: "https://hermosabeach.gov/home/showpublisheddocument/19385/638598171245530000",
          },
        ],
      },
      {
        q: "Which permit application covers HVAC work in Hermosa Beach?",
        a: "The City lists separate applications. It posts separate building, mechanical, electrical, and plumbing permit applications, and a combined form that it says can only be used when one contractor or owner is acquiring all of the associated permits. The mechanical application is the one that lists HVAC equipment fee items, and AIRPRO SOLUTIONS confirms with the City whether your job also needs electrical or plumbing permits.",
        boldLead: "The City lists separate applications.",
        links: [
          {
            text: "permit applications",
            href: "https://www.hermosabeach.gov/our-government/community-development/applications-forms-handouts",
          },
          {
            text: "mechanical application",
            href: "https://hermosabeach.gov/home/showpublisheddocument/19385/638598171245530000",
          },
        ],
      },
      {
        q: "Can I submit a Hermosa Beach HVAC permit application online?",
        a: "The City's online page does not list HVAC permits. The City's online access page says the department accepts online applications for select building permits and planning applications, and its list of online applications does not include mechanical or HVAC permits. We did not find a City statement that permit applications must be submitted online, or a date for any such change, so AIRPRO SOLUTIONS confirms with the City how to submit your application before work starts.",
        boldLead: "The City's online page does not list HVAC permits.",
        links: [
          {
            text: "online access page",
            href: "https://www.hermosabeach.gov/our-government/city-departments/community-development/online-citizen-access",
          },
        ],
      },
      {
        q: "Does the Coastal Zone affect HVAC work in Hermosa Beach?",
        a: "The City's permit forms mention it. The Mechanical Permit Application says that if the property is in the Coastal Zone, the applicant may need a Coastal Development Permit or an exemption, and that additional reviews and submittals may be required for LA County Fire, Public Works, and a Waste Reduction Plan. We did not find whether an HVAC replacement needs any of these, so AIRPRO SOLUTIONS asks the City about your address before work starts.",
        boldLead: "The City's permit forms mention it.",
        links: [
          {
            text: "Mechanical Permit Application",
            href: "https://hermosabeach.gov/home/showpublisheddocument/19385/638598171245530000",
          },
        ],
      },
      {
        q: "Does the age of my Hermosa Beach home matter for HVAC?",
        a: "Age is one factor we check. SCAG's 2019 Local Profile reports that 52.9 percent of Hermosa Beach's housing stock was built before 1970, citing the U.S. Census American Community Survey, 2017, and Nielsen Co. That is a citywide, dated figure, so we confirm the equipment, roof or attic access, and ductwork at your property.",
        boldLead: "Age is one factor we check.",
        links: [
          {
            text: "SCAG's 2019 Local Profile",
            href: "https://sp.scag.ca.gov/sites/default/files/2024-05/hermosabeach_localprofile.pdf",
          },
        ],
      },
      {
        q: "What about HVAC in Hermosa Beach condos and apartment buildings?",
        a: "Multi-unit buildings add access and placement questions. About 22.4% of Hermosa Beach's 10,026 housing units are in buildings of 2 to 4 units and 23.9% are in buildings of 5 or more, according to SCAG's 2019 Local Profile using California Department of Finance data for 2018, so we confirm equipment access and placement with the property owner or manager before installation or replacement.",
        boldLead: "Multi-unit buildings add access and placement questions.",
        links: [
          {
            text: "SCAG's 2019 Local Profile",
            href: "https://sp.scag.ca.gov/sites/default/files/2024-05/hermosabeach_localprofile.pdf",
          },
        ],
      },
      {
        q: "Which utility serves my Hermosa Beach address?",
        a: "Your bill answers it. The City's utilities page lists Southern California Edison for electric service and Southern California Gas Company for natural gas, and the City's Clean Power Alliance page says Clean Power Alliance buys the electricity while SCE still delivers it and sends the monthly bill. Check your bill before counting on a program.",
        boldLead: "Your bill answers it.",
        links: [
          {
            text: "utilities page",
            href: "https://www.hermosabeach.gov/services/utilities",
          },
          {
            text: "Clean Power Alliance page",
            href: "https://www.hermosabeach.gov/our-government/city-departments/public-works/environmental-programs/clean-power-alliance",
          },
        ],
      },
      {
        q: "Are there HVAC rebates for Hermosa Beach customers?",
        a: "SoCalGas and SCE list programs. SoCalGas lists a rebate for ENERGY STAR furnaces in existing residential properties, with funding first come, first served until December 31, 2026 or until it runs out. SCE lists Golden State Rebates coupons for air conditioners and smart thermostats at participating retailers, and Home Performance Plus for customers in disadvantaged or low-income communities. We did not confirm whether a Hermosa Beach address qualifies for Home Performance Plus. Terms and funding change and we do not quote amounts, so check the current terms before you buy.",
        boldLead: "SoCalGas and SCE list programs.",
        links: [
          {
            text: "rebate for ENERGY STAR furnaces",
            href: "https://www.socalgas.com/savings/rebates-and-incentives",
          },
          {
            text: "Golden State Rebates",
            href: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace",
          },
          {
            text: "Home Performance Plus",
            href: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace",
          },
        ],
      },
      {
        q: "Is there HVAC help for income-qualified Hermosa Beach households?",
        a: "Possibly, for income-qualified households. SCE's Energy Savings Assistance program lists central AC or central heat pump replacement among its upgrades, and says services may not be available in all areas, restrictions may apply, and a co-payment may be required for some services. Eligibility depends on household income and the property, so check with SCE before counting on it.",
        boldLead: "Possibly, for income-qualified households.",
        links: [
          {
            text: "Energy Savings Assistance program",
            href: "https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program",
          },
        ],
      },
      {
        q: "What HVAC services are available in Hermosa Beach?",
        a: "AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout Hermosa Beach, for both residential and commercial properties.",
        boldLead: "AIRPRO SOLUTIONS provides",
        links: [
          {
            text: "AC repair",
            href: "/services/ac-repair/",
          },
          {
            text: "AC installation and replacement",
            href: "/services/ac-installation/",
          },
          {
            text: "AC maintenance",
            href: "/services/ac-maintenance/",
          },
          {
            text: "heating repair",
            href: "/services/heating-repair/",
          },
          {
            text: "furnace installation and replacement",
            href: "/services/furnace-installation/",
          },
          {
            text: "heat pump services",
            href: "/services/heat-pump-services/",
          },
          {
            text: "ductless mini-splits",
            href: "/services/ductless-mini-split/",
          },
          {
            text: "ductwork",
            href: "/services/ductwork/",
          },
          {
            text: "indoor air quality",
            href: "/services/indoor-air-quality/",
          },
          {
            text: "emergency HVAC",
            href: "/services/emergency-hvac/",
          },
        ],
      },
      {
        q: "Is emergency HVAC service available in Hermosa Beach?",
        a: "Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in Hermosa Beach. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.",
        boldLead: "Yes.",
        links: [
          {
            text: "(323) 776-9047",
            href: "tel:+13237769047",
          },
        ],
      },
      {
        q: "How much does HVAC service cost in Hermosa Beach?",
        a: "Cost depends on the problem, the equipment, and how accessible the system is. We do not publish one flat price, so call (323) 776-9047 or request service and we will quote your specific system.",
        boldLead: "Cost depends on the problem, the equipment, and how accessible the system is.",
        links: [
          {
            text: "(323) 776-9047",
            href: "tel:+13237769047",
          },
        ],
      },
      {
        q: "Does AIRPRO SOLUTIONS handle commercial HVAC in Hermosa Beach?",
        a: "Yes. AIRPRO SOLUTIONS services commercial properties in Hermosa Beach, including rooftop units. We confirm the permit path with the City before commercial work starts, and we plan rooftop access and equipment placement with the building owner or manager. Permits go through the City's applications page and Building and Safety Division, and we confirm what applies to your project with the City. See our Commercial HVAC page for the full scope.",
        boldLead: "Yes.",
        links: [
          {
            text: "applications page",
            href: "https://www.hermosabeach.gov/our-government/community-development/applications-forms-handouts",
          },
          {
            text: "Commercial HVAC page",
            href: "/commercial-hvac/",
          },
        ],
      },
    ],
  },
};

const ranchoCucamongaOverrides: Partial<City> = {
  // TODO(data): add verified climate detail before treating this as a full local page.
  neighborhoods: [], // no official neighborhood list was verified (only a third-party guide names areas); nothing is shown
  zips: [], // ZIP list held out: the research's list came from a third-party real-estate guide; no official postal or service-area list was read
  page: {
    metaDescription:
      "HVAC for Rancho Cucamonga homes and businesses, from AC repair to installation. Know the online permit steps and your utility. Licensed, 4.8-star rated.",
    lede:
      "AIRPRO SOLUTIONS provides HVAC services across Rancho Cucamonga, including the Victoria Gardens area, with AC repair, heating repair, installation, and maintenance for homes and businesses.",
    heroCaption: { title: "Rancho Cucamonga, CA", text: "Local HVAC service across Rancho Cucamonga" },
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
      lead: "AIRPRO SOLUTIONS is a licensed HVAC contractor serving Rancho Cucamonga",
      body:
        ", providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, subject to capacity, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.",
    },
    glance: {
      title: "Rancho Cucamonga at a glance",
      stats: [
        { num: "177,856", label: "residents in the Census Bureau's July 1, 2025 estimate (U.S. Census Bureau QuickFacts)" },
        { num: "62.5%", label: "of 59,440 housing units are single-family detached, and 24.0% are in buildings of 5 or more units (California Department of Finance E-5 estimates, per SCAG, updated April 2021)" },
        { num: "28.5%", label: "of housing was built from 1980 to 1989, the largest share, and 9.6% before 1970 (American Community Survey 2014-2018, per SCAG)" },
      ],
      source: "Sources: U.S. Census Bureau QuickFacts and SCAG's Pre-Certified Local Housing Data for Rancho Cucamonga.",
    },
    localTitle: "Rancho Cucamonga's online permits, utilities, and noise limits",
    // Held out (no verified source): ZIP card (the research's 91701, 91730, 91737 and 91739 came from a third-party real-estate guide; the City pages read show only 91730 in the City Hall address); neighborhood pills and the nearby row (Alta Loma, Etiwanda, Terra Vista, Victoria, Caryn and Red Hill came from a third-party guide and the City General Plan would not load); climate, NOAA and heat figures (the timeanddate airport-station normals are third-party and not city data); HVAC self-certification inspection by photo or video (a March 2020 pandemic-era document that says interiors of existing single-family homes are not inspected at this time, with no evidence it is still in effect); dollar fee amounts (the research's 332, 50 and 395 figures are from the FY 2025-26 schedule, were mislabeled and are superseded; pairing in the newer schedule is not verifiable); RCMU and SoCalGas rebate amounts; the SCE Summer Discount Plan, Energy Savings Assistance, TECH Clean California and annual-credit claims (not read this session); city-specific condenser setbacks, screening rules, historic and HOA rules; named industrial areas, employers and employee counts; Municipal Code landing-page currency claims (through Ordinance 1029); official ecode360 noise text (only the table of contents loaded); the City At a Glance PDF figures (173,134 residents, Retail Coach source, conflicts with QuickFacts); competitor SERP table (gap analysis only).
    // TODO(verify): confirm with the City which permit path each HVAC job needs (permitting questions (909) 488-4668, call or text) and whether AIRPRO SOLUTIONS needs a City business license (not found on the City pages read).
    // TODO(verify): noise text is from a THIRD-PARTY copy of Development Code Section 17.66.050 on GoCodebook (labeled 2026-10 edition, as of 2026-10-04, says it is not a substitute for the official code). Recheck against the official ecode360 text before publishing any limit.
    // TODO(verify): Title 24 sentences are general because the Energy Commission HVAC page was permission-blocked this session. Recheck the page before adding leakage limits or the climate-zone list.
    // Pre-launch recheck: Building & Safety page, Online Permit Center guide (undated), Applicable Codes (undated), Ordinance 1048 and its Chapter 15.16, Community Development fee schedule (file name says eff 1-1-26, content says FY 2026-27), RCMU pages and rebate forms, SCE and SoCalGas rebate pages, GoCodebook vs official ecode360 Section 17.66.050, Energy Commission HVAC page, SCAG housing PDF, QuickFacts, economic development page, zoning viewer.
    localParagraphs: [
      "Rancho Cucamonga's Building & Safety page says all permits are applied for online and that the City does not issue permits over the counter, and it lists (909) 488-4668 for permitting questions by call or text. Applications can also be started at kiosks at City Hall, 10500 Civic Center Drive. The City's Online Permit Center guide, an older undated document, lists condenser, forced air unit, and HVAC replacement-only work among the **no plan check permits that can be processed and issued online**, including payment, and the City's fee schedule lists HVAC system and package or split system fee items. We did not find a current City page that states which HVAC jobs need a permit, so **AIRPRO SOLUTIONS confirms the permit path with the City** before work starts.",
      "The City's Applicable Codes page, which is undated, lists 2025 California editions of the Building, Mechanical, and Energy Codes, among others, for plans filed on or after January 1, 2026, and earlier editions for plans filed before then. Ordinance No. 1048, adopted November 19, 2025, adopts the 2025 California Mechanical Code, and the Mechanical Code amendments we read cover permit fees and a Board of Appeals. The City's Building & Safety page lists **Climate Zone 10**, and California's Title 24 energy rules can require duct sealing, field verification and diagnostic testing, and refrigerant charge verification depending on the job, so we confirm which checks and which code edition apply to your project.",
      "Rancho Cucamonga had an estimated 177,856 residents on July 1, 2025, up from 174,453 in the 2020 U.S. Census, and QuickFacts reports a 62.3% owner-occupied housing rate for 2020-2024. SCAG's housing data, using California Department of Finance E-5 estimates and updated April 2021, counts **59,440 housing units: 62.5% single-family detached, 6.2% attached, 4.6% in buildings of 2 to 4 units, 24.0% in buildings of 5 or more, and 2.6% mobile homes**. The same report, citing the American Community Survey for 2014-2018, shows that **28.5% of housing units were built from 1980 to 1989**, the largest share, with 21.5% built from 1970 to 1979 and 9.6% before 1970. The figures are dated and citywide, and a build year does not tell us equipment age, ductwork, or access, so we check those at the property.",
      "Rancho Cucamonga has two electric providers. The City's utilities page lists Southern California Edison and Rancho Cucamonga Municipal Utility (RCMU) for electric service and Southern California Gas for gas. RCMU's page says **Southern California Edison is the main service provider** and that RCMU serves limited areas, with residential service at The Enclave, Day Creek Square, The Row & Bungalows, The Resort, Day Creek Villas, and Cadence Senior Living, and commercial service to Victoria Gardens Mall and surrounding commercial and industrial developments. Rebate eligibility follows your utility account, so confirm on your bill whether SCE or RCMU serves you. We link the program pages instead of quoting amounts.",
      "For noise, the third-party copy of Development Code Section 17.66.050 that we read lists residential exterior limits of **65 dBA from 7 a.m. to 10 p.m. and 60 dBA from 10 p.m. to 7 a.m.**, measured at the adjacent residential property line, and 70 dBA by day and 65 dBA at night for commercial and office property. It does not mention air conditioners. The copy is hosted by GoCodebook, not the City, and says it is not a substitute for the official code, so we confirm how the limits apply to your address before choosing a condenser location. For commercial work, the City's economic development site names the HART District, the Epicenter Master Plan area, the Foothill Boulevard Corridor, Cucamonga Town Center, and Cucamonga Station, and the City's Zoning Plan Interactive Viewer shows how a property is zoned, so we plan commercial visits around the building and its rooftop or ground equipment access. Official links are in the card for this section.",
    ],
    neighborhoodsHeading: "Official Rancho Cucamonga resources",
    officialResources: [
      {
        text: "Building & Safety",
        href: "https://www.cityofrc.us/community-development/building-safety",
        note: "Online-only permits and contact numbers.",
      },
      {
        text: "Online Permit Center",
        href: "https://www.cityofrc.us/construction-development/online-permit-center",
        note: "Where the City sends applicants to apply for permits.",
      },
      {
        text: "Zoning Plan Interactive Viewer",
        href: "https://www.cityofrc.us/everything-we-do/zoning-map",
        note: "Look up how a property is zoned.",
      },
      {
        text: "Development Code Section 17.66.050, noise",
        href: "https://gocodebook.com/library/us/ca/rancho-cucamonga-zoning/title-17-development-code/chapter-17.66-performance-standards",
        note: "Exterior noise standards, on a third-party host.",
      },
      {
        text: "City utilities information",
        href: "https://www.cityofrc.us/construction-development/local-utilities-information",
        note: "Lists the electric, gas, and water providers.",
      },
      {
        text: "Rancho Cucamonga Municipal Utility",
        href: "https://www.cityofrc.us/rcmu",
        note: "The City's electric utility, its limited service area, and its rebates.",
      },
      {
        text: "SCE rebates",
        href: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace",
        note: "Rebate and coupon programs.",
      },
      {
        text: "SoCalGas rebates",
        href: "https://www.socalgas.com/savings/rebates-and-incentives",
        note: "Natural gas furnace rebate and program terms.",
      },
      {
        text: "Economic development",
        href: "https://www.cityofrc.us/everything-we-do/economic-development",
        note: "Districts and corridors named on this page.",
      },
      {
        text: "SCAG housing data (PDF)",
        href: "https://scag.ca.gov/sites/main/files/file-attachments/rancho-cucamonga-he-0421.pdf?1620770003",
        note: "Housing counts and building age.",
      },
      {
        text: "Census QuickFacts",
        href: "https://www.census.gov/quickfacts/fact/table/ranchocucamongacitycalifornia/PST045224",
        note: "Population and owner-occupied rate.",
      },
    ],
    // The local cards below restate figures already in the local paragraphs.
    localCards: [
      {
        heading: "Rancho Cucamonga housing snapshot",
        rows: [
          { label: "Single-family detached", value: "62.5%" },
          { label: "Buildings of 5 or more units", value: "24.0%" },
          { label: "Built 1980 to 1989", value: "28.5%" },
          { label: "Built before 1970", value: "9.6%" },
        ],
        note: "SCAG's housing data, updated April 2021: California Department of Finance E-5 estimates for housing type and American Community Survey 2014-2018 estimates for building age. Figures are citywide and dated.",
      },
      {
        heading: "Exterior noise limits",
        rows: [
          { label: "Residential, 7 a.m. to 10 p.m.", value: "65 dBA" },
          { label: "Residential, 10 p.m. to 7 a.m.", value: "60 dBA" },
          { label: "Commercial and office, 7 a.m. to 10 p.m.", value: "70 dBA" },
          { label: "Commercial and office, 10 p.m. to 7 a.m.", value: "65 dBA" },
        ],
        note: "Development Code Section 17.66.050, measured at the adjacent property line. Third-party copy on GoCodebook, not the City, and it does not mention air conditioners. Confirm against the official code.",
      },
    ],
    servicesTitle: "Everything we handle for Rancho Cucamonga homes and businesses",
    serviceCards: [
      { slug: "ac-repair", name: "AC Repair", body: "Diagnosis and repair for cooling failures, weak airflow, and unusual noises, with the City's noise standards in mind for outdoor units." },
      { slug: "ac-installation", name: "AC Installation & Replacement", body: "New system sizing and installation, planned around the City's online permit process, Climate Zone 10 Title 24 requirements, and your electric utility." },
      { slug: "ac-maintenance", name: "AC Maintenance", body: "Seasonal AC tune-ups that catch small issues early, for homes and for commercial rooftop and ground units." },
      { slug: "heating-repair", name: "Heating Repair", body: "Furnace and heating system diagnosis and repair. The City's utilities page lists Southern California Gas as the gas provider." },
      { slug: "furnace-installation", name: "Furnace Installation & Replacement", body: "New furnace sizing and installation, with the City's permit path confirmed before work starts. SoCalGas lists a gas furnace rebate that requires proof of permit closure, and funding changes, so we point you to the current program page." },
      { slug: "heat-pump-services", name: "Heat Pump Services", body: "Installation, repair, and maintenance for heat pumps. Heat pump work starts with your electric utility, which is SCE or, in limited areas, RCMU, and incentive programs change." },
      { slug: "ductless-mini-split", name: "Ductless Mini-Split", body: "Room-by-room comfort control for spaces where ductwork is not an option." },
      { slug: "ductwork", name: "Ductwork Services", body: "Duct repair, sealing, replacement, and installation, with Title 24 duct sealing and verification in mind. The City's fee schedule lists a ductwork-only item." },
      { slug: "indoor-air-quality", name: "Indoor Air Quality", body: "Air filtration, whole-home purification, and ventilation options." },
      { slug: "emergency-hvac", name: "Emergency HVAC", body: "Dispatch for no-cool and no-heat emergencies in Rancho Cucamonga." },
    ],
    resources: {
      eyebrow: "Know before you start",
      title: "Rancho Cucamonga permits, electric utilities, and incentive programs",
      intro: "Official sources for three local items worth checking before a Rancho Cucamonga HVAC project.",
      cards: [
        // No dollar amounts on purpose; recheck links before launch.
        {
          amount: "Online permits",
          description: "Rancho Cucamonga does not issue permits over the counter, and applications go through the City's Online Permit Center. The City's guide lists condenser, forced air unit, and HVAC replacement-only work among the no plan check permits, but it is an older undated document, so confirm your job with the City.",
          linkLabel: "Building & Safety",
          linkHref: "https://www.cityofrc.us/community-development/building-safety",
        },
        {
          amount: "Two electric utilities",
          description: "Southern California Edison is the main electric provider, and the City's own utility, RCMU, serves limited areas that include Victoria Gardens Mall. Which utility serves you decides which rebates apply, so check your bill.",
          linkLabel: "RCMU",
          linkHref: "https://www.cityofrc.us/rcmu",
        },
        {
          amount: "Incentive programs",
          description: "SCE, SoCalGas, and RCMU list HVAC-related programs for their own customers, including Golden State Rebates coupons, a gas furnace rebate that needs proof of permit closure, and RCMU rebates. Terms and funding change, and we do not quote amounts, so check the current terms before you buy.",
          linkLabel: "SCE rebates",
          linkHref: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace",
        },
      ],
    },
    nearby: [],
    proof: {
      heading: "Licensed, reviewed, and ready across Rancho Cucamonga",
      body: "AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.",
      stats: [
        { num: "4.8★", label: "Google rating" },
        { num: "40", label: "Google reviews" },
        { num: "C-20", label: "California license class" },
        { num: "24/7", label: "Emergency dispatch" },
      ],
    },
    finalCtaBody: "Call or request service online to schedule a visit anywhere in Rancho Cucamonga. Same-day service is typical, subject to capacity.",
    faqs: [
      {
        q: "Does AIRPRO SOLUTIONS service all of Rancho Cucamonga?",
        a: "Yes. AIRPRO SOLUTIONS serves homes and businesses across Rancho Cucamonga as part of our Inland Empire coverage. The City's Building & Safety department handles permits through its Online Permit Center, so we plan each visit around your specific address.",
        boldLead: "Yes.",
        links: [
          { text: "Inland Empire coverage", href: "/service-areas/inland-empire/" },
          { text: "Online Permit Center", href: "https://www.cityofrc.us/construction-development/online-permit-center" },
        ],
      },
      {
        q: "How fast can a technician reach my Rancho Cucamonga home?",
        a: "Same-day service is typical in Rancho Cucamonga, subject to capacity. Call (323) 776-9047 to confirm a window for your address.",
        boldLead: "Same-day service is typical in Rancho Cucamonga, subject to capacity.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Do I need a permit to replace an AC or furnace in Rancho Cucamonga?",
        a: "Check with the City before work starts. Rancho Cucamonga's Building & Safety page says all permits are applied for online and that the City does not issue permits over the counter. The City's Online Permit Center guide, an older undated document, lists condenser, forced air unit, and HVAC replacement-only work among the no plan check permits that can be issued online, but we did not find a current City page that says which HVAC jobs need a permit. The City's fee schedule lists HVAC system fees, and the SoCalGas furnace rebate requires proof of permit closure, so AIRPRO SOLUTIONS confirms the permit path with the City before work starts.",
        boldLead: "Check with the City before work starts.",
        links: [
          { text: "Building & Safety page", href: "https://www.cityofrc.us/community-development/building-safety" },
          { text: "Online Permit Center guide", href: "https://www.cityofrc.us/sites/default/files/2020-10/How%20to%20Start%20an%20Application%20Using%20the%20Online%20Permit%20Center.pdf" },
          { text: "fee schedule", href: "https://www.cityofrc.us/sites/default/files/2026-01/Fee_Schedule_Comm_Develop_eff_1-1-26_0.pdf" },
          { text: "SoCalGas", href: "https://www.socalgas.com/savings/rebates-and-incentives" },
        ],
      },
      {
        q: "How do I apply for an HVAC permit in Rancho Cucamonga?",
        a: "Use the City's Online Permit Center. The City says its permit process is done 100% online, and applications can also be started at kiosks at City Hall, 10500 Civic Center Drive. The City lists (909) 488-4668 for permitting questions by call or text. The fee schedule lists HVAC system and package or split system fee items, and we do not quote fees. We confirm what your job needs with the City before we apply.",
        boldLead: "Use the City's Online Permit Center.",
        links: [
          { text: "Online Permit Center", href: "https://www.cityofrc.us/construction-development/online-permit-center" },
          { text: "fee schedule", href: "https://www.cityofrc.us/sites/default/files/2026-01/Fee_Schedule_Comm_Develop_eff_1-1-26_0.pdf" },
        ],
      },
      {
        q: "Which building codes apply to HVAC work in Rancho Cucamonga?",
        a: "The City's Applicable Codes page lists 2025 California editions of the Building, Mechanical, and Energy Codes, among others, for plans filed on or after January 1, 2026. The page is undated. It also lists 2022 editions for plans filed on or after January 1, 2023, and 2019 editions for plans filed on or after January 1, 2020. Ordinance No. 1048, adopted November 19, 2025, adopts the 2025 California Mechanical Code, and the Mechanical Code amendments we read cover permit fees and a Board of Appeals. We confirm which edition applies to your project with the City.",
        boldLead: "The City's Applicable Codes page lists 2025 California editions of the Building, Mechanical, and Energy Codes, among others, for plans filed on or after January 1, 2026.",
        links: [
          { text: "Applicable Codes page", href: "https://www.cityofrc.us/sites/default/files/2026-01/Applicable%20Codes.pdf" },
          { text: "Ordinance No. 1048", href: "https://ecode360.com/RA4992/laws/LF2538456.pdf" },
        ],
      },
      {
        q: "Does Title 24 apply when I replace an AC or furnace in Rancho Cucamonga?",
        a: "Yes, the applicable Title 24 energy requirements apply. The City's Building & Safety page lists Climate Zone 10, and California's Energy Code can require duct sealing, field verification and diagnostic testing, and refrigerant charge verification depending on the job. The Energy Commission's HVAC page explains which checks apply to which work. Not every job needs every test, and we confirm what your job needs.",
        boldLead: "Yes, the applicable Title 24 energy requirements apply.",
        links: [
          { text: "Energy Commission's HVAC page", href: "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/energy-code-support-center/hvac-0" },
        ],
      },
      {
        q: "Does Rancho Cucamonga have a noise rule that affects AC equipment?",
        a: "Rancho Cucamonga's Development Code sets exterior noise standards in Section 17.66.050. The third-party copy we read lists 65 dBA from 7 a.m. to 10 p.m. and 60 dBA from 10 p.m. to 7 a.m. for residential property, measured at the adjacent residential property line, and it does not mention air conditioners, so we did not find a rule written only for HVAC equipment. The copy is hosted by GoCodebook, not the City, and says it is not a substitute for the official code, so we confirm how the limits apply to your address before we choose a condenser location.",
        boldLead: "Rancho Cucamonga's Development Code sets exterior noise standards in Section 17.66.050.",
        links: [
          { text: "third-party copy", href: "https://gocodebook.com/library/us/ca/rancho-cucamonga-zoning/title-17-development-code/chapter-17.66-performance-standards" },
        ],
      },
      {
        q: "Does Rancho Cucamonga have rules for where outdoor AC equipment can go?",
        a: "We confirm placement with the City before choosing a unit and location. We did not find or verify a City setback or screening rule for replacement equipment, so we do not assume one applies or does not apply. The City's Zoning Plan Interactive Viewer shows how a property is zoned, and the City lists (909) 488-4668 for permitting questions by call or text.",
        boldLead: "We confirm placement with the City before choosing a unit and location.",
        links: [
          { text: "Zoning Plan Interactive Viewer", href: "https://www.cityofrc.us/everything-we-do/zoning-map" },
        ],
      },
      {
        q: "Do you work in condos and apartment buildings in Rancho Cucamonga?",
        a: "Yes. SCAG's housing data for Rancho Cucamonga, using California Department of Finance E-5 estimates and updated April 2021, counts 59,440 housing units, with 62.5% single-family detached, 6.2% single-family attached, 4.6% in buildings of 2 to 4 units, 24.0% in buildings of 5 or more units, and 2.6% mobile homes. AIRPRO SOLUTIONS services condos, townhomes, and apartments as well as single-family homes, and in a multi-unit building we confirm equipment access and placement at the property. See our Residential HVAC page.",
        boldLead: "Yes.",
        links: [
          { text: "housing data", href: "https://scag.ca.gov/sites/main/files/file-attachments/rancho-cucamonga-he-0421.pdf?1620770003" },
          { text: "Residential HVAC page", href: "/residential-hvac/" },
        ],
      },
      {
        q: "Does the age of Rancho Cucamonga homes matter for HVAC work?",
        a: "It can, and we confirm it on site. SCAG's housing data, citing the American Community Survey for 2014-2018, reports that 28.5% of Rancho Cucamonga's housing units were built from 1980 to 1989, the largest share, followed by 21.5% from 1970 to 1979 and 21.4% from 2000 to 2009, and 9.6% were built before 1970. Those figures are dated and citywide, and the year a home was built does not tell us its equipment age, ductwork condition, or whether it has air conditioning, so we check those at a site visit before recommending repair or replacement.",
        boldLead: "It can, and we confirm it on site.",
        links: [
          { text: "housing data", href: "https://scag.ca.gov/sites/main/files/file-attachments/rancho-cucamonga-he-0421.pdf?1620770003" },
        ],
      },
      {
        q: "Do you service Victoria Gardens and the rest of Rancho Cucamonga?",
        a: "Yes. AIRPRO SOLUTIONS serves homes and businesses across Rancho Cucamonga. The City's municipal electric utility, Rancho Cucamonga Municipal Utility, says it provides commercial electric service to Victoria Gardens Mall and surrounding commercial and industrial developments, and the City's economic development site names the HART District, the Epicenter Master Plan area, the Foothill Boulevard Corridor, and Cucamonga Town Center. We plan each visit around the address, including equipment access and placement.",
        boldLead: "Yes.",
        links: [
          { text: "Rancho Cucamonga Municipal Utility", href: "https://www.cityofrc.us/rcmu/commercial-power-service" },
          { text: "economic development site", href: "https://www.cityofrc.us/everything-we-do/economic-development" },
        ],
      },
      {
        q: "Who provides electricity and gas in Rancho Cucamonga?",
        a: "Southern California Edison is the main electric provider, and the City's own utility, Rancho Cucamonga Municipal Utility (RCMU), serves limited areas, including The Enclave, Day Creek Square, The Row & Bungalows, The Resort, Day Creek Villas, Cadence Senior Living, and Victoria Gardens Mall and surrounding commercial and industrial developments. The City's utilities page lists Southern California Gas for gas. Confirm your electric utility on your bill before counting on a program, because eligibility follows your utility account. Programs, amounts, and funding change.",
        boldLead: "Southern California Edison is the main electric provider, and the City's own utility, Rancho Cucamonga Municipal Utility (RCMU), serves limited areas, including The Enclave, Day Creek Square, The Row & Bungalows, The Resort, Day Creek Villas, Cadence Senior Living, and Victoria Gardens Mall and surrounding commercial and industrial developments.",
        links: [
          { text: "Rancho Cucamonga Municipal Utility", href: "https://www.cityofrc.us/rcmu" },
          { text: "The Enclave, Day Creek Square, The Row & Bungalows, The Resort, Day Creek Villas, Cadence Senior Living", href: "https://www.cityofrc.us/rcmu/residential-power-service" },
          { text: "utilities page", href: "https://www.cityofrc.us/construction-development/local-utilities-information" },
        ],
      },
      {
        q: "Which rebate and incentive pages should I check before buying HVAC equipment in Rancho Cucamonga?",
        a: "Check the pages for your own electric and gas utility. SCE's rebates page lists Golden State Rebates instant coupons for air conditioners and smart thermostats, a Smart Energy Program bill credit for letting SCE adjust an eligible smart thermostat, and Home Performance Plus for eligible customers in disadvantaged or low-income communities. RCMU says it offers rebates and incentives to its residential and commercial customers. SoCalGas lists a rebate for qualifying natural gas furnaces that requires installation by a licensed contractor with proof of permit closure and is limited to one per household. Funds are first come, first served and programs can change, so confirm eligibility with each utility. We do not quote amounts.",
        boldLead: "Check the pages for your own electric and gas utility.",
        links: [
          { text: "SCE's rebates page", href: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace" },
          { text: "RCMU", href: "https://www.cityofrc.us/rcmu" },
          { text: "SoCalGas", href: "https://www.socalgas.com/savings/rebates-and-incentives" },
        ],
      },
      {
        q: "What HVAC services are available in Rancho Cucamonga?",
        a: "AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout Rancho Cucamonga, for both residential and commercial properties.",
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
        q: "Is emergency HVAC service available in Rancho Cucamonga?",
        a: "Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in Rancho Cucamonga. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.",
        boldLead: "Yes.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "How much does HVAC service cost in Rancho Cucamonga?",
        a: "Cost depends on the problem, the equipment, and how accessible the system is. We do not publish one flat price, so call (323) 776-9047 or request service and we will quote your specific system.",
        boldLead: "Cost depends on the problem, the equipment, and how accessible the system is.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Does AIRPRO SOLUTIONS handle commercial HVAC in Rancho Cucamonga?",
        a: "Yes. AIRPRO SOLUTIONS services commercial properties in Rancho Cucamonga, including rooftop units. The City's municipal electric utility, Rancho Cucamonga Municipal Utility, serves Victoria Gardens Mall and surrounding commercial and industrial developments, and the City's economic development site names the HART District, Cucamonga Town Center, and the Foothill Boulevard Corridor. We confirm the permit path with the City before work starts. See our Commercial HVAC page for the full scope.",
        boldLead: "Yes.",
        links: [
          { text: "Rancho Cucamonga Municipal Utility", href: "https://www.cityofrc.us/rcmu/commercial-power-service" },
          { text: "economic development site", href: "https://www.cityofrc.us/everything-we-do/economic-development" },
          { text: "Commercial HVAC page", href: "/commercial-hvac/" },
        ],
      },
    ],
  },
};

const hawthorneOverrides: Partial<City> = {
  // TODO(data): add verified climate detail before treating this as a full local page.
  neighborhoods: [], // neighborhood list held out: no official City source read, so no names are published
  zips: [], // ZIP list held out: no official City or USPS list of Hawthorne ZIPs (see held out comment below)
  page: {
    metaDescription: "HVAC for Hawthorne homes and businesses, from AC repair to installation. Know the City's inspection steps and local housing. Licensed, 4.8-star rated.",
    lede: "AIRPRO SOLUTIONS provides HVAC services across Hawthorne, with AC repair, heating repair, installation, and maintenance for homes and businesses, and with the City's inspection process and local housing in mind.",
    heroCaption: { title: "Hawthorne, CA", text: "Local HVAC service across Hawthorne" },
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
      lead: "AIRPRO SOLUTIONS is a licensed HVAC contractor serving Hawthorne",
      body: ", providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, subject to capacity, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.",
    },
    glance: {
      title: "Hawthorne at a glance",
      stats: [
        {
          num: "82,741",
          label: "residents in the Census Bureau's July 1, 2025 estimate (U.S. Census Bureau QuickFacts)",
        },
        {
          num: "52.5%",
          label: "of 30,634 housing units are in buildings of 5 or more units, and 29.4% are single-family detached (California Department of Finance E-5, per SCAG)",
        },
        {
          num: "27.2%",
          label: "owner-occupied housing unit rate, 2020 to 2024 (U.S. Census Bureau QuickFacts)",
        },
      ],
      source: "Sources: U.S. Census Bureau QuickFacts and SCAG's April 2021 Pre-Certified Local Housing Data for Hawthorne.",
    },
    localTitle: "Hawthorne's inspections, housing stock, and utility programs",
    // Held out (no verified source): Noise figures (5 dB over ambient, 50 dBA and 60 dBA) and the 20 foot setback and vibration isolation rules: the pasted research cited zoneomics.com chapter 13. The page as fetched shows only Chapter 17.05j, the billboard overlay (Ord. 2263, 6/23/2026), with no noise text, so the research's 2026-06-23 date belongs to the billboard chapter. Zoneomics is a publisher copy, not the official code. The official Municipal Code location was not found (search returned only a GoCodebook publisher copy). Not published. | Whether replacing an AC or furnace needs a permit, the permit application, plan check, fees and code edition: the City Building & Safety department page would not load here, and the pages that did load do not address HVAC permits. The page says we confirm with the City. | The research claim that HVAC and mechanical permits are handled through Building and Safety with inspection requests by phone 24 hours ahead: the Building & Safety Requirements page is about new business location code compliance inspections, and the Inspections page schedules through Citizen Self Service. Corrected. | City About page (population nearly 87,000, about six square miles, LAX and the I-405, I-110 and I-105 corridors, South Bay subregion, incorporation 1922) and Zoning page (Planning phone and email, zoning pattern, the Century Business Center and Green Line planning areas on the existing hub card): both pages would not load. Not on the page. | ZIP card (90250 and 90251): the only source read is a California Volunteers county-lookup table, a state program page read partially, not an official City or USPS list. ZIPs and neighborhoods held out. The fisherrealestate.com neighborhood list is a realtor page. | Neighboring cities and adjacency, flat, hillside, coastal or beach city labels: Wikipedia only, so the nearby row claims no adjacency. | Climate, NOAA normals, heat-day counts, humidity, marine layer, heat island: no station verified. | Median year built (1972 is a third-party figure), housing by neighborhood, commercial share of building stock: no Census table was readable. The SCAG document is used for housing instead. | SpaceX and other employers, shopping centers, hospitals, schools, industrial areas, HOA areas, historic-district rules: no source. | Water providers (Golden State Water, California Water Service) and the City water transition notice: not HVAC, address-level coverage not established. | SCE time-of-use plans including TOU-D-PRIME and SCE power-request or SoCalGas Builder Services application steps: pasted research only, not read, SCE-wide rather than Hawthorne-specific. Not published. | LADWP rebates (up to 120 per ton and the GO ZERO mention): the City lists SCE, not LADWP, so LADWP programs are off the page. | All rebate dollar amounts; federal Section 25C and 25D status; HEEHRA; SoCalGas wildfire thermostat (the 2026 application does not list 90250 or 90251); SCE Smart Energy Program credit; South Coast AQMD GO ZERO (applications paused, October 2, 2026 Phase 2 notice); Clean Power Alliance Instant AC (planned, not open). | SoCalGas licensed-contractor and permit-closure conditions and SCE approved-contractor wording: kept off the page. | Competitor SERP table: never on the page.
    // Copy approval: the user confirmed on 2026-10-19 that the client approves the Hawthorne page copy. The estimate years for the SCAG figures were removed from the visible copy until the PDF is re-read.
    // TODO(verify): The City Inspections page (departments/building-safety/request-for-inspection-form) was read through a fetch summary and shows no date. It appears to be only the Inspections section: no office hours, no forms, nothing on mechanical or HVAC inspections. The summary also said callers must phone before 9 a.m. on the inspection date to get a time slot; that is not on the page. Re-read directly.
    // TODO(verify): The City Building & Safety Requirements page (departments/building-safety/building-safety-requirements) was read through a fetch summary and shows no date. It concerns the business license code compliance inspection for a NEW BUSINESS LOCATION, not HVAC permits. The 24 hour advance call and the 9:00 a.m. to 5:00 p.m. window are stated there in that commercial context only. The pasted research and the existing South Bay hub treated them as HVAC permit facts, which the page does not support.
    // TODO(verify): The City resident resources page (residents/resident-resources) lists Southern California Edison and Southern California Gas Company. It was a partial fetch summary with no date for the utility listing. The SoCalGas served-cities page lists HAWTHORNE (undated web page, not a bill-insert PDF as the research called it).
    // TODO(verify): Clean Power Alliance membership (joined 2019 to 2020, serving customers since 2019) comes from cleanpoweralliance.org and its residential-rate page through fetch summaries. No City page read names Clean Power Alliance, and the City Environmental Programs page says Hawthorne is going 100 percent green power without naming a supplier (undated). The page states only the CPA site's own listing and no default product.
    // TODO(verify): SCAG April 2021 Pre-Certified Local Housing Data (hawthorne-he-0421.pdf) was read through a fetch summary of the full text. The E-5 year of the 30,634 units is not stated in the summary (the document compares 2000 to 2020), so the page does not give a year. Re-read the PDF directly and confirm the E-5 year and the ACS 2014 to 2018 build-period shares.
    // TODO(verify): Census QuickFacts was read directly (full table): 82,741 population (July 1, 2025 estimate), owner-occupied housing unit rate 27.2 percent (2020 to 2024). The pasted research gave nearly 87,000 residents from the City About page, which would not load, so the QuickFacts figure is used.
    // TODO(verify): SoCalGas rebate terms were read on the rebates page and on the 2026 application PDF (full document, form code J087-228EEC 0926). SCE Energy Savings Assistance (mostly complete page, no date, income limits June 1, 2026 to May 31, 2027) and the SCE rebate directory (full page, no date) were read through fetch summaries.
    // Pre-launch recheck: City Inspections page, City Building & Safety Requirements page, City Building & Safety department page, Citizen Self Service and its user guide, City resident resources page, City About and Zoning pages, official Municipal Code (noise and equipment placement), SoCalGas served-cities page and rebates page with the 2026 application, SCE Energy Savings Assistance and rebate directory, Clean Power Alliance member list, SCAG housing data, QuickFacts.
    localParagraphs: [
      "The City's Building & Safety Department publishes an Inspections page that says **contractors and applicants can schedule an inspection through the Hawthorne Citizen Self Service web portal**. The page says permits issued before July 2022 must call the office, gives (310) 349-2990 for help if scheduling through the portal does not work, and says cancellations must be made 24 hours before the inspection day. It does not mention mechanical or HVAC inspections, and we did not find a City statement on whether replacing an air conditioner or furnace needs a permit, so **AIRPRO SOLUTIONS confirms the permit path and inspection steps with the City** before work starts. We also do not state permit fees, code editions, equipment placement rules, or noise limits, because we did not confirm them from a City source. The City pages we read show no date.",
      "For commercial space, the City's Building & Safety Requirements page describes the inspection of a new business location as part of the business license code compliance process. It says the inspector lists violations of the City's Building, Electrical, Mechanical, and Plumbing codes that must be corrected, and it covers fees and how a Code Compliance Inspection application is approved or denied. **The page says to call 24 hours in advance to request an inspection and that inspections are conducted between 9:00 a.m. and 5:00 p.m.** If a space you are moving into has HVAC equipment that needs attention, we plan the work around that schedule and confirm with the City which corrections need permits.",
      "Hawthorne had an estimated 82,741 residents on July 1, 2025, and QuickFacts reports a 27.2% owner-occupied housing unit rate for 2020 to 2024. SCAG's April 2021 pre-certified local housing data, using California Department of Finance E-5 estimates, counts **30,634 housing units: 29.4% single-family detached, 4.3% attached, 13.3% in buildings of 2 to 4 units, 52.5% in buildings of 5 or more, and 0.5% mobile homes**. The same document shows that **24.7 percent of housing was built from 1950 to 1959, the largest share of any period**. Those figures are citywide and dated, so we confirm the equipment, roof or attic access, and ductwork at the property. In a multi-unit building we confirm equipment access and placement with the owner or manager, and for commercial work we plan rooftop access and equipment placement with the building owner or manager.",
      "The City's resident resources page lists **Southern California Edison for electricity and Southern California Gas Company for natural gas**, and shows no date. SoCalGas also lists Hawthorne among the cities in its service area, and Clean Power Alliance's own site lists Hawthorne among its member communities, serving customers since 2019, so we ask which company supplies the electricity on your bill. SoCalGas lists a 2026 rebate for ENERGY STAR furnaces in existing residential properties, with funding first come, first served until December 31, 2026 or until it runs out. SCE's Energy Savings Assistance program lists central AC or central heat pump replacement among its upgrades for income-qualified households, and says services may not be available in all areas and a co-payment may be required for some services. SCE's rebate directory lists Golden State Rebates coupons for air conditioners and smart thermostats at participating retailers, and Home Performance Plus for customers in disadvantaged or low-income communities, and we did not confirm whether a Hawthorne address qualifies. Terms and funding change, so we link the program pages rather than quote amounts, and **confirm your utility accounts on your bills before counting on a program**. Official links are in the card for this section.",
    ],
    localCards: [
      {
        heading: "Hawthorne inspection path",
        rows: [
          { label: "Residential inspections", value: "Scheduled in the Citizen Self Service portal" },
          { label: "Permits issued before July 2022", value: "Call the office" },
          { label: "Help scheduling", value: "Building & Safety, (310) 349-2990" },
          { label: "New business location", value: "Code compliance inspection. Call 24 hours ahead, 9:00 a.m. to 5:00 p.m." },
        ],
        note: "From the City's Inspections page and Building & Safety Requirements page (neither shows a date). We confirm current requirements with the City.",
      },
      {
        heading: "Hawthorne housing snapshot",
        rows: [
          { label: "Single-family detached", value: "29.4%" },
          { label: "Buildings of 2 to 4 units", value: "13.3%" },
          { label: "Buildings of 5 or more units", value: "52.5%" },
          { label: "Largest build period", value: "1950 to 1959 (24.7%)" },
        ],
        note: "Unit mix and build periods are from SCAG's April 2021 Pre-Certified Local Housing Data. All figures are citywide.",
      },
    ],
    neighborhoodsHeading: "Official Hawthorne resources",
    officialResources: [
      {
        text: "Inspections",
        href: "https://www.cityofhawthorne.org/departments/building-safety/request-for-inspection-form",
        note: "Citizen Self Service scheduling and cancellations.",
      },
      {
        text: "Building & Safety Requirements",
        href: "https://www.cityofhawthorne.org/departments/building-safety/building-safety-requirements",
        note: "New business location inspection.",
      },
      {
        text: "Citizen Self Service",
        href: "https://www.cityofhawthorne.org/residents/virtual-city-hall/citizen-self-service",
        note: "City portal for permit and inspection processes.",
      },
      {
        text: "Resident resources",
        href: "https://www.cityofhawthorne.org/residents/resident-resources",
        note: "City listing of electric and gas providers.",
      },
      {
        text: "Clean Power Alliance",
        href: "https://cleanpoweralliance.org/",
        note: "Member communities and service area.",
      },
      {
        text: "SoCalGas rebates",
        href: "https://www.socalgas.com/savings/rebates-and-incentives",
        note: "ENERGY STAR furnace rebate and program period.",
      },
      {
        text: "SCE Energy Savings Assistance",
        href: "https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program",
        note: "Income-qualified upgrades and eligibility.",
      },
      {
        text: "SCAG Hawthorne housing data",
        href: "https://scag.ca.gov/sites/default/files/old/file-attachments/hawthorne-he-0421.pdf",
        note: "Housing counts and building age cited on this page.",
      },
      {
        text: "Census QuickFacts",
        href: "https://www.census.gov/quickfacts/fact/table/hawthornecitycalifornia/PST045224",
        note: "Population and owner-occupied rate cited on this page.",
      },
    ],
    servicesTitle: "Everything we handle for Hawthorne homes and businesses",
    serviceCards: [
      {
        slug: "ac-repair",
        name: "AC Repair",
        body: "Diagnosis and repair for cooling failures, weak airflow, and unusual noises in Hawthorne homes and businesses.",
      },
      {
        slug: "ac-installation",
        name: "AC Installation & Replacement",
        body: "New system sizing and installation, planned around the City's permit and inspection process.",
      },
      {
        slug: "ac-maintenance",
        name: "AC Maintenance",
        body: "Seasonal AC tune-ups that catch small issues early, for homes and for commercial rooftop and ground units.",
      },
      {
        slug: "heating-repair",
        name: "Heating Repair",
        body: "Furnace and heating system diagnosis and repair for Hawthorne homes and businesses.",
      },
      {
        slug: "furnace-installation",
        name: "Furnace Installation & Replacement",
        body: "Furnace sizing and installation, planned around the City's permit process. SoCalGas lists a furnace rebate with its own terms.",
      },
      {
        slug: "heat-pump-services",
        name: "Heat Pump Services",
        body: "Heat pump installation, repair, and maintenance, with the City's permit process and your utilities' program pages in mind.",
      },
      {
        slug: "ductless-mini-split",
        name: "Ductless Mini-Split",
        body: "Ductless systems for additions, converted spaces, and rooms the existing ducts do not reach.",
      },
      {
        slug: "ductwork",
        name: "Ductwork Services",
        body: "Duct repair, sealing, and replacement for Hawthorne homes and buildings.",
      },
      {
        slug: "indoor-air-quality",
        name: "Indoor Air Quality",
        body: "Filtration, ventilation, and air-quality upgrades for Hawthorne homes and offices.",
      },
      {
        slug: "emergency-hvac",
        name: "Emergency HVAC",
        body: "24/7 emergency dispatch for no-cool and no-heat problems. If you smell gas, leave the building and call 911 or your gas utility.",
      },
    ],
    resources: {
      eyebrow: "Know before you start",
      title: "Hawthorne inspections and incentive programs",
      intro: "Official sources for three items worth checking before a Hawthorne HVAC project.",
      cards: [
        {
          amount: "Inspections",
          description: "The City's Inspections page says contractors and applicants can schedule an inspection through the Citizen Self Service portal. It shows no date and does not mention HVAC, so we confirm the steps for your job with the City.",
          linkLabel: "City inspections page",
          linkHref: "https://www.cityofhawthorne.org/departments/building-safety/request-for-inspection-form",
        },
        {
          amount: "Furnace rebate",
          description: "SoCalGas lists a 2026 rebate for ENERGY STAR furnaces in existing residential properties, with funding first come, first served until December 31, 2026 or until it runs out. The City's resident resources page lists SoCalGas for natural gas, and we do not quote amounts.",
          linkLabel: "SoCalGas rebates",
          linkHref: "https://www.socalgas.com/savings/rebates-and-incentives",
        },
        {
          amount: "Income-qualified help",
          description: "SCE's Energy Savings Assistance program lists central AC or central heat pump replacement among its upgrades for income-qualified households. It says services may not be available in all areas and a co-payment may be required for some services, so check eligibility with SCE.",
          linkLabel: "SCE Energy Savings Assistance",
          linkHref: "https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program",
        },
      ],
    },
    nearby: ["torrance", "el-segundo", "gardena", "redondo-beach"],
    proof: {
      heading: "Licensed, reviewed, and ready across Hawthorne",
      body: "AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.",
      stats: [
        { num: "4.8★", label: "Google rating" },
        { num: "40", label: "Google reviews" },
        { num: "C-20", label: "California license class" },
        { num: "24/7", label: "Emergency dispatch" },
      ],
    },
    finalCtaBody: "Call or request service online to schedule a visit anywhere in Hawthorne. Same-day service is typical, subject to capacity.",
    faqs: [
      {
        q: "Does AIRPRO SOLUTIONS service all of Hawthorne?",
        a: "Yes. AIRPRO SOLUTIONS serves homes and businesses across Hawthorne as part of our South Bay coverage. The City's Building & Safety Department handles inspections, so we plan each visit around your specific address.",
        boldLead: "Yes.",
        links: [
          { text: "South Bay coverage", href: "/service-areas/south-bay/" },
        ],
      },
      {
        q: "How fast can a technician reach my Hawthorne home?",
        a: "Same-day service is typical in Hawthorne, subject to capacity. Call (323) 776-9047 to confirm a window for your address.",
        boldLead: "Same-day service is typical in Hawthorne, subject to capacity.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Do I need a permit to replace an air conditioner in Hawthorne?",
        a: "We did not find a City statement either way. The City's Inspections page does not mention mechanical or HVAC work, and we did not find a City page that says whether replacing an air conditioner needs a permit, so AIRPRO SOLUTIONS confirms the permit path with the City before work starts, and we do not quote permit fees.",
        boldLead: "We did not find a City statement either way.",
        links: [
          { text: "Inspections page", href: "https://www.cityofhawthorne.org/departments/building-safety/request-for-inspection-form" },
        ],
      },
      {
        q: "How do inspections work in Hawthorne?",
        a: "Inspections are scheduled through the City's Citizen Self Service portal. The City's Inspections page says contractors and applicants can schedule through the portal, permits issued before July 2022 must call the office, and cancellations must be made 24 hours before the inspection day. The page does not mention HVAC inspections, so AIRPRO SOLUTIONS confirms the inspection steps for your job with the City.",
        boldLead: "Inspections are scheduled through the City's Citizen Self Service portal.",
        links: [
          { text: "Inspections page", href: "https://www.cityofhawthorne.org/departments/building-safety/request-for-inspection-form" },
        ],
      },
      {
        q: "Does Hawthorne inspect a commercial space before a new business moves in?",
        a: "Yes, the City inspects a new business location. The City's Building & Safety Requirements page says an inspection is performed of the new business location and that the inspector lists violations of the City's Building, Electrical, Mechanical, and Plumbing codes that must be corrected. It says to call 24 hours in advance to request an inspection and that inspections are conducted between 9:00 a.m. and 5:00 p.m. AIRPRO SOLUTIONS services commercial HVAC equipment and confirms with the City which corrections need permits.",
        boldLead: "Yes, the City inspects a new business location.",
        links: [
          { text: "Building & Safety Requirements page", href: "https://www.cityofhawthorne.org/departments/building-safety/building-safety-requirements" },
        ],
      },
      {
        q: "Where can an outdoor AC unit go on my Hawthorne property?",
        a: "We confirm that with the City. We did not confirm the City's equipment placement, setback, or noise rules from a City source, so we do not state limits here, and AIRPRO SOLUTIONS checks the current rules and your property's layout with the City before choosing a location.",
        boldLead: "We confirm that with the City.",
      },
      {
        q: "Does the age of my Hawthorne home matter for HVAC?",
        a: "Age is one factor we check. SCAG's April 2021 housing data shows that 24.7 percent of Hawthorne's housing was built from 1950 to 1959, the largest share of any period. That is a citywide, dated figure, so we confirm the equipment, roof or attic access, and ductwork at your property.",
        boldLead: "Age is one factor we check.",
        links: [
          { text: "SCAG's April 2021 housing data", href: "https://scag.ca.gov/sites/default/files/old/file-attachments/hawthorne-he-0421.pdf" },
        ],
      },
      {
        q: "What about HVAC in Hawthorne apartment buildings and condos?",
        a: "Multi-unit buildings are the largest share of Hawthorne housing. About 52.5% of Hawthorne's 30,634 housing units are in buildings of 5 or more units and 13.3% are in buildings of 2 to 4 units, according to California Department of Finance E-5 estimates in SCAG's April 2021 housing data, so we confirm equipment access and placement with the property owner or manager before installation or replacement.",
        boldLead: "Multi-unit buildings are the largest share of Hawthorne housing.",
        links: [
          { text: "SCAG's April 2021 housing data", href: "https://scag.ca.gov/sites/default/files/old/file-attachments/hawthorne-he-0421.pdf" },
        ],
      },
      {
        q: "Which utility serves my Hawthorne address?",
        a: "Your bill answers it. The City's resident resources page lists Southern California Edison for electricity and Southern California Gas Company for natural gas. Clean Power Alliance's own site also lists Hawthorne among its member communities, so check your bill to see who supplies your electricity.",
        boldLead: "Your bill answers it.",
        links: [
          { text: "resident resources page", href: "https://www.cityofhawthorne.org/residents/resident-resources" },
          { text: "Clean Power Alliance's own site", href: "https://cleanpoweralliance.org/" },
        ],
      },
      {
        q: "Are there HVAC rebates for Hawthorne customers?",
        a: "SoCalGas and SCE list programs. SoCalGas lists a rebate for ENERGY STAR furnaces in existing residential properties, with funding first come, first served until December 31, 2026 or until it runs out. SCE lists Golden State Rebates coupons for air conditioners and smart thermostats at participating retailers, and Home Performance Plus for customers in disadvantaged or low-income communities. We did not confirm whether a Hawthorne address qualifies for Home Performance Plus. Terms and funding change and we do not quote amounts, so check the current terms before you buy.",
        boldLead: "SoCalGas and SCE list programs.",
        links: [
          { text: "rebate for ENERGY STAR furnaces", href: "https://www.socalgas.com/savings/rebates-and-incentives" },
          { text: "Golden State Rebates", href: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace" },
          { text: "Home Performance Plus", href: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace" },
        ],
      },
      {
        q: "Is there HVAC help for income-qualified Hawthorne households?",
        a: "Possibly, for income-qualified households. SCE's Energy Savings Assistance program lists central AC or central heat pump replacement among its upgrades, and says services may not be available in all areas, restrictions may apply, and a co-payment may be required for some services. Eligibility depends on household income and the property, so check with SCE before counting on it.",
        boldLead: "Possibly, for income-qualified households.",
        links: [
          { text: "Energy Savings Assistance program", href: "https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program" },
        ],
      },
      {
        q: "What HVAC services are available in Hawthorne?",
        a: "AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout Hawthorne, for both residential and commercial properties.",
        boldLead: "AIRPRO SOLUTIONS provides",
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
        q: "Is emergency HVAC service available in Hawthorne?",
        a: "Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in Hawthorne. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.",
        boldLead: "Yes.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "How much does HVAC service cost in Hawthorne?",
        a: "Cost depends on the problem, the equipment, and how accessible the system is. We do not publish one flat price, so call (323) 776-9047 or request service and we will quote your specific system.",
        boldLead: "Cost depends on the problem, the equipment, and how accessible the system is.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Does AIRPRO SOLUTIONS handle commercial HVAC in Hawthorne?",
        a: "Yes. AIRPRO SOLUTIONS services commercial properties in Hawthorne, including rooftop units. We confirm the permit path with the City before commercial work starts, and we plan rooftop access and equipment placement with the building owner or manager. See our Commercial HVAC page for the full scope.",
        boldLead: "Yes.",
        links: [
          { text: "Commercial HVAC page", href: "/commercial-hvac/" },
        ],
      },
    ],
  },
};

const carsonOverrides: Partial<City> = {
  // Copy approval: the client approved the Carson page copy on 2026-10-19 (per the user).
  // TODO(data): add verified climate and housing-stock detail before treating this as a full local page.
  neighborhoods: [], // neighborhood list held out: no City, county or Census source lists named neighborhoods
  zips: [], // ZIP list held out: no official City or USPS list of Carson ZIPs (see held out comment below)
  page: {
    metaDescription: "HVAC for Carson homes and businesses, from AC repair to installation. Know the City's online permit portal and inspection steps. Licensed, 4.8-star rated.",
    lede: "AIRPRO SOLUTIONS provides HVAC services across Carson, with AC repair, heating repair, installation, and maintenance for homes and businesses, and with the City's online permit portal and local housing in mind.",
    heroCaption: { title: "Carson, CA", text: "Local HVAC service across Carson" },
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
      lead: "AIRPRO SOLUTIONS is a licensed HVAC contractor serving Carson",
      body: ", providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, subject to capacity, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.",
    },
    glance: {
      title: "Carson at a glance",
      stats: [
        { num: "90,808", label: "residents in the Census Bureau's July 1, 2025 estimate (U.S. Census Bureau QuickFacts)" },
        { num: "74.0%", label: "owner-occupied housing unit rate among 26,974 households, 2020 to 2024 (U.S. Census Bureau QuickFacts)" },
        { num: "3.35 billion", label: "dollars in 2022 transportation and warehousing receipts (U.S. Census Bureau QuickFacts, Economic Census)" },
      ],
      source: "Source: U.S. Census Bureau QuickFacts for Carson city, California.",
    },
    localTitle: "Carson's online permit portal, housing, and utility programs",
    // Held out (no verified source): ZIP card and neighborhoods (CEQAnet shows 90745 only as the City lead agency's address on a state record; 90746 appears only on third-party maps; no City or USPS list was read) | Municipal Code noise limits, setbacks, vibration rule and the permit exemption list (read only through eCode360, a publisher copy, not the official code; the City's old codepublishing.com link now redirects there) | Mechanical permit worksheet (not found on the City pages read; the South Bay hub cites it) | 211LA permit listing (third party) | Housing stock by type and age, median year built (SCAG Carson data and the Housing Element were not retrievable; QuickFacts has no such field) | Climate, NOAA normals, marine layer, humidity, air quality | Neighbors and adjacency | Employers, schools, hospitals, shopping centers, HOA areas, historic districts | SCE and SoCalGas service confirmation for Carson from a City source | Median home value and rent (contain dollar amounts) | Competitor SERP table: never on the page.
    // Copy approval: the client approved the Carson page copy on 2026-10-19 (per the user).
    // TODO(verify): Census QuickFacts for Carson was read through a fetch summary of the table (V2025 vintage): 90,808 residents on July 1, 2025; 26,974 households, 74.0 percent owner-occupied and 2020 to 2024; 18.73 square miles of land and 2020 density 5,101.6; 2022 Economic Census receipts of 3,354,196 thousand (transportation and warehousing) and 2,841,373 thousand (retail). The pasted research gave older figures (91,358 on July 1, 2024; 26,406 households; 2019 to 2023), so the live page vintage is used.
    // TODO(verify): City Building & Safety page (carsonca.gov, building_safety) and Building Permits page (ci.carson.ca.us, an older City domain) were read through fetch summaries and show no date. They give Civic Access (available since June 4, 2024), inspections through the portal, Monday to Thursday 7 a.m. to 6 p.m., 701 E. Carson Street, building@carsonca.gov, City Hall (310) 830-7600 and an automated line (310) 952-1700. The old-domain phone directory lists (310) 952-1786 for Building and Safety (footer 2006 to 2023), which conflicts, so no department phone number is on the page. Neither page mentions mechanical or HVAC.
    // TODO(verify): City zoning page (carsonca.gov, zoning_code) read through a fetch summary, no date. Phase 1 adopted 2024-03-19; Phase 2 listed as in progress with public hearings planned for Q3 2026, which is now past, so the status may be stale.
    // TODO(verify): Clean Power Alliance residential-rate page lists Carson under communities that joined in 2019 to 2020 (fetch summary). A City press release (carsonca.gov, press_release_24055) says Carson joined Clean Power Alliance but shows no date and does not say residents are served, and CPA's Carson fact sheets describe Community Solar only. No default product is stated. The page states only the CPA site's own listing.
    // TODO(verify): SoCalGas rebates page and SCE Energy Savings Assistance page were read through fetch summaries (no dates). Amounts, the licensed-contractor and permit-closure conditions and the SCE approved-contractor delivery note are kept off the page.
    // Pre-launch recheck: City Building & Safety and Building Permits pages, Civic Access portal, zoning page, official Municipal Code location (noise and equipment placement), Clean Power Alliance member list, SoCalGas furnace rebate and 2026 application, SCE Energy Savings Assistance, QuickFacts.
    localParagraphs: [
      "The City's Building & Safety Division says permit and plan check applications go through **Carson Civic Access, the City's online portal**, and that inspections are scheduled through the same portal and are available Monday to Thursday. A City Building Permits page says the portal has been available since June 4, 2024, that inspections for permits issued through it are scheduled from the permit dashboard, and that older permits use a separate inspection page. Permit issuance runs 7 a.m. to 6 p.m., Monday to Thursday, at 701 E. Carson Street, and permit questions go to building@carsonca.gov. The City pages we read do not mention mechanical or HVAC permits, and we did not find a City statement on whether replacing an air conditioner or furnace needs a permit, so **AIRPRO SOLUTIONS confirms the permit path and inspection steps with the City** before work starts. We do not state permit fees, code editions, equipment placement rules, or noise limits, because we did not confirm them from the official code. The City pages we read show no date.",
      "For commercial space, QuickFacts lists **3.35 billion dollars in transportation and warehousing receipts and 2.84 billion dollars in retail sales for Carson in 2022**, from the Economic Census. The City's zoning page describes a Zoning Ordinance and Zoning Map update in two phases: Phase 1, for residential and mixed-use regulations, was adopted on March 19, 2024, and Phase 2, for commercial, industrial, flex, and other sections, is shown as in progress on a page that has no date. For warehouse, retail, and office buildings, we plan rooftop access and equipment placement with the building owner or manager and **confirm current zoning and the permit path with the City** before choosing where equipment goes.",
      "Carson had an estimated 90,808 residents on July 1, 2025, and QuickFacts reports 26,974 households and a **74.0% owner-occupied housing unit rate** for 2020 to 2024, across 18.73 square miles of land area. Ownership is a different measure from building type or age, so we do not guess how old the homes or ducts are in your part of the city, and **we confirm the equipment, roof or attic access, and ductwork at each property**. In a multi-unit building, we confirm equipment access and placement with the owner or manager before installation or replacement.",
      "Clean Power Alliance's own site lists Carson among its member communities that joined in 2019 to 2020, and says customers are enrolled in their community's preferred energy option, so **your bill shows who supplies your electricity**. SoCalGas lists a 2026 rebate for ENERGY STAR furnaces in existing residential properties, with funding first come, first served until December 31, 2026 or until it runs out. SCE's Energy Savings Assistance program lists air conditioners and heat pumps among its cooling options for income-qualified households and says availability varies by area and restrictions may apply. We do not quote amounts, and terms change, so check each program before you buy. Official links are in the card for this section.",
    ],
    localCards: [
      {
        heading: "Carson permit and inspection path",
        rows: [
          { label: "Applications", value: "Online through Carson Civic Access" },
          { label: "Inspections", value: "Scheduled through the portal, Monday to Thursday" },
          { label: "Permit hours", value: "7 a.m. to 6 p.m., Monday to Thursday" },
          { label: "Permit questions", value: "building@carsonca.gov" },
        ],
        note: "From the City's Building & Safety and Building Permits pages (neither shows a date). We confirm current requirements with the City.",
      },
      {
        heading: "Carson Census snapshot",
        rows: [
          { label: "Residents, July 1, 2025", value: "90,808 (estimate)" },
          { label: "Households, 2020 to 2024", value: "26,974" },
          { label: "Land area", value: "18.73 square miles" },
        ],
        note: "From U.S. Census Bureau QuickFacts. Households are 2020 to 2024 estimates and land area is from 2020. All figures are citywide.",
      },
    ],
    neighborhoodsHeading: "Official Carson resources",
    officialResources: [
      {
        text: "Building & Safety",
        href: "https://carsonca.gov/services/community___economic_development/building_safety",
        note: "Civic Access portal, hours, and permit contact.",
      },
      {
        text: "Zoning Code update",
        href: "https://carsonca.gov/services/community___economic_development/zoning_code",
        note: "Two-phase zoning update and the Carson 2040 General Plan.",
      },
      {
        text: "Clean Power Alliance",
        href: "https://cleanpoweralliance.org/residential-rate/",
        note: "Member communities and energy options.",
      },
      {
        text: "SoCalGas rebates",
        href: "https://www.socalgas.com/savings/rebates-and-incentives",
        note: "ENERGY STAR furnace rebate and program period.",
      },
      {
        text: "SCE Energy Savings Assistance",
        href: "https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program",
        note: "Income-qualified upgrades and eligibility.",
      },
      {
        text: "Census QuickFacts",
        href: "https://www.census.gov/quickfacts/fact/table/carsoncitycalifornia/PST045224",
        note: "Population, households, owner-occupied rate, and receipts cited on this page.",
      },
    ],
    servicesTitle: "Everything we handle for Carson homes and businesses",
    serviceCards: [
      {
        slug: "ac-repair",
        name: "AC Repair",
        body: "Diagnosis and repair for cooling failures, weak airflow, and unusual noises in Carson homes and businesses.",
      },
      {
        slug: "ac-installation",
        name: "AC Installation & Replacement",
        body: "New system sizing and installation, planned around the City's online permit process.",
      },
      {
        slug: "ac-maintenance",
        name: "AC Maintenance",
        body: "Seasonal AC tune-ups that catch small issues early, for homes and for commercial rooftop and ground units.",
      },
      {
        slug: "heating-repair",
        name: "Heating Repair",
        body: "Furnace and heating system diagnosis and repair for Carson homes and businesses.",
      },
      {
        slug: "furnace-installation",
        name: "Furnace Installation & Replacement",
        body: "Furnace sizing and installation, planned around the City's permit process. SoCalGas lists a furnace rebate with its own terms.",
      },
      {
        slug: "heat-pump-services",
        name: "Heat Pump Services",
        body: "Heat pump installation, repair, and maintenance, with the City's permit process and your utilities' program pages in mind.",
      },
      {
        slug: "ductless-mini-split",
        name: "Ductless Mini-Split",
        body: "Ductless systems for additions, converted spaces, and rooms the existing ducts do not reach.",
      },
      {
        slug: "ductwork",
        name: "Ductwork Services",
        body: "Duct repair, sealing, and replacement for Carson homes and buildings.",
      },
      {
        slug: "indoor-air-quality",
        name: "Indoor Air Quality",
        body: "Filtration, ventilation, and air-quality upgrades for Carson homes and offices.",
      },
      {
        slug: "emergency-hvac",
        name: "Emergency HVAC",
        body: "24/7 emergency dispatch for no-cool and no-heat problems. If you smell gas, leave the building and call 911 or your gas utility.",
      },
    ],
    resources: {
      eyebrow: "Know before you start",
      title: "Carson permits and incentive programs",
      intro: "Official sources for three items worth checking before a Carson HVAC project.",
      cards: [
        {
          amount: "Permits and inspections",
          description: "The City's Building & Safety Division says permit and plan check applications and inspections go through the Carson Civic Access portal. The City pages we read do not mention HVAC, so we confirm the steps for your job with the City.",
          linkLabel: "City Building & Safety page",
          linkHref: "https://carsonca.gov/services/community___economic_development/building_safety",
        },
        {
          amount: "Furnace rebate",
          description: "SoCalGas lists a 2026 rebate for ENERGY STAR furnaces in existing residential properties, with funding first come, first served until December 31, 2026 or until it runs out. Check that your gas account is with SoCalGas, and we do not quote amounts.",
          linkLabel: "SoCalGas rebates",
          linkHref: "https://www.socalgas.com/savings/rebates-and-incentives",
        },
        {
          amount: "Income-qualified help",
          description: "SCE's Energy Savings Assistance program lists air conditioners and heat pumps among its cooling options for income-qualified households. It says availability varies by area and restrictions may apply, so check eligibility with SCE.",
          linkLabel: "SCE Energy Savings Assistance",
          linkHref: "https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program",
        },
      ],
    },
    nearby: ["torrance", "gardena", "hawthorne", "redondo-beach"],
    proof: {
      heading: "Licensed, reviewed, and ready across Carson",
      body: "AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.",
      stats: [
        { num: "4.8★", label: "Google rating" },
        { num: "40", label: "Google reviews" },
        { num: "C-20", label: "California license class" },
        { num: "24/7", label: "Emergency dispatch" },
      ],
    },
    finalCtaBody: "Call or request service online to schedule a visit anywhere in Carson. Same-day service is typical, subject to capacity.",
    faqs: [
      {
        q: "Does AIRPRO SOLUTIONS service all of Carson?",
        a: "Yes. AIRPRO SOLUTIONS serves homes and businesses across Carson as part of our South Bay coverage. The City's Building & Safety Division handles permits and inspections, so we plan each visit around your specific address.",
        boldLead: "Yes.",
        links: [
          { text: "South Bay coverage", href: "/service-areas/south-bay/" },
        ],
      },
      {
        q: "How fast can a technician reach my Carson home?",
        a: "Same-day service is typical in Carson, subject to capacity. Call (323) 776-9047 to confirm a window for your address.",
        boldLead: "Same-day service is typical in Carson, subject to capacity.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Do I need a permit to replace an air conditioner in Carson?",
        a: "We did not find a City statement either way. The City's Building & Safety page covers applications and inspections through the Carson Civic Access portal but does not mention mechanical or HVAC work, so AIRPRO SOLUTIONS confirms the permit path with the City before work starts, and we do not quote permit fees.",
        boldLead: "We did not find a City statement either way.",
        links: [
          { text: "Building & Safety page", href: "https://carsonca.gov/services/community___economic_development/building_safety" },
        ],
      },
      {
        q: "How do permits and inspections work in Carson?",
        a: "Applications and inspections go through the Carson Civic Access portal. The City's Building Permits page says the portal has been available since June 4, 2024, that inspections for permits issued through it are scheduled from the permit dashboard, and that older permits use a separate inspection page. Permit issuance runs 7 a.m. to 6 p.m., Monday to Thursday, and permit questions go to building@carsonca.gov. The City pages do not mention HVAC, so AIRPRO SOLUTIONS confirms the steps for your job with the City.",
        boldLead: "Applications and inspections go through the Carson Civic Access portal.",
        links: [
          { text: "Building Permits page", href: "https://ci.carson.ca.us/CommunityDevelopment/BuildingPermits.aspx" },
        ],
      },
      {
        q: "Where can an outdoor AC unit go on my Carson property?",
        a: "We confirm that with the City. We did not confirm the City's equipment placement, setback, or noise rules from the official code, so we do not state limits here, and AIRPRO SOLUTIONS checks the current rules and your property's layout with the City before choosing a location.",
        boldLead: "We confirm that with the City.",
      },
      {
        q: "Does the age of my Carson home matter for HVAC?",
        a: "Age is one factor we check. We did not find a verified citywide figure for the age of Carson homes, so AIRPRO SOLUTIONS confirms the equipment, roof or attic access, and ductwork at your property instead of assuming.",
        boldLead: "Age is one factor we check.",
      },
      {
        q: "Is the Carson zoning code changing?",
        a: "The City describes a two-phase update to its Zoning Ordinance and Zoning Map. Phase 1, for residential and mixed-use regulations, was adopted on March 19, 2024, and Phase 2, for commercial, industrial, flex, and other sections, is shown as in progress on a page that has no date. The City's zoning page has the details, and we confirm current zoning with the City before choosing where equipment goes.",
        boldLead: "The City describes a two-phase update to its Zoning Ordinance and Zoning Map.",
        links: [
          { text: "zoning page", href: "https://carsonca.gov/services/community___economic_development/zoning_code" },
        ],
      },
      {
        q: "Does AIRPRO SOLUTIONS handle commercial HVAC in Carson?",
        a: "Yes. AIRPRO SOLUTIONS services commercial properties in Carson, including rooftop units. We confirm the permit path with the City before commercial work starts, and we plan rooftop access and equipment placement with the building owner or manager. See our Commercial HVAC page for the full scope.",
        boldLead: "Yes.",
        links: [
          { text: "Commercial HVAC page", href: "/commercial-hvac/" },
        ],
      },
      {
        q: "Which utility serves my Carson address?",
        a: "Your bill answers it. Clean Power Alliance's own site lists Carson among its member communities and says customers are enrolled in their community's preferred energy option, so check your bill to see who supplies your electricity. We did not find a City page that lists Carson's electric and gas providers.",
        boldLead: "Your bill answers it.",
        links: [
          { text: "Clean Power Alliance's own site", href: "https://cleanpoweralliance.org/residential-rate/" },
        ],
      },
      {
        q: "Are there HVAC rebates for Carson customers?",
        a: "SoCalGas and SCE list programs. SoCalGas lists a rebate for ENERGY STAR furnaces in existing residential properties, with funding first come, first served until December 31, 2026 or until it runs out. SCE lists an income-qualified program that includes cooling equipment. Terms and funding change and we do not quote amounts, so check the current terms before you buy.",
        boldLead: "SoCalGas and SCE list programs.",
        links: [
          { text: "rebate for ENERGY STAR furnaces", href: "https://www.socalgas.com/savings/rebates-and-incentives" },
          { text: "income-qualified program", href: "https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program" },
        ],
      },
      {
        q: "Is there HVAC help for income-qualified Carson households?",
        a: "Possibly, for income-qualified households. SCE's Energy Savings Assistance program lists air conditioners and heat pumps among its cooling options, and says availability varies by area and restrictions may apply. Eligibility depends on household income and the property, so check with SCE before counting on it.",
        boldLead: "Possibly, for income-qualified households.",
        links: [
          { text: "Energy Savings Assistance program", href: "https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program" },
        ],
      },
      {
        q: "What HVAC services are available in Carson?",
        a: "AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout Carson, for both residential and commercial properties.",
        boldLead: "AIRPRO SOLUTIONS provides",
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
        q: "Is emergency HVAC service available in Carson?",
        a: "Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in Carson. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.",
        boldLead: "Yes.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "How much does HVAC service cost in Carson?",
        a: "Cost depends on the problem, the equipment, and how accessible the system is. We do not publish one flat price, so call (323) 776-9047 or request service and we will quote your specific system.",
        boldLead: "Cost depends on the problem, the equipment, and how accessible the system is.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
    ],
  },
};

const santaAnaOverrides: Partial<City> = {
  // Copy approval: the client approved the Santa Ana page copy on 2026-10-19 (per the user).
  // TODO(data): add verified climate, neighborhood and housing-stock detail before treating this as a full local page.
  neighborhoods: [], // neighborhood list held out: no City, county or Census source read lists named neighborhoods
  zips: [], // ZIP list held out: no official City or USPS list of Santa Ana ZIPs was read (see held out comment below)
  page: {
    metaDescription: "HVAC for Santa Ana homes and businesses, from AC repair to installation. Know the City's online permit portal and mechanical permits. Licensed, 4.8-star rated.",
    lede: "AIRPRO SOLUTIONS provides HVAC services across Santa Ana, with AC repair, heating repair, installation, and maintenance for homes and businesses, and with the City's online permit portal in mind.",
    heroCaption: { title: "Santa Ana, CA", text: "Local service across Santa Ana" },
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
      lead: "AIRPRO SOLUTIONS is a licensed HVAC contractor serving Santa Ana",
      body: ", providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, subject to capacity, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.",
    },
    glance: {
      title: "Santa Ana at a glance",
      stats: [
        {
          num: "315,586",
          label: "residents in the Census Bureau's July 1, 2025 estimate (U.S. Census Bureau QuickFacts)",
        },
        {
          num: "44.6%",
          label: "owner-occupied housing unit rate among 81,069 households, 2020 to 2024 (U.S. Census Bureau QuickFacts)",
        },
        { num: "27.34", label: "square miles of land area, 2020 (U.S. Census Bureau QuickFacts)" },
      ],
      source: "Source: U.S. Census Bureau QuickFacts for Santa Ana city, California.",
    },
    localTitle: "Santa Ana's online permit portal, General Plan, and utility programs",
    // Held out (no verified source): Held out (no verified source): ZIP card and neighborhoods (the research ZIP lists came from ciclt.net, a third-party site, an Orange County Office on Aging care-facility directory and an Orange County Social Services Agency office table, none of which is a City, USPS, SCAG or Census ZIP list; the City neighborhoods and ZIP overlay map is a PDF whose text was not readable; the lists also disagree with each other and with the hub card) | Housing stock by type and age, median year built (Census B25034 and B25035 for Santa Ana city, geography 160XX00US0669000, returned no data rows on data.census.gov and the Census API needs a key; the Orange County hub says 55 percent of homes were built before 1970 with no source record; the 1974 median belongs to the Anaheim-Santa Ana metro division in a 2011 survey, not the city) | Climate, NOAA normals, marine layer, urban heat island, humidity and hot-day counts (the NOAA station Santa Ana John Wayne Airport, WBAN:93184, was confirmed but no normals were read) | Any "inland" or "not coastal" label | Municipal Code noise limits, setbacks, historic districts and HOA areas (no official code text was supplied) | Same-day express mechanical permit path, the commercial heating and air conditioning permit information form, and the City permits page (the pages errored and were not read, so the pasted claims are unverified) | Permit Counter phone (714) 647-5800 and counter hours (two City pages list the number, but both predate the 2026 move to the portal) | The claim that the General Plan took effect May 26, 2022 (the City post errored and was not read) | Economic Development and GIS pages, employers, hospitals, schools and shopping centers | Neighbors and adjacency (third-party map only) | SCE time-of-use rates | Rebate amounts, SCE Energy Savings Assistance, Home Performance Plus, the SCE $75 smart thermostat credit, Comfortably California, federal 25C and 25D, HEEHRA, the SoCalGas wildfire bonus and contractor or installer conditions | Median gross rent (dollar amount) | Water and trash providers the City lists | Orange County Power Authority and any other community choice aggregator (none is stated for Santa Ana) | Competitor SERP table: never on the page (every row was NOT FOUND).
    // Copy approval: the client approved the Santa Ana page copy on 2026-10-19 (per the user).
    // TODO(verify): Census QuickFacts for Santa Ana city was read through a fetch summary (V2025 vintage): 315,586 residents on July 1, 2025 (estimates base 310,534 on April 1, 2020; 2020 Census count 310,227); 81,069 households and a 44.6 percent owner-occupied housing unit rate for 2020 to 2024; 27.34 square miles of land area in 2020 (27.27 in 2010); median gross rent shown but not used (dollar amount); housing units shown as X (not available). The summary does not state the county, so "Orange County seat" rests on the General Plan page below. The 44.6 percent rate covers occupied units, so "more than half of occupied homes are not owner-occupied" is arithmetic, not a QuickFacts line.
    // TODO(verify): City notice "City of Santa Ana plan reviews and permits moving online" (santa-ana.gov, posted June 12, 2026 per page metadata) was read through a fetch summary: Accela Citizen Access portal; electronic submittal required from July 1, 2026; June 26, 2026 last day for paper plans; mechanical, electrical and plumbing permits, building permits, water heater installation permits, Planning and Zoning and Public Works applications listed; fees and inspection scheduling covered; counters closed June 29 and 30, 2026; the notice names santa-ana.gov/permits, which errored and was not read.
    // TODO(verify): City Permits & Inspections FAQs (santa-ana.gov/permit-faqs/, last modified January 10, 2025 per page metadata) and the permit cost page (last modified November 12, 2024) were read through fetch summaries: mechanical is one of four permit types; fees are itemized on the forms and no dollar amounts are shown; the counter number appears on both pages and is kept off the page because both predate the portal. The FAQs summary says a general rule requires a permit to replace a code-regulated mechanical system and lists no HVAC exemption, but AC and furnace replacement are not named. The full page was not read, so the page makes no permit-required statement. Re-read the full FAQs before changing that.
    // TODO(verify): General Plan Land Use Element is on general-plan-santa-ana-ca.proudcity.com, a ProudCity host, not santa-ana.gov. The user should confirm it is the City official General Plan host. The page shows no date; the research gave 2023-12-05, which was not confirmed. Read through a fetch summary: county seat of Orange County, Downtown, District Centers, Urban Neighborhoods, five focus areas, Chapter 41 zoning code, buffers between polluting uses and sensitive receptors, and a planned zoning update for 2022 to 2027. The research line about directing density to "major travel corridors" was not confirmed.
    // TODO(verify): City utilities pages were read on santa-ana.org (/question/utilities and /topics/utilities), not santa-ana.gov, and show no date: Southern California Edison (electric), Southern California Gas Company (gas), Santa Ana Water, Republic Services (trash), and no community choice aggregator. The user should confirm santa-ana.org is the City official host. The research pointed to a santa-ana.gov electricity page, which errored and was not read. The SCE rebate page and the SoCalGas rebate page name no city, so they do not confirm service in Santa Ana; the City page does. The Orange County Power Authority home page (last modified 2026-08-24) does not list Santa Ana, but it is not a member list.
    // TODO(verify): SoCalGas rebates page (page shows "Submitted 07/23/2024") and the 2026 Home Energy Efficiency Rebate application PDF were read through fetch summaries: ENERGY STAR central gas furnace tiers of $1.40 per kBtuh (92 to 94 percent AFUE), $10 (95 to 96) and $25 (97 or higher); funds first come, first served until December 31, 2026; postmark by December 31, 2026; one per household; wildfire ZIP list contains no 927xx ZIP; the form footer reads "J087-228EEC 0926" and is not labeled a revision. Amounts and conditions are NOT on the page. Whether kBtuh means input or output capacity is not stated; the administrator is 888-431-2226 or scgprocessing@socalgas.com.
    // TODO(verify): SCE marketplace page (no date) lists Golden State Rebates instant coupons for air conditioners and smart thermostats at participating retailers with no amounts, Home Performance Plus, a $75 smart thermostat bill credit and Comfortably California (SCE says no direct customer incentives); SCE Energy Savings Assistance page (no date; limits June 1, 2026 to May 31, 2027) lists central AC or central heat pump replacement with approved contractors and says availability varies by area. Only the Golden State Rebates line is on the page.
    // TODO(verify): The City page on South Coast AQMD (last modified 2022-11-29 per metadata) names the agency as the regional air quality regulator and links a map of permitted facilities in Santa Ana and nearby communities; it is NOT linked or used on the page (nothing in the copy cites it, and it names a City outreach contact that is not published). The aqmd.gov air quality page (no date) says the agency covers all of Orange County and major portions of three other counties; that is not on the page.
    // Pre-launch recheck: City permits notice and the santa-ana.gov permits page, Permits & Inspections FAQs (full read), express permit page, permit forms page, Permit Counter hours and number, General Plan host and date, City utilities page host, official Municipal Code location (noise and equipment placement), SoCalGas furnace rebate and 2026 application, SCE Golden State Rebates, Census QuickFacts and ACS B25034 and B25035 for Santa Ana city.
    localParagraphs: ["The City of Santa Ana said on June 12, 2026 that plan reviews and permits were moving online through the **Accela Citizen Access portal**, and that from July 1, 2026 all plans and applications must be submitted electronically. The notice lists mechanical, electrical, and plumbing permits among the permit types in the portal, along with building permits and water heater installation permits, and says the portal also covers paying fees and scheduling inspections. The City's Permits & Inspections FAQs list mechanical as one of four permit types and say mechanical permit fees are itemized on the application forms, but they do not name air conditioner or furnace replacement, so **AIRPRO SOLUTIONS confirms the permit path for your job with the City** before work starts. The FAQs show a last-modified date of January 10, 2025, which is before the move to the portal, so we also confirm current steps with the City. We do not state permit fees, code editions, equipment placement rules, or noise limits, because we did not confirm them from the official code.", "Santa Ana is the Orange County seat, and the City's General Plan Land Use Element directs high-density housing to Downtown, encourages residential mixed-use in its District Centers and Urban Neighborhoods, and identifies five focus areas. It names Chapter 41 as the zoning code, and it calls for buffers between polluting uses and sensitive uses such as homes, schools, and day-care centers. The page shows no date and we did not find an HVAC rule on it, so for multi-unit, mixed-use, office, retail, and industrial buildings we plan rooftop access and equipment placement with the building owner or manager and **confirm current zoning and the permit path with the City** before choosing where equipment goes.", "Santa Ana had an estimated 315,586 residents on July 1, 2025, and QuickFacts reports 81,069 households and a **44.6% owner-occupied housing unit rate** for 2020 to 2024, across 27.34 square miles of land area. That means more than half of occupied homes are not owner-occupied, so when the person who calls is a tenant we work with the owner or property manager on access and approval. Ownership is a different measure from building type or age, so we do not guess how old the homes or ducts are in your part of the city, and **we confirm the equipment, roof or attic access, and ductwork at each property**.", "The City's utilities page for Santa Ana lists Southern California Edison for electricity and Southern California Gas Company for natural gas, shows no date, and names no community choice aggregator, so **your bill shows who supplies your electricity**. SoCalGas lists a 2026 rebate for ENERGY STAR certified furnaces, with funds first come, first served until December 31, 2026 or until they run out. SCE lists Golden State Rebates coupons for air conditioners and smart thermostats at participating retailers. We do not quote amounts, and terms change, so check each program before you buy. Official links are in the card for this section."],
    localCards: [
      {
        heading: "Santa Ana permit path",
        rows: [
          { label: "Portal", value: "Accela Citizen Access (online)" },
          { label: "Electronic submittal", value: "Required from July 1, 2026" },
          { label: "Mechanical permits", value: "Listed among the online permit types" },
          { label: "Inspections", value: "Scheduled through the portal" },
        ],
        note: "From the City's June 12, 2026 notice. The Permits & Inspections FAQs show a last-modified date of January 10, 2025. We confirm current requirements with the City.",
      },
      {
        heading: "Santa Ana Census snapshot",
        rows: [
          { label: "Households, 2020 to 2024", value: "81,069" },
          { label: "Owner-occupied housing unit rate, 2020 to 2024", value: "44.6%" },
        ],
        note: "From U.S. Census Bureau QuickFacts. Both figures are 2020 to 2024 estimates and citywide. Population and land area are in the at-a-glance box.",
      },
    ],
    neighborhoodsHeading: "Official Santa Ana resources",
    officialResources: [
      {
        text: "Permits and plan reviews notice",
        href: "https://santa-ana.gov/city-of-santa-ana-plan-reviews-and-permits-moving-online/",
        note: "Online portal, July 1, 2026 date, and permit types.",
      },
      {
        text: "Permits & Inspections FAQs",
        href: "https://santa-ana.gov/permit-faqs/",
        note: "Permit types and how the City describes fees.",
      },
      {
        text: "General Plan Land Use Element",
        href: "https://general-plan-santa-ana-ca.proudcity.com/land-use-element/",
        note: "Downtown, focus areas, zoning code, and buffers.",
      },
      {
        text: "City utilities page",
        href: "https://santa-ana.org/question/utilities",
        note: "Electric, gas, and water providers the City lists.",
      },
      {
        text: "SoCalGas rebates",
        href: "https://www.socalgas.com/savings/rebates-and-incentives",
        note: "ENERGY STAR furnace rebate and program period.",
      },
      {
        text: "SCE Golden State Rebates",
        href: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace",
        note: "Air conditioner and smart thermostat coupons.",
      },
      {
        text: "Census QuickFacts",
        href: "https://www.census.gov/quickfacts/fact/table/santaanacitycalifornia/HSD410224",
        note: "Population, households, owner-occupied rate, and land area cited on this page.",
      },
    ],
    servicesTitle: "Everything we handle for Santa Ana homes and businesses",
    serviceCards: [
      {
        slug: "ac-repair",
        name: "AC Repair",
        body: "Diagnosis and repair for cooling failures, weak airflow, and unusual noises in Santa Ana homes and businesses.",
      },
      {
        slug: "ac-installation",
        name: "AC Installation & Replacement",
        body: "New system sizing and installation for Santa Ana properties, planned around the City's online permit process.",
      },
      {
        slug: "ac-maintenance",
        name: "AC Maintenance",
        body: "Seasonal AC tune-ups that catch small issues early, for Santa Ana homes and for commercial rooftop and ground units.",
      },
      {
        slug: "heating-repair",
        name: "Heating Repair",
        body: "Furnace and heating system diagnosis and repair for Santa Ana homes and businesses.",
      },
      {
        slug: "furnace-installation",
        name: "Furnace Installation & Replacement",
        body: "Furnace sizing and installation, planned around the City's permit process. SoCalGas lists a furnace rebate with its own terms.",
      },
      {
        slug: "heat-pump-services",
        name: "Heat Pump Services",
        body: "Heat pump installation, repair, and maintenance, with the City's permit process and your utilities' program pages in mind.",
      },
      {
        slug: "ductless-mini-split",
        name: "Ductless Mini-Split",
        body: "Ductless systems for Santa Ana additions, converted spaces, and rooms the existing ducts do not reach.",
      },
      {
        slug: "ductwork",
        name: "Ductwork Services",
        body: "Duct repair, sealing, and replacement for Santa Ana homes and buildings.",
      },
      {
        slug: "indoor-air-quality",
        name: "Indoor Air Quality",
        body: "Filtration, ventilation, and air-quality upgrades for Santa Ana homes and offices.",
      },
      {
        slug: "emergency-hvac",
        name: "Emergency HVAC",
        body: "24/7 emergency dispatch for no-cool and no-heat problems in Santa Ana. If you smell gas, leave the building and call 911 or your gas utility.",
      },
    ],
    resources: {
      eyebrow: "Know before you start",
      title: "Santa Ana permits and incentive programs",
      intro: "Official sources for three items worth checking before a Santa Ana HVAC project.",
      cards: [
        {
          amount: "Permits and inspections",
          description: "The City said plan reviews and permits moved online through the Accela Citizen Access portal, with electronic submittal required from July 1, 2026, and lists mechanical permits among them. The City pages we read do not name AC or furnace replacement, so we confirm the steps for your job with the City.",
          linkLabel: "City permits notice",
          linkHref: "https://santa-ana.gov/city-of-santa-ana-plan-reviews-and-permits-moving-online/",
        },
        {
          amount: "Furnace rebate",
          description: "SoCalGas lists a 2026 rebate for ENERGY STAR certified furnaces, with funds first come, first served until December 31, 2026 or until they run out. Check that your gas account is with SoCalGas, and we do not quote amounts.",
          linkLabel: "SoCalGas rebates",
          linkHref: "https://www.socalgas.com/savings/rebates-and-incentives",
        },
        {
          amount: "AC and thermostat coupons",
          description: "SCE lists Golden State Rebates instant coupons for air conditioners and smart thermostats at participating retailers, in store or online. The SCE page lists no amounts, so confirm current terms before you buy.",
          linkLabel: "SCE Golden State Rebates",
          linkHref: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace",
        },
      ],
    },
    nearby: ["anaheim", "costa-mesa", "irvine", "huntington-beach"],
    proof: {
      heading: "Licensed, reviewed, and ready across Santa Ana",
      body: "AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.",
      stats: [
        { num: "4.8★", label: "Google rating" },
        { num: "40", label: "Google reviews" },
        { num: "C-20", label: "California license class" },
        { num: "24/7", label: "Emergency dispatch" },
      ],
    },
    finalCtaBody: "Call or request service online to schedule a visit anywhere in Santa Ana. Same-day service is typical, subject to capacity.",
    faqs: [
      {
        q: "Does AIRPRO SOLUTIONS service all of Santa Ana?",
        a: "Yes. AIRPRO SOLUTIONS serves homes and businesses across Santa Ana as part of our Orange County coverage. The City runs its own permit process through an online portal, so we plan each visit around your specific address.",
        boldLead: "Yes.",
        links: [
          { text: "Orange County coverage", href: "/service-areas/orange-county/" },
        ],
      },
      {
        q: "How fast can a technician reach my Santa Ana home?",
        a: "Same-day service is typical in Santa Ana, subject to capacity. Call (323) 776-9047 to confirm a window for your address.",
        boldLead: "Same-day service is typical in Santa Ana, subject to capacity.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "Do I need a permit to replace an air conditioner in Santa Ana?",
        a: "We confirm the permit path with the City. The City's Permits & Inspections FAQs list mechanical as one of four permit types but do not name air conditioner or furnace replacement, so AIRPRO SOLUTIONS checks what your job needs before work starts, and we do not quote permit fees.",
        boldLead: "We confirm the permit path with the City.",
        links: [
          { text: "Permits & Inspections FAQs", href: "https://santa-ana.gov/permit-faqs/" },
        ],
      },
      {
        q: "How do permits work in Santa Ana?",
        a: "Permits go through the City's online portal. The City said on June 12, 2026 that plan reviews and permits were moving online through the Accela Citizen Access portal, that all plans and applications must be submitted electronically from July 1, 2026, and that mechanical, electrical, and plumbing permits are among the types available there. AIRPRO SOLUTIONS confirms the steps for your job with the City.",
        boldLead: "Permits go through the City's online portal.",
        links: [
          {
            text: "plan reviews and permits were moving online",
            href: "https://santa-ana.gov/city-of-santa-ana-plan-reviews-and-permits-moving-online/",
          },
        ],
      },
      {
        q: "Where can an outdoor AC unit go on my Santa Ana property?",
        a: "We confirm that with the City. We did not confirm the City's equipment placement, setback, or noise rules from the official code, so we do not state limits here, and AIRPRO SOLUTIONS checks the current rules and your property's layout with the City before choosing a location.",
        boldLead: "We confirm that with the City.",
      },
      {
        q: "Does the age of my Santa Ana home matter for HVAC?",
        a: "Age is one factor we check. We did not find a verified citywide figure for the age of Santa Ana homes, so AIRPRO SOLUTIONS confirms the equipment, roof or attic access, and ductwork at your property instead of assuming.",
        boldLead: "Age is one factor we check.",
      },
      {
        q: "Do you work on rental properties in Santa Ana?",
        a: "Yes. QuickFacts reports a 44.6% owner-occupied housing unit rate for Santa Ana, so more than half of occupied homes are not owner-occupied. AIRPRO SOLUTIONS works with owners and property managers on access and approval before installation or replacement.",
        boldLead: "Yes.",
        links: [
          { text: "QuickFacts", href: "https://www.census.gov/quickfacts/fact/table/santaanacitycalifornia/HSD410224" },
        ],
      },
      {
        q: "Does AIRPRO SOLUTIONS handle commercial HVAC in Santa Ana?",
        a: "Yes. AIRPRO SOLUTIONS services commercial properties in Santa Ana, including rooftop units. We confirm the permit path with the City before commercial work starts, and we plan rooftop access and equipment placement with the building owner or manager. See our Commercial HVAC page for the full scope.",
        boldLead: "Yes.",
        links: [
          { text: "Commercial HVAC page", href: "/commercial-hvac/" },
        ],
      },
      {
        q: "Do zoning rules affect equipment on a Santa Ana commercial building?",
        a: "We confirm zoning with the City. The City's General Plan Land Use Element names Chapter 41 as the zoning code and calls for buffers between polluting uses and sensitive uses such as homes, schools, and day-care centers. The page shows no date and we did not find an HVAC rule on it, so AIRPRO SOLUTIONS confirms current zoning and the permit path with the City before choosing where equipment goes.",
        boldLead: "We confirm zoning with the City.",
        links: [
          {
            text: "General Plan Land Use Element",
            href: "https://general-plan-santa-ana-ca.proudcity.com/land-use-element/",
          },
        ],
      },
      {
        q: "Which utility serves my Santa Ana address?",
        a: "Your bill answers it. The City's utilities page lists Southern California Edison for electricity and Southern California Gas Company for natural gas, shows no date, and names no community choice aggregator, so check your bill to see who supplies your electricity and gas.",
        boldLead: "Your bill answers it.",
        links: [
          { text: "utilities page", href: "https://santa-ana.org/question/utilities" },
        ],
      },
      {
        q: "Are there HVAC rebates for Santa Ana customers?",
        a: "SoCalGas and SCE list programs. SoCalGas lists a rebate for ENERGY STAR certified furnaces, with funds first come, first served until December 31, 2026 or until they run out. SCE lists Golden State Rebates coupons for air conditioners and smart thermostats at participating retailers. Terms and funding change and we do not quote amounts, so check the current terms before you buy.",
        boldLead: "SoCalGas and SCE list programs.",
        links: [
          {
            text: "rebate for ENERGY STAR certified furnaces",
            href: "https://www.socalgas.com/savings/rebates-and-incentives",
          },
          {
            text: "Golden State Rebates coupons",
            href: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace",
          },
        ],
      },
      {
        q: "What HVAC services are available in Santa Ana?",
        a: "AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout Santa Ana, for both residential and commercial properties.",
        boldLead: "AIRPRO SOLUTIONS provides",
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
        q: "Is emergency HVAC service available in Santa Ana?",
        a: "Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in Santa Ana. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.",
        boldLead: "Yes.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
      {
        q: "How much does HVAC service cost in Santa Ana?",
        a: "Cost depends on the problem, the equipment, and how accessible the system is. We do not publish one flat price, so call (323) 776-9047 or request service and we will quote your specific system.",
        boldLead: "Cost depends on the problem, the equipment, and how accessible the system is.",
        links: [
          { text: "(323) 776-9047", href: "tel:+13237769047" },
        ],
      },
    ],
  },
};

const newportBeachOverrides: Partial<City> = {
  // Copy approval: the client approved the Newport Beach page copy on 2026-10-19 (per the user).
  // TODO(data): add verified climate, housing-age and utility detail before treating this as a full local page.
  neighborhoods: [], // list held out: the City About the Community villages are named in the copy; no City list of named neighborhoods was read (the Community Associations map shows association labels, not neighborhoods)
  zips: [], // flat ZIP line not used: the five ZIPs on the City ZIP map are in a localCards entry with the map date and caveat
  page: {
    metaDescription: "HVAC for Newport Beach homes and businesses, from AC repair to installation. Know the City's Residential Express Permits for furnaces. Licensed, 4.8-star rated.",
    lede: "AIRPRO SOLUTIONS provides HVAC services across Newport Beach, with AC repair, heating repair, installation, and maintenance for homes and businesses, and with the City's online permitting in mind.",
    heroCaption: {
      title: "Newport Beach, CA",
      text: "Local service across Newport Beach",
    },
    heroProof: [
      {
        icon: "shield",
        label: "Licensed, bonded & insured",
      },
      {
        icon: "star",
        label: "4.8-star rated",
      },
      {
        icon: "bolt",
        label: "24/7 emergency dispatch",
      },
      {
        icon: "building",
        label: "Residential and commercial",
      },
    ],
    trustStats: [
      {
        num: "4.8★",
        label: "Google rating, 40 reviews",
      },
      {
        num: "C-20",
        label: "California licensed",
      },
      {
        num: "24/7",
        label: "emergency dispatch",
      },
      {
        num: "Same-day",
        label: "service typical",
      },
    ],
    answer: {
      lead: "AIRPRO SOLUTIONS is a licensed HVAC contractor serving Newport Beach",
      body: ", providing AC repair, heating repair, installation, and maintenance for homes and businesses across the city. Same-day service is typical, subject to capacity, and 24/7 emergency dispatch is available. Call or request service online to schedule a visit.",
    },
    glance: {
      title: "Newport Beach at a glance",
      stats: [
        {
          num: "81,977",
          label: "residents in the Census Bureau's July 1, 2025 estimate (U.S. Census Bureau QuickFacts)",
        },
        {
          num: "52.1%",
          label: "owner-occupied housing unit rate, 2020 to 2024 (U.S. Census Bureau QuickFacts)",
        },
        {
          num: "2.19",
          label: "persons per household, 2020 to 2024 (U.S. Census Bureau QuickFacts)",
        },
      ],
      source: "Source: U.S. Census Bureau QuickFacts for Newport Beach city, California.",
    },
    localTitle: "Newport Beach's villages, permit pages, and utility programs",
    // Held out (no verified source or not allowed on the page): the Coastal Development Permit statement (only source read was newportbeachadu.org, a site produced by Community Planning Collaborative and Delve, not newportbeachca.gov); the HVAC noise limits of 50 and 55 dBA with a timing device, and the 55/50 dBA residential exterior limits (read only through a fetch summary of eCode360 section 10.26.045 and 10.26.025, host not confirmed as the City official Municipal Code, and the research cited a 2015 nonoise.org copy); the City noise page links codepublishing.com, which now redirects to eCode360; neighborhood list beyond the City About the Community villages; the Community Associations map (labels, not HOA declarations); climate and coastal or hillside labels (the research labels were not on the City pages read); utility service by SCE and SoCalGas (the City Utilities Department page names neither, and the SCE and SoCalGas program pages name no city); the SCE Smart Energy Program, Summer Discount Plan and any $75 credit (enrollment programs, dollar amounts, authorized-service-provider question); the SoCalGas furnace tiers ($1.40, $10, $25 per kBtuh), the $75 wildfire-only thermostat rebate and the Energy Savings Assistance program; Home Performance Plus; federal 25C and 25D; HEEHRA; the City business license tax amounts ($355, $225, $4 fee, 2026-27 rates) and the $1,000 CSLB figure; whether AIRPRO SOLUTIONS holds a Newport Beach business license (client question, not claimed); Hoag and Fashion Island commercial listings; median home value of $2,000,000+ (dollar amount); housing units (QuickFacts shows X); NWS climate data (portal showed no stations); the City permit counter and plan submittal phone numbers (the pages predate or sit beside the online CiViC account requirement).
    // Copy approval: the client approved the Newport Beach page copy on 2026-10-19 (per the user).
    // TODO(verify): City Plans, Permits and Inspections page (newportbeachca.gov, no date, 2026 footer) was read through a fetch summary: permit also needed in many cases for repair or replacement of existing fixtures such as replacing a furnace; plumbing, electrical or mechanical permit may be needed for changes to a building existing system; plot plan and plans; inspections by phone or online services; the page does not mention air conditioning; the plan submittal and inspection phone numbers are kept off the page.
    // TODO(verify): City online permitting (iPermit) page (no date, 2026 footer) was read through a fetch summary: Residential Express Permits are listed, furnace replacement is named as an example of a simple single-scope project, express permits are not for projects that need multiple permits and plan review, and mechanical, HVAC or AC replacement are not listed as online permit types. The City CiViC flyer (document 76396, effective May 1, 2025) lists Gas Heaters or Furnace under Residential Express Permits, excludes multifamily of 3 or more units, and says a valid CiViC account is required for in-person and online permits; it was read through a fetch summary and is not on the page. The 7,000 square foot, mechanically ventilated basement or garage, standby generator exhaust and VRF plan check triggers on the Orange County hub were NOT found on it.
    // TODO(verify): City About the Community page (no date, 2026 footer) was read through a fetch summary: Balboa Peninsula three-mile stretch bordered by Newport Harbor and the Pacific Ocean; Lido Marina Village; Lido Isle; Mariner's Mile; Balboa Island comprised of three islands; Corona del Mar; Newport Center and Fashion Island (high- and mid-rise office and residential buildings, hotels); Newport Coast (newer homes, upscale hotels and Pelican Hill Golf Course line the hillsides; annexed 2002); the page is inconsistent on island count (seven in one entry, eight in another) so no count is used.
    // TODO(verify): City ZIP code map (nbgis.newportbeachca.gov zipcodes_11X17.pdf, City GIS Division, dated 05/19/2026) was read through a fetch summary: 92657, 92660, 92661, 92662, 92663 plus 92625, 92627 and 92707 areas, one labeled Costa Mesa and one labeled SAH West. Only the five Newport Beach ZIPs are on the page. The map does not state adjacency, so none is claimed. The Community Associations map (dated 05/19/2026) and the Map Catalog were read through summaries and are not used on the page.
    // TODO(verify): Census QuickFacts for Newport Beach city (V2025) was read through a fetch summary: 81,977 residents on July 1, 2025; housing units shown as X; 52.1 percent owner-occupied housing unit rate, $2,000,000+ median owner-occupied value and 2.19 persons per household for 2020 to 2024. The research gave 53.1 percent for 2019 to 2023; the live 2020 to 2024 figure supersedes it.
    // TODO(verify): City Utilities Department page (dated news 10/10/2026) was read through a fetch summary: water, wastewater, storm drain and tidal valve system, street sweeping, streetlights and oil and gas operations; it names no electric or gas residential provider, no SCE, no SoCalGas and no community choice aggregator. SoCalGas 2026 Home Energy Efficiency Rebate application PDF (read through a fetch summary): furnace tiers $1.40, $10 and $25 per kBtuh, limit one per household, program period January 1 to December 31, 2026, proof of permit closure before payment, $75 smart thermostat in the wildfire-only section with no Newport Beach ZIPs, no mention of Newport Beach. SCE marketplace page (no date): Golden State Rebates coupons for air conditioners, smart thermostats and heat pump water heaters, Comfortably California gives no direct customer incentives, no city named. The SoCalGas rebates page URL on the page is the same one used for Santa Ana and was not re-read in this session.
    // TODO(verify): City business license page (2026-27 rates, valid through June 30, 2027) says businesses based outside Newport Beach conducting activity in the City, for example contractors, must also file; the FAQ says out-of-town businesses should carry a copy of the certificate and gives no date; CSLB finding-the-right-contractor page (no publication date) says a license number in an ad does not guarantee validity, ads must show the license number, and C-20 must carry workers compensation or a certification of self-insurance. All read through fetch summaries. The City Search for a Licensed Business description was not confirmed.
    // TODO(client): Ask the client whether AIRPRO SOLUTIONS holds a Newport Beach business license. The page does not claim it.
    // Pre-launch recheck: eCode360 host confirmation and the full text of sections 10.26.025 and 10.26.045 (noise and HVAC equipment), an official source for the electric and gas providers, Census ACS B25034 and B25035 for Newport Beach city, NWS climate station data, the SoCalGas rebates page, the City permit pages for AC replacement and the current CiViC account requirement, the City business license FAQ date, and whether the Santa Ana neighbor-style adjacency question applies (no adjacency is claimed in the nearby row).
    localParagraphs: [
      "The City's About the Community page describes Newport Beach by village and area, including **Balboa Peninsula, Balboa Island, Corona del Mar, Newport Center and Fashion Island, and Newport Coast**, along with Lido Marina Village and the islands of Newport Harbor. The City calls the Peninsula a three-mile stretch bordered by Newport Harbor on one side and the Pacific Ocean on the other, describes Newport Center as high- and mid-rise office and residential buildings, hotels, and Fashion Island, and describes Newport Coast as newer homes, upscale hotels, and the Pelican Hill Golf Course. The page gives no climate or housing-age labels for any of them, so we do not state any, and **AIRPRO SOLUTIONS confirms the building, equipment, and access at each property**.",
      "The City's Plans, Permits and Inspections page says a permit is in many cases also needed to repair or replace existing fixtures, and gives replacing a furnace as its example. It adds that a plumbing, electrical, or mechanical permit may be needed for changes to a building's existing system, and it does not mention air conditioning. The City's online permitting page names furnace replacement as an example of a simple project for Residential Express Permits, which are not for projects that need multiple permits and plan review. Neither page shows a date, so **AIRPRO SOLUTIONS confirms the permit path for your job with the City** before work starts. We do not state permit fees, code editions, equipment placement rules, or noise limits, because we did not confirm them from the official code.",
      "Newport Beach had an estimated 81,977 residents on July 1, 2025, and QuickFacts reports a **52.1% owner-occupied housing unit rate** and 2.19 persons per household for 2020 to 2024. That leaves 47.9% of occupied homes that are not owner-occupied, so when the person who calls is a tenant we work with the owner or property manager on access and approval. Ownership is a different measure from building type or age, so we do not guess how old the homes or ducts are in your part of the city, and **we confirm the equipment, roof or attic access, and ductwork at each property**.",
      "The City's Utilities Department page covers water and sewer service and names neither Southern California Edison nor Southern California Gas Company, and the SoCalGas and SCE program pages we read name no city, so **your bill shows who supplies your electricity and gas**. SoCalGas lists a 2026 rebate for ENERGY STAR certified furnaces, with funds first come, first served until December 31, 2026 or until they run out. SCE lists Golden State Rebates coupons for air conditioners and smart thermostats at participating retailers. We do not quote amounts, and terms change, so check each program before you buy. Official links are in the card for this section.",
    ],
    localCards: [
      {
        heading: "Newport Beach permit pages",
        rows: [
          {
            label: "Furnace replacement",
            value: "Named as a permit example by the City",
          },
          {
            label: "Residential Express Permits",
            value: "Furnace replacement named as a simple-project example",
          },
          {
            label: "Air conditioning",
            value: "Not named on the pages we read",
          },
          {
            label: "Page dates",
            value: "None shown",
          },
        ],
        note: "From the City's Plans, Permits and Inspections page and its online permitting page. We confirm current requirements with the City.",
      },
      {
        heading: "Newport Beach ZIP codes",
        rows: [
          {
            label: "ZIP codes on the City map",
            value: "92657, 92660, 92661, 92662, 92663",
          },
        ],
        note: "From the City's ZIP code map (City GIS Division, dated 05/19/2026). It also shows other ZIP areas, one labeled as another city, so we confirm your address.",
      },
    ],
    neighborhoodsHeading: "Official Newport Beach resources",
    officialResources: [
      {
        text: "About the Community",
        href: "https://www.newportbeachca.gov/i-am-a/visitor/about-newport-beach/about-the-community",
        note: "Villages and areas the City describes.",
      },
      {
        text: "Plans, Permits and Inspections",
        href: "https://www.newportbeachca.gov/government/departments/community-development/building-division/plan-checks-permits-inspections",
        note: "Permit examples and plot plan notes.",
      },
      {
        text: "Online permitting",
        href: "https://www.newportbeachca.gov/government/departments/community-development/building-division/online-permitting-ipermit",
        note: "Residential Express Permits and online services.",
      },
      {
        text: "ZIP code map",
        href: "http://nbgis.newportbeachca.gov/gispub/MapCatalog/pdf_maps/zipcodes_11X17.pdf",
        note: "City GIS map of ZIP areas.",
      },
      {
        text: "SoCalGas rebates",
        href: "https://www.socalgas.com/savings/rebates-and-incentives",
        note: "ENERGY STAR furnace rebate and program period.",
      },
      {
        text: "SCE Golden State Rebates",
        href: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace",
        note: "Air conditioner and smart thermostat coupons.",
      },
      {
        text: "Census QuickFacts",
        href: "https://www.census.gov/quickfacts/newportbeachcitycalifornia",
        note: "Population, owner-occupied rate, and household size cited on this page.",
      },
    ],
    servicesTitle: "Everything we handle for Newport Beach homes and businesses",
    serviceCards: [
      {
        slug: "ac-repair",
        name: "AC Repair",
        body: "Diagnosis and repair for cooling failures, weak airflow, and unusual noises in Newport Beach homes and businesses.",
      },
      {
        slug: "ac-installation",
        name: "AC Installation & Replacement",
        body: "New system sizing and installation for Newport Beach properties, planned around the City's permit process.",
      },
      {
        slug: "ac-maintenance",
        name: "AC Maintenance",
        body: "Seasonal AC tune-ups that catch small issues early, for Newport Beach homes and for commercial rooftop and ground units.",
      },
      {
        slug: "heating-repair",
        name: "Heating Repair",
        body: "Furnace and heating system diagnosis and repair for Newport Beach homes and businesses.",
      },
      {
        slug: "furnace-installation",
        name: "Furnace Installation & Replacement",
        body: "Furnace sizing and installation, planned around the City's permit pages. SoCalGas lists a furnace rebate with its own terms.",
      },
      {
        slug: "heat-pump-services",
        name: "Heat Pump Services",
        body: "Heat pump installation, repair, and maintenance, with the City's permit process and your utilities' program pages in mind.",
      },
      {
        slug: "ductless-mini-split",
        name: "Ductless Mini-Split",
        body: "Ductless systems for Newport Beach additions, converted spaces, and rooms the existing ducts do not reach.",
      },
      {
        slug: "ductwork",
        name: "Ductwork Services",
        body: "Duct repair, sealing, and replacement for Newport Beach homes and buildings.",
      },
      {
        slug: "indoor-air-quality",
        name: "Indoor Air Quality",
        body: "Filtration, ventilation, and air-quality upgrades for Newport Beach homes and offices.",
      },
      {
        slug: "emergency-hvac",
        name: "Emergency HVAC",
        body: "24/7 emergency dispatch for no-cool and no-heat problems in Newport Beach. If you smell gas, leave the building and call 911 or your gas utility.",
      },
    ],
    resources: {
      eyebrow: "Know before you start",
      title: "Newport Beach permits and incentive programs",
      intro: "Official sources for three items worth checking before a Newport Beach HVAC project.",
      cards: [
        {
          amount: "Permits and inspections",
          description: "The City's Plans, Permits and Inspections page gives replacing a furnace as an example of work that in many cases needs a permit, and its online permitting page names furnace replacement as a Residential Express Permit example. The pages we read do not mention AC replacement, so we confirm the steps for your job with the City.",
          linkLabel: "City permit page",
          linkHref: "https://www.newportbeachca.gov/government/departments/community-development/building-division/plan-checks-permits-inspections",
        },
        {
          amount: "Furnace rebate",
          description: "SoCalGas lists a 2026 rebate for ENERGY STAR certified furnaces, with funds first come, first served until December 31, 2026 or until they run out. Check that your gas account is with SoCalGas, and we do not quote amounts.",
          linkLabel: "SoCalGas rebates",
          linkHref: "https://www.socalgas.com/savings/rebates-and-incentives",
        },
        {
          amount: "AC and thermostat coupons",
          description: "SCE lists Golden State Rebates instant coupons for air conditioners and smart thermostats at participating retailers, in store or online. The SCE page lists no amounts, so confirm current terms before you buy.",
          linkLabel: "SCE Golden State Rebates",
          linkHref: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace",
        },
      ],
    },
    nearby: [
      "costa-mesa",
      "irvine",
      "huntington-beach",
      "santa-ana",
    ],
    proof: {
      heading: "Licensed, reviewed, and ready across Newport Beach",
      body: "AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide.",
      stats: [
        {
          num: "4.8★",
          label: "Google rating",
        },
        {
          num: "40",
          label: "Google reviews",
        },
        {
          num: "C-20",
          label: "California license class",
        },
        {
          num: "24/7",
          label: "Emergency dispatch",
        },
      ],
    },
    finalCtaBody: "Call or request service online to schedule a visit anywhere in Newport Beach. Same-day service is typical, subject to capacity.",
    faqs: [
      {
        q: "Does AIRPRO SOLUTIONS service all of Newport Beach?",
        a: "Yes. AIRPRO SOLUTIONS serves homes and businesses across Newport Beach as part of our Orange County coverage. The City runs its own permit process, so we plan each visit around your specific address.",
        boldLead: "Yes.",
        links: [
          {
            text: "Orange County coverage",
            href: "/service-areas/orange-county/",
          },
        ],
      },
      {
        q: "How fast can a technician reach my Newport Beach home?",
        a: "Same-day service is typical in Newport Beach, subject to capacity. Call (323) 776-9047 to confirm a window for your address.",
        boldLead: "Same-day service is typical in Newport Beach, subject to capacity.",
        links: [
          {
            text: "(323) 776-9047",
            href: "tel:+13237769047",
          },
        ],
      },
      {
        q: "Do I need a permit to replace an air conditioner in Newport Beach?",
        a: "We confirm the permit path with the City. The City's Plans, Permits and Inspections page gives replacing a furnace as an example of work that in many cases needs a permit, but it does not mention air conditioning, so AIRPRO SOLUTIONS checks what your job needs before work starts, and we do not quote permit fees.",
        boldLead: "We confirm the permit path with the City.",
        links: [
          {
            text: "Plans, Permits and Inspections page",
            href: "https://www.newportbeachca.gov/government/departments/community-development/building-division/plan-checks-permits-inspections",
          },
        ],
      },
      {
        q: "Can a furnace replacement use a Newport Beach express permit?",
        a: "The City names furnace replacement as an example. Its online permitting page lists furnace replacement as an example of a simple project for Residential Express Permits, which are not for projects that need multiple permits and plan review, so AIRPRO SOLUTIONS confirms with the City whether your job qualifies.",
        boldLead: "The City names furnace replacement as an example.",
        links: [
          {
            text: "online permitting page",
            href: "https://www.newportbeachca.gov/government/departments/community-development/building-division/online-permitting-ipermit",
          },
        ],
      },
      {
        q: "Where can an outdoor AC unit go on my Newport Beach property?",
        a: "We confirm that with the City. We did not confirm the City's equipment placement, setback, or noise rules from the official code, so we do not state limits here, and AIRPRO SOLUTIONS checks the current rules and your property's layout with the City before choosing a location.",
        boldLead: "We confirm that with the City.",
      },
      {
        q: "Does the age of my Newport Beach home matter for HVAC?",
        a: "Age is one factor we check. We did not find a verified citywide figure for the age of Newport Beach homes, so AIRPRO SOLUTIONS confirms the equipment, roof or attic access, and ductwork at your property instead of assuming.",
        boldLead: "Age is one factor we check.",
      },
      {
        q: "Do you work on rental properties in Newport Beach?",
        a: "Yes. QuickFacts reports a 52.1% owner-occupied housing unit rate for Newport Beach, so 47.9% of occupied homes are not owner-occupied. AIRPRO SOLUTIONS works with owners and property managers on access and approval before installation or replacement.",
        boldLead: "Yes.",
        links: [
          {
            text: "QuickFacts",
            href: "https://www.census.gov/quickfacts/newportbeachcitycalifornia",
          },
        ],
      },
      {
        q: "Does AIRPRO SOLUTIONS handle commercial HVAC in Newport Beach?",
        a: "Yes. AIRPRO SOLUTIONS services commercial properties in Newport Beach, including rooftop units. The City describes Newport Center as high- and mid-rise office and residential buildings, hotels, and Fashion Island, so we plan rooftop access and equipment placement with the building owner or manager and confirm the permit path with the City before commercial work starts. See our Commercial HVAC page for the full scope.",
        boldLead: "Yes.",
        links: [
          {
            text: "Commercial HVAC page",
            href: "/commercial-hvac/",
          },
        ],
      },
      {
        q: "How do I check an HVAC contractor in Newport Beach?",
        a: "Check the state license first. CSLB says a license number shown in an ad is not proof that the license is valid, so check its status on the CSLB site. AIRPRO SOLUTIONS' California license numbers are #1126691 and #50251 (C-20). Separately, the City's business license page says contractors based outside Newport Beach must also file a City application.",
        boldLead: "Check the state license first.",
        links: [
          {
            text: "CSLB site",
            href: "https://www.cslb.ca.gov/consumers/hire_a_contractor/finding_the_right_contractor.aspx",
          },
          {
            text: "business license page",
            href: "https://www.newportbeachca.gov/i-am-a/business/business-license",
          },
        ],
      },
      {
        q: "Which utility serves my Newport Beach address?",
        a: "Your bill answers it. The City's Utilities Department page covers water and sewer service and names neither Southern California Edison nor Southern California Gas Company, so check your bill to see who supplies your electricity and gas.",
        boldLead: "Your bill answers it.",
        links: [
          {
            text: "Utilities Department page",
            href: "https://www.newportbeachca.gov/government/departments/utilities",
          },
        ],
      },
      {
        q: "Are there HVAC rebates for Newport Beach customers?",
        a: "SoCalGas and SCE list programs. SoCalGas lists a rebate for ENERGY STAR certified furnaces, with funds first come, first served until December 31, 2026 or until they run out. SCE lists Golden State Rebates coupons for air conditioners and smart thermostats at participating retailers. Neither page names Newport Beach, terms and funding change, and we do not quote amounts, so check the current terms before you buy.",
        boldLead: "SoCalGas and SCE list programs.",
        links: [
          {
            text: "rebate for ENERGY STAR certified furnaces",
            href: "https://www.socalgas.com/savings/rebates-and-incentives",
          },
          {
            text: "Golden State Rebates coupons",
            href: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace",
          },
        ],
      },
      {
        q: "What HVAC services are available in Newport Beach?",
        a: "AIRPRO SOLUTIONS provides AC repair, AC installation and replacement, AC maintenance, heating repair, furnace installation and replacement, heat pump services, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC throughout Newport Beach, for both residential and commercial properties.",
        boldLead: "AIRPRO SOLUTIONS provides",
        links: [
          {
            text: "AC repair",
            href: "/services/ac-repair/",
          },
          {
            text: "AC installation and replacement",
            href: "/services/ac-installation/",
          },
          {
            text: "AC maintenance",
            href: "/services/ac-maintenance/",
          },
          {
            text: "heating repair",
            href: "/services/heating-repair/",
          },
          {
            text: "furnace installation and replacement",
            href: "/services/furnace-installation/",
          },
          {
            text: "heat pump services",
            href: "/services/heat-pump-services/",
          },
          {
            text: "ductless mini-splits",
            href: "/services/ductless-mini-split/",
          },
          {
            text: "ductwork",
            href: "/services/ductwork/",
          },
          {
            text: "indoor air quality",
            href: "/services/indoor-air-quality/",
          },
          {
            text: "emergency HVAC",
            href: "/services/emergency-hvac/",
          },
        ],
      },
      {
        q: "Is emergency HVAC service available in Newport Beach?",
        a: "Yes. AIRPRO SOLUTIONS offers 24/7 emergency dispatch for no-cool and no-heat problems in Newport Beach. Call (323) 776-9047 and tell us your system is down. If you smell gas, leave the home and call 911 or your gas utility.",
        boldLead: "Yes.",
        links: [
          {
            text: "(323) 776-9047",
            href: "tel:+13237769047",
          },
        ],
      },
      {
        q: "How much does HVAC service cost in Newport Beach?",
        a: "Cost depends on the problem, the equipment, and how accessible the system is. We do not publish one flat price, so call (323) 776-9047 or request service and we will quote your specific system.",
        boldLead: "Cost depends on the problem, the equipment, and how accessible the system is.",
        links: [
          {
            text: "(323) 776-9047",
            href: "tel:+13237769047",
          },
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
    : c.slug === 'burbank' ? burbankOverrides
    : c.slug === 'santa-monica' ? santaMonicaOverrides
    : c.slug === 'inglewood' ? inglewoodOverrides
    : c.slug === 'manhattan-beach' ? manhattanBeachOverrides
    : c.slug === 'hermosa-beach' ? hermosaBeachOverrides
    : c.slug === 'rancho-cucamonga' ? ranchoCucamongaOverrides
    : c.slug === 'hawthorne' ? hawthorneOverrides
    : c.slug === 'carson' ? carsonOverrides
    : c.slug === 'santa-ana' ? santaAnaOverrides
    : c.slug === 'newport-beach' ? newportBeachOverrides
    : undefined;
  const withOverrides = overrides ? { ...c, ...overrides } : c;
  return cardImages[c.slug] ? { ...withOverrides, cardImage: cardImages[c.slug] } : withOverrides;
});

export const wave1Cities = cities.filter((c) => c.wave === 1);

export const getCity = (slug: string) => cities.find((c) => c.slug === slug);
