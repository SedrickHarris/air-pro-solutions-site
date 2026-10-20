// "Source: " / "Sources: " followed by comma-separated external links. Callers wrap it in their own
// element (.glance-src, .lc-note, .refrigerant-src) so the link color comes from that context.
export function SourceLinks({ sources }: { sources: { label: string; url: string }[] }) {
  if (sources.length === 0) return null;
  return (
    <>
      {sources.length === 1 ? 'Source: ' : 'Sources: '}
      {sources.map((s, i) => (
        <span key={s.url}>
          {i > 0 && ', '}
          <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
        </span>
      ))}
    </>
  );
}
