import type { Metadata } from 'next';
import { getService, services } from '@/content/services';

// Static export: only these params are generated.
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

// Unpublished (second/third level) service pages build as noindex stubs until they have real content.
export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service } = await params;
  return getService(service)?.published ? {} : { robots: { index: false, follow: false } };
}

export default async function Page({ params }: { params: Promise<{ service: string }> }) {
  const p = await params;
  // TODO(copy): service page at /[service]/
  return <div>{/* TODO: {JSON.stringify(p)} */}</div>;
}
