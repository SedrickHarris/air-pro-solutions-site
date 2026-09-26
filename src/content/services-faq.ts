// Services hub FAQs (locked copy). The same array renders the page AND the FAQPage JSON-LD, so the two can never drift.
// TODO(data): Q8 ("same-day", "24/7"), Q10 ("insured") and the brand list in Q11 are pending client confirmation.
import type { Faq } from '@/content/faq';

export const servicesFaqs: Faq[] = [
  {
    q: 'What HVAC services does Air Pro Solutions offer?',
    a: 'Air Pro Solutions handles AC repair, AC installation, AC maintenance, heating repair, furnace installation, heat pump service, ductless mini-splits, ductwork, indoor air quality, and emergency HVAC dispatch for homes and businesses.',
  },
  {
    q: 'Do you work on both residential and commercial systems?',
    a: 'Yes. Air Pro Solutions services single-family homes, multifamily properties, and commercial buildings, including rooftop package units and portfolio accounts for property managers.',
  },
  {
    q: "What's the difference between AC maintenance and AC repair?",
    a: "AC maintenance is a scheduled tune-up that checks refrigerant levels, electrical components, and airflow before problems start. AC repair addresses a system that's already having trouble, such as warm air, weak airflow, leaks, or unusual noises.",
  },
  {
    q: 'How do I know if I need a repair or a replacement?',
    a: "A technician diagnoses the system first and gives an itemized repair-versus-replace recommendation based on the equipment's age, repair history, and efficiency, so the decision is based on real numbers rather than a guess.",
  },
  {
    q: "What's included in a maintenance visit?",
    a: 'A typical maintenance visit includes a seasonal inspection of your cooling and heating equipment, cleaning and checking key components, a filter check with replacement guidance, and a written summary of what the technician found.',
  },
  {
    q: 'How much does HVAC service cost?',
    a: 'Cost depends on the service, the equipment involved, and the scope of the job, so Air Pro Solutions provides an itemized estimate after diagnosing the issue or reviewing the work, rather than a flat rate over the phone.',
  },
  {
    q: 'Can I get an estimate before work begins?',
    a: "Yes. Air Pro Solutions provides an itemized estimate before any work begins, whether it's a repair, a new installation, or a maintenance agreement.",
  },
  {
    q: 'How fast can someone come out?',
    a: 'Same-day service is typical for no-cool and no-heat calls across our Southern California service area, and 24/7 dispatch is available for emergencies.',
  },
  {
    q: 'Which areas does Air Pro Solutions serve?',
    a: 'Air Pro Solutions serves Los Angeles County, the South Bay, Orange County, and the Inland Empire. Call to confirm coverage for an address outside these regions.',
  },
  {
    q: 'Is Air Pro Solutions licensed and insured?',
    a: 'Yes. Air Pro Solutions is licensed and insured, holding California contractor license numbers 1126691 and 50251.',
  },
  {
    q: 'What HVAC brands does Air Pro Solutions work with?',
    a: 'Air Pro Solutions services all major residential and commercial HVAC brands, including Trane, Carrier, Lennox, York, Daikin, and Rheem, whether or not we installed the original equipment.',
  },
];
