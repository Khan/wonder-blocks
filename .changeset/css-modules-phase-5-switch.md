---
"@khanacademy/wonder-blocks-switch": minor
---

Migrate `Switch` from Aphrodite to CSS Modules (WB-2332, CSS Modules Phase 5 /
Wave D). The public component API is unchanged — same props and DOM structure —
so this is an internal styling refactor.

- Styling now lives in `switch.module.css`. Theming (default / thunderblocks /
  syl-dark) is unchanged: the module reads the same `--wb-c-switch-*` variables
  that `build:css` already emits from `src/theme/*`, switched on
  `[data-wb-theme]`.
- The per-state `StyleSheet.create` cache (`_generateStyles`) is gone. The
  `checked`, `clickable` (an `onChange` was passed) and `disabled` axes are
  conditional class names composed through the `style` prop.
- Every rule is nested inside a `root` marker class on the track, so the track's
  `display` beats `View`'s defaults (and the icon's position beats
  `PhosphorIcon`'s) on specificity rather than stylesheet load order.
- The package now ships `dist/index.css` (auto side-effect import) and exposes
  it via the new `@khanacademy/wonder-blocks-switch/css` subpath. `aphrodite` is
  dropped from `peerDependencies` (the package no longer imports it).
