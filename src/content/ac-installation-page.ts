import type { ServicePage } from '@/content/services';

// TODO(data): confirm Air Pro actually performs an on-site load calculation on every replacement,
// gives a written proposal before work, coordinates permits and inspections, handles Energy Code
// documentation and diagnostic testing, and verifies refrigerant charge and airflow. The copy below
// states these as process steps.
// TODO(data): rooftop and packaged units appear as a system type and an audience chip. Confirm Air
// Pro installs commercial rooftop equipment, or remove that card and chip.
// TODO(data): same-day, 24/7, and emergency installation wording, financing, warranty terms,
// manufacturer authorizations, brand lines, A2L equipment, and VRF capability are unconfirmed and
// intentionally absent from this page.
// TODO(data): third-party price ranges (Angi and contractor cost guides) were researched and
// intentionally not shown. They conflict across sources and need client approval.
// TODO(data): the incentives block shows program names with no dollar amounts, last checked
// September 29, 2026. Program funding and terms change. Consider a maintained rebates page in the
// planned /resources/ hub and link to it instead.
// TODO(data): financing link intentionally omitted from the page body until a financing partner is
// confirmed.
// TODO(data): city lists under each region are intentionally absent until coverage is confirmed
// (see CLAUDE.md doorway-page rule).
// TODO(copy): client review of every FAQ answer below before launch.

