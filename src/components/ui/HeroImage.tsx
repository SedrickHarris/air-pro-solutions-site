import manifest from '@/content/hero-variants.json';

// Hero (LCP) image with responsive webp variants made by scripts/make-hero-variants.mjs (npm run images:hero).
// Static export has no image optimizer, so srcSet is written by hand here. The image is never lazy-loaded:
// it carries fetchPriority="high" and is present in the server-rendered HTML, so the preload scanner finds it early.
// No preload() call: it was replayed when Next prefetched linked pages and made browsers download those pages' hero images.
type Entry = { w: number; h: number; widths: { w: number; kb: number }[] };
const variants = manifest as Record<string, Entry>;

// Real slot width of .hero-photo: full container (viewport minus 20px padding each side) up to 920px, then the
// 0.9fr column of .hero-grid (1.1fr 0.9fr, 40px gap, inside the 1180px wrap), which tops out at 495px.
// Up to 920px the photo is also capped by max-height 340px with aspect-ratio 4/3, so it never renders wider than 453px.
export const HERO_SIZES = '(max-width: 920px) min(calc(100vw - 40px), 453px), min(495px, calc((100vw - 80px) * 0.45))';
// A phone-only source list capped at 800 px was tried (3x phones would skip the 1200 px file) and reverted: Lighthouse LCP did
// not improve and 3x phones showed slightly softer foliage. The 700 px variant already serves 1.75x and 2x phones exactly.

export function HeroImage({ src, alt }: { src: string; alt: string }) {
  const entry = variants[src];
  const base = src.replace(/\.webp$/, '');
  const set = (ws: { w: number }[]) => ws.map((v) => `${base}-${v.w}w.webp ${v.w}w`).join(', ');
  const srcSet = entry ? set(entry.widths) : undefined;
  const has800 = entry?.widths.some((v) => v.w === 800);
  const fallback = entry && has800 ? `${base}-800w.webp` : src;
  const width = 1200;
  const height = entry ? Math.round((1200 * entry.h) / entry.w) : 900;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={fallback}
      srcSet={srcSet}
      sizes={srcSet ? HERO_SIZES : undefined}
      width={width}
      height={height}
      alt={alt}
      fetchPriority="high"
      decoding="async"
    />
  );
}
