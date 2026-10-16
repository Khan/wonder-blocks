---
"@khanacademy/wonder-blocks-core": minor
---

`processStyleList` (used by `View`, `Text` and `addStyle`) now returns plain
style objects as the DOM `style` attribute when the style list contains no
Aphrodite stylesheets, instead of wrapping them into a generated Aphrodite
class.

- **What changes:** with only CSS Module class names and plain objects in
  `style`, the plain objects render as `style="…"`. They still win over the CSS
  Module rules (which live in a cascade layer), as they did before. Dynamic
  values no longer generate and inject a new Aphrodite class each.
- **What stays the same:** lists that include an Aphrodite stylesheet keep the
  previous behavior, so the stylesheet's pseudo-class and media query rules can
  still override the inline values. Plain objects with nested keys
  (pseudo-selectors, media queries, keyframe objects, array fallbacks) also
  keep going through Aphrodite.
- **Note for consumers:** tests or snapshots that match the generated
  `inlineStyles_*` class name on such elements will see a `style` attribute
  instead. Prefixes that Aphrodite added automatically (for example
  `-webkit-user-select`) are not added to the `style` attribute.
