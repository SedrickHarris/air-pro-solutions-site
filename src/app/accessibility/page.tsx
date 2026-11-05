import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { jsonLd, breadcrumbSchema, webPageSchema } from '@/lib/schema';
import { siteConfig } from '@/content/site-config';
import { hubMetadata, utilityTitle } from '@/lib/seo';

// The visible summary under the H1, the meta description and the JSON-LD description are the same string.
// Change all three together.
const DESCRIPTION =
  'How AIRPRO SOLUTIONS works toward an accessible website, what we have done so far, known limitations, and how to reach us if you need help.';
const LAST_UPDATED_ISO = '2026-11-04';
const LAST_UPDATED_TEXT = 'Last updated: November 4, 2026';

export const metadata = hubMetadata({
  title: utilityTitle('Accessibility Statement'),
  description: DESCRIPTION,
  path: '/accessibility/',
});

const sections = [
  { id: 'our-commitment', title: 'Our commitment' },
  { id: 'what-we-have-done', title: 'What we have done' },
  { id: 'known-limitations', title: 'Known limitations' },
  { id: 'other-ways-to-reach-us', title: 'Alternative ways to reach us' },
  { id: 'compatibility', title: 'Compatibility and technologies' },
  { id: 'third-party-content', title: 'Third-party content' },
  { id: 'feedback', title: 'Feedback and requests' },
  { id: 'assessment', title: 'Technical specifications and assessment approach' },
  { id: 'updates', title: 'Updates to this statement' },
];

