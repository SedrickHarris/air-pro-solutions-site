import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { PendingNote } from '@/components/ui/PendingNote';

// TODO(copy): property-management-hvac audience page - noindex until real content exists.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Property Management" title="Property Management HVAC" />
      <section>
        <div className="wrap">
          <PendingNote>HVAC service details for property management portfolios.</PendingNote>
        </div>
      </section>
    </>
  );
}
