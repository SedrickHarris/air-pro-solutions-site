import Link from 'next/link';
import { regions } from '@/content/regions';
import { getCity } from '@/content/cities';
import { Icon } from '@/components/ui/Icon';

export function RegionGrid() {
  return (
    <section className="alt">
      <div className="wrap">
        <p className="eyebrow">Service areas</p>
        <h2>Serving four Southern California regions</h2>
        <div className="region-grid">
          {regions.map((r) => (
            <Link key={r.slug} href={`/service-areas/${r.slug}/`} className="region-card">
              {/* TODO(design): real photography replaces the pending tile */}
              <div className="photo-pending region-card-img">
                <Icon name="building" size={24} />
                <span className="photo-tag">Photo pending</span>
              </div>
              <div className="region-card-body">
                <h3>{r.name}</h3>
                <p>{r.cities.map((c) => getCity(c)?.name).filter(Boolean).join(', ')}</p>
                <span className="card-arrow">View region <Icon name="arrow" size={16} /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
