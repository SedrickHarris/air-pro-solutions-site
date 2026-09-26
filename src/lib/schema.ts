import { siteConfig } from '@/content/site-config';

// RULE: any text passed in here must be the same string rendered on the page.

// Canonical entity: render this on the homepage only. Other pages reference it via providerRef.
export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'HVACBusiness',
  '@id': siteConfig.orgId,
  name: siteConfig.name,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  logo: { '@type': 'ImageObject', url: `${siteConfig.url}${siteConfig.logo}` },
  hasCredential: siteConfig.licenses.map((id) => ({
    '@type': 'EducationalOccupationalCredential',
    name: 'California Contractor License',
    credentialCategory: 'license',
    identifier: id,
  })),
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: String(siteConfig.rating),
    reviewCount: String(siteConfig.reviewCount),
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Los Angeles County, CA' },
    { '@type': 'AdministrativeArea', name: 'South Bay, CA' },
    { '@type': 'AdministrativeArea', name: 'Orange County, CA' },
    { '@type': 'AdministrativeArea', name: 'Inland Empire, CA' },
  ],
  // TODO(data): sameAs - needs the canonical Google Business Profile URL
  // (maps.google.com/?cid=... form), not a share.google short link. Add once supplied.
});

export const providerRef = { '@id': siteConfig.orgId };

export const serviceSchema = (s: { name: string; description: string; url: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: s.name,
  description: s.description,
  url: s.url,
  provider: providerRef,
});

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const jsonLd = (data: object) => JSON.stringify(data);
