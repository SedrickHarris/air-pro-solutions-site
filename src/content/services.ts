import type { Faq } from '@/content/faq';
import { acInstallationPage } from '@/content/ac-installation-page';
import { acMaintenancePage } from '@/content/ac-maintenance-page';
import { heatingRepairPage } from '@/content/heating-repair-page';
import { ductlessMiniSplitPage } from '@/content/ductless-mini-split-page';
import { furnaceInstallationPage } from '@/content/furnace-installation-page';
import { heatPumpServicesPage } from '@/content/heat-pump-services-page';
import { ductworkPage } from '@/content/ductwork-page';
import { indoorAirQualityPage } from '@/content/indoor-air-quality-page';
import type { DecisionCard } from '@/components/sections/DecisionGrid';

export type ServiceImage = { src: string; alt: string };

// Full service-page template content. Only populated for services with real, approved copy;
// see the "page" field below. Other services stay as noindex stubs until they get this block.
export type ServicePage = {
  primaryKeyword: string;
  // Title/H1 are built from src/lib/seo.ts (serviceTitle/serviceH1) per CLAUDE.md, not hand-written here.
  metaDescription: string;
  lede: string; // also the Service JSON-LD description - must stay word-for-word identical to the visible copy
  heroImage?: ServiceImage; // 1200x900 hero photo; falls back to the "photo pending" tile when absent
  heroCaption?: string; // shown on the hero photo caption band when heroImage is set
  heroProof: { icon: string; label: string }[];
  serviceType: string; // schema.org Service.serviceType, e.g. "Air Conditioning Repair"
  ctaLabel: string; // e.g. "Schedule AC Repair" - reused for the hero primary button and final CTA ghost button
  // Optional because a page with no symptom-diagnosis content (e.g. ac-maintenance, which uses
  // `decision` cards instead) skips SymptomGrid entirely - see the `s.symptoms.length` guard in
  // src/app/[service]/page.tsx.
  symptomsTitle?: string;
  processTitle: string;
  appliesTitle: string;
  regionTitle: string; // e.g. "AC repair across Southern California"
  regionLinkVerb: string; // e.g. "AC repair" -> renders as "{verb} in {region name}"
  faqTitle: string;
  finalCtaTitle: string;
  finalCtaBody: string;
  answer: { lead: string; body: string };
  appliesTo: { label: string; icon: string }[];
  faqs: Faq[];

  // --- Expanded /ac-repair/ template fields below. All optional so the other nine core services
  // (which still only carry the fields above, or none of them) keep building as noindex stubs. ---
  // ctaLabel added for /heat-pump-services/, whose approved "Request a Diagnosis" urgency-box button
  // reads differently from the page's primary "Schedule Heat Pump Service" CTA. Optional so every
  // other caller (whose urgency box already reuses `page.ctaLabel`) is unaffected.
  urgency?: { title: string; intro: string; items: string[]; closing: string; ctaLabel?: string };
  diagnosisIntro?: string;
  diagnosis?: { notices: string; causes: string }[];
  visitTitle?: string;
  visitIncludesTitle?: string;
  visitIncludes?: string[];
  visitExtraTitle?: string;
  visitExtra?: string[];
  visitExtraNote?: string;
  systemsTitle?: string;
  systemsIntro?: string;
  systems?: { name: string; body: string; icon: string; link?: { label: string; href: string } }[];
  // sourceLabel/sourceHref render a linked "Source: ..." line; sourceText (added for /heating-repair/,
  // which cites two sources with no single URL to link) renders a plain, non-linked line instead when
  // sourceHref is absent - mirrors the sourceText/boldLead options RefrigerantNote already supports.
  // accent/body2 added for /furnace-installation/'s "Furnace only, or the whole system?" callout
  // (sky-accented panel, two paragraphs before the source line). Optional so every other caller
  // (a plain, unaccented, single-paragraph panel) is unaffected.
  // introBody added for /heat-pump-services/'s R-410A callout, whose approved copy states the
  // new-install rule first, then bolds "Existing R-410A systems are not banned." as its own leading
  // sentence, then continues - one paragraph more than boldLead+body alone can express. Optional so
  // every other caller (whose boldLead already opens the panel) is unaffected.
  refrigerant?: { title: string; introBody?: string; body: string; boldLead?: string; body2?: string; sourceLabel?: string; sourceHref?: string; sourceText?: string; accent?: 'sky' | 'amber' };
  pricingTitle?: string;
  pricingIntro?: string;
  priceFactors?: { item: string; drivers: string }[];
  pricingClosing?: string;
  pricingColumns?: [string, string]; // overrides PriceFactors' default ['Repair type', 'What moves the price']
  pricingNotes?: string[]; // additional closing paragraphs, rendered after pricingClosing
  // Extra prose rendered after the repair-vs-replace table/note (ENERGY STAR guidance + a link to
  // the replacement comparison page).
  repairReplaceExtra?: { paragraphs: string[]; linkText: string; linkHref: string };
  rulesTitle?: string;
  rules?: { title: string; body: string }[];
  appliesParagraph?: string;
  appliesLinks?: { label: string; href: string }[];
  // Per-region conditional copy for the "where we work" section. Deliberately does not list cities
  // (see CLAUDE.md doorway-page rule) - each region gets genuinely different, source-backed copy.
  regionIntro?: string[];
  regionConditions?: { regionSlug: string; body: string }[];
  regionClosing?: string;
  moreLinks?: { text: string; href: string }[];
  sources?: { label: string; url: string }[];
  sourcesColumns?: 1 | 2; // 2 for a longer source list (e.g. ac-installation); defaults to 1 (ac-repair)

  // --- Additional fields used by the /ac-installation/ template. Optional so ac-repair (and every
  // other service) is unaffected. ---
  symptomsIntro?: string; // lead paragraph rendered between the symptoms h2 and the card grid
  symptomsNote?: { before: string; linkLabel: string; linkHref: string; after?: string }; // line below the symptom grid, with an inline link
  // Plain-text alternative to `symptomsNote` for a note with no link (e.g. /heating-repair/'s seasonal
  // note). Only used when `symptomsNote` is unset.
  symptomsNoteText?: string;
  // Title/eyebrow overrides for the "what your symptoms can mean" DiagnosisTable, which otherwise
  // hardcodes an AC-specific title in src/app/[service]/page.tsx. Optional so ac-repair (the only
  // other page using `diagnosis`) keeps its existing wording.
  diagnosisTitle?: string;
  diagnosisEyebrow?: string;
  visitEyebrow?: string; // overrides VisitScope's default "What to expect" eyebrow
  timeline?: { heading: string; body: string }; // plain callout rendered via RefrigerantNote with no source line
  rulesEyebrow?: string; // overrides RulesNote's default "Good to know" eyebrow
  incentives?: {
    eyebrow: string;
    heading: string;
    // Made optional for /furnace-installation/, whose approved copy has no intro sentence between
    // the heading and the cards - every existing caller still supplies one.
    lead?: string;
    // headline/closingNote added for /furnace-installation/: `headline` is a confirmed dollar figure
    // shown as the card's big number (RebateCards' `amount`), with the program `name` demoted to a
    // small label above it, and `closingNote` is a paragraph rendered below the whole card row.
    // Both optional so ac-installation/heating-repair (which show the program name as the big
    // number and have no closing paragraph) are unaffected.
    items: { name: string; headline?: string; body: string; link: { label: string; href: string; external?: boolean } }[];
    closingNote?: string;
  };
  proofHeading?: string; // overrides the shared Proof section heading
  proofBody?: string; // overrides the shared Proof section body
  // When true, the repair-vs-replace CompareTable renders right after the symptoms section instead
  // of its default position (after pricing). Defaults to false/undefined so ac-repair is unaffected.
  compareEarly?: boolean;

  // --- Additional fields used by the /ac-maintenance/ template. Optional so every other service page
  // (which does not set these) is unaffected. See the AC Maintenance build report for why these were
  // added as new optional fields on the existing shape instead of a parallel content system. ---
  // "Maintenance, repair, or replacement?" decision cards, rendered via DecisionGrid right after the
  // quick-answer AnswerBlock.
  // `outro` (added for /indoor-air-quality/) is a closing line rendered below the card grid; optional
  // so ac-maintenance's decision block (which has none) is unaffected.
  decision?: { eyebrow: string; title: string; intro?: string; cards: DecisionCard[]; columns?: 2 | 3 | 4; outro?: string };
  // "When to schedule" rule cards, rendered via RulesNote in the same slot as SymptomGrid on pages
  // that don't have symptom-diagnosis content (see `s.symptoms.length` guard in page.tsx).
  timing?: { eyebrow: string; title: string; cards: { title: string; body: string }[] };
  // Visual-rhythm overrides (Part 2 refinement pass): alternate the paper/paper-dim background on the
  // systems and pricing sections so a long page doesn't run many same-background sections in a row.
  // Optional and false by default so ac-repair/ac-installation's existing look is unchanged.
  systemsAlt?: boolean;
  pricingAlt?: boolean;
  // "Problems a routine visit can find early" - a DataTable-backed section with a closing note/link,
  // rendered right after VisitScope and before SystemsGrid.
  catches?: {
    eyebrow: string;
    title: string;
    lead: string;
    headings: [string, string];
    rows: [string, string][];
    afterText: string;
    afterLinkText: string;
    afterLinkHref: string;
  };
  // A pair of RefrigerantNote-style explainer callouts (e.g. efficiency + R-410A), rendered side by
  // side in one section right after the single `refrigerant` callout slot.
  callouts?: {
    id: string;
    accent: 'sky' | 'amber';
    title: string;
    body: string;
    boldLead?: string;
    sourceText?: string;
  }[];
  // Plain rebates/incentives callout: one body paragraph plus a short list of external links.
  // Distinct from `incentives` (three RebateCards with dollar-free per-program summaries), because
  // this page's approved copy is a single paragraph with two links, not three cards.
  rebatesNote?: { title: string; body: string; links: { text: string; href: string }[] };
  // Per-region link label overrides for RegionGrid, keyed by region slug (from src/content/regions.ts).
  // Falls back to the default "{regionLinkVerb} in {region name}" formula when unset, so every other
  // service page is unaffected.
  regionLinkLabels?: Record<string, string>;
  // Overrides the hardcoded "California licensed contractor" trust-strip label (see page.tsx). Optional
  // so ac-repair/ac-installation keep their existing wording.
  trustStripLicenseLabel?: string;

  // --- Additional field used by the /heating-repair/ template. Per-related-card label override
  // (keyed by the related service's slug), since the related-services renderer otherwise always shows
  // the target service's real `name` (see the "HVAC Maintenance" -> /ac-maintenance/ TODO(copy) in
  // heating-repair-page.ts). Optional so every other service page's related row is unaffected.
  relatedLabels?: Record<string, string>;

  // --- Additional fields used by the /furnace-installation/ template. All optional so ac-repair,
  // ac-installation, ac-maintenance, and heating-repair (none of which set these) are unaffected. See
  // the Furnace Installation build report for why these were added as new optional fields on the
  // existing shape instead of a parallel content system. ---
  // Overrides SymptomGrid's default "Signs you need this" eyebrow (page.tsx never passed an eyebrow
  // before this page, so every existing service page keeps that default).
  symptomsEyebrow?: string;
  // Overrides SystemsGrid's default "Equipment" eyebrow (used for /ductwork/'s "Parts" grid).
  systemsEyebrow?: string;
  // Overrides DiagnosisTable's second column header (see the causesHeading prop added there).
  diagnosisColumns?: [string, string];
  // A generic 3+ column comparison table (e.g. "Gas furnace or heat pump"), composed inline in
  // page.tsx from the shared DataTable component - the same "compose directly, don't add a
  // single-purpose section component" pattern already used for `catches` below.
  comparisonTable?: {
    // Anchor id added for /heat-pump-services/'s "Repair or replace your heat pump" table, which a
    // DecisionGrid card jumps to via `href="#repair-replace"`. Optional so every other caller (with
    // no in-page jump link to this section) is unaffected.
    id?: string;
    eyebrow: string;
    title: string;
    intro?: string;
    columns: string[];
    rows: string[][];
    note?: string;
  };
  // Closing paragraph rendered below ProcessList's numbered steps (see the `note` prop added there).
  processNote?: string;
  // Desktop column-count override for ProcessList (see the `columns` prop added there). Unset for
  // every page except AC Maintenance, whose 6-step process renders 2x3 instead of the default 5-wide
  // grid, which would wrap unevenly for a 6-item list.
  processColumns?: 2 | 3 | 5;
  // A second VisitScope-shaped block rendered after the incentives/rebatesNote section (e.g.
  // furnace-installation's "Before you sign" proposal checklist) - distinct from the
  // visitIncludes/visitExtra pair above, which renders right after the process steps.
  checklist?: {
    eyebrow: string;
    title: string;
    includesTitle: string;
    includes: string[];
    includesIcon?: string;
    extraTitle: string;
    extra: string[];
    extraIcon?: string;
  };
  // Overrides AppliesRow's default "Who this is for" eyebrow (page.tsx never passed an eyebrow
  // before this page, so every existing service page keeps that default).
  appliesEyebrow?: string;
  // Overrides SourcesList's default (no eyebrow above "Sources").
  sourcesEyebrow?: string;
  // Per-related-card icon override (keyed by the related service's slug), analogous to
  // `relatedLabels` above but for the icon instead of the name - needed because the shared
  // `relatedIcons` map in page.tsx is used by every service page's related row and can't be changed
  // per page without affecting ac-installation's and heating-repair's already-shipped related cards.
  relatedIconOverrides?: Record<string, string>;

  // --- Additional fields used by the /ductless-mini-split/ template. All optional so every other
  // service page (none of which set these) is unaffected. See the Ductless Mini-Split build report
  // for why these were added as new optional fields on the existing shape instead of a parallel
  // content system. ---
  // Anchor id for the SymptomGrid section, needed so this page's "Start here" DecisionGrid can jump
  // to `#signs`. Optional so every other caller (with no in-page jump links) is unaffected.
  symptomsId?: string;
  // "Where it fits" card grid, rendered via SystemsGrid alongside (and normally right before) the
  // main `systems` grid below. Kept as a separate field because this page needs two distinct
  // SystemsGrid-shaped sections rather than one.
  fitGrid?: { id?: string; eyebrow: string; title: string; intro?: string; items: { name: string; body: string; icon: string; link?: { label: string; href: string } }[] };
  // Anchor id and a trailing note-with-link for the main `systems` SystemsGrid, needed so this page's
  // "Start here" DecisionGrid can jump to `#systems` and so the section can point readers to
  // /commercial-hvac/ for rooftop/packaged equipment. Optional so every other caller is unaffected.
  systemsId?: string;
  systemsNote?: { before: string; linkLabel: string; linkHref: string; after?: string };
  // When true, renders `fitGrid` and `systems` right after the diagnosis table and before the process
  // steps, instead of their default position (after the visit-scope section, before the refrigerant
  // callout) - matching this page's approved content order. Defaults to false/undefined so every
  // other service page's section order is unaffected.
  systemsEarly?: boolean;
  // A simple 3-column layout-comparison table (Option / Often fits / Plan for), composed inline from
  // the shared DataTable - the same "compose directly, don't add a single-purpose component" pattern
  // already used for `catches` and `comparisonTable`. Distinct from `comparisonTable` only in that it
  // has a single closing note instead of an intro + optional note, matching this page's approved copy.
  layoutTable?: { eyebrow: string; title: string; note?: string; columns: string[]; rows: string[][] };
  // Overrides the shared CompareTable's default eyebrow ("Not sure which you need?") and the
  // hardcoded "Repair or replace?" title in page.tsx. Optional so every other service page keeps its
  // existing generic heading.
  compareEyebrow?: string;
  compareTitle?: string;

  // --- Additional fields used by the /heat-pump-services/ template. All optional so every other
  // service page (none of which set these) is unaffected. See the Heat Pump Services build report for
  // why these were added as new optional fields on the existing shape instead of a parallel content
  // system. ---
  // "How a heat pump heats, cools, and defrosts" - three short explainer cards, rendered via RulesNote
  // right after the urgency box and before the symptoms/diagnosis section. Distinct from `timing`
  // (which occupies the SymptomGrid slot) and `rules` (licensing/permits, rendered after pricing).
  basics?: { eyebrow: string; heading: string; cards: { title: string; body: string }[] };
  // Closing line rendered below the DiagnosisTable (e.g. a link to AC repair/heating repair for
  // single-mode-only symptoms). Two links, unlike the single-link `symptomsNote`/`systemsNote` shape,
  // so it gets its own small dedicated shape rather than a generic rich-text array. Optional so every
  // other DiagnosisTable caller (ac-repair, heating-repair, furnace-installation) is unaffected.
  diagnosisNote?: { before: string; linkLabel: string; linkHref: string; middle: string; linkLabel2: string; linkHref2: string; after?: string };
  // Single-paragraph warranty callout, rendered via RefrigerantNote (plain, no accent/source) right
  // after the licensing/permits `rules` section and before `incentives`.
  warranty?: { heading: string; body: string };

  // --- Additional fields used by the /ductwork/ template. Optional so every other service page
  // (which does not set these) is unaffected - see the Ductwork build report for why these were
  // added as new optional fields on the existing shape instead of a parallel content system. ---
  // Overrides the display name that serviceTitle()/serviceH1() (src/lib/seo.ts) build the page's
  // title/H1 from. Falls back to the service's real `name` (used everywhere else: breadcrumbs, nav,
  // related-service card default labels) when unset, so every other service page is unaffected. Added
  // because Ductwork's approved title/H1 keyword is "Ductwork Services in Los Angeles ...", one word
  // longer than the site's actual service name "Ductwork" (which the breadcrumb and other pages'
  // related-link text must keep using unchanged).
  metaServiceName?: string;
  // Per-related-card icon override, keyed by the related service's slug. Falls back to
  // `relatedIconOverrides` above, then the page-level `relatedIcons` map in
  // src/app/[service]/page.tsx, then the related service's own `icon`, so every other service page's
  // related row is unaffected.
  relatedIcons?: Record<string, string>;
  // "Repair, seal, replace, or redesign?" 3-column comparison table, rendered right after the process
  // steps and before the included/extra scope section, via a DataTable-backed block composed
  // directly in src/app/[service]/page.tsx (matching the existing `catches` composition pattern).
  optionsTable?: {
    eyebrow: string;
    title: string;
    lead: string;
    columns: [string, string, string];
    rows: [string, string, string][];
    noteBefore: string;
    noteLinkText: string;
    noteLinkHref: string;
  };
  // "Systems that use ductwork" 2-column comparison table with a closing link row, rendered right
  // after the parts grid (the `systems` field) and before the `refrigerant`/`callouts` slot, via the
  // same DataTable composition pattern as `optionsTable`.
  equipmentTable?: {
    eyebrow: string;
    title: string;
    columns: [string, string];
    rows: [string, string][];
    links: { text: string; href: string }[];
  };

  // --- Additional fields used by the /indoor-air-quality/ template. All optional so every other
  // service page (which does not set these) is unaffected. See the Indoor Air Quality build report
  // for why these were added as new optional fields/props on the existing shape instead of a parallel
  // content system, and for why this page's section order doesn't line up with several of the
  // above fields' fixed render positions in src/app/[service]/page.tsx. ---
  // Generic "eyebrow + h2 + lead + two-column table + closing note/link" section content, rendered via
  // the new TableSection component (src/components/sections/TableSection.tsx) - a thin DataTable
  // wrapper, same shape as DiagnosisTable/the `catches` block, reused three times on this page for
  // tables that don't share DiagnosisTable's or `catches`' fixed position in page.tsx.
  signsTable?: TableSectionContent; // "What the signs can mean" (warning-signs table)
  ductTable?: TableSectionContent; // "Duct cleaning, sealing, or repair?"
  // Named distinctly from ductwork's `equipmentTable` above (different shape: columns/links vs.
  // headings/afterText) - "How your equipment changes the plan".
  equipmentFitTable?: TableSectionContent;
  // "A Southern California smoke plan" - rendered via RulesNote (widened to accept a ReactNode item
  // body so one bullet can embed a link), composed from plain data here and built into JSX in page.tsx
  // so this content file stays JSX-free like every other content file in src/content/.
  smokePlan?: {
    eyebrow: string;
    title: string;
    id?: string;
    intro?: string;
    items: { title: string; before: string; linkText?: string; linkHref?: string; linkExternal?: boolean; after?: string }[];
    closing?: string;
  };
  // "If an upgrade turns into a replacement" - a single RefrigerantNote-shaped explainer, distinct
  // from the `refrigerant` and `timeline` fields above because both of those are bound to earlier
  // fixed positions in page.tsx than this page needs (right before the `rebatesNote` incentives
  // section, not right after SystemsGrid or VisitScope).
  replacementNote?: { title: string; body: string; sourceText?: string };
  // Anchor-id overrides for internal linking (e.g. this page's "#filtration"/"#areas"/"#resources").
  // Unset by default so every other service page's SystemsGrid/RegionGrid/FaqList is unaffected.
  systemsSectionId?: string;
  regionSectionId?: string;
  faqSectionId?: string;
};

