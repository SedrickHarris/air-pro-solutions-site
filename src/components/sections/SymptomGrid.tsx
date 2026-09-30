import type { ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';

export function SymptomGrid({
  items,
  eyebrow = 'Signs you need this',
  title,
  intro,
  note,
  alt = true,
  // Defaults to "symptoms" so a decision-grid card elsewhere on the same page (e.g. /ductwork/) can
  // link to "#symptoms" without every caller having to opt in. Every existing page already renders
  // exactly one SymptomGrid, so this default never produces a duplicate id.
  id = 'symptoms',
}: {
  items: { lead: string; detail: string }[];
  eyebrow?: string;
  title: string;
  intro?: string; // optional lead paragraph rendered between the h2 and the card grid
  note?: ReactNode; // optional line rendered below the card grid (e.g. a link to a related page)
  alt?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={alt ? 'alt' : undefined}>
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {intro && <p className="compare-intro">{intro}</p>}
        <div className="symptom-grid">
          {items.map((s) => (
            <div className="symptom-card" key={s.lead}>
              <Icon name="alert" size={18} />
              <p>
                <strong>{s.lead}</strong> {s.detail}
              </p>
            </div>
          ))}
        </div>
        {note && <p className="compare-note">{note}</p>}
      </div>
    </section>
  );
}
