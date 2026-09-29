import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/content/site-config';

// The kit has no transparent horizontal lockup, so the header pairs the transparent mark with a text wordmark.
// "Resources" was removed from primary nav; the FAQ page it pointed to (/faq/) is still reachable
// through in-page links elsewhere on the site.
const nav = [
  { href: '/services/', label: 'Services' },
  { href: '/residential-hvac/', label: 'Residential' },
  { href: '/commercial-hvac/', label: 'Commercial' },
  { href: '/service-areas/', label: 'Service Areas' },
  { href: '/about/', label: 'About' },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="logo">
          <Image src={siteConfig.logo} alt="" width={36} height={36} priority />
          {siteConfig.name}
        </Link>
        <nav className="nav" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
        </nav>
        <div className="header-cta">
          <a className="header-phone" href={siteConfig.phoneHref}>
            <span>Call Now</span>
            {siteConfig.phone}
          </a>
          <Link className="btn btn-primary" href="/contact/">Schedule Service</Link>
        </div>
      </div>
    </header>
  );
}
