import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { PendingNote } from '@/components/ui/PendingNote';
import { hubMetadata, utilityTitle } from '@/lib/seo';

export const metadata = hubMetadata({
  title: utilityTitle('About Us'),
  description: 'Learn about Air Pro Solutions, a licensed HVAC contractor serving homes and businesses across LA County, the South Bay, Orange County, and the Inland Empire.', // TODO(copy)
  path: '/about/',
});

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="About" title="About Air Pro Solutions" lede="Heating and cooling for homes and businesses across Southern California." />
      <section>
        <div className="wrap prose">
          <h2>Our story</h2>
          <PendingNote>company story and years in business, pending client input.</PendingNote>

          <h2>Licensing</h2>
          <PendingNote>CSLB license number, pending client confirmation.</PendingNote>

          <h2>Where we work</h2>
          <p>
            Air Pro Solutions serves Los Angeles County, the South Bay, Orange County, and the Inland Empire.{' '}
            <Link href="/service-areas/">See our service areas</Link>.
          </p>

          <h2>Our team</h2>
          <PendingNote>technician photos and bios, pending real photography.</PendingNote>

          <h2>Brands we work with</h2>
          <PendingNote>manufacturer authorization logos, pending client confirmation.</PendingNote>
        </div>
      </section>
    </>
  );
}
