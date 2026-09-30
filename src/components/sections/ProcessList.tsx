export function ProcessList({
  steps,
  eyebrow = 'How it works',
  title,
  alt = false,
  // Optional lead paragraph rendered ABOVE the numbered list (e.g. /emergency-hvac/'s "This is the
  // general sequence for an emergency call, not a promise about one specific visit" line). Distinct
  // from `note` below, which renders after the list. Undefined for every other caller, so ac-repair/
  // ac-installation/ac-maintenance/heating-repair/furnace-installation are unaffected.
  intro,
  // Optional closing paragraph rendered below the numbered list (e.g. /furnace-installation/'s
  // "a straightforward replacement may be completed in a day..." timing note). Undefined for every
  // other caller, so ac-repair/ac-installation/ac-maintenance/heating-repair are unaffected.
  note,
  // Optional desktop column-count override (e.g. AC Maintenance's 6-step process shown as 2x3
  // instead of the default 5-wide grid, which would wrap unevenly for a 6-item list). Undefined for
  // every other caller, so their layout is unchanged.
  columns,
}: {
  steps: { title: string; body: string }[];
  eyebrow?: string;
  title: string;
  alt?: boolean;
  intro?: string;
  note?: string;
  columns?: 2 | 3 | 5;
}) {
  return (
    <section className={alt ? 'alt' : undefined}>
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {intro && <p className="compare-intro">{intro}</p>}
        <ol className={columns ? `process-list process-list-${columns}` : 'process-list'}>
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="process-step-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        {note && <p className="table-note">{note}</p>}
      </div>
    </section>
  );
}
