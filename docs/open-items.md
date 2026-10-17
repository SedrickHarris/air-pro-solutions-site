# Open items

Time-sensitive or client-dependent items that need to be re-checked before launch, or on the date
noted. Each item also has a `TODO(data)` or source comment at its actual location in the code -
this file is the index, not the source of truth.

## /service-areas/los-angeles/ (losAngelesOverrides in src/content/cities.ts)

- Title collision: `cityTitle('Los Angeles')` equals `homeTitle()`, so this page uses `cityTitleAcross()` ("HVAC Services Across Los Angeles, CA"). Decide whether to keep that or retarget the homepage.
- The neighborhood card shows only the City's ZIP listing, grouped by area in collapsed rows (no neighborhood pills). Arleta, Athens, Atwater and Baldwin Hills appear in the lede only. Climate, housing age, terrain, noise, HOA and competitor/SERP detail were NOT FOUND in the research and are not published. Add verified local detail before treating this as a full page.
- LADWP heat-pump rebate ("up to $2,500 per ton/unit", listed 2026-05-22): the research source is undated and the amount is also an open item on the LA County hub. Reconfirm amount and terms before launch.
- Client approved the "walk you through" permit wording on 2026-10-15.
- Client approved the "& Replacement" service card names on 2026-10-15. The emergency card wording was not named in the approval, so confirm it separately.
- Hero photo is still "Photo pending".
- Claim wording follows the approved list (24/7 emergency dispatch, same-day service typical and subject to capacity, licensed, bonded & insured, 4.8 stars / 40 reviews). Do not strengthen it.
- Reference artifact: claude/reference/los-angeles-location.html.

## /service-areas/long-beach/ (longBeachOverrides in src/content/cities.ts)

- Title: `cityTitle('Long Beach')` does not collide with another page's title ("HVAC Services in Long Beach, CA | AIRPRO SOLUTIONS"), so no `distinctTitle` is needed. Only Los Angeles collides.
- ZIPs: the card shows the 12 High-confidence ZIPs from the City ZIP-code map (90801-90808, 90810, 90813, 90814, 90815), grouped by area. Held out until confirmed against USPS/City GIS: 90744 and 90831 (Medium confidence), the institutional and PO-box ZIPs (90822, 90840, 90847, 90848, 90853, 90899), and 90809, 90745, 90746, 90749 and 90755 (third-party list only). The area group names come from the research's "General area" column.
- Verified-fact gaps (NOT FOUND, not published): NOAA station climate normals, median year built, single-family vs multifamily split for the city, exact noise-ordinance decibel limits, major employers and the port, and the competitor/SERP table. Add verified local detail before treating this as a full page.
- Electric service from SCE is High confidence in the research but no Long Beach-specific SCE territory page was found. Reconfirm.
- SCE rebate terms (PRE-LAUNCH LIVE CHECK, the SCE pages show no update date). Re-check each statement below on the live SCE pages, then update the "SCE rebates" resource card and the FAQ "Is there a rebate for AC or a smart thermostat in Long Beach?" in `longBeachOverrides` (the FAQ JSON-LD mirrors the array automatically), and re-export claude/reference/long-beach-location.html and the artifact:
  1. "Golden State Rebates instant coupons for air conditioners and smart thermostats at participating retailers" - confirm the program is still listed and still covers air conditioners and smart thermostats. The coupons are retailer-based; do not imply a contractor install qualifies unless SCE says so.
  2. "$75 bill credit through eligible demand-response programs when it temporarily adjusts an eligible smart thermostat by up to four degrees" - confirm the amount, the "up to four degrees" condition and that the program is still open. Source: https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace
  3. "free upgrades for eligible households through its Energy Savings Assistance Program" - confirm the program is still offered. Source: https://www.sce.com/save-money/income-qualified-programs/energy-savings-assistance-program
  Fallback if you would rather not maintain a dollar figure: drop the "$75" credit and keep the coupon wording. Also confirm SCE is still the electric provider shown for Long Beach on an SCE territory page.
- Long Beach Utilities gas: "nearly 150,000 accounts" covers Long Beach, Signal Hill and parts of nearby communities, so the glance card uses the pipeline-mileage figure with the Long Beach Utilities attribution rather than a Long Beach-only claim.
- Client approved the "walk you through" permit wording on 2026-10-15.
- Nearby row: Torrance, Los Angeles, Carson, Redondo Beach. Redondo Beach now links to its live page; Carson still links to a noindex stub until a real page exists.
- Port of Long Beach claims removed from /service-areas/los-angeles-county/ (Long Beach card note, the commercial paragraph and the "Port and logistics" chip). The "51,000 local jobs" figure was attributed to the City of Long Beach but comes from a Port-commissioned economic impact study (EDR Group, 2017 data, reported 2019). Re-add only with a current, correctly attributed source. The hub FAQ now notes that Long Beach has its own gas utility (SoCalGas serves most of the region).
- Client approved the "& Replacement" service card names on 2026-10-15. The emergency card wording was not named in the approval, so confirm it separately.
- Hero photo is still "Photo pending".
- Claim wording follows the approved list (24/7 emergency dispatch, same-day service typical and subject to capacity, licensed, bonded & insured, 4.8 stars / 40 reviews). Do not strengthen it.
- Reference artifact: claude/reference/long-beach-location.html.

## /service-areas/pasadena/ (pasadenaOverrides in src/content/cities.ts)

- Title: `cityTitle('Pasadena')` ("HVAC Services in Pasadena, CA | AIRPRO SOLUTIONS") does not collide with another page, so no `distinctTitle` is needed. The meta description is the hand-written `page.metaDescription` (159 characters, validated by `assertDescription`).
- ZIPs: the card shows the six ZIPs from the research (91101, 91103-91107) with its area labels, sourced to the USPS Postal Bulletin (about.usps.com/postal-bulletin/2023/pb22633/html/info_001.htm). The bulletin itself lists the ZIPs only, so confirm the area labels against a City or USPS listing before launch.
- Glance stats: 6 ZIP codes, 180-day permit validity, NOAA record starts 1893. NOAA climate normals could not be retrieved (robots disallowed) and are not published.
- Noise standards: the City agenda document (October 2024) describes revised exterior standards but does not confirm adoption. The page says so and sends visitors to the City. Reconfirm adoption, then replace the card and FAQ with the adopted rule.
- Electric provider is Pasadena Water and Power (City FY2025 budget page), confirmed, but it is not named on the city page and no PWP rebate is published. Add both only with a current PWP source.
- Verified-fact gaps (not published): housing-age and housing-mix figures, climate detail, major employers, outdoor-unit screening or setback rules.
- Client approved the "walk you through" permit wording on 2026-10-15.
- Nearby row: Los Angeles, Long Beach, Glendale, Burbank. Glendale and Burbank link to their noindex stub pages until real pages exist. South Pasadena is not routed.
- Client approved the "& Replacement" service card names on 2026-10-15. The emergency card wording was not named in the approval, so confirm it separately.
- Hero photo is still "Photo pending".
- Claim wording follows the approved list. Do not strengthen it.
- Go-live wiring done: Pasadena card href on the LA County hub, chip link on /service-areas/, hub intro wording, LA County page sentence, hubCityIndexNote. The South Bay, Orange County and Inland Empire hubs have no Pasadena content, so their "coming soon" text stays.
- Reference artifact: claude/reference/pasadena-location.html.

## /service-areas/culver-city/ (culverCityOverrides in src/content/cities.ts)

- Title: `cityTitle('Culver City')` ("HVAC Services in Culver City, CA | AIRPRO SOLUTIONS", 51 characters) does not collide with another page, so no `distinctTitle` is needed. The meta description is the hand-written `page.metaDescription` (151 characters, validated by `assertDescription`).
- Right-hand card: "Official Culver City resources" (new optional `page.officialResources`, rendered by LocalKnowledge with `ul.res` CSS), not a ZIP card. The research rated 90230-90233 Medium, and the USPS location links supplied later could not be read, so no ZIPs are published. The City's own pages put 90230 on Fox Hills Park and 90232 on City Hall and Blair Hills Park, but that is not a ZIP list. Add a ZIP card only after the USPS lookup confirms the list and area names.
- Lede neighborhoods: Fox Hills (City nav lists a Fox Hills Neighborhood Association; Fox Hills Park is a City park) and Hayden Tract (City specific-plan page). Blair Hills is not named because the City uses it only as a park name. Confirm both names against the City's neighborhoods map PDF.
- Held out because the cited source did not support the claim: Hayden Tract "Mixed Use Industrial" designation (Legistar link returned only a blank report header), zoning map "effective October 9, 2024" (ArcGIS app is not readable), MU-I district (not found in the Zoning Code table), and Building Safety hours (the Mechanical Permit page and the Building Safety page disagree).
- Not published (NOT FOUND or Medium in the research): electric and gas providers and any SCE or SoCalGas rebate, NOAA climate values (station USC00042214 exists but no values were pulled), Census housing figures, coastal or marine-layer wording, HVAC decibel limits, HOA areas, major employers, neighboring-city list.
- The Mechanical permit list comes from an undated City PDF on culvercity.org that calls itself a partial list, so the page says "ask Building Safety what your specific project needs".
- Hayden Tract Specific Plan: the 30-day public review ended 2026-09-27 and adoption hearings are expected November to January. The page only says the City has published a public review draft. Update the wording once the plan is adopted.
- Glance stats: 5 residential zoning districts (R1, R2, RLD, RMD, RHD), Mechanical permit scope, Municipal Code Chapter 9.07 (noise). The page does not state a decibel limit.
- Hub copy corrected: the LA County hub no longer says Culver City is "split between LADWP and SCE by address" or "near-coastal". Utility wording is now "confirm by address" (card note, utility paragraph, bullet, FAQ). Restore a specific utility statement only if the client or a source confirms one.
- Client approved the "walk you through" permit wording on 2026-10-15.
- Nearby row: Los Angeles, Long Beach, Pasadena, Torrance. All four have real pages. The research has no neighbor list, so adjacency is not claimed.
- Client approved the "& Replacement" service card names on 2026-10-15. The emergency card wording was not named in the approval, so confirm it separately.
- Hero photo is still "Photo pending".
- Go-live wiring done: Culver City card href on the LA County hub, chip link on /service-areas/, hub intro wording, LA County page sentence, hubCityIndexNote.
- Claim wording follows the approved list. Do not strengthen it.
- Reference artifact: claude/reference/culver-city-location.html.

