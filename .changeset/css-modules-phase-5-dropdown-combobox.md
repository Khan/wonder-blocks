---
"@khanacademy/wonder-blocks-dropdown": minor
---

Migrate `Combobox` (with its live region and selected-items group) from
Aphrodite to CSS Modules (WB-2485, CSS Modules Phase 5 / Wave H). The public
API is unchanged, including the `style` override on the input, which still
wins over the built-in styles.

- `combobox.module.css`, `combobox-multiple-selection.module.css` and
  `combobox-live-region.module.css` replace the Aphrodite stylesheets. They
  read the same `--wb-*` / `--wb-c-dropdown-*` variables, so theming is
  unchanged.
- Combobox overrides `View`, `TextField`, `IconButton`, `Button`, `Listbox`
  and `Cell` classes in the same `@layer shared`. Its rules nest under marker
  classes (`.root` on the wrapper and the selected-items group, `.menu` on the
  portaled listbox) so they win on specificity rather than stylesheet load
  order. The input and toggle-button state resets repeat the `TextField` /
  `IconButton` state selectors under the marker, so they keep beating them as
  the unlayered Aphrodite styles did.
- The package now ships its bundled stylesheet at `dist/index.css`, which the
  JS entry imports automatically.
