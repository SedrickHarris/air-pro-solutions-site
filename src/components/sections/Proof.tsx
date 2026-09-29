import Link from 'next/link';
import { siteConfig } from '@/content/site-config';

export type ProofStat = { num: string; label: string };

// TODO(data): "background-checked and factory-trained" and "itemized before we touch a tool" are
// claims supplied in the brief; confirm with the client that each is true before launch.
const defaultStats: ProofStat[] = [
  { num: `${siteConfig.rating}★`, label: 'Google rating' },
  { num: String(siteConfig.reviewCount), label: 'Verified reviews' },
  { num: '4', label: 'SoCal regions served' }, // TODO(data): swap for a 24/7 stat only once confirmed
];

export function Proof({
  eyebrow,
  heading = 'HVAC service built around clear answers and reliable work',
  body = 'Every technician is background-checked and factory-trained. Every quote is itemized before we touch a tool. Every job includes a walkthrough of exactly what was done and why.',
  ctaLabel = 'Read our reviews',
  ctaHref = '/reviews/',
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
          <Link className="btn btn-primary" href={ctaHref}>{ctaLabel}</Link>
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
