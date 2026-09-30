import type { ServicePage } from '@/content/services';

// TODO(data): the Southern California market price range ($3,000-$12,000 installed) and the Los
// Angeles/Orange County/Inland Empire cost-guide figures in FAQ 2 are published third-party market
// data, not an AIRPRO SOLUTIONS quote. Client approval needed before this ships - see CLAUDE.md
// "never fabricate business data".
// TODO(data): LADWP, SoCalGas, and TECH/HEEHRA rebate programs and figures below need to be
// re-verified the week this page ships - program funding and terms change without notice.
// TODO(data): confirm Air Pro actually performs the on-site assessment, written proposal, and
// customer walkthrough described in the process, scope, and proposal-checklist sections below - the
// copy is written as guidance for the reader, not a stated Air Pro workflow.
// TODO(data): confirm the CSLB record for licenses #1126691 and #50251 shows the C-20 classification
// before launch (trust strip, proof block, rules section).
// TODO(data): the safety wording in "Safety comes before scheduling" needs Air Pro safety-policy
// review before launch.
// TODO(data): confirm Air Pro actually installs heat pumps, dual-fuel systems, and ducted/ductless
// mini-splits before the "Furnace, heat pump, or something else?" and "Gas furnace or heat pump"
// comparison sections ship - both currently describe these as options without stating Air Pro
// performs the installation.
// TODO(copy): client review of every FAQ answer below before launch.
//
// No prices, appointment windows, warranty terms, technician certifications, or same-day/24-7/
// emergency-availability wording appear anywhere on this page - none are confirmed. See CLAUDE.md
// "Claims that must not ship".

