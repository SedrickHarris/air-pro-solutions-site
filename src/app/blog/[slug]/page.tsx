import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { PendingNote } from '@/components/ui/PendingNote';

// TODO(data): PLACEHOLDER slug so the export has one param. Replace with real posts.
const posts = [{ slug: 'placeholder-post' }];

// Static export: only these params are generated.
export const dynamicParams = false;
export function generateStaticParams() {
  return posts;
}

// TODO(copy): blog post - noindex until real posts exist.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  await params;
  return (
    <>
      <PageHeader eyebrow="Resources" title="Blog post" />
      <section>
        <div className="wrap">
          <PendingNote>this article, pending final copy.</PendingNote>
        </div>
      </section>
    </>
  );
}
