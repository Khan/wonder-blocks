---
"@khanacademy/wonder-blocks-button": minor
---

Migrate `Button` and `ActivityButton` from Aphrodite to CSS Modules (WB-2328,
CSS Modules Phase 4). The public component APIs are unchanged — same props,
same DOM structure, same `style` / `styles` / `labelStyle` overrides — so this
is an internal styling refactor.

- The `kind × actionType × size` variant matrix is now expressed in
  `button.module.css` / `activity-button.module.css` using CSS custom-property
  "slots" set by the `[data-kind]` attribute plus per-`actionType` classes, so
  each interactive state is declared once instead of once-per-cell. Theming
  (default / thunderblocks / syl-dark) is unchanged — the modules reference the
  same `--wb-*` token variables that switch on `[data-wb-theme]`.
- The shared element reset in `button-unstyled` also moves to a CSS Module
  (`button-unstyled.module.css`), so the reset lives in `@layer shared`
  alongside the component styles rather than as unlayered Aphrodite (which would
  otherwise override the layered focus ring / border / underline).
- The package now ships its bundled stylesheet at `dist/index.css` (imported
  automatically as a side-effect of the JS entry) and exposes it explicitly via
  the new `@khanacademy/wonder-blocks-button/css` subpath. `sideEffects` is set
  so bundlers keep the side-effect import. Standard webpack / Vite / Next.js
  setups pick this up with no changes; SSR consumers that can't process CSS
  imports may need a CSS loader / mock in their build.
