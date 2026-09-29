import { Icon } from '@/components/ui/Icon';

export type CompareGroup = { heading: string; icon: string; items: string[] };

export function CompareTable({
  intro,
  groups,
  note,
  eyebrow = 'Not sure which you need?',
  title,
}: {
  intro?: string;
  groups: CompareGroup[];
  note?: string;
  eyebrow?: string;
  title: string;
}) {
  return (
    <section className="alt">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {intro && <p className="compare-intro">{intro}</p>}
        <div className="compare-groups">
          {groups.map((g) => (
            <div className="compare-group" key={g.heading}>
              <h3>
                <Icon name={g.icon} size={20} />
                {g.heading}
              </h3>
              <ul>
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {note && <p className="compare-note">{note}</p>}
      </div>
    </section>
  );
}
