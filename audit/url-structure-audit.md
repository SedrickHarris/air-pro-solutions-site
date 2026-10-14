# URL Structure Audit - AIRPRO SOLUTIONS

Audit date: 2026-10-14. Method: read-only. Source read from the repo, then `npm run build` run into `out/` and every generated HTML file parsed. No files outside `./audit/` were changed (the build rewrites `out/` and `.next/`, which are build artifacts).

Conventions audited against: the proposed target in the audit brief. Where the repo documents a different, deliberate pattern (CLAUDE.md "Page architecture"), that is stated, and the divergence is raised as a decision in section 7.

## Status after migration and fixes (2026-10-14)

**URLs in this report are superseded.** The findings below were written against the old flat structure (`/ac-repair/`, `/ac-repair/torrance-ca/`, `/service-areas/torrance-ca/`). The site now uses `/services/<service>/`, `/services/<service>/<city>/` and `/service-areas/<city>/`, including `/services/emergency-hvac/`. The old-to-new mapping is in `audit/url-migration-map.md`. No redirects exist because the site is not live.

| Finding | Status | Notes |
|---|---|---|
| 2.1, 2.2 URL pattern and `-ca` city slugs | Resolved | Locked structure applied and documented in CLAUDE.md. |
| 6.1 `/services/` JSON-LD descriptions | **Partly resolved** | Emergency Service schema now uses the visible banner sentence; Ductless Mini-Split has no descriptive visible sentence on the page so its schema description was removed. The `24/7` wording is gone from the Service entries. **Still open:** the visible page itself says "24/7 emergency dispatch" (trust strip) and "24/7 dispatch ... for emergencies" (FAQ answer, mirrored in FAQPage schema), plus "same-day" and "bonded & insured" copy. Needs a client decision. |
| 3.2 Torrance matrix page orphan | Resolved | Linked from `/services/ac-repair/` ("AC repair in Torrance") and `/service-areas/torrance/`. |
| 3.4 `/careers/` orphan | Resolved | Linked from the footer. |
| 3.5 `/services/emergency-hvac/` not linked from `/services/` | Resolved | "Emergency HVAC Details" button added to the `#emergency` banner. Also linked from both audience hubs. |
| 3.6 services missing from Residential hub | Resolved for Residential | Furnace Installation, Ductwork and Indoor Air Quality cards added. Commercial hub omissions left as-is (decision). |
| 4.4 commercial stubs without H1 | Resolved | All 16 now render an H1 using the stub pattern. |
| 6.4 core pages without schema or breadcrumbs | Resolved | Nine core pages have BreadcrumbList plus WebPage/AboutPage/ContactPage schema; `/faq/` now references the organization by `@id`. |
| 8.x doorway overlap on stubs | Open (noindex) | No change; stubs stay noindex. |

Still open, unchanged: `/resources/` not built (2.x hub list); overlapping stub slugs (2.5); stub canonicals and generic stub titles (4.2, 4.3); title, description and H1 length rules on 13 pages (4.6); sitemap has no `lastmod` (5.3); whether the Torrance matrix page stays in the sitemap before launch (5.4); low body-link counts on legal and about pages (3.7); `/404/` serving behavior (UNKNOWN).

## 1. Executive summary

- Pages built: **114 HTML files** in `out/` (113 pages plus `404.html`). **31 are indexable** and listed in the sitemap (sitemap has 31 URLs). **82 are noindex stubs** that are not in the sitemap.
- Trailing-slash convention actually used: **trailing slash everywhere** (`trailingSlash: true`). Sitemap, canonicals, og:url, internal links and schema URLs all agree. Zero internal links missing the slash, zero absolute links to the production domain, zero broken internal links across all 113 pages.
- The biggest structural finding: **the site does not follow the proposed target URL pattern.** Services live at `/<service>/` (for example `/ac-repair/`), not `/services/<service>/`. The matrix page is `/ac-repair/torrance-ca/`, not `/services/ac-repair/torrance/`. This is the documented architecture in CLAUDE.md, so it is a decision, not a bug (section 7, Q1).
- `/resources/` is **not built**. Everything else in the planned hub list is built.
- One hard-rule problem: the `/services/` page JSON-LD contains a `24/7 dispatch` Service description that is not visible on the page and is a blocked claim. See finding 6.1.

