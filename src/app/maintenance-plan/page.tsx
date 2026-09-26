import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { PendingNote } from '@/components/ui/PendingNote';
import { hubMetadata, utilityTitle } from '@/lib/seo';

export const metadata = hubMetadata({
  title: utilityTitle('HVAC Maintenance Plan'),
  description: 'Learn how an HVAC maintenance plan from Air Pro Solutions helps keep your cooling and heating equipment efficient and reliable. Ask about plans.', // TODO(copy): confirm once plan is defined
  path: '/maintenance-plan/',
});

// TODO(data): replace with the real plan inclusions once the client confirms them.
const generalInclusions = [
  'Seasonal inspection of your cooling and heating equipment',
  'Cleaning and checking key components',
  'Filter check and replacement guidance',
  'A written summary of what the technician found',
];

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Maintenance" title="HVAC Maintenance Plan" lede="Regular service keeps your system efficient and reliable." />
      <section>
        <div className="wrap prose">
          <h2>Plan tiers and pricing</h2>
          <PendingNote>plan tiers and pricing, pending client confirmation. Do not publish prices until supplied.</PendingNote>

          <h2>What a maintenance visit typically covers</h2>
          <p>General maintenance visit items. Exact plan inclusions will be confirmed.</p>
          <ul>
            {generalInclusions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="cta-row">
            <Link className="btn btn-primary" href="/contact/">Ask about a maintenance plan</Link>
          </div>
        </div>
      </section>
    </>
  );
}
