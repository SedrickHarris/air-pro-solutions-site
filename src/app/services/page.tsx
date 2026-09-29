import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { KeywordPills, type Pill } from '@/components/ui/KeywordPills';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { FaqList } from '@/components/sections/FaqList';
import { getService } from '@/content/services';
import { regions } from '@/content/regions';
import { servicesFaqs } from '@/content/services-faq';
import { siteConfig } from '@/content/site-config';
import { breadcrumbSchema, collectionPageSchema, faqSchema, jsonLd } from '@/lib/schema';
import { hubMetadata, servicesHubH1, servicesHubTitle, assertH1 } from '@/lib/seo';

const description =
  'Air Pro Solutions offers AC repair, installation, heating, and indoor air quality services for homes and businesses across Southern California. Schedule service.';
const h1 = servicesHubH1();
assertH1(h1);

export const metadata = hubMetadata({ title: servicesHubTitle(), description, path: '/services/' });

// Section groupings. Card copy (description, image) is read from src/content/services.ts.
const cooling = ['ac-repair', 'ac-installation', 'ac-maintenance'];
const heating = ['heating-repair', 'furnace-installation', 'heat-pump-services'];
const ductAir = ['ductwork', 'indoor-air-quality'];
// The CollectionPage lists all ten services. Ductless mini-split and emergency HVAC have no card: they surface as pills / the banner.
const allSlugs = [...cooling, ...heating, ...ductAir, 'ductless-mini-split', 'emergency-hvac'];

// TODO(data): hub-only heading variants. services.ts names differ ("AC Installation", "Furnace Installation", "Ductwork");
// pending the client's answer on whether the rename propagates to the service pages. Used for cards AND schema so they match.
const hubName: Record<string, string> = {
  'ac-installation': 'AC Installation & Replacement',
  'furnace-installation': 'Furnace Installation & Replacement',
  ductwork: 'Ductwork Services',
};
const nameFor = (slug: string) => hubName[slug] ?? getService(slug)!.name;

const to = (href: string, labels: string[]): Pill[] => labels.map((label) => ({ label, href }));

// Pills without an href have no matching page yet: they render as plain text.
const coolingPills: Pill[] = [
  { label: 'AC Replacement', href: '/ac-installation/' },
  { label: 'HVAC Repair' }, { label: 'HVAC Installation' }, { label: 'HVAC Replacement' },
  ...to('/ductless-mini-split/', ['Ductless Mini-Split Systems', 'Ductless Mini-Split Installation', 'Ductless Mini-Split Repair']),
  ...to('/heat-pump-services/', ['Heat Pump Repair', 'Heat Pump Installation', 'Heat Pump Replacement']),
];
const heatingPills: Pill[] = [
  { label: 'Furnace Repair', href: '/heating-repair/' },
  { label: 'Furnace Replacement', href: '/furnace-installation/' },
  { label: 'Heating Maintenance' }, { label: 'HVAC Maintenance' },
  ...to('/heat-pump-services/', ['Heat Pump Repair', 'Heat Pump Installation', 'Heat Pump Replacement', 'Heat Pump Maintenance']),
];
const ductPills = to('/ductwork/', ['Duct Repair', 'Duct Sealing', 'Duct Replacement', 'Duct Installation', 'Ductwork Modification', 'Air Balancing', 'Duct Insulation']);
const iaqPills = to('/indoor-air-quality/', ['Air Filtration Systems', 'Whole-Home Air Purification', 'Air Purifier Installation', 'Media Air Cleaners', 'Ventilation Services', 'Humidity Control', 'HVAC Filter Upgrades']);
const commercialPills = to('/commercial-hvac/', ['Commercial HVAC Repair', 'Commercial HVAC Installation', 'Commercial HVAC Replacement', 'Commercial HVAC Maintenance', 'Maintenance Agreements', 'Rooftop Unit Service']);
const audiencePills = to('/commercial-hvac/', ['Property Managers', 'Apartment Communities', 'Office Buildings', 'Retail Businesses', 'Restaurants', 'Warehouses']);

