---
"@khanacademy/wonder-blocks-clickable": minor
---

Migrate `Clickable` from Aphrodite to CSS Modules (WB-2330, CSS Modules Phase 5).
The public component API is unchanged — same props, same DOM structure, and the
same `style` / `className` overrides — so this is an internal styling refactor.

- The four base rules (element reset, `cursor: pointer`, the default focus ring,
  and the disabled state) now live in `clickable.module.css` and are composed as
  class-name strings through the existing `style` prop, which
  `processStyleList` routes to `className`. They reference the same `--wb-*`
  token variables the Aphrodite version read from, so theming (default /
  thunderblocks / syl-dark) is unchanged.
- All four rules are emitted into the nested layer `shared.reset` rather than as
  unlayered Aphrodite. `Clickable`'s styles are base defaults that consumers
  (`Cell`, `Pill`, `AccordionSectionHeader`, …) are expected to override, and
  Aphrodite gave them that precedence by putting the caller's `style` prop last
  in the array. Because rules directly in a layer outrank that layer's named
  sub-layers, a consumer's own component styles now win regardless of the order
  the bundler emits the two stylesheets in.
- The package now ships its bundled stylesheet at `dist/index.css`, imported
  automatically as a side-effect of the JS entry. Standard webpack / Vite /
  Next.js setups pick this up with no changes; SSR consumers that can't process
  CSS imports may need a CSS loader / mock in their build.
- Note for consumers who override Clickable styles: Aphrodite emitted these
  rules unlayered, whereas the CSS Modules build emits them in
  `@layer shared.reset`. Unlayered consumer CSS now wins over Clickable's own
  styles regardless of specificity, so overrides that previously needed
  `!important` may no longer, and stylesheets that were previously losing to
  Clickable may now start taking effect. Overrides passed through the `style`
  prop are unaffected — those still route through Aphrodite and continue to win.
