import type { ServicePage } from '@/content/services';
import { siteConfig } from '@/content/site-config';

// RESOLVED (2026-10-19, confirmed by user): the CSLB record for licenses #1126691 and #50251 shows C-20.
// RESOLVED (2026-10-20, price example cut): FAQ 10 used to cite a Carrier-published whole-house air
// purifier price example ($1,000-$3,000), unverified. The example and the Carrier source are gone. No
// Air Pro price is stated anywhere on this page and none should be added.
// TODO(data): confirm whether Air Pro sells or installs specific equipment brands, performs air
// testing, or offers warranties. None is claimed anywhere on this page; keep it that way until
// documented.
// TODO(data): confirm dispatch times and emergency availability. None is claimed anywhere on this
// page (see the "Emergency HVAC" moreLinks entry below - that page's own claims are out of scope here).
// TODO(data): real section photos to replace any remaining "Photo pending" tiles. The hero photo is set below.
// TODO(data): LADWP and SCE rebate program status must be rechecked immediately before launch -
// program funding and terms change.
// TODO(copy): client review of every FAQ answer below before launch.
//
// No prices, appointment windows, warranty terms, technician certifications, brand names, air-testing
// claims, or same-day/24-7/emergency-availability wording appear anywhere on this page - none are
// confirmed. See CLAUDE.md "Claims that must not ship".

// TODO(copy): group labels are new, confirm on review.
const indoorAirQualitySources: { label: string; url: string; group: string }[] = [
  { label: 'U.S. EPA - Adapting Buildings for Indoor Air Quality in a Changing Climate', url: 'https://19january2021snapshot.epa.gov/indoor-air-quality-iaq/adapting-buildings-indoor-air-quality-changing-climate_.html', group: 'EPA indoor air basics' },
  { label: 'U.S. EPA - Protect Indoor Air Quality in Your Home', url: 'https://www.epa.gov/indoor-air-quality-iaq/protect-indoor-air-quality-your-home', group: 'EPA indoor air basics' },
  { label: 'U.S. EPA - Biological Contaminants and Indoor Particulate Matter', url: 'https://www.epa.gov/indoor-air-quality-iaq/sources-indoor-particulate-matter-pm', group: 'EPA indoor air basics' },
  { label: 'U.S. EPA - Wildfires and Indoor Air Quality', url: 'https://www.epa.gov/emergencies-iaq/wildfires-and-indoor-air-quality-iaq', group: 'Wildfire smoke and local air quality' },
  { label: 'South Coast AQMD - Air Quality', url: 'https://www.aqmd.gov/home/air-quality', group: 'Wildfire smoke and local air quality' },
  { label: 'South Coast AQMD - 2022 Air Quality Management Plan, Appendix II', url: 'https://www.aqmd.gov/docs/default-source/clean-air-plans/air-quality-management-plans/2022-air-quality-management-plan/final-2022-aqmp/appendix-ii.pdf?sfvrsn=6', group: 'Wildfire smoke and local air quality' },
  { label: 'South Coast AQMD - September 2024 smoke and ozone advisory', url: 'https://www.aqmd.gov/docs/default-source/news-archive/2024/ext-smoke--september-9-2024.pdf', group: 'Wildfire smoke and local air quality' },
  // RESOLVED (2026-10-20, replaced with the full report URL): the old executive-summary URL was a soft 404. The County now
  // publishes the full report (cover: "Climate Change and Health Equity", "Strategies for Action Report") from its Office of
  // Environmental Justice and Climate Health page. Verified in Chromium: 200 over https, no certificate warning, application/pdf.
  { label: 'LA County Public Health - Climate Change and Health Equity: Strategies for Action', url: 'https://admin.publichealth.lacounty.gov/oejch/docs/about/climate-change-health-equity-strategies-action-report.pdf', group: 'Wildfire smoke and local air quality' },
  { label: 'California Energy Commission - 2025 Building Energy Efficiency Standards', url: 'https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/2025-building-energy-efficiency', group: 'Codes, permits and licensing' },
  { label: 'California CSLB - Get Licensed to Build guide', url: 'https://www.cslb.ca.gov/getlicensed', group: 'Codes, permits and licensing' },
  { label: 'LA Department of Building and Safety - Mechanical HVAC permits', url: 'https://dbs.lacity.gov/services/plan-review-permitting/mechanical-hvac-permits', group: 'Codes, permits and licensing' },
  { label: 'U.S. EPA - HFC phasedown FAQ', url: 'https://www.epa.gov/hfcs/frequent-questions-phasedown-hydrofluorocarbons', group: 'Refrigerant' },
  { label: 'LADWP - Consumer Rebate Program', url: 'https://www.ladwp.com/residential-services/assistance-programs/consumer-rebate-program', group: 'Rebates and incentives' },
  { label: 'Southern California Edison - Energy Savings Assistance Program', url: 'https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program', group: 'Rebates and incentives' },
];