// Full template content for /ac-installation/. Reuses the same ServicePage shape and shared section
// components already built out for /ac-repair/ - see the build report for why a second, parallel
// content shape (src/content/service-pages/) was not introduced.
export const acInstallationPage: ServicePage = {
  primaryKeyword: 'ac installation los angeles',
  metaDescription:
    'Central AC installation and replacement for Los Angeles and Southern California properties, sized to your load. Request an installation estimate.',
  lede:
    'Replacing an aging system or adding cooling for the first time? Air Pro Solutions evaluates your property, sizes the system to its actual load, and gives you a written proposal before installation begins, for homes and businesses across Los Angeles, the South Bay, Orange County, and the Inland Empire.',
  heroProof: [
    { icon: 'check', label: 'Licensed HVAC contractor' },
    { icon: 'home', label: 'Residential and commercial' },
    { icon: 'doc', label: 'Written proposal before work' },
    { icon: 'pin', label: '4 Southern California regions' },
  ],
  serviceType: 'Air Conditioning Installation',
  ctaLabel: 'Request an Installation Estimate',
  symptomsTitle: 'When to schedule an installation evaluation',
  processTitle: 'Our AC installation process',
  appliesTitle: 'Residential and commercial AC installation',
  regionTitle: 'AC installation across Southern California',
  regionLinkVerb: 'AC installation',
  faqTitle: 'AC installation questions Southern Californians ask',
  finalCtaTitle: 'Get your AC installation estimate',
  finalCtaBody: 'Call us or request an on-site evaluation online.',
  answer: {
    lead: 'AC installation',
    body:
      ' is a planned project that starts with an on-site evaluation, not an equipment price. A technician inspects the current equipment, ducts, electrical, drainage, and placement, calculates the heating and cooling load, and recommends a system sized to the property. You then review a written proposal before work starts. The work covers equipment installation, refrigerant connections, controls, startup, airflow and charge verification, and the permit and inspection steps your city requires. The right system depends on the property: central AC, a heat pump, a packaged unit, or a ductless mini-split.',
  },
  symptomsIntro:
    'These are reasons to schedule an evaluation, not a diagnosis. A technician has to inspect the system before recommending repair or replacement.',
  symptomsNote: {
    before: 'Cooling out right now? ',
    linkLabel: 'See AC repair',
    linkHref: '/ac-repair/',
    after: ' for symptoms and what a technician checks.',
  },
  // Repair-vs-replace renders right after the symptoms section on this page (see CompareTable in
  // src/app/[service]/page.tsx), ahead of the process steps, instead of the ac-repair template's
  // default position after pricing.
  compareEarly: true,
  repairReplaceExtra: {
    paragraphs: [
      'ENERGY STAR advises considering replacement when an AC or heat pump is more than 10 years old, especially with frequent repairs, rising energy bills, or comfort problems. It is not a hard rule. A younger unit may warrant replacement after a major failure, and an older unit may still be repairable. Age, repair history, comfort, energy use, refrigerant, and total cost all count.',
      'If the repair is major or the system keeps breaking down, we can lay out a repair option beside a replacement option so you decide with the actual numbers.',
    ],
    linkText: 'Not sure whether to repair or replace your AC?',
    linkHref: '/ac-repair/',
  },
  visitEyebrow: 'The project',
  visitTitle: 'What is included and what can cost extra',
  visitIncludesTitle: 'A complete quoted installation typically covers',
  visitIncludes: [
    'Equipment installation and startup',
    'Refrigerant piping connection and commissioning',
    'Thermostat or control installation',
    'Basic equipment pad or mounting',
    'Permit administration, when the contract includes it',
    'Removal and haul-away, when the proposal includes it',
    'Coordination of required local inspections',
  ],
  visitExtraTitle: 'What depends on your property',
  visitExtra: [
    'Duct repair, sealing, or redesign',
    'Electrical panel upgrade, new breaker, or long circuit run',
    'Crane, roof access, curb modification, or structural work',
    'Asbestos or lead remediation, or unusual demolition',
    'HOA approvals, architectural review, or noise mitigation',
    'Drywall, framing, landscaping, or roofing restoration',
    'Zoning, advanced filtration, and other indoor air quality add-ons',
  ],
  visitExtraNote: 'Your proposal should say exactly what is included and what is not.',
  timeline: {
    heading: 'How long does installation take?',
    body:
      'Many straightforward replacements can be completed in a day once equipment, permits, and site conditions are ready. Projects involving ducts, electrical upgrades, rooftop access, multi-zone systems, or plan review may take longer.',
  },
  systemsTitle: 'Systems we install',
  systemsIntro:
    'We recommend a system after the evaluation and load calculation, not before. These are the common options.',
  systems: [
    { name: 'Split central AC', icon: 'wrench', body: 'An outdoor condensing unit connected to an indoor coil and blower or air handler, usually with ducts. A fit for properties with a suitable duct system.' },
    { name: 'Split heat pump', icon: 'wrench', body: 'Similar equipment that provides both cooling and heating. Worth comparing with a cooling-only replacement, subject to load, electrical, incentive, and property review.', link: { label: 'Heat pump services', href: '/heat-pump-services/' } },
    { name: 'Packaged units', icon: 'building', body: 'Cooling or heat pump components in one outdoor cabinet, ground or roof mounted. Used at some homes and many commercial properties.' },
    { name: 'Ductless mini-splits', icon: 'home', body: 'An outdoor unit connected to one or more indoor units without central ductwork. Suited to additions, targeted zones, and homes without ducts, once the layout is reviewed.', link: { label: 'Ductless mini-split options', href: '/ductless-mini-split/' } },
    { name: 'Ducted mini-splits', icon: 'home', body: 'A compact ducted indoor unit serving short duct runs or concealed zones. A design option where conventional ducts are impractical, confirmed at a site review.' },
    { name: 'Rooftop units', icon: 'building', body: 'Commercial packaged equipment on a roof. Roof access, curb, crane, controls, and municipal requirements can change scope and price.' },
  ],
  refrigerant: {
    title: 'New AC systems and the refrigerant change',
    body:
      'The EPA states that a wholly new split system installed on or after January 1, 2026 must use a refrigerant with a global-warming potential below 700. New lower-GWP systems may use A2L refrigerants such as R-454B, depending on the manufacturer and model, and installation must follow the manufacturer, the equipment listing, and the local authority. Existing R-410A systems can still be repaired through their useful life, so this rule is not a reason to replace a working system.',
    sourceLabel: 'U.S. EPA, HFC Phasedown FAQ (listed under Sources below).',
    sourceHref: 'https://www.epa.gov/climate-hfcs-reduction/frequent-questions-phasedown-hydrofluorocarbons',
  },
  pricingTitle: 'What affects AC installation cost',
  pricingIntro:
    'AC installation cost depends on the system type, required capacity, efficiency rating, duct condition, electrical work, equipment location, permit requirements, controls, and whether the project includes heating equipment or a heat pump conversion. After an on-site evaluation and load calculation, you get a written proposal that separates equipment, installation scope, permit requirements, and recommended upgrades.',
  priceFactors: [
    { item: 'System type and capacity', drivers: 'Cooling-only AC versus a heat pump, and the tonnage a load calculation calls for' },
    { item: 'Efficiency and staging', drivers: 'Single-stage, two-stage, or variable-capacity equipment, and the SEER2 rating' },
    { item: 'Ductwork', drivers: 'Existing duct condition, leakage, and sizing, and whether repair or redesign is needed' },
    { item: 'Electrical', drivers: 'Circuit, disconnect, panel, or service upgrade requirements' },
    { item: 'Location and access', drivers: 'Outdoor unit placement, roof access, crane use, pads, wall brackets, or structural work' },
    { item: 'Permits and compliance', drivers: 'Permit, plan review, inspection, Energy Code forms, and diagnostic testing where required' },
    { item: 'Extras', drivers: 'Filtration, zoning, smart controls, and condensate management upgrades' },
  ],
  pricingColumns: ['What changes the quote', 'What moves the price'],
  pricingNotes: [
    'Online price averages vary widely because they cover different scopes. Some count equipment only, and others include permits, ductwork, electrical work, or a heat pump conversion. Treat them as context, not a quote.',
    "Your written proposal should identify the exact equipment model, manufacturer warranty terms, registration requirements, and Air Pro Solutions' labor warranty terms before installation.",
  ],
  rulesEyebrow: 'The rules',
  rulesTitle: 'Licensing, permits, and energy-code basics',
  rules: [
    { title: 'Licensing', body: 'California requires a CSLB-licensed contractor for projects at or above the state threshold. The C-20 classification covers warm-air heating, ventilation, and air-conditioning work, including ducts and controls. Contractor advertising must show the license number, and you can verify any license on the CSLB website.' },
    { title: 'Permits and inspections', body: 'A fixed HVAC installation or replacement commonly requires a local mechanical permit. Electrical, plumbing, gas, building, and inspection requirements depend on the city or county and the scope of work. We explain the permit path before work begins.' },
    { title: 'Energy Code and efficiency', body: "California's 2025 Energy Code took effect January 1, 2026 and applies to HVAC additions and alterations. Field verification and diagnostic testing may be required. Split-system central AC in California must meet at least 14.3 SEER2." },
  ],
  incentives: {
    eyebrow: 'Incentives',
    heading: 'Rebates and incentives that may apply',
    lead:
      'Incentives depend on your utility, address, income, equipment, contractor, program funding, and timing. No rebate is guaranteed, and program details change, so confirm eligibility before you sign. Last checked September 29, 2026.',
    items: [
      { name: 'LADWP', body: 'Eligible LADWP electric customers in the City of Los Angeles may qualify for rebates on qualifying HVAC and heat pump HVAC systems. Funding is limited.', link: { label: 'LADWP Consumer Rebate Program', href: 'https://www.ladwp.com/residential-services/assistance-programs/consumer-rebate-program', external: true } },
      { name: 'Southern California Edison', body: 'SCE lists rebates and marketplace offers and points heat pump customers to statewide and income-qualified programs. Which utility serves you depends on your address.', link: { label: 'SCE rebates and marketplace', href: 'https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace', external: true } },
      { name: 'TECH Clean California', body: 'Statewide single-family heat pump rebates were reported fully reserved at our last check. Status can change, so check the live program page.', link: { label: 'TECH Clean California rebates', href: 'https://techcleanca.com/incentives/heehrarebates/', external: true } },
    ],
  },
  appliesTo: [
    { label: 'Single-family homes', icon: 'home' },
    { label: 'Condos and townhomes', icon: 'home' },
    { label: 'Homes without ducts', icon: 'home' },
    { label: 'Apartment communities', icon: 'building' },
    { label: 'Office and retail', icon: 'building' },
    { label: 'Rooftop package units', icon: 'building' },
  ],
  appliesParagraph:
    'Every property has its own constraints. Older homes can have limited electrical capacity, aging ducts, or no central duct system. Condos and HOA properties can involve approvals, shared walls, and placement or noise rules. Homes with an existing system still need duct, airflow, drain, electrical, and sizing review, because the size of the old unit is not proof of the right size. We evaluate the property before recommending equipment.',
  appliesLinks: [
    { label: 'Commercial HVAC', href: '/commercial-hvac/' },
    { label: 'Residential HVAC', href: '/residential-hvac/' },
  ],
  regionIntro: [
    'Southern California is not one AC market. Coastal South Bay and coastal Orange County have marine influence, while inland communities in eastern LA County, Riverside County, and San Bernardino County see much hotter summers. That is why each system is sized to the property, not to a county label or a ZIP code.',
    'Replacement planning is often easier before peak summer demand. If your system is aging, noisy, short-cycling, or needs repeated repairs, schedule an on-site evaluation before a breakdown forces a rushed decision.',
  ],
  // Region link labels are built as "AC installation in {region name}" from regions.ts (e.g. "AC
  // installation in Los Angeles County"), matching every other service page on the site, rather than
  // the shorthand "LA County" wording in the original brief - kept consistent with the one region
  // name already used everywhere else on the site.
  regionConditions: [
    { regionSlug: 'los-angeles-county', body: 'The county spans dense neighborhoods, coastal communities, valleys, and foothills, with single-family homes, multifamily housing, and commercial properties. Equipment selection follows the building envelope, ducts, occupancy, orientation, electrical capacity, and load calculation.' },
    { regionSlug: 'south-bay', body: "Torrance and nearby South Bay communities are coastal or near-coastal compared with inland Southern California, so we do not assume an inland cooling load. Each system is designed from the property's own measurements." },
    { regionSlug: 'orange-county', body: 'Orange County includes coastal and inland communities with different temperature patterns and a mix of detached homes, condos, multifamily buildings, hospitality, retail, office, and industrial properties. HOA rules for outdoor equipment vary by property.' },
    { regionSlug: 'inland-empire', body: 'Inland communities see much hotter summers, so cooling design matters. Capacity still comes from a load calculation for the property, not from a city name.' },
  ],
  regionClosing: "Don't see your city? Call us and we will confirm coverage.",
  proofHeading: 'A written proposal and plain answers before you commit',
  proofBody: 'You get the reasoning behind the recommended system, what is included, and what could change the price.',
  moreLinks: [
    { text: 'Duct inspection and replacement options', href: '/ductwork/' },
    { text: 'Indoor air quality and filtration options', href: '/indoor-air-quality/' },
    { text: 'Commercial HVAC', href: '/commercial-hvac/' },
    { text: 'Compare a heat pump with a central AC replacement', href: '/heat-pump-services/' },
  ],
  sourcesColumns: 2,
  sources: [
    { label: 'California CSLB - C-20 classification', url: 'https://www.cslb.ca.gov/about_us/library/licensing_classifications/Licensing_Classifications_Detail.aspx?Class=C20' },
    { label: 'California CSLB - Finding the right licensed contractor', url: 'https://www.cslb.ca.gov/consumers/hire_a_contractor/finding_the_right_contractor.aspx' },
    { label: 'California Energy Commission - HVAC requirements', url: 'https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/energy-code-support-center/hvac-0' },
    { label: 'California Energy Commission - 2025 Energy Code effective January 1, 2026', url: 'https://www.energy.ca.gov/news/2026-01/californias-energy-code-update-guides-construction-cleaner-healthier-buildings' },
    { label: 'U.S. EPA - HFC phasedown FAQ', url: 'https://www.epa.gov/climate-hfcs-reduction/frequent-questions-phasedown-hydrofluorocarbons' },
    { label: 'U.S. DOE - 2023 central AC standards FAQ', url: 'https://www1.eere.energy.gov/buildings/appliance_standards/pdfs/2023_CAC_Standards_FAQ_10-5-2022_Final.pdf' },
    { label: 'U.S. DOE Building America - HVAC equipment sizing', url: 'https://www1.eere.energy.gov/buildings/publications/pdfs/building_america/strategy_guide_hvac_sizing.pdf' },
    { label: 'ENERGY STAR - When is it time to replace?', url: 'https://www.energystar.gov/saveathome/heating-cooling/replace' },
    { label: 'ENERGY STAR - HVAC quality installation', url: 'https://www.energystar.gov/saveathome/heating-cooling/hvac-quality-installation' },
    { label: 'ENERGY STAR - Clean heating and cooling', url: 'https://www.energystar.gov/products/energy_star_home_upgrade/clean_heating_cooling' },
    { label: 'ENERGY STAR - Repair or replace', url: 'https://www.energystar.gov/ia/home_improvement/Replace_or_Repair.pdf' },
    { label: 'LADWP - Consumer Rebate Program', url: 'https://www.ladwp.com/residential-services/assistance-programs/consumer-rebate-program' },
    { label: 'Southern California Edison - Rebates and marketplace', url: 'https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace' },
    { label: 'TECH Clean California - HEEHRA rebates', url: 'https://techcleanca.com/incentives/heehrarebates/' },
    { label: 'The Home Depot - Heating and air conditioning installation in Los Angeles (installation timing)', url: 'https://www.homedepot.com/services/l/ca/los-angeles/heating-air-conditioning-installation/c16fbb4b7' },
  ],
  faqs: [
    {
      q: 'Should I repair or replace my air conditioner?',
      a: 'Consider replacement when the equipment is more than 10 years old, repairs are frequent or costly, utility bills are rising, or comfort problems persist. ENERGY STAR recommends this test for AC and heat pump equipment, but it is not automatic. A technician should inspect the system before recommending repair or replacement.',
    },
    {
      q: 'How much does AC installation cost in Los Angeles?',
      a: 'Cost depends on the system type, required capacity, efficiency rating, duct condition, electrical work, equipment location, permit requirements, and controls. Online price averages vary widely because they cover different scopes. After an on-site evaluation and load calculation, Air Pro Solutions provides a written proposal that separates equipment, installation scope, permit requirements, and recommended upgrades.',
    },
    {
      q: 'How long does AC installation take?',
      a: 'Many straightforward replacements can be completed in a day once equipment, permits, and site conditions are ready. Projects involving ducts, electrical upgrades, rooftop access, multi-zone systems, special-order equipment, or plan review may take longer.',
    },
    {
      q: 'Do I need a permit to replace an AC unit in California?',
      a: 'A fixed HVAC installation or replacement commonly requires a local mechanical permit. The project may also involve electrical, Energy Code, and inspection requirements, depending on the address, jurisdiction, and scope. Confirm requirements with the city or county that has jurisdiction, or with your licensed contractor, before work begins.',
    },
    {
      q: 'What size AC unit does my home need?',
      a: 'Size comes from a heating and cooling load calculation, not from square footage or the size of the old unit. ENERGY STAR warns that oversized equipment can cycle on and off too often, which hurts comfort and lifespan.',
    },
    {
      q: 'Can I replace my central AC with a heat pump?',
      a: 'Often, yes. ENERGY STAR states that a central air conditioner can often be replaced with a heat pump, which provides both cooling and heating. Your property still needs an evaluation of load, ductwork, electrical capacity, existing heating equipment, and available incentives.',
    },
    {
      q: 'Can I still repair an R-410A system?',
      a: 'Yes. Existing R-410A systems can be maintained and repaired through their useful life, including replacing a faulty component with a similar one. A wholly new split system installed on or after January 1, 2026 must use a refrigerant with a global-warming potential below 700.',
    },
    {
      q: 'What does SEER2 mean?',
      a: "SEER2 is a seasonal efficiency rating for air conditioners and heat pumps. DOE standards set minimum SEER2 values by product category and region. Split-system central AC in California's Southwest region must meet at least 14.3 SEER2. A higher rating is not automatically the best fit, because load, ducts, budget, and comfort goals all matter.",
    },
    {
      q: 'Do I need to replace ductwork when installing a new AC?',
      a: 'Not always, but the ducts should be inspected. ENERGY STAR says leaky ducts can waste energy, reduce airflow, and reduce comfort, and it recommends inspection and leakage testing where appropriate. Whether replacement is needed depends on condition, sizing, leakage, access, and the new system design.',
    },
    {
      q: 'Are rebates available for a new AC or heat pump?',
      a: 'Possibly, but eligibility depends on your utility account, address, equipment, contractor, program funding, and program rules. LADWP lists rebates for qualifying HVAC and heat pump HVAC systems, while statewide TECH Clean California single-family funding was reported fully reserved when we last checked. Check live eligibility before you sign a contract.',
    },
  ],
};
