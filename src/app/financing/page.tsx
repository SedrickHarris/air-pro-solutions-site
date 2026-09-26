import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { PendingNote } from '@/components/ui/PendingNote';
import { hubMetadata } from '@/lib/seo';

export const metadata = hubMetadata({
  title: 'HVAC Financing',
  description: 'Flexible financing options for HVAC repair and replacement.', // TODO(copy): confirm once partner is set
  path: '/financing/',
});

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Financing" title="HVAC Financing" lede="Flexible financing available." />
      <section>
        <div className="wrap prose">
          <p>
            Flexible financing is available for qualifying HVAC projects. Contact us to talk through your options.
          </p>
          <PendingNote>financing partner name, logo, and terms. Do not state rates, terms, or approval claims until confirmed.</PendingNote>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/contact/">Contact us about financing</Link>
          </div>
        </div>
      </section>
    </>
  );
}