| Severity | Count | What |
|---|---|---|
| Critical | 1 | JSON-LD text on `/services/` not mirrored on page and carries a blocked claim (24/7) |
| High | 3 | Target URL pattern not followed (decision); `/resources/` not built; matrix page `/ac-repair/torrance-ca/` has 0 inbound links but is in the sitemap |
| Medium | 8 | Core pages have no JSON-LD or breadcrumbs; `/careers/` orphan; `/emergency-hvac/` not linked from `/services/`; three service pages not linked from the Residential hub; 13 indexable pages outside title, description or H1 length rules; overlapping stub slugs; 16 commercial stubs have no H1; Torrance matrix page in sitemap before it is launch-ready |
| Low | 7 | 82 noindex stubs have no canonical; stub titles and descriptions identical; city-slug `-ca` vs target; thin inbound links on legal pages; stub doorway overlap (noindex, so no live risk); no sitemap `lastmod`; no `_redirects` or `_headers` |

## 2. Route inventory

### 2.1 Config and build facts (Step 1)

- `next.config.mjs`: `output: 'export'`, `trailingSlash: true`, no `basePath`, `images: { unoptimized: true }`. No `redirects`, `rewrites` or `headers` (these are not supported by `output: export`).
- `public/` contains only `favicon.ico` and `images/`. **No `_redirects`, no `_headers`, no `robots.txt`, no `sitemap.xml` as static files.** `robots.txt` and `sitemap.xml` are generated from `src/app/robots.ts` and `src/app/sitemap.ts` and are present in `out/`.
- `out/robots.txt`: `User-Agent: *`, `Allow: /`, `Sitemap: https://airprosolutionsheatingandcooling.com/sitemap.xml`. Correct absolute URL, nothing blocked.
- Dynamic routes and their `generateStaticParams` sources:
  - `src/app/[service]/page.tsx` <- `services` in `src/content/services.ts` (every service in the tree, published or not; unpublished build as noindex stubs).
  - `src/app/[service]/[city]/page.tsx` <- `matrixPages` in `src/content/matrix.ts` (1 pair: `ac-repair` + `torrance-ca`).
  - `src/app/service-areas/[city]/page.tsx` <- `cities` in `src/content/cities.ts` (32 cities; only Torrance has a content block).
  - `src/app/commercial-hvac/[page]/page.tsx` <- `commercialPages` in `src/content/commercial.ts` (16 stubs, all unpublished).
  - `src/app/blog/[slug]/page.tsx` <- `posts` (1 placeholder: `placeholder-post`).
- Source routes vs emitted routes: every route above resolved to an `index.html`. No mismatch found. `out/404.html` and `out/404/index.html` are both emitted.

### 2.2 Indexable pages (in sitemap)

