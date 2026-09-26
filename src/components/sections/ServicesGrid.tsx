import Link from 'next/link';
import Image from 'next/image';
import { services, commercialCardImage, type ServiceImage } from '@/content/services';
import { Icon } from '@/components/ui/Icon';

// Homepage curation and order. ductwork, indoor-air-quality and furnace-installation are intentionally
// not surfaced here. Commercial HVAC is an audience hub, not a service, so it is a manual card.
const order = [
  'ac-repair', 'ac-installation', 'heating-repair', 'heat-pump-services',
  'ductless-mini-split', 'ac-maintenance', 'commercial-hvac', 'emergency-hvac',
];
const labelOverride: Record<string, string> = { 'emergency-hvac': 'Emergency HVAC Repair' };

type Card = { href: string; name: string; description: string; icon: string; image?: ServiceImage };

const commercialCard: Card = {
  href: '/commercial-hvac/',
  name: 'Commercial HVAC',
  description: 'Repair, replacement, and maintenance agreements for commercial buildings.',
  icon: 'building',
  image: commercialCardImage,
};

function cardFor(slug: string): Card | undefined {
  if (slug === 'commercial-hvac') return commercialCard;
  const svc = services.find((s) => s.slug === slug);
  if (!svc) return undefined;
  return { href: `/${svc.slug}/`, name: labelOverride[svc.slug] ?? svc.name, description: svc.description, icon: svc.icon, image: svc.image };
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
              {c.image ? (
                <div className="svc-card-img">
                  <Image src={c.image.src} alt={c.image.alt} width={800} height={600} sizes="(max-width: 520px) 100vw, (max-width: 920px) 50vw, 25vw" />
                </div>
              ) : (
                // TODO(design): real image replaces the pending tile
                <div className="photo-pending svc-card-img">
                  <Icon name={c.icon} size={28} />
                  <span className="photo-tag">Photo pending</span>
                </div>
              )}
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
