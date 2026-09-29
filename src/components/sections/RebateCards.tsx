export type RebateCard = {
  amount: string;
  description: string;
  // Omitted when no official source URL has been verified yet (see docs/open-items.md); the card
  // then renders with no link rather than pointing at an unverified page.
  linkLabel?: string;
  linkHref?: string;
  // Set when the figure/status is time-sensitive and needs reconfirming before launch; renders a
  // small badge above the amount. Omit once the client has confirmed the current figure.
  verifyTag?: string;
};

// Three-up utility-rebate summary. See .rebate-strip / .rebate-card in globals.css. Distinct from
// RebateStrip's single no-amount CTA banner.
export function RebateCards({ cards }: { cards: RebateCard[] }) {
  return (
    <div className="rebate-strip">
      {cards.map((c) => (
        <div className="rebate-card" key={c.amount}>
          {c.verifyTag && <span className="verify-tag">{c.verifyTag}</span>}
          <p className="amt">{c.amount}</p>
          <p className="desc">{c.description}</p>
          {c.linkHref && c.linkLabel && (
            <a href={c.linkHref} target="_blank" rel="noopener noreferrer">{c.linkLabel} &rarr;</a>
          )}
        </div>
      ))}
    </div>
  );
}
