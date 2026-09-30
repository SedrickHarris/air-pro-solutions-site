import type { Faq } from '@/content/faq';
import type { DecisionCard } from '@/components/sections/DecisionGrid';

// primaryKeyword: commercial hvac los angeles
// Locked copy for /commercial-hvac/. Every TODO(claims) line below is a statement the client has
// not confirmed yet (see docs/metadata-rules.md section 6) - keep the wording, don't ship it in the
// title, meta description, H1, or JSON-LD Service fields, and don't drop the comment.

export const commercialContentRecord = {
  primaryKeyword: 'commercial hvac los angeles',
  path: '/commercial-hvac/',
  canonical: 'https://airprosolutionsheatingandcooling.com/commercial-hvac/',
  indexStatus: 'index' as const,
};

export const commercialHero = {
  // H1 text itself comes from seo.ts commercialHubH1() per CLAUDE.md; this is only the substring
  // to wrap in the amber <em> hero treatment.
  h1Emphasis: 'Southern California',
  // TODO(claims): "24/7 emergency dispatch" is unconfirmed, see docs/metadata-rules.md section 6.
  lede:
    'AIRPRO SOLUTIONS provides commercial HVAC service in Los Angeles and across Southern California, keeping offices, retail centers, multifamily properties, and industrial sites running - rooftop unit service, preventive maintenance agreements, and 24/7 emergency dispatch, with a single point of contact for your whole portfolio.',
  primaryCta: { label: 'Request a Commercial Quote', href: '/contact/' },
  proof: [
    // TODO(claims): only "licensed" is approved; "bonded" and "insured" are unconfirmed.
    { icon: 'shield-check', label: 'Licensed, bonded & insured' },
    // TODO(claims): 24/7 emergency dispatch is unconfirmed.
    { icon: 'bolt', label: '24/7 emergency dispatch' },
    { icon: 'buildings', label: 'Multi-site & portfolio accounts' },
    // TODO(claims): certificate-of-insurance-on-request is unconfirmed.
    { icon: 'doc-check', label: 'COI provided on request' },
  ],
  // TODO(data): the artifact's real caption ("Rooftop unit service, Torrance CA / Commercial
  // condenser replacement, completed same week") describes an undocumented job. Use a pending
  // placeholder until a real photo and verified caption exist.
  photoCaption: { title: 'Job photo pending', detail: 'Real project photo and caption to come' },
};

// TODO(claims): "emergency dispatch for commercial accounts" and "bonded" are unconfirmed.
export const commercialTrustCopy = {
  emergency: { num: '24/7', label: 'emergency dispatch for commercial accounts' },
  license: { num: 'C-20', label: 'California licensed & bonded' },
};

export const propertyTypes: DecisionCard[] = [
  { icon: 'building', title: 'Office buildings', body: 'Rooftop and split-system service that keeps tenants comfortable.', href: '/office-building-hvac/', ctaLabel: 'See office HVAC' },
  { icon: 'store', title: 'Retail & restaurants', body: 'Fast turnaround to protect foot traffic and health-code comfort standards.', href: '/restaurant-hvac/', ctaLabel: 'See retail HVAC' },
  { icon: 'home', title: 'Multifamily & HOA', body: 'Coordinated scheduling with property managers and boards.', href: '/multifamily-hvac/', ctaLabel: 'See multifamily HVAC' },
  // TODO(data): no industrial/warehouse audience page exists yet; repoint to one if it's added.
  { icon: 'buildings', title: 'Industrial & warehouse', body: 'Rooftop package units and large-space heating and cooling.', href: '/contact/', ctaLabel: 'See industrial HVAC' },
  { icon: 'calendar-check', title: 'Preventive maintenance', body: 'Scheduled agreements that catch problems before they become outages.', href: '/ac-maintenance/', ctaLabel: 'See maintenance plans' },
  // TODO(claims): 24/7 is unconfirmed.
  { icon: 'bolt', title: 'Emergency outage', body: '24/7 dispatch when a system goes down during business hours.', href: '/emergency-hvac/', ctaLabel: 'Get emergency help' },
];