| URL | Source file | Page type | Status | Inbound links (all / body only) |
|---|---|---|---|---|
| `/` | `src/app/page.tsx` | Home | Built | 112 / 23 |
| `/about/` | `src/app/about/page.tsx` | Core page | Built | 112 / 0 |
| `/ac-installation/` | `src/app/[service]/page.tsx` | Service | Built | 112 / 14 |
| `/ac-maintenance/` | `src/app/[service]/page.tsx` | Service | Built | 15 / 15 |
| `/ac-repair/` | `src/app/[service]/page.tsx` | Service | Built | 112 / 18 |
| `/ac-repair/torrance-ca/` | `src/app/[service]/[city]/page.tsx` | Service + city (matrix) | Built | 0 / 0 |
| `/accessibility/` | `src/app/accessibility/page.tsx` | Core page | Built | 112 / 0 |
| `/careers/` | `src/app/careers/page.tsx` | Core page | Built | 0 / 0 |
| `/commercial-hvac/` | `src/app/commercial-hvac/page.tsx` | Audience hub | Built | 112 / 19 |
| `/contact/` | `src/app/contact/page.tsx` | Core page | Built | 112 / 112 |
| `/ductless-mini-split/` | `src/app/[service]/page.tsx` | Service | Built | 112 / 12 |
| `/ductwork/` | `src/app/[service]/page.tsx` | Service | Built | 9 / 9 |
| `/emergency-hvac/` | `src/app/[service]/page.tsx` | Service | Built | 10 / 10 |
| `/faq/` | `src/app/faq/page.tsx` | Core page | Built | 112 / 0 |
| `/financing/` | `src/app/financing/page.tsx` | Core page | Built | 112 / 2 |
| `/furnace-installation/` | `src/app/[service]/page.tsx` | Service | Built | 4 / 4 |
| `/heat-pump-services/` | `src/app/[service]/page.tsx` | Service | Built | 17 / 17 |
| `/heating-repair/` | `src/app/[service]/page.tsx` | Service | Built | 112 / 13 |
| `/indoor-air-quality/` | `src/app/[service]/page.tsx` | Service | Built | 10 / 10 |
| `/maintenance-plan/` | `src/app/maintenance-plan/page.tsx` | Core page | Built | 6 / 6 |
| `/privacy/` | `src/app/privacy/page.tsx` | Core page | Built | 112 / 1 |
| `/residential-hvac/` | `src/app/residential-hvac/page.tsx` | Audience hub | Built | 112 / 17 |
| `/reviews/` | `src/app/reviews/page.tsx` | Core page | Built | 112 / 15 |
| `/service-areas/` | `src/app/service-areas/page.tsx` | Service areas hub | Built | 112 / 9 |
| `/service-areas/inland-empire/` | `src/app/service-areas/inland-empire/page.tsx` | Region hub | Built | 15 / 15 |
| `/service-areas/los-angeles-county/` | `src/app/service-areas/los-angeles-county/page.tsx` | Region hub | Built | 15 / 15 |
| `/service-areas/orange-county/` | `src/app/service-areas/orange-county/page.tsx` | Region hub | Built | 15 / 15 |
| `/service-areas/south-bay/` | `src/app/service-areas/south-bay/page.tsx` | Region hub | Built | 16 / 16 |
| `/service-areas/torrance-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Built | 4 / 4 |
| `/services/` | `src/app/services/page.tsx` | Services hub | Built | 112 / 16 |
| `/terms/` | `src/app/terms/page.tsx` | Core page | Built | 112 / 0 |

### 2.3 noindex stubs (not in sitemap)

Counts by type: 404 (utility): 1; Service: 27; Blog index (stub): 1; Blog post (placeholder): 1; Commercial level 3: 16; Audience hub (stub): 4; City: 31; Utility (noindex): 1.

| URL | Source file | Page type | Status | Inbound links (all / body only) |
|---|---|---|---|---|
| `/404/` | `src/app/not-found.tsx` | 404 (utility) | Stub, noindex | 0 / 0 |
| `/ac-replacement/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 0 / 0 |
| `/air-filtration-systems/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 0 / 0 |
| `/air-purifier-installation/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 0 / 0 |
| `/blog/` | `src/app/blog/page.tsx` | Blog index (stub) | Stub, noindex | 0 / 0 |
| `/blog/placeholder-post/` | `src/app/blog/[slug]/page.tsx` | Blog post (placeholder) | Stub, noindex | 0 / 0 |
| `/commercial-hvac/apartment-communities/` | `src/app/commercial-hvac/[page]/page.tsx` | Commercial level 3 | Stub, noindex | 0 / 0 |
| `/commercial-hvac/diagnostics/` | `src/app/commercial-hvac/[page]/page.tsx` | Commercial level 3 | Stub, noindex | 0 / 0 |
| `/commercial-hvac/hoa-hvac-services/` | `src/app/commercial-hvac/[page]/page.tsx` | Commercial level 3 | Stub, noindex | 0 / 0 |
| `/commercial-hvac/installation/` | `src/app/commercial-hvac/[page]/page.tsx` | Commercial level 3 | Stub, noindex | 0 / 0 |
| `/commercial-hvac/maintenance-agreements/` | `src/app/commercial-hvac/[page]/page.tsx` | Commercial level 3 | Stub, noindex | 0 / 0 |
| `/commercial-hvac/maintenance/` | `src/app/commercial-hvac/[page]/page.tsx` | Commercial level 3 | Stub, noindex | 0 / 0 |
| `/commercial-hvac/multifamily-properties/` | `src/app/commercial-hvac/[page]/page.tsx` | Commercial level 3 | Stub, noindex | 0 / 0 |
| `/commercial-hvac/office-buildings/` | `src/app/commercial-hvac/[page]/page.tsx` | Commercial level 3 | Stub, noindex | 0 / 0 |
| `/commercial-hvac/property-managers/` | `src/app/commercial-hvac/[page]/page.tsx` | Commercial level 3 | Stub, noindex | 0 / 0 |
| `/commercial-hvac/repair/` | `src/app/commercial-hvac/[page]/page.tsx` | Commercial level 3 | Stub, noindex | 0 / 0 |
| `/commercial-hvac/replacement/` | `src/app/commercial-hvac/[page]/page.tsx` | Commercial level 3 | Stub, noindex | 0 / 0 |
| `/commercial-hvac/restaurants/` | `src/app/commercial-hvac/[page]/page.tsx` | Commercial level 3 | Stub, noindex | 0 / 0 |
| `/commercial-hvac/retail-businesses/` | `src/app/commercial-hvac/[page]/page.tsx` | Commercial level 3 | Stub, noindex | 0 / 0 |
| `/commercial-hvac/retrofits/` | `src/app/commercial-hvac/[page]/page.tsx` | Commercial level 3 | Stub, noindex | 0 / 0 |
| `/commercial-hvac/rooftop-unit-service/` | `src/app/commercial-hvac/[page]/page.tsx` | Commercial level 3 | Stub, noindex | 0 / 0 |
| `/commercial-hvac/warehouses/` | `src/app/commercial-hvac/[page]/page.tsx` | Commercial level 3 | Stub, noindex | 0 / 0 |
| `/duct-installation/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 0 / 0 |
| `/duct-repair/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 1 / 1 |
| `/duct-replacement/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 0 / 0 |
| `/duct-sealing/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 0 / 0 |
| `/ductless-mini-split-installation/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 0 / 0 |
| `/ductless-mini-split-maintenance/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 0 / 0 |
| `/ductless-mini-split-repair/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 1 / 1 |
| `/ductless-mini-split-replacement/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 0 / 0 |
| `/ductwork-services/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 0 / 0 |
| `/furnace-repair/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 0 / 0 |
| `/furnace-replacement/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 0 / 0 |
| `/heat-pump-installation/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 0 / 0 |
| `/heat-pump-maintenance/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 0 / 0 |
| `/heat-pump-repair/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 1 / 1 |
| `/heat-pump-replacement/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 0 / 0 |
| `/heating-installation/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 0 / 0 |
| `/heating-maintenance/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 0 / 0 |
| `/hvac-installation/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 0 / 0 |
| `/hvac-maintenance/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 0 / 0 |
| `/hvac-repair/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 0 / 0 |
| `/hvac-replacement/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 0 / 0 |
| `/maintenance-plans/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 0 / 0 |
| `/multifamily-hvac/` | `src/app/multifamily-hvac/page.tsx` | Audience hub (stub) | Stub, noindex | 1 / 1 |
| `/office-building-hvac/` | `src/app/office-building-hvac/page.tsx` | Audience hub (stub) | Stub, noindex | 1 / 1 |
| `/property-management-hvac/` | `src/app/property-management-hvac/page.tsx` | Audience hub (stub) | Stub, noindex | 0 / 0 |
| `/restaurant-hvac/` | `src/app/restaurant-hvac/page.tsx` | Audience hub (stub) | Stub, noindex | 1 / 1 |
| `/service-areas/anaheim-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/burbank-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/carson-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 1 / 1 |
| `/service-areas/chino-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/corona-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/costa-mesa-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/culver-city-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/eastvale-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/el-segundo-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/fontana-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/fullerton-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/gardena-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 1 / 1 |
| `/service-areas/glendale-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/hawthorne-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/hermosa-beach-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/huntington-beach-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/inglewood-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/irvine-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/long-beach-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/los-angeles-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/manhattan-beach-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 1 / 1 |
| `/service-areas/newport-beach-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/ontario-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/pasadena-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/rancho-cucamonga-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/redondo-beach-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 1 / 1 |
| `/service-areas/riverside-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/santa-ana-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/santa-monica-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/tustin-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/service-areas/upland-ca/` | `src/app/service-areas/[city]/page.tsx` | City | Stub, noindex | 0 / 0 |
| `/thank-you/` | `src/app/thank-you/page.tsx` | Utility (noindex) | Stub, noindex | 0 / 0 |
| `/ventilation-services/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 0 / 0 |
| `/whole-home-air-purification/` | `src/app/[service]/page.tsx` | Service | Stub, noindex | 0 / 0 |

## 3. Findings by step

### Step 2 - Convention checks

| ID | Severity | Finding | Affected | Fix |
|---|---|---|---|---|
| 2.1 | High | Service pages are at `/<service>/`, not under `/services/`. Matrix page is `/ac-repair/torrance-ca/` (flat service + `-ca` city), not `/services/ac-repair/torrance/`. | All 10 built services: `/ac-repair/`, `/ac-installation/`, `/ac-maintenance/`, `/heating-repair/`, `/furnace-installation/`, `/heat-pump-services/`, `/ductwork/`, `/indoor-air-quality/`, `/ductless-mini-split/`, `/emergency-hvac/`; `/ac-repair/torrance-ca/`. Files: `src/app/[service]/page.tsx`, `src/app/[service]/[city]/page.tsx` | Decision needed (Q1). If the target wins, move the routes under `src/app/services/` and add the 301 map in section 6. If CLAUDE.md wins, update the target list. |
| 2.2 | Low | City slugs end in `-ca` (`torrance-ca`), target examples show `torrance`. CLAUDE.md says city slugs always end in `-ca`. | `/service-areas/torrance-ca/`, `/ac-repair/torrance-ca/` | Part of Q1. |
| 2.3 | Info | Slugs: all 113 URLs are lowercase, hyphen-separated, no underscores, no extensions, no double hyphens. Depth: max 3 segments (none deeper). Trailing slash consistent. | none | none |
| 2.4 | Info | Reserved-path collisions: no built service slug equals `residential-hvac`, `commercial-hvac`, `service-areas`, `resources` or `services`. Static folders take precedence over `[service]`. | none | Keep `/resources/` reserved when built. |
| 2.5 | Medium | Overlapping or alternate slugs exist as noindex stubs, so two URLs could end up targeting one query if published: `/ductwork/` vs `/ductwork-services/`, `/maintenance-plan/` vs `/maintenance-plans/`, `/hvac-repair/` `/hvac-installation/` `/hvac-maintenance/` `/hvac-replacement/` vs the `ac-*` and `heating-*` pages, and four audience-level pages vs commercial children. No duplicate-content pair is indexable today. | stubs listed in 2.3 | Resolve before publishing any of them (already flagged in CLAUDE.md). |
| 2.6 | Info | Same content in two URL patterns: not found. No page is reachable at both `/ac-repair/` and `/services/ac-repair/` (the second does not exist). | none | none |

Planned hubs, built or not:

| Hub | URL | Status | In header nav | In footer |
|---|---|---|---|---|
| Services index | `/services/` | Built | Yes | No |
| Service areas hub | `/service-areas/` | Built | Yes | Yes |
| LA County hub | `/service-areas/los-angeles-county/` | Built | No | No |
| South Bay hub | `/service-areas/south-bay/` | Built | No | No |
| Orange County hub | `/service-areas/orange-county/` | Built | No | No |
| Inland Empire hub | `/service-areas/inland-empire/` | Built | No | No |
| Residential hub | `/residential-hvac/` | Built | Yes | Yes |
| Commercial hub | `/commercial-hvac/` | Built | Yes | Yes |
| Resources hub | `/resources/` | **Not built** | n/a | n/a |

The four region hubs are reachable only through `/service-areas/` (they are not in the header or footer). `/blog/` exists as a noindex stub and is the closest thing to a resources hub; it is not at `/resources/`.

### Step 3 - Internal link integrity

| ID | Severity | Finding | Affected | Fix |
|---|---|---|---|---|
| 3.1 | Info | Broken internal links: **0**. Missing or extra trailing slash: **0**. Absolute links to the production domain: **0**. Links to redirected URLs: none (no redirects exist). | all | none |
| 3.2 | High | `/ac-repair/torrance-ca/` has **0 inbound links**. It is in the sitemap but nothing links to it: `/ac-repair/` does not link to its city child, and `/service-areas/torrance-ca/` does not link to it. | `/ac-repair/torrance-ca/` | Add a "Serving Torrance" link on `/ac-repair/` and a "AC repair in Torrance" link on `/service-areas/torrance-ca/`. |
| 3.3 | Pass | The matrix page links up to its parent service (`/ac-repair/`) and its parent city (`/service-areas/torrance-ca/`). | `/ac-repair/torrance-ca/` | none |
| 3.4 | Medium | `/careers/` is an orphan: 0 inbound links from anywhere, including header and footer. | `/careers/` | Add to footer, or leave unlinked on purpose until real content exists. |
| 3.5 | Medium | `/emergency-hvac/` is not linked from the body of `/services/` (it is linked from the Residential and Commercial hubs). The `/services/` page shows an emergency callout whose link did not resolve to `/emergency-hvac/` in the built HTML. | `/services/` | Add an `/emergency-hvac/` card or link on `/services/`. UNKNOWN - needs verification of what the callout button targets. |
| 3.6 | Medium | Service pages not linked from the Residential hub: `/furnace-installation/`, `/ductwork/`, `/indoor-air-quality/`. Not linked from the Commercial hub: `/heating-repair/`, `/furnace-installation/`, `/ductwork/`, `/indoor-air-quality/`, `/ductless-mini-split/` (acceptable for commercial if those are residential-only; decision). | see left | Confirm which services each audience hub should list. |
| 3.7 | Low | Pages with fewer than 3 inbound links counting body content only (header and footer excluded): `/about/` 0, `/accessibility/` 0, `/faq/` 0, `/terms/` 0, `/privacy/` 1, `/financing/` 2, `/careers/` 0, `/ac-repair/torrance-ca/` 0. All except `/careers/` and the matrix page are linked from the sitewide footer, so they have 112 inbound links in total. | see left | Acceptable for legal pages. Add contextual links from `/contact/` or `/services/` to `/about/`, `/faq/`, `/financing/`. |
| 3.8 | Info | Every one of the 10 services is linked from `/services/` except `/emergency-hvac/` (see 3.5). | | |

Service page link coverage (body links, header and footer excluded):

| Service | From /services/ | From /residential-hvac/ | From /commercial-hvac/ |
|---|---|---|---|
| `/ac-repair/` | Yes | Yes | Yes |
| `/ac-installation/` | Yes | Yes | Yes |
| `/ac-maintenance/` | Yes | Yes | Yes |
| `/heating-repair/` | Yes | Yes | **No** |
| `/furnace-installation/` | Yes | **No** | **No** |
| `/heat-pump-services/` | Yes | Yes | Yes |
| `/ductwork/` | Yes | **No** | **No** |
| `/indoor-air-quality/` | Yes | **No** | **No** |
| `/ductless-mini-split/` | Yes | Yes | **No** |
| `/emergency-hvac/` | **No** | Yes | Yes |

### Step 4 - SEO signals per URL

| ID | Severity | Finding | Affected | Fix |
|---|---|---|---|---|
| 4.1 | Pass | All 31 indexable pages: canonical equals the page's own absolute URL (https, correct host, trailing slash). og:url equals the canonical. Exactly one H1. No duplicate titles, descriptions or H1s among indexable pages. | | |
| 4.2 | Low | All 82 noindex stubs have **no canonical tag** and no og:url. Intended for stubs, but add a canonical when each is published. | stubs in 2.3 | Add canonical in the publish step. |
| 4.3 | Low | Every stub shares one title (`AIRPRO SOLUTIONS`) and one description (`AIRPRO SOLUTIONS provides HVAC service across Southern California.`). Harmless while noindex. | stubs | Replace with `src/lib/seo.ts` builders when published. |
| 4.4 | Medium | The 16 `/commercial-hvac/<slug>/` stubs render **no H1**. | `/commercial-hvac/apartment-communities/` and 15 more | Add an H1 before publishing. |
| 4.5 | Pass | No noindex page appears in the sitemap. No indexable page is missing from the sitemap. No sitemap URL 404s. | | |
| 4.6 | Medium | Length rules from CLAUDE.md (title 45-60 soft max 65, description 140-160 soft max 170, H1 25-75) not met on 13 indexable pages, mostly short core pages. See table below. | see below | Use `utilityTitle()` and review H1s and descriptions. |

Indexable pages outside the length rules (title / description / H1 character counts):

| URL | Title | Description | H1 |
|---|---|---|---|
| `/about/` | **27** | 156 | **22** |
| `/ac-repair/` | **43** | 152 | 48 |
| `/ac-repair/torrance-ca/` | **44** | 147 | 26 |
| `/accessibility/` | **42** | **139** | **23** |
| `/careers/` | **26** | **129** | **13** |
| `/contact/` | **29** | **122** | **24** |
| `/faq/` | **27** | 140 | **8** |
| `/financing/` | **33** | 146 | **14** |
| `/` | 51 | 163 | **82** |
| `/maintenance-plan/` | **40** | 143 | **21** |
| `/privacy/` | **33** | **131** | **14** |
| `/reviews/` | **35** | **135** | **16** |
| `/terms/` | **35** | 145 | **16** |

Full per-page table (title, description, canonical, H1, robots, og:url, JSON-LD) for all 113 pages is in `audit/seo-per-page.csv`.

### Step 5 - Sitemap and robots

| ID | Severity | Finding |
|---|---|---|
| 5.1 | Pass | Sitemap has 31 URLs, all `https://airprosolutionsheatingandcooling.com` with a trailing slash. All 31 map to a built page. All 31 indexable pages are listed. |
| 5.2 | Pass | `robots.txt` references `https://airprosolutionsheatingandcooling.com/sitemap.xml` and blocks nothing. |
| 5.3 | Low | Sitemap entries have no `lastmod`. Optional. |
| 5.4 | Medium | `/ac-repair/torrance-ca/` is in the sitemap while its own source comment says it is not launch-ready (missing rebate, Title 24 notes, real review). See `src/content/matrix.ts`. Decide whether to keep it listed. |

