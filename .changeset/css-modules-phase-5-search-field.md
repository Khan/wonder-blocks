---
"@khanacademy/wonder-blocks-search-field": minor
---

Migrate `SearchField` from Aphrodite to CSS Modules (WB-2332, CSS Modules Phase
5 / Wave D). The public component API is unchanged — same props, same DOM
structure, and the same `style` override — so this is an internal styling
refactor.

- Styling now lives in `search-field.module.css`. Every rule is nested inside a
  `root` marker class so the container, icon, input and clear-button overrides
  beat the rules `View`, `PhosphorIcon`, `TextField` and `IconButton` ship in
  the same `@layer shared` on specificity rather than stylesheet load order.
- The search icon's colour (default / error / disabled) is now set by a class
  (the icon masks its glyph with `currentColor`) rather than through the
  `color` prop.
- The package now ships `dist/index.css` (auto side-effect import). `aphrodite`
  is dropped from `peerDependencies` (the package no longer imports it).
