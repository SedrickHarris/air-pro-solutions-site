import { Icon } from '@/components/ui/Icon';

export function SymptomGrid({
  items,
  eyebrow = 'Signs you need this',
  title,
  alt = true,
}: {
  items: { lead: string; detail: string }[];
  eyebrow?: string;
  title: string;
  alt?: boolean;
}) {
  return (
    <section className={alt ? 'alt' : undefined}>
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <div className="symptom-grid">
          {items.map((s) => (
            <div className="symptom-card" key={s.lead}>
              <Icon name="alert" size={18} />
              <p>
                <strong>{s.lead}</strong> {s.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
