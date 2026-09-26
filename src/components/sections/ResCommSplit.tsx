import Link from 'next/link';

const cards = [
  {
    title: 'Comfort for your home, done right the first time',
    eyebrow: 'Residential HVAC',
    body: 'AC repair, heating, maintenance, replacement, mini-splits, and indoor air quality for houses across Southern California.',
    href: '/residential-hvac/',
    cta: 'Home HVAC Services',
    tags: ['AC & heating repair', 'System replacement', 'Ductless mini-splits', 'Maintenance plans'],
  },
  {
    title: 'Uptime and clarity for properties & businesses',
    eyebrow: 'Commercial HVAC',
    body: 'Rooftop units, preventative maintenance, tenant comfort, and planning support for property managers and facility teams.',
    href: '/commercial-hvac/',
    cta: 'Commercial HVAC Services',
    tags: ['Rooftop unit service', 'Maintenance agreements', 'Emergency dispatch', 'Multi-property support'],
  },
];

export function ResCommSplit() {
  return (
    <section className="alt">
      <div className="wrap split">
        {cards.map((c) => (
          <div key={c.href} className="split-card">
            <p className="eyebrow">{c.eyebrow}</p>
            <h2>{c.title}</h2>
            <p>{c.body}</p>
            <ul className="tag-list">
              {c.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <Link className="btn btn-primary" href={c.href}>{c.cta}</Link>
          </div>
        ))}
      </div>
    </section>
  );
}
