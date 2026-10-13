---
"@khanacademy/wonder-blocks-dropdown": minor
---

Migrate `DropdownCore` (the menu shared by `SingleSelect`, `MultiSelect` and
`ActionMenu`) and `ActionMenu` from Aphrodite to CSS Modules (WB-2485, CSS
Modules Phase 5 / Wave H). The public API is unchanged, including the `style` and
`dropdownStyle` overrides, which still win over the built-in styles.

- `dropdown-core.module.css` and `action-menu.module.css` replace the
  Aphrodite stylesheets. They read the same `--wb-*` / `--wb-c-dropdown-*`
  variables, so theming is unchanged.
- The menu container is portaled, so its rules nest under a `.menu` marker
  class on the container. They override `View`, `BodyText` and `SearchField`
  classes in the same `@layer shared` on specificity, not stylesheet load
  order.
- Removed unused Aphrodite styles (`srOnly` in DropdownCore; `caret` and
  `opener` in ActionMenu).
- The package now ships its bundled stylesheet at `dist/index.css`, which the
  JS entry imports automatically.
