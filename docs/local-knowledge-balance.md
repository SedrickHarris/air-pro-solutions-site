# Local-knowledge band: keep the two columns balanced

Binding for every city page, and for any other page that renders a `.local-grid` band. Added 2026-10-18 after an audit
found the right-hand card sitting mostly empty beside long local copy on most city pages (Riverside had 790px of blank
card, Ontario 608px, Huntington Beach 478px).

## What the band is

`src/components/sections/LocalKnowledge.tsx` renders two columns at 920px and wider (1.1fr copy, 0.9fr card) and one
column below that. The left column is `page.localParagraphs`. The right column is one `.nbhd-card` that stacks, in this order:

1. `page.localCards` (label/value fact cards, each with a source note)
2. the card heading (`neighborhoodsHeading`) and neighborhood pills, if any
3. `neighborhoodsNote`, if any
4. `officialResources` (link list), or `zipGroups`, or the flat ZIP line

A city with long copy and only a link list leaves the card far shorter than the copy. Cities with no verified ZIPs or
neighborhoods (most of them) are the ones at risk.

## Rules for every new city page

1. **Measure before you call the page done** (method below). Check the band at 1280px.
2. **Target:** the card content ends within about 50px of the copy, either side. Anything under about 250px of blank
   card is acceptable. Anything at or over 250px must be fixed before launch. If the card runs more than about 60px past
   the copy, trim a row or shorten a note instead.
3. **Fill the card with `page.localCards`, verified content only.** Good sources, in the order they usually fit:
   - Housing snapshot: SCAG local profile figures (California Department of Finance E-5 2018 counts and shares, plus the
     ACS building-age share), exactly as the paragraph states them, with a note that names both sources and says the
     figures are citywide and dated. If the profile does not state the ACS year (Ontario), the note says so.
   - Noise and work-hours table, only when the numbers come from the code text. A third-party code copy keeps its
     "third-party copy, undated" caveat in the note. Never state a number the paragraph does not (Huntington Beach has no
     nighttime figure, so the card has none).
   - A local rule or permit summary the City page states (Corona's outdoor-unit rule, Irvine's replacement conditions).
     Keep exemptions and "we did not confirm" caveats with the rule so it never reads as universal.
   - A fact table such as Ontario Ranch and airport figures, only when each figure is attributed in the paragraph.
4. **A card only restates what the page already says and what that city's open-items section verifies.** Do not add
   ZIPs, neighborhoods, rebate dollar amounts, code editions or anything else open-items lists as held out.
5. **If no verified content exists, do not invent any.** Leave the card short. The global `align-items: start` on
   `.local-grid` keeps it from stretching hollow, and a modest blank strip beside the copy is fine. Shortening the left copy
   is a client-approval decision, not a build decision.
6. **Do not make the card sticky.** Cards with a full link list are taller than a laptop viewport (Riverside 923px, Huntington
   Beach 830px, Ontario 1,230px, Corona 1,590px), and the bottom of a sticky card taller than the viewport cannot be reached
   until the section ends.
7. **Closing sentence:** end the local paragraphs with "Official links are in the card for this section." Never say
   "beside this text", because under 920px the card sits below the text.
8. **Copy flags:** every new card is TODO(copy) until the client approves it. No em dashes or en dashes. Do not touch
   JSON-LD, metadata or FAQ copy to balance a band.

Rough planning numbers at 1280px (always verify by measuring):

| Item | Height |
|---|---|
| Left column | about 2.1 to 2.3px per word of `localParagraphs`, paragraph gaps included |
| One-line label/value row | about 39px, plus about 20px per extra wrapped line |
| One `localCards` entry | about 140px of fixed overhead (heading, note of 2 to 3 lines, spacing) plus its rows |
| One `officialResources` link | about 70 to 85px |

## How to measure

Build with the Google Fonts calls mocked, serve `out/`, and read the heights in a browser at 1280px wide (the fallback
font differs slightly from Manrope, so treat the numbers as close, not exact).

```js
// next build with NEXT_FONT_GOOGLE_MOCKED_RESPONSES=/path/to/font-mock.js (a module that maps the two URLs below to stub @font-face CSS)
// 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&display=swap'
// 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap'
// then, on /service-areas/<city>/ at a 1280px viewport:
(() => {
  const g = document.querySelector('.local-knowledge-dark .local-grid');
  const L = g.querySelector('.local-copy'), C = g.querySelector('.nbhd-card');
  const left = L.lastElementChild.getBoundingClientRect().bottom - L.getBoundingClientRect().top;
  const card = C.lastElementChild.getBoundingClientRect().bottom - C.getBoundingClientRect().top
    + parseFloat(getComputedStyle(C).paddingBottom);
  return { left: Math.round(left), card: Math.round(card), blankInCard: Math.round(g.getBoundingClientRect().height - card) };
})();
```

Also look at the page at 900px and 390px (single column). The cards stack below the text, and `.lc-rows` rows collapse to
one column at 520px.

Open ZIP groups (`zipGroups`) start collapsed and grow the card when opened, so measure with them closed and expect the
gap to shrink when a visitor opens them.

## Other bands that use the same grid

The four region hubs and the service+city matrix page reuse `.local-grid` and `.nbhd-card`. At the audit, the worst were
the South Bay utilities band (193px blank) and the AC Repair x Torrance band (133px); the rest were under 90px. Re-check
them when a hub or matrix page gains copy.

## Audit snapshot (2026-10-18, 1280px)

Blank card space before and after the fixes: Riverside 790px to 17px, Ontario 608px to 27px past copy, Huntington Beach
478px to 24px, Irvine 391px to 34px, Corona 348px to about 43px past copy, Glendale 266px to 29px past copy, Anaheim 197px
to 19px past copy. Left as is, under 270px, with no new verified content to add: Pasadena, El Segundo, Long Beach, Redondo
Beach, Culver City, Los Angeles, Torrance, Costa Mesa, Gardena.