// Full template content for /furnace-installation/. Reuses the same ServicePage shape and shared
// section components already built out for /ac-repair/, /ac-installation/, /ac-maintenance/, and
// /heating-repair/ - see the build report for why a second, parallel content shape
// (src/content/service-pages/) was not introduced. A handful of new optional ServicePage/component
// fields (symptomsEyebrow, diagnosisColumns, comparisonTable, processNote, checklist, appliesEyebrow,
// sourcesEyebrow, relatedIconOverrides, refrigerant.accent/body2, incentives.items[].headline,
// incentives.closingNote) were added for pieces of this page the existing fields couldn't already
// express; every one of them is optional so the other four service pages are unaffected.
export const furnaceInstallationPage: ServicePage = {
  primaryKeyword: 'furnace installation los angeles',
  metaDescription:
    'Furnace installation in Los Angeles, the South Bay, Orange County, and the Inland Empire. See what affects cost and timing, then request an estimate.',
  lede:
    'AIRPRO SOLUTIONS provides furnace installation and replacement in Los Angeles and across the South Bay, Orange County, and the Inland Empire. Here is what the work involves, what affects the price, and what your written proposal should show.',
  heroProof: [
    { icon: 'check', label: 'Licensed HVAC contractor' },
    { icon: 'home', label: 'Furnace replacement for homes' },
    { icon: 'flame', label: 'Gas furnace and heat pump options' },
    { icon: 'pin', label: '4 Southern California regions' },
  ],
  serviceType: 'Furnace Installation',
  ctaLabel: 'Request a Furnace Estimate',
  trustStripLicenseLabel: 'California license class',
  symptomsEyebrow: 'Signs to look at',
  symptomsTitle: 'When a furnace may need replacing',
  processTitle: 'What a furnace installation involves',
  appliesEyebrow: 'Your property',
  appliesTitle: 'What changes from one property to the next',
  regionTitle: 'Furnace installation across Southern California',
  regionLinkVerb: 'Furnace installation', // unused fallback: regionLinkLabels below covers all 4 regions
  sourcesEyebrow: 'References',
  faqTitle: 'Furnace installation questions Southern Californians ask',
  finalCtaTitle: 'Get your furnace project scoped',
  finalCtaBody: 'Call us or request an estimate online.',
  answer: {
    lead: 'Furnace installation',
    body:
      ' is the removal of an aging or failed furnace, or the first installation of a new one, followed by connection, startup, and testing of the replacement. A complete job covers the furnace itself and the parts around it: duct transitions, gas and electrical connections, venting, drainage where needed, controls, and any permit or inspection the city requires. Replacement should follow an on-site diagnosis, because the same symptom can come from a repairable fault. The right equipment depends on the home, its ducts, and whether you also plan to change the air conditioner or move to a heat pump.',
  },
  // TODO(data): this safety wording needs Air Pro safety policy review before launch.
  urgency: {
    title: 'Safety comes before scheduling',
    intro: 'Treat these as safety situations, not routine service calls:',
    items: [
      "Gas odor: follow your gas utility's emergency guidance and avoid switches, flames, and equipment near a suspected leak",
      'Carbon-monoxide alarm: move everyone to fresh air and call emergency services or the emergency contact the alarm directs you to',
      'Smoke, sparks, or a burning odor: stop using the equipment where it is safe to do so and get immediate professional or emergency guidance',
      'Suspected venting problems: do not keep running the furnace until it has been inspected',
    ],
    closing: 'If there is smoke, fire, or immediate danger, get everyone out and call emergency services first.',
  },
  diagnosisEyebrow: 'Diagnosis first',
  diagnosisTitle: 'A symptom is not a diagnosis',
  diagnosisIntro: 'None of these signs proves a furnace has to be replaced. Each can also come from a repairable fault, so the on-site diagnosis decides.',
  diagnosisColumns: ['What you notice', 'What may be behind it'],
  diagnosis: [
    { notices: 'Repeated no-heat events or failed starts', causes: 'Ignition components, controls, the thermostat, gas supply, or an airflow restriction. A repair may fix it, or the pattern may point to a system near the end of its useful life.' },
    { notices: 'Uneven heating between rooms', causes: 'Duct design, return-air limits, insulation, zoning, thermostat placement, or equipment sizing. A new furnace does not correct a duct problem by itself.' },
    { notices: 'Noise, vibration, or repeated blower cycling', causes: 'The blower, airflow restrictions, controls, or a loose component. Diagnosis separates a repairable fault from a worn system.' },
    { notices: 'Runs continuously without reaching the setting', causes: 'Airflow, ducts, thermostat operation, or a furnace that is undersized for the home.' },
    { notices: 'A repair quote that is large compared with the equipment', causes: 'Compare the diagnosed repair cost, reliability history, and any safety or venting findings against replacement.' },
  ],
  processNote:
    'A straightforward replacement may be completed in a day, while projects involving ductwork, venting, gas or electrical changes, accessibility constraints, a new heat pump or AC system, permits, or commercial equipment can take longer. The contractor should confirm the expected installation and inspection schedule in writing.',
  visitEyebrow: 'The scope',
  visitTitle: 'What is included and what can cost extra',
  visitIncludesTitle: 'A transparent furnace installation scope covers',
  visitIncludes: [
    'Site assessment and an equipment-selection discussion',
    'Removal and disposal of the existing furnace',
    'Placement of the new furnace and connection to existing or modified duct transitions',
    'Gas, electrical, venting, drain, control, and thermostat work that is listed in the scope',
    'Startup and operational testing',
    'Permit administration and inspection coordination, if included in the signed scope',
    'Manufacturer literature and equipment information',
    'A customer walkthrough and basic operating instructions',
  ],
  visitExtraTitle: 'What can add to the cost',
  visitExtra: [
    'Duct repair, replacement, added returns, sealing, or transition fabrication',
    'Venting or flue changes, including changes tied to furnace efficiency or type',
    'Gas-line resizing, relocation, sediment trap work, or shutoff changes',
    'Electrical circuit, disconnect, panel, breaker, or control upgrades',
    'Condensate drainage or pump work when the equipment or location requires it',
    'Attic, crawlspace, closet, rooftop, or restricted-access labor',
    'Asbestos, lead, water damage, code deficiencies, or structural changes',
    'Thermostat upgrades and zoning changes',
    'A separate AC condenser, coil, air handler, or heat pump',
    'Permit fees, third-party verification, and city-required corrections, if not in the scope',
  ],
  visitExtraNote: 'Your written proposal should state whether permit fees, duct modifications, gas or electrical upgrades, thermostat work, and required verification are included or priced separately.',
  systemsTitle: 'Furnace, heat pump, or something else?',
  systemsIntro: 'A furnace is not the only way to heat a home. This is how the common systems relate to a furnace installation.',
  // TODO(data): confirm Air Pro installs heat pumps, dual-fuel systems, and ducted/ductless mini-splits
  // before this comparison ships - see the file-level TODO above.
  systems: [
    { name: 'Gas forced-air furnace', icon: 'flame', body: 'A gas-fired appliance that heats air and sends it through ducts. This is the conventional furnace replacement project.' },
    { name: 'Split AC and gas furnace', icon: 'wrench', body: 'An outdoor condenser plus an indoor furnace, blower, and evaporator coil. A furnace swap means checking whether the AC-side parts still match.' },
    { name: 'Dual-fuel system', icon: 'wrench', body: 'A heat pump paired with a gas furnace as backup. Whether it suits a property depends on the home and its equipment.' },
    { name: 'Central heat pump', icon: 'home', body: 'One system that heats and cools, commonly through ducts. A possible alternative to a gas furnace, with incentives that depend on your utility.' },
    { name: 'Ducted and ductless mini-splits', icon: 'home', body: 'Heat-pump systems for homes with limited ductwork or a need for zone control. A ductless system is not a conventional furnace installation.' },
    { name: 'Packaged and rooftop units', icon: 'building', body: 'Heating and cooling in one outdoor cabinet, on a roof or pad. This is a different job from swapping an indoor furnace.' },
  ],
  // Composed inline in page.tsx via the shared DataTable, the same pattern already used for
  // ac-maintenance's `catches` section - a self-contained one-off table, not a new component file.
  comparisonTable: {
    eyebrow: 'Compare',
    title: 'Gas furnace or heat pump',
    intro: 'A heat pump provides heating and cooling. A gas furnace is part of a forced-air heating system. The right choice depends on the home, the existing system, energy goals, and project scope.',
    columns: ['Factor', 'Gas furnace', 'Heat pump'],
    rows: [
      ['Heating and cooling', 'The heating half of a forced-air system. Cooling comes from a separate air conditioner.', 'Provides both heating and cooling.'],
      ['Ductwork', 'Uses the existing ducts, which still need a check for condition and airflow.', 'Can use existing ducts, ducted mini-splits, or ductless heads. Limited ducts make the comparison worth having.'],
      ['Utilities', 'Needs gas service, venting, and combustion air.', 'Needs enough electrical capacity. The panel and circuit are part of the scope.'],
      ['Efficiency rating', 'AFUE.', 'The heating and cooling ratings listed on the selected equipment.'],
      ['Incentives', 'SoCalGas rebates for qualifying furnaces at 92% AFUE or higher.', 'LADWP rebates for qualifying heat-pump HVAC. Statewide single-family HEEHRA funding is fully reserved.'],
    ],
    note: 'Neither choice is better for every home. Existing ducts, gas service, electrical capacity, cooling needs, your utility territory, and incentives all point in different directions from one property to the next.',
  },
  refrigerant: {
    title: 'Furnace only, or the whole system?',
    accent: 'sky',
    boldLead: 'A like-for-like furnace replacement is not automatically a full HVAC replacement.',
    body: ' The blower, evaporator coil, controls, ducts, and existing air conditioner still need to be checked for compatibility, along with venting, electrical, and gas piping.',
    body2:
      'Refrigerant rules matter only when the project includes cooling equipment. The EPA states that a newly installed split system on or after January 1, 2026 must use a refrigerant with a global-warming potential below 700. Existing R-410A equipment can still be serviced, and a furnace-only replacement is not automatically a refrigerant project. If the work includes a new split AC or heat pump, confirm the equipment and installation requirements in the proposal.',
    sourceText: 'Source: U.S. EPA, HFC Phasedown FAQ (listed under Sources below).',
  },
  pricingTitle: 'What affects furnace installation cost',
  // TODO(data): the $3,000-$12,000 range is published market data, not an Air Pro quote. Needs client
  // approval before this ships - see the file-level TODO above.
  pricingIntro:
    'Published Southern California estimates vary widely. Consumer and local contractor sources put many furnace replacement projects at about $3,000 to $12,000 installed. The final price depends on equipment efficiency and size, access, ductwork, venting, gas and electrical changes, permit and verification requirements, and whether the project includes AC or heat pump equipment. These are published market estimates, not an AIRPRO SOLUTIONS quote. A site-specific written quote is required for an accurate price.',
  priceFactors: [
    { item: 'Equipment size and efficiency', drivers: 'Heating capacity, blower configuration, and AFUE level' },
    { item: 'Access', drivers: 'Attic, crawlspace, closet, roof, or restricted access adds labor' },
    { item: 'Duct modifications', drivers: 'Added returns, sealing, transitions, or replacement' },
    { item: 'Venting and combustion air', drivers: 'Flue changes, including those tied to furnace efficiency or type' },
    { item: 'Gas and electrical work', drivers: 'Line sizing, shutoffs, circuits, disconnects, and panel capacity' },
    { item: 'Permits and verification', drivers: 'Permit fees, inspections, documentation, and third-party verification' },
    { item: 'Scope beyond the furnace', drivers: 'A new AC coil, condenser, or heat pump changes the whole project' },
  ],
  pricingColumns: ['What moves the price', 'How it shows up in a quote'],
  pricingClosing: 'The quote should separate equipment, installation, permits, verification, and upgrades, so you can compare one proposal against another.',
  rulesEyebrow: 'The rules',
  rulesTitle: 'Licensing, permits, and energy-code basics',
  rules: [
    { title: 'Licensing', body: "California's C-20 classification covers installation, maintenance, service, and repair of warm-air heating, ventilation, and air-conditioning systems, including ducts, flues, controls, and filters. Verify an active license on the CSLB website before you sign a contract." },
    { title: 'Permits', body: 'Furnace replacement work may require a mechanical permit, energy-code documentation, inspection, or third-party verification depending on the equipment, scope, building type, and local jurisdiction. Ask which permits and inspections apply, who will pull the permit, and what documents you will receive at closeout.' },
    { title: 'Energy code', body: "California's 2025 Building Energy Efficiency Standards took effect January 1, 2026. Which compliance path applies depends on the permit date, scope, building type, climate zone, and jurisdiction, and not every replacement needs identical testing or forms." },
  ],
  // "Before you sign" proposal checklist - a second VisitScope-shaped block, distinct from the
  // visitIncludes/visitExtra scope pair above.
  checklist: {
    eyebrow: 'Before you sign',
    title: 'What your written proposal should show',
    includesTitle: 'Put these in writing',
    includes: [
      'Equipment model and efficiency (AFUE for a gas furnace)',
      'Removal and disposal of the old furnace',
      'Duct transitions or repairs',
      'Gas, electrical, and venting work',
      'Thermostat and control work',
      'Permit fees, inspections, and verification',
      'Startup and commissioning',
      'Exclusions',
      'Warranty terms, and who issues them',
    ],
    includesIcon: 'check',
    extraTitle: 'Questions to ask the installer',
    extra: [
      'Who pulls the permit and closes it out?',
      'Which inspections or verification apply in my city?',
      'Are my AC coil, ductwork, and thermostat compatible with the new furnace?',
      'What documents will I receive at closeout?',
      'What is the expected installation and inspection schedule?',
      'Is your CSLB license active, and does it include the C-20 classification?',
    ],
    extraIcon: 'doc',
  },
  appliesTo: [
    { label: 'Older homes', icon: 'home' },
    { label: 'Homes with limited or no ducts', icon: 'home' },
    { label: 'Condos and townhomes', icon: 'building' },
    { label: 'Multifamily units', icon: 'building' },
    { label: 'Newer tract homes', icon: 'home' },
    { label: 'Attic, crawlspace, and closet installs', icon: 'wrench' },
  ],
  appliesParagraph:
    'Older homes may need a field review of duct condition, furnace closet dimensions, venting, electrical capacity, access, and permit-triggered corrections. Condos and multifamily units can add HOA rules, common-area access, shared systems, equipment-location limits, and utility-meter questions. Newer tract homes often have central ducts, but the duct design, sizing, and replacement compatibility still need inspection. None of this can be settled before someone looks at the property.',
  appliesLinks: [
    { label: 'Commercial HVAC', href: '/commercial-hvac/' },
    { label: 'Residential HVAC', href: '/residential-hvac/' },
  ],
  // TODO(data): the incentive amounts and status below need to be re-verified the week this page
  // ships - program funding and terms change. See the file-level TODO above.
  incentives: {
    eyebrow: 'Incentives',
    heading: 'Rebates and incentives in 2026',
    items: [
      {
        name: 'SoCalGas',
        headline: '$1.40 to $25 per kBtuh',
        body: 'For qualifying ENERGY STAR gas furnaces at 92% AFUE or higher. The tiers are $1.40 for 92 to 94% AFUE, $10 for 95 to 96%, and $25 for 97% and up. Equipment must be purchased and installed January 1 to December 31, 2026. Funds are first come, first served until they run out.',
        link: { label: 'SoCalGas rebates', href: 'https://www.socalgas.com/savings/rebates-and-incentives', external: true },
      },
      {
        name: 'LADWP',
        headline: 'Up to $2,500 per ton',
        body: 'For qualifying heat-pump HVAC systems, including central, split, mini-split, and multi-split. You must be an LADWP residential customer with active electric service. Apply after installation, within 12 months of purchase.',
        link: { label: 'LADWP Consumer Rebate Program', href: 'https://www.ladwp.com/residential-services/assistance-programs/consumer-rebate-program', external: true },
      },
      {
        name: 'TECH Clean California',
        headline: 'Fully reserved',
        body: 'Statewide single-family heat-pump HVAC rebates under HEEHRA were fully reserved as of February 24, 2026, and new single-family applications are not being accepted. Check the program page for the current status.',
        link: { label: 'Current TECH status', href: 'https://techcleanca.com/incentives/single-family-incentives/', external: true },
      },
    ],
    closingNote: 'Program terms, funding, equipment eligibility, and application timing can change. Confirm the current terms with the program before you buy, and before you count a rebate in your budget.',
  },
  regionIntro: [
    'Southern California is not one climate. The California Energy Commission describes a Mediterranean region with hot, dry summers and cool, wet winters, where the coast is buffered by the ocean and inland areas warm more. NASA analysis found coastal Los Angeles and Orange County stayed cooler in heat waves, while valley areas including Riverside were drier and hotter. Climate helps explain how a home is used. It does not tell a technician which furnace a specific house needs.',
    'Wildfire smoke and ash are also a regional indoor-air concern. South Coast AQMD advises changing filters regularly, keeping a high-efficiency filter on hand, and using recirculation where available during smoke episodes. That raises the value of filter access and duct condition. It does not explain why any particular furnace failed.',
  ],
  regionConditions: [
    { regionSlug: 'los-angeles-county', body: 'The county spans coastal, valley, and mountain microclimates, and heat events have reached from the coast to inland zones. Equipment choice, duct condition, access, and permit authority vary by property and by city.' },
    { regionSlug: 'south-bay', body: 'The coast moderates ordinary conditions compared with inland areas, so comfort expectations differ. That does not promise a smaller load or a lower bill. The equipment still needs to be sized for the home.' },
    { regionSlug: 'orange-county', body: 'Coastal and inland Orange County properties can have different comfort and system-design needs. There is no single standard furnace setup for the county.' },
    { regionSlug: 'inland-empire', body: 'Riverside and San Bernardino valley areas run hotter and drier in heat events, so a furnace project often overlaps with AC replacement, heat pumps, ductwork, and a whole-system capacity check.' },
  ],
  regionClosing: "Schedule and equipment lead times can change with weather, permitting, equipment availability, and the scope of duct, venting, electrical, or full-system work. Ask for the current installation timeline before you approve a project. Don't see your city? Call us and we will confirm coverage.",
  regionLinkLabels: {
    'los-angeles-county': 'LA County service area',
    'south-bay': 'South Bay service area',
    'orange-county': 'Orange County service area',
    'inland-empire': 'Inland Empire service area',
  },
  // TODO(data): confirm the CSLB record for #1126691 and #50251 shows C-20 before launch.
  proofHeading: 'A licensed local contractor with a 4.8 Google rating',
  proofBody: 'AIRPRO SOLUTIONS holds California contractor licenses #1126691 and #50251 and serves homes and businesses across four Southern California regions.',
  // Icon overrides for the related-service cards below: heat-pump-services and ductwork otherwise
  // render with their own services.ts icons ('heat-pump' and 'duct') rather than this page's chosen
  // 'wrench'/'building' - see the build report for why the shared relatedIcons map in page.tsx was
  // not changed instead (it would also change ac-installation's and heating-repair's related cards,
  // which reference the same two services).
  relatedIconOverrides: {
    'heat-pump-services': 'wrench',
    ductwork: 'building',
  },
  moreLinks: [
    { text: 'Ductless mini-split', href: '/ductless-mini-split/' },
    { text: 'Indoor air quality and filtration', href: '/indoor-air-quality/' },
    { text: 'AC repair', href: '/ac-repair/' },
    { text: 'AC maintenance', href: '/ac-maintenance/' },
  ],
  sourcesColumns: 2,
  sources: [
    { label: 'California Energy Commission - Building Energy Efficiency Standards', url: 'https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards' },
    { label: 'California CSLB - C-20 classification', url: 'https://www.cslb.ca.gov/about_us/library/licensing_classifications/Licensing_Classifications_Detail.aspx?Class=C20' },
    { label: 'U.S. EPA - HFC phasedown FAQ', url: 'https://www.epa.gov/hfcs/frequent-questions-phasedown-hydrofluorocarbons' },
    { label: 'SoCalGas - Rebates and incentives', url: 'https://www.socalgas.com/savings/rebates-and-incentives' },
    { label: 'SoCalGas - 2026 Home Energy Efficiency Rebate application', url: 'https://www.socalgas.com/sites/default/files/2026-03/SCG-HEER-Application.pdf.pdf' },
    { label: 'LADWP - Consumer Rebate Program', url: 'https://www.ladwp.com/residential-services/assistance-programs/consumer-rebate-program' },
    { label: 'TECH Clean California - Single-family incentive status', url: 'https://techcleanca.com/incentives/single-family-incentives/' },
    { label: 'California Energy Commission - IRA residential rebate programs', url: 'https://www.energy.ca.gov/programs-and-topics/programs/inflation-reduction-act-residential-energy-rebate-programs' },
    { label: 'NASA JPL - Southern California heat-wave differences', url: 'https://www.nasa.gov/centers-and-facilities/jpl/nasa-maps-key-heat-wave-differences-in-southern-california/' },
    { label: 'California Energy Commission - Los Angeles regional climate report', url: 'https://www.energy.ca.gov/sites/default/files/2019-11/Reg%20Report-%20SUM-CCCA4-2018-007%20LosAngeles_ADA.pdf' },
    { label: 'South Coast AQMD - Wildfire smoke tips', url: 'https://www.aqmd.gov/home/air-quality/wildfire-health-info-smoke-tips' },
    { label: 'Angi - Los Angeles furnace installation cost guide', url: 'https://www.angi.com/articles/how-much-does-it-cost-install-new-furnace/ca/los-angeles' },
    { label: 'J Martin Indoor Air Quality - Orange County heating page', url: 'https://www.jmartiniaq.com/heating' },
    { label: 'Eagle Air - Inland Empire furnace replacement', url: 'https://eagleairco.com/heating-contractor/furnace-replacement/' },
    { label: 'MightyServ - Los Angeles furnace installation', url: 'https://mightyserv.com/heating/furnace-installation/' },
    { label: 'Air Comfort Experts - Pasadena furnace installation', url: 'https://www.aircomfortexperts.com/heating/furnace-installation/' },
  ],
  faqs: [
    {
      q: 'Do I need a permit to replace a furnace in California?',
      a: "It may be required. Furnace replacement can involve a local mechanical permit, energy-code documentation, inspection, or third-party verification, depending on the equipment, scope, building type, and local jurisdiction. Ask your contractor which permits apply, who will pull the permit, and what documents you will receive at closeout. California's 2025 Building Energy Efficiency Standards took effect January 1, 2026.",
    },
    {
      q: 'How much does furnace installation cost in Los Angeles?',
      a: 'Published estimates vary widely. A 2025 consumer cost guide for Los Angeles reports about $2,962 to $7,315 for a new furnace installation. Contractor-published ranges in Orange County and the Inland Empire run from about $4,500 to $12,000, depending on efficiency and installation complexity. Your price depends on equipment, access, ductwork, venting, gas and electrical work, permits, and whether AC or heat pump equipment is included. A site-specific written quote is the only accurate number.',
    },
    {
      q: 'How long does it take to install a furnace?',
      a: 'A straightforward replacement may take about a day. Ductwork, venting, gas or electrical changes, difficult access, a new heat pump or AC system, permits, and inspections can extend the timeline. Local contractors publish one day for many standard installations and one to two days for some general installations. Ask for the expected installation and inspection schedule in writing.',
    },
    {
      q: 'Should I repair or replace my old furnace?',
      a: 'Decide after an on-site diagnosis, not by age alone. Consider reliability, repair history, safety and venting findings, airflow, energy goals, compatibility with your AC or a heat pump, and the cost of required repairs compared with replacement.',
    },
    {
      q: 'Can I replace a furnace without replacing my air conditioner?',
      a: 'Sometimes. The contractor should verify that the furnace blower, evaporator coil, controls, ducts, and existing AC equipment remain compatible. If the project includes a new split AC or heat pump, refrigerant and system-compliance requirements may affect the scope.',
    },
    {
      q: 'Can a heat pump replace my gas furnace?',
      a: 'Yes, a heat pump can provide both heating and cooling. Whether it is the right replacement depends on the building, existing ductwork, electrical capacity, comfort goals, equipment design, available incentives, and local permit and code requirements. LADWP offers heat-pump HVAC rebates to qualifying residential electric customers, while statewide single-family HEEHRA funding is currently fully reserved.',
    },
    {
      q: 'Are there rebates for a new gas furnace?',
      a: 'Possibly. SoCalGas currently lists 2026 rebates for qualifying ENERGY STAR gas furnaces with at least 92% AFUE, subject to program terms and available funds. The tiers range from $1.40 to $25 per kBtuh based on AFUE. Confirm current terms on the SoCalGas rebate page before you buy.',
    },
    {
      q: 'What does AFUE mean?',
      a: 'AFUE stands for Annual Fuel Utilization Efficiency, a heating-efficiency measure used for gas furnaces. It is different from SEER2, which is used for air conditioners and heat pumps.',
    },
    {
      q: 'What should be included in a furnace installation estimate?',
      a: 'Ask for the scope in writing. That means the equipment model and efficiency, removal and disposal, duct transitions or repairs, gas and electrical work, venting, thermostat and control work, permit fees, inspections or verification, commissioning, exclusions, and warranty details.',
    },
    {
      q: 'Will a new furnace solve hot and cold rooms?',
      a: 'Not necessarily. Uneven comfort can be caused by duct design, return-air limitations, insulation, zoning, thermostat placement, room orientation, or equipment sizing. A replacement proposal should address whether airflow or ductwork changes are needed.',
    },
  ],
  // TODO(copy): client review of every FAQ answer above before launch.
};
