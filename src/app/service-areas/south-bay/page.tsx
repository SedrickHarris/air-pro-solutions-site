import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { PendingNote } from '@/components/ui/PendingNote';
import { getRegion } from '@/content/regions';

// TODO(copy): south-bay regional hub - noindex until real content exists.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Page() {
  const region = getRegion('south-bay');
  return (
    <>
      <PageHeader eyebrow="Service Areas" title={region?.name ?? 'South Bay'} />
      <section>
        <div className="wrap">
          <PendingNote>city-by-city HVAC service details for the {region?.name ?? 'South Bay'} region, including Torrance.</PendingNote>
        </div>
      </section>
    </>
  );
}
