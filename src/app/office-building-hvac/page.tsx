import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { PendingNote } from '@/components/ui/PendingNote';

// TODO(copy): office-building-hvac audience page - noindex until real content exists.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Office Buildings" title="Office Building HVAC" />
      <section>
        <div className="wrap">
          <PendingNote>HVAC service details for office buildings.</PendingNote>
        </div>
      </section>
    </>
  );
}
