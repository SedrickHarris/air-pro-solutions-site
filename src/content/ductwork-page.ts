import type { ServicePage } from '@/content/services';
import { siteConfig } from '@/content/site-config';

// TODO(data): confirm process claims - inspect first, written scope before work begins, findings
// explained, visual check and operation check at close-out (hero proof, quick answer, process steps
// 4 and 6, proof panel). Not yet confirmed as real Air Pro practice.
// TODO(data): Air Pro diagnostic capability is not stated. Do not add static-pressure, airflow,
// duct-leakage, room-by-room, or load-calculation testing, HERS or ECC coordination, or air
// balancing until the client confirms technicians perform and document them. FAQ 7 is general
// education only.
// TODO(data): permit handling is not promised. Upgrade the Permits card and FAQ 8 only if Air Pro
// actually coordinates permits and energy-code documentation.
// TODO(data): verify the CSLB record for #1126691 and #50251 shows C-20, active status, bond, and
// workers' compensation before keeping "Licensed HVAC contractor" and the C-20 tile.
// TODO(data): the base-scope list (included/can-add-to-cost) is a typical scope, not Air Pro's
// confirmed estimate template. Confirm inclusions and extras.
// TODO(data): no Air Pro price, range, or duration appears anywhere on this page. Third-party ranges
// were collected and deliberately left off. Client approval and Air Pro job data are needed before
// any use.
// TODO(data): same-day, after-hours, 24/7, and emergency availability, warranty terms, and
// technician certifications are unconfirmed and not stated.
// TODO(data): commercial ductwork capability is only mentioned generally. Consider a separate
// commercial ductwork page. VRF/VRV and exhaust or make-up-air scope were intentionally left out.
// TODO(data): the rebates section names programs only. No standalone ductwork rebate was verified
// for LADWP, SCE, SoCalGas, or TECH Clean California. CEC reported single-family HEEHRA rebates
// fully reserved statewide as of February 2026, so no HEEHRA amount is advertised. Re-check every
// program at launch.
// TODO(data): the LA County median home age (58 years) comes from a third-party housing analysis.
// Confirm or replace the source.
// TODO(data): the refrigerant statement in the second callout is general. The EPA update on R-410A
// inventory changed in May 2026, so any equipment-specific refrigerant statement must be
// quote-specific and date-checked.
// TODO(data): region city lists are omitted until the client confirms coverage (see CLAUDE.md
// doorway-page rule).
// TODO(data): confirm logo file status.
// TODO(photo): all image tiles use the "Photo pending" pattern (hero, 4 region cards, 4 related
// cards).
// TODO(copy): client review of every FAQ answer below before launch.

