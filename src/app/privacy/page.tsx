import { PageHeader } from '@/components/ui/PageHeader';
import { PendingNote } from '@/components/ui/PendingNote';
import { siteConfig } from '@/content/site-config';
import { hubMetadata, utilityTitle } from '@/lib/seo';

export const metadata = hubMetadata({
  title: utilityTitle('Privacy Policy'),
  description: 'How AIRPRO SOLUTIONS collects, uses, and protects your personal information, including our call and text message consent practices.',
  path: '/privacy/',
});

// TODO(legal): standard boilerplate draft. Have the client or counsel review before launch,
// especially the SMS/TCPA section, which must match the consent text in ContactForm.tsx.
export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <section>
        <div className="wrap prose">
          <PendingNote>effective date and legal review.</PendingNote>

          <h2>Information we collect</h2>
          <p>
            When you contact us or request service, we collect the details you provide, such as your name, phone
            number, email address, service needed, and message. We also collect basic website usage data through
            analytics tools and cookies.
          </p>

          <h2>How we use it</h2>
          <p>
            We use your information to respond to requests, schedule and provide service, follow up about your
            request, and improve our website. We do not sell your personal information.
          </p>

          <h2>Calls and text messages (SMS consent)</h2>
          <p>
            If you check the consent box on our contact form, you agree to receive calls and text messages from Air
            Pro Solutions about your service request. Message and data rates may apply. Message frequency varies.
            Consent is not a condition of purchase. You can reply STOP at any time to opt out of text messages, or
            HELP for help.
          </p>
          <PendingNote>confirm the mobile-information sharing statement and opt-in wording with the client.</PendingNote>

          <h2>Sharing</h2>
          <p>
            We share information only with service providers who help us run our business, such as scheduling,
            communication, and analytics tools, or when required by law.
          </p>

          <h2>Cookies and analytics</h2>
          <p>
            We use cookies and analytics tools to understand how visitors use our site. You can control cookies in
            your browser settings.
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
