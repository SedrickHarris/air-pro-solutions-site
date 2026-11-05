import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { jsonLd, breadcrumbSchema, webPageSchema } from '@/lib/schema';
import { siteConfig } from '@/content/site-config';
import { hubMetadata, utilityTitle } from '@/lib/seo';
import { CONSENT_NON_MARKETING, CONSENT_MARKETING } from '@/content/sms-consent';

// The visible summary under the H1, the meta description and the JSON-LD description are the same string.
// Change all three together.
const DESCRIPTION =
  'The terms for using the AIRPRO SOLUTIONS website and text messaging program, including scheduling, acceptable use, and how service agreements apply.';
const LAST_UPDATED_ISO = '2026-11-04';
const LAST_UPDATED_TEXT = 'Last updated: November 4, 2026';

export const metadata = hubMetadata({
  title: utilityTitle('Terms and Conditions'),
  description: DESCRIPTION,
  path: '/terms/',
});

const sections = [
  { id: 'agreement-and-scope', title: 'Agreement and scope' },
  { id: 'about-our-services', title: 'About our services' },
  { id: 'requests-and-availability', title: 'Requests, scheduling, and availability' },
  { id: 'pricing-and-agreements', title: 'Estimates, pricing, payment, cancellations, and warranties' },
  { id: 'customer-responsibilities', title: 'Customer responsibilities' },
  { id: 'text-messaging', title: 'Text messaging terms (SMS)' },
  { id: 'acceptable-use', title: 'Acceptable use of the site' },
  { id: 'website-content', title: 'Website content and accuracy' },
  { id: 'intellectual-property', title: 'Intellectual property' },
  { id: 'third-party-links', title: 'Third-party links and services' },
  { id: 'disclaimers', title: 'Disclaimers' },
  { id: 'limitation-of-liability', title: 'Limitation of liability' },
  { id: 'governing-law', title: 'Governing law and venue' },
  { id: 'changes', title: 'Changes to these terms' },
  { id: 'severability', title: 'Severability and entire agreement' },
  { id: 'contact-us', title: 'Contact us' },
];

