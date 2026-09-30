// Disabled by default. Market-collected competitor dollar ranges (not Air Pro pricing) - do not
// enable without explicit client approval to publish "market guidance" figures on the site.
// TODO(data): client has not approved publishing any dollar range, Air Pro's own or market-derived.
// Once approved, this must render as clearly labeled "market guidance" (not a quote) and must never
// imply the numbers are Air Pro's own prices.
export const SHOW_MARKET_RANGES = false;

const marketRanges = [
  { tier: 'Minor repair', range: '$150-$400' },
  { tier: 'Moderate repair', range: '$350-$750' },
  { tier: 'Major repair', range: '$1,200-$2,800' },
];

export function MarketRanges() {
  if (!SHOW_MARKET_RANGES) return null;
  return (
    <div className="market-ranges">
      <p className="table-note">
        Market guidance only, not an AIRPRO SOLUTIONS quote. Actual pricing depends on diagnosis.
      </p>
      <ul>
        {marketRanges.map((m) => (
          <li key={m.tier}>{m.tier}: {m.range}</li>
        ))}
      </ul>
    </div>
  );
}
