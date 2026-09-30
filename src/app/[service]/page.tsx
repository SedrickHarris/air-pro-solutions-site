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
  // `metaServiceName` (e.g. /ductwork/'s "Ductwork Services") overrides the display string the
  // title/H1 formulas build from; falls back to the real service name for every other page.
  return serviceMetadata({ title: serviceTitle(s.page.metaServiceName ?? s.name), description: s.page.metaDescription, path: `/${s.slug}/` });
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
  const h1 = serviceH1(page.metaServiceName ?? s.name);
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
      return { name: page.relatedLabels?.[relSlug] ?? rel.name, href: `/${rel.slug}/`, icon: page.relatedIconOverrides?.[relSlug] ?? page.relatedIcons?.[relSlug] ?? relatedIcons[relSlug] ?? rel.icon, image: rel.image };
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
      eyebrow={page.compareEyebrow}
      title={page.compareTitle ?? 'Repair or replace?'}
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

  // "Where it fits" + "Systems we service" card grids (ductless-mini-split). Normally rendered in the
  // same slot as every other page's `systems` grid (after the visit-scope section, before the
  // refrigerant callout); `page.systemsEarly` moves both right after the diagnosis table instead, to
  // match this page's approved content order. See `page.fitGrid`/`page.systemsId`/`page.systemsNote`.
  const systemsBlock = (
    <>
      {page.fitGrid && (
        <SystemsGrid
          id={page.fitGrid.id}
          eyebrow={page.fitGrid.eyebrow}
          title={page.fitGrid.title}
          intro={page.fitGrid.intro}
          items={page.fitGrid.items}
        />
      )}
      {page.systems && (
        <SystemsGrid
          id={page.systemsId}
          eyebrow={page.systemsEyebrow}
          title={page.systemsTitle ?? 'Systems we service'}
          intro={page.systemsIntro}
          items={page.systems}
          alt={page.systemsAlt}
          note={
            page.systemsNote && (
              <>
                {page.systemsNote.before}
                <Link className="link" href={page.systemsNote.linkHref}>{page.systemsNote.linkLabel}</Link>
                {page.systemsNote.after}
              </>
            )
          }
        />
      )}
    </>
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
          alt
        />
      )}

      {page.urgency && (
        <UrgencyBox
          title={page.urgency.title}
          intro={page.urgency.intro}
          items={page.urgency.items}
          closing={page.urgency.closing}
          ctaLabel={page.urgency.ctaLabel ?? page.ctaLabel}
        />
      )}

      {/* "How a heat pump heats, cools, and defrosts" (heat-pump-services): three short explainer
          cards, rendered via RulesNote right after the urgency box and before the symptoms/diagnosis
          section. Distinct from `timing` below (occupies the SymptomGrid slot) and `rules` (licensing/
          permits, rendered after pricing). */}
      {page.basics && (
        <RulesNote eyebrow={page.basics.eyebrow} title={page.basics.heading} items={page.basics.cards} />
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
          eyebrow={page.symptomsEyebrow}
          id={page.symptomsId}
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
          causesHeading={page.diagnosisColumns?.[1]}
          note={
            page.diagnosisNote && (
              <>
                {page.diagnosisNote.before}
                <Link className="link" href={page.diagnosisNote.linkHref}>{page.diagnosisNote.linkLabel}</Link>
                {page.diagnosisNote.middle}
                <Link className="link" href={page.diagnosisNote.linkHref2}>{page.diagnosisNote.linkLabel2}</Link>
                {page.diagnosisNote.after}
              </>
            )
          }
        />
      )}

      {/* On most service pages this comparison sits after pricing (see the later render below); a
          page can opt into showing it here instead, right after the symptoms section. */}
      {page.compareEarly && compareBlock}

      {page.systemsEarly && systemsBlock}

      <ProcessList steps={s.process} title={page.processTitle} note={page.processNote} />

      {/* "Repair, seal, replace, or redesign?" (ductwork): a 3-column DataTable-backed section with
          a closing note/link, composed directly here the same way `catches` is below - the existing
          CompareTable component's pros/cons layout doesn't fit a 4-row, 3-column decision table. */}
      {page.optionsTable && (
        <section id="options">
          <div className="wrap">
            <p className="eyebrow">{page.optionsTable.eyebrow}</p>
            <h2>{page.optionsTable.title}</h2>
            <p className="compare-intro">{page.optionsTable.lead}</p>
            <DataTable columns={page.optionsTable.columns} rows={page.optionsTable.rows} />
            <p className="table-note">
              {page.optionsTable.noteBefore}
              <Link className="link" href={page.optionsTable.noteLinkHref}>{page.optionsTable.noteLinkText}</Link>
            </p>
          </div>
        </section>
      )}

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

      {/* "Single-zone, multi-zone, or concealed ducted?" layout table (ductless-mini-split), composed
          inline from the shared DataTable - the same pattern as `catches`/`comparisonTable` below. */}
      {page.layoutTable && (
        <section>
          <div className="wrap">
            <p className="eyebrow">{page.layoutTable.eyebrow}</p>
            <h2>{page.layoutTable.title}</h2>
            <DataTable columns={page.layoutTable.columns} rows={page.layoutTable.rows} note={page.layoutTable.note} />
          </div>
        </section>
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

      {!page.systemsEarly && systemsBlock}

      {/* "Systems that use ductwork" (ductwork): a 2-column DataTable-backed section with a closing
          link row, composed directly here the same way `optionsTable` is above and `catches` is
          elsewhere on this page. */}
      {page.equipmentTable && (
        <section className={page.systemsAlt ? undefined : 'alt'}>
          <div className="wrap">
            <p className="eyebrow">{page.equipmentTable.eyebrow}</p>
            <h2>{page.equipmentTable.title}</h2>
            <DataTable columns={page.equipmentTable.columns} rows={page.equipmentTable.rows} />
            <p className="more-links">
              {page.equipmentTable.links.map((l, i) => (
                <span key={l.href}>
                  <Link href={l.href}>{l.text}</Link>
                  {i < page.equipmentTable!.links.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </p>
          </div>
        </section>
      )}

      {/* Generic 3+ column comparison table (e.g. furnace-installation's "Gas furnace or heat pump"),
          composed directly from the shared DataTable - the same "compose inline, don't add a
          single-purpose component" pattern already used for `catches` above. */}
      {page.comparisonTable && (
        <section id={page.comparisonTable.id}>
          <div className="wrap">
            <p className="eyebrow">{page.comparisonTable.eyebrow}</p>
            <h2>{page.comparisonTable.title}</h2>
            {page.comparisonTable.intro && <p className="compare-intro">{page.comparisonTable.intro}</p>}
            <DataTable columns={page.comparisonTable.columns} rows={page.comparisonTable.rows} note={page.comparisonTable.note} />
          </div>
        </section>
      )}

      {page.refrigerant && (
        <RefrigerantNote
          title={page.refrigerant.title}
          introBody={page.refrigerant.introBody}
          body={page.refrigerant.body}
          boldLead={page.refrigerant.boldLead}
          body2={page.refrigerant.body2}
          sourceLabel={page.refrigerant.sourceLabel}
          sourceHref={page.refrigerant.sourceHref}
          sourceText={page.refrigerant.sourceText}
          accent={page.refrigerant.accent}
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

      {/* Single-paragraph warranty callout (heat-pump-services), rendered as a plain (no accent, no
          source) RefrigerantNote panel between licensing/permits and rebates. */}
      {page.warranty && (
        <RefrigerantNote title={page.warranty.heading} body={page.warranty.body} />
      )}

      {page.incentives && (
        <section>
          <div className="wrap">
            <p className="eyebrow">{page.incentives.eyebrow}</p>
            <h2>{page.incentives.heading}</h2>
            {page.incentives.lead && <p className="compare-intro">{page.incentives.lead}</p>}
            <RebateCards
              cards={page.incentives.items.map((it) => ({
                amount: it.headline ?? it.name,
                label: it.headline ? it.name : undefined,
                description: it.body,
                linkLabel: it.link.label,
                linkHref: it.link.href,
              }))}
            />
            {page.incentives.closingNote && <p className="table-note">{page.incentives.closingNote}</p>}
          </div>
        </section>
      )}

      {/* Second VisitScope-shaped block (e.g. furnace-installation's "Before you sign" proposal
          checklist), distinct from the visitIncludes/visitExtra pair rendered earlier. */}
      {page.checklist && (
        <VisitScope
          eyebrow={page.checklist.eyebrow}
          title={page.checklist.title}
          includesTitle={page.checklist.includesTitle}
          includes={page.checklist.includes}
          includesIcon={page.checklist.includesIcon}
          extraTitle={page.checklist.extraTitle}
          extra={page.checklist.extra}
          extraIcon={page.checklist.extraIcon}
        />
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
        eyebrow={page.appliesEyebrow}
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

      <FaqList faqs={page.faqs} eyebrow="Direct answers" title={page.faqTitle} alt firstOpen boldFirstSentence />

      {page.sources && <SourcesList items={page.sources} columns={page.sourcesColumns} eyebrow={page.sourcesEyebrow} />}

      <FinalCta title={page.finalCtaTitle} body={page.finalCtaBody} ghostLabel={page.ctaLabel} />
    </>
  );
}
