---
title: Primary Keyword Selection - Air Pro Solutions
description: How to identify and validate the primary keyword for any Air Pro Solutions page. Read before assigning title/description/H1 copy (see "Metadata & H1 Rules" for the formulas those feed into).
---

# Primary Keyword Selection

Companion to **"Metadata & H1 Rules - Air Pro Solutions"** (`docs/metadata-rules.md`), which assumes a primary keyword already exists per page. This doc is how that keyword gets chosen and validated in the first place.

## Definition

> A primary keyword is the single search query concept a specific URL is designed to satisfy - aligned with user intent, page content, the page's conversion action, and the business outcome the page exists for.

It is **not**:
- The highest-volume phrase in a keyword tool
- Every related variation crammed onto the page
- A phrase chosen because a competitor ranks for it
- A phrase that belongs to a different page already in the taxonomy
- A collection of 3-5 keywords stacked into one title tag

**One page = one primary intent = one primary keyword concept.** This is the same rule already stated in `CLAUDE.md` ("one primary keyword per URL"); this doc is how you arrive at it, not a new rule on top of it.

## Two tracks

Not every page needs the full workflow below. Which track applies depends on whether the URL taxonomy already fixes the page's job.

**Track A - Structural pages** (service, city, matrix, region, audience, audience+service): the page's job is already fixed by its slot in `CLAUDE.md`'s page-architecture table. The primary keyword is mechanically derived from the service/city/audience name - see the Page-Type Matrix below. Still run Step 4 (SERP check) and Step 6 (cannibalization check) before publishing, but Steps 1-3 and 5 are usually a formality because the taxonomy already did that work.

**Track B - Opportunity-driven pages** (pillar pages, comparison/cost pages, blog/supporting content): there's no slug to derive from, so the full workflow below runs for real, feeding into the `seo-automation-pipeline` skill (seed keywords -> Keyword Planner CSV -> `cluster-keywords.mjs` -> `score-opportunities.mjs` -> `opportunities.json` -> `selected-opportunity.json`). The scorecard in Step 5 below is the same logic that pipeline's scoring script applies mechanically - use it by hand only when the pipeline hasn't been run for a given topic yet.

## The selection workflow

### Step 1: Define the page's business job

One sentence, before looking at any keyword tool:

```
This page exists to generate AC repair calls from Torrance homeowners,
businesses, and property managers.
```

If you can't write that sentence, you don't have a page yet - you have a URL.

### Step 2: Classify the dominant search intent

| Intent | What the searcher wants | Air Pro page type |
|---|---|---|
| Emergency/urgent | Immediate help with a broken system | AC repair, emergency-hvac |
| Transactional | Book or request a service | Installation, maintenance, service+city |
| Local commercial | Find a nearby provider | City pages, region hubs, service+city |
| Commercial B2B | Find a contractor for property/business ops | Commercial-hvac, audience, audience+service |
| Informational | Understand a problem, cost, or process | Blog/resource |
| Navigational | Find the company or a branded destination | Home, contact, reviews |
| Comparison/evaluation | Decide between repair vs. replace, systems, vendors | Comparison/cost pages |

Example: `ac repair torrance` reads as local + transactional + high urgency potential -> service+city page, primary keyword `ac repair torrance`. Compare `hvac company torrance`, which reads as broad provider-selection with no service specificity -> that's the **city page**'s keyword (`hvac services torrance`), not the AC-repair page's. Two different pages, two different jobs - don't let one page's copy answer both queries.

### Step 3: Build the keyword cluster

For the candidate page, list one core phrase, 5-15 close variants, and supporting concepts (symptoms, problems, related services). Example for AC repair + Torrance:

```
Candidate primary:    ac repair torrance
Close variants:       air conditioning repair torrance, torrance ac repair,
                       ac repair torrance ca, hvac repair torrance
Supporting concepts:  ac blowing warm air, weak airflow, refrigerant leak,
                       capacitor failure, condensate drain clog, South Bay HVAC
```

Classify each: does it match this page's intent, does this URL fit it better than another planned page, and is it high/medium/low conversion value? Phrases that fit a *different* page (e.g. `ac replacement torrance`) go there, not here.

### Step 4: Check the SERP before committing

Search the exact candidate phrase and look at what actually ranks:
- Are results local service pages, city pages, directories, or informational articles?
- Is there a local pack / map results?
- Do People Also Ask questions suggest a different angle than planned?
- Do the top-ranking pages resemble the page you intend to build?

**Rule:** if the ranking pages don't resemble the page you're building, don't make that phrase the primary keyword for it. `ac repair cost los angeles` reads as pricing/informational-commercial - that's a cost-guide page, not the core AC-repair service page, even though the words overlap.

### Step 5: Score the candidates

Weighted scorecard, 1-5 per factor:

| Factor | Weight | Measures |
|---|---:|---|
| Intent fit | 30% | Does the phrase match the exact need this page solves? |
| Page fit | 20% | Can this URL satisfy the query better than any other planned page? |
| Conversion value | 20% | Likely to produce a call, booking, or estimate? |
| Local/service relevance | 10% | Fits Air Pro's actual service geography and offering? |
| Demand evidence | 10% | Keyword tools, GSC, Bing, PAA, or competitor visibility suggest real demand? |
| Ranking opportunity | 10% | Can Air Pro credibly compete with a differentiated, locally-proofed page? |