// TODO(copy): the whole page is draft copy until client approval AND attorney review. TODO(legal): attorney review before launch.
// Rules for this page: no address, legal entity name, payment methods, price, fee, cancellation or warranty specifics.
// Availability claims must not be stronger than the rest of the site (see "Approved claims" in CLAUDE.md).
export default function Page() {
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Terms and Conditions' }];
  const url = `${siteConfig.url}/terms/`;
  const schema = [
    webPageSchema({ type: 'WebPage', name: 'Terms and Conditions', url, description: DESCRIPTION, dateModified: LAST_UPDATED_ISO }),
    breadcrumbSchema(crumbs.map((c) => ({ name: c.name, url: c.href ? `${siteConfig.url}${c.href}` : url }))),
  ];
  const mail = <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>;
  const tel = <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Breadcrumbs crumbs={crumbs} />
      <PageHeader eyebrow="Legal" title="Terms and Conditions" lede={DESCRIPTION} note={LAST_UPDATED_TEXT} />
      <section>
        <div className="wrap prose">
          <nav className="legal-toc" aria-label="Terms and conditions sections">
            <h2>On this page</h2>
            <ol>
              {sections.map((s) => (
                <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
              ))}
            </ol>
          </nav>

          <h2 id="agreement-and-scope">Agreement and scope</h2>
          <p>
            These terms govern your use of {siteConfig.domain} and the AIRPRO SOLUTIONS text messaging program. By using
            the site you agree to them.
          </p>
          <p>
            They apply to the website only. Actual HVAC work is governed by a separate written service agreement between
            you and AIRPRO SOLUTIONS. If there is a conflict, the signed service agreement controls for that work.
          </p>
          <p>
            Please also read our <Link href="/privacy/">Privacy Policy</Link>.
          </p>

          <h2 id="about-our-services">About our services</h2>
          <p>
            AIRPRO SOLUTIONS provides residential and commercial HVAC services in Los Angeles County, the South Bay,
            Orange County, and the Inland Empire, California. Our services include:
          </p>
          <ul>
            <li>AC repair, AC installation, and AC maintenance</li>
            <li>Furnace installation and heating repair</li>
            <li>Heat pump services and ductless mini-split</li>
            <li>Ductwork and indoor air quality</li>
            <li>Emergency HVAC</li>
          </ul>
          <p>
            We are a licensed California contractor, license numbers #{siteConfig.licenses[0]} and #{siteConfig.licenses[1]}.
            We may decline requests outside our service area.
          </p>

          <h2 id="requests-and-availability">Requests, scheduling, and availability</h2>
          {/* TODO(copy): business hours (Mon-Fri 8 AM-6 PM, Sat 9 AM-1 PM, Sun closed) are not on the client-approved claims list and
              site-config.ts says to restore hours only with written client approval. Add a sentence listing them here and in
              "Contact us" once approved. Keep the same-day wording no stronger than the rest of the site ("typical, subject to capacity"). */}
          <p>
            Submitting the contact form or calling us is a request for service. It is not a booking or a guarantee.
          </p>
          <p>
            Scheduling depends on technician availability, your location, and the nature of the problem. Same-day service
            and 24/7 emergency dispatch are offered where availability allows and are not guaranteed for every request.
          </p>
          <p>
            Arrival times are estimates and can change because of traffic, weather, or earlier jobs.
          </p>

          <h2 id="pricing-and-agreements">Estimates, pricing, payment, cancellations, and warranties</h2>
          {/* TODO(copy): client to confirm this general approach, and to supply specifics if they want them stated here later.
              Do not add numbers, fees or policies on this page. */}
          <p>
            Pricing, payment terms, cancellation and rescheduling terms, and any warranties are set out in the written
            service agreement or proposal for your specific job, not on this website.
          </p>
          <p>Nothing on the site is a price quote, offer, or warranty unless it is stated in a signed agreement.</p>

          <h2 id="customer-responsibilities">Customer responsibilities</h2>
          {/* TODO(copy): client to confirm this section. */}
          <p>To help us serve you safely, please:</p>
          <ul>
            <li>Give us accurate information.</li>
            <li>Provide safe and reasonable access to the property and equipment.</li>
            <li>Make sure an adult authorized to approve work is available where required.</li>
            <li>Tell us about hazards, pets, or conditions we should know about.</li>
          </ul>

          <h2 id="text-messaging">Text messaging terms (SMS)</h2>
          {/* The two quoted consents come from src/content/sms-consent.ts, the same strings the contact form renders. */}
          <p>
            AIRPRO SOLUTIONS texts are sent only if you agree. The contact form has two separate, optional consents, and
            neither is required to send the form:
          </p>
          <p>Non-marketing texts about appointments, service updates, and account notifications:</p>
          <blockquote>{CONSENT_NON_MARKETING}</blockquote>
          <p>Marketing texts about special offers, discounts, and promotions:</p>
          <blockquote>{CONSENT_MARKETING}</blockquote>
          <ul>
            <li>
              Message frequency may vary. Message and data rates may apply. Reply STOP to opt out. Reply HELP for help.
              You can also contact us at {mail} or {tel}.
            </li>
            <li>Consent to marketing texts is not a condition of purchasing any service.</li>
            <li>
              Opting out of marketing texts does not stop non-marketing texts you agreed to, and the reverse also
              applies.
            </li>
            <li>Carriers are not liable for delayed or undelivered messages.</li>
            <li>
              Mobile opt-in data and text messaging consent are not shared with third parties or affiliates for their
              marketing or promotional purposes. See our <Link href="/privacy/">Privacy Policy</Link>.
            </li>
            <li>Texts are sent through our messaging provider, GoHighLevel.</li>
          </ul>

          <h2 id="acceptable-use">Acceptable use of the site</h2>
          <p>When you use this site, you agree not to:</p>
          <ul>
            <li>Use it for anything unlawful.</li>
            <li>Disrupt, probe, or scrape it beyond normal use.</li>
            <li>Submit false or spam requests.</li>
            <li>Bypass security controls, such as bot protection.</li>
            <li>Use the contact form to send unsolicited marketing.</li>
          </ul>

          <h2 id="website-content">Website content and accuracy</h2>
          {/* TODO(copy): client approval of site claims remains pending for some pages. */}
          <p>
            Content on this site is for general information. It is not a substitute for a professional inspection or
            diagnosis.
          </p>
          <p>
            Local information on city and service pages, such as permit offices, utility details, and regional notes, is
            general reference. It may change, and it is not legal or regulatory advice.
          </p>
          <p>We work to keep the site accurate, but we do not guarantee that it is complete or current.</p>

          <h2 id="intellectual-property">Intellectual property</h2>
          {/* TODO(copy): client to confirm which imagery it owns or licenses. Do not claim rights beyond what the client holds. */}
          <p>
            The AIRPRO SOLUTIONS name, logo, site text, design, and images belong to us or our licensors. You may view and
            print pages for personal or business use related to our services. You may not copy, republish, or sell the
            content without our written permission.
          </p>

          <h2 id="third-party-links">Third-party links and services</h2>
          {/* TODO(data): add analytics to the list below if and when Google Analytics ships (none is installed today). */}
          <p>
            The site links to outside resources and sources, and it uses third-party services such as hosting, bot
            protection, and messaging. We do not control them and are not responsible for their content or practices.
          </p>

          <h2 id="disclaimers">Disclaimers</h2>
          {/* TODO(copy): attorney review recommended for this section. */}
          <p>
            To the extent permitted by law, the site is provided &quot;as is&quot; and &quot;as available&quot; without
            warranties of any kind.
          </p>

          <h2 id="limitation-of-liability">Limitation of liability</h2>
          {/* TODO(copy): attorney review required for this section. Do not add dollar caps.
              Indemnification clause intentionally omitted pending attorney guidance. */}
          <p>
            To the extent permitted by California law, AIRPRO SOLUTIONS is not liable for indirect, incidental, or
            consequential damages from your use of the website.
          </p>
          <p>
            Nothing here limits liability that cannot be limited under law, and nothing here limits the terms of a signed
            service agreement.
          </p>

          <h2 id="governing-law">Governing law and venue</h2>
          {/* TODO(copy): client to confirm the dispute process with their attorney. No arbitration clause or class action waiver by design. */}
          <p>
            These terms are governed by the laws of the State of California. Any dispute arising from them or from use of
            the site will be brought in the state or federal courts located in Los Angeles County, California.
          </p>

          <h2 id="changes">Changes to these terms</h2>
          <p>
            We may update these terms. The &quot;Last updated&quot; date at the top of this page shows the latest
            revision. Continued use of the site after changes means you accept them.
          </p>

          <h2 id="severability">Severability and entire agreement</h2>
          <p>
            If a part of these terms is unenforceable, the rest stays in effect. These terms, together with the{' '}
            <Link href="/privacy/">Privacy Policy</Link>, are the full agreement for use of the site. They do not cover
            any service agreement.
          </p>

          <h2 id="contact-us">Contact us</h2>
          {/* TODO(copy): add business hours here once the client approves them (see the note in the scheduling section). */}
          <p>
            Email {mail} or call {tel}.
          </p>
        </div>
      </section>
    </>
  );
}
