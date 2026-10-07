---
"@khanacademy/wonder-blocks-typography": minor
"@khanacademy/wonder-blocks-form": patch
"@khanacademy/wonder-blocks-search-field": patch
"@khanacademy/wonder-blocks-tabs": patch
---

Add `typographyClassNames` to `@khanacademy/wonder-blocks-typography`: a CSS
Modules counterpart of the Aphrodite `styles` export, with the same keys (for
example `typographyClassNames.BodyTextMediumMediumWeight`). Each value is the
class (or pair of classes) that `Heading`, `BodyText` and `BodyMonospace`
already render with, so it declares exactly the same properties. Pass it
through the Wonder Blocks `style` prop.

The Aphrodite `styles` export is unchanged and still exported, as it is still
consumed outside this repo (including as a spreadable object).

`TextField`, `TextArea`, `SearchField` and `Tab` now use `typographyClassNames`
instead of `styles`. Rendered output is unchanged. Unlike the Aphrodite styles,
the classes are emitted in `@layer shared`, so Aphrodite styles on the same
element win regardless of their position in the `style` array. That's why:

- `SearchField` drops `display: flex` from its input reset; the typography
  style that followed it in the array always overrode it to `display: block`,
  so it never applied.
- `NavigationTabItem` keeps the Aphrodite `styles`: it styles a child `Link`,
  whose own Aphrodite `font-weight` / `font-family` would otherwise win.
