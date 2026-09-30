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
import { UrgencyBox } from '@/components/sections/UrgencyBox';
import { DecisionGrid } from '@/components/sections/DecisionGrid';
import { SymptomGrid } from '@/components/sections/SymptomGrid';
import { DiagnosisTable } from '@/components/sections/DiagnosisTable';
import { ProcessList } from '@/components/sections/ProcessList';
import { VisitScope } from '@/components/sections/VisitScope';
import { DataTable } from '@/components/sections/DataTable';
import { TableSection } from '@/components/sections/TableSection';
import { SystemsGrid } from '@/components/sections/SystemsGrid';
import { RefrigerantNote } from '@/components/sections/RefrigerantNote';
import { PriceFactors } from '@/components/sections/PriceFactors';
import { CompareTable } from '@/components/sections/CompareTable';
import { RulesNote } from '@/components/sections/RulesNote';
import { AppliesRow } from '@/components/sections/AppliesRow';
import { RegionGrid } from '@/components/sections/RegionGrid';
import { Proof } from '@/components/sections/Proof';
import { RelatedRow } from '@/components/sections/RelatedRow';
import { FaqList } from '@/components/sections/FaqList';
import { SourcesList } from '@/components/sections/SourcesList';
import { RebateCards } from '@/components/sections/RebateCards';
import { FinalCta } from '@/components/sections/FinalCta';
import { breadcrumbSchema, faqSchema, jsonLd, serviceSchema } from '@/lib/schema';
import { serviceMetadata, serviceTitle, serviceH1, assertH1 } from '@/lib/seo';
import { regions } from '@/content/regions';

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

