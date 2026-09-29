import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { DecisionGrid } from '@/components/sections/DecisionGrid';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { ProcessList } from '@/components/sections/ProcessList';
import { RebateStrip } from '@/components/sections/RebateStrip';
import { RegionGrid } from '@/components/sections/RegionGrid';
import { Proof } from '@/components/sections/Proof';
import { FaqList } from '@/components/sections/FaqList';
import { FinalCta } from '@/components/sections/FinalCta';
import { regions } from '@/content/regions';
import { residentialHub } from '@/content/residential-hvac';
import { breadcrumbSchema, faqSchema, jsonLd, serviceSchema } from '@/lib/schema';
import { hubMetadata, residentialHubTitle, residentialHubH1, assertH1 } from '@/lib/seo';
import { siteConfig } from '@/content/site-config';

export const metadata = hubMetadata({
  title: residentialHubTitle(),
  description: residentialHub.description,
  path: residentialHub.path,
});

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
  const h1 = residentialHubH1();
  assertH1(h1);

  const url = `${siteConfig.url}${residentialHub.path}`;
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Residential HVAC' }];

  // RULE: every string here is rendered on the page.
  const schema = [
    serviceSchema({
      name: 'Residential HVAC Services',
      description: residentialHub.intro,
      url,
      audience: { type: 'PeopleAudience', audienceType: 'Homeowners' },
      areaServed: regions.map((r) => ({ name: r.name })),
      offers: residentialHub.services.items.map((i) => i.name),
    }),
    breadcrumbSchema(crumbs.map((c) => ({ name: c.name, url: c.href ? `${siteConfig.url}${c.href}` : url }))),
    faqSchema(residentialHub.faqs),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Breadcrumbs crumbs={crumbs} />

      <section className="hero" style={{ paddingBottom: 44 }}>
        <div className="wrap hero-grid">
          <div>
            <HeroHeading h1={h1} emphasis="Southern California" />
            <p className="hero-lede">{residentialHub.intro}</p>
            <div className="cta-row">
              <Link className="btn btn-primary" href={residentialHub.hero.primaryCta.href}>{residentialHub.hero.primaryCta.label}</Link>
              <a className="btn btn-ghost" href={residentialHub.hero.phoneCta.href}>{residentialHub.hero.phoneCta.label}</a>
            </div>
            <ul className="hero-proof hero-proof-2x2">
              {residentialHub.hero.proof.map((p) => (
                <li key={p.text}>
                  <span className="hero-proof-icon"><Icon name={p.icon} size={20} /></span>
                  {p.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-photo">
            <Image
              src={residentialHub.hero.photo.src}
              alt={residentialHub.hero.photo.alt}
              width={1200}
              height={900}
              sizes="(max-width: 920px) 100vw, 45vw"
              priority
            />
            <span className="photo-caption photo-caption-band photo-caption-silver">
              <span className="cap-title"><strong>{residentialHub.hero.photo.captionTitle}</strong></span>
              {residentialHub.hero.photo.captionBody}
            </span>
          </div>
        </div>
      </section>

      <TrustStrip stats={residentialHub.trust} />

      <DecisionGrid
        cards={residentialHub.decision.cards}
        eyebrow={residentialHub.decision.eyebrow}
        title={residentialHub.decision.heading}
        intro={residentialHub.decision.lede}
      />

      <DecisionGrid
        cards={residentialHub.why.cards}
        eyebrow={residentialHub.why.eyebrow}
        title={residentialHub.why.heading}
        alt
      />

      <ServicesGrid
        cards={residentialHub.services.items}
        eyebrow={residentialHub.services.eyebrow}
        title={residentialHub.services.heading}
      />

      <ProcessList
        steps={residentialHub.process.steps}
        eyebrow={residentialHub.process.eyebrow}
        title={residentialHub.process.heading}
        alt
      />

      <RebateStrip />

      <RegionGrid
        eyebrow={residentialHub.areas.eyebrow}
        title={residentialHub.areas.heading}
        intro={residentialHub.areas.intro}
      />

      <Proof
        eyebrow={residentialHub.proof.eyebrow}
        heading={residentialHub.proof.heading}
        body={residentialHub.proof.body}
        ctaLabel={residentialHub.proof.ctaLabel}
        ctaHref={residentialHub.proof.ctaHref}
        stats={residentialHub.proof.stats}
      />

      <FaqList
        faqs={residentialHub.faqs}
        eyebrow={residentialHub.faqEyebrow}
        title={residentialHub.faqHeading}
        firstOpen
      />

      <FinalCta
        title={residentialHub.finalCta.heading}
        body={residentialHub.finalCta.body}
        primaryLabel={residentialHub.finalCta.primaryLabel}
        ghostLabel={residentialHub.finalCta.secondaryLabel}
        ghostHref={residentialHub.finalCta.secondaryHref}
      />
    </>
  );
}
