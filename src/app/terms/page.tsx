import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { PendingNote } from '@/components/ui/PendingNote';
import { siteConfig } from '@/content/site-config';
import { hubMetadata } from '@/lib/seo';

export const metadata = hubMetadata({
  title: 'Terms of Service',
  description: 'Terms for using the Air Pro Solutions website.',
  path: '/terms/',
});

// TODO(legal): standard boilerplate draft. Have the client or counsel review before launch.
export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service" />
      <section>
        <div className="wrap prose">
          <PendingNote>effective date and legal review.</PendingNote>

          <h2>Using this website</h2>
          <p>
            By using this website you agree to these terms. The site is provided for general information about our
            heating and cooling services. Information on the site is not a quote or a guarantee of service.
          </p>

          <h2>Service requests and estimates</h2>
          <p>
            Submitting a form or contacting us does not create a service contract. Pricing, scope, and scheduling are
            confirmed directly with you before work begins.
          </p>

          <h2>Calls and text messages</h2>
          <p>
            If you opt in to calls or texts, the terms in our <Link href="/privacy/">Privacy Policy</Link> apply.
          </p>

          <h2>Intellectual property</h2>
          <p>
            Content on this site, including text, logos, and images, belongs to Air Pro Solutions or its licensors
            and may not be reused without permission.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            The site is provided as is. To the extent permitted by law, Air Pro Solutions is not liable for damages
            arising from use of this website.
          </p>

          <h2>Changes</h2>
          <p>We may update these terms from time to time. Continued use of the site means you accept the updated terms.</p>

          <h2>Contact us</h2>
          <p>
            Email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or call{' '}
            <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
