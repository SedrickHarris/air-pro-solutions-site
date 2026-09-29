import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Faq } from '@/content/faq';

// Splits `text` on each link's `text` and wraps that substring in a link. The plain string fed to
// the FAQPage JSON-LD (see src/lib/schema.ts) is untouched, so visible text and schema stay identical.
function linkify(text: string, links?: Faq['links']): ReactNode[] {
  let parts: (string | ReactNode)[] = [text];
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

// Optionally bolds the first sentence (split on the first ". "), still linkifying through both
// halves so a link inside the first sentence (e.g. a phone number) still renders as a link.
function renderAnswer(a: string, links: Faq['links'] | undefined, boldFirstSentence: boolean): ReactNode[] {
  if (!boldFirstSentence) return linkify(a, links);
  const idx = a.indexOf('. ');
  if (idx === -1) return linkify(a, links);
  const boldPart = a.slice(0, idx + 1);
  const rest = a.slice(idx + 1);
  return [<strong key="bold-lead">{linkify(boldPart, links)}</strong>, ...linkify(rest, links)];
}

// Renders the same array that feeds the FAQPage JSON-LD, so visible text and schema stay identical.
export function FaqList({
  faqs,
  title = 'Frequently asked questions',
  eyebrow = 'FAQ',
  firstOpen = false,
  boldFirstSentence = false,
  alt = false,
}: {
  faqs: Faq[];
  title?: string;
  eyebrow?: string;
  firstOpen?: boolean;
  boldFirstSentence?: boolean;
  alt?: boolean;
}) {
  return (
    <section className={alt ? 'alt' : undefined}>
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <div className="faq-grid">
          {faqs.map((f, i) => (
            <details key={f.q} open={firstOpen && i === 0}>
              <summary>{f.q}</summary>
              <p>{renderAnswer(f.a, f.links, boldFirstSentence)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