## /service-areas/los-angeles-county/ (src/content/la-county-hub.ts)

- LADWP heat pump rebate amount ("Up to $2,500 per ton"): sourced from an undated utility page.
  Verify the current amount before launch.
- Removed 2026-10-15 because the Pasadena city research did not confirm them: the Pasadena
  screening rule (PMC 17.40.150) and "inland foothill setting" note, the Pasadena Water and Power
  heat pump rebate card ("$170 per ton"), and the Pasadena row in the SCAG housing table (49.3%
  single-family, 50.5% multifamily). Re-add only with a dated official source. The $75 SoCalGas
  thermostat card now fills the third rebate slot and has no link until an official URL is verified.
- Pasadena electric utility confirmed 2026-10-15: the City of Pasadena FY2025 adopted budget says
  Pasadena Water and Power supplies water and electricity to Pasadena. The earlier research listing SCE
  (Medium confidence) was wrong. The "$170 per ton" rebate stays removed until a dated official source is found.
- Pasadena was dropped from the "inland areas more exposed to heat" FAQ sentence and the climate intro
  because no official coastal or inland classification was found. It still appears in the "Where each
  city sits" group card.

## /service-areas/redondo-beach/ (redondoBeachOverrides in src/content/cities.ts)

- Title: `cityTitle('Redondo Beach')` ("HVAC Services in Redondo Beach, CA | AIRPRO SOLUTIONS", 53 characters) does not collide with another page, so no `distinctTitle` is needed. The meta description is the hand-written `page.metaDescription` (157 characters, validated by `assertDescription`).
- Right-hand card: "Official Redondo Beach resources" (`page.officialResources`), not a ZIP card. The USPS pages supplied could not be read, so no ZIPs are published. Add a ZIP card only after the USPS lookup confirms the list and area names.
- No community pills (`neighborhoods: []`). The lede names "North Redondo Beach" and "the Coastal Zone" only because the City's own pages use both terms.
- Mismatches between the research and the cited sources, resolved by holding the claim out: the CTS Portal / redondo.cts.city name and the Aug 5, 2024 date (the page says "the City's Citizen Portal" with no date or URL); 2022 vs 2025 code cycle (no code year stated); the pre-sale report; the "City Hall" label for the permit office; the USB hybrid submittal; the 310-318-0607 inspection line and required-fields claim; the FAQ and forms pages on redondo.org (fetch errors).
- Not published (NOT FOUND, Medium or unverified): ZIP list, climate values, Census housing figures, coastal or marine-layer wording, HVAC decibel limits, neighborhoods other than North Redondo Beach, SCE and TECH dollar amounts (the SCE programs card links the fact sheet instead of quoting amounts).
- Client approved every FAQ answer, the "walk you through the steps" wording and the "from North Redondo Beach to the Coastal Zone" lede wording on 2026-10-15.
- Nearby row: Torrance, Los Angeles, Long Beach, Culver City. The research has no neighbor list, so adjacency is not claimed.
- Client approved the "& Replacement" service card names on 2026-10-15. The emergency card wording was not named in the approval, so confirm it separately.
- Hero photo is still "Photo pending".
- Go-live wiring done: Redondo Beach card href on the South Bay hub, chip link on /service-areas/, hubCityIndexNote, South Bay page sentence. The Torrance and Long Beach nearby cards already linked this slug and now reach a live page.
- Existing South Bay hub copy checked against sources: multiple-family zones and the (MU) Mixed-Use Overlay (Zoning Code Article 2), exterior noise limits by receiving land use and time of day (Municipal Code 4-24.301), Clean Power Alliance listing Redondo Beach in its service area (Fall 2025 fact sheet), and the online Citizen Portal. No hub text needed changing. Not re-checked: the "west of the 405, reached from Pacific Coast Highway" sentence and the line saying the city code covers installation, alteration, repair and replacement of heating and cooling systems.
- Claim wording follows the approved list. Do not strengthen it.
- Reference artifact: claude/reference/redondo-beach-location.html.

## /service-areas/el-segundo/ (elSegundoOverrides in src/content/cities.ts)

- Title: `cityTitle('El Segundo')` ("HVAC Services in El Segundo, CA | AIRPRO SOLUTIONS", 50 characters) does not collide with another page, so no `distinctTitle` is needed. The meta description is the hand-written `page.metaDescription` (151 characters, validated by `assertDescription`; "Licensed, 4.8-star rated" only, none of the blocked words). Region is South Bay (src/content/regions.ts), so all hub wiring goes to the South Bay files.
- Right-hand card: "Official El Segundo resources" (`page.officialResources`), not a ZIP card. 90245 appears only as the Location field of a CEQAnet Housing Element notice (ceqanet.lci.ca.gov/2021110413, not a service-area statement) and on a third-party list (zip-codes.com); the USPS pages could not be read. Add a ZIP line only after a USPS or City listing confirms it.
- No community pills (`neighborhoods: []`) and no community names in the lede: none of the City pages checked gave a neighborhood list.
- Mismatches between the research and the cited sources, resolved by holding the claim out:
  - Chevron refinery (about 1,000 acres, 1,100+ employees, 500 contractors): elsegundo.chevron.com has none of these figures.
  - Specific-plan names (Downtown, Smoky Hollow, Pacific Coast Commons, South Campus) and the zoning-district list: the only source is gocodebook, which describes itself as AI-generated and unofficial. The cited zoning-map link is on the Rec & Parks domain and returned a fetch error; the Planning Division page does not mention a zoning map.
  - Noise "ESMC 7-2-3 and allowable decibel increases": the infilla FAQ is robots-blocked, and the only readable source (2015 South Campus EIR) cites 7-2-4 and 7-2-10. The page has no noise section, section number or decibel figure.
  - SoCalGas "start, transfer, restoration service": the research cites the SCE rebate page, which does not say it, and the SoCalGas rebates page does not either.
  - "SCE page lists gas water heaters": the page names only heat pump water heaters (coupons, no amounts).
  - Housing Element bulletin: dated 2024-07-31, not 2024-07-01. Real but not HVAC-relevant, so it is not on the page.
  - Building and Safety page: supports plan check, "permit issuance" and construction hours, but says nothing about mechanical or HVAC permits (the page says so). Its inspection Friday hours contain a typo, so inspection details are not published.
- Code edition (resolved 2026-10-15): the El Segundo Municipal Code (amlegal) section 13-4-1 adopts the 2025 California Mechanical Code with amendments, and 13-1-1 the 2025 California Building Code, both by Ord. 1680 (12-3-2025). The City's Building Codes page still lists the 2022 adoption (Ord. 1641) and is stale. The page states the 2025 Mechanical Code with local amendments and nothing about the amendment text, the Energy Code or the Green Building Code. The amlegal site notes it may not reflect the most current legislation.
- Census: owner-occupied rate differs by source (42.6% in the research for 2019-2023, 42.5% on QuickFacts now for 2020-2024, 42.0% on the City page from 2021 ACS) and the 7,889 housing-unit count could not be confirmed. Only the City's 2021 ACS 5-year structure split (53% multi-unit, 46.9% single-unit) is published, attributed to the City.
- Utilities: SCE (electric) and SoCalGas (gas) are confirmed by the utilities' own documents (SCE community engagement filing, 2021, which lists El Segundo; SoCalGas city list, undated). The two City directory pages in the research (service directory 369 and 368/268948) returned fetch errors. PRE-LAUNCH CHECK: reconfirm both on a current SCE territory page and SoCalGas listing. SCE and SoCalGas rebates are linked with no dollar amounts. The SCE rebate page lists instant coupons for air conditioners and smart thermostats (retailer-based) and a $75 smart-thermostat bill credit; neither figure is on the page.
- Commercial: Los Angeles Air Force Base and The Aerospace Corporation (2310 E. El Segundo Blvd., aerospace.org/locations) are named from the City's economic-development site ("home to Los Angeles Air Force Base", alongside The Aerospace Corporation). Northrop Grumman, Boeing, Raytheon and Lockheed Martin appear only on that promotional page and stay off the page. Client approval of naming the two organizations is pending (TODO(copy)).
- Not published (NOT FOUND, Medium or unverified): ZIP list, climate and NOAA values, coastal or marine-layer wording, median year built, neighborhood-specific home age, HVAC decibel limits, HOA or historic-district areas, condenser setbacks, humidity, TOU plan names, neighboring-city list.
- Client confirmed every FAQ answer on 2026-10-15 and approved the full page wording and content the same day, including the permit FAQ's "can walk you through the steps" wording, the condo and apartment FAQ, the commercial FAQ and the Air Force Base / Aerospace Corporation mention (also in the local paragraphs), and the emergency card wording. The "& Replacement" service card names were approved 2026-10-15 and are reused. No client confirmations remain open for this page.
- Glance stats: 53% multi-unit households (City demographics page), Mon-Sat 7a-6p construction hours (City Building and Safety page), 2 utilities (SCE and SoCalGas).
- Nearby row: Redondo Beach, Torrance, Los Angeles, Culver City. All four have real pages. The research has no neighbor list, so adjacency is not claimed. No other city's `nearby` row lists El Segundo, and the matrix `nearby` rows are unaffected.
- Go-live wiring done: El Segundo card href on the South Bay hub (`cities.items` in src/content/south-bay.ts), chip link on /service-areas/, `hubCityIndexNote`, and the South Bay page sentence.
- Hero photo is still "Photo pending".
- Existing South Bay hub copy checked against sources (client approved the fixes 2026-10-15): supported as written were "Community Development, Building and Safety Division" (City department URL) and local mechanical code amendments (Building Codes page). Changed because no source supports them: "immediately south of LAX" and the "LAX edge" group label (now labeled "El Segundo"), "corporate office, aerospace, high-tech, and airport-related" and "corporate campuses" (now aerospace and deep tech, per the City's economic-development site), "light industrial uses" (only an unofficial zoning summary supported it), the "2022 California Mechanical Code and 2022 Energy Code with local amendments" row (the Energy Code is listed without amendments and the City's pages disagree on the current edition), and the "LAX edge" / "El Segundo by LAX" phrasings in src/content/service-area-hub.ts (region card description, region table, hub lead) and the South Bay photo caption. Not re-checked: "the west and northwest" placement in the South Bay local paragraph.
- Claim wording follows the approved list. Do not strengthen it.
- Reference artifact: claude/reference/el-segundo-location.html.

