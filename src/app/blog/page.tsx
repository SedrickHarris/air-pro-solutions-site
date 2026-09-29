import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { PendingNote } from '@/components/ui/PendingNote';

// TODO(copy): blog hub - noindex until real posts exist.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Resources" title="Blog" />
      <section>
        <div className="wrap">
          <PendingNote>HVAC articles for Southern California homeowners and businesses.</PendingNote>
        </div>
      </section>
    </>
  );
}
