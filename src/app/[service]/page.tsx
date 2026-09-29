import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getService, services } from '@/content/services';
import { siteConfig } from '@/content/site-config';
import { PageHeader } from '@/components/ui/PageHeader';
import { PendingNote } from '@/components/ui/PendingNote';
import { Icon } from '@/components/ui/Icon';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { AnswerBlock } from '@/components/sections/AnswerBlock';
import { SymptomGrid } from '@/components/sections/SymptomGrid';
import { ProcessList } from '@/components/sections/ProcessList';
import { CompareTable } from '@/components/sections/CompareTable';
import { AppliesRow } from '@/components/sections/AppliesRow';
import { RegionGrid } from '@/components/sections/RegionGrid';
import { Proof } from '@/components/sections/Proof';
import { RelatedRow } from '@/components/sections/RelatedRow';
import { FaqList } from '@/components/sections/FaqList';
import { FinalCta } from '@/components/sections/FinalCta';
import { breadcrumbSchema, faqSchema, jsonLd, serviceSchema } from '@/lib/schema';
import { serviceMetadata, serviceTitle, serviceH1, assertH1 } from '@/lib/seo';

// Static export: only these params are generated.
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

// Only services with a full "page" content block get the real template + indexable metadata.
// Every other slug (the tree's level 2/3 stubs) builds as a noindex placeholder.
export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service } = await params;
  const s = getService(service);
  if (!s?.published || !s.page) return { robots: { index: false, follow: false } };
  return serviceMetadata({ title: serviceTitle(s.name), description: s.page.metaDescription, path: `/${s.slug}/` });
}

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

const heroProof = [
  { icon: 'shield', label: 'Licensed C-20 contractor' },
  { icon: 'building', label: 'Residential and commercial' },
  { icon: 'dollar', label: 'Upfront itemized pricing' },
  { icon: 'pin', label: 'Serving 4 Southern California regions' },
];

const relatedIcons: Record<string, string> = { 'ac-installation': 'wrench', 'ac-maintenance': 'calendar-check', 'emergency-hvac': 'alert', 'commercial-hvac': 'building' };

export default async function Page({ params }: { params: Promise<{ service: string }> }) {
  const { service: slug } = await params;
  const s = getService(slug);

  // TODO(data): the other 9 core services and every level 2 slug still need this page's copy before
  // they can publish; they render as a noindex stub in the meantime. Sitemap entries are unaffected
  // since sitemap.ts already filters on `published`.
  if (!s?.published || !s.page) {
    return (
      <>
        <PageHeader eyebrow="Service" title={s?.name ?? 'Service'} />
        <section>
          <div className="wrap">
            <PendingNote>full details for this service are in progress.</PendingNote>
          </div>
        </section>
      </>
    );
  }

  const { page } = s;
  const h1 = serviceH1(s.name);
  assertH1(h1);

  const url = `${siteConfig.url}/${s.slug}/`;
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services/' },
    { name: s.name },
  ];

  const related = [
    ...s.related.map((relSlug) => {
      const rel = getService(relSlug);
      if (!rel) throw new Error(`Unknown related service slug on /${s.slug}/: ${relSlug}`);
      return { name: rel.name, href: `/${rel.slug}/`, icon: relatedIcons[relSlug] ?? rel.icon, image: rel.image };
    }),
    { name: 'Commercial HVAC', href: '/commercial-hvac/', icon: relatedIcons['commercial-hvac'] },
  ];

  const schema = [
    serviceSchema({
      name: s.name,
      description: page.lede,
      url,
      serviceType: 'Air Conditioning Repair',
      areaServed: [
        { name: 'Los Angeles County, CA' },
        { name: 'South Bay, CA' },
        { name: 'Orange County, CA' },
        { name: 'Inland Empire, CA' },
      ],
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
            <HeroHeading h1={h1} emphasis="Los Angeles" />
            <p className="hero-lede">{page.lede}</p>
            <div className="cta-row">
              <Link className="btn btn-primary" href="/contact/">Schedule AC Repair</Link>
              <a className="btn btn-ghost" href={siteConfig.phoneHref}>Call {siteConfig.phone}</a>
            </div>
            <ul className="hero-proof hero-proof-2x2">
              {heroProof.map((p) => (
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
              <span className="photo-caption photo-caption-band photo-caption-silver">AC repair for homes and businesses across Southern California</span>
            </div>
          ) : (
            <div className="photo-pending hero-photo">
              <Icon name={s.icon} size={32} />
              <span className="photo-tag">Photo pending</span>
            </div>
          )}
        </div>
      </section>

      <TrustStrip
        stats={[
          { num: `${siteConfig.rating}★`, label: 'Google rating' },
          { num: String(siteConfig.reviewCount), label: 'Google reviews' },
          { num: 'C-20', label: 'California licensed contractor' },
          { num: '4', label: 'Southern California regions served' },
        ]}
      />

      <AnswerBlock lead={page.answer.lead} body={page.answer.body} />

      <SymptomGrid items={s.symptoms} title="Common signs your AC needs repair" />

      <ProcessList steps={s.process} title="Our AC repair process" />

      {s.repairVsReplace && (
        <CompareTable
          intro={s.repairVsReplace.intro}
          groups={s.repairVsReplace.groups}
          note={s.repairVsReplace.note}
          title="Repair or replace?"
        />
      )}

      <AppliesRow items={page.appliesTo} title="Residential and commercial AC repair" />

      <RegionGrid
        eyebrow="Where we work"
        title="AC repair across Southern California"
        intro="Air Pro Solutions serves four regions across Southern California. Don't see your city? Call us and we will confirm coverage."
        linkLabel={(name) => `AC repair in ${name}`}
      />

      <Proof
        eyebrow="Why Air Pro"
        heading="Clear pricing and a technician who explains what's actually wrong"
        body="Every quote is itemized before we touch a tool. Every repair includes a walkthrough of exactly what was fixed and why."
        ctaLabel="Read our reviews"
        ctaHref="/reviews/"
        stats={[
          { num: `${siteConfig.rating}★`, label: 'Google rating' },
          { num: String(siteConfig.reviewCount), label: 'Google reviews' },
          { num: 'C-20', label: 'California license class' },
          { num: '4', label: 'Regions served' },
        ]}
      />

      <RelatedRow items={related} title="Explore related services" alt={false} />

      <FaqList faqs={page.faqs} eyebrow="Direct answers" title="AC repair questions Southern Californians ask" alt />

      <FinalCta title="Get your AC repair scheduled" body="Call us or request service online." ghostLabel="Schedule AC Repair" />
    </>
  );
}
