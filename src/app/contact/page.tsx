import { PageHeader } from '@/components/ui/PageHeader';
import { ContactForm } from '@/components/sections/ContactForm';
import { siteConfig } from '@/content/site-config';
import { hubMetadata, utilityTitle } from '@/lib/seo';

export const metadata = hubMetadata({
  title: utilityTitle('Contact Us'),
  description: 'Contact AIRPRO SOLUTIONS to schedule HVAC service or request an estimate for your home or business in Southern California.', // TODO(copy)
  path: '/contact/',
});

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Contact AIRPRO SOLUTIONS" lede="Tell us what you need and we will get back to you." />
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
