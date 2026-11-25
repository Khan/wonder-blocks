---
"@khanacademy/wonder-blocks-link": minor
---

Migrate `Link` from Aphrodite to CSS Modules (WB-2334, CSS Modules Phase 5 /
Wave F). The public component API is unchanged — same props, same DOM
structure, and the same `style` override.

- Styling now lives in `link-core.module.css`. Theming is unchanged: the font
  family and weight still come from the `--wb-c-link-*` variables that
  `build:css` emits from `src/theme/*`.
- The start/end icon rules are nested inside the anchor's `shared` class, so
  their `vertical-align` and margins beat `PhosphorIcon`'s own rules on
  specificity rather than stylesheet load order.
- The min-target-size hit area still uses `minTargetSizeStyles` from
  `wonder-blocks-styles`, as `Clickable` does.
- **Behavior change for `style` overrides:** Link's hover / press / focus rules
  now sit in `@layer shared`, while a consumer's `style` still goes through
  Aphrodite (unlayered and `!important`). A consumer override of a property
  Link also changes on interaction (most commonly `color`) now applies in every
  state. Previously, Link's hover and press colours replaced it. To keep a
  different colour on hover or press, pass it in the override's `:hover` /
  `:active` keys.
- The package now ships `dist/index.css` (auto side-effect import) and exposes
  it via the new `@khanacademy/wonder-blocks-link/css` subpath. `aphrodite` is
  dropped from `peerDependencies`.
