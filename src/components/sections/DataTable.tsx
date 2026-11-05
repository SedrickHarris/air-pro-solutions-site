import type { ReactNode } from 'react';

// Scoped-scroll data table for row/column comparisons (e.g. per-city stats). See .compare-wrap /
// table.compare in globals.css. Distinct from CompareTable's pros/cons .compare-groups layout.
// `numericCols` right-aligns those column indices with tabular figures (e.g. a "built before 1970"
// percentage column). Cells accept any ReactNode (e.g. a Link) as well as plain strings.
// The scroll wrapper is a labelled, focusable region so keyboard users can scroll it with the arrow keys.
// `label` names it; when a caller does not pass one, the name is built from the first column headings.
export function DataTable({ columns, rows, note, numericCols, label }: { columns: string[]; rows: ReactNode[][]; note?: string; numericCols?: number[]; label?: string }) {
  const numeric = (j: number) => numericCols?.includes(j) ?? false;
  return (
    <>
      <div className="compare-wrap" role="region" tabIndex={0} aria-label={label ?? `Table: ${columns.slice(0, 4).join(', ')}`}>
        <table className="compare">
          <thead>
            <tr>
              {columns.map((c, j) => (
                <th key={c} style={numeric(j) ? { textAlign: 'right', fontVariantNumeric: 'tabular-nums' } : undefined}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={numeric(j) ? { textAlign: 'right', fontVariantNumeric: 'tabular-nums' } : undefined}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="table-note">{note}</p>}
    </>
  );
}
