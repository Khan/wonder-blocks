---
"@khanacademy/wonder-blocks-card": minor
---

Migrate `Card` from Aphrodite to CSS Modules (WB-2335, CSS Modules Phase 5 /
Wave G). The public component API is unchanged: same props, DOM structure, and
`styles.root` override.

- Styling now lives in `card.module.css`. The per-render
  `StyleSheet.create` call is gone: `background`, `borderRadius`,
  `paddingSize` and `elevation` each select a class. A background image is
  still set inline.
- Every rule is nested inside a `root` marker class on the card, so the card's
  padding, border and position beat `View`'s, and the dismiss button's
  position and programmatic-focus ring beat `IconButton`'s, on specificity
  rather than stylesheet load order.
- The dismiss button's focus ring now comes from the shared
  `--wb-focus-visible` CSS mixin instead of the `focusStyles` JS export. The
  values are the same.
- The package now ships `dist/index.css` (auto side-effect import) and marks
  `**/*.css` as `sideEffects`. `aphrodite` is dropped from `peerDependencies`
  (the package no longer imports it).
