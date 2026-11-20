# Sitemap audit

Audited 2026-11-19 on branch `sitemap-audit` (off `main` at c977e80). Method: `next build` (static export, run directly because `npm run build` stops at `check:form-env` without the form env vars), then every `out/**/index.html`, `out/sitemap.xml`, `out/robots.txt`, `out/_headers` and `out/_redirects` was read. Robots, canonical, title, description and H1 values come from the rendered HTML, not from source. Inbound counts are unique source pages linking to the route in the built HTML. Phase 1 is read-only: nothing in `src/` was changed.

## Summary

- Built routes: **113** (59 indexable, 54 noindex including the 404).
- Current sitemap: **59** URLs. Every URL is absolute, https, unique, has a built page, is indexable and has a canonical equal to its `<loc>`.
- **The sitemap already matches the build exactly.** Indexable routes = sitemap URLs = 59, and the set difference is empty in both directions. There are no missing, wrongly listed, duplicate or trailing-slash-mismatched URLs today.
- The risk is structural, not current: `sitemap.ts` keeps a hand-written path list for core pages, region hubs and audiences, and nothing at build time compares it to what the pages actually emit. A page could go indexable or noindex without the sitemap noticing.
- One assumption in the brief is wrong: `/privacy-policy/` and `/terms-and-conditions/` do not exist on `main` (see table i).
- Another: `sitemap.ts` has no `TODO(data)` about placeholder entries. The placeholder route (`/blog/placeholder-post/`) is noindex and is already excluded (see table j).

| Mismatch | Title | Findings |
|---|---|---|
| a | Indexable and built, missing from sitemap | 0 |
| b | In sitemap but noindex, stub, 404, redirected or off-canonical | 0 (1 false positive, see table b) |
| c | Duplicate sitemap URLs | 0 |
| d | Content-file `published`/`wave` vs `page` block | 0 |
| e | Orphan pages (zero inbound links) | 0 (4 pages are footer-link only, see table e) |
| f | Broken internal links, links to noindex pages | 0 broken, 0 links to noindex pages |
| g | Duplicate titles/descriptions | 0 among indexable pages; 50 noindex stubs share one generic title and description |
| h | Old URL structure | 0 |
| i | Legal routes | 0 mismatches inside the repo; the premise of the brief does not hold (see table) |
| j | Must-stay-out pages | 0 leaks |
| k | New pages since the sitemap was last touched | 0 missing, 59 of 59 present |

Proposed work for Phase 2 is in "Proposed changes" at the end.

## Route inventory

Counts by type: home 1, 404 1, core 7, legal 3, blog 1, placeholder 1, audience 6, commercial sub-page 16, reviews 1, service-areas hub 1, city 32, region 4, services hub 1, service 37, service+city matrix 1.

Columns: robots is the rendered `<meta name="robots">` ("index" means no tag). Canon OK means the canonical equals `https://airprosolutionsheatingandcooling.com` + route. T / D are title and description lengths. In = unique source pages linking to the route in the page body (header and footer stripped) / in all page markup. SM = in current sitemap.

### Indexable routes (59)

