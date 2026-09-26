export type ServiceImage = { src: string; alt: string };

export type Service = {
  slug: string;
  name: string;
  icon: string;
  image?: ServiceImage; // 800x600 card image; falls back to the "photo pending" tile when absent
  description: string; // TODO(copy) where empty
  symptoms: string[]; // TODO(copy)
  process: { title: string; body: string }[]; // TODO(copy)
  repairVsReplace: string[]; // TODO(copy)
  related: string[]; // slugs
};

const s = (slug: string, name: string, icon: string, description = '', image?: ServiceImage): Service => ({
  slug, name, icon, image, description, symptoms: [], process: [], repairVsReplace: [], related: [],
});

// Card images live in public/images/services/cards (800x600 WebP, made from the 2896x2172 originals in
// public/images/services/service-cards). Alt text describes the picture only; these are not job photos.
const card = (slug: string, alt: string): ServiceImage => ({ src: `/images/services/cards/${slug}.webp`, alt });

// Served at /[service]/ (top level). Rules: lowercase, hyphens, no stop words.
// Descriptions are the confirmed homepage card copy; empty ones are still TODO(copy).
export const services: Service[] = [
  // TODO(design): no card image supplied for ac-repair yet; it shows the "photo pending" tile.
  s('ac-repair', 'AC Repair', 'snowflake', 'Diagnosis and same-visit fixes for cooling failures, weak airflow, and unusual noises.'),
  s('ac-installation', 'AC Installation', 'wrench', 'Properly sized systems with a clear, itemized estimate before any work begins.',
    card('ac-installation', 'Outdoor AC condenser on a concrete pad beside a home, with the Los Angeles skyline in the distance')),
  s('ac-maintenance', 'AC Maintenance', 'calendar-check', 'Twice-yearly tune-ups that extend equipment life and catch problems early.',
    card('ac-maintenance', 'Outdoor AC condenser unit beside a home with a service tool resting on the pad')),
  s('heating-repair', 'Heating Repair', 'flame', "Furnace and heat-pump repair sized for Southern California's mild winters.",
    card('heating-repair', 'Gas furnace and ductwork in a home utility closet')),
  s('furnace-installation', 'Furnace Installation', 'furnace'),
  s('heat-pump-services', 'Heat Pump Services', 'heat-pump', 'Single-system heating and cooling with strong rebate eligibility.',
    card('heat-pump-services', 'Outdoor heat pump unit mounted on the exterior wall of a home')),
  s('ductless-mini-split', 'Ductless Mini-Split', 'mini-split', 'Room-by-room comfort for older homes, ADUs, and additions with no ductwork.',
    card('ductless-mini-split', 'Wall-mounted ductless mini-split indoor unit in a bright living space')),
  s('ductwork', 'Ductwork', 'duct'),
  s('indoor-air-quality', 'Indoor Air Quality', 'air'),
  s('emergency-hvac', 'Emergency HVAC', 'alert', 'Same-day dispatch for no-cool and no-heat emergencies across our service area.',
    card('emergency-hvac', 'Outdoor AC unit beside a home at dusk')),
];

// Commercial HVAC is an audience hub, not a service, so its homepage card image lives here.
export const commercialCardImage: ServiceImage = card('commercial-hvac', 'Rooftop HVAC units on a commercial building with the Los Angeles skyline behind');

export const getService = (slug: string) => services.find((x) => x.slug === slug);
