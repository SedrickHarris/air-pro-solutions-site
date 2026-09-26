import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/content/site-config';

const servicesCol = [
  { href: '/ac-repair/', label: 'AC Repair' },
  { href: '/ac-installation/', label: 'AC Installation' },
  { href: '/heating-repair/', label: 'Heating Repair' },
  { href: '/ductless-mini-split/', label: 'Ductless Mini-Split' },
  { href: '/commercial-hvac/', label: 'Commercial HVAC' },
];
const company = [
  { href: '/about/', label: 'About Us' },
  { href: '/service-areas/', label: 'Service Areas' },
  { href: '/financing/', label: 'Financing' },
  { href: '/reviews/', label: 'Reviews' },
  { href: '/contact/', label: 'Contact' },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <p className="foot-brand">
              <Image src={siteConfig.logo} alt="" width={32} height={32} />
              {siteConfig.name}
            </p>
            <p>Licensed HVAC contractor serving Los Angeles and Southern California.</p>
          </div>
          <div>
            <h3>Services</h3>
            <ul>
              {servicesCol.map((c) => (
                <li key={c.href}><Link href={c.href}>{c.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Company</h3>
            <ul>
              {company.map((c) => (
                <li key={c.href}><Link href={c.href}>{c.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul>
              <li><a href={siteConfig.phoneHref}>{siteConfig.phone}</a></li>
              <li><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
              <li>{siteConfig.hours}</li>
              <li>{siteConfig.availabilityNote}</li>
              <li>CA License #{siteConfig.licenses.join(', #')}</li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>
          <span>
            <Link href="/privacy/">Privacy Policy</Link> · <Link href="/terms/">Terms</Link> · <Link href="/accessibility/">Accessibility</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
