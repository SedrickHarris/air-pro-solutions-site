import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { siteConfig } from '@/content/site-config';

// Amber-bordered urgency callout. Deliberately makes no promise about response time, dispatch
// hours, or same-day service - see CLAUDE.md "Claims that must not ship".
export function UrgencyBox({
  title,
  intro,
  items,
  closing,
  ctaLabel,
}: {
  title: string;
  intro: string;
  items: string[];
  closing: string;
  ctaLabel: string;
}) {
  return (
    <section>
      <div className="wrap">
        <div className="urgency-box">
          <div className="urgency-box-head">
            <Icon name="alert" size={24} />
            <h2>{title}</h2>
          </div>
          <p className="urgency-intro">{intro}</p>
          <ul>
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="urgency-closing">{closing}</p>
          <div className="cta-row">
            <a className="btn btn-primary" href={siteConfig.phoneHref}>Call {siteConfig.phone}</a>
            <Link className="btn btn-outline" href="/contact/">{ctaLabel}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
