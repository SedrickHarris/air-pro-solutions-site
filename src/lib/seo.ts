import type { Metadata } from 'next';
import { siteConfig } from '@/content/site-config';

type Input = { title: string; description: string; path: string };

// Copy rule: no em dashes in titles or descriptions.
function base({ title, description, path }: Input): Metadata {
  const url = `${siteConfig.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: siteConfig.name, type: 'website' },
  };
}

// TODO(copy): page-type specific title/description templates once copy arrives.
export const homeMetadata = (i: Input) => base(i);
export const serviceMetadata = (i: Input) => base(i);
export const serviceLocationMetadata = (i: Input) => base(i);
export const regionMetadata = (i: Input) => base(i);
export const cityMetadata = (i: Input) => base(i);
export const hubMetadata = (i: Input) => base(i);
export const articleMetadata = (i: Input) => base(i);

// Title patterns (~60 chars). Example matrix: AC Repair in Torrance, CA | Same-Day Service | Air Pro Solutions
// TODO(data): confirm "Same-Day Service" is a claim the client can back before publishing.
export const matrixTitle = (service: string, city: string) =>
  `${service} in ${city}, CA | Same-Day Service | ${siteConfig.name}`;
export const cityTitle = (city: string) => `HVAC Services in ${city}, CA | ${siteConfig.name}`;
