import { siteConfig } from '@/content/site-config';

export function AnnouncementBar() {
  return (
    <div className="announce">
      Same-day HVAC service across LA County, South Bay, Orange County &amp; the Inland Empire ·{' '}
      <strong>Licensed &amp; insured</strong> · <strong>LIC #{siteConfig.licenses.join(', #')}</strong>
    </div>
  );
}
