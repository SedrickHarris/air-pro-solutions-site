---
title: Metadata & H1 Rules - Air Pro Solutions
description: The project's binding rules for title tags, meta descriptions, and H1s across every page type. Read before building or reviewing any new page.
---

# Metadata & H1 Rules

Governs `src/lib/seo.ts`, every `metadata` export in `src/app/`, and every `PageHeader` H1. Supersedes ad hoc copy on existing stub pages (About, Careers, FAQ, etc.) - those get brought into line as they're rewritten from stubs.

## 1. Non-negotiable rules

| Rule | Standard |
|---|---|
| Search intent | Every indexable URL targets exactly one primary intent / one primary query cluster. Never co-equal targets ("ac repair Torrance" + "furnace repair Torrance" + "HVAC company Torrance" on one page). |
| Title tag | Exactly one unique title per canonical URL. No duplicates across the site. |
| Meta description | Exactly one unique description per canonical URL. No duplicates. |
| H1 | Exactly one visible, semantic `<h1>` per page. Never hidden, never a styled `<div>`/`<p>`. |
| H1 ≠ title tag | They reinforce each other but are not identical strings. Title carries the brand suffix and any qualifier; H1 stays on-page voice and normally drops the brand name. |
| Canonical | Every indexable page self-references its canonical URL. |
| Primary keyword placement | The page's primary keyword (or a natural close variant, same intent) appears once, naturally, in: title, meta description, H1, and the opening paragraph. Never robotic exact-match stuffing - see Section 4. How the keyword itself gets chosen lives in the companion doc **"Primary Keyword Selection"** (`docs/primary-keyword-selection.md`) - this doc assumes it's already settled. |
| Brand suffix | `\| Air Pro Solutions` is used selectively (Section 5), not appended to every title by default. |
| Geographic wording | City/region modifiers only on pages genuinely about that location. Don't force every region into the homepage title. |
| Claims | No "24/7," "same-day," "licensed," "best," "affordable," "near me," financing, warranties, or service-area claim unless it is factual and on the approved claims list (Section 6). This extends the existing no-fabrication hard rule to metadata specifically. |
| Matrix uniqueness | City/service-city pages must not be pure city-name token substitution. Each needs at least one genuinely local, unique content element (this is the existing matrix quality gate - Section 7 ties it to metadata specifically). |
| Publication gate | A page is not indexed until title, description, H1, canonical, schema, and the content-quality fields below pass validation (Section 8). |

## 2. Character and formatting rules

**Title tag**
- Preferred length: 45-60 characters; soft max ~65 / ~600px.
- Primary topic in the first 40-50 characters.
- Separator: `|` - one style site-wide, matches existing `matrixTitle`/`cityTitle` helpers.
- Title Case; no ALL CAPS except recognized acronyms (HVAC, AC, IAQ).
- No CTA language ("Call Now") - that space belongs to topic + location + distinction.
- Numbers only if specific and verifiable.
- If a formula overruns budget (long service name + city + qualifier + brand), drop the optional qualifier segment first, then the brand suffix - never truncate the service or city.

**Meta description**
- Preferred length: 140-160 characters; soft max 170, critical meaning in the first 140-150.
- Structure: service/topic + audience/location + differentiator + soft CTA ("Schedule service," "Request an estimate").
- Primary keyword once, near the start.
- No quotation marks, no emoji, no verbatim repeat of the title.
- Must describe *this exact URL's* content, not the whole business.

**H1**
- 25-75 characters.
- Location modifier required on city and service+city pages (and must also appear in the first paragraph - already a stated W2 rule).
- Brand name normally excluded (exception: About/Contact/homepage, where the page genuinely is about the brand).
- Followed by a logical H2/H3 hierarchy - headings are never chosen for visual size; that's CSS's job.

## 3. Page-type formulas

Mapped to the URL patterns already defined in `CLAUDE.md`.

