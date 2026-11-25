---
"@khanacademy/wonder-blocks-popover": minor
---

Migrate `PopoverContent` and `PopoverContentCore` from Aphrodite to CSS
Modules (WB-2333, CSS Modules Phase 5 / Wave E). The public component API is
unchanged: same props, same DOM structure, and the same `style` override.

- Styling now lives in `popover-content-core.module.css` and
  `popover-content.module.css`.
- `PopoverContentCore` nests the content and close-button rules under a `.root`
  marker class on its `ScrollableView`, and `PopoverContent` passes its own
  `.root` marker through `PopoverContentCore`'s `style`, so their overrides of
  `View`, typography and `IconButton` styles win on specificity rather than
  stylesheet load order.
- The consumer's `style`, the close button's `actionStyles.inverse` and
  `ScrollableView`'s own styles still go through Aphrodite, so they keep their
  precedence.
- The package now ships `dist/index.css` (auto side-effect import) and declares
  `sideEffects`. `aphrodite` is dropped from `peerDependencies`.
