export type Service = {
  slug: string;
  name: string;
  icon: string;
  description: string; // TODO(copy)
  symptoms: string[]; // TODO(copy)
  process: { title: string; body: string }[]; // TODO(copy)
  repairVsReplace: string[]; // TODO(copy)
  related: string[]; // slugs
};

const s = (slug: string, name: string, icon: string): Service => ({
  slug, name, icon, description: '', symptoms: [], process: [], repairVsReplace: [], related: [],
});

// Served at /[service]/ (top level). Rules: lowercase, hyphens, no stop words.
export const services: Service[] = [
  s('ac-repair', 'AC Repair', 'snowflake'),
  s('ac-installation', 'AC Installation', 'wrench'),
  s('ac-maintenance', 'AC Maintenance', 'calendar-check'),
  s('heating-repair', 'Heating Repair', 'flame'),
  s('furnace-installation', 'Furnace Installation', 'furnace'),
  s('heat-pump-services', 'Heat Pump Services', 'heat-pump'),
  s('ductless-mini-split', 'Ductless Mini-Split', 'mini-split'),
  s('ductwork', 'Ductwork', 'duct'),
  s('indoor-air-quality', 'Indoor Air Quality', 'air'),
  s('emergency-hvac', 'Emergency HVAC', 'alert'),
];

export const getService = (slug: string) => services.find((x) => x.slug === slug);
