import type { ServicePage } from '@/content/services';
import { siteConfig } from '@/content/site-config';

// TODO(data): "Findings explained before repairs" (hero proof), plus the statements that repair work
// is "explained and quoted separately" and approved before work begins (quick answer, process step 5
// in services.ts, FAQ 2, cost note) are the same unconfirmed-process status as the AC Repair page.
// TODO(data): "Licensed HVAC contractor" and the "C-20" tile (announcement bar, hero proof, trust
// strip, proof block, footer) - confirm the CSLB record for licenses 1126691 and 50251 shows C-20.
// TODO(data): the visit checklist under "A typical AC maintenance visit may include" follows the
// ENERGY STAR professional checklist, not a confirmed Air Pro checklist.
// TODO(data): the systems section says "Tell us what you have and we will confirm we can service it"
// because ductless, heat pump, packaged, and rooftop capability is unconfirmed.
// TODO(data): stats use siteConfig.rating/reviewCount (4.8/40) and the region count (4, matching
// regions.ts) rather than hard-coded figures.
// TODO(copy): client review of every FAQ answer below before launch.
//
// No prices, visit duration, plan tiers/membership benefits, same-day/24-7/emergency-availability
// wording, warranty terms, technician certifications, or a commercial maintenance program appear
// anywhere on this page - none are confirmed. See CLAUDE.md "Claims that must not ship".

