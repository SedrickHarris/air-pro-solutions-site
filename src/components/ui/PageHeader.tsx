import type { ReactNode } from 'react';

export function PageHeader({ eyebrow, title, lede, note, children }: { eyebrow?: string; title: string; lede?: string; note?: string; children?: ReactNode }) {
  return (
    <section className="page-head">
      <div className="wrap">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {note && <p className="page-head-note">{note}</p>}
        {children}
      </div>
    </section>
  );
}
