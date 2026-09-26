import type { Metadata } from 'next';
import { commercialPages, getCommercialPage } from '@/content/commercial';

// Level 3 pages at /commercial-hvac/[page]/. Static export: only these params are generated.
export const dynamicParams = false;
export function generateStaticParams() {
  return commercialPages.map((p) => ({ page: p.slug }));
}

// Unpublished pages build as noindex stubs until they have real content.
export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  return getCommercialPage(page)?.published ? {} : { robots: { index: false, follow: false } };
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const p = await params;
  // TODO(copy): commercial HVAC level 3 page
  return <div>{/* TODO: {JSON.stringify(p)} */}</div>;
}