const indoorAirQualitySource = (urlPart: string) => {
  const found = indoorAirQualitySources.find((s) => s.url.includes(urlPart));
  if (!found) throw new Error(`Unknown indoor air quality source: ${urlPart}`);
  return found;
};

// Full template content for /services/indoor-air-quality/. Reuses the same ServicePage shape and shared
// section components already built out for /services/ac-repair/, /services/ac-installation/, /services/ac-maintenance/, and
// /services/heating-repair/ - a second, parallel content shape (src/content/service-pages/) was deliberately
// not introduced, for the same reason recorded in every prior page's build report: one content system
// for one job. See the build report for the full list of new optional ServicePage fields added for
// this page (signsTable/ductTable/equipmentFitTable/smokePlan/replacementNote/systemsSectionId/
// regionSectionId/faqSectionId/decision.outro) and why several of them exist as new fields with new
// render positions in src/app/services/[service]/page.tsx rather than reusing an existing field's fixed slot -
// this page's approved section order doesn't line up with the position several existing optional
// fields (`catches`, `refrigerant`, `timeline`) are hardcoded to render at.
const indoorAirQualityBase: ServicePage = {
  primaryKeyword: 'indoor air quality los angeles',
  metaDescription:
    'Indoor air quality service for homes and businesses in Los Angeles and Southern California. Filtration, ventilation, and humidity reviewed. Schedule service.',
  lede:
    'AIRPRO SOLUTIONS provides indoor air quality service for homes and businesses in Los Angeles and across the South Bay, Orange County, and the Inland Empire. A visit starts with diagnosis, looking at filtration, ventilation, humidity, ducts, and equipment fit before anything is recommended.',
  heroImage: {
    src: '/images/services/indoor-air-quality/hero.webp',
    alt: 'Pleated air filter leaning against a wall beside a return air grille in a bright hallway, with a small air quality monitor on a shelf',
  },
  // TODO(copy): the old caption was one string, "Indoor air quality assessment for homes and businesses." Proposed two-part
  // caption mirrors AC Repair. Needs approval.
  heroCaption: { title: 'Indoor air quality', text: 'assessment for homes and businesses' },
  heroProof: [
    { icon: 'check', label: 'Licensed HVAC contractor' },
    { icon: 'home', label: 'Residential and commercial' },
    { icon: 'doc', label: 'Written options, not a sales script' },
    { icon: 'pin', label: '4 Southern California regions' },
  ],
  serviceType: 'Indoor Air Quality Service',
  ctaLabel: 'Schedule an Air Quality Visit',
  trustStripLicenseLabel: 'California license class',
  processTitle: 'What happens during an air quality visit',
  processColumns: 3, // 6 steps shown as 2 rows of 3 instead of the default 5-wide grid
  appliesTitle: 'Residential and commercial air quality work',
  regionTitle: 'Indoor air quality across Southern California',
  regionLinkVerb: 'Air quality service',
  faqTitle: 'Indoor air quality questions Southern Californians ask',
  finalCtaTitle: 'Get your indoor air quality question answered',
  finalCtaBody: 'Call us or request service online.',
  answer: {
    // TODO(copy): trimmed from 99 words to 40 (client approved editing content). Sentence (a), "A technician looks at
    // filtration... optional upgrades", is dropped: lede, visitIncludes and proofBody already cover it. Sentence (b), "No single
    // device fixes every problem...", moved word for word to the end of `decision.intro`.
    lead: 'Indoor air quality service',
    body:
      ' is an HVAC visit that works out why the air in a building feels dusty, stale, damp, or smoky. The EPA names three ways to reduce indoor pollution: control the source, ventilate, and clean the air.',
  },
  // "What is the air problem?" - four self-triage cards. The first two link to the equipment section
  // (#filtration) since that one section covers filtration, ventilation, and humidity together; the
  // third links to the smoke plan (#smoke); the fourth links out to AC repair for a failed-part
  // complaint, since airflow and repairs come before accessories per the approved copy.
  decision: {
    eyebrow: 'Start here',
    title: 'What is the air problem?',
    // TODO(copy): sentence moved here from the quick answer.
    intro: 'Pick the line that sounds like your building today. No single device fixes every problem, and a smell or a symptom alone does not identify mold, an allergen, or a medical cause.',
    columns: 4,
    cards: [
      { icon: 'air', title: 'Dust and filter loading', body: 'Dust returns fast or filters clog early. Start with filter fit, return leaks, and duct condition.', ctaLabel: 'See filtration options', href: '#filtration' },
      { icon: 'droplet', title: 'Stale, damp, or musty rooms', body: 'Stuffy air, condensation, or a musty smell when the AC starts. Start with ventilation, drainage, and humidity.', ctaLabel: 'See ventilation and humidity', href: '#filtration' },
      { icon: 'flame', title: 'Smoke and poor AQI days', body: 'Smoke odor or haze indoors. Start with a smoke plan and the most efficient filter your system can hold.', ctaLabel: 'See the smoke plan', href: '#smoke' },
      { icon: 'wrench', title: 'Weak airflow or a failed part', body: 'Hot and cold rooms, or a purifier, UV lamp, or humidifier that stopped working. Airflow and repairs come before accessories.', ctaLabel: 'See AC repair', href: '/services/ac-repair/' },
    ],
    outro: 'Most filter and purifier questions are routine appointments: filter maintenance, a purifier consultation, a seasonal system check, mild dust, or getting ready before smoke season.',
  },
  // TODO(data): this safety wording needs Air Pro safety policy review before launch (same status as
  // the urgency wording on every other service page).
  urgency: {
    title: 'When to call right away',
    intro: 'Skip the routine appointment and call promptly if:',
    items: [
      'You smell burning or an electrical odor from HVAC equipment',
      'Water is near the equipment or spreading from it',
      'A strong musty odor persists',
      'Smoke is getting indoors during an AQI alert',
      'A business has lost ventilation in an occupied space',
    ],
    closing: 'If you see smoke or fire inside the building, feel an electrical hazard, or suspect a gas or combustion problem, get everyone out and call emergency services first. Air quality equipment is not a substitute for emergency response.',
  },
  // "What fits which problem" (the EPA's three-strategy framework) - reuses the `timing` field/slot,
  // which sits in exactly the right position (right after the urgency box, before the symptoms/
  // diagnosis section) even though its name comes from /services/ac-maintenance/'s "when to schedule" cards.
  // RulesNote itself is generic (eyebrow/title/three cards), so no new field was needed here.
  timing: {
    eyebrow: 'The approach',
    title: 'What fits which problem',
    cards: [
      { title: 'Reduce the source', body: 'Cut down what is producing the pollutant: moisture, cooking fumes, smoke entry, dust sources. Some sources sit outside the HVAC system, and a visit can point them out.' },
      { title: 'Ventilate', body: 'Bring in or exhaust air so pollutants are diluted or removed. The EPA notes that inadequate ventilation can let indoor pollutant levels rise.' },
      { title: 'Clean the air', body: 'Filters, duct-integrated cleaners, and portable units capture particles. None of these three approaches is a universal fix, so a plan often combines them.' },
    ],
  },
  // "What the signs can mean" - occupies the same page.tsx slot as `diagnosis`/DiagnosisTable, but via
  // the new TableSection component (see services.ts) since this table needs a custom second-column
  // header ("What we look at", not DiagnosisTable's hardcoded "What a technician checks") and a
  // closing note with a link to AC repair.
  signsTable: {
    eyebrow: 'Warning signs',
    title: 'What the signs can mean',
    lead: 'A sign is a clue, not a diagnosis. The right column lists what a technician checks, not what is proven.',
    headings: ['What you notice', 'What we look at'],
    rows: [
      ['Dust returns quickly after cleaning', 'Filter fit, duct leakage, return-side bypass, outdoor particles, and indoor sources. An inspection identifies the cause.'],
      ['Musty odor when the AC starts', 'Moisture, condensate drainage, wet materials, and dirty components. An odor alone does not diagnose mold.'],
      ['Smoke odor or haze during fire events', 'Outdoor-air entry, gaps in the building, filter capacity, and ventilation settings.'],
      ['Stuffy rooms or lingering odors', 'Ventilation, occupancy, exhaust fans, duct airflow, and indoor sources.'],
      ['Condensation, damp bathrooms, or recurring mildew', 'Exhaust performance and the moisture source. A standalone HVAC product may not be the whole remedy.'],
      ['Hot and cold rooms or weak airflow', 'Duct design, dampers, the blower, filter restriction, and equipment sizing. Airflow is diagnosed before an accessory is chosen.'],
      ['Black residue or visible growth', 'Needs an inspection, and may call for a qualified environmental professional.'],
    ],
    afterText: 'We do not diagnose mold, allergies, or health conditions from an odor or a symptom. If cooling itself is failing, see ',
    afterLinkText: 'AC repair',
    afterLinkHref: '/services/ac-repair/',
  },
  visitEyebrow: 'The visit',
  visitTitle: 'What is included and what can cost extra',
  visitIncludesTitle: 'A typical visit may include',
  visitIncludes: [
    'Review of your complaint and your HVAC system',
    'A written proposal with options',
    'Equipment selection and mounting where the system is compatible',
    'Basic control integration where the equipment supports it',
    'Startup and basic operating instructions',
    'A filter or lamp supplied with new equipment',
    'Cleanup of the work area',
    'A recommended maintenance interval',
  ],
  visitExtraTitle: 'What can add to the cost',
  visitExtra: [
    'Electrical circuit or disconnect work',
    'Duct or plenum reconstruction',
    'Permit fees, plan check, or Title 24 documentation',
    'Asbestos testing or abatement',
    'Mold remediation, building-envelope repair, or water-damage restoration',
    'Laboratory air testing and environmental consulting',
    'Difficult attic, crawlspace, or roof access, or lift work',
    'After-hours work',
  ],
  visitExtraNote: 'Ask which of these apply to your property before you approve work. Final scope and inclusions are confirmed in writing.',
  // "What we can recommend" - the equipment/filtration section. `systemsSectionId` keeps the "#filtration"
  // anchor the decision cards above link to.
  systemsSectionId: 'filtration',
  systemsTitle: 'What we can recommend',
  systemsIntro: 'Equipment is chosen after the assessment, based on your system, its airflow, and your concern. Tell us what you have and we will confirm what fits.',
  systems: [
    { name: 'HVAC filtration', icon: 'air', body: 'Pleated filters and media filter cabinets in a range of MERV ratings. The right choice depends on what the filter slot, blower, and ducts can handle.' },
    { name: 'Whole-home air cleaners', icon: 'shield', body: 'Duct-integrated media, electronic, or carbon options. They connect to a central ducted system and must be compatible with the existing equipment.' },
    { name: 'UV equipment', icon: 'bolt', body: 'Coil-treatment lamps and in-duct products. Performance depends on the exact product and use, and lamps are a maintenance item.' },
    { name: 'Ventilation', icon: 'air', body: 'Bath and kitchen exhaust, outdoor-air dampers, ERVs and HRVs, make-up air, and demand-controlled ventilation, where the building calls for them.' },
    { name: 'Humidity control', icon: 'droplet', body: 'Whole-home dehumidifiers, humidifiers, condensate handling, and controls. The EPA target is 30 to 50 percent relative humidity, and below 60 percent where possible.' },
    { name: 'Ducts, returns, and filter access', icon: 'duct', body: 'Return grilles, registers, dampers, filter racks, plenums, and duct insulation. Inspection, sealing, repair, and redesign are separate from cleaning.' },
  ],
  // Two RefrigerantNote-style explainer callouts (MERV 13 fit, UV limits) - same `callouts` field/slot
  // /services/ac-maintenance/ introduced, rendered right after SystemsGrid since the single `refrigerant` field
  // is intentionally left unset on this page.
  callouts: [
    {
      id: 'merv',
      accent: 'sky',
      title: 'Is a higher MERV filter always better?',
      boldLead: 'No.',
      body: ' A higher-efficiency filter can reduce airborne particles, but only if the system can hold it. The filter slot or cabinet, blower capacity, duct design, and pressure drop decide what fits. The EPA recommends MERV 13 or better, or the most efficient filter your system can accommodate, to reduce fine particles during smoke events. We check the actual system before recommending a filter upgrade, and we do not promise that MERV 13 fits every system.',
      // TODO(copy): linked source line, replaces the plain sourceText
      sourceLabel: 'U.S. EPA, Wildfires and Indoor Air Quality',
      sourceHref: indoorAirQualitySource('wildfires-and-indoor-air-quality').url,
    },
    {
      id: 'uv',
      accent: 'amber',
      title: 'Does a UV light fix air quality problems?',
      boldLead: 'Not on its own.',
      body: " A UV product's performance depends on the model, placement, exposure time, airflow, and upkeep, and it does not remove an underlying moisture problem. We do not claim that UV eliminates viruses, mold, or odors. Visible growth or persistent moisture needs a source investigation and may need specialized remediation.",
    },
  ],
  // "A Southern California smoke plan" - new field, rendered via RulesNote (widened to accept a
  // ReactNode item body) right after the callouts above. `linkExternal: true` on the AQMD item opens
  // it in a new tab with rel="noopener noreferrer" per the external-sources rule.
  smokePlan: {
    eyebrow: 'Smoke season',
    title: 'A Southern California smoke plan',
    id: 'smoke',
    intro: 'Wildfire smoke and heat-related ozone reach Southern California during hot, dry stretches. These steps come from EPA guidance for heavy smoke.',
    items: [
      {
        title: 'Watch the AQI',
        before: 'South Coast AQMD publishes current and forecast air quality for Orange County and parts of Los Angeles, Riverside, and San Bernardino Counties. ',
        linkText: 'Check the AQMD air quality page',
        linkHref: 'https://www.aqmd.gov/home/air-quality',
        linkExternal: true,
        after: ' before you open windows.',
      },
      {
        title: 'Keep smoke out',
        before: 'Keep windows and doors closed. If your system has the option, set it to recirculate or close the outdoor-air intake damper.',
      },
      {
        title: 'Filter and clean',
        before: 'Use the most efficient filter your system can hold, MERV 13 or better where it fits, and replace it more often during heavy smoke. Add a portable air cleaner sized for the room, and avoid units that produce ozone.',
      },
    ],
    closing: 'Whether a whole-home purifier helps depends on how the system is designed and maintained. We can review your filter fit and outdoor-air settings before smoke season.',
  },
  // "Duct cleaning, sealing, or repair?" - new field, rendered via the new TableSection component.
  ductTable: {
    eyebrow: 'Ducts',
    title: 'Duct cleaning, sealing, or repair?',
    lead: 'These are different jobs. An inspection decides which one applies, and a purifier does not replace any of them.',
    headings: ['Work', 'When it fits'],
    rows: [
      ['Duct cleaning', 'When an inspection finds accumulated debris or contamination. It is not a guaranteed fix for allergies or health issues.'],
      ['Duct sealing', 'When ducts leak or are disconnected. This is a mechanical repair, not a cleaning.'],
      ['Duct repair or redesign', 'When ducts are damaged, or returns, dampers, or filter access are poorly designed. Adding equipment to a weak duct system does not correct the airflow.'],
    ],
    afterText: 'For duct work and airflow problems, see ',
    afterLinkText: 'ductwork services',
    afterLinkHref: '/services/ductwork/',
  },
  // "How your equipment changes the plan" - new field, rendered via the new TableSection component.
  equipmentFitTable: {
    eyebrow: 'Your system',
    title: 'How your equipment changes the plan',
    headings: ['System', 'What it means for air quality work'],
    rows: [
      ['Ducted split system', 'Often takes a filter cabinet or duct-integrated equipment when airflow and static pressure allow.'],
      ['Packaged unit', 'Heating and cooling in one cabinet, often on a roof or ground pad. Filtration and outdoor-air options vary by design.'],
      ['Heat pump', "Ducted, packaged, ductless, or multi-zone. The air handler and ducts may support accessories, depending on the manufacturer's instructions and the airflow design."],
      ['Ducted mini-split', 'Concealed indoor units serving one or more zones. Filter and accessory options depend on the unit and the duct layout.'],
      ['Ductless mini-split', 'Each indoor head has its own washable filter. A duct-integrated whole-home cleaner generally cannot serve a ductless-only home, so occupied zones may need separate solutions.'],
      ['Commercial rooftop and VRF', 'May have filter sections, outside-air dampers, economizers, dedicated outdoor-air systems, exhaust, and building controls. Needs a site-specific ventilation review.'],
    ],
    afterText: 'Model-level compatibility is confirmed during the assessment, not from a system type alone.',
  },
  pricingTitle: 'What affects indoor air quality cost',
  pricingIntro: 'Pricing depends on what the assessment finds. The list below shows what moves the total, so nothing about your quote is a surprise.',
  pricingColumns: ['Factor', 'How it affects the quote'],
  priceFactors: [
    { item: 'HVAC layout', drivers: 'The kind of system and how many systems or zones serve the property.' },
    { item: 'Filter size and airflow', drivers: 'Whether the existing slot, blower, and ducts can hold a better filter, or a cabinet is needed.' },
    { item: 'The concern', drivers: 'Dust, smoke, odor, moisture, and ventilation each point to different equipment.' },
    { item: 'Duct and electrical access', drivers: 'Attic, crawlspace, or roof access, and whether new power or a disconnect is needed.' },
    { item: 'Ventilation changes', drivers: 'Adding outdoor air, exhaust, or an ERV or HRV is a larger scope than a filter change.' },
    { item: 'Permits and code documents', drivers: 'Local permits, plan check, and Title 24 documentation apply to some projects.' },
    { item: 'Moisture or contamination', drivers: 'If the inspection finds it, that work is scoped and priced separately.' },
  ],
  pricingClosing: 'After the inspection, ask for an itemized option for repair, filtration, purification, ventilation, or humidity control. We review the equipment manufacturer\'s coverage with you before work begins.',
  rulesEyebrow: 'The rules',
  rulesTitle: 'Licensing, permits, and energy-code basics',
  rules: [
    { title: 'Licensing', body: "California requires a licensed contractor for projects of $1,000 or more in labor, materials, and all other costs, and for any project that needs a building permit or uses employee labor. The C-20 classification covers ventilating systems, ducts, registers, humidity controls, and air filters connected to HVAC systems. Verify any contractor's active CSLB license, classification, insurance, scope, and written proposal before authorizing work." },
    { title: 'Permits', body: 'Installing or changing HVAC and ventilation equipment may need a local mechanical permit. Requirements depend on your city or county authority, not just the county name, so the jurisdiction is confirmed before work begins.' },
    { title: 'Energy code', body: "California's 2025 Energy Code applies to permit applications filed on or after January 1, 2026, and strengthens ventilation requirements. For new construction, additions, alterations, and system changes, the compliance path is set before installation. MERV 13 is not a universal requirement for every retrofit." },
  ],
  // "If an upgrade turns into a replacement" - new field, rendered via the existing RefrigerantNote
  // component in a new page.tsx slot positioned right before the rebates section (see services.ts for
  // why this isn't the `refrigerant` or `timeline` field instead).
  replacementNote: {
    title: 'If an upgrade turns into a replacement',
    body: "If replacement is recommended, we identify your system's refrigerant, explain whether repair components are available for the existing equipment, and give you options that meet current requirements. EPA's rules on which refrigerants may be used in new residential and light-commercial installations have changed more than once, and which rules apply depends on the equipment and when it was made or imported. Existing R-410A equipment can still be serviced. Ask your contractor which rules apply to the equipment in your proposal.",
    // TODO(copy): linked source line, replaces the plain sourceText
    sourceLabel: 'U.S. EPA, HFC Phasedown FAQ',
    sourceHref: indoorAirQualitySource('frequent-questions-phasedown').url,
    // TODO(design): replace with real photo (1200x900)
    media: { icon: 'snowflake' },
  },
  // "Rebates and incentives" - plain rebates callout, same shape /services/ac-maintenance/ introduced.
  rebatesNote: {
    title: 'Rebates and incentives',
    body: "Most utility programs focus on qualifying equipment such as heat-pump HVAC, not standalone purifiers. LADWP lists rebates for eligible residential heat-pump HVAC systems, and Southern California Edison's income-qualified Energy Savings Assistance Program may cover HVAC filters for eligible households. Eligibility depends on your address, utility account, equipment, and funding status, and programs change. Check the program page before you buy or schedule.",
    links: [
      { text: 'LADWP Consumer Rebate Program', href: 'https://www.ladwp.com/residential-services/assistance-programs/consumer-rebate-program' },
      { text: 'SCE Energy Savings Assistance Program', href: 'https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program' },
    ],
    // TODO(design): replace with real photo (1200x900)
    media: { icon: 'dollar' },
  },
  appliesTo: [
    { label: 'Single-family homes', icon: 'home' },
    { label: 'Condos and townhomes', icon: 'home' },
    { label: 'Older homes and additions', icon: 'home' },
    { label: 'Apartment communities', icon: 'building' },
    { label: 'Offices and retail', icon: 'building' },
    { label: 'Restaurants, salons, and gyms', icon: 'building' },
  ],
  appliesParagraph:
    'Older homes and additions may need an airflow and equipment-compatibility review before a filter upgrade. Ductless-only homes need a filtration plan for each indoor head and occupied zone. Condos and townhomes can involve HOA approval, shared walls, limited equipment access, and exhaust routing. Newer homes may have mechanical ventilation and controls that need to be understood before anything changes. Offices and retail need a review of the real mechanical design and occupancy. Restaurants, salons, and gyms often need source capture and code-required ventilation first, with filtration as one part of a larger design.',
  appliesLinks: [
    { label: 'Commercial HVAC', href: '/commercial-hvac/' },
    { label: 'Residential HVAC', href: '/residential-hvac/' },
  ],
  // "#areas" anchor for internal linking, per the build spec's anchor list.
  regionSectionId: 'areas',
  // TODO(copy): client review. The AQMD attribution now follows the 2022 AQMP Appendix II, p. 15: "The unfavorable combination of
  // meteorology, topography, and emissions from the nation's second largest urban area results in the Basin having some of the
  // worst air quality in the U.S." The old wording ("greater Los Angeles area ... nation's highest ozone and fine-particle
  // burdens") is not in the AQMP, the AQMD Air Quality page or the September 2024 advisory. Sea-breeze sentence: same p. 15.
  regionIntro: [
    "Southern California is not one climate. South Coast AQMD covers all of Orange County and major parts of Los Angeles, Riverside, and San Bernardino Counties, and describes the South Coast Air Basin as having some of the worst air quality in the U.S. Daytime sea breezes can carry pollutants from the coast toward inland valleys.",
    'Outdoor air explains why the question comes up. It does not tell a technician what is wrong with your system. We assess the property and the equipment, not the ZIP code.',
  ],
  // TODO(design): replace with real photo (1200x900, /images/services/indoor-air-quality/region.webp); no `image` shows a "Photo pending" tile.
  regionMedia: { icon: 'pin' },
  regionConditions: [
    // TODO(copy): client review. First sentence reworded 2026-10-20 (was "serious ozone and fine-particle problems"; "serious" is the
    // AQMP's PM2.5 classification, and its ozone classification is "extreme"). Sources, PDF page numbers:
    // - 2022 AQMP Appendix II, p. 8 (printed II-S-1): "The Basin is designated nonattainment for current and former federal and State
    //   ozone standards, as well as the current PM2.5 standards." "The Basin includes Orange County and the non-desert portions of
    //   Los Angeles, Riverside and San Bernardino counties."
    // - Same appendix, p. 45: "all four of the Basin's counties were above the 2015, 2008 and 1997 8-hour ozone NAAQS for the
    //   2018-2020 design values." p. 59 (Table 2-7): Los Angeles County 2018-2020 annual PM2.5 design value 13.0 ug/m3, 108 percent
    //   of the current (2012) annual NAAQS of 12.0 ug/m3.
    // - Smoke and heat: LA County Public Health, Strategies for Action, p. 10 (2020 heat waves and ozone, Woolsey and Bobcat smoke
    //   events); p. 20 ("clean air" shelters with adequate filtration during smoke events).
    { regionSlug: 'los-angeles-county', body: 'The county sits in a region that does not meet federal ozone or fine-particle standards, and heat waves and wildfires can add smoke exposure. Indoor air planning here can include a smoke-event filtration plan, filter access, a ventilation review, and source control.' },
    { regionSlug: 'south-bay', body: "Coastal areas feel the marine influence, and conditions differ from inland areas. An assessment can consider coastal moisture, marine-layer conditions, building ventilation, and the equipment's filtration needs. We do not assume a cause before inspecting." },
    { regionSlug: 'orange-county', body: 'Wildfire smoke and poor air quality have reached Orange County during regional events. Filter upgrades, portable-cleaner planning, ventilation, and smoke-event operation are the practical topics, and homes and equipment vary widely.' },
    { regionSlug: 'inland-empire', body: 'South Coast AQMD expected higher smoke impacts near fires and in the Inland Empire during a September 2024 extreme-heat event. Hot-weather load, dust, smoke preparation, and easy filter access are practical topics here.' },
  ],
  regionClosing: "Don't see your city? Call us and we will confirm coverage.",
  // "LA County" shorthand for this one region, matching the approved copy; the other three regions
  // already match the default "{regionLinkVerb} in {region name}" formula, so they're left unset.
  regionLinkLabels: {
    'los-angeles-county': 'Air quality service in LA County',
  },
  proofHeading: 'Diagnosis first, equipment second',
  proofBody: 'You get written options that separate required fixes from optional upgrades, so you can decide what to do next.',
  // TODO(data): "Emergency HVAC" is included per the approved copy's "More on this topic" row, but
  // that page's own always-on/24-7 availability wording is unconfirmed (see its own TODO in
  // services.ts) - linking to it here states no claim of our own, but flag before launch.
  moreLinks: [
    { text: 'AC repair', href: '/services/ac-repair/' },
    { text: 'AC installation', href: '/services/ac-installation/' },
    { text: 'Ductless mini-split', href: '/services/ductless-mini-split/' },
    { text: 'Emergency HVAC', href: '/services/emergency-hvac/' },
    { text: 'Maintenance plan options', href: '/maintenance-plan/' },
  ],
  // "#resources" anchor for internal linking, per the build spec's anchor list.
  faqSectionId: 'resources',
  sourcesColumns: 2,
  sources: indoorAirQualitySources,
  faqs: [
    {
      q: 'What is indoor air quality service?',
      a: 'It is an HVAC visit that evaluates and improves what affects the air inside a building. That includes particle filtration, ventilation, humidity, odors, ducts, and how the system runs. The EPA names source control, ventilation, and air cleaning as the main ways to reduce indoor pollution.',
    },
    {
      q: 'Can a better HVAC filter improve indoor air quality?',
      a: 'It can reduce airborne particles if the filter fits your system. The EPA recommends MERV 13 or better, or the most efficient filter the system can accommodate, to reduce fine particles during smoke events. Routine filter changes matter too.',
    },
    {
      q: 'Can every AC or furnace use a MERV 13 filter?',
      a: 'No, not automatically. Compatibility depends on the equipment, blower capacity, filter slot or cabinet, duct design, and pressure drop. A technician should assess the actual system before you upgrade.',
    },
    {
      q: 'What is the difference between an air filter and an air purifier?',
      a: 'An HVAC filter captures particles as air passes through the system. A purifier can mean several technologies, including duct-integrated devices and portable units, and performance depends on the technology, installation, airflow, and pollutant. A portable cleaner should be sized for the room and should not produce ozone.',
    },
    {
      q: 'Do whole-home air purifiers work during wildfire smoke?',
      a: 'They can be part of a smoke plan if the system is well designed and maintained. The EPA also recommends keeping windows and doors closed, using recirculation or closing outdoor intakes where the system has them, and using high-efficiency filtration or a correctly sized portable cleaner.',
    },
    {
      q: 'Should I run my HVAC system during a wildfire smoke event?',
      a: 'Set it to recirculate or close the outdoor-air intake damper if your system has one. The EPA advises using the most efficient filter your system can hold and replacing it more often during heavy smoke.',
    },
    {
      q: 'Does a UV light solve mold or air-quality problems?',
      a: "Not as a standalone fix. A UV product's performance depends on the model, placement, exposure time, airflow, upkeep, and the underlying moisture source. Visible growth, persistent moisture, or suspected contamination needs a source investigation and may need specialized remediation.",
    },
    {
      q: 'Do I need duct cleaning to improve indoor air quality?',
      a: 'Not necessarily. Duct cleaning can fit when an inspection finds accumulated debris or contamination. Filtration, duct leakage, moisture, ventilation, and indoor sources are separate issues, and an inspection should tell cleaning apart from repair or design work.',
    },
    {
      q: 'What humidity level is best indoors?',
      a: 'The EPA advises keeping relative humidity below 60 percent, ideally between 30 and 50 percent. Humidity that stays high is a moisture-source question as well as an equipment one.',
    },
    {
      // RESOLVED (2026-10-20, price example cut): the Carrier estimate and its framing sentence were removed
      // (see the file-top note). No Air Pro price is stated.
      // TODO(copy): trimmed answer, client to confirm.
      q: 'How much does a whole-home air purifier cost?',
      a: 'System type, home size, compatibility, and installation complexity all move the price, so an on-site quote is needed.',
    },
  ],
  // TODO(copy): client review of every FAQ answer above before launch.
};

