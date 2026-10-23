import { cities } from '@/content/cities';
import { matrixPages } from '@/content/matrix';
import { cityCardNote } from '@/content/city-card-notes';
import { getService, serviceHref } from '@/content/services';
import { RelatedRow } from '@/components/sections/RelatedRow';

// "Where we do this" city cards on a service page. Cards are the shared RelatedRow card (image or Photo pending,
// title, description, whole card links). A city with a service+city page links there and is titled "{Service} in {City}";
// every other city links to its city page. Cities come from the service's featuredCities data (src/content/featured-cities.ts).
export function ServiceCityLinks({ serviceSlug }: { serviceSlug: string }) {
  const service = getService(serviceSlug);
  const featured = service?.featuredCities ?? [];
  // RelatedRow renders a fixed 4-column grid, which only fits 8 cards in clean rows.
  if (!service || featured.length !== 8) {
    throw new Error(`ServiceCityLinks: ${serviceSlug} has ${featured.length} featured cities, expected 8. A columns prop on RelatedRow is needed before other counts can ship.`);
  }

  const items = featured.map(({ citySlug, serviceNote }) => {
    const city = cities.find((c) => c.slug === citySlug);
    if (!city?.page) throw new Error(`ServiceCityLinks: ${serviceSlug} features ${citySlug}, which is not a live city.`);
    const matrix = matrixPages.some((m) => m.service === serviceSlug && m.city === citySlug);
    return {
      name: matrix ? `${service.name} in ${city.name}` : city.name,
      href: matrix ? `${serviceHref(serviceSlug)}${citySlug}/` : `/service-areas/${citySlug}/`,
      icon: 'pin',
      image: city.cardImage,
      description: serviceNote ?? cityCardNote(citySlug),
      linkLabel: matrix ? 'View service' : 'View area',
    };
  });

  return (
    <RelatedRow
      items={items}
      eyebrow="Cities we serve"
      title="Where we do this"
      intro="Local pages for the cities we serve across Southern California."
      alt={false}
    />
  );
}
