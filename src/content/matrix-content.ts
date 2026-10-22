import type { Faq } from '@/content/faq';
import type { ServiceImage } from '@/content/services';

// Matrix (service+city) page content, keyed by "${service}/${city}". Title/H1 are built from
// src/lib/seo.ts (matrixTitle/matrixH1) per CLAUDE.md, not hand-written here. Symptoms, process,
// repairVsReplace and appliesTo are NOT duplicated here: the page reads those straight off the
// service record in services.ts so there is only one copy of that content.
export type MatrixContent = {
  primaryKeyword: string;
  metaDescription: string;
  heroCaption?: string; // caption band under heroImage
  heroImage?: ServiceImage; // 1200x900 hero photo; falls back to the "photo pending" tile when absent
  lede: string; // hero opening paragraph AND the Service schema description - must match exactly
  heroProof: { icon: string; label: string }[];
  trust: { num: string; label: string }[];
  answer: { label: string; lead: string; body: string };
  // One verified city fact for the merged "{Service} in {City} at a glance" card. The other two stats come
  // from the service record's own glance card (page.glance), so every page keeps the same three-stat shape.
  cityGlance: { stat: { num: string; label: string }; sources: { label: string; url: string }[] };
  local: {
    eyebrow: string;
    h2: string;
    paragraphs: string[]; // may contain **bold** markers
    areasHeading: string;
    links: { text: string; href: string }[]; // official external links shown under the paragraphs
    cards: { heading: string; rows: { label: string; value: string }[]; note: string }[];
  };
  nearby: string[]; // city slugs (all render as non-link cards unless a matrixPages pair exists)
  faqs: Faq[];
  sources: { label: string; url: string; group?: string }[]; // city-specific references row under the FAQ
  serviceSourceKeys: string[]; // url fragments of service-record sources this page also cites (see page.tsx)
};

