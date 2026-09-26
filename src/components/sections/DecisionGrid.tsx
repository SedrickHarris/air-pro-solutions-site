import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

const cards = [
  { icon: 'alert', title: "My AC or heat isn't working", body: 'Fast diagnosis for no-cool or no-heat problems.', href: '/emergency-hvac/' },
  { icon: 'wrench', title: 'I need a repair', body: "Noises, leaks, weak airflow, or a system that won't turn on.", href: '/ac-repair/' },
  { icon: 'snowflake', title: 'I need a new system', body: 'Replacement or new installation with a free estimate.', href: '/ac-installation/' },
  { icon: 'calendar-check', title: 'I want a tune-up', body: 'Seasonal maintenance to catch problems early.', href: '/maintenance-plan/' },
  { icon: 'building', title: 'I manage a commercial property', body: 'Rooftop units, maintenance agreements, multi-site coverage.', href: '/commercial-hvac/' },
  { icon: 'dollar', title: 'I want to ask about financing', body: 'Flexible options for qualifying replacements and installs.', href: '/financing/' },
];

export function DecisionGrid() {
  return (
    <section>
      <div className="wrap">
        <p className="eyebrow">Where do you want to start?</p>
        <h2>What do you need help with?</h2>
        <div className="decision-grid">
          {cards.map((c) => (
            <Link key={c.href} href={c.href} className="decision-card">
              <span className="icon-chip"><Icon name={c.icon} /></span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <span className="card-arrow">Get started <Icon name="arrow" size={16} /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
