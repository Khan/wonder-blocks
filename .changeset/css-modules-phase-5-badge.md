---
"@khanacademy/wonder-blocks-badge": minor
---

Migrate `Badge`, `StatusBadge`, `NeutralBadge`, `DueBadge`, `GemBadge` and
`StreakBadge` from Aphrodite to CSS Modules (WB-2335, CSS Modules Phase 5 /
Wave G). The public component API is unchanged: same props, DOM structure, and
`styles` overrides.

- Each component has its own CSS module. `badge.module.css` holds `Badge`'s
  layout, typography, icon and label styles. The variant colours go through
  `--wb-c-badge--*` component tokens, as in `Banner`: each variant's module
  (`status-badge`, `neutral-badge`, `due-badge`, `gem-badge`, `streak-badge`)
  only assigns the tokens on the root, and `Badge`'s rules read them. Badge's
  own defaults are assigned in a zero-specificity `:where(.badge)` block, so
  results don't depend on stylesheet order. The variants no longer pass a
  separate icon class: the icon reads the inherited `--wb-c-badge--color-icon`.
  The focus ring uses the shared `--wb-focus-visible` CSS mixin instead of the
  `focusStyles` JS export.
- `showBorder={false}` is applied as an inline style object, so it still wins
  over the consumer's `styles.root`.
- **Behavior change (edge case):** with `showBorder={false}`, a `borderColor`
  passed in `styles.root` as a *plain object* used to win over the transparent
  border, though an Aphrodite `StyleSheet` override did not. Both now lose to
  `showBorder={false}`, as its documentation intends.
- The package now ships `dist/index.css` (auto side-effect import) and marks
  `**/*.css` as `sideEffects`. `aphrodite` is dropped from `peerDependencies`
  (the package no longer imports it).
