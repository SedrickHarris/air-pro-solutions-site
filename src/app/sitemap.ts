import type { MetadataRoute } from 'next';
import { corePages } from '@/content/core-pages';
import { siteConfig } from '@/content/site-config';
import { publishedServices, serviceHref } from '@/content/services';
import { cities } from '@/content/cities';
import { builtAudiences } from '@/content/audiences';
import { matrixPages } from '@/content/matrix';
import { publishedCommercialPages } from '@/content/commercial';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  // Every entry comes from a content-file filter or the corePages registry, never a hand-kept path list.
  // Fixed pages: corePages (src/content/core-pages.ts) flagged indexable. Audiences: builtAudiences. Services:
  // published with a `page` block. Cities: any city with a `page` block (wave only means launch priority).
  // Matrix and commercial pages: their content lists. Noindex stubs stay out automatically. npm run check:sitemap
  // compares this list with the built robots tags, canonicals and redirects and fails the build on any drift.
  const paths = [
    ...corePages.filter((p) => p.indexable).map((p) => p.path),
    ...builtAudiences.map((a) => `/${a}/`),
    ...publishedServices.filter((s) => s.page).map((s) => serviceHref(s.slug)),
    ...cities.filter((c) => c.page).map((c) => `/service-areas/${c.slug}/`),
    ...matrixPages.map((m) => `${serviceHref(m.service)}${m.city}/`),
    ...publishedCommercialPages.map((p) => `/commercial-hvac/${p.slug}/`),
  ];
  return paths.map((p) => ({ url: `${siteConfig.url}${p}` }));
}
