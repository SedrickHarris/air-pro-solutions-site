import type { Metadata } from 'next';
import { commercialPages, getCommercialPage } from '@/content/commercial';
import { PageHeader } from '@/components/ui/PageHeader';
import { PendingNote } from '@/components/ui/PendingNote';

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
  const { page } = await params;
  const p = getCommercialPage(page);
  // TODO(copy): commercial HVAC level 3 page. Stub pattern matches /services/[service]/'s unpublished stub.
  return (
    <>
      <PageHeader eyebrow="Commercial HVAC" title={p?.name ?? 'Commercial HVAC'} />
      <section>
        <div className="wrap">
          <PendingNote>full details for this page are in progress.</PendingNote>
        </div>
      </section>
    </>
  );
}