| Route | Type | Robots | Canon OK | T | D | H1 | In (body / all) | SM |
|---|---|---|---|---|---|---|---|---|
| / | home | index | yes | 51 | 159 | 1 | 63 / 112 | yes |
| /accessibility/ | legal | index | yes | 42 | 139 | 1 | 0 / 112 | yes |
| /careers/ | core | index | yes | 54 | 145 | 1 | 0 / 112 | yes |
| /commercial-hvac/ | audience | index | yes | 58 | 155 | 1 | 51 / 112 | yes |
| /contact/ | core | index | yes | 54 | 149 | 1 | 112 / 112 | yes |
| /faq/ | core | index | yes | 45 | 140 | 1 | 0 / 112 | yes |
| /privacy/ | legal | index | yes | 33 | 129 | 1 | 3 / 112 | yes |
| /residential-hvac/ | audience | index | yes | 59 | 156 | 1 | 27 / 112 | yes |
| /reviews/ | reviews | index | yes | 35 | 117 | 1 | 1 / 112 | yes |
| /service-areas/ | service-areas hub | index | yes | 60 | 160 | 1 | 42 / 112 | yes |
| /service-areas/anaheim/ | city | index | yes | 47 | 152 | 1 | 10 / 112 | yes |
| /service-areas/burbank/ | city | index | yes | 47 | 154 | 1 | 8 / 8 | yes |
| /service-areas/carson/ | city | index | yes | 46 | 154 | 1 | 8 / 8 | yes |
| /service-areas/chino/ | city | index | yes | 45 | 146 | 1 | 7 / 7 | yes |
| /service-areas/corona/ | city | index | yes | 46 | 150 | 1 | 10 / 10 | yes |
| /service-areas/costa-mesa/ | city | index | yes | 50 | 152 | 1 | 12 / 12 | yes |
| /service-areas/culver-city/ | city | index | yes | 51 | 151 | 1 | 10 / 10 | yes |
| /service-areas/eastvale/ | city | index | yes | 48 | 154 | 1 | 7 / 7 | yes |
| /service-areas/el-segundo/ | city | index | yes | 50 | 151 | 1 | 10 / 10 | yes |
| /service-areas/fontana/ | city | index | yes | 47 | 156 | 1 | 8 / 8 | yes |
| /service-areas/fullerton/ | city | index | yes | 49 | 144 | 1 | 5 / 5 | yes |
| /service-areas/gardena/ | city | index | yes | 47 | 160 | 1 | 9 / 9 | yes |
| /service-areas/glendale/ | city | index | yes | 48 | 151 | 1 | 8 / 8 | yes |
| /service-areas/hawthorne/ | city | index | yes | 49 | 150 | 1 | 6 / 6 | yes |
| /service-areas/hermosa-beach/ | city | index | yes | 53 | 150 | 1 | 6 / 6 | yes |
| /service-areas/huntington-beach/ | city | index | yes | 56 | 153 | 1 | 10 / 10 | yes |
| /service-areas/inglewood/ | city | index | yes | 49 | 148 | 1 | 8 / 8 | yes |
| /service-areas/inland-empire/ | region | index | yes | 49 | 155 | 1 | 24 / 24 | yes |
| /service-areas/irvine/ | city | index | yes | 46 | 155 | 1 | 11 / 112 | yes |
| /service-areas/long-beach/ | city | index | yes | 50 | 144 | 1 | 8 / 112 | yes |
| /service-areas/los-angeles-county/ | region | index | yes | 54 | 152 | 1 | 24 / 24 | yes |
| /service-areas/los-angeles/ | city | index | yes | 55 | 153 | 1 | 14 / 112 | yes |
| /service-areas/manhattan-beach/ | city | index | yes | 55 | 154 | 1 | 8 / 8 | yes |
| /service-areas/newport-beach/ | city | index | yes | 53 | 160 | 1 | 5 / 5 | yes |
| /service-areas/ontario/ | city | index | yes | 47 | 142 | 1 | 11 / 112 | yes |
| /service-areas/orange-county/ | region | index | yes | 49 | 151 | 1 | 24 / 24 | yes |
| /service-areas/pasadena/ | city | index | yes | 48 | 159 | 1 | 9 / 9 | yes |
| /service-areas/rancho-cucamonga/ | city | index | yes | 56 | 152 | 1 | 9 / 9 | yes |
| /service-areas/redondo-beach/ | city | index | yes | 53 | 157 | 1 | 13 / 112 | yes |
| /service-areas/riverside/ | city | index | yes | 49 | 145 | 1 | 10 / 112 | yes |
| /service-areas/santa-ana/ | city | index | yes | 49 | 159 | 1 | 7 / 7 | yes |
| /service-areas/santa-monica/ | city | index | yes | 52 | 158 | 1 | 8 / 8 | yes |
| /service-areas/south-bay/ | region | index | yes | 49 | 157 | 1 | 25 / 25 | yes |
| /service-areas/torrance/ | city | index | yes | 48 | 154 | 1 | 16 / 112 | yes |
| /service-areas/tustin/ | city | index | yes | 46 | 142 | 1 | 6 / 6 | yes |
| /service-areas/upland/ | city | index | yes | 46 | 157 | 1 | 6 / 6 | yes |
| /services/ | services hub | index | yes | 55 | 160 | 1 | 16 / 112 | yes |
| /services/ac-installation/ | service | index | yes | 49 | 145 | 1 | 51 / 112 | yes |
| /services/ac-maintenance/ | service | index | yes | 48 | 151 | 1 | 48 / 112 | yes |
| /services/ac-repair/ | service | index | yes | 51 | 152 | 1 | 53 / 112 | yes |
| /services/ac-repair/torrance/ | service+city matrix | index | yes | 55 | 147 | 1 | 3 / 3 | yes |
| /services/ductless-mini-split/ | service | index | yes | 53 | 154 | 1 | 46 / 112 | yes |
| /services/ductwork/ | service | index | yes | 51 | 150 | 1 | 49 / 112 | yes |
| /services/emergency-hvac/ | service | index | yes | 55 | 146 | 1 | 46 / 112 | yes |
| /services/furnace-installation/ | service | index | yes | 54 | 149 | 1 | 42 / 112 | yes |
| /services/heat-pump-services/ | service | index | yes | 52 | 148 | 1 | 52 / 112 | yes |
| /services/heating-repair/ | service | index | yes | 48 | 156 | 1 | 50 / 112 | yes |
| /services/indoor-air-quality/ | service | index | yes | 52 | 157 | 1 | 45 / 112 | yes |
| /terms/ | legal | index | yes | 39 | 148 | 1 | 2 / 112 | yes |

