import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { jsonLd, breadcrumbSchema, webPageSchema } from '@/lib/schema';
import { siteConfig } from '@/content/site-config';
import { PendingNote } from '@/components/ui/PendingNote';
import { hubMetadata, utilityTitle } from '@/lib/seo';

// Stub page: noindex and left out of sitemap.ts and all site links until the client supplies real content.
export const metadata = { ...hubMetadata({
  title: utilityTitle('HVAC Financing'),
  description: 'Questions about paying for HVAC repair, replacement, or installation? Contact AIRPRO SOLUTIONS and we will talk through your project and next steps.', // TODO(copy)
  path: '/financing/',
}), robots: { index: false, follow: false } };

export default function Page() {
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Financing' }];
  const url = `${siteConfig.url}/financing/`;
  const schema = [webPageSchema({ type: 'WebPage', name: 'HVAC Financing', url }), breadcrumbSchema(crumbs.map((c) => ({ name: c.name, url: c.href ? `${siteConfig.url}${c.href}` : url })))];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Breadcrumbs crumbs={crumbs} />
      <PageHeader eyebrow="Financing" title="HVAC Financing" lede="Questions about paying for your project? Contact us." />
      <section>
        <div className="wrap prose">
          <p>
            Contact us with questions about your project and how to move forward.
          </p>
          <PendingNote>financing partner name, logo, and terms.</PendingNote>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/contact/">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