type TableSectionContent = {
  eyebrow: string;
  title: string;
  lead?: string;
  headings: [string, string];
  rows: [string, string][];
  afterText?: string;
  afterLinkText?: string;
  afterLinkHref?: string;
};

export type Service = {
  slug: string;
  name: string;
  icon: string;
  family: string; // service family the page belongs to (for internal linking and hubs)
  level: 1 | 2; // 1 = parent/hub in the tree, 2 = child page (level 3 commercial pages live in commercial.ts)
  parent?: string; // slug of the hub page this child belongs to, per the page tree below
  published: boolean; // false = builds as a noindex stub, excluded from the sitemap and the contact form
  image?: ServiceImage; // 800x600 card image; falls back to the "photo pending" tile when absent
  description: string; // TODO(copy) where empty - short blurb used on hub/card contexts
  symptoms: { lead: string; detail: string }[]; // TODO(copy)
  process: { title: string; body: string }[]; // TODO(copy)
  repairVsReplace: {
    intro?: string;
    note?: string;
    groups: { heading: string; icon: string; items: string[] }[]; // exactly 2: repair, then replace
  } | null; // TODO(copy)
  related: string[]; // slugs
  page?: ServicePage; // full template content; only ac-repair has this so far
};

type Opts = { description?: string; image?: ServiceImage };

