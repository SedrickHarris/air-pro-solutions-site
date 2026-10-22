# AIRPRO SOLUTIONS - Site Build

HVAC company site for AIRPRO SOLUTIONS, serving LA County, South Bay,
Orange County, and the Inland Empire, CA. Built by Sirius Systems.
Stack: Next.js (App Router, static export) + GitHub + Cloudflare Pages.

## Hard rules (never violate these)

- **No em dashes anywhere in customer-facing copy.** Use hyphens instead.
  This applies to every page, every component, every piece of generated
  content, with no exceptions.
- **Never fabricate business data.** Pricing, stats, review counts, license
  numbers, years-in-business figures - if you don't have a real number,
  flag it explicitly as a placeholder (e.g. a `TODO` comment or a clearly
  marked placeholder value) rather than inventing one.
- **JSON-LD must exactly mirror visible on-page text.** Any schema
  `text`/`description`/`name` field has to match what's rendered on the
  page, word for word. If you edit visible FAQ or answer copy, update the
  matching JSON-LD in the same change.
- **Avoid doorway pages.** Every service+location page, location page, and
  hub page needs genuine differentiation - local housing-stock notes, real
  neighborhood/ZIP detail, audience-specific value props - not a template
  with the city or audience name swapped in. If a page's unique content is
  thin, that's a signal to either enrich it or not build it yet.

## Brand reference

- Domain: airprosolutionsheatingandcooling.com
- Email: contact@airprosolutionsheatingandcooling.com
- Phone: (323) 776-9047
- CA contractor license #: 1126691, 50251 (C-20)
- Google rating: 4.8 stars / 40 reviews
- Logo: blue/orange swirl mark on navy - `public/images/brand/logo-mark.webp`

## Approved claims

Client-approved on 2026-10-14. Treat these as verified, not placeholders:

