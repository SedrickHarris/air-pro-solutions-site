import { siteConfig } from '@/content/site-config';

// RULE: any text passed in here must be the same string rendered on the page.

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'HVACBusiness',
  '@id': siteConfig.orgId,
  name: siteConfig.name,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  // TODO(data): logo, sameAs, hasCredential (both licenses), aggregateRating, address, areaServed
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
