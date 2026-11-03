---
"@khanacademy/wonder-blocks-modal": minor
---

Migrate `wonder-blocks-modal` from Aphrodite to CSS Modules (WB-2333, CSS
Modules Phase 5 / Wave E). The public component API is unchanged: same props,
same DOM structure, and the same `style` / `styles` overrides.

- Styling now lives in a colocated `*.module.css` per component. Theming is
  unchanged: the theme-dependent values still come from the `--wb-c-modal-*`
  variables that `build:css` emits from `src/theme/*`.
- Every rule is nested under a `.root` marker class on its component's root
  `View`, so the overrides of `View`, typography and `IconButton` styles win on
  specificity rather than stylesheet load order.
- Styles that one component passes into another (`OnePaneDialog` →
  `ModalDialog`, `ModalPanel` → `ModalContent`, `DrawerDialog` →
  `FlexibleDialog`) live in the receiving component's module, so source order
  reproduces the old Aphrodite merge order.
- `DrawerBackdrop`'s fade is now a CSS `@keyframes` animation. The `animated`
  prop still gates it, and the drawer panel's slide animation is unchanged.
- The small-screen rules for elements a consumer can style (screens ≤ 767px
  wide or ≤ 500px tall, and ≤ 681px for `DrawerDialog`) stay plain style
  objects in `util/small-screen-styles.ts`. A consumer's `style` still goes
  through Aphrodite, which would outrank any `@layer shared` rule, so this keeps
  today's behavior: those rules still beat a consumer's base `width`, `height`,
  `overflow`, `flex-direction`, `padding-inline` and min/max inline size on
  small screens.
- **Behavior change:** a consumer override that sets one of those properties
  inside its *own* media query (as an Aphrodite `StyleSheet` style) no longer
  wins on small screens; Modal's small-screen rule does. Plain-object
  overrides are unaffected.
- The package now ships `dist/index.css` (auto side-effect import) and exposes
  it via the new `@khanacademy/wonder-blocks-modal/css` subpath. `aphrodite` is
  dropped from `peerDependencies`.
