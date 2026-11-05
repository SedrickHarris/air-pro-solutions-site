import { PageHeader } from '@/components/ui/PageHeader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { jsonLd, breadcrumbSchema, webPageSchema } from '@/lib/schema';
import { siteConfig } from '@/content/site-config';
import { hubMetadata, utilityTitle } from '@/lib/seo';

// The visible summary under the H1 and the meta description are the same string, and the JSON-LD description
// mirrors it. Change all three together.
const DESCRIPTION =
  'How AIRPRO SOLUTIONS collects, uses, and shares information from this website, calls, email, and texts, and the choices you have.';
const LAST_UPDATED_ISO = '2026-11-04';
const LAST_UPDATED_TEXT = 'Last updated: November 4, 2026';

export const metadata = hubMetadata({
  title: utilityTitle('Privacy Policy'),
  description: DESCRIPTION,
  path: '/privacy/',
});

const sections = [
  { id: 'who-we-are', title: 'Who we are and scope' },
  { id: 'information-we-collect', title: 'Information we collect' },
  { id: 'how-we-use-information', title: 'How we use information' },
  { id: 'text-messaging', title: 'Text messaging (SMS)' },
  { id: 'cookies-and-analytics', title: 'Cookies and analytics' },
  { id: 'service-providers', title: 'Service providers who process information' },
  { id: 'when-we-share', title: 'When we share information' },
  { id: 'california-rights', title: 'Your California privacy rights' },
  { id: 'data-retention', title: 'Data retention' },
  { id: 'security', title: 'Security' },
  { id: 'children', title: 'Children' },
  { id: 'links-to-other-sites', title: 'Links to other sites' },
  { id: 'changes', title: 'Changes to this policy' },
  { id: 'contact-us', title: 'Contact us' },
];

