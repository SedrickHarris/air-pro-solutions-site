// Small government/standards source list. Never link to or name a competitor - see CLAUDE.md
// "Claims that must not ship".
export function SourcesList({ items }: { items: { label: string; url: string }[] }) {
  return (
    <section className="alt">
      <div className="wrap">
        <h2>Sources</h2>
        <ul className="sources-list">
          {items.map((s) => (
            <li key={s.url}>
              <a href={s.url} rel="noopener">{s.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
