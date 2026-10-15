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
            <h3>{neighborhoodsHeading}</h3>
            <div className="nbhd-list">
              {neighborhoods.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
            {neighborhoodsNote && <div className="zip">{neighborhoodsNote}</div>}
            {zipGroups ? (
              <div className="zip">
                <strong>{zipsLabel}</strong>
                {zipGroups.map((g) => (
                  <div className="grp" key={g.label}>
                    <p className="grp-label">{g.label}</p>
                    <div className="nbhd-list">
                      {g.zips.map((z) => (
                        <span key={z}>{z}</span>
                      ))}
                    </div>
                  </div>
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