### Step 6 - Breadcrumbs and schema URL consistency

| ID | Severity | Finding | Affected | Fix |
|---|---|---|---|---|
| 6.1 | **Critical** | `/services/` JSON-LD `ItemList` contains Service entries whose `description` is not rendered on the page. The Emergency HVAC entry reads "24/7 dispatch for no-cool and no-heat emergencies that can't wait for a scheduled appointment." `24/7` is a blocked claim. The Ductless Mini-Split entry ("Ductless mini-split installation and service for additions, garages, and homes without central ductwork.") also is not visible verbatim. Source: `description` fields in `src/content/services.ts` lines 915 and 1005. | `/services/` | Either render the same text on the cards or change the schema to the visible card copy. Remove the 24/7 wording until the client confirms it. |
| 6.2 | Pass | Breadcrumb JSON-LD names and URLs mirror the visible breadcrumb on all 21 pages that have both. Visible trail matches the URL hierarchy (for example `/ac-repair/torrance-ca/`: Home > Services > AC Repair > Torrance). | | |
| 6.3 | Pass | Organization entity is defined only on `/` (`@id` `https://airprosolutionsheatingandcooling.com/#organization`, type `HVACBusiness`). 20 other indexable pages with JSON-LD reference it by `@id` only. |  | |
| 6.4 | Medium | Nine indexable core pages have **no JSON-LD at all** and **no breadcrumb** (visible or schema): `/about/`, `/accessibility/`, `/careers/`, `/contact/`, `/financing/`, `/maintenance-plan/`, `/privacy/`, `/reviews/`, `/terms/`. `/faq/` has FAQPage and breadcrumb schema but no organization reference. CLAUDE.md requires a BreadcrumbList on every non-homepage page. | those pages | Add `breadcrumbSchema` plus visible `Breadcrumbs`; reference the organization by `@id` where a provider applies. |
| 6.5 | Pass | JSON-LD `url` values that differ from the page canonical were found only inside the `/services/` ItemList, where each item correctly points at its own service page. Not an error. | | |
| 6.6 | Pass | FAQ question and answer text in JSON-LD matches visible text on every page with FAQPage. Service descriptions on the region hubs and `/service-areas/` match visible text. (An initial mismatch from HTML whitespace was a parsing artifact and was ruled out by whitespace-insensitive comparison.) | | |
| 6.7 | Pass | No em dashes in any rendered HTML or JSON-LD across all pages. | | |

