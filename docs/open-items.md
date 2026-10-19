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
- Nearby row: Los Angeles, Long Beach, Glendale, Burbank. Burbank and Glendale both have real pages now (see their sections); the nearby cards link to them. South Pasadena is not routed.
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
- Local-knowledge card (2026-10-18): `page.localCards` housing snapshot (SCAG DOF 2018 and ACS 2017 figures already in the second paragraph). TODO(copy): client has not approved the card. See docs/local-knowledge-balance.md.
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
- Local-knowledge card (2026-10-18): `page.localCards` housing snapshot with two rows (single-family detached 41.7%, built before 1970 44.6%), SCAG figures already in the second paragraph. TODO(copy): client has not approved the card. See docs/local-knowledge-balance.md.
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
- Local-knowledge card (2026-10-18): `page.localCards` housing snapshot (SCAG figures plus the 2020 Census population, all in the second paragraph). TODO(copy): client has not approved the card. No noise card on purpose: no nighttime figure is verified. See docs/local-knowledge-balance.md.
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
- Local-knowledge cards (2026-10-18): `page.localCards` housing snapshot and a noise and work-hours table (Title 7 Secs. 7.25.010 and 7.35.010, third-party copy, undated, latest amendment citations 2007; the note keeps that caveat). TODO(copy): client has not approved the cards. See docs/local-knowledge-balance.md.
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
Built 2026-10-16 and pushed to main (user chose push to main). Reference artifact: claude/reference/ontario-location.html
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
- Local-knowledge cards (2026-10-18): `page.localCards` Ontario Ranch and airport fact table (City economic development pages, undated) and a three-row housing snapshot (the ACS year is not stated and the note says so). No noise card: the third-party Chapter 29 copy does not mention air conditioners. TODO(copy): client has not approved the cards. See docs/local-knowledge-balance.md.
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

## /service-areas/corona/ (coronaOverrides in src/content/cities.ts)
Built 2026-10-18, pushed to main (user chose push to main). Reference artifact: claude/reference/corona-location.html
(https://claude.ai/artifact/FWyHWFK6TqueUcqDFf4njM). Third Inland Empire wave-1 city page in this repo. Generated from one data
source so JSON-LD, visible text and TS match. Rancho Cucamonga is NOT in this repo yet, so it is not wired into the hub.
- Title: `cityTitle('Corona')` ("HVAC Services in Corona, CA | AIRPRO SOLUTIONS", 46 characters) does not collide with another page, so no `distinctTitle`.
  H1 is `cityH1('Corona')` (27 characters). The meta description is the hand-written `page.metaDescription`
  (150 characters, validated by `assertDescription`).
- Client approved the Corona copy on 2026-10-18 (per the user), so the blanket TODO(copy) flags were removed. Items that still need
  checking against the City are flagged TODO(verify).
- TODO(verify): confirm with the City which permit path each HVAC job needs (Building Division lists 951-736-2250 and BuildingPlanCheck@CoronaCA.gov) and whether AIRPRO SOLUTIONS needs a City business license (none found on the pages read).
- TODO(verify): setback, noise and construction-hour text is from the American Legal Publishing copy of Sec. 17.84.040, labeled 2025 S-56 (current) on both reads; the research said 2026 S-57. The publisher says its copy may not reflect the latest legislation. Recheck against the official code and confirm subsection letters (C)(2), (D)(1), (D)(2), (E)(6) before launch.
- TODO(verify): the fee schedule PDF names only the Building Division, not the City, and says effective October 4, 2026 inside the file; the file name says 10.4.26. Fees are not on the page.
- Lead angle: the City's outdoor-unit rule. Municipal Code Sec. 17.84.040(D)(1): equipment installed under a building permit must be
  at least 10 feet from the adjoining property line, with a 5-foot block sound wall alternative or Building Official-approved sound
  attenuation, and a pre-May 20, 1993 permitted-equipment exemption for repairs and replacement (E)(6). Noise: 55 dBA (7 a.m.-10 p.m.)
  and 50 dBA (10 p.m.-7 a.m.) residential, construction hours in (D)(2). The code publisher warns its online copy may lag the latest
  ordinances.
- Housing and population: SCAG's Corona profile (DOF E-5, 2018: 49,277 units, 66.9% detached, 20.9% in 5+ unit buildings; ACS 2017
  via SCAG: 15.6% built before 1970) and Census QuickFacts (161,734 residents, July 1, 2025; 157,136 in the 2020 Census; 63.8%
  owner-occupied, 2020-2024). Data years are labeled as printed.
- Utilities: the City's new-resident page says a majority of residents are served by SCE, with small City electric areas near Dos
  Lagos, The Crossings, Corona Pointe and Princeland. Rebate cards are link-only with no dollar amounts.
- DECISION (recommended: keep link-only; user approved the recommendations): verified amounts, not published. SoCalGas furnace $1.40
  (92-94% AFUE), $10 (95-96%), $25 (97%+) per kBtuh, one per household, licensed contractor and permit closure, 2026 purchases,
  subject to funds; SCE Smart Energy $75 one-time plus up to $50 a year (June 1-Sept. 30); City of Corona electric residential
  thermostat up to $50, AC tune-up up to $80, AC purchase $200/ton up to 25% of project cost; commercial PTAC $100/ton, package AC or
  heat pump $200/ton, efficiency upgrade up to $25,000 (City electric customers only). SoCalGas $75 thermostat is wildfire-ZIP only.
  Do not relabel SEER as SEER2.
- Right-hand card: "Specific plan areas and official resources" (`page.officialResources`, 16 links) with 14 specific plan
  names shown as pills, labeled as plan names, not boundaries. `zips: []`, `nearby: []`.
- Local-knowledge card (2026-10-18): `page.localCards` outdoor equipment rule (Sec. 17.84.040(D)(1) setback, the sound wall alternative and the pre-1993 exemption in (E)(6)); noise limits stay in the paragraph only. Same TODO(verify) on the subsection letters and the American Legal Publishing copy. TODO(copy): the card is new wording. Note spacing above the link list fixed in CSS. See docs/local-knowledge-balance.md.
- Held out (no verified source): ZIP card (the research's 92877, 92878, 92879, 92880, 92881, 92882 and 92883 come from a third-party aggregator and from a Riverside County Superior Court order about where to file civil documents, a court venue list that does not describe them as postal delivery areas; the City's ZIP Code Map is a PDF link whose contents are not in text, and the City pages show only 92880 and 92882, which conflict with each other for the same Vicentia Avenue address); neighborhood claims beyond the City's specific plan names (the research's 'major neighborhoods' were plan names, and the City page calls them specific plans, not neighborhoods; Corona Hills, Corona West, Circle City, Kellogg Village and Buena Vista came only from Wikipedia; Grand Boulevard Historic District and any historic HVAC restriction have no City source read); nearby row; climate, NOAA normals, heat and humidity figures (the NCEI source was not retrieved, so no Corona station values); the research's air quality conclusions beyond AQMD listing Corona among its Riverside County cities (the AQMD data page does not name Corona); SCE TOU-D-PRIME (source is a March 2020 fact sheet, current availability not read); expedited permit pathway (the City's expedited page covers solar, EV charging and solar water heating only, not HVAC); City business license or contractor requirement; HVAC permit checklist and like-for-like rule (none found); local code amendments; median year built; single-family, multifamily and commercial split beyond the SCAG DOF table; employers, hospitals, school districts, shopping centers and industrial parks (the City page names only four industries, undated, and no employers); zoning map; all rebate dollar amounts; HEEHRA, ESA, Building Electrification and Whole Home pilot status claims (not independently verified); competitor SERP table (gap analysis only, never on the page).
- Corrected research overstatements: the research said no Corona municipal HVAC rebates exist (the City electric page lists them);
  the 10-foot rule is not universal (1993 exemption); the expedited-permits page does not cover HVAC; the SoCalGas $75 thermostat
  rebate is wildfire-only; "major neighborhoods" were specific plan names; ZIPs came from a court venue order.
