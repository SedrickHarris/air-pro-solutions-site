import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { matrixPages } from '@/content/matrix';
import { getMatrixContent } from '@/content/matrix-content';
import { getService, publishedServices, serviceHref, commercialCardImage, commercialCardDescription } from '@/content/services';
import { getCity } from '@/content/cities';
import { getRegion } from '@/content/regions';
import { siteConfig } from '@/content/site-config';
import { Icon } from '@/components/ui/Icon';
import { SourceLinks } from '@/components/ui/SourceLinks';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { AnswerBlock } from '@/components/sections/AnswerBlock';
import { GlanceCard } from '@/components/sections/GlanceCard';
import { SourcesList } from '@/components/sections/SourcesList';
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
    path: `${serviceHref(s.slug)}${c.slug}/`,
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

  const url = `${siteConfig.url}${serviceHref(service.slug)}${city.slug}/`;
  const region = getRegion(city.region);
  const regionName = `${region?.name ?? city.region}, CA`;

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services/' },
    { name: service.name, href: serviceHref(service.slug) },
    { name: city.name },
  ];

  // Nearby cards: link to the matrix page when that pair is published, otherwise to the neighbor's own city page
  // (/service-areas/<city>/, every nearby city has one). No neighborhood, ZIP, adjacency or drive-time text here:
  // those are held out in cities.ts (TODO(data)) for all four South Bay neighbors, so the card copy stays generic.
  const nearby = content.nearby.map((slug) => {
    const n = getCity(slug);
    const hasMatrixPage = matrixPages.some((m) => m.service === service.slug && m.city === slug);
    const cityName = n?.name ?? slug;
    return {
      name: hasMatrixPage ? `${cityName} ${service.name}` : cityName,
      href: hasMatrixPage ? `${serviceHref(service.slug)}${slug}/` : `/service-areas/${slug}/`,
      linkLabel: hasMatrixPage ? `View ${service.name}` : 'View service area',
      icon: 'pin',
      image: n?.cardImage,
      description: hasMatrixPage
        ? `${service.name} for homes and businesses in ${cityName}.`
        : `Local HVAC service details for homes and businesses in ${cityName}.`,
    };
  });

  // Same related-services logic as /services/[service]/: the service's own `related` slugs, plus a bonus
  // Commercial HVAC card, so a matrix page for any future service links to the right siblings.
  const relatedServices = [
    ...service.related.map((relSlug) => {
      const rel = getService(relSlug);
      if (!rel) throw new Error(`Unknown related service slug on ${serviceHref(service.slug)}${city.slug}/: ${relSlug}`);
      return { name: rel.name, href: serviceHref(rel.slug), icon: rel.icon, image: rel.image, description: rel.description };
    }),
    { name: 'Commercial HVAC', href: '/commercial-hvac/', icon: 'building', image: commercialCardImage, description: commercialCardDescription },
  ];

  // Text-link row for the published services the related cards above do not already cover, so every core
  // service page is reachable from a matrix page. Built from data, so a future matrix page needs no edit here.
  const otherServiceLinks = publishedServices
    .filter((s) => s.slug !== service.slug && !service.related.includes(s.slug))
    .map((s) => ({ text: s.name, href: serviceHref(s.slug) }));

  // Merged "{Service} in {City} at a glance" card: the service record's own glance supplies two stats (process
  // steps, C-20) and the city supplies one verified fact, so every page keeps the same three-stat card and the
  // dark quick-answer band stays the same height as the service and city pages. Services that have not been
  // migrated to the location-style pattern (no `page.glance`) keep the plain answer block.
  const serviceGlance = service.page?.glance;
  const glanceSources = serviceGlance ? [...serviceGlance.sources, ...content.cityGlance.sources] : [];

  // City-specific sources first, then the service-record sources this page also cites. Looking them up by URL
  // fragment (and throwing when one is missing) keeps a single copy of each source in services.ts.
  const serviceSources = content.serviceSourceKeys.map((key) => {
    const found = service.page?.sources?.find((src) => src.url.includes(key));
    if (!found) throw new Error(`Unknown ${service.name} source on ${serviceHref(service.slug)}${city.slug}/: ${key}`);
    return found;
  });
  const referenceSources = [...content.sources, ...serviceSources];

  const schema = [
    citySchema({
      name: h1,
      description: content.lede,
      url,
      cityName: city.name,
      regionName,
      serviceType: service.page?.serviceType ?? 'HVAC Services',
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
              <Link className="btn btn-primary" href="/contact/">Schedule {service.name} in {city.name}</Link>
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
          {content.heroImage ? (
            <div className="hero-photo">
              <Image src={content.heroImage.src} alt={content.heroImage.alt} width={1200} height={900} sizes="(max-width: 920px) 100vw, 45vw" priority />
              <span className="photo-caption photo-caption-band photo-caption-band-left photo-caption-silver">
                <strong>{content.heroCaption ?? `${city.name}, CA`}</strong>
              </span>
            </div>
          ) : (
            <div className="photo-pending hero-photo">
              <Icon name={service.icon} size={32} />
              <span className="photo-tag">Photo pending</span>
              <span className="photo-caption photo-caption-band photo-caption-band-left photo-caption-silver">
                <strong>Job photo pending</strong>
              </span>
            </div>
          )}
        </div>
      </section>

      <TrustStrip stats={content.trust} />

      {serviceGlance ? (
        <AnswerBlock
          lead={content.answer.lead}
          body={content.answer.body}
          dark
          ctas={{
            primaryLabel: `Schedule ${service.name} in ${city.name}`,
            primaryHref: '/contact/',
            phoneLabel: `Call ${siteConfig.phone}`,
            phoneHref: siteConfig.phoneHref,
          }}
          aside={
            <GlanceCard
              title={`${service.name} in ${city.name} at a glance`}
              stats={[...serviceGlance.stats.slice(0, 2), content.cityGlance.stat]}
              source={<SourceLinks sources={glanceSources} />}
            />
          }
        />
      ) : (
        <AnswerBlock lead={content.answer.lead} body={content.answer.body} />
      )}

      <LocalKnowledge
        eyebrow={content.local.eyebrow}
        title={content.local.h2}
        paragraphs={content.local.paragraphs}
        links={[
          { text: `See the ${service.name} overview`, href: serviceHref(service.slug) },
          { text: `All HVAC services in ${city.name}`, href: `/service-areas/${city.slug}/` },
          ...content.local.links,
        ]}
        neighborhoodsHeading={content.local.areasHeading}
        neighborhoods={content.local.neighborhoods}
        zips={content.local.zips}
        zipsLabel={content.local.zipsLabel}
        neighborhoodsNote={content.local.neighborhoodsNote}
        localCards={content.local.cards}
        alt
      />

      <SymptomGrid items={service.symptoms} title={service.page?.symptomsTitle ?? `Common signs you need ${service.name}`} alt={false} />

      <ProcessList steps={service.process} title={service.page?.processTitle ?? `Our ${service.name} process`} columns={service.page?.processColumns} alt />

      {service.repairVsReplace && (
        <CompareTable
          intro={service.repairVsReplace.intro}
          groups={service.repairVsReplace.groups}
          note={service.repairVsReplace.note}
          title="Repair or replace?"
          alt={false}
        />
      )}

      {service.page && <AppliesRow items={service.page.appliesTo} title={service.page.appliesTitle} alt />}

      <RelatedRow
        items={nearby}
        eyebrow="Nearby areas"
        title={`${service.name} in the rest of ${region?.name ?? city.region}`}
        intro={`AIRPRO SOLUTIONS also serves the surrounding ${region?.name ?? ''} cities.`}
        alt={false}
      />

      <Proof
        eyebrow="Why Air Pro"
        heading="Licensed technicians and a clear explanation of the work"
        body="AIRPRO SOLUTIONS is licensed in California (LIC #1126691, #50251) and rated 4.8 stars across 40 Google reviews. We explain what we find and what your options are before you decide."
        ctaLabel="Read our reviews"
        ctaHref="/reviews/"
        stats={[
          { num: `${siteConfig.rating}★`, label: 'Google rating' },
          { num: String(siteConfig.reviewCount), label: 'Google reviews' },
          { num: 'C-20', label: 'California license class' },
          { num: '4', label: 'regions served' },
        ]}
      />

      <RelatedRow items={relatedServices} eyebrow="Related" title="Explore related services" alt={false} moreLinks={otherServiceLinks} />

      <FaqList
        faqs={content.faqs}
        eyebrow="Direct answers"
        title={`${service.name} questions ${city.name} homeowners ask`}
        firstOpen
        boldFirstSentence
        alt
        footer={<SourcesList variant="details" items={referenceSources} />}
      />

      <FinalCta
        title={`Get ${service.name} in ${city.name}`}
        body={`Call or request service online to schedule a visit anywhere in ${city.name} and ${region?.name ?? 'the surrounding area'}.`}
        ghostLabel={`Schedule ${service.name} in ${city.name}`}
      />
    </>
  );
}