// TODO(copy): the whole policy is draft copy until the client approves it. TODO(legal): counsel review before launch.
// Facts below were checked against the repo on 2026-11-04: no analytics or advertising scripts are installed,
// the /contact/ map is a static self-hosted image (no map provider loads), the form posts to a Cloudflare Pages
// Function that verifies Cloudflare Turnstile and writes to HighLevel, and the site has no customer accounts.
export default function Page() {
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Privacy Policy' }];
  const url = `${siteConfig.url}/privacy/`;
  const schema = [
    webPageSchema({ type: 'WebPage', name: 'Privacy Policy', url, description: DESCRIPTION, dateModified: LAST_UPDATED_ISO }),
    breadcrumbSchema(crumbs.map((c) => ({ name: c.name, url: c.href ? `${siteConfig.url}${c.href}` : url }))),
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Breadcrumbs crumbs={crumbs} />
      <PageHeader eyebrow="Legal" title="Privacy Policy" lede={DESCRIPTION} note={LAST_UPDATED_TEXT} />
      <section>
        <div className="wrap prose">
          <nav className="legal-toc" aria-label="Privacy policy sections">
            <h2>On this page</h2>
            <ol>
              {sections.map((s) => (
                <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
              ))}
            </ol>
          </nav>

          <h2 id="who-we-are">Who we are and scope</h2>
          <p>
            AIRPRO SOLUTIONS is an HVAC company serving Los Angeles County, the South Bay, Orange County, and the
            Inland Empire, CA. This policy covers {siteConfig.domain} and how we handle information from the website,
            phone calls, email, and text messages.
          </p>
          <p>
            Questions about this policy: email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or call{' '}
            <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>.
          </p>

          <h2 id="information-we-collect">Information we collect</h2>
          <p>Information you give us:</p>
          <ul>
            <li>Your name, phone number, email address, the service you need, and your message, through the contact form.</li>
            <li>Information you give us by phone or email.</li>
            <li>Your text message consent choices, and when you made them.</li>
          </ul>
          <p>Information collected automatically:</p>
          <ul>
            {/* TODO(data): when Google Analytics ships, add it here (usage data, device and browser type, approximate location, referring page). */}
            <li>
              Standard technical information that our hosting provider logs when you visit, such as your IP address,
              browser and device type, the pages requested, and the referring page. Our providers handle this
              information.
            </li>
            <li>The page of this site you came from, if you reach the contact form from another page here.</li>
          </ul>
          <p>
            The contact form does not collect payment details or account passwords, and this site has no customer
            accounts.
          </p>

          <h2 id="how-we-use-information">How we use information</h2>
          <p>AIRPRO SOLUTIONS uses information to:</p>
          <ul>
            <li>Respond to your requests and schedule service.</li>
            <li>Communicate with you about appointments and service.</li>
            <li>Send text messages you agreed to receive.</li>
            <li>Operate and improve this website.</li>
            <li>Prevent spam and abuse, using Cloudflare Turnstile on the contact form.</li>
            <li>Meet legal obligations.</li>
          </ul>

          <h2 id="text-messaging">Text messaging (SMS)</h2>
          <p>
            The contact form has two separate, optional text message consents. You can choose either, both, or
            neither, and neither is required to send the form.
          </p>
          <ul>
            <li>Non-marketing texts from AIRPRO SOLUTIONS about appointments, service updates, and account notifications.</li>
            <li>Marketing texts from AIRPRO SOLUTIONS about special offers, discounts, and promotions.</li>
          </ul>
          <p>
            Message frequency may vary. Message and data rates may apply. Reply STOP to opt out. Reply HELP for help.
            You can also contact us by phone or email for help.
          </p>
          <p>Consent to marketing texts is not a condition of purchasing any service.</p>
          <p>
            Mobile opt-in data and text messaging consent are not shared with third parties or affiliates for their
            marketing or promotional purposes.
          </p>
          <p>Texts are sent through our CRM and messaging provider, GoHighLevel.</p>

          <h2 id="cookies-and-analytics">Cookies and analytics</h2>
          {/*
            TODO(data): this section is accurate only while no analytics is installed. When Google Analytics ships,
            replace the first paragraph with the GA text: GA uses cookies and similar identifiers to collect usage data,
            plus links to https://policies.google.com/privacy, https://policies.google.com/technologies/partner-sites
            and https://tools.google.com/dlpage/gaoptout. Then confirm Google Signals and ad features are off, add
            Google to the service providers and the collected-data lists, and revisit the "sharing" and DNT sentences.
            This section must also be updated if advertising or retargeting pixels or call tracking are ever added.
          */}
          <p>
            This website does not currently use analytics or advertising tools. We do not currently use advertising or
            retargeting pixels, and we do not use call tracking.
          </p>
          <p>
            Our contact form uses Cloudflare Turnstile to filter spam, which may process technical information about
            your browser. You can block or delete cookies in your browser settings.
          </p>
          <p>
            Do Not Track: some browsers send a Do Not Track signal. This site does not respond to Do Not Track
            signals, because it does not currently track visitors across other websites.
          </p>

          <h2 id="service-providers">Service providers who process information</h2>
          <p>These providers process information on our behalf, under their own terms:</p>
          <ul>
            <li>Cloudflare: website hosting, delivery, security, and Turnstile bot protection.</li>
            <li>GoHighLevel: our CRM, lead storage, and text messaging.</li>
          </ul>
          <p>We do not sell personal information.</p>

          <h2 id="when-we-share">When we share information</h2>
          <p>AIRPRO SOLUTIONS shares information only:</p>
          <ul>
            <li>With the service providers listed above.</li>
            <li>When required by law, or to protect rights and safety.</li>
            <li>In a business transfer, such as a merger or sale of the business.</li>
          </ul>
          <p>
            We do not sell personal information. We do not share personal information for cross-context behavioral
            advertising.
          </p>

          <h2 id="california-rights">Your California privacy rights</h2>
          {/* TODO(copy): client/counsel to confirm whether the CCPA applies to AIRPRO SOLUTIONS and whether to state that requests are honored regardless. The wording below is neutral. */}
          <p>If the California Consumer Privacy Act applies to AIRPRO SOLUTIONS, California residents have the right to:</p>
          <ul>
            <li>Know what personal information we collect, use, and share.</li>
            <li>Delete personal information we hold about you.</li>
            <li>Correct inaccurate personal information.</li>
            <li>Opt out of the sale or sharing of personal information.</li>
            <li>Not be discriminated against for using these rights.</li>
          </ul>
          <p>
            To make a request, email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or call{' '}
            <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>. We may need to verify your identity first. An
            authorized agent can submit a request for you.
          </p>
          <p>
            Shine the Light (California Civil Code 1798.83): we do not disclose personal information to third parties
            for their direct marketing.
          </p>

          <h2 id="data-retention">Data retention</h2>
          {/* TODO(copy): client to supply retention periods if they want them stated. */}
          <p>
            We keep information as long as needed for the purposes described in this policy, or as required by law.
          </p>

          <h2 id="security">Security</h2>
          {/* TODO(data): confirm the production domain serves HTTPS only before launch. */}
          <p>
            We use reasonable safeguards to protect information, and this site is delivered over HTTPS through
            Cloudflare. No method of transmission or storage is perfectly secure, so we cannot guarantee absolute
            security.
          </p>

          <h2 id="children">Children</h2>
          <p>
            This site is not directed to children under 13, and we do not knowingly collect their information. If we
            learn that we have, we delete it.
          </p>

          <h2 id="links-to-other-sites">Links to other sites</h2>
          <p>
            Our city and service pages link to official resources and sources. We are not responsible for the privacy
            practices of those sites.
          </p>

          <h2 id="changes">Changes to this policy</h2>
          <p>We may update this policy. The &quot;Last updated&quot; date at the top of this page shows the latest revision.</p>

          <h2 id="contact-us">Contact us</h2>
          {/* TODO(copy): business hours (Mon-Fri 8 AM-6 PM, Sat 9 AM-1 PM, Sun closed; emergency dispatch 24/7) are not
              on the client-approved claims list and site-config.ts says to restore hours only with written client
              approval. Add them here and update the note in site-config.ts once approved. */}
          <p>
            Email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or call{' '}
            <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
