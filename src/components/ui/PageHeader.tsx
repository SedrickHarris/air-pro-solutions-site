export function PageHeader({ eyebrow, title, lede, note }: { eyebrow?: string; title: string; lede?: string; note?: string }) {
  return (
    <section className="page-head">
      <div className="wrap">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {note && <p className="page-head-note">{note}</p>}
      </div>
    </section>
  );
}
