import { citySlug } from './regions';
import { laCountyHub } from './la-county-hub';
import { southBayHub } from './south-bay';
import { orangeCountyHub } from './orange-county';
import { inlandEmpireHub } from './inland-empire';

// City card descriptions: the `note` shown on each city's card on its region hub page. One source, keyed by city slug.
const notes = new Map<string, string>(
  [laCountyHub, southBayHub, orangeCountyHub, inlandEmpireHub].flatMap((hub) =>
    hub.cities.items.map((i): [string, string] => [citySlug(i.name), i.note]),
  ),
);

export const cityCardNote = (slug: string): string | undefined => notes.get(slug) || undefined;
