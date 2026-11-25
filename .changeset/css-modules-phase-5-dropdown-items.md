---
"@khanacademy/wonder-blocks-dropdown": minor
---

Migrate `OptionItem`, `ActionItem`, `SeparatorItem` and `Listbox` (plus the
internal `Check` / `Checkbox` indicators) from Aphrodite to CSS Modules
(WB-2485, CSS Modules Phase 5 / Wave H). The public API is unchanged: same
props, same DOM structure, same `style` overrides.

- Each component gets its own module (`option-item`, `check`, `checkbox`,
  `action-item`, `separator-item` and `listbox` `.module.css`), replacing
  the Aphrodite stylesheets. They read the same `--wb-*` / `--wb-c-dropdown-*` variables, so
  theming (default / thunderblocks / syl-dark) is unchanged.
- The items override `Cell`, `View`, `PhosphorIcon` and `BodyText` classes,
  which live in the same `@layer shared`. Every rule is nested under a `.root`
  marker class so it wins on specificity, not on stylesheet load order. The
  Aphrodite version was unlayered `!important` and beat every Cell state rule,
  so the item focus/press rules also cover Cell's `:focus-visible:active`
  combination.
- The dropdown theme adds `item.sizing.height` (40px), exposed to CSS as
  `--wb-c-dropdown-item-sizing-height`. `ActionItem` reads its minimum height
  from it, and `DROPDOWN_ITEM_HEIGHT` in JS comes from the same value, so the
  two can't drift apart.
- The package now ships its bundled stylesheet at `dist/index.css`, which the
  JS entry imports automatically.
- **Behavior change:** a consumer `style` passed to `Listbox` that sets `color`
  now also applies when the listbox is disabled. Before, the disabled colour
  won. Consumer overrides are unlayered and now outrank the component's
  layered state styles for the same property.
