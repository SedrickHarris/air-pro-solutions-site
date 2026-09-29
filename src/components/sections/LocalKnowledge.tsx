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
                    <Link href={l.href}>{l.text}</Link>
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
            <div className="zip">
              <strong>ZIP codes:</strong> {zips.join(', ')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
