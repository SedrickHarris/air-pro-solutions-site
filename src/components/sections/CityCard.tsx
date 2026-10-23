import Image from 'next/image';
import Link from 'next/link';
import { createElement, type ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';
import { getCity } from '@/content/cities';

// City card on a region hub: image (or "Photo pending"), city name, description, whole card links to the city page.
// The href and image come from the city slug, and a card for a city without a live page fails the build instead of
// rendering a dead link. `extras` render between the description and the "View area" arrow (extra fact lines); they
// are spread in as separate children so the markup and page payload match a hand-written card.
export function CityCard({ slug, name, description, extras = [] }: { slug: string; name: string; description: string; extras?: ReactNode[] }) {
  const city = getCity(slug);
  if (!city?.page) throw new Error(`CityCard: "${slug}" is not a live city`);
  const image = city.cardImage;
  return (
    <Link href={`/service-areas/${city.slug}/`} className="svc-card">
      {image ? (
        <div className="svc-card-img">
          <Image src={image.src} alt={image.alt} width={800} height={600} sizes="(max-width: 520px) 100vw, (max-width: 920px) 50vw, 25vw" />
        </div>
      ) : (
        <div className="photo-pending svc-card-img">
          <Icon name="pin" size={28} />
          <span className="photo-tag">Photo pending</span>
        </div>
      )}
      {createElement(
        'div',
        { className: 'svc-card-body' },
        <h3>{name}</h3>,
        <p>{description}</p>,
        ...extras,
        <span className="card-arrow">View area <Icon name="arrow" size={16} /></span>,
      )}
    </Link>
  );
}
