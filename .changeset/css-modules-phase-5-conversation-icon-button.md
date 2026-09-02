---
"@khanacademy/wonder-blocks-icon-button": minor
---

Migrate `ConversationIconButton` from Aphrodite to CSS Modules (WB-2329, CSS
Modules Phase 5 / Wave A). The public component API is unchanged — same props,
same DOM structure, and the same `style` overrides — so this is an internal
styling refactor.

- The `kind × actionType` variant matrix now lives in
  `conversation-icon-button.module.css`, expressed with
  `--wb-c-conversation-icon-button--*` component tokens assigned by per-axis
  classes, so each interactive state (hover / press / disabled / focus) is
  declared once instead of once-per-cell. The per-variant `StyleSheet.create`
  cache (`_generateStyles`) is gone. Theming is unchanged — the module
  references the same `--wb-semanticColor-action-*` variables that switch on
  `[data-wb-theme]`.
- The border widths and radius are assigned once on the base rule rather than
  once per kind: the Aphrodite `theme` object spelled out all three kinds with
  identical values. Its unused `root.sizing` entry is dropped.
- A focused *and* hovered disabled button now keeps the full global focus ring.
  Previously the disabled hover reset stripped its outline, which was an
  artifact of Aphrodite's rule ordering rather than an intentional design.
  `Button`, `ActivityButton` and `IconButton` already made the same call.
