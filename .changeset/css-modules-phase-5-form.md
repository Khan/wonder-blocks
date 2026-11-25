---
"@khanacademy/wonder-blocks-form": minor
---

Migrate `TextField`, `TextArea`, `Checkbox`, `Radio`, `Choice`,
`CheckboxGroup`, `RadioGroup` and `LabeledTextField` (via `FieldHeading`) from
Aphrodite to CSS Modules (WB-2332, CSS Modules Phase 5 / Wave D). The public
component API is unchanged — same props, same DOM structure, and the same
`style` / `rootStyle` overrides — so this is an internal styling refactor.

- Styling now lives in colocated `*.module.css` files. Theming (default /
  thunderblocks / syl-dark) is unchanged: the modules read the same
  `--wb-c-form-*` variables that `build:css` already emits from `src/theme/*`,
  switched on `[data-wb-theme]`.
- The `Checkbox` / `Radio` colour matrix (checked × default / disabled / error)
  is expressed as component-token classes (`--wb-c-checkbox--*`,
  `--wb-c-radio--*`) read by the rest / hover / press rules. The per-state
  `StyleSheet.create` caches and the internal `util/styles.ts` and
  `group-styles.ts` modules are gone (neither was exported).
- Wherever a component styles a `View`, `BodyText` or `PhosphorIcon`, its rules
  are nested inside a `root` marker class so they beat those components' own
  single-class rules on specificity rather than stylesheet load order.
- The check icon's colour and size are now set by a class (the icon masks its
  glyph with `currentColor`) rather than through the `color` prop and an inline
  style.
- The checked, disabled `Radio` dot is now actually styled. It was previously
  passed an Aphrodite style object through a plain `<span style>`, so it never
  rendered; it paints the same colour as the input behind it, so nothing
  changes visually.
- `appearance: none` is no longer emitted with `-webkit-` / `-moz-` prefixes;
  every browser in the supported range handles the unprefixed property.
- Note for consumers who override these components with their own stylesheets:
  Aphrodite emitted these rules unlayered and with `!important`, whereas the CSS
  Modules build emits them in `@layer shared`, so unlayered consumer CSS now
  wins over them regardless of specificity. Overrides passed through the
  `style` prop are unaffected — those still route through Aphrodite and
  continue to win.
- The package now ships `dist/index.css` (auto side-effect import) and exposes
  it via the new `@khanacademy/wonder-blocks-form/css` subpath. `aphrodite` is
  dropped from `peerDependencies` (the package no longer imports it).
