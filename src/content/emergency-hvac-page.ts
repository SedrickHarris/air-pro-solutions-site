import type { ServicePage } from '@/content/services';
import { siteConfig } from '@/content/site-config';

// Full template content for /services/emergency-hvac/. Reuses the same ServicePage shape and shared section
// components as every other core service page (see the Emergency HVAC build report for the full
// reconciliation notes: which fields are new, why, and the deliberate routing/metadata deviations).
//
// TODO(data): the "Emergency" wording (H1, headings, copy, breadcrumb, schema name) implies real,
// always-available emergency service. Confirm with the client before launch that this is true - see
// claude/open-items.md / docs/open-items.md "Emergency HVAC page" section.
// TODO(data): live answering hours, dispatch model, after-hours coverage, and any response-time
// commitment are unconfirmed - see the Availability PendingNote below. No 24/7 or same-day wording
// appears anywhere else on this page.
// TODO(data): the Availability PendingNote says nothing about 24/7 or same-day service is stated "until Air Pro confirms it", but 24/7
// emergency dispatch was approved on 2026-10-14. The PendingNote, the sentence above ("No 24/7 or same-day wording appears anywhere else
// on this page") and the services.ts card description need a client decision. Left unchanged here.
// TODO(data): the Permits card and FAQ 8 have no linked source. The Energy Commission HVAC alterations page says installing a space
// conditioning appliance requires a building permit, which supports equipment change-outs only, not duct alterations or electrical changes.
// TODO(data): the six-step process is framed as what emergency service "commonly involves," not
// confirmed Air Pro policy. Confirm written repair options, phone safety screening, and the listed
// testing before reframing any step as company policy.
// TODO(data): diagnostic fee, after-hours surcharge, fee credit toward an approved repair, and
// warranty terms are unconfirmed and not stated. No dollar figures appear anywhere on this page.
// RESOLVED (2026-10-19, confirmed by user): the CSLB record for licenses 1126691 and 50251 shows C-20, and "licensed, bonded and insured" is an approved claim. On this page the license class shows in the hero proof "Licensed HVAC contractor", the trust strip C-20 stat, the Licensing card, the proof block C-20 stat and the footer. "Bonded" and "insured" are not stated on this page.
// TODO(data): workers' compensation is not an approved claim. Do not state it anywhere until the client confirms it.
// TODO(data): commercial and rooftop capability, mini-split, heat pump, and PTAC scope are
// unconfirmed. PTAC and multifamily through-wall units are intentionally left off the systems list.
// TODO(data): region city lists are omitted until the client confirms coverage (see CLAUDE.md
// doorway-page rule).
// TODO(data): rebates and financing are intentionally not linked from this page.
// TODO(data): confirm logo file status (public/images/logo-mark.webp).
// TODO(photo): all image tiles use the "Photo pending" pattern (hero and 4 related cards; the region
// grid on this page uses per-region body copy instead of cards with photos, per RegionGrid's
// `showCities=false` mode already used by every other core service page).
// TODO(copy): client review of every FAQ answer below before launch.

// TODO(copy): group labels are new (migration). Group order is the display order of the references row.
const emergencyHvacSources: { label: string; url: string; group: string }[] = [
  { label: 'U.S. EPA - Carbon monoxide and combustion appliance safety', url: 'https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=30006LZL.TXT', group: 'Safety and diagnostics' },
  { label: 'U.S. DOE - Common air conditioner problems', url: 'https://www.energy.gov/sites/prod/files/2016/11/f34/Energy%20Saver%20101%20Infographic%20Home%20Cooling_0.pdf', group: 'Safety and diagnostics' },
  { label: 'U.S. DOE Building America - AC diagnostics', url: 'https://www1.eere.energy.gov/buildings/publications/pdfs/building_america/measure_guide_air_cond_diagnostics.pdf', group: 'Safety and diagnostics' },
  { label: 'U.S. EPA - HFC phasedown FAQ', url: 'https://www.epa.gov/hfcs/frequent-questions-phasedown-hydrofluorocarbons', group: 'Refrigerant' },
  { label: 'California Energy Commission - 2025 Building Energy Efficiency Standards', url: 'https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/2025-building-energy-efficiency', group: 'Energy code and licensing' },
  { label: 'California Energy Commission - HVAC alterations in existing homes', url: 'https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/energy-code-support-center/hvac-0', group: 'Energy code and licensing' },
  { label: 'California CSLB - C-20 classification', url: 'https://www.cslb.ca.gov/about_us/library/licensing_classifications/Licensing_Classifications_Detail.aspx?Class=C20', group: 'Energy code and licensing' },
  { label: 'NASA JPL - Southern California heat-wave differences', url: 'https://www.jpl.nasa.gov/news/nasa-maps-key-heat-wave-differences-in-southern-california/', group: 'Heat and climate' },
];
// No manufacturer, contractor or marketplace source is on this page (checked 2026-10-20), so there is no hold-out array.

