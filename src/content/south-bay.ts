import { siteConfig } from '@/content/site-config';
import { getService, commercialCardImage } from '@/content/services';
import type { Faq } from '@/content/faq';
import type { Card } from '@/components/sections/ServicesGrid';
import type { RebateCard } from '@/components/sections/RebateCards';

// TODO(copy): client review of every string before launch, same as the LA County hub.
// Every figure below is cited in the comment above it. None are invented; anything not sourced is
// flagged TODO(data) inline. Time-sensitive items are also tracked in docs/open-items.md.

type ServiceCardSpec = { slug: string; body: string; name?: string; icon?: string };

export const southBayHub = {
  path: '/service-areas/south-bay/',
  primaryKeyword: 'hvac services south bay',
  // Title/H1 are built from src/lib/seo.ts (regionTitle/regionH1) per CLAUDE.md, not hand-written here.
  description:
    'AIRPRO SOLUTIONS provides HVAC services in the South Bay, from the beach cities to Torrance and Carson. Licensed, 4.8-star rated, residential and commercial.',

  cityNames: ['Torrance', 'Redondo Beach', 'Manhattan Beach', 'Hermosa Beach', 'El Segundo', 'Gardena', 'Hawthorne', 'Carson'],

  hero: {
    lede:
      'AIRPRO SOLUTIONS provides HVAC services in the South Bay - from the beach cities and El Segundo to Torrance, Gardena, Hawthorne, and Carson - with permits, utilities, and equipment placement matched to each city.', // also the Service schema description source text
    photoCaptionTitle: 'South Bay, CA',
    photoCaptionBody: 'Beach cities, LAX edge, and inland South Bay across eight cities',
    proof: [
      { icon: 'shield-check', text: 'Licensed' },
      { icon: 'star', text: '4.8-star rated' },
      { icon: 'home', text: 'Residential & commercial' },
      { icon: 'pin', text: 'Eight cities covered' },
    ],
  },

  trust: [
    { num: '8 cities', label: 'covered on this page' },
    { num: '4.8★', label: 'average rating, 40 reviews' },
    { num: 'Licensed', label: `CA LIC #${siteConfig.licenses.join(', #')}` },
    { num: 'Eight permit offices', label: 'one region, city-by-city rules' },
  ],

  answer: {
    lead: 'AIRPRO SOLUTIONS is a licensed HVAC contractor serving the South Bay',
    body:
      ', including Torrance, Redondo Beach, Manhattan Beach, Hermosa Beach, El Segundo, Gardena, Hawthorne, and Carson, for homes, multifamily buildings, and commercial properties. Permits, utilities, and equipment rules change by city and sometimes by address, so every recommendation starts with the property, not a region-wide assumption.',
  },

  // Sources: city geography per each city's own description (beach cities west of the 405, reached
  // from PCH; El Segundo immediately south of LAX; Torrance/Gardena/Hawthorne inland around the 405
  // corridor). Carson: City of Carson ("about 16 miles south of Downtown Los Angeles"), access to
  // the 110/405/91. Climate-zone lookup: California Energy Commission address-based tool. No
  // city-level heat-day counts, humidity, record highs, or dBA figures are quoted (see
  // docs/open-items.md).
  local: {
    eyebrow: 'Local knowledge',
    title: 'Beach cities to Carson: how the South Bay fits together',
    paragraphs: [
      'The South Bay runs from the beach cities and El Segundo on the west and northwest to Carson on the southeast, and each part of it has a different mix of buildings and rules. The beach cities of Redondo Beach, Hermosa Beach, and Manhattan Beach sit west of the 405 and are reached from Pacific Coast Highway. El Segundo sits immediately south of LAX, while Torrance, Gardena, and Hawthorne form the inland middle around the 405 corridor.',
      'Carson is the southeast anchor, between Torrance and Long Beach, with direct access to the 110, 405, and 91. The city describes itself as about 16 miles south of Downtown Los Angeles. Cross-region driving commonly uses the 405, 110, 105, and 91, and actual travel time depends on traffic and the property’s location.',
      '**California’s Energy Code requirements can vary by a property’s physical location**, and the California Energy Commission provides an address-based climate-zone lookup. That is why we work from the property’s address, not from an assumption that the whole region behaves alike.',
    ],
    cardTitle: 'Where each city sits',
    groups: [
      { label: 'Beach cities', cities: ['Redondo Beach', 'Manhattan Beach', 'Hermosa Beach'] },
      { label: 'LAX edge', cities: ['El Segundo'] },
      { label: 'Central South Bay', cities: ['Torrance', 'Gardena', 'Hawthorne'] },
      { label: 'Harbor side', cities: ['Carson'] },
    ],
    note: 'ZIP codes are not city boundaries. For example, 90248 includes parts of Gardena, Carson, and Los Angeles’ Harbor Gateway area, so permits follow the property’s city, not its mailing city.',
  },

  services: {
    eyebrow: 'Services in the South Bay',
    title: "HVAC work across the South Bay's homes and buildings",
    cards: [
      { slug: 'ac-repair', body: 'Diagnosis for cooling failures, with outdoor condenser placement checked against property-line noise and screening rules that differ by city.' },
      { slug: 'heating-repair', body: 'Furnace and gas heating work in cities served by SoCalGas, with the city’s mechanical permit path checked first.' },
      { slug: 'heat-pump-services', body: 'Heat pump work starts with SCE for electric delivery, and with state incentive programs that have had limited funding.' },
      { slug: 'residential-hvac', name: 'Residential HVAC', body: 'Single-family homes, condos, townhomes, and apartments each bring different access, approval, and equipment-placement questions.', icon: 'home' },
      { slug: 'commercial-hvac', name: 'Commercial HVAC', body: 'Offices, retail, restaurants, and rooftop equipment, from El Segundo’s corporate campuses to Gardena and Carson industrial zones.', icon: 'building' },
      { slug: 'services', name: 'All HVAC Services', body: 'See the full list of repair, installation, and maintenance services.', icon: 'check' },
    ] satisfies ServiceCardSpec[],
  },

  // Sources: Redondo Beach multiple-family zoning and mixed-use overlay; Torrance Downtown
  // condominium complexes; El Segundo corporate/aerospace/high-tech/airport-related businesses;
  // Torrance 290-acre industrial project area; Gardena and Carson industrial/warehouse zones.
  split: {
    eyebrow: 'Residential and commercial',
    title: 'Beach-city condos, suburban homes, and commercial buildings',
    residential: {
      tag: 'Residential',
      title: 'Homes, condos, and apartments',
      body: 'Redondo Beach zones for multiple-family housing, and Downtown Torrance includes condominium complexes. Access, HOA approvals, and equipment placement are checked first.',
      chips: ['Single-family homes', 'Condos and townhomes', 'Apartments'],
      ctaLabel: 'Residential HVAC',
      href: '/residential-hvac/',
    },
    commercial: {
      tag: 'Commercial',
      title: 'Commercial properties',
      body: 'El Segundo has corporate office, aerospace, high-tech, and airport-related businesses. Torrance has a 290-acre industrial project area, and Gardena and Carson have industrial and warehouse zones.',
      chips: ['Offices', 'Retail and restaurants', 'Rooftop units', 'Warehouse and light industrial'],
      ctaLabel: 'Commercial HVAC',
      href: '/commercial-hvac/',
    },
    copyCols: [
      ['**Property type shapes the job.** South Bay properties range from single-family homes and multifamily residences to office, retail, restaurant, warehouse, light-industrial, and mixed-use buildings. Equipment access, HOA approvals, rooftop placement, ventilation needs, noise limits, and permit requirements vary by property and city.'],
      ['**Building age and construction are confirmed on site.** Attic access, foundation type, and original ductwork are property-specific conditions, so we confirm them at a site visit before recommending repair or replacement.'],
    ],
  },

  // Permit sources: Torrance (Community Development, Building and Safety Division; electronic
  // submittals as of 2026-01-05); Redondo Beach (Community Development, Building and Safety
  // Division; electronic permit system); Manhattan Beach (Community Development, Building and
  // Safety); Hermosa Beach (Community Development, Building Safety Division; online-only portal
  // effective 2026-10-01); El Segundo (Community Development, Building and Safety Division; 2022
  // CA Mechanical Code/Energy Code with local amendments); Gardena (Community Development, Building
  // Services; New HVAC/Forced Air Unit over-the-counter permits, CF1R forms); Hawthorne (Department
  // of Building and Safety; 24-hour inspection lead time, 9am-5pm window); Carson (Building and
  // Safety Department; mechanical permit worksheet). Title 24 per the CEC Energy Code Support
  // Center. See docs/open-items.md for the dated items.
  permits: {
    eyebrow: 'Permits and code',
    title: "Each city issues its own HVAC permits",
    intro: "Mechanical permits come from each city's building department, not from Los Angeles County. Replacing AC, furnace, heat pump, or air handler equipment should be treated as permit-required, and electrical, plumbing, or structural permits can apply on the same job.",
    columns: ['City', 'Permit office', 'What is different locally'],
    rows: [
      ['Torrance', 'Community Development, Building and Safety Division', 'Separate mechanical, electrical, and plumbing submittals, with zoning clearance required before permit application. All plan reviews and permit submittals are electronic as of January 5, 2026.'],
      ['Redondo Beach', 'Community Development, Building and Safety Division', 'The city’s code covers installation, alteration, repair, and replacement of heating and cooling systems, and permits must be obtained before work begins. Applications and inspections run through an electronic permit system.'],
      ['Manhattan Beach', 'Community Development, Building and Safety', 'The city states permits are required for improvements to mechanical systems. Exterior equipment placement, architectural review, and noise conditions are confirmed with the city.'],
      ['Hermosa Beach', 'Community Development, Building Safety Division', 'Separate building, mechanical, electrical, and plumbing applications. Beginning October 1, 2026, applications available through the city’s online portal are to be submitted online.'],
      ['El Segundo', 'Community Development, Building and Safety Division', 'The city has adopted the 2022 California Mechanical Code and 2022 Energy Code with local amendments, so amendments are checked before permit submittal.'],
      ['Gardena', 'Community Development, Building Services', 'Lists New HVAC Permit and Forced Air Unit Permit among its over-the-counter permit types, and the in-person process requires completed CF1R forms.'],
      ['Hawthorne', 'Department of Building and Safety', 'Inspections are requested at least 24 hours in advance and run between 9:00 a.m. and 5:00 p.m., so inspection lead time belongs in the schedule.'],
      ['Carson', 'Building and Safety Department', 'The city’s mechanical permit worksheet lists furnace, heater, boiler, mini-split, and AC condenser work.'],
    ],
    copyCols: [
      ['**Title 24 applies statewide.** California’s energy code is enforced through each city’s permit process. Many HVAC alterations need compliance documentation and third-party field verification and diagnostic testing, and duct sealing and testing can apply when an existing duct system is altered. The required tests are identified on the compliance forms for each job.'],
      ['**Unincorporated addresses are a different jurisdiction.** Communities next to these cities, such as West Carson, are not part of the incorporated city beside them. We confirm jurisdiction by address before quoting.'],
    ],
    // Sources: Torrance Municipal Code 46.2.6 (property-line noise) and 91.38.4 (screening); Redondo
    // Beach noise-by-receiving-land-use; Carson Municipal Code Chapter 5 (adopts the LA County noise
    // ordinance). No dBA figures are quoted for Carson or Redondo Beach (see docs/open-items.md).
    noise: {
      title: 'Noise and equipment placement',
      intro: 'Outdoor condensers, heat pumps, and rooftop units are handled differently from city to city.',
      columns: ['City', 'What applies to exterior equipment'],
      rows: [
        ['Torrance', 'Air conditioning and similar equipment may not raise noise at the property line of residential land by more than 5 decibels over ambient (Torrance Municipal Code 46.2.6). Mechanical equipment, ductwork, and plumbing lines must be screened in the applicable zoning context (91.38.4).'],
        ['Redondo Beach', 'Exterior noise limits depend on the receiving land use and the time of day, so there is no single citywide figure. In mixed-use projects, commercial equipment near residences may need acoustical and vibration controls.'],
        ['Carson', 'Chapter 5 of the municipal code adopts the Los Angeles County noise ordinance. In multifamily settings with shared walls or floors, equipment that transmits vibration may need vibration isolators, as determined by the Building Official.'],
        ['Manhattan Beach, Hermosa Beach, El Segundo, Gardena, Hawthorne', 'We confirm zoning, screening, HOA or architectural approval, and noise conditions for the specific property before recommending where equipment goes.'],
      ],
      note: "Based on each city's municipal code and planning materials. Code text and city procedures change, so current requirements are confirmed with the building department before permit submittal.",
    },
  },

  // Rebate sources: SoCalGas 2026 Home Energy Efficiency Rebate ($75 thermostat, install in 2026,
  // applications due 2026-12-31); SCE Summer Discount Plan (up to $145/unit, seasonal, cycling
  // program); TECH Clean California / HEEHRA (income-based, funding-limited; SoCal single-family
  // fully reserved as of early 2026, waitlisted). See docs/open-items.md for re-verify dates.
  rebates: {
    eyebrow: 'Utilities and rebates',
    title: 'Your utility accounts decide which programs to look at',
    intro: 'Electric delivery in these cities is through SCE and natural gas through SoCalGas, with Clean Power Alliance supplying generation in some cities.',
    cards: [
      {
        verifyTag: 'Verify current amount before launch',
        amount: '$75 per thermostat',
        description: 'SoCalGas 2026 Home Energy Efficiency Rebate for a qualifying ENERGY STAR smart thermostat. Equipment must be purchased and installed in 2026, and applications are due by December 31, 2026.',
        linkLabel: 'SoCalGas application',
        linkHref: 'https://www.socalgas.com/sites/default/files/2026-03/SCG-HEER-Application.pdf.pdf',
      },
      {
        verifyTag: 'Verify current amount before launch',
        amount: 'Up to $145 per unit',
        description: 'SCE Summer Discount Plan bill credits for qualifying central AC that cycles during demand-response events. It is a seasonal program, so confirm current enrollment terms.',
        linkLabel: 'SCE program page',
        linkHref: 'https://www.sce.com/business/save-costs-energy/savings-strategies',
      },
      {
        verifyTag: 'Verify current status before launch',
        amount: 'Check program status',
        description: 'State heat pump programs through TECH Clean California and HEEHRA are income-based and funding-limited. Southern California single-family funding was fully reserved as of early 2026, with later requests waitlisted.',
        linkLabel: 'TECH Clean California',
        linkHref: 'https://techcleanca.com/incentives/heehrarebates/',
      },
    ] satisfies RebateCard[],
    copy: [
      'Electric delivery and generation are separate. SCE handles poles, wires, meters, billing, and outage response. In Redondo Beach, Manhattan Beach, and Carson, Clean Power Alliance supplies the electricity generation, and SCE programs are typically tied to an SCE delivery account. We did not find a Clean Power Alliance HVAC rebate, so we do not list one.',
      "No-cost programs may exist for some households. SCE's Energy Savings Assistance program serves income-qualified households, and its Residential Direct Install program lists duct test and seal for eligible single-family homes with central AC. Business owners can look at SCE Express Solutions and SoCalGas business rebates, and fuel switching does not qualify for the SoCalGas business rebates.",
      'Rebates and eligibility vary by service address, utility account, equipment efficiency, income qualifications, and available funding. We can help identify potential programs, but confirm final eligibility, amount, and application requirements with your utility before installation.',
    ],
    utilityCardTitle: 'Utilities in these cities',
    utilities: [
      'Electric delivery: SCE',
      'Natural gas: SoCalGas',
      'Generation: Clean Power Alliance in Redondo Beach, Manhattan Beach, and Carson',
    ],
    note: 'Confirm by address: service territory and generation provider can vary by address, so verify your utility directly before relying on any program.',
  },

  cities: {
    eyebrow: 'Cities served',
    title: 'The eight cities on this page',
    items: [
      { name: 'Torrance', note: 'Office, retail, industrial, and condo settings, with a 290-acre industrial project area. Property-line noise and equipment screening rules apply.', href: '/service-areas/torrance-ca/' },
      { name: 'Redondo Beach', note: 'Multiple-family zoning and a mixed-use overlay. Noise limits depend on the neighboring use. Clean Power Alliance supplies generation.' },
      { name: 'Manhattan Beach', note: 'Beach city with Clean Power Alliance generation. Mechanical work needs a permit, and exterior equipment placement is confirmed with the city.' },
      { name: 'Hermosa Beach', note: 'Beach city with separate mechanical applications, and online-only submittals beginning October 1, 2026.' },
      { name: 'El Segundo', note: 'South of LAX, with corporate office, aerospace, high-tech, and light industrial uses. Local code amendments apply.' },
      { name: 'Gardena', note: 'HVAC and forced-air unit permits are over-the-counter types and need CF1R forms. Industrial and warehouse zones in the mix.' },
      { name: 'Hawthorne', note: 'Century Business Center and Green Line mixed-use planning areas. Inspections are requested 24 hours ahead.' },
      { name: 'Carson', note: 'Industrial, commercial, and townhome settings. The County noise ordinance applies, and multifamily equipment may need vibration isolation.' },
    ],
  },

  proof: {
    eyebrow: 'Why Air Pro',
    heading: 'Recommendations that start with your address',
    body: 'Permit office, utility, noise rules, and building type all change across the South Bay. We check them for your property before recommending equipment, so the plan fits where you actually live or work.',
    stats: [
      { num: '4.8★', label: 'Google rating' },
      { num: '40', label: 'Google reviews' },
      { num: '8', label: 'Cities on this page' },
      { num: 'Licensed', label: `CA LIC #${siteConfig.licenses.join(', #')}` },
    ],
  },

  faqs: [
    {
      q: 'Which cities does AIRPRO SOLUTIONS serve in the South Bay?',
      a: 'This page covers Torrance, Redondo Beach, Manhattan Beach, Hermosa Beach, El Segundo, Gardena, Hawthorne, and Carson. These are the South Bay cities we list here, and the South Bay as a term can be defined more broadly. Nearby unincorporated communities such as West Carson are a different jurisdiction from the city next to them, so call us first if your address is outside these eight cities.',
      links: [{ text: 'Torrance', href: '/service-areas/torrance-ca/' }],
    },
    {
      q: 'Do I need a permit to replace my AC in the South Bay?',
      a: 'Plan on it in all eight cities. Mechanical permits are issued by each city’s building department, not by Los Angeles County, and we did not find a published exemption for full like-for-like AC, furnace, or heat pump replacement in any of the eight. Torrance requires separate mechanical, electrical, and plumbing submittals, and Gardena lists New HVAC and Forced Air Unit permits. We check the applicable local permit path before work begins.',
    },
    {
      q: 'What is Title 24 and how does it affect an HVAC replacement?',
      a: 'Title 24 is California’s building energy code. Many HVAC replacements need compliance documentation and third-party field verification and diagnostic testing, and duct sealing and testing can apply when an existing duct system is altered. Requirements can depend on climate zone, and the California Energy Commission provides an address-based lookup. The exact tests for a job are listed on its compliance forms.',
    },
    {
      q: 'Which utility serves my home, and are there HVAC rebates?',
      a: 'In these cities, Southern California Edison (SCE) delivers electricity and Southern California Gas Company (SoCalGas) supplies natural gas. Clean Power Alliance supplies electricity generation in Redondo Beach, Manhattan Beach, and Carson, while SCE still handles delivery, billing, and outages. SoCalGas lists a $75 smart thermostat rebate for equipment purchased and installed in 2026, and SCE’s Summer Discount Plan offers up to $145 in bill credits per unit. Confirm your utility by address and confirm current eligibility before installation.',
    },
    {
      q: 'Are there noise or screening rules for outdoor equipment?',
      a: 'Yes, and they are not the same in every city. Torrance limits air conditioning noise at a residential property line to no more than 5 decibels over ambient and can require screening of mechanical equipment in some zones. Redondo Beach sets noise limits by receiving land use and time of day. Carson adopts the Los Angeles County noise ordinance. For the other cities, we confirm placement, screening, and noise conditions for the specific property.',
    },
    {
      q: 'Do you work on condos, apartments, and HOA properties?',
      a: 'Yes, for single-family homes, condos, townhomes, and apartments. Redondo Beach zones for multiple-family housing and has a mixed-use overlay, and Downtown Torrance includes three residential complexes with 148 condominium units. HOA rules and building-management approvals are set by each property, so we check access, equipment placement, and approvals before installation or replacement.',
    },
    {
      q: 'Does AIRPRO SOLUTIONS handle commercial HVAC in the South Bay?',
      a: 'Yes, for offices, retail, restaurants, and light industrial and warehouse properties. El Segundo includes corporate office, aerospace, high-tech, and airport-related businesses, and Torrance has a 290-acre industrial project area, while Gardena and Carson have industrial and warehouse zones. Business incentives such as SCE Express Solutions or SoCalGas business rebates depend on the equipment and project, so call us before you buy equipment.',
      links: [{ text: 'call us', href: siteConfig.phoneHref }],
    },
    {
      q: 'Does my ZIP code tell me which city permit rules apply?',
      a: 'No, because ZIP codes are mail delivery areas, not city boundaries. ZIP 90248, for example, includes parts of Gardena, Carson, and Los Angeles’ Harbor Gateway area, and 90250 includes Hawthorne and unincorporated communities. The city that issues your permit is set by the property’s physical location, so we confirm jurisdiction by address before quoting.',
    },
    {
      q: 'How quickly can a technician reach me?',
      a: 'Travel time across the South Bay depends on traffic on the 405, 110, 105, and 91 and on beach-area congestion. Dispatch timing is confirmed when service is scheduled, based on your location and technician availability.',
    },
  ] satisfies Faq[],
};

// Service cards resolved against the real services.ts data (commercial-hvac and the /services/ hub
// aren't services.ts entries), same special-casing as the LA County hub.
export function southBayServiceCards(): Card[] {
  return southBayHub.services.cards.map((sc) => {
    if (sc.slug === 'commercial-hvac') {
      return { href: '/commercial-hvac/', name: sc.name!, description: sc.body, icon: sc.icon!, image: commercialCardImage };
    }
    if (sc.slug === 'services') {
      return { href: '/services/', name: sc.name!, description: sc.body, icon: sc.icon! };
    }
    if (sc.slug === 'residential-hvac') {
      return { href: '/residential-hvac/', name: sc.name!, description: sc.body, icon: sc.icon! };
    }
    const svc = getService(sc.slug);
    if (!svc) throw new Error(`Unknown service slug on ${southBayHub.path}: ${sc.slug}`);
    return { href: `/${svc.slug}/`, name: svc.name, description: sc.body, icon: svc.icon, image: svc.image };
  });
}