const make = (level: 1 | 2, published: boolean) =>
  (family: string, slug: string, name: string, icon: string, o: Opts = {}): Service => ({
    slug, name, icon, family, level, published,
    image: o.image,
    description: o.description ?? '',
    symptoms: [], process: [], repairVsReplace: null, related: [],
  });

const core = make(1, true); // core services
const l2 = make(2, false); // second-level pages: noindex stubs until real copy exists

// Card images live in public/images/services/cards (800x600 WebP, made from the 2896x2172 originals in
// public/images/services/service-cards). Alt text describes the picture only; these are not job photos.
const card = (slug: string, alt: string): ServiceImage => ({ src: `/images/services/cards/${slug}.webp`, alt });

// Full template content for /ac-repair/. Locked copy - see CLAUDE.md "Claims that must not ship"
// before adding anything here: no pricing, timing, brand-list, or availability claims.
const acRepairPage: ServicePage = {
  primaryKeyword: 'ac repair los angeles',
  metaDescription:
    'Get AC repair in Los Angeles for homes and businesses. AIRPRO SOLUTIONS diagnoses cooling, airflow, electrical, and drainage problems. Schedule service.',
  lede:
    // TODO(data): confirm with client that written pricing before authorization is real process
    "No cooling, weak airflow, strange noises, or water leaks? AIRPRO SOLUTIONS provides residential and commercial AC repair in Los Angeles and across the South Bay, Orange County, and the Inland Empire - with an itemized price before any work begins.",
  heroImage: {
    src: '/images/services/ac-repair/hero.webp',
    alt: 'Outdoor AC condenser unit beside a stucco home with palm and succulent landscaping',
  },
  heroCaption: 'AC repair for homes and businesses across Southern California',
  heroProof: [
    { icon: 'shield', label: 'Licensed HVAC contractor' },
    { icon: 'building', label: 'Residential and commercial' },
    { icon: 'dollar', label: 'Written pricing before work' },
    { icon: 'pin', label: '4 Southern California regions' },
  ],
  serviceType: 'Air Conditioning Repair',
  ctaLabel: 'Schedule AC Repair',
  symptomsTitle: 'Common signs your AC needs repair',
  processTitle: 'Our AC repair process',
  appliesTitle: 'Residential and commercial AC repair',
  regionTitle: 'AC repair across Southern California',
  regionLinkVerb: 'AC repair',
  faqTitle: 'AC repair questions Southern Californians ask',
  finalCtaTitle: 'Get your AC repair scheduled',
  finalCtaBody: 'Call us or request service online.',
  answer: {
    lead: 'Air conditioning repair',
    body:
      ' is a diagnostic service followed by customer-approved corrective work. A technician identifies why the system is not cooling, not draining, not moving enough air, or not running reliably, explains the cause, and repairs it once you approve the price. Common problems include failed capacitors and contactors, refrigerant leaks, fan and blower motor faults, dirty or frozen coils, thermostat faults, and condensate drain clogs. The right repair depends on the equipment, the fault, and the condition of the system.',
  },
  // TODO(data): safety wording pending Air Pro safety policy review
  urgency: {
    title: 'When to call right away',
    intro: 'Call promptly if:',
    items: [
      'Cooling has failed during extreme heat',
      'Someone in the home is medically vulnerable to heat',
      'You smell burning or the breaker keeps tripping',
      'There is a serious water leak',
      'A commercial outage is affecting your operations',
    ],
    closing: 'If you see smoke or fire, or feel immediate electrical danger, get everyone out and call emergency services first.',
  },
  diagnosisIntro: 'A symptom rarely points to one part. These are the faults a technician tests for, not a diagnosis.',
  diagnosis: [
    { notices: 'Runs but blows warm air', causes: 'Airflow, coil condition, electrical components, and refrigerant performance. Causes range from a refrigerant leak to a compressor or control fault.' },
    { notices: 'Weak airflow', causes: 'Filter, blower, ducts, coil condition, and system pressure. Weak airflow is not automatically a refrigerant problem.' },
    { notices: 'Turns on and off frequently', causes: 'Thermostat and controls, airflow, sizing, electrical faults, and the refrigerant side. It merits diagnosis, not repeated resets.' },
    // TODO(copy): "turn cooling off" is standard practice but unsourced. Client to approve.
    { notices: 'Frozen coil or line', causes: 'Airflow restriction, coil fouling, or a refrigerant issue. Turn cooling off and arrange service.' },
    { notices: 'Water near the indoor unit', causes: 'The condensate drain path, drain pan, any condensate pump, and whether the coil is freezing and thawing.' },
    { notices: 'Buzzing, humming, clicking, or grinding', causes: 'Capacitor, contactor, fan motor, compressor, or a loose component. A noise does not identify a single failed part.' },
    { notices: 'Higher bills or uneven rooms', causes: 'System operation, ducts, coil condition, controls, and sizing. ENERGY STAR lists uneven cooling and rising bills among reasons to assess equipment condition.' },
  ],
  // TODO(data): confirm written quote and post-repair verification are standard Air Pro practice
  visitTitle: 'What is included and what can cost extra',
  visitIncludesTitle: 'A typical AC repair visit may include',
  visitIncludes: [
    'Symptom review and visual inspection',
    'Basic operational and electrical testing',
    'Airflow and filter evaluation',
    'Coil condition evaluation',
    'Refrigerant performance testing where appropriate',
    'An explanation of the diagnosis',
    'Your approved repair',
    'Functional verification after repair',
    'Basic documentation of the work completed',
  ],
  visitExtraTitle: 'What can add to the cost',
  // TODO(data): diagnostic fee, fee waiver, and which items Air Pro bills separately are unconfirmed. Do not state them.
  visitExtra: [
    'Diagnostic or service-call fee',
    'After-hours, weekend, or holiday dispatch',
    'Refrigerant and leak detection',
    'Major parts such as a blower motor, control board, compressor, or coil',
    'Roof access, lifts, or difficult attic and crawlspace access',
    'Multiple systems or multi-zone diagnosis',
    'Return visits when a part must be ordered',
    'Duct repair, sealing, or replacement',
    'Water damage or drywall repair after a leak',
    'Permit and energy-code work when equipment is replaced or altered',
  ],
  visitExtraNote: 'Ask your technician which of these apply to your job before you approve the work.',
  systemsTitle: 'Systems we diagnose',
  systemsIntro: 'Tell us what you have and we will confirm we can service it.',
  // TODO(data): capability list below is conditional. Client must confirm each system type before
  // the word "repair" is used for it. Until then the card body says "evaluate".
  systems: [
    { name: 'Split central AC', icon: 'snowflake', body: 'An outdoor condenser plus an indoor coil and air handler or furnace, connected to ductwork. Faults can involve the condenser, indoor coil, blower, controls, drains, ducts, or refrigerant circuit.' },
    { name: 'Heat pumps', icon: 'heat-pump', body: 'A heat pump uses the same refrigerant system for cooling and heating, so a cooling complaint can involve many of the same electrical, airflow, coil, and compressor components as an AC.' },
    { name: 'Packaged units', icon: 'building', body: 'Cooling and heating components in one cabinet, often on a roof or ground pad.' },
    { name: 'Ductless mini-splits', icon: 'mini-split', body: 'An outdoor unit connected to one or more indoor heads without conventional ducts.' },
    { name: 'Rooftop units', icon: 'buildings', body: 'Commercial packaged equipment on a roof. We can evaluate rooftop equipment for commercial properties.' },
    { name: 'Thermostats and controls', icon: 'thermometer', body: 'The devices and wiring that call for cooling.' },
  ],
  refrigerant: {
    title: 'Can an R-410A air conditioner still be repaired?',
    body:
      'Yes. The EPA states that the new-system limit on refrigerant global-warming potential applies to systems installed on or after January 1, 2026. A wholly new split system installed after that date must use a refrigerant below 700 GWP. Existing R-410A systems can still be serviced, and an R-410A system does not have to be replaced only because of that rule. If a repair is major, a technician can walk you through the repair option and a replacement comparison so you decide with real numbers.',
    sourceLabel: 'U.S. EPA, HFC Phasedown FAQ',
    sourceHref: 'https://www.epa.gov/climate-hfcs-reduction/frequent-questions-phasedown-hydrofluorocarbons',
  },
  pricingTitle: 'What affects AC repair cost',
  pricingIntro:
    'AC repair pricing depends on what testing finds, not just the symptom. Minor electrical parts and thermostat repairs often cost less than refrigerant-leak, motor, coil, or compressor work. After diagnosis, ask for a written repair option that identifies the issue, the recommended scope, and the total before work begins.',
  priceFactors: [
    { item: 'Capacitor, contactor, or thermostat', drivers: 'Part type, access, system voltage, and any other electrical fault' },
    { item: 'Refrigerant recharge and leak work', drivers: 'Refrigerant type and quantity, leak detection, whether the leak is found and repaired, and access' },
    { item: 'Fan or blower motor', drivers: 'Motor type, indoor or outdoor location, and equipment model' },
    { item: 'Evaporator or condenser coil', drivers: 'Coil availability, matching requirements, refrigerant, labor, warranty, and equipment age' },
    { item: 'Compressor', drivers: 'Size, refrigerant, warranty status, related electrical and refrigerant work, and whether replacement is more economical' },
  ],
  pricingClosing: 'A recharge can restore cooling temporarily, but if the system is low, the underlying leak still needs to be found and repaired.',
  repairReplaceExtra: {
    paragraphs: [
      'ENERGY STAR advises considering replacement when a system is more than 10 years old, especially with frequent repairs, rising energy bills, or comfort problems. It is not a hard rule. A younger unit may warrant replacement after a major failure, and an older unit may still be repairable. The right call depends on the diagnosis, warranty status, condition, refrigerant, cost, and your plans for the property.',
      'If the repair is major or the system has a history of breakdowns, we can provide a repair option and a replacement comparison so you can decide with the actual numbers.',
    ],
    linkText: 'Compare AC repair and replacement options',
    linkHref: '/ac-installation/',
  },
  rulesTitle: 'Licensing, permits, and energy-code basics',
  rules: [
    { title: 'Licensing', body: 'California requires a CSLB-licensed contractor for projects valued at $500 or more in labor and materials. The C-20 classification covers installation, maintenance, service, and repair of air-conditioning systems. You can verify any contractor’s license on the CSLB website.' },
    // TODO(data): do NOT say "we pull permits" unless the client confirms it is consistent practice
    { title: 'Permits', body: 'Repair and replacement are not the same. Permit requirements are set by the city or county and depend on project scope, and not every repair needs one. For replacements, permit requirements vary by city and project scope, and we can explain the permit path before work begins.' },
    { title: 'Energy code', body: 'California energy code can require refrigerant-charge and airflow verification when cooling equipment is replaced or altered, sometimes by a HERS rater. That applies to regulated replacements and alterations, not to every repair.' },
  ],
  appliesTo: [
    { label: 'Single-family homes', icon: 'home' },
    { label: 'Condos and townhomes', icon: 'home' },
    { label: 'Apartment communities', icon: 'building' },
    { label: 'Office buildings', icon: 'building' },
    { label: 'Retail and restaurants', icon: 'store' },
    { label: 'Rooftop package units', icon: 'wrench' },
  ],
  appliesParagraph:
    'Access matters as much as the fault. Condos and HOA properties, apartments, rooftops, attics, crawlspaces, and older ductwork each change how a repair is planned. We assess the property and the equipment, not the ZIP code.',
  appliesLinks: [
    { label: 'Commercial AC repair', href: '/commercial-hvac/' },
    { label: 'Residential HVAC', href: '/residential-hvac/' },
  ],
  regionIntro: [
    'Southern California is not one climate. NASA analysis of regional heat waves found coastal parts of southern LA County and Orange County were cooler than inland valleys, while Riverside and San Fernando valley areas were hotter and drier. Humid heat can also raise nighttime heat stress, both on the coast and inland. Weather points to how urgent a breakdown feels. It does not tell a technician which part failed.',
    'During the September 2024 heat wave, multiple Southern California locations reached 100°F or more, and Long Beach reached 109°F. NOAA’s Climate.gov documented it, and CAISO identifies summer heat as a key driver of electricity demand.',
  ],
  // TODO(data): city lines appear once the client's confirmed cities exist
  regionConditions: [
    { regionSlug: 'los-angeles-county', body: 'Coastal areas have ocean moderation while inland and valley locations can run much hotter in heat events. We diagnose by property and equipment: older duct systems, condos with access limits, single-family homes, and commercial spaces.' },
    { regionSlug: 'south-bay', body: 'Coastal weather does not eliminate AC failures. Systems still need accurate airflow, electrical, drainage, and refrigerant diagnostics, whether the property is a condo, a townhome, a single-family home, or a commercial site.' },
    { regionSlug: 'orange-county', body: 'Coastal Orange County is cooler than the inland valleys, but warm, humid nights can still strain comfort. We work with central AC, heat pumps, ductless systems, condos, townhomes, and commercial sites based on the actual equipment and access. HOA rules for outdoor equipment vary by property.' },
    { regionSlug: 'inland-empire', body: 'Inland valleys run hotter and drier in heat events, so a breakdown is urgent, but temperature alone does not identify the fault. Dust, construction, and outdoor debris can contribute to filter and coil loading, and South Coast AQMD has issued windblown-dust advisories that include East Riverside County.' },
  ],
  regionClosing: "Don't see your city? Call us and we will confirm coverage.",
  // TODO(data): "Thermostat troubleshooting and upgrades" has no matching route yet (no /thermostats/
  // service exists in services.ts); omitted here rather than linked as a dead or placeholder page.
  // "Financing" is omitted until the client confirms a financing offer exists.
  moreLinks: [
    { text: 'Heat pump not cooling?', href: '/heat-pump-repair/' },
    { text: 'Ductless mini-split repair', href: '/ductless-mini-split-repair/' },
    { text: 'Air filtration and indoor air quality options', href: '/indoor-air-quality/' },
    { text: 'Address airflow and duct problems', href: '/duct-repair/' },
  ],
  sources: [
    { label: 'U.S. EPA - HFC phasedown FAQ', url: 'https://www.epa.gov/climate-hfcs-reduction/frequent-questions-phasedown-hydrofluorocarbons' },
    { label: 'ENERGY STAR - When is it time to replace?', url: 'https://www.energystar.gov/saveathome/heating-cooling/replace' },
    { label: 'ENERGY STAR - Repair or replace', url: 'https://www.energystar.gov/ia/home_improvement/Replace_or_Repair.pdf' },
    { label: 'U.S. DOE - Airflow and refrigerant charge diagnostics', url: 'https://www.energy.gov/sites/prod/files/2013/12/f5/issue3_airflow_charge.pdf' },
    { label: 'U.S. DOE Building America - AC diagnostics, maintenance, and repair', url: 'https://www1.eere.energy.gov/buildings/publications/pdfs/building_america/measure_guide_air_cond_diagnostics.pdf' },
    { label: 'U.S. DOE Building America - HVAC fault detection and diagnosis', url: 'https://www1.eere.energy.gov/buildings/publications/pdfs/building_america/emr-hvac-fault-detection-diagnosis-repair.pdf' },
    { label: 'California CSLB - C-20 classification', url: 'https://www.cslb.ca.gov/about_us/library/licensing_classifications/Licensing_Classifications_Detail.aspx?Class=C20' },
    { label: 'California CSLB - Get licensed', url: 'https://www.cslb.ca.gov/getlicensed' },
    { label: 'Energy Code Ace - Refrigerant charge', url: 'https://energycodeace.com/content/48-refrigerant-charge' },
    { label: 'NASA JPL - Southern California heat-wave differences', url: 'https://www.jpl.nasa.gov/news/nasa-maps-key-heat-wave-differences-in-southern-california/' },
    { label: 'NOAA Climate.gov - September 2024 heat wave', url: 'https://www.climate.gov/news-features/event-tracker/heat-wave-southern-california-and-southwest-early-september-2024' },
    { label: 'California ISO - 2024 Summer Loads and Resources Assessment', url: 'https://www.caiso.com/Documents/2024-Summer-Loads-and-Resources-Assessment.pdf' },
    { label: 'South Coast AQMD - Air quality', url: 'https://www.southcoastaqmd.gov/home/air-quality' },
  ],
  faqs: [
    {
      q: 'Why is my AC running but not cooling?',
      a: 'Warm air can result from airflow problems, coil fouling, refrigerant issues, electrical-control faults, or compressor-related problems. A technician should test the system rather than assume one cause from the symptom alone. AIRPRO SOLUTIONS gives you a repair cost before any work begins.',
    },
    {
      q: 'Why is my AC blowing weak airflow?',
      a: 'Weak airflow may involve the filter, blower, ducts, coil condition, or system pressure. It is not automatically a refrigerant problem, so a technician should check airflow and equipment operation before recommending a repair.',
    },
    {
      q: 'What are the signs my AC needs repair?',
      a: 'Noisy equipment, uneven cooling, excessive dust, and frequent on and off cycling are warning signs identified by ENERGY STAR. Warm air, water near the indoor unit, and rising cooling bills with no change in use are also worth having looked at.',
    },
    {
      q: 'Can an R-410A air conditioner still be repaired?',
      a: "Yes. The EPA's limit on refrigerant global-warming potential applies to new systems installed on or after January 1, 2026. Existing R-410A systems can still be serviced, and they do not have to be replaced only because of that rule.",
    },
    {
      q: 'How much does AC repair cost in Los Angeles?',
      a: 'Cost depends on the diagnosis, the part, labor, access, refrigerant, warranty status, and whether the visit is after hours. Minor electrical parts and thermostat repairs often cost less than refrigerant-leak, motor, coil, or compressor work. Ask for a written repair option with the total before you approve any work.',
    },
    {
      q: 'Is a refrigerant recharge enough if my AC is low?',
      a: 'Not necessarily. A recharge can restore cooling temporarily, but a low system usually has a leak, and the leak still needs to be found and repaired. A technician should diagnose the leak instead of only adding refrigerant.',
    },
    {
      q: 'Should I repair or replace an AC that is over 10 years old?',
      a: 'Consider replacement if the system is over 10 years old, needs frequent repairs, has rising operating costs, or produces comfort problems. It is not automatic. Compare the diagnosed repair, warranty status, equipment condition, and replacement options.',
    },
    {
      q: 'Does AC repair require a permit in California?',
      a: 'It depends on the scope and the local jurisdiction, and not every repair requires a permit. Equipment replacement and regulated alterations commonly involve local permit and energy-code requirements. Confirm requirements with the city or county that has jurisdiction.',
    },
    {
      q: 'How long does AC repair take?',
      a: 'It depends on the problem. Some repairs are brief once the failed part is confirmed, while leak detection or a major component takes longer. Time depends on diagnosis, equipment access, parts availability, and whether other issues are found. Your technician gives you an estimate after diagnosis.',
    },
    {
      q: 'What should I do when my AC fails during a heat wave?',
      a: 'Arrange service promptly, especially if there are vulnerable occupants, a commercial operation at risk, or extreme indoor heat. Call (323) 776-9047 to ask about availability for your city.',
      links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
    },
  ],
  // TODO(copy): client review of every FAQ answer above before launch.
};

