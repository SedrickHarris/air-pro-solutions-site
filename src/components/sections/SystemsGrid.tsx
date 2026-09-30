import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

// Equipment-capability card grid. Intentionally conservative: no brand names, no "all makes and
// models", no VRF/VRV - see CLAUDE.md "Claims that must not ship".
export function SystemsGrid({
  title,
  eyebrow = 'Equipment',
  intro,
  items,
  alt = false,
}: {
  title: string;
  eyebrow?: string;
  intro?: string;
  items: { name: string; body: string; icon: string; link?: { label: string; href: string } }[];
  alt?: boolean;
}) {
  return (
    <section className={alt ? 'alt' : undefined}>
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
      </div>
    </section>
  );
}