## /service-areas/gardena/ (gardenaOverrides in src/content/cities.ts)

- Title: `cityTitle('Gardena')` ("HVAC Services in Gardena, CA | AIRPRO SOLUTIONS", 47 characters) does not collide with another page, so no `distinctTitle` is needed. The meta description is the hand-written `page.metaDescription` (160 characters, validated by `assertDescription`; "Licensed, 4.8-star rated" only, none of the blocked words). Region is South Bay (src/content/regions.ts), so all hub wiring goes to the South Bay files.
- Right-hand card: "Official Gardena resources" (`page.officialResources`), not a ZIP card. `neighborhoods: []` and `zips: []`, no community names on the page.
- Mismatches between the research and the cited sources, resolved by holding the claim out:
  - ZIP list (90247, 90248, 90249): the only source is qualitycountsca.net's california-zip-codes.pdf, which has no title, publisher, date or stated source (the "2018" is only in the URL). The research's "USPS confirmation" link (tools.usps.com/locations/details/1364432) shows no Gardena, South Gardena or Alondra office and no ZIPs. The City's utility page gives only the City Hall address (1700 West 162nd Street, 90247) and does not call 90247 the principal ZIP. The SDG&E-hosted climate-zone crosswalk PDF returned a fetch error. Add a ZIP card only after a USPS or City listing confirms the list.
  - Housing: the lead sentence attributes "about 52%" and "68% before 1970" to the data.census.gov profile, but they come from SCAG's 2019 Gardena local profile. The 21,837 units figure on the Census profile was not retrievable (JS page) and is not published. SCAG mixes vintages: unit counts and type split are California Department of Finance E-5 for 2018; building age is ACS 2017 via Nielsen. The decade shares (33.3% for 1950-1959, 17.6% for 1960-1969) are not readable from the SCAG chart (labels do not extract), so they were inferred from the 68% total and are held out. The B25035 table link uses geography 0682954, which differs from the Gardena profile's 0628168, so it may point at another city.
  - SCE: the $75 thermostat credit applies only to customers in specific programs (CBP-Elect, Critical Peak Pricing, Smart Energy Program), which the research omitted. The Energy Savings Assistance page says options "may not be available in all areas" and sets income limits (effective 2026-06-01 through 2027-05-31); it also says the Building Electrification Program closed to new enrollment in September 2026 and the ESA Whole Home pilot ends in 2026. The research's SCE Electrical Service Requirements row has a malformed URL and was not verified.
  - City utility page (cityofgardena.org/utility-providers/): its metadata and byline timestamps for 2026-05-01 differ by seven hours, so the exact update time is unclear. Content verified 2026-10-15: SCE (electric), SoCalGas (gas), Golden State Water (domestic water), West Basin (recycled water), and the links to SCE rebates, SoCalGas energy assistance and SoCalGas rebates.
- Code edition: NOT stated. Gardena Municipal Code 15.06.010 (ecode360) adopts the 2022 California Building Code, and the ordinance table lists Ord. 1888 (adopted 2026-03-10) as "Amends Mechanical Code" and "Amends Energy Code" with no edition or text. Open Ord. 1888 before stating any year or amendment.
- Permits (source outside the research, which marked the permit page NOT FOUND): cityofgardena.org/schedule-an-appointment/, article dated 2026-08-05. It lists "New HVAC Permit" and "Forced Air Unit Permit" as over-the-counter, links the HVAC permit to a "CF1R Form: Heating, Cooling, Duct System", says permits will not be processed without the completed CF1R forms, says to have all documents completed before arriving, and says a permit not on the list cannot be submitted in person. The page title says "Building & Safety Division" and the body says "Building and Safety Department", so the page uses "Building & Safety Division". The page also gives a phone number and email for appointments; neither is published.
- Utilities: SCE and SoCalGas are confirmed by the City's utility page and by the utilities' own documents (SCE "Southern California Edison's Service Area", updated 3/17/2025, lists Gardena; SoCalGas city list shows "GARDENA Los Angeles", undated). Nothing verifies whether a Community Choice Aggregation provider supplies generation in Gardena, so the page says nothing about generation. SCE and SoCalGas rebates are linked with no dollar amounts. Pre-launch recheck: reconfirm the City utility page and the SCE and SoCalGas rebate and ESA pages (terms, funding and income limits change).
- Not published (NOT FOUND, Medium or unverified): ZIP list, neighborhoods, climate and NOAA values, marine-layer or heat-island wording, humidity and air quality, median year built, neighborhood-specific home age, HVAC inferences (older ducts, no existing AC), SCE TOU plan names and rates, Gardena reliability metrics, noise limits (Gardena's code is on ecode360, not read), HOA or historic-district areas, major employers, industrial and zoning detail, neighboring-city list, SERP and competitor gap analysis.
- Housing figures published (each attributed): about 52% single-family (9,759 detached 44.6% plus 1,628 attached 7.4%), 42.3% multifamily (11.7% in 2-4 units, 30.6% in 5+ units), 5.7% mobile homes, all California Department of Finance E-5 2018 via SCAG's 2019 profile; 68% built before 1970 from ACS 2017 via the same profile. The page says the figures are dated.
- Glance stats: 52% single-family and 42.3% multifamily (DOF 2018 via SCAG), 68% built before 1970 (ACS 2017 via SCAG), 2 utilities (SCE and SoCalGas).
- Client approval: NOT YET CONFIRMED. Everything stays flagged TODO(copy) until the user says the client approved it: the local paragraphs, every FAQ answer, the emergency card wording, the SCE Energy Savings Assistance FAQ and wording, the over-the-counter permit FAQ, the commercial FAQ and the rebate wording. The "& Replacement" service card names were approved 2026-10-15 and are reused.
- Nearby row: Torrance, Redondo Beach, El Segundo, Los Angeles. All four have real pages. The research has no neighbor list, so adjacency is not claimed. The component labels the row "Also serving the rest of the South Bay", which is not accurate for Los Angeles (LA County region); the same applies to the El Segundo row. Other cities' `nearby` rows were not changed (Torrance's already lists gardena and now reaches a live page), and the Commercial HVAC region card (src/content/commercial-hvac.ts) already lists Gardena and was not changed.
- Go-live wiring done: Gardena card href on the South Bay hub (`cities.items` in src/content/south-bay.ts), chip link on /service-areas/, `hubCityIndexNote`, and the South Bay page sentence.
- Existing South Bay hub copy audited against the research and sources (client approved the fixes 2026-10-15, applied in the follow-up commit): changed because no source supports them: "Community Development, Building Services" (now "Building & Safety Division", per the City's Schedule An Appointment page and its comment in south-bay.ts); "industrial and warehouse zones" for Gardena (removed from the split card, the Gardena card note, the commercial service card and the commercial FAQ; Carson's wording was not audited and stays); "Torrance, Gardena, and Hawthorne form the inland middle around the 405 corridor" (now Torrance and Hawthorne only) and the "Central South Bay" group (Gardena now has its own group, like El Segundo); the service-area-hub.ts climate line placing Gardena and El Segundo inland (now "From the beach cities to Carson, including El Segundo, Torrance, Gardena, and Hawthorne."); and the 90248 note ("includes parts of Gardena, Carson, and Los Angeles' Harbor Gateway area") in the local note and the ZIP FAQ (the note is now generic; the FAQ example keeps only 90250, which was not checked and still needs a source). Supported as written: the Gardena permit row text (New HVAC and Forced Air Unit over-the-counter permits, CF1R forms) and the permit FAQ mention. Still not re-checked: "beach cities west of the 405, reached from Pacific Coast Highway" and the "photoCaptionBody" wording "Beach cities and inland South Bay".
- Hero photo is still "Photo pending".
- Claim wording follows the approved list. Do not strengthen it.
- Reference artifact: claude/reference/gardena-location.html.

## /service-areas/irvine/ (irvineOverrides in src/content/cities.ts)

