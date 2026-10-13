---
"@khanacademy/wonder-blocks-floating": minor
---

Migrate `Floating` from Aphrodite to CSS Modules (WB-2335, CSS Modules Phase 5
/ Wave G). The public component API is unchanged: same props, DOM structure,
and `styles.root` override.

- The floating element's surface styles (background, border, radius, shadow,
  minimum size, outline reset) now live in `floating.module.css`. The
  floating-ui position styles and the `visibility` toggle are still applied
  inline.
- The package now ships `dist/index.css` (auto side-effect import) and marks
  `**/*.css` as `sideEffects`. `aphrodite` is dropped from `peerDependencies`
  (the package no longer imports it).
