# Open items

Time-sensitive or client-dependent items that need to be re-checked before launch, or on the date
noted. Each item also has a `TODO(data)` or source comment at its actual location in the code -
this file is the index, not the source of truth.

## /service-areas/los-angeles/ (losAngelesOverrides in src/content/cities.ts)

- Title collision: `cityTitle('Los Angeles')` equals `homeTitle()`, so this page uses `cityTitleAcross()` ("HVAC Services Across Los Angeles, CA"). Decide whether to keep that or retarget the homepage.
- The neighborhood card shows only the City's ZIP listing, grouped by area in collapsed rows (no neighborhood pills). Arleta, Athens, Atwater and Baldwin Hills appear in the lede only. Climate, housing age, terrain, noise, HOA and competitor/SERP detail were NOT FOUND in the research and are not published. Add verified local detail before treating this as a full page.
- LADWP heat-pump rebate ("up to $2,500 per ton/unit", listed 2026-05-22): the research source is undated and the amount is also an open item on the LA County hub. Reconfirm amount and terms before launch.
- "AIRPRO SOLUTIONS can walk you through what your project needs" (permits) is a practice claim carried from the Torrance pattern; client to confirm.
- Service card names with "& Replacement" and the emergency card wording are pending client confirmation, as on Torrance.
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
- "AIRPRO SOLUTIONS can walk you through what your project needs" (permits) is a practice claim carried from the Torrance pattern; client to confirm.
- Nearby row: Torrance, Los Angeles, Carson, Redondo Beach. Carson and Redondo Beach link to their noindex stub pages until real pages exist.
- Port of Long Beach claims removed from /service-areas/los-angeles-county/ (Long Beach card note, the commercial paragraph and the "Port and logistics" chip). The "51,000 local jobs" figure was attributed to the City of Long Beach but comes from a Port-commissioned economic impact study (EDR Group, 2017 data, reported 2019). Re-add only with a current, correctly attributed source. The hub FAQ now notes that Long Beach has its own gas utility (SoCalGas serves most of the region).
- Service card names with "& Replacement" and the emergency card wording are pending client confirmation, as on Torrance and Los Angeles.
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
- "AIRPRO SOLUTIONS can walk you through the steps" (permits) is a practice claim carried from the Torrance pattern; client to confirm.
- Nearby row: Los Angeles, Long Beach, Glendale, Burbank. Glendale and Burbank link to their noindex stub pages until real pages exist. South Pasadena is not routed.
- Service card names with "& Replacement" and the emergency card wording are pending client confirmation, as on the other city pages.
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
- "AIRPRO SOLUTIONS can walk you through the steps" (permits) is a practice claim carried from the Torrance pattern; client to confirm.
- Nearby row: Los Angeles, Long Beach, Pasadena, Torrance. All four have real pages. The research has no neighbor list, so adjacency is not claimed.
- Service card names with "& Replacement" and the emergency card wording are pending client confirmation, as on the other city pages.
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
- El Segundo: currently on the 2022 CA Mechanical Code / Energy Code cycle with local amendments.
  Re-verify if the city moves to the 2025 code cycle.
- Carson and Redondo Beach noise limits: deliberately left without dBA figures (medium-confidence
  planning-document sourcing for Carson). Do not add specific numbers without a stronger source.
- Clean Power Alliance generation: only confirmed for Redondo Beach, Manhattan Beach, and Carson.
  Do not add Hermosa Beach or Hawthorne without a source.
- Housing age, attic/foundation/duct condition, and population figures were intentionally left off
  the South Bay hub. Do not add them without a source.

## /service-areas/orange-county/ (src/content/orange-county.ts)

- Anaheim Public Utilities Home Incentives Program ($200/ton, duct repair, thermostat terms):
  first-come-first-served, no publication date found. Verify current terms before launch.
- SoCalGas 2026 furnace rebate tiers and $75 thermostat rebate: through December 31, 2026 or until
  funds run out. Remove or update in January 2027.
- SCE Smart Energy Program ($75 enrollment + up to $50/yr): re-verify current credit amount before
  launch.
- HEEHRA reservation status: single-family funding fully reserved statewide as of 2026-02-24;
  multifamily reservation window closed 2025-12-18. Re-verify before launch.
- 2025 Energy Code (Title 24) effective date: applies to permits submitted on or after 2026-01-01.
  Re-verify if the compliance date changes.
- No source URLs were found for any of the three Orange County rebate programs, so the rebate
  cards carry no link. Add official source URLs once verified (Anaheim Public Utilities Home
  Incentives Program, SoCalGas 2026 rebates, SCE Smart Energy Program).
- Housing age figures are missing for Anaheim, Huntington Beach, Fullerton, and Tustin - no age
  claim is made for them. Do not add without a source.
- Fullerton ZIP list is unverified (low confidence) and shown as "pending," not a list.
- Gas utility (SoCalGas) is directly confirmed only for Anaheim and assumed for the other seven
  cities. Do not strengthen this to a confirmed claim without a source.
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
  confirmed in the sources reviewed (confirmed only for Riverside, Chino, Fontana). Verify with
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
