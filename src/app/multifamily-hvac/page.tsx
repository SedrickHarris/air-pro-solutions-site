import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { PendingNote } from '@/components/ui/PendingNote';

// TODO(copy): multifamily-hvac audience page - noindex until real content exists.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Multifamily" title="Multifamily HVAC" />
      <section>
        <div className="wrap">
          <PendingNote>HVAC service details for multifamily properties and HOAs.</PendingNote>
        </div>
      </section>
    </>
  );
}
