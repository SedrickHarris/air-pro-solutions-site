import Link from 'next/link';
import { services } from '@/content/services';
import { Icon } from '@/components/ui/Icon';

// Homepage curation and order. ductwork, indoor-air-quality and furnace-installation are intentionally
// not surfaced here. Commercial HVAC is an audience hub, not a service, so it is a manual card.
const order = [
  'ac-repair', 'ac-installation', 'heating-repair', 'heat-pump-services',
  'ductless-mini-split', 'ac-maintenance', 'commercial-hvac', 'emergency-hvac',
];
const labelOverride: Record<string, string> = { 'emergency-hvac': 'Emergency HVAC Repair' };

type Card = { href: string; name: string; description: string; icon: string };

const commercialCard: Card = {
  href: '/commercial-hvac/',
  name: 'Commercial HVAC',
  description: 'Repair, replacement, and maintenance agreements for commercial buildings.',
  icon: 'building',
};

function cardFor(slug: string): Card | undefined {
  if (slug === 'commercial-hvac') return commercialCard;
  const svc = services.find((s) => s.slug === slug);
  if (!svc) return undefined;
  return { href: `/${svc.slug}/`, name: labelOverride[svc.slug] ?? svc.name, description: svc.description, icon: svc.icon };
}

export function ServicesGrid() {
  const cards = order.map(cardFor).filter((c): c is Card => Boolean(c));
  return (
    <section>
      <div className="wrap">
        <p className="eyebrow">Services</p>
        <h2>HVAC services</h2>
        <div className="services-grid">
          {cards.map((c) => (
            <Link key={c.href} href={c.href} className="svc-card">
              {/* TODO(design): real photography replaces the pending tile */}
              <div className="photo-pending svc-card-img">
                <Icon name={c.icon} size={28} />
                <span className="photo-tag">Photo pending</span>
              </div>
              <div className="svc-card-body">
                <h3>{c.name}</h3>
                {c.description && <p>{c.description}</p>}
                <span className="card-arrow">Learn more <Icon name="arrow" size={16} /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