### Noindex routes (54)

All 54 render a noindex robots tag (the 404 renders `noindex`, the rest `noindex, nofollow`), have one H1 each, and none is in the sitemap. 50 carry the site default title "AIRPRO SOLUTIONS" (16 chars), default description (66 chars) and no canonical tag. The other four (/about/, /financing/, /maintenance-plan/, /thank-you/) have their own titles; the first three also have a self-referencing canonical. Noindex pages are exempt from the title/description length gate in `docs/metadata-rules.md` section 8, which applies to pages "marked `index`".

| Route | Type | In (body / all) | SM |
|---|---|---|---|
| /404/ | 404 | 0 / 0 | no |
| /about/ | core | 0 / 0 | no |
| /blog/ | blog | 0 / 0 | no |
| /blog/placeholder-post/ | placeholder | 0 / 0 | no |
| /commercial-hvac/apartment-communities/ | commercial sub-page | 0 / 0 | no |
| /commercial-hvac/diagnostics/ | commercial sub-page | 0 / 0 | no |
| /commercial-hvac/hoa-hvac-services/ | commercial sub-page | 0 / 0 | no |
| /commercial-hvac/installation/ | commercial sub-page | 0 / 0 | no |
| /commercial-hvac/maintenance-agreements/ | commercial sub-page | 0 / 0 | no |
| /commercial-hvac/maintenance/ | commercial sub-page | 0 / 0 | no |
| /commercial-hvac/multifamily-properties/ | commercial sub-page | 0 / 0 | no |
| /commercial-hvac/office-buildings/ | commercial sub-page | 0 / 0 | no |
| /commercial-hvac/property-managers/ | commercial sub-page | 0 / 0 | no |
| /commercial-hvac/repair/ | commercial sub-page | 0 / 0 | no |
| /commercial-hvac/replacement/ | commercial sub-page | 0 / 0 | no |
| /commercial-hvac/restaurants/ | commercial sub-page | 0 / 0 | no |
| /commercial-hvac/retail-businesses/ | commercial sub-page | 0 / 0 | no |
| /commercial-hvac/retrofits/ | commercial sub-page | 0 / 0 | no |
| /commercial-hvac/rooftop-unit-service/ | commercial sub-page | 0 / 0 | no |
| /commercial-hvac/warehouses/ | commercial sub-page | 0 / 0 | no |
| /financing/ | core | 0 / 0 | no |
| /maintenance-plan/ | core | 0 / 0 | no |
| /multifamily-hvac/ | audience | 0 / 0 | no |
| /office-building-hvac/ | audience | 0 / 0 | no |
| /property-management-hvac/ | audience | 0 / 0 | no |
| /restaurant-hvac/ | audience | 0 / 0 | no |
| /services/ac-replacement/ | service | 0 / 0 | no |
| /services/air-filtration-systems/ | service | 0 / 0 | no |
| /services/air-purifier-installation/ | service | 0 / 0 | no |
| /services/duct-installation/ | service | 0 / 0 | no |
| /services/duct-repair/ | service | 0 / 0 | no |
| /services/duct-replacement/ | service | 0 / 0 | no |
| /services/duct-sealing/ | service | 0 / 0 | no |
| /services/ductless-mini-split-installation/ | service | 0 / 0 | no |
| /services/ductless-mini-split-maintenance/ | service | 0 / 0 | no |
| /services/ductless-mini-split-repair/ | service | 0 / 0 | no |
| /services/ductless-mini-split-replacement/ | service | 0 / 0 | no |
| /services/ductwork-services/ | service | 0 / 0 | no |
| /services/furnace-repair/ | service | 0 / 0 | no |
| /services/furnace-replacement/ | service | 0 / 0 | no |
| /services/heat-pump-installation/ | service | 0 / 0 | no |
| /services/heat-pump-maintenance/ | service | 0 / 0 | no |
| /services/heat-pump-repair/ | service | 0 / 0 | no |
| /services/heat-pump-replacement/ | service | 0 / 0 | no |
| /services/heating-installation/ | service | 0 / 0 | no |
| /services/heating-maintenance/ | service | 0 / 0 | no |
| /services/hvac-installation/ | service | 0 / 0 | no |
| /services/hvac-maintenance/ | service | 0 / 0 | no |
| /services/hvac-repair/ | service | 0 / 0 | no |
| /services/hvac-replacement/ | service | 0 / 0 | no |
| /services/maintenance-plans/ | service | 0 / 0 | no |
| /services/ventilation-services/ | service | 0 / 0 | no |
| /services/whole-home-air-purification/ | service | 0 / 0 | no |
| /thank-you/ | core | 0 / 0 | no |

