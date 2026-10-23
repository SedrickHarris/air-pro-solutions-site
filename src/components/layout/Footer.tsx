import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { siteConfig } from '@/content/site-config';
import { footerCities } from '@/content/footer-cities';
import { CityLink } from '@/components/ui/CityLink';
import { getService, serviceHref } from '@/content/services';

// The ten published core services (cooling, heating, then the rest). Names and hrefs come from
// services.ts so the footer cannot drift from the service pages.
const coreServiceSlugs = [
  'ac-repair', 'ac-installation', 'ac-maintenance', 'heating-repair', 'furnace-installation',
  'heat-pump-services', 'ductless-mini-split', 'ductwork', 'indoor-air-quality', 'emergency-hvac',
];
const servicesCol = [
  ...coreServiceSlugs.map((slug) => {
    const svc = getService(slug);
    if (!svc) throw new Error(`Unknown footer service slug: ${slug}`);
    return { href: serviceHref(svc.slug), label: svc.name };
  }),
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
              {footerCities.map((slug) => (
                <li key={`/service-areas/${slug}/`}><CityLink slug={slug} /></li>
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
