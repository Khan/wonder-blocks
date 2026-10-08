---
"@khanacademy/wonder-blocks-accordion": minor
---

Migrate `Accordion`, `AccordionSection` and its header from Aphrodite to CSS
Modules (WB-2334, CSS Modules Phase 5 / Wave F). The public component API is
unchanged — same props, same DOM structure, and the same `style` /
`headerStyle` overrides.

- Styling now lives in `accordion.module.css`,
  `accordion-section.module.css` and `accordion-section-header.module.css`.
- The per-combination corner-style cache (`cornerKind` × first × last section)
  is replaced by a `cornerKind` class plus `firstSection` / `lastSection`
  modifier classes.
- Rules that override `View` or `PhosphorIcon` (the section and content
  panel, the header's content wrappers and caret) are nested under a marker
  class, so they win on specificity rather than stylesheet load order. The
  header button is a `Clickable`, whose rules live in the `shared.reset`
  sub-layer, so the header's own rules already outrank them.
- A consumer `style` override of `grid-template-rows` now applies while a
  section is collapsed too. Previously the collapsed-row rule outranked it.
  A consumer `headerStyle` now also wins over the non-collapsible header's
  `color: inherit` / `pointer-events: none`. Both are consequences of
  consumer overrides still going through Aphrodite (unlayered and
  `!important`).
- The package now ships `dist/index.css` (auto side-effect import).
  `aphrodite` is dropped from `peerDependencies`.