// TODO(copy): the whole statement is draft copy until client approval.
// TODO(legal): attorney to advise whether to reference the ADA, California law, or complaint contacts. None are mentioned on purpose.
// Never claim conformance, certification, an audit, or legal compliance here. Every item under "What we have done" and
// "Known limitations" comes from the 2026-11-04 audit (axe-core 4.10.2 in headless Chrome against the built site, plus
// source review) and must be re-checked before it is edited. WCAG 2.1 AA is the target because the previous version of
// this page named it; TODO(copy): client or Sirius Systems to confirm 2.1 vs 2.2.
export default function Page() {
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Accessibility Statement' }];
  const url = `${siteConfig.url}/accessibility/`;
  const schema = [
    webPageSchema({ type: 'WebPage', name: 'Accessibility Statement', url, description: DESCRIPTION, dateModified: LAST_UPDATED_ISO }),
    breadcrumbSchema(crumbs.map((c) => ({ name: c.name, url: c.href ? `${siteConfig.url}${c.href}` : url }))),
  ];
  const mail = <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>;
  const tel = <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Breadcrumbs crumbs={crumbs} />
      <PageHeader eyebrow="Accessibility" title="Accessibility Statement" lede={DESCRIPTION} note={LAST_UPDATED_TEXT} />
      <section>
        <div className="wrap prose">
          <nav className="legal-toc" aria-label="Accessibility statement sections">
            <h2>On this page</h2>
            <ol>
              {sections.map((s) => (
                <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
              ))}
            </ol>
          </nav>

          <h2 id="our-commitment">Our commitment</h2>
          <p>
            AIRPRO SOLUTIONS wants {siteConfig.domain} to be usable by as many people as possible, including people who
            use assistive technology or have disabilities.
          </p>
          <p>
            We are working toward the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA as our target. This is a
            goal and an ongoing effort. It is not a claim that the site fully meets that standard.
          </p>

          <h2 id="what-we-have-done">What we have done</h2>
          {/* Each item below was verified in the source or in the built pages on 2026-11-04. Do not add items without checking. */}
          <p>In our review of a sample of pages, we found that the site:</p>
          <ul>
            <li>Sets the page language and gives each page its own title.</li>
            <li>Uses page landmarks (header, navigation, main content, and footer) and one main heading per page.</li>
            <li>Can be used with a keyboard, with a visible outline on the item that has focus.</li>
            <li>Starts every page with a &quot;Skip to main content&quot; link for keyboard users.</li>
            <li>Uses real links and buttons for navigation and actions.</li>
            <li>Labels contact form fields, uses autocomplete hints on the name, phone, and email fields, and shows error messages in text.</li>
            <li>Gives images text descriptions, or hides purely decorative graphics from assistive technology.</li>
            <li>Uses descriptive link text, and phone and email links that open your phone or mail app.</li>
            <li>Turns off its short hover animations if your device is set to reduce motion.</li>
            <li>Fits small screens at normal text size without sideways scrolling on the pages we checked, with the main menu shown as large, well-spaced buttons.</li>
          </ul>

          <h2 id="known-limitations">Known limitations</h2>
          {/* TODO(data): re-run the audit and update this list whenever the site changes. Fixes recommended in the 2026-11-04 audit are listed in the build report. */}
          <p>
            Some parts of the site may not yet meet the target, and we are working to improve them. The issues we know
            about today are:
          </p>
          <ul>
            {/* TODO(data): measured 2026-11-04 at 320 px with text scaled to 150 and 200 percent: the main menu, the top section
                (hero) and the row of trust badges push the page wider than the screen on most pages. Remove this item once fixed and re-scanned. */}
            <li>
              On small screens at larger text sizes (150 and 200 percent), many pages scroll sideways, including the main
              menu and the top section of the page. We are working to fix this.
            </li>
            <li>Some placeholder images marked &quot;Photo pending&quot; are decorative and have no description.</li>
            <li>The map on the contact page is a still image, not an interactive map.</li>
            <li>
              The spam check on the contact form (Cloudflare Turnstile) is a third-party tool that we do not control.
            </li>
            <li>Automated checks have been run on every page, and a manual review covered a sample of pages, so other pages may have problems we have not found.</li>
          </ul>
          <p>We plan to keep improving the site.</p>

          <h2 id="other-ways-to-reach-us">Alternative ways to reach us</h2>
          {/* TODO(copy): business hours are not on the client-approved claims list; add them here only after written client approval (see site-config.ts). */}
          <p>
            If any part of the site or the contact form is hard to use, call {tel} or email {mail}, and we will help
            with service requests directly. 24/7 emergency dispatch is available by phone.
          </p>

          <h2 id="compatibility">Compatibility and technologies</h2>
          {/* TODO(data): client or Sirius Systems to supply tested browser and assistive technology combinations if they want them stated. */}
          <p>
            AIRPRO SOLUTIONS builds this site with HTML, CSS, and JavaScript, and it relies on the accessibility features
            of your browser and any assistive technology you use. We have not published a list of supported browsers or
            assistive technologies.
          </p>

          <h2 id="third-party-content">Third-party content</h2>
          <p>
            We use third-party services, such as hosting, bot protection, and our text messaging provider, and we link to
            outside resources and sources. We do not control their accessibility.
          </p>

          <h2 id="feedback">Feedback and requests</h2>
          {/* TODO(copy): client to confirm a response-time commitment if they want one stated. None is promised here. */}
          <p>
            To report an accessibility problem, or to ask for information in another format, email {mail} or call {tel}.
            It helps if you include:
          </p>
          <ul>
            <li>The page address.</li>
            <li>What went wrong.</li>
            <li>The browser or assistive technology you were using, if you know it.</li>
          </ul>

          <h2 id="assessment">Technical specifications and assessment approach</h2>
          {/* TODO(data): update this section if the client later commissions an independent audit or testing with assistive technology. */}
          <p>
            AIRPRO SOLUTIONS checked this site during the website build with automated checks on every page and a
            manual review of sample pages. The site has not yet been independently audited, and we have not tested it with specific
            screen readers.
          </p>

          <h2 id="updates">Updates to this statement</h2>
          <p>
            The &quot;Last updated&quot; date at the top of this page shows the latest revision. We review this
            statement when the site changes significantly. See also our <Link href="/privacy/">Privacy Policy</Link> and{' '}
            <Link href="/terms/">Terms and Conditions</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
