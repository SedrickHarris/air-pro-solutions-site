import type { ReactNode } from 'react';
import { DataTable } from '@/components/sections/DataTable';

// "What your symptoms can mean" table - wraps the generic DataTable in its own section shell so it
// reads as a self-contained page module like the other sections/ components.
export function DiagnosisTable({
  title,
  eyebrow = 'What it could mean',
  intro,
  rows,
  // Overrides the second column header (defaults to the ac-repair/heating-repair wording). Added
  // for /furnace-installation/, whose approved copy uses "What may be behind it" instead - optional
  // so every existing caller is unaffected.
  causesHeading = 'What a technician checks',
  // Closing line rendered below the table (e.g. /heat-pump-services/'s link to AC repair/heating
  // repair for single-mode-only symptoms). Optional so every existing caller is unaffected.
  note,
}: {
  title: string;
  eyebrow?: string;
  intro?: string;
  rows: { notices: string; causes: string }[];
  causesHeading?: string;
  note?: ReactNode;
}) {
  return (
    <section className="alt">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {intro && <p className="compare-intro">{intro}</p>}
        <DataTable
          columns={['What you notice', causesHeading]}
          rows={rows.map((r) => [r.notices, r.causes])}
        />
        {note && <p className="compare-note">{note}</p>}
      </div>
    </section>
  );
}
