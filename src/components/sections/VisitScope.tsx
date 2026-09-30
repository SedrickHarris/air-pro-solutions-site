import { Icon } from '@/components/ui/Icon';

// Two-column "what is included / what can add to the cost" list. No dollar figures - see
// CLAUDE.md "Claims that must not ship".
export function VisitScope({
  title,
  eyebrow = 'What to expect',
  includesTitle,
  includes,
  extraTitle,
  extra,
  extraNote,
  // Icon overrides for each column, added so /furnace-installation/ can reuse this component for its
  // "Before you sign" proposal checklist (a put-in-writing / questions-to-ask pair, not an
  // includes/cost-extras pair). Default to the original check/dollar icons so every existing caller
  // (ac-repair, ac-installation, ac-maintenance, heating-repair) is unaffected.
  includesIcon = 'check',
  extraIcon = 'dollar',
}: {
  title: string;
  eyebrow?: string;
  includesTitle: string;
  includes: string[];
  extraTitle: string;
  extra: string[];
  extraNote?: string;
  includesIcon?: string;
  extraIcon?: string;
}) {
  return (
    <section className="alt">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <div className="visit-scope">
          <div className="visit-scope-col">
            <h3>{includesTitle}</h3>
            <ul className="visit-scope-list">
              {includes.map((item) => (
                <li key={item}>
                  <Icon name={includesIcon} size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="visit-scope-col">
            <h3>{extraTitle}</h3>
            <ul className="visit-scope-list">
              {extra.map((item) => (
                <li key={item}>
                  <Icon name={extraIcon} size={16} />
                  {item}
                </li>
              ))}
            </ul>
            {extraNote && <p className="visit-scope-note">{extraNote}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
