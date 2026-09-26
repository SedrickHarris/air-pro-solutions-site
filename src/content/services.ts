export type ServiceImage = { src: string; alt: string };

export type Service = {
  slug: string;
  name: string;
  icon: string;
  family: string; // service family the page belongs to (for internal linking and hubs)
  level: 1 | 2; // 1 = parent/hub in the tree, 2 = child page (level 3 commercial pages live in commercial.ts)
  parent?: string; // slug of the hub page this child belongs to, per the page tree below
  published: boolean; // false = builds as a noindex stub, excluded from the sitemap and the contact form
  image?: ServiceImage; // 800x600 card image; falls back to the "photo pending" tile when absent
  description: string; // TODO(copy) where empty
  symptoms: string[]; // TODO(copy)
  process: { title: string; body: string }[]; // TODO(copy)
  repairVsReplace: string[]; // TODO(copy)
  related: string[]; // slugs
};

type Opts = { description?: string; image?: ServiceImage };

const make = (level: 1 | 2, published: boolean) =>
  (family: string, slug: string, name: string, icon: string, o: Opts = {}): Service => ({
    slug, name, icon, family, level, published,
    image: o.image,
    description: o.description ?? '',
    symptoms: [], process: [], repairVsReplace: [], related: [],
  });

const core = make(1, true); // core services
const l2 = make(2, false); // second-level pages: noindex stubs until real copy exists

// Card images live in public/images/services/cards (800x600 WebP, made from the 2896x2172 originals in
// public/images/services/service-cards). Alt text describes the picture only; these are not job photos.
const card = (slug: string, alt: string): ServiceImage => ({ src: `/images/services/cards/${slug}.webp`, alt });

// Every entry is served at /[service]/ (top level). Rules: lowercase, hyphens, no stop words.
// To publish a level 2 page, write its copy and switch l2 to core-style published: true for that entry.
// Descriptions are the confirmed homepage card copy; empty ones are still TODO(copy).
const baseServices: Service[] = [
  // --- Level 1: core services ---
  core('ac', 'ac-repair', 'AC Repair', 'snowflake', { description: "Diagnosis and repair for air conditioners that aren't cooling, blow warm air, leak, or make unusual noises.",
    image: card('ac-repair', 'Large outdoor AC condenser on a concrete pad beside a stucco wall in warm evening light') }),
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
export const commercialCardImage: ServiceImage = card('commercial-hvac', 'Rooftop HVAC units on a commercial building with the Los Angeles skyline behind');
