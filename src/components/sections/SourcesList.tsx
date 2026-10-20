// Small government/standards source list. Never link to or name a competitor - see CLAUDE.md
// "Claims that must not ship". `columns` defaults to 1 (existing ac-repair layout); pages with a
// longer source list (e.g. ac-installation) can opt into 2 columns on desktop, collapsing to 1
// under 920px like every other multi-column grid on the site.
//
// `variant="details"` returns just a collapsed <details> row (no <section>/.wrap) for placing inside
// another section, e.g. under the FAQ grid on migrated service pages. Items carrying a `group` are
// listed under small group labels (first-seen order, ungrouped items last under "More references");
// when no item has a group the links render as one flat grid.
type Source = { label: string; url: string; group?: string };

function ExternalLink({ item }: { item: Source }) {
  // The last word and the icon share a nowrap span so the icon never wraps alone onto its own line.
  const cut = item.label.lastIndexOf(' ');
  const head = cut > 0 ? item.label.slice(0, cut + 1) : '';
  const tail = cut > 0 ? item.label.slice(cut + 1) : item.label;
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer">
      {head}
      <span className="ext-tail">
        {tail}
        <svg className="ext-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 4h6v6" />
          <path d="M20 4l-9 9" />
          <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
        </svg>
      </span>
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}

function groupSources(items: Source[]): { label: string | null; items: Source[] }[] {
  if (!items.some((i) => i.group)) return [{ label: null, items }];
  const order: string[] = [];
  const byGroup = new Map<string, Source[]>();
  const rest: Source[] = [];
  for (const it of items) {
    if (!it.group) {
      rest.push(it);
      continue;
    }
    if (!byGroup.has(it.group)) {
      byGroup.set(it.group, []);
      order.push(it.group);
    }
    byGroup.get(it.group)!.push(it);
  }
  const groups = order.map((g) => ({ label: g as string | null, items: byGroup.get(g)! }));
  // TODO(copy): "More references" label for ungrouped sources, confirm on review.
  if (rest.length) groups.push({ label: 'More references', items: rest });
  return groups;
}

export function SourcesList({
  items,
  columns = 1,
  // Optional eyebrow above the "Sources" heading (e.g. /services/furnace-installation/'s "References").
  // Undefined for every other caller, so their layout is unchanged.
  eyebrow,
  // Section background. Defaults to the alt band; pass false when the section above is already alt
  // (e.g. FaqList) so the page keeps its alternating rhythm.
  alt = true,
  variant = 'section',
}: {
  items: Source[];
  columns?: 1 | 2;
  eyebrow?: string;
  alt?: boolean;
  variant?: 'section' | 'details';
}) {
  if (variant === 'details') {
    const groups = groupSources(items);
    return (
      <details className="sources-details">
        {/* TODO(copy): summary label, confirm on review. The count is the sources array length. */}
        <summary>Sources and references ({items.length})</summary>
        {groups.length === 1 && groups[0].label === null ? (
          <ul className="sources-grid sources-flat">
            {items.map((s) => (
              <li key={s.url}><ExternalLink item={s} /></li>
            ))}
          </ul>
        ) : (
          <div className="sources-grid">
            {groups.map((g) => (
              <div className="sources-group" key={g.label}>
                <h3>{g.label}</h3>
                <ul>
                  {g.items.map((s) => (
                    <li key={s.url}><ExternalLink item={s} /></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </details>
    );
  }

  return (
    <section className={alt ? 'alt' : undefined}>
      <div className="wrap">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>Sources</h2>
        <ul className={columns === 2 ? 'sources-list sources-list-2col' : 'sources-list'}>
          {items.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