- Title: `cityTitle('Irvine')` ("HVAC Services in Irvine, CA | AIRPRO SOLUTIONS", 46 characters) does not collide with another page, so no `distinctTitle`. The meta description is the hand-written `page.metaDescription` (155 characters, validated by `assertDescription`; "Licensed, 4.8-star rated" only). Region is Orange County (src/content/regions.ts; the hub is BUILT in src/content/orange-county.ts), so hub wiring goes to the Orange County files.
- Right-hand card: "Official Irvine resources" (`page.officialResources`, 7 links), not a ZIP card. `neighborhoods: []` and `zips: []`.
- Nearby row HELD OUT: `nearby: []`. No Orange County city page is live and the research has no neighbor list. Approved 2026-10-15: `src/app/service-areas/[city]/page.tsx` now skips the RelatedRow section when `nearby` is empty (no other page is affected, every other city has a non-empty row). Add Orange County cities to Irvine's `nearby` as their pages go live.
- Mismatches between the research and the cited sources, resolved by holding the claim out:
  - ZIP lists conflict (Wikipedia: 13 incl. 92616, 92619, 92623, 92650, no 92617; SimpleMaps: 10 incl. 92617). A later research message cites a "USPS-derived, September 2026" list (nine standard ZIPs) but its tools.usps.com link shows no Irvine data and its neighborhood labels are not on its cited page. Add a ZIP card only after a USPS or City listing confirms the list.
  - Gateway Preserve: the research says "70-acre residential village ... 1,138 homes". The City page says the Preserve is 700 acres; the 70 acres is the residential village (Gateway Village, groundbreaking 2026-06-23). Held out.
  - "Village planning model" is overstated by the research (the neighborhood-parks page uses "villages" in passing). Held out.
  - HOA page: it names Lower Peters Canyon, Northwood and El Camino Real as examples of single-family neighborhoods without an HOA (footnote: "Not all single-family neighborhoods"). It does NOT say Woodbury, Westpark or Rancho San Joaquin are covered or uncovered, and gives no HOA equipment rules. The HOA map linked is dated May 2020.
  - Self-service permit page: the City says "must obtain approval from your Homeowner's Association, if applicable" (the research softened it to "check with"). It does not say the permit is over-the-counter or instant ("Upon acceptance of your online application you will be emailed your permit"). No page date.
  - The SCE incentives message says TECH Clean California layers with the federal 25C credit; the 25C message says 25C expired 2025-12-31. 25C is not presented as a current incentive, and rebate dollar amounts (TECH $1,000/$2,000 etc.) are not published.
  - SCE time-of-use plans: the cited page could not be opened; not published.
