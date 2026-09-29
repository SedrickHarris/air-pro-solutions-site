import type { Faq } from '@/content/faq';

export type ServiceImage = { src: string; alt: string };

// Full service-page template content. Only populated for services with real, approved copy;
// see the "page" field below. Other services stay as noindex stubs until they get this block.
export type ServicePage = {
  primaryKeyword: string;
  // Title/H1 are built from src/lib/seo.ts (serviceTitle/serviceH1) per CLAUDE.md, not hand-written here.
  metaDescription: string;
  lede: string; // also the Service JSON-LD description - must stay word-for-word identical to the visible copy
  heroImage?: ServiceImage; // 1200x900 hero photo; falls back to the "photo pending" tile when absent
  answer: { lead: string; body: string };
  appliesTo: { label: string; icon: string }[];
  faqs: Faq[];
};

export type Service = {
  slug: string;
  name: string;
  icon: string;
  family: string; // service family the page belongs to (for internal linking and hubs)
  level: 1 | 2; // 1 = parent/hub in the tree, 2 = child page (level 3 commercial pages live in commercial.ts)
  parent?: string; // slug of the hub page this child belongs to, per the page tree below
  published: boolean; // false = builds as a noindex stub, excluded from the sitemap and the contact form
  image?: ServiceImage; // 800x600 card image; falls back to the "photo pending" tile when absent
  description: string; // TODO(copy) where empty - short blurb used on hub/card contexts
  symptoms: { lead: string; detail: string }[]; // TODO(copy)
  process: { title: string; body: string }[]; // TODO(copy)
  repairVsReplace: {
    intro: string;
    note: string;
    groups: { heading: string; icon: string; items: string[] }[]; // exactly 2: repair, then replace
  } | null; // TODO(copy)
  related: string[]; // slugs
  page?: ServicePage; // full template content; only ac-repair has this so far
};

type Opts = { description?: string; image?: ServiceImage };

const make = (level: 1 | 2, published: boolean) =>
  (family: string, slug: string, name: string, icon: string, o: Opts = {}): Service => ({
    slug, name, icon, family, level, published,
    image: o.image,
    description: o.description ?? '',
    symptoms: [], process: [], repairVsReplace: null, related: [],
  });

const core = make(1, true); // core services
const l2 = make(2, false); // second-level pages: noindex stubs until real copy exists

// Card images live in public/images/services/cards (800x600 WebP, made from the 2896x2172 originals in
// public/images/services/service-cards). Alt text describes the picture only; these are not job photos.
const card = (slug: string, alt: string): ServiceImage => ({ src: `/images/services/cards/${slug}.webp`, alt });

