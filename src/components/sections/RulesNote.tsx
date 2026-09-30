// Three short licensing/permit/energy-code cards. Plain text only - no "we pull permits" or
// SEER2-minimum claims; see CLAUDE.md "Claims that must not ship".
export function RulesNote({
  title,
  eyebrow = 'Good to know',
  items,
}: {
  title: string;
  eyebrow?: string;
  items: { title: string; body: string }[];
}) {
  return (
    <section>
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <div className="rules-grid">
          {items.map((it) => (
            <div className="panel rules-card" key={it.title}>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
