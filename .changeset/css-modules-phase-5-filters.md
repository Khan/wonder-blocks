---
"@khanacademy/wonder-blocks-filters": minor
---

Migrate `ExclusiveCategoryFilter` from Aphrodite to CSS Modules (WB-2618, CSS
Modules Phase 5 / Wave J). The public component API is unchanged: same props,
same DOM structure, and the same `styles.*` overrides.

- Styling now lives in `exclusive-category-filter.module.css`. Every rule is
  nested under a `.root` marker class on the root `View`, so the overrides of
  `View` and typography styles win on specificity rather than stylesheet load
  order.
- The options use `typographyClassNames.BodyTextMediumSemiWeight` instead of
  the Aphrodite `styles.BodyTextMediumSemiWeight` from
  `wonder-blocks-typography`.
- **Behavior change for `styles.option` overrides:** a consumer override of a
  property the option changes on hover / press (`border-color`,
  `border-width`, `padding-inline`) now applies in every state, rather than
  being replaced by the built-in hover / press style. This matches `Link` and
  `Tabs`.
- `aphrodite` is dropped from `peerDependencies`. The package now declares CSS
  `sideEffects` and exposes its stylesheet as
  `@khanacademy/wonder-blocks-filters/css`.
