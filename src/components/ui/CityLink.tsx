import Link from 'next/link';
import type { ReactNode } from 'react';
import { getCity } from '@/content/cities';

// Text link to a live city page, built from the city slug. Link text defaults to the city name; pass children when
// the visible text differs (for example "Torrance page"). Throws at build time if the slug is not a live city.
export function CityLink({ slug, children }: { slug: string; children?: ReactNode }) {
  const city = getCity(slug);
  if (!city?.page) throw new Error(`CityLink: "${slug}" is not a live city`);
  return <Link href={`/service-areas/${city.slug}/`}>{children ?? city.name}</Link>;
}