| Page type | Title | Meta description pattern | H1 |
|---|---|---|---|
| Home (`/`) | `HVAC Services in Los Angeles, CA \| Air Pro Solutions` | What we do + the 4-region footprint + trust signal (4.8 stars, license). Don't cram all 4 regions into the *title* - that's what the body/region hub links are for. | `HVAC Repair, Installation & Maintenance in Los Angeles` |
| Service (`/[service]/`) | `{Service} in Los Angeles \| Air Pro Solutions` | `Get {service, lowercase} for homes and businesses across Los Angeles and Southern California. {Specific problem solved}. {CTA}.` | `{Service} in Los Angeles and Southern California` |
| Region hub (`/service-areas/[region]/`) | `HVAC Services in {Region} \| Air Pro Solutions` | Residential + commercial scope + region name + "explore cities served." | `HVAC Services in {Region}` |
| City (`/service-areas/[city]-ca/`) | `HVAC Services in {City}, CA \| Air Pro Solutions` *(already set in seo.ts)* | Residential + commercial scope + city name + CTA. | `HVAC Services in {City}, CA` - city name must also open the first paragraph. |
| Service + city / matrix (`/[service]/[city]-ca/`) | `{Service} in {City}, CA \| Air Pro Solutions` (qualifier segment, e.g. a confirmed availability claim, only if it survives the claims list and the character budget) | `Need {service, lowercase} in {City}? Air Pro Solutions helps {audience/context} with {problem/outcome}. {CTA}.` | `{Service} in {City}, CA` - most important template to get right; see Section 7 for the anti-duplication requirement. |
| Audience hub (`/[audience]-hvac/`) | `HVAC Services for {Audience} \| Air Pro Solutions` | Audience pain point + service breadth + CTA. | `HVAC Services for {Audience}` |
| Audience + service (`/[audience]-hvac/[service]/`) | `{Service} for {Audience} \| Air Pro Solutions` (or `Commercial {Service} in Los Angeles \| Air Pro Solutions` for the commercial-hvac case specifically) | Audience + service + differentiator + CTA. | `{Service} for {Audience}` |
| Emergency (`/emergency-hvac/`) | `{Factual urgency phrasing} HVAC Repair in Los Angeles \| Air Pro Solutions` - never "24/7" or "Emergency" unless that's a confirmed, always-available service. Default to "Urgent HVAC Repair" or "Fast HVAC Repair" until confirmed. | Same caution - describe what's actually offered. | Matches title. |
| Blog (`/blog/[topic-slug]/`) | `{Question or Outcome} \| Air Pro Solutions` (brand suffix optional - drop it if the topic benefits from a concise, topic-first title aimed at informational traffic) | Direct-answer-style summary, aimed at the featured-snippet target. | Matches the primary search question, not a cute headline. |
| Core/utility (About, Contact, FAQ, Careers, Reviews, Financing, Accessibility, Privacy, Terms) | `{Page Purpose} \| Air Pro Solutions` - brand suffix stays on these (navigational/branded intent). | One sentence, purpose-specific, no keyword stuffing. | Plain, human page name - no SEO engineering needed. |

### Worked example (already the project's reference case)

```
Title:   AC Repair in Torrance, CA | Air Pro Solutions
Meta:    Need AC repair in Torrance? Air Pro Solutions diagnoses cooling, airflow,
         electrical, and drainage problems for homes and businesses. Schedule service.
H1:      AC Repair in Torrance, CA
Intro:   Air Pro Solutions provides AC repair for Torrance homes, businesses, and
         managed properties when cooling systems stop working, blow warm air, leak,
         or lose airflow.
```

### What not to do

```
Title:   AC Repair Torrance CA | AC Repair Company Torrance | Best AC Repair Torrance
Meta:    Looking for AC repair in Torrance CA? Our AC repair Torrance CA company offers
         AC repair Torrance CA for all your AC repair Torrance CA needs.
H1:      Best Affordable Emergency 24 Hour AC Repair Torrance CA Near Me
```
Keyword-stuffed, makes unsupported claims ("Best," "24 Hour"), reads as templated, and is likely to get rewritten by Google anyway.

## 4. Primary keyword placement rule

> Every indexable page defines one **primary keyword** (a query concept, not necessarily an exact string). It, or a natural close variant, must appear once in: the title tag, the meta description, the visible H1, and the opening paragraph/direct-answer block. Never repeated more than once per field. Never forced if it reads unnaturally - a close variant beats an awkward exact match.

Close variation is preferred over robotic matching:

| Primary keyword | Title | H1 |
|---|---|---|
| `hvac repair south bay` | `HVAC Repair in the South Bay \| Air Pro Solutions` | `HVAC Repair Services Across the South Bay` |

This becomes a required field on the content record for every service/city/audience page (Section 9). **How to choose the primary keyword in the first place** - the page-job/intent/SERP/scorecard workflow, plus the page-type keyword matrix and the GSC validation loop - lives in the companion doc **"Primary Keyword Selection - Air Pro Solutions"** (`docs/primary-keyword-selection.md`). Read that before this section on any page that doesn't already have an obvious keyword from its slug.

## 5. Brand-suffix rule

Include `\| Air Pro Solutions` when:
- The page is a core revenue page (service, service+city, audience, audience+service, city, region, home).
- It's a branded/navigational page (Contact, About, Reviews).
- There's room without making the title clumsy.

Consider dropping it when:
- The title is already near budget.
- It's a resource/blog article aimed at informational traffic before introducing the brand in the snippet or body.
- It would make the title repetitive or unnatural.

