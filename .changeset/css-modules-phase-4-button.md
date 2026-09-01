---
"@khanacademy/wonder-blocks-button": minor
---

Migrate `Button` from Aphrodite to CSS Modules (WB-2328, CSS Modules Phase 4).
The public component API is unchanged — same props, same DOM structure, and the
same `style` / `styles` / `labelStyle` overrides — so this is an internal
styling refactor.

- The `kind × actionType × size` variant matrix is now expressed in
  `button.module.css` around a component-token surface: every value a variant
  axis can change is a `--wb-c-button--*` custom property, assigned by one class
  per axis value (`.primary`, `.progressive`, `.small`) and read by the base and
  state rules, so each interactive state is declared once instead of
  once-per-cell. Theming (default / thunderblocks / syl-dark) is unchanged — the
  module references the same `--wb-*` token variables that switch on
  `[data-wb-theme]`.
- `data-kind` is still set on the rendered element and remains available as a
  consumer/test hook, but it no longer drives any styling.
- The shared element reset (`button-unstyled`) also moves to a CSS Module
  (`button-unstyled.module.css`) rather than staying as unlayered Aphrodite
  (which would otherwise override the layered focus ring / border / underline).
  It is emitted into the nested layer `shared.reset`, so the component styles —
  which sit directly in `shared` — always outrank it regardless of the order the
  bundler emits the two stylesheets in.
- The package now ships its bundled stylesheet at `dist/index.css` (imported
  automatically as a side-effect of the JS entry) and exposes it explicitly via
  the new `@khanacademy/wonder-blocks-button/css` subpath. `sideEffects` is set
  so bundlers keep the side-effect import. Standard webpack / Vite / Next.js
  setups pick this up with no changes; SSR consumers that can't process CSS
  imports may need a CSS loader / mock in their build.
- Note for consumers who override Button styles: Aphrodite emitted these rules
  unlayered and with `!important`, whereas the CSS Modules build emits them in
  `@layer shared`. Unlayered consumer CSS now wins over Button's own styles
  regardless of specificity, so overrides that previously needed `!important`
  may no longer, and stylesheets that were previously losing to Button may now
  start taking effect. Overrides passed through the `style` / `styles` /
  `labelStyle` props are unaffected — those still route through Aphrodite and
  continue to win.
