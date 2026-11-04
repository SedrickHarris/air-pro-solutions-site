import { siteConfig } from '@/content/site-config';

export function AnnouncementBar() {
  return (
    <aside className="announce" aria-label="Service area and licensing">
      HVAC service across LA County, South Bay, Orange County &amp; the Inland Empire ·{' '}
      <strong>Licensed</strong> · <strong>LIC #{siteConfig.licenses.join(', #')}</strong>
    </aside>
  );
}
