import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/content/site-config';
import { laCountyHub, laCountyServiceCards } from '@/content/la-county-hub';
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
  title: regionTitle('Los Angeles County'),
  description: laCountyHub.description,
  path: laCountyHub.path,
});

// Renders "{h1 text}" with the region name substring wrapped in the amber <em> hero treatment,
// same pattern as the city and residential-hub pages.
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
  const h1 = regionH1('Los Angeles County');
  assertH1(h1);

  const url = `${siteConfig.url}${laCountyHub.path}`;
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Service Areas', href: '/service-areas/' },
    { name: 'Los Angeles County' },
  ];

  const serviceCards = laCountyServiceCards();
  const offers = serviceCards.slice(0, 5).map((c) => c.name);

  const schema = [
    serviceSchema({
      name: h1,
      description: `${laCountyHub.answer.lead}${laCountyHub.answer.body}`,
      url,
      serviceType: 'HVAC Services',
      areaServedCities: laCountyHub.cityNames.map((name) => ({ name, containedInPlace: 'Los Angeles County, CA' })),
      offers,
    }),
    breadcrumbSchema(crumbs.map((c) => ({ name: c.name, url: c.href ? `${siteConfig.url}${c.href}` : url }))),
    faqSchema(laCountyHub.faqs),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Breadcrumbs crumbs={crumbs} />

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <HeroHeading h1={h1} emphasis="Los Angeles County" />
            <p className="hero-lede">{laCountyHub.hero.lede}</p>
            <div className="cta-row">
              <Link className="btn btn-primary" href="/contact/">Schedule Service</Link>
              <a className="btn btn-ghost" href={siteConfig.phoneHref}>Call {siteConfig.phone}</a>
            </div>
            <ul className="hero-proof hero-proof-2x2">
              {laCountyHub.hero.proof.map((p) => (
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
              <strong>{laCountyHub.hero.photoCaptionTitle}</strong> {laCountyHub.hero.photoCaptionBody}
            </span>
          </div>
        </div>
      </section>

      <TrustStrip stats={laCountyHub.trust} />

      <AnswerBlock lead={laCountyHub.answer.lead} body={laCountyHub.answer.body} />

      <section>
        <div className="wrap">
          <p className="eyebrow">{laCountyHub.climate.eyebrow}</p>
          <h2>{laCountyHub.climate.title}</h2>
          <div className="local-grid">
            <div className="local-copy">
              {laCountyHub.climate.paragraphs.map((p, i) => (
                <p key={i}>{renderBold(p)}</p>
              ))}
            </div>
            <div className="nbhd-card">
              <h3>{laCountyHub.climate.cardTitle}</h3>
              {laCountyHub.climate.groups.map((g, i) => (
                <div className="nbhd-list grp" key={i}>
                  {g.map((city) => (
                    <span key={city}>{city}</span>
                  ))}
                </div>
              ))}
              <div className="zip">{renderBold(laCountyHub.climate.source)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <p className="eyebrow">{laCountyHub.housing.eyebrow}</p>
          <h2>{laCountyHub.housing.title}</h2>
          <DataTable columns={laCountyHub.housing.columns} rows={laCountyHub.housing.rows} note={laCountyHub.housing.note} />
          <div className="grid-2" style={{ marginTop: '1.5rem' }}>
            {laCountyHub.housing.copyCols.map((col, i) => (
              <div className="local-copy" key={i}>
                {col.map((p, j) => (
                  <p key={j}>{renderBold(p)}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServicesGrid cards={serviceCards} eyebrow={laCountyHub.services.eyebrow} title={laCountyHub.services.title} columns={3} />

      <section className="alt">
        <div className="wrap">
          <p className="eyebrow">{laCountyHub.split.eyebrow}</p>
          <h2>{laCountyHub.split.title}</h2>
          <div className="split">
            {[laCountyHub.split.residential, laCountyHub.split.commercial].map((c) => (
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
        </div>
      </section>

      <section>
        <div className="wrap">
          <p className="eyebrow">{laCountyHub.permits.eyebrow}</p>
          <h2>{laCountyHub.permits.title}</h2>
          <p className="compare-intro">{laCountyHub.permits.intro}</p>
          <DataTable columns={laCountyHub.permits.columns} rows={laCountyHub.permits.rows} />
          <div className="grid-2" style={{ marginTop: '1.5rem' }}>
            {laCountyHub.permits.copyCols.map((col, i) => (
              <div className="local-copy" key={i}>
                {col.map((p, j) => (
                  <p key={j}>{renderBold(p)}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <p className="eyebrow">{laCountyHub.rebates.eyebrow}</p>
          <h2>{laCountyHub.rebates.title}</h2>
          <p>{laCountyHub.rebates.intro}</p>
          <RebateCards cards={laCountyHub.rebates.cards} />
          <div className="local-grid" style={{ marginTop: '2rem' }}>
            <div className="local-copy">
              {laCountyHub.rebates.copy.map((p, i) => (
                <p key={i}>{renderBold(p)}</p>
              ))}
            </div>
            <div className="nbhd-card">
              <h3>{laCountyHub.rebates.utilityCardTitle}</h3>
              <div className="nbhd-list">
                {laCountyHub.rebates.utilities.map((u) => (
                  <span key={u}>{u}</span>
                ))}
              </div>
              <div className="zip">{renderBold(laCountyHub.rebates.gasNote)}</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <p className="eyebrow">{laCountyHub.cities.eyebrow}</p>
          <h2>{laCountyHub.cities.title}</h2>
          <p>
            Individual city pages are coming. For the South Bay, see our{' '}
            <Link href="/service-areas/torrance-ca/">Torrance page</Link>, or browse{' '}
            <Link href="/service-areas/">all service areas</Link>.
          </p>
          <div className="services-grid">
            {laCountyHub.cities.items.map((c) => (
              <div className="svc-card" key={c.name}>
                <div className="photo-pending svc-card-img">
                  <Icon name="pin" size={28} />
                  <span className="photo-tag">Photo pending</span>
                </div>
                <div className="svc-card-body">
                  <h3>{c.name}</h3>
                  <p>{c.note}</p>
                  <span className="card-soon">City page coming soon</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Proof
        eyebrow={laCountyHub.proof.eyebrow}
        heading={laCountyHub.proof.heading}
        body={laCountyHub.proof.body}
        stats={laCountyHub.proof.stats}
      />

      <FaqList faqs={laCountyHub.faqs} eyebrow="Direct answers" title="Los Angeles County HVAC questions, answered" firstOpen boldFirstSentence />

      <FinalCta
        title="Get HVAC service anywhere in Los Angeles County"
        body="Tell us your address and we will confirm the utility, permit path, and equipment options that apply."
        ghostLabel="Schedule Service"
      />
    </>
  );
}
