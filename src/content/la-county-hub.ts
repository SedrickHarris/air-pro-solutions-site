import { siteConfig } from '@/content/site-config';
import { getService, commercialCardImage } from '@/content/services';
import type { Faq } from '@/content/faq';
import type { Card } from '@/components/sections/ServicesGrid';
import type { RebateCard } from '@/components/sections/RebateCards';

type ServiceCardSpec = { slug: string; body: string; name?: string; icon?: string };

// TODO(copy): client review of every string before launch, same as every other hub page.
// Every figure below is cited in the comment above it. None are invented; anything not sourced is
// flagged TODO(data) inline. See docs/primary-keyword-selection.md for why this page's primary
// keyword is "hvac services los angeles county" rather than the generic regionTitle() qualifier set.

export const laCountyHub = {
  path: '/service-areas/los-angeles-county/',
  primaryKeyword: 'hvac services los angeles county',
  // Title/H1 are built from src/lib/seo.ts (regionTitle/regionH1) per CLAUDE.md, not hand-written here.
  description:
    'Explore HVAC services in Los Angeles County from a licensed, 4.8-star rated contractor. Residential and commercial repair, installation and maintenance.',

  cityNames: ['Los Angeles', 'Long Beach', 'Pasadena', 'Glendale', 'Burbank', 'Culver City', 'Santa Monica', 'Inglewood'],

  hero: {
    lede:
      'Air Pro Solutions provides HVAC services in Los Angeles County - from coastal Santa Monica and Long Beach to Burbank, Glendale, and Pasadena - with equipment, permits, and rebates matched to each city.', // also the Service schema description
    photoCaptionTitle: 'Los Angeles County, CA',
    photoCaptionBody: 'Coast, valley, and foothill service across eight cities',
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
    { num: 'Coast to foothills', label: 'one region, several climates' },
  ],

  answer: {
    lead: 'Air Pro Solutions is a licensed HVAC contractor serving Los Angeles County',
    body:
      ', including Los Angeles, Long Beach, Pasadena, Glendale, Burbank, Culver City, Santa Monica, and Inglewood, for homes, multifamily buildings, and commercial properties. Sizing, permits, and rebates change by city and sometimes by address, so every recommendation starts with the property, not a county-wide assumption.',
  },

  // Source: California Energy Commission, Los Angeles Region report, 2018 (Mediterranean climate;
  // coastal buffering; LAX fewer than 15 days/yr at or above 90F; marine low clouds >80% of coastal
  // clouds June-September; Santa Ana winds October-April, most frequent December, strongest January).
  // City placement below is general (no city-level heat-day counts, humidity, record highs, or
  // climate-zone numbers were found, so none appear).
  climate: {
    eyebrow: 'Local knowledge',
    title: 'One county, several climates: what that means for your system',
    paragraphs: [
      'The California Energy Commission describes the Los Angeles region as a Mediterranean climate with hot, dry summers and cool, wet winters. Within the county, **the ocean buffers the coast while inland areas run hotter**, so a system that suits Santa Monica is not automatically the right one for Burbank or Pasadena.',
      'LAX, a coastal reference station rather than a city reading, historically records fewer than 15 days a year at or above 90°F, and low marine clouds make up more than 80 percent of coastal clouds from June through September. Inland valleys and foothill areas see the largest extreme-heat changes in the region. Winters are cool and wet, so there is a real heating season, and Santa Ana winds bring very dry offshore air from October through April.',
      'That is why **we size equipment from a load calculation for your specific property** rather than a county-wide temperature assumption. Hotter outdoor conditions mean a system runs more often or longer to hold the same indoor setpoint, which is why the address matters.',
    ],
    cardTitle: 'Where each city sits',
    groups: [['Santa Monica', 'Long Beach'], ['Culver City', 'Inglewood'], ['Burbank'], ['Glendale', 'Pasadena'], ['Los Angeles']],
    source: '**Source:** California Energy Commission, Los Angeles Region report (2018). City placement is general, not a climate-zone boundary.',
  },

  // Source: SCAG local profiles using California Department of Finance E-5 data, 2018 (structure
  // type only, not condo ownership, HOA status, or renter status). Regional older-housing claim:
  // SCAG, six-county region, more than half of units built before 1980 (April 2024 report).
  housing: {
    eyebrow: 'Property types',
    title: 'Housing mix by city: from detached homes to apartment buildings',
    columns: ['City', 'Single-family', 'Multifamily', 'Largest single category'],
    rows: [
      ['Los Angeles', '43.5%', '55.8%', '5-or-more-unit multifamily, 47.0%'],
      ['Long Beach', '47.7%', '51.0%', 'Single-family detached, 42.0%'],
      ['Pasadena', '49.3%', '50.5%', 'Single-family detached, 42.5%'],
      ['Glendale', '39.0%', '60.9%', '5-or-more-unit multifamily, 52.3%'],
      ['Burbank', '48.7%', '51.0%', 'Single-family detached, 44.4%'],
      ['Culver City', '48.4%', '50.4%', 'Single-family detached, 39.4%'],
      ['Santa Monica', '22.1%', '77.5%', '5-or-more-unit multifamily, 67.4%'],
      ['Inglewood', '44.2%', '55.3%', '5-or-more-unit multifamily, 41.0%'],
    ],
    note: 'Share of housing units by structure type, from SCAG local profiles using California Department of Finance E-5 data for 2018. Figures measure structure type only, not condo ownership, HOA status, or renter status.',
    copyCols: [
      [
        '**Structure type shapes the job.** Detached homes, townhomes, and apartments differ in access, equipment location, shared roofs and common areas, and permitting. Culver City is nearly evenly split between single-family and multifamily units, while Santa Monica is the most multifamily city here.',
        'In the City of Los Angeles, HVAC equipment may not raise noise at an adjoining unit in a condominium, apartment house, duplex, or attached business by more than 5 decibels over ambient (LAMC 112.02), so placement and commissioning matter in attached buildings.',
      ],
      [
        '**Older housing is common across Southern California.** More than half of housing units in the six-county SCAG region were built before 1980. Age alone does not tell us whether a home has attic access, a slab or raised foundation, or original ductwork, so we confirm those at a site visit before recommending repair or replacement.',
      ],
    ],
  },

  services: {
    eyebrow: 'Services in Los Angeles County',
    title: "HVAC work across the county's homes and buildings",
    cards: [
      { slug: 'ac-repair', body: 'Diagnosis for cooling failures across coastal, valley, and foothill homes, where outdoor conditions and system workload differ by area.' },
      { slug: 'heating-repair', body: 'Cool, wet winters mean a real heating season, and Santa Ana wind periods run from October through April.' },
      { slug: 'heat-pump-services', body: 'Heat pump work that starts with your electric utility: LADWP, Pasadena Water and Power, and Burbank Water and Power each publish their own rebates.' },
      { slug: 'residential-hvac', name: 'Residential HVAC', body: 'Detached homes, townhomes, and apartments each bring different access and equipment-placement questions.', icon: 'home' },
      { slug: 'commercial-hvac', name: 'Commercial HVAC', body: 'Offices, retail, restaurants, and rooftop equipment across the county’s commercial districts.', icon: 'building' },
      { slug: 'services', name: 'All HVAC Services', body: 'See the full list of repair, installation, and maintenance services.', icon: 'check' },
    ] satisfies ServiceCardSpec[],
  },

  // Source: City of Los Angeles planning documents (employment centers - Downtown, Century City,
  // Warner Center, LAX area; described generally). City of Long Beach: Port of Long Beach supports
  // 51,000 local jobs. No commercial-sector claims for the other six cities.
  split: {
    eyebrow: 'Residential and commercial',
    title: 'Homes, multifamily buildings, and commercial properties',
    residential: {
      tag: 'Residential',
      title: 'Homes and multifamily',
      body: 'Sized to the property, with access, equipment placement, and building-management approvals checked first.',
      chips: ['Detached homes', 'Townhomes and attached homes', 'Apartments and condos'],
      ctaLabel: 'Residential HVAC',
      href: '/residential-hvac/',
    },
    commercial: {
      tag: 'Commercial',
      title: 'Commercial properties',
      body: 'The City of Los Angeles identifies Downtown, Century City, Warner Center, and the LAX area as primary employment centers, and the City of Long Beach reports that the Port of Long Beach supports 51,000 local jobs.',
      chips: ['Offices', 'Retail and restaurants', 'Rooftop units', 'Port and logistics'],
      ctaLabel: 'Commercial HVAC',
      href: '/commercial-hvac/',
    },
  },

  // Sources: LADBS express permits; LAMC 112.02 noise; Ordinance 188716 repeal of the all-electric
  // standard effective October 13, 2025; Long Beach Development Services (separate permit per
  // building; CF1R Title 24 submission); Pasadena PMC 17.40.150; Glendale online permit portal;
  // Burbank energy-report scopes; Culver City separate applications per permit type; Santa Monica
  // Permit Services Center plan review page and paused Zero Emission Building Code enforcement;
  // Inglewood HVAC application and online permitting. Title 24 per the CEC Energy Code Support
  // Center. No duct-leakage percentages, R-values, CFM-per-ton figures, or climate-zone rules quoted.
  permits: {
    eyebrow: 'Permits and code',
    title: 'Each city runs its own HVAC permit process',
    intro: 'Most HVAC replacements, new installations, relocations, duct changes, and gas or electrical changes require permits and inspections. We verify the applicable local permit path before work begins.',
    columns: ['City', 'Permit office', 'What is different locally'],
    rows: [
      ['Los Angeles', 'Los Angeles Department of Building and Safety (LADBS)', 'Same-size and same-type AC replacement is listed as an express permit category. It is a faster path, not a permit exemption. The City’s prior all-electric building ordinance was repealed effective October 13, 2025.'],
      ['Long Beach', 'Development Services, Building and Safety Bureau', 'A separate permit is required for equipment in each separate building. HVAC permit submissions include a CF1R Title 24 compliance document.'],
      ['Pasadena', 'Planning and Community Development, Permit Center', 'New exterior mechanical equipment, including AC and heating equipment, ducts, and plumbing lines, must be screened or located out of view from public rights-of-way (PMC 17.40.150).'],
      ['Glendale', 'Community Development, Building and Safety', 'HVAC change-outs are listed as a simple residential permit on the City’s online permit portal.'],
      ['Burbank', 'Community Development, Building and Safety Division', 'Rooftop or rear-of-property unit replacement, and replacement with new ducts or a new HVAC system, are scopes the City lists as needing an energy report.'],
      ['Culver City', 'Building Safety Division', 'Each structure and each permit type (building, mechanical, electrical, plumbing) needs its own application, so a heat pump change-out can involve more than the mechanical permit.'],
      ['Santa Monica', 'Permit Services Center', 'Some minor mechanical installations may qualify for a quicker review track at the City, but a permit is still required. The City’s Zero Emission Building Code is adopted, and its enforcement is currently paused.'],
      ['Inglewood', 'Building Safety Division', 'Provides a dedicated HVAC application and an online permitting system for documents, fees, inspections, and permit tracking.'],
    ],
    copyCols: [
      ['**Title 24 applies statewide.** California’s energy code is administered through each city’s building department. Many HVAC alterations need compliance documentation and third-party field verification and diagnostic testing, and duct leakage testing can apply when components are installed in ducted systems. The required tests are identified on the compliance forms for each job.'],
      ['**Unincorporated addresses follow County rules.** If your property is in unincorporated Los Angeles County rather than one of these cities, County permit and noise rules apply instead, so we confirm jurisdiction before quoting.'],
    ],
  },

  // Rebate sources: LADWP Consumer Rebate Program; Pasadena Water and Power heat pump rebate;
  // Burbank Water and Power electrification rebate (dated January 9, 2026); SoCalGas 2026 Home
  // Energy Efficiency Rebate Program ($75 smart thermostat, applications postmarked by December 31,
  // 2026, first come first served); CPUC Energy Savings Assistance Program. Do not state or imply
  // rebate stacking. HEEHRA single-family rebates were fully reserved statewide as of February 24,
  // 2026, so they are not advertised. Comfortably CA and Golden State Rebates are not advertised.
  rebates: {
    eyebrow: 'Utilities and rebates',
    title: 'Your electric utility decides which rebates to look at',
    intro: 'Air Pro Solutions works across several electric utilities, and each publishes its own programs.',
    cards: [
      {
        // TODO(data): verify current amount before launch.
        amount: 'Up to $2,500 per ton',
        description: 'LADWP heat pump HVAC rebate for equipment purchased and installed on or after November 1, 2025. Equipment must be installed before applying, and funds are limited.',
        linkLabel: 'LADWP program page',
        linkHref: 'https://www.ladwp.com/residential-services/assistance-programs/consumer-rebate-program',
      },
      {
        // TODO(data): verify current amount before launch.
        amount: '$170 per ton',
        description: 'Pasadena Water and Power heat pump rebate for ducted and ductless systems that meet 15.3 SEER2 and 7.8 HSPF2. Apply within 180 days of purchase. A central AC tune-up rebate is listed separately.',
        linkLabel: 'Pasadena program page',
        linkHref: 'https://pwp.cityofpasadena.net/heatpumprebate/',
      },
      {
        amount: '$1,000 per ton',
        description: 'Burbank Water and Power electrification rebate, up to $2,500, for replacing gas equipment with a heat pump. New construction does not qualify. Cool Rewards thermostat credits are listed separately.',
        linkLabel: 'Burbank program page',
        linkHref: 'https://www.burbankwaterandpower.com/electrify-your-home',
      },
    ] satisfies RebateCard[],
    copy: [
      '**Region-wide programs.** SoCalGas lists a $75 smart thermostat rebate for qualifying purchases and installations through December 31, 2026, while funds last. The CPUC Energy Savings Assistance Program offers no-cost weatherization to income-qualified SCE and SoCalGas households.',
      '**Long Beach and Inglewood** are served by SCE, and SCE publishes its current rebate offerings on its rebate center. **Culver City** is split between LADWP and SCE by address. **Glendale and Santa Monica:** confirm current electric-utility incentives by address before relying on any rebate.',
      'Rebates and eligibility vary by service address, utility account, equipment efficiency, income qualifications, and available funding. We can help identify potential programs, but confirm final eligibility, amount, and application requirements with your utility before installation.',
    ],
    utilityCardTitle: 'Electric utility by city',
    utilities: [
      'Los Angeles: LADWP',
      'Pasadena: Pasadena Water and Power',
      'Burbank: Burbank Water and Power',
      'Glendale: Glendale Water & Power',
      'Long Beach: SCE',
      'Inglewood: SCE',
      'Culver City: LADWP or SCE',
      'Santa Monica: confirm by address',
    ],
    gasNote: '**Natural gas:** SoCalGas serves the region, subject to address confirmation.',
  },

  cities: {
    eyebrow: 'Cities served',
    title: 'The eight cities on this page',
    intro: 'Individual city pages are coming. For the South Bay, see our Torrance page, or browse all service areas.',
    items: [
      { name: 'Los Angeles', note: 'Spans coast, basin, valley, and foothill conditions. Electric service from LADWP.' },
      { name: 'Long Beach', note: 'Coastal, with the Port of Long Beach anchoring commercial demand. Electric service from SCE.' },
      { name: 'Pasadena', note: 'Inland foothill setting. New exterior equipment must be screened from public view.' },
      { name: 'Glendale', note: 'Inland basin and foothill setting, with 60.9% multifamily housing (2018).' },
      { name: 'Burbank', note: 'Valley-edge climate. Rooftop and rear-of-property replacements need an energy report.' },
      { name: 'Culver City', note: 'Near-coastal, with a near-even single-family and multifamily mix. Utility varies by address.' },
      { name: 'Santa Monica', note: 'Coastal, and the most multifamily city here at 77.5% of housing units (2018).' },
      { name: 'Inglewood', note: 'Near-coastal, with 55.3% multifamily housing (2018). Electric service from SCE.' },
    ],
  },

  proof: {
    eyebrow: 'Why Air Pro',
    heading: 'Recommendations that start with your address',
    body: 'Climate, building type, electric utility, and city permit rules all change across Los Angeles County. We check them for your property before recommending equipment, so the plan fits where you actually live or work.',
    stats: [
      { num: '4.8★', label: 'Google rating' },
      { num: '40', label: 'Google reviews' },
      { num: '8', label: 'Cities on this page' },
      { num: 'Licensed', label: `CA LIC #${siteConfig.licenses.join(', #')}` },
    ],
  },

  faqs: [
    {
      q: 'Which cities does Air Pro Solutions serve in Los Angeles County?',
      a: 'This page covers Los Angeles, Long Beach, Pasadena, Glendale, Burbank, Culver City, Santa Monica, and Inglewood. South Bay cities such as Torrance are covered separately. If your address is in unincorporated county territory, call us first, because permit and code rules differ there.',
      links: [{ text: 'Torrance', href: '/service-areas/torrance-ca/' }],
    },
    {
      q: 'Does HVAC sizing change between the coast and inland Los Angeles County?',
      a: 'Yes, the conditions do. The coast is buffered by the ocean and summer marine low clouds, while inland areas such as Burbank, Glendale, and Pasadena are more exposed to heat. Equipment should be sized from a load calculation for your property, not from a county-wide temperature assumption.',
    },
    {
      q: 'Do I need a permit to replace my AC in Los Angeles County?',
      a: 'In all eight cities on this page, replacing HVAC equipment generally requires a mechanical permit. Requirements vary by address, equipment type, ductwork scope, and any electrical or gas work. The City of Los Angeles lists same-size and same-type AC replacement as an express permit category, which is a faster path and not a permit exemption. We verify the applicable local permit path before work begins.',
    },
    {
      q: 'What is Title 24 and how does it affect an HVAC replacement?',
      a: 'Title 24 is California’s building energy code. Many HVAC replacements need compliance documentation and third-party field verification and diagnostic testing, and duct leakage testing can apply when components are installed in ducted systems. The exact tests depend on the project and are listed on the compliance forms for the job.',
    },
    {
      q: 'Which utility serves my home, and are there HVAC rebates?',
      a: 'It depends on the city and sometimes the address. Los Angeles is served by LADWP, Pasadena by Pasadena Water and Power, Burbank by Burbank Water and Power, Glendale by Glendale Water & Power, and Long Beach and Inglewood by SCE. Culver City is split between LADWP and SCE, and Santa Monica should be confirmed by address. SoCalGas is the natural-gas utility across the region. Rebate amounts and funding change, so confirm current eligibility with your utility before installation.',
    },
    {
      q: 'Do you work on apartments, condos, and HOA properties?',
      a: 'Multifamily housing is a large share of the region. Per 2018 SCAG data, multifamily is 77.5 percent of housing units in Santa Monica and 60.9 percent in Glendale. For apartments, condos, and HOA properties, we verify access, equipment placement, property-management requirements, permits, and local noise rules before installation or replacement.',
    },
    {
      q: 'Are there placement or screening rules for outdoor equipment?',
      a: 'Sometimes. Pasadena requires new exterior mechanical equipment, including AC and heating equipment, ducts, and plumbing lines, to be screened or located out of view from public rights-of-way. Other cities on this page have their own zoning and placement rules, so we check the property before recommending where equipment goes.',
    },
    {
      q: 'Do older homes in Los Angeles County need different HVAC work?',
      a: 'Older housing is common across Southern California. More than half of housing units in the six-county SCAG region were built before 1980. A home’s age does not tell us whether it has attic access, what kind of foundation it has, or whether the ducts are original, so we confirm those at a site visit before recommending repair or replacement.',
    },
    {
      q: 'Does Air Pro Solutions handle commercial HVAC in Los Angeles County?',
      a: 'Yes, for offices, retail, restaurants, and other commercial properties. LADWP’s BOSS program offers incentives to eligible non-residential customers, and it requires LADWP pre-approval before installation. Call us before you buy equipment so we can check what applies to your building.',
      links: [{ text: 'Call us', href: siteConfig.phoneHref }],
    },
    {
      q: 'How quickly can a technician reach me?',
      a: 'Travel time across the county depends on traffic and freeway conditions. Dispatch timing is confirmed when service is scheduled, based on your location and technician availability.',
    },
  ] satisfies Faq[],
};

// Service cards resolved against the real services.ts data (commercial-hvac and the /services/ hub
// aren't services.ts entries, same special-casing as the city-page pattern).
export function laCountyServiceCards(): Card[] {
  return laCountyHub.services.cards.map((sc) => {
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
    if (!svc) throw new Error(`Unknown service slug on ${laCountyHub.path}: ${sc.slug}`);
    return { href: `/${svc.slug}/`, name: svc.name, description: sc.body, icon: svc.icon, image: svc.image };
  });
}
