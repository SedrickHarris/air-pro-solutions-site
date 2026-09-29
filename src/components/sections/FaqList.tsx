import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Faq } from '@/content/faq';

// Splits `a` on each link's `text` and wraps that substring in a link. The plain string fed to
// the FAQPage JSON-LD (see src/lib/schema.ts) is untouched, so visible text and schema stay identical.
function renderAnswer(a: string, links?: Faq['links']): ReactNode[] {
  let parts: (string | ReactNode)[] = [a];
  (links ?? []).forEach((link, i) => {
    const next: (string | ReactNode)[] = [];
    parts.forEach((part) => {
      if (typeof part !== 'string') {
        next.push(part);
        return;
      }
      const idx = part.indexOf(link.text);
      if (idx === -1) {
        next.push(part);
        return;
      }
      const anchor = link.href.startsWith('tel:') || link.href.startsWith('http') ? (
        <a key={`${i}-${link.href}`} href={link.href}>{link.text}</a>
      ) : (
        <Link key={`${i}-${link.href}`} href={link.href}>{link.text}</Link>
      );
      next.push(part.slice(0, idx), anchor, part.slice(idx + link.text.length));
    });
    parts = next;
  });
  return parts as ReactNode[];
}

// Renders the same array that feeds the FAQPage JSON-LD, so visible text and schema stay identical.
export function FaqList({ faqs, title = 'Frequently asked questions', eyebrow = 'FAQ' }: { faqs: Faq[]; title?: string; eyebrow?: string }) {
  return (
    <section>
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <div className="faq-grid">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{renderAnswer(f.a, f.links)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
