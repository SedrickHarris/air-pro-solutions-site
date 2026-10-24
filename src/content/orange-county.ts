import { siteConfig } from '@/content/site-config';
import { getService, serviceHref, commercialCardImage, residentialCardImage, servicesHubCardImage } from '@/content/services';
import type { Faq } from '@/content/faq';
import type { Card } from '@/components/sections/ServicesGrid';
import type { RebateCard } from '@/components/sections/RebateCards';

// TODO(copy): client review of every string before launch, same as the LA County and South Bay
// hubs. Every figure below is cited in the comment above it. None are invented; anything not
// sourced is flagged TODO(data)/"pending" inline, and time-sensitive items are indexed in
// docs/open-items.md.

type ServiceCardSpec = { slug: string; body: string; name?: string; icon?: string };
type CityCardSpec = { name: string; note: string; areas: string; utility: string; zips: string; pending?: string; href?: string };

export const orangeCountyHub = {
  path: '/service-areas/orange-county/',
  primaryKeyword: 'hvac services orange county',
  // Title/H1 are built from src/lib/seo.ts (regionTitle/regionH1) per CLAUDE.md, not hand-written here.
  description:
    'Licensed, 4.8-star rated HVAC services in Orange County for homes and businesses in Irvine, Anaheim, Santa Ana, and five more cities. Schedule service.',

  cityNames: ['Irvine', 'Anaheim', 'Santa Ana', 'Costa Mesa', 'Huntington Beach', 'Newport Beach', 'Fullerton', 'Tustin'],

  hero: {
    lede:
      'AIRPRO SOLUTIONS provides HVAC services in Orange County - from Anaheim and Fullerton in the north to Irvine, Costa Mesa, and the coast at Newport Beach and Huntington Beach - with permits, utilities, and equipment matched to each city.',
    photoCaptionTitle: 'Orange County, CA',
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
    { num: 'Eight permit offices', label: 'one county, city-by-city rules' },
  ],

  answer: {
    lead: 'AIRPRO SOLUTIONS is a licensed HVAC contractor serving Orange County',
    body:
      ', including Irvine, Anaheim, Santa Ana, Costa Mesa, Huntington Beach, Newport Beach, Fullerton, and Tustin, for homes, multifamily buildings, and commercial properties. Permits, utilities, and equipment rules change by city and sometimes by address, so every recommendation starts with the property, not a county-wide assumption.',
  },

  // Source: National Weather Service Tustin MCAS historical station summary (single station, not
  // 1991-2020 normals). Anaheim 112F event reading and "ocean-moderated coast"
  // description also from NWS weather history. A Santa Ana 113F event reading was removed on 2026-10-19 (not re-verified). City grouping follows OCTA planning areas and is
  // general, not a climate-zone boundary. Freeway list is general routing, not a claimed response time.
  climate: {
    eyebrow: 'Local knowledge',
    title: 'Mild coast, hotter inland: what that means for your system',
    facts: [
      '83°F average August high at the Tustin MCAS weather station',
      '18 days a year at or above 90°F at that station, with 4 at or above 100°F',
      '44°F average January low, with about 2 days a year at or below freezing',
      '56-59% summer afternoon humidity, and 79-81% in the morning',
    ],
    paragraphs: [
      "Orange County is a coastal Southern California climate, but the ocean moderates the coast while inland cities run hotter. At the National Weather Service's Tustin MCAS station, July, August, and September average highs of 82, 83, and 83°F sit beside a station record of 112°F. NWS weather history also cites 112°F in Anaheim during heat events, and describes the coast as generally ocean-moderated. These are station and event readings, not city averages.",
      'Summer haze is common, on 19 to 23 days a month from June through September, and coastal fog and stratus are the predominant pattern. Winters are mild, with a January average high of 68°F, but there is still a heating season. Santa Ana winds are most frequent in winter.',
      '**That is why we size equipment from a load calculation for your specific property**, not from a county-wide temperature assumption. A home near the coast and a home in Anaheim can call for different equipment.',
    ],
    cardTitle: 'Where each city sits',
    groups: [
      { label: 'North Orange County', cities: ['Anaheim', 'Fullerton'] },
      // Flagged 2026-10-19: the Central Orange County grouping (including Tustin) follows OCTA planning areas, was not re-verified from a source read, and is kept as general (see docs/open-items.md, Tustin entry).
      { label: 'Central Orange County', cities: ['Santa Ana', 'Costa Mesa', 'Tustin'] },
      { label: 'Coastal', cities: ['Huntington Beach'] },
    ],
    gettingAround:
      '**Getting around:** the north is served by I-5, SR-57, and SR-91, the central cities by I-5, SR-55, SR-22, and I-405, and the coast by I-405, SR-55, SR-73, and PCH. Arrival times vary with freeway traffic and appointment availability.',
    source: 'Climate figures are from the National Weather Service Tustin MCAS historical summary, a single station, not 1991-2020 normals. City grouping follows OCTA planning areas and is general, not a climate-zone boundary. Newport Beach is not grouped because no source was found for its grouping.',
  },

  // Source: SCAG local profiles using California Department of Finance E-5 data, 2018 (structure
  // type only). Newport Beach's row (and its 40.1% pre-1970 figure) was removed on 2026-10-19 and Santa Ana's row and its 55% pre-1970 figure were removed on 2026-10-19: no source record was found and
  // the figures could not be re-verified (see the Santa Ana section of docs/open-items.md). Building-age figures: ACS 2019 countywide (60.4% pre-1980, 26.6% 1980-1999, 13.0%
  // 2000+); SCAG ACS 2017 for Costa Mesa (49.6% pre-1970),
  // Irvine's own 4.8% pre-1970 (SCAG, ACS 2017) is on its city page. Anaheim's own
  // 44.6% pre-1970 (SCAG, ACS 2017) is on its city page. Huntington Beach's own 43.5% pre-1970 (SCAG, ACS 2017) is on its city page. No age figures were found for Fullerton or Tustin - none are claimed. Fullerton's structure-type row (49,430 units, SCAG) was removed 2026-10-19: the SCAG source was not read and its 49.6% detached share equals Costa Mesa's pre-1970 share. See docs/open-items.md. Tustin's row (28,118 units, SCAG E-5 2018) was removed 2026-10-19: the SCAG source was not read, and its 35.1% detached share matches the 2013 City Housing Element memo share while its other shares differ.
  housing: {
    eyebrow: 'Property types',
    title: 'Housing mix by city: detached homes lead, but multifamily is close to half in Costa Mesa',
    columns: ['City', 'Housing units', 'Detached', 'Attached', '2 to 4 units', '5 or more units', 'All multifamily'],
    rows: [
      ['Anaheim', '108,222', '41.7%', '8.6%', '10.5%', '34.9%', '45.4%'],
      ['Irvine', '102,474', '38.9%', '16.4%', '6.2%', '37.4%', '43.6%'],
      ['Huntington Beach', '81,656', '47.9%', '11.6%', '11.8%', '24.9%', '36.7%'],
      ['Costa Mesa', '42,836', '39.6%', '10.2%', '13.3%', '34.7%', '48.0%'],
    ],
    note: 'Share of housing units by structure type, from SCAG local profiles using California Department of Finance E-5 data for 2018. Figures measure structure type only, not condo ownership, HOA status, or renter status. The remainder is other unit types. Costa Mesa has the highest multifamily share, at 48.0%.',
    paragraphs: [
      'Structure type shapes the job. Detached homes are the largest single category in every city in the table, but in Irvine buildings with 5 or more units are within two points of them. Attached homes are 16.4% of Irvine units, which can mean shared walls, shared roofs, and association rules.',
      'Anaheim has the largest housing stock at 108,222 units, followed by Irvine at 102,474, and in both cities more than a third of units are in buildings of 5 or more.',
      'Building age varies widely. Countywide, 60.4% of housing units were built before 1980, 26.6% between 1980 and 1999, and 13.0% in 2000 or later (ACS 2019). Homes built before 1970 are 49.6% of Costa Mesa (SCAG, 2017 American Community Survey) and 43.5% of Huntington Beach (SCAG, 2017 American Community Survey).',
      'Age alone does not tell us about attic access, foundation type, or original ductwork, so those are confirmed at a site visit before recommending repair or replacement.',
    ],
    pending: 'Housing age figures were not found for Fullerton and Tustin, so no age claim is made for them. The pre-1970 shares for Anaheim, Irvine, and Huntington Beach are on their city pages. Santa Ana, Newport Beach, Fullerton, and Tustin are not in the table because their housing figures are not verified yet.',
  },

  services: {
    eyebrow: 'Services in Orange County',
    title: "HVAC work across the county's homes and buildings",
    cards: [
      { slug: 'ac-repair', body: "Diagnosis for cooling failures, with equipment sized from a load calculation for your specific property, and where Irvine's screening and noise rules affect condenser placement." },
      { slug: 'heating-repair', body: 'Mild winters still bring a real heating season, with a January average low of 44°F. Furnace work in each city starts with its permit path and SoCalGas service.' },
      { slug: 'heat-pump-services', body: 'Heat pump work starts with your electric utility, Anaheim Public Utilities or SCE, and with state incentive programs whose funding has been fully reserved.' },
      { slug: 'residential-hvac', name: 'Residential HVAC', body: "Detached homes, townhomes, condos, and apartments, from Costa Mesa, where SCAG counts 49.6% of homes built before 1970, to Irvine, where SCAG counts only 4.8%.", icon: 'home' },
      { slug: 'commercial-hvac', name: 'Commercial HVAC', body: 'Hotels and convention space at the Anaheim Resort and rooftop units with city-specific screening rules.', icon: 'building' },
      { slug: 'services', name: 'All HVAC Services', body: 'See the full list of repair, installation, and maintenance services.', icon: 'check' },
    ] satisfies ServiceCardSpec[],
  },

  // Source: Anaheim Resort Specific Plan (581 acres); Irvine like-for-like rooftop heat pump
  // change-out limits (20 tons or less, under 2,000 lb, roof slope 2% or less, no curb change);
  // Anaheim Resort / Convention Center, Santa Ana Downtown /
  // Civic Center district names.
  split: {
    eyebrow: 'Residential and commercial',
    title: 'Planned communities, older neighborhoods, and resort-scale buildings',
    residential: {
      tag: 'Residential',
      title: 'Homes, condos, and apartments',
      body: "From Costa Mesa, where SCAG counts 49.6% of homes built before 1970, to Irvine's mostly post-1970 housing and HOA neighborhoods, with access, placement, and association rules checked first.",
      chips: ['Single-family homes', 'Condos and townhomes', 'Apartments'],
      ctaLabel: 'Residential HVAC',
      href: '/residential-hvac/',
    },
    commercial: {
      tag: 'Commercial',
      title: 'Commercial properties',
      body: "The Anaheim Resort Specific Plan covers 581 acres of hotels, convention space, restaurants, and retail, and Irvine's permit rules include a like-for-like rooftop heat pump path for smaller units.",
      chips: ['Hotels and restaurants', 'Offices', 'Retail', 'Rooftop units'],
      ctaLabel: 'Commercial HVAC',
      href: '/commercial-hvac/',
    },
    paragraphs: [
      "**Irvine's rooftop path has limits.** The city describes a like-for-like commercial rooftop heat pump change-out for units of 20 tons or less, no more than 2,000 pounds each, on a roof with a slope of 2% or less and no curb change. Anything outside those limits is a different review.",
      "**Districts differ.** The Anaheim Resort and Convention Center area and Santa Ana's Downtown and Civic Center are different kinds of districts, so we confirm building type, rooftop access, and nearby noise conditions at each property.",
    ],
  },

  // Sources: Irvine online residential replacement permit; Anaheim Form B713 (no exemption stated); Santa Ana City notice of June 12, 2026 (online permit portal); Costa Mesa
  // Insta-Permit page and Mechanical - Residential application; Newport Beach Residential Express Permits (City online permitting page);
  // Huntington Beach Permit Center, HB ACA portal and forms page (Mechanical Permit Application, Mechanical Plan Requirements, Mechanical Plan Check Waiver Request); Fullerton Building and Safety page, FAQ and current building codes page (read through fetch summaries 2026-10-19); Tustin Permits Process page, Building Division page, Governing Codes page and a June 1999 City handout (read through fetch summaries 2026-10-19).
  // Title 24: CEC 2025 Energy Code effective for permits submitted on or
  // after 2026-01-01; duct leakage limits (10% total / 7% to outside) and R-6 duct insulation, and
  // heat pump refrigerant charge verification, per the CEC Energy Code Support Center.
  permits: {
    eyebrow: 'Permits and code',
    title: 'Each city issues its own HVAC permits',
    intro: 'Mechanical permits come from each city, not from Orange County. Replacing AC, furnace, heat pump, or air handler equipment should be treated as permit-required unless the city says otherwise, and electrical, gas, or plumbing permits can apply on the same job.',
    columns: ['City', 'Permit path', 'What is different locally'],
    rows: [
      ['Irvine', 'Online residential replacement permit for AC and furnace', 'The new outdoor condenser must stay in its existing location and at least 2 feet from any property line, and HOA approval is required where an association applies.'],
      ['Anaheim', 'Mechanical permit', 'The Building Division issues mechanical permits through Form B713. Confirm with the Building Division, (714) 765-5153, which permits your replacement needs.'],
      ['Santa Ana', 'Online through the City permit portal', 'The City said on June 12, 2026 that plan reviews and permits moved online through the Accela Citizen Access portal, with electronic submittal required from July 1, 2026, and it lists mechanical permits among the online types. We confirm what your replacement needs with the City.'],
      ['Costa Mesa', 'Residential HVAC Insta-Permit, or Mechanical - Residential application', "The Insta-Permit is limited to a single-family dwelling on a single parcel, and exterior equipment must sit at ground level on the side or rear, out of public view. Work beyond that scope uses a Mechanical - Residential application in the City's TESSA portal."],
      ['Newport Beach', 'Residential Express Permits through the City', "The City's online permitting page names furnace replacement as an example of a simple project for Residential Express Permits, which are not for projects that need multiple permits and plan review. The pages we read do not mention AC replacement, so we confirm what your job needs with the City."],
      ['Huntington Beach', 'Permit Center and HB ACA online portal', 'The Permit Center issues mechanical permits, and the City lists a Mechanical Permit Application, Mechanical Plan Requirements, and a Mechanical Plan Check Waiver Request. We did not find a published like-for-like exemption, so treat replacement as permit-required.'],
      ['Fullerton', 'Building and Safety, with applications through the EasyDev online portal', "The City's FAQ lists new, expanded, or replaced mechanical items among work that needs a permit and says no construction is allowed until the permit is issued. Applications submitted on or after January 1, 2026 follow the 2025 California Building Codes with Fullerton amendments. We confirm which permit your replacement needs with the City."],
      ['Tustin', 'Building Division', "The City's Permits Process page says a permit is valid for 180 days unless work is active and progressing, and a City handout dated June 1999 says a permit is required to install or replace a furnace or air conditioner. We confirm the current permit path and expiration terms with the City."],
    ],
    note: "Based on each city's published permit pages. Procedures change, so current requirements are confirmed with the city before permit submittal.",
    paragraphs: [
      "**Title 24 applies to permits submitted in 2026.** California's 2025 Energy Code applies to permits submitted on or after January 1, 2026. The job's CF1R compliance form determines which checks apply.",
      '**Tests depend on the job.** Where duct testing applies, the limits are 10% total leakage or 7% to outside, with R-6 duct insulation, and refrigerant charge verification can apply to heat pumps. Not every job needs every test.',
    ],
  },

  // Sources: Irvine screening/noise standard (parapet height / eave-line visibility; 5 dB(A) above
  // ambient or the land-use standard, whichever is higher) and HOA map; Anaheim Resort Specific Plan
  // (581 acres); Fullerton Building and Safety FAQ (construction-hours exemption; Chapter 15.90 text not read); Costa Mesa Insta-Permit page and Municipal Code Sec. 13-280 (GoCodebook).
  placement: {
    eyebrow: 'Placement and noise',
    title: 'Where the outdoor unit can go depends on the city',
    columns: ['City', 'Placement, screening, and noise'],
    rows: [
      ['Irvine', 'Rooftop and ground equipment must be screened: no higher than the parapet on a flat roof, and not visible from the eave line on a pitched roof. Air conditioning noise is capped at the higher of the land-use noise standard or 5 dB(A) above ambient. The city publishes an HOA map.'],
      ['Anaheim', "The City's Anaheim Resort page describes a 581-acre specific plan area of hotels, convention and conference facilities, restaurants, retail, and entertainment. Anaheim Municipal Code Sec. 6.70.010 sets a general 60 dB(A) property-line sound limit, so confirm placement and noise for the specific property."],
      ['Fullerton', 'The City FAQ points construction noise to Municipal Code Chapter 15.90 and exempts it between 7 a.m. and 8 p.m. on any day except Sunday or a City-recognized holiday. We did not read the chapter, so we confirm placement and noise conditions for the specific property with the City.'],
      ['Costa Mesa', "Under the Insta-Permit, outdoor equipment goes at ground level on the side or rear of the home, out of public view, with no roof-top equipment. Municipal Code Sec. 13-280 sets residential exterior noise limits of 55 dB(A) by day and 50 dB(A) at night. We confirm placement for the specific property."],
      ['Santa Ana, Huntington Beach', 'We confirm zoning, screening, HOA approval, and noise conditions for the specific property before recommending where equipment goes.'],
      ['Tustin', 'We did not find a City page we could read that states placement, screening, or noise rules for outdoor HVAC equipment, so we confirm zoning, screening, HOA approval, and noise conditions for the specific property with the City before recommending where equipment goes.'],
      ['Newport Beach', 'We confirm placement and any noise conditions for the specific property with the City before recommending where equipment goes.'],
    ],
    note: "Based on each city's municipal code and planning materials. Code text changes, so current requirements are confirmed with the city.",
  },

  // Rebate sources: Anaheim Public Utilities rebate page (link only, no amounts published; the
  // City page does not list them and the DSIRE amounts are dated 2025-08-04);
  // SoCalGas 2026 furnace rebate tiers ($1.40/$10/$25 per kBtuh by AFUE tier; the $75 thermostat offer is wildfire-only so it is not advertised,
  // through 2026-12-31 or funds); the SCE Smart Energy Program ($75 enrollment credit) is not advertised (enrollment program, not an equipment rebate, amount unverified, authorized-service-provider condition is an open client question). HEEHRA: single-family fully reserved statewide as
  // of 2026-02-24; multifamily reservation window closed 2025-12-18. No source URLs were found for
  // the SoCalGas and SCE programs (see docs/open-items.md), so those cards carry no link.
  rebates: {
    eyebrow: 'Utilities and rebates',
    title: 'Your utility accounts decide which programs to look at',
    intro: 'Anaheim has its own municipal electric utility. Four of the other seven cities are generally served by SCE, and natural gas is generally supplied by SoCalGas. We have not confirmed the electric or gas provider for Newport Beach or Tustin, or the electric provider for Fullerton, from a City source, so confirm it by address.',
    cards: [
      {
        amount: 'Home incentives',
        description: 'Anaheim Public Utilities lists residential HVAC incentives on its Heating & Cooling Systems page. Terms and funding change, so confirm current details before you buy.',
        linkLabel: 'Anaheim Public Utilities rebates',
        linkHref: 'https://www.anaheim.net/2579/Heating-Cooling-Systems',
      },
      {
        verifyTag: 'Verify current amount before launch',
        amount: '$1.40 to $25 per kBtuh',
        description: 'SoCalGas 2026 furnace rebate tiers: $1.40 for 92 to 94% AFUE, $10 for 95 to 96%, and $25 for 97% or higher. Gas equipment only, through December 31, 2026 or until funds run out.',
      },
    ] satisfies RebateCard[],
    copy: [
      "Program details change quickly. Confirm Anaheim Public Utilities' current terms and funding on its rebate page. SoCalGas furnace rebates are for gas equipment only. We did not find a standard SCE rebate for AC or heat pump replacement, so we do not list one.",
      'State heat pump funding is limited. HEEHRA single-family funding was fully reserved statewide as of February 24, 2026, and the multifamily reservation window closed December 18, 2025.',
      'Rebates and eligibility vary by service address, utility account, equipment efficiency, and available funding. Confirm final eligibility, amount, and application requirements with your utility before installation.',
    ],
    utilityCardTitle: 'Utilities in these cities',
    utilities: [
      'Anaheim electric: Anaheim Public Utilities',
      'Other cities except Newport Beach, Fullerton, and Tustin, electric: SCE',
      'Natural gas: SoCalGas (not confirmed for Newport Beach and Tustin; assumed for Fullerton)',
    ],
    note: '**Confirm by address:** service territory can vary by address, so verify your utility directly before relying on any program. Gas service is directly confirmed for Irvine, Huntington Beach, and Santa Ana (City utilities page) and assumed for Anaheim, Costa Mesa, and Fullerton. Neither electric nor gas provider is confirmed for Newport Beach or Tustin, and the electric provider is not confirmed for Fullerton.',
  },

  cities: {
    eyebrow: 'Cities served',
    title: 'The eight cities on this page',
    items: [
      {
        name: 'Irvine',
        href: '/service-areas/irvine/',
        note: 'Only 4.8% of housing was built before 1970 (SCAG, ACS 2017). Detached homes lead at 38.9%, with buildings of 5 or more units close behind at 37.4% (SCAG, 2018).',
        areas: 'Neighborhood list pending verification',
        utility: 'Electric: SCE. Gas: SoCalGas. Rooftop and ground equipment must be screened (City of Irvine).',
        zips: 'pending',
        pending: 'ZIP list pending verification.',
      },
      {
        name: 'Anaheim',
        href: '/service-areas/anaheim/',
        note: 'The largest housing stock of the eight cities, at 108,222 units, with 45.4% multifamily. It is the only city here with a municipal electric utility, Anaheim Public Utilities, which runs its own home incentive program. 44.6% of housing was built before 1970 (SCAG, ACS 2017).',
        areas: 'Anaheim Resort, Convention Center area',
        utility: 'Electric: Anaheim Public Utilities.',
        zips: 'pending',
        pending: 'ZIP list pending verification.',
      },
      {
        name: 'Santa Ana',
        href: '/service-areas/santa-ana/',
        note: "The Orange County seat, according to the City's General Plan. The City requires electronic permit submittal through its online portal from July 1, 2026.",
        areas: 'Neighborhood list pending verification',
        utility: 'Electric: SCE. Gas: Southern California Gas Company (City of Santa Ana utilities page).',
        zips: 'pending',
        pending: 'ZIP list pending verification.',
      },
      {
        name: 'Costa Mesa',
        note: "Nearly half of homes (49.6%) were built before 1970 (SCAG, 2017 American Community Survey), and 48.0% of units are multifamily (SCAG, 2018). The City's Insta-Permit covers single-family homes only, so condos, townhomes, and apartments use a different permit application.",
        areas: 'Westside, Eastside, Mesa Verde',
        utility: 'Utilities: confirm by address.',
        zips: '92626-92628',
        href: '/service-areas/costa-mesa/',
      },
      {
        name: 'Huntington Beach',
        href: '/service-areas/huntington-beach/',
        note: 'Coastal city where detached homes are 47.9% of housing (SCAG, 2018) and 43.5% of housing was built before 1970 (SCAG, 2017 American Community Survey). Mechanical permits run through the Permit Center and the HB ACA online portal.',
        areas: 'Huntington Harbour, Oak View, Sunset Beach',
        utility: 'Electric: SCE. Gas: Southern California Gas Company (City of Huntington Beach utility page).',
        zips: 'pending',
        pending: 'ZIP list pending verification.',
      },
      {
        name: 'Newport Beach',
        href: '/service-areas/newport-beach/',
        note: "The City's online permitting page names furnace replacement as an example for Residential Express Permits. The pages we read do not mention AC replacement, so we confirm the steps with the City.",
        areas: 'Balboa Peninsula, Balboa Island, Corona del Mar, Newport Center and Fashion Island, Newport Coast (City About the Community page)',
        utility: 'Utilities: confirm by address.',
        zips: '92657, 92660-92663 (City ZIP map, 05/19/2026)',
      },
      {
        name: 'Fullerton',
        href: '/service-areas/fullerton/',
        note: "The City's Building and Safety page names its EasyDev online portal for permits, and its FAQ says no construction is allowed until the permit is issued. We confirm which permit your replacement needs with the City.",
        areas: 'Pending verification (no City neighborhood list read)',
        utility: 'Utilities: confirm by address.',
        zips: 'pending',
        pending: 'ZIP list pending verification (no official source read).',
      },
      {
        name: 'Tustin',
        href: '/service-areas/tustin/',
        note: "The City's Permits Process page says a permit is valid for 180 days unless work is active and progressing, and a City handout dated June 1999 says a permit is required to install or replace a furnace or air conditioner. We confirm the current steps with the City.",
        areas: 'Pending verification (no City neighborhood list read)',
        utility: 'Utilities: confirm by address.',
        zips: 'pending',
        pending: 'ZIP list pending verification (no official source read).',
      },
    ] satisfies CityCardSpec[],
    note: 'Area names are general references, not permit or jurisdiction boundaries. Housing figures are SCAG 2018 and ACS 2014-2018 estimates.',
  },

  proof: {
    eyebrow: 'Why Air Pro',
    heading: 'Recommendations that start with your address',
    body: 'Permit path, utility, noise rules, and building type all change across Orange County. We check them for your property before recommending equipment, so the plan fits where you actually live or work.',
    stats: [
      { num: '4.8★', label: 'Google rating' },
      { num: '40', label: 'Google reviews' },
      { num: '8', label: 'Cities on this page' },
      { num: 'Licensed', label: `CA LIC #${siteConfig.licenses.join(', #')}` },
    ],
    pending: 'City-tagged Orange County reviews and real photos will replace the placeholders once supplied. Business hours are also pending client confirmation.',
  },

  faqs: [
    {
      q: 'Which cities does AIRPRO SOLUTIONS serve in Orange County?',
      a: 'This page covers Irvine, Anaheim, Santa Ana, Costa Mesa, Huntington Beach, Newport Beach, Fullerton, and Tustin. These are the Orange County cities we list here, and the county has more. If your address is in another Orange County city or an unincorporated area, call us first, because permit and code rules differ by jurisdiction.',
    },
    {
      q: 'Do I need a permit to replace my AC in Orange County?',
      a: 'Plan on it in all eight cities. Mechanical permits are issued by each city, not by Orange County. Irvine offers an online residential replacement permit, and Anaheim\'s Building Division issues mechanical permits through a published application, Form B713. Huntington Beach issues mechanical permits through its Permit Center and HB ACA portal. For Huntington Beach we did not find a published like-for-like exemption, Fullerton\'s Building and Safety FAQ lists replaced mechanical items among the work that needs a permit, and a June 1999 City of Tustin handout says a permit is required to install or replace a furnace or air conditioner. Confirm the local permit path before work begins.',
    },
    {
      q: 'What is Title 24 and how does it affect an HVAC replacement?',
      a: "Title 24 is California's building energy code. The 2025 Energy Code applies to permits submitted on or after January 1, 2026. The compliance form for a job, called the CF1R, determines which checks apply. Depending on the job, that can include duct leakage testing, duct insulation, and refrigerant charge verification for heat pumps. Not every job needs every test.",
    },
    {
      q: 'Which utility serves my home, and are there HVAC rebates?',
      a: 'It depends on the city. Anaheim has its own municipal electric utility, Anaheim Public Utilities, while four of the other seven cities on this page are generally served by Southern California Edison (SCE). Natural gas is generally supplied by Southern California Gas Company (SoCalGas). We have not confirmed the electric or gas provider for Newport Beach or Tustin, or the electric provider for Fullerton, from a City source. Programs, amounts, and funding change, so confirm your utility by address and confirm current eligibility before installation.',
    },
    {
      q: 'Are there noise or screening rules for outdoor equipment?',
      a: 'Yes, and they are not the same in every city. Irvine requires screening of rooftop and ground equipment and caps air conditioning noise at the higher of the land-use noise standard or 5 dB(A) above ambient. Fullerton\'s Building and Safety FAQ points construction noise to Municipal Code Chapter 15.90. Anaheim Municipal Code Sec. 6.70.010 sets a general sound limit of 60 decibels on the A-scale at the property line. For the other cities, confirm placement, screening, and noise conditions for the specific property.',
    },
    {
      q: 'Do you work on condos, apartments, and HOA properties?',
      a: "Yes, for single-family homes, condos, townhomes, and apartments. Multifamily units are 48.0% of housing in Costa Mesa, per 2018 SCAG data. HOA rules are set by each association, and Irvine publishes an HOA map, so check your association's requirements before choosing equipment or placement.",
    },
    {
      q: 'Does AIRPRO SOLUTIONS handle commercial HVAC in Orange County?',
      a: "Yes, for offices, retail, restaurants, hotels, and other commercial properties. An example is the Anaheim Resort area. Irvine's permit rules describe a like-for-like rooftop heat pump change-out path for units of 20 tons or less, no more than 2,000 pounds each, on a roof with a slope of 2% or less and no curb change.",
    },
    {
      q: 'Do older homes in Orange County need different HVAC work?',
      a: 'Often, yes. Countywide, 60.4% of housing units were built before 1980. In Costa Mesa 49.6% of homes were built before 1970 (SCAG, 2017 American Community Survey). Age alone does not tell us about attic access, foundation type, or original ductwork, so those are confirmed at a site visit before recommending repair or replacement.',
    },
    {
      q: 'How quickly can a technician reach me?',
      a: 'Arrival times vary with freeway traffic and appointment availability. Orange County service runs along the I-5, SR-57, SR-91, SR-55, I-405, and SR-73 corridors. Dispatch timing is confirmed when service is scheduled, based on your location and technician availability.',
    },
  ] satisfies Faq[],
};

// Service cards resolved against the real services.ts data (commercial-hvac and the /services/ hub
// aren't services.ts entries), same special-casing as the LA County and South Bay hubs.
export function orangeCountyServiceCards(): Card[] {
  return orangeCountyHub.services.cards.map((sc) => {
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
    if (!svc) throw new Error(`Unknown service slug on ${orangeCountyHub.path}: ${sc.slug}`);
    return { href: serviceHref(svc.slug), name: svc.name, description: sc.body, icon: svc.icon, image: svc.image };
  });
}
