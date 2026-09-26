import { PageHeader } from '@/components/ui/PageHeader';
import { PendingNote } from '@/components/ui/PendingNote';
import { hubMetadata } from '@/lib/seo';

export const metadata = hubMetadata({
  title: 'Customer Reviews',
  description: 'Read what customers say about Air Pro Solutions.', // TODO(copy)
  path: '/reviews/',
});

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Reviews" title="Customer Reviews" />
      <section>
        <div className="wrap prose">
          <h2>Overall rating</h2>
          <PendingNote>aggregate rating, pending verification against the live Google profile.</PendingNote>

          <h2>Review platforms</h2>
          {/* TODO(data): real Google/Yelp widget embeds; structure only for now */}
          <div className="grid-2">
            <div className="panel"><h3>Google</h3><PendingNote>review widget.</PendingNote></div>
            <div className="panel"><h3>Yelp</h3><PendingNote>review widget.</PendingNote></div>
          </div>

          <h2>Reviews by city</h2>
          {/* TODO(data): city-tagged review cards. Each must be a real review with permission; these feed matrix-page local proof. */}
          <PendingNote>city-tagged review cards, pending real reviews.</PendingNote>
        </div>
      </section>
    </>
  );
}
