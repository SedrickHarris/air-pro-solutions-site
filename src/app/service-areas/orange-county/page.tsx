import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { PendingNote } from '@/components/ui/PendingNote';
import { getRegion } from '@/content/regions';

// TODO(copy): orange-county regional hub - noindex until real content exists.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Page() {
  const region = getRegion('orange-county');
  return (
    <>
      <PageHeader eyebrow="Service Areas" title={region?.name ?? 'Orange County'} />
      <section>
        <div className="wrap">
          <PendingNote>city-by-city HVAC service details for the {region?.name ?? 'Orange County'} region.</PendingNote>
        </div>
      </section>
    </>
  );
}
