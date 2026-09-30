import type { ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';

export function AppliesRow({
  items,
  eyebrow = "Who this is for",
  title,
  alt = false,
  paragraph,
}: {
  items: { label: string; icon: string }[];
  eyebrow?: string;
  title: string;
  alt?: boolean;
  paragraph?: ReactNode; // optional copy (and links) rendered below the chip row
}) {
  return (
    <section className={alt ? 'alt' : undefined}>
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <ul className="applies-row">
          {items.map((i) => (
            <li key={i.label}>
              <Icon name={i.icon} size={20} />
              {i.label}
            </li>
          ))}
        </ul>
        {paragraph && <p className="applies-row-note">{paragraph}</p>}
      </div>
    </section>
  );
}
