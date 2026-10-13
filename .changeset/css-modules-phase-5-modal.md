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
- **Behavior change for `style` / `styles` overrides at small viewports:** the
  responsive rules (screens ≤ 767px wide or ≤ 500px tall, and ≤ 681px for
  `DrawerDialog`) now sit in `@layer shared`, while a consumer's `style` still
  goes through Aphrodite (unlayered and `!important`). A consumer override of a
  property those rules also set now applies at every viewport. Previously the
  responsive value replaced it on small screens. Affected properties: `width`,
  `height` and `overflow` on `OnePaneDialog` / `ModalDialog`; `padding-inline`
  on `ModalContent` (including `FlexibleDialog`'s `styles.content`);
  `min-inline-size` / `max-inline-size` on `DrawerDialog`'s `styles.root`. To
  keep a responsive value, pass it in the override's own media query.
- The package now ships `dist/index.css` (auto side-effect import) and exposes
  it via the new `@khanacademy/wonder-blocks-modal/css` subpath. `aphrodite` is
  dropped from `peerDependencies`.
