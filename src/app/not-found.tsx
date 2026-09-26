import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { siteConfig } from '@/content/site-config';

// Static export emits this as 404.html for Cloudflare Pages.
export default function NotFound() {
  return (
    <>
      <PageHeader eyebrow="404" title="Page not found" lede="That page does not exist or has moved." />
      <section>
        <div className="wrap prose">
          <div className="cta-row">
            <Link className="btn btn-primary" href="/">Home</Link>
            <Link className="btn btn-outline" href="/services/">Services</Link>
            <Link className="btn btn-outline" href="/service-areas/">Service Areas</Link>
          </div>
          <p>
            Need help now? Call <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