## a. Indexable and built, missing from the sitemap

None. All 59 indexable routes are in the sitemap.

## b. In the sitemap but noindex, stub, 404, redirected or off-canonical

| URL | Issue | Verdict |
|---|---|---|
| /service-areas/carson/ | Text scan flagged "in progress" | False positive. The phrase is in real copy about a Carson development ("Phase 2 ... is shown as in progress"). Page is indexable with a self-canonical. |

Checked for all 59 sitemap URLs: built page exists (59/59), robots is index (59/59), canonical equals `<loc>` (59/59). `_redirects` holds only five `/images/...` 301s, so no page route is redirected. `_headers` sets no `X-Robots-Tag`.

## c. Duplicate URLs in the sitemap

None. 59 `<loc>` values, 59 unique. Every one ends in `/`, which matches `trailingSlash: true` and the canonicals. No slug appears with and without a trailing slash.

## d. Content-file entries with `published` or `wave` but no `page` block, and the reverse

| File | Entries | published/wave set, no page | page set, not published |
|---|---|---|---|
| cities.ts | 32 | 0 (all 32 have `page`; wave 1 = 16, wave 2 = 16) | 0 |
| services.ts | 37 | 0 (10 published, all 10 have `page`) | 0 |
| commercial.ts | 16 | 0 (no `page` field; all 16 `published: false`, none in sitemap) | n/a |
| matrix.ts | 1 | n/a (ac-repair/torrance, has content in matrix-content.ts) | n/a |
| audiences.ts | 6 | `builtAudiences` = residential-hvac, commercial-hvac | the other four are hard-coded noindex page files |

Note: `wave` no longer affects the sitemap (see docs/open-items.md, 2026-10-19). It only means launch priority.

## e. Orphan pages (indexable, zero inbound internal links)

No orphans. The lowest in-body counts among indexable pages:

