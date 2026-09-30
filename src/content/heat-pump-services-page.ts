import type { ServicePage } from '@/content/services';
import { siteConfig } from '@/content/site-config';

// TODO(data): confirm the primary keyword. The keyword-selection doc suggests "heat pump repair los
// angeles" as the higher-intent term; this build uses the broader "heat pump services los angeles"
// per the approved brief, since this one page intentionally covers repair, replacement, and
// maintenance together to avoid cannibalizing three separate URLs.
// TODO(data): confirm the CSLB record for licenses #1126691 and #50251 shows C-20 before launch
// (hero proof, trust strip, proof block, rules section).
// TODO(data): "Findings explained before repairs" (hero proof) and "repairs are quoted and approved
// before work begins" (process step 5) are the same unconfirmed-process status as every other service
// page built so far - confirm with the client before launch.
// TODO(data): the visit checklist under "A heat pump service visit may include" is not a confirmed
// Air Pro checklist; replace with Air Pro's own, and confirm what is included versus billed
// separately.
// TODO(data): no Air Pro price, diagnostic fee, visit length, financing term, plan tier, or labor
// warranty is stated anywhere on this page. Third-party price ranges were intentionally left out.
// TODO(data): response time, after-hours, and emergency availability are not stated. Do not link to
// /emergency-hvac/ from this page until the client confirms real always-on availability.
// TODO(data): commercial rooftop, ductless, and packaged capability (systems grid, audience chips) is
// unconfirmed. A2L technician training and manufacturer credentials are not claimed anywhere.
// TODO(data): re-check the LADWP rebate amount and the TECH Clean California reservation date at
// launch (checked 2026-09-29). No SoCalGas or SDG&E heat pump amount and no 2026 federal tax credit
// were verified, so none appear.
// TODO(data): confirm public/images/logo-mark.webp is present (reported present in prior builds).
// TODO(data): photo tiles are placeholders throughout this page. City lists under each region are
// intentionally omitted until coverage is confirmed (see CLAUDE.md doorway-page rule).
// TODO(copy): client review of every FAQ answer below before launch.
//
// No prices, appointment windows, warranty terms, technician certifications, or same-day/24-7/
// emergency-availability wording appear anywhere on this page - none are confirmed. See CLAUDE.md
// "Claims that must not ship".

