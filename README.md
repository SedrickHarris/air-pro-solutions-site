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

## Deployment

Pushes to `main` deploy automatically via Cloudflare Pages' GitHub
integration. Build command: `npm run build`. Output directory: `out`.
