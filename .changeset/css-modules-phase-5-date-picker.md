---
"@khanacademy/wonder-blocks-date-picker": minor
---

Migrate `DatePicker` from Aphrodite to CSS Modules (WB-2335, CSS Modules Phase
5 / Wave G). The public component API is unchanged: same props, DOM structure,
and `style` override.

- The input row, text field and calendar-button styles now live in
  `date-picker-input.module.css`; the footer and calendar day-button styles in
  `date-picker.module.css`.
- The calendar day buttons' `:focus-visible` ring (WB-2432) is now a CSS
  Modules class, added alongside react-day-picker's own class through its
  `classNames` prop. It replaces the `StyleSheet.create` / `css()` pair and
  uses the shared `--wb-focus-visible` CSS mixin.
- Rules that override `View`, `TextField` or `IconButton` are nested under a
  marker class (the input container and the calendar wrapper), so they win on
  specificity rather than stylesheet load order. The calendar wrapper `View`
  gains that marker class; it has no styles of its own.
- The package now ships `dist/index.css` (auto side-effect import), exposes it
  via the new `@khanacademy/wonder-blocks-date-picker/css` subpath, and marks
  `**/*.css` as `sideEffects`. `aphrodite` is dropped from `peerDependencies`
  (the package no longer imports it).