// Full template content for /ac-repair/. Locked copy - see CLAUDE.md "Claims that must not ship"
// before adding anything here: no pricing, timing, brand-list, or availability claims.
const acRepairPage: ServicePage = {
  primaryKeyword: 'ac repair los angeles',
  metaDescription:
    'Get AC repair in Los Angeles for homes and businesses. Air Pro Solutions diagnoses cooling, airflow, electrical, and drainage problems. Schedule service.',
  lede:
    "No cooling, weak airflow, strange noises, or water leaks? Air Pro Solutions provides residential and commercial AC repair in Los Angeles and across the South Bay, Orange County, and the Inland Empire - with an itemized price before any work begins.",
  heroImage: {
    src: '/images/services/ac-repair/hero.webp',
    alt: 'Outdoor AC condenser unit beside a stucco home with palm and succulent landscaping',
  },
  answer: {
    lead: 'Air conditioning repair',
    body:
      ' identifies and fixes problems that prevent an AC system from cooling, operating efficiently, draining correctly, or maintaining reliable airflow. Common repairs include electrical issues, refrigerant leaks, failed capacitors, blower problems, thermostat faults, and drainage clogs - the cause is diagnosed first, then repaired once you approve the price.',
  },
  appliesTo: [
    { label: 'Single-family homes', icon: 'home' },
    { label: 'Condos and townhomes', icon: 'home' },
    { label: 'Apartment communities', icon: 'building' },
    { label: 'Office buildings', icon: 'building' },
    { label: 'Retail and restaurants', icon: 'store' },
    { label: 'Rooftop package units', icon: 'wrench' },
  ],
  faqs: [
    {
      q: 'Why is my AC running but not cooling?',
      a: 'An air conditioner can run without cooling properly because of a dirty air filter, an incorrect thermostat setting, restricted airflow, or a problem with the system. Check that the thermostat is set to "Cool," the temperature is set below the room temperature, and the filter and supply vents are not blocked. If the AC still does not cool, turn it off and schedule an inspection so a technician can identify the cause.',
    },
    {
      q: 'How much does AC repair cost in Los Angeles?',
      a: 'The cost of AC repair in Los Angeles depends on what is causing the problem, which parts are needed, and how much work the system requires. A technician needs to evaluate the equipment before providing a repair recommendation. Contact Air Pro Solutions to discuss the issue and request service.',
    },
    {
      q: 'How quickly can Air Pro Solutions get to my home?',
      a: 'Appointment availability depends on the schedule and your location. Call Air Pro Solutions at (323) 776-9047 or request service online to ask about current availability in your area.',
      links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
    },
    {
      q: 'Why is my AC leaking water?',
      a: 'Water near an indoor air conditioner may be related to a clogged condensate drain or another drainage problem. If water is actively leaking, turn off the system to help limit water damage and contact an HVAC professional. Avoid opening equipment panels or attempting repairs yourself.',
    },
    {
      q: 'Do you repair all AC brands?',
      a: "Air Pro Solutions can confirm whether it services your system when you contact the team. Share the equipment's make and model, along with the symptoms you are noticing, so they can help determine the next step.",
    },
    {
      q: 'Is AC repair covered by a warranty?',
      a: 'Warranty coverage depends on the equipment, the warranty terms, and the specific repair needed. Check your system documents or contact the manufacturer to understand what is covered. Air Pro Solutions can assess the issue and explain the recommended repair.',
    },
    {
      q: 'How long does AC repair take?',
      a: 'Repair time depends on the cause of the problem, the work required, parts availability, and access to the equipment. After inspecting the system, a technician can explain the recommended work and provide a clearer estimate of the time involved.',
    },
    {
      q: "What's included in an AC repair visit?",
      a: 'An AC repair visit typically begins with a review of the symptoms and an inspection of the system. The technician can explain the findings and discuss recommended next steps. The work needed varies by system and problem, so confirm the scope before authorizing a repair.',
    },
  ],
  // TODO(copy): client review of every FAQ answer above before launch.
};