// Full template content for /ductwork/. Reuses the same ServicePage shape and shared section
// components already built out for /ac-repair/, /ac-installation/, /ac-maintenance/, and
// /heating-repair/ - see the build report for why a second, parallel content shape
// (src/content/service-pages/) was not introduced. Four new optional ServicePage fields
// (metaServiceName, relatedIcons, optionsTable, equipmentTable, sourcesEyebrow) were added for
// pieces of this page the existing fields couldn't already express; every one of them is optional
// so every other service page is unaffected.
export const ductworkPage: ServicePage = {
  primaryKeyword: 'ductwork services los angeles',
  // "Ductwork Services" (not the plain service name "Ductwork") is the display string this page's
  // title/H1 are built from - see metaServiceName below and the build report for why.
  metaServiceName: 'Ductwork Services',
  metaDescription:
    'Get ductwork repair, sealing, and replacement for homes and businesses across Los Angeles and Southern California. Inspection first. Schedule service.',
  lede:
    'Air Pro Solutions provides ductwork repair, sealing, and replacement for homes and businesses in Los Angeles and across the South Bay, Orange County, and the Inland Empire. We start with an inspection to find out whether the problem is leakage, damage, sizing, return air, or insulation, then explain your repair, seal, or replace options.',
  heroProof: [
    { icon: 'check', label: 'Licensed HVAC contractor' },
    { icon: 'home', label: 'Residential and commercial' },
    { icon: 'doc', label: 'Inspection before replacement advice' },
    { icon: 'pin', label: '4 Southern California regions' },
  ],
  serviceType: 'Ductwork Services',
  ctaLabel: 'Schedule a Duct Inspection',
  trustStripLicenseLabel: 'California license class',
  symptomsTitle: 'Signs your ducts may need attention',
  processTitle: 'What happens during a ductwork visit',
  appliesTitle: 'Residential and commercial ductwork',
  regionTitle: 'Ductwork service across Southern California',
  regionLinkVerb: 'Ductwork',
  faqTitle: 'Ductwork questions Southern Californians ask',
  finalCtaTitle: 'Get your ductwork inspected',
  finalCtaBody: 'Call us or request service online.',
  answer: {
    lead: 'Ductwork service',
    body:
      ' is the inspection, repair, sealing, redesign, or replacement of the ducts that carry conditioned air from your HVAC equipment to each room and return it to the system. A hot room, weak airflow, or a high bill can come from leaks, damage, undersized ducts, poor return air, missing insulation, or the equipment itself, so we inspect first and then explain whether repair, sealing, replacement, or redesign fits. ENERGY STAR estimates that 20 to 30 percent of the air moving through a typical home duct system can be lost through leaks, holes, and poor connections.',
  },
  decision: {
    eyebrow: 'Start here',
    title: 'What does your duct problem look like?',
    intro: 'Pick the line that sounds like your property today.',
    columns: 4,
    cards: [
      { icon: 'air', title: 'Rooms that never get comfortable', body: 'One room hot or cold, weak airflow, or high bills can point to the ducts or to the equipment. Start with an inspection.', ctaLabel: 'See the symptoms', href: '#symptoms' },
      { icon: 'wrench', title: 'Visible duct damage', body: 'Sagging, crushed, torn, or disconnected duct. A localized failure may be repairable. Widespread damage may not be.', ctaLabel: 'Repair or replace?', href: '#options' },
      { icon: 'doc', title: 'Replacing your AC, furnace, or heat pump', body: 'The ducts have to deliver the airflow the new equipment needs, so review them as part of the project.', ctaLabel: 'See AC installation', href: '/ac-installation/' },
      { icon: 'alert', title: 'No cooling or heating in extreme weather', body: 'A collapsed or disconnected duct can leave rooms without air. Call and describe what you see.', ctaLabel: `Call ${siteConfig.phone}`, href: siteConfig.phoneHref },
    ],
  },
  // TODO(data): safety wording pending Air Pro safety policy review. No availability promise is made
  // anywhere in this block.
  urgency: {
    title: 'When to call right away',
    intro: 'Ductwork alone is rarely an emergency, but call promptly if:',
    items: [
      'A collapsed or disconnected duct has left the home without cooling or heating during extreme temperatures',
      'Someone in the home is medically vulnerable to heat',
      'Water is coming from a ceiling, duct, or the indoor equipment',
      'You smell burning or the breaker keeps tripping',
      'A commercial space cannot hold safe operating conditions',
    ],
    closing: 'If you see smoke or fire, or feel immediate electrical danger, get everyone out and call emergency services first.',
  },
  symptomsIntro:
    'ENERGY STAR lists high utility bills, rooms that are hard to heat or cool, stuffy rooms, kinked flex duct, and ducts in an attic, crawlspace, or garage as signs of a leaky or poorly insulated duct system. These are signs, not a diagnosis.',
  faqs: [
    {
      q: 'How do I know if my ductwork is leaking?',
      a: 'High utility bills, rooms that are hard to heat or cool, stuffy rooms, ducts running through an attic, crawlspace, or garage, and kinked or tangled flex duct are common warning signs. ENERGY STAR estimates that 20 to 30 percent of the air moving through a typical duct system can be lost through leaks, holes, and poor connections. These are warning signs, not a diagnosis, so an inspection is how you confirm it.',
    },
    {
      q: 'Can bad ductwork cause one room to be hotter or colder than the rest of the house?',
      a: 'Yes, it can. Uneven room temperatures can come from duct leakage, restrictions, poor connections, missing insulation, poor duct design, too little return air, or a problem with the HVAC equipment. A professional assessment should identify the actual cause rather than assume the ducts are solely responsible. ENERGY STAR lists rooms that are difficult to heat or cool as a common sign of duct problems.',
    },
    {
      q: 'Should I repair or replace my ductwork?',
      a: 'Repair often fits an isolated problem, while replacement or redesign fits widespread or repeating problems. Repair may be appropriate for accessible leaks, loose connections, small damaged sections, or a limited number of failed runs. Replacement or redesign may make more sense with widespread deterioration, repeated disconnections, major crushing or kinking, poor sizing, degraded materials, or airflow problems that persist after repair. The exact decision requires an inspection.',
    },
    {
      q: 'What is duct sealing, and what materials should be used?',
      a: 'Duct sealing closes leaks at connections, joints, and accessible gaps to reduce air loss. ENERGY STAR recommends mastic, metal-backed tape, or an aerosol-based sealant, and says ordinary duct tape is not long-lasting.',
    },
    {
      q: 'Do I need my ductwork checked when I replace my AC, furnace, or heat pump?',
      a: 'It is smart to, because the ducts have to deliver the airflow the new equipment needs. California energy-code and permit requirements can also apply to certain alteration scopes, so confirm the compliance path for your project before work begins.',
    },
    {
      q: 'Can crushed or sagging flex duct be repaired?',
      a: 'Sometimes. If the problem is localized and the duct is otherwise serviceable, routing and support can be corrected or the affected section replaced. If several runs are deteriorated, undersized, poorly routed, or repeatedly failing, broader replacement may be more appropriate. ENERGY STAR identifies tangled or kinked flexible duct as a warning sign.',
    },
    {
      q: 'What is static pressure, and why does it matter?',
      a: "Static pressure is resistance to airflow in the HVAC system. ACCA explains that high static pressure can keep the blower from moving the airflow the system needs, which reduces performance. A qualified technician can compare a measured reading with the equipment manufacturer's rated limit when that test is part of the diagnosis.",
    },
    {
      q: 'Are permits required for ductwork in California?',
      a: "It depends on the scope of work and your local jurisdiction. HVAC alterations, equipment changes, and some ductwork modifications can trigger permit and energy-code requirements. Confirm what applies with your local building department and your contractor before work starts. California's 2025 Energy Code applies to permits applied for on or after January 1, 2026.",
    },
    {
      q: 'How much does duct replacement cost in Southern California?',
      a: 'There is no reliable one-price answer. Access, the number and length of runs, duct material, insulation, design changes, permits, and finish repairs can all move the total. Online price figures are planning references, not a quote. We inspect first and provide a written scope before work begins.',
    },
    {
      q: 'Will sealing ducts reduce my energy bill?',
      a: 'It can reduce waste when duct leakage is part of the problem. ENERGY STAR states that leaky ducts can raise utility bills and make it hard to keep rooms comfortable. Savings are not guaranteed, because bills also depend on equipment condition, thermostat settings, insulation, weather, occupancy, energy rates, and the building envelope.',
    },
  ],
  // TODO(copy): client review of every FAQ answer above before launch.
  visitEyebrow: 'The quote',
  visitTitle: 'What is included and what can cost extra',
  visitIncludesTitle: 'A ductwork scope often includes',
  visitIncludes: [
    'Inspection and a written scope of work',
    'Repair or replacement of the specified duct runs',
    'Connections, sealing, support, and specified insulation',
    'Specified registers, grilles, boots, plenums, or returns',
    'A basic operational test',
    'Removal and disposal of specified, accessible old materials',
    'Jobsite cleanup',
  ],
  visitExtraTitle: 'What can add to the cost',
  visitExtra: [
    'Permit fees and jurisdictional processing',
    'Diagnostic testing, verification, or air balancing, if required or offered',
    'Attic or crawlspace remediation, pest cleanup, or asbestos and lead investigation',
    'Drywall, ceiling, flooring, or cabinetry repair after access is opened',
    'Electrical work, equipment replacement, or crane work',
    'Concealed-duct access and restoration',
    'Mold remediation, water-damage restoration, or structural repairs',
  ],
  visitExtraNote: 'Ask your technician which of these apply to your job before you approve the work.',
  // "Repair, seal, replace, or redesign?" comparison table - new content, rendered right after the
  // process steps and before the "what's included" scope section, via a DataTable-backed block
  // composed directly in src/app/[service]/page.tsx (matching the `catches` composition pattern
  // already used for the AC Maintenance page).
  optionsTable: {
    eyebrow: 'The decision',
    title: 'Repair, seal, replace, or redesign?',
    lead: 'The choice is not "seal everything" or "replace everything." The inspection decides whether the issue is leakage, physical damage, undersizing, poor return-air design, excess static pressure, insulation failure, or a combination.',
    columns: ['Approach', 'It usually fits when', 'Keep in mind'],
    rows: [
      ['Repair', 'The problem is isolated: a loose connection, a small tear, a disconnected run, or an accessible leak.', 'If the same failures keep returning, the cause may be wider than the repaired spot.'],
      ['Seal', 'Leakage at connections, joints, and accessible gaps is the main issue.', 'ENERGY STAR recommends mastic, metal-backed tape, or aerosol sealant. Ordinary duct tape is not long-lasting.'],
      ['Replace', 'Deterioration is widespread, connections keep failing, or duct is badly crushed, kinked, or degraded.', 'Access drives the work. Attic, crawlspace, and finished-wall runs are handled differently.'],
      ['Redesign', 'Airflow stays poor after repair, or sizing, return-air paths, or pressure are the real problem.', 'Residential duct design follows a recognized method, ACCA Manual D, which looks at blower airflow, pressure losses, and available static pressure.'],
    ],
    noteBefore: 'Weak airflow or warm air can also come from the cooling equipment. ',
    noteLinkText: 'See AC repair',
    noteLinkHref: '/ac-repair/',
  },
  systemsTitle: 'What ductwork service covers',
  systemsIntro: 'A duct system is more than the visible runs. Repair or replacement can involve any of these parts.',
  systemsEyebrow: 'Parts',
  systems: [
    { name: 'Supply ducts', icon: 'air', body: 'Deliver cooled or heated air to each room. Leaks and restrictions here show up as weak or uneven airflow.' },
    { name: 'Return ducts', icon: 'air', body: 'Carry room air back to the air handler or furnace. Undersized or blocked returns limit how much air the system can move.' },
    { name: 'Plenums', icon: 'wrench', body: 'The main supply or return distribution boxes near the equipment. Worn or leaking plenums can be replaced.' },
    { name: 'Trunk and branch runs', icon: 'air', body: 'Larger main ducts and the smaller runs that serve individual rooms, repaired or replaced as needed.' },
    { name: 'Flex and rigid duct', icon: 'building', body: 'Flex duct is common in attics and tight-access homes. Rigid metal suits exposed or durability-critical runs.' },
    { name: 'Boots, registers, grilles, and dampers', icon: 'check', body: 'The fittings at each room and the parts that direct and control airflow.' },
  ],
  // "Systems that use ductwork" comparison table - new content, rendered right after the parts grid
  // (the `systems` field above) and before the R-410A/efficiency callouts, via the same DataTable
  // composition pattern as `optionsTable`.
  equipmentTable: {
    eyebrow: 'Equipment',
    title: 'Systems that use ductwork',
    columns: ['System type', 'How ductwork applies'],
    rows: [
      ['Split central AC and furnace', 'Usually relies on supply ducts, returns, plenums, and registers.'],
      ['Split heat pump with air handler or furnace', 'Usually ducted. A replacement is a natural time to review duct condition and the compliance path.'],
      ['Packaged unit', 'Can connect directly to supply and return ducts. Rooftop package units are common in many commercial settings.'],
      ['Ducted mini-split', 'Uses compact concealed duct sections or short runs. It is not the same as a ductless mini-split.'],
      ['Ductless mini-split', 'Indoor heads do not use central supply and return ducts. A property can have both ductless and ducted equipment.'],
      ['Commercial rooftop unit', 'Typically uses supply and return duct systems, curbs, plenums, and diffusers, and sometimes zoning or outside-air components.'],
    ],
    links: [
      { text: 'Ductless mini-split service', href: '/ductless-mini-split/' },
      { text: 'Heat pump services', href: '/heat-pump-services/' },
      { text: 'Furnace installation', href: '/furnace-installation/' },
    ],
  },
  callouts: [
    {
      id: 'energy-bill',
      accent: 'sky',
      title: 'Can sealing or replacing ducts lower my energy bill?',
      body: 'It can reduce waste when leakage is part of the problem. ENERGY STAR estimates that 20 to 30 percent of the air in a typical duct system can be lost through leaks, holes, and poor connections, and says leaky ducts can raise utility bills and make rooms hard to keep comfortable. Savings are not guaranteed, because bills also depend on equipment condition, thermostat settings, insulation, weather, and energy rates.',
      sourceText: 'Source: ENERGY STAR duct sealing guidance (listed under Sources below).',
    },
    {
      id: 'seer-rating',
      accent: 'amber',
      title: "Do new ducts change my air conditioner's efficiency rating?",
      boldLead: 'No.',
      body: " Efficiency ratings such as SEER2 apply to the HVAC equipment. Properly designed, sealed, and insulated ductwork helps the system deliver air as intended, but it does not by itself change the equipment's published rating. Ductwork also contains no refrigerant. If ducts are replaced along with a new AC or heat pump, the equipment quote should identify the refrigerant platform, compatibility requirements, and any installation changes for that equipment.",
    },
  ],
  pricingTitle: 'What affects ductwork cost',
  pricingIntro: 'Ductwork pricing depends on whether you need a small repair, sealing, one or more replacement runs, a new return or plenum, or a complete duct-system redesign. The table shows what moves the total, so nothing about your quote is a surprise.',
  priceFactors: [
    { item: 'Number, length, and size of runs', drivers: 'More supply and return runs, and longer runs, mean more material and labor.' },
    { item: 'Duct type', drivers: 'Flex duct, rigid duct, and custom-fabricated components are priced and installed differently.' },
    { item: 'Access', drivers: 'Attic, crawlspace, garage, roof, wall, ceiling, or slab access changes the scope.' },
    { item: 'Existing condition', drivers: 'Deteriorated, crushed, disconnected, contaminated, or inaccessible duct can widen the work.' },
    { item: 'Design changes', drivers: 'New return-air capacity, plenums, boots, dampers, grilles, transitions, or room-by-room airflow correction add scope.' },
    { item: 'Insulation and vapor barrier', drivers: 'Insulation requirements and the condition of existing insulation affect materials and labor.' },
    { item: 'Permits and verification', drivers: 'The permit path and any required testing or energy-code documentation depend on the project and the jurisdiction.' },
    { item: 'Finish restoration', drivers: 'Opening drywall, ceilings, flooring, or cabinetry means restoring those finishes.' },
    { item: 'Equipment coordination', drivers: 'Ductwork done with a new furnace, AC, heat pump, coil, air handler, or thermostat is scheduled and scoped together.' },
    { item: 'Commercial access', drivers: 'Tenant coordination, rooftop access, cranes, after-hours work, and business continuity change how a job is planned.' },
  ],
  pricingColumns: ['Factor', 'How it affects the job'],
  pricingClosing: 'We inspect the system first and provide a written scope before work begins. Timing depends on the scope: a small accessible repair is different from a full replacement with permits or verification, so ask for the expected schedule with your written scope.',
  // Visual-rhythm pass (matching the AC Maintenance build): alternates the paper/paper-dim background
  // so the callouts/pricing/rules run doesn't sit as three same-background plain sections in a row.
  pricingAlt: true,
  rulesEyebrow: 'The rules',
  rulesTitle: 'Licensing, permits, and energy-code basics',
  rules: [
    { title: 'Licensing', body: "California's C-20 classification covers HVAC systems, including ducts, registers, plenums, ventilation, and the filters connected to them. Ask to verify any contractor's active C-20 license and insurance on the CSLB website before authorizing ductwork tied to your heating or cooling system." },
    { title: 'Permits', body: 'Whether a permit is needed depends on the scope of work and your city or county, and requirements differ across Los Angeles, Torrance, Orange County cities, Riverside, and unincorporated areas. Ask your contractor and your local building department what applies before work begins.' },
    { title: 'Energy code', body: 'The 2025 California Energy Code applies to permits applied for on or after January 1, 2026, and its standards include duct-sealing procedures, materials, diagnostic testing, and field verification. Some permitted residential HVAC alterations and ductwork scopes can require energy-code documentation and third-party verification. Requirements depend on the project and jurisdiction, so confirm the compliance path before work begins.' },
  ],
  rebatesNote: {
    title: 'Rebates and incentives',
    body: 'Utility and state programs mostly focus on qualifying equipment, not standalone ductwork. LADWP lists rebates for eligible heat-pump HVAC equipment for its customers, and Southern California Edison\'s income-qualified Energy Savings Assistance Program offers energy-efficiency upgrades to eligible households. Whether a program covers duct work depends on your address, utility account, project, and funding status, and programs change. Checked September 2026. Confirm with the utility before you buy or schedule.',
    links: [
      { text: 'LADWP Consumer Rebate Program', href: 'https://www.ladwp.com/residential-services/assistance-programs/consumer-rebate-program' },
      { text: 'SCE Energy Savings Assistance Program', href: 'https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program' },
    ],
  },
  appliesTo: [
    { label: 'Single-family homes', icon: 'home' },
    { label: 'Older homes with past additions', icon: 'home' },
    { label: 'Condos and townhomes', icon: 'home' },
    { label: 'Apartment communities', icon: 'building' },
    { label: 'Offices, retail, and restaurants', icon: 'building' },
    { label: 'Rooftop package units', icon: 'building' },
  ],
  appliesParagraph:
    'Older homes may have gone through additions, remodels, equipment swaps, or partial duct repairs over the years, so we inspect before recommending replacement. Condos and multifamily buildings can involve access, exterior-equipment approval, and tenant scheduling. Commercial spaces add rooftop access, occupied-space coordination, and a documented scope. If your property is ductless-only, central ductwork does not apply, and the ductless mini-split page is the better fit.',
  appliesLinks: [
    { label: 'Commercial HVAC', href: '/commercial-hvac/' },
    { label: 'Residential HVAC', href: '/residential-hvac/' },
  ],
  regionIntro: [
    "Southern California is not one climate. In NASA JPL's analysis of a Southern California heat wave, southern Los Angeles County and Orange County stayed cooler because of the Pacific, while valley areas including Riverside were hotter and drier. Humid heat-wave nights raised heat stress in both coastal and inland areas.",
    'Weather explains when duct problems get noticed, not where the problem is. A room that never cools, or a system that runs all afternoon, makes the ducts and airflow one place to look, alongside the equipment, the filter, and the building envelope.',
  ],
  regionConditions: [
    { regionSlug: 'los-angeles-county', body: 'A regional housing analysis puts the median age of LA County homes at 58 years. Older homes can have legacy duct layouts, hard-to-reach runs, aging insulation, or past equipment changes, so we inspect before recommending replacement.' },
    { regionSlug: 'south-bay', body: 'Coastal weather can moderate daytime temperatures, but uneven rooms, weak airflow, and duct damage still show up whenever a system runs. Comfort problems here call for a look at the whole system.' },
    { regionSlug: 'orange-county', body: 'Coastal and inland Orange County homes can carry different cooling loads. We look at the whole system rather than assume the ducts are the only cause of a comfort problem.' },
    { regionSlug: 'inland-empire', body: 'Inland heat can make weak airflow, attic duct leakage, poor insulation, undersized returns, and uneven rooms more noticeable when cooling demand peaks.' },
  ],
  regionClosing: "Don't see your city? Call us and we will confirm coverage.",
  regionLinkLabels: {
    'los-angeles-county': 'Ductwork in LA County',
    'south-bay': 'Ductwork in the South Bay',
    'orange-county': 'Ductwork in Orange County',
    'inland-empire': 'Ductwork in the Inland Empire',
  },
  proofHeading: 'An inspection before a replacement quote',
  proofBody: 'You get a plain-language explanation of what is wrong, what can be repaired, and what needs replacing, so you can decide what to do next.',
  // Per-related-card icon overrides, keyed by the related service's slug - added for this page
  // because the approved related-card titles are custom ("AC Repair for Weak Airflow or Warm Air",
  // not just "AC Repair") and pair with icons that differ from each service's own default icon
  // (ac-repair defaults to "snowflake", heating-repair to "flame", etc). Optional so every other
  // service page's related row keeps using the global relatedIcons map / each service's own icon.
  relatedIcons: {
    'ac-repair': 'wrench',
    'ac-installation': 'doc',
    'heating-repair': 'flag',
    'ductless-mini-split': 'home',
  },
  relatedLabels: {
    'ac-repair': 'AC Repair for Weak Airflow or Warm Air',
    'ac-installation': 'AC Replacement and Ductwork Planning',
    'heating-repair': 'Furnace Repair for Cold Rooms and Weak Heat',
    'ductless-mini-split': 'Ductless Mini-Split Options for Problem Rooms',
  },
  moreLinks: [
    { text: 'Furnace replacement and airflow evaluation', href: '/furnace-installation/' },
    { text: 'Heat pump installation with ductwork evaluation', href: '/heat-pump-services/' },
    { text: 'Indoor air quality and filtration options', href: '/indoor-air-quality/' },
    { text: 'HVAC maintenance and seasonal system checks', href: '/ac-maintenance/' },
    { text: 'Emergency HVAC service', href: '/emergency-hvac/' },
    { text: 'Commercial HVAC and ductwork services', href: '/commercial-hvac/' },
  ],
  sourcesColumns: 2,
  sourcesEyebrow: 'References',
  sources: [
    { label: 'ENERGY STAR - Duct sealing', url: 'https://www.energystar.gov/saveathome/heating-cooling/duct-sealing' },
    { label: 'California CSLB - C-20 classification', url: 'https://www.cslb.ca.gov/about_us/library/licensing_classifications/Licensing_Classifications_Detail.aspx?Class=C20' },
    { label: 'California Energy Commission - 2025 Building Energy Efficiency Standards', url: 'https://www.energy.ca.gov/sites/default/files/2026-07/CEC-400-2025-010-F.pdf' },
    { label: 'ACCA - Manual D residential duct design', url: 'https://www.acca.org/standards/technical-manuals/manual-d' },
    { label: 'ACCA - Using static pressure measurement to pinpoint duct deficiencies', url: 'https://hvac-blog.acca.org/use-static-pressure-measurement-pinpoint-duct-deficiencies/' },
    { label: 'NASA JPL - Key heat-wave differences in Southern California', url: 'https://www.jpl.nasa.gov/news/nasa-maps-key-heat-wave-differences-in-southern-california/' },
    { label: 'Southern California Association of Non Profit Housing - 2026 housing supply', url: 'https://la.myneighborhooddata.org/solachan-2026-housing-supply/' },
    { label: 'LADWP - Consumer Rebate Program', url: 'https://www.ladwp.com/residential-services/assistance-programs/consumer-rebate-program' },
    { label: 'Southern California Edison - Energy Savings Assistance Program', url: 'https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program' },
  ],
};
