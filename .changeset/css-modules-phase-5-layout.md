---
"@khanacademy/wonder-blocks-layout": minor
---

Migrate `Spring` and `ScrollableView` from Aphrodite to CSS Modules (WB-2486,
CSS Modules Phase 5 / Wave I). The public component API is unchanged: same
props, DOM structure and `style` override.

- `Spring`'s `flex-grow: 1` and `ScrollableView`'s scroll, focus and fade
  styles now live in `spring.module.css` and `scrollable-view.module.css`.
  `View` doesn't set any of these properties, so single classes are enough.
- The fades are still toggled through the
  `--wb-scrollable-view-fade-{top,bottom}-opacity` custom properties set inline
  on the element; their `0` defaults are now declared on the root class.
- `MediaLayout` is unchanged and still uses Aphrodite types: it's deprecated and
  will be removed instead (WB-2401). `Strut` already didn't use Aphrodite.
- **Behavior change (edge case):** an `outline` or `box-shadow` passed to
  `ScrollableView` through `style` (plain object or Aphrodite `StyleSheet`) now
  also applies while the view has keyboard focus, replacing the focus ring.
  Before, the focus ring won while focused.
- The package now ships `dist/index.css` (auto side-effect import) and marks
  `**/*.css` as `sideEffects`. `aphrodite` stays a peer dependency because
  `MediaLayout`'s types still import it.
