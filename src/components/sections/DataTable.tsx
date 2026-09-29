// Scoped-scroll data table for row/column comparisons (e.g. per-city stats). See .compare-wrap /
// table.compare in globals.css. Distinct from CompareTable's pros/cons .compare-groups layout.
export function DataTable({ columns, rows, note }: { columns: string[]; rows: string[][]; note?: string }) {
  return (
    <>
      <div className="compare-wrap">
        <table className="compare">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
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
