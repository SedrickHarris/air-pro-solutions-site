import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { PendingNote } from '@/components/ui/PendingNote';
import { regions } from '@/content/regions';

// TODO(copy): Service Areas hub - noindex until real content exists.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Service Areas" title="Service Areas" lede="Air Pro Solutions serves four Southern California regions." />
      <section>
        <div className="wrap">
          <ul>
            {regions.map((r) => (
              <li key={r.slug}><Link href={`/service-areas/${r.slug}/`}>{r.name}</Link></li>
            ))}
          </ul>
          <PendingNote>a full service-area directory with city-by-city detail.</PendingNote>
        </div>
      </section>
    </>
  );
}
