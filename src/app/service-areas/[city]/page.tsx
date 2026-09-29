import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cities, getCity } from '@/content/cities';
import { getService, commercialCardImage } from '@/content/services';
import { getRegion } from '@/content/regions';
import { siteConfig } from '@/content/site-config';
import { PageHeader } from '@/components/ui/PageHeader';
import { PendingNote } from '@/components/ui/PendingNote';
import { Icon } from '@/components/ui/Icon';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { AnswerBlock } from '@/components/sections/AnswerBlock';
import { LocalKnowledge } from '@/components/sections/LocalKnowledge';
import { ServicesGrid, type Card } from '@/components/sections/ServicesGrid';
import { RelatedRow } from '@/components/sections/RelatedRow';
import { Proof } from '@/components/sections/Proof';
import { FaqList } from '@/components/sections/FaqList';
import { FinalCta } from '@/components/sections/FinalCta';
import { breadcrumbSchema, citySchema, faqSchema, jsonLd } from '@/lib/schema';
import { cityMetadata, cityTitle, cityH1, assertH1 } from '@/lib/seo';

// Static export: only these params are generated.
export const dynamicParams = false;
export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

// Only cities with a full "page" content block get indexable metadata; every other city (no
// content yet) is a noindex stub so the export still builds without shipping a thin page.
export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const c = getCity(city);
  if (!c?.page) return { robots: { index: false, follow: false } };
  return cityMetadata({ title: cityTitle(c.name), description: c.page.metaDescription, path: `/service-areas/${c.slug}/` });
}

// Renders "{h1 text}" with the city name substring wrapped in the amber <em> hero treatment.
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

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  // TODO(data): every city besides torrance-ca still needs this page's local content before it can
  // publish; it renders as a noindex stub in the meantime. Never crash on the empty arrays.
  if (!city.page) {
    return (
      <>
        <PageHeader eyebrow="Service area" title={city.name} />
        <section>
          <div className="wrap">
            <PendingNote>full local details for {city.name} are in progress.</PendingNote>
          </div>
        </section>
      </>
    );
  }

  const { page } = city;
  const h1 = cityH1(city.name);
  assertH1(h1);

  const url = `${siteConfig.url}/service-areas/${city.slug}/`;
  const region = getRegion(city.region);
  const regionName = `${region?.name ?? city.region}, CA`;

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Service Areas', href: '/service-areas/' },
    { name: city.name },
  ];

  const serviceCards: Card[] = page.serviceCards.map((sc) => {
    // Commercial HVAC is an audience hub, not a service, so it isn't in services.ts.
    if (sc.slug === 'commercial-hvac') {
      return { href: '/commercial-hvac/', name: sc.name, description: sc.body, icon: 'building', image: commercialCardImage };
    }
    const svc = getService(sc.slug);
    if (!svc) throw new Error(`Unknown service slug on /service-areas/${city.slug}/: ${sc.slug}`);
    return { href: `/${svc.slug}/`, name: sc.name, description: sc.body, icon: svc.icon, image: svc.image };
  });

  const nearby = page.nearby.map((nSlug) => {
    const n = getCity(nSlug);
    return { name: n?.name ?? nSlug, href: n ? `/service-areas/${n.slug}/` : undefined, icon: 'pin', image: n?.cardImage };
  });

  const offers = page.serviceCards.map((sc) => sc.name);

  const schema = [
    citySchema({
      name: h1,
      description: page.lede,
      url,
      cityName: city.name,
      regionName,
      offers,
    }),
    faqSchema(page.faqs),
    breadcrumbSchema(crumbs.map((c) => ({ name: c.name, url: c.href ? `${siteConfig.url}${c.href}` : url }))),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Breadcrumbs crumbs={crumbs} />

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <HeroHeading h1={h1} emphasis={city.name} />
            <p className="hero-lede">{page.lede}</p>
            <div className="cta-row">
              <Link className="btn btn-primary" href="/contact/">Schedule Service in {city.name}</Link>
              <a className="btn btn-ghost" href={siteConfig.phoneHref}>Call {siteConfig.phone}</a>
            </div>
            <ul className="hero-proof hero-proof-2x2">
              {page.heroProof.map((p) => (
                <li key={p.label}>
                  <span className="hero-proof-icon"><Icon name={p.icon} size={20} /></span>
                  {p.label}
                </li>
              ))}
            </ul>
          </div>
          {page.heroImage ? (
            <div className="hero-photo">
              <Image
                src={page.heroImage.src}
                alt={page.heroImage.alt}
                width={1200}
                height={900}
                sizes="(max-width: 920px) 100vw, 45vw"
                priority
              />
              {page.heroCaption && (
                <span className="photo-caption photo-caption-band photo-caption-silver">
                  <strong>{page.heroCaption.title}</strong> {page.heroCaption.text}
                </span>
              )}
            </div>
          ) : (
            <div className="photo-pending hero-photo">
              <Icon name="pin" size={32} />
              <span className="photo-tag">Photo pending</span>
              {page.heroCaption && (
                <span className="photo-caption photo-caption-band photo-caption-silver">
                  <strong>{page.heroCaption.title}</strong> {page.heroCaption.text}
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      <TrustStrip stats={page.trustStats} />

      <AnswerBlock
        lead={page.answer.lead}
        body={page.answer.body}
        dark
        ctas={{
          primaryLabel: `Schedule Service in ${city.name}`,
          primaryHref: '/contact/',
          phoneLabel: `Call ${siteConfig.phone}`,
          phoneHref: siteConfig.phoneHref,
        }}
        image={getService('ac-repair')?.image}
      />

      <LocalKnowledge
        title={`HVAC work built around ${city.name}'s housing stock`}
        paragraphs={page.localParagraphs}
        neighborhoods={city.neighborhoods}
        zips={city.zips}
        dark
      />

      <ServicesGrid cards={serviceCards} eyebrow={`Services in ${city.name}`} title={`Everything we handle for ${city.name} homes and businesses`} />

      <RelatedRow
        items={nearby}
        eyebrow="Nearby areas"
        title="Also serving the rest of the South Bay"
        intro="Air Pro Solutions also serves the surrounding South Bay cities."
        ctaLabel="View area"
        footerAction={{ label: 'View the South Bay service area', href: '/service-areas/south-bay/' }}
      />

      <Proof
        eyebrow="Why Air Pro"
        heading={page.proof.heading}
        body={page.proof.body}
        ctaLabel="Read our reviews"
        ctaHref="/reviews/"
        stats={page.proof.stats}
      />

      <FaqList
        faqs={page.faqs}
        eyebrow="Direct answers"
        title={`${city.name} HVAC questions we hear most`}
        firstOpen
        boldFirstSentence
      />

      <FinalCta
        title={`Get HVAC service in ${city.name}`}
        body={`Call or request service online to schedule a visit anywhere in ${city.name} and the South Bay.`}
        ghostLabel={`Schedule Service in ${city.name}`}
      />
    </>
  );
}
