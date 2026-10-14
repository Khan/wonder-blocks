---
"@khanacademy/wonder-blocks-banner": minor
---

Migrate `Banner` from Aphrodite to CSS Modules (WB-2333, CSS Modules Phase 5 /
Wave E). The public component API is unchanged: same props, same DOM
structure, and the same `styles.root` override.

- Styling now lives in `banner.module.css`. Theming is unchanged: the
  theme-dependent values still come from the `--wb-c-banner-*` variables that
  `build:css` emits from `src/theme/*`.
- Every rule is nested under a `.root` marker class on the outer `View`, so
  Banner's overrides of `View`, `PhosphorIcon`, `Link`, `Button` and
  `IconButton` styles win on specificity rather than stylesheet load order.
- The package now ships `dist/index.css` (auto side-effect import) and exposes
  it via the new `@khanacademy/wonder-blocks-banner/css` subpath. `aphrodite`
  is dropped from `peerDependencies`.
