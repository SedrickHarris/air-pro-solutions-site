import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { getService } from '@/content/services';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { DecisionGrid } from '@/components/sections/DecisionGrid';
import { ServicesGrid, type Card } from '@/components/sections/ServicesGrid';
import { ProcessList } from '@/components/sections/ProcessList';
import { CityCardsRow } from '@/components/sections/CityCardsRow';
import { Proof } from '@/components/sections/Proof';
import { FaqList } from '@/components/sections/FaqList';
import { FinalCta } from '@/components/sections/FinalCta';
import { regions } from '@/content/regions';
import { siteConfig } from '@/content/site-config';
import {
  commercialHero,
  commercialTrustCopy,
  propertyTypes,
  whyUs,
  commercialServices,
  processSteps,
  regionCopy,
  proof,
  commercialFaqs,
  finalCta,
} from '@/content/commercial-hvac';
import { breadcrumbSchema, faqSchema, jsonLd, serviceSchema } from '@/lib/schema';
import { commercialHubTitle, commercialHubH1, assertH1, hubMetadata } from '@/lib/seo';

export const metadata = hubMetadata({
  title: commercialHubTitle(),
  description:
    'Commercial HVAC service for offices, retail, multifamily, and industrial properties across Los Angeles and Southern California. Request a commercial quote.',
  path: '/commercial-hvac/',
});

// Renders "{h1 text}" with the emphasis substring wrapped in the amber <em> hero treatment.
function HeroHeading({ h1, emphasis }: { h1: string; emphasis: string }) {
  const idx = h1.indexOf(emphasis);
  if (idx === -1) return <h1>{h1}</h1>;
  return (
    <h1>
      {h1.slice(0, idx)}
      <em>{emphasis}</em>
      {h1.slice(idx + emphasis.length)}
    </h1>
  );
}

