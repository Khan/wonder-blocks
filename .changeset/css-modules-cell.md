---
"@khanacademy/wonder-blocks-cell": minor
---

Migrate `CompactCell` and `DetailCell` from Aphrodite to CSS Modules (WB-2330,
CSS Modules Phase 5 / Wave B). The public component API is unchanged — same
props, same DOM structure, and the same `style` / `styles` / `contentStyle`
overrides — so this is an internal styling refactor.

- `cell-core.module.css`, `common.module.css` and `detail-cell.module.css`
  replace the three Aphrodite stylesheets. They reference the same `--wb-*`
  token variables the Aphrodite code read from, so theming (default /
  thunderblocks / syl-dark) is unchanged.
- Aphrodite merged the `style` array into a single generated class, so
  precedence came from array order rather than specificity. The rules are
  declared in that same order to reproduce it: `wrapper` → `detail` → `active`
  → `clickable` → `disabled`, and `accessory` → `accessoryLeft` /
  `accessoryRight` → `accessoryDisabled` → `accessoryActive`. `DetailCell`'s
  wrapper padding is defined in `cell-core.module.css` (not
  `detail-cell.module.css`) specifically so it is guaranteed to be emitted
  after `.wrapper`, which sets the same properties at the same specificity.
- The subtitle's per-theme font override and the title's `line-height` override
  stay as React inline styles rather than becoming CSS Module classes.
  `BodyText`'s own module sets `font-size` / `line-height` on its variant
  classes, so as classes these overrides would compete at equal specificity
  across two packages and the winner would depend on stylesheet emission order.
- `width` / `height` become `inline-size` / `block-size` on the wrapper, the
  horizontal rule and the two indicator bars. These are equivalent in every
  writing mode Khan Academy ships (RTL locales are still `horizontal-tb`), and
  the surrounding declarations were already logical (`inset-inline-start`,
  `min-block-size`, `padding-block`). Two `inset-block-start` /
  `inset-block-end` pairs also collapse to `inset-block`.
- **One deliberate behavior change.** Aphrodite applied `accessoryActive` after
  the consumer's `styles.rightAccessory`, so on an *active* cell the built-in
  active colour beat a consumer-supplied `color`. That ordering was
  inconsistent with every other slot in the component, where custom styles come
  last. Consumer overrides now win there too. This only affects a consumer that
  passes an Aphrodite stylesheet with a `color` to `styles.rightAccessory` on an
  active cell — a plain style object already won before, since it became an
  inline style.
- The package now ships its bundled stylesheet at `dist/index.css`, imported
  automatically as a side-effect of the JS entry. Standard webpack / Vite /
  Next.js setups pick this up with no changes; SSR consumers that can't process
  CSS imports may need a CSS loader / mock in their build.
- Note for consumers who override Cell styles: Aphrodite emitted these rules
  unlayered, whereas the CSS Modules build emits them in `@layer shared`.
  Unlayered consumer CSS now wins over Cell's own styles regardless of
  specificity, so overrides that previously needed `!important` may no longer,
  and stylesheets that were previously losing to Cell may now start taking
  effect. Overrides passed through the `style` / `styles` / `contentStyle` props
  are unaffected — those still route through Aphrodite and continue to win.
