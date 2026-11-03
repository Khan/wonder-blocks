---
"@khanacademy/wonder-blocks-birthday-picker": minor
---

Migrate `BirthdayPicker` from Aphrodite to CSS Modules (WB-2335, CSS Modules
Phase 5 / Wave G). The public component API is unchanged: same props, DOM
structure, and `style` / `dropdownStyle` overrides.

- Styling now lives in `birthday-picker.module.css`, including the styles
  passed into each `SingleSelect`. The selects' minimum widths (110px, 167px
  with `monthYearOnly`, 100px for the day) are now classes instead of inline
  style objects.
- Rules are nested under a marker class on the row and on the error row, so
  they beat `View`, `SingleSelect`'s wrapper and `BodyText` on specificity
  rather than stylesheet load order.
- The small-screen (≤520px) stacked, full-width layout uses `!important`
  inside its `@media` block. That's the only way a layered rule can outrank
  the consumer's Aphrodite overrides, and it keeps the old behavior: on small
  screens the stacked layout wins over `style` / `dropdownStyle`, and on
  larger screens the consumer's overrides win.
- **Behavior change (edge case):** a `minWidth` passed in `dropdownStyle` as
  an Aphrodite `StyleSheet` now applies on larger screens. Before, the
  component's own minimum width silently won over it, though a plain-object
  `dropdownStyle` already won.
- The package now ships `dist/index.css` (auto side-effect import) and marks
  `**/*.css` as `sideEffects`. `aphrodite` is dropped from `peerDependencies`
  (the package no longer imports it).