| Route | In (body / all) | Note |
|---|---|---|
| /accessibility/ | 0 / 112 | Linked only from the footer (every page). Not an orphan, but no contextual link. |
| /careers/ | 0 / 112 | Linked only from the footer (every page). Not an orphan, but no contextual link. |
| /faq/ | 0 / 112 | Linked only from the footer (every page). Not an orphan, but no contextual link. |
| /reviews/ | 1 / 112 | One contextual link plus the footer. |
| /services/ac-repair/torrance/ | 3 / 3 | Lowest matrix count (only one matrix page exists). |

Next lowest city pages are fullerton and newport-beach (5 / 5). `/reviews/` is linked from the footer and one body link. Inbound counts for /reviews/ and non-city pages come from this audit script; `report:inbound-links` still only covers city pages (extension proposed below).

## f. Broken internal links and links to noindex pages

| Check | Result |
|---|---|
| Internal `href`s that resolve to no built page or file | 0 |
| Links to noindex routes from page bodies | 0 |
| Links to noindex routes from header/footer | 0 |
| Links to /commercial-hvac/ sub-pages | 0 (all 16 are noindex stubs and nothing links to them) |

## g. Duplicate or near-duplicate titles and descriptions

| Scope | Result |
|---|---|
| 59 indexable pages, exact duplicate titles | 0 |
| 59 indexable pages, exact duplicate descriptions | 0 |
| Shared 30-char title prefix / 60-char description prefix | 0 / 0 |
| Indexable title length | 33-60 (gate 20-70), all pass |
| Indexable description length | 117-160 (gate 70-180), all pass |
| H1 count, all 113 routes | exactly 1 each |
| 50 noindex stubs | share the site default title "AIRPRO SOLUTIONS" and default description. Harmless while noindex; each needs real metadata before it is published. |

## h. URL structure consistency

Every service route is `/services/<slug>/` (37 routes incl. level 2 stubs), the matrix route is `/services/ac-repair/torrance/`, cities are flat under `/service-areas/`, and `topLevelServices` is empty. No route lives at an old top-level service URL, and no sitemap path uses one. `serviceHref()` builds all service paths in `sitemap.ts`.

## i. Legal pages

| Route | Built | Indexable | In sitemap | Footer link | Other links |
|---|---|---|---|---|---|
| /privacy/ | yes | yes | yes | yes | ContactForm, all pages (118 links in built HTML) |
| /terms/ | yes | yes | yes | yes | ContactForm, all pages (115 links in built HTML) |
| /accessibility/ | yes | yes | yes | yes | |
| /privacy-policy/ | **no** | n/a | no | no | none |
| /terms-and-conditions/ | **no** | n/a | no | no | none |

`/privacy-policy/` and `/terms-and-conditions/` are not built, not in `_redirects`, and not referenced anywhere in `src/`, `docs/`, `audit/`, `scripts/` or `public/`. The branches `privacy-policy-page` and `terms-and-conditions-page` are fully merged into `main`; they only carry those names, and the routes they shipped are `/privacy/` and `/terms/` (matching CLAUDE.md, which lists `/privacy/` and `/terms/`). So the sitemap and footer are consistent with what exists, and there are no duplicates, 404s or redirects to clean up. **Decision for you:** keep `/privacy/` and `/terms/` (recommended, nothing to change), or rename and add 301s, which would also touch the contact form links and the TCPA text that points to them.

## j. Pages that must stay out of the sitemap

| Route | Robots | In sitemap |
|---|---|---|
| /thank-you/ | noindex, nofollow | no |
| /blog/ | noindex, nofollow | no |
| /blog/placeholder-post/ | noindex, nofollow | no |
| /404/ | noindex | no |
| /about/ | noindex, nofollow | no |
| /financing/ | noindex, nofollow | no |
| /maintenance-plan/ | noindex, nofollow | no |

`/blog/` is noindex (no real posts). `/blog/placeholder-post/` comes from `posts = [{ slug: 'placeholder-post' }]` in `src/app/blog/[slug]/page.tsx` and is noindex. It is excluded because the sitemap never reads blog data, not because of an explicit rule, so a future real blog list would need a decision.

## k. Pages new since the sitemap was last touched

