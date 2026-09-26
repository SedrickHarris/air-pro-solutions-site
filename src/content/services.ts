export type Service = {
  slug: string;
  name: string;
  icon: string;
  description: string; // TODO(copy) where empty
  symptoms: string[]; // TODO(copy)
  process: { title: string; body: string }[]; // TODO(copy)
  repairVsReplace: string[]; // TODO(copy)
  related: string[]; // slugs
};

const s = (slug: string, name: string, icon: string, description = ''): Service => ({
  slug, name, icon, description, symptoms: [], process: [], repairVsReplace: [], related: [],
});

// Served at /[service]/ (top level). Rules: lowercase, hyphens, no stop words.
// Descriptions are the confirmed homepage card copy; empty ones are still TODO(copy).
export const services: Service[] = [
  s('ac-repair', 'AC Repair', 'snowflake', 'Diagnosis and same-visit fixes for cooling failures, weak airflow, and unusual noises.'),
  s('ac-installation', 'AC Installation', 'wrench', 'Properly sized systems with a clear, itemized estimate before any work begins.'),
  s('ac-maintenance', 'AC Maintenance', 'calendar-check', 'Twice-yearly tune-ups that extend equipment life and catch problems early.'),
  s('heating-repair', 'Heating Repair', 'flame', "Furnace and heat-pump repair sized for Southern California's mild winters."),
  s('furnace-installation', 'Furnace Installation', 'furnace'),
  s('heat-pump-services', 'Heat Pump Services', 'heat-pump', 'Single-system heating and cooling with strong rebate eligibility.'),
  s('ductless-mini-split', 'Ductless Mini-Split', 'mini-split', 'Room-by-room comfort for older homes, ADUs, and additions with no ductwork.'),
  s('ductwork', 'Ductwork', 'duct'),
  s('indoor-air-quality', 'Indoor Air Quality', 'air'),
  s('emergency-hvac', 'Emergency HVAC', 'alert', 'Same-day dispatch for no-cool and no-heat emergencies across our service area.'),
];

export const getService = (slug: string) => services.find((x) => x.slug === slug);
