import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { PendingNote } from '@/components/ui/PendingNote';

// TODO(copy): restaurant-hvac audience page - noindex until real content exists.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Restaurants" title="Restaurant HVAC" />
      <section>
        <div className="wrap">
          <PendingNote>HVAC service details for restaurants and food service properties.</PendingNote>
        </div>
      </section>
    </>
  );
}