export default function Page() {
  const h1 = commercialHubH1();
  assertH1(h1);

  const url = `${siteConfig.url}/commercial-hvac/`;
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Commercial HVAC' }];

  const serviceCards: Card[] = commercialServices.map((s) => ({ href: s.href, name: s.name, description: s.body, icon: s.icon, image: s.image ?? getService(s.slug)?.image }));

  const schema = [
    serviceSchema({
      name: 'Commercial HVAC Services',
      description: 'From a single storefront to a multi-site portfolio, AIRPRO SOLUTIONS services the buildings your business depends on.',
      url,
      audience: { type: 'BusinessAudience', audienceType: 'Property managers, facilities managers, and commercial businesses' },
      areaServed: regions.map((r) => ({ name: `${r.name}, CA` })),
      offers: commercialServices.map((s) => s.name),
    }),
    breadcrumbSchema(crumbs.map((c) => ({ name: c.name, url: c.href ? `${siteConfig.url}${c.href}` : url }))),
    faqSchema(commercialFaqs),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Breadcrumbs crumbs={crumbs} />

      <section className="hero" style={{ paddingBottom: 44 }}>
        <div className="wrap hero-grid">
          <div>
            <HeroHeading h1={h1} emphasis={commercialHero.h1Emphasis} />
            <p className="hero-lede">{commercialHero.lede}</p>
            <div className="cta-row">
              <Link className="btn btn-primary" href={commercialHero.primaryCta.href}>{commercialHero.primaryCta.label}</Link>
              <a className="btn btn-ghost" href={siteConfig.phoneHref}>Call {siteConfig.phone}</a>
            </div>
            <ul className="hero-proof hero-proof-2x2">
              {commercialHero.proof.map((p) => (
                <li key={p.label}>
                  <span className="hero-proof-icon"><Icon name={p.icon} size={20} /></span>
                  {p.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-photo">
            <Image src={commercialHero.image.src} alt={commercialHero.image.alt} width={1200} height={900} sizes="(max-width: 920px) 100vw, 45vw" priority />
            <span className="photo-caption photo-caption-band photo-caption-silver">
              <strong>{commercialHero.photoCaption.title}</strong> {commercialHero.photoCaption.detail}
            </span>
          </div>
        </div>
      </section>

      <TrustStrip
        stats={[
          commercialTrustCopy.emergency,
          { num: `${siteConfig.rating}★`, label: `average rating, ${siteConfig.reviewCount} reviews` },
          { num: String(regions.length), label: 'SoCal regions served' },
          commercialTrustCopy.license,
        ]}
      />

      <DecisionGrid
        cards={propertyTypes}
        eyebrow="Who we serve"
        title="Commercial HVAC for every property type"
        intro="From a single storefront to a multi-site portfolio, AIRPRO SOLUTIONS services the buildings your business depends on."
      />

      <DecisionGrid
        cards={whyUs}
        eyebrow="Why businesses choose us"
        title="Built for facility teams and property managers"
        alt
      />

      <ServicesGrid
        cards={serviceCards}
        eyebrow="Core commercial services"
        title="Everything your properties need, one call away"
        columns={3}
        moreLinks={[
          { text: 'Heating repair', href: '/services/heating-repair/' },
          { text: 'Furnace installation', href: '/services/furnace-installation/' },
          { text: 'Ductless mini-split systems', href: '/services/ductless-mini-split/' },
          { text: 'Ductwork and airflow', href: '/services/ductwork/' },
          { text: 'Indoor air quality', href: '/services/indoor-air-quality/' },
        ]}
      />

      <ProcessList
        steps={processSteps}
        eyebrow="How it works"
        title="Getting started with commercial service"
        columns={4}
        alt
      />

      <section>
        <div className="wrap">
          <p className="eyebrow">Where we work</p>
          <h2>Commercial HVAC service across Southern California</h2>
          {/* TODO(claims): "we likely still cover it" is an unconfirmed service-area statement. */}
          <p>
            AIRPRO SOLUTIONS services commercial and multifamily properties across four regions. Managing a
            portfolio outside these areas? Call us - we likely still cover it.
          </p>
          <div className="region-grid">
            {regions.map((r) => (
              <Link key={r.slug} href={`/service-areas/${r.slug}/`} className="region-card">
                <div className="region-card-img">
                  <Image src={r.image.src} alt={r.image.alt} width={800} height={416} sizes="(max-width: 520px) 100vw, (max-width: 920px) 50vw, 25vw" />
                </div>
                <div className="region-card-body">
                  <h3>{r.name}</h3>
                  <p>{regionCopy[r.slug].cities}</p>
                  <span className="card-arrow">{regionCopy[r.slug].cta} <Icon name="arrow" size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cities whose region hub note speaks to commercial or multifamily property; descriptions are those hub notes. */}
      <CityCardsRow
        slugs={['el-segundo', 'culver-city', 'torrance', 'santa-monica']}
        expected={4}
        eyebrow="Service areas"
        title="Commercial HVAC by city"
      />

      <Proof
        eyebrow={proof.eyebrow}
        heading={proof.heading}
        body={proof.body}
        ctaLabel={proof.ctaLabel}
        ctaHref={proof.ctaHref}
        stats={[
          // TODO(claims): 24/7 emergency dispatch is unconfirmed, see docs/metadata-rules.md section 6.
          { num: '24/7', label: 'Emergency dispatch' },
          { num: `${siteConfig.rating}★`, label: 'Google rating' },
          { num: String(siteConfig.reviewCount), label: 'Google reviews' },
          { num: String(regions.length), label: 'SoCal regions covered' },
        ]}
      />

      <FaqList
        faqs={commercialFaqs}
        eyebrow="Direct answers"
        title="Commercial HVAC questions property managers ask"
        firstOpen
      />

      <FinalCta
        title={finalCta.title}
        body={finalCta.body}
        ghostLabel={finalCta.ghostLabel}
        ghostHref={finalCta.ghostHref}
      />
    </>
  );
}
