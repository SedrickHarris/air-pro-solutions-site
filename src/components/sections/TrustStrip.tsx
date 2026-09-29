import { siteConfig } from '@/content/site-config';

export type TrustStat = { num: string; label: string };

// Dropped the unconfirmed "30+ years combined field experience" stat.
const defaultStats: TrustStat[] = [
  { num: `${siteConfig.rating}★`, label: `average rating, ${siteConfig.reviewCount} reviews` },
  { num: 'Licensed', label: 'HVAC technicians' },
  { num: '4', label: 'SoCal regions served' },
  { num: 'C-20', label: 'California licensed & bonded' },
];

export function TrustStrip({ stats = defaultStats }: { stats?: TrustStat[] }) {
  return (
    <div className="trust-strip">
      <div className="wrap trust-inner">
        {stats.map((s) => (
          <div className="trust-item" key={s.num + s.label}>
            <span className="trust-num">{s.num}</span>
            <span className="trust-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