export const whyUs: DecisionCard[] = [
  { icon: 'user', title: 'One point of contact', body: 'A single account contact for every property in your portfolio, instead of a different vendor per site.' },
  // TODO(claims): after-hours availability is unconfirmed.
  { icon: 'clock', title: 'After-hours scheduling', body: 'Maintenance and non-emergency repairs scheduled around business hours, not around ours.' },
  // TODO(claims): certificate of insurance is unconfirmed.
  { icon: 'doc-check', title: 'Documentation on request', body: 'Certificate of insurance, licensing, and service history available for property management and ownership records.' },
];

export const commercialServices: { slug: string; name: string; body: string; icon: string; href: string }[] = [
  { slug: 'ac-repair', name: 'Rooftop Package Unit Service', body: 'Diagnosis, repair, and replacement of rooftop package units for offices, retail, and industrial buildings.', icon: 'snowflake', href: '/ac-repair/' },
  { slug: 'ac-maintenance', name: 'Preventive Maintenance Agreements', body: 'Scheduled tune-ups and inspections that extend equipment life and reduce emergency calls.', icon: 'calendar-check', href: '/ac-maintenance/' },
  { slug: 'ac-installation', name: 'Commercial Installation & Replacement', body: 'Properly sized commercial systems with an itemized estimate before any work begins.', icon: 'wrench', href: '/ac-installation/' },
  // TODO(claims): 24/7 is unconfirmed.
  { slug: 'emergency-hvac', name: 'Emergency HVAC Repair', body: '24/7 dispatch for no-cool and no-heat outages that threaten business operations.', icon: 'alert', href: '/emergency-hvac/' },
  { slug: 'contact', name: 'Multi-Site & Portfolio Service', body: 'Consolidated scheduling, service history, and invoicing across every property you manage.', icon: 'buildings', href: '/contact/' },
  { slug: 'heat-pump-services', name: 'Heat Pump & VRF Systems', body: 'Efficient heating and cooling for office buildings and multifamily common areas.', icon: 'heat-pump', href: '/heat-pump-services/' },
];

export const processSteps: { title: string; body: string }[] = [
  { title: 'Assess', body: 'We walk the property or review your portfolio and existing equipment.' },
  { title: 'Propose', body: 'You get an itemized proposal - one-time service or an ongoing maintenance agreement.' },
  { title: 'Schedule', body: 'Work is scheduled around your business hours, tenants, or operations.' },
  { title: 'Support', body: 'Ongoing service history and a single point of contact for every future call.' },
];

// TODO(data): example cities per region, confirm against the client's real commercial service
// area before launch. Deliberately kept out of regions.ts/cities.ts, which hold the residential
// tier-1 city lists - these are illustrative only.
export const regionCopy: Record<string, { cities: string; cta: string }> = {
  'los-angeles-county': { cities: 'Los Angeles · Pasadena · Glendale · Burbank · Santa Monica', cta: 'Explore LA County' },
  'south-bay': { cities: 'Torrance · Redondo Beach · Manhattan Beach · Gardena · Carson', cta: 'Explore South Bay' },
  'orange-county': { cities: 'Anaheim · Irvine · Santa Ana · Huntington Beach · Costa Mesa', cta: 'Explore Orange County' },
  'inland-empire': { cities: 'Riverside · Ontario · Rancho Cucamonga · Fontana · Corona', cta: 'Explore Inland Empire' },
};

export const proof = {
  eyebrow: 'Why Air Pro',
  heading: 'Clear proposals and a crew that shows up on schedule',
  // TODO(claims): background-checked and factory-trained are unconfirmed.
  body: 'Every technician is background-checked and factory-trained. Every proposal is itemized before we touch a tool. Every job includes a service record for your files, not just an invoice.',
  ctaLabel: 'Read our reviews',
  ctaHref: '/reviews/',
};

