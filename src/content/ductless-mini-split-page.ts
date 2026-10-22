import type { ServicePage } from '@/content/services';
import { siteConfig } from '@/content/site-config';

// TODO(data): never fabricate business data. No prices, install durations, warranty terms, brand
// names, or same-day/24-7/emergency-availability wording appear anywhere on this page.
// RESOLVED (2026-10-19, confirmed by user): the CSLB record for licenses 1126691 and 50251 shows C-20, and "licensed, bonded and insured" is an approved claim. On this page the license class shows in the hero proof "Licensed HVAC contractor", the trust strip C-20 stat, the Licensing card, the proof block and the footer. "Bonded" and "insured" are not stated in the page copy.
// TODO(data): workers' compensation is not an approved claim. Do not state it anywhere until the client confirms it.
// TODO(data): the rebate card dollar amounts and dates (LADWP "$1,500 to $2,500 per ton", SCE "Varies", CEC with its February 24, 2026 and November 14, 2025 dates) and FAQ 10's figures are rolling facts. Recheck them against the program pages at launch. Report only; not edited in the migration run.
// TODO(data): the Permits card has no linked source. See the task 2 findings on the Energy Commission pages (HVAC alterations page: installing a space conditioning appliance other than a plug-in room appliance requires a building permit; it does not cover electrical or panel work).
// TODO(copy): confirm this Final CTA heading/body wording once the original client copy is available
// (see `finalCtaTitle`/`finalCtaBody` below - substituted from the established five-page pattern
// because the original client copy for this page's final CTA never arrived).
// TODO(copy): client review of every FAQ answer below before launch.
// TODO(data): rebate `name` labels below ("LADWP", "SCE", "CEC") are short-form abbreviations of the
// program names already stated in each card's body/link text, not new data - added only because the
// RebateCards component requires a caption label alongside the dollar-amount headline.

