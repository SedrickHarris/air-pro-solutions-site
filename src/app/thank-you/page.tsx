import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { ThankYouEvent } from '@/components/sections/ThankYouEvent';
import { siteConfig } from '@/content/site-config';

// Conversion-event page: must stay noindex and out of the sitemap.
export const metadata: Metadata = {
  title: 'Thank You',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <ThankYouEvent />
      <PageHeader eyebrow="Request received" title="Thank you" lede="We received your request and will be in touch." />
      <section>
        <div className="wrap prose">
          {/* TODO(data): confirm response-time wording with the client before adding any promise */}
          <p>
            Need help sooner? Call us at <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>.
          </p>
          <div className="cta-row">
            <Link className="btn btn-outline" href="/">Back to home</Link>
          </div>
        </div>
      </section>
    </>
  );
}