// Full template content for /heat-pump-services/. Reuses the same ServicePage shape and shared
// section components already built out for /ac-repair/, /ac-installation/, /ac-maintenance/,
// /heating-repair/, /furnace-installation/, and /ductless-mini-split/ - see the build report for why a
// second, parallel content shape (src/content/pages/heat-pump-services.ts, as the original spec
// proposed) was not introduced. A handful of new optional ServicePage/component fields (basics,
// diagnosisNote + DiagnosisTable's `note` prop, warranty, urgency.ctaLabel, refrigerant.introBody,
// comparisonTable.id) were added for pieces of this page the existing fields couldn't already
// express; every one of them is optional so the other five service pages are unaffected. See the
// build report for the repairVsReplace and symptoms shape-reconciliation decisions (both left off the
// Service object; the page renders the fuller content instead).
export const heatPumpServicesPage: ServicePage = {
  primaryKeyword: 'heat pump services los angeles',
  metaDescription:
    'Heat pump services for homes and businesses across Los Angeles and Southern California: repair, replacement, and ductless systems. Schedule service.',
  lede:
    'AIRPRO SOLUTIONS provides heat pump services for homes and businesses in Los Angeles and across the South Bay, Orange County, and the Inland Empire. That covers diagnosing a heat pump that will not heat or cool, replacing an aging system, and maintaining one so problems are found early.',
  heroProof: [
    // TODO(data): confirm CSLB record shows C-20 for both license numbers.
    { icon: 'check', label: 'Licensed HVAC contractor' },
    { icon: 'home', label: 'Residential and commercial' },
    // TODO(data): confirm this is real Air Pro practice.
    { icon: 'doc', label: 'Findings explained before repairs' },
    { icon: 'pin', label: '4 Southern California regions' },
  ],
  serviceType: 'Heat Pump Services',
  ctaLabel: 'Schedule Heat Pump Service',
  processTitle: 'What happens during a heat pump service visit',
  appliesEyebrow: 'Who this is for',
  appliesTitle: 'Residential and commercial heat pump service',
  regionTitle: 'Heat pump service across Southern California',
  regionLinkVerb: 'Heat pump service', // unused fallback: regionLinkLabels below covers all 4 regions
  faqTitle: 'Heat pump questions Southern Californians ask',
  finalCtaTitle: 'Get your heat pump looked at',
  finalCtaBody: 'Call us or request service online.',
  answer: {
    lead: 'Heat pump services',
    body:
      ' cover diagnosing, repairing, replacing, and maintaining a system that both heats and cools. A heat pump moves heat between your building and the outdoors. To cool, it moves indoor heat out. To heat, a reversing valve flips the refrigerant flow. Because one system does both jobs, a heat pump that cools fine but will not heat needs a different diagnostic path than a standard AC problem. If you are comparing repair with replacement, the findings and options should come before any decision.',
  },
  decision: {
    eyebrow: 'Start here',
    title: 'Maintenance, repair, or replacement?',
    intro: 'Pick the line that sounds like your system today.',
    columns: 4,
    // Trailing "->" arrows from the approved copy are dropped from each ctaLabel: DecisionGrid already
    // renders its own arrow icon after the label, so keeping the glyph too would show two arrows (see
    // the same call already made on /ac-maintenance/'s decision cards).
    cards: [
      { icon: 'check', title: 'Heating and cooling normally', body: 'The system runs and switches modes as it should. Schedule a check before the next season.', ctaLabel: 'Schedule maintenance', href: '/contact/' },
      { icon: 'wrench', title: 'Not heating, not cooling, icing, or leaking', body: 'Weak output, a stuck mode, ice that does not clear, water, or new noises point to a fault.', ctaLabel: 'Request a diagnosis', href: '/contact/' },
      { icon: 'doc', title: 'Repeated repairs or an aging system', body: 'If breakdowns keep coming back, compare the repair with replacement using real numbers.', ctaLabel: 'See repair or replace', href: '#repair-replace' },
      { icon: 'alert', title: 'No cooling in dangerous heat', body: 'Burning odor, a tripping breaker, or water near electrical equipment calls for prompt help.', ctaLabel: `Call ${siteConfig.phone}`, href: siteConfig.phoneHref },
    ],
  },
  // TODO(data): safety wording pending Air Pro safety policy review (same status as every other
  // service page's urgency box).
  urgency: {
    title: 'When to call right away',
    intro: 'Do not wait for a routine visit if:',
    items: [
      'Cooling has failed during extreme heat',
      'Someone in the home is medically vulnerable to heat',
      'You smell burning or the breaker keeps tripping',
      'Water is near electrical equipment or spreading from the indoor unit',
      'Ice on the outdoor unit is not clearing',
      'A commercial outage is affecting your operations',
    ],
    closing:
      'Turn the system off if water is near electrical equipment. If you see smoke or fire, or feel immediate electrical danger, get everyone out and call emergency services first.',
    ctaLabel: 'Request a Diagnosis',
  },
  basics: {
    eyebrow: 'The basics',
    heading: 'How a heat pump heats, cools, and defrosts',
    cards: [
      { title: 'Cooling mode', body: 'The system moves heat from inside the building to the outdoors, the same job an air conditioner does. Airflow, coils, the condensate drain, and refrigerant all affect how well it works.' },
      { title: 'Heating mode', body: 'A reversing valve changes the direction of refrigerant flow, so the system moves heat from outdoor air into the building. A fault in the valve, its solenoid, or the controls can leave a system stuck in one mode.' },
      { title: 'Defrost cycle', body: 'In cool, damp weather the outdoor coil can frost, and the system periodically melts it. Some frost and a cloud of steam during that cycle can be normal. Ice that stays is a reason to call.' },
    ],
  },
  diagnosisEyebrow: 'Symptoms',
  diagnosisTitle: 'What you notice and what it can mean',
  diagnosisIntro: 'Symptoms can share causes, so none of these is a diagnosis. A technician confirms the fault before recommending work.',
  diagnosisColumns: ['What you notice', 'What can be behind it'],
  diagnosis: [
    { notices: 'Runs but does not heat or cool enough', causes: 'Airflow restriction, refrigerant issue, compressor or fan problem, controls, thermostat settings, or a reversing-valve fault. A diagnostic identifies which.' },
    { notices: 'Heats but will not cool, or cools but will not heat', causes: 'A stuck or failed reversing valve is one possible cause. Its solenoid, controls, refrigerant flow, and thermostat configuration are checked too.' },
    { notices: 'Outdoor unit is iced over and does not clear', causes: 'Restricted airflow, low refrigerant, water runoff freezing, or a defrost problem. Brief frost and steam during a normal defrost cycle can be normal. Persistent ice is not.' },
    { notices: 'Water near the indoor unit, closet, or ceiling', causes: 'A blocked condensate drain, a drain-pan problem, coil freeze and thaw, or an installation issue. Turn the system off if water is near electrical equipment.' },
    { notices: 'Grinding, rattling, squealing, clicking, or vibration', causes: 'A fan motor, compressor, contactor, loose component, or defrost or control issue. Noise is not diagnosed remotely, so it needs an inspection.' },
    { notices: 'Higher electric bill with no change in weather or use', causes: 'Reduced performance, airflow restriction, backup heat running, controls, refrigerant, or equipment age. A bill increase is a reason to evaluate performance and does not point to one failure.' },
    { notices: 'Turns on and off repeatedly', causes: 'A thermostat or control issue, airflow restriction, sizing or electrical problem, or a refrigerant or compressor condition. Short cycling wears equipment, so it warrants a diagnosis.' },
    { notices: 'Breaker trips or you smell burning', causes: 'An electrical fault, motor or compressor problem, or wiring or component failure. Turn the system off and get urgent professional evaluation.' },
  ],
  diagnosisNote: {
    before: 'If the problem is only cooling or only heating on a standard system, see ',
    linkLabel: 'AC repair',
    linkHref: '/ac-repair/',
    middle: ' or ',
    linkLabel2: 'heating repair',
    linkHref2: '/heating-repair/',
    after: '.',
  },
  visitEyebrow: 'The visit',
  visitTitle: 'What is included and what can cost extra',
  visitIncludesTitle: 'A heat pump service visit may include',
  // TODO(data): replace with Air Pro's actual visit checklist.
  visitIncludes: [
    'Visual system inspection and basic operational testing',
    'Filter and airflow assessment',
    'Thermostat and control check',
    'Electrical component inspection',
    'Outdoor coil condition check',
    'Condensate drain inspection',
    'Reversing valve and defrost operation check',
    'Refrigerant and performance evaluation',
  ],
  visitExtraTitle: 'What can add to the cost',
  visitExtra: [
    'A diagnostic fee or after-hours dispatch, if they apply',
    'Refrigerant leak detection, repair, and recharge',
    'Electrical upgrades and thermostat replacement',
    'Blower or fan motors, compressors, reversing valves, and defrost boards',
    'Duct repair or replacement',
    'Equipment replacement',
    'Roof access, cranes, or difficult attic and crawlspace access',
    'Permit fees, Title 24 documentation, and HERS verification',
  ],
  visitExtraNote: 'Ask your technician which of these apply to your job before you approve the work.',
  systemsId: 'services',
  systemsTitle: 'Heat pump systems we service',
  systemsIntro: 'Tell us what you have and we will confirm we can service it. This page covers heating and cooling heat pumps, not heat pump water heaters.',
  // TODO(data): commercial rooftop capability is unconfirmed (see the file-level TODO above).
  systems: [
    { name: 'Ducted split heat pumps', icon: 'wrench', body: 'An outdoor unit and an indoor coil with an air handler, joined by refrigerant piping. Conditioned air travels through ductwork, so duct condition matters as much as the equipment.' },
    { name: 'Single-zone ductless mini-splits', icon: 'home', body: 'One outdoor unit and one indoor head. Common for additions, studios, garage conversions, and homes without ducts.' },
    { name: 'Multi-zone ductless systems', icon: 'home', body: 'One outdoor unit serving two or more indoor units, sometimes mixing ducted and ductless indoor units depending on the design.' },
    { name: 'Packaged heat pumps', icon: 'building', body: 'Major components in one outdoor cabinet, usually on a roof or ground pad, with ductwork passing into the building.' },
    { name: 'Commercial rooftop and packaged units', icon: 'building', body: 'Light-commercial equipment for offices, retail, restaurants, and common areas. Roof access, tenant hours, and controls shape how work is planned.' },
    { name: 'Thermostats and controls', icon: 'check', body: 'The devices and wiring that set heating or cooling mode, checked for correct settings and reliable changeover.' },
  ],
  systemsNote: {
    before: 'Setting up a home without ducts, or an addition? See ',
    linkLabel: 'ductless mini-split service',
    linkHref: '/ductless-mini-split/',
  },
  // "Repair or replace your heat pump" - a 3-column Question/Repair/Replace table, composed inline via
  // the shared DataTable in the `comparisonTable` slot (the same pattern already used for
  // /furnace-installation/'s "Gas furnace or heat pump" comparison). See the build report for why this
  // renders the full table instead of Service.repairVsReplace's two-group bullet shape.
  comparisonTable: {
    id: 'repair-replace',
    eyebrow: 'Decision guide',
    title: 'Repair or replace your heat pump',
    intro: 'There is no age or dollar rule that fits every system. These are the questions that decide it.',
    columns: ['Question', 'Repair may fit when', 'Get a replacement quote when'],
    rows: [
      ['What failed', 'A single, isolated part such as a control, capacitor, or drain problem.', 'A major component such as the compressor has failed, or several systems are failing together.'],
      ['Repair history', 'The system has been reliable and this is the first real problem.', 'Breakdowns are frequent, or the same fault keeps returning.'],
      ['Refrigerant', 'There is no leak, or the leak is found and repairable.', 'A leak keeps returning or the circuit is in poor condition. An existing R-410A system can still be serviced.'],
      ['Comfort', 'The system heats and cools the property well when it runs.', 'It cannot reliably provide both heating and cooling, or comfort has been poor for a long time.'],
      ['Ducts and layout', 'Existing ducts are in good condition for the equipment.', 'Ducts are leaky or undersized, or a ductless design fits the property better.'],
    ],
    note: 'Ask for the diagnosis and your options in writing so you can compare repair cost against replacement with the full picture.',
  },
  refrigerant: {
    title: 'Can a new heat pump still use R-410A?',
    introBody:
      'After January 1, 2026, a whole new split-system installation must use a refrigerant with a global warming potential below 700, and new R-410A components cannot be used to install a new R-410A system.',
    boldLead: 'Existing R-410A systems are not banned.',
    body:
      ' They can stay in service and be repaired, subject to applicable rules and refrigerant availability. Newer systems commonly use refrigerants such as R-32, which is classed A2L, meaning low toxicity and mildly flammable. Handling and installation requirements differ from older R-410A equipment, and the refrigerant depends on the brand and model selected.',
    sourceText: 'Sources: U.S. EPA HFC phasedown FAQ and EPA SNAP substitutes table (listed under Sources below).',
    accent: 'amber',
  },
  pricingTitle: 'What affects heat pump cost',
  pricingIntro: 'Heat pump pricing depends on your equipment and property. The list below shows what moves the total, so a quote holds no surprises.',
  priceFactors: [
    { item: 'System type', drivers: 'Ducted split, single-zone ductless, multi-zone, packaged, and rooftop systems each take different equipment and labor.' },
    { item: 'Capacity and sizing', drivers: 'A proper selection reflects the property, insulation, exposure, duct condition, occupancy, and load. Square footage alone is not enough.' },
    { item: 'Electrical work', drivers: 'Panel capacity, a dedicated circuit, the disconnect, the wiring route, and code requirements.' },
    { item: 'Ductwork', drivers: 'Leakage, repairs, resizing, additions, replacement, or the inability to use existing ducts.' },
    { item: 'Access', drivers: 'Roof, attic, crawlspace, condominium, or parking restrictions, cranes, and difficult line-set routes.' },
    { item: 'Refrigerant and equipment generation', drivers: 'Servicing an R-410A system is different from installing a new low-GWP system.' },
    { item: 'Controls and accessories', drivers: 'Thermostat, zoning, condensate pump, surge protection, filtration, ventilation, or backup heat.' },
    { item: 'Permits and compliance', drivers: 'Permit fees, Title 24 documentation, testing, and possible HERS verification.' },
    { item: 'Rebates', drivers: 'Program rules, funding, property type, your utility, equipment match, and contractor participation.' },
  ],
  pricingColumns: ['Factor', 'How it affects the job'],
  pricingClosing: 'A job is priced on scope. A repair found during a diagnostic visit is a separate line item that you approve before it starts.',
  rulesEyebrow: 'The rules',
  rulesTitle: 'Licensing, permits, and energy-code basics',
  rules: [
    { title: 'Licensing', body: "California's C-20 classification covers contractors who install, maintain, service, and repair heating, ventilating, and air-conditioning systems and their controls, ducts, and filters. Verify any HVAC contractor's active license classification and insurance on the CSLB website before authorizing work." },
    { title: 'Permits', body: 'Permit and Title 24 requirements depend on the local jurisdiction and the project scope. A heat pump replacement is generally an HVAC alteration, so do not assume that no permit is needed until the property and scope have been reviewed.' },
    { title: 'Energy code and efficiency', body: 'The 2025 California Energy Code applies to permit applications filed on or after January 1, 2026. New equipment must meet applicable federal and California efficiency requirements, which vary by equipment type, capacity, climate zone, and compliance path. Ask for the compliance documents that apply to your job.' },
  ],
  warranty: {
    heading: 'Warranty questions to ask before you approve a replacement',
    body: "Ask for the written manufacturer warranty and for the contractor's separate labor and workmanship warranty. Manufacturer coverage varies by brand, model, registration, and installation requirements, and labor coverage varies by contractor.",
  },
  // TODO(data): re-check the LADWP amount and TECH status at launch. Brief was checked 2026-09-29.
  incentives: {
    eyebrow: 'Rebates and incentives',
    heading: 'Heat pump incentives for Southern California',
    items: [
      { name: 'Up to $2,500 per ton', body: 'Eligible LADWP residential customers may qualify for a heat-pump HVAC rebate of up to $2,500 per ton, subject to program terms, equipment requirements, funding, and application approval. Applications are made after purchase and installation.', link: { label: 'LADWP Consumer Rebate Program', href: 'https://www.ladwp.com/residential-services/assistance-programs/consumer-rebate-program', external: true } },
      { name: 'Income-qualified programs', body: 'Income-qualified Southern California Edison customers may have access to energy-efficiency or electrification upgrades through SCE programs. Eligibility and scope must be confirmed directly with SCE.', link: { label: 'SCE home electrification', href: 'https://www.sce.com/clean-energy-efficiency/home/electrification', external: true } },
      { name: 'Funding changes', body: 'Incentive availability changes. TECH Clean California reported its statewide single-family rebate funds fully reserved as of February 24, 2026. Confirm current funding, eligibility, and participating-contractor requirements before relying on a rebate.', link: { label: 'TECH Clean California', href: 'https://techcleanca.com/incentives/', external: true } },
    ],
    closingNote: 'Served by another utility? Check its rebate page before you buy, since programs and funding differ by address and account.',
  },
  appliesTo: [
    { label: 'Single-family homes', icon: 'home' },
    { label: 'Homes without ducts', icon: 'home' },
    { label: 'Condos and townhomes', icon: 'home' },
    { label: 'Apartment communities', icon: 'building' },
    { label: 'Offices, retail, and restaurants', icon: 'building' },
    { label: 'Rooftop package units', icon: 'building' },
  ],
  appliesParagraph:
    'Scope changes with the property. Older homes with aging ducts may need duct inspection, sealing, or resizing, or a ductless or short-run design instead. Homes with no ductwork raise questions about indoor-unit locations, condensate routing, electrical capacity, and any HOA approval. Condos and multifamily buildings can involve shared electrical systems, roof or balcony placement, and management approval. Newer homes with ducted split systems may allow a like-for-like approach, but sizing, duct leakage, electrical capacity, and current code still have to be evaluated. Commercial spaces add rooftop access, business hours, and larger electrical loads. We assess the property and the equipment, not the ZIP code.',
  appliesLinks: [
    { label: 'Commercial HVAC', href: '/commercial-hvac/' },
    { label: 'Residential HVAC', href: '/residential-hvac/' },
  ],
  regionIntro: [
    "Southern California is not one climate. NASA's analysis of a regional heat wave found the coast generally cooler because of the Pacific and coastal moisture, and inland valleys such as Riverside drier and hotter. Humid heat can still raise nighttime heat stress on the coast and inland.",
    'Climate explains when demand rises. It does not tell a technician which part of your system needs attention. Cooling problems often surface during heat events, while heating-mode problems and defrost behavior tend to be noticed in cooler, damp months and when the system switches modes.',
  ],
  regionConditions: [
    { regionSlug: 'los-angeles-county', body: 'The county spans several microclimates, from the coast to hot inland valleys. Sizing, airflow, duct condition, and equipment placement are checked for your property instead of assumed from the county.' },
    { regionSlug: 'south-bay', body: 'Coastal influence can moderate temperatures compared with inland valleys, though humid heat can still make nights uncomfortable. Cooling performance, indoor humidity, and outdoor-unit condition are worth checking, and condo or townhome equipment access is planned early.' },
    { regionSlug: 'orange-county', body: "NASA's analysis of a Southern California heat wave found Orange County generally cooler near the Pacific, while inland areas can still get hot. Ducted, ductless, and multi-zone options are compared for the property and the access it allows." },
    { regionSlug: 'inland-empire', body: "NASA's heat-wave analysis found Riverside and the valley areas hotter and drier than the coast. Peak-cooling reliability matters most here, so load calculations, airflow, and filter and coil condition deserve attention before the next heat event." },
  ],
  regionClosing: 'Do not see your city? Call us and we will confirm coverage.',
  // Shorthand region-card link labels from the approved copy (trailing "->" arrows dropped - RegionGrid
  // already renders its own arrow icon after the label), matching the same shorthand-labels pattern
  // already used on /heating-repair/ and /furnace-installation/.
  regionLinkLabels: {
    'los-angeles-county': 'Heat pump service in LA County',
    'south-bay': 'Heat pump service in South Bay',
    'orange-county': 'Heat pump service in Orange County',
    'inland-empire': 'Heat pump service in Inland Empire',
  },
  proofHeading: 'A technician who explains what they found',
  proofBody: 'You get a plain-language summary of what was checked, what the cause looks like, and what your options are, so you can decide what to do next.',
  // TODO(data): do not promote /emergency-hvac/ from this row until the client confirms real
  // always-on availability (see the file-level TODO above). /maintenance-plan/ is still a "content
  // coming" stub.
  moreLinks: [
    { text: 'AC maintenance', href: '/ac-maintenance/' },
    { text: 'AC installation', href: '/ac-installation/' },
    { text: 'Ductwork and airflow', href: '/ductwork/' },
    { text: 'Indoor air quality', href: '/indoor-air-quality/' },
    { text: 'Emergency HVAC', href: '/emergency-hvac/' },
    { text: 'Maintenance plan options', href: '/maintenance-plan/' },
  ],
  sourcesColumns: 2,
  sources: [
    { label: 'U.S. EPA - HFC phasedown FAQ', url: 'https://www.epa.gov/climate-hfcs-reduction/frequent-questions-phasedown-hydrofluorocarbons' },
    { label: 'U.S. EPA - SNAP substitutes for residential and light-commercial AC and heat pumps', url: 'https://www.epa.gov/snap/substitutes-residential-and-light-commercial-air-conditioning-and-heat-pumps' },
    { label: 'California Energy Commission - 2025 Building Energy Efficiency Standards', url: 'https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/2025-building-energy-efficiency' },
    { label: 'California CSLB - C-20 classification', url: 'https://www.cslb.ca.gov/about_us/library/licensing_classifications/Licensing_Classifications_Detail.aspx?Class=C20' },
    { label: 'DOE and CPUC - Air-source heat pumps guide', url: 'https://docs.cpuc.ca.gov/PublishedDocs/SupDoc/A2209006/8462/577938159.pdf' },
    { label: "Trane - Homeowner's heat pump repair guide", url: 'https://www.trane.com/residential/en/products/heat-pumps/heat-pump-repair-guide/' },
    { label: 'Carrier - Heat pump troubleshooting', url: 'https://www.carrier.com/us/en/residential/hvac-resources/heat-pumps/heat-pump-troubleshooting/' },
    { label: 'Carrier - Heat pump service checklist', url: 'https://www.carrier.com/residential/en/ca/products/heat-pumps/heat-pump-service/' },
    { label: 'Bryant - Reversing valve guide', url: 'https://www.bryant.com/en/us/products/heat-pumps/reversing-valve/' },
    { label: 'NASA JPL - Southern California heat-wave differences', url: 'https://www.nasa.gov/centers-and-facilities/jpl/nasa-maps-key-heat-wave-differences-in-southern-california/' },
    { label: 'LADWP - Consumer Rebate Program', url: 'https://www.ladwp.com/residential-services/assistance-programs/consumer-rebate-program' },
    { label: 'Southern California Edison - Home electrification', url: 'https://www.sce.com/clean-energy-efficiency/home/electrification' },
    { label: 'TECH Clean California - Incentives', url: 'https://techcleanca.com/incentives/' },
  ],
  faqs: [
    {
      q: 'What does a heat pump do?',
      a: 'A heat pump moves heat between your building and the outdoors. It cools by moving indoor heat outside, and it heats by reversing that process.',
    },
    {
      q: 'Why is my heat pump not heating or cooling?',
      a: 'Several faults can cause it, so it needs a diagnosis rather than a guess. Possible causes include airflow restrictions, thermostat or control problems, failed electrical components, refrigerant issues, fan or compressor problems, or a reversing-valve fault.',
    },
    {
      q: 'Why does my heat pump work in cooling but not in heating, or the reverse?',
      a: 'The reversing valve changes refrigerant flow between heating and cooling, so a fault there is one possible cause. A valve, solenoid, control, or refrigerant-circuit issue can stop proper changeover, so the system should be inspected rather than assumed to need one specific part.',
    },
    {
      q: 'Is frost or steam from the outdoor unit normal?',
      a: 'Some frost and a cloud of steam can be normal during a defrost cycle. If ice persists and does not clear, arrange service.',
    },
    {
      q: 'How often should a heat pump be serviced?',
      a: "The right schedule depends on system condition, how much you use it, your environment, and the manufacturer's requirements. A professional visit commonly checks refrigerant and airflow, electrical connections, coils, the drain system, the reversing valve, the defrost cycle, and indoor blower components.",
    },
    {
      q: 'Can a heat pump use my existing ducts?',
      a: 'Often yes, when the duct system is suitable. The ducts should be evaluated for condition, airflow, sizing, leakage, and compatibility with the new equipment.',
    },
    {
      q: 'Can I install a heat pump if my home has no ducts?',
      a: 'Yes. Ductless mini-split and multi-split heat pumps do not need ducts. They can reduce construction and suit additions, studios, or smaller homes, though the right design depends on room layout, loads, drainage, electrical capacity, and equipment placement.',
      boldLead: 'Yes. Ductless mini-split and multi-split heat pumps do not need ducts.',
    },
    {
      q: 'Do I need a permit to replace a heat pump in California?',
      a: "It depends on the local jurisdiction and the scope of the project. California's 2025 Energy Code applies to permit applications submitted on or after January 1, 2026, and covers applicable HVAC alterations. Confirm requirements with the local authority and your licensed contractor before work begins.",
    },
    {
      q: 'Can a new heat pump still use R-410A?',
      a: 'For a whole new split-system installation after January 1, 2026, the refrigerant must have a global warming potential below 700. Existing R-410A systems are not automatically required to be replaced, but new R-410A components cannot be used to install a new R-410A system after that date.',
    },
    {
      q: 'Are there heat pump rebates in Los Angeles?',
      a: 'LADWP lists heat-pump HVAC rebates of up to $2,500 per ton for eligible residential customers and equipment. Program terms and approval apply. Availability and eligibility can change, so confirm before you make a purchase decision.',
    },
    {
      q: 'How much does heat pump repair or replacement cost?',
      a: `It depends on the fault, the equipment, and the property. System type, capacity, electrical work, ductwork, access, and permit needs all move the total. Call ${siteConfig.phone} and we will explain what applies to your property.`,
      links: [{ text: siteConfig.phone, href: siteConfig.phoneHref }],
    },
    {
      q: 'Do you service ductless mini-splits, packaged units, or rooftop units?',
      a: `Tell us what you have and we will confirm before booking. Each type has its own service path. Mini-splits need indoor-head filters, coils, and drain routing checked. Packaged and rooftop units add roof or pad access and scheduling. Call ${siteConfig.phone} with your equipment type.`,
      links: [{ text: siteConfig.phone, href: siteConfig.phoneHref }],
    },
  ],
  // TODO(copy): client review of every FAQ answer above before launch.
};
