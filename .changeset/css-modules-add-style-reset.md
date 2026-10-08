---
"@khanacademy/wonder-blocks-core": minor
---

Move `addStyle`'s element resets from Aphrodite to CSS Modules (WB-2330, CSS
Modules Phase 5). The `button` reset (`margin: 0`, plus Firefox's
`::-moz-focus-inner` border) now lives in `add-style.module.css`, in the nested
`shared.reset` cascade layer, instead of an unlayered Aphrodite class with
`!important`.

- **What changes:** CSS Modules rules on an `addStyle("button")` element can
  now override the reset. Previously the Aphrodite reset beat every layered
  rule, so a component migrated to CSS Modules couldn't set a margin on its
  button. Aphrodite styles passed through `style` still override the reset, as
  before.
- No migrated Wonder Blocks component sets a margin on its button element, so
  rendering is unchanged.
- **Note for consumers:** unlayered page CSS that targets buttons globally
  (for example `button { margin: 4px }`) now beats the reset on Wonder Blocks
  buttons. Before, the reset's `!important` won. Scope such rules or put them
  in a cascade layer.
