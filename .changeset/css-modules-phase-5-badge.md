---
"@khanacademy/wonder-blocks-badge": minor
---

Migrate `Badge`, `StatusBadge`, `NeutralBadge`, `DueBadge`, `GemBadge` and
`StreakBadge` from Aphrodite to CSS Modules (WB-2335, CSS Modules Phase 5 /
Wave G). The public component API is unchanged: same props, DOM structure, and
`styles` overrides.

- Every badge's styling now lives in one shared `badge.module.css`. Source
  order reproduces the old style-array order (base → typography → default
  colours → icon-only → variant colours), so each variant still overrides
  `Badge`'s defaults. The focus ring uses the shared `--wb-focus-visible` CSS
  mixin instead of the `focusStyles` JS export.
- `showBorder={false}` is applied as an inline style object, so it still wins
  over the consumer's `styles.root`.
- **Behavior change (edge case):** with `showBorder={false}`, a `borderColor`
  passed in `styles.root` as a *plain object* used to win over the transparent
  border, though an Aphrodite `StyleSheet` override did not. Both now lose to
  `showBorder={false}`, as its documentation intends.
- The package now ships `dist/index.css` (auto side-effect import) and marks
  `**/*.css` as `sideEffects`. `aphrodite` is dropped from `peerDependencies`
  (the package no longer imports it).
