export function ProcessList({
  steps,
  eyebrow = 'How it works',
  title,
  alt = false,
  // Optional closing paragraph rendered below the numbered list (e.g. /furnace-installation/'s
  // "a straightforward replacement may be completed in a day..." timing note). Undefined for every
  // other caller, so ac-repair/ac-installation/ac-maintenance/heating-repair are unaffected.
  note,
}: {
  steps: { title: string; body: string }[];
  eyebrow?: string;
  title: string;
  alt?: boolean;
  note?: string;
}) {
  return (
    <section className={alt ? 'alt' : undefined}>
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <ol className="process-list">
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