- Code: Irvine Municipal Code on Municode (Supplement 20, codified through Ord. 26-05, online content updated 2026-07-30; Municode warns it may not reflect the most current legislation). Sec. 5-9-101 (Ord. 25-26, 11-12-25) adopts the 2025 California Mechanical Code (with errata) subject to Division 9 modifications. The Chapter 4 mechanical amendments were NOT read; the page says "2025 California Mechanical Code with local modifications" and nothing about their content. Sec. 6-8-205.C (Ord. 23-25, 12-12-23) limits noise from air conditioning, refrigeration or heating equipment to the higher of the Sec. 6-8-204 standard (by land use) or five decibels above ambient. Decibel values are not published on the page.
- Permits and equipment (City pages, retrieved 2026-10-15): self-service permits page (residential AC/furnace replacement WACR, same location, 2 feet from any property line, HOA approval if applicable); HVAC change-out page (commercial like-for-like rooftop packaged heat pump, 20 tons or less, 2,000 pounds per unit, roof slope 2% or less, no curb change, plans by the licensed mechanical contractor or Mechanical Engineer of Record, screening of rooftop or ground-mounted equipment citing zoning Sec. 3-20-1.B); permits-not-required page (portable equipment among limited exceptions; separate permits can still apply).
- PermitsDIRECT: the legacy permits site (permits.cityofirvine.org) says that from 2026-09-14 online no-plan-check applications are no longer accepted there and new online applications go through PermitsDIRECT!, powered by Symbium; the legacy site stays for plan check inquiries, permit inquiries and inspection requests. TODO(copy): confirm with the City which portal handles the residential replacement permit; the page tells readers to confirm.
- Utilities: SCE (electric) and SoCalGas (gas) per the City's local utility companies page (node/13136), which also lists IRWD (water) and Orange County Power Authority (OCPA). OCPA is intentionally LEFT OFF the page. Facts for the later decision: OCPA's own site (updated 2026-09-17) lists Irvine; the City voted in December 2024 to withdraw and rescinded that vote on 2025-09-09. Pre-launch recheck: OCPA and the City utility page, the SCE and SoCalGas rebate and ESA pages (terms, funding and income limits change), the City rebates page (links one HVAC loan, up to $25,000 per the City, and SCE/SoCalGas programs; no dollar amounts published).
- Housing figures published (one source each, attributed, labeled dated): SCAG's 2019 Irvine profile, DOF E-5 2018: 102,474 units; 38.9% single-family detached (39,853), 16.4% attached (16,722), 6.2% in 2-4 units, 37.4% in 5+ units, so 43.6% multifamily; 1.1% mobile homes (not published). Building age: ACS 2017 via the same profile, 4.8% built before 1970. The decade shares (about 25.5% for 2000-2009) are read off an unlabeled chart and are held out. SCAG URL pattern (https://www.scag.ca.gov/sites/default/files/2024-05/irvine_localprofile.pdf) loaded on 2026-10-15.
- Not published (NOT FOUND or unverified): ZIP list, neighborhoods and village names, climate and NOAA values, humidity and air quality, median year built, HVAC inferences, major employers, Irvine Business Complex and Spectrum detail, zoning map, neighboring-city list, SERP and competitor gap analysis, SCE TOU plans, rebate dollar amounts, the 25C credit (expired).
- Client approval: NOT YET CONFIRMED. Everything stays flagged TODO(copy) until the user says the client approved it: the local paragraphs, every FAQ answer, the emergency card wording, the PermitsDIRECT sentence, the code-adoption sentence, the SCE Energy Savings Assistance FAQ and wording, the commercial FAQ and the rebate wording.
- Go-live wiring done (Orange County hub is built): Irvine card `href` in `orangeCountyHub.cities.items` (src/content/orange-county.ts; `CityCardSpec` gained an optional `href` and the Orange County page links linked cards like the South Bay page), chip link on /service-areas/ (src/app/service-areas/page.tsx), `hubCityIndexNote` (src/content/service-area-hub.ts), and the Orange County page sentence. Skipped, pending the user's approval: the Commercial HVAC region card (src/content/commercial-hvac.ts, a city-name list only) and any other city's `nearby` row. No hub page was created.
- Orange County hub Irvine copy audited and corrected (user approved 2026-10-15): Irvine card note (1.4% / 23.7% replaced by SCAG's 4.8% pre-1970 and the DOF 2018 split), ZIPs and areas set to pending, utility line now names SoCalGas and the screening source, the "Freeway and toll-road hub" group removed, Irvine's age share removed from the cross-city comparison and FAQ, "newer planned communities" and Irvine Business Complex / Spectrum wording removed, rooftop weight wording matched to the City page, "zone standard" changed to "land-use noise standard", HOA approval wording matched to the City, and the gas note now says confirmed for Anaheim and Irvine. Not changed: the Commercial HVAC region card (a city-name list, src/content/commercial-hvac.ts).
- Hero photo is still "Photo pending".
- Claim wording follows the approved list. Do not strengthen it.
- Reference artifact: claude/reference/irvine-location.html (artifact https://claude.ai/artifact/WLWTM7Xg9C9cAjcXDC4ABK, version 1; to be synced to repo wording at the end).

## /service-areas/anaheim/ (anaheimOverrides in src/content/cities.ts)

- Title: `cityTitle('Anaheim')` ("HVAC Services in Anaheim, CA | AIRPRO SOLUTIONS", 47 characters) does not collide with another page, so no `distinctTitle`. The meta description is the hand-written `page.metaDescription` (152 characters, validated by `assertDescription`; "Licensed, 4.8-star rated" only). Region is Orange County (src/content/regions.ts; the hub is BUILT in src/content/orange-county.ts), so hub wiring goes to the Orange County files.
- Right-hand card: "Official Anaheim resources" (`page.officialResources`, 8 links), not a ZIP card. `neighborhoods: []`, `zips: []`, `nearby: []` (the city page skips the section when `nearby` is empty).
- Mismatches between the research and the cited sources, resolved by holding the claim out:
  - Same-location permit exemption: the research and the Orange County hub both apply "No Building Permit required for replacement in same location (Residential - R3 sf only)" to HVAC equipment. On the current Form B713 the `**` footnote is attached to the ventilation fan line ("Up to 300 c.f.m. on single duct (dryer, range, etc.)"), not to furnaces, AC or heat pumps. The page states no exemption and tells readers to confirm with the Building Division, (714) 765-5153.
  - Fees and resolution: the research cites a $182 minimum, a $58 supplemental fee and Resolution 2025-060. The current form (file stamped 2026-08-24) says $188 minimum, $60 supplemental and Resolution No. 2026-078. No fees are published.
  - The research's 714-765-4311 phone was not confirmed. The form prints 714-765-5153 for the Building Division.
  - ZIP lists: only third-party sources (data.mongabay, hometownlocator) exist; the City's open-data ZIP dataset page lists no ZIPs. Held out.
  - Rebates: the APU rebate pages are linked, but no dollar amounts are published ($200 per ton and the other amounts are DSIRE-dated 2025-08-04 or unlisted on the City page).
  - The research's 358,000 population figure and its "tourism concentration" claim are not published (the City's About the Utilities page gives only an undated 25 million annual visitors).
  - Anaheim Resort "shielding and sound buffering": the City's Anaheim Resort page (anaheim.gov/1009) confirms 581 acres and the hotel, convention, restaurant, retail and entertainment uses, and says nothing about shielding or noise. Held out.
- Code: Anaheim Municipal Code on American Legal (supplement 2026 S-28; may not reflect the most current legislation). Sec. 15.03.010.0104 adopts the 2025 California Mechanical Code (Ord. 6613, 9-23-2025). The only mechanical amendment in Sec. 15.03.060 is a Chapter 1 substitution, so the page states the edition and nothing more. The City's building codes page (anaheim.net/6018) lists Climate Zone 8 and says the 2025 codes apply to projects submitted on or after 2026-01-01. Sec. 6.70.010 sets a general 60 dB(A) property-line limit for sound radiated for extended periods; it is not HVAC-specific and the rest of its measurement conditions were not stated, so the page says so. Manual J criteria in AMC 15.03.040 were garbled and are held out.
- Housing figures published (one source each, attributed, labeled dated): SCAG's local profile of Anaheim ("2019 Local Profiles"), DOF E-5 2018: 108,222 units; 41.7% single-family detached, 8.6% attached, 10.5% in 2-4 units, 34.9% in 5+ units, 45.4% multifamily, 4.3% mobile homes. Building age: ACS 2017 via the same profile, 44.6% built before 1970. Decade shares are read off an unlabeled chart and are held out. SCAG URL: https://www.scag.ca.gov/sites/default/files/2024-05/anaheim_localprofile.pdf (loaded 2026-10-15).
- Utilities: Anaheim Public Utilities (APU) is the City's own electric utility, described by the City as city-owned and not-for-profit and the only municipal electric utility in Orange County. Gas provider NOT stated: no source names SoCalGas for Anaheim (the SoCalGas pages name no cities). South Coast AQMD GO ZERO is a separate program, linked only; its page (2026-10-15) says new single-family and multifamily applications are not being accepted while the portal is relaunched, so the page tells readers to check status. Commercial APU incentive pages were not read and are held out.
- Not published (NOT FOUND or unverified): ZIP list, neighborhoods, gas provider, permit fees and resolution number, an HVAC online-permit path, rooftop screening sentence (Form B713 page 3 not confirmed), rebate dollar amounts, commercial APU incentives, Manual J, climate and NOAA values, nearby-city adjacency, population, decade-by-decade building age.
- Pre-launch recheck: APU rebate pages (anaheim.net/2579 and /936), AQMD GO ZERO page, the American Legal supplement, Form B713 and the City building codes page, the SCAG profile URL.
- Client approval: NOT YET CONFIRMED. Everything stays flagged TODO(copy) until the user says the client approved it: the local paragraphs, every FAQ answer, the emergency card wording, the permit-application sentence, the code-adoption and sound-limit sentences, the APU and GO ZERO wording and the commercial Resort FAQ. TODO(copy): confirm with the City Building Division which permits an AC or furnace replacement needs.
- Go-live wiring done (Orange County hub is built): Anaheim card `href` in `orangeCountyHub.cities.items` (src/content/orange-county.ts), chip link on /service-areas/ (src/app/service-areas/page.tsx), `hubCityIndexNote` (src/content/service-area-hub.ts), and the Orange County page sentence now links the Irvine and Anaheim pages. Skipped, pending the user's approval: the Commercial HVAC region card (src/content/commercial-hvac.ts, a city-name list only), any other city's `nearby` row (Irvine's `nearby` stays empty), and the Anaheim card text itself (workflow step 7, hub audit). No hub page was created.
- Hub audit APPLIED 2026-10-15 (user approved all eleven fixes): the permit row and permit FAQ no longer state an exemption (Form B713 and the Building Division instead); the Resort "shielding and sound buffering" claim was replaced with the City's Resort page description and the AMC 6.70.010 general limit (row and noise FAQ); the APU rebate card is link-only with no amounts; the first-come-first-served sentence and the gas note were corrected (gas confirmed for Irvine only); the Anaheim card gained the 44.6% pre-1970 figure and its ZIPs are now pending; the "no age figures" note no longer lists Anaheim; the districts line and the AC repair card no longer assert rooftop, noise or inland-heat conditions. No change was needed on the /service-areas/ directory, the Commercial HVAC region card (a city-name list) or the Residential HVAC hub. Follow-ups: an audit of the generic SoCalGas lines for all eight cities, and the NWS 112F and OCTA grouping checks.
- Hero photo is still "Photo pending".
- Claim wording follows the approved list. Do not strengthen it.
- Reference artifact: claude/reference/anaheim-location.html (artifact https://claude.ai/artifact/ERB3EoUntRgJ28MbaxujFf, version 1; to be synced to repo wording at the end).

## /service-areas/costa-mesa/ (costaMesaOverrides in src/content/cities.ts)
Built 2026-10-16 and pushed to main (user chose push to main). Reference artifact: claude/reference/costa-mesa-location.html
(https://claude.ai/artifact/NY8qRzh5rpGSEhJD6mbRGD). Generated from one data source so JSON-LD, visible text and TS match.
- Client approval NOT confirmed. Every Costa Mesa FAQ answer, the four local paragraphs, the Insta-Permit scope and
  placement sentences, the noise and code sentences, the commercial General Plan sentence and the incentive wording stay
  flagged TODO(copy) until the user says the client approved them. Irvine, Gardena and Anaheim flags also stay.
- TODO(copy): confirm with Building Safety (714-754-5273) which permit path each job needs, including condos and
  townhomes. Confirm whether AIRPRO SOLUTIONS holds a Costa Mesa business license (the City requires one, plus an active
  State contractor's license, for Insta-Permit contractors).
- Lead angle: the Residential HVAC Insta-Permit is limited to a single-family dwelling on a single parcel; exterior
  equipment at ground level on the side or rear, not visible to the public; no roof-top equipment; the City's standard
  plans must be used (the standard-plan PDF is image-only and was not read). Work beyond scope goes to a Mechanical -
  Residential application. The two TESSA apply links (Mechanical - Residential, Mechanical - Commercial) open a Tyler
  Portico sign-in page, so a visitor may need an account. Decide whether to keep them or link the Building Permits page.
- Housing: SCAG's Costa Mesa profile only, attributed and labeled dated (DOF E-5 2018: 42,836 units, 39.6% detached,
  10.2% attached, 13.3% in 2-4 units, 34.7% in 5+, 2.2% mobile homes, 48% multifamily; ACS 2017: 49.6% built before 1970).
  General Plan unit counts (28,413 / 14,210) and the "30%" figure are held out (the 30% conflicts with Table LU-2's 28.8%).
- Noise: Municipal Code Sec. 13-280 (55 dB(A) 7 a.m.-11 p.m., 50 dB(A) 11 p.m.-7 a.m., reduced 5 dB(A) for impact, simple
  tone, speech or music) and Sec. 13-281 (55 day / 45 night interior), from GoCodebook (2026-10 edition, text as of
  2026-10-04), not the City's own publication. No HVAC-specific section. Noise Element and CNEL held out (PDF would not open).
- Code: the City's notice says Ordinance 2025-08 adopts the 2025 California Building Standards Code with local amendments,
  effective 2026-01-01. The Mechanical Code is not named (Titles 5 and 7 not read).
- ZIP card held out: one sentence from the City About page (92626, 92627, 92628); `zips: []`, `neighborhoods: []`;
  right-hand card is "Official Costa Mesa resources" (officialResources, 10 links). `nearby: []` (no source names neighbors;
  Irvine's and Anaheim's rows untouched).
- Utilities: no Costa Mesa source opened names an electric or gas provider; the City utility page would not load. The page
  links SCE, SoCalGas, TECH Clean California and The Switch Is On with no dollar amounts and says to confirm which utility
  serves the address. OCPA membership unchecked.
- Commercial: General Plan Land Use Element only (South Coast Plaza on Bristol Street, 92-acre East 17th Street corridor,
  Westside mixed uses). No specific-plan shielding or noise claims.
- Held out: neighbors, Building Safety street address (77 Fair Drive, 2nd Floor appears only on City Clerk notices), median
  home age, climate and NOAA, humidity and AQI, competitor SERP table, Jaspector and zip-codes.com (third party).
- Pre-launch recheck: SCE rebates, Energy Savings Assistance and Time-Of-Use pages; SoCalGas rebates page (dated 2024-07-23,
  mentions 2026 funds); TECH Clean California and switchison.org status; the City utility page; GoCodebook Sec. 13-280 and
  13-281 against the official code; Insta-Permit page and standard plan; TESSA links; SCAG profile URL (titled 2019 profile).
- Orange County hub wiring DONE (Gate 6, commit 1a9499e): Costa Mesa card href, /service-areas/ chip, hubCityIndexNote and the
  Orange County page sentence. No new hub page created. Skipped on purpose until the Gate 7 audit is approved: all Costa Mesa
  copy on the Orange County hub (Costa Mesa card note, areas, utility and ZIPs; permits row; placement row; "Central Orange
  County" group; housing table row; FAQs), the Commercial HVAC region card (city-name list in commercial-hvac.ts), the
  Residential HVAC hub and /service-areas/ copy. Irvine's and Anaheim's `nearby` rows untouched.
- Orange County hub audit APPLIED 2026-10-16 (user approved all eight items): permits row (CF1R and "reviewed by Planning" removed,
  Insta-Permit single-family scope added), placement row (Costa Mesa split out with the ground-level side or rear rule and Sec. 13-280),
  Costa Mesa card note (dated sources, no Planning claim), card utility now "Utilities: confirm by address.", dated attribution on the
  49.6% in the building-age paragraph and FAQ, and two source comments. Checked, no change: housing table row and note, condo FAQ, card
  areas and ZIPs, name lists, Commercial HVAC region card, Residential HVAC hub, /service-areas/.
- Open follow-ups on the hub: "Central Orange County" grouping and the central-cities freeway sentence (OCTA placement of Costa Mesa not
  checked); the generic "generally served by SCE" and "natural gas is supplied by SoCalGas" lines (all eight cities, unaudited); name the
  Costa Mesa electric and gas providers only once a source does (the City utility page would not load).
- Hero photo is still "Photo pending".

## /service-areas/huntington-beach/ (huntingtonBeachOverrides in src/content/cities.ts)
Built 2026-10-16 and pushed to main (user chose push to main). Reference artifact: claude/reference/huntington-beach-location.html
(https://claude.ai/artifact/6pK6kPAjzNFRqSGNUyKrn4). Generated from one data source so JSON-LD, visible text and TS match.
- Title: `cityTitle('Huntington Beach')` ("HVAC Services in Huntington Beach, CA | AIRPRO SOLUTIONS", 56 characters) does not collide with another
  page, so no `distinctTitle`. The meta description is the hand-written `page.metaDescription` (153 characters, validated by
  `assertDescription`).
- Client approval NOT confirmed. Every Huntington Beach FAQ answer, the five local paragraphs, the noise sentences, the Title 24
  sentences, the commercial sentence and the incentive wording stay flagged TODO(copy) until the user says the client approved
  them. Irvine, Gardena, Anaheim and Costa Mesa flags also stay.
- TODO(copy): confirm with the City (general office number (714) 536-5241) which permit path each HVAC job needs, and whether
  AIRPRO SOLUTIONS holds a Huntington Beach business license (the City asks contractors for one, plus the matching State license
  and workers' compensation proof unless working alone).
- Lead angle: the Permit Center issues mechanical permits and the HB ACA portal handles applications, payments, status and
  inspections. The forms page lists a Mechanical Permit Application, Mechanical Plan Requirements and a Mechanical Plan Check
  Waiver Request, and does not say when a waiver applies. No like-for-like exemption was found, so the page never assumes one.
  The mechanical plan checklist is written mainly for commercial projects; the page says so.
- Housing and population: SCAG's Huntington Beach profile only for housing (DOF E-5 2018: 81,656 units; 47.9% detached, 11.6%
  attached, 11.8% in 2-4 units, 24.9% in 5+, 3.8% mobile homes, 36.7% multifamily; ACS 2017: 43.5% built before 1970) and Census
  QuickFacts for 198,711 residents (2020 Census). Both are attributed and labeled dated.
- Noise: Municipal Code Sec. 8.40.050 from ecode360 (third-party host; amendments cited 3940-7/12 and 4222-9/21): 55 dBA Leq
  7 a.m.-10 p.m. for low-density residential, reduced 5 dBA for impact, simple tone, speech or music; air conditioners are defined
  as fixed noise sources. The nighttime row under Low-Density Residential is unlabeled on that host, so NO nighttime number is
  stated (the page says a lower limit applies at night). Permitted work hours come from the City noise FAQ (7 a.m.-7 p.m.,
  Mon-Fri, including Saturday; not Sundays or federal holidays).
- Code: the City says permits rely on city adopted state building codes and local codes. The DGS code page could not be opened
  and the City's adoption ordinance was not found, so NO code edition or local amendment is stated. Title 24: 2025 Energy Code
  for permit applications submitted on or after 2026-01-01; duct sealing and verification triggers per the CEC HVAC page.
- Utilities: the City's utility services page lists Southern California Edison (electric) and Southern California Gas Company
  (gas). Rebate pages are link-only with no dollar amounts; the CEC notice dated 2026-02-24 is cited for HEEHRA status.
- Right-hand card: "Official Huntington Beach resources" (`page.officialResources`, 10 links). `neighborhoods: []`, `zips: []`,
  `nearby: []` (the city page skips the section when `nearby` is empty). Huntington Harbour, Oak View and Sunset Beach appear
  in prose only, each tied to a City page.
- Held out (no verified source): ZIP card (the only list is a water-service ZIP list in an unreadable PDF; 92605 and 92615 are
  not official; 92646-92649 and 90742 are unverified as a postal city list), neighborhood pills, nearby row, climate and NOAA
  data (2014 visitor page only), humidity, SCE time-of-use plans, OCPA (customers returned to SCE in 2024), rebate dollar
  amounts, HEEHRA $8,000, SCE Home Performance Plus (the page does not say it covers HVAC), the SCE $600 per ton heat pump fact
  sheet figure, Edwards Hill and Seagate (records site blocked by robots), setbacks, coastal or historic placement rules,
  AC charge verification (climate zone not found), competitor SERP table.
- Corrected research overstatements: the mechanical plan checklist is mostly commercial; (714) 536-5241 is the general office
  number, not a Permit Center line; the planning page does not name neighborhoods, so no "service areas include" sentence.
- Pre-launch recheck: SCE rebates page; SoCalGas rebates page (dated 2024-07-23); TECH Clean California and switchison.org;
  CEC HEEHRA status (notice dated 2026-02-24); the City utility services page; ecode360 Sec. 8.40.050 and 8.40.090; SCAG
  profile URL; QuickFacts; DGS code page (not opened); the water-board ZIP source if a ZIP sentence is ever added.
- Orange County hub wiring DONE (Gate 6): Huntington Beach card href, /service-areas/ chip, `hubCityIndexNote` and the Orange
  County page sentence.
- Orange County hub Huntington Beach copy corrected (Gate 7): card ZIPs set to pending (the old list had 92605 and 92615), areas
  now Huntington Harbour, Oak View and Sunset Beach (old "Downtown and Main Street" and "Bolsa Chica" had no source), utility
  line now names SCE and Southern California Gas Company, card note adds the 43.5% pre-1970 share and drops "detailed mechanical
  plan package", permits row and permits FAQ now name the Permit Center and HB ACA, building-age paragraph and comments add the
  43.5% figure, and the "housing age pending" strings no longer list Huntington Beach. Checked, no change: housing table row,
  "Coastal" group, placement row, Commercial HVAC region card (city-name list).
- Hero photo is still "Photo pending".
- Claim wording follows the approved list. Do not strengthen it.

## /service-areas/riverside/ (riversideOverrides in src/content/cities.ts)
Built 2026-10-16 and pushed to main (user chose push to main). Reference artifact: claude/reference/riverside-location.html
(https://claude.ai/artifact/PZWLA3KYYz2Kis5zGNU7QB). First Inland Empire wave-1 city. Generated from one data source so JSON-LD,
visible text and TS match.
- Title: `cityTitle('Riverside')` ("HVAC Services in Riverside, CA | AIRPRO SOLUTIONS", 49 characters) does not collide with another
  page, so no `distinctTitle`. H1 is `cityH1('Riverside')` (30 characters). The meta description is the hand-written
  `page.metaDescription` (145 characters, validated by `assertDescription`).
- Client approval NOT confirmed. Every Riverside FAQ answer, the five local paragraphs, the noise sentences, the Title 24
  sentences, the commercial sentence and the incentive wording stay flagged TODO(copy) until the user says the client approved
  them. Irvine, Gardena, Anaheim, Costa Mesa and Huntington Beach flags also stay.
- TODO(copy): confirm with the City (the permits page lists (951) 826-5800 for fee information) which permit path each HVAC job
  needs, and whether AIRPRO SOLUTIONS holds a City of Riverside business license (the City requires one of contractors, plus
  verifiable State licensing and a workers' compensation certificate for contractors with employees).
- Lead angle: Building & Safety issues permits and the Public Permit Portal handles applications, electronic plans, fees, status
  and inspections (the Permit Services counter, mail-in and fax also work). Bulletin 140 lists portable cooling units and
  like-for-part replacement as exempt and lists NO like-for-like exemption for a whole unit, so the page never assumes one.
- Housing and population: SCAG's Riverside profile only for housing (DOF 2018: 100,515 units; 64.0% detached, 3.9% attached, 6.4%
  in 2-4 units, 23.5% in 5+, 2.2% mobile homes, 29.9% in 2+ unit buildings; ACS 2017: 39.5% built before 1970) and Census QuickFacts
  for 323,057 residents (July 1, 2025 estimate; 314,998 in the 2020 Census; 56.8% owner-occupied, 2020-2024). All attributed and
  labeled dated. Neighborhoods come from the General Plan (28 neighborhoods) and the Orangecrest description from a City page, in
  prose only.
- Noise: Municipal Code Title 7 from a third-party copy on nonoise.org (no current date; latest amendment citations are from
  2007): Sec. 7.25.010 residential 55 dBA 7 a.m.-10 p.m. and 45 dBA 10 p.m.-7 a.m.; Sec. 7.10.070 defines fixed noise sources to
  include air conditioners and refrigeration devices; Sec. 7.35.010 construction and repair hours (weekdays 7 p.m.-7 a.m.,
  Saturdays 5 p.m.-8 a.m., all day Sundays and federal holidays, emergency exception). The official Municode text would not load.
  Recheck before relying on the numbers.
- Code: the City's California Building Standards page lists the 2025 CBC, Mechanical Code and Energy Code, effective 2026-01-01,
  and describes no local amendments. Municode Title 16 would not load, so NO local amendment is stated. Title 24: duct sealing and
  verification per the CEC HVAC page.
- Utilities: the City describes Riverside Public Utilities (RPU) as providing water and electric service. NO City source names the
  gas provider, so the page says to confirm gas by address. Rebate pages are link-only with no dollar amounts (the pages are
  undated).
- DECISION NEEDED on rebate amounts. Verified on RPU's pages 2026-10-16 (pages undated; the residential application says "UPDATED
  JUNE 2026"): residential central AC $150/ton (15.2-15.9 SEER) and $250/ton (16+ SEER), electric heat pump $750/ton (15.2+ SEER),
  tune-up $25 (with refrigerant check), smart thermostat $50, whole-house evaporative cooler $150, room evaporative cooler $50,
  ENERGY STAR room AC $50, duct replacement up to $150 (R-6). Residential: RPU electric customers only, matched condenser and coil
  in the AHRI Directory, apply within 90 days of purchase, no new construction or used equipment, subject to funding, may be
  cancelled, and the application certifies no other utility incentive for the same improvement. Commercial: $150/ton (15.2 SEER/11.7
  EER), $250/ton (16 SEER/12.8 EER+), $300/ton load shifting or demand response (stacking not stated), $50 thermostat, $10/ton
  tune-up; caps $25,000 flat-rate, $50,000 demand, $100,000 time-of-use; 50% of project cost; one capped rebate per program, per
  fiscal year, per premises. RPU uses SEER, not SEER2: do not relabel. The commercial amounts are NOT residential offers. Not
  found: remaining funding, expiration or deadline, SEER2 thresholds, commercial heat pump or ductless amounts, chiller schedule.
- Right-hand card: "Official Riverside resources" (`page.officialResources`, 11 links). `neighborhoods: []`, `zips: []`,
  `nearby: []` (the city page skips the section when `nearby` is empty).
- Held out (no verified source): ZIP card (the only official list, 92501 and 92503-92509, is a January 2024 City press release about
  Earthquake Brace + Bolt grant eligibility, not a service-area or postal list; 92521 and 92522 appear only in a 2003 Council
  report), neighborhood pills, nearby row, climate and NOAA data, gas provider, rebate dollar amounts, any local code amendment,
  official Municode noise text, named employers and employee counts (City employer page shows no data year), Alessandro Heights and
  Arlanza details, the 20 specific plans, General Plan land-use categories, median year built, humidity and air quality, HOA and
  historic-district rules, outdoor-unit setbacks, competitor SERP table (every row NOT FOUND).
- Corrected research overstatements: the hub claim that like-for-like replacement is "confirmed on the city's fee schedule" is
  unsupported (the fee schedule only lists furnaces, air handling units and air conditioning units as fee items); the RPU commercial
  amounts are not residential offers; the ZIP list is grant eligibility only; ecode360 43101139 was Atascadero, not Riverside
  (discarded); the City's clerk records links returned errors, so nothing was taken from them.
- Pre-launch recheck: RPU residential and business rebate pages and general program guidelines; City permits page; Public Permit
  Portal; Bulletin 140; fee schedule; California Building Standards page; Title 7 official text; SCAG profile URL; QuickFacts;
  General Plan PDF; top employers page; Energy Commission pages; the NWS figures on the Inland Empire hub (not re-verified).
- Inland Empire hub wiring DONE: Riverside card `href` (`CityCardSpec` gained an optional `href`, and the hub cards render as links
  like the Orange County hub), /service-areas/ chip, `hubCityIndexNote` and the Inland Empire page sentence.
- Inland Empire hub Riverside copy corrected: permits row and permits note and FAQ no longer say like-for-like is "confirmed" for
  Riverside (they say the City lists no like-for-like exemption for a whole unit); the rooftop screening-review claim for Riverside
  is removed from the placement table, commercial lines and commercial FAQ (no City source read; Ontario and Fontana stay);
  card areas now use General Plan neighborhoods (the old "Canyon Springs" had no source) and the card utility line drops the
  screening sentence and says the gas provider is confirmed by address; "Canyon Springs and the Innovation District" removed
  from the commercial districts line; the generic "Natural gas: SoCalGas" lines now exclude Riverside. Checked, no change: housing
  table row (39.5%, labeled 2018 data), rebate card wording, Commercial HVAC region card (city-name list). NOT re-verified and left
  as is: the 90.6 F July normal, 18 days at or above 90 F, 114-115 F on 2024-09-06 and 118 F record figures.
- Hero photo is still "Photo pending".
- Claim wording follows the approved list. Do not strengthen it.

## /service-areas/ontario/ (ontarioOverrides in src/content/cities.ts)
Built 2026-10-16. Reference artifact: claude/reference/ontario-location.html
(https://claude.ai/artifact/Dutd6Jjxy2gye8N3cyErp7). Second Inland Empire wave-1 city. Generated from one data source so
JSON-LD, visible text and TS match.
- Title: `cityTitle('Ontario')` ("HVAC Services in Ontario, CA | AIRPRO SOLUTIONS", 47 characters) does not collide with another
  page, so no `distinctTitle`. H1 is `cityH1('Ontario')` (28 characters). The meta description is the hand-written
  `page.metaDescription` (142 characters, validated by `assertDescription`).
- Client approval NOT confirmed. Every Ontario FAQ answer, the five local paragraphs, the noise sentences, the Title 24
  sentences, the equipment-screening sentences, the commercial sentence and the incentive wording stay flagged TODO(copy) until
  the user says the client approved them.
- TODO(copy): confirm with the City (Building Department lists (909) 395-2023 for plan check and counter services) which permit
  path each HVAC job needs. No City business-license or contractor requirement was found on the pages read.
- Lead angle: Building Department plan review and inspection, the online permitting portal (apply, upload plans, pay fees after
  review) and counter service at City Hall. The Building Permit FAQs list portable comfort-cooling and evaporative cooler
  equipment as not needing a permit; the FY 2026-27 fee schedule (July 1, 2026) lists mechanical permit items (furnaces, air
  handler units, evaporative coolers, wall heaters, mini splits) and flat-fee reviews. NO like-for-like rule was found, so the
  page never assumes an exemption or a requirement. The fee schedule has no "Table C" and does not name AC units or heat pumps.
- Housing and population: SCAG's Ontario profile (DOF 2018: 49,648 units; 59.0% detached, 6.3% attached, 10.2% in 2-4 units,
  20.1% in 5+, 4.4% mobile homes, 30.3% in 2+ unit buildings; ACS, year NOT stated: 36.1% built before 1970) and Census
  QuickFacts (187,013 residents, July 1, 2025; 175,265 in the 2020 Census; 58.0% owner-occupied, 2020-2024). Decade bins in the
  SCAG chart have no labels, so only the stated 36.1% / 63.9% split is used. Ontario Ranch (13 square miles, 69,000 planned
  units, 1,200 new homes in 2023) and the airport and logistics figures (6.5 million passengers, over 750,000 tons of freight in
  2023; 12 million sq ft commercial/office and 31 million sq ft industrial planned in Ontario Ranch) come from the City's
  economic development pages (undated). All attributed.
- Noise: Title 5, Chapter 29 from a THIRD-PARTY copy on nonoise.org (undated; cites Ord. 2888, effective March 6, 2008): Sec.
  5-29.04 single-family 65 dBA 7 a.m.-10 p.m. and 45 dBA 10 p.m.-7 a.m., multi-family 65/50 dBA, ambient becomes the standard
  when higher; Sec. 5-29.09 construction hours (weekdays 7 a.m.-6 p.m., weekends 9 a.m.-6 p.m., emergency exception). It does
  NOT mention air conditioners. The official Municipal Code text was not found. Recheck before relying on the numbers.
- Equipment screening: Development Code Chapter 6 (Rev 12-03-2024) Sec. 6.01.010 prohibits new roof-mounted mechanical,
  heating and air conditioning equipment on single-family dwellings and requires complete screening for multiple-family roof
  equipment. How it applies to replacing existing equipment is NOT confirmed. The Euclid Mixed-Use Specific Plan screening
  applies only to that Ontario Ranch plan area; the Discretionary Permits form's roof-plan line applies only to Development
  Plan applications.
- Code: the Applicable Codes page (undated) lists 2022 CBC, CMC and Energy Code for plans filed on or after January 1, 2023.
  This conflicts with the state's 2025 codes, so NO edition is asserted and no local amendment was read. Title 24: duct sealing
  and verification per the CEC HVAC page.
- Utilities: the City's utility contacts and ADU contact pages name Southern California Edison (electric) and Southern
  California Gas Company (gas). Rebate cards are link-only with no dollar amounts.
- DECISION NEEDED on rebate amounts (verified from the research batch and SCE/SoCalGas pages; not published): SoCalGas gas
  furnace $1.40 (92-94% AFUE), $10 (95-96%) and $25 (97%+) per kBtuh, one per household, licensed contractor and proof of permit
  closure required, 2026 purchases, first come first served; SCE Smart Energy Program $75 one-time credit (the "up to $50 a year"
  figure was NOT verified by me); SoCalGas $75 smart thermostat rebate applies ONLY to wildfire-impacted customers (the research
  overstated it as general); Golden State Rebates coupons and Home Performance Plus have no amounts on the utility pages;
  Energy Savings Assistance claims were not independently verified. Do not relabel SEER as SEER2.
- Right-hand card: "Official Ontario resources" (`page.officialResources`, 15 links). `neighborhoods: []`, `zips: []`,
  `nearby: []` (the city page skips the section when `nearby` is empty).
- Held out (no verified source): ZIP card (91758/91761/91762/91764 came from Wikipedia, a third-party aggregator and a court PDF
  with no readable text; the CEQA record is project metadata; 91710/91743 appear only in a planning location list), neighborhood
  pills and nearby row (only a third-party ZIP site names neighbors), Ontario Mills, Holt Boulevard, Toyota Arena and the
  Convention Center (not on the City pages read), climate/NOAA/heat data, South Coast AQMD membership, like-for-like permit
  rule, permit checklist, contractor license requirement, local code amendments, current adopted edition, official Chapter 29
  text, outdoor-unit setbacks, historic/HOA rules, median year built, humidity, rebate amounts, competitor SERP table.
- Corrected research overstatements: Chapter 6 does not reference Title 24, the City Building Code or sound transmission (it only
  says to refer to OMC Title 5, Chapter 29); EMUSP screening is not citywide; the Discretionary form roof-plan line is
  Development Plan only; SoCalGas $75 thermostat is wildfire-only; the gas provider is named by the City (not "NOT FOUND");
  amlegal "ontario" is Ontario, Ohio (discarded).
- Pre-launch recheck: nonoise.org copy vs official Chapter 29; Applicable Codes page; fee schedule; online permitting portal
  (robots-blocked, not read); Building Permit FAQs; Chapter 5 (an Aug 18, 2026 revision exists) and Chapter 6; Euclid guidelines;
  SCE and SoCalGas rebate pages; Ontario Ranch and logistics pages; SCAG profile URL; QuickFacts; CEC pages.
- Inland Empire hub wiring DONE: Ontario card `href` and card rewrite (36.1% flat, SCE/SoCalGas, areas now "Ontario Ranch, the
  airport area"), /service-areas/ chip, `hubCityIndexNote`, the Inland Empire page sentence.
- Inland Empire hub audit, Ontario copy corrected: housing row "36.1% or more" -> "36.1%", "minimum" note and the "Pending"
  strings removed; permits row, note and FAQ (portal/counter, no whole-unit rule found); rooftop screening claims for Ontario
  removed from the placement table, commercial lines and commercial FAQ (Fontana stays); "near Ontario Airport" and "airport-
  adjacent" wording dropped; Ontario 114F (Sept 6, 2024) and the 93-95F Ontario Airport normals removed everywhere (service-area-hub.ts
  too); utilities list now names Ontario electric SCE and gas SoCalGas; Ontario removed from the SCE "not confirmed" note.
  Checked, no change: Commercial HVAC region card (city-name list). Riverside's 115F and the 90.6F normal remain NOT re-verified.
- Hero photo is still "Photo pending".
- Claim wording follows the approved list. Do not strengthen it.

## /service-areas/south-bay/ (src/content/south-bay.ts)

- Hermosa Beach: permit applications become online-only through the city's portal starting
  2026-10-01. Update the permits table copy after that date.
- Torrance: plan reviews and permit submittals became electronic as of 2026-01-05. Already past;
  re-verify the process hasn't changed further.
- SoCalGas $75 smart-thermostat rebate: a 2026 program with an application deadline of
  2026-12-31. Remove or update in January 2027.
- SCE Summer Discount Plan (up to $145/unit): seasonal program - confirm current enrollment terms
  before each summer.
- TECH Clean California / HEEHRA: status described "as of early 2026" (Southern California
  single-family funding fully reserved, later requests waitlisted). Re-verify before launch.
- El Segundo: hub states the 2025 California Mechanical Code with local amendments (ESMC 13-4-1, Ord. 1680, 12-3-2025; checked 2026-10-15). See the El Segundo section above.
- Gardena: hub permit row names the Building & Safety Division (City's Schedule An Appointment page, 2026-08-05). Industrial, 405-corridor and 90248 wording was removed because no source supports it. See the Gardena section above. The 90250 sentence in the ZIP FAQ still needs a source.
- Carson and Redondo Beach noise limits: deliberately left without dBA figures (medium-confidence
  planning-document sourcing for Carson). Do not add specific numbers without a stronger source.
- Clean Power Alliance generation: only confirmed for Redondo Beach, Manhattan Beach, and Carson.
  Do not add Hermosa Beach or Hawthorne without a source.
- Housing age, attic/foundation/duct condition, and population figures were intentionally left off
  the South Bay hub. Do not add them without a source.

## /service-areas/orange-county/ (src/content/orange-county.ts)

- Anaheim Public Utilities rebate card is link-only (anaheim.net/2579/Heating-Cooling-Systems); no dollar
  amounts are published (the $200/ton, duct repair and thermostat terms are not on the City page and the
  DSIRE record is dated 2025-08-04). Recheck the APU rebate pages before launch.
- SoCalGas 2026 furnace rebate tiers and $75 thermostat rebate: through December 31, 2026 or until
  funds run out. Remove or update in January 2027.
- SCE Smart Energy Program ($75 enrollment + up to $50/yr): re-verify current credit amount before
  launch.
- HEEHRA reservation status: single-family funding fully reserved statewide as of 2026-02-24;
  multifamily reservation window closed 2025-12-18. Re-verify before launch.
- 2025 Energy Code (Title 24) effective date: applies to permits submitted on or after 2026-01-01.
  Re-verify if the compliance date changes.
- No source URLs were found for the SoCalGas and SCE Smart Energy rebate cards, so they carry no link.
  Add official source URLs once verified (SoCalGas 2026 rebates, SCE Smart Energy Program).
- Housing age figures are missing for Fullerton and Tustin - no age claim is made for them. Do not add
  without a source. Anaheim's (44.6% before 1970), Irvine's (4.8%) and Huntington Beach's (43.5%, SCAG,
  ACS 2017) are on their city pages and on the hub's city cards or notes; Huntington Beach's is also in the
  building-age paragraph. Irvine and Anaheim are not in the cross-city comparison because the vintages
  differ (ACS 2017 vs ACS 2014-2018).
- Fullerton ZIP list is unverified (low confidence) and shown as "pending," not a list.
- Gas utility (SoCalGas) is directly confirmed only for Irvine and Huntington Beach (City utility pages;
  Huntington Beach's page names "Southern California Gas Company") and assumed for the other six cities. No source names SoCalGas for Anaheim. The generic "natural gas is supplied by
  SoCalGas" lines (the utilities intro and the utility FAQ) cover all eight cities and are not yet
  audited. Do not strengthen this to a confirmed claim without a source.
- Anaheim climate: the hub's NWS 112F Anaheim event reading and the "North Orange County" OCTA grouping
  were not re-checked.
- Climate figures come from the NWS Tustin MCAS station summary (single station, not 1991-2020
  normals). Keep the "station and event readings, not city averages" wording.
- City-tagged Orange County reviews, real photos, and business hours are pending client input.

## /service-areas/inland-empire/ (src/content/inland-empire.ts)

- Rebate programs (Riverside Public Utilities, SCE thermostat credit, TECH Clean California) and
  their funding status: no dollar amounts were found/verified, so none are shown. Verify before
  launch and decide whether amounts can be added.
- Electric utility per city for Ontario, Rancho Cucamonga, Chino, Fontana, Upland, and Eastvale is
  medium-to-low confidence ("generally SCE"). Verify directly before launch.
- Like-for-like permit rules for Corona, Ontario, Rancho Cucamonga, Upland, and Eastvale were not
  confirmed in the sources reviewed (confirmed only for Chino and Fontana; Riverside lists no like-for-like exemption for a whole unit). Verify with
  each city, and re-verify current Title 24 code dates.
- This page does not say "we handle permits" - the research does not support that claim. Do not
  add it without client sign-off.
- Real photos, city-tagged reviews, business hours, and the confirmed Inland Empire city list for
  regions.ts are pending client input (this hub currently reuses the 8-city list already in
  regions.ts from the homepage build).
- Housing mix figures are missing for Upland, and later-decade age figures are missing for
  Ontario - no further claims are made for either. Attic, foundation, ductwork, and home-size data
  were not found for any of the eight cities.
- No commercial-property evidence was found for Corona, Upland, or Eastvale - the
  residential/commercial split section makes no commercial claim for them.
- Climate figures are from nearby weather stations (Riverside Municipal Airport 1991-2020 normals;
  Norton AFB 1980-1990 record), not city averages, and not found at all for six of the eight
  cities. Keep that context, don't strengthen it into a city-level claim.
- When city pages exist for any of the eight cities, turn its "City page coming soon" card into a
  link and add the city to sitemap.ts.

## Emergency HVAC page: open items before launch (src/content/emergency-hvac-page.ts)

- Wording: "Emergency" is used in the H1, headings, and copy throughout by request. The breadcrumb
  and schema name also use "Emergency HVAC", matching services.ts. Per the metadata rules, confirm
  with the client that emergency service is real and always available before launch.
  RESOLVED - client approved 2026-10-14 ("24/7 emergency dispatch" is on the CLAUDE.md "Approved
  claims" list).
  Current metadata rule: the two-word label "Emergency HVAC" is exempt from the blocked-claims list.
  The exact phrase "24/7 emergency dispatch" is allowed in descriptions only on /, /services/, and
  /services/emergency-hvac/. A bare "emergency" stays blocked everywhere else. Titles and H1s still
  block the phrase. Source of truth: src/lib/seo.ts and docs/metadata-rules.md (Section 6).
- Proposed title: Emergency HVAC Repair in Los Angeles | AIRPRO SOLUTIONS. Proposed meta
  description: Emergency HVAC repair for homes and businesses across Los Angeles and Southern
  California. Know when to call 911 first and how to request service.
- Availability is a visible placeholder (PendingNote under "How fast can someone come out?").
  Confirm live answering, dispatch model, after-hours coverage, and response time. No 24/7 or
  same-day wording appears anywhere else on this page.
- Process section is framed as what emergency service commonly involves. Confirm Air Pro follows
  written repair options, safety screening by phone, and the testing listed before reframing any
  step as company policy.
- Diagnostic fee, after-hours surcharge, fee credit toward repair, and warranty terms are
  unconfirmed and not stated. Third-party price ranges from the research brief are not shown and
  need client approval before any use.
- Check the CSLB record for #1126691 and #50251 shows C-20 before the class appears in the trust
  strip and licensing card. "Insured" is not claimed.
  PARTLY RESOLVED 2026-10-14: "licensed, bonded & insured" (CA license #1126691 and #50251) is now
  client-approved (CLAUDE.md "Approved claims"); this page's copy was not changed. The CSLB C-20
  check above is still open.
- Commercial and rooftop capability, mini-split, heat pump, and PTAC scope are unconfirmed. PTAC
  and multifamily through-wall units are left off the systems list.
- City lists under each region are left out until the client confirms coverage. No region-level
  system-type prevalence claims are made.
- Rebates and financing are intentionally not linked from this page. Link them from the replacement
  pathway once program status is checked live.
- Logo file status: confirmed present at public/images/logo-mark.webp and resolves correctly in the
  built page.
- Internal links (heat pump, mini-split, ductwork, IAQ, maintenance) appear once those pages
  exist - they now do, so no action needed here.