### Step 8 - Doorway-page check (structure level)

| ID | Severity | Finding |
|---|---|---|
| 8.1 | Info | Only **one** service + city page exists (`/ac-repair/torrance-ca/`, about 1,173 words of body text), so there is no pair to compare. The matrix quality gate is unchanged. |
| 8.2 | Low | City pages: 32 built, 31 are stubs. All 465 stub-to-stub pairs are above 70% identical (they share one placeholder template). They are noindex, so no live doorway risk. Do not flip any to indexable without real local content. |
| 8.3 | Low | Commercial level 3: 16 stubs, all 120 pairs above 70% identical. Same conclusion. |
| 8.4 | Pass | Indexable service pages: highest pairwise 5-word-shingle overlap is 50%, below the 70% line. (Measured on rendered body text with header, footer and breadcrumb removed.) |

## 4. Missing planned pages checklist

- [x] `/services/` built
- [x] `/service-areas/` built
- [x] `/service-areas/los-angeles-county/` built
- [x] `/service-areas/south-bay/` built
- [x] `/service-areas/orange-county/` built
- [x] `/service-areas/inland-empire/` built
- [x] `/residential-hvac/` built
- [x] `/commercial-hvac/` built
- [ ] **`/resources/` not built** (a noindex `/blog/` stub exists)
- [ ] Service + city pages: 1 of the planned matrix built (`/ac-repair/torrance-ca/`)
- [ ] 31 of 32 city pages are stubs (only `/service-areas/torrance-ca/` has content)
- [ ] Level 2 service pages and 16 commercial level 3 pages are stubs

