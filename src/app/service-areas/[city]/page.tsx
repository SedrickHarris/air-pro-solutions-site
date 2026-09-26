import type { Metadata } from 'next';
import { cities, getCity } from '@/content/cities';

// Static export: only these params are generated.
export const dynamicParams = false;
export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

// Wave 2 cities build as noindex stubs until they have real local content.
export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  return getCity(city)?.wave === 1 ? {} : { robots: { index: false, follow: false } };
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const p = await params;
  // TODO(copy): city page at /service-areas/[city]-ca/
  return <div>{/* TODO: {JSON.stringify(p)} */}</div>;
}
