import Link from 'next/link';
import { siteConfig } from '@/content/site-config';
import { Icon } from '@/components/ui/Icon';

const proof = [
  { label: 'Licensed & insured', href: undefined },
  { label: 'Residential & commercial', href: undefined },
  { label: 'Financing available', href: '/financing/' },
  { label: 'Serving all of SoCal', href: undefined },
];

export function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <h1>
            HVAC repair, installation &amp; maintenance across <em>Los Angeles</em> and Southern California
          </h1>
          <p className="hero-lede">
            Air Pro Solutions helps homeowners, property managers, and businesses with reliable air conditioning,
            heating, and commercial HVAC service throughout LA County, the South Bay, Orange County, and the Inland
            Empire.
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/contact/">Schedule HVAC Service</Link>
            <a className="btn btn-ghost" href={siteConfig.phoneHref}>Call {siteConfig.phone}</a>
          </div>
          <ul className="hero-proof">
            {proof.map((p) => (
              <li key={p.label}>
                <Icon name="check" size={16} />
                {p.href ? <Link href={p.href}>{p.label}</Link> : p.label}
              </li>
            ))}
          </ul>
        </div>
        {/* TODO(design): replace with real photography when available */}
        <div className="photo-pending hero-photo">
          <Icon name="snowflake" size={40} />
          <span className="photo-tag">Photo pending</span>
          <span className="photo-caption">HVAC service across Southern California</span>
        </div>
      </div>
    </section>
  );
}
