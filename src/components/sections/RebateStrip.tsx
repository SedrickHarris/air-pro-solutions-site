import Link from 'next/link';

// No dollar amounts until real, current offers are confirmed. Revisit as a three-card layout then.
export function RebateStrip() {
  return (
    <section>
      <div className="wrap">
        <div className="rebate-panel">
          <div>
            <h2>Current rebates &amp; offers</h2>
            <p>Ask about current manufacturer rebates and seasonal offers on qualifying systems and maintenance plans.</p>
          </div>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/contact/">Contact us</Link>
            <Link className="btn btn-outline" href="/financing/">Financing</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
