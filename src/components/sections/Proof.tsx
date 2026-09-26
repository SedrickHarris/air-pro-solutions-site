import Link from 'next/link';
import { siteConfig } from '@/content/site-config';

// TODO(data): "background-checked and factory-trained" and "itemized before we touch a tool" are
// claims supplied in the brief; confirm with the client that each is true before launch.
const stats = [
  { num: `${siteConfig.rating}★`, label: 'Google rating' },
  { num: String(siteConfig.reviewCount), label: 'Verified reviews' },
  { num: '4', label: 'SoCal regions served' }, // TODO(data): swap for a 24/7 stat only once confirmed
];

export function Proof() {
  return (
    <section className="proof">
      <div className="wrap proof-grid">
        <div>
          <h2>HVAC service built around clear answers and reliable work</h2>
          <p>
            Every technician is background-checked and factory-trained. Every quote is itemized before we touch a
            tool. Every job includes a walkthrough of exactly what was done and why.
          </p>
          <Link className="btn btn-primary" href="/reviews/">Read our reviews</Link>
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
