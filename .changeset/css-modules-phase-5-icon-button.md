---
"@khanacademy/wonder-blocks-icon-button": minor
---

Migrate `IconButton` from Aphrodite to CSS Modules (WB-2329, CSS Modules Phase
5 / Wave A). The public component API is unchanged — same props, same DOM
structure, and the same `style` overrides — so this is an internal styling
refactor.

- The `kind × actionType × size` variant matrix is now expressed in
  `icon-button.module.css` around a component-token surface: every value a
  variant axis can change is a `--wb-c-icon-button--*` custom property, assigned
  by one class per axis value (`.primary`, `.progressive`, `.medium`) and read by
  the base and state rules, so each interactive state is declared once instead
  of once-per-cell. The per-variant `StyleSheet.create` cache
  (`_generateStyles`) is gone. Theming (default / thunderblocks / syl-dark) is
  unchanged — the module references the same `--wb-c-icon-button-iconButton-*`
  and `--wb-semanticColor-action-*` variables that switch on `[data-wb-theme]`.
- The icon is sized by a `--wb-c-icon-button--icon-size` component token rather
  than an inline style read from the theme object in JS, so `IconChooser` no
  longer imports the theme.
- `data-kind` is still set on the rendered element and remains available as a
  consumer/test hook, but it no longer drives any styling.
- The shared element reset (`icon-button-unstyled`) also moves to a CSS Module
  (`icon-button-unstyled.module.css`) rather than staying as unlayered
  Aphrodite (which would otherwise override the layered focus ring and
  borders). It is emitted into the nested layer `shared.reset`, so the
  component styles — which sit directly in `shared` — always outrank it
  regardless of the order the bundler emits the two stylesheets in.
- A focused *and* hovered disabled `IconButton` now keeps the full global focus
  ring. Previously the disabled hover reset stripped its outline, which was an
  artifact of Aphrodite's rule ordering rather than an intentional design.
  `Button` and `ActivityButton` already made the same call.
- The package now ships its bundled stylesheet at `dist/index.css` (imported
  automatically as a side-effect of the JS entry) and exposes it explicitly via
  the new `@khanacademy/wonder-blocks-icon-button/css` subpath. `sideEffects` is
  set so bundlers keep the side-effect import. Standard webpack / Vite / Next.js
  setups pick this up with no changes; SSR consumers that can't process CSS
  imports may need a CSS loader / mock in their build.
- Note for consumers who override `IconButton` styles: Aphrodite emitted these
  rules unlayered and with `!important`, whereas the CSS Modules build emits
  them in `@layer shared`. Unlayered consumer CSS now wins over `IconButton`'s
  own styles regardless of specificity, so overrides that previously needed
  `!important` may no longer, and stylesheets that were previously losing to
  `IconButton` may now start taking effect. Overrides passed through the `style`
  prop are unaffected — those still route through Aphrodite and continue to win.

`ActivityIconButton`, `ConversationIconButton` and `NodeIconButton` still use
Aphrodite and are unaffected; they follow in the rest of WB-2329.
