import { renderBold } from '@/lib/markdown';
import { SourceLinks } from '@/components/ui/SourceLinks';

// "Southern California band" for a migrated service page: the dark local-knowledge layout with the
// per-region copy on the left and one verified fact card on the right. Reuses the LocalKnowledge
// classes so the city and service pages share one band design (see docs/local-knowledge-balance.md).
export function ServiceLocalBand({
  eyebrow,
  title,
  intro,
  paragraphs,
  card,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  paragraphs: string[]; // **bold** markers allowed, e.g. a region name lead-in
  card: {
    heading: string;
    rows: { label: string; value: string }[];
    sources: { label: string; url: string }[];
  };
}) {
  return (
    <section className="local-knowledge-dark">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <div className="local-grid">
          <div className="local-copy">
            {intro && <p>{intro}</p>}
            {paragraphs.map((p, i) => (
              <p key={i}>{renderBold(p)}</p>
            ))}
          </div>
          <div className="nbhd-card">
            <div className="lc">
              <h3>{card.heading}</h3>
              <dl className="lc-rows">
                {card.rows.map((r) => (
                  <div key={r.label}>
                    <dt>{r.label}</dt>
                    <dd>{r.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="lc-note"><SourceLinks sources={card.sources} /></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
