import { PageHeader } from '@/components/ui/PageHeader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { jsonLd, breadcrumbSchema, webPageSchema } from '@/lib/schema';
import { siteConfig } from '@/content/site-config';
import { hubMetadata, utilityTitle } from '@/lib/seo';

export const metadata = hubMetadata({
  title: utilityTitle('Careers'),
  description: 'Interested in an HVAC career? Get in touch with AIRPRO SOLUTIONS to ask about opportunities with our team in Southern California.', // TODO(copy)
  path: '/careers/',
});

export default function Page() {
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Careers' }];
  const url = `${siteConfig.url}/careers/`;
  const schema = [webPageSchema({ type: 'WebPage', name: 'We are hiring', url }), breadcrumbSchema(crumbs.map((c) => ({ name: c.name, url: c.href ? `${siteConfig.url}${c.href}` : url })))];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Breadcrumbs crumbs={crumbs} />
      <PageHeader eyebrow="Careers" title="We are hiring" />
      <section>
        <div className="wrap prose">
          {/* TODO(data): confirm which roles are open before listing any */}
          <p>
            Interested in joining AIRPRO SOLUTIONS? Send us a note at{' '}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
