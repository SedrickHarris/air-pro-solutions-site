import { PageHeader } from '@/components/ui/PageHeader';
import { siteConfig } from '@/content/site-config';
import { hubMetadata } from '@/lib/seo';

export const metadata = hubMetadata({
  title: 'Accessibility Statement',
  description: 'Our commitment to an accessible website for everyone.',
  path: '/accessibility/',
});

// TODO(legal): standard statement. The WCAG target is a goal; do not claim conformance until audited.
export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Accessibility" title="Accessibility Statement" />
      <section>
        <div className="wrap prose">
          <p>
            Air Pro Solutions wants everyone to be able to use this website. We aim to meet the Web Content
            Accessibility Guidelines (WCAG) 2.1 Level AA and continue to work on improvements.
          </p>

          <h2>Report a problem</h2>
          <p>
            If you have trouble using any part of this site, or need information in another format, please tell us
            and we will work to help. Email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or call{' '}
            <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