// Same array feeds the visible FAQ list and the FAQPage JSON-LD.
export const commercialFaqs: Faq[] = [
  {
    q: 'Does AIRPRO SOLUTIONS offer preventive maintenance agreements for commercial properties?',
    a: 'Yes. AIRPRO SOLUTIONS offers scheduled preventive maintenance agreements for office buildings, retail centers, multifamily properties, and industrial sites, sized to a single property or a full portfolio, with priority scheduling for agreement holders.',
  },
  {
    // TODO(claims): after-hours and weekend scheduling is unconfirmed.
    q: 'Can AIRPRO SOLUTIONS service rooftop package units after hours?',
    a: 'Yes. AIRPRO SOLUTIONS offers after-hours and weekend scheduling for commercial and multifamily properties so repairs and maintenance can happen without disrupting tenants, staff, or business hours.',
  },
  {
    // TODO(claims): insured and certificate-of-insurance are unconfirmed.
    q: 'Do you provide a certificate of insurance for commercial jobs?',
    a: 'Yes. AIRPRO SOLUTIONS is licensed and insured and provides a certificate of insurance for property managers, general contractors, and building management as needed before work begins.',
  },
  {
    q: 'Can AIRPRO SOLUTIONS manage HVAC service across multiple properties?',
    a: 'Yes. AIRPRO SOLUTIONS works with property management companies and multi-site businesses to consolidate HVAC service, scheduling, and invoicing across a portfolio, with a single point of contact rather than separate vendors per site.',
  },
  {
    // TODO(claims): same-day response and 24/7 dispatch are unconfirmed.
    q: 'How fast can AIRPRO SOLUTIONS respond to a commercial HVAC outage?',
    a: 'Same-day response is typical for commercial no-cool and no-heat calls across our Southern California service area, with 24/7 emergency dispatch for properties on a maintenance agreement.',
  },
  {
    q: 'Do you repair or replace rooftop package units?',
    a: "Both. AIRPRO SOLUTIONS diagnoses rooftop package units and gives an itemized repair-versus-replace recommendation based on the unit's age, repair history, and efficiency, so property managers can budget with real numbers rather than guesswork.",
  },
  {
    // TODO(claims): plan inclusions are pending client confirmation, same as /maintenance-plan/.
    q: "What's included in a commercial preventive maintenance agreement?",
    a: 'A typical agreement includes scheduled inspections, filter changes, coil cleaning, refrigerant level checks, electrical component testing, and a written report after each visit. Frequency and scope are set per property, and agreement holders get priority scheduling for repairs.',
  },
  {
    q: 'Does AIRPRO SOLUTIONS work with general contractors on tenant improvement projects?',
    a: 'Yes. AIRPRO SOLUTIONS coordinates directly with general contractors, architects, and property owners on HVAC scope for tenant improvement and build-out projects, including new rooftop unit placement and ductwork for the new layout.',
  },
  {
    // TODO(claims): billing structure and portfolio pricing are unconfirmed.
    q: 'How much does commercial HVAC maintenance cost?',
    a: 'Cost depends on the number of units, system type, and visit frequency, so AIRPRO SOLUTIONS prices maintenance agreements after a property walkthrough rather than a flat rate. Most single-property agreements are billed per visit or per unit per year, with portfolio pricing available for multiple sites.',
  },
  {
    // TODO(claims): brand list and "all major brands" - the About page tracks manufacturer
    // authorization as pending.
    q: 'Does AIRPRO SOLUTIONS service all commercial HVAC brands?',
    a: 'Yes. AIRPRO SOLUTIONS services all major commercial HVAC and rooftop package unit brands, including Trane, Carrier, Lennox, York, Daikin, and Rheem systems, whether or not we installed the original equipment.',
  },
];

export const finalCta = {
  title: 'Get a commercial HVAC quote today',
  // TODO(claims): "free" assessment is unconfirmed.
  body: 'Free property assessment and an itemized proposal - one property or a full portfolio.',
  ghostLabel: 'Request a Commercial Quote',
  ghostHref: '/contact/',
};
