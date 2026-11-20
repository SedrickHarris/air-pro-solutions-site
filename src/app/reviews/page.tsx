import { PageHeader } from '@/components/ui/PageHeader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ReviewCarousel } from '@/components/sections/ReviewCarousel';
import { ReviewCard } from '@/components/sections/ReviewCard';
import { FinalCta } from '@/components/sections/FinalCta';
import { jsonLd, breadcrumbSchema, webPageSchema } from '@/lib/schema';
import { siteConfig } from '@/content/site-config';
import { getReviews, GOOGLE_REVIEW_URL } from '@/content/reviews';
import type { Review } from '@/content/reviews';
import { getService, publishedServices, serviceHref } from '@/content/services';
import { hubMetadata, utilityTitle } from '@/lib/seo';

// Indexable and in sitemap.ts. Review text, names and dates come from src/content/reviews.ts only.
export const metadata = hubMetadata({
  title: utilityTitle('Customer Reviews'),
  description: 'Read what customers say about AIRPRO SOLUTIONS HVAC repair and installation. Call (323) 776-9047 to schedule service.',
  path: '/reviews/',
});

// Service chip only when the slug resolves to a live, published service page.
function chipFor(r: Review) {
  if (!r.serviceSlug) return undefined;
  const svc = getService(r.serviceSlug);
  if (!svc || !publishedServices.some((s) => s.slug === svc.slug && s.page)) return undefined;
  return { label: svc.name, href: serviceHref(svc.slug) };
}

export default function Page() {
  const reviews = getReviews();
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Reviews' }];
  const url = `${siteConfig.url}/reviews/`;
  // No Review or AggregateRating markup here: the self-hosted reviews are not marked up. Names mirror the visible H1 and crumbs.
  const schema = [
    webPageSchema({ type: 'WebPage', name: 'Customer Reviews', url }),
    breadcrumbSchema(crumbs.map((c) => ({ name: c.name, url: c.href ? `${siteConfig.url}${c.href}` : url }))),
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Breadcrumbs crumbs={crumbs} />
      <PageHeader eyebrow="Reviews" title="Customer Reviews" lede="Reviews customers left on Google about their service with AIRPRO SOLUTIONS.">
        <div className="cta-row">
          <a className="btn btn-primary" href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">Leave a Review</a>
          <a className="btn btn-ghost" href={siteConfig.phoneHref}>Call {siteConfig.phone}</a>
        </div>
      </PageHeader>

      <section>
        <div className="wrap">
          {/* Approved claim, same constants as the homepage trust strip and schema. Never computed from the reviews below. */}
          <div className="review-summary">
            <div><span className="trust-num">{siteConfig.rating} stars</span><span className="trust-label">Google rating</span></div>
            <div><span className="trust-num">{siteConfig.reviewCount}</span><span className="trust-label">Google reviews</span></div>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <ReviewCarousel reviews={reviews} heading="What customers say" label="Customer reviews" />
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>All reviews</h2>
          <div className="review-grid">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} chip={chipFor(r)} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="review-ask">
            <div>
              <h2>Had a good experience?</h2>
              <p>Tell others about your service on Google.</p>
            </div>
            <a className="btn btn-primary" href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">Leave a Review</a>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
