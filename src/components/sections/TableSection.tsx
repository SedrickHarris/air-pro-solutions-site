import Link from 'next/link';
import { DataTable } from '@/components/sections/DataTable';

// Generic "eyebrow + h2 + lead + two-column table + closing note/link" section. Same shape as the
// inline "catches" block in src/app/[service]/page.tsx (introduced for /ac-maintenance/), pulled out
// into its own small component - like DiagnosisTable, just a thin wrapper around DataTable - because
// /indoor-air-quality/ needs three separate tables of this shape (warning signs, duct work, equipment
// fit by system type) at three different points in the page, and `catches` is bound to one fixed
// position in page.tsx. Optional `id` supports the page's internal "#areas"-style anchor links.
export function TableSection({
  eyebrow,
  title,
  lead,
  headings,
  rows,
  afterText,
  afterLinkText,
  afterLinkHref,
  id,
  alt = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  headings: [string, string];
  rows: [string, string][];
  afterText?: string;
  afterLinkText?: string;
  afterLinkHref?: string;
  id?: string;
  alt?: boolean;
}) {
  return (
    <section id={id} className={alt ? 'alt' : undefined}>
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {lead && <p className="compare-intro">{lead}</p>}
        <DataTable columns={headings} rows={rows} />
        {afterText && (
          <p className="table-note">
            {afterText}
            {afterLinkText && afterLinkHref && <Link className="link" href={afterLinkHref}>{afterLinkText}</Link>}
          </p>
        )}
      </div>
    </section>
  );
}
