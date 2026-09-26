# Air Pro Solutions — Site Build

HVAC company site for Air Pro Solutions, serving LA County, South Bay,
Orange County, and the Inland Empire, CA. Built by Sirius Systems.
Stack: Next.js (App Router, static export) + GitHub + Cloudflare Pages.

## Hard rules (never violate these)

- **No em dashes anywhere in customer-facing copy.** Use hyphens instead.
  This applies to every page, every component, every piece of generated
  content, with no exceptions.
- **Never fabricate business data.** Pricing, stats, review counts, license
  numbers, years-in-business figures — if you don't have a real number,
  flag it explicitly as a placeholder (e.g. a `TODO` comment or a clearly
  marked placeholder value) rather than inventing one.
- **JSON-LD must exactly mirror visible on-page text.** Any schema
  `text`/`description`/`name` field has to match what's rendered on the
  page, word for word. If you edit visible FAQ or answer copy, update the
  matching JSON-LD in the same change.
- **Avoid doorway pages.** Every service+location page, location page, and
  hub page needs genuine differentiation — local housing-stock notes, real
  neighborhood/ZIP detail, audience-specific value props — not a template
  with the city or audience name swapped in. If a page's unique content is
  thin, that's a signal to either enrich it or not build it yet.

## Brand reference

- Domain: airprosolutionsheatingandcooling.com
- Email: contact@airprosolutionsheatingandcooling.com
- Phone: (323) 776-9047
- CA contractor license #: 1126691, 50251 (C-20)
- Google rating: 4.8 stars / 40 reviews
- Logo: blue/orange swirl mark on navy — `public/images/logo-mark.png`

## Design system

- **Display font**: Barlow Condensed (weights 600/700/800) — hero
  headlines, H1s, large statistics, short feature-card titles ("AC
  Repair", "Same-Day Service"), section headings when short.
- **Body/UI font**: Manrope (weights 400/500/600/700/800) — nav, buttons,
  all body copy, FAQs (questions and answers), form labels, tables,
  footer labels, location-page local content, trust badges/microcopy.
- **Color tokens**: navy scale `#071638 / #0c2456 / #123670 / #1a478c`,
  sky `#2ba9e0 / #5cc4ee`, amber `#f0791f / #d1620f / #fdece0`, neutrals
  (paper `#f6f7f9`, ink `#0e1a2b`, ink-soft `#4c5a6c`, line `#dbe0e7`).
  Full light/dark mode: base tokens on `:root`, dark overrides under both
  `@media (prefers-color-scheme: dark)` and `[data-theme="dark"]`.
- **Photo placeholders**: until real photography exists, use the
  established pattern — gradient tile (navy gradient + amber/sky radial
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
every URL. Max 3 path levels. City slugs always end in `-ca`.

| Page type | Pattern | Example |
|---|---|---|
| Home | `/` | `/` |
| Services hub | `/services/` | `/services/` |
| Service | `/[service]/` | `/ac-repair/` |
| Service areas hub | `/service-areas/` | `/service-areas/` |
| Region hub | `/service-areas/[region]/` | `/service-areas/south-bay/` |
| City | `/service-areas/[city]-ca/` | `/service-areas/torrance-ca/` |
| Service + city (matrix) | `/[service]/[city]-ca/` | `/ac-repair/torrance-ca/` |
| Audience | `/[audience]-hvac/` | `/commercial-hvac/` |
| Audience + service | `/[audience]-hvac/[service]/` | `/commercial-hvac/ac-repair/` |
| Blog | `/blog/[topic-slug]/` | `/blog/ac-sizing-inland-empire-heat/` |

- Matrix pages nest under the service so each service page is the hub for its city children. City
  pages stay flat under /service-areas/ so reassigning a region never breaks a URL.
- One primary keyword per URL: city page "hvac [city]", matrix page "[service] [city]".
- Regions (4): los-angeles-county, south-bay, orange-county, inland-empire. South Bay is carved out
  of LA County so the hubs never compete for the same cities.
- Services (10) and audiences (6, confirm with client) live in src/content/services.ts and audiences.ts.
- Do NOT build residential-hvac + service combos (duplicate of service pages).
- **Matrix quality gate:** a service+city page needs at least 3-4 elements genuinely specific to that
  city (climate/sizing, local utility rebate, permit/Title 24 notes, housing-stock fit, local
  reviews/job photos, neighborhood/response-time detail). Thin pages are held, not shipped. Published
  pairs are listed in src/content/matrix.ts.
- Title patterns (~60 chars): matrix `AC Repair in Torrance, CA | Same-Day Service | Air Pro Solutions`,
  city `HVAC Services in Torrance, CA | Air Pro Solutions` (helpers in src/lib/seo.ts).

- Core pages (Wave 1 stubs): /about/, /contact/, /reviews/, /financing/, /maintenance-plan/, /faq/, /careers/, /privacy/, /terms/, /accessibility/, /thank-you/ (noindex, not in sitemap) and the 404 (not-found.tsx). Privacy/Terms must carry the TCPA/SMS consent language the forms link to.
- Reviews, financing and maintenance-plan depend on open client inputs (real reviews, financing partner, license details). Keep them as "content coming" stubs until supplied.

## Content data shape

Structured content lives in `src/content/`, not hardcoded in page files:

- `site-config.ts` — brand constants (name, domain, contact, licenses,
  rating)
- `services.ts` — per-service: slug, name, icon, description, symptoms,
  process steps, repair-vs-replace criteria, related service slugs
- `regions.ts` — the 4 regions, each with its city list
- `cities.ts` — per-city: region, neighborhoods, ZIP codes, local
  housing-stock/climate notes used in the "local knowledge" module

Adding a new city or service should mostly be a data-file change plus
page-level copy for anything that needs genuine local/service nuance —
not a new component.

## Reference

Six page templates were prototyped as Claude artifacts before this repo
existed (homepage, AC Repair service page, Torrance location page, AC
Repair × Torrance, Commercial HVAC hub, Residential HVAC hub). Ask for
their content when translating a page type into a component if the
source isn't already in this repo.

## Scaffold notes

- Static export: every dynamic route needs generateStaticParams. Entries named placeholder-* (and the placeholder matrix pairs) exist only so the export builds. Replace or remove before launch.
- /[service]/ is dynamic at the top level; static folders (services, service-areas, blog, *-hvac) take precedence.
- Only /commercial-hvac/[service]/ exists so far; copy it under other non-residential audiences when needed.
