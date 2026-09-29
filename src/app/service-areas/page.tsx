import Link from 'next/link';
import { siteConfig } from '@/content/site-config';
import {
  hubDescription, hubHero, hubTrust, hubAnswer, hubRegions, hubTableRows, hubTableNote,
  hubCityIndexNote, hubProof, hubFaqs, hubFinalCta,
} from '@/content/service-area-hub';
import { Icon } from '@/components/ui/Icon';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { AnswerBlock } from '@/components/sections/AnswerBlock';
import { DataTable } from '@/components/sections/DataTable';
import { Proof } from '@/components/sections/Proof';
import { FaqList } from '@/components/sections/FaqList';
import { FinalCta } from '@/components/sections/FinalCta';
import type { Faq } from '@/content/faq';
import { breadcrumbSchema, faqSchema, jsonLd, serviceSchema } from '@/lib/schema';
import { hubMetadata, serviceAreasHubTitle, serviceAreasHubH1, assertH1 } from '@/lib/seo';

export const metadata = hubMetadata({ title: serviceAreasHubTitle(), description: hubDescription, path: '/service-areas/' });

// Renders "{h1 text}" with the trailing substring wrapped in the amber <em> hero treatment, same
// pattern as the four region hubs.
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

const faqs: Faq[] = hubFaqs.map((f) => ({ q: f.q, a: `${f.lead}${f.rest}`, links: f.links }));

export default function Page() {
  const h1 = serviceAreasHubH1();
  assertH1(h1);

  const url = `${siteConfig.url}/service-areas/`;
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Service Areas' }];

  const schema = [
    serviceSchema({
      name: h1,
      description: `${hubAnswer.lead}${hubAnswer.rest}`,
      url,
      serviceType: 'HVAC Services',
      areaServed: hubRegions.map((r) => ({ name: `${r.name}, CA` })),
    }),
    breadcrumbSchema(crumbs.map((c) => ({ name: c.name, url: c.href ? `${siteConfig.url}${c.href}` : url }))),
    faqSchema(faqs),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Breadcrumbs crumbs={crumbs} />

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <HeroHeading h1={h1} emphasis="Across Southern California" />
            <p className="hero-lede">{hubHero.lede}</p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#regions">Find Your Region</a>
              <a className="btn btn-ghost" href={siteConfig.phoneHref}>Call {siteConfig.phone}</a>
            </div>
            <ul className="hero-proof hero-proof-2x2">
              {hubHero.proof.map((p) => (
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
              <strong>{hubHero.photoCaptionTitle}</strong> {hubHero.photoCaptionBody}
            </span>
          </div>
        </div>
      </section>

      <TrustStrip stats={hubTrust} />

      <AnswerBlock lead={hubAnswer.lead} body={hubAnswer.rest} />

      <section id="regions">
        <div className="wrap">
          <p className="eyebrow">Choose your region</p>
          <h2>Four regions, each with its own climate, utility, and permit rules</h2>
          <p>Pick the region that includes your city. Each page lists the cities we cover there and what changes from one to the next.</p>
          <div className="region-grid">
            {hubRegions.map((r) => (
              <div className="region-card" key={r.slug}>
                <div className="photo-pending region-card-img">
                  <Icon name="pin" size={28} />
                  <span className="photo-tag">Photo pending</span>
                </div>
                <div className="region-card-body">
                  <h3>{r.name}</h3>
                  <p>{r.description}</p>
                  <div className="nbhd-list">
                    {r.cities.map((c) => (
                      <span key={c}>{c}</span>
                    ))}
                  </div>
                  <Link className="card-arrow" href={`/service-areas/${r.slug}/`} style={{ marginTop: 'auto' }}>
                    {`HVAC in ${r.name}`} <Icon name="arrow" size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <p className="eyebrow">How the regions differ</p>
          <h2>What we check first in each region</h2>
          <DataTable
            columns={['Region', 'Cities', 'Climate and setting', 'What we check first']}
            rows={hubTableRows.map((r) => [
              <Link key={r.slug} href={`/service-areas/${r.slug}/`}>{r.region}</Link>,
              r.cities,
              r.climate,
              r.checksFirst,
            ])}
            note={hubTableNote}
          />
        </div>
      </section>

      <section>
        <div className="wrap">
          <p className="eyebrow">City index</p>
          <h2>Find your city</h2>
          <p>{hubCityIndexNote}</p>
          <div className="nbhd-card" style={{ marginTop: '1.25rem' }}>
            <div className="grid-2">
              {hubRegions.map((r) => (
                <div key={r.slug}>
                  <h3><Link href={`/service-areas/${r.slug}/`}>{r.name}</Link></h3>
                  <div className="nbhd-list">
                    {r.cities.map((c) =>
                      c === 'Torrance' ? (
                        <Link key={c} href="/service-areas/torrance-ca/" className="chip-link">Torrance</Link>
                      ) : (
                        <span key={c}>{c}</span>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="card-footnote">
              <strong>Not on the list?</strong> Call <a href={siteConfig.phoneHref}>{siteConfig.phone}</a> with your address and we will confirm whether we can help and which rules apply.
            </p>
          </div>
        </div>
      </section>

      <Proof
        eyebrow={hubProof.eyebrow}
        heading={hubProof.heading}
        body={hubProof.body}
        stats={hubProof.stats}
      />

      <FaqList faqs={faqs} eyebrow="Direct answers" title="Service area questions, answered" firstOpen boldFirstSentence />

      <FinalCta
        title={hubFinalCta.title}
        body={hubFinalCta.body}
        ghostLabel="Schedule Service"
      />
    </>
  );
}