## 5. Orphan and low-link pages

Indexable pages with zero inbound links from any page: `/ac-repair/torrance-ca/`, `/careers/`.

Indexable pages with fewer than 3 inbound body links (header and footer excluded): `/about/` (0), `/accessibility/` (0), `/careers/` (0), `/faq/` (0), `/terms/` (0), `/privacy/` (1), `/financing/` (2), `/ac-repair/torrance-ca/` (0).

noindex stubs with zero inbound links: 72 of 82 (expected for unpublished pages; the full list is in section 2.3 where the inbound column is 0 / 0).

## 6. Proposed redirect map (PROPOSAL ONLY - not written to `public/`)

Only needed if the team adopts the target pattern (Q1). It would apply to the 10 built service pages and the 1 matrix page. Level 2 stubs are noindex and need no redirect. Format is Cloudflare Pages `_redirects`.

```
/ac-repair/  /services/ac-repair/  301
/ac-installation/  /services/ac-installation/  301
/ac-maintenance/  /services/ac-maintenance/  301
/heating-repair/  /services/heating-repair/  301
/furnace-installation/  /services/furnace-installation/  301
/heat-pump-services/  /services/heat-pump-services/  301
/ductwork/  /services/ductwork/  301
/indoor-air-quality/  /services/indoor-air-quality/  301
/ductless-mini-split/  /services/ductless-mini-split/  301
/emergency-hvac/  /services/emergency-hvac/  301
/ac-repair/torrance-ca/  /services/ac-repair/torrance/  301
```

