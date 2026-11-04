import Link from 'next/link';
import { siteConfig } from '@/content/site-config';

export function StickyMobileBar() {
  return (
    <nav className="sticky-mobile" aria-label="Call or schedule service">
      <a className="btn btn-ghost" href={siteConfig.phoneHref}>Call Now</a>
      <Link className="btn btn-primary" href="/contact/">Schedule Service</Link>
    </nav>
  );
}
