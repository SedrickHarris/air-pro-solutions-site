import type { ServicePage } from '@/content/services';

// TODO(data): never fabricate business data. No prices, install durations, warranty terms, brand
// names, or same-day/24-7/emergency-availability wording appear anywhere on this page.
// TODO(data): Sources list for ductless-mini-split never arrived from the client-side prompt; add
// once provided. Do not invent citations. (See the omitted `sources` field below - every other
// published service page sets one; this one deliberately does not, pending real citations.)
// TODO(copy): confirm this Final CTA heading/body wording once the original client copy is available
// (see `finalCtaTitle`/`finalCtaBody` below - substituted from the established five-page pattern
// because the original client copy for this page's final CTA never arrived).
// TODO(copy): client review of every FAQ answer below before launch.
// TODO(data): rebate `name` labels below ("LADWP", "SCE", "CEC") are short-form abbreviations of the
// program names already stated in each card's body/link text, not new data - added only because the
// RebateCards component requires a caption label alongside the dollar-amount headline.

// Full template content for /ductless-mini-split/. Reuses the same ServicePage shape and shared
// section components already built out for /ac-repair/, /ac-installation/, /ac-maintenance/,
// /heating-repair/, and /furnace-installation/ - see the build report for why a second, parallel
// content shape (src/content/pages/) was not introduced. This page reuses several fields the
// furnace-installation build already added (relatedIconOverrides, the `headline` field on incentives
// items, symptomsEyebrow, diagnosisColumns) and adds a small number of new optional ServicePage
// fields of its own (fitGrid, systemsId/systemsNote/systemsEarly, layoutTable,
// compareTitle/compareEyebrow) for pieces of this page the existing fields still couldn't express;
// every one of them is optional so every other service page is unaffected. See the build report for
// the full reconciliation notes.
export const ductlessMiniSplitPage: ServicePage = {
  primaryKeyword: 'ductless mini split los angeles',
  metaDescription:
    'Ductless mini-split service for homes and businesses across Los Angeles and Southern California, from ADUs to older homes. Schedule with Air Pro Solutions.',
  lede:
    'Need heating and cooling for a room, ADU, garage conversion, or older home without ductwork? Air Pro Solutions provides residential and commercial ductless mini-split service in Los Angeles and across the South Bay, Orange County, and the Inland Empire.',
  heroProof: [
    { icon: 'check', label: 'Licensed HVAC contractor' },
    { icon: 'home', label: 'Residential and commercial' },
    { icon: 'bolt', label: 'Heat-pump models heat and cool' },
    { icon: 'pin', label: '4 Southern California regions' },
  ],
  serviceType: 'Ductless Mini-Split Service',
  ctaLabel: 'Schedule Mini-Split Service',
  trustStripLicenseLabel: 'California license class',
  symptomsTitle: 'Common signs your mini-split needs service',
  symptomsId: 'signs',
  processTitle: 'How a mini-split project works',
  appliesTitle: 'Residential and commercial mini-split service',
  regionTitle: 'Mini-split service across Southern California',
  regionLinkVerb: 'Mini-split service',
  faqTitle: 'Mini-split questions Southern Californians ask',
  // TODO(copy): confirm this Final CTA heading/body wording once the original client copy is
  // available. The original client copy for this section never arrived; this substitutes the
  // established pattern used by every other live service page (heading "Get your [service]
  // scheduled", body "Call us or request service online.").
  finalCtaTitle: 'Get your mini-split service scheduled',
  finalCtaBody: 'Call us or request service online.',
  answer: {
    lead: 'A ductless mini-split',
    body:
      ' is a heating and cooling system with an outdoor unit and one or more indoor units connected by refrigerant lines, so it conditions rooms without a full duct system. Many models are heat pumps that both cool and heat. It suits ADUs, garage conversions, additions, older homes, and rooms the central system does not reach well, and it can serve one room or several. The right design depends on the property: the room load, the layout, electrical capacity, permits, and where the equipment can go.',
  },
  decision: {
    eyebrow: 'Start here',
    title: 'What are you trying to do?',
    intro: 'Pick the line that sounds like your situation.',
    columns: 4,
    cards: [
      { icon: 'home', title: 'Add cooling and heating to one room', body: 'A room, ADU, garage conversion, or addition with no usable ductwork.', href: '#fit', ctaLabel: 'See where mini-splits fit' },
      { icon: 'doc', title: 'Serve several rooms', body: 'Compare single-zone, multi-zone, and concealed ducted layouts.', href: '#systems', ctaLabel: 'Compare system types' },
      { icon: 'wrench', title: 'My mini-split has a problem', body: 'Weak cooling, water leaks, error codes, or noise point to a fault that needs diagnosis.', href: '#signs', ctaLabel: 'See warning signs' },
      { icon: 'building', title: 'Compare with central AC or a furnace', body: 'Decide whether ductless, ducted, or a mix fits how you use the building.', href: '/ac-installation/', ctaLabel: 'See AC installation' },
    ],
  },
  urgency: {
    title: 'When to call right away',
    intro: 'Call promptly if:',
    items: [
      'Water is leaking near electrical components or onto finishes',
      'You smell burning from the indoor or outdoor unit',
      'The breaker keeps tripping when the system starts',
      'Cooling has failed during high heat, especially with someone in the home who is vulnerable to heat',
      'A commercial outage is affecting your operations',
    ],
    closing: 'If you see smoke or fire, or feel immediate electrical danger, get everyone out and call emergency services first.',
  },
  diagnosisEyebrow: 'Diagnosis',
  diagnosisTitle: 'What mini-split symptoms can mean',
  diagnosisIntro: 'A symptom rarely points to one cause. These are the areas a technician tests, not a diagnosis.',
  diagnosis: [
    { notices: 'The head runs but the air is not cool or warm', causes: 'Filters, airflow, settings, sensors and controls, refrigerant performance, and the outdoor unit. Causes range from a dirty filter to a refrigerant or compressor problem.' },
    { notices: 'One zone differs from another', causes: 'Indoor-head airflow, zone controls, how capacity is shared across heads on a multi-zone system, and installation conditions.' },
    { notices: 'Water drips from the indoor unit', causes: 'The condensate drain path, any condensate pump, and installation conditions.' },
    { notices: 'An error code or repeated restarts', causes: "The code against the manufacturer's documentation, sensors, control boards, and the electrical supply." },
    { notices: 'Weak airflow after cleaning the filter', causes: 'Airflow restrictions, the indoor fan, coil condition, and controls.' },
    { notices: 'The outdoor unit is noisy or does not run', causes: 'The outdoor fan, compressor, electrical components, and mounting and vibration.' },
    { notices: 'A breaker trips at start-up', causes: 'The electrical supply, circuit protection, the outdoor unit, and wiring. Electrical safety diagnosis is required.' },
  ],
  // "Where it fits" card grid - renders via SystemsGrid, positioned (with `systemsEarly`) right after
  // the diagnosis table and before the process steps, matching this page's approved content order.
  fitGrid: {
    id: 'fit',
    eyebrow: 'Where it fits',
    title: 'Places a ductless mini-split often makes sense',
    items: [
      { icon: 'home', name: 'ADU or garage conversion', body: 'A newly conditioned space can get its own heating and cooling. Load, insulation, permits, and electrical capacity still apply.' },
      { icon: 'home', name: 'Older home without ducts', body: 'Ductless can avoid extensive new duct runs. Wall construction, electrical condition, and historic-district rules are specific to each property.' },
      { icon: 'wrench', name: 'A room the central system misses', body: 'A hot or cold room, bonus room, office, or addition can get its own control. A mini-split is not automatically better than adjusting the existing system.' },
      { icon: 'building', name: 'Condo or townhome', body: 'Feasibility depends on HOA approval, outdoor-unit placement, condensate routing, noise rules, and electrical capacity.' },
      { icon: 'check', name: 'Replacing room-by-room equipment', body: 'Window units, portable AC units, electric resistance heating, or aging room-by-room equipment can be candidates for replacement.' },
      { icon: 'building', name: 'Small commercial space', body: 'Offices, retail rooms, tenant suites, and equipment rooms may suit ductless. Load calculations, ventilation, access, and code can change the design.' },
    ],
  },
  systemsTitle: 'Systems we service',
  systemsId: 'systems',
  systemsIntro: 'Tell us what you have or what you are planning and we will confirm we can work with it.',
  systemsNote: {
    before: 'Rooftop and packaged units are a different system type. See ',
    linkLabel: 'commercial HVAC',
    linkHref: '/commercial-hvac/',
    after: ' for those.',
  },
  // Moves the fitGrid + systems SystemsGrid block from its default position (after the visit-scope
  // section, before the refrigerant callout) to right after the diagnosis table and before the
  // process steps - matching this page's approved content order, which puts "where it fits" and
  // "systems we service" ahead of "how it works" rather than after it.
  systemsEarly: true,
  systems: [
    { name: 'Single-zone mini-split', icon: 'wrench', body: 'One outdoor unit paired with one indoor unit. Suited to one room, a small addition, an ADU, an office, or a garage conversion when it is sized correctly.' },
    { name: 'Multi-zone mini-split', icon: 'wrench', body: 'One outdoor unit connected to several indoor units, each with its own control. Capacity sharing and line-set design have to be worked out for the specific rooms.' },
    { name: 'Heat-pump models', icon: 'bolt', body: 'A heat pump provides both cooling and heating. Many mini-splits are heat pumps, so confirm the heating capability of the specific model.' },
    { name: 'Ceiling cassette', icon: 'home', body: 'An indoor unit recessed into the ceiling. It needs ceiling space, condensate routing, and access.' },
    { name: 'Floor-mounted indoor unit', icon: 'home', body: 'A low, wall-mounted indoor unit that can suit some retrofit layouts. Model availability varies.' },
    { name: 'Concealed ducted mini-split', icon: 'doc', body: 'A mini-split air handler connected to short duct runs, for occupants who prefer less visible supply grilles. Duct design and access matter.' },
  ],
  visitEyebrow: 'The project',
  visitTitle: 'What is included and what can cost extra',
  visitIncludesTitle: 'A typical installation may include',
  visitIncludes: [
    'The outdoor unit and the specified indoor unit(s)',
    'Standard mounting hardware',
    'Standard line-set, communication wire, and condensate components',
    'An outdoor pad, wall bracket, or approved equipment support',
    'Start-up and functional verification',
    'A basic walkthrough of the system for you',
  ],
  visitExtraTitle: 'What can add to the cost',
  visitExtra: [
    'Permit fees and processing, if not included in the quote',
    'An electrical panel upgrade, subpanel, new circuit, trenching, or long circuit runs',
    'Extra-long line-set routing, line covers, and wall or roof penetrations',
    'Crane lifts, roof work, elevated platforms, seismic engineering, or specialty brackets',
    'Drywall, stucco, paint, cabinetry, or landscaping restoration',
    'HOA applications, architectural review, tenant coordination, or after-hours commercial work',
    'Extended labor warranty, a maintenance plan, smart controls, or accessories',
  ],
  visitExtraNote: 'Ask which of these apply to your project and get them in writing before you approve the work.',
  // "Single-zone, multi-zone, or concealed ducted?" layout comparison table, rendered right after the
  // visit-scope section and before the refrigerant callout.
  layoutTable: {
    eyebrow: 'Choosing a layout',
    title: 'Single-zone, multi-zone, or concealed ducted?',
    columns: ['Option', 'Often fits', 'Plan for'],
    rows: [
      ['Single-zone', 'One room, an addition, an ADU, an office, or a garage conversion', 'One indoor unit per outdoor unit and a system sized to that space'],
      ['Multi-zone', 'Several rooms that need separate temperature control', 'How capacity is shared across heads, longer line-set runs, and the electrical scope'],
      ['Concealed ducted', 'Occupants who prefer less visible supply grilles', 'Short duct runs, duct design, and access for the air handler'],
    ],
    note: 'A mini-split can sometimes take the place of central equipment, but whether one system can replace all of your existing equipment depends on load calculations, layout, electrical capacity, insulation, and how you use each room. It is decided property by property.',
  },
  refrigerant: {
    title: 'Which refrigerant will a new mini-split use?',
    boldLead: 'It depends on the equipment.',
    body:
      ' The EPA states that the limit on refrigerant global-warming potential applies to new residential and light-commercial air-conditioning and heat-pump systems installed on or after January 1, 2026, and requires a refrigerant below 700 GWP. Existing R-410A systems can still be serviced. Newer refrigerants can be A2L-classified, and safety requirements vary by matched equipment, so the refrigerant should follow the manufacturer\'s instructions for the exact system.',
    // TODO(copy): restore "listed under Sources below" wording once the Sources section is built.
    sourceText: 'Source: U.S. EPA, HFC Phasedown FAQ.',
  },
  pricingTitle: 'What affects mini-split cost',
  pricingIntro:
    'Mini-split pricing depends on the design and the site, not only the number of rooms. Ask for a written scope that names the equipment, the zones, the electrical work, the permits, and the total before work begins.',
  pricingColumns: ['Cost driver', 'What moves the price'],
  priceFactors: [
    { item: 'Zones and indoor units', drivers: 'The number of heads, and single-zone versus multi-zone outdoor equipment' },
    { item: 'Capacity and efficiency', drivers: 'Required heating and cooling capacity, the efficiency rating, and the equipment model' },
    { item: 'Indoor-unit type', drivers: 'Wall mount, ceiling cassette, floor mount, or concealed ducted air handler' },
    { item: 'Line-set and access', drivers: 'Line length, routing, concealment, wall or roof penetrations, and the outdoor-unit location' },
    { item: 'Condensate', drivers: 'Drainage routing and whether a condensate pump is needed' },
    { item: 'Electrical', drivers: 'A dedicated circuit, disconnect, panel or subpanel work, trenching, and service upgrades' },
    { item: 'Permits and code', drivers: 'Permit fees, plan review, inspections, Title 24 documentation, and applicable verification' },
    { item: 'Site conditions', drivers: 'HOA coordination, tenant scheduling, after-hours commercial work, finish repair, and structural changes' },
  ],
  pricingClosing: 'Sizing is specific to each property. There is no universal rule for how many square feet one system covers.',
  // Overrides the shared CompareTable's default eyebrow/heading ("Not sure which you need?" /
  // "Repair or replace?") with this page's approved wording. Optional so every other service page
  // keeps its existing generic heading.
  compareEyebrow: 'Existing system?',
  compareTitle: 'Repair or replace a mini-split?',
  repairReplaceExtra: {
    paragraphs: [],
    linkText: 'Compare AC repair and replacement options',
    linkHref: '/ac-installation/',
  },
  rulesEyebrow: 'The rules',
  rulesTitle: 'Licensing, permits, and energy-code basics',
  rules: [
    { title: 'Licensing', body: 'California requires a CSLB-licensed contractor for projects valued at $500 or more in labor and materials. The C-20 classification covers installation, maintenance, service, and repair of air-conditioning systems and their associated ducts, controls, and filters. You can verify a contractor\'s license, bond, workers\' compensation status, and history on the CSLB website.' },
    { title: 'Permits', body: 'New and replacement installations are typically permitted work, and the city or county where the property is located issues the permit and handles inspections. New circuits, disconnects, or panel work can involve separate electrical scope. We can explain the permit path before work begins.' },
    { title: 'Energy code', body: 'The 2025 California Energy Code applies to permit applications submitted on or after January 1, 2026. Depending on the scope of your project, it may need Title 24 documentation and field verification.' },
  ],
  incentives: {
    eyebrow: 'Incentives',
    heading: 'Rebates and incentives that may apply',
    lead: 'Utility and state programs change often and can run out of funds. Whether one applies depends on your utility, income, equipment, and address. Confirm with the program before you buy.',
    items: [
      {
        name: 'LADWP',
        headline: '$1,500 to $2,500 per ton',
        body: 'LADWP lists this range for qualifying ductless mini-split and multi-split heat-pump systems, by efficiency tier. It applies to active LADWP residential electric customers. You apply after purchase and installation, within 12 months of purchase, and funds are limited and not guaranteed.',
        link: { label: 'LADWP Consumer Rebate Program', href: 'https://www.ladwp.com/residential-services/assistance-programs/consumer-rebate-program', external: true },
      },
      {
        name: 'SCE',
        headline: 'Varies',
        body: 'Southern California Edison lists rebates and financial assistance, and its income-qualified Energy Savings Assistance program serves eligible households. Amounts, eligibility, and availability change, so confirm current offers for your address.',
        link: { label: 'SCE Rebates and Financial Assistance', href: 'https://www.sce.com/save-money/rebates-financial-assistance', external: true },
      },
      {
        name: 'CEC',
        headline: 'Check status',
        body: "California's single-family HEEHRA rebates were fully reserved statewide as of February 24, 2026, and TECH Clean California listed general single-family heat-pump incentives as fully reserved as of November 14, 2025. The state's Equitable Building Decarbonization program may support eligible households.",
        link: { label: 'California Energy Commission rebate programs', href: 'https://www.energy.ca.gov/programs-and-topics/programs/inflation-reduction-act-residential-energy-rebate-programs', external: true },
      },
    ],
  },
  appliesTo: [
    { label: 'Single-family homes', icon: 'home' },
    { label: 'Condos and townhomes', icon: 'building' },
    { label: 'ADUs and garage conversions', icon: 'home' },
    { label: 'Older homes without ducts', icon: 'home' },
    { label: 'Small offices and retail', icon: 'building' },
    { label: 'Room additions', icon: 'home' },
  ],
  appliesParagraph:
    'Access matters as much as the equipment. HOA rules, balconies and roofs, wall construction, and electrical capacity all change how a mini-split is planned. We assess the property and the equipment, not the ZIP code.',
  appliesLinks: [
    { label: 'Commercial HVAC', href: '/commercial-hvac/' },
    { label: 'Residential HVAC', href: '/residential-hvac/' },
  ],
  regionIntro: [
    "Southern California is not one climate. NOAA's Los Angeles climate documentation describes marine air covering the coastal plain much of the year, with the coastal ranges buffering the interior, so conditions can differ sharply between nearby coastal and inland locations. That is why a mini-split is sized to the room, not to a county.",
    'South Coast AQMD names ozone and particulate matter as the region\'s primary air pollutants, and its area includes all of Orange County and large parts of Los Angeles, Riverside, and San Bernardino counties. For a mini-split, that is a reason to keep washable indoor filters clean as the manufacturer directs. It is not a reason to expect a mini-split to remove smog. California reliability reporting also cites extreme-weather demand during summer heat, which is a reason to plan cooling before a heat event.',
  ],
  regionConditions: [
    { regionSlug: 'los-angeles-county', body: 'A large, varied market. Coastal areas have ocean moderation and inland and valley areas can run hotter, so the design follows the room, the house, and how you use the space. Mini-splits are often considered for older homes, additions, and rooms the central system does not reach well.' },
    { regionSlug: 'south-bay', body: 'Marine influence generally moderates temperatures, but upper floors, west-facing rooms, offices, and sun-exposed additions can still call for targeted cooling. A mini-split is one way to add it where ductwork is limited.' },
    { regionSlug: 'orange-county', body: 'Orange County includes both coastal and inland conditions, so the right system depends on the property. Sizing, placement, and keeping washable indoor filters clean matter more than a countywide rule. HOA rules for outdoor equipment vary by property.' },
    { regionSlug: 'inland-empire', body: 'Inland areas have less marine influence and can see stronger heat events, so correct sizing, insulation, shade, and electrical readiness matter more. Whether a mini-split fits a specific room is a load-based decision.' },
  ],
  regionClosing: "Don't see your city? Call us and we will confirm coverage.",
  // "LA County" shorthand for this one region, matching the approved copy; the other three regions
  // already match the default "{regionLinkVerb} in {region name}" formula, so they're left unset.
  regionLinkLabels: {
    'los-angeles-county': 'Mini-split service in LA County',
  },
  proofHeading: 'A licensed contractor rated 4.8 stars on Google',
  proofBody: 'Ask any contractor how the system will be sized, who pulls the permit, and what the written scope includes. You should have clear answers before you approve work.',
  // Icon overrides for this page's related-service cards, since the approved copy specifies icons
  // that differ from both each service's own default icon and the shared relatedIcons fallback map
  // in src/app/[service]/page.tsx. Reuses the `relatedIconOverrides` field the furnace-installation
  // build already added to ServicePage (no type change needed here).
  relatedIconOverrides: {
    'ac-repair': 'check',
    'ac-maintenance': 'doc',
    'heat-pump-services': 'bolt',
  },
  moreLinks: [
    { text: 'Heating repair', href: '/heating-repair/' },
    { text: 'Furnace installation', href: '/furnace-installation/' },
    { text: 'Ductwork options', href: '/ductwork/' },
    { text: 'Indoor air quality', href: '/indoor-air-quality/' },
    { text: 'Commercial HVAC', href: '/commercial-hvac/' },
  ],
  // TODO(data): Sources list for ductless-mini-split never arrived from the client-side prompt; add
  // once provided. Do not invent citations. `sources` is intentionally left unset below, so the
  // SourcesList section does not render (see the `{page.sources && <SourcesList .../>}` guard in
  // src/app/[service]/page.tsx).
  faqs: [
    {
      q: 'What is a ductless mini-split?',
      a: 'A ductless mini-split is an HVAC system with an outdoor unit and one or more indoor units connected by refrigerant lines and controls. It can condition individual rooms without a full central duct system.',
    },
    {
      q: 'Do ductless mini-splits provide both heating and cooling?',
      a: 'Many do. Heat-pump mini-splits provide both cooling and heating. Confirm the heating capability and performance ratings of the specific model before you buy.',
    },
    {
      q: 'How much does a ductless mini-split cost in Southern California?',
      a: 'It depends on the design of the system, not only the number of rooms. The number of zones and indoor units, capacity, equipment efficiency, line-set routing, electrical work, condensate drainage, permits, and access all move the price. Ask for a written scope that lists the equipment, the number of zones, the electrical work, permits, and exclusions before you approve anything.',
    },
    {
      q: 'Do I need a permit for a mini-split in California?',
      a: 'New and replacement installations are generally permitted work, and the requirements are set by the city or county where the property is located. Permit, Title 24, and inspection requirements depend on the scope of the project, so confirm them for your address before work begins.',
    },
    {
      q: 'How long does mini-split installation take?',
      a: 'It depends on the project. A single-zone system is usually a shorter job than a multi-zone system. Electrical work, line-set routing, access, permitting, and inspection can extend the timeline. You should get a schedule estimate after the on-site assessment.',
    },
    {
      q: 'Is a single-zone or multi-zone mini-split better?',
      a: 'It depends on how many rooms need independent temperature control. A single-zone system pairs one outdoor unit with one indoor unit. A multi-zone system connects several indoor units to one outdoor unit. Room layout, total load, line-set routing, and budget decide which one fits.',
    },
    {
      q: 'Can a mini-split cool an ADU, converted garage, or room addition?',
      a: 'Often, yes. A mini-split can be a practical choice for a converted garage, ADU, or addition where extending ducts is impractical. The space still needs a load assessment and a review of insulation, permits, electrical capacity, condensate drainage, and equipment placement.',
    },
    {
      q: 'Why is my mini-split leaking water?',
      a: 'Water at an indoor unit can come from a condensate drain problem, an installation condition, or another fault. Turn the system off if water is reaching electrical components or finishes, and arrange a professional diagnosis. The cause cannot be confirmed without inspecting the system.',
    },
    {
      q: 'Why is my mini-split not cooling?',
      a: 'Poor cooling can involve airflow restrictions, settings, controls, refrigerant issues, electrical problems, or outdoor-unit faults. Clean accessible filters only as your manufacturer directs. If cooling is still poor, have a technician diagnose it.',
    },
    {
      q: 'Are rebates available for ductless mini-split heat pumps?',
      a: 'Some may be, but funding and eligibility change. LADWP lists rebates of $1,500 to $2,500 per ton for qualifying ductless mini-split heat-pump systems for its residential electric customers. Southern California Edison programs vary by eligibility and funding. California\'s single-family HEEHRA rebates were fully reserved statewide as of February 24, 2026. Check each program before you buy.',
    },
  ],
  // TODO(copy): client review of every FAQ answer above before launch.
};
