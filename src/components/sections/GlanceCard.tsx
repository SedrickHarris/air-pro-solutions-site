import type { ReactNode } from 'react';

// "At a glance" card shown beside the quick answer (AnswerBlock `aside`): a few verified facts plus a
// source line. `source` is a ReactNode so a caller can pass plain text (city pages) or linked sources.
export function GlanceCard({
  title,
  stats,
  source,
}: {
  title: string;
  stats: { num: string; label: string }[];
  source: ReactNode;
}) {
  return (
    <aside className="glance" aria-label={title}>
      <h3>{title}</h3>
      <div className="glance-stats">
        {stats.map((st) => (
          <div key={st.num}>
            <span className="glance-num">{st.num}</span>
            <span className="glance-label">{st.label}</span>
          </div>
        ))}
      </div>
      <p className="glance-src">{source}</p>
    </aside>
  );
}
