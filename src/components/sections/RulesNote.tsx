import type { ReactNode } from 'react';

// Three short licensing/permit/energy-code cards. Plain text only - no "we pull permits" or
// SEER2-minimum claims; see CLAUDE.md "Claims that must not ship".
//
// Extended for /indoor-air-quality/: `items[].body` widened from `string` to `ReactNode` (every
// existing string caller still satisfies ReactNode, so ac-repair/ac-installation/ac-maintenance/
// heating-repair are unaffected) so the "smoke plan" section can embed one inline link inside a
// bullet's body. `intro`/`closing`/`id` are new optional slots (lead paragraph before the cards, a
// closing note after them, and an anchor id for internal linking) - all unset by default.
export function RulesNote({
  title,
  eyebrow = 'Good to know',
  intro,
  items,
  closing,
  alt = false,
  id,
}: {
  title: string;
  eyebrow?: string;
  intro?: ReactNode;
  items: { title: string; body: ReactNode }[];
  closing?: ReactNode;
  alt?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={alt ? 'alt' : undefined}>
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {intro && <p className="compare-intro">{intro}</p>}
        <div className="rules-grid">
          {items.map((it) => (
            <div className="panel rules-card" key={it.title}>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </div>
          ))}
        </div>
        {closing && <p className="table-note">{closing}</p>}
      </div>
    </section>
  );
}