const defaultHeroProof = [
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
      return { name: page.relatedLabels?.[relSlug] ?? rel.name, href: `/${rel.slug}/`, icon: relatedIcons[relSlug] ?? rel.icon, image: rel.image };
    }),
    // Pages that already list 4 related services (e.g. ac-installation) skip the auto-appended
    // Commercial HVAC card - it's still linked from the "More on this topic" row instead.
    ...(s.related.length <= 3 ? [{ name: 'Commercial HVAC', href: '/commercial-hvac/', icon: relatedIcons['commercial-hvac'] }] : []),
  ];

  const schema = [
    serviceSchema({
      name: s.name,
      description: page.lede,
      url,
      serviceType: page.serviceType,
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

  // Rendered either right after the symptoms section or after pricing - see `page.compareEarly`.
  const compareBlock = s.repairVsReplace && (
    <CompareTable
      intro={s.repairVsReplace.intro}
      groups={s.repairVsReplace.groups}
      note={s.repairVsReplace.note}
      title="Repair or replace?"
      afterNote={
        page.repairReplaceExtra && (
          <>
            {page.repairReplaceExtra.paragraphs.map((p) => (
              <p className="compare-note" key={p}>{p}</p>
            ))}
            <p className="compare-note">
              <Link className="link" href={page.repairReplaceExtra.linkHref}>{page.repairReplaceExtra.linkText}</Link>
            </p>
          </>
        )
      }
    />
  );

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
              <Link className="btn btn-primary" href="/contact/">{page.ctaLabel}</Link>
              <a className="btn btn-ghost" href={siteConfig.phoneHref}>Call {siteConfig.phone}</a>
            </div>
            <ul className="hero-proof hero-proof-2x2">
              {(page.heroProof ?? defaultHeroProof).map((p) => (
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
                <span className="photo-caption photo-caption-band photo-caption-silver">{page.heroCaption}</span>
              )}
            </div>
          ) : (
            <div className="photo-pending hero-photo">
              <Icon name={s.icon} size={32} />
              <span className="photo-tag">Photo pending</span>
            </div>
          )}
        </div>
      </section>

      {/* TODO(data): confirm the C-20 classification against the live CSLB record for #1126691 and
          #50251 before launch. If it does not match, replace this cell with the classification on file. */}
      <TrustStrip
        stats={[
          { num: `${siteConfig.rating}★`, label: 'Google rating' },
          { num: String(siteConfig.reviewCount), label: 'Google reviews' },
          { num: 'C-20', label: page.trustStripLicenseLabel ?? 'California licensed contractor' },
          { num: '4', label: 'Southern California regions served' },
        ]}
      />

      <AnswerBlock lead={page.answer.lead} body={page.answer.body} />

      {page.decision && (
        <DecisionGrid
          eyebrow={page.decision.eyebrow}
          title={page.decision.title}
          intro={page.decision.intro}
          cards={page.decision.cards}
          columns={page.decision.columns}
          outro={page.decision.outro}
          alt
        />
      )}

      {page.urgency && (
        <UrgencyBox
          title={page.urgency.title}
          intro={page.urgency.intro}
          items={page.urgency.items}
          closing={page.urgency.closing}
          ctaLabel={page.ctaLabel}
        />
      )}

      {/* "When to schedule" rule cards (e.g. ac-maintenance): occupies this slot instead of the
          symptom grid on pages with no symptom-diagnosis content - see the `s.symptoms.length` guard
          on SymptomGrid just below. */}
      {page.timing && (
        <RulesNote eyebrow={page.timing.eyebrow} title={page.timing.title} items={page.timing.cards} alt />
      )}

      {s.symptoms.length > 0 && (
        <SymptomGrid
          items={s.symptoms}
          title={page.symptomsTitle ?? 'Common signs to watch for'}
          intro={page.symptomsIntro}
          note={
            page.symptomsNote ? (
              <>
                {page.symptomsNote.before}
                <Link className="link" href={page.symptomsNote.linkHref}>{page.symptomsNote.linkLabel}</Link>
                {page.symptomsNote.after}
              </>
            ) : (
              page.symptomsNoteText
            )
          }
        />
      )}

      {page.diagnosis && (
        <DiagnosisTable
          title={page.diagnosisTitle ?? 'What your AC symptoms can mean'}
          eyebrow={page.diagnosisEyebrow}
          intro={page.diagnosisIntro}
          rows={page.diagnosis}
        />
      )}

      {/* "What the signs can mean" (indoor-air-quality): occupies the same slot as DiagnosisTable
          above, via the generic TableSection component instead, since this page's warning-signs table
          needs a custom second-column header ("What we look at") and a closing note/link that
          DiagnosisTable doesn't support. */}
      {page.signsTable && (
        <TableSection
          eyebrow={page.signsTable.eyebrow}
          title={page.signsTable.title}
          lead={page.signsTable.lead}
          headings={page.signsTable.headings}
          rows={page.signsTable.rows}
          afterText={page.signsTable.afterText}
          afterLinkText={page.signsTable.afterLinkText}
          afterLinkHref={page.signsTable.afterLinkHref}
          alt
        />
      )}

      {/* On most service pages this comparison sits after pricing (see the later render below); a
          page can opt into showing it here instead, right after the symptoms section. */}
      {page.compareEarly && compareBlock}

      <ProcessList steps={s.process} title={page.processTitle} />

      {page.visitIncludes && page.visitExtra && (
        <VisitScope
          eyebrow={page.visitEyebrow ?? 'What to expect'}
          title={page.visitTitle ?? 'What is included and what can cost extra'}
          includesTitle={page.visitIncludesTitle ?? 'What a visit may include'}
          includes={page.visitIncludes}
          extraTitle={page.visitExtraTitle ?? 'What can add to the cost'}
          extra={page.visitExtra}
          extraNote={page.visitExtraNote}
        />
      )}

      {page.timeline && (
        <RefrigerantNote title={page.timeline.heading} body={page.timeline.body} />
      )}

      {/* "Problems a routine visit can find early" (ac-maintenance): a DataTable-backed section with
          a closing note/link, matching the incentives block's pattern below of composing a section
          directly here rather than adding a whole new component for a single caller. */}
      {page.catches && (
        <section>
          <div className="wrap">
            <p className="eyebrow">{page.catches.eyebrow}</p>
            <h2>{page.catches.title}</h2>
            <p className="compare-intro">{page.catches.lead}</p>
            <DataTable columns={page.catches.headings} rows={page.catches.rows} />
            <p className="table-note">
              {page.catches.afterText}
              <Link className="link" href={page.catches.afterLinkHref}>{page.catches.afterLinkText}</Link>
            </p>
          </div>
        </section>
      )}

      {page.systems && (
        <SystemsGrid
          title={page.systemsTitle ?? 'Systems we service'}
          intro={page.systemsIntro}
          items={page.systems}
          alt={page.systemsAlt}
          id={page.systemsSectionId}
        />
      )}

      {page.refrigerant && (
        <RefrigerantNote
          title={page.refrigerant.title}
          body={page.refrigerant.body}
          boldLead={page.refrigerant.boldLead}
          sourceLabel={page.refrigerant.sourceLabel}
          sourceHref={page.refrigerant.sourceHref}
          sourceText={page.refrigerant.sourceText}
        />
      )}

      {/* Two-up explainer callouts (e.g. efficiency + R-410A on ac-maintenance), composed from two
          "bare" RefrigerantNote panels inside one shared section/grid wrapper. Plain (not "alt")
          background so it doesn't sit next to another alt-background section when `systemsAlt` is on. */}
      {page.callouts && (
        <section>
          <div className="wrap">
            <div className="callouts-grid">
              {page.callouts.map((c) => (
                <RefrigerantNote
                  key={c.id}
                  bare
                  accent={c.accent}
                  title={c.title}
                  body={c.body}
                  boldLead={c.boldLead}
                  sourceText={c.sourceText}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* "A Southern California smoke plan" (indoor-air-quality): reuses RulesNote (widened to accept a
          ReactNode item body) so the "Watch the AQI" bullet can embed a real link, built here from
          plain data so the content file stays JSX-free. */}
      {page.smokePlan && (
        <RulesNote
          id={page.smokePlan.id}
          eyebrow={page.smokePlan.eyebrow}
          title={page.smokePlan.title}
          intro={page.smokePlan.intro}
          items={page.smokePlan.items.map((it) => ({
            title: it.title,
            body: (
              <>
                {it.before}
                {it.linkText && it.linkHref && (
                  <a
                    className="link"
                    href={it.linkHref}
                    target={it.linkExternal ? '_blank' : undefined}
                    rel={it.linkExternal ? 'noopener noreferrer' : undefined}
                  >
                    {it.linkText}
                  </a>
                )}
                {it.after}
              </>
            ),
          }))}
          closing={page.smokePlan.closing}
        />
      )}

      {/* "Duct cleaning, sealing, or repair?" and "How your equipment changes the plan"
          (indoor-air-quality): two more TableSection tables, positioned between the smoke plan and
          pricing per that page's copy - see the `signsTable` note above for why TableSection exists
          instead of overloading the `catches` field's fixed position. */}
      {page.ductTable && (
        <TableSection
          eyebrow={page.ductTable.eyebrow}
          title={page.ductTable.title}
          lead={page.ductTable.lead}
          headings={page.ductTable.headings}
          rows={page.ductTable.rows}
          afterText={page.ductTable.afterText}
          afterLinkText={page.ductTable.afterLinkText}
          afterLinkHref={page.ductTable.afterLinkHref}
        />
      )}

      {page.equipmentTable && (
        <TableSection
          eyebrow={page.equipmentTable.eyebrow}
          title={page.equipmentTable.title}
          lead={page.equipmentTable.lead}
          headings={page.equipmentTable.headings}
          rows={page.equipmentTable.rows}
          afterText={page.equipmentTable.afterText}
          afterLinkText={page.equipmentTable.afterLinkText}
          afterLinkHref={page.equipmentTable.afterLinkHref}
          alt
        />
      )}

      {page.priceFactors && (
        <PriceFactors
          title={page.pricingTitle ?? 'What affects repair cost'}
          intro={page.pricingIntro}
          columns={page.pricingColumns}
          rows={page.priceFactors}
          closing={page.pricingClosing}
          notes={page.pricingNotes}
          alt={page.pricingAlt}
        />
      )}

      {!page.compareEarly && compareBlock}

      {page.rules && (
        <RulesNote eyebrow={page.rulesEyebrow} title={page.rulesTitle ?? 'Licensing, permits, and energy-code basics'} items={page.rules} />
      )}

      {/* "If an upgrade turns into a replacement" (indoor-air-quality): a single RefrigerantNote-shaped
          explainer positioned right before the rebates section - distinct from the `refrigerant` and
          `timeline` fields above because both render at earlier fixed positions than this page needs. */}
      {page.replacementNote && (
        <RefrigerantNote
          title={page.replacementNote.title}
          body={page.replacementNote.body}
          sourceText={page.replacementNote.sourceText}
        />
      )}

      {page.incentives && (
        <section>
          <div className="wrap">
            <p className="eyebrow">{page.incentives.eyebrow}</p>
            <h2>{page.incentives.heading}</h2>
            <p className="compare-intro">{page.incentives.lead}</p>
            <RebateCards
              cards={page.incentives.items.map((it) => ({
                amount: it.name,
                description: it.body,
                linkLabel: it.link.label,
                linkHref: it.link.href,
              }))}
            />
          </div>
        </section>
      )}

      {/* Plain rebates callout (ac-maintenance): a single body paragraph plus a short external-link
          list, distinct from the three-card `incentives` block above (used by ac-installation). */}
      {page.rebatesNote && (
        <section className="alt">
          <div className="wrap">
            <h2>{page.rebatesNote.title}</h2>
            <p className="compare-intro">{page.rebatesNote.body}</p>
            <p className="table-note">
              {page.rebatesNote.links.map((l, i) => (
                <span key={l.href}>
                  <a className="link" href={l.href} target="_blank" rel="noopener noreferrer">{l.text}</a>
                  {i < page.rebatesNote!.links.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </p>
          </div>
        </section>
      )}

      <AppliesRow
        items={page.appliesTo}
        title={page.appliesTitle}
        paragraph={
          page.appliesParagraph && (
            <>
              {page.appliesParagraph}{' '}
              {page.appliesLinks?.map((l, i) => (
                <span key={l.href}>
                  <Link className="link" href={l.href}>{l.label}</Link>
                  {i < (page.appliesLinks?.length ?? 0) - 1 ? ' · ' : ''}
                </span>
              ))}
            </>
          )
        }
      />

      <RegionGrid
        eyebrow="Where we work"
        title={page.regionTitle}
        showCities={!page.regionConditions}
        bodyFor={page.regionConditions ? (slug) => page.regionConditions?.find((c) => c.regionSlug === slug)?.body ?? '' : undefined}
        intro={
          page.regionIntro ? (
            <>
              {page.regionIntro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </>
          ) : (
            "Air Pro Solutions serves four regions across Southern California. Don't see your city? Call us and we will confirm coverage."
          )
        }
        linkLabel={(name) => {
          if (page.regionLinkLabels) {
            const slug = regions.find((r) => r.name === name)?.slug;
            const override = slug && page.regionLinkLabels[slug];
            if (override) return override;
          }
          return `${page.regionLinkVerb} in ${name}`;
        }}
        footer={page.regionClosing}
        id={page.regionSectionId}
      />

      <Proof
        eyebrow="Why Air Pro"
        heading={page.proofHeading ?? "Clear pricing and a technician who explains what's actually wrong"}
        body={page.proofBody ?? 'Every quote is itemized before we touch a tool. Every repair includes a walkthrough of exactly what was fixed and why.'}
        ctaLabel="Read our reviews"
        ctaHref="/reviews/"
        stats={[
          { num: `${siteConfig.rating}★`, label: 'Google rating' },
          { num: String(siteConfig.reviewCount), label: 'Google reviews' },
          { num: 'C-20', label: 'California license class' },
          { num: '4', label: 'Regions served' },
        ]}
      />

      <RelatedRow items={related} title="Explore related services" alt={false} moreLinks={page.moreLinks} />

      <FaqList faqs={page.faqs} eyebrow="Direct answers" title={page.faqTitle} alt firstOpen boldFirstSentence id={page.faqSectionId} />

      {page.sources && <SourcesList items={page.sources} columns={page.sourcesColumns} />}

      <FinalCta title={page.finalCtaTitle} body={page.finalCtaBody} ghostLabel={page.ctaLabel} />
    </>
  );
}