// TODO(copy): group labels are new (migration). Group order is the display order of the references row.
// Sources built 2026-10-20 in the migration run, each read in full before it was added (see docs/open-items.md "Ductless Mini-Split is migrated").
const ductlessMiniSplitSources: { label: string; url: string; group: string }[] = [
  { label: 'U.S. EPA - HFC phasedown FAQ', url: 'https://www.epa.gov/hfcs/frequent-questions-phasedown-hydrofluorocarbons', group: 'Refrigerant' },
  // TODO(data): the SNAP table lists HFC-32 as safety class A2L and "Acceptable with Use Conditions: See rules for detailed conditions." It supports "A2L-classified", not the clause about requirements varying by matched equipment. Neither EPA page mentions A2L for R-410A replacements.
  { label: 'U.S. EPA - SNAP substitutes for residential and light-commercial AC and heat pumps', url: 'https://www.epa.gov/snap/substitutes-residential-and-light-commercial-air-conditioning-and-heat-pumps', group: 'Refrigerant' },
  { label: 'California Energy Commission - 2025 Building Energy Efficiency Standards', url: 'https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/2025-building-energy-efficiency', group: 'Energy code and licensing' },
  // TODO(data): the Permits card has no linked source. This page says installing a space conditioning appliance (other than a plug-in room appliance) requires a building permit, and that field verification and diagnostic testing is prescriptively required for most HVAC additions and alterations. It does not cover electrical, disconnect or panel work, and it does not say the city or county issues the permit.
  { label: 'California Energy Commission - HVAC alterations in existing homes', url: 'https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/energy-code-support-center/hvac-0', group: 'Energy code and licensing' },
  { label: 'California CSLB - C-20 classification', url: 'https://www.cslb.ca.gov/about_us/library/licensing_classifications/Licensing_Classifications_Detail.aspx?Class=C20', group: 'Energy code and licensing' },
  // TODO(copy): label is new, the page title. Current CSLB page that states the licensing threshold, the permit and employee-labor conditions and the minor-work exemption. Replaces the dated December 2024 press release (CSLB #24-21), which supported the same sentence.
  { label: 'California CSLB - Before applying for a license when no exam is required', url: 'https://www.cslb.ca.gov/contractors/applicants/contractors_license/no_exam_application/Before_Applying_For_License.aspx', group: 'Energy code and licensing' },
  // TODO(data): NWS Western Region Technical Memorandum 261 (David Bruno and Gary Ryan, National Weather Service Forecast Office Los Angeles/Oxnard, January 2000). The PDF is a scan with no text layer, so the text was read by eye from the page images (printed pages 2 and 4, PDF pages 23 and 25), not by OCR. It supports: "This marine layer is the prominent weather feature for the Los Angeles Basin for much of the year--especially from late spring through early fall." and "The City of Los Angeles sits on a 20 to 40 mile wide coastal plain bounded on the north and east by relatively high mountains" and "Transitions between vegetation and climate zones, highly dependent upon elevation and distance from the ocean, can be striking." It does NOT say the coastal ranges "buffer the interior", so regionIntro paragraph 1 ("NOAA's Los Angeles climate documentation describes ... with the coastal ranges buffering the interior") overstates it. regionIntro is locked in the migration runs, so report only. The fact card uses NOAA's own wording.
  { label: 'NOAA National Weather Service - Climate of Los Angeles, California (NWS WR-261)', url: 'https://www.weather.gov/media/wrh/online_publications/TMs/TM-261.pdf', group: 'Heat and air quality' },
  // TODO(data): supports regionIntro paragraph 2's "California reliability reporting also cites extreme-weather demand during summer heat" in these words only: "During summer, temperature is a key driver of load conditions, especially when there are extreme and widespread heat events." (Weather Outlook section; "load" is the document's word for electricity demand, and the heat events are "extreme and widespread", not "extreme weather" in general.) Same URL and document that AC Repair cites. It is a 2024 assessment.
  { label: 'California ISO - 2024 Summer Loads and Resources Assessment', url: 'https://www.caiso.com/Documents/2024-Summer-Loads-and-Resources-Assessment.pdf', group: 'Heat and air quality' },
  // The aqmd.gov host is used because www.southcoastaqmd.gov fails certificate-name validation in Chromium (same as AC Repair).
  { label: 'South Coast AQMD - Air quality', url: 'https://www.aqmd.gov/home/air-quality', group: 'Heat and air quality' },
];
// No manufacturer, contractor or marketplace source is on this page (checked 2026-10-20), so there is no hold-out array.
// TODO(data): the NOAA entry above supports the marine-layer and coastal-plain parts of regionIntro paragraph 1 only, not the "buffering" clause (see its comment).

const count = (items?: readonly unknown[]): string => {
  if (!items?.length) throw new Error('ductless-mini-split-page: empty array used for a derived count');
  return String(items.length);
};

const ductlessMiniSplitSource = (urlPart: string) => {
  const found = ductlessMiniSplitSources.find((s) => s.url.includes(urlPart));
  if (!found) throw new Error(`Unknown ductless-mini-split source: ${urlPart}`);
  return found;
};