// Every entry is served at /[service]/ (top level). Rules: lowercase, hyphens, no stop words.
// To publish a level 2 page, write its copy and switch l2 to core-style published: true for that entry.
// Descriptions are the confirmed homepage card copy; empty ones are still TODO(copy).
const baseServices: Service[] = [
  // --- Level 1: core services ---
  {
    ...core('ac', 'ac-repair', 'AC Repair', 'snowflake', { description: "Diagnosis and repair for air conditioners that aren't cooling, blow warm air, leak, or make unusual noises.",
      image: card('ac-repair', 'Large outdoor AC condenser on a concrete pad beside a stucco wall in warm evening light') }),
    symptoms: [
      { lead: 'Warm air', detail: 'from vents even when the system is running' },
      { lead: 'Weak or no airflow', detail: 'from one or more vents' },
      { lead: 'Unusual noises', detail: 'such as buzzing, humming, clicking, or grinding' },
      { lead: 'Water near the indoor unit', detail: 'or a frozen coil or refrigerant line' },
      { lead: 'Frequent cycling', detail: 'on and off, or a system that will not stay on' },
      { lead: 'Rising cooling bills or uneven rooms', detail: 'with no change in how you use the system' },
    ],
    process: [
      { title: 'Triage', body: 'We ask about the symptom, the equipment, and whether there are electrical or water-leak signs.' },
      { title: 'Diagnose', body: 'We test airflow, electrical components, coil condition, and refrigerant performance to find the cause, not just the symptom.' },
      { title: 'Explain', body: 'You get a plain-language explanation that separates the failed part from optional maintenance or upgrades.' },
      { title: 'Quote', body: 'You get a written repair option with parts, labor, and any refrigerant, before you approve anything.' },
      { title: 'Repair and test', body: 'We complete the approved repair, then verify cooling, drainage, electrical operation, and airflow.' },
      { title: 'Close out', body: 'We explain what was repaired, what we observed, and whether a future replacement discussion makes sense.' },
    ],
    repairVsReplace: {
      groups: [
        {
          heading: 'Repair may make sense when',
          icon: 'wrench',
          items: [
            'System is relatively new',
            'The issue is isolated and the repair is reasonable',
            'Cooling and efficiency are otherwise reliable',
            'Parts are still available for the system',
          ],
        },
        {
          heading: 'Replacement may make sense when',
          icon: 'refresh',
          items: [
            'Equipment is near or past its expected life',
            'Repairs have become frequent or expensive',
            'Energy bills or comfort problems persist',
            'The system is obsolete or uses a phased-out refrigerant',
          ],
        },
      ],
    },
    related: ['ac-installation', 'ac-maintenance', 'emergency-hvac'],
    page: acRepairPage,
  },
  {
    ...core('ac', 'ac-installation', 'AC Installation', 'wrench', { description: 'New air conditioner installation and system replacement, sized to your home or business.',
      image: card('ac-installation', 'Outdoor AC condenser on a concrete pad beside a home, with the Los Angeles skyline in the distance') }),
    symptoms: [
      { lead: 'System over 10 years old', detail: 'particularly with repairs or rising costs' },
      { lead: 'Repeated breakdowns', detail: 'or expensive repairs on the same equipment' },
      { lead: 'Rising cooling bills', detail: 'with no change in how you use the system' },
      { lead: 'Uneven cooling', detail: 'with some rooms staying warmer than others' },
      { lead: 'Frequent cycling or noise', detail: 'on and off often, or unusually loud' },
      { lead: 'Dust or weak airflow', detail: 'the home feels dusty or air movement is weak' },
    ],
    process: [
      { title: 'Call and qualify', body: 'We confirm the property type, current equipment, timeline, ducted or ductless layout, and whether this is a repair, replacement, or first-time install.' },
      { title: 'On-site evaluation', body: 'We inspect the equipment, access, electrical disconnect and panel, drainage, line set routing, ducts, and clearances.' },
      { title: 'Load calculation', body: 'We calculate cooling and heating loads before selecting equipment. Manual J is the recognized residential method.' },
      { title: 'Proposal', body: 'You get options compared by system type, efficiency, capacity, controls, ducts, electrical work, permits, and warranty.' },
      { title: 'Permits and Energy Code', body: 'We identify the mechanical permit and Energy Code documentation your jurisdiction requires.' },
      { title: 'Remove and install', body: 'Old equipment is removed or isolated. New equipment, refrigerant connections, disconnect, controls, drain, and duct or ductless connections go in.' },
      { title: 'Startup and commissioning', body: 'We verify refrigerant charge and airflow, because errors in either reduce comfort, efficiency, and equipment life.' },
      { title: 'Inspection and handoff', body: 'We coordinate required inspections and provide equipment details, operating instructions, and maintenance recommendations.' },
    ],
    repairVsReplace: {
      groups: [
        {
          heading: 'Repair may make sense when',
          icon: 'wrench',
          items: [
            'The system is relatively new and has been reliable',
            'The failure is isolated and the repair cost is reasonable',
            'Comfort and efficiency are otherwise fine',
            'Parts are available and the system is repairable',
          ],
        },
        {
          heading: 'Replacement may make sense when',
          icon: 'refresh',
          items: [
            'Equipment is near or past its expected life',
            'Repairs have become frequent or expensive',
            'Energy bills or comfort problems persist',
            'A major component such as the compressor has failed',
          ],
        },
      ],
    },
    related: ['ac-repair', 'ac-maintenance', 'heat-pump-services', 'ductless-mini-split'],
    page: acInstallationPage,
  },
  {
    ...core('ac', 'ac-maintenance', 'AC Maintenance', 'calendar-check', {
      // Per the AC Maintenance build spec, this card blurb is the hero lede verbatim. Note this is
      // noticeably longer than every sibling card's one-sentence description (see /services/ and the
      // homepage grid) - flagged in the build report as a possible follow-up to shorten for card
      // layout consistency, since the spec was explicit about using the lede exactly here.
      description:
        'AIRPRO SOLUTIONS provides AC maintenance for homes and businesses in Los Angeles and across the South Bay, Orange County, and the Inland Empire. A pre-season tune-up checks controls, electrical connections, coils, the condensate drain, and airflow so small problems can be found early.',
      image: card('ac-maintenance', 'Outdoor AC condenser unit beside a home with a service tool resting on the pad'),
    }),
    process: [
      { title: 'Book', body: 'We ask about the property, the equipment and where it sits, any access limits, and whether cooling is working today.' },
      { title: 'Identify', body: 'The technician confirms what you have: split system, heat pump, packaged unit, ductless, or commercial equipment.' },
      { title: 'Inspect and test', body: 'Thermostat and controls, electrical connections, motors and moving parts, filter, and airflow are checked for safe operation.' },
      { title: 'Cooling side', body: 'Indoor and outdoor coils, the condensate drain, and refrigerant level are inspected, and coils are cleaned where accessible.' },
      // TODO(data): "explained and quoted separately" and approved before work begins - same
      // unconfirmed-process status as the AC Repair page. See ac-maintenance-page.ts for the matching
      // flags on the quick answer, FAQ, and cost note.
      { title: 'Findings', body: 'Anything that needs repair is explained and quoted separately, and you approve it before work begins.' },
      { title: 'Close out', body: 'We summarize what was checked and completed, give filter guidance, and talk through timing for the next visit.' },
    ],
    related: ['ac-repair', 'ac-installation', 'emergency-hvac'],
    page: acMaintenancePage,
  },
  {
    ...core('heating', 'heating-repair', 'Heating Repair', 'flame', { description: "Diagnosis and repair for furnaces, heat pumps, and heating systems that won't turn on or heat unevenly.",
      image: card('heating-repair', 'Gas furnace and ductwork in a home utility closet') }),
    symptoms: [
      { lead: 'Cold air', detail: 'from vents while the system is running' },
      { lead: 'Weak or no airflow', detail: 'from one or more vents' },
      { lead: 'Frequent cycling', detail: 'on and off, or a system that will not stay on' },
      { lead: 'Clicking, banging, squealing, or grinding', detail: 'when the system starts or runs' },
      { lead: 'Burning or electrical odor', detail: 'that lingers or comes with smoke' },
      { lead: 'Uneven temperatures', detail: 'between rooms or floors' },
    ],
    process: [
      { title: 'Triage', body: 'We ask about the symptom, the system type, whether it is gas-fired, and any safety concerns such as gas odor, smoke, or a carbon monoxide alarm.' },
      { title: 'Inspect', body: 'The technician checks the thermostat, power supply, filter, airflow, fault codes, controls, and accessible equipment.' },
      { title: 'Safety check', body: 'On gas-fired equipment, the technician may inspect ignition, flame sensing, burners, venting, draft, safety switches, and gas controls.' },
      { title: 'Diagnose and quote', body: 'You get the cause, the recommended repair, expected parts and labor, whether it is safety-critical, and whether replacement is worth discussing.' },
      { title: 'Repair', body: 'We complete the repair you approve. Nothing beyond diagnosis is installed until you say yes.' },
      { title: 'Verify', body: 'We confirm startup, heating operation, airflow, thermostat response, fault-code status, and applicable combustion or safety checks.' },
    ],
    repairVsReplace: {
      groups: [
        {
          heading: 'Repair may make sense when',
          icon: 'wrench',
          items: [
            'The issue is isolated and the system is otherwise safe and serviceable',
            'The repair cost is reasonable for the equipment',
            'Compatible parts are available',
            'Breakdowns have been rare',
            'The current heating approach still fits the property',
          ],
        },
        {
          heading: 'Replacement may make sense when',
          icon: 'refresh',
          items: [
            'A safety-critical component has failed',
            'Repair costs are substantial',
            'Parts are unavailable',
            'The system has repeated breakdowns',
            'The property needs a different heating approach',
          ],
        },
      ],
    },
    related: ['furnace-installation', 'heat-pump-services', 'ac-maintenance', 'ductwork'],
    page: heatingRepairPage,
  },
  {
    ...core('heating', 'furnace-installation', 'Furnace Installation', 'furnace', { description: 'Furnace installation and replacement for homes and businesses across Southern California.',
      image: card('furnace-installation', 'Modern gas furnace beside an older furnace in a home utility closet with ductwork above') }),
    symptoms: [
      { lead: 'Repeated no-heat events', detail: 'or a furnace that fails to start' },
      { lead: 'Uneven heating', detail: 'from room to room' },
      { lead: 'Excess noise, vibration, or blower cycling', detail: 'that repeats' },
      { lead: 'A furnace that runs constantly', detail: 'without reaching the thermostat setting' },
      { lead: 'Repairs getting more frequent', detail: 'or a repair quote that is large for the age and condition of the unit' },
      { lead: 'A planned AC or heat pump change', detail: 'that affects which furnace or air handler you can keep' },
    ],
    process: [
      { title: 'Intake', body: 'The contractor asks whether this is a no-heat problem, a safety concern, or a planned replacement, plus equipment age, fuel type, and whether the home has central ducts.' },
      { title: 'Assess on site', body: 'The technician inspects the furnace, airflow path, filter cabinet, controls, gas connection, venting, electrical disconnect, and access.' },
      { title: 'Size and select', body: 'Capacity and compatibility come from the home and its ducts, not only from the old furnace nameplate.' },
      { title: 'Written proposal', body: 'Model or tier, AFUE, compatible equipment, permit handling, disposal, duct or venting changes, controls, and exclusions are spelled out.' },
      { title: 'Remove and install', body: 'The old unit comes out and the new one is set, then connected to ducts, gas, electrical, venting, drainage where needed, and controls.' },
      { title: 'Start up and close out', body: 'The installer commissions the equipment, checks airflow and heating operation, explains filters, and completes required inspection or verification.' },
    ],
    related: ['heating-repair', 'heat-pump-services', 'ac-installation', 'ductwork'],
    page: furnaceInstallationPage,
  },
  {
    ...core('heat-pump', 'heat-pump-services', 'Heat Pump Services', 'heat-pump', { description: 'Installation, repair, and maintenance for heat pump systems that handle both heating and cooling.',
      image: card('heat-pump-services', 'Outdoor heat pump unit mounted on the exterior wall of a home') }),
    // TODO(data): the build spec gave 8 short symptom lines as flat strings ("Runs but does not heat
    // or cool enough", etc.), but Service.symptoms needs {lead, detail} pairs (see ac-repair for the
    // shape), and this page's locked section order (Hero -> ... -> Basics -> Symptoms table ->
    // Process -> ...) specifies only one combined symptoms section - the two-column DiagnosisTable
    // below, not a separate SymptomGrid card grid. Splitting each string into an invented lead/detail
    // pair would fabricate a division not in the brief, and populating this array would also render an
    // unspecified extra SymptomGrid section. Left empty; the same 8 lines appear verbatim as the "What
    // you notice" column of the DiagnosisTable in heat-pump-services-page.ts instead. See the build
    // report for this reconciliation.
    symptoms: [],
    process: [
      { title: 'Book', body: 'We ask about the property, the equipment and where it sits, any access limits, and what the system is doing today.' },
      { title: 'Identify', body: 'The technician confirms the system type, equipment model, refrigerant labeling, and whether the outdoor unit is running.' },
      { title: 'Airflow and electrical', body: 'Filter, blower, coils, ducts, contactors, capacitors, wiring, sensors, and thermostat communication are checked.' },
      { title: 'Heating and cooling test', body: 'Operation is tested in the relevant mode and, where safe, changeover between heating and cooling is confirmed.' },
      { title: 'Findings', body: 'The fault, the repair options, and the condition of the equipment are explained. Repairs are quoted and approved before work begins.' },
      { title: 'Close out', body: 'Approved work is completed and tested, and any permit, compliance, and warranty paperwork that applies is passed on to you.' },
    ],
    // TODO(data): the build spec's repairVsReplace copy is a flat array of single-sentence rows (e.g.
    // "What failed: a single isolated part favors repair, while a failed major component such as the
    // compressor favors a replacement quote"), which does not fit the {heading, icon, items}x2 groups
    // shape CompareTable/Service.repairVsReplace expects (see ac-repair/ac-installation for that
    // shape). The fuller, more presentable version of the same content - a 5-row, 3-column
    // Question/Repair/Replace table - is rendered on the page instead, via the page content module's
    // `repairReplace` field (composed inline through the shared DataTable, the same pattern already
    // used for furnace-installation's `comparisonTable`). Left null here since no matrix or hub page
    // currently reads this service's repairVsReplace. See the build report for this reconciliation.
    repairVsReplace: null,
    related: ['ac-repair', 'heating-repair', 'ductless-mini-split', 'ac-maintenance'],
    page: heatPumpServicesPage,
  },
  {
    ...core('ductless', 'ductless-mini-split', 'Ductless Mini-Split', 'mini-split', { description: 'Ductless mini-split installation and service for additions, garages, and homes without central ductwork.',
      image: card('ductless-mini-split', 'Wall-mounted ductless mini-split indoor unit in a bright living space') }),
    symptoms: [
      { lead: 'Weak or warm air', detail: 'from the indoor head, even when the system is running' },
      { lead: 'One zone behaving differently', detail: 'from another on a multi-zone system' },
      { lead: 'Water dripping', detail: 'from the indoor unit or the wall around it' },
      { lead: 'An error code, unexpected stops,', detail: 'or repeated restarts' },
      { lead: 'Unusual noise', detail: 'or an outdoor unit that does not run' },
      { lead: 'A breaker that trips', detail: 'when the system starts, or odors or moisture around the indoor head' },
    ],
    process: [
      { title: 'Request', body: 'You describe the room, the comfort problem, the existing HVAC, and whether this is new, replacement, or repair.' },
      { title: 'Assess', body: 'A technician looks at room size, insulation, glazing, sun exposure, head and outdoor-unit locations, condensate routing, line-set path, and electrical capacity.' },
      { title: 'Design and size', body: "The system type and capacity follow the property's load, not a square-footage rule of thumb." },
      { title: 'Scope and permit', body: 'A written scope lists the equipment, zones, electrical work, condensate, penetrations, permit responsibility, and exclusions.' },
      { title: 'Install', body: 'Indoor heads and the outdoor unit are mounted, insulated lines and controls routed, drainage and power connected, then the system is tested, evacuated, and charged per the manufacturer.' },
      { title: 'Commission and hand off', body: 'Heating, cooling, airflow, drainage, and controls are verified, and you get a walkthrough of filters, controls, and maintenance. Any required inspection follows.' },
    ],
    repairVsReplace: {
      note: 'There is no fixed threshold. The decision depends on the diagnosis, equipment age, repair scope, refrigerant, and warranty status. We diagnose first, then explain the repair and replacement options.',
      groups: [
        {
          heading: 'Repair may make sense when',
          icon: 'wrench',
          items: [
            'The fault is isolated and has been diagnosed',
            'The equipment is relatively new or under warranty',
            'Parts and refrigerant service are available for the system',
            'The layout still serves the rooms you use',
          ],
        },
        {
          heading: 'Replacement may make sense when',
          icon: 'refresh',
          items: [
            'The system needs repeated or major repairs',
            'The equipment is near or past its expected life',
            'Parts or service support are hard to find',
            'The rooms or zones have changed and the layout needs a redesign',
          ],
        },
      ],
    },
    related: ['ac-installation', 'ac-repair', 'ac-maintenance', 'heat-pump-services'],
    page: ductlessMiniSplitPage,
  },
  {
    ...core('ductwork', 'ductwork', 'Ductwork', 'duct', { description: 'Duct inspection, sealing, repair, and design for uneven airflow, energy loss, and air quality issues.',
      image: card('ductwork', 'Insulated flexible ducts and a galvanized duct plenum in a residential attic') }),
    symptoms: [
      { lead: 'A room stays hot or cold.', detail: 'A restricted, disconnected, undersized, leaking, or poorly routed supply or return path can be the cause. So can the equipment, so it needs an inspection.' },
      { lead: 'Weak airflow from the vents.', detail: 'Collapsed or kinked flex duct, a blockage, an undersized duct, or leakage can be behind it. A dirty filter or an equipment issue can look the same.' },
      { lead: 'High cooling or heating bills.', detail: 'Duct leakage, poor insulation, and ducts in unconditioned space can waste conditioned air. Equipment condition and the building envelope also matter.' },
      { lead: 'Stuffy or dusty rooms.', detail: 'Too little supply or return air, or leaks that pull air from an attic or crawlspace, can contribute. We do not diagnose air-quality causes without testing.' },
      { lead: 'Whistling, rattling, or banging.', detail: 'Excess pressure, a restrictive grille, a loose duct, or a poor transition can make noise. Damaged duct can too.' },
      { lead: 'Sagging, crushed, torn, or disconnected duct.', detail: 'This is physical duct failure. The affected runs are repaired or replaced, with a wider look if it keeps happening.' },
    ],
    process: [
      { title: 'Book', body: 'We ask about the symptoms, the property, where the ducts run, and any recent equipment or remodel work.' },
      { title: 'Inspect', body: 'The technician inspects accessible supply and return ducts, plenums, boots, registers, insulation, connections, and flex-duct routing, including attic or crawlspace conditions.' },
      { title: 'Diagnose', body: 'Damage, leakage, sizing, return air, insulation, and equipment are separated so the right problem gets fixed. Concealed ducts may need more investigation.' },
      { title: 'Recommend', body: 'You get a repair, seal, replace, or redesign recommendation, with what is included, what is optional, and what may need a permit.' },
      { title: 'Do the work', body: 'Reconnect or replace runs, correct kinks, seal connections, replace insulation, plenums, or returns, or install new runs.' },
      { title: 'Close out', body: 'Connections are checked visually, system operation is confirmed, and you get a summary of the work and any compliance steps.' },
    ],
    related: ['ac-repair', 'ac-installation', 'heating-repair', 'ductless-mini-split'],
    page: ductworkPage,
  },
  {
    ...core('indoor-air-quality', 'indoor-air-quality', 'Indoor Air Quality', 'air', { description: 'Air filtration, purification, and humidity solutions that improve the air circulating through your space.',
      image: card('indoor-air-quality', 'Air purifier, return vent grille, and a clean pleated filter in a bright living room') }),
    process: [
      { title: 'Book', body: 'We ask about the complaint, the property, occupancy, pets, recent remodeling, and whether anyone has respiratory sensitivity.' },
      { title: 'Identify', body: 'The technician confirms what you have: ducted split, heat pump, packaged unit, ducted or ductless mini-split, or commercial rooftop equipment.' },
      { title: 'Inspect', body: 'Accessible filters, the filter rack, air handler, returns, registers, ducts, condensate drain, outdoor-air dampers, exhaust fans, and controls are checked.' },
      { title: 'Options', body: 'You get written options that separate required fixes, recommended upgrades, and optional maintenance.' },
      { title: 'Install or repair', body: 'Mounting, duct or plenum changes, electrical connection, drain adjustments, controls, and startup, as the scope requires.' },
      { title: 'Hand off', body: 'Operation and airflow are confirmed, and you get the filter size, replacement interval, and any permit steps.' },
    ],
    related: ['ac-maintenance', 'ductwork', 'heat-pump-services'],
    page: indoorAirQualityPage,
  },
  // TODO(data): the "Emergency" name and slug imply urgent availability; confirm the service is always-on or rename.
  core('hvac', 'emergency-hvac', 'Emergency HVAC', 'alert', { description: "24/7 dispatch for no-cool and no-heat emergencies that can't wait for a scheduled appointment.",
    image: card('emergency-hvac', 'Outdoor AC unit beside a home at dusk') }),

  // --- Level 2: second-level service pages ---
  // AC and heating
  l2('ac', 'ac-replacement', 'AC Replacement', 'snowflake'),
  l2('heating', 'heating-installation', 'Heating Installation', 'flame'),
  l2('heating', 'furnace-repair', 'Furnace Repair', 'furnace'),
  l2('heating', 'furnace-replacement', 'Furnace Replacement', 'furnace'),
  l2('heating', 'heating-maintenance', 'Heating Maintenance', 'flame'),
  // Heat pumps
  l2('heat-pump', 'heat-pump-repair', 'Heat Pump Repair', 'heat-pump'),
  l2('heat-pump', 'heat-pump-installation', 'Heat Pump Installation', 'heat-pump'),
  l2('heat-pump', 'heat-pump-replacement', 'Heat Pump Replacement', 'heat-pump'),
  l2('heat-pump', 'heat-pump-maintenance', 'Heat Pump Maintenance', 'heat-pump'),
  // Ductless mini-splits
  l2('ductless', 'ductless-mini-split-installation', 'Ductless Mini-Split Installation', 'mini-split'),
  l2('ductless', 'ductless-mini-split-repair', 'Ductless Mini-Split Repair', 'mini-split'),
  l2('ductless', 'ductless-mini-split-replacement', 'Ductless Mini-Split Replacement', 'mini-split'),
  l2('ductless', 'ductless-mini-split-maintenance', 'Ductless Mini-Split Maintenance', 'mini-split'),
  // General HVAC
  l2('hvac', 'hvac-repair', 'HVAC Repair', 'wrench'),
  l2('hvac', 'hvac-installation', 'HVAC Installation', 'wrench'),
  l2('hvac', 'hvac-replacement', 'HVAC Replacement', 'wrench'),
  l2('hvac', 'hvac-maintenance', 'HVAC Maintenance', 'calendar-check'),
  l2('hvac', 'maintenance-plans', 'Maintenance Plans', 'calendar-check'), // overlaps the /maintenance-plan/ core page: see CLAUDE.md
  // Ductwork
  l2('ductwork', 'ductwork-services', 'Ductwork Services', 'duct'),
  l2('ductwork', 'duct-repair', 'Duct Repair', 'duct'),
  l2('ductwork', 'duct-sealing', 'Duct Sealing', 'duct'),
  l2('ductwork', 'duct-replacement', 'Duct Replacement', 'duct'),
  l2('ductwork', 'duct-installation', 'Duct Installation', 'duct'),
  // Indoor air quality
  l2('indoor-air-quality', 'air-filtration-systems', 'Air Filtration Systems', 'air'),
  l2('indoor-air-quality', 'whole-home-air-purification', 'Whole-Home Air Purification', 'air'),
  l2('indoor-air-quality', 'air-purifier-installation', 'Air Purifier Installation', 'air'),
  l2('indoor-air-quality', 'ventilation-services', 'Ventilation Services', 'air'),
];

