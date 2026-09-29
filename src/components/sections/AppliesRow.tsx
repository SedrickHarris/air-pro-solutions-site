export function AppliesRow({
  items,
  eyebrow = "Who this is for",
  title,
}: {
  items: string[];
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
            <li key={i}>{i}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
