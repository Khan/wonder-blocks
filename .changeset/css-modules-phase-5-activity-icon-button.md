---
"@khanacademy/wonder-blocks-icon-button": minor
---

Migrate `ActivityIconButton` from Aphrodite to CSS Modules (WB-2329, CSS Modules
Phase 5 / Wave A). The public component API is unchanged — same props, same DOM
structure, and the same `styles.root` / `styles.box` / `styles.label` overrides
— so this is an internal styling refactor.

- The `actionType × kind` variant matrix now lives in
  `activity-icon-button.module.css`, expressed with
  `--wb-c-activity-icon-button--*` component tokens assigned by per-axis
  classes, so each interactive state (hover / press / disabled / focus) is
  declared once instead of once-per-cell. The per-variant `StyleSheet.create`
  cache (`_generateStyles`) is gone. Theming is unchanged — the module
  references the same `--wb-semanticColor-chonky-*` and
  `--wb-c-icon-button-activityIconButton-label-color-progressive` variables
  that switch on `[data-wb-theme]`.
- The "chonky" box's hover / press / disabled styling is now driven by
  descendant selectors from the root element rather than by classes toggled in
  JS. The box keeps its plain `chonky` class name in the DOM as a
  consumer/test hook, it just no longer drives styling.
- A focused *and* hovered disabled button now keeps the full global focus ring.
  Previously the disabled hover reset stripped its outline (leaving only the
  inner box-shadow), which was an artifact of Aphrodite's rule ordering rather
  than an intentional design. `Button`, `ActivityButton`, `IconButton` and
  `ConversationIconButton` already made the same call.
