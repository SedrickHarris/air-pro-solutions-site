export function ProcessList({
  steps,
  eyebrow = 'How it works',
  title,
  alt = false,
}: {
  steps: { title: string; body: string }[];
  eyebrow?: string;
  title: string;
  alt?: boolean;
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
      </div>
    </section>
  );
}
