import { siteConfig } from '@/content/site-config';
import { getService, commercialCardImage } from '@/content/services';
import type { Faq } from '@/content/faq';
import type { Card } from '@/components/sections/ServicesGrid';
import type { RebateCard } from '@/components/sections/RebateCards';

// TODO(copy): client review of every string before launch, same as the LA County and South Bay
// hubs. Every figure below is cited in the comment above it. None are invented; anything not
// sourced is flagged TODO(data)/"pending" inline, and time-sensitive items are indexed in
// docs/open-items.md.

type ServiceCardSpec = { slug: string; body: string; name?: string; icon?: string };
type CityCardSpec = { name: string; note: string; areas: string; utility: string; zips: string; pending?: string };

export const orangeCountyHub = {
  path: '/service-areas/orange-county/',
  primaryKeyword: 'hvac services orange county',
  // Title/H1 are built from src/lib/seo.ts (regionTitle/regionH1) per CLAUDE.md, not hand-written here.
  description:
    'Licensed, 4.8-star rated HVAC services in Orange County for homes and businesses in Irvine, Anaheim, Santa Ana, and five more cities. Schedule service.',

  cityNames: ['Irvine', 'Anaheim', 'Santa Ana', 'Costa Mesa', 'Huntington Beach', 'Newport Beach', 'Fullerton', 'Tustin'],

  hero: {
    lede:
      'Air Pro Solutions provides HVAC services in Orange County - from Anaheim and Fullerton in the north to Irvine, Costa Mesa, and the coast at Newport Beach and Huntington Beach - with permits, utilities, and equipment matched to each city.',
    photoCaptionTitle: 'Orange County, CA',
    photoCaptionBody: 'North county, central county, and coast across eight cities',
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
    lead: 'Air Pro Solutions is a licensed HVAC contractor serving Orange County',
    body:
      ', including Irvine, Anaheim, Santa Ana, Costa Mesa, Huntington Beach, Newport Beach, Fullerton, and Tustin, for homes, multifamily buildings, and commercial properties. Permits, utilities, and equipment rules change by city and sometimes by address, so every recommendation starts with the property, not a county-wide assumption.',
  },

  // Source: National Weather Service Tustin MCAS historical station summary (single station, not
  // 1991-2020 normals). Anaheim 112F and Santa Ana 113F event readings and "ocean-moderated coast"
  // description also from NWS weather history. City grouping follows OCTA planning areas and is
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
      "Orange County is a coastal Southern California climate, but the ocean moderates the coast while inland cities run hotter. At the National Weather Service's Tustin MCAS station, July, August, and September average highs of 82, 83, and 83°F sit beside a station record of 112°F. NWS weather history also cites 112°F in Anaheim and 113°F in Santa Ana during heat events, and describes the coast as generally ocean-moderated. These are station and event readings, not city averages.",
      'Summer haze is common, on 19 to 23 days a month from June through September, and coastal fog and stratus are the predominant pattern. Winters are mild, with a January average high of 68°F, but there is still a heating season. Santa Ana winds are most frequent in winter.',
      '**That is why we size equipment from a load calculation for your specific property**, not from a county-wide temperature assumption. A home near the coast and a home in Anaheim or Tustin can call for different equipment.',
    ],
    cardTitle: 'Where each city sits',
    groups: [
      { label: 'North Orange County', cities: ['Anaheim', 'Fullerton'] },
      { label: 'Central Orange County', cities: ['Santa Ana', 'Costa Mesa', 'Tustin'] },
      { label: 'Coastal', cities: ['Huntington Beach', 'Newport Beach'] },
      { label: 'Freeway and toll-road hub', cities: ['Irvine'] },
    ],
    gettingAround:
      '**Getting around:** the north is served by I-5, SR-57, and SR-91, the central cities by I-5, SR-55, SR-22, and I-405, and the coast by I-405, SR-55, SR-73, and PCH. Arrival times vary with freeway traffic and appointment availability.',
    source: 'Climate figures are from the National Weather Service Tustin MCAS historical summary, a single station, not 1991-2020 normals. City grouping follows OCTA planning areas and is general, not a climate-zone boundary.',
  },

  // Source: SCAG local profiles using California Department of Finance E-5 data, 2018 (structure
  // type only). Building-age figures: ACS 2019 countywide (60.4% pre-1980, 26.6% 1980-1999, 13.0%
  // 2000+); ACS 2014-2018 estimates for Santa Ana (55% pre-1970), Costa Mesa (49.6% pre-1970),
  // Newport Beach (40.1% pre-1970), Irvine (1.4% pre-1970, largest cohort 2000-2009 at 23.7%). No
  // age figures were found for Anaheim, Huntington Beach, Fullerton, or Tustin - none are claimed.
  housing: {
    eyebrow: 'Property types',
    title: 'Housing mix by city: detached homes lead, but multifamily is close to half in two cities',
    columns: ['City', 'Housing units', 'Detached', 'Attached', '2 to 4 units', '5 or more units', 'All multifamily'],
    rows: [
      ['Anaheim', '108,222', '41.7%', '8.6%', '10.5%', '34.9%', '45.4%'],
      ['Irvine', '102,474', '38.9%', '16.4%', '6.2%', '37.4%', '43.6%'],
      ['Huntington Beach', '81,656', '47.9%', '11.6%', '11.8%', '24.9%', '36.7%'],
      ['Santa Ana', '78,052', '45.6%', '7.4%', '9.7%', '32.1%', '41.8%'],
      ['Fullerton', '49,430', '49.6%', '10.0%', '8.2%', '30.4%', '38.6%'],
      ['Newport Beach', '44,670', '45.1%', '15.7%', '11.3%', '25.4%', '36.7%'],
      ['Costa Mesa', '42,836', '39.6%', '10.2%', '13.3%', '34.7%', '48.0%'],
      ['Tustin', '28,118', '35.1%', '12.7%', '14.4%', '34.6%', '49.0%'],
    ],
    note: 'Share of housing units by structure type, from SCAG local profiles using California Department of Finance E-5 data for 2018. Figures measure structure type only, not condo ownership, HOA status, or renter status. The remainder is other unit types. Costa Mesa and Tustin have the highest multifamily shares, at 48.0% and 49.0%.',
    paragraphs: [
      'Structure type shapes the job. Detached homes are the largest single category in all eight cities, but in Irvine and Tustin buildings with 5 or more units are within two points of them. Attached homes are 16.4% of Irvine and 15.7% of Newport Beach units, which can mean shared walls, shared roofs, and association rules.',
      'Anaheim has the largest housing stock at 108,222 units, followed by Irvine at 102,474, and in both cities more than a third of units are in buildings of 5 or more.',
      'Building age varies widely. Countywide, 60.4% of housing units were built before 1980, 26.6% between 1980 and 1999, and 13.0% in 2000 or later (ACS 2019). Homes built before 1970 are 55% of Santa Ana, 49.6% of Costa Mesa, and 40.1% of Newport Beach, against 1.4% in Irvine, where the largest group was built from 2000 to 2009.',
      'Age alone does not tell us about attic access, foundation type, or original ductwork, so those are confirmed at a site visit before recommending repair or replacement.',
    ],
    pending: 'Housing age figures were not found for Anaheim, Huntington Beach, Fullerton, and Tustin, so no age claim is made for them.',
  },

  services: {
    eyebrow: 'Services in Orange County',
    title: "HVAC work across the county's homes and buildings",
    cards: [
      { slug: 'ac-repair', body: "Diagnosis for cooling failures where inland Tustin and Anaheim run hotter than the ocean-moderated coast, and where Irvine's screening and noise rules affect condenser placement." },
      { slug: 'heating-repair', body: 'Mild winters still bring a real heating season, with a January average low of 44°F. Furnace work in each city starts with its permit path and SoCalGas service.' },
      { slug: 'heat-pump-services', body: 'Heat pump work starts with your electric utility, Anaheim Public Utilities or SCE, and with state incentive programs whose funding has been fully reserved.' },
      { slug: 'residential-hvac', name: 'Residential HVAC', body: "Detached homes, townhomes, condos, and apartments, from Santa Ana's older housing to Irvine's newer planned communities.", icon: 'home' },
      { slug: 'commercial-hvac', name: 'Commercial HVAC', body: 'Hotels and convention space at the Anaheim Resort, offices in the Irvine Business Complex, and rooftop units with city-specific screening rules.', icon: 'building' },
      { slug: 'services', name: 'All HVAC Services', body: 'See the full list of repair, installation, and maintenance services.', icon: 'check' },
    ] satisfies ServiceCardSpec[],
  },

  // Source: Anaheim Resort Specific Plan (581 acres); Irvine like-for-like rooftop heat pump
  // change-out limits (20 tons or less, under 2,000 lb, roof slope 2% or less, no curb change);
  // Irvine Business Complex / Spectrum, Anaheim Resort / Convention Center, Santa Ana Downtown /
  // Civic Center district names.
  split: {
    eyebrow: 'Residential and commercial',
    title: 'Planned communities, older neighborhoods, and resort-scale buildings',
    residential: {
      tag: 'Residential',
      title: 'Homes, condos, and apartments',
      body: "From Santa Ana's older housing to Irvine's newer planned communities and HOA neighborhoods, with access, placement, and association rules checked first.",
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
      "**Irvine's rooftop path has limits.** The city describes a like-for-like commercial rooftop heat pump change-out for units of 20 tons or less, under 2,000 pounds, on a roof with a slope of 2% or less and no curb change. Anything outside those limits is a different review.",
      "**Districts differ.** The Irvine Business Complex and Spectrum, the Anaheim Resort and Convention Center area, and Santa Ana's Downtown and Civic Center each bring different building types, rooftop access, and neighbor-noise conditions.",
    ],
  },

  // Sources: Irvine online residential replacement permit; Anaheim same-location replacement
  // exemption from a separate building permit; Santa Ana equipment-category permitting; Costa Mesa
  // Insta-Permit and CF1R/site plan; Newport Beach express furnace permit and plan-check triggers;
  // Huntington Beach mechanical plan package; Fullerton EasyDev portal / CF1R-ALT-HVAC; Tustin
  // 360-day permit expiration. Title 24: CEC 2025 Energy Code effective for permits submitted on or
  // after 2026-01-01; duct leakage limits (10% total / 7% to outside) and R-6 duct insulation, and
  // heat pump refrigerant charge verification, per the CEC Energy Code Support Center.
  permits: {
    eyebrow: 'Permits and code',
    title: 'Each city issues its own HVAC permits',
    intro: 'Mechanical permits come from each city, not from Orange County. Replacing AC, furnace, heat pump, or air handler equipment should be treated as permit-required unless the city says otherwise, and electrical, gas, or plumbing permits can apply on the same job.',
    columns: ['City', 'Permit path', 'What is different locally'],
    rows: [
      ['Irvine', 'Online residential replacement permit for AC and furnace', 'The new outdoor condenser must stay in its existing location and at least 2 feet from any property line, and the applicant is to check HOA requirements where they apply.'],
      ['Anaheim', 'Mechanical permit', 'The city states no separate building permit is needed for a same-location replacement when the drain, gas, and electrical are not altered. The mechanical permit still applies.'],
      ['Santa Ana', 'Permit before work, by equipment category', 'Separate categories for air conditioning, furnaces up to and over 100,000 BTU, fan coils, mini-splits, gas piping, and air vents, so the equipment decides the permit.'],
      ['Costa Mesa', 'Insta-Permit, with Title 24 form and site plan', 'Requires a CF1R compliance form, and a condenser site plan is reviewed by Planning.'],
      ['Newport Beach', 'Express permit path for furnace replacement', 'Furnace replacement often needs a permit. Plan check applies to systems over 7,000 square feet, mechanically ventilated basements or garages, standby generator exhaust, and VRF systems.'],
      ['Huntington Beach', 'Mechanical plan package', 'The city asks for a detailed mechanical plan package. We did not find a published like-for-like exemption, so treat replacement as permit-required.'],
      ['Fullerton', 'EasyDev online portal', 'Submittals use the EasyDev portal with a CF1R-ALT-HVAC form. We did not find a published like-for-like exemption.'],
      ['Tustin', 'Building Division', 'Permits expire if work is not started within 360 days. We did not find a published like-for-like exemption.'],
    ],
    note: "Based on each city's published permit pages. Procedures change, so current requirements are confirmed with the city before permit submittal.",
    paragraphs: [
      "**Title 24 applies to permits submitted in 2026.** California's 2025 Energy Code applies to permits submitted on or after January 1, 2026. The job's CF1R compliance form determines which checks apply.",
      '**Tests depend on the job.** Where duct testing applies, the limits are 10% total leakage or 7% to outside, with R-6 duct insulation, and refrigerant charge verification can apply to heat pumps. Not every job needs every test.',
    ],
  },

  // Sources: Irvine screening/noise standard (parapet height / eave-line visibility; 5 dB(A) above
  // ambient or the zone standard, whichever is higher) and HOA map; Anaheim Resort Specific Plan
  // (581 acres); Fullerton Municipal Code Chapter 15.90 and its construction-hours exemption.
  placement: {
    eyebrow: 'Placement and noise',
    title: 'Where the outdoor unit can go depends on the city',
    columns: ['City', 'Placement, screening, and noise'],
    rows: [
      ['Irvine', 'Rooftop and ground equipment must be screened: no higher than the parapet on a flat roof, and not visible from the eave line on a pitched roof. Air conditioning noise is capped at the higher of the zone standard or 5 dB(A) above ambient. The city publishes an HOA map.'],
      ['Anaheim', 'The Anaheim Resort Specific Plan covers 581 acres of hotels, convention space, restaurants, and retail, where equipment shielding and sound buffering are part of the planning context.'],
      ['Fullerton', 'Noise is regulated under Chapter 15.90. Construction is exempt from the noise limits from 7 a.m. to 8 p.m., except on Sundays and holidays.'],
      ['Santa Ana, Costa Mesa, Newport Beach, Huntington Beach, Tustin', 'We confirm zoning, screening, HOA approval, and noise conditions for the specific property before recommending where equipment goes.'],
    ],
    note: "Based on each city's municipal code and planning materials. Code text changes, so current requirements are confirmed with the city.",
  },

  // Rebate sources: Anaheim Public Utilities Home Incentives Program ($200/ton AC/heat pump at
  // 14.3 SEER2+, 50% duct repair up to $300, $50/thermostat up to 2, first-come first-served);
  // SoCalGas 2026 furnace rebate tiers ($1.40/$10/$25 per kBtuh by AFUE tier, $75 thermostat,
  // through 2026-12-31 or funds); SCE Smart Energy Program ($75 enrollment + up to $50/yr,
  // enrollment program, not an equipment rebate). HEEHRA: single-family fully reserved statewide as
  // of 2026-02-24; multifamily reservation window closed 2025-12-18. No source URLs were found for
  // any of the three programs (see docs/open-items.md), so the cards carry no link.
  rebates: {
    eyebrow: 'Utilities and rebates',
    title: 'Your utility accounts decide which programs to look at',
    intro: 'Anaheim has its own municipal electric utility. The other seven cities are generally served by SCE, and natural gas is supplied by SoCalGas.',
    cards: [
      {
        verifyTag: 'Verify current amount before launch',
        amount: '$200 per ton',
        description: 'Anaheim Public Utilities Home Incentives Program for AC or heat pump replacement at 14.3 SEER2 or higher. Duct repair is 50% up to $300, and smart thermostats are $50 each, up to 2. First-come, first-served.',
      },
      {
        verifyTag: 'Verify current amount before launch',
        amount: '$1.40 to $25 per kBtuh',
        description: 'SoCalGas 2026 furnace rebate tiers: $1.40 for 92 to 94% AFUE, $10 for 95 to 96%, and $25 for 97% or higher. A smart thermostat is $75. Gas equipment only, through December 31, 2026 or until funds run out.',
      },
      {
        verifyTag: 'Verify current amount before launch',
        amount: '$75 plus up to $50 a year',
        description: 'SCE Smart Energy Program: a $75 enrollment credit plus up to $50 per year. It is an enrollment program for eligible customers, not an equipment rebate.',
      },
    ] satisfies RebateCard[],
    copy: [
      "Program details change quickly. Anaheim's program is first-come, first-served and runs until funding is exhausted. SoCalGas furnace and thermostat rebates are for gas equipment only. We did not find a standard SCE rebate for AC or heat pump replacement, so we do not list one.",
      'State heat pump funding is limited. HEEHRA single-family funding was fully reserved statewide as of February 24, 2026, and the multifamily reservation window closed December 18, 2025.',
      'Rebates and eligibility vary by service address, utility account, equipment efficiency, and available funding. Confirm final eligibility, amount, and application requirements with your utility before installation.',
    ],
    utilityCardTitle: 'Utilities in these cities',
    utilities: [
      'Anaheim electric: Anaheim Public Utilities',
      'Other seven cities, electric: SCE',
      'Natural gas: SoCalGas',
    ],
    note: '**Confirm by address:** service territory can vary by address, so verify your utility directly before relying on any program. Gas service is directly confirmed for Anaheim and assumed for the other cities.',
  },

  cities: {
    eyebrow: 'Cities served',
    title: 'The eight cities on this page',
    items: [
      {
        name: 'Irvine',
        note: 'Planned-community city where only 1.4% of homes were built before 1970 and the largest age group is 2000 to 2009, at 23.7%. Detached homes lead at 38.9%, with 5-or-more-unit buildings close behind at 37.4%.',
        areas: 'Irvine Business Complex, Spectrum, Great Park, Northwood, Woodbridge, Turtle Rock, Orchard Hills, Portola Springs',
        utility: 'Electric: SCE. Rooftop and ground equipment screening rules apply.',
        zips: '92602, 92603, 92604, 92606, 92612, 92614, 92616-92620, 92623, 92650',
      },
      {
        name: 'Anaheim',
        note: 'The largest housing stock of the eight cities, at 108,222 units, with 45.4% multifamily. It is the only city here with a municipal electric utility, Anaheim Public Utilities, which runs its own home incentive program.',
        areas: 'Anaheim Resort, Convention Center area',
        utility: 'Electric: Anaheim Public Utilities.',
        zips: '92801-92808, 92812, 92814-92817, 92825, 92850',
      },
      {
        name: 'Santa Ana',
        note: 'Older housing: 55% of homes were built before 1970, so ductwork and equipment locations are often original. The city permits air conditioning, furnaces, fan coils, mini-splits, and gas piping as separate categories.',
        areas: 'Downtown, Civic Center, South Coast Metro edge',
        utility: 'Electric: SCE.',
        zips: '92701-92707',
      },
      {
        name: 'Costa Mesa',
        note: 'Nearly half of homes (49.6%) were built before 1970, and 48.0% of units are multifamily. Permits need a CF1R form and a condenser site plan reviewed by Planning.',
        areas: 'Westside, Eastside, Mesa Verde',
        utility: 'Electric: SCE.',
        zips: '92626-92628',
      },
      {
        name: 'Huntington Beach',
        note: 'Coastal city where detached homes are 47.9% of housing and 5-or-more-unit buildings are 24.9%. Permit submittals use a detailed mechanical plan package.',
        areas: 'Downtown and Main Street, Huntington Harbour, Bolsa Chica',
        utility: 'Electric: SCE.',
        zips: '92605, 92615, 92646-92649',
        pending: 'Housing age figures pending for this city.',
      },
      {
        name: 'Newport Beach',
        note: 'About 40% of homes were built before 1970. Furnace replacement often needs a permit, and plan check applies to mechanically ventilated basements or garages, standby generator exhaust, and VRF systems.',
        areas: 'Balboa Peninsula, Balboa Island, Newport Coast, Corona del Mar',
        utility: 'Electric: SCE.',
        zips: '92625, 92657-92663',
      },
      {
        name: 'Fullerton',
        note: 'Highest detached-home share in this group at 49.6%. Permits run through the EasyDev portal with a CF1R-ALT-HVAC form, and the noise code is Chapter 15.90.',
        areas: 'Downtown, Sunny Hills, Amerige Heights',
        utility: 'Electric: SCE.',
        zips: 'pending',
        pending: 'ZIP list pending verification. Housing age figures pending.',
      },
      {
        name: 'Tustin',
        note: 'The highest multifamily share in this group at 49.0%, with detached homes at 35.1% and 5-or-more-unit buildings at 34.6%. Permits expire if work is not started within 360 days.',
        areas: 'Old Town, Tustin Ranch, Tustin Legacy',
        utility: 'Electric: SCE.',
        zips: '92780, 92782',
        pending: 'Housing age figures pending for this city.',
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
      q: 'Which cities does Air Pro Solutions serve in Orange County?',
      a: 'This page covers Irvine, Anaheim, Santa Ana, Costa Mesa, Huntington Beach, Newport Beach, Fullerton, and Tustin. These are the Orange County cities we list here, and the county has more. If your address is in another Orange County city or an unincorporated area, call us first, because permit and code rules differ by jurisdiction.',
    },
    {
      q: 'Do I need a permit to replace my AC in Orange County?',
      a: 'Plan on it in all eight cities. Mechanical permits are issued by each city, not by Orange County. Irvine offers an online residential replacement permit, and Anaheim states that a same-location replacement with unaltered drain, gas, and electrical does not need a separate building permit. For Huntington Beach, Fullerton, and Tustin we did not find a published like-for-like exemption. Confirm the local permit path before work begins.',
    },
    {
      q: 'What is Title 24 and how does it affect an HVAC replacement?',
      a: "Title 24 is California's building energy code. The 2025 Energy Code applies to permits submitted on or after January 1, 2026. The compliance form for a job, called the CF1R, determines which checks apply. Depending on the job, that can include duct leakage testing, duct insulation, and refrigerant charge verification for heat pumps. Not every job needs every test.",
    },
    {
      q: 'Which utility serves my home, and are there HVAC rebates?',
      a: 'It depends on the city. Anaheim has its own municipal electric utility, Anaheim Public Utilities, while the other seven cities on this page are generally served by Southern California Edison (SCE). Natural gas is supplied by Southern California Gas Company (SoCalGas). Programs, amounts, and funding change, so confirm your utility by address and confirm current eligibility before installation.',
    },
    {
      q: 'Are there noise or screening rules for outdoor equipment?',
      a: 'Yes, and they are not the same in every city. Irvine requires screening of rooftop and ground equipment and caps air conditioning noise at the higher of the zone standard or 5 dB(A) above ambient. Fullerton regulates noise under Chapter 15.90. The Anaheim Resort Specific Plan area has its own shielding and sound-buffering context. For the other cities, confirm placement, screening, and noise conditions for the specific property.',
    },
    {
      q: 'Do you work on condos, apartments, and HOA properties?',
      a: "Yes, for single-family homes, condos, townhomes, and apartments. Multifamily units are 49.0% of housing in Tustin and 48.0% in Costa Mesa, per 2018 SCAG data. HOA rules are set by each association, and Irvine publishes an HOA map, so check your association's requirements before choosing equipment or placement.",
    },
    {
      q: 'Does Air Pro Solutions handle commercial HVAC in Orange County?',
      a: "Yes, for offices, retail, restaurants, hotels, and other commercial properties. Examples include the Anaheim Resort area and the Irvine Business Complex and Spectrum. Irvine's permit rules describe a like-for-like rooftop heat pump change-out path for units of 20 tons or less, under 2,000 pounds, on a roof with a slope of 2% or less and no curb change.",
    },
    {
      q: 'Do older homes in Orange County need different HVAC work?',
      a: 'Often, yes. Countywide, 60.4% of housing units were built before 1980. In Santa Ana 55% of homes were built before 1970, in Costa Mesa 49.6%, and in Newport Beach 40.1%, compared with 1.4% in Irvine. Age alone does not tell us about attic access, foundation type, or original ductwork, so those are confirmed at a site visit before recommending repair or replacement.',
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
      return { href: '/services/', name: sc.name!, description: sc.body, icon: sc.icon! };
    }
    if (sc.slug === 'residential-hvac') {
      return { href: '/residential-hvac/', name: sc.name!, description: sc.body, icon: sc.icon! };
    }
    const svc = getService(sc.slug);
    if (!svc) throw new Error(`Unknown service slug on ${orangeCountyHub.path}: ${sc.slug}`);
    return { href: `/${svc.slug}/`, name: svc.name, description: sc.body, icon: svc.icon, image: svc.image };
  });
}
