# AIRPRO SOLUTIONS — Website

HVAC company site for AIRPRO SOLUTIONS (Los Angeles County, South Bay,
Orange County, and the Inland Empire, CA). Built by Sirius Systems.

## Stack

- [Next.js](https://nextjs.org/) — App Router, static export (`output: 'export'`)
- Deployed via GitHub → Cloudflare Pages
- Fonts: Barlow Condensed (display) + Manrope (body/UI), via Google Fonts

## Getting started

```bash
npm install
npm run dev        # local dev server
npm run build       # static export to /out
```

## Project conventions

See [`CLAUDE.md`](./CLAUDE.md) for the full set of content, design, and
schema conventions this project follows (hard rules on copy style, brand
data, JSON-LD, and page architecture). Read that before adding a new page
type or content field.

## Folder structure

```
src/
  app/            Routes (App Router) — pages, layouts, sitemap, robots
  components/     layout/, sections/, ui/
  content/        Structured data: services, regions, cities, site config
  lib/            Schema (JSON-LD) builders, SEO metadata helpers
```

## Contact form

### Architecture

`/contact/` (static page, `src/components/sections/ContactForm.tsx`) posts multipart form data to `/api/contact`, a Cloudflare Pages Function in `functions/api/contact.js`. The Function, in order: checks its config, requires a same-origin request, checks content type and size, parses the form, silently accepts honeypot hits (`company_website`), validates fields, verifies the Turnstile token with Cloudflare, upserts the contact in HighLevel (GHL), then adds a note to that contact. It answers JSON `{"ok":true}` or `{"ok":false,"error":"<code>"}`. Logs hold codes and statuses only, never submitted data. `public/_routes.json` limits Function invocation to `/api/*` so static pages never run it.

Facts about the design:
- The form sends `name`, `phone`, `email`, `service` (a slug), `message`, `source_page` (same-origin referrer path only), `cf-turnstile-response`, and, only when ticked, `sms_consent_non_marketing` and `sms_consent_marketing` (value `yes`). Both consent boxes are optional and never a condition of submitting.
- Consent custom fields are written to GHL only when their box is ticked (value `Yes`), so a returning contact's earlier consent is never overwritten. The consent timestamp is written only when at least one box is ticked. The Function never sends DND settings or tags; it only records consent.
- Phones are normalized to `+1XXXXXXXXXX` (US numbers only; TODO(client) confirm).
- TODO(legal): the consent wording and the TCPA design (two optional boxes, consent recorded in GHL custom fields and a note) need review by counsel before launch.

### Build-time variables (public, inlined into the static export)

| Variable | Production | Preview | What it is |
|---|---|---|---|
| `NEXT_PUBLIC_FORM_ENDPOINT` | `/api/contact` | `/api/contact` | Same-origin Function route |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | real site key | Cloudflare TEST site key, or a real key whose widget allows the preview hostname | Turnstile **site** key (public) |

`npm run build` stops if either is missing (`scripts/check-form-env.mjs`). For a local verification build only, set `ALLOW_MISSING_FORM_ENV=1` (the form then shows a call fallback).

### Server variables (Cloudflare Pages > Settings > Environment variables, set as Secrets; locally in `.dev.vars`)

| Variable | Production | Preview | What it is |
|---|---|---|---|
| `TURNSTILE_SECRET_KEY` | real secret | Cloudflare TEST secret (only if you want automated replays to pass) or the real secret | Turnstile secret |
| `GHL_PRIVATE_INTEGRATION_TOKEN` | token | token (a test sub-account is safer) | GHL Private Integration token |
| `GHL_LOCATION_ID` | location id | location id | GHL sub-account |
| `GHL_FIELD_SERVICE_ID` | field id | field id | Custom field: Service |
| `GHL_FIELD_SMS_CONSENT_NONMARKETING_ID` | field id | field id | Custom field: SMS Consent Non-Marketing |
| `GHL_FIELD_SMS_CONSENT_MARKETING_ID` | field id | field id | Custom field: SMS Consent Marketing |
| `GHL_FIELD_CONSENT_AT_ID` | field id | field id | Custom field: Consent Timestamp |
| `GHL_FIELD_SOURCE_PAGE_ID` | field id | field id | Custom field: Source Page |
| `GHL_API_VERSION` (optional) | default `v3` | default `v3` | Value of the GHL `Version` header |
| `TURNSTILE_ALLOWED_HOSTNAMES` (optional) | production hostname | preview hostname | Comma list; rejects tokens issued for other hostnames |

Never put these in `.env.example`, `.env.local`, `NEXT_PUBLIC_*`, or the repo. Copy `.dev.vars.example` to `.dev.vars` (git-ignored) for local Function runs.

### GHL custom fields to create (all Short Text)

Service, SMS Consent Non-Marketing, SMS Consent Marketing, Consent Timestamp, Source Page. Copy each field's ID into the matching variable above.

### GHL token rotation

The Private Integration token should be rotated every 90 days. Create the new token in GHL, update `GHL_PRIVATE_INTEGRATION_TOKEN` in Cloudflare (Production and Preview), redeploy, send a test, then revoke the old token. Put the next rotation date in your calendar.

### Local testing

- Unit tests (no network, mocked fetch): `npm run test:contact`.
- Replay fictional submissions to an endpoint: `npm run test:contact:replay -- <endpoint-url> --dry-run` (also `--only 1,2`, `--repeat N`). Data: `scripts/test-data/contact-submissions.json`. The replay sends a dummy Turnstile token, so it only succeeds where the server uses Cloudflare's TEST Turnstile secret. Every accepted replay against a real endpoint creates a real GHL contact and note and may trigger notification workflows: delete the test contacts afterward.
- Cloudflare publishes Turnstile test site and secret keys that always pass or always fail: https://developers.cloudflare.com/turnstile/troubleshooting/testing/ (copy them from that page; they are not stored in this repo).

## Hero images and fonts (performance)

- Every hero image has 480, 700, 800 and 1200 px wide webp variants next to the original (`<name>-480w.webp`, `-700w.webp`, `-800w.webp`, `-1200w.webp`). The originals are never modified. Regenerate after adding or changing a hero with `npm run images:hero` (`scripts/make-hero-variants.mjs`, uses `sharp`); quality is chosen per image and width as the lowest webp quality that keeps PSNR at or above 33 dB against a near-lossless resize (with size caps for the 480, 700 and 800 variants); it also rewrites `src/content/hero-variants.json`, which `<HeroImage>` reads. Commit the variants and the manifest.
- `src/components/ui/HeroImage.tsx` renders the hero `<img>` with `srcSet`, `sizes` that match the real layout slot, explicit width and height, `fetchPriority="high"` and `decoding="async"`, plus a matching preload. Use it for any new hero. A hero missing from the manifest falls back to the single original file.
- `scripts/preload-fonts.mjs` runs after `next build` and adds a font preload (Barlow Condensed 700 and Manrope, latin) to every exported page. next/font emits none in this static export.
- Always build from a clean tree: delete `.next` and `out` first. A stale `.next` cache once produced a build with Arial fallbacks instead of the real fonts.

## Deployment

Pushes to `main` deploy automatically via Cloudflare Pages' GitHub
integration. Build command: `npm run build`. Output directory: `out`.
