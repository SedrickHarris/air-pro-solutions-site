import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader } from '@/components/ui/PageHeader';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { RegionGrid } from '@/components/sections/RegionGrid';
import { FinalCta } from '@/components/sections/FinalCta';
import { regions } from '@/content/regions';
import { getCity } from '@/content/cities';
import { siteConfig } from '@/content/site-config';
import { breadcrumbSchema, collectionPageSchema, jsonLd } from '@/lib/schema';
import { hubMetadata, serviceAreasHubTitle, serviceAreasHubH1, assertH1 } from '@/lib/seo';

const description =
  'Air Pro Solutions provides licensed HVAC repair, installation, and maintenance across Los Angeles County, the South Bay, Orange County, and the Inland Empire.';
const h1 = serviceAreasHubH1();
assertH1(h1);

export const metadata = hubMetadata({ title: serviceAreasHubTitle(), description, path: '/service-areas/' });

// Same city-list computation RegionGrid renders, so the CollectionPage description mirrors the
// visible card text word for word.
const cityList = (citySlugs: string[]) => citySlugs.map((slug) => getCity(slug)?.name).filter(Boolean).join(', ');

export default function Page() {
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Service Areas' }];
  const schema = [
    collectionPageSchema({
      name: h1,
      url: `${siteConfig.url}/service-areas/`,
      items: regions.map((r) => ({
        name: r.name,
        description: cityList(r.cities),
        url: `${siteConfig.url}/service-areas/${r.slug}/`,
      })),
    }),
    breadcrumbSchema(crumbs.map((c) => ({ name: c.name, url: c.href ? `${siteConfig.url}${c.href}` : `${siteConfig.url}/service-areas/` }))),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Breadcrumbs crumbs={crumbs} />

      <PageHeader
        eyebrow="Service Areas"
        title={h1}
        lede="Air Pro Solutions serves homes and businesses across four Southern California regions: Los Angeles County, the South Bay, Orange County, and the Inland Empire."
      />

      <TrustStrip />

      <RegionGrid
        eyebrow="Where we work"
        title="Choose your region"
        intro="Every region page lists the cities Air Pro Solutions currently serves there."
        linkLabel={(name) => `View ${name}`}
      />

      <FinalCta
        title="Don't see your city listed?"
        body="Call to confirm coverage - Air Pro Solutions is adding new service-area pages regularly."
        ghostLabel="Contact Us"
      />
    </>
  );
}
