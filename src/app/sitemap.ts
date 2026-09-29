import type { MetadataRoute } from 'next';
import { siteConfig } from '@/content/site-config';
import { publishedServices } from '@/content/services';
import { wave1Cities } from '@/content/cities';
import { builtAudiences } from '@/content/audiences';
import { matrixPages } from '@/content/matrix';
import { publishedCommercialPages } from '@/content/commercial';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  // Only list routes that are actually indexable (no robots:noindex). A service or city needs a
  // real `page` content block, not just `published`/`wave === 1`, or its own route sets noindex and
  // it would 404-equivalent in Search Console as "submitted but noindex". Of the four /service-areas/
  // region pages, only los-angeles-county and south-bay are built; orange-county, inland-empire, and
  // the four unbuilt audience pages are still noindex stubs - update this file as each one ships.
  const paths = [
    '/', '/services/', '/service-areas/', '/service-areas/los-angeles-county/', '/service-areas/south-bay/',
    '/about/', '/contact/', '/reviews/', '/financing/', '/maintenance-plan/', '/faq/', '/careers/', '/privacy/', '/terms/', '/accessibility/', // thank-you is noindex, never list it
    ...builtAudiences.map((a) => `/${a}/`),
    ...publishedServices.filter((s) => s.page).map((s) => `/${s.slug}/`),
    ...wave1Cities.filter((c) => c.page).map((c) => `/service-areas/${c.slug}/`),
    ...matrixPages.map((m) => `/${m.service}/${m.city}/`),
    ...publishedCommercialPages.map((p) => `/commercial-hvac/${p.slug}/`),
  ];
  return paths.map((p) => ({ url: `${siteConfig.url}${p}` }));
}