| Group | Built | Indexable | In sitemap |
|---|---|---|---|
| /reviews/ | 1 | 1 | 1 |
| City pages (all 32, including the 15 you named: torrance, los-angeles, long-beach, pasadena, culver-city, redondo-beach, el-segundo, gardena, irvine, anaheim, costa-mesa, huntington-beach, riverside, chino, fontana) | 32 | 32 | 32 |
| Published service pages (10) | 10 | 10 | 10 |
| Level 2 service stubs | 27 | 0 | 0 |
| Service + city matrix | 1 | 1 | 1 |
| /commercial-hvac/ and /residential-hvac/ | 2 | 2 | 2 |
| Region hubs | 4 | 4 | 4 |
| /services/ and /service-areas/ hubs | 2 | 2 | 2 |

## Robots and sitemap file checks

| Check | Result |
|---|---|
| `robots.txt` | `User-Agent: *`, `Allow: /`, `Sitemap: https://airprosolutionsheatingandcooling.com/sitemap.xml`. Blocks nothing, so no indexable page is blocked. |
| Noindex via header | None. `_headers` has no `X-Robots-Tag`. |
| Indexable pages with a noindex meta tag | 0 |
| Noindex pages in the sitemap | 0 |
| `sitemap.xml` `<loc>` values | 59, all absolute, https, unique, equal to the page canonical, each with a built `index.html` |
| `<lastmod>` | Not emitted. |

## Proposed changes (Phase 2, awaiting your go-ahead)

Because the current sitemap is already correct, the **URL set will not change: 59 before, 59 after, nothing added or removed.** The work is to make that guarantee structural.

1. **`src/app/sitemap.ts`**: replace the hand-written list with one registry. Add a small `corePages` list (path + `indexable` flag) for home, hubs, region hubs, contact, faq, reviews, careers, privacy, terms, accessibility, about, financing, maintenance-plan, thank-you, blog and the four unbuilt audiences. The sitemap emits `indexable` entries; cities, services, matrix and commercial stay content-file filters (`c.page`, `s.published && s.page`, `matrixPages`, `p.published`). Flipping a core page to indexable becomes a one-field change.
2. **Keep page metadata where it is.** The core and audience page files hard-code their own robots, and I will not rewrite them (out of scope and risks copy/metadata churn). The new check (below) fails if a registry flag disagrees with the built robots tag, so drift cannot ship silently.
3. **`npm run check:sitemap`** (`scripts/check-sitemap.mjs`, run against `out/`, added to the `build` chain after `next build`): fails when an indexable built route is not in the sitemap; a sitemap URL is noindex, has no built page, is redirected in `_redirects`, or has a canonical that differs from its `<loc>`; a sitemap URL is duplicated, relative, not https, or lacks a trailing slash.
4. **`lastModified`**: leave off. A reliable per-page date needs a page-to-source-file map, and all 32 cities live in one `cities.ts`, so git dates would be identical for every city and misleading. The brief says not to use build dates.
5. **`report:inbound-links`**: extend to cover every indexable route, including /reviews/ and non-city pages (report only, never fails). Say if you would rather I leave that script alone.
6. **`docs/open-items.md`**: append the items under "Not fixed".

## Not fixed (reported only)

- 50 noindex stubs share the default title and description. Needs real metadata before any is published.
- /careers/, /faq/ and /accessibility/ have no contextual in-body link, only the footer. /reviews/ has one.
- The hand-coded noindex robots in core and audience page files will not be unified with the new registry (check script guards it instead).
- `/blog/placeholder-post/` is a build placeholder in `generateStaticParams`; remove or replace before launch (already noted in CLAUDE.md scaffold notes).
- Open client decisions still in docs/open-items.md: /about/, /financing/ and /maintenance-plan/ stay noindex until content is supplied; audience and commercial overlaps.

## Things to confirm

- Keep `/privacy/` and `/terms/` as the legal URLs? (The brief assumed `/privacy-policy/` and `/terms-and-conditions/`.)
- OK to skip `lastModified`?
- OK to extend `report:inbound-links` in the check-script commit?
