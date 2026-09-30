import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';

// Equipment-capability card grid. Intentionally conservative: no brand names, no "all makes and
// models", no VRF/VRV - see CLAUDE.md "Claims that must not ship".
export function SystemsGrid({
  title,
  eyebrow = 'Equipment',
  intro,
  items,
  alt = false,
  // Anchor id and a trailing note line, added for /ductless-mini-split/, which reuses this component
  // for two card grids ("Where it fits" and "Systems we service") - the latter needs both an in-page
  // jump target (`href="#systems"` from the DecisionGrid) and a closing note with a link to the
  // commercial-hvac page for rooftop/packaged equipment. Also used by /indoor-air-quality/'s
  // "#filtration" anchor. Optional so every other caller is unaffected.
  id,
  note,
}: {
  title: string;
  eyebrow?: string;
  intro?: string;
  items: { name: string; body: string; icon: string; link?: { label: string; href: string } }[];
  alt?: boolean;
  id?: string;
  note?: ReactNode;
}) {
  return (
    <section id={id} className={alt ? 'alt' : undefined}>
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {intro && <p className="compare-intro">{intro}</p>}
        <div className="systems-grid">
          {items.map((s) => (
            <div className="systems-card" key={s.name}>
              <span className="icon-chip"><Icon name={s.icon} size={20} /></span>
              <h3>{s.name}</h3>
              <p>{s.body}</p>
              {s.link && <Link className="link" href={s.link.href}>{s.link.label}</Link>}
            </div>
          ))}
        </div>
        {note && <p className="compare-note">{note}</p>}
      </div>
    </section>
  );
}
