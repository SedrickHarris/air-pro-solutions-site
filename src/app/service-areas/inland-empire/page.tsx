import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/content/site-config';
import { inlandEmpireHub, inlandEmpireServiceCards } from '@/content/inland-empire';
import { getRegion, citySlug } from '@/content/regions';
import { getCity } from '@/content/cities';
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
  title: regionTitle('Inland Empire'),
  description: inlandEmpireHub.description,
  path: inlandEmpireHub.path,
});

// Renders "{h1 text}" with the region name substring wrapped in the amber <em> hero treatment,
// same pattern as the other three region hubs.
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
  const h1 = regionH1('Inland Empire');
  assertH1(h1);

  const url = `${siteConfig.url}${inlandEmpireHub.path}`;
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Service Areas', href: '/service-areas/' },
    { name: 'Inland Empire' },
  ];

  const serviceCards = inlandEmpireServiceCards();
  const offers = serviceCards.slice(0, 5).map((c) => c.name);
  const heroImage = getRegion('inland-empire')?.image;

  const schema = [
    serviceSchema({
      name: h1,
      description: `${inlandEmpireHub.answer.lead}${inlandEmpireHub.answer.body}`,
      url,
      serviceType: 'HVAC Services',
      areaServedCities: inlandEmpireHub.cityNames.map((name) => ({ name, containedInPlace: 'Inland Empire, CA' })),
      offers,
    }),
    breadcrumbSchema(crumbs.map((c) => ({ name: c.name, url: c.href ? `${siteConfig.url}${c.href}` : url }))),
    faqSchema(inlandEmpireHub.faqs),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Breadcrumbs crumbs={crumbs} />

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <HeroHeading h1={h1} emphasis="Inland Empire" />
            <p className="hero-lede">{inlandEmpireHub.hero.lede}</p>
            <div className="cta-row">
              <Link className="btn btn-primary" href="/contact/">Schedule Service</Link>
              <a className="btn btn-ghost" href={siteConfig.phoneHref}>Call {siteConfig.phone}</a>
            </div>
            <ul className="hero-proof hero-proof-2x2">
              {inlandEmpireHub.hero.proof.map((p) => (
                <li key={p.text}>
                  <span className="hero-proof-icon"><Icon name={p.icon} size={20} /></span>
                  {p.text}
                </li>
              ))}
            </ul>
          </div>
          {heroImage ? (
            <div className="hero-photo">
              <Image src={heroImage.src} alt={heroImage.alt} width={1200} height={900} sizes="(max-width: 920px) 100vw, 45vw" priority />
              <span className="photo-caption photo-caption-band photo-caption-silver">
                <strong>{inlandEmpireHub.hero.photoCaptionTitle}</strong> {inlandEmpireHub.hero.photoCaptionBody}
              </span>
            </div>
          ) : (
            <div className="photo-pending hero-photo">
              <Icon name="pin" size={32} />
              <span className="photo-tag">Photo pending</span>
              <span className="photo-caption photo-caption-band photo-caption-silver">
                <strong>{inlandEmpireHub.hero.photoCaptionTitle}</strong> {inlandEmpireHub.hero.photoCaptionBody}
              </span>
            </div>
          )}
        </div>
      </section>

      <TrustStrip stats={inlandEmpireHub.trust} />

      <AnswerBlock lead={inlandEmpireHub.answer.lead} body={inlandEmpireHub.answer.body} />

      <section>
        <div className="wrap">
          <p className="eyebrow">{inlandEmpireHub.climate.eyebrow}</p>
          <h2>{inlandEmpireHub.climate.title}</h2>
          <ul className="pill-list">
            {inlandEmpireHub.climate.facts.map((f) => (
              <li key={f} className="pill">{f}</li>
            ))}
          </ul>
          <div className="local-grid" style={{ marginTop: '1.25rem' }}>
            <div className="local-copy">
              {inlandEmpireHub.climate.paragraphs.map((p, i) => (
                <p key={i}>{renderBold(p)}</p>
              ))}
            </div>
            <div className="nbhd-card">
              <h3>{inlandEmpireHub.climate.cardTitle}</h3>
              {inlandEmpireHub.climate.groups.map((g) => (
                <div key={g.label}>
                  <p className="grp-label">{g.label}</p>
                  <div className="nbhd-list grp">
                    {g.cities.map((city) => (
                      <span key={city}>{city}</span>
                    ))}
                  </div>
                </div>
              ))}
              <p style={{ marginTop: '12px', fontSize: '0.88rem', color: 'var(--ink-soft)' }}>{renderBold(inlandEmpireHub.climate.gettingAround)}</p>
              <div className="zip">{inlandEmpireHub.climate.source}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <p className="eyebrow">{inlandEmpireHub.housing.eyebrow}</p>
          <h2>{inlandEmpireHub.housing.title}</h2>
          <DataTable
            columns={inlandEmpireHub.housing.columns}
            rows={inlandEmpireHub.housing.rows}
            note={inlandEmpireHub.housing.note}
            numericCols={inlandEmpireHub.housing.numericCols}
          />
          <div className="local-copy" style={{ marginTop: '1.5rem' }}>
            {inlandEmpireHub.housing.paragraphs.map((p, i) => (
              <p key={i}>{renderBold(p)}</p>
            ))}
            <p className="local-links">{inlandEmpireHub.housing.pending}</p>
          </div>
        </div>
      </section>

      <ServicesGrid cards={serviceCards} eyebrow={inlandEmpireHub.services.eyebrow} title={inlandEmpireHub.services.title} columns={3} />

      <section className="alt">
        <div className="wrap">
          <p className="eyebrow">{inlandEmpireHub.split.eyebrow}</p>
          <h2>{inlandEmpireHub.split.title}</h2>
          <div className="split">
            {[inlandEmpireHub.split.residential, inlandEmpireHub.split.commercial].map((c) => (
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
            {inlandEmpireHub.split.paragraphs.map((p, i) => (
              <p key={i}>{renderBold(p)}</p>
            ))}
            <p className="local-links">{inlandEmpireHub.split.pending}</p>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <p className="eyebrow">{inlandEmpireHub.permits.eyebrow}</p>
          <h2>{inlandEmpireHub.permits.title}</h2>
          <p className="compare-intro">{inlandEmpireHub.permits.intro}</p>
          <DataTable columns={inlandEmpireHub.permits.columns} rows={inlandEmpireHub.permits.rows} note={inlandEmpireHub.permits.note} />
          <div className="local-copy" style={{ marginTop: '1.5rem' }}>
            {inlandEmpireHub.permits.paragraphs.map((p, i) => (
              <p key={i}>{renderBold(p)}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <p className="eyebrow">{inlandEmpireHub.placement.eyebrow}</p>
          <h2>{inlandEmpireHub.placement.title}</h2>
          <DataTable columns={inlandEmpireHub.placement.columns} rows={inlandEmpireHub.placement.rows} note={inlandEmpireHub.placement.note} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <p className="eyebrow">{inlandEmpireHub.rebates.eyebrow}</p>
          <h2>{inlandEmpireHub.rebates.title}</h2>
          <p>{inlandEmpireHub.rebates.intro}</p>
          <RebateCards cards={inlandEmpireHub.rebates.cards} />
          <div className="local-grid" style={{ marginTop: '2rem' }}>
            <div className="local-copy">
              {inlandEmpireHub.rebates.copy.map((p, i) => (
                <p key={i}>{renderBold(p)}</p>
              ))}
            </div>
            <div className="nbhd-card">
              <h3>{inlandEmpireHub.rebates.utilityCardTitle}</h3>
              <div className="nbhd-list">
                {inlandEmpireHub.rebates.utilities.map((u) => (
                  <span key={u}>{u}</span>
                ))}
              </div>
              <div className="zip">{renderBold(inlandEmpireHub.rebates.note)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <p className="eyebrow">{inlandEmpireHub.cities.eyebrow}</p>
          <h2>{inlandEmpireHub.cities.title}</h2>
          <p>
            Individual Inland Empire city pages are coming. For now, browse{' '}
            <Link href="/service-areas/">all service areas</Link>.
          </p>
          <div className="services-grid">
            {inlandEmpireHub.cities.items.map((c) => {
              const image = getCity(citySlug(c.name))?.cardImage;
              return (
              <div className="svc-card" key={c.name}>
                {image ? (
                  <div className="svc-card-img">
                    <Image src={image.src} alt={image.alt} width={800} height={600} sizes="(max-width: 520px) 100vw, (max-width: 920px) 50vw, 25vw" />
                  </div>
                ) : (
                  <div className="photo-pending svc-card-img">
                    <Icon name="pin" size={28} />
                    <span className="photo-tag">Photo pending</span>
                  </div>
                )}
                <div className="svc-card-body">
                  <h3>{c.name}</h3>
                  <p>{c.note}</p>
                  <p style={{ fontSize: '0.85rem' }}>{renderBold(`**Areas:** ${c.areas}`)}</p>
                  <p style={{ fontSize: '0.85rem' }}>{renderBold(`**Utility:** ${c.utility}`)}</p>
                  {c.pending && <p style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', fontStyle: 'italic' }}>{c.pending}</p>}
                  <span className="card-soon">City page coming soon</span>
                </div>
              </div>
              );
            })}
          </div>
          <p className="local-links" style={{ marginTop: '1rem' }}>{inlandEmpireHub.cities.note}</p>
        </div>
      </section>

      <Proof
        eyebrow={inlandEmpireHub.proof.eyebrow}
        heading={inlandEmpireHub.proof.heading}
        body={inlandEmpireHub.proof.body}
        stats={inlandEmpireHub.proof.stats}
      />

      <section style={{ paddingBlock: '24px 0' }}>
        <div className="wrap">
          <p className="pending">{inlandEmpireHub.proof.pending}</p>
        </div>
      </section>

      <FaqList faqs={inlandEmpireHub.faqs} eyebrow="Direct answers" title="Inland Empire HVAC questions, answered" firstOpen boldFirstSentence />

      <FinalCta
        title="Get HVAC service anywhere in the Inland Empire"
        body="Tell us your address and we will confirm the city, permit path, utility, and equipment options that apply."
        ghostLabel="Schedule Service"
      />
    </>
  );
}
