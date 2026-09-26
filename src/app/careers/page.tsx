import { PageHeader } from '@/components/ui/PageHeader';
import { siteConfig } from '@/content/site-config';
import { hubMetadata } from '@/lib/seo';

export const metadata = hubMetadata({
  title: 'Careers',
  description: 'Interested in working with Air Pro Solutions? Get in touch.', // TODO(copy)
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
