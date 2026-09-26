import Link from 'next/link';
import { siteConfig } from '@/content/site-config';

export function FinalCta() {
  return (
    <section className="final-cta">
      <div className="wrap">
        <h2>Get Air Pro Solutions on the job today</h2>
        <p>Free in-home consultation on new or replacement systems. We answer the phone every day.</p>
        <div className="cta-row cta-center">
          <a className="btn btn-primary" href={siteConfig.phoneHref}>Call {siteConfig.phone}</a>
          <Link className="btn btn-ghost" href="/contact/">Request a Quote</Link>
        </div>
      </div>
    </section>
  );
}
