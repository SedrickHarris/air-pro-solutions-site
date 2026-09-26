import { PageHeader } from '@/components/ui/PageHeader';
import { ContactForm } from '@/components/sections/ContactForm';
import { siteConfig } from '@/content/site-config';
import { hubMetadata } from '@/lib/seo';

export const metadata = hubMetadata({
  title: 'Contact Air Pro Solutions',
  description: 'Request HVAC service or a quote from Air Pro Solutions.', // TODO(copy)
  path: '/contact/',
});

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Contact Air Pro Solutions" lede="Tell us what you need and we will get back to you." />
      <section>
        <div className="wrap grid-2">
          <div>
            <ContactForm />
          </div>
          <div className="prose">
            <h2>Reach us directly</h2>
            <p>
              Phone: <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
              <br />
              Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </p>
            <p>We serve Los Angeles County, the South Bay, Orange County, and the Inland Empire.</p>
            {/* TODO(data): map embed once the client confirms the business address or service-area map */}
            <div className="map-placeholder">Map coming soon</div>
          </div>
        </div>
      </section>
    </>
  );
}