// Page tree (parent -> children). URLs stay flat at /[slug]/; the tree drives hubs and internal links.
// Not in the tree yet (kept as noindex stubs, decide before building): ac-installation, ductwork,
// hvac-repair, hvac-installation, hvac-replacement, hvac-maintenance, maintenance-plans.
// TODO(data): 'ductwork' (core) and 'ductwork-services' (tree parent) target the same topic; pick one.
export const serviceTree: Record<string, string[]> = {
  'ac-repair': ['ac-replacement', 'ac-maintenance', 'emergency-hvac'],
  'heating-repair': ['heating-installation', 'furnace-repair', 'furnace-installation', 'furnace-replacement', 'heating-maintenance'],
  'heat-pump-services': ['heat-pump-repair', 'heat-pump-installation', 'heat-pump-replacement', 'heat-pump-maintenance'],
  'ductless-mini-split': ['ductless-mini-split-installation', 'ductless-mini-split-repair', 'ductless-mini-split-replacement', 'ductless-mini-split-maintenance'],
  'ductwork-services': ['duct-repair', 'duct-sealing', 'duct-replacement', 'duct-installation'],
  'indoor-air-quality': ['air-filtration-systems', 'whole-home-air-purification', 'air-purifier-installation', 'ventilation-services'],
};
const parentOf: Record<string, string> = Object.fromEntries(
  Object.entries(serviceTree).flatMap(([parent, kids]) => kids.map((k) => [k, parent])),
);

export const services: Service[] = baseServices.map((sv) => ({
  ...sv,
  parent: parentOf[sv.slug],
  level: parentOf[sv.slug] ? 2 : serviceTree[sv.slug] ? 1 : sv.level,
}));

export const childrenOf = (slug: string) => services.filter((x) => x.parent === slug);

export const publishedServices = services.filter((x) => x.published);

export const getService = (slug: string) => services.find((x) => x.slug === slug);

// Commercial HVAC is an audience hub, not a service, so its homepage card image lives here.
export const commercialCardImage: ServiceImage = card('commercial-hvac', 'Rooftop package HVAC units and conduit on a commercial building roof, with a business park and hillside in the background');
