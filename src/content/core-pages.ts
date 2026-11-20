// Registry of the fixed (non content-file) routes and whether each one is indexable. src/app/sitemap.ts lists
// every `indexable: true` entry, so flipping a page to indexable is a one-field change here plus removing the
// hard-coded noindex robots tag in its page file. The robots tag itself stays in the page file; npm run
// check:sitemap fails the build if this flag and the built <meta name="robots"> disagree.
// Cities, services, service+city matrix and commercial sub-pages are NOT listed here: they stay on their
// content-file filters (cities.ts `page`, services.ts `published && page`, matrix.ts, commercial.ts `published`).
// Audiences use `builtAudiences` in audiences.ts; the four unbuilt audience pages are listed below as noindex.
export type CorePage = { path: string; indexable: boolean };

export const corePages: CorePage[] = [
  { path: '/', indexable: true },
  { path: '/services/', indexable: true },
  { path: '/service-areas/', indexable: true },
  { path: '/service-areas/los-angeles-county/', indexable: true },
  { path: '/service-areas/south-bay/', indexable: true },
  { path: '/service-areas/orange-county/', indexable: true },
  { path: '/service-areas/inland-empire/', indexable: true },
  { path: '/contact/', indexable: true },
  { path: '/faq/', indexable: true },
  { path: '/reviews/', indexable: true },
  { path: '/careers/', indexable: true },
  { path: '/privacy/', indexable: true },
  { path: '/terms/', indexable: true },
  { path: '/accessibility/', indexable: true },
  // Noindex stubs until the client supplies content (financing partner, license details, copy).
  { path: '/about/', indexable: false },
  { path: '/financing/', indexable: false },
  { path: '/maintenance-plan/', indexable: false },
  // Never indexable: form confirmation page, and the blog index until there are real posts.
  { path: '/thank-you/', indexable: false },
  { path: '/blog/', indexable: false },
  // Audience pages not built yet (see builtAudiences in audiences.ts).
  { path: '/property-management-hvac/', indexable: false },
  { path: '/multifamily-hvac/', indexable: false },
  { path: '/restaurant-hvac/', indexable: false },
  { path: '/office-building-hvac/', indexable: false },
];
