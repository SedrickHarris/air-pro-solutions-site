import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';
import type { ServiceImage } from '@/content/services';

type Item = { name: string; href?: string; icon: string; image?: ServiceImage };

export function RelatedRow({
  items,
  eyebrow = 'Related',
  title = 'Explore related services',
  intro,
  ctaLabel = 'View service',
  footerAction,
  moreLinks,
  alt = true,
}: {
  items: Item[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  ctaLabel?: string;
  footerAction?: { label: string; href: string };
  moreLinks?: { text: string; href: string }[]; // "More on this topic" text-link row; only include entries whose route already exists
  alt?: boolean;
}) {
  return (
    <section className={alt ? 'alt' : undefined}>
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
        <div className="services-grid">
          {items.map((it) => {
            const body: ReactNode = (
              <>
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
                  {it.href && (
                    <span className="card-arrow">
                      {ctaLabel} <Icon name="arrow" size={16} />
                    </span>
                  )}
                </div>
              </>
            );
            return it.href ? (
              <Link key={it.name} href={it.href} className="svc-card">
                {body}
              </Link>
            ) : (
              <div key={it.name} className="svc-card">
                {body}
              </div>
            );
          })}
        </div>
        {footerAction && (
          <div className="cta-row cta-center">
            <Link className="btn btn-outline" href={footerAction.href}>{footerAction.label}</Link>
          </div>
        )}
        {moreLinks && moreLinks.length > 0 && (
          <p className="more-links">
            More on this topic:{' '}
            {moreLinks.map((l, i) => (
              <span key={l.text}>
                <Link href={l.href}>{l.text}</Link>
                {i < moreLinks.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </p>
        )}
      </div>
    </section>
  );
}
