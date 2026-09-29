import type { Faq } from '@/content/faq';

// Matrix (service+city) page content, keyed by "${service}/${city}". Title/H1 are built from
// src/lib/seo.ts (matrixTitle/matrixH1) per CLAUDE.md, not hand-written here. Symptoms, process,
// repairVsReplace and appliesTo are NOT duplicated here: the page reads those straight off the
// service record in services.ts so there is only one copy of that content.
export type MatrixContent = {
  primaryKeyword: string;
  metaDescription: string;
  lede: string; // hero opening paragraph AND the Service schema description - must match exactly
  heroProof: { icon: string; label: string }[];
  trust: { num: string; label: string }[];
  answer: { label: string; lead: string; body: string };
  local: {
    eyebrow: string;
    h2: string;
    paragraphs: string[]; // may contain **bold** markers
    areasHeading: string;
  };
  nearby: string[]; // city slugs (all render as non-link cards unless a matrixPages pair exists)
  faqs: Faq[];
};

// Locked copy for /ac-repair/torrance-ca/. See CLAUDE.md "Claims that must not ship": no pricing,
// same-day/24-7 timing, brand-list, or unconfirmed licensing claims.
const acRepairTorrance: MatrixContent = {
  primaryKeyword: 'ac repair torrance',
  metaDescription:
    'Need AC repair in Torrance? Air Pro Solutions helps homes and businesses with cooling, airflow, electrical, and drainage problems. Schedule service.',
  lede:
    "No cooling, weak airflow, strange noises, or water leaks? Air Pro Solutions provides residential and commercial AC repair across Torrance - from Old Torrance and North Torrance to Walteria and the Hollywood Riviera border - and explains what we find and what your options are before you decide.",
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
      ' finds and fixes the problems that keep an air conditioning system from cooling, running efficiently, draining correctly, or moving air reliably. Air Pro Solutions diagnoses the cause, explains what we find and your options, and completes the repair for homes and businesses across Torrance. Call or request service online to schedule a visit.',
  },
  local: {
    eyebrow: 'Local knowledge',
    h2: "AC repair built around Torrance's housing stock",
    paragraphs: [
      "Torrance sits at the edge of the South Bay's marine layer, so homes near the coast tend to need less cooling than homes farther inland, such as in North Torrance. Systems that run more hours across a season see more wear on parts like capacitors and blower motors. **Air Pro Solutions takes that into account when diagnosing intermittent or seasonal cooling problems**, rather than assuming every system fails the same way.",
      "Housing stock matters too. **Old Torrance and North Torrance** have a large share of homes built in the 1940s through 1960s, often with narrow attic space and original ductwork that can restrict airflow. That is a common reason an AC runs constantly without cooling the house, or freezes up. We look at duct condition and airflow when diagnosing problems in these neighborhoods.",
    ],
    areasHeading: 'Torrance areas we repair AC in',
  },
  nearby: ['redondo-beach-ca', 'manhattan-beach-ca', 'gardena-ca', 'carson-ca'],
  faqs: [
    {
      q: 'How fast can I get AC repair in Torrance?',
      a: 'Call (323) 776-9047 or request service online and we will follow up with you. We prioritize no-cool calls and will confirm availability when you call, so tell us your AC is down when you reach us.',
      links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
    },
    {
      q: 'Why is my AC not cooling well in Torrance?',
      a: 'The most common causes are a refrigerant leak, a dirty condenser coil, or a failing capacitor. In inland neighborhoods like North Torrance, systems can run more hours than systems near the coast, which can add wear to parts like capacitors and blower motors. A technician can find the actual cause in your system.',
    },
    {
      q: 'Do older Torrance homes have common AC problems?',
      a: 'Often, yes. Many homes in Old Torrance and North Torrance were built in the 1940s through 1960s with narrow attic space and original ductwork, which can restrict airflow and cause an AC to run inefficiently or freeze up. Air Pro Solutions looks at duct condition and airflow when diagnosing problems in these neighborhoods.',
    },
    {
      q: 'How much does AC repair cost in Torrance?',
      a: 'Repair cost depends on the part, the age of the system, and how accessible the unit is. The most accurate answer comes from a technician looking at your system, so contact us to talk through your situation.',
    },
    {
      q: 'Does Air Pro Solutions repair AC systems in Torrance condos and HOAs?',
      a: 'Yes. Air Pro Solutions repairs AC systems in condos, townhomes, and HOA-managed communities throughout Torrance, and can coordinate with property managers or HOA boards on access and scheduling.',
    },
    {
      q: 'What AC brands does Air Pro Solutions repair in Torrance?',
      a: 'Air Pro Solutions services major residential and commercial HVAC brands, whether the equipment was installed by us or another contractor. Call to confirm your specific make and model.',
    },
    {
      q: 'Should I repair or replace my AC in Torrance?',
      a: 'Repair often makes sense for an isolated problem on a system that has otherwise been reliable. Replacement is worth considering when breakdowns become frequent, a major component fails, or the system is well past its expected lifespan. A technician can compare the repair against replacement so you can decide with the full picture.',
    },
  ],
  // TODO(copy): client review of every FAQ answer before launch.
};

export const matrixContent: Record<string, MatrixContent> = {
  'ac-repair/torrance-ca': acRepairTorrance,
};

export const getMatrixContent = (service: string, city: string) => matrixContent[`${service}/${city}`];
