import type { ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';

export type CompareGroup = { heading: string; icon: string; items: string[] };

export function CompareTable({
  intro,
  groups,
  note,
  afterNote,
  eyebrow = 'Not sure which you need?',
  title,
  alt = true,
}: {
  intro?: string;
  groups: CompareGroup[];
  note?: string;
  afterNote?: ReactNode; // extra content rendered after `note` (e.g. a link to a related page)
  eyebrow?: string;
  title: string;
  alt?: boolean;
}) {
  return (
    <section className={alt ? 'alt' : undefined}>
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {intro && <p className="compare-intro">{intro}</p>}
        <div className="compare-groups">
          {groups.map((g) => (
            <div className="compare-group" key={g.heading}>
              <h3>
                <Icon name={g.icon} size={20} />
                {g.heading}
              </h3>
              <ul>
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {note && <p className="compare-note">{note}</p>}
        {afterNote}
      </div>
    </section>
  );
}
