import { PageHeader } from '@/components/ui/PageHeader';
import { siteConfig } from '@/content/site-config';
import { hubMetadata, utilityTitle } from '@/lib/seo';

export const metadata = hubMetadata({
  title: utilityTitle('Accessibility Statement'),
  description: 'Air Pro Solutions is committed to an accessible website. Read our accessibility statement or contact us to report a problem or request help.',
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
