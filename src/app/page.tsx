import { Hero } from '@/components/sections/Hero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { DecisionGrid } from '@/components/sections/DecisionGrid';
import { ResCommSplit } from '@/components/sections/ResCommSplit';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { RegionGrid } from '@/components/sections/RegionGrid';
import { Proof } from '@/components/sections/Proof';
import { RebateStrip } from '@/components/sections/RebateStrip';
import { FaqList } from '@/components/sections/FaqList';
import { FinalCta } from '@/components/sections/FinalCta';
import { generalFaqs } from '@/content/faq';
import { faqSchema, jsonLd, organizationSchema } from '@/lib/schema';
import { homeMetadata, homeTitle } from '@/lib/seo';

export const metadata = homeMetadata({
  // Per docs/metadata-rules.md. The layout title template does not apply to the root page, so the brand is explicit.
  title: homeTitle(),
  // Only approved claims (licensed, 4.8-star rated); "insured" and "same-day" are not yet confirmed.
  description:
    'HVAC repair, installation, and maintenance for homes and businesses across LA County, South Bay, Orange County, and the Inland Empire. Licensed and 4.8-star rated.',
  path: '/',
});

export default function Page() {
  // FAQ JSON-LD and the visible FaqList both read generalFaqs, so they match word for word.
  const schema = [organizationSchema(), faqSchema(generalFaqs)];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Hero />
      <TrustStrip />
      <DecisionGrid />
      <ResCommSplit />
      <ServicesGrid />
      <RegionGrid />
      <Proof />
      <RebateStrip />
      <FaqList faqs={generalFaqs} title="HVAC Questions for Los Angeles Area Homes and Businesses" />
      <FinalCta />
    </>
  );
}
