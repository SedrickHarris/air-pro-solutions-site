// Single-question explainer panel with a cited government source line.
export function RefrigerantNote({
  title,
  body,
  sourceLabel,
  sourceHref,
}: {
  title: string;
  body: string;
  sourceLabel: string;
  sourceHref: string;
}) {
  return (
    <section className="alt">
      <div className="wrap">
        <div className="refrigerant-note">
          <h2>{title}</h2>
          <p>{body}</p>
          <p className="refrigerant-source">
            Source: <a href={sourceHref} rel="noopener">{sourceLabel}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
