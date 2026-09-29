export function CompareTable({
  rows,
  leftHeading,
  rightHeading,
  eyebrow = 'Not sure which you need?',
  title,
}: {
  rows: { repair: string; replace: string }[];
  leftHeading: string;
  rightHeading: string;
  eyebrow?: string;
  title: string;
}) {
  return (
    <section className="alt">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <table className="compare-table">
          <thead>
            <tr>
              <th>{leftHeading}</th>
              <th>{rightHeading}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.repair}>
                <td>{r.repair}</td>
                <td>{r.replace}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
