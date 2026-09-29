import { Icon } from '@/components/ui/Icon';

export function AppliesRow({
  items,
  eyebrow = "Who this is for",
  title,
}: {
  items: { label: string; icon: string }[];
  eyebrow?: string;
  title: string;
}) {
  return (
    <section>
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <ul className="applies-row">
          {items.map((i) => (
            <li key={i.label}>
              <Icon name={i.icon} size={20} />
              {i.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
