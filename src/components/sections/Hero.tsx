import Image from 'next/image';
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
        {/* 1200x900 WebP made from public/images/homepage/hero/ (2896x2172 original). Not a job photo: no job caption. */}
        <div className="hero-photo">
          <Image
            src="/images/homepage/hero.webp"
            alt="Outdoor AC condenser beside a stucco home with palm and succulent landscaping"
            width={1200}
            height={900}
            sizes="(max-width: 920px) 100vw, 45vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
