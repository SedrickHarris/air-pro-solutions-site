import type { ServicePage } from '@/content/services';

// TODO(data): confirm the CSLB record for licenses 1126691 and 50251 shows C-20 before launch
// (trust strip, proof block, footer).
// TODO(data): "repair cost explained/given before any work begins" (hero lede, hero proof chip,
// process steps 4-5, proof block, pricing lead, FAQ 1) is the same unconfirmed-process status as the
// AC Repair and AC Maintenance pages - confirm with the client before launch.
// TODO(data): the safety wording in the "Is this an emergency?" block needs Air Pro safety-policy
// review before launch.
// TODO(data): the diagnostic/service-call fee, any fee waiver, and which visit-scope "extras" Air Pro
// actually bills separately are unconfirmed. Do not state them.
// TODO(data): the Angi Los Angeles furnace-repair cost range ($179-$802, average ~$490) needs client
// approval before it ships. If declined, remove it here (pricing note) and in FAQ 3.
// TODO(data): LADWP, SoCalGas, and TECH/HEEHRA rebate status must be rechecked immediately before
// launch - program funding and terms change. SDG&E is intentionally omitted (not a confirmed utility
// for this service area).
// TODO(data): city lists per region stay out of the "Where we work" section until the client confirms
// coverage (see CLAUDE.md doorway-page rule).
// TODO(copy): confirm "/ac-maintenance/" is the right link target for the "HVAC Maintenance" related-
// service card label, and that its content actually covers heating maintenance.
// TODO(data): do not link to /emergency-hvac/ from this page until the client confirms real
// always-on availability.
// TODO(copy): client review of every FAQ answer below before launch.
//
// No prices, appointment windows, warranty terms, technician certifications, or same-day/24-7/
// emergency-availability wording appear anywhere on this page - none are confirmed. See CLAUDE.md
// "Claims that must not ship".

