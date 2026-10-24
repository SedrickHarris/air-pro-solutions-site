import { siteConfig } from '@/content/site-config';
import { getService, serviceHref, commercialCardImage, residentialCardImage, servicesHubCardImage } from '@/content/services';
import type { Faq } from '@/content/faq';
import type { Card } from '@/components/sections/ServicesGrid';
import type { RebateCard } from '@/components/sections/RebateCards';

// TODO(copy): client review of every string before launch, same as the other three region hubs.
// Every figure below is cited in the comment above it. None are invented; anything not sourced is
// flagged TODO(verify)/"pending" inline, and tracked in docs/open-items.md.
//
// TODO(verify): rebate programs and funding (Riverside Public Utilities, SCE thermostat credit,
// TECH Clean California) and whether to add dollar amounts.
// TODO(verify): electric utility per city for Chino, Fontana, Upland, and Eastvale (none is
// confirmed from a City source). Rancho Cucamonga is confirmed on the City's utilities and RCMU pages.
// TODO(verify): like-for-like permit rules for Corona and Ontario (the Eastvale Building Safety FAQ and the Upland Building & Safety page read on 2026-10-19 do not name air conditioner replacement), and current Title 24 code
// dates. Rancho Cucamonga: the City page says all permits are online-only; no whole-unit rule found.
// TODO(client): the research does not support saying "we handle permits", so this page does not.
// TODO(client): real photos, city-tagged reviews, business hours, and the confirmed Inland Empire
// city list for regions.ts (this page currently reuses the 8-city list already in regions.ts).
// TODO(later): when city pages exist, turn "City page coming soon" into links and add each city
// to the region data / sitemap.

type ServiceCardSpec = { slug: string; body: string; name?: string; icon?: string };
type CityCardSpec = { name: string; note: string; areas: string; utility: string; pending?: string; href?: string };

