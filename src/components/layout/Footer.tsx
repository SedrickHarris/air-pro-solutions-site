import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { siteConfig } from '@/content/site-config';
import { getCity } from '@/content/cities';

const servicesCol = [
  { href: '/services/ac-repair/', label: 'AC Repair' },
  { href: '/services/ac-installation/', label: 'AC Installation' },
  { href: '/services/heating-repair/', label: 'Heating Repair' },
  { href: '/services/ductless-mini-split/', label: 'Ductless Mini-Split' },
  { href: '/residential-hvac/', label: 'Residential HVAC' },
  { href: '/commercial-hvac/', label: 'Commercial HVAC' },
];
const company = [
  { href: '/about/', label: 'About Us' },
  { href: '/service-areas/', label: 'Service Areas' },
  { href: '/financing/', label: 'Financing' },
  { href: '/reviews/', label: 'Reviews' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/careers/', label: 'Careers' },
  { href: '/contact/', label: 'Contact' },
];

// Two wave 1 cities per region; a city is listed only when it has a live page.
const areaSlugs = ['los-angeles', 'long-beach', 'torrance', 'redondo-beach', 'irvine', 'anaheim', 'riverside', 'ontario'];
const areas = areaSlugs.flatMap((slug) => {
  const c = getCity(slug);
  return c?.page ? [{ href: `/service-areas/${c.slug}/`, label: c.name }] : [];
});

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
            <h3>Areas We Serve</h3>
            <ul>
              {areas.map((c) => (
                <li key={c.href}><Link href={c.href}>{c.label}</Link></li>
              ))}
              <li><Link href="/service-areas/">All service areas</Link></li>
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul>
              <li>
                <a className="btn btn-ghost footer-phone-btn" href={siteConfig.phoneHref}>
                  <Icon name="phone" size={16} />
                  {siteConfig.phone}
                </a>
              </li>
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
