import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

export type DecisionCard = { icon: string; title: string; body: string; href?: string; ctaLabel?: string };

const defaultCards: DecisionCard[] = [
  { icon: 'alert', title: "My AC or heat isn't working", body: 'Fast diagnosis for no-cool or no-heat problems.', href: '/emergency-hvac/' },
  { icon: 'wrench', title: 'I need a repair', body: "Noises, leaks, weak airflow, or a system that won't turn on.", href: '/ac-repair/' },
  { icon: 'snowflake', title: 'I need a new system', body: 'Replacement or new installation with a free estimate.', href: '/ac-installation/' },
  { icon: 'calendar-check', title: 'I want a tune-up', body: 'Seasonal maintenance to catch problems early.', href: '/maintenance-plan/' },
  { icon: 'building', title: 'I manage a commercial property', body: 'Rooftop units, maintenance agreements, multi-site coverage.', href: '/commercial-hvac/' },
  { icon: 'dollar', title: 'I want to ask about financing', body: 'Flexible options for qualifying replacements and installs.', href: '/financing/' },
];

export function DecisionGrid({
  cards = defaultCards,
  eyebrow = 'Where do you want to start?',
  title = 'What do you need help with?',
  intro,
  ctaLabel = 'Get started',
  alt = false,
  // Card count on this page's grid isn't always a multiple of 3 (e.g. ac-maintenance's 4 decision
  // cards); defaults to the original 3-column layout so every existing caller is unaffected.
  columns = 3,
}: {
  cards?: DecisionCard[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  ctaLabel?: string;
  alt?: boolean;
  columns?: 2 | 3 | 4;
}) {
  return (
    <section className={alt ? 'alt' : undefined}>
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
        <div className={columns === 4 ? 'decision-grid decision-grid-4' : columns === 2 ? 'decision-grid decision-grid-2' : 'decision-grid'}>
          {cards.map((c) => {
            const body = (
              <>
                <span className="icon-chip"><Icon name={c.icon} /></span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                {c.href && <span className="card-arrow">{c.ctaLabel ?? ctaLabel} <Icon name="arrow" size={16} /></span>}
              </>
            );
            return c.href ? (
              <Link key={c.title} href={c.href} className="decision-card">{body}</Link>
            ) : (
              <div key={c.title} className="decision-card">{body}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
