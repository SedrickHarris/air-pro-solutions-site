import Link from 'next/link';
import { siteConfig } from '@/content/site-config';

export type ProofStat = { num: string; label: string };

// Claims here must stay on the client-approved list (see CLAUDE.md). "factory-trained", "itemized"
// quotes and "walkthrough" promises were removed 2026-11-04 pending written client approval.
const defaultStats: ProofStat[] = [
  { num: `${siteConfig.rating}★`, label: 'Google rating' },
  { num: String(siteConfig.reviewCount), label: 'Verified reviews' },
  { num: '4', label: 'SoCal regions served' }, // TODO(data): swap for a 24/7 stat only once confirmed
];

export function Proof({
  eyebrow,
  heading = 'HVAC service built around clear answers and reliable work',
  body = 'Every technician is background-checked, and AIRPRO SOLUTIONS is licensed, bonded & insured in California.',
  ctaLabel,
  ctaHref,
  stats = defaultStats,
}: {
  eyebrow?: string;
  heading?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  stats?: ProofStat[];
}) {
  return (
    <section className="proof">
      <div className="wrap proof-grid">
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2>{heading}</h2>
          <p>{body}</p>
          {ctaHref && ctaLabel && <Link className="btn btn-primary" href={ctaHref}>{ctaLabel}</Link>}
        </div>
        <div className="proof-stats">
          {stats.map((s) => (
            <div key={s.label}>
              <span className="trust-num">{s.num}</span>
              <span className="trust-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
