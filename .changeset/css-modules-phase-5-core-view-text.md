---
"@khanacademy/wonder-blocks-core": minor
---

Migrate the internal styles of `View` and `Text` from Aphrodite to CSS
Modules (WB-2330, CSS Modules Phase 5 / Wave B).

- `View`'s default flexbox styles and `Text`'s antialiasing / header-margin
  styles now live in colocated `view.module.css` / `text.module.css` files,
  authored inside the shared `@layer shared` cascade layer.
- The class names route through the existing `addStyle` / `processStyleList`
  pipeline (Phase 1), so consumer-provided Aphrodite styles, inline styles,
  and `className` props continue to compose exactly as before.

Public API is unchanged (additive, no behavior change). The Aphrodite engine
in `wonder-blocks-core`'s utilities is intentionally retained so consumers
can still pass Aphrodite styles via the `style` prop.
