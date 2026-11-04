import { preload } from 'react-dom';
import manifest from '@/content/hero-variants.json';

// Hero (LCP) image with responsive webp variants made by scripts/make-hero-variants.mjs (npm run images:hero).
// Static export has no image optimizer, so srcSet is written by hand here. The image is never lazy-loaded:
// it is preloaded with the same imagesrcset/imagesizes and carries fetchPriority="high".
type Entry = { w: number; h: number; widths: { w: number; kb: number }[] };
const variants = manifest as Record<string, Entry>;

// Real slot width of .hero-photo: full container (viewport minus 20px padding each side) up to 920px, then the
// 0.9fr column of .hero-grid (1.1fr 0.9fr, 40px gap, inside the 1180px wrap), which tops out at 495px.
export const HERO_SIZES = '(max-width: 920px) calc(100vw - 40px), min(495px, calc((100vw - 80px) * 0.45))';

export function HeroImage({ src, alt }: { src: string; alt: string }) {
  const entry = variants[src];
  const base = src.replace(/\.webp$/, '');
  const srcSet = entry ? entry.widths.map((v) => `${base}-${v.w}w.webp ${v.w}w`).join(', ') : undefined;
  const has800 = entry?.widths.some((v) => v.w === 800);
  const fallback = entry && has800 ? `${base}-800w.webp` : src;
  const width = 1200;
  const height = entry ? Math.round((1200 * entry.h) / entry.w) : 900;

  preload(fallback, {
    as: 'image',
    fetchPriority: 'high',
    ...(srcSet ? { imageSrcSet: srcSet, imageSizes: HERO_SIZES } : {}),
  });

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
