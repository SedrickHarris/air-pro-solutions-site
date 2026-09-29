import Link from 'next/link';

export type Crumb = { name: string; href?: string }; // last item has no href (current page)

// Visible trail. Feed the same `crumbs` array (built into absolute URLs) to breadcrumbSchema()
// so the JSON-LD matches this exactly.
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <div className="wrap">
        <ol>
          {crumbs.map((c, i) => (
            <li key={c.name}>
              {c.href ? <Link href={c.href}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
              {i < crumbs.length - 1 && <span aria-hidden="true"> / </span>}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
