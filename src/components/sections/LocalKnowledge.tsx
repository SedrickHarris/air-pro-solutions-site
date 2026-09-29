import Link from 'next/link';
import type { ReactNode } from 'react';

// Splits a paragraph on **bold** markers and wraps the matched segments in <strong>.
// The plain string (with ** markers stripped) is what should be fed to any matching schema text.
function renderParagraph(text: string): ReactNode[] {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

export function LocalKnowledge({
  eyebrow = 'Local knowledge',
  title,
  paragraphs,
  links,
  neighborhoodsHeading = 'Neighborhoods we cover',
  neighborhoods,
  zips,
}: {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  links?: { text: string; href: string }[];
  neighborhoodsHeading?: string;
  neighborhoods: string[];
  zips: string[];
}) {
  return (
    <section>
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <div className="local-grid">
          <div className="local-copy">
            {paragraphs.map((p, i) => (
              <p key={i}>{renderParagraph(p)}</p>
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
            <h5>{neighborhoodsHeading}</h5>
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
