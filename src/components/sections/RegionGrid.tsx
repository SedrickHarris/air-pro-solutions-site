import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { regions } from '@/content/regions';
import { getCity } from '@/content/cities';
import { Icon } from '@/components/ui/Icon';

export function RegionGrid({
  eyebrow = 'Service areas',
  title = 'Serving four Southern California regions',
  intro,
  linkLabel = () => 'View region',
  // When false, renders `bodyFor(slug)` copy instead of the region's city list. Used by pages (e.g.
  // /ac-repair/) that need genuinely different, conditional per-region copy rather than a repeated
  // city roll call - see CLAUDE.md's doorway-page rule.
  showCities = true,
  bodyFor,
  footer,
}: {
  eyebrow?: string;
  title?: string;
  intro?: ReactNode;
  linkLabel?: (regionName: string) => string;
  showCities?: boolean;
  bodyFor?: (regionSlug: string) => string;
  footer?: ReactNode; // e.g. "Don't see your city? Call us..." rendered below the card grid
}) {
  return (
    <section className="alt">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {intro && <div className="region-grid-intro">{intro}</div>}
        <div className="region-grid">
          {regions.map((r) => (
            <Link key={r.slug} href={`/service-areas/${r.slug}/`} className="region-card">
              <div className="region-card-img">
                <Image src={r.image.src} alt={r.image.alt} width={800} height={416} sizes="(max-width: 520px) 100vw, (max-width: 920px) 50vw, 25vw" />
              </div>
              <div className="region-card-body">
                <h3>{r.name}</h3>
                <p>{showCities ? r.cities.map((c) => getCity(c)?.name).filter(Boolean).join(', ') : bodyFor?.(r.slug)}</p>
                <span className="card-arrow">{linkLabel(r.name)} <Icon name="arrow" size={16} /></span>
              </div>
            </Link>
          ))}
        </div>
        {footer && <p className="region-grid-closing">{footer}</p>}
      </div>
    </section>
  );
}
