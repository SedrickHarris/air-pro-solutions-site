// Single-question explainer panel with an optional cited government source line. Used for the
// refrigerant note (source always supplied) and reused as a plain callout (e.g. an installation
// timeline blurb) when sourceLabel/sourceHref are omitted.
//
// Extended (AC Maintenance build) with three backward-compatible optional props so a pair of these
// can be composed side by side as the "callouts" section on /ac-maintenance/, without touching the
// single-callout usage on /ac-repair/ or /ac-installation/:
// - `boldLead`: bolds a short lead phrase before `body` (e.g. "No." before the R-410A answer).
// - `sourceText`: a plain, non-linked "Source: ..." line (e.g. "listed under Sources below"),
//   used instead of the sourceLabel/sourceHref anchor when there is no direct URL to link to.
// - `accent`: adds a colored left border (sky/amber) for a two-up callout grid; omitted keeps the
//   existing plain panel look.
// - `bare`: renders just the inner panel with no wrapping <section>/<div class="wrap">, so callers
//   can place two of these inside one shared section/grid wrapper.
export function RefrigerantNote({
  title,
  // Optional lead paragraph rendered BEFORE the boldLead+body paragraph (e.g. /heat-pump-services/'s
  // R-410A callout, whose approved copy states the new-install rule first, then bolds "Existing
  // R-410A systems are not banned." as its own sentence, then continues). Undefined for every other
  // caller, whose boldLead already opens the panel.
  introBody,
  body,
  boldLead,
  // Optional second paragraph (e.g. /furnace-installation/'s "Furnace only, or the whole system?"
  // callout, which needs two paragraphs before the source line). Undefined for every other caller.
  body2,
  sourceLabel,
  sourceHref,
  sourceText,
  accent,
  bare = false,
}: {
  title: string;
  introBody?: string;
  body: string;
  boldLead?: string;
  body2?: string;
  sourceLabel?: string;
  sourceHref?: string;
  sourceText?: string;
  accent?: 'sky' | 'amber';
  bare?: boolean;
}) {
  const panel = (
    <div className={`refrigerant-note${accent ? ` refrigerant-note-${accent}` : ''}`}>
      <h2>{title}</h2>
      {introBody && <p>{introBody}</p>}
      <p>{boldLead ? <><strong>{boldLead}</strong>{body}</> : body}</p>
      {body2 && <p>{body2}</p>}
      {sourceLabel && sourceHref && (
        <p className="refrigerant-source">
          Source: <a href={sourceHref} rel="noopener">{sourceLabel}</a>
        </p>
      )}
      {!sourceHref && sourceText && <p className="refrigerant-source">{sourceText}</p>}
    </div>
  );

  if (bare) return panel;

  return (
    <section className="alt">
      <div className="wrap">{panel}</div>
    </section>
  );
}
