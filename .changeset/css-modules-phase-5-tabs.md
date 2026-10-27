---
"@khanacademy/wonder-blocks-tabs": minor
---

Migrate `Tabs`, `Tab`, `Tablist`, `TabPanel`, `NavigationTabs`,
`NavigationTabItem`, `ResponsiveTabs` and `ResponsiveNavigationTabs` from
Aphrodite to CSS Modules (WB-2334, CSS Modules Phase 5 / Wave F). The public
component API is unchanged — same props, same DOM structure, and the same
`style` / `styles.*` overrides.

- Styling now lives in colocated `*.module.css` files. The fade-in between the
  tabs and dropdown layouts is now a CSS `@keyframes` animation scoped to the
  module.
- `Tab` qualifies its rules with a `root` marker class so they outrank the
  typography classes on the same button (`display`, `margin`).
- `NavigationTabItem` styles its child link with rules nested inside the list
  item, so they outrank `Link`'s own CSS Modules rules on specificity. The link
  rule now declares the BodyText medium typography itself instead of applying
  the Aphrodite `styles.BodyTextMediumMediumWeight` from
  `wonder-blocks-typography`.
- **Behavior change for `style` / `styles.tab` overrides:** as with `Link`, a
  consumer override of a property the tab changes on hover / press (most
  commonly `color`) now applies in every state, rather than being replaced
  by the built-in hover / press colour.
- `TabsDropdown` and `NavigationTabsDropdown` still use Aphrodite. Their styles
  override the not-yet-migrated `wonder-blocks-dropdown` components (Phase 5 /
  Wave H, WB-2485) and move with them, so `aphrodite` stays in this package's
  `peerDependencies` for now.
- The package now ships `dist/index.css` (auto side-effect import).
