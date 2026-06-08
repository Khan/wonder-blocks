---
"@khanacademy/wonder-blocks-core": minor
"@khanacademy/wonder-blocks-cell": patch
"@khanacademy/wonder-blocks-date-picker": patch
"@khanacademy/wonder-blocks-modal": patch
---

Extend `processStyleList` to accept CSS Module class names (WB-2325, CSS
Modules Phase 1).

- `StyleType` is widened to also accept `string` (and nested arrays of
  strings). Existing `CSSProperties` / falsy / nested-array values continue
  to work unchanged.
- `processStyleList` now sorts each leaf into one of three buckets:
  Aphrodite stylesheets (detected via the existing `_definition` symbol)
  → `css(...)`; plain strings → appended to `className`; plain objects
  without `_definition` → forwarded as inline `style`. Non-string,
  non-object truthy leaves are silently ignored.
- Fast-path: when no Aphrodite stylesheet is present in the merge, the
  inline-style wrap (a `StyleSheet.create` whose only purpose was to
  outweigh Aphrodite's `!important`) is skipped, and inline styles are
  forwarded directly via React's `style` prop.

The Cell / DatePicker / Modal patches are call-site fixes for latent
spread-of-`StyleType` bugs that the widened union now flags at type-check
time. Behavior is preserved or improved (no more accidental `{0: 'f',
1: 'o', ...}` results when a non-object slips into a spread).
