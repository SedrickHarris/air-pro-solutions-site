import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import type { ServiceImage } from '@/content/services';

export function RelatedRow({
  items,
  eyebrow = 'Related',
  title = 'Explore related services',
}: {
  items: { name: string; href: string; icon: string; image?: ServiceImage }[];
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="alt">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <div className="services-grid">
          {items.map((it) => (
            <Link key={it.href} href={it.href} className="svc-card">
              {it.image ? (
                <div className="svc-card-img">
                  <Image src={it.image.src} alt={it.image.alt} width={800} height={600} sizes="(max-width: 520px) 100vw, (max-width: 920px) 50vw, 25vw" />
                </div>
              ) : (
                <div className="photo-pending svc-card-img">
                  <Icon name={it.icon} size={28} />
                  <span className="photo-tag">Photo pending</span>
                </div>
              )}
              <div className="svc-card-body">
                <h3>{it.name}</h3>
                <span className="card-arrow">View service <Icon name="arrow" size={16} /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
