import Link from 'next/link';

// No dollar amounts or offer claims. Links go to the official SCE and SoCalGas rebate pages (both also cited on city pages).
export function RebateStrip() {
  return (
    <section>
      <div className="wrap">
        <div className="rebate-panel">
          <div>
            <h2>Utility rebates &amp; incentives</h2>
            <p>
              Rebate programs and eligibility vary by utility, address, and equipment. See the official{' '}
              <a href="https://www.sce.com/save-money/rebates-financial-assistance" target="_blank" rel="noopener noreferrer">SCE rebates</a>{' '}
              and{' '}
              <a href="https://www.socalgas.com/savings/rebates-and-incentives" target="_blank" rel="noopener noreferrer">SoCalGas rebates</a>{' '}
              pages for current terms.
            </p>
          </div>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/contact/">Contact us</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