`score = intent×0.30 + pageFit×0.20 + conversion×0.20 + localRelevance×0.10 + demand×0.10 + opportunity×0.10`

Do this by hand for Track B pages without pipeline data yet; for Track A pages it's rarely needed since the taxonomy already forces high intent/page-fit scores.

### Step 6: Check for cannibalization

Before assigning a keyword, confirm no other URL already targets the same query concept. Warning signs:
- Two URLs share a primary keyword
- A city page and its service+city children use near-identical titles/H1s
- The same internal-link anchor text points at more than one page for the same query
- A new page starts pulling visibility away from an older, better-converting one

Resolution order: keep the page that best matches intent -> consolidate or redirect the duplicate -> differentiate broad vs. specific pages in title/H1/copy -> fix internal links toward the preferred canonical -> `noindex` a matrix page that can't earn a distinct purpose (ties to the existing matrix quality gate).

## Page-type primary keyword matrix

Using the project's actual URL patterns and content (`src/content/services.ts`, `regions.ts`, `cities.ts`):

| Page | Example URL | Primary keyword |
|---|---|---|
| Home | `/` | `hvac services los angeles` (avoid stuffing every region into it - that's what region hubs are for) |
| Service | `/ac-repair/` | `ac repair los angeles` |
| Service | `/heat-pump-services/` | `heat pump repair los angeles` |
| Region hub | `/service-areas/south-bay/` | `hvac services south bay` |
| Region hub | `/service-areas/orange-county/` | `hvac services orange county` |
| City | `/service-areas/torrance-ca/` | `hvac services torrance` |
| Service + city | `/ac-repair/torrance-ca/` | `ac repair torrance` |
| Service + city | `/heating-repair/irvine-ca/` | `heating repair irvine` |
| Audience hub | `/commercial-hvac/` | `commercial hvac los angeles` |
| Audience + service | `/commercial-hvac/ac-repair/` | `commercial ac repair los angeles` |
| Blog/resource | `/blog/ac-not-cooling/` | `why is my ac running but not cooling` |

## Keyword sources

No single source is sufficient on its own:

| Source | Tells you |
|---|---|
| Google Search Console (post-launch) | Actual queries, clicks, impressions, CTR, position per page - the most authoritative source once there's traffic |
| Bing Webmaster Tools | Bing-side query performance and keyword ideas |
| Google Ads Keyword Planner | Commercial demand direction, geographic patterns (this project's primary pre-launch source via the `seo-automation-pipeline` skill) |
| Google autocomplete / People Also Ask / related searches | Natural phrasing, modifiers, subtopics for FAQs |
| Google Maps / local pack | Local competitive categories and language |
| Competitor pages | Gap and page-type research, never to copy blindly |
| Call logs / CRM (once available) | Real customer phrasing, urgency, equipment language |

## Post-launch: validating with GSC

Once a page has meaningful impressions, GSC becomes the primary validation source, not keyword tools:

1. Performance -> Search Results -> Pages tab -> select the URL -> Queries tab
2. Export query, clicks, impressions, CTR, average position (3-6 month window)
3. Group query variants by intent, not as isolated phrases
4. Compare the actual query cluster against the intended primary keyword
5. Recheck after any title/H1/content revision

Example decision, `/ac-repair/torrance-ca/` (illustrative numbers only, not real data):

| Query cluster | Impressions | CTR | Avg. position | Decision |
|---|---:|---:|---:|---|
| AC repair Torrance | 1,250 | 6.6% | 6.4 | Keep as primary |
| Air conditioning repair Torrance | 880 | 5.9% | 7.1 | Keep as secondary variant |
| AC installation Torrance | 190 | 1.6% | 28.4 | Don't retarget this page - separate page owns that keyword |
| AC not cooling | 260 | 3.1% | 16.2 | Add a troubleshooting section, link to the resource article |

Don't respond to a mixed query cluster by turning the title into a list of all of them. One primary keyword stays the primary keyword; the rest get supporting coverage or their own page.

## Keyword-to-page mapping sheet

Track this per page (fits naturally as fields added to `services.ts` / `cities.ts` / a future `matrix.ts` entry, per Section 9 of the metadata rules doc):

`Page ID · URL · Page type · Business objective · Primary keyword · Primary intent · Secondary keyword cluster · Target geography · Target audience · SERP reviewed (Y/N + date) · Demand source · Competing URL check · Internal-link parent · CTA · Index decision · GSC results (once live)`

## Final checklist before assigning a primary keyword

- Does the phrase describe exactly what the page is for?
- Does it reflect an intent Air Pro can genuinely satisfy?
- Does the current SERP support this page type?
- Does Air Pro actually provide this service in this location?
- Is it distinct from every other page's primary keyword?
- Can title, meta description, H1, intro, and body content cover it naturally (no stuffing)?
- Does it lead to a real CTA and measurable conversion?
- Can it be validated later in GSC/Bing?

Any "no" means the keyword isn't settled yet - don't draft title/description/H1 copy from it until it is.

## Operating rule

> Choose the primary keyword by identifying the page's single highest-value search intent, not the highest-volume phrase. Validate against the live SERP before publishing, check for cannibalization against every other planned URL, and revise the choice using GSC/Bing/conversion data after launch.
