import Link from 'next/link';

export type Pill = { label: string; href?: string }; // no href = plain text, no matching page yet

// Small rounded tags. Linked pills get an amber border on hover; unlinked pills render a plain <span>.
export function KeywordPills({ pills, label }: { pills: Pill[]; label?: string }) {
  return (
    <ul className="pill-list" aria-label={label}>
      {pills.map((p) => (
        <li key={p.label}>
          {p.href ? <Link className="pill pill-link" href={p.href}>{p.label}</Link> : <span className="pill">{p.label}</span>}
        </li>
      ))}
    </ul>
  );
}
