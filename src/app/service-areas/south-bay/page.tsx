import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/content/site-config';
import { southBayHub, southBayServiceCards } from '@/content/south-bay';
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
  title: regionTitle('the South Bay'),
  description: southBayHub.description,
  path: southBayHub.path,
});

// Renders "{h1 text}" with the region name substring wrapped in the amber <em> hero treatment,
// same pattern as the LA County hub and city pages.
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
  const h1 = regionH1('the South Bay');
  assertH1(h1);

  const url = `${siteConfig.url}${southBayHub.path}`;
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Service Areas', href: '/service-areas/' },
    { name: 'South Bay' },
  ];

  const serviceCards = southBayServiceCards();
  const offers = serviceCards.slice(0, 5).map((c) => c.name);

  const schema = [
    serviceSchema({
      name: h1,
      description: `${southBayHub.answer.lead}${southBayHub.answer.body}`,
      url,
      serviceType: 'HVAC Services',
      areaServedCities: southBayHub.cityNames.map((name) => ({ name, containedInPlace: 'Los Angeles County, CA' })),
      offers,
    }),
    breadcrumbSchema(crumbs.map((c) => ({ name: c.name, url: c.href ? `${siteConfig.url}${c.href}` : url }))),
    faqSchema(southBayHub.faqs),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Breadcrumbs crumbs={crumbs} />

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <HeroHeading h1={h1} emphasis="the South Bay" />
            <p className="hero-lede">{southBayHub.hero.lede}</p>
            <div className="cta-row">
              <Link className="btn btn-primary" href="/contact/">Schedule Service</Link>
              <a className="btn btn-ghost" href={siteConfig.phoneHref}>Call {siteConfig.phone}</a>
            </div>
            <ul className="hero-proof hero-proof-2x2">
              {southBayHub.hero.proof.map((p) => (
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
              <strong>{southBayHub.hero.photoCaptionTitle}</strong> {southBayHub.hero.photoCaptionBody}
            </span>
          </div>
        </div>
      </section>

      <TrustStrip stats={southBayHub.trust} />

      <AnswerBlock lead={southBayHub.answer.lead} body={southBayHub.answer.body} />

      <section>
        <div className="wrap">
          <p className="eyebrow">{southBayHub.local.eyebrow}</p>
          <h2>{southBayHub.local.title}</h2>
          <div className="local-grid">
            <div className="local-copy">
              {southBayHub.local.paragraphs.map((p, i) => (
                <p key={i}>{renderBold(p)}</p>
              ))}
            </div>
            <div className="nbhd-card">
              <h3>{southBayHub.local.cardTitle}</h3>
              {southBayHub.local.groups.map((g) => (
                <div key={g.label}>
                  <p className="grp-label">{g.label}</p>
                  <div className="nbhd-list grp">
                    {g.cities.map((city) => (
                      <span key={city}>{city}</span>
                    ))}
                  </div>
                </div>
              ))}
              <div className="zip">{southBayHub.local.note}</div>
            </div>
          </div>
        </div>
      </section>

      <ServicesGrid cards={serviceCards} eyebrow={southBayHub.services.eyebrow} title={southBayHub.services.title} columns={3} />

      <section className="alt">
        <div className="wrap">
          <p className="eyebrow">{southBayHub.split.eyebrow}</p>
          <h2>{southBayHub.split.title}</h2>
          <div className="split">
            {[southBayHub.split.residential, southBayHub.split.commercial].map((c) => (
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
          <div className="grid-2" style={{ marginTop: '1.5rem' }}>
            {southBayHub.split.copyCols.map((col, i) => (
              <div className="local-copy" key={i}>
                {col.map((p, j) => (
                  <p key={j}>{renderBold(p)}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <p className="eyebrow">{southBayHub.permits.eyebrow}</p>
          <h2>{southBayHub.permits.title}</h2>
          <p className="compare-intro">{southBayHub.permits.intro}</p>
          <DataTable columns={southBayHub.permits.columns} rows={southBayHub.permits.rows} />
          <div className="grid-2" style={{ marginTop: '1.5rem' }}>
            {southBayHub.permits.copyCols.map((col, i) => (
              <div className="local-copy" key={i}>
                {col.map((p, j) => (
                  <p key={j}>{renderBold(p)}</p>
                ))}
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: '2.5rem' }}>{southBayHub.permits.noise.title}</h3>
          <p className="compare-intro">{southBayHub.permits.noise.intro}</p>
          <DataTable columns={southBayHub.permits.noise.columns} rows={southBayHub.permits.noise.rows} note={southBayHub.permits.noise.note} />
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <p className="eyebrow">{southBayHub.rebates.eyebrow}</p>
          <h2>{southBayHub.rebates.title}</h2>
          <p>{southBayHub.rebates.intro}</p>
          <RebateCards cards={southBayHub.rebates.cards} />
          <div className="local-grid" style={{ marginTop: '2rem' }}>
            <div className="local-copy">
              {southBayHub.rebates.copy.map((p, i) => (
                <p key={i}>{renderBold(p)}</p>
              ))}
            </div>
            <div className="nbhd-card">
              <h3>{southBayHub.rebates.utilityCardTitle}</h3>
              <div className="nbhd-list">
                {southBayHub.rebates.utilities.map((u) => (
                  <span key={u}>{u}</span>
                ))}
              </div>
              <div className="zip">{southBayHub.rebates.note}</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <p className="eyebrow">{southBayHub.cities.eyebrow}</p>
          <h2>{southBayHub.cities.title}</h2>
          <p>
            Individual city pages are coming. For now, see our{' '}
            <Link href="/service-areas/torrance-ca/">Torrance page</Link>, or browse{' '}
            <Link href="/service-areas/">all service areas</Link>.
          </p>
          <div className="services-grid">
            {southBayHub.cities.items.map((c) => {
              const body = (
                <>
                  <div className="photo-pending svc-card-img">
                    <Icon name="pin" size={28} />
                    <span className="photo-tag">Photo pending</span>
                  </div>
                  <div className="svc-card-body">
                    <h3>{c.name}</h3>
                    <p>{c.note}</p>
                    {c.href ? (
                      <span className="card-arrow">View area <Icon name="arrow" size={16} /></span>
                    ) : (
                      <span className="card-soon">City page coming soon</span>
                    )}
                  </div>
                </>
              );
              return c.href ? (
                <Link key={c.name} href={c.href} className="svc-card">{body}</Link>
              ) : (
                <div key={c.name} className="svc-card">{body}</div>
              );
            })}
          </div>
        </div>
      </section>

      <Proof
        eyebrow={southBayHub.proof.eyebrow}
        heading={southBayHub.proof.heading}
        body={southBayHub.proof.body}
        stats={southBayHub.proof.stats}
      />

      <FaqList faqs={southBayHub.faqs} eyebrow="Direct answers" title="South Bay HVAC questions, answered" firstOpen boldFirstSentence />

      <FinalCta
        title="Get HVAC service anywhere in the South Bay"
        body="Tell us your address and we will confirm the city, permit path, utility, and equipment options that apply."
        ghostLabel="Schedule Service"
      />
    </>
  );
}