// Full template content for /services/ductless-mini-split/. Reuses the same ServicePage shape and shared
// section components already built out for /services/ac-repair/, /services/ac-installation/, /services/ac-maintenance/,
// /services/heating-repair/, and /services/furnace-installation/ - see the build report for why a second, parallel
// content shape (src/content/pages/) was not introduced. This page reuses several fields the
// furnace-installation build already added (relatedIconOverrides, the `headline` field on incentives
// items, symptomsEyebrow, diagnosisColumns) and adds a small number of new optional ServicePage
// fields of its own (fitGrid, systemsId/systemsNote/systemsEarly, layoutTable,
// compareTitle/compareEyebrow) for pieces of this page the existing fields still couldn't express;
// every one of them is optional so every other service page is unaffected. See the build report for
// the full reconciliation notes.
const ductlessMiniSplitBase: ServicePage = {
  primaryKeyword: 'ductless mini split los angeles',
  metaDescription:
    'Ductless mini-split service for homes and businesses across Los Angeles and Southern California, from ADUs to older homes. Schedule with AIRPRO SOLUTIONS.',
  lede:
    'Need heating and cooling for a room, ADU, garage conversion, or older home without ductwork? AIRPRO SOLUTIONS provides residential and commercial ductless mini-split service in Los Angeles and across the South Bay, Orange County, and the Inland Empire.',
  heroImage: {
    src: '/images/services/ductless-mini-split/hero.webp',
    alt: 'Wall-mounted ductless mini-split indoor unit in a converted garage living space with large windows onto a drought-tolerant garden',
  },
  // TODO(copy): split word for word from the old one-sentence caption "Ductless comfort for ADUs and homes without ducts." No new words; the trailing period is dropped. Recommended default from the planning chat, client to approve. Centered (no `heroCaptionAlign`).
  heroCaption: { title: 'Ductless comfort', text: 'for ADUs and homes without ducts' },
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
  processColumns: 3, // 6 steps shown as 2 rows of 3 instead of the default 5-wide grid
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
    // TODO(copy): trimmed from 88 words to 42 (migration), client to approve both cuts. Recommended default from the planning chat. Lead is 3 words,
    // sentence 1 is 29, sentence 2 is 10.
    // Cut (a), sentence 3 (25 words, "It suits ADUs, garage conversions, additions, older homes, and rooms the central system does not reach well, and it can
    //   serve one room or several."): dropped, not reworded. It stays on the page in the `fitGrid` (ADU or garage conversion, older home without ducts,
    //   a room the central system misses), the first `decision` card, the `appliesTo` row and FAQ 7.
    // Cut (b), sentence 4 (21 words, "The right design depends on the property: the room load, the layout, electrical capacity, permits, and where the
    //   equipment can go."): dropped. It stays on the page in the `priceFactors` table (electrical, permits and code, line-set and access), the process step
    //   "Assess" and "Scope and permit" in services.ts, and `appliesParagraph`.
    // Inside the 37 to 43 word band the other migrated pages use. Not built: lead plus sentences 2 and 3 (38 words) and lead plus sentences 2 and 4 (34
    //   words, under the band). Lead plus sentences 1 and 3 loses the heat pump fact.
    lead: 'A ductless mini-split',
    body:
      ' is a heating and cooling system with an outdoor unit and one or more indoor units connected by refrigerant lines, so it conditions rooms without a full duct system. Many models are heat pumps that both cool and heat.',
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
      { icon: 'building', title: 'Compare with central AC or a furnace', body: 'Decide whether ductless, ducted, or a mix fits how you use the building.', href: '/services/ac-installation/', ctaLabel: 'See AC installation' },
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
      ' EPA\'s rules on which refrigerants may be used in new residential and light-commercial installations have changed more than once, and which rules apply depends on the equipment and when it was made or imported. Existing R-410A systems can still be serviced. Newer refrigerants can be A2L-classified, and safety requirements vary by matched equipment, so the refrigerant should follow the manufacturer\'s instructions for the exact system. Ask your contractor which rules apply to the equipment in your proposal.',
    // TODO(copy): restore "listed under Sources below" wording once the Sources section is built.
    sourceText: 'Source: U.S. EPA, HFC Phasedown FAQ.',
    // TODO(data): the Source line on the migrated page lists the EPA FAQ and the EPA SNAP table (see `refrigerant.sources` below). `sourceText` stays for the unmigrated markup.
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
    linkHref: '/services/ac-installation/',
  },
  rulesEyebrow: 'The rules',
  rulesTitle: 'Licensing, permits, and energy-code basics',
  rules: [
    // TODO(copy): threshold sentence reworded to the current CSLB page "Before Applying for a License When No Exam is Required" (2026-10-20 follow-up). CSLB: "must be licensed by the California Contractors State License Board (CSLB) if the project requires a building permit or employee labor is used or the total cost (labor and materials) of one or more contracts on the project is $1,000 or more"; exemption "a project for which a building permit is not required, no employee labor is used, and the combined value of labor, materials, and all other costs on one or more contracts is less than $1,000". The earlier wording (release #24-21: threshold raised "from $500 to $1,000", "The $1,000 includes all costs associated with the project") did not over-claim; the bulletin #24-07 also says a license is required if the work is "subject to a permit requirement of any kind" or the unlicensed person "hires one or more workers" "even if the project is less than $1,000". No year, no as-of date. C-20 sentence restored to CSLB's nouns and verbs: "fabricates, installs, maintains, services and repairs warm-air heating systems and water heating heat pumps ... ventilating systems ... air-conditioning systems ... and the ducts, registers, flues, humidity and thermostatic controls and air filters in connection with any of these systems." Last sentence unchanged: CSLB's hiring page says workers' compensation insurance information "is also available on their license history page" and describes the bond on the license record.
    { title: 'Licensing', body: "California requires a CSLB-licensed contractor for projects of $1,000 or more in labor, materials, and all other costs, and for any project that needs a building permit or uses employee labor. California's C-20 classification covers fabricating, installing, maintaining, servicing, and repairing warm-air heating systems, ventilating systems, air-conditioning systems, and the ducts, registers, flues, humidity and thermostatic controls, and air filters in connection with any of these systems. You can verify a contractor's license, bond, workers' compensation status, and history on the CSLB website." },
    { title: 'Permits', body: 'New and replacement installations are typically permitted work, and the city or county where the property is located issues the permit and handles inspections. New circuits, disconnects, or panel work can involve separate electrical scope. We can explain the permit path before work begins.' },
    { title: 'Energy code', body: 'The 2025 California Energy Code applies to permit applications submitted on or after January 1, 2026. Depending on the scope of your project, it may need Title 24 documentation and field verification.' },
  ],
  incentives: {
    eyebrow: 'Incentives',
    heading: 'Rebates and incentives that may apply',
    lead: 'Utility and state programs change often and can run out of funds. Whether one applies depends on your utility, income, equipment, and address. Confirm with the program before you buy.',
    items: [
      // TODO(copy): LADWP eligibility sentence added 2026-10-20 (recommended default from the planning chat, pending client confirmation). LADWP page, ductless mini-split and multi-split heat pump HVAC section: "New construction and Accessory Dwelling Units (ADUs) are not eligible." Also on the page: "You must be an LADWP residential customer with active electric meter service." and "All applications must be postmarked within 12 months of the purchase date." Table row for ductless, mini-split and multi-split, HP HVAC: $1,500 (> 15.2 SEER2, > 7.8 HSPF2) up to $2,500 (> 20.5 SEER2, > 9.1 HSPF2) per ton.
      // TODO(data): recheck against the LADWP page at launch. Re-read 2026-10-20 (follow-up 2): $1,500 to $2,500 per ton is the standing table for ductless, mini-split and multi-split heat pump HVAC (rows $1,500 at > 15.2 SEER2 and > 7.8 HSPF2 up to $2,500 at > 20.5 SEER2 and > 9.1 HSPF2). LADWP says "Heat Pump rebates have increased for equipment purchased and installed on or after November 1, 2025", so equipment bought earlier may not get these amounts; the card does not say so. The only promotion on the page (June 1 to September 30, 2026, applications by December 31, 2026) is a $750 pool pump and motor rebate, not an HVAC rebate.
      // TODO(copy): CEC card date wording (recommended default from the planning chat). The CEC page still reads "As of February 24, 2026, HEEHRA rebates for single-family home retrofits are fully reserved statewide.", so that date is kept as the page's own status date and matches the other service pages. The November 14, 2025 TECH Clean California date is removed: it is not on the linked CEC page (TECH's own page was not linked or read). "Check the program page for current dates" added. No dollar amount touched.
      // RESOLVED (2026-10-20): the SCE card sentence "its income-qualified Energy Savings Assistance program serves eligible households" is supported by SCE's own ESA page (https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program, read in full): "The Energy Savings Assistance (ESA) program offers income-qualified homeowners and renters the opportunity to receive energy-saving home improvements ... If you qualify, we will cover the cost" and "Programs and services are available to customers who meet specific household income guidelines or participate in certain Public Assistance Programs." The linked card page (sce.com/save-money/rebates-financial-assistance) does not name the program, and the card has one link slot, so the ESA page is not linked on the page.
      // TODO(data): the same ESA page says "Following the Commission's approval of D.26-07-007 to sunset the ESA Whole Home Program at the end of 2026, SCE and SoCalGas are no longer accepting new project applications" and that customers may still receive services through SCE's standard ESA program "subject to funding availability, and eligibility requirements". The card sentence is about the program in general. Recheck at launch.
      {
        name: 'LADWP',
        headline: '$1,500 to $2,500 per ton',
        body: 'LADWP lists this range for qualifying ductless mini-split and multi-split heat-pump systems, by efficiency tier. It applies to active LADWP residential electric customers. LADWP states that new construction and Accessory Dwelling Units (ADUs) are not eligible. You apply after purchase and installation, within 12 months of purchase, and funds are limited and not guaranteed.',
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
        body: "California's single-family HEEHRA rebates were fully reserved statewide as of February 24, 2026. Funding and status change, so check the program page for current dates and availability. The state's Equitable Building Decarbonization program may support eligible households.",
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
  // TODO(copy): paragraph 1 rewritten 2026-10-20 (recommended default from the planning chat) to NOAA's own words from NWS WR-261, "Climate of Los Angeles, California" (January 2000), read from the page images (printed pages 2 and 4; the PDF has no text layer): "This marine layer is the prominent weather feature for the Los Angeles Basin for much of the year--especially from late spring through early fall." and "Transitions between vegetation and climate zones, highly dependent upon elevation and distance from the ocean, can be striking." The old wording said marine air covers the coastal plain with "the coastal ranges buffering the interior", which the memo does not state. regionIntro is not in JSON-LD.
  // TODO(data): recheck against the NWS source at launch.
  regionIntro: [
    "Southern California is not one climate. NOAA's Los Angeles climate report calls the marine layer the prominent weather feature for the Los Angeles Basin for much of the year, and says transitions between climate zones depend on elevation and distance from the ocean and can be striking. That is why a mini-split is sized to the room, not to a county.",
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
  // in src/app/services/[service]/page.tsx. Reuses the `relatedIconOverrides` field the furnace-installation
  // build already added to ServicePage (no type change needed here).
  relatedIconOverrides: {
    'ac-repair': 'check',
    'ac-maintenance': 'doc',
    'heat-pump-services': 'bolt',
  },
  moreLinks: [
    { text: 'Heating repair', href: '/services/heating-repair/' },
    { text: 'Furnace installation', href: '/services/furnace-installation/' },
    { text: 'Ductwork options', href: '/services/ductwork/' },
    { text: 'Indoor air quality', href: '/services/indoor-air-quality/' },
    { text: 'Commercial HVAC', href: '/commercial-hvac/' },
  ],
  sourcesColumns: 2,
  sourcesEyebrow: 'References',
  sources: ductlessMiniSplitSources,
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
    // TODO(copy): the LADWP exclusion sentence was added 2026-10-20 (recommended default from the planning chat, pending client confirmation), with the same words as the LADWP rebate card so the two cannot drift. LADWP: "New construction and Accessory Dwelling Units (ADUs) are not eligible." The per-ton range and the February 24, 2026 CEC status date are unchanged and match the card and the sources; no Energy Savings Assistance claim is made here. `a` is the single source for the visible answer and the FAQPage JSON-LD.
    // TODO(data): recheck against the LADWP page at launch.
    {
      q: 'Are rebates available for ductless mini-split heat pumps?',
      a: 'Some may be, but funding and eligibility change. LADWP lists rebates of $1,500 to $2,500 per ton for qualifying ductless mini-split heat-pump systems for its residential electric customers. LADWP states that new construction and Accessory Dwelling Units (ADUs) are not eligible. Southern California Edison programs vary by eligibility and funding. California\'s single-family HEEHRA rebates were fully reserved statewide as of February 24, 2026. Check each program before you buy.',
    },
  ],
  // TODO(copy): client review of every FAQ answer above before launch.
};

// Location-style migration (docs/open-items.md "Service page migration"). Setting `glance` marks this service as migrated.
// TODO(copy): all strings in this block are new (glance labels, fact card, proof stats, caption split).
// GlanceCard keys on `num`: the three numbers must stay different (3, 6, 7 today). Fail the build if they collide.
// Alternates if one ever collides: count(ductlessMiniSplitBase.priceFactors) is 8, count(ductlessMiniSplitBase.decision.cards) is 4.
const glanceStats = [
  { num: count(ductlessMiniSplitBase.layoutTable!.rows), label: 'layouts compared' },
  { num: '6', label: 'steps from request to handoff' }, // = the ductless-mini-split `process` array length in services.ts; keep in sync
  { num: count(ductlessMiniSplitBase.diagnosis), label: 'symptoms and what they can mean' },
];
if (new Set(glanceStats.map((x) => x.num)).size !== glanceStats.length) {
  throw new Error('ductless-mini-split-page: glance stat numbers must be unique (GlanceCard keys on num)');
}

export const ductlessMiniSplitPage: ServicePage = {
  ...ductlessMiniSplitBase,
  glance: {
    title: 'Ductless mini-split at a glance',
    stats: glanceStats,
    // TODO(data): all three stats are page counts, not claims from a source, so no source line is shown (SourceLinks renders nothing for an empty array).
    sources: [],
  },
  regionBand: {
    eyebrow: 'Across Southern California',
    title: 'How Southern California conditions shape ductless mini-split planning',
    card: {
      heading: 'Ductless mini-split facts',
      // Rows are in drop-order priority for the 1280px balance check: the last row goes first. Never go below two rows without asking.
      // Rows restate existing page copy or a source's own wording: no License row, no dollar amounts, no rolling dates, no installation date
      // and no permit or alteration claim.
      // Row 1 (Coast and inland) uses NOAA's own words from NWS WR-261, not regionIntro's "coastal ranges buffering the interior", which the memo does
      // not state: "This marine layer is the prominent weather feature for the Los Angeles Basin for much of the year--especially from late spring
      // through early fall" and "Transitions between vegetation and climate zones, highly dependent upon elevation and distance from the ocean, can be
      // striking." Text read by eye from the scan (no OCR). Added in the 2026-10-20 follow-up.
      // Dropped for the 1280px balance check (copy 416px): row 4, label 'Energy code', value 'The 2025 California Building Energy Efficiency Standards apply
      // to permit applications submitted on or after January 1, 2026' (Energy Commission: "Buildings whose permit applications are applied for on or after
      // January 1, 2026, must comply with the 2025 Energy Code."; date sentence only), source ductlessMiniSplitSource('2025-building-energy-efficiency').
      // With the Coast and inland row the card was 545px (129px past the copy) with four rows. It was a row on the migration branch (card 348px, 68px short)
      // before the NOAA row was added. Restore it if the copy grows.
      rows: [
        { label: 'Coast and inland', value: "NOAA's Los Angeles climate report calls the marine layer the prominent weather feature for the Los Angeles Basin for much of the year, and says transitions between climate zones depend on elevation and distance from the ocean and can be striking" },
        { label: 'Existing R-410A systems', value: 'Existing R-410A systems can still be serviced' },
        { label: 'Air quality', value: "South Coast AQMD names ozone and particulate matter as the region's primary air pollutants" },
      ],
      sources: [
        ductlessMiniSplitSource('TM-261'),
        ductlessMiniSplitSource('frequent-questions-phasedown'),
        ductlessMiniSplitSource('aqmd.gov/home/air-quality'),
      ],
    },
  },
  proofStats: [
    { num: `${siteConfig.rating}★`, label: 'Google rating' },
    { num: String(siteConfig.reviewCount), label: 'Google reviews' },
    { num: count(ductlessMiniSplitBase.faqs), label: 'mini-split questions answered' },
    { num: count(ductlessMiniSplitBase.priceFactors), label: 'cost factors explained' },
  ],
  // TODO(design): real photos (1200x900) to replace the "Photo pending" tiles (refrigerant and region intro).
  regionMedia: { icon: 'pin' },
  refrigerant: {
    ...ductlessMiniSplitBase.refrigerant!,
    media: { icon: 'snowflake' },
    sources: [
      ductlessMiniSplitSource('frequent-questions-phasedown'),
      ductlessMiniSplitSource('snap/substitutes-residential'),
    ],
  },
  // Not built: repairReplaceExtra.media ({ icon: 'refresh' }). This page's repairReplaceExtra.paragraphs is empty, so the 330px Photo pending tile sat beside a
  // single link line with about 300px of blank space under it at 1280px. Restore it if paragraphs are ever added.
};
