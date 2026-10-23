import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { jsonLd, breadcrumbSchema, webPageSchema } from '@/lib/schema';
import { siteConfig } from '@/content/site-config';
import { PendingNote } from '@/components/ui/PendingNote';
import { hubMetadata, utilityTitle } from '@/lib/seo';

export const metadata = hubMetadata({
  title: utilityTitle('Customer Reviews'),
  description: 'Read customer reviews of AIRPRO SOLUTIONS and see what homeowners and businesses across Southern California say about our HVAC service.', // TODO(copy)
  path: '/reviews/',
});

export default function Page() {
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Reviews' }];
  const url = `${siteConfig.url}/reviews/`;
  const schema = [webPageSchema({ type: 'WebPage', name: 'Customer Reviews', url }), breadcrumbSchema(crumbs.map((c) => ({ name: c.name, url: c.href ? `${siteConfig.url}${c.href}` : url })))];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Breadcrumbs crumbs={crumbs} />
      <PageHeader eyebrow="Reviews" title="Customer Reviews" />
      <section>
        <div className="wrap prose">
          <h2>Overall rating</h2>
          <PendingNote>aggregate rating, pending verification against the live Google profile.</PendingNote>

          <h2>Review platforms</h2>
          {/* TODO(data): real Google/Yelp widget embeds; structure only for now */}
          <div className="grid-2">
            <div className="panel"><h3>Google</h3><PendingNote>review widget.</PendingNote></div>
            <div className="panel"><h3>Yelp</h3><PendingNote>review widget.</PendingNote></div>
          </div>

          <h2>Reviews by city</h2>
          {/* TODO(data): city-tagged review cards. Each must be a real review with permission; these feed matrix-page local proof. */}
          <PendingNote>city-tagged review cards, pending real reviews.</PendingNote>

          <h2>Learn about our services</h2>
          <p>
            Read how we approach <Link href="/services/ac-repair/">air conditioner repair</Link>,{' '}
            <Link href="/services/ac-installation/">AC installation</Link>, and{' '}
            <Link href="/services/heating-repair/">furnace and heating repair</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
