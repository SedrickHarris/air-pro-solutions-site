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

The contact form (`/contact/`) posts to an endpoint set at build time. Static export has no server, so the values are inlined into the build.

| Variable | What it is |
|---|---|
| `NEXT_PUBLIC_FORM_ENDPOINT` | URL that receives the POST and delivers it to contact@airprosolutionsheatingandcooling.com |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile **site** key (public). The secret key lives with the endpoint, which must verify the `cf-turnstile-response` field. |

Copy `.env.example` to `.env.local` for local work, and set both under Cloudflare Pages > Settings > Environment variables (Production) for deploys. `npm run build` stops with a clear error if either is missing (`scripts/check-form-env.mjs`). For a local verification build only, set `ALLOW_MISSING_FORM_ENV=1`. The form also has a hidden honeypot field (`company_website`, removed before sending); the endpoint should still reject any submission that contains it.

## Hero images and fonts (performance)

- Every hero image has 480, 800 and 1200 px wide webp variants next to the original (`<name>-480w.webp`, `-800w.webp`, `-1200w.webp`). The originals are never modified. Regenerate after adding or changing a hero with `npm run images:hero` (`scripts/make-hero-variants.mjs`, uses `sharp`); it also rewrites `src/content/hero-variants.json`, which `<HeroImage>` reads. Commit the variants and the manifest.
- `src/components/ui/HeroImage.tsx` renders the hero `<img>` with `srcSet`, `sizes` that match the real layout slot, explicit width and height, `fetchPriority="high"` and `decoding="async"`, plus a matching preload. Use it for any new hero. A hero missing from the manifest falls back to the single original file.
- `scripts/preload-fonts.mjs` runs after `next build` and adds a font preload (Barlow Condensed 700 and Manrope, latin) to every exported page. next/font emits none in this static export.
- Always build from a clean tree: delete `.next` and `out` first. A stale `.next` cache once produced a build with Arial fallbacks instead of the real fonts.

## Deployment

Pushes to `main` deploy automatically via Cloudflare Pages' GitHub
integration. Build command: `npm run build`. Output directory: `out`.
