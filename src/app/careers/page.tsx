import { PageHeader } from '@/components/ui/PageHeader';
import { siteConfig } from '@/content/site-config';
import { hubMetadata, utilityTitle } from '@/lib/seo';

export const metadata = hubMetadata({
  title: utilityTitle('Careers'),
  description: 'Interested in an HVAC career? Get in touch with Air Pro Solutions to ask about opportunities with our team in Southern California.', // TODO(copy)
  path: '/careers/',
});

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Careers" title="We are hiring" />
      <section>
        <div className="wrap prose">
          {/* TODO(data): confirm which roles are open before listing any */}
          <p>
            Interested in joining Air Pro Solutions? Send us a note at{' '}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
