import { PageHeader } from '@/components/ui/PageHeader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { jsonLd, breadcrumbSchema, webPageSchema } from '@/lib/schema';
import { siteConfig } from '@/content/site-config';
import { hubMetadata, utilityTitle } from '@/lib/seo';

export const metadata = hubMetadata({
  title: utilityTitle('Privacy Policy and Text Message Consent'),
  description: 'How AIRPRO SOLUTIONS collects, uses, and protects your personal information, including our call and text message consent practices and your privacy rights.',
  path: '/privacy/',
});

// LAUNCH-REQUIRED: this page needs an effective date and legal review (visible "Coming soon" notes removed 2026-11-04).
// Re-add the analytics statement only after analytics is installed (none is installed as of 2026-11-04).
// TODO(legal): standard boilerplate draft. Have the client or counsel review before launch,
// especially the SMS/TCPA section, which must match the consent text in ContactForm.tsx.
export default function Page() {
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Privacy Policy' }];
  const url = `${siteConfig.url}/privacy/`;
  const schema = [webPageSchema({ type: 'WebPage', name: 'AIRPRO SOLUTIONS Privacy Policy', url }), breadcrumbSchema(crumbs.map((c) => ({ name: c.name, url: c.href ? `${siteConfig.url}${c.href}` : url })))];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Breadcrumbs crumbs={crumbs} />
      <PageHeader eyebrow="Legal" title="AIRPRO SOLUTIONS Privacy Policy" />
      <section>
        <div className="wrap prose">
          <h2>Information we collect</h2>
          <p>
            When you contact us or request service, we collect the details you provide, such as your name, phone
            number, email address, service needed, and message.
          </p>
          {/* TODO(legal): counsel to review this paragraph. It describes the current form wiring (Pages Function -> HighLevel). */}
          <p>
            When you submit our contact form, those details, your text message checkbox choices, the time you
            submitted, and the page of this website you came from (if any) are sent to HighLevel, the platform we use
            to receive and follow up on requests. Cloudflare hosts this website and provides Turnstile, the spam check
            on the form.
          </p>

          <h2>How we use it</h2>
          <p>
            We use your information to respond to requests, schedule and provide service, follow up about your
            request, and improve our website. We do not sell your personal information.
          </p>

          <h2>Calls and text messages (SMS consent)</h2>
          <p>
            Our contact form has two separate, optional text message checkboxes. If you check the first, you consent
            to receive non-marketing text messages from AIRPRO SOLUTIONS about appointments, service updates, and
            account notifications. If you check the second, you consent to receive marketing text messages about
            special offers, discounts, and promotions. You can choose either, both, or neither. Message frequency
            may vary. Message and data rates may apply. Consent is not a condition of purchase. Reply STOP to opt
            out. Reply HELP for help.
          </p>

          <h2>Sharing</h2>
          <p>
            We share information only with service providers who help us run our business, such as scheduling
            and communication tools, or when required by law.
          </p>

          {/* TODO(legal): the Turnstile sentence below is unchanged and still needs counsel review (cookies / browser data). */}
          <h2>Cookies</h2>
          <p>
            This website does not use analytics or advertising tools. Our contact form uses Cloudflare Turnstile to
            filter spam, which may process technical information about your browser. You can control cookies in your
            browser settings.
          </p>

          <h2>Your California privacy rights</h2>
          <p>
            California residents may request access to, correction of, or deletion of their personal information.
            Contact us using the details below to make a request.
          </p>

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
