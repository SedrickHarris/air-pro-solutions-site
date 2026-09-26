import Link from 'next/link';
import { siteConfig } from '@/content/site-config';

export function StickyMobileBar() {
  return (
    <div className="sticky-mobile">
      <a className="btn btn-ghost" href={siteConfig.phoneHref}>Call Now</a>
      <Link className="btn btn-primary" href="/contact/">Schedule Service</Link>
    </div>
  );
}
