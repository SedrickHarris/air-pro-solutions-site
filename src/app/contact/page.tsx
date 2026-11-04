import { PageHeader } from '@/components/ui/PageHeader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { jsonLd, breadcrumbSchema, webPageSchema } from '@/lib/schema';
import { ContactForm } from '@/components/sections/ContactForm';
import { siteConfig } from '@/content/site-config';
import { hubMetadata, utilityTitle } from '@/lib/seo';

export const metadata = hubMetadata({
  title: utilityTitle('Contact Us to Schedule HVAC Service'),
  description: 'Contact AIRPRO SOLUTIONS to schedule HVAC service or request an estimate for your home or business in Southern California. Call or send us a message.', // TODO(copy)
  path: '/contact/',
});

export default function Page() {
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Contact' }];
  const url = `${siteConfig.url}/contact/`;
  const schema = [webPageSchema({ type: 'ContactPage', name: 'Contact AIRPRO SOLUTIONS for HVAC Service', url }), breadcrumbSchema(crumbs.map((c) => ({ name: c.name, url: c.href ? `${siteConfig.url}${c.href}` : url })))];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Breadcrumbs crumbs={crumbs} />
      <PageHeader eyebrow="Contact" title="Contact AIRPRO SOLUTIONS for HVAC Service" lede="Tell us what you need and we will get back to you." />
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
            {/* TODO(data): client to confirm this map image (Google Maps capture; it highlights Torrance and the Palos Verdes Peninsula, and two labels read "Fortooh" and "Cbarnige"). Do not add a street address until the client confirms one. */}
            <figure className="contact-map">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/contact/airpro-solutions-hvac-services-contact-page.webp"
                width={2752}
                height={1536}
                alt="Map of Southern California from Santa Monica to San Bernardino, showing Los Angeles, Torrance, Long Beach, Anaheim, Irvine and Riverside"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}
