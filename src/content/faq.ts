// Generic HVAC FAQs, direct answer first, then detail. City/service-specific FAQs live on their own pages.
// The same array renders the page AND the FAQPage JSON-LD, so the two can never drift.
// `links` marks substrings of `a` that render as inline links; the plain `a` text (fed to the schema) stays unchanged.
// `boldLead`, when set, is the exact substring of `a` to render bold (see FaqList's `boldFirstSentence`
// prop) instead of relying on the default "everything up to the first '. '" heuristic - needed when an
// approved bold lead spans more than one sentence (e.g. "No. The EPA says ..."), where the heuristic
// would stop bolding after the first period. Falls back to the heuristic when omitted, so every
// existing Faq entry (ac-repair, ac-installation, /faq/) is unaffected.
// TODO(copy): client review of every answer before launch. No business-specific numbers here.
export type Faq = { q: string; a: string; links?: { text: string; href: string }[]; boldLead?: string };

export const generalFaqs: Faq[] = [
  {
    q: 'How often should I schedule HVAC maintenance for my home?',
    a: 'Most home HVAC systems benefit from professional maintenance about once a year. If your home uses both heating and air conditioning, ask about seasonal service for each system. Regular maintenance can help identify wear, airflow issues, and other concerns before they lead to a breakdown.',
  },
  {
    q: 'Why is my air conditioner running but not cooling?',
    a: 'A dirty air filter, thermostat setting, blocked return vent, or outdoor unit issue can keep an air conditioner from cooling properly. Check that the thermostat is set to cool and that vents are open. If the system still runs without cooling, turn it off and schedule an inspection to identify the cause.',
  },
  {
    q: 'Should I repair or replace my home’s air conditioner?',
    a: 'The right choice depends on the system’s age, condition, repair needs, and cooling performance. A technician can inspect the equipment, explain what is causing the problem, and discuss repair and replacement options so you can make an informed decision.',
  },
  {
    q: 'Is a heat pump a good choice for a Southern California home?',
    a: 'A heat pump may be a practical option for some Southern California homes because it can provide both heating and cooling. Whether it fits your home depends on factors such as its size, insulation, existing equipment, and comfort needs. An HVAC evaluation can help determine which system options are appropriate.',
  },
  {
    q: 'What commercial HVAC services does AIRPRO SOLUTIONS provide?',
    a: 'AIRPRO SOLUTIONS provides commercial HVAC services for businesses and commercial properties. Visit the Commercial HVAC page to learn more about available services and request an evaluation for your property.',
    links: [{ text: 'Commercial HVAC page', href: '/commercial-hvac/' }],
  },
  {
    q: 'Can you service HVAC systems at commercial properties?',
    a: 'AIRPRO SOLUTIONS serves commercial HVAC customers. The equipment and work needed can vary by property, so share your building type, system concerns, and service location when you contact the team. They can help determine whether the requested service is a fit.',
  },
  {
    q: 'How often should a commercial HVAC system be maintained?',
    a: 'Maintenance frequency depends on the type of equipment, how often it operates, and the needs of the property. Regular professional inspections can help identify developing performance or airflow problems. Ask an HVAC professional to recommend a schedule for your system.',
  },
  {
    q: 'What should I do if my business’s HVAC system stops working?',
    a: 'Check the thermostat, confirm that the system has power, and make sure air filters and vents are not blocked. If the system still will not operate or the building becomes uncomfortable, contact an HVAC provider and describe the symptoms, equipment type, and property location.',
  },
  {
    q: 'What areas does AIRPRO SOLUTIONS serve?',
    a: 'AIRPRO SOLUTIONS serves customers across Los Angeles County, the South Bay, Orange County, and the Inland Empire. Visit the Service Areas page to explore coverage details or contact the team to ask about a specific location.',
    links: [{ text: 'Service Areas page', href: '/service-areas/' }],
  },
  {
    q: 'How do I request an HVAC estimate?',
    a: 'Call AIRPRO SOLUTIONS at (323) 776-9047 or use the quote request form. Include whether the property is residential or commercial, your service location, the type of system, and what you need help with. The team can follow up to discuss the next steps.',
    links: [
      { text: '(323) 776-9047', href: 'tel:+13237769047' },
      { text: 'quote request form', href: '/contact/' },
    ],
  },
];
