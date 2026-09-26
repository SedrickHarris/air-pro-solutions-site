// Generic HVAC FAQs, direct answer first, then detail. City/service-specific FAQs live on their own pages.
// The same array renders the page AND the FAQPage JSON-LD, so the two can never drift.
// TODO(copy): client review of every answer before launch. No business-specific numbers here.
export type Faq = { q: string; a: string };

export const generalFaqs: Faq[] = [
  {
    q: 'How often should I have my HVAC system serviced?',
    a: 'At least once a year. Ideally, have your air conditioning checked before cooling season and your heating checked before heating season. Regular service helps catch small problems early, keeps the system running efficiently, and reduces the chance of a breakdown on the hottest or coldest day.',
  },
  {
    q: 'Should I repair or replace my air conditioner?',
    a: 'Repair a single, minor failure on a system that has otherwise been reliable. Consider replacement when breakdowns become frequent, a major component such as the compressor fails, or the system is well past its expected lifespan. A technician can compare repair cost against replacement so you can decide with the full picture.',
  },
  {
    q: 'Why is my AC running but not cooling?',
    a: 'The most common causes are a dirty air filter, a frozen evaporator coil, low refrigerant from a leak, or a failed electrical part. Check that the thermostat is set to cool and that the filter is clean. If the air is still warm, turn the system off and call a technician, since running it can cause more damage.',
  },
  {
    q: 'How often should I change my air filter?',
    a: 'Check it monthly and replace it whenever it looks dirty. Many homes need a new filter every one to three months, depending on the filter type, pets, and air quality. Your filter manufacturer or technician can give the right interval for your system.',
  },
  {
    q: 'What size air conditioner does my home need?',
    a: 'The right size comes from a load calculation, not a rule of thumb based on square footage alone. Insulation, windows, ductwork, sun exposure, and local climate all affect it. An undersized system struggles to cool, and an oversized one cycles on and off and cools unevenly.',
  },
  {
    q: 'Is a heat pump a good choice for Southern California?',
    a: 'Often, yes. A heat pump both heats and cools using one system, and mild winters suit it well. Whether it fits your home depends on your existing equipment, ductwork, and comfort goals, so it is worth having a technician assess your home before deciding.',
  },
];
