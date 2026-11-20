import Link from 'next/link';
import type { Review } from '@/content/reviews';

// Shared by the carousel (clamped) and the /reviews/ grid (full text). No imports from services.ts here: this file is
// bundled into the client carousel, so the service chip is passed in by the server page instead.
export const REVIEW_CLAMP_CHARS = 220; // text longer than this gets a "Read full review" link in the clamped card

export function Stars() {
  return (
    <svg className="review-stars" viewBox="0 0 100 18" width="100" height="18" role="img" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} transform={`translate(${i * 20} 0)`} d="M9 .8l2.5 5.7 6.2.6-4.7 4.1 1.4 6.1L9 14.1 3.6 17.3 5 11.2.3 7.1l6.2-.6z" fill="currentColor" />
      ))}
    </svg>
  );
}

export function ReviewCard({
  review,
  clamp = false,
  group,
  chip,
}: {
  review: Review;
  clamp?: boolean;
  group?: { index: number; total: number };
  chip?: { label: string; href: string };
}) {
  const long = review.text.length > REVIEW_CLAMP_CHARS;
  return (
    <article
      className={clamp ? 'review-card review-card-clamp' : 'review-card'}
      id={clamp ? undefined : review.id}
      {...(group ? { role: 'group', 'aria-roledescription': 'slide', 'aria-label': `${group.index} of ${group.total}` } : {})}
    >
      <Stars />
      <blockquote className="review-text" lang={review.lang}>{review.text}</blockquote>
      {clamp && long && (
        <Link className="link review-more" href={`/reviews/#${review.id}`}>Read full review</Link>
      )}
      <p className="review-meta">
        <span className="review-name">{review.name}</span>
        {review.date && <span className="review-date">{review.date}</span>}
      </p>
      <p className="review-source">
        Google review
        {chip && <> · <Link className="chip-link review-chip" href={chip.href}>{chip.label}</Link></>}
      </p>
    </article>
  );
}
