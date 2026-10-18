import Link from 'next/link';
import { renderBold } from '@/lib/markdown';

export function LocalKnowledge({
  eyebrow = 'Local knowledge',
  title,
  paragraphs,
  links,
  neighborhoodsHeading = 'Neighborhoods we cover',
  neighborhoods,
  zips,
  zipsLabel = 'ZIP codes:',
  neighborhoodsNote,
  zipGroups,
  officialResources,
  localCards,
  dark = false,
  alt = false,
}: {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  links?: { text: string; href: string }[];
  neighborhoodsHeading?: string;
  neighborhoods: string[];
  zips: string[];
  zipsLabel?: string; // defaults to "ZIP codes:"; use e.g. "ZIP codes (partial):" when the list is a sample
  zipGroups?: { label: string; zips: string[] }[]; // when set, ZIPs render as labeled pill groups instead of one line
  neighborhoodsNote?: string; // small note under the pills, e.g. that the list is a partial sample
  officialResources?: { text: string; href: string; note: string }[]; // official-link list shown in place of ZIPs when no verified ZIP list exists
  localCards?: { heading: string; rows: { label: string; value: string }[]; note: string }[]; // small fact cards shown above the heading on the right-hand card
  dark?: boolean;
  alt?: boolean;
}) {
  return (
    <section className={dark ? 'local-knowledge-dark' : alt ? 'alt' : undefined}>
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <div className="local-grid">
          <div className="local-copy">
            {paragraphs.map((p, i) => (
              <p key={i}>{renderBold(p)}</p>
            ))}
            {links && links.length > 0 && (
              <p className="local-links">
                {links.map((l, i) => (
                  <span key={l.href}>
                    {i > 0 && ' · '}
                    {/^https?:/.test(l.href) ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer">{l.text}</a>
                    ) : (
                      <Link href={l.href}>{l.text}</Link>
                    )}
                  </span>
                ))}
              </p>
            )}
          </div>
          <div className="nbhd-card">
            {localCards?.map((c) => (
              <div className="lc" key={c.heading}>
                <h3>{c.heading}</h3>
                <dl className="lc-rows">
                  {c.rows.map((r) => (
                    <div key={r.label}>
                      <dt>{r.label}</dt>
                      <dd>{r.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="lc-note">{c.note}</p>
              </div>
            ))}
            <h3>{neighborhoodsHeading}</h3>
            {neighborhoods.length > 0 && (
              <div className="nbhd-list">
                {neighborhoods.map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </div>
            )}
            {neighborhoodsNote && <div className="zip">{neighborhoodsNote}</div>}
            {officialResources ? (
              <ul className="res">
                {officialResources.map((r) => (
                  <li key={r.href}>
                    <a href={r.href} target="_blank" rel="noopener noreferrer">{r.text}</a>
                    {r.note}
                  </li>
                ))}
              </ul>
            ) : zipGroups ? (
              <div className="zip">
                <strong>{zipsLabel}</strong>
                {zipGroups.map((g) => (
                  <details className="zip-group" key={g.label}>
                    <summary>
                      {g.label} <em>({g.zips.length}{g.zips.length === 1 ? ' ZIP)' : ' ZIPs)'}</em>
                    </summary>
                    <div className="nbhd-list">
                      {g.zips.map((z) => (
                        <span key={z}>{z}</span>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            ) : (
              <div className="zip">
                <strong>{zipsLabel}</strong> {zips.join(', ')}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