## 6. Approved claims list

Only these may appear in title/description/H1 copy without a fresh client confirmation, per the project's existing no-fabrication hard rule:

- `licensed` - real (CA license #s 1126691, 50251 on file)
- `4.8-star rated` / rating-based phrasing - real (4.8 stars / 40 reviews on file)
- Named regions/cities actually in `src/content/regions.ts` / `cities.ts`

**Not yet approved** (must stay out of metadata until the client confirms, consistent with the existing stub-page TODOs on financing/reviews):
- `same-day service` - currently a TODO(data) flag on the matrix title helper; do not ship it in any title/description until confirmed
- `24/7` / `emergency` availability wording, unless the emergency-hvac service is confirmed always-on
- `insured`, `guaranteed`, `best`, `affordable`, `near me` - unverifiable or not on file

Maintain this as an `allowedClaims` array the build can check against (Section 8).

## 7. Matrix (service + city) uniqueness requirement

The service+city template must not be pure `{city}` token substitution. Each published pair needs, beyond title/description/H1:
- A unique opening paragraph
- A city-specific local-content section (this already exists as the matrix quality gate: climate/sizing, utility rebate, Title 24/permit notes, housing-stock fit, local reviews/photos, or response-time detail - 3-4 required elements)
- At least one local proof element (review, job photo, or case reference)
- At least 3 relevant internal links
- A correct breadcrumb trail and self-referencing canonical

If two service+city pages could have their local-content sections swapped without anyone noticing, the page isn't ready to publish.

## 8. Build-time validation (publication gate)

Before a page is marked `index`, it must pass:
- Title present, 20-70 characters, unique across the site
- Description present, 70-180 characters, unique across the site
- Exactly one H1, 10-100 characters
- Self-referencing canonical under `https://airprosolutionsheatingandcooling.com/`
- City pages: city name in both title and H1
- Service+city pages: service **and** city in both title and H1, plus `localContext` populated and `relatedLinks.length >= 3`
- No unapproved claims (Section 6) in title or description
- `noindex` pages excluded from the sitemap; `index` pages not blocked by robots

```ts
const allowedClaims = ["licensed", "4.8-star rated"]; // extend only on client confirmation

function validateSeoPage(page: SeoPage) {
  assert(page.title.length >= 20 && page.title.length <= 70);
  assert(page.description.length >= 70 && page.description.length <= 180);
  assert(page.h1.length >= 10 && page.h1.length <= 100);
  assert(page.canonical.startsWith('https://airprosolutionsheatingandcooling.com/'));

  if (page.pageType === 'city') {
    assert(page.title.includes(page.city) && page.h1.includes(page.city));
  }
  if (page.pageType === 'service-location') {
    assert(page.title.includes(page.serviceName) && page.title.includes(page.city));
    assert(page.h1.includes(page.serviceName) && page.h1.includes(page.city));
    assert(page.localContext);
    assert(page.relatedLinks.length >= 3);
  }
  assertNoUnapprovedClaims(page.title, allowedClaims);
  assertNoUnapprovedClaims(page.description, allowedClaims);
}
```

## 9. Content-record fields

Every service/city/matrix/audience page's data entry (in `src/content/services.ts`, `cities.ts`, `regions.ts`, `audiences.ts`, or a future `matrix.ts` entry) should carry:

```ts
{
  primaryKeyword: string;
  secondaryKeywords?: string[];
  title: string;       // full <title> tag text
  description: string; // meta description
  h1: string;
  intro: string;       // opening paragraph, contains the primary keyword
  canonical: string;
  indexStatus: 'index' | 'noindex';
}
```

This turns metadata from an editorial afterthought into a required field, matching how `services.ts` already treats `description`/`symptoms`/`process` as required-but-TODO rather than optional. See "Primary Keyword Selection" for the fuller keyword-to-page mapping sheet this pairs with.

## 10. Ongoing review

After launch, metadata is a first draft. Monthly: pull GSC data grouped by template (core service / region / city / matrix / audience / resource), flag high-impressions-low-CTR pages and title rewrites, and revise copy without changing the page's primary intent. Log the change date per page.

## 11. Pre-publish checklist

For any page before it goes live:
1. What is this URL's single primary search intent?
2. What audience is it written for?
3. What does the H1 clearly promise?
4. Is the title unique, concise, and natural (not stuffed)?
5. Does the description accurately describe *this* page?
6. Does the metadata still work if Google shows only the first 50-60 characters?
7. Does the H1 match what the visitor sees after clicking?
8. Does the page have enough proof/specificity/internal links to justify indexing?
9. Is every claim in the metadata something the business can actually back up?
10. Would a human find this page genuinely different from the next city/service page?

Any "no" holds the page in draft/noindex.
