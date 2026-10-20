import { SourceLinks } from '@/components/ui/SourceLinks';

// Single-question explainer panel with an optional cited government source line. Used for the
// refrigerant note (source always supplied) and reused as a plain callout (e.g. an installation
// timeline blurb) when sourceLabel/sourceHref are omitted.
//
// Extended (AC Maintenance build) with three backward-compatible optional props so a pair of these
// can be composed side by side as the "callouts" section on /services/ac-maintenance/, without touching the
// single-callout usage on /services/ac-repair/ or /services/ac-installation/:
// - `boldLead`: bolds a short lead phrase before `body` (e.g. "No." before the R-410A answer).
// - `sourceText`: a plain, non-linked "Source: ..." line (e.g. "Source: ENERGY STAR duct sealing guidance"),
//   used instead of the sourceLabel/sourceHref anchor when there is no direct URL to link to.
// - `accent`: adds a colored left border (sky/amber) for a two-up callout grid; omitted keeps the
//   existing plain panel look.
// - `showSource`: renders the source line (linked sourceLabel/sourceHref, or plain sourceText) under the body.
//   Off by default so pages that have not migrated to the location-style template keep their existing markup.
// - `bare`: renders just the inner panel with no wrapping <section>/<div class="wrap">, so callers
//   can place two of these inside one shared section/grid wrapper.
export function RefrigerantNote({
  title,
  // Optional lead paragraph rendered BEFORE the boldLead+body paragraph (e.g. /services/heat-pump-services/'s
  // R-410A callout, whose approved copy states the new-install rule first, then bolds "Existing
  // R-410A systems are not banned." as its own sentence, then continues). Undefined for every other
  // caller, whose boldLead already opens the panel.
  introBody,
  body,
  boldLead,
  // Optional second paragraph (e.g. /services/furnace-installation/'s "Furnace only, or the whole system?"
  // callout, which needs two paragraphs before the source line). Undefined for every other caller.
  body2,
  sourceLabel,
  sourceHref,
  sourceText,
  accent,
  showSource = false,
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
  showSource?: boolean;
  bare?: boolean;
}) {
  const panel = (
    <div className={`refrigerant-note${accent ? ` refrigerant-note-${accent}` : ''}`}>
      <h2>{title}</h2>
      {introBody && <p>{introBody}</p>}
      <p>{boldLead ? <><strong>{boldLead}</strong>{body}</> : body}</p>
      {body2 && <p>{body2}</p>}
      {showSource && (sourceLabel && sourceHref ? (
        <p className="refrigerant-src"><SourceLinks sources={[{ label: sourceLabel, url: sourceHref }]} /></p>
      ) : (
        sourceText && <p className="refrigerant-src">{sourceText}</p>
      ))}
    </div>
  );

  if (bare) return panel;

  return (
    <section className="alt">
      <div className="wrap">{panel}</div>
    </section>
  );
}
