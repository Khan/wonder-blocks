---
"@khanacademy/wonder-blocks-button": minor
---

Migrate `ActivityButton` from Aphrodite to CSS Modules (WB-2328, CSS Modules
Phase 4). The public component API is unchanged — same props, same DOM
structure, and the same `styles.root` / `styles.box` / `styles.startIcon` /
`styles.endIcon` / `styles.label` overrides — so this is an internal styling
refactor.

- The `actionType × kind` variant matrix now lives in
  `activity-button.module.css`, expressed with `--wb-c-activity-button--*`
  component tokens assigned by per-axis classes, so each interactive state
  (hover / press / disabled / focus) is declared once instead of once-per-cell.
  Theming (default / thunderblocks / syl-dark) is unchanged — the module
  references the same `--wb-semanticColor-chonky-*` variables that switch on
  `[data-wb-theme]`.
- The "chonky" box's hover / press / disabled styling is now driven by
  descendant selectors from the root element rather than by classes toggled in
  JS. The box keeps its plain `chonky` class name in the DOM as a
  consumer/test hook, it just no longer drives styling.
- A focused *and* hovered disabled button now keeps the full global focus ring.
  Previously the hover reset stripped its outline (leaving only the inner
  box-shadow), which was an artifact of Aphrodite's rule ordering rather than
  an intentional design.