- 24/7 emergency dispatch
- Same-day service (typical, subject to capacity, as currently worded on the site)
- Licensed, bonded & insured (CA license #1126691 and #50251 (C-20))
- 4.8 stars / 40 Google reviews

The exact wording currently on the site is the approved wording. Do not strengthen or paraphrase it (for
example, do not turn "typical, subject to capacity" into a guarantee). Any claim not on this list must be
flagged as a placeholder (TODO comment) and not asserted on the page or in schema.

Note: where these claims may appear in metadata is narrower than on-page copy and is enforced by the gate in
`src/lib/seo.ts` (`ALLOWED_CLAIMS`, `assertNoUnapprovedClaims`). See "Metadata & H1 rules" below for the exact rules.

## Design system

- **Display font**: Barlow Condensed (weights 600/700/800) - hero
  headlines, H1s, large statistics, short feature-card titles ("AC
  Repair", "Heat Pump Services"), section headings when short.
- **Body/UI font**: Manrope (weights 400/500/600/700/800) - nav, buttons,
  all body copy, FAQs (questions and answers), form labels, tables,
  footer labels, location-page local content, trust badges/microcopy.
- **Color tokens**: navy scale `#071638 / #0c2456 / #123670 / #1a478c`,
  sky `#2ba9e0 / #5cc4ee`, amber `#f0791f / #d1620f / #fdece0`, neutrals
  (paper `#f6f7f9`, ink `#0e1a2b`, ink-soft `#4c5a6c`, line `#dbe0e7`).
  Full light/dark mode: base tokens on `:root`, dark overrides under both
  `@media (prefers-color-scheme: dark)` and `[data-theme="dark"]`.
  **Dark is the default theme site-wide:** `<html data-theme="dark">` in `src/app/layout.tsx`, plus `viewport`
  `colorScheme: 'dark'` and `themeColor: '#081020'`. The light tokens and rules stay in `globals.css` so
  `data-theme="light"` still works if light mode is re-enabled later. There is no theme toggle. Keep every dark rule
  in both selector forms; `@media print` restores the light token values so printed pages stay readable.
- **Photo placeholders**: until real photography exists, use the
  established pattern - gradient tile (navy gradient + amber/sky radial
  accent) with a small icon and a "Photo pending" corner tag. Applies to
  service cards, region cards, and related-content cards.
- **FAQ layout**: two-column grid on desktop, single column under 920px.

## Schema conventions

- One canonical entity lives on the homepage:
  `@id: "https://airprosolutionsheatingandcooling.com/#organization"`,
  type `HVACBusiness`, with `logo`, `sameAs`, `hasCredential` (both
  license numbers), and `aggregateRating`.
- Every other page's schema **references** that `@id` via
  `"provider": { "@id": "https://airprosolutionsheatingandcooling.com/#organization" }`
  rather than duplicating the full entity.
- Location and service+location pages use `areaServed: { "@type": "City", ... }`.
  Audience pages use `audience: { "@type": "PeopleAudience" | "BusinessAudience", ... }`.
- Every page with FAQs gets a matching `FAQPage` schema block.
- Every non-homepage page gets a `BreadcrumbList` matching its actual
  breadcrumb trail.

## Page architecture

Rules: lowercase, hyphens only, no stop words, no dates, no brand name in slugs. Trailing slash on
every URL. Max 3 path levels. City slugs are the lowercase hyphenated city name with no `-ca` suffix
(`torrance`, `rancho-cucamonga`). URL structure is locked; the site is not live, so there are no redirects.

| Page type | Pattern | Example |
|---|---|---|
| Home | `/` | `/` |
| Services hub | `/services/` | `/services/` |
| Service | `/services/[service]/` | `/services/ac-repair/` |
| Service areas hub | `/service-areas/` | `/service-areas/` |
| Region hub | `/service-areas/[region]/` | `/service-areas/south-bay/` |
| City | `/service-areas/[city]/` | `/service-areas/torrance/` |
| Service + city (matrix) | `/services/[service]/[city]/` | `/services/ac-repair/torrance/` |
| Audience | `/[audience]-hvac/` | `/commercial-hvac/` |
| Audience + service | `/[audience]-hvac/[service]/` | `/commercial-hvac/ac-repair/` |
| Blog | `/blog/[topic-slug]/` | `/blog/ac-sizing-inland-empire-heat/` |

- Matrix pages nest under the service so each service page is the hub for its city children. City
  pages stay flat under /service-areas/ so reassigning a region never breaks a URL.
- **Reserved top-level slugs** (no service may use these): `services`, `service-areas`, `residential-hvac`,
  `commercial-hvac`, `resources`, `faq`, `careers`, `blog`. Every service, `emergency-hvac` included, lives at
  `/services/[slug]/`. Build every service link with `serviceHref(slug)` from `src/content/services.ts`, never by
  hand (`topLevelServices` there is an empty escape hatch).
- Unchanged top-level pages: `/`, `/residential-hvac/`, `/commercial-hvac/`, `/faq/`, `/careers/`, `/blog/`,
  `/service-areas/`.
- One primary keyword per URL: city page "hvac [city]", matrix page "[service] [city]".
- Regions (4): los-angeles-county, south-bay, orange-county, inland-empire. South Bay is carved out
  of LA County so the hubs never compete for the same cities.
- Services (10) and audiences (6, confirm with client) live in src/content/services.ts and audiences.ts.
- Do NOT build residential-hvac + service combos (duplicate of service pages).
- **Matrix quality gate:** a service+city page needs at least 3-4 elements genuinely specific to that
  city (climate/sizing, local utility rebate, permit/Title 24 notes, housing-stock fit, local
  reviews/job photos, neighborhood/response-time detail). Thin pages are held, not shipped. Published
  pairs are listed in src/content/matrix.ts.

- Core pages (Wave 1 stubs): /about/, /contact/, /reviews/, /financing/, /maintenance-plan/, /faq/, /careers/, /privacy/, /terms/, /accessibility/, /thank-you/ (noindex, not in sitemap) and the 404 (not-found.tsx). Privacy/Terms must carry the TCPA/SMS consent language the forms link to.
- Reviews, financing and maintenance-plan depend on open client inputs (real reviews, financing partner, license details). Keep them as "content coming" stubs until supplied.

## Service page levels (parent/child tree)

- **Level 1:** parent/hub service pages at `/services/[slug]/`. **Level 2:** child service pages, also at
  `/services/[slug]/` (for example `/services/ac-replacement/`), linked from their parent. **Level 3:** commercial pages at
  `/commercial-hvac/<slug>/` (16 stubs in `src/content/commercial.ts`; eight are in the latest tree).
- The tree lives in `serviceTree` in `src/content/services.ts`; each service has `family`, `level`, `parent`
  and `published`. Level 2 and 3 pages build as **noindex stubs** (`published: false`), stay out of the
  sitemap and the contact form, and flip to published only when real copy exists.
- Open decisions (flagged in code): `ac-installation`, `ductwork`, `hvac-*` and `maintenance-plans` are not
  in the tree; `ductwork` vs `ductwork-services` and `maintenance-plans` vs `/maintenance-plan/` overlap;
  eight commercial pages built earlier are not in the tree (`inTree: false`) and four overlap the top-level
  audience pages. Resolve overlaps before publishing so two URLs never target one query.

## Metadata & H1 rules

Full rules and rationale live in `docs/metadata-rules.md` (binding). How to choose and validate each
page's primary keyword (Track A structural pages vs Track B opportunity pages, SERP and cannibalization
checks, per-page-type keyword matrix) lives in `docs/primary-keyword-selection.md`.
Summary: build every page's title/description/H1 from `src/lib/seo.ts`, never hand-write them:

- One primary keyword per URL, present once in title, description, H1, and the opening paragraph.
  H1 is never identical to the title tag (H1 drops the brand suffix and any qualifier).
- Title 45-60 chars (soft max 65), description 140-160 chars (soft max 170), H1 25-75 chars.
- Formulas by page type (builder functions in `src/lib/seo.ts`):
  - Home: `homeTitle()` / `homeH1()` -> `HVAC Services in Los Angeles, CA | AIRPRO SOLUTIONS`
  - Service: `serviceTitle(service)` / `serviceH1(service)` -> `{Service} in Los Angeles | AIRPRO SOLUTIONS`
  - Region hub: `regionTitle(region)` / `regionH1(region)` -> `HVAC Services in {Region} | AIRPRO SOLUTIONS`
  - City: `cityTitle(city)` / `cityH1(city)` -> `HVAC Services in {City}, CA | AIRPRO SOLUTIONS`
  - Matrix (service+city): `matrixTitle(service, city, qualifier?)` / `matrixH1(service, city)` ->
    `{Service} in {City}, CA | AIRPRO SOLUTIONS`. Qualifier (e.g. an availability claim) is optional
    and must pass `assertNoUnapprovedClaims` - drop it before ever truncating service or city.
  - Audience: `audienceTitle(audience)` / `audienceH1(audience)`
  - Audience + service: `audienceServiceTitle(service, audience)` / `audienceServiceH1(...)`
    (commercial-hvac uses `commercialServiceTitle`/`commercialServiceH1` instead)
  - Blog/resource: `articleTitle(question, includeBrand?)` / `articleH1(question)` - brand suffix optional
  - Core/utility (About, Contact, FAQ, Careers, Reviews, Financing, Accessibility, Privacy, Terms):
    `utilityTitle(pagePurpose)` - brand suffix stays on
- Claims in metadata (enforced by `assertNoUnapprovedClaims`, see `ALLOWED_CLAIMS` in `seo.ts`; it throws at
  build time on a violation):
  - **Titles, H1s and the matrix qualifier:** only `licensed` and `4.8-star rated`. `24/7`, `same-day`,
    `same day`, `24/7 emergency dispatch`, `insured` and `bonded` are always blocked, even though the client
    approved them for on-page copy.
  - **Descriptions:** the exact phrase `licensed, bonded & insured` is allowed on any page. `insured` or
    `bonded` on their own stay blocked. `24/7` is allowed only on the homepage (`/`), `/services/` and
    `/services/emergency-hvac/`. The exact phrase `24/7 emergency dispatch` is allowed only on those same three
    pages; a bare `emergency` stays blocked everywhere, including on those pages when it is not part of that exact
    phrase. `same-day` (or `same day`) is allowed only when the same description also contains
    `when capacity allows` or `typical`.
  - **Everything else stays blocked** everywhere: `24 hour`, a bare `emergency` (the two-word service name
    `Emergency HVAC` is exempt), `guaranteed`, `best`, `affordable`, `near me`. Anything not on the approved
    claims list must be flagged as a placeholder and not asserted.
  - Only `assertDescription(description, path)` (called by `base()` in `seo.ts`) knows the page path, so the
    homepage-only `24/7` allowance works through the metadata builders. Calling it without a path blocks `24/7` and the phrase `24/7 emergency dispatch`.
- Matrix pages still need the existing quality gate (3-4 genuinely local elements) on top of
  correct metadata - a unique title/H1 does not substitute for unique local content.
- `assertTitle` / `assertDescription` / `assertH1` in `seo.ts` throw at build time if length or
  claims rules are violated - call them (or rely on `base()`, which already calls the first two)
  before shipping a new page type.

## Content data shape

Structured content lives in `src/content/`, not hardcoded in page files:

- `site-config.ts` - brand constants (name, domain, contact, licenses,
  rating)
- `services.ts` - per-service: slug, name, icon, description, symptoms,
  process steps, repair-vs-replace criteria, related service slugs
- `regions.ts` - the 4 regions, each with its city list
- `cities.ts` - per-city: region, neighborhoods, ZIP codes, local
  housing-stock/climate notes used in the "local knowledge" module

Adding a new city or service should mostly be a data-file change plus
page-level copy for anything that needs genuine local/service nuance -
not a new component.

## City page local-knowledge band: balance check (required)

Every city page's "local knowledge" band is two columns at 920px and wider: `page.localParagraphs` on the left, one
`.nbhd-card` on the right. Long copy with a short card leaves a large empty card. Before a city page is called done,
measure the band at 1280px and make the card end within about 50px of the copy; anything with 250px or more of blank
card must be fixed before launch. Fill it with `page.localCards` (label/value fact cards with a source note) built only
from content already verified in that city's `docs/open-items.md` section - a housing snapshot, a noise table, a code or
permit summary, an attributed fact table. Never add held-out ZIPs, neighborhoods, rebate amounts or code editions, never
invent filler, and never make the card sticky. If nothing verified exists, leave the card short (the grid is top-aligned
globally). Close the local paragraphs with "Official links are in the card for this section." (never "beside this text").
New cards are TODO(copy). Full rules, planning numbers and the measuring snippet: `docs/local-knowledge-balance.md`.

## Reference

Six page templates were prototyped as Claude artifacts before this repo
existed (homepage, AC Repair service page, Torrance location page, AC
Repair × Torrance, Commercial HVAC hub, Residential HVAC hub). Ask for
their content when translating a page type into a component if the
source isn't already in this repo.

## Scaffold notes

- Static export: every dynamic route needs generateStaticParams. Entries named placeholder-* (and the placeholder matrix pairs) exist only so the export builds. Replace or remove before launch.
- /services/[service]/ and /services/[service]/[city]/ are the dynamic service routes (`src/app/services/[service]/`), including emergency-hvac.
- Only /commercial-hvac/[service]/ exists so far; copy it under other non-residential audiences when needed.
