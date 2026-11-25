---
"@khanacademy/wonder-blocks-progress-spinner": minor
---

Migrate `CircularSpinner` from Aphrodite to CSS Modules (WB-2335, CSS Modules
Phase 5 / Wave G). The public component API is unchanged: same props, same DOM
structure, and the same `style` override.

- Styling now lives in `circular-spinner.module.css`, including the rotation
  `@keyframes` (now a scoped CSS Modules name instead of an Aphrodite-generated
  one). The spinner colour is still set inline from `semanticColor`, so theming
  is unchanged.
- The package now ships `dist/index.css` (auto side-effect import) and marks
  `**/*.css` as `sideEffects`. `aphrodite` is dropped from `peerDependencies`
  (the package no longer imports it).
