---
"@khanacademy/wonder-blocks-tabs": minor
---

Migrate `TabsDropdown` and `NavigationTabsDropdown` (the dropdown layouts of
`ResponsiveTabs` and `ResponsiveNavigationTabs`) from Aphrodite to CSS Modules
(WB-2618, CSS Modules Phase 5 / Wave J). The public component API is
unchanged: same props, same DOM structure, and the same `styles.*` overrides.

- Styling now lives in colocated `*.module.css` files. The overrides of
  `ActionMenu`'s wrapper, the `Button` opener and its label are nested under a
  `.root` marker class on each component's root element, so they win over the
  dropdown, button and core rules on specificity rather than stylesheet load
  order.
- `wonder-blocks-tabs` no longer uses Aphrodite, so `aphrodite` is dropped from
  its `peerDependencies`. The package now declares CSS `sideEffects` and
  exposes its stylesheet as `@khanacademy/wonder-blocks-tabs/css`.
