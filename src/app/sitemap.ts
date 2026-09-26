import type { MetadataRoute } from 'next';
import { siteConfig } from '@/content/site-config';
import { publishedServices } from '@/content/services';
import { regions } from '@/content/regions';
import { wave1Cities } from '@/content/cities';
import { audiences } from '@/content/audiences';
import { matrixPages } from '@/content/matrix';
import { publishedCommercialPages } from '@/content/commercial';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  // TODO(data): exclude placeholder-* entries before launch
  const paths = [
    '/', '/services/', '/service-areas/', '/blog/',
    '/about/', '/contact/', '/reviews/', '/financing/', '/maintenance-plan/', '/faq/', '/careers/', '/privacy/', '/terms/', '/accessibility/', // thank-you is noindex, never list it
    ...audiences.map((a) => `/${a}/`),
    ...publishedServices.map((s) => `/${s.slug}/`),
    ...regions.map((r) => `/service-areas/${r.slug}/`),
    ...wave1Cities.map((c) => `/service-areas/${c.slug}/`),
    ...matrixPages.map((m) => `/${m.service}/${m.city}/`),
    ...publishedCommercialPages.map((p) => `/commercial-hvac/${p.slug}/`),
  ];
  return paths.map((p) => ({ url: `${siteConfig.url}${p}` }));
}
