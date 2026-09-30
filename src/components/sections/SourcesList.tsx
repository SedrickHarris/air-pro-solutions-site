// Small government/standards source list. Never link to or name a competitor - see CLAUDE.md
// "Claims that must not ship". `columns` defaults to 1 (existing ac-repair layout); pages with a
// longer source list (e.g. ac-installation) can opt into 2 columns on desktop, collapsing to 1
// under 920px like every other multi-column grid on the site.
export function SourcesList({ items, columns = 1 }: { items: { label: string; url: string }[]; columns?: 1 | 2 }) {
  return (
    <section className="alt">
      <div className="wrap">
        <h2>Sources</h2>
        <ul className={columns === 2 ? 'sources-list sources-list-2col' : 'sources-list'}>
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