const count = (items?: readonly unknown[]): string => {
  if (!items?.length) throw new Error('emergency-hvac-page: empty array used for a derived count');
  return String(items.length);
};

const emergencyHvacSource = (urlPart: string) => {
  const found = emergencyHvacSources.find((s) => s.url.includes(urlPart));
  if (!found) throw new Error(`Unknown emergency-hvac source: ${urlPart}`);
  return found;
};

const emergencyHvacBase: ServicePage = {
  primaryKeyword: 'emergency hvac los angeles',
  // metaServiceName ("Emergency HVAC Repair") feeds serviceTitle()/serviceH1() in src/lib/seo.ts so
  // the built title/H1 match the approved copy exactly: "Emergency HVAC Repair in Los Angeles |
  // AIRPRO SOLUTIONS" / "Emergency HVAC Repair in Los Angeles and Southern California". The real
  // service name ("Emergency HVAC") keeps rendering everywhere else (breadcrumb, nav, related links,
  // schema `name`) - see the /services/ductwork/ page for the same metaServiceName pattern.
  metaServiceName: 'Emergency HVAC Repair',
  metaDescription:
    'Emergency HVAC repair for homes and businesses across Los Angeles and Southern California. Know when to call 911 first and how to request service.',
  lede:
    'No cooling in a heat wave, no heat on a cold night, water where it should not be, or a burning smell from your system? AIRPRO SOLUTIONS provides emergency residential and commercial HVAC repair across Los Angeles, the South Bay, Orange County, and the Inland Empire. Call (323) 776-9047 to ask about availability for your address.',
  heroProof: [
    { icon: 'check', label: 'Licensed HVAC contractor' },
    { icon: 'home', label: 'Residential and commercial' },
    { icon: 'alert', label: 'Gas, smoke, or CO: call 911 first' },
    { icon: 'pin', label: '4 Southern California regions' },
  ],
  // Reverses the hero's button order/style so the phone call is the primary (filled) action and
  // "Request Emergency Service" is the ghost button - see the `heroCallPrimary` field doc in
  // services.ts for why this page alone gets that swap.
  heroCallPrimary: true,
  serviceType: 'HVAC Repair',
  ctaLabel: 'Request Emergency Service',
  trustStripLicenseLabel: 'California license class',
  processTitle: 'What emergency HVAC service commonly involves',
  processIntro:
    'This is the general sequence for an emergency call, not a promise about one specific visit. Your technician confirms how your visit will run.',
  processColumns: 3, // 2x3 grid for 6 steps, matching the AC Maintenance build's fix for the same wrapping problem
  appliesTitle: 'Emergency HVAC repair for homes and businesses',
  regionTitle: 'Emergency HVAC repair across Southern California',
  regionLinkVerb: 'Emergency HVAC repair', // fallback only; every region below has a regionLinkLabels override
  faqTitle: 'Emergency HVAC questions Southern Californians ask',
  finalCtaTitle: 'Get emergency HVAC help',
  finalCtaBody: 'Call us or request service online.',
  answer: {
    // TODO(copy): trimmed from 99 words to 50 (migration, recommended default from the planning chat), client to approve both cuts.
    // Lead is 3 words, sentence 1 is 23, the two life-safety sentences are 13 and 11.
    // Cut (a), sentence 2 (25 words, "A technician screens for safety, finds the cause of the failure, explains your options, and repairs or stabilizes the
    //   system once you approve the work."): dropped, not reworded. It states the unconfirmed process in the header TODO(data) (phone safety
    //   screening, approval before repair).
    // Cut (b), sentence 3 (24 words, "Common triggers include total loss of cooling in dangerous heat ... severe equipment noises."): dropped. Triage card 2
    //   and the diagnosis table cover it.
    // Sentences 4 and 5 stay (they are also in triage card 1, the hero chip, FAQ 3 and FAQ 4).
    // Over the 37 to 43 word band the other migrated pages use. Not built: lead plus sentences 1 and 4 (39 words, in the band, but it drops
    //   the 911 instruction from the band) and lead plus sentences 1 and 5 (37 words, an instruction with no reason).
    lead: 'Emergency HVAC repair',
    body:
      ' is a fast-tracked diagnosis and repair when a cooling or heating system fails at a time or in a way that cannot wait. Suspected gas leaks, smoke or fire, and carbon monoxide alarms are life-safety events. Leave the building and call 911 or the gas utility first.',
  },
  triage: {
    eyebrow: 'Start here',
    title: 'Which situation is this?',
    cards: [
      {
        variant: 'stop',
        tier: 'Life safety',
        icon: 'alert',
        h3: 'Leave and call 911 or the gas utility first',
        body: 'Do not treat these as a normal repair booking. Get everyone outside, then call from outside.',
        items: ['You smell gas', 'There is smoke or fire', 'A carbon monoxide alarm is sounding'],
      },
      {
        variant: 'emergency',
        tier: 'Emergency repair',
        icon: 'bolt',
        h3: 'Turn the system off and call for emergency service',
        body: 'The system may be unsafe to keep running, or the loss of comfort is serious.',
        items: [
          'No cooling during dangerous heat',
          'No heat with vulnerable occupants at home',
          'Water overflow near equipment or electrical parts',
          'Repeated breaker trips or a burning odor',
          'A frozen coil or severe equipment noises',
          'A commercial outage affecting your operations',
        ],
        button: { label: 'Call (323) 776-9047', href: siteConfig.phoneHref, style: 'primary' },
      },
      {
        variant: 'later',
        tier: 'Can be scheduled',
        icon: 'check',
        h3: 'Book the next repair visit',
        body: 'The system still runs, but something is off. A scheduled visit is usually enough.',
        items: [
          'Weak airflow or uneven rooms',
          'New noises that are not severe',
          'Longer run times or rising bills',
          'A system that cycles more than it used to',
        ],
        button: { label: 'Schedule a repair visit', href: '/contact/', style: 'outline' },
      },
    ],
    closing: 'If you are not sure which box you are in, call. We will help you sort out what is an emergency and what can wait.',
  },
  diagnosisTitle: 'What your symptoms can mean',
  diagnosisEyebrow: 'Diagnosis',
  diagnosisIntro: 'A symptom rarely points to one part. These are the faults a technician tests for, not a diagnosis.',
  diagnosis: [
    { notices: 'Runs but does not cool', causes: 'Refrigerant, compressor or control faults, coil fouling, airflow restriction, and thermostat or electrical faults. No cooling has several causes, so diagnosis comes before a repair recommendation.' },
    { notices: 'Weak airflow or hot and cold rooms', causes: 'Filter, ducts, blower, coil blockage, and settings. Weak airflow should be checked at the system.' },
    { notices: 'Frozen coil or ice on refrigerant lines', causes: 'Low refrigerant, a restriction, an expansion-device problem, improper charge, or an airflow issue. Turn the system off and arrange diagnosis, since repeated operation can worsen damage.' },
    { notices: 'Water near indoor equipment', causes: 'Drain blockage, a condensate pump issue, a frozen coil thawing, or a drainage defect. Shut the system off if water threatens finishes or electrical components, then request service.' },
    { notices: 'Breaker trips or a burning odor', causes: 'Electrical, control, motor, or compressor faults. Turn the system off and have it evaluated promptly.' },
    { notices: 'Furnace will not start', causes: 'Thermostat, ignition, flame sensing, pressure switch, control board, airflow, gas supply, or electrical causes. Do not bypass furnace safety controls.' },
    { notices: 'Furnace odor, soot, unusual flame, or a CO alarm', causes: 'A possible combustion or venting hazard. Leave the building if a CO alarm sounds or you suspect gas, and call 911 or the gas utility before HVAC service.' },
    { notices: 'Short cycling, banging, grinding, or squealing', causes: 'Electrical, motor, compressor, blower, control, airflow, or mechanical causes. The source cannot be confirmed remotely.' },
  ],
  visitEyebrow: 'The visit',
  visitTitle: 'What an emergency visit usually includes and what can cost extra',
  visitIncludesTitle: 'An emergency diagnostic visit commonly includes',
  visitIncludes: [
    'Travel and dispatch to the property',
    'Initial safety and equipment inspection',
    'Basic troubleshooting',
    'Identification of the probable failed component or system condition',
    'A repair recommendation and price proposal',
  ],
  visitExtraTitle: 'What can add to the cost',
  visitExtra: [
    'After-hours, weekend, holiday, or peak-demand surcharge',
    'Repair labor and replacement parts',
    'Refrigerant leak detection and repair',
    'Refrigerant recovery, evacuation, recharge, and verification',
    'Motor, compressor, coil, control board, or heat exchanger work',
    'Difficult access such as roof, attic, lift, gated property, or locked commercial space',
    'Permit, code compliance, HERS testing, electrical upgrades, or duct changes',
    'Replacement when parts are unavailable or repair is not practical',
  ],
  visitExtraNote: 'Ask about the diagnostic fee, any after-hours surcharge, and whether the fee is credited toward an approved repair before you agree to dispatch.',
  availability: {
    eyebrow: 'Availability',
    title: 'How fast can someone come out?',
    body: 'Response time depends on your location, current call volume, traffic, weather, technician availability, and the type of problem. Call (323) 776-9047 to ask about availability for your address.',
    pendingNote: 'live answering hours, dispatch model, after-hours coverage, and any response-time commitment. Nothing about 24/7 or same-day service is stated on this page until Air Pro confirms it.',
  },
  systemsTitle: 'Systems we diagnose',
  systemsIntro: 'Tell us what you have and we will confirm we can service it.',
  systems: [
    { name: 'Central split AC', icon: 'wrench', body: 'An outdoor condensing unit with an indoor coil, furnace or air handler, refrigerant line set, condensate drain, thermostat, and ducts.' },
    { name: 'Split heat pumps', icon: 'wrench', body: 'An outdoor heat pump paired with an indoor coil and air handler or furnace. It adds a reversing valve to the controls and refrigerant circuit.' },
    { name: 'Packaged units', icon: 'building', body: 'Cooling and heating components in one cabinet, mounted at grade or on a roof.' },
    { name: 'Gas furnaces with central AC', icon: 'home', body: 'Furnace burner and ignition, heat exchanger, flue and venting, blower, coil, drain, thermostat, and ductwork.' },
    { name: 'Ductless and ducted mini-splits', icon: 'home', body: 'An outdoor unit connected to one or more indoor heads, or to a compact ducted air handler, with refrigerant piping, condensate routing, and controls.' },
    { name: 'Rooftop and commercial package units', icon: 'building', body: 'Commercial equipment that can combine cooling, heating, ventilation, and controls, with roof-mounted electrical and mechanical parts.' },
  ],
  refrigerant: {
    title: 'Can an R-410A air conditioner still be repaired?',
    boldLead: 'Yes.',
    body:
      ' The EPA allows R-410A components to be used to service existing systems. EPA\'s rules on which refrigerants may be used in new residential and light-commercial installations have changed more than once, and which rules apply depends on the equipment and when it was made or imported. An existing R-410A system does not have to be replaced only because of that rule. If a repair is major, a technician can walk you through the repair option and a replacement comparison. Ask your contractor which rules apply to the equipment in your proposal.',
    sourceText: 'Source: U.S. EPA, HFC Phasedown FAQ.',
  },
  pricingTitle: 'What affects the cost of an emergency repair',
  pricingIntro:
    'Emergency repair pricing depends on when you call and what testing finds, not just the symptom. After diagnosis, ask for a written repair option that names the issue, the recommended scope, and the total before work begins.',
  pricingColumns: ['Factor', 'What moves the price'],
  priceFactors: [
    { item: 'Time of call', drivers: 'Standard hours, night, weekend, holiday, heat event, or unusually high demand' },
    { item: 'Diagnosis required', drivers: 'A no-cooling symptom can come from a thermostat, capacitor, control, motor, refrigerant circuit, compressor, airflow, or duct issue' },
    { item: 'Equipment type', drivers: 'Central split, heat pump, furnace, package unit, mini-split, rooftop unit, or other commercial equipment' },
    { item: 'Parts availability', drivers: 'Common controls may be on hand. Proprietary boards, motors, compressors, and coils may need to be ordered' },
    { item: 'Access', drivers: 'Attic, roof, crawlspace, ceiling, gated property, condo rules, parking, lift needs, or commercial building access' },
    { item: 'Refrigerant and repair scope', drivers: 'A leak has to be found and repaired. Adding refrigerant alone does not solve it' },
    { item: 'Code and replacement scope', drivers: 'Permits, Title 24 documentation, testing, electrical changes, duct corrections, and replacement equipment' },
  ],
  pricingClosing: 'Before you approve work, ask for the repair scope, the parts warranty, the labor warranty, any exclusions, and whether the diagnostic fee is credited toward completed repairs.',
  repairReplaceTable: {
    eyebrow: 'Not sure which you need?',
    title: 'Repair or replace after a breakdown?',
    columns: ['Repair may make sense when', 'Replacement may make sense when'],
    rows: [
      ['The failed part is isolated and repairable', 'A major component has failed, or failures keep repeating'],
      ['Parts are available for the system', 'Parts are unavailable or hard to source'],
      ['Refrigerant and system compatibility are not a concern', 'Refrigerant or system compatibility makes repair impractical'],
      ['Overall equipment condition is good', 'Overall condition, efficiency, or comfort problems point to replacement'],
    ],
    note: 'There is no single age at which a system should be replaced. A technician looks at the failed component, repair cost, parts availability, refrigerant and system compatibility, equipment condition, efficiency goals, permit and code scope, and your budget, then presents options before you decide.',
    noteBefore: 'If a replacement is on the table, ',
    noteLinkText: 'see AC installation and replacement',
    noteLinkHref: '/services/ac-installation/',
  },
  rulesEyebrow: 'The rules',
  rulesTitle: 'Licensing, permits, and energy-code basics',
  rules: [
    { title: 'Licensing', body: "California's C-20 classification covers the fabrication, installation, maintenance, service, and repair of warm-air heating, ventilating, and air-conditioning systems and their ducts, flues, controls, and filters. You can verify any contractor's license on the CSLB website." },
    { title: 'Permits', body: 'An emergency repair does not automatically remove local permit requirements. Equipment change-outs, duct alterations, and electrical changes can require a permit, and the city or county sets the rule for your project scope.' },
    { title: 'Energy code', body: 'The 2025 California Building Energy Efficiency Standards apply to permit applications submitted on or after January 1, 2026. HVAC alterations to existing homes must meet the applicable Energy Code sections, which can include field verification and diagnostic testing.' },
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
    'Access and authorization can shape an emergency call. Condos and HOA properties, apartments, and commercial spaces may need building access, landlord or tenant approval, or property manager coordination before work starts, and rooftop units add roof access and safety steps. Tell us about the property when you call.',
  appliesLinks: [
    { label: 'Commercial HVAC', href: '/commercial-hvac/' },
    { label: 'Residential HVAC', href: '/residential-hvac/' },
  ],
  regionIntro: [
    'Southern California is not one climate. NASA analysis of a regional heat wave found southern LA County and Orange County were cooler because of the Pacific and coastal moisture, while the San Fernando Valley and Riverside areas were drier and hotter. Heat events can also bring nighttime heat stress, which matters most for older adults, infants, and medically vulnerable occupants.',
    'Weather tells you how much of an emergency a breakdown feels like. It does not tell a technician which part failed. Inland properties can face dangerous indoor heat sooner, so a total cooling failure there is worth a call right away.',
  ],
  regionConditions: [
    // TODO(data): "heat warnings can cover both inland communities and some coastal areas" no longer has a cited source. The National Weather Service forecast discussion that was listed (issued October 14, 2026, a heat advisory for coastal areas) was removed from the references because it is a dated snapshot. Find a stable NWS or Cal OES page, or confirm the sentence with the client. NWS calls the product a "Heat Advisory"; the sentence says "warnings".
    { regionSlug: 'los-angeles-county', body: 'The county runs from the coast to inland valleys and foothills, and heat warnings can cover both inland communities and some coastal areas. When cooling fails during a heat advisory, we work through electrical, combustion, and drainage safety first, then the repair.' },
    { regionSlug: 'south-bay', body: 'Coastal influence keeps many days milder, but heat waves can still reach the area. Cooling failures in condos, coastal homes, townhomes, and small commercial spaces still need an accurate diagnosis of airflow, electrical, drainage, and refrigerant issues.' },
    { regionSlug: 'orange-county', body: 'Coastal and inland Orange County differ during heat events, with coastal moisture moderating some areas. We handle no-cooling, no-heat, drainage, and control failures based on the actual equipment and access.' },
    { regionSlug: 'inland-empire', body: 'Inland valleys and the Riverside area see higher heat exposure, so a total loss of cooling gets serious faster there. Temperature alone does not identify the fault, so we explain system shutdown, airflow, and electrical symptoms before recommending a repair.' },
  ],
  regionClosing: "Don't see your city? Call us and we will confirm coverage.",
  // Per-region link text is the approved copy verbatim (e.g. "Emergency HVAC repair in LA County"),
  // which differs from the default "{regionLinkVerb} in {region name}" formula (regions.ts names the
  // first region "Los Angeles County", not "LA County") - see the regionLinkLabels doc in services.ts.
  regionLinkLabels: {
    'los-angeles-county': 'Emergency HVAC repair in LA County',
    'south-bay': 'Emergency HVAC repair in South Bay',
    'orange-county': 'Emergency HVAC repair in Orange County',
    'inland-empire': 'Emergency HVAC repair in Inland Empire',
  },
  proofHeading: 'Clear answers when your system fails',
  proofBody: 'Tell us what is happening and we will help you sort out what is an emergency, what is safe to wait, and what to do next.',
  // Icon overrides for this page's related-service row: AC Repair (wrench) and Heating Repair (bolt)
  // have no default in the shared `relatedIcons` map in src/app/services/[service]/page.tsx (they'd otherwise
  // fall back to their own service icons, snowflake and flame), and AC Installation's approved icon
  // here (check) differs from that same map's existing 'ac-installation': 'wrench' default.
  relatedIcons: {
    'ac-repair': 'wrench',
    'heating-repair': 'bolt',
    'ac-installation': 'check',
  },
  moreLinks: [
    { text: 'Heat pump services', href: '/services/heat-pump-services/' },
    { text: 'Ductless mini-split repair', href: '/services/ductless-mini-split/' },
    { text: 'Ductwork and airflow problems', href: '/services/ductwork/' },
    { text: 'Indoor air quality', href: '/services/indoor-air-quality/' },
    // RESOLVED (2026-10-20, recommended default from the planning chat): relabeled from "HVAC maintenance after a repair". The target is cooling-side AC maintenance only, this page also covers furnaces, and a noindex level-2 stub hvac-maintenance exists in services.ts. Same fix as Heating Repair and Ductwork.
    { text: 'AC maintenance after a repair', href: '/services/ac-maintenance/' },
  ],
  sourcesEyebrow: 'References',
  sourcesColumns: 2,
  sources: emergencyHvacSources,
  faqs: [
    {
      q: 'Is no air conditioning an emergency?',
      boldLead: 'It can be an emergency during dangerous heat, especially for vulnerable occupants.',
      a: 'It can be an emergency during dangerous heat, especially for vulnerable occupants. The right response depends on indoor conditions, health needs, and whether there are electrical, smoke, or water-related safety concerns. Inland Southern California temperatures can run well above coastal temperatures during heat events.',
    },
    {
      q: 'What should I do if my AC stops cooling?',
      boldLead: 'Check the thermostat setting, replace a visibly clogged filter if it is safe to do so, and check whether a breaker has tripped.',
      a: 'Check the thermostat setting, replace a visibly clogged filter if it is safe to do so, and check whether a breaker has tripped. If the system still will not cool, turn it off if it is frozen, leaking, smoking, or making unusual noises, and arrange professional diagnosis. Dirty filters, refrigerant problems, faulty controls, duct restrictions, and drainage issues can all affect cooling.',
    },
    {
      q: 'What should I do if I smell gas near my furnace?',
      boldLead: 'Leave the building, avoid ignition sources, and call 911 or the gas utility before arranging HVAC repair.',
      a: 'Leave the building, avoid ignition sources, and call 911 or the gas utility before arranging HVAC repair. Do not treat a suspected gas leak as a standard service call.',
    },
    {
      q: 'What if my carbon monoxide alarm goes off?',
      boldLead: 'Get everyone outside immediately and call 911 or your local emergency number from outside.',
      a: 'Get everyone outside immediately and call 911 or your local emergency number from outside. Carbon monoxide cannot be seen, smelled, or tasted. Do not go back in until emergency responders say it is clear.',
    },
    {
      q: 'Why is my indoor coil frozen?',
      boldLead: 'Turn the system off and have it diagnosed instead of continuing to run it.',
      a: 'Turn the system off and have it diagnosed instead of continuing to run it. A frozen coil can be associated with low refrigerant charge, a refrigerant restriction, an expansion-device problem, or an airflow condition.',
    },
    {
      q: 'Are emergency HVAC calls more expensive after hours?',
      boldLead: 'Often, yes.',
      a: 'Often, yes. After-hours dispatch, weekends, and holidays can carry a higher diagnostic fee or a labor surcharge at many companies. Before you approve a visit, ask for the diagnostic fee, any surcharge, and whether the fee is credited toward an approved repair.',
    },
    {
      q: 'Can my older R-410A air conditioner still be repaired?',
      boldLead: 'Yes.',
      a: 'Yes. Existing R-410A systems can still be serviced. The EPA allows R-410A components to be used to service legacy systems. EPA\'s rules for new installations have changed more than once, and which rules apply depends on the equipment and when it was made or imported.',
    },
    {
      q: 'Does an emergency repair require a permit?',
      boldLead: 'It depends on the scope and the local jurisdiction.',
      a: 'It depends on the scope and the local jurisdiction. A straightforward repair may not trigger the same requirements as a replacement, but equipment change-outs, major alterations, ductwork, electrical work, and code-compliance upgrades can require local permits and Title 24 documentation. Confirm requirements with the city or county that has jurisdiction for the actual scope.',
    },
    {
      q: 'Should I repair or replace my HVAC system after a breakdown?',
      boldLead: 'Decide after diagnosis.',
      a: 'Decide after diagnosis. The key factors are the failed part, repair cost, parts availability, refrigerant and system compatibility, overall equipment condition, efficiency goals, permit and code scope, and your budget. System age alone does not settle it.',
    },
    {
      q: 'How fast can a technician arrive?',
      boldLead: 'It depends on your location and the conditions that day.',
      a: 'It depends on your location and the conditions that day. Response varies with call volume, traffic, weather, technician availability, equipment type, and whether the situation needs 911 or the gas utility first. Call (323) 776-9047 to ask about availability for your address.',
      links: [{ text: '(323) 776-9047', href: 'tel:+13237769047' }],
    },
  ],
};

// Location-style migration (docs/open-items.md "Service page migration"). Setting `glance` marks this service as migrated.
// TODO(copy): all strings in this block are new (glance labels, fact card, proof stats).
// GlanceCard keys on `num`: the three numbers must stay different (3, 6, 8 today). Fail the build if they collide.
// Alternates if one ever collides: count(emergencyHvacBase.priceFactors) is 7, count(emergencyHvacBase.visitIncludes) is 5. Do not use
// count(sources) (8 today, it would collide with the diagnosis count).
const glanceStats = [
  { num: count(emergencyHvacBase.triage!.cards), label: 'situations sorted, from life safety to scheduled' },
  { num: '6', label: 'steps an emergency visit commonly involves' }, // = the emergency-hvac `process` array length in services.ts; keep in sync
  { num: count(emergencyHvacBase.diagnosis), label: 'symptoms and what they can mean' },
];
if (new Set(glanceStats.map((x) => x.num)).size !== glanceStats.length) {
  throw new Error('emergency-hvac-page: glance stat numbers must be unique (GlanceCard keys on num)');
}

export const emergencyHvacPage: ServicePage = {
  ...emergencyHvacBase,
  glance: {
    title: 'Emergency HVAC at a glance',
    stats: glanceStats,
    // TODO(data): all three stats are page counts. The DOE Building America guide supports the fault families in the diagnosis rows (icing from low airflow and low charge, restricted airflow, failed contactors, capacitors and compressors), not the three triage tiers or the six-step visit. Confirm this source line reads correctly.
    sources: [emergencyHvacSource('measure_guide_air_cond_diagnostics')],
  },
  regionBand: {
    eyebrow: 'Across Southern California',
    title: 'How Southern California conditions shape emergency HVAC repair',
    card: {
      heading: 'Emergency HVAC facts',
      // Rows are in drop-order priority for the 1280px balance check: the last row goes first. Never go below two rows without
      // asking. Rows restate existing page copy or a source's own wording: no License row, no dollar amounts, no rolling dates, no
      // installation date, no permit or alteration claim, and no availability, 24/7 or response-time fact (docs/open-items.md Blockers).
      // Reserve row, not built (restore it if a row above is dropped): label "Energy code", value "The 2025 California Building Energy
      // Efficiency Standards apply to permit applications submitted on or after January 1, 2026" (date sentence only; source: the
      // Energy Commission 2025 standards page, "Buildings whose permit applications are applied for on or after January 1, 2026, must
      // comply with the 2025 Energy Code.").
      rows: [
        { label: 'Carbon monoxide alarm', value: 'Get everyone outside immediately and call 911 or your local emergency number from outside' },
        { label: 'Coast and valley', value: "NASA JPL's analysis of two heat waves in the summer of 2020 found southern LA County and Orange County stayed cooler, given their proximity to the Pacific Ocean and coastal moisture, while valley regions including San Fernando and Riverside skewed drier and hotter" },
        { label: 'Existing R-410A systems', value: 'The EPA allows R-410A components to be used to service existing systems' },
      ],
      sources: [
        emergencyHvacSource('nepis.epa.gov'),
        emergencyHvacSource('nasa-maps-key-heat-wave'),
        emergencyHvacSource('frequent-questions-phasedown'),
      ],
    },
  },
  proofStats: [
    { num: `${siteConfig.rating}★`, label: 'Google rating' },
    { num: String(siteConfig.reviewCount), label: 'Google reviews' },
    { num: count(emergencyHvacBase.faqs), label: 'emergency HVAC questions answered' },
    { num: count(emergencyHvacBase.repairReplaceTable!.rows), label: 'repair-or-replace factors compared' },
  ],
  // TODO(design): real photos (1200x900) to replace the two "Photo pending" tiles (refrigerant callout and region intro).
  regionMedia: { icon: 'pin' },
  refrigerant: {
    ...emergencyHvacBase.refrigerant!,
    media: { icon: 'snowflake' },
    // Linked source line on migrated pages. `sourceText` is left in place and is used by the unmigrated markup only.
    sources: [emergencyHvacSource('frequent-questions-phasedown')],
  },
  // No heroCaption and no heroImage (recommended default from the planning chat): the hero keeps its "Photo pending" tile.
};
