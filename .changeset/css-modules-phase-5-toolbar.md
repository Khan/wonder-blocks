---
"@khanacademy/wonder-blocks-toolbar": minor
---

Migrate `Toolbar` from Aphrodite to CSS Modules (WB-2335, CSS Modules Phase 5 /
Wave G). The public component API is unchanged: same props and DOM structure.

- Styling now lives in `toolbar.module.css`. Theming is unchanged: the module
  reads the same `semanticColor` / `sizing` CSS variables.
- Every rule is nested inside a `root` marker class on the outermost element,
  so the toolbar's `display`, padding, border and flex rules beat `View`'s (and
  the subtitle colour beats `BodyText`'s) on specificity rather than stylesheet
  load order.
- The package now ships `dist/index.css` (auto side-effect import) and marks
  `**/*.css` as `sideEffects`. `aphrodite` is dropped from `peerDependencies`
  (the package no longer imports it).
