import { DataTable } from '@/components/sections/DataTable';
import { MarketRanges } from '@/components/sections/MarketRanges';

// Pricing-factor table - deliberately has no dollar figures; see CLAUDE.md "Claims that must not
// ship". MarketRanges renders nothing unless SHOW_MARKET_RANGES is flipped on with client approval.
export function PriceFactors({
  title,
  eyebrow = 'Pricing',
  intro,
  columns = ['Repair type', 'What moves the price'],
  rows,
  closing,
  notes,
}: {
  title: string;
  eyebrow?: string;
  intro?: string;
  columns?: [string, string];
  rows: { item: string; drivers: string }[];
  closing?: string;
  notes?: string[]; // additional closing paragraphs, rendered after `closing`
}) {
  return (
    <section>
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {intro && <p className="compare-intro">{intro}</p>}
        <DataTable
          columns={columns}
          rows={rows.map((r) => [r.item, r.drivers])}
        />
        {closing && <p className="table-note">{closing}</p>}
        {notes?.map((n) => (
          <p className="table-note" key={n}>{n}</p>
        ))}
        <MarketRanges />
      </div>
    </section>
  );
}