export const inlandEmpireHub = {
  path: '/service-areas/inland-empire/',
  primaryKeyword: 'hvac services inland empire',
  // Title/H1 are built from src/lib/seo.ts (regionTitle/regionH1) per CLAUDE.md, not hand-written here.
  description:
    'Licensed, 4.8-star rated HVAC services in the Inland Empire for homes and businesses in Riverside, Corona, Ontario, and five more cities. Schedule service.',

  cityNames: ['Riverside', 'Corona', 'Ontario', 'Rancho Cucamonga', 'Chino', 'Fontana', 'Upland', 'Eastvale'],

  hero: {
    lede:
      'AIRPRO SOLUTIONS provides HVAC services in the Inland Empire - from Corona and Eastvale to Riverside, Ontario, Rancho Cucamonga, Upland, Fontana, and Chino - with permits, utilities, and equipment matched to each city.',
    photoCaptionTitle: 'Inland Empire, CA',
    photoCaptionBody: '8 cities served',
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
    lead: 'AIRPRO SOLUTIONS is a licensed HVAC contractor serving the Inland Empire',
    body:
      ', including Riverside, Corona, Ontario, Rancho Cucamonga, Chino, Fontana, Upland, and Eastvale, for homes, multifamily buildings, and commercial properties. Heat, housing age, utility territory, and permit rules change by city and sometimes by address, so every recommendation starts with the property, not a region-wide assumption.',
  },

  // Sources: NWS Riverside Municipal Airport 1991-2020 normals (90.6F July normal high, 18 days/yr
  // at or above 90F); Riverside September 6, 2024 heat event (115F, NWS; the Ontario 114F figure was removed, no source found); Riverside's
  // July record high (118F). Norton AFB station
  // record, 1980-1990 (96 days/yr at or above 90F, 21 at or above 100F, 66 days below 40F, ~1,602
  // CDD vs ~1,846 HDD) - an older, single-station record, treated as pattern context only. No
  // city-level data found for Corona, Rancho Cucamonga, Chino, Fontana, Upland, or Eastvale.
  climate: {
    eyebrow: 'Local knowledge',
    title: 'Long, hot summers and cool nights: what that means for your system',
    facts: [
      '90.6°F July normal high at Riverside Municipal Airport, 1991-2020',
      '18 days in a typical July at or above 90°F at that station',
      '115°F reached in Riverside on September 6, 2024',
      "118°F Riverside's July record high",
    ],
    paragraphs: [
      'Inland Empire summers are a cooling-load story. the September 2024 heat wave pushed Riverside to 115°F. **Equipment here runs hard and long**, which is why a system that was fine on paper can struggle in a heat wave.',
      'Heating still matters. A 1980 to 1990 record at a San Bernardino-area station, Norton AFB, shows 96 days a year at or above 90°F and 21 at or above 100°F, and also 66 days below 40°F, with about 1,602 cooling degree days against 1,846 heating degree days. It is an older, single-station record, so treat it as a sense of the pattern, not a current forecast.',
      'We did not find city-level climate data for Corona, Rancho Cucamonga, Chino, Fontana, Upland, or Eastvale, so we use nearby stations for context only. **We size equipment from a load calculation for your specific building**, not from a regional temperature assumption.',
    ],
    cardTitle: 'Where each city sits',
    groups: [
      { label: 'Riverside County', cities: ['Riverside', 'Corona', 'Eastvale'] },
      { label: 'San Bernardino County', cities: ['Ontario', 'Rancho Cucamonga', 'Chino', 'Fontana', 'Upland'] },
    ],
    gettingAround:
      '**Getting around:** we serve the Inland Empire along the 91, 60, 10, 15, 210, and 215 corridors. Arrival times vary with freeway traffic and appointment availability.',
    source: 'Climate figures are from nearby weather stations, not city averages. Riverside Municipal Airport figures are 1991-2020 normals and the Norton AFB record covers 1980 to 1990. County grouping shows where each city sits and is not a climate-zone or permit boundary.',
  },

  // Source: 2018 housing-age estimates. Ontario: SCAG's local profile states 36.1% built before 1970 (ACS, year not stated).
  // Cities are listed highest share to lowest; "age group" is a general grouping, not a ranking.
  housing: {
    eyebrow: 'Property types',
    title: 'Older neighborhoods in Riverside and Ontario, newer housing in Rancho Cucamonga',
    columns: ['City', 'Built before 1970', 'Age group', 'Housing mix'],
    numericCols: [1],
    rows: [
      ['Riverside', '39.5%', 'Older, established', 'Mix of detached homes and multifamily'],
      ['Ontario', '36.1%', 'Older, established', 'Mix of detached homes and multifamily'],
      ['Corona', '15.6%', 'Middle', 'Mostly detached single-family homes (66.9%), with 20.9% of homes in buildings of 5 or more units'],
      ['Rancho Cucamonga', '9.6%', 'Newer', 'Mostly detached single-family homes (62.5%), with 24.0% of homes in buildings of 5 or more units'],
    ],
    note: 'Share of homes built before 1970, 2018 data. Cities are listed from the highest share to the lowest, and the age group is a general grouping, not a ranking of city size.',
    paragraphs: [
      '**Structure type shapes the job.** Corona, Riverside, Upland, Ontario, and Rancho Cucamonga have a heavier mix of multifamily buildings. Attached and multifamily properties can mean shared roofs, limited equipment locations, and association rules.',
      '**Age is only a starting point.** SCAG’s local profile for Upland says 1970 to 1979 is the decade with the highest share of its housing units. Age alone does not tell us about attic access, foundation type, or original ductwork, so those are confirmed at a site visit before recommending repair or replacement.',
    ],
    pending: 'Chino, Fontana, and Eastvale are not in the table because their housing figures are not verified yet (QuickFacts gives Eastvale’s owner-occupied rate and household size, shown on the Eastvale page), and Upland is not in the table because the SCAG profile read does not state a before-1970 share (it gives the 1970 to 1979 peak decade and a housing type split, shown on the Upland page). Attic, foundation, ductwork, and home-size data were not found for any city.',
  },

  services: {
    eyebrow: 'Services in the Inland Empire',
    title: "HVAC work across the region's homes and buildings",
    cards: [
      { slug: 'ac-repair', body: 'Diagnosis for cooling failures in a region where the July normal high at Riverside Municipal Airport is 90.6°F and September 2024 heat reached 115°F in Riverside.' },
      { slug: 'heating-repair', body: 'Nights get cold enough to matter, with 66 days a year below 40°F in one San Bernardino-area station record. Furnace work starts with the city permit and SoCalGas service.' },
      { slug: 'heat-pump-services', body: 'Heat pump work starts with your electric utility, Riverside Public Utilities or SCE, and with state incentive programs whose funding is limited.' },
      { slug: 'residential-hvac', name: 'Residential HVAC', body: "Detached homes, townhomes, condos, and apartments, from Riverside's older neighborhoods to newer housing in Rancho Cucamonga.", icon: 'home' },
      { slug: 'commercial-hvac', name: 'Commercial HVAC', body: 'Commercial and industrial developments around Victoria Gardens in Rancho Cucamonga, Downtown Riverside, and rooftop units that may need screening review.', icon: 'building' },
      { slug: 'services', name: 'All HVAC Services', body: 'See the full list of repair, installation, and maintenance services.', icon: 'check' },
    ] satisfies ServiceCardSpec[],
  },

  // Sources: no City rooftop screening-review source was read for Fontana, Riverside or Ontario, so those claims were removed; Riverside, Ontario,
  // Rancho Cucamonga Municipal Utility's commercial service page (Victoria Gardens Mall and surrounding
  // commercial and industrial developments), Riverside and Ontario district names; no commercial-property
  // evidence found for Corona, Upland, or Eastvale.
  split: {
    eyebrow: 'Residential and commercial',
    title: 'Established neighborhoods, newer housing, and warehouse-scale buildings',
    residential: {
      tag: 'Residential',
      title: 'Homes, condos, and apartments',
      body: 'From older Riverside neighborhoods to newer housing in Corona and Rancho Cucamonga, with access, placement, and association rules checked first.',
      chips: ['Single-family homes', 'Condos and townhomes', 'Apartments'],
      ctaLabel: 'Residential HVAC',
      href: '/residential-hvac/',
    },
    commercial: {
      tag: 'Commercial',
      title: 'Commercial properties',
      body: 'Commercial and industrial developments around Victoria Gardens in Rancho Cucamonga, Downtown Riverside, and commercial space in Ontario.',
      chips: ['Offices', 'Retail', 'Restaurants', 'Rooftop units'],
      ctaLabel: 'Commercial HVAC',
      href: '/commercial-hvac/',
    },
    paragraphs: [
      "**Districts differ.** Downtown Riverside, Ontario, and Rancho Cucamonga's Victoria Gardens area each bring different building types, rooftop access, and neighbor conditions.",
      '**Rooftop units may need review.** Rooftop equipment can be subject to placement or screening review, so we check placement and curb changes with the city before a unit is ordered.',
    ],
    pending: 'No commercial property evidence was found for Corona, Upland, or Eastvale, so this section makes no commercial claim for them.',
  },

  // Sources: each city's published permit/fee pages where available. Like-for-like requirement
  // not confirmed for any city (Riverside lists no like-for-like exemption for a whole unit); the Chino Building Division page, the Fontana Building & Safety, Permits and FAQ pages, the Upland Building & Safety page and the Eastvale Building Safety page and FAQ read on 2026-10-19 do not say whether replacing an air conditioner needs a permit (Corona via
  // eTRAKiT; Rancho Cucamonga online-only; Eastvale through the Eastvale Permit Portal named on its Building Safety page). Title 24 refrigerant charge
  // verification zones and duct sealing/testing per the CEC Energy Code Support Center.
  permits: {
    eyebrow: 'Permits and code',
    title: 'Each city issues its own HVAC permits',
    intro: "All eight are incorporated cities, so mechanical permits come from each city's building department, not from Riverside County or San Bernardino County. Replacing AC, furnace, heat pump, or air handler equipment should be treated as permit-required unless the city says otherwise.",
    columns: ['City', 'Permit path', 'What is different locally'],
    rows: [
      ['Riverside', 'Permit through the Public Permit Portal or the Permit Services counter', "The City's Bulletin 140 lists no like-for-like exemption for a whole unit, so we confirm the permit path with the City."],
      ['Corona', 'City eTRAKiT system or the Building Division counter', "The City's fee schedule lists change-out items, but we found no rule on whole-unit replacement, so we confirm the permit path with the City."],
      ['Ontario', 'City online permitting portal or the Building Department counter', "The City's fee schedule lists mechanical permit items, but we found no rule on whole-unit replacement, so we confirm the permit path with the City."],
      ['Rancho Cucamonga', "City Online Permit Center only, with no over-the-counter permits", "The City's guide lists HVAC replacement-only work among its no plan check permits, but it is an older undated document, so we confirm the permit path with the City."],
      ['Chino', 'Building Division', "The City's Building Division page says it issues building permits and takes in plans for review, and that the City has adopted the 2022 California Building Code with some amendments. It does not say whether replacing an air conditioner needs a permit, so we confirm the permit path with the City."],
      ['Fontana', 'Build Fontana Public Portal or the Building & Safety counter', "The City's Building & Safety page says it accepts permit and plan check applications at its counter and encourages applicants to use the Build Fontana Public Portal. The City pages we read do not say whether replacing an air conditioner needs a permit, so we confirm the permit path with the City."],
      ['Upland', 'Citizen Self Service (CSS) Portal, online', "The City's Building & Safety page says all Building and Safety permit applications must be submitted online through the Citizen Self Service (CSS) Portal. It does not say whether replacing an air conditioner needs a permit, so we confirm the permit path with the City."],
      ['Eastvale', 'Eastvale Permit Portal, online, or the front counter', "The City's Building Safety page says most permit types can be submitted online through the Eastvale Permit Portal. Its FAQ says permits are required to replace mechanical systems and that HVAC is generally reviewed and issued over the counter when there are no special design requirements, but it does not name air conditioner replacement, so we confirm the permit path with the City."],
    ],
    note: "Based on each city's published permit and fee pages where available. The City of Fontana's Building & Safety, Permits, and FAQ pages, the City of Chino's Building Division page, and the City of Upland's Building & Safety page do not say whether replacing an air conditioner needs a permit, and the City of Eastvale's Building Safety page and FAQ do not name air conditioner replacement. For Riverside, the City lists no like-for-like exemption for a whole unit, for Ontario the City lists mechanical permit fee items but we found no whole-unit replacement rule, and Rancho Cucamonga takes every permit through its Online Permit Center. For Corona it was not confirmed in the sources we reviewed, so we confirm with the city before work begins. Procedures change.",
    paragraphs: [
      '**Title 24 checks depend on the job.** Refrigerant charge verification applies to air conditioners in Climate Zones 2 and 8 through 15 and to heat pumps everywhere. Duct sealing and testing may apply, and a setback thermostat upgrade can be required when a refrigerant component is replaced.',
      '**Climate zone is set by address.** Which checks apply depends on the climate zone for your property, so we confirm it by address rather than by city. Not every job needs every test.',
    ],
  },

  // No decibel figures per source. Fontana's rooftop screening-review wording was removed (no City source read), as Ontario's and Riverside's were earlier.
  placement: {
    eyebrow: 'Placement and screening',
    title: 'Where the outdoor unit can go depends on the building',
    columns: ['Cities', 'Placement and screening'],
    rows: [
      ['Riverside, Corona, and Rancho Cucamonga', 'We confirm zoning, screening, HOA approval, and noise conditions for the specific property before recommending where equipment goes.'],
      ['Chino, Fontana, Upland, and Eastvale', 'We did not find a City page we could read that states placement, screening, or noise rules for outdoor HVAC equipment, so we confirm zoning, screening, HOA approval, and noise conditions for the specific property with the City before recommending where equipment goes.'],
    ],
    note: 'Code text changes, so current requirements are confirmed with the city before installation.',
  },

  // Sources: Riverside Public Utilities published rebate categories (heat pumps, AC by efficiency,
  // tune-ups); SCE thermostat credit program; TECH Clean California state incentive program. No
  // dollar amounts found/verified, so none are shown - see docs/open-items.md. Corona small city
  // electric areas (Dos Lagos, The Crossings, Corona Pointe, Princeland) per city utility info.
  // HEEHRA, Comfortably CA, and SoCalGas heat pump rebates were excluded from research - not listed.
  rebates: {
    eyebrow: 'Utilities and rebates',
    title: 'Your utility accounts decide which programs to look at',
    intro: 'Electric service depends on location. Riverside is served by Riverside Public Utilities, Corona is mostly SCE, and natural gas is supplied by SoCalGas outside Riverside, Chino, Fontana, and Upland. We confirm the gas provider by address in Riverside, Chino, Fontana, and Upland.',
    cards: [
      {
        verifyTag: 'Verify current program before launch',
        amount: 'Riverside Public Utilities',
        description: 'Published rebates for heat pumps, air conditioners by efficiency rating, and tune-ups, all subject to funding. Dollar amounts are not listed here and are confirmed with the utility.',
      },
      {
        verifyTag: 'Verify current program before launch',
        amount: 'SCE thermostat credit',
        description: 'A thermostat credit for eligible SCE customers. It is a program credit, not an equipment rebate, and we did not find a standard SCE rebate for AC or heat pump replacement.',
      },
      {
        verifyTag: 'Verify current program before launch',
        amount: 'TECH Clean California',
        description: 'A state incentive program for heat pump systems. Funding is limited and eligibility depends on the property, so confirm availability before installation.',
      },
    ] satisfies RebateCard[],
    copy: [
      '**Corona has small city electric areas.** Most of Corona is served by SCE, but small areas including Dos Lagos, The Crossings, Corona Pointe, and Princeland have city electric service. Confirm your utility by address before relying on a program.',
      '**Rancho Cucamonga has a city electric utility in limited areas.** The City lists Southern California Edison as the main electric provider, and Rancho Cucamonga Municipal Utility serves limited areas, including Victoria Gardens Mall and several named developments. Confirm your utility by address before relying on a program.',
      '**Program details change quickly.** Riverside Public Utilities rebates, the SCE thermostat credit, and TECH Clean California incentives are all subject to funding. We do not list dollar amounts here.',
      'Rebates and eligibility vary by service address, utility account, equipment efficiency, and available funding. Confirm final eligibility, amount, and application requirements with your utility before installation.',
    ],
    utilityCardTitle: 'Utilities in these cities',
    utilities: [
      'Riverside electric: Riverside Public Utilities',
      'Corona electric: mostly SCE',
      'Ontario electric: SCE',
      'Rancho Cucamonga electric: SCE, with Rancho Cucamonga Municipal Utility in limited areas',
      'Chino, Fontana, Upland, and Eastvale electric and gas: not confirmed from a City source, so check your bill',
      'Ontario and Rancho Cucamonga gas: SoCalGas',
      'Natural gas: SoCalGas outside Riverside, Chino, Fontana, Upland, and Eastvale, where we confirm the provider by address',
    ],
    note: '**Confirm by address:** the electric and gas providers for Chino, Fontana, Upland, and Eastvale are not confirmed from a City source, so verify your utility before relying on any program.',
  },

  cities: {
    eyebrow: 'Cities served',
    title: 'The eight cities on this page',
    items: [
      {
        name: 'Riverside',
        href: '/service-areas/riverside/',
        note: 'Among the older housing stock here: 39.5% of homes were built before 1970. Riverside Public Utilities is the electric utility and publishes its own AC, heat pump, and tune-up rebates, subject to funding.',
        areas: 'Downtown, Arlington, La Sierra, Canyon Crest, Orangecrest, Mission Grove',
        utility: 'Electric: Riverside Public Utilities. Gas provider confirmed by address.',
      },
      {
        name: 'Corona',
        href: '/service-areas/corona/',
        note: "15.6% of homes were built before 1970, and 66.9% are detached homes. Electric service is mostly SCE, with small city electric areas, and the City sets setback and noise rules for outdoor units.",
        areas: 'Dos Lagos, Eagle Glen, Sierra Del Oro, Downtown Corona',
        utility: 'Electric: mostly SCE. City electric areas include Dos Lagos, The Crossings, Corona Pointe, and Princeland.',
      },
      {
        name: 'Ontario',
        href: '/service-areas/ontario/',
        note: '36.1% of homes were built before 1970, and Ontario Ranch adds new construction. The City names Southern California Edison as the electric utility and Southern California Gas Company as the gas utility.',
        areas: 'Ontario Ranch, the airport area',
        utility: 'Electric: SCE. Gas: SoCalGas.',
      },
      {
        name: 'Rancho Cucamonga',
        href: '/service-areas/rancho-cucamonga/',
        note: 'Newer housing, with 9.6% of homes built before 1970 and 62.5% detached homes. The City takes every permit through its Online Permit Center, and its own municipal utility serves limited areas alongside SCE.',
        areas: 'Victoria Gardens, Foothill Boulevard, Cucamonga Town Center, HART District',
        utility: 'Electric: SCE, with Rancho Cucamonga Municipal Utility in limited areas. Gas: SoCalGas.',
      },
      {
        name: 'Chino',
        href: '/service-areas/chino/',
        note: "The City's Building Division page says it has adopted the 2022 California Building Code with some amendments and does not say whether replacing an air conditioner needs a permit. QuickFacts reports a 64.0% owner-occupied housing unit rate for 2020 to 2024. We confirm the current steps with the City.",
        areas: 'Pending verification (no City neighborhood list read)',
        utility: 'Utilities: confirm by address.',
        pending: 'ZIP list pending verification (no official source read).',
      },
      {
        name: 'Fontana',
        href: '/service-areas/fontana/',
        note: "The City's Codes and Local Amendments page lists the 2025 California Mechanical Code and the 2025 California Energy Code, and none of the City pages we read says whether replacing an air conditioner needs a permit. QuickFacts reports a 66.8% owner-occupied housing unit rate for 2020 to 2024. We confirm the current steps with the City.",
        areas: 'Pending verification (no City neighborhood list read)',
        utility: 'Utilities: confirm by address.',
        pending: 'ZIP list pending verification (no official source read).',
      },
      {
        name: 'Upland',
        href: '/service-areas/upland/',
        note: "SCAG's local profile says 1970 to 1979 is the decade with the highest share of the city's housing units, and the City's Building & Safety page says permit applications go through its online Citizen Self Service (CSS) Portal without saying whether replacing an air conditioner needs a permit. QuickFacts reports a 57.1% owner-occupied housing unit rate for 2020 to 2024. We confirm the current steps with the City.",
        areas: 'Pending verification (no City neighborhood list read)',
        utility: 'Utilities: confirm by address.',
        pending: 'ZIP list pending verification (no official source read).',
      },
      {
        name: 'Eastvale',
        href: '/service-areas/eastvale/',
        note: "The City's Building Safety page says most permit types can be submitted online through the Eastvale Permit Portal, and its FAQ says permits are required to replace mechanical systems but does not name air conditioner replacement. QuickFacts reports a 78.0% owner-occupied housing unit rate for 2020 to 2024.",
        areas: 'Pending verification (no City neighborhood list read)',
        utility: 'Utilities: confirm by address.',
        pending: "ZIP codes, per the City's ZIP code page: 91752 and 92880, each shared with other communities.",
      },
    ] satisfies CityCardSpec[],
    note: 'Area names are general references, not permit or jurisdiction boundaries. Housing figures are 2018 estimates.',
  },

  proof: {
    eyebrow: 'Why Air Pro',
    heading: 'Recommendations that start with your address',
    body: 'Heat, permit path, utility, and building age all change across the Inland Empire. We check them for your property before recommending equipment, so the plan fits where you actually live or work.',
    stats: [
      { num: '4.8★', label: 'Google rating' },
      { num: '40', label: 'Google reviews' },
      { num: '8', label: 'Cities on this page' },
      { num: 'Licensed', label: `CA LIC #${siteConfig.licenses.join(', #')}` },
    ],
    pending: 'City-tagged Inland Empire reviews and real photos will replace the placeholders once supplied. Business hours are also pending client confirmation.',
  },

  faqs: [
    {
      q: 'Which cities does AIRPRO SOLUTIONS serve in the Inland Empire?',
      a: 'This page covers Riverside, Corona, Ontario, Rancho Cucamonga, Chino, Fontana, Upland, and Eastvale. These are the Inland Empire cities we list here, and the region has more. If your address is in another city or an unincorporated area, call us first, because permit and code rules differ by jurisdiction.',
    },
    {
      q: 'Do I need a permit to replace my AC in the Inland Empire?',
      a: 'Plan on it in all eight cities. Mechanical permits are issued by each city, not by Riverside County or San Bernardino County. The City of Fontana’s Building & Safety, Permits, and FAQ pages, the City of Chino’s Building Division page, the City of Upland’s Building & Safety page, and the City of Eastvale’s Building Safety page and FAQ do not say whether replacing an air conditioner needs a permit (the Eastvale FAQ says permits are required to replace mechanical systems but does not name air conditioners). Riverside lists no like-for-like exemption for a whole unit, Ontario lists mechanical permit fee items but no whole-unit rule we found, and Rancho Cucamonga takes every permit through its Online Permit Center, so we confirm each path with the City. For Corona, we did not confirm a whole-unit rule in the sources we reviewed, so we confirm the path with the City before work begins.',
    },
    {
      q: 'What is Title 24 and how does it affect an HVAC replacement?',
      a: "Title 24 is California's building energy code. For air conditioners, refrigerant charge verification applies in Climate Zones 2 and 8 through 15, and for heat pumps everywhere. Duct sealing and testing may also apply, and a setback thermostat upgrade can be required when a refrigerant component is replaced. Confirm your climate zone by address, because not every job needs every test.",
    },
    {
      q: 'Which utility serves my home, and are there HVAC rebates?',
      a: 'It depends on your address. Riverside is served by Riverside Public Utilities. Corona is mostly Southern California Edison (SCE), with small city electric areas. In Rancho Cucamonga, SCE is the main electric provider and Rancho Cucamonga Municipal Utility serves limited areas. We have not confirmed Chino’s, Fontana’s, Upland’s, or Eastvale’s electric or gas provider from a City source. Outside Riverside, Chino, Fontana, Upland, and Eastvale, natural gas is supplied by Southern California Gas Company (SoCalGas), and in Riverside, Chino, Fontana, Upland, and Eastvale we confirm the gas provider by address. Programs, amounts, and funding change, so confirm your utility by address and confirm current eligibility before installation.',
    },
    {
      q: 'How hot does it get, and does that change equipment sizing?',
      a: 'Yes, the heat is a real design factor. The July normal high at Riverside Municipal Airport is 90.6°F, and on September 6, 2024 Riverside reached 115°F. Those are station readings, not city averages, so we size equipment from a load calculation for your specific building.',
    },
    {
      q: 'Does AIRPRO SOLUTIONS handle commercial HVAC in the Inland Empire?',
      a: 'Yes, for offices, retail, restaurants, and other commercial properties. The commercial mix includes commercial and industrial developments around Victoria Gardens in Rancho Cucamonga, Downtown Riverside, and commercial space in Ontario. Rooftop equipment can be subject to placement or screening review, and we confirm the rules with each City.',
    },
    {
      q: 'Do older homes in the Inland Empire need different HVAC work?',
      a: 'Often, yes. Homes built before 1970 are 39.5% of Riverside (2018 data), and SCAG’s local profile for Upland says 1970 to 1979 is the decade with the highest share of its housing units. Age alone does not tell us about attic access, foundation type, or original ductwork, so those are confirmed at a site visit before recommending repair or replacement.',
    },
    {
      q: 'How quickly can a technician reach me?',
      a: 'Arrival times vary with freeway traffic and appointment availability. Service runs along the 91, 60, 10, 15, 210, and 215 corridors. Dispatch timing is confirmed when service is scheduled, based on your location and technician availability.',
    },
  ] satisfies Faq[],
};

// Service cards resolved against the real services.ts data (commercial-hvac and the /services/ hub
// aren't services.ts entries), same special-casing as the other three region hubs.
export function inlandEmpireServiceCards(): Card[] {
  return inlandEmpireHub.services.cards.map((sc) => {
    if (sc.slug === 'commercial-hvac') {
      return { href: '/commercial-hvac/', name: sc.name!, description: sc.body, icon: sc.icon!, image: commercialCardImage };
    }
    if (sc.slug === 'services') {
      return { href: '/services/', name: sc.name!, description: sc.body, icon: sc.icon!, image: servicesHubCardImage };
    }
    if (sc.slug === 'residential-hvac') {
      return { href: '/residential-hvac/', name: sc.name!, description: sc.body, icon: sc.icon!, image: residentialCardImage };
    }
    const svc = getService(sc.slug);
    if (!svc) throw new Error(`Unknown service slug on ${inlandEmpireHub.path}: ${sc.slug}`);
    return { href: serviceHref(svc.slug), name: svc.name, description: sc.body, icon: svc.icon, image: svc.image };
  });
}