If adopted, these would also need: the route move, updated canonicals, sitemap, breadcrumbs, JSON-LD URLs and every internal link, and the `-ca` city-slug decision (the matrix target drops `-ca`, while `/service-areas/torrance-ca/` would need its own decision).

## 7. Open questions that need a human decision

1. **Which URL pattern wins?** The audit brief proposes `/services/<service>/` and `/services/<service>/<city>/`. CLAUDE.md documents flat `/<service>/` and `/<service>/<city>-ca/` as binding. They cannot both be right. Moving later costs more once pages are indexed, so decide before launch.
2. Should city slugs keep `-ca`? CLAUDE.md says yes; the brief's examples say no.
3. Is `/resources/` the intended home of the blog, or should `/blog/` stay? Today `/blog/` is a noindex stub.
4. Should `/ac-repair/torrance-ca/` stay in the sitemap before the missing local elements (rebate, Title 24 notes, real review) are supplied?
5. Which services should each audience hub list (finding 3.6)? Is the omission of furnace, ductwork and air quality from Residential intentional?
6. Does the client approve the `24/7` and `same-day` wording? Until then it must come out of the `/services/` JSON-LD and the visible emergency callout copy.
7. Should the core pages (About, Contact, Financing, and others) get Breadcrumb and Organization schema now, or only when they leave "content coming" status?
8. How should Cloudflare Pages serve `/404/`? The site emits both `404.html` and `404/index.html`. UNKNOWN - needs verification of the live behavior and whether `/404/` returns 200.
