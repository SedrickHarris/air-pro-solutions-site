import type { Metadata } from 'next';
import { siteConfig } from '@/content/site-config';

// Rules live in docs/metadata-rules.md. Build every title/description/H1 from these helpers.

const BRAND = siteConfig.name;

// --- Claims ---------------------------------------------------------------------------------
// Only these may appear in title/description/H1 copy. Extend only on client confirmation.
export const ALLOWED_CLAIMS = ['licensed', '4.8-star rated'];
// Blocked until the client confirms them.
const BLOCKED_CLAIMS = ['same-day', 'same day', '24/7', '24 hour', 'emergency', 'insured', 'guaranteed', 'best', 'affordable', 'near me'];

export function assertNoUnapprovedClaims(text: string, label = 'metadata') {
  const lower = text.toLowerCase();
  for (const claim of BLOCKED_CLAIMS) {
    const re = new RegExp(`(^|[^a-z0-9])${claim.replace(/[/-]/g, '\\$&')}([^a-z0-9]|$)`);
    if (re.test(lower)) throw new Error(`Unapproved claim "${claim}" in ${label}: ${text}`);
  }
}

// --- Length gates (hard limits from the publication gate) -------------------------------------
export function assertTitle(title: string) {
  if (title.length < 20 || title.length > 70) throw new Error(`Title must be 20-70 chars (got ${title.length}): ${title}`);
  assertNoUnapprovedClaims(title, 'title');
}
export function assertDescription(description: string) {
  if (description.length < 70 || description.length > 180) {
    throw new Error(`Description must be 70-180 chars (got ${description.length}): ${description}`);
  }
  assertNoUnapprovedClaims(description, 'description');
}
export function assertH1(h1: string) {
  if (h1.length < 10 || h1.length > 100) throw new Error(`H1 must be 10-100 chars (got ${h1.length}): ${h1}`);
  assertNoUnapprovedClaims(h1, 'h1');
}

// --- Title / H1 builders (H1 never equals the title: no brand suffix, no qualifier) ---------------
const t = (topic: string) => `${topic} | ${BRAND}`;

export const homeTitle = () => t('HVAC Services in Los Angeles, CA');
export const homeH1 = () => 'HVAC Repair, Installation & Maintenance in Los Angeles';

export const serviceTitle = (service: string) => t(`${service} in Los Angeles`);
export const serviceH1 = (service: string) => `${service} in Los Angeles and Southern California`;

export const regionTitle = (region: string) => t(`HVAC Services in ${region}`);
export const regionH1 = (region: string) => `HVAC Services in ${region}`;

// Services hub (/services/): no formula in docs/metadata-rules.md Section 3; modeled on the region hub row.
export const servicesHubTitle = () => t('HVAC Services in Southern California');
export const servicesHubH1 = () => 'HVAC Services for Every Home and Business in Southern California';

export const cityTitle =(city: string) => t(`HVAC Services in ${city}, CA`);
export const cityH1 = (city: string) => `HVAC Services in ${city}, CA`;

// The qualifier (e.g. a confirmed availability claim) is optional and dropped before any truncation.
export function matrixTitle(service: string, city: string, qualifier?: string) {
  const base = t(`${service} in ${city}, CA`);
  if (!qualifier) return base;
  assertNoUnapprovedClaims(qualifier, 'matrix qualifier');
  const withQualifier = `${service} in ${city}, CA | ${qualifier} | ${BRAND}`;
  return withQualifier.length <= 65 ? withQualifier : base;
}
export const matrixH1 = (service: string, city: string) => `${service} in ${city}, CA`;

export const audienceTitle = (audience: string) => t(`HVAC Services for ${audience}`);
export const audienceH1 = (audience: string) => `HVAC Services for ${audience}`;

export const audienceServiceTitle = (service: string, audience: string) => t(`${service} for ${audience}`);
export const audienceServiceH1 = (service: string, audience: string) => `${service} for ${audience}`;
export const commercialServiceTitle = (service: string) => t(`Commercial ${service} in Los Angeles`);
export const commercialServiceH1 = (service: string) => `Commercial ${service} in Los Angeles`;

// Commercial HVAC hub (/commercial-hvac/): primary keyword is "commercial hvac los angeles" per
// docs/primary-keyword-selection.md, which reads as "Commercial ... in Los Angeles" rather than the
// generic audienceTitle() formula - same exception already carved out for commercialServiceTitle.
export const commercialHubTitle = () => t('Commercial HVAC Services in Los Angeles');
export const commercialHubH1 = () => 'Commercial HVAC Services for Southern California Businesses';

// Residential HVAC hub (/residential-hvac/): same exception as the commercial hub - primary keyword
// is "residential hvac los angeles", which reads as "Residential HVAC Services in Los Angeles"
// rather than the generic audienceTitle() formula.
export const residentialHubTitle = () => t('Residential HVAC Services in Los Angeles');
export const residentialHubH1 = () => 'Residential HVAC Services for Southern California Homeowners';

export const articleTitle = (question: string, includeBrand = true) => (includeBrand ? t(question) : question);
export const articleH1 = (question: string) => question;

// About, Contact, FAQ, Careers, Reviews, Financing, Accessibility, Privacy, Terms: brand suffix stays.
export const utilityTitle = (pagePurpose: string) => t(pagePurpose);

// --- Metadata ---------------------------------------------------------------------------------
type Input = { title: string; description: string; path: string };

// title must already be a full title (use the builders above); the layout adds no template.
function base({ title, description, path }: Input): Metadata {
  assertTitle(title);
  assertDescription(description);
  const url = `${siteConfig.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    // Next replaces (not merges) the layout's openGraph, so the default image is repeated here.
    openGraph: { title, description, url, siteName: BRAND, type: 'website', images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: BRAND }] },
  };
}

export const homeMetadata = (i: Input) => base(i);
export const serviceMetadata = (i: Input) => base(i);
export const serviceLocationMetadata = (i: Input) => base(i);
export const regionMetadata = (i: Input) => base(i);
export const cityMetadata = (i: Input) => base(i);
export const hubMetadata = (i: Input) => base(i);
export const articleMetadata = (i: Input) => base(i);