// Full template content for /heating-repair/. Reuses the same ServicePage shape and shared section
// components already built out for /ac-repair/, /ac-installation/, and /ac-maintenance/ - see the
// build report for why a second, parallel content shape (src/content/service-pages/) was not
// introduced. A handful of new optional ServicePage fields (symptomsNoteText, diagnosisTitle,
// diagnosisEyebrow, refrigerant.boldLead/sourceText, relatedLabels) were added for pieces of this page
// that the existing fields couldn't already express; every one of them is optional so ac-repair,
// ac-installation, and ac-maintenance are unaffected.
export const heatingRepairPage: ServicePage = {
  primaryKeyword: 'heating repair los angeles',
  metaDescription:
    'Heating repair for homes and businesses across Los Angeles, the South Bay, Orange County, and the Inland Empire. Furnaces, heat pumps, and more. Call today.',
  lede:
    'Furnace not heating, a heat pump blowing cool air, or a system that keeps shutting off? AIRPRO SOLUTIONS provides residential and commercial heating repair in Los Angeles and across the South Bay, Orange County, and the Inland Empire - with a repair cost explained before any work begins.',
  heroProof: [
    { icon: 'check', label: 'Licensed HVAC contractor' },
    { icon: 'home', label: 'Residential and commercial' },
    { icon: 'dollar', label: 'Repair cost before work begins' },
    { icon: 'pin', label: '4 Southern California regions' },
  ],
  serviceType: 'Heating Repair',
  ctaLabel: 'Schedule Heating Repair',
  trustStripLicenseLabel: 'California license class',
  symptomsTitle: 'Common signs your heating needs repair',
  processTitle: 'Our heating repair process',
  appliesTitle: 'Residential and commercial heating repair',
  regionTitle: 'Heating repair across Southern California',
  regionLinkVerb: 'Heating repair',
  faqTitle: 'Heating repair questions Southern Californians ask',
  finalCtaTitle: 'Get your heating repair scheduled',
  finalCtaBody: 'Call us or request service online.',
  answer: {
    lead: 'Heating repair',
    body:
      ' is a diagnostic service followed by customer-approved corrective work. A technician identifies why a furnace, heat pump, or other heating system is not producing reliable heat, explains the cause, and repairs it once you approve the price. Common problems include ignition and flame-sensing faults, failed capacitors and blower motors, control-board and thermostat faults, airflow restrictions, and heat-pump defrost issues. Cold air, short cycling, and no airflow can each have several causes, so the right repair depends on the equipment and what testing finds.',
  },
  // TODO(data): this safety wording needs Air Pro safety policy review before launch.
  urgency: {
    title: 'Is this an emergency?',
    intro: 'Get to safety first if:',
    items: [
      'You smell gas: leave the building, avoid flames, sparks, and light switches, and call your gas utility or 911 from outside',
      'A carbon monoxide alarm sounds, or anyone feels dizzy, nauseous, or has a headache: get everyone outside and call 911',
      'You see smoke, soot, or flames around the equipment',
      'A burning or electrical odor lingers: shut the system off at the thermostat if it is safe to do so',
      'The system will not shut off',
    ],
    closing: 'Once everyone is safe, call us to arrange a repair. Do not try to repair gas or combustion components yourself.',
  },
  symptomsNoteText:
    'Many heating problems first appear when the system is turned on after months of limited use. A diagnostic visit can identify whether the issue involves ignition, airflow, controls, safety switches, a heat-pump defrost cycle, or another component.',
  diagnosisEyebrow: 'Diagnosis',
  diagnosisTitle: 'What your heating symptoms can mean',
  diagnosisIntro: 'A symptom rarely points to one part. These are the faults a technician tests for, not a diagnosis.',
  diagnosis: [
    { notices: 'Runs but blows cold air', causes: 'Thermostat and controls, ignition, flame sensing, gas supply, limit switches, and airflow. Cold air has several possible causes and needs diagnosis. One failed part should not be assumed.' },
    { notices: 'No airflow from vents', causes: 'Blower motor, capacitor, control board, power, thermostat, filter, and ducts. A no-airflow complaint can involve electrical controls, the blower assembly, or an airflow restriction.' },
    { notices: 'Turns on and off frequently', causes: 'Thermostat, filter or airflow restriction, limit control, sizing, and flame sensing. Repeated restarts can signal control, airflow, or safety-shutdown issues, so short cycling should be evaluated.' },
    { notices: 'Clicking, banging, squealing, or grinding', causes: 'The ignition sequence, blower assembly, inducer motor, loose components, or worn bearings. New or severe noises warrant inspection, especially if heating performance changes.' },
    { notices: 'Burning or electrical odor', causes: 'Dust burn-off, an overheated electrical part, a motor, or wiring. If an odor is persistent, electrical, or smoky, shut the system down if it is safe to do so and have it evaluated.' },
    { notices: 'Yellow, unstable, or unusual burner flame', causes: 'Combustion, burners, venting, and the fuel and air mix. Gas-combustion irregularities require qualified inspection. Do not adjust burners yourself.' },
    { notices: 'Water near an indoor heat pump or air handler', causes: 'The condensate drain, defrost operation, coil, and drain pan. Water may come from condensate or defrost operation but should be diagnosed before it damages finishes or electrical parts.' },
    { notices: 'Uneven temperatures', causes: 'Thermostat zoning, ducts, airflow, insulation, and equipment capacity. Uneven heating is not automatically an equipment failure. Duct and building-envelope conditions can matter too.' },
  ],
  visitEyebrow: 'The visit',
  visitTitle: 'What is included and what can cost extra',
  visitIncludesTitle: 'A typical heating repair visit may include',
  visitIncludes: [
    'Service call and diagnostic evaluation',
    'Symptom review and inspection of accessible equipment',
    'Basic safety evaluation suited to the equipment and complaint',
    'A written repair recommendation or estimate',
    'Your approved repair',
    'Basic operational checks after the repair',
    'Confirmation that the system starts and heats',
  ],
  visitExtraTitle: 'What can add to the cost',
  // TODO(data): the diagnostic fee, fee waiver, and which extras Air Pro bills separately are
  // unconfirmed. Do not state them.
  visitExtra: [
    'Diagnostic or service-call fee',
    'After-hours, weekend, or holiday dispatch',
    'Replacement parts and the labor to install them',
    'Major electrical work such as panel upgrades, new circuits, or disconnects',
    'Gas piping, venting, drain, duct, structural, roof, or crane work',
    'Access constraints such as HOA approval, lifts, rooftop access, or tenant coordination',
    'Commercial after-hours work',
    'Permit fees and Energy Code documentation when equipment is replaced or installed',
  ],
  visitExtraNote: 'Ask your technician which of these apply to your job before you approve the work.',
  systemsTitle: 'Systems we diagnose',
  systemsIntro: 'Tell us what you have and we will confirm we can service it. Thermostats, controls, and ductwork are part of the diagnosis on every system.',
  systems: [
    { name: 'Gas furnaces', icon: 'flame', body: 'Burners, igniters, flame sensors, gas valves, pressure switches, inducer and blower motors, limit switches, control boards, heat exchangers, and flues.' },
    { name: 'Electric furnaces and air handlers', icon: 'bolt', body: 'Heating elements, relays and sequencers, breakers, contactors, blower assemblies, controls, and safety switches.' },
    { name: 'Heat pumps', icon: 'wrench', body: 'The outdoor unit, reversing valve, defrost controls, sensors, control boards, indoor air handler, auxiliary heat, refrigerant circuit, and condensate system.' },
    { name: 'Packaged units', icon: 'building', body: 'Heating and cooling components in one cabinet, found on roofs, pads, balconies, and commercial sites.' },
    { name: 'Ductless mini-splits', icon: 'home', body: 'Indoor wall, ceiling, or concealed units, an outdoor unit, refrigerant lines, controls, and condensate drainage.' },
    { name: 'Rooftop units and unit heaters', icon: 'building', body: 'Commercial equipment with burners or heat-pump sections, controls, belts, motors, igniters, sensors, and filters.' },
  ],
  refrigerant: {
    title: 'Can an R-410A heat pump still be repaired?',
    boldLead: 'Yes.',
    body:
      ' Existing R-410A equipment can still be serviced and repaired, and owners are not required to replace a working system only because it uses R-410A. The refrigerant transition applies to new equipment. New residential and light-commercial heat pumps and air conditioners are moving to lower-GWP refrigerants such as R-454B and R-32, which are classified A2L (lower flammability). Those systems need compatible equipment and installation practices and are not interchangeable with R-410A equipment. A technician can assess whether repair remains practical for your system.',
    sourceText: 'Sources: NAHB and Bosch Home Comfort (listed under Sources below).',
  },
  pricingTitle: 'What affects heating repair cost',
  pricingIntro: 'Heating repair pricing depends on what testing finds, not just the symptom. After diagnosis, ask for a written repair option that identifies the issue, the recommended scope, and the total before work begins.',
  priceFactors: [
    { item: 'Thermostat, flame sensor, igniter, capacitor, or relay', drivers: 'The part, access, the equipment, and whether another fault is found' },
    { item: 'Blower motor, inducer motor, control board, or gas valve', drivers: 'Exact part and model, availability, labor time, access, safety testing, and warranty coverage' },
    { item: 'Heat exchanger or another complex repair', drivers: 'Furnace age, safety condition, replacement cost, compatible parts, efficiency, permits, and replacement scope' },
    { item: 'Rooftop or commercial unit repair', drivers: 'Roof access, lift or crane needs, scheduling, and building controls' },
  ],
  // TODO(data): get client approval before keeping the Angi figure. If declined, remove it here and
  // in FAQ 3. Never show competitor diagnostic fees.
  pricingClosing:
    'For market context only, one Los Angeles cost guide from Angi reports typical furnace repairs of about $179-$802, with an average around $490. That range is third-party data, not an Air Pro quote. Your price depends on the failed part, labor, access, urgency, and equipment condition.',
  repairReplaceExtra: {
    paragraphs: [
      'There is no single age or dollar threshold that applies to every system, so fixed rules of thumb can mislead. A qualified technician should evaluate the equipment and the project scope before recommending either path.',
      'If the repair is major or the system has a history of breakdowns, we can provide a repair option and a replacement comparison so you can decide with the actual numbers.',
    ],
    linkText: 'Compare heating repair and replacement options',
    linkHref: '/furnace-installation/',
  },
  rulesEyebrow: 'The rules',
  rulesTitle: 'Licensing, permits, and energy-code basics',
  rules: [
    { title: 'Licensing', body: 'California C-20 contractors are authorized to install, service, and repair warm-air heating and HVAC systems, including associated ducts, flues, controls, and filters. Check any contractor’s current license and insurance on the CSLB website before work begins.' },
    { title: 'Permits', body: 'A permit may be required for HVAC installation, replacement, relocation, or modification. Requirements vary by scope and by the local building department, and not every repair needs one. For replacements, we can explain the permit path before work begins.' },
    { title: 'Energy code', body: 'California’s 2025 Building Energy Efficiency Standards apply to building permit applications submitted on or after January 1, 2026. They can affect system replacement and major alterations. Ordinary repair or component replacement may not follow the same documentation path, depending on scope and jurisdiction.' },
  ],
  appliesTo: [
    { label: 'Single-family homes', icon: 'home' },
    { label: 'Condos and townhomes', icon: 'home' },
    { label: 'Apartment communities', icon: 'building' },
    { label: 'Office buildings', icon: 'building' },
    { label: 'Retail and restaurants', icon: 'building' },
    { label: 'Rooftop package units', icon: 'building' },
  ],
  appliesParagraph:
    'Access matters as much as the fault. Condos and HOA properties, apartments, rooftops, attics, and older ductwork each change how a repair is planned, and landlords, property managers, and tenants often need to coordinate. We assess the property and the equipment, not the ZIP code.',
  appliesLinks: [
    { label: 'Commercial HVAC', href: '/commercial-hvac/' },
    { label: 'Residential HVAC', href: '/residential-hvac/' },
  ],
  incentives: {
    eyebrow: 'If repair leads to replacement',
    heading: 'Rebates and incentives',
    lead: 'Incentives matter mostly when diagnosis leads to replacement or a switch to a heat pump, not for routine repair. Availability depends on your utility, address, equipment ratings, permits, and current funding. Confirm eligibility before you buy.',
    items: [
      {
        name: 'LADWP',
        body: 'Heat-pump HVAC rebate. Eligible LADWP customers may qualify for a heat-pump HVAC rebate. Confirm your service address, equipment rating, program terms, and funding before purchase.',
        link: { label: 'LADWP rebate program', href: 'https://www.ladwp.com/residential-services/assistance-programs/consumer-rebate-program', external: true },
      },
      {
        name: 'SoCalGas',
        body: 'Natural-gas furnace rebate. Eligible SoCalGas customers may qualify for rebates on qualifying high-efficiency natural-gas furnaces, subject to permit closure, product eligibility, funding, and program rules.',
        link: { label: 'SoCalGas rebates', href: 'https://www.socalgas.com/savings/rebates-and-incentives', external: true },
      },
      {
        name: 'TECH and HEEHRA',
        body: 'Funding may be reserved. Availability is funding-dependent and may be reserved or waitlisted. Verify current project eligibility before you count on an incentive.',
        link: { label: 'TECH program status', href: 'https://techcleanca.com/incentives/single-family-incentives/', external: true },
      },
    ],
  },
  regionIntro: [
    'Southern California is not one heating market. Coastal areas are moderated by the Pacific, while inland valleys and foothill areas can see materially different temperatures. California Energy Commission standards rely on location- and building-specific compliance instead of one statewide sizing assumption. Weather tells you how urgent a breakdown feels. It does not tell a technician which part failed.',
    'Dust can collect on filters and equipment, and salt air may affect outdoor metal near the coast, but neither explains a particular failure without an inspection.',
  ],
  regionConditions: [
    { regionSlug: 'los-angeles-county', body: 'Coastal areas have ocean moderation, while inland and foothill-adjacent areas can see different temperatures and heating loads. Older single-family homes, condos, apartments, and commercial buildings each change how a repair is planned, from older ductwork and thermostat issues to HOA access and tenant scheduling.' },
    { regionSlug: 'south-bay', body: 'Coastal influence can moderate conditions, but heating is still needed on cooler nights and during marine-layer periods. We work on furnaces, heat pumps, package units, and rooftop units at condos, single-family homes, and commercial and industrial sites, coordinating with tenants and landlords where needed.' },
    { regionSlug: 'orange-county', body: 'Coastal and inland communities can have different temperature profiles, so we diagnose the actual system instead of assuming a countywide pattern. That means split systems, heat pumps, package units, and mini-splits at homes, condos, and commercial properties. HOA rules for outdoor equipment vary by property.' },
    { regionSlug: 'inland-empire', body: 'Inland areas can be hotter in summer and colder overnight in winter than the coast, which puts more weight on working heating, ducts, controls, and airflow. Work spans large single-family tracts and commercial sites such as warehouses, retail centers, offices, and restaurants.' },
  ],
  regionClosing: "Don't see your city? Call us and we will confirm coverage.",
  // "LA County" shorthand for this one region, matching the approved copy; the other three regions
  // already match the default "{regionLinkVerb} in {region name}" formula, so they're left unset.
  regionLinkLabels: {
    'los-angeles-county': 'Heating repair in LA County',
  },
  // TODO(data): confirm that giving a repair cost before work begins is a real Air Pro process (hero
  // lede, hero chip, process steps 4 and 5, proof block, FAQ 1, pricing lead).
  proofHeading: 'A technician who explains what is actually wrong',
  proofBody: 'You get the diagnosis and the repair option explained before you approve any work, and a walkthrough of what was fixed and why.',
  // TODO(copy): confirm "/ac-maintenance/" is the right target for the "HVAC Maintenance" label and
  // that its content covers heating.
  relatedLabels: {
    'ac-maintenance': 'HVAC Maintenance',
  },
  // TODO(data): do not link to /emergency-hvac/ from this page until the client confirms real
  // availability.
  moreLinks: [
    { text: 'Ductless mini-split', href: '/ductless-mini-split/' },
    { text: 'Indoor air quality', href: '/indoor-air-quality/' },
    { text: 'Commercial HVAC', href: '/commercial-hvac/' },
    { text: 'Service areas', href: '/service-areas/' },
  ],
  sourcesColumns: 2,
  sources: [
    { label: 'California CSLB - C-20 classification', url: 'https://www.cslb.ca.gov/about_us/library/licensing_classifications/Licensing_Classifications_Detail.aspx?Class=C20' },
    { label: 'California CSLB - C-20 permit guidance', url: 'https://www.cslb.ca.gov/Resources/Newsroom/C-20_Permit_Enforcement_Letter.pdf' },
    { label: 'California Energy Commission - 2025 Building Energy Efficiency Standards', url: 'https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/2025-building-energy-efficiency' },
    { label: 'NAHB - New refrigerants', url: 'https://www.nahb.org/blog/2024/05/new-refrigerants-hvac' },
    { label: 'Bosch Home Comfort - A2L refrigerant change guide', url: 'https://www.bosch-homecomfort.com/us/en/residential/knowledge/a2l-refrigerant-change-guide/' },
    { label: 'LADWP - Consumer Rebate Program', url: 'https://www.ladwp.com/residential-services/assistance-programs/consumer-rebate-program' },
    { label: 'SoCalGas - Rebates and incentives', url: 'https://www.socalgas.com/savings/rebates-and-incentives' },
    { label: 'TECH Clean California - Single-family incentives status', url: 'https://techcleanca.com/incentives/single-family-incentives/' },
    { label: 'TECH Clean California - HEEHRA rebate status', url: 'https://techcleanca.com/incentives/heehrarebates/' },
    { label: 'Angi - Los Angeles furnace repair cost guide', url: 'https://www.angi.com/articles/how-much-does-common-furnace-repair-cost/ca/los-angeles' },
  ],
  faqs: [
    {
      q: 'Why is my furnace blowing cold air?',
      a: 'Cold air can have several causes, so a technician should diagnose it instead of replacing a part based on the symptom. Possible causes include the thermostat, airflow, ignition, flame sensing, gas supply, controls, and limit switches. AIRPRO SOLUTIONS gives you a repair cost before any work begins.',
    },
    {
      q: 'What should I do if I smell gas near my furnace?',
      a: 'Leave the area right away. Avoid flames, sparks, and operating electrical switches, and call your gas utility or 911 from a safe location. Do not try to diagnose or repair a possible gas leak yourself.',
    },
    {
      q: 'How much does furnace repair cost in Los Angeles?',
      a: 'Price depends on the failed part, labor, access, urgency, and equipment condition. One Los Angeles cost guide from Angi reports typical furnace repairs of about $179-$802, with an average around $490. That is market context, not an Air Pro quote. Ask for a written repair option with the total before you approve any work.',
    },
    {
      q: 'Can my R-410A heat pump still be repaired?',
      a: 'Yes. Existing R-410A equipment can still be serviced and repaired, and owners are not required to replace a working system only because it uses R-410A. A technician can assess whether repair remains practical for your system.',
    },
    {
      q: 'What refrigerant will a new heat pump use?',
      a: 'New equipment is moving to lower-GWP refrigerants, commonly R-454B or R-32, depending on the manufacturer and system. Both are A2L refrigerants and require compatible equipment and installation practices.',
    },
    {
      q: 'Does a heating repair require a permit in California?',
      a: 'Not every repair has the same permit requirement. HVAC installation and modification generally require permits, while the requirement for a specific repair depends on scope and the local building department. Confirm with the city or county that has jurisdiction.',
    },
    {
      q: 'Should I repair or replace my furnace?',
      a: 'Consider the diagnosis, safety condition, repair cost, repeat breakdowns, parts availability, age, energy performance, and replacement scope. There is no single age or dollar threshold that applies to every system. A qualified technician should evaluate the equipment before recommending either path.',
    },
    {
      q: 'How long does heating repair take?',
      a: 'It depends on the problem. Some repairs can be completed in one visit when the problem is clear and the part is available. Complex repairs can take longer because of part availability, access, safety testing, or added diagnosis. Your technician gives you an estimate after diagnosis.',
    },
    {
      q: 'Can a heat pump provide heat in Southern California?',
      a: "Yes. Heat pumps are used for both heating and cooling, and California's current Energy Code promotes their use in new residential construction. Whether one fits a specific property depends on building conditions, equipment design, and project scope.",
    },
    {
      q: 'Are there rebates if I replace my heating system?',
      a: 'It depends on your utility, address, equipment ratings, program rules, permits, and current funding. LADWP and SoCalGas list qualifying incentives. Statewide TECH and HEEHRA single-family funding was listed as fully reserved in 2026, so confirm current eligibility before you count on an incentive.',
    },
  ],
  // TODO(copy): client review of every FAQ answer above before launch.
};
