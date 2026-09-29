import Link from 'next/link';
import { siteConfig } from '@/content/site-config';

export function FinalCta({
  title = 'Get Air Pro Solutions on the job today',
  body = 'Free in-home consultation on new or replacement systems. We answer the phone every day.',
  primaryLabel,
  ghostLabel = 'Request a Quote',
  ghostHref = '/contact/',
}: {
  title?: string;
  body?: string;
  primaryLabel?: string;
  ghostLabel?: string;
  ghostHref?: string;
}) {
  return (
    <section className="final-cta">
      <div className="wrap">
        <h2>{title}</h2>
        <p>{body}</p>
        <div className="cta-row cta-center">
          <a className="btn btn-primary" href={siteConfig.phoneHref}>{primaryLabel ?? `Call ${siteConfig.phone}`}</a>
          <Link className="btn btn-ghost" href={ghostHref}>{ghostLabel}</Link>
        </div>
      </div>
    </section>
  );
}