// Full template content for /ac-maintenance/. Reuses the same ServicePage shape and shared section
// components already built out for /ac-repair/ and /ac-installation/ - see the build report for why a
// second, parallel content shape (src/content/service-pages/) was not introduced. A handful of new
// optional ServicePage fields (decision, timing, catches, callouts, rebatesNote, regionLinkLabels,
// trustStripLicenseLabel) were added for sections that don't exist on the other two service pages;
// every one of them is optional so ac-repair and ac-installation are unaffected.
export const acMaintenancePage: ServicePage = {
  primaryKeyword: 'ac maintenance los angeles',
  metaDescription:
    'Get AC maintenance for homes and businesses across Los Angeles and Southern California. Coils, drains, airflow, and controls checked. Schedule service.',
  lede:
    'Air Pro Solutions provides AC maintenance for homes and businesses in Los Angeles and across the South Bay, Orange County, and the Inland Empire. A pre-season tune-up checks controls, electrical connections, coils, the condensate drain, and airflow so small problems can be found early.',
  heroProof: [
    { icon: 'check', label: 'Licensed HVAC contractor' },
    { icon: 'home', label: 'Residential and commercial' },
    { icon: 'doc', label: 'Findings explained before repairs' },
    { icon: 'pin', label: '4 Southern California regions' },
  ],
  serviceType: 'Air Conditioning Maintenance',
  ctaLabel: 'Schedule AC Maintenance',
  trustStripLicenseLabel: 'California license class',
  processTitle: 'What happens during an AC maintenance visit',
  processColumns: 2, // 6 steps shown as 2x3 instead of the default 5-wide grid
  appliesTitle: 'Residential and commercial AC maintenance',
  regionTitle: 'AC maintenance across Southern California',
  regionLinkVerb: 'AC maintenance',
  faqTitle: 'AC maintenance questions Southern Californians ask',
  finalCtaTitle: 'Get your AC maintenance scheduled',
  finalCtaBody: 'Call us or request service online.',
  answer: {
    lead: 'AC maintenance',
    body:
      ' is a scheduled, preventive visit that checks how your cooling system is running before something fails. A technician looks at the controls, electrical connections, airflow, coils, condensate drain, and refrigerant level, cleans what is accessible, and tells you what they found. It is not a repair. If the visit turns up a failed part, a leak, or a drainage problem, that work is explained and quoted separately. ENERGY STAR recommends a professional checkup once a year, and spring is the practical time for cooling equipment.',
  },
  // "Maintenance, repair, or replacement?" decision cards - new content, rendered right after the
  // quick-answer AnswerBlock via DecisionGrid.
  decision: {
    eyebrow: 'Start here',
    title: 'Maintenance, repair, or replacement?',
    intro: 'Pick the line that sounds like your system today.',
    columns: 4,
    cards: [
      { icon: 'check', title: 'Cooling normally', body: 'The system runs and cools as it always has. Schedule preventive maintenance before hot weather.', ctaLabel: 'Schedule maintenance', href: '/contact/' },
      { icon: 'wrench', title: 'Cooling poorly, noisy, or leaking', body: 'Weak airflow, warm air, water near the indoor unit, or new noises point to a fault, not a tune-up.', ctaLabel: 'See AC repair', href: '/ac-repair/' },
      { icon: 'doc', title: 'Repeated repairs or an aging system', body: 'If breakdowns keep coming back, compare the repair with replacement using real numbers.', ctaLabel: 'See AC installation', href: '/ac-installation/' },
      { icon: 'alert', title: 'No cooling in dangerous heat', body: 'Burning odor, a tripping breaker, or a serious leak calls for prompt help.', ctaLabel: `Call ${siteConfig.phone}`, href: siteConfig.phoneHref },
    ],
  },
  // TODO(data): safety wording pending Air Pro safety policy review (same status as the AC Repair
  // page's urgency box).
  urgency: {
    title: 'When to call right away',
    intro: 'Skip the tune-up and call promptly if:',
    items: [
      'Cooling has failed during extreme heat',
      'Someone in the home is medically vulnerable to heat',
      'You smell burning or the breaker keeps tripping',
      'Water is spreading from the indoor equipment',
      'A commercial outage is affecting your operations',
    ],
    closing: 'If you see smoke or fire, or feel immediate electrical danger, get everyone out and call emergency services first.',
  },
  // "When to schedule" rule cards - new content, rendered via RulesNote in the slot SymptomGrid
  // would otherwise occupy (this page has no symptom-diagnosis content; see `decision` above instead).
  timing: {
    eyebrow: 'Timing',
    title: 'When to schedule AC maintenance',
    cards: [
      { title: 'Before cooling season', body: 'ENERGY STAR advises having cooling equipment checked in spring, because contractors get busier once summer arrives. Booking early gives you a choice of appointment times.' },
      { title: 'Before the next heat event', body: 'If run times have grown, airflow has weakened, or the outdoor unit is dirty, have it checked before the next stretch of extreme heat rather than during it.' },
      { title: 'Between visits', body: 'Inspect and clean or change the filter monthly, keep the area around the outdoor unit clear, and note any change in noise, airflow, or water near the indoor unit.' },
    ],
  },
  visitEyebrow: 'The visit',
  visitTitle: 'What is included and what can cost extra',
  visitIncludesTitle: 'A typical AC maintenance visit may include',
  visitIncludes: [
    'Thermostat and operating-control check',
    'Filter inspection',
    'Electrical connection inspection',
    'Blower and airflow review',
    'Indoor and outdoor coil inspection, with cleaning where accessible',
    'Condensate drain inspection',
    'Refrigerant-level check',
    'Cooling performance evaluation',
  ],
  visitExtraTitle: 'What can add to the cost',
  visitExtra: [
    'Replacement filters',
    'Major coil cleaning that needs disassembly or extra access work',
    'Drain-line clearing beyond routine preventive treatment',
    'Refrigerant leak detection, repair, recovery, and recharge',
    'Capacitors, contactors, motors, boards, and other parts',
    'Duct repair, sealing, or balancing',
    'Thermostat replacement or control upgrades',
    'Roof access, lifts, or difficult attic and crawlspace access',
    'HOA, property-management, or tenant coordination',
  ],
  visitExtraNote: 'Ask your technician which of these apply to your job before you approve the work.',
  // "Problems a routine visit can find early" - new content, rendered via DataTable right after
  // VisitScope and before SystemsGrid.
  catches: {
    eyebrow: 'What maintenance catches',
    title: 'Problems a routine visit can find early',
    lead: 'Maintenance is not a guarantee against breakdowns. It can surface conditions that affect airflow, drainage, electrical reliability, and efficiency.',
    headings: ['What a visit looks at', 'Why it matters'],
    rows: [
      ['Filter and airflow', 'A dirty filter or dirty blower components restrict airflow. ENERGY STAR says airflow problems can reduce efficiency by up to 15 percent.'],
      ['Indoor and outdoor coils', 'Dirty coils can reduce cooling capacity and make the system run longer.'],
      ['Condensate drain', 'A plugged drain can cause water damage and affect indoor humidity.'],
      ['Electrical connections and motors', 'Loose connections and worn moving parts are found and addressed before they cause a shutdown, where the visit allows.'],
      ['Thermostat and controls', 'Settings and controls are verified so the system starts, runs, and shuts down safely.'],
      ['Refrigerant level', 'An incorrect level reduces efficiency. If it is low, the leak needs to be found, not just topped off.'],
    ],
    afterText: 'Already noticing warm air, weak airflow, water near the indoor unit, or unusual noises? Those point to a fault. ',
    afterLinkText: 'See AC repair',
    afterLinkHref: '/ac-repair/',
  },
  systemsTitle: 'Systems we maintain',
  systemsIntro: 'Tell us what you have and we will confirm we can service it.',
  // Visual-rhythm pass: alternates the background so this long page doesn't run several
  // plain-paper sections in a row (see the build report for the full before/after section list).
  systemsAlt: true,
  systems: [
    { name: 'Split central AC', icon: 'wrench', body: 'An outdoor condenser and an indoor coil with an air handler or furnace blower. A visit covers the condenser, indoor coil, blower, controls, filter, condensate drain, and refrigerant circuit.' },
    { name: 'Heat pumps', icon: 'wrench', body: 'Cooling-side checks are similar to an AC, plus the heat-pump operating controls. Heating-season maintenance is a separate visit.' },
    { name: 'Packaged units', icon: 'building', body: 'Cooling and heating components in one cabinet, often on a roof or ground pad. Access, weather exposure, drainage, and electrical components all need inspection.' },
    { name: 'Ductless mini-splits', icon: 'home', body: 'Indoor-head filters and coils, condensate routing, the outdoor unit, the controller, and the refrigerant circuit. Multi-zone systems add inspection points.' },
    { name: 'Rooftop units', icon: 'building', body: 'Commercial packaged equipment on a roof. Roof access, tenant hours, and controls affect how a visit is planned.' },
    { name: 'Thermostats and controls', icon: 'check', body: 'The devices and wiring that call for cooling, checked for correct settings and safe start, run, and shutdown.' },
  ],
  // Two RefrigerantNote-style explainer callouts (efficiency, R-410A) - new content, rendered side by
  // side via the `callouts` array right after the single `refrigerant` slot (unused on this page).
  callouts: [
    {
      id: 'efficiency',
      accent: 'sky',
      title: 'Can maintenance lower my energy costs?',
      body: 'It can address problems that reduce efficiency. ENERGY STAR says dirty coils can make a system run longer, incorrect refrigerant levels reduce efficiency, and airflow problems can cut efficiency by up to 15 percent. Whether a visit lowers your bill depends on what the inspection finds, and a specific bill increase can have other causes such as thermostat use, the building envelope, or rate changes.',
      sourceText: 'Source: ENERGY STAR maintenance checklist (listed under Sources below).',
    },
    {
      id: 'r410a',
      accent: 'amber',
      title: 'Do I have to replace my R-410A air conditioner?',
      boldLead: 'No.',
      body: ' The EPA states that existing equipment can stay in use through its useful life. The refrigerant change applies to new installations: a split system installed after January 1, 2026 must use a refrigerant with a global warming potential below 700. An older R-410A system can still be maintained, and replacement is a decision based on condition, repair history, and your plans for the property.',
      sourceText: 'Source: U.S. EPA, HFC Phasedown FAQ (listed under Sources below).',
    },
  ],
  pricingTitle: 'What affects AC maintenance cost',
  pricingIntro: 'Maintenance pricing depends on your equipment and property. The list below shows what moves the total, so nothing about your visit is a surprise.',
  priceFactors: [
    { item: 'System type and number of systems', drivers: 'Split, packaged, ductless, multi-zone, or rooftop equipment each take different time, and more indoor heads or units mean more to inspect.' },
    { item: 'Coil and drain condition', drivers: 'Routine cleaning is part of a visit where accessible. Heavy buildup or a clogged drain line can need extra labor.' },
    { item: 'Access', drivers: 'Roof access, lifts, attics, crawlspaces, gates, and HOA or property-management coordination can change the scope.' },
    { item: 'Filters and parts', drivers: 'Replacement filters are usually separate, and any capacitor, contactor, motor, or board found failing is quoted before work.' },
    { item: 'Refrigerant', drivers: 'Leak detection, recovery, and recharge are repair work and are approved separately.' },
    { item: 'After hours', drivers: 'Dispatch outside normal hours, if available, is priced differently. Ask when you call.' },
  ],
  pricingColumns: ['Factor', 'How it affects the visit'],
  pricingClosing: 'A visit is priced on scope. If the inspection finds a fault, the repair is a separate, approved line item and not part of the routine visit.',
  pricingAlt: true,
  rulesTitle: 'Licensing, permits, and energy-code basics',
  rules: [
    { title: 'Licensing', body: "California's C-20 classification covers contractors who install, maintain, service, and repair air-conditioning systems. Ask to verify any HVAC contractor's active license classification and insurance on the CSLB website before authorizing work." },
    { title: 'Permits', body: 'Routine maintenance and minor repair do not necessarily need a permit, but requirements depend on the exact scope and the city or county. If a repair turns into equipment replacement or code-triggering alteration work, permit requirements are confirmed for your property before work proceeds.' },
    { title: 'Energy code', body: 'The 2025 California Energy Code applies to permit applications filed on or after January 1, 2026. Efficiency requirements apply mainly when equipment is installed or replaced, not simply because you schedule a maintenance visit.' },
  ],
  // Plain rebates callout - new content, distinct from the three-card `incentives` field used by
  // /ac-installation/, because this page's approved copy is one paragraph plus two links.
  rebatesNote: {
    title: 'Rebates and incentives',
    body: "Most utility programs focus on qualifying equipment upgrades, not standard tune-ups. LADWP lists rebates for eligible HVAC equipment for its residential customers, and Southern California Edison's income-qualified Energy Savings Assistance Program may cover items such as HVAC filters for eligible households. Eligibility depends on your address, utility account, equipment, and funding status, and programs change. Check the utility's page before you buy or schedule.",
    links: [
      { text: 'LADWP Consumer Rebate Program', href: 'https://www.ladwp.com/residential-services/assistance-programs/consumer-rebate-program' },
      { text: 'SCE Energy Savings Assistance Program', href: 'https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program' },
    ],
  },
  appliesTo: [
    { label: 'Single-family homes', icon: 'home' },
    { label: 'Condos and townhomes', icon: 'home' },
    { label: 'Apartment communities', icon: 'building' },
    { label: 'Office buildings', icon: 'building' },
    { label: 'Retail and restaurants', icon: 'building' },
    { label: 'Rooftop package units', icon: 'building' },
  ],
  appliesParagraph:
    'Scope changes with the property. Older homes may have equipment replaced at different times than ducts or controls. Condos and multifamily buildings can involve exterior-equipment approval, roof or balcony access, and tenant scheduling. Commercial spaces add rooftop access, business hours, and property-management coordination. We assess the property and the equipment, not the ZIP code.',
  appliesLinks: [
    { label: 'Commercial HVAC', href: '/commercial-hvac/' },
    { label: 'Residential HVAC', href: '/residential-hvac/' },
  ],
  regionIntro: [
    'Southern California is not one climate. South Coast AQMD reported multi-day extreme ozone events during 2025 heat waves and expected levels to be lower along the coast than in inland parts of the air basin. Weather explains when demand for cooling rises. It does not tell a technician which part of your system needs attention.',
    'The California Energy Commission expects the Los Angeles region to see more extremely hot days over time. That makes a pre-season check a planning step: find out how your system is running before it has to carry a heat wave.',
  ],
  regionConditions: [
    { regionSlug: 'los-angeles-county', body: 'The county mixes dense urban, multifamily, single-family, and commercial properties. Maintenance scope varies with system access, building type, equipment location, and property-management requirements.' },
    { regionSlug: 'south-bay', body: 'Coastal areas can see different weather and air-quality patterns than inland communities. Schedule a check before heavy cooling use, especially if airflow, condensate drainage, or outdoor-unit cleanliness has been neglected.' },
    { regionSlug: 'orange-county', body: 'A visit accounts for property type, access, filtration, drainage, thermostat controls, and the equipment actually installed. HOA rules for outdoor equipment vary by property.' },
    { regionSlug: 'inland-empire', body: "South Coast AQMD's 2025 heat-wave advisories named inland communities such as Corona and Lake Elsinore among areas expecting unhealthy air quality. Book before high-demand summer periods, and address weak cooling or long run times before the next heat event." },
  ],
  regionClosing: "Don't see your city? Call us and we will confirm coverage.",
  // Exact region-card link labels from the approved copy. This is the one place the content module
  // deliberately departs from the reference prototype (which said "AC maintenance in LA County" etc):
  // those links go to the region hubs, not an AC-maintenance-specific page, so the module uses
  // "{region} service area" instead. The trailing arrow glyph in the source copy ("LA County service
  // area →") is dropped here because RegionGrid already renders its own arrow icon next to the
  // label; keeping both would show two arrows. See the build report for this presentation-only call.
  regionLinkLabels: {
    'los-angeles-county': 'LA County service area',
    'south-bay': 'South Bay service area',
    'orange-county': 'Orange County service area',
    'inland-empire': 'Inland Empire service area',
  },
  proofHeading: 'A technician who explains what they found',
  proofBody: 'You get a plain-language summary of what was checked, what was cleaned, and what needs attention, so you can decide what to do next.',
  moreLinks: [
    { text: 'Heat pump services', href: '/heat-pump-services/' },
    { text: 'Ductless mini-split service', href: '/ductless-mini-split/' },
    { text: 'Ductwork and airflow', href: '/ductwork/' },
    { text: 'Indoor air quality', href: '/indoor-air-quality/' },
    { text: 'Maintenance plan options', href: '/maintenance-plan/' },
  ],
  sourcesColumns: 2,
  sources: [
    { label: 'ENERGY STAR - Maintenance checklist', url: 'https://www.energystar.gov/saveathome/heating-cooling/maintenance-checklist' },
    { label: 'U.S. EPA - HFC phasedown FAQ', url: 'https://www.epa.gov/climate-hfcs-reduction/frequent-questions-phasedown-hydrofluorocarbons' },
    { label: 'California Energy Commission - 2025 Building Energy Efficiency Standards', url: 'https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/2025-building-energy-efficiency' },
    { label: 'California CSLB - C-20 classification', url: 'https://www.cslb.ca.gov/about_us/library/licensing_classifications/Licensing_Classifications_Detail.aspx?Class=C20' },
    { label: 'South Coast AQMD - July 2025 ozone advisory', url: 'https://www.aqmd.gov/docs/default-source/news-archive/2025/south-coast-aqmd-issues-ozone-advisory-due-to-heat-wave---july-7-2025.pdf' },
    { label: 'South Coast AQMD - August 2025 ozone advisory', url: 'https://www.aqmd.gov/docs/default-source/news-archive/2025/ozone-adv_080725.pdf' },
    { label: 'California Energy Commission - Los Angeles regional climate report', url: 'https://www.energy.ca.gov/sites/default/files/2019-11/Reg%20Report-%20SUM-CCCA4-2018-007%20LosAngeles_ADA.pdf' },
    { label: 'LADWP - Consumer Rebate Program', url: 'https://www.ladwp.com/residential-services/assistance-programs/consumer-rebate-program' },
    { label: 'Southern California Edison - Energy Savings Assistance Program', url: 'https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program' },
  ],
  faqs: [
    {
      q: 'How often should I schedule AC maintenance?',
      a: 'ENERGY STAR recommends a professional checkup once a year, before the cooling season. Spring is the practical time to book cooling service, because contractors get busier once summer heat arrives. Regular service can catch small problems early, but it cannot promise a system will never break down.',
    },
    {
      q: 'What is included in an AC tune-up?',
      a: 'A typical professional checkup covers controls, electrical connections, coils, the condensate drain, refrigerant level, and airflow. The exact checklist for your visit depends on your system. Anything beyond routine maintenance is explained and quoted before work begins.',
    },
    {
      q: 'How much does AC maintenance cost in Los Angeles?',
      a: 'It depends on the system, the access, and what the visit finds. The number of systems, coil and drain condition, roof or difficult access, and any parts or refrigerant work all move the total. Call (323) 776-9047 and we will explain what applies to your property.',
      links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
    },
    {
      q: 'Can AC maintenance lower my energy costs?',
      a: 'It can address problems that reduce efficiency, but savings depend on your system. ENERGY STAR notes that dirty coils can make a system run longer, incorrect refrigerant levels reduce efficiency, and airflow problems can cut efficiency by up to 15 percent. Whether a visit lowers your bill depends on what the inspection finds and how you use cooling.',
    },
    {
      q: 'Should I change my AC filter between visits?',
      a: 'Yes. ENERGY STAR advises inspecting and cleaning or changing filters monthly. Central AC, furnace, and heat-pump systems all depend on a clean filter for airflow. Replace the filter whenever it looks dirty, and follow the manufacturer’s guidance for your filter type.',
      boldLead: 'Yes. ENERGY STAR advises inspecting and cleaning or changing filters monthly.',
    },
    {
      q: 'Why is water leaking near my indoor AC equipment?',
      a: 'A plugged condensate drain is one common cause, but the actual cause needs to be identified. ENERGY STAR notes that a plugged drain can cause water damage and affect indoor humidity. Arrange service before running the system further, and treat a serious leak near electrical equipment as urgent.',
    },
    {
      q: 'Why is my AC running but not cooling well?',
      a: 'Several faults can cause it, so it needs a diagnosis rather than a guess. Airflow, dirty coils, refrigerant, controls, and electrical or mechanical faults can all produce warm air. That is a repair diagnosis, not a routine tune-up, and it should not be assumed to be low refrigerant.',
    },
    {
      q: 'Is refrigerant included in AC maintenance?',
      a: 'A checkup may assess refrigerant level, but refrigerant work is usually separate. Leak detection, repair, recovery, and recharge are separate approved work. Adding refrigerant without finding the leak only restores cooling temporarily.',
    },
    {
      q: 'Do I have to replace my R-410A air conditioner in 2026?',
      a: 'No. The EPA says existing equipment can stay in use through its useful life. The change applies to new installations: a split system installed after January 1, 2026 must use a refrigerant with a global warming potential below 700. Whether to replace an existing system depends on its condition, repair history, and your plans.',
      boldLead: 'No. The EPA says existing equipment can stay in use through its useful life.',
    },
    {
      q: 'Do you maintain ductless mini-splits, heat pumps, or rooftop units?',
      a: 'Tell us what you have and we will confirm before booking. Each type has its own maintenance path. Mini-splits need indoor-head filters, coils, and drain routing checked. Heat pumps share the cooling-side checks of an AC. Rooftop units add roof access and scheduling. Call (323) 776-9047 with your equipment type.',
      links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
    },
  ],
  // TODO(copy): client review of every FAQ answer above before launch.
};
