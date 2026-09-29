import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/content/site-config';
import { orangeCountyHub, orangeCountyServiceCards } from '@/content/orange-county';
import { renderBold } from '@/lib/markdown';
import { Icon } from '@/components/ui/Icon';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { AnswerBlock } from '@/components/sections/AnswerBlock';
import { DataTable } from '@/components/sections/DataTable';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { RebateCards } from '@/components/sections/RebateCards';
import { Proof } from '@/components/sections/Proof';
import { FaqList } from '@/components/sections/FaqList';
import { FinalCta } from '@/components/sections/FinalCta';
import { breadcrumbSchema, faqSchema, jsonLd, serviceSchema } from '@/lib/schema';
import { regionMetadata, regionTitle, regionH1, assertH1 } from '@/lib/seo';

export const metadata: Metadata = regionMetadata({
  title: regionTitle('Orange County'),
  description: orangeCountyHub.description,
  path: orangeCountyHub.path,
});

// Renders "{h1 text}" with the region name substring wrapped in the amber <em> hero treatment,
// same pattern as the LA County and South Bay hubs.
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
  const h1 = regionH1('Orange County');
  assertH1(h1);

  const url = `${siteConfig.url}${orangeCountyHub.path}`;
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Service Areas', href: '/service-areas/' },
    { name: 'Orange County' },
  ];

  const serviceCards = orangeCountyServiceCards();
  const offers = serviceCards.slice(0, 5).map((c) => c.name);

  const schema = [
    serviceSchema({
      name: h1,
      description: `${orangeCountyHub.answer.lead}${orangeCountyHub.answer.body}`,
      url,
      serviceType: 'HVAC Services',
      areaServedCities: orangeCountyHub.cityNames.map((name) => ({ name, containedInPlace: 'Orange County, CA' })),
      offers,
    }),
    breadcrumbSchema(crumbs.map((c) => ({ name: c.name, url: c.href ? `${siteConfig.url}${c.href}` : url }))),
    faqSchema(orangeCountyHub.faqs),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Breadcrumbs crumbs={crumbs} />

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <HeroHeading h1={h1} emphasis="Orange County" />
            <p className="hero-lede">{orangeCountyHub.hero.lede}</p>
            <div className="cta-row">
              <Link className="btn btn-primary" href="/contact/">Schedule Service</Link>
              <a className="btn btn-ghost" href={siteConfig.phoneHref}>Call {siteConfig.phone}</a>
            </div>
            <ul className="hero-proof hero-proof-2x2">
              {orangeCountyHub.hero.proof.map((p) => (
                <li key={p.text}>
                  <span className="hero-proof-icon"><Icon name={p.icon} size={20} /></span>
                  {p.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="photo-pending hero-photo">
            <Icon name="pin" size={32} />
            <span className="photo-tag">Photo pending</span>
            <span className="photo-caption photo-caption-band photo-caption-silver">
              <strong>{orangeCountyHub.hero.photoCaptionTitle}</strong> {orangeCountyHub.hero.photoCaptionBody}
            </span>
          </div>
        </div>
      </section>

      <TrustStrip stats={orangeCountyHub.trust} />

      <AnswerBlock lead={orangeCountyHub.answer.lead} body={orangeCountyHub.answer.body} />

      <section>
        <div className="wrap">
          <p className="eyebrow">{orangeCountyHub.climate.eyebrow}</p>
          <h2>{orangeCountyHub.climate.title}</h2>
          <ul className="pill-list">
            {orangeCountyHub.climate.facts.map((f) => (
              <li key={f} className="pill">{f}</li>
            ))}
          </ul>
          <div className="local-grid" style={{ marginTop: '1.25rem' }}>
            <div className="local-copy">
              {orangeCountyHub.climate.paragraphs.map((p, i) => (
                <p key={i}>{renderBold(p)}</p>
              ))}
            </div>
            <div className="nbhd-card">
              <h3>{orangeCountyHub.climate.cardTitle}</h3>
              {orangeCountyHub.climate.groups.map((g) => (
                <div key={g.label}>
                  <p className="grp-label">{g.label}</p>
                  <div className="nbhd-list grp">
                    {g.cities.map((city) => (
                      <span key={city}>{city}</span>
                    ))}
                  </div>
                </div>
              ))}
              <p style={{ marginTop: '12px', fontSize: '0.88rem', color: 'var(--ink-soft)' }}>{renderBold(orangeCountyHub.climate.gettingAround)}</p>
              <div className="zip">{orangeCountyHub.climate.source}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <p className="eyebrow">{orangeCountyHub.housing.eyebrow}</p>
          <h2>{orangeCountyHub.housing.title}</h2>
          <DataTable columns={orangeCountyHub.housing.columns} rows={orangeCountyHub.housing.rows} note={orangeCountyHub.housing.note} />
          <div className="local-copy" style={{ marginTop: '1.5rem' }}>
            {orangeCountyHub.housing.paragraphs.map((p, i) => (
              <p key={i}>{renderBold(p)}</p>
            ))}
            <p className="local-links">{orangeCountyHub.housing.pending}</p>
          </div>
        </div>
      </section>

      <ServicesGrid cards={serviceCards} eyebrow={orangeCountyHub.services.eyebrow} title={orangeCountyHub.services.title} columns={3} />

      <section className="alt">
        <div className="wrap">
          <p className="eyebrow">{orangeCountyHub.split.eyebrow}</p>
          <h2>{orangeCountyHub.split.title}</h2>
          <div className="split">
            {[orangeCountyHub.split.residential, orangeCountyHub.split.commercial].map((c) => (
              <div className="split-card" key={c.href}>
                <p className="eyebrow">{c.tag}</p>
                <h3 style={{ margin: 0 }}>{c.title}</h3>
                <p style={c.tag === 'Commercial' ? { maxWidth: '48ch' } : undefined}>{c.body}</p>
                <ul className="tag-list">
                  {c.chips.map((chip) => (
                    <li key={chip}>{chip}</li>
                  ))}
                </ul>
                <Link className="btn btn-primary" href={c.href}>{c.ctaLabel}</Link>
              </div>
            ))}
          </div>
          <div className="local-copy" style={{ marginTop: '1.5rem' }}>
            {orangeCountyHub.split.paragraphs.map((p, i) => (
              <p key={i}>{renderBold(p)}</p>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <p className="eyebrow">{orangeCountyHub.permits.eyebrow}</p>
          <h2>{orangeCountyHub.permits.title}</h2>
          <p className="compare-intro">{orangeCountyHub.permits.intro}</p>
          <DataTable columns={orangeCountyHub.permits.columns} rows={orangeCountyHub.permits.rows} note={orangeCountyHub.permits.note} />
          <div className="local-copy" style={{ marginTop: '1.5rem' }}>
            {orangeCountyHub.permits.paragraphs.map((p, i) => (
              <p key={i}>{renderBold(p)}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <p className="eyebrow">{orangeCountyHub.placement.eyebrow}</p>
          <h2>{orangeCountyHub.placement.title}</h2>
          <DataTable columns={orangeCountyHub.placement.columns} rows={orangeCountyHub.placement.rows} note={orangeCountyHub.placement.note} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <p className="eyebrow">{orangeCountyHub.rebates.eyebrow}</p>
          <h2>{orangeCountyHub.rebates.title}</h2>
          <p>{orangeCountyHub.rebates.intro}</p>
          <RebateCards cards={orangeCountyHub.rebates.cards} />
          <div className="local-grid" style={{ marginTop: '2rem' }}>
            <div className="local-copy">
              {orangeCountyHub.rebates.copy.map((p, i) => (
                <p key={i}>{renderBold(p)}</p>
              ))}
            </div>
            <div className="nbhd-card">
              <h3>{orangeCountyHub.rebates.utilityCardTitle}</h3>
              <div className="nbhd-list">
                {orangeCountyHub.rebates.utilities.map((u) => (
                  <span key={u}>{u}</span>
                ))}
              </div>
              <div className="zip">{renderBold(orangeCountyHub.rebates.note)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <p className="eyebrow">{orangeCountyHub.cities.eyebrow}</p>
          <h2>{orangeCountyHub.cities.title}</h2>
          <p>
            Individual Orange County city pages are coming. For now, browse{' '}
            <Link href="/service-areas/">all service areas</Link>.
          </p>
          <div className="services-grid">
            {orangeCountyHub.cities.items.map((c) => (
              <div className="svc-card" key={c.name}>
                <div className="photo-pending svc-card-img">
                  <Icon name="pin" size={28} />
                  <span className="photo-tag">Photo pending</span>
                </div>
                <div className="svc-card-body">
                  <h3>{c.name}</h3>
                  <p>{c.note}</p>
                  <p style={{ fontSize: '0.85rem' }}>{renderBold(`**Areas:** ${c.areas}`)}</p>
                  <p style={{ fontSize: '0.85rem' }}>{renderBold(`**Utility:** ${c.utility}`)}</p>
                  <p style={{ fontSize: '0.85rem' }}>{renderBold(`**ZIP codes:** ${c.zips}`)}</p>
                  {c.pending && <p style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', fontStyle: 'italic' }}>{c.pending}</p>}
                  <span className="card-soon">City page coming soon</span>
                </div>
              </div>
            ))}
          </div>
          <p className="local-links" style={{ marginTop: '1rem' }}>{orangeCountyHub.cities.note}</p>
        </div>
      </section>

      <Proof
        eyebrow={orangeCountyHub.proof.eyebrow}
        heading={orangeCountyHub.proof.heading}
        body={orangeCountyHub.proof.body}
        stats={orangeCountyHub.proof.stats}
      />

      <section style={{ paddingBlock: '24px 0' }}>
        <div className="wrap">
          <p className="pending">{orangeCountyHub.proof.pending}</p>
        </div>
      </section>

      <FaqList faqs={orangeCountyHub.faqs} eyebrow="Direct answers" title="Orange County HVAC questions, answered" firstOpen boldFirstSentence />

      <FinalCta
        title="Get HVAC service anywhere in Orange County"
        body="Tell us your address and we will confirm the city, permit path, utility, and equipment options that apply."
        ghostLabel="Schedule Service"
      />
    </>
  );
}
