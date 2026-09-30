import { DataTable } from '@/components/sections/DataTable';

// "What your symptoms can mean" table - wraps the generic DataTable in its own section shell so it
// reads as a self-contained page module like the other sections/ components.
export function DiagnosisTable({
  title,
  eyebrow = 'What it could mean',
  intro,
  rows,
}: {
  title: string;
  eyebrow?: string;
  intro?: string;
  rows: { notices: string; causes: string }[];
}) {
  return (
    <section className="alt">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {intro && <p className="compare-intro">{intro}</p>}
        <DataTable
          columns={['What you notice', 'What a technician checks']}
          rows={rows.map((r) => [r.notices, r.causes])}
        />
      </div>
    </section>
  );
}
