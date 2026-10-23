import { getCity } from '@/content/cities';
import { cityCardNote } from '@/content/city-card-notes';
import { RelatedRow } from '@/components/sections/RelatedRow';

// A row of city cards for a page that links to specific cities. Cards are the shared RelatedRow card: city image,
// city name, hub note as the description, whole card links to the city page. Builds fail on an unknown or
// not-yet-live slug, or when the card count is not the expected one (RelatedRow is a fixed 4-column grid).
export function CityCardsRow({ slugs, expected, eyebrow, title }: { slugs: string[]; expected: number; eyebrow: string; title: string }) {
  if (slugs.length !== expected) throw new Error(`CityCardsRow "${title}": ${slugs.length} cities, expected ${expected}`);
  const items = slugs.map((slug) => {
    const city = getCity(slug);
    if (!city?.page) throw new Error(`CityCardsRow "${title}": "${slug}" is not a live city`);
    return { name: city.name, href: `/service-areas/${city.slug}/`, icon: 'pin', image: city.cardImage, description: cityCardNote(slug), linkLabel: 'View area' };
  });
  return (
    <RelatedRow
      items={items}
      eyebrow={eyebrow}
      title={title}
      footerAction={{ label: 'View all service areas', href: '/service-areas/' }}
      alt={false}
    />
  );
}
