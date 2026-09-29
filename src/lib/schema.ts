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

export const serviceSchema = (s: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  areaServed?: { name: string }[];
  // Region-hub pages list each city as its own areaServed entry (a City, not an AdministrativeArea),
  // each pointing back at the region via containedInPlace. Takes precedence over `areaServed` above.
  areaServedCities?: { name: string; containedInPlace: string }[];
  audience?: { type: 'BusinessAudience' | 'PeopleAudience'; audienceType: string };
  offers?: string[]; // becomes one Offer per name, matching the visible service card titles
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: s.name,
  description: s.description,
  url: s.url,
  provider: providerRef,
  ...(s.serviceType ? { serviceType: s.serviceType } : {}),
  ...(s.areaServedCities
    ? { areaServed: s.areaServedCities.map((c) => ({ '@type': 'City', name: c.name, containedInPlace: { '@type': 'AdministrativeArea', name: c.containedInPlace } })) }
    : s.areaServed
      ? { areaServed: s.areaServed.map((a) => ({ '@type': 'AdministrativeArea', name: a.name })) }
      : {}),
  ...(s.audience ? { audience: { '@type': s.audience.type, audienceType: s.audience.audienceType } } : {}),
  ...(s.offers ? { makesOffer: s.offers.map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })) } : {}),
});

// City and matrix (service+city) page schema: areaServed is a single City (with containedInPlace).
// makesOffer names, when given, must match the visible service card titles exactly.
export const citySchema = (s: { name: string; description: string; url: string; cityName: string; regionName: string; serviceType?: string; offers?: string[] }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: s.serviceType ?? 'HVAC Services',
  name: s.name,
  description: s.description,
  url: s.url,
  provider: providerRef,
  areaServed: {
    '@type': 'City',
    name: s.cityName,
    containedInPlace: { '@type': 'AdministrativeArea', name: s.regionName },
  },
  ...(s.offers ? { makesOffer: s.offers.map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })) } : {}),
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

// Hub page listing services. Each entry must use the same name/description/url rendered on the page.
export const collectionPageSchema = (c: { name: string; url: string; items: { name: string; description: string; url: string }[] }) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: c.name,
  url: c.url,
  provider: providerRef,
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: c.items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: { '@type': 'Service', name: it.name, description: it.description, url: it.url, provider: providerRef },
    })),
  },
});

export const jsonLd = (data: object) => JSON.stringify(data);
