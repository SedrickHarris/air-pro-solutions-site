import type { Faq } from '@/content/faq';

// Renders the same array that feeds the FAQPage JSON-LD, so visible text and schema stay identical.
export function FaqList({ faqs, title = 'Frequently asked questions' }: { faqs: Faq[]; title?: string }) {
  return (
    <section>
      <div className="wrap">
        <p className="eyebrow">FAQ</p>
        <h2>{title}</h2>
        <div className="faq-grid">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