// Locked copy for /services/ac-repair/torrance/. See CLAUDE.md "Claims that must not ship": no pricing,
// same-day/24-7 timing, brand-list, or unconfirmed licensing claims.
//
// Verified-only rebuild (2026-10-21). Every Torrance fact below traces to a source read on that date; see the
// "AC Repair x Torrance" section of docs/open-items.md for the full verification record and the held-out list.
// Held out on purpose (not verified): neighborhood-level housing age, citywide pre-1970 share, climate and
// marine-layer statements, coastal-vs-inland comparisons, equipment-failure patterns, utility providers, rebates,
// and the adopted code edition. Do not reintroduce them without a source.
const acRepairTorrance: MatrixContent = {
  heroImage: {
    src: '/images/service-location/hvac-services-torrance-ca/hero/air-pro-solutions-torrance-ca-hvac-service-area-home-condenser-4x3.webp',
    alt: 'Outdoor AC condenser on a concrete pad beside a stucco home with a tree and drought-tolerant landscaping in Torrance, CA',
  },
  heroCaption: 'Residential AC repair service in Torrance, CA',
  primaryKeyword: 'ac repair torrance',
  metaDescription:
    'Need AC repair in Torrance? AIRPRO SOLUTIONS helps homes and businesses with cooling, airflow, electrical, and drainage problems. Schedule service.',
  // TODO(data): the neighborhood names in this lede, the neighborhood pills and the ZIP list come from cities.ts,
  // where they are still flagged TODO(data) (not verified against a local source). Same wording as the approved
  // /service-areas/torrance/ page.
  lede:
    "No cooling, weak airflow, strange noises, or water leaks? AIRPRO SOLUTIONS provides residential and commercial AC repair across Torrance - from Old Torrance and North Torrance to Walteria and the Hollywood Riviera border - and explains what we find and what your options are before you decide.",
  heroProof: [
    { icon: 'check', label: 'Licensed contractor' },
    { icon: 'star', label: '4.8-star rated' },
    { icon: 'home', label: 'Residential and commercial' },
    { icon: 'pin', label: 'Serving all of Torrance' },
  ],
  trust: [
    { num: 'South Bay', label: 'coverage area' },
    { num: '4.8★', label: 'Google rating, 40 reviews' },
    { num: 'C-20', label: 'California licensed' },
    { num: 'Residential and commercial', label: 'one local team' },
  ],
  answer: {
    label: 'Quick answer',
    lead: 'AC repair in Torrance',
    body:
      ' finds and fixes the problems that keep an air conditioning system from cooling, running efficiently, draining correctly, or moving air reliably. AIRPRO SOLUTIONS diagnoses the cause, explains what we find and your options, and completes the repair for homes and businesses across Torrance. Call or request service online to schedule a visit.',
  },
  // TODO(copy): client review of the merged glance card before launch.
  // Source: City of Torrance Building and Safety online permit portal page, read 2026-10-21. The page gives
  // no publication date; "Effective January 5, 2026" is the date it states for the mandatory digital transition.
  cityGlance: {
    stat: { num: 'Jan 5, 2026', label: 'Torrance moved permit plan review and submittals fully online' },
    sources: [
      {
        label: 'City of Torrance - Building and Safety online permit portal',
        url: 'https://www.torranceca.gov/our-city/community-development/online-permit-portal/building-and-safety',
      },
    ],
  },
  // TODO(copy): every new string in this band (paragraphs, card, links) is client-review pending.
  local: {
    eyebrow: 'Local knowledge',
    h2: 'AC repair in Torrance: permits, noise rules, and property types',
    paragraphs: [
      'Mechanical permits in Torrance go through the **City of Torrance Building and Safety Division**, part of Community Development. Since January 5, 2026, the division has handled plan review and permit submittals entirely online. Whether a particular AC repair needs a permit depends on the scope of the work, and a repair is not the same as a replacement. **AIRPRO SOLUTIONS can walk you through what your job involves**, and you can confirm requirements with the division at 310-618-5910.',
      "Torrance's Municipal Code also regulates air conditioning equipment noise. **Section 46.2.6 covers AC and similar equipment noise at residential property lines**, and the city publishes additional region-based noise limits. A unit that has gotten louder is worth having diagnosed, and Torrance Code Enforcement handles noise codes.",
      'Torrance has a real mix of property types. An official housing-data report updated in April 2021 (SCAG pre-certified local housing data, built on California Department of Finance estimates) shows **52.5% of Torrance housing units are detached single-family homes and 39.4% are multifamily**, with attached single-family homes and mobile homes making up the rest. Access and HOA or property-manager coordination can differ between a house and a multifamily building, so we plan each repair around the actual property and equipment.',
    ],
    areasHeading: 'Torrance areas we repair AC in',
    links: [
      {
        text: 'City of Torrance Building and Safety',
        href: 'https://www.torranceca.gov/Government/Departments-Offices/Departments-Offices/Community-Development/Building-and-Safety',
      },
      { text: 'Torrance Municipal Code, noise', href: 'https://www.codepublishing.com/CA/Torrance/html/Torrance04/Torrance0406.html' },
    ],
    cards: [
      {
        heading: 'Torrance AC repair facts',
        rows: [
          { label: 'Permits', value: 'Mechanical permits go through the City of Torrance Building and Safety Division' },
          { label: 'Submittals', value: 'Plan review and permit submittals are electronic, effective January 5, 2026' },
          { label: 'Noise', value: 'Municipal Code Section 46.2.6 covers AC equipment noise at residential property lines' },
          { label: 'Housing mix', value: '52.5% detached single-family, 39.4% multifamily (report updated April 2021)' },
        ],
        note: 'Sources: City of Torrance Building and Safety, Torrance Municipal Code, SCAG pre-certified local housing data. Confirm project requirements with the city.',
      },
    ],
  },
  nearby: ['redondo-beach', 'manhattan-beach', 'gardena', 'carson'],
  faqs: [
    {
      q: 'How fast can I get AC repair in Torrance?',
      a: 'Call (323) 776-9047 or request service online and we will follow up with you. We prioritize no-cool calls and will confirm availability when you call, so tell us your AC is down when you reach us.',
      links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
    },
    {
      q: 'Why is my AC not cooling well in Torrance?',
      a: 'Weak cooling can involve more than the outdoor AC unit. Federal energy guidance identifies leaking or restricted ducts, dirty filters and coils, and refrigerant problems as possible causes. A diagnosis should establish whether the problem is in the equipment, airflow, or duct system.',
    },
    {
      q: 'Does AC repair in Torrance need a permit?',
      a: 'It depends on the scope of the work. The City of Torrance Building and Safety Division handles mechanical permits, and a repair is not the same as a replacement. Since January 5, 2026, the division handles plan review and permit submittals online. AIRPRO SOLUTIONS can walk you through what your job involves, and you can confirm requirements with the division at 310-618-5910.',
    },
    {
      q: 'Does Torrance regulate AC equipment noise?',
      a: "Yes. Torrance's Municipal Code addresses air conditioning equipment noise at residential property lines in Section 46.2.6, and the city publishes additional noise limits that depend on the receiving property. If your unit has gotten louder, that is worth diagnosing. For a specific noise concern, contact Torrance Code Enforcement at (310) 618-5929.",
      links: [{ text: '(310) 618-5929', href: 'tel:+13106185929' }],
    },
    {
      q: 'Does AIRPRO SOLUTIONS repair AC systems in Torrance condos and HOAs?',
      a: 'Yes. AIRPRO SOLUTIONS repairs AC systems in condos, townhomes, and HOA-managed communities throughout Torrance, and can coordinate with property managers or HOA boards on access and scheduling.',
    },
    {
      q: 'How much does AC repair cost in Torrance?',
      a: 'Repair cost depends on the part, the age of the system, and how accessible the unit is. The most accurate answer comes from a technician looking at your system, so contact us to talk through your situation.',
    },
    {
      q: 'What AC brands does AIRPRO SOLUTIONS repair in Torrance?',
      a: 'AIRPRO SOLUTIONS services major residential and commercial HVAC brands, whether the equipment was installed by us or another contractor. Call to confirm your specific make and model.',
    },
    {
      q: 'Should I repair or replace my AC in Torrance?',
      a: 'Repair often makes sense for an isolated problem on a system that has otherwise been reliable. Replacement is worth considering when breakdowns become frequent, a major component fails, or the system is well past its expected lifespan. A technician can compare the repair against replacement so you can decide with the full picture.',
    },
  ],
  // TODO(copy): client review of every FAQ answer before launch. New in this rebuild: the "not cooling well",
  // permit and noise answers (the older-homes answer was removed: no source for neighborhood housing age).
  // TODO(data): a Torrance customer review or job photo for this page, pending a real review with permission.
  sources: [
    {
      label: 'City of Torrance - Building and Safety Division',
      url: 'https://www.torranceca.gov/Government/Departments-Offices/Departments-Offices/Community-Development/Building-and-Safety',
      group: 'Torrance permits and codes',
    },
    {
      label: 'City of Torrance - Building and Safety online permit portal',
      url: 'https://www.torranceca.gov/our-city/community-development/online-permit-portal/building-and-safety',
      group: 'Torrance permits and codes',
    },
    {
      label: 'Torrance Municipal Code - Noise (Section 46.2.6)',
      url: 'https://www.codepublishing.com/CA/Torrance/html/Torrance04/Torrance0406.html',
      group: 'Torrance permits and codes',
    },
    {
      label: 'City of Torrance - Code Enforcement Unit',
      url: 'https://www.torranceca.gov/Government/Departments-Offices/Departments-Offices/Community-Development/Code-Enforcement-Unit',
      group: 'Torrance permits and codes',
    },
    {
      label: 'SCAG - Pre-Certified Local Housing Data for Torrance (April 2021)',
      url: 'https://scag.ca.gov/sites/default/files/old/file-attachments/torrance-he-0421.pdf',
      group: 'Torrance housing',
    },
  ],
  // Also cited on this page, read from the AC Repair service record so there is one copy of each source:
  // the DOE diagnostics guide (the "not cooling well" answer) and the CSLB C-20 classification (glance card).
  serviceSourceKeys: ['measure_guide_air_cond_diagnostics', 'Class=C20'],
};

export const matrixContent: Record<string, MatrixContent> = {
  'ac-repair/torrance': acRepairTorrance,
};

export const getMatrixContent = (service: string, city: string) => matrixContent[`${service}/${city}`];
