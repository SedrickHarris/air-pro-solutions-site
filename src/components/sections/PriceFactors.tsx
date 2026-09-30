import { DataTable } from '@/components/sections/DataTable';
import { MarketRanges } from '@/components/sections/MarketRanges';

// Pricing-factor table - deliberately has no dollar figures; see CLAUDE.md "Claims that must not
// ship". MarketRanges renders nothing unless SHOW_MARKET_RANGES is flipped on with client approval.
export function PriceFactors({
  title,
  eyebrow = 'Pricing',
  intro,
  rows,
  closing,
}: {
  title: string;
  eyebrow?: string;
  intro?: string;
  rows: { item: string; drivers: string }[];
  closing?: string;
}) {
  return (
    <section>
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {intro && <p className="compare-intro">{intro}</p>}
        <DataTable
          columns={['Repair type', 'What moves the price']}
          rows={rows.map((r) => [r.item, r.drivers])}
        />
        {closing && <p className="table-note">{closing}</p>}
        <MarketRanges />
      </div>
    </section>
  );
}
