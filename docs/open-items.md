# Open items

Time-sensitive or client-dependent items that need to be re-checked before launch, or on the date
noted. Each item also has a `TODO(data)` or source comment at its actual location in the code -
this file is the index, not the source of truth.

## /service-areas/los-angeles-county/ (src/content/la-county-hub.ts)

- LADWP heat pump rebate amount ("Up to $2,500 per ton"): sourced from an undated utility page.
  Verify the current amount before launch.
- Pasadena Water and Power heat pump rebate amount ("$170 per ton"): sourced from an undated
  utility page. Verify the current amount before launch.

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
