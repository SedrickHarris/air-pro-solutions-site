import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { jsonLd, breadcrumbSchema, webPageSchema } from '@/lib/schema';
import { siteConfig } from '@/content/site-config';
import { PendingNote } from '@/components/ui/PendingNote';
import { hubMetadata, utilityTitle } from '@/lib/seo';

export const metadata = hubMetadata({
  title: utilityTitle('About Us'),
  description: 'Learn about AIRPRO SOLUTIONS, a licensed HVAC contractor serving homes and businesses across LA County, the South Bay, Orange County, and the Inland Empire.', // TODO(copy)
  path: '/about/',
});

export default function Page() {
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'About Us' }];
  const url = `${siteConfig.url}/about/`;
  const schema = [webPageSchema({ type: 'AboutPage', name: 'About AIRPRO SOLUTIONS', url }), breadcrumbSchema(crumbs.map((c) => ({ name: c.name, url: c.href ? `${siteConfig.url}${c.href}` : url })))];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Breadcrumbs crumbs={crumbs} />
      <PageHeader eyebrow="About" title="About AIRPRO SOLUTIONS" lede="Heating and cooling for homes and businesses across Southern California." />
      <section>
        <div className="wrap prose">
          <h2>Our story</h2>
          <PendingNote>company story and years in business, pending client input.</PendingNote>

          <h2>Licensing</h2>
          <PendingNote>CSLB license number, pending client confirmation.</PendingNote>

          <h2>What we do</h2>
          <p>
            AIRPRO SOLUTIONS handles <Link href="/services/ac-repair/">AC repair</Link>,{' '}
            <Link href="/services/ac-installation/">new AC installation and replacement</Link>, and{' '}
            <Link href="/services/heating-repair/">heating repair</Link> for homes and businesses.
          </p>

          <h2>Where we work</h2>
          <p>
            AIRPRO SOLUTIONS serves Los Angeles County, the South Bay, Orange County, and the Inland Empire.{' '}
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
