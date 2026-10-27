---
"@khanacademy/wonder-blocks-card": minor
---

Migrate `Card` from Aphrodite to CSS Modules (WB-2335, CSS Modules Phase 5 /
Wave G). The public component API is unchanged: same props, DOM structure, and
`styles.root` override.

- Each component has its own CSS module: `card.module.css` for `Card` and
  `dismiss-button.module.css` for its dismiss button. The per-render
  `StyleSheet.create` call is gone. The `background`, `borderRadius`,
  `elevation` and `paddingSize` props each select a class that only assigns a
  `--wb-c-card--*` component token (background colour, border radius, box
  shadow, padding), and the card's base rule reads those tokens, as `Banner`
  does. A background image is still set inline.
- Each module nests its rules inside its own `root` marker class (on the card,
  and on the dismiss button itself), so the card's padding, border and
  position beat `View`'s, and the dismiss button's position and
  programmatic-focus ring beat `IconButton`'s, on specificity rather than
  stylesheet load order.
- The dismiss button's focus ring now comes from the shared
  `--wb-focus-visible` CSS mixin instead of the `focusStyles` JS export. The
  values are the same.
- The package now ships `dist/index.css` (auto side-effect import) and marks
  `**/*.css` as `sideEffects`. `aphrodite` is dropped from `peerDependencies`
  (the package no longer imports it).
