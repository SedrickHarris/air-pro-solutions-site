// Single-question explainer panel with an optional cited government source line. Used for the
// refrigerant note (source always supplied) and reused as a plain callout (e.g. an installation
// timeline blurb) when sourceLabel/sourceHref are omitted.
export function RefrigerantNote({
  title,
  body,
  sourceLabel,
  sourceHref,
}: {
  title: string;
  body: string;
  sourceLabel?: string;
  sourceHref?: string;
}) {
  return (
    <section className="alt">
      <div className="wrap">
        <div className="refrigerant-note">
          <h2>{title}</h2>
          <p>{body}</p>
          {sourceLabel && sourceHref && (
            <p className="refrigerant-source">
              Source: <a href={sourceHref} rel="noopener">{sourceLabel}</a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
