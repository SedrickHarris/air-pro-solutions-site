import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

// Three-tier triage card grid: "Life safety" (leave and call 911), "Emergency repair" (turn the
// system off and call), and "Can be scheduled" (book a normal visit). Built for /emergency-hvac/,
// which is the first page whose approved copy needs this life-safety/emergency/routine split - no
// existing section component (DecisionGrid, UrgencyBox, RulesNote) has three visually distinct card
// variants or an optional per-card CTA with two different button styles, so this is a new, generic,
// reusable component rather than a one-off block composed inline. Follows the same conventions as
// every other src/components/sections/ file: typed props, no hardcoded copy.
export type TriageCard = {
  variant: 'stop' | 'emergency' | 'later';
  tier: string;
  icon: string;
  h3: string;
  body: string;
  items: string[];
  button?: { label: string; href: string; style: 'primary' | 'outline' };
};

export function TriageGrid({
  eyebrow,
  title,
  cards,
  closing,
}: {
  eyebrow: string;
  title: string;
  cards: TriageCard[];
  closing?: string;
}) {
  return (
    <section>
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <div className="triage-grid">
          {cards.map((c) => (
            <div className={`triage-card triage-${c.variant}`} key={c.h3}>
              <span className="triage-icon-chip"><Icon name={c.icon} size={22} /></span>
              <p className="triage-tier">{c.tier}</p>
              <h3>{c.h3}</h3>
              <p>{c.body}</p>
              <ul>
                {c.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {c.button && (
                <div className="cta-row">
                  {c.button.href.startsWith('tel:') ? (
                    <a className={c.button.style === 'primary' ? 'btn btn-primary' : 'btn btn-outline'} href={c.button.href}>{c.button.label}</a>
                  ) : (
                    <Link className={c.button.style === 'primary' ? 'btn btn-primary' : 'btn btn-outline'} href={c.button.href}>{c.button.label}</Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        {closing && <p className="table-note">{closing}</p>}
      </div>
    </section>
  );
}
