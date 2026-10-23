// Shared inputs for the featured-cities scripts: services with a full page, live cities, region membership and the
// existing city card descriptions (the `note` on each region hub's city item).
import { loadContent } from './load-ts.mjs';

const { services } = loadContent('services');
const { cities } = loadContent('cities');
const { regions, citySlug } = loadContent('regions');
const { matrixPages } = loadContent('matrix');
const hubs = [
  loadContent('la-county-hub').laCountyHub,
  loadContent('south-bay').southBayHub,
  loadContent('orange-county').orangeCountyHub,
  loadContent('inland-empire').inlandEmpireHub,
];

export const ALLOWED_COUNTS = [4, 6, 8];
export const MAX_CARDS = 8;
export { services, cities, regions, matrixPages };

// Services that get a "Where we do this" section: full-content pages only (stubs stay noindex).
export const featuredServices = services.filter((s) => s.page);
export const liveCities = cities.filter((c) => c.page);
export const cityBySlug = new Map(cities.map((c) => [c.slug, c]));
export const descriptions = new Map(hubs.flatMap((h) => h.cities.items.map((i) => [citySlug(i.name), i.note])));
export const hasMatrix = (service, city) => matrixPages.some((m) => m.service === service && m.city === city);
export const hasDescription = (slug) => Boolean(descriptions.get(slug)?.trim());