// Every entry is served at /[service]/ (top level). Rules: lowercase, hyphens, no stop words.
// To publish a level 2 page, write its copy and switch l2 to core-style published: true for that entry.
// Descriptions are the confirmed homepage card copy; empty ones are still TODO(copy).
const baseServices: Service[] = [
  // --- Level 1: core services ---
  {
    ...core('ac', 'ac-repair', 'AC Repair', 'snowflake', { description: "Diagnosis and repair for air conditioners that aren't cooling, blow warm air, leak, or make unusual noises.",
      image: card('ac-repair', 'Large outdoor AC condenser on a concrete pad beside a stucco wall in warm evening light') }),
    symptoms: [
      { lead: 'Warm air', detail: 'from vents even when the system is running' },
      { lead: 'Weak or no airflow', detail: 'from one or more vents' },
      { lead: 'Unusual noises', detail: '- grinding, clicking, or rattling' },
      { lead: 'Water pooling', detail: 'near the indoor unit' },
      { lead: 'Frequent cycling', detail: "on and off, or the system won't stay on" },
      { lead: 'Rising energy bills', detail: 'with no change in usage' },
    ],
    process: [
      { title: 'Diagnose the problem', body: 'We start by reviewing the symptoms you have noticed and inspecting your air conditioning system. This helps us identify the likely cause of the cooling problem rather than focusing only on what you can see or hear.' },
      { title: 'Explain the findings', body: 'We explain what we found in clear, practical terms and outline the repair options. Before work begins, you can review the recommended work and its cost, then decide how you would like to proceed.' },
      { title: 'Complete the approved repair', body: 'With your approval, we complete the agreed repair. The work depends on the system and the cause of the problem. If additional work is needed, we will explain it before proceeding.' },
      { title: 'Test system operation', body: "After the repair, we check the air conditioning system's operation. We look at cooling and airflow to confirm how the system is running after the work." },
      { title: 'Discuss recommended next steps', body: 'Before we leave, we can point out other concerns observed during the visit and explain whether they may need attention. We will discuss options so you can decide what, if anything, to schedule next.' },
    ],
    repairVsReplace: {
      intro:
        "The right choice depends on your air conditioner's condition, repair needs, and comfort performance. These factors can help guide a conversation with an HVAC professional.",
      groups: [
        {
          heading: 'Repair may make sense when',
          icon: 'wrench',
          items: [
            'The system is relatively new and has otherwise operated reliably.',
            'The inspection finds an isolated problem and the proposed repair fits your needs.',
            'The air conditioner has generally kept your home comfortable.',
            'The necessary parts are available for the system.',
          ],
        },
        {
          heading: 'Replacement may be worth discussing when',
          icon: 'refresh',
          items: [
            'The system is near or past its expected service life.',
            'The system has needed repeated repairs or the repair needs are increasing.',
            'Cooling or comfort problems continue and need further evaluation.',
            'Parts availability or refrigerant requirements may affect future service options.',
          ],
        },
      ],
      note:
        'An inspection can help clarify the problem and the options available for your specific system. Ask the technician to explain the findings and proposed work so you can make an informed decision.',
    },
    related: ['ac-installation', 'ac-maintenance', 'emergency-hvac'],
    page: acRepairPage,
  },
  core('ac', 'ac-installation', 'AC Installation', 'wrench', { description: 'New air conditioner installation and system replacement, sized to your home or business.',
    image: card('ac-installation', 'Outdoor AC condenser on a concrete pad beside a home, with the Los Angeles skyline in the distance') }),
  core('ac', 'ac-maintenance', 'AC Maintenance', 'calendar-check', { description: 'Seasonal tune-ups that check refrigerant levels, electrical components, and airflow before extreme heat arrives.',
    image: card('ac-maintenance', 'Outdoor AC condenser unit beside a home with a service tool resting on the pad') }),
  core('heating', 'heating-repair', 'Heating Repair', 'flame', { description: "Diagnosis and repair for furnaces, heat pumps, and heating systems that won't turn on or heat unevenly.",
    image: card('heating-repair', 'Gas furnace and ductwork in a home utility closet') }),
  core('heating', 'furnace-installation', 'Furnace Installation', 'furnace', { description: 'Furnace installation and replacement for homes and businesses across Southern California.',
    image: card('furnace-installation', 'Modern gas furnace beside an older furnace in a home utility closet with ductwork above') }),
  core('heat-pump', 'heat-pump-services', 'Heat Pump Services', 'heat-pump', { description: 'Installation, repair, and maintenance for heat pump systems that handle both heating and cooling.',
    image: card('heat-pump-services', 'Outdoor heat pump unit mounted on the exterior wall of a home') }),
  core('ductless', 'ductless-mini-split', 'Ductless Mini-Split', 'mini-split', { description: 'Ductless mini-split installation and service for additions, garages, and homes without central ductwork.',
    image: card('ductless-mini-split', 'Wall-mounted ductless mini-split indoor unit in a bright living space') }),
  core('ductwork', 'ductwork', 'Ductwork', 'duct', { description: 'Duct inspection, sealing, repair, and design for uneven airflow, energy loss, and air quality issues.',
    image: card('ductwork', 'Insulated flexible ducts and a galvanized duct plenum in a residential attic') }),
  core('indoor-air-quality', 'indoor-air-quality', 'Indoor Air Quality', 'air', { description: 'Air filtration, purification, and humidity solutions that improve the air circulating through your space.',
    image: card('indoor-air-quality', 'Air purifier, return vent grille, and a clean pleated filter in a bright living room') }),
  // TODO(data): the "Emergency" name and slug imply urgent availability; confirm the service is always-on or rename.
  core('hvac', 'emergency-hvac', 'Emergency HVAC', 'alert', { description: "24/7 dispatch for no-cool and no-heat emergencies that can't wait for a scheduled appointment.",
    image: card('emergency-hvac', 'Outdoor AC unit beside a home at dusk') }),

  // --- Level 2: second-level service pages ---
  // AC and heating
  l2('ac', 'ac-replacement', 'AC Replacement', 'snowflake'),
  l2('heating', 'heating-installation', 'Heating Installation', 'flame'),
  l2('heating', 'furnace-repair', 'Furnace Repair', 'furnace'),
  l2('heating', 'furnace-replacement', 'Furnace Replacement', 'furnace'),
  l2('heating', 'heating-maintenance', 'Heating Maintenance', 'flame'),
  // Heat pumps
  l2('heat-pump', 'heat-pump-repair', 'Heat Pump Repair', 'heat-pump'),
  l2('heat-pump', 'heat-pump-installation', 'Heat Pump Installation', 'heat-pump'),
  l2('heat-pump', 'heat-pump-replacement', 'Heat Pump Replacement', 'heat-pump'),
  l2('heat-pump', 'heat-pump-maintenance', 'Heat Pump Maintenance', 'heat-pump'),
  // Ductless mini-splits
  l2('ductless', 'ductless-mini-split-installation', 'Ductless Mini-Split Installation', 'mini-split'),
  l2('ductless', 'ductless-mini-split-repair', 'Ductless Mini-Split Repair', 'mini-split'),
  l2('ductless', 'ductless-mini-split-replacement', 'Ductless Mini-Split Replacement', 'mini-split'),
  l2('ductless', 'ductless-mini-split-maintenance', 'Ductless Mini-Split Maintenance', 'mini-split'),
  // General HVAC
  l2('hvac', 'hvac-repair', 'HVAC Repair', 'wrench'),
  l2('hvac', 'hvac-installation', 'HVAC Installation', 'wrench'),
  l2('hvac', 'hvac-replacement', 'HVAC Replacement', 'wrench'),
  l2('hvac', 'hvac-maintenance', 'HVAC Maintenance', 'calendar-check'),
  l2('hvac', 'maintenance-plans', 'Maintenance Plans', 'calendar-check'), // overlaps the /maintenance-plan/ core page: see CLAUDE.md
  // Ductwork
  l2('ductwork', 'ductwork-services', 'Ductwork Services', 'duct'),
  l2('ductwork', 'duct-repair', 'Duct Repair', 'duct'),
  l2('ductwork', 'duct-sealing', 'Duct Sealing', 'duct'),
  l2('ductwork', 'duct-replacement', 'Duct Replacement', 'duct'),
  l2('ductwork', 'duct-installation', 'Duct Installation', 'duct'),
  // Indoor air quality
  l2('indoor-air-quality', 'air-filtration-systems', 'Air Filtration Systems', 'air'),
  l2('indoor-air-quality', 'whole-home-air-purification', 'Whole-Home Air Purification', 'air'),
  l2('indoor-air-quality', 'air-purifier-installation', 'Air Purifier Installation', 'air'),
  l2('indoor-air-quality', 'ventilation-services', 'Ventilation Services', 'air'),
];