// Location-style migration (docs/open-items.md "Service page migration"). Setting `glance` marks this service as migrated.
// TODO(copy): all strings in this block are new.
const count = (items?: readonly unknown[]): string => {
  if (!items?.length) throw new Error('indoor-air-quality-page: empty array used for a derived count');
  return String(items.length);
};

export const indoorAirQualityPage: ServicePage = {
  ...indoorAirQualityBase,
  glance: {
    title: 'Indoor air quality at a glance',
    stats: [
      { num: count(indoorAirQualityBase.timing!.cards), label: 'approaches the EPA names to reduce indoor pollution' },
      { num: '6', label: 'steps in an air quality visit' }, // = the indoor-air-quality `process` array length in services.ts; keep in sync
      { num: count(indoorAirQualityBase.sources), label: 'sources cited on this page' },
    ],
    // GlanceCard keys on `num`: the three numbers must stay different (3, 6, 15 today).
    // This EPA page names the three approaches (verified 2026-10-20). "Protect Indoor Air Quality in Your Home" does not.
    sources: [indoorAirQualitySource('sources-indoor-particulate-matter-pm')],
  },
  regionBand: {
    eyebrow: 'Across Southern California',
    title: 'How Southern California air and smoke shape indoor air quality work',
    card: {
      heading: 'Indoor air quality facts',
      // Rows are in drop-order priority for the 1280px balance check: Humidity goes first, then Smoke days.
      rows: [
        { label: 'Air quality data', value: 'South Coast AQMD publishes current and forecast air quality for Orange County and parts of Los Angeles, Riverside, and San Bernardino Counties' },
        { label: 'Smoke days', value: 'Keep windows and doors closed, set the system to recirculate or close the outdoor-air damper if it has one, and use the most efficient filter it can hold' },
        { label: 'Humidity', value: 'The EPA advises keeping relative humidity below 60 percent, ideally between 30 and 50 percent' },
      ],
      sources: [
        indoorAirQualitySource('aqmd.gov/home/air-quality'),
        indoorAirQualitySource('wildfires-and-indoor-air-quality'),
        indoorAirQualitySource('sources-indoor-particulate-matter-pm'),
      ],
    },
  },
  proofStats: [
    { num: `${siteConfig.rating}★`, label: 'Google rating' },
    { num: String(siteConfig.reviewCount), label: 'Google reviews' },
    { num: count(indoorAirQualityBase.faqs), label: 'air quality questions answered' },
    { num: count(indoorAirQualityBase.signsTable!.rows), label: 'warning signs explained' },
  ],
};
