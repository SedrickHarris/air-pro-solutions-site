import type { MetadataRoute } from 'next';
import { siteConfig } from '@/content/site-config';
import { services } from '@/content/services';
import { regions } from '@/content/regions';
import { cities } from '@/content/cities';
import { audiences } from '@/content/audiences';
import { matrixPages, audienceServicePages } from '@/content/matrix';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  // TODO(data): exclude placeholder-* entries before launch
  const paths = [
    '/', '/services/', '/service-areas/', '/blog/',
    '/about/', '/contact/', '/reviews/', '/financing/', '/maintenance-plan/', '/faq/', '/careers/', '/privacy/', '/terms/', '/accessibility/', // thank-you is noindex, never list it
    ...audiences.map((a) => `/${a}/`),
    ...services.map((s) => `/${s.slug}/`),
    ...regions.map((r) => `/service-areas/${r.slug}/`),
    ...cities.map((c) => `/service-areas/${c.slug}/`),
    ...matrixPages.map((m) => `/${m.service}/${m.city}/`),
    ...audienceServicePages.map((m) => `/${m.audience}/${m.service}/`),
  ];
  return paths.map((p) => ({ url: `${siteConfig.url}${p}` }));
}