// TODO(data): "insured", "same-day" and "24/7" below are pending client confirmation (see docs/metadata-rules.md Section 6).
const heroProof = [
  { icon: 'shield', label: 'Licensed, bonded & insured' },
  { icon: 'clock', label: 'Same-day service typical' },
  { icon: 'building', label: 'Residential & commercial' },
  { icon: 'star', label: `${siteConfig.rating} rating, ${siteConfig.reviewCount} reviews` },
];

const trust = [
  { num: '10', label: 'HVAC services under one roof' },
  { num: `${siteConfig.rating}★`, label: `average rating, ${siteConfig.reviewCount} reviews` },
  { num: '4', label: 'SoCal regions served' },
  { num: '24/7', label: 'emergency dispatch' },
];

const quickNav = [
  { icon: 'snowflake', title: 'Cooling', body: 'AC repair, installation, replacement, maintenance, and ductless solutions.', href: '#cooling', cta: 'Explore Cooling Services' },
  { icon: 'flame', title: 'Heating', body: 'Furnace repair, installation, heat pumps, and seasonal heating maintenance.', href: '#heating', cta: 'Explore Heating Services' },
  { icon: 'air', title: 'Air Quality & Ductwork', body: 'Duct repair, sealing, filtration, purification, ventilation, and airflow solutions.', href: '#air-and-ducts', cta: 'Explore Air & Duct Services' },
  { icon: 'building', title: 'Commercial HVAC', body: 'Repair, replacement, maintenance agreements, and property-focused HVAC support.', href: '#commercial', cta: 'Explore Commercial HVAC' },
  { icon: 'alert', title: 'Emergency HVAC', body: 'Urgent HVAC service for no-cool and no-heat problems, with same-day availability when capacity allows.', href: '#emergency', cta: 'Get Emergency Help' },
];

const split = [
  { tag: 'Residential', title: 'HVAC for your home', body: 'Repairs, replacements, and maintenance plans for single-family homes, condos, and apartments.', href: '/residential-hvac/', cta: 'See residential HVAC' },
  { tag: 'Commercial', title: 'HVAC for your business', body: 'Rooftop unit service, preventive maintenance agreements, and portfolio accounts for property managers.', href: '/commercial-hvac/', cta: 'See commercial HVAC' },
];

const regionCopy: Record<string, { cities: string; cta: string }> = {
  'los-angeles-county': { cities: 'Los Angeles · Pasadena · Glendale · Burbank · Santa Monica', cta: 'Explore LA County' },
  'south-bay': { cities: 'Torrance · Redondo Beach · Manhattan Beach · Gardena · Carson', cta: 'Explore South Bay' },
  'orange-county': { cities: 'Anaheim · Irvine · Santa Ana · Huntington Beach · Costa Mesa', cta: 'Explore Orange County' },
  'inland-empire': { cities: 'Riverside · Ontario · Rancho Cucamonga · Fontana · Corona', cta: 'Explore Inland Empire' },
};

const proofStats = [
  { num: '10', label: 'Services offered' },
  { num: `${siteConfig.rating}★`, label: 'Google rating' },
  { num: String(siteConfig.reviewCount), label: 'Verified reviews' },
  { num: '4', label: 'SoCal regions covered' },
];