// Page tree (parent -> children). URLs stay flat at /[slug]/; the tree drives hubs and internal links.
// Not in the tree yet (kept as noindex stubs, decide before building): ac-installation, ductwork,
// hvac-repair, hvac-installation, hvac-replacement, hvac-maintenance, maintenance-plans.
// TODO(data): 'ductwork' (core) and 'ductwork-services' (tree parent) target the same topic; pick one.
export const serviceTree: Record<string, string[]> = {
  'ac-repair': ['ac-replacement', 'ac-maintenance', 'emergency-hvac'],
  'heating-repair': ['heating-installation', 'furnace-repair', 'furnace-installation', 'furnace-replacement', 'heating-maintenance'],
  'heat-pump-services': ['heat-pump-repair', 'heat-pump-installation', 'heat-pump-replacement', 'heat-pump-maintenance'],
  'ductless-mini-split': ['ductless-mini-split-installation', 'ductless-mini-split-repair', 'ductless-mini-split-replacement', 'ductless-mini-split-maintenance'],
  'ductwork-services': ['duct-repair', 'duct-sealing', 'duct-replacement', 'duct-installation'],
  'indoor-air-quality': ['air-filtration-systems', 'whole-home-air-purification', 'air-purifier-installation', 'ventilation-services'],
};
const parentOf: Record<string, string> = Object.fromEntries(
  Object.entries(serviceTree).flatMap(([parent, kids]) => kids.map((k) => [k, parent])),
);

export const services: Service[] = baseServices.map((sv) => ({
  ...sv,
  parent: parentOf[sv.slug],
  level: parentOf[sv.slug] ? 2 : serviceTree[sv.slug] ? 1 : sv.level,
}));

export const childrenOf = (slug: string) => services.filter((x) => x.parent === slug);

export const publishedServices = services.filter((x) => x.published);

export const getService = (slug: string) => services.find((x) => x.slug === slug);

// Commercial HVAC is an audience hub, not a service, so its homepage card image lives here.
export const commercialCardImage: ServiceImage = card('commercial-hvac', 'Rooftop package HVAC units and conduit on a commercial building roof, with a business park and hillside in the background');
