import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { matrixPages } from '@/content/matrix';
import { getMatrixContent } from '@/content/matrix-content';
import { getService } from '@/content/services';
import { getCity } from '@/content/cities';
import { getRegion } from '@/content/regions';
import { siteConfig } from '@/content/site-config';
import { PendingNote } from '@/components/ui/PendingNote';
import { Icon } from '@/components/ui/Icon';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { AnswerBlock } from '@/components/sections/AnswerBlock';
import { LocalKnowledge } from '@/components/sections/LocalKnowledge';
import { SymptomGrid } from '@/components/sections/SymptomGrid';
import { ProcessList } from '@/components/sections/ProcessList';
import { CompareTable } from '@/components/sections/CompareTable';
import { AppliesRow } from '@/components/sections/AppliesRow';
import { RelatedRow } from '@/components/sections/RelatedRow';
import { Proof } from '@/components/sections/Proof';
import { FaqList } from '@/components/sections/FaqList';
import { FinalCta } from '@/components/sections/FinalCta';
import { breadcrumbSchema, citySchema, faqSchema, jsonLd } from '@/lib/schema';
import { serviceLocationMetadata, matrixTitle, matrixH1, assertH1 } from '@/lib/seo';

// Static export: only these params are generated.
export const dynamicParams = false;
export function generateStaticParams() {
  return matrixPages;
}

export async function generateMetadata({ params }: { params: Promise<{ service: string; city: string }> }): Promise<Metadata> {
  const { service, city } = await params;
  const s = getService(service);
  const c = getCity(city);
  const content = getMatrixContent(service, city);
  if (!s || !c || !content) return { robots: { index: false, follow: false } };
  return serviceLocationMetadata({
    title: matrixTitle(s.name, c.name),
    description: content.metaDescription,
    path: `/${s.slug}/${c.slug}/`,
  });
}

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

export default async function Page({ params }: { params: Promise<{ service: string; city: string }> }) {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = getService(serviceSlug);
  const city = getCity(citySlug);
  const content = getMatrixContent(serviceSlug, citySlug);
  if (!service || !city || !content) notFound();

  const h1 = matrixH1(service.name, city.name);
  assertH1(h1);

  const url = `${siteConfig.url}/${service.slug}/${city.slug}/`;
  const region = getRegion(city.region);
  const regionName = `${region?.name ?? city.region}, CA`;

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services/' },
    { name: service.name, href: `/${service.slug}/` },
    { name: city.name },
  ];

  const nearby = content.nearby.map((slug) => {
    const n = getCity(slug);
    // None of these have a matching matrix pair yet, so every card is a plain non-link card.
    const hasMatrixPage = matrixPages.some((m) => m.service === service.slug && m.city === slug);
    return {
      name: n ? `${n.name} AC repair` : slug,
      href: hasMatrixPage ? `/${service.slug}/${slug}/` : undefined,
      icon: 'pin',
    };
  });

  const relatedServices = [
    { slug: 'ac-installation', name: 'AC Installation and Replacement' },
    { slug: 'ac-maintenance', name: 'HVAC Maintenance' },
    { slug: 'emergency-hvac', name: 'Emergency HVAC Repair' },
    { slug: 'commercial-hvac', name: 'Commercial HVAC' },
  ].map((r) => {
    const svc = getService(r.slug);
    return { name: r.name, href: `/${r.slug}/`, icon: svc?.icon ?? 'wrench', image: svc?.image };
  });

  const schema = [
    citySchema({
      name: h1,
      description: content.lede,
      url,
      cityName: city.name,
      regionName,
      serviceType: 'Air Conditioning Repair',
    }),
    breadcrumbSchema(crumbs.map((c) => ({ name: c.name, url: c.href ? `${siteConfig.url}${c.href}` : url }))),
    faqSchema(content.faqs),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Breadcrumbs crumbs={crumbs} />

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <HeroHeading h1={h1} emphasis={city.name} />
            <p className="hero-lede">{content.lede}</p>
            <div className="cta-row">
              <Link className="btn btn-primary" href="/contact/">Schedule AC Repair in {city.name}</Link>
              <a className="btn btn-ghost" href={siteConfig.phoneHref}>Call {siteConfig.phone}</a>
            </div>
            <ul className="hero-proof hero-proof-2x2">
              {content.heroProof.map((p) => (
                <li key={p.label}>
                  <span className="hero-proof-icon"><Icon name={p.icon} size={20} /></span>
                  {p.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="photo-pending hero-photo">
            <Icon name={service.icon} size={32} />
            <span className="photo-caption photo-caption-band photo-caption-band-left photo-caption-silver">
              <strong>Job photo pending</strong>
            </span>
          </div>
        </div>
      </section>

      <TrustStrip stats={content.trust} />

      <AnswerBlock lead={content.answer.lead} body={content.answer.body} />

      <LocalKnowledge
        eyebrow={content.local.eyebrow}
        title={content.local.h2}
        paragraphs={content.local.paragraphs}
        links={[
          { text: 'See the AC repair overview', href: '/ac-repair/' },
          { text: 'All HVAC services in Torrance', href: '/service-areas/torrance-ca/' },
        ]}
        neighborhoodsHeading={content.local.areasHeading}
        neighborhoods={city.neighborhoods}
        zips={city.zips}
      />
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <PendingNote>a Torrance customer review or job photo for this page, pending a real review with permission.</PendingNote>
        </div>
      </section>

      <SymptomGrid items={service.symptoms} title="Common signs your AC needs repair" />

      <ProcessList steps={service.process} title="Our AC repair process" />

      {service.repairVsReplace && (
        <CompareTable
          intro={service.repairVsReplace.intro}
          groups={service.repairVsReplace.groups}
          note={service.repairVsReplace.note}
          title="Repair or replace?"
        />
      )}

      {service.page && <AppliesRow items={service.page.appliesTo} title="Residential and commercial AC repair" />}

      <RelatedRow
        items={nearby}
        eyebrow="Nearby areas"
        title="AC repair in the rest of the South Bay"
        intro="Air Pro Solutions also serves the surrounding South Bay cities."
      />

      <Proof
        eyebrow="Why Air Pro"
        heading="Licensed technicians and a clear explanation of the work"
        body="Air Pro Solutions is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide."
        ctaLabel="Read our reviews"
        ctaHref="/reviews/"
        stats={[
          { num: `${siteConfig.rating}★`, label: 'Google rating' },
          { num: String(siteConfig.reviewCount), label: 'Google reviews' },
          { num: 'C-20', label: 'California license class' },
          { num: '4', label: 'regions served' },
        ]}
      />

      <RelatedRow items={relatedServices} eyebrow="Related" title="Explore related services" />

      <FaqList
        faqs={content.faqs}
        eyebrow="Direct answers"
        title="AC repair questions Torrance homeowners ask"
        firstOpen
        boldFirstSentence
      />

      <FinalCta
        title={`Get AC repair in ${city.name}`}
        body={`Call or request service online to schedule a visit anywhere in ${city.name} and the South Bay.`}
        ghostLabel={`Schedule AC Repair in ${city.name}`}
      />
    </>
  );
}