- Pre-launch recheck: Sec. 17.84.040 (edition label and subsections), Chapters 15.04 and 15.08 adoption text, Building Division page (ZIP shown as 92880 in one place and 92882 in another), eTRAKiT portal (not opened), mechanical fee schedule (effective October 4, 2026), City electric service and new-resident pages, SCE and SoCalGas rebate pages and SoCalGas application PDF, SCE TOU page, specific plans list, economic development page, SCAG profile URL, QuickFacts, AQMD jurisdiction list, Energy Commission pages.
- Inland Empire hub wiring DONE: Corona card `href` and card rewrite (15.6% pre-1970, 66.9% detached, areas now "Dos Lagos, Eagle Glen,
  Sierra Del Oro, Downtown Corona"; "the 91 and 15 gateway" dropped as unsourced), /service-areas/ chip, `hubCityIndexNote`, the Inland
  Empire page sentence.
- Inland Empire hub audit, Corona copy corrected: housing row now 66.9% detached and 20.9% in 5+ units with age group "Middle"
  (was "Newer", which did not fit the 15.6% position between Chino and Rancho Cucamonga); permits row reworded (eTRAKiT or the
  Building Division counter, no whole-unit rule found); Corona removed from the "predominantly detached" sentence and the Corona
  TODO(verify) permit line removed. Utilities wording ("mostly SCE") kept. Checked, no change: Commercial HVAC region card
  (city-name list), climate-group list.
- Hero photo is still "Photo pending".
- Claim wording follows the approved list. Do not strengthen it.

## /service-areas/glendale/ (glendaleOverrides in src/content/cities.ts)
Built 2026-10-18, pushed to main (user chose push to main). Reference artifact: claude/reference/glendale-location.html
(https://claude.ai/artifact/E3TW4WvfKyULt7XKHkNxot). First LA County city page built from a single data source feeding the visible HTML, the
three JSON-LD blocks and the TS overrides. Glendale was a wave 2 noindex stub before this.
- Title: `cityTitle('Glendale')` ("HVAC Services in Glendale, CA | AIRPRO SOLUTIONS") needs no `distinctTitle`. H1 is `cityH1('Glendale')`.
  The meta description is the hand-written `page.metaDescription` (151 characters, validated by `assertDescription`).
- TODO(copy): the client has NOT approved any Glendale wording. Every FAQ answer, the five local paragraphs and the noise and AC2HP cards stay flagged until the user says the client approved.
- DECISION NEEDED, `wave1`: Glendale is not in the `wave1` Set in cities.ts (client-confirmed list of 16), so `wave === 2`. The page has `page` content, so its own route is
  indexable and the hubs link it, but `sitemap.ts` only lists `wave1Cities.filter(page)`, so Glendale is NOT in the sitemap. Either add Glendale to `wave1` (and update the "16" comments) or leave it out of the sitemap deliberately. Not changed here because the wave list is client-confirmed.
- Lead angle: Glendale's AC to Heat Pump (AC2HP) Reach Code and the Municipal Code Chapter 8.36 noise limits (45/55 dBA single-family and duplex night/day, 60 multifamily, 65 commercial and central business district, 70 industrial; night 10 p.m. to 7 a.m.; Sec. 8.36.040(A)).
- TODO(verify) AC2HP status: the City AC2HP page says adopted in Fall 2025 with no effective date; the Permit Services page says the 2026 Glendale Reach Code took effect January 1, 2026; a third-party report dated August 7, 2026 says the ordinance is still under California Building Standards Commission review. The page says we confirm with the City whether and how it applies. Confirm before launch.
- TODO(verify) AC2HP scope: the City page says single-family, duplex and townhome; the unsigned draft ordinance (AAGLA-hosted) says existing single-family only. The page follows the City page.
- TODO(verify): Chapter 8.36 is from the ecode360 copy, which shows no edition date; recheck against the official code. We did not confirm whether Sec. 8.36.080 construction hours apply to a service call. GWP is called a City department from the City URL path only; its rate pages were not readable.
- Housing and population: SCAG 2019 Local Profile (DOF E-5, 2018: 80,176 units, 34.6% detached, 4.4% attached, 8.6% in 2-4 units, 52.3% in 5+ units, 0.1% mobile; ACS 2017 via SCAG: 61.8% built before 1970) and Census QuickFacts (187,160 residents, July 1, 2025; 35.2% owner-occupied, 2020-2024). Data years labeled as printed.
- DECISION (default: keep link-only): verified Glendale Water & Power Smart Home Rebate amounts, not published: room AC $400, heat pump or mini-split $500 per ton, gas-to-heat-pump $1,000 per ton, effective Nov 1, 2025, GWP customers only, first come first served. Do not relabel SEER as SEER2.
- DECISION (default: held out): ZIP card. The user supplied the City dashboard list (91020, 91201-91208, 91210, 91214), but it is a tax heat map that includes 91020 and could not be read here, so it is not an official postal list. `zips: []`, `neighborhoods: []`, `nearby: []`.
- Right-hand card: two fact cards (`page.localCards`: noise limits table and "Replacing an AC in Glendale") above the "Official Glendale resources" list (`page.officialResources`, 9 links). `localCards` is a NEW optional field on `CityPage`, rendered by `LocalKnowledge` with new `.lc` rules in globals.css. This goes beyond the Corona structure.
- Local-knowledge card (2026-10-18): a third `page.localCards` entry, a four-row housing snapshot (SCAG figures already in the fourth paragraph). TODO(copy): client has not approved any Glendale wording, including this card. See docs/local-knowledge-balance.md.
- Held out (no verified source): ZIP card; neighborhood names (Chamber of Commerce, a property-management blog and Wikipedia only); nearby row (Wikipedia); climate, NOAA normals, marine layer, heat island, humidity; City housing statements (most units built 1960-1979, 77,783 units in 2024, about 7 percent vacant, 222 new units since 2020: City demographics pages would not load); GWP Time-of-Use seasons, eligibility and business peak hours (rate pages would not load); the "simple residential HVAC change-outs on the Permits Portal" claim; Glendale gas provider; GWP serving all of Glendale; Permit Services Center hours; GMC 30.30.020 rooftop equipment rule (read only through a summary); zoning, employers, hospitals, schools, shopping centers, industrial areas, HOA and historic-district rules, setbacks; median year built and single-family/multifamily split beyond SCAG; all rebate dollar amounts; competitor SERP table (never on the page).
- Corrected research overstatements: the research's construction-hours link was Glendale, Ohio (replaced with California GMC 8.36.080); Census figures were from an older ACS series (QuickFacts current values used, no money or household figures); the research missed the AC2HP reach code; the permits-portal change-out claim was unsupported.
- Still needs pasted pages from the user (City pages that would not fetch): GWP rates, demographics and census-information, ZIP dashboard, fire stations, online services.
- Pre-launch recheck: AC2HP page and adopted ordinance, Permit Services page and building code notice (Jan 1, 2026), permit guidance page, Chapter 8.36 (ecode360), GWP Smart Home Rebate Program page (amounts and dates), City residential resources page, AQMD jurisdiction list, SCAG profile URL (2019 Local Profile in a 2024-05 folder), QuickFacts.
- LA County hub wiring DONE: Glendale card `href`, /service-areas/ chip, `hubCityIndexNote`, hub intro wording, LA County page sentence. `commercial-hvac.ts` only lists city names, no link, so unchanged.
- LA County hub audit, Glendale copy corrected: card note ("Inland basin and foothill setting" was unsourced) now "Has its own AC replacement code page and zone noise limits, with 60.9% multifamily housing (2018)"; permits row ("simple residential permit on the City's online permit portal" was unsupported) now follows the City permit guidance page; FAQ "inland areas such as Burbank and Glendale are more exposed to heat" (unsourced for these cities) now "inland valley and foothill areas run hotter". NOT changed, still open: the rebates copy and the utilities FAQ say both "Glendale by Glendale Water & Power" and "Culver City, Glendale, and Santa Monica should be confirmed by address"; pick one once GWP's service area is confirmed. The Burbank and Pasadena hub notes were not audited here.
- Pasadena's `nearby` row links Glendale. It renders a normal link, so nothing breaks, and Glendale now has a real page. No code change; the Pasadena note above that calls Glendale a noindex stub is updated.
- Hero photo is still "Photo pending".
- Claim wording follows the approved list. Do not strengthen it.

## /service-areas/burbank/ (burbankOverrides in src/content/cities.ts)
Built 2026-10-18, pushed to main (user chose push to main). Reference artifact: claude/reference/burbank-location.html
(https://claude.ai/artifact/LiMcxAtinjsgg5WJcAr59c). Same single-data-source build as Glendale. Burbank was a wave 2 noindex stub before this.
- Title: `cityTitle('Burbank')` ("HVAC Services in Burbank, CA | AIRPRO SOLUTIONS", 47 characters). H1 is `cityH1('Burbank')`. Hand-written `page.metaDescription` is 154 characters and passes `assertDescription`.
- TODO(copy): the client has NOT approved any Burbank wording. Every FAQ answer (18), the five local paragraphs and both local cards stay flagged until the user says the client approved.
- DECISION NEEDED, `wave1`: same as Glendale. Burbank is wave 2, so its route is indexable and the hubs link it, but `sitemap.ts` lists only `wave1Cities.filter(page)`, so Burbank is NOT in the sitemap. Either add it (and update the "16" comments) or leave it out deliberately. Not changed because the wave list is client-confirmed. User decision 2026-10-18: do not add yet; raise with the client at copy review.
- Lead angle: the City's two permit tiers (Tier 1 over the counter, Tier 2 plan check or zoning) and the two Tier 1 HVAC scopes that need an energy report (roof or rear-of-property unit replacement; replacement with new ducts or a new HVAC system), plus the 2025 code set effective January 1, 2026 and Burbank Water and Power.
- Verified facts (all accessed 2026-10-18): Building Permits page (no date; (c) 2026): tiers, online permits for HVAC changeout and mechanical ducting, mechanical exemptions (portable cooling unit, portable evaporative cooler, 10 lb or less refrigerant self-contained system, replacement of a part that does not change approval), permit office at 150 N. Third Street, first floor, 91502, (818) 238-5220. Building Codes page: 2025 California Building Code with local amendments effective January 1, 2026; applications received before noon December 31, 2025 follow the 2022 codes; local amendments in Title 9 and Ordinance No. 25-4,034 (Eff. 01-01-2026). Construction hours: Ordinance 25-4,034 Sec. 9-1-1-105.10 (Mon-Fri 7-7, Sat 8-5, none Sundays and City holidays, exceptions incl. owner-builder and emergency work). Noise: General Plan Noise Element Table N-4 stationary sources (55/45 dBA day/night; 50/40 tonal, impulsive, repetitive, speech and music; footnote on stricter or looser standards by ambient level). Housing and population: SCAG 2019 Local Profile (DOF E-5, 2018: 44,642 units, 44.4% detached, 4.3% attached, 10.6% in 2-4 units, 40.4% in 5+ units, 0.3% mobile; ACS 2017 via SCAG: 62.9% built before 1970) and QuickFacts (102,988 residents, July 1, 2025; 43.3% owner-occupied, 2020-2024). Land Use Element: Rancho equestrian character; Media District Commercial regional employment center; Media District Specific Plan adopted 1991. BWP: not-for-profit owned by the citizens of Burbank; Electrify Your Home heat pump HVAC rebate conditions; residential rebates page lists ENERGY STAR room AC and smart thermostat; business rebates catalog and custom rebates. AQMD lists Burbank in the Los Angeles County Eastern Region row.
- TODO(verify) code editions: the building-codes page lists the 2025 set, but its Energy Standards link points to the 2022 standards. The page does not say which edition that link covers. Reach-code status is not stated on the City pages read, and the full Title 9 amendments were not read (the City PDF text I saw was truncated), so the page and FAQ say "we did not find a Burbank reach code on the City pages we read". User accepted this wording 2026-10-18. Read Title 9 in full before launch.
- TODO(verify) Municipal Code text: the City links ecode360 (BU4369) and codepublishing.com/CA/Burbank (current through Ordinance 26-4,038, passed 2026-02-24, City Clerk holds the official version). Neither exposed section text. The construction-hours section number is 9-1-1-105.10 per the City ordinance; third-party copies say 105.8.
- DECISION (default and chosen: link-only): verified BWP amounts, not published on the city page or the hub: heat pump HVAC (central or mini-split) $1,000 per ton up to $2,500 standard, up to $5,000 for low-income customers (BUSS or Lifeline, approved within 18 months) and affordable-housing providers; $750 panel upgrade, not claimable alone. Conditions: must replace a gas appliance, no new construction, equipment new and NRTL or AHRI listed, permit finaled, application within 6 months, first come first served, not guaranteed. Room AC (ENERGY STAR) $35 in Burbank or $20 online, limit 3; smart thermostat $75 in Burbank or $50 online, limit 2; four-month deadline (form v08.25.26). Business: catalog amounts only in the downloadable catalog, capped at 100% of project cost; custom $0.05/kWh capped at 25% of project cost; packet due within 4 months. Do not relabel SEER as SEER2.
- OPEN CLIENT QUESTION: the BWP heat pump page says installation by a licensed electrical contractor. Air Pro is C-20. The installer condition is kept off the page. Ask the client whether a C-20 installation qualifies. BWP's own FAQ also conflicts on whether installation and labor costs are eligible (FAQ 24 says ineligible, FAQ 7 says "eligible installation costs"), so no labor reimbursement is promised.
- DECISION (default: held out): ZIP card. The City "Zip Code Areas" map (gis.burbankca.gov/maps/zipcodes.pdf, undated) lists 18 ZIPs including non-Burbank ones (for example 90027, 90068, 91602). The research listed 91501, 91502, 91504, 91505, 91506, 91521, 91522, 91523 as Burbank, which I could not confirm. `zips: []`, `neighborhoods: []`, `nearby: []`.
- DECISION (default and chosen: not published): Municipal Code 9-3-208 (machinery, equipment, fans and air conditioning) was read only in a third-party copy (nonoise.org, current through Ordinance 16-3,878, May 10, 2016): 5 dBA over ambient base level; base levels 45 dBA night and 55 dBA day residential, 65 commercial, 70 other. Check the official code before using.
- Right-hand card: two `page.localCards` (permit tiers; noise levels and work hours) above the "Official Burbank resources" list (11 links). A housing snapshot card was drafted and dropped because it repeated the glance panel and fourth paragraph. Measured at 1280px with Manrope and Barlow Condensed loaded: copy 1677px, card content ends within about 4px. Recheck after any copy change (docs/local-knowledge-balance.md).
- Held out (no verified source): ZIP card; neighborhood names (Magnolia Park, Elmwood, Lake-Alameda, Peyton-Grismer, Verdugo Lake are not in the cited Land Use Element); Equestrian Center; official Municipal Code noise text; the 2024 staff report "45 dBA most restrictive" figure (no code section or zone cited); gas provider (no service-territory page; BWP page does not mention gas); BWP serving all of Burbank; 9.9% BWP rate increase and time-of-use hours (not on the pages read); SoCalGas ESA no-cost furnace (research only); permit counter hours (the City page conflicts with itself); outdoor-unit setbacks, historic-property rules, duct testing thresholds, employers, climate ("Valley-edge climate" had no source); the Zoneomics rooftop-height rule (unofficial); all rebate dollar amounts.
- Corrected research overstatements: BWP rates are "in effect as of January 1, 2026" (research said July 1, 2024) and the 9.9% increase was not on the page; room AC and thermostat amounts and form version conflicted (research cited v09-08-2025 and "up to $75"; the page and form v08.25.26 show $35/$20 and $75/$50); the $750 panel upgrade and mini-splits are on the Electrify page, not the residential-rebates page; the research's neighborhood list is not in the cited Land Use Element; the ZIP map includes non-Burbank ZIPs; the Zoneomics rooftop rule is unofficial (the research itself later corrected this); construction-hours section number; the permit page hours conflict; the building-codes Energy Standards link is 2022.
- LA County hub wiring DONE: Burbank card `href` and sourced note ("Has its own permit tiers. Rooftop and rear-of-property replacements need an energy report."), /service-areas/ chip, `hubCityIndexNote`, hub intro wording, LA County page sentence. `commercial-hvac.ts` only lists city names, no link, so unchanged.
- LA County hub audit, Burbank copy corrected: card note ("Valley-edge climate" was unsourced) replaced; the rebate card no longer prints "$1,000 per ton" or "up to $2,500" (now "Heat pump rebate", conditions only, link to the Electrify page); "Cool Rewards thermostat credits" removed (unverified); the source comment "dated January 9, 2026" removed (the page shows no date). Checked, no change: housing row (48.7 / 51.0 / 44.4 matches SCAG), permits row (matches the City page), utilities list. NOT changed, still open: the utilities FAQ says "Burbank by Burbank Water and Power" without a service-territory source, and the hub climate paragraph names Burbank as an inland example (CEC statement is regional).
- Pasadena's `nearby` row links Burbank. It renders a normal link; only the stale comment above `nearby` was updated (Glendale and Burbank now have page content).
- Still needs pasted pages from the user: the City Municipal Code Title 9 text (ecode360 or codepublishing would not expose it), BWP service-territory or gas-provider page, and any ZIP source that says which ZIPs are inside Burbank.
- Pre-launch recheck: Building Permits page (counter hours, tiers, energy report scopes), Building Codes page (edition, Energy Standards link) and Ordinance 25-4,034, Title 9 amendments for any reach code, Noise Element Table N-4, BWP Electrify Your Home (conditions, installer requirement, cost eligibility), BWP residential and business rebate pages, SCAG profile URL (2019 profile in a 2024-05 folder), QuickFacts, Land Use Element.
- Hero photo is still "Photo pending".
- Claim wording follows the approved list. Do not strengthen it.

## /service-areas/santa-monica/ (santaMonicaOverrides in src/content/cities.ts)
Built 2026-10-18, pushed to main (user chose push to main). Reference artifact: claude/reference/santa-monica-location.html
(https://claude.ai/artifact/UKkwRydNT7oeYjRfqoqiVh). Same single-data-source build as Glendale and Burbank. Santa Monica was a wave 2 noindex stub before this.
- Title: `cityTitle('Santa Monica')` ("HVAC Services in Santa Monica, CA | AIRPRO SOLUTIONS", 52 characters). H1 is `cityH1('Santa Monica')`. Hand-written `page.metaDescription` is 158 characters and passes `assertDescription`.
- TODO(copy): client has not approved any Santa Monica wording (every FAQ answer, the five local paragraphs, the two local cards, the noise, permit, code, utility and incentive sentences, the commercial sentence). Keep flagged until the user says the client approved.
- DECISION, `wave1`: Santa Monica is wave 2, so its route is indexable and the hubs link it, but `sitemap.ts` lists only `wave1Cities.filter(page)`, so it is NOT in the sitemap. User decision 2026-10-18: leave it out; raise with the client at copy review.
- Lead angle (beyond the Burbank/Glendale structure): permit review first (Same-Day Review versus Plan Review through Citizen Access and ProjectDox, plus the 2025 California Standards Code effective January 1, 2026), then SMMC Sec. 4.12.130 on mechanical equipment as the second local lever. User decision 2026-10-18: lead with permit review because the City's application of Sec. 4.12.130 to a like-for-like replacement is unconfirmed. Copy, local cards and FAQs are ordered the same way. Development project applications must include a noise analysis showing compliance with Sec. 4.12.060, equipment may not sit on a building side next to a residential building on the adjoining lot unless compliance is shown, roof equipment can sit inside a noise-attenuating structure, and the owner or contractor runs a final noise test reported to the Community Noise Officer (Sec. 4.12.130(c)).
- Sec. 4.12.130 applies to 'development project applications'. Whether the City applies it to a like-for-like AC replacement permit is unconfirmed. Chapter 4.12 text is the ecode360 publisher copy (core sections added by Ord. 2115CCS, 2/24/04; 4.12.020 and 4.12.050 amended by Ord. 2679CCS, 8/24/21); no overall edition date shown.
- TODO(verify) code editions: the plan review page says 2025 California Standards Code effective January 1, 2026, with submittals on or before December 31, 2025 on the 2022 cycle. Reach-code and Zero Emission Building Code status are unresolved and not on the page.
- DECISION (default and chosen: link-only): verified rebate amounts, not published on the city page or the hub. SoCalGas 2026 residential application (code 0926, no stated publication date): furnace $1.40 (92 to 94% AFUE), $10 (95 to 96%), $25 (97% or higher) per kBtuh; storage water heater $300 / $325 / $575 by tier; tankless $80 (0.82 to 0.86 UEF), $900 (0.87 to 0.94), $1,100 (0.95), $1,300 (0.96 to 0.97), $1,500 (0.98 or higher). Conditions: licensed-contractor installation and permit closure for furnaces, one furnace per household, tankless only replacing a conventional gas tank in a single-family detached home, storage heaters 20 to 55 gallons and 75 MBtuh or less, purchase and install January 1 to December 31, 2026, existing occupied dwellings only, first come first served, no stacking with point-of-sale incentives, wildfire-increased rebates (up to 50%) need a 2025 wildfire impact (ZIPs 90402 and 90403 are on the list, ZIP alone is not enough). The SoCalGas $75 smart thermostat is wildfire-exclusive. The SCE $75 is a Smart Energy Program enrollment credit, not an equipment rebate.
- OPEN CLIENT QUESTION: SCE's Smart Energy Program lists an "authorized service provider" condition. Ask the client whether Air Pro qualifies. The condition is kept off the page. The SoCalGas licensed-contractor condition is also kept off the page.
- DECISION (default and chosen: held out): ZIP card. 90401 to 90405 are verified only by the Housing Authority payment-standard page (effective August 3, 2026, no publication date), which does not map ZIPs to neighborhoods. Add them later with a "ZIPs do not map to neighborhoods" caveat if wanted. `zips: []`, `neighborhoods: []`, `nearby: []`.
- Neighborhoods (unpublished): the City land use element names North of Montana, Wilshire-Montana (WilMont), Pico, Sunset Park, Ocean Park, Mid-City, Northeast and Downtown, with Main Street and Montana Avenue as districts. The PDF would not load for me (bot detection), so these names came from the user's research paste and are not independently checked. Paste the LUCE PDF before publishing them.
- Right-hand card: two `page.localCards` entries (permit path, then equipment noise rules) above the "Official Santa Monica resources" list (12 links). A noise limits and work hours card (as in Burbank) was drafted and dropped because paragraph 2 already states the zones, limits and construction hours. Measured at 1280px with Manrope and Barlow Condensed loaded: card content ends about 80px above the copy. Recheck after any copy change (docs/local-knowledge-balance.md).
- Held out (no verified source):
  - ZIP card: the only ZIP source is a Housing Authority payment-standard table (90401 to 90405) that does not say these are the City's ZIPs; SoCalGas lists 90402 and 90403 in a wildfire section without naming the City.
  - Neighborhood names (North of Montana, Wilshire-Montana, Pico, Sunset Park, Ocean Park, Mid-City, Northeast, Downtown): the City land use PDF (LUCE) would not load, so the names are unverified.
  - Climate, NOAA normals and heat-day counts: NOAA ICAC1 is a National Ocean Service water level and meteorological station, not a buoy and not a normals source; the Wikipedia 63 to 71F range is third-party.
  - Permit Services Center address, hours and paperless wording: the City page returned a bot-detection page.
  - Express Permit HVAC scopes: not named on the pages read.
  - MEP Plan Check Thresholds values: separate PDF not read.
  - Zero Emission Building Code status: City page says enforcement is paused (no date), a news report says Council replaced it in September 2024 with an Energy Performance Approach effective October 24, 2024.
  - SMMC 9.21.140 screening rule: seen only in a project approval.
  - Gas provider: no service-territory page found.
  - All rebate dollar amounts and wildfire-related SoCalGas items: link-only by rule.
  - SCE Smart Energy Program authorized-service-provider condition: kept off the page.
  - Outdoor-unit setbacks, historic-property rules, duct testing thresholds, zoning map, HOA areas: no source.
  - Competitor SERP table: never on the page.
- Corrected research overstatements: code effective date is January 1, 2026 (research said 2025); Zone III is the industrial conservation district, not "Light Manufacturing and Studio District", and Zone II was omitted; the noise test is Sec. 4.12.130(c), not Sec. 4.12.170; NOAA ICAC1 is a water level and meteorological station, not a buoy and not a normals source; the plan review page does not use "electronic plan review" (the process is Citizen Access plus ProjectDox); page dates differ from the research (plan review published 2021-11-30, modified 2026-09-17); the SoCalGas form code "0926" is not labelled as a date and the wildfire boost is "up to 50%", not "50% more"; the housing mix was marked NOT FOUND but SCAG verifies it (52,441 units, 77.5% multifamily); the research's Express Permit HVAC scope is unverified.
- LA County hub wiring DONE: Santa Monica card `href` and sourced note, /service-areas/ chip, `hubCityIndexNote`, hub intro wording, LA County page sentence. `commercial-hvac.ts` only lists city names, so unchanged.
- LA County hub audit, Santa Monica copy corrected: the permits row no longer says "Permit Services Center" (unverified, page blocked) or that the Zero Emission Building Code "is adopted, and its enforcement is currently paused" (conflicting sources); it now describes Same-Day Review versus Plan Review and the equipment noise rules. The "$75 smart thermostat" rebate card was wrong (wildfire-exclusive) and is replaced by a link-only SoCalGas furnace rebate card. The utilities list and the rebates and FAQ copy now say Santa Monica is served by SCE (Clean Power Alliance supplies power per the City's April 12, 2019 post). Checked, no change: housing row (22.1 / 77.5 / 67.4 matches SCAG), "most multifamily at 77.5%" city note.
- RESOLVED 2026-10-18 (after the Inglewood push): the South Bay and Orange County hubs no longer advertise the wildfire-only "$75 thermostat" SoCalGas rebate. South Bay now shows a link-only SoCalGas furnace rebate card and FAQ sentence; Orange County dropped the thermostat sentence and wording. Dollar amounts for the OC furnace tiers were not changed.
- Other pages that link Santa Monica: none beyond the LA County hub and `hubCityIndexNote`; `commercial-hvac.ts` lists the name as text only. Pasadena's `nearby` row does not link Santa Monica; not changed. User decision 2026-10-18: do not touch other city pages yet.
- Still needs pasted pages from the user: the City Permit Services Center page (hours, address, paperless wording) and the City land use PDF (LUCE), both blocked by bot detection.
- Pre-launch recheck: plan review page, Same-Day Review page, Permit Services Center page (hours, address; blocked here), noise program page, Chapter 4.12 (official code), SCE Golden State Rebates and Smart Energy Program pages, SoCalGas rebates page, City Clean Power Alliance post (2019), SCAG profile, QuickFacts, Principal Employers report.
- Hero photo is still "Photo pending".
- Claim wording follows the approved list. Do not strengthen it.

## /service-areas/inglewood/ (inglewoodOverrides in src/content/cities.ts)
Built 2026-10-18, pushed to main (user chose push to main). Reference artifact: claude/reference/inglewood-location.html (https://claude.ai/artifact/CuUM3h1Rp6W2KEgWAuE62n). Same single-data-source build as Glendale, Burbank and Santa Monica. Inglewood was a wave 2 noindex stub before this.
- Title: `cityTitle('Inglewood')` ("HVAC Services in Inglewood, CA | AIRPRO SOLUTIONS", 49 characters). H1 is `cityH1('Inglewood')` (30 characters). Hand-written `page.metaDescription` is 148 characters and passes `assertDescription`.
- TODO(copy): client has not approved any Inglewood wording (every FAQ answer, the three local paragraphs, the permit card, the permit, rebate and assistance sentences, the commercial sentence). Keep flagged until the user says the client approved.
- DECISION, `wave1` (user approved 2026-10-18, default kept): Inglewood is wave 2, so its route is indexable by design (it has `page` content) and the hubs link it, but `sitemap.ts` lists only `wave1Cities.filter(page)`, so it is NOT in the sitemap. Not changed; the wave list is client-confirmed.
- Lead angle: permit path first (the City's Building Safety Division issues mechanical permits; online permit portal), then local housing stock (SCAG: 70 percent of housing built before 1970, 41.0% in buildings of 5 or more units) and the utility programs. The distinctive local lever the City pages would normally supply (a dedicated HVAC application, an engineer-stamp rule, noise and zoning text) could not be read, so the permit lever is thin. Paste the blocked pages below to strengthen it.
- Verified facts (all accessed 2026-10-18):
  - SCAG 2019 Local Profile of Inglewood (read directly): 38,655 housing units (California Department of Finance E-5, 2018): 14,751 single-family detached (38.2%), 2,314 attached (6.0%), 5,518 in 2 to 4 units (14.3%), 15,863 in 5 or more (41.0%), 209 mobile homes (0.5%); 70 percent of housing built before 1970 (ACS 2017, Nielsen Co.); population 113,559 (DOF E-5, May 2018).
  - Census QuickFacts (read directly): 101,662 residents (V2025, July 1, 2025); 36.2% owner-occupied housing rate (2020-2024); land area 9.07 square miles.
  - City General Information page (read through a fetch summary, shows no date): the Building Safety Division issues building, electrical, plumbing, sewer, mechanical, and grading permits; fees depend on the project's type and complexity.
  - City online permit portal (menu only): Building Applications and Building Permit, Planning/Zoning Applications and Permits, Public Works Applications and Permits, Property Information, How to Videos.
  - South Coast AQMD jurisdiction page: Inglewood is listed under Los Angeles County Western Region. AQMD About page: basin exceeded the federal 8-hour ozone standard on 124 days in 2022, based on preliminary data.
  - SoCalGas 2026 Home Energy Efficiency Rebate application (form code J087-228EEC 0926): central natural gas furnace tiers 92 to 94% AFUE, 95 to 96%, 97% or higher; ENERGY STAR; existing occupied housing, one per household; purchase and install January 1 to December 31, 2026, postmark by December 31, 2026; first come, first served; no duplicate incentives; thermostat and insulation rebates are wildfire-only.
  - SCE Energy Savings Assistance page (no publication date): Central AC or Central Heat Pump Replacement listed under Cooling; may not be available in all areas, restrictions may apply, co-payment may be required for some services; delivered by SCE-approved contractors; residences with four or fewer units count as single-family; income limits effective June 1, 2026 to May 31, 2027; Building Electrification closed to new enrollments as of September 2026.
  - SCE rebate directory (no date): Golden State Rebates instant coupons for air conditioners, smart thermostats, electric heat pump water heaters and gas water heaters at participating retailers; Home Performance Plus for SCE residential electric customers in a single-family detached home or a unit in a building of up to four units within Disadvantaged or Low-Income communities; no dollar amounts on those descriptions; the $75 bill credit is the separate Smart Energy Program.
  - California Energy Commission: HEEHRA single-family retrofit rebates fully reserved statewide as of February 24, 2026; no new income verification requests accepted.
  - IRS FS-2025-05 (August 21, 2025): Section 25C not allowed for property placed in service after December 31, 2025; Section 25D not allowed for expenditures after December 31, 2025.
- DECISION (default and chosen: held out, same as Burbank 9-3-208): Third-party noise text (nonoise.org copy, printed date 6/11/2016, cites Ord. 88-29 and Ord. 15-10, no current-through line): Chapter 5, Article 2, Sec. 5-27 base levels 45 dB(A) residential 10 p.m. to 7 a.m., 55 dB(A) residential 7 a.m. to 10 p.m., 65 dB(A) commercial and unspecified uses, 75 dB(A) industrial; Sec. 5-39 makes it unlawful to run machinery, equipment, fans and air conditioning so that noise at a property line exceeds the ambient base level by 5 dB(A); Sec. 5-32 lowers limits by 5 dB(A) for impact, repetitive or simple tone noise; Sec. 5-24.1 exempts stadium construction and certain events. The page says nothing about noise. Publishing it would need the caveat that this is a third-party copy, not the official code, plus a check of the current code.
- DECISION (default and chosen: link-only, no amounts): verified SoCalGas furnace rebate amounts, not published: 92 to 94% AFUE $1.40 per kBtuh, 95 to 96% $10 per kBtuh, 97% or higher $25 per kBtuh. Do not relabel SEER as SEER2. No other dollar amounts are published.
- DECISION (default and chosen: not on the page): federal Section 25C and 25D status and HEEHRA status. The IRS FAQ (FS-2025-05, August 21, 2025) says 25C does not apply to property placed in service after December 31, 2025 and 25D to expenditures after that date; the CEC says single-family HEEHRA rebates were fully reserved statewide as of February 24, 2026. The LA County hub already leaves HEEHRA unadvertised. Tax and state-program statements are left off unless the client wants them.
- OPEN CLIENT QUESTIONS: (1) SCE's Energy Savings Assistance page says upgrades are delivered by SCE-approved contractors; ask whether Air Pro does or can do that work. The condition is kept off the page. (2) The SoCalGas furnace form requires a licensed contractor and proof of permit closure; kept off the page. (3) The SCE "authorized service provider" question from Santa Monica still applies to the Smart Energy Program, which this page does not mention.
- DECISION (default and chosen: held out): ZIP card and neighborhoods. 90301 to 90312 and nine neighborhood names come from Wikipedia only. `zips: []`, `neighborhoods: []`, `nearby: []`. No "flat" or "hillside" labels (no topographic source).
- Right-hand card: one `page.localCards` entry (permit path) above the "Official Inglewood resources" list (10 links). (not measured yet)
- Held out (no verified source):
  - Noise code: Municipal Code Chapter 5, Article 2 (Sec. 5-27 base levels, Sec. 5-39 machinery, equipment, fans and air conditioning) was read only in a third-party copy (nonoise.org, printed date 6/11/2016, no edition line, official code location not confirmed). Not published (user decision needed, see open-items).
  - ZIP card (90301 to 90312) and neighborhood names (Morningside Park, Downtown, Fairview Heights, Arbor Village, Hollypark Knolls, Centinela Heights, Century Heights, Inglewood Knolls, Lockhaven): Wikipedia only, no official City or USPS source.
  - Climate, NOAA normals, heat-day counts, humidity: no station verified for Inglewood.
  - Neighboring cities and the nearby row: no official source named them.
  - Building Safety address, phone, hours, QLESS appointments, the dedicated HVAC application and the January 5, 2026 engineer stamp rule: the City Building Safety page returned only an intro line and the applications and fees page would not load.
  - Electric and gas provider (SCE and SoCalGas): the City New to the City page would not load, so neither is stated for Inglewood.
  - Zoning Chapter 12, zoning map and overlay map: the City Zoning Codes and Map Gallery pages would not load.
  - South Coast AQMD: Inglewood is listed under Los Angeles County Western Region (verified), and the basin exceeded the 8-hour ozone standard on 124 days in 2022 (preliminary). No sourced HVAC tie, so not used on the page.
  - Employers, shopping centers, schools, hospitals, industrial areas, HOA areas, setbacks, historic-district rules, median year built: no source.
  - All rebate dollar amounts; federal Section 25C and 25D status; HEEHRA status; SCE older heat pump discounts and the TECH $1,000 incentive; SCE Building Electrification (closed); Clean Power Alliance room AC coupon (Inglewood account eligibility unconfirmed).
  - SoCalGas licensed-contractor and permit-closure conditions and SCE approved-contractor wording: kept off the page.
  - Competitor SERP table: never on the page.
- Corrected research overstatements:
  - The research marked the housing mix and median year built NOT FOUND, but SCAG verifies the mix (38,655 units, 41.0% in 5 or more units) and the share built before 1970 (70 percent). Median year built stays unavailable.
  - The research cited 9.1 square miles from a Census profile; QuickFacts prints 9.07 (2020). Land area is not on the page.
  - The research said HVAC permit applicants can use the Accela portal and that the City has a dedicated HVAC application. The portal page shows only a menu (Building, Planning/Zoning, Public Works) with no HVAC, fee or inspection wording, and the applications page would not load. Not stated on the page.
  - The research cited the Building Safety address, phone, QLESS appointments and a January 5, 2026 engineer-stamp rule from City page 236. The fetch returned only an intro line, so none of it is verified.
  - The research said the City lists SCE and SoCalGas (New to the City page). That page would not load, so neither provider is stated for Inglewood.
  - The research said ZIPs 90301 to 90312 and nine neighborhood names. Wikipedia is the only source, so both stay held out. The Wikipedia Inglewood Knolls boundary text is also unofficial.
  - SCE Energy Savings Assistance: the page says services may not be available in all areas, restrictions may apply and a co-payment may be required for some services. The research summary omitted these, and its line that not every eligible household receives every measure is not on the page text read.
  - Golden State Rebates also covers electric heat pump water heaters and gas water heaters; the research listed only air conditioners and smart thermostats. Home Performance Plus is limited to Disadvantaged or Low-Income communities, and Inglewood applicability is unconfirmed.
  - SoCalGas form: the footer prints 'J087-228EEC 0926' with no label, so 'September 2026' is an inference and is not stated. The furnace rebate also needs a licensed contractor and permit closure; those conditions are kept off the page.
  - The research listed AQMD jurisdiction without naming where Inglewood sits; the jurisdiction page lists Inglewood under Los Angeles County Western Region.
  - The hub says Inglewood is near-coastal and served by SCE. Neither has a source read here. The hub housing row (44.2 / 55.3 / 41.0) matches SCAG (38.2 plus 6.0, and 14.3 plus 41.0).
- Still needs pasted pages from the user (City pages that would not fetch or returned only part of the page): Building Safety (cityofinglewood.org/236), Building Safety Applications and Fees (/1798), New to the City (/514), Zoning Codes (/1869), Map Gallery (/836), the Building Safety Fees PDF (DocumentCenter/View/16713), Agency Links (/248), the City FAQ on electric bills (FAQ.aspx?QID=362), the official Municipal Code location for Chapter 5 (noise) and Chapter 12 (zoning), and SCE's service area map file.
- Pre-launch recheck: City Building Safety page, General Information page, applications and fees page, online permit portal, New to the City page, Chapter 5 noise text (official code), SoCalGas rebates page and 2026 application, SCE Energy Savings Assistance, rebate directory and service area pages, SCAG profile, QuickFacts.
- Hero photo is still "Photo pending".
- Claim wording follows the approved list. Do not strengthen it.
- Hub wiring done with this page: LA County hub Inglewood card now links /service-areas/inglewood/; the unsourced "near-coastal" and SCE statements for Inglewood were removed from the hub card, utilities list, rebates copy and FAQ; the permits row for Inglewood was reworded to the verified Building Safety Division and online portal facts; the "other city pages are coming" sentences were reworded because Inglewood is the last of the eight LA County cities. Chip and index note on /service-areas/ added.
- Rancho Cucamonga: still only a noindex stub (flagged in Gate 0, not built here).
- Carryovers still open: SCE "authorized service provider" client question (Santa Monica); Burbank BWP installer question.

## /service-areas/manhattan-beach/ (manhattanBeachOverrides in src/content/cities.ts)

Built 2026-10-19, pushed to main (user chose push to main). Reference artifact: claude/reference/manhattan-beach-location.html (https://claude.ai/artifact/CkeYGHgHd2pyzaqiaAsanR). Same single-data-source build as Glendale, Burbank, Santa Monica and Inglewood. Manhattan Beach was a wave 2 noindex stub before this.
- Title: `cityTitle('Manhattan Beach')` ("HVAC Services in Manhattan Beach, CA | AIRPRO SOLUTIONS", 55 characters). H1 is `cityH1('Manhattan Beach')` (36 characters). Hand-written `page.metaDescription` is 154 characters and passes `assertDescription`.
- TODO(copy): client has not approved any Manhattan Beach wording (every FAQ answer, the four local paragraphs, the local card, the permit, placement, utility, rebate and assistance sentences, the commercial sentence). Keep flagged until the user says the client approved.
- DECISION `wave1` (user approved 2026-10-19, default kept): Manhattan Beach is wave 2, so its route is indexable by design (it has `page` content) and the hubs link it, but `sitemap.ts` lists only `wave1Cities.filter(page)`, so it is NOT in the sitemap. Not changed; the wave list is client-confirmed.
- DECISION (user approved 2026-10-19): JSON-LD `containedInPlace` is "South Bay, CA", as the live route emits for every city, so the review artifact matches what ships. A sitewide change to "Los Angeles County, CA" would be a separate task.
- DECISION (user approved 2026-10-19): the nearby row (Redondo Beach, El Segundo, Torrance, Gardena) is exempt from the "no other-city names" rule, which covers body copy and JSON-LD only. The page claims no adjacency.
- Lead angle: the City's Mechanical Equipment Permit Requirements handout (showpublisheddocument/39726) first, then local housing (SCAG, QuickFacts) and utility programs. The handout is UNDATED and cites the 2022 California Building Standards Codes. The page says so and says we confirm current requirements with the City. Confirming it is the current handout is required before the page moves out of wave 2.
- Beyond the Santa Monica, Burbank, Glendale and Inglewood structure: a Local Coastal Program FAQ and a commercial plan-check FAQ. The "Outdoor equipment placement" card was dropped to balance the local-knowledge band (card ends 21px short of the copy at 1280px).
- Verified facts (accessed 2026-10-19): City permits-handouts-and-forms page (2025 California Building Codes in effect January 1, 2026, no page date); City inspection page (Citizen Self Service portal, 3:00 p.m. cutoff the business day before, no work or inspections until the permit is approved and issued); City CPA page (Clean Power Alliance generation) and electric page (SCE provides electric service); QuickFacts 33,122 residents (July 1, 2025); SCAG 2019 Local Profile 15,059 units, 69.3 percent single-family detached, 16.3 percent in 2 to 4 units, 57.2 percent built before 1970.
- DECISION (default and chosen: link-only, no amounts): verified SoCalGas furnace rebate amounts, not published: 92 to 94% AFUE $1.40 per kBtuh, 95 to 96% $10 per kBtuh, 97% or higher $25 per kBtuh. SCE Energy Savings Assistance income limits (June 1, 2026 to May 31, 2027): $39,900 for one person, $54,100 for two, plus $14,200 per additional person; not published. Do not relabel SEER as SEER2.
- DECISION (default and chosen: not on the page): federal Section 25C and 25D, HEEHRA, the SoCalGas wildfire-only $75 thermostat and the SCE $75 Smart Energy Program credit.
- DECISION (default and chosen: held out): noise figures. The only HVAC noise numbers found (55 dBA daytime, 50 dBA nighttime, cited as MBMC 5.48.160 and Table 6) come from a January 19, 2021 consultant memo, not the code text. The official Municipal Code location was not readable.
- DECISION (default and chosen: held out): ZIP card and neighborhoods. 90266 appears only as the Community Development street address and 90267 only on third-party lists. `zips: []`, `neighborhoods: []`. No "flat", "hillside" or "coastal" labels.
- OPEN CLIENT QUESTIONS: (1) SCE Energy Savings Assistance says upgrades are delivered by SCE-approved contractors; ask whether Air Pro does that work. (2) The SoCalGas furnace form requires a licensed contractor and permit closure. Both conditions are kept off the page.
- Held out (no verified source):
  - 2025 California Mechanical Code and local amendment Ordinances 25-0009 and 25-0010: the current-building-codes page could not be read, and its amendments heading reads 2022 per the research. Only the permits-page notice is on the page.
  - Whether any like-for-like replacement is exempt, the HVAC Replacement Plan for Ground Units and plan check submittal requirements (titles only, PDFs not read), duct testing, coastal review of an HVAC job.
  - Natural gas provider (SoCalGas): no service-territory page read.
  - South Coast AQMD jurisdiction page: would not load.
  - Climate, NOAA normals, heat-day counts, humidity, marine layer: no station verified.
  - Neighboring cities (adjacency), employers, schools, hospitals, HOA areas, historic-district rules, median year built.
  - General Plan EIR "largely built out" wording (2003, not read) and the Census Reporter 15,281 units figure (aggregator).
  - Competitor SERP table: never on the page.
- Corrected research overstatements:
  - The Building and Safety page as read covers only construction and demolition waste. It has no mechanical-permit sentence, code list or Title 9 mention.
  - The research put the CPA statement on the electric-utility page. It is on the environmental-sustainability CPA page; the electric page says only that SCE provides electric service.
  - The zoning page as read has no Titles 7/10 warning or ordinance dates.
  - Ordinances 25-0009 and 25-0010 sit under a heading reading 2022, so they are unverified.
  - SCE ESA "free" wording dropped: the page says a co-payment may be required. The "combining incentives" clause was dropped as unverified.
  - The water-heater research was out of scope for this HVAC page.
- Official Municipal Code: any copy on ecode360, American Legal, nonoise.org, Municode mirrors or GoCodebook is a publisher copy, not the official code. A General Plan table is not a Municipal Code limit.
- Still needs pasted pages from the user: current-building-codes page, building-permit page (services/apply-for/building-permit), both HVAC handout PDFs (HVAC Replacement Plan for Ground Units; Mechanical Equipment Requirements), plan check submittal PDFs, official Municipal Code text (Title 9; 10.52.050, 10.60.050, 10.60.090; Chapter 5.48) and its location, AQMD jurisdiction page, SoCalGas service-territory confirmation, USPS or City ZIP list, the zoning page's Titles 7/10 note.
- Pre-launch recheck: City permits-handouts-and-forms page, current-building-codes page, building-permit page, both HVAC handouts, Municipal Code Title 9 and Title 10 sections 10.52.050, 10.60.050, 10.60.090 and Chapter 5.48 (official code), inspection information page, Citizen Self Service, City electric utility and CPA pages, SCE community choice page, SoCalGas rebates page and 2026 application, SCE Energy Savings Assistance and rebate directory, SCAG profile, QuickFacts.
- Hero photo is still "Photo pending".
- Claim wording follows the approved list. Do not strengthen it.
- Hub wiring done with this page: South Bay Manhattan Beach card now links /service-areas/manhattan-beach/; its note dropped "Beach city"; the permits row was reworded to the handout (mechanical system work needs a permit); the unverified "west of the 405, reached from Pacific Coast Highway" sentence was removed; Manhattan Beach was taken out of the shared noise row; the /service-areas/ chip condition and `hubCityIndexNote` list it; the South Bay "city pages are coming" sentence now links the Manhattan Beach page. The "Beach cities" group label is unchanged. Other pages that reach Manhattan Beach: the Torrance city page and the AC Repair x Torrance page via `nearby`; commercial-hvac.ts mentions it as text only. No LA County hub mention.
- Rancho Cucamonga: still only a noindex stub, not built here. (Hermosa Beach was built afterward; see its section below.)
- Carryovers still open: SCE "authorized service provider" client question (Santa Monica and Inglewood: does Air Pro qualify for the Smart Energy Program, and do Energy Savings Assistance work); Burbank BWP installer question; client approval of all new city copy.

## /service-areas/hermosa-beach/ (hermosaBeachOverrides in src/content/cities.ts)

Built 2026-10-19, push to main pending (user said the page should be pushed; read as push to main, the Manhattan Beach precedent). Reference artifact: claude/reference/hermosa-beach-location.html (https://claude.ai/artifact/VhQMoRN3ACAzS1MkzrWidc). Same single-data-source build as Glendale, Burbank, Santa Monica, Inglewood and Manhattan Beach. Hermosa Beach was a wave 2 noindex stub before this.
- Title: `cityTitle('Hermosa Beach')` ("HVAC Services in Hermosa Beach, CA | AIRPRO SOLUTIONS", 53 characters). H1 is `cityH1('Hermosa Beach')` (34 characters). Hand-written `page.metaDescription` is 150 characters and passes `assertDescription`.
- TODO(copy): client has not approved any Hermosa Beach wording (every FAQ answer, the four local paragraphs, the local card, the permit, coastal, utility, rebate and assistance sentences, the commercial sentence). Keep flagged until the user says the client approved.
- DECISION `wave1` (user approved 2026-10-19, default kept): Hermosa Beach is wave 2, so its route is indexable by design (it has `page` content) and the hubs link it, but `sitemap.ts` lists only `wave1Cities.filter(page)`, so it is NOT in the sitemap. The wave list is client-confirmed and unchanged.
- DECISION (user approved 2026-10-19): the restaurant tenant-improvement self-certification sentence was removed from the commercial FAQ (it came from a fetch summary of the applications page). The answer now says permits go through the City's applications page and Building and Safety Division and we confirm what applies with the City. Re-add only with an official source.
- DECISION (user approved 2026-10-19): code edition wording. The applications page says the 2025 California codes took effect January 1, 2026; the Building Division page says the 2022 codes took effect January 1, 2023. Both are undated. The page states both and says we confirm with the City. Resolve once the official code or a City answer is available.
- DECISION (user approved 2026-10-19): JSON-LD `containedInPlace` is "South Bay, CA", as the live route emits for every city. The nearby row (Manhattan Beach, Redondo Beach, Torrance, El Segundo) is exempt from the "no other-city names" rule. The page claims no adjacency.
- Lead angle: the City's separate Mechanical Permit Application and combined application, the online citizen access portal, the Coastal Zone note from the permit form affidavit, and the Building Division page. Housing from the SCAG 2019 Local Profile and QuickFacts (direct read: 18,513 residents, 43.5% owner-occupied of 10,026 households, 52.9%).
- Clean Power Alliance generation is confirmed by the City's own CPA page (public-works/environmental-programs/clean-power-alliance) and is stated on the page and in the South Bay hub.
- DECISION (default and chosen: link-only, no amounts): verified amounts, not published. SoCalGas furnace rebate $1.40 to $25 per kBtuh on the main rebates page (92 to 94% AFUE $1.40, 95 to 96% $10, 97% or higher $25); its separate disclaimer page lists $1.15, $4.60 and $14 per kBtuh, so the figures conflict and need confirming against the current application. Clean Power Alliance Instant AC Savings: $300 coupon for an ENERGY STAR room air conditioner, CARE or FERA customers only, replacement coupons issued after August 3, 2026 cancellations; not published. SCE Energy Savings Assistance income limits (June 1, 2026 to May 31, 2027): $39,900 for one person, $54,100 for two, plus $14,200 per additional person; not published. Do not relabel SEER as SEER2.
- DECISION (default and chosen: not on the page): federal Section 25C and 25D, HEEHRA (single-family funding fully reserved statewide as of 2026-02-24), the SoCalGas $75 thermostat and the SCE $75 Smart Energy Program credit.
- DECISION (default and chosen: held out): ZIP card and neighborhoods. The City maps page would not load; 90254 appears only on third-party lists. `zips: []`, `neighborhoods: []`. No "flat", "hillside", "coastal" or climate labels.
- OPEN CLIENT QUESTIONS: (1) SCE Energy Savings Assistance says upgrades are delivered by SCE-approved contractors; ask whether Air Pro does that work. (2) The SoCalGas furnace rebate requires a licensed contractor and permit closure. Both conditions are kept off the page.
- Held out (no verified source):
  - Municipal Code Chapter 15.10 (clearances, rooftop, noise, exhaust, seismic anchorage), Chapter 8.24 noise and the 3 foot equipment setback: read only through a publisher copy (online.encodeplus.com), not the official code. A publisher copy is not the official code.
  - City Building and Safety page (services/inspections-building), the inspection scheduling page (ServiceDirectory/218/237) and the maps page (services/maps): would not load, so inspection days and hours, the phone number, the counter hours, the department email, ZIP 90254 and the Coastal Zone Map are not on the page. The research paste gave Monday to Thursday inspection hours and a phone number from the scheduling page; they remain unpublished until the page is pasted.
  - Asbestos survey wording and the 100 square foot threshold (fetch summary and research conflict), fee schedules effective July 1, 2026, the building department address and ZIP, like-for-like replacement exemptions, HVAC inspection stages and required test documents.
  - Climate, NOAA normals, heat-day counts, humidity, marine layer: no station verified.
  - "Beach city", coastal, flat, hillside labels, neighboring-city borders, Pacific Coast Highway layout, block size: Wikipedia only.
  - SCAG 2021 housing element local data (conflicting unit totals 10,092, 8,979 and 9,565 occupied) and QuickFacts 18,687 / 50.7% (the pasted research disagrees with the page read directly).
  - Employers, schools, hospitals, shopping areas, HOA areas, historic-district rules, median year built.
  - Competitor SERP table: never on the page.
- Corrected research overstatements:
  - The pasted QuickFacts figures (18,687 / 50.7%) did not match the QuickFacts page read directly; the direct read is used.
  - The CPA coupon, CPA Energy Team, SoCalGas ESA, SoCalGas multifamily, TECH $1,000, Comfortably CA and SWITCH items came from research pastes only; none are on the page.
  - HVAC inspection stages: the research found no City checklist, so the page says only to confirm the stages with the City.
- Official Municipal Code: any copy on ecode360, American Legal, nonoise.org, Municode mirrors, GoCodebook or encodeplus is a publisher copy, not the official code. A General Plan table is not a Municipal Code limit.
- Still needs pasted pages from the user: hermosabeach.gov/services/inspections-building, /services/maps, the inspection scheduling page (ServiceDirectory/218/237), PDFs of the Mechanical Permit Application (showpublisheddocument/19385) and combined application (20511), the full text of the applications page (asbestos wording, fee schedule date), the official Municipal Code location and text (Chapters 15.10 and 8.24), the CPA page date, and a USPS or City ZIP list.
- Pre-launch recheck: City applications page, Mechanical Permit Application and combined application PDFs, online access page, utilities page, Building Division page, Building and Safety page, maps page, official Municipal Code (Chapter 15.10 and Chapter 8.24), City CPA page, SoCalGas rebates page and 2026 application, SCE Energy Savings Assistance and rebate directory, SCAG profile, QuickFacts.
- Hero photo is still "Photo pending".
- Claim wording follows the approved list. Do not strengthen it.
- Hub wiring done with this page: South Bay Hermosa Beach card now links /service-areas/hermosa-beach/; the unverified "Beach city" and "online-only October 1, 2026" claims were removed; the permits row was reworded to the verified applications wording and the "Building and Safety Division" label; Hermosa Beach was taken out of the shared equipment-placement row; Hermosa Beach was added to the Clean Power Alliance lines (City-verified); the sentence "We did not find a Clean Power Alliance HVAC rebate" was reworded to "We do not list a Clean Power Alliance rebate on this page" because the research found the CARE/FERA room-AC coupon; the /service-areas/ chip condition and `hubCityIndexNote` list it; the South Bay "city pages are coming" sentence now links the Hermosa Beach page. The "Beach cities" group label is unchanged. commercial-hvac.ts and the LA County hub do not name Hermosa Beach.
- Rancho Cucamonga: still only a noindex stub, not built here.
- Carryovers still open: SCE "authorized service provider" client question (Santa Monica and Inglewood: does Air Pro qualify for the Smart Energy Program, and do Energy Savings Assistance work); Burbank BWP installer question; client approval of all new city copy.

## /service-areas/south-bay/ (src/content/south-bay.ts)

- Hermosa Beach: the "online-only starting 2026-10-01" claim was removed from the hub (no source on the City applications or online access pages). The hub permits row now follows the verified applications wording. See the Hermosa Beach section above.
- Torrance: plan reviews and permit submittals became electronic as of 2026-01-05. Already past;
  re-verify the process hasn't changed further.
- SoCalGas 2026 furnace rebate (replaced the wildfire-only $75 thermostat card): application deadline
  2026-12-31. Remove or update in January 2027.
- SCE Summer Discount Plan (up to $145/unit): seasonal program - confirm current enrollment terms
  before each summer.
- TECH Clean California / HEEHRA: status described "as of early 2026" (Southern California
  single-family funding fully reserved, later requests waitlisted). Re-verify before launch.
- El Segundo: hub states the 2025 California Mechanical Code with local amendments (ESMC 13-4-1, Ord. 1680, 12-3-2025; checked 2026-10-15). See the El Segundo section above.
- Gardena: hub permit row names the Building & Safety Division (City's Schedule An Appointment page, 2026-08-05). Industrial, 405-corridor and 90248 wording was removed because no source supports it. See the Gardena section above. The 90250 sentence in the ZIP FAQ still needs a source.
- Carson and Redondo Beach noise limits: deliberately left without dBA figures (medium-confidence
  planning-document sourcing for Carson). Do not add specific numbers without a stronger source.
- Clean Power Alliance generation: confirmed for Redondo Beach, Manhattan Beach, Hermosa Beach (City CPA page) and Carson.
  Do not add Hawthorne without a source.
- Housing age, attic/foundation/duct condition, and population figures were intentionally left off
  the South Bay hub. Do not add them without a source.

## /service-areas/orange-county/ (src/content/orange-county.ts)

- Anaheim Public Utilities rebate card is link-only (anaheim.net/2579/Heating-Cooling-Systems); no dollar
  amounts are published (the $200/ton, duct repair and thermostat terms are not on the City page and the
  DSIRE record is dated 2025-08-04). Recheck the APU rebate pages before launch.
- SoCalGas 2026 furnace rebate tiers (the wildfire-only $75 thermostat was removed): through December 31, 2026 or until
  funds run out. Remove or update in January 2027.
- SCE Smart Energy Program card removed 2026-10-18 (enrollment credit, not an HVAC rebate; amount unverified; authorized-service-provider condition is an open client question).
- HEEHRA reservation status: single-family funding fully reserved statewide as of 2026-02-24;
  multifamily reservation window closed 2025-12-18. Re-verify before launch.
- 2025 Energy Code (Title 24) effective date: applies to permits submitted on or after 2026-01-01.
  Re-verify if the compliance date changes.
- No source URL was found for the SoCalGas furnace rebate card, so it carries no link.
  Add the official source URL once verified (SoCalGas 2026 rebates).
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
