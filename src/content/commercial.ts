// Level 3 pages: /commercial-hvac/<slug>/. Sixteen pages in two groups.
// All build as noindex stubs (published: false) until real copy exists.
// TODO(data): /commercial-hvac/{property-managers, multifamily-properties, restaurants, office-buildings}
// overlap the top-level audience pages in audiences.ts (property-management-hvac, multifamily-hvac,
// restaurant-hvac, office-building-hvac). Decide which URL owns each query before publishing either.
export type CommercialPage = {
  slug: string;
  name: string;
  kind: 'service' | 'audience';
  published: boolean;
  inTree: boolean; // false = built earlier but missing from the latest page tree; decide keep or drop
};

// The latest page tree lists eight children under /commercial-hvac/. The rest are kept as stubs (inTree: false).
const inTreeSlugs = new Set(['repair', 'installation', 'replacement', 'maintenance', 'maintenance-agreements', 'rooftop-unit-service', 'property-managers', 'apartment-communities']);
const page = (slug: string, name: string, kind: CommercialPage['kind']): CommercialPage => ({ slug, name, kind, published: false, inTree: inTreeSlugs.has(slug) });

export const commercialPages: CommercialPage[] = [
  // Commercial service types
  page('repair', 'Commercial HVAC Repair', 'service'),
  page('installation', 'Commercial HVAC Installation', 'service'),
  page('replacement', 'Commercial HVAC Replacement', 'service'),
  page('maintenance', 'Commercial HVAC Maintenance', 'service'),
  page('maintenance-agreements', 'Commercial HVAC Maintenance Agreements', 'service'),
  page('rooftop-unit-service', 'Rooftop Unit Service', 'service'),
  page('diagnostics', 'Commercial HVAC Diagnostics', 'service'),
  page('retrofits', 'Commercial HVAC Retrofits', 'service'),
  // Commercial audience segments
  page('property-managers', 'HVAC for Property Managers', 'audience'),
  page('apartment-communities', 'HVAC for Apartment Communities', 'audience'),
  page('multifamily-properties', 'HVAC for Multifamily Properties', 'audience'),
  page('office-buildings', 'HVAC for Office Buildings', 'audience'),
  page('retail-businesses', 'HVAC for Retail Businesses', 'audience'),
  page('restaurants', 'HVAC for Restaurants', 'audience'),
  page('warehouses', 'HVAC for Warehouses', 'audience'),
  page('hoa-hvac-services', 'HVAC Services for HOAs', 'audience'),
];

export const publishedCommercialPages = commercialPages.filter((p) => p.published);
export const getCommercialPage = (slug: string) => commercialPages.find((p) => p.slug === slug);
