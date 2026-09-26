import { PageHeader } from '@/components/ui/PageHeader';
import { generalFaqs } from '@/content/faq';
import { faqSchema, jsonLd, breadcrumbSchema } from '@/lib/schema';
import { hubMetadata } from '@/lib/seo';
import { siteConfig } from '@/content/site-config';

export const metadata = hubMetadata({
  title: 'HVAC FAQ',
  description: 'Straight answers to common heating and cooling questions.', // TODO(copy)
  path: '/faq/',
});

export default function Page() {
  // Same generalFaqs array feeds the visible list and the JSON-LD, so they always match.
  const schema = [
    faqSchema(generalFaqs),
    breadcrumbSchema([
      { name: 'Home', url: `${siteConfig.url}/` },
      { name: 'FAQ', url: `${siteConfig.url}/faq/` },
    ]),
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <PageHeader eyebrow="FAQ" title="HVAC FAQ" lede="Straight answers to common heating and cooling questions." />
      <section>
        <div className="wrap faq-grid">
          {generalFaqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
