export type RebateCard = { amount: string; description: string; linkLabel: string; linkHref: string };

// Three-up utility-rebate summary. See .rebate-strip / .rebate-card in globals.css. Distinct from
// RebateStrip's single no-amount CTA banner.
export function RebateCards({ cards }: { cards: RebateCard[] }) {
  return (
    <div className="rebate-strip">
      {cards.map((c) => (
        <div className="rebate-card" key={c.amount}>
          <p className="amt">{c.amount}</p>
          <p className="desc">{c.description}</p>
          <a href={c.linkHref} target="_blank" rel="noopener noreferrer">{c.linkLabel} &rarr;</a>
        </div>
      ))}
    </div>
  );
}