function ServiceCards({ slugs }: { slugs: string[] }) {
  // Avoids an empty trailing column when a row has fewer than 4 cards.
  const gridClass = slugs.length === 3 ? 'services-grid services-grid-3' : slugs.length === 2 ? 'services-grid services-grid-2' : 'services-grid';
  return (
    <div className={gridClass}>
      {slugs.map((slug) => {
        const s = getService(slug);
        if (!s) throw new Error(`Unknown service slug on /services/: ${slug}`);
        return (
          <Link key={slug} href={`/${slug}/`} className="svc-card">
            {s.image ? (
              <div className="svc-card-img">
                <Image src={s.image.src} alt={s.image.alt} width={800} height={600} sizes="(max-width: 520px) 100vw, (max-width: 920px) 50vw, 25vw" />
              </div>
            ) : (
              // TODO(design): real image replaces the pending tile
              <div className="photo-pending svc-card-img">
                <Icon name={s.icon} size={28} />
                <span className="photo-tag">Photo pending</span>
              </div>
            )}
            <div className="svc-card-body">
              <h3>{nameFor(slug)}</h3>
              <p>{s.description}</p>
              <span className="card-arrow">Learn more <Icon name="arrow" size={16} /></span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default function Page() {
  const items = allSlugs.map((slug) => ({ name: nameFor(slug), description: getService(slug)!.description, url: `${siteConfig.url}/${slug}/` }));
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Services' }];
  // The FAQ list and FAQPage JSON-LD both read servicesFaqs; service entries read the same names/descriptions as the cards.
  const schema = [
    collectionPageSchema({ name: h1, url: `${siteConfig.url}/services/`, items }),
    faqSchema(servicesFaqs),
    breadcrumbSchema(crumbs.map((c) => ({ name: c.name, url: c.href ? `${siteConfig.url}${c.href}` : `${siteConfig.url}/services/` }))),
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Breadcrumbs crumbs={crumbs} />

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1>HVAC Services for Every <em>Home and Business</em> in Southern California</h1>
            <p className="hero-lede">
              From a system that won&apos;t turn on to a full replacement, Air Pro Solutions covers cooling, heating, air
              quality, and everything in between - for houses, apartments, and commercial buildings across LA County,
              South Bay, Orange County, and the Inland Empire.
            </p>
            <div className="cta-row">
              <Link className="btn btn-primary" href="/contact/">Schedule Service</Link>
              <a className="btn btn-ghost" href={siteConfig.phoneHref}>Call {siteConfig.phone}</a>
            </div>
            <ul className="hero-proof">
              {heroProof.map((p) => (
                <li key={p.label}>
                  <span className="hero-proof-icon"><Icon name={p.icon} size={20} /></span>
                  {p.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-photo">
            <Image
              src="/images/services/services-hub/hero.webp"
              alt="Gas furnace with white PVC venting and galvanized ductwork in a garage utility area beside a water heater"
              width={1200}
              height={900}
              sizes="(max-width: 920px) 100vw, 45vw"
              priority
            />
            <span className="photo-caption photo-caption-band photo-caption-band-left photo-caption-silver">Full-service HVAC for homes and businesses · Heating, cooling, and indoor air quality</span>
          </div>
        </div>
      </section>

      <div className="trust-strip">
        <div className="wrap trust-inner">
          {trust.map((s) => (
            <div className="trust-item" key={s.num + s.label}>
              <span className="trust-num">{s.num}</span>
              <span className="trust-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <section>
        <div className="wrap">
          <p className="eyebrow">Start here</p>
          <h2>What&apos;s going on with your system?</h2>
          <p>Jump straight to the kind of service you need, or browse every service below.</p>
          <div className="decision-grid">
            {quickNav.map((c) => (
              <Link key={c.href} href={c.href} className="decision-card">
                <span className="icon-chip"><Icon name={c.icon} /></span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <span className="card-arrow">{c.cta} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="cooling" className="alt">
        <div className="wrap">
          <p className="eyebrow">Cooling</p>
          <h2>Air conditioning services</h2>
          <ServiceCards slugs={cooling} />
          <KeywordPills pills={coolingPills} label="Related cooling services" />
        </div>
      </section>

      <section id="heating">
        <div className="wrap">
          <p className="eyebrow">Heating</p>
          <h2>Heating services</h2>
          <ServiceCards slugs={heating} />
          <KeywordPills pills={heatingPills} label="Related heating services" />
        </div>
      </section>

      <section id="air-and-ducts" className="alt">
        <div className="wrap">
          <p className="eyebrow">Ductwork &amp; Indoor Air Quality</p>
          <h2>Ductwork and indoor air quality services</h2>
          <ServiceCards slugs={ductAir} />
          <KeywordPills pills={ductPills} label="Ductwork services" />
          <KeywordPills pills={iaqPills} label="Indoor air quality services" />
        </div>
      </section>

      <section id="commercial">
        <div className="wrap">
          <p className="eyebrow">Commercial HVAC</p>
          <h2>Commercial HVAC Services for Southern California Properties</h2>
          <p>
            Air Pro Solutions provides commercial HVAC repair, installation, replacement, and preventative maintenance for
            businesses and managed properties across Los Angeles County, the South Bay, Orange County, and the Inland Empire.
          </p>
          <p>
            We support property managers, facility teams, offices, retail locations, restaurants, warehouses, and
            multi-family communities with clear recommendations, dependable service, and maintenance planning built around
            comfort, system reliability, and day-to-day operations.
          </p>
          <KeywordPills pills={commercialPills} label="Commercial HVAC services" />
          <div className="cta-row">
            <Link className="btn btn-primary" href="/contact/">Request Commercial Service</Link>
            <Link className="btn btn-outline" href="/maintenance-plan/">Discuss a Maintenance Plan</Link>
          </div>
          <p className="pill-label">Who we serve</p>
          <KeywordPills pills={audiencePills} label="Who we serve" />
        </div>
      </section>

      <section id="emergency" className="final-cta">
        <div className="wrap">
          <h2>Need HVAC Help Right Now?</h2>
          <p>If your AC has stopped cooling or your heating system will not turn on, Air Pro Solutions can help with urgent HVAC service.</p>
          <div className="cta-row cta-center">
            <a className="btn btn-primary" href={siteConfig.phoneHref}>Call for Urgent HVAC Help</a>
            <Link className="btn btn-ghost" href="/contact/">Request Emergency Service</Link>
          </div>
          <p className="banner-note">Same-day availability is subject to technician availability, call time, system type, and service-area conditions.</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <p className="eyebrow">Who it&apos;s for</p>
          <h2>Built for your home or your business</h2>
        </div>
        <div className="wrap split">
          {split.map((c) => (
            <div key={c.href} className="split-card">
              <p className="eyebrow">{c.tag}</p>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <Link className="btn btn-primary" href={c.href}>{c.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <p className="eyebrow">Where we work</p>
          <h2>Every service, across four Southern California regions</h2>
          <p>Air Pro Solutions serves homes and businesses in Los Angeles County, the South Bay, Orange County, and the Inland Empire.</p>
          <div className="region-grid">
            {regions.map((r) => (
              <Link key={r.slug} href={`/service-areas/${r.slug}/`} className="region-card">
                <div className="region-card-img">
                  <Image src={r.image.src} alt={r.image.alt} width={800} height={416} sizes="(max-width: 520px) 100vw, (max-width: 920px) 50vw, 25vw" />
                </div>
                <div className="region-card-body">
                  <h3>{r.name}</h3>
                  <p>{regionCopy[r.slug].cities}</p>
                  <span className="card-arrow">{regionCopy[r.slug].cta} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="proof">
        <div className="wrap proof-grid">
          <div>
            <p className="eyebrow">Why Air Pro</p>
            <h3>One HVAC company, every service you&apos;ll ever need</h3>
            <p>
              Every technician is background-checked and factory-trained. Every job gets an itemized estimate before any
              work begins, and a written service record when it&apos;s done.
            </p>
            <Link className="btn btn-primary" href="/reviews/">Read our reviews</Link>
          </div>
          <div className="proof-stats proof-stats-2x2">
            {proofStats.map((s) => (
              <div key={s.label}>
                <span className="trust-num">{s.num}</span>
                <span className="trust-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqList faqs={servicesFaqs} title="Questions about our services" eyebrow="Direct answers" />

      <section className="final-cta">
        <div className="wrap">
          <h2>Not sure which service you need?</h2>
          <p>Tell us what&apos;s going on and we&apos;ll match you with the right service - no guesswork required.</p>
          <div className="cta-row cta-center">
            <a className="btn btn-primary" href={siteConfig.phoneHref}>Call {siteConfig.phone}</a>
            <Link className="btn btn-ghost" href="/contact/">Schedule Service</Link>
          </div>
        </div>
      </section>
    </>
  );
}
