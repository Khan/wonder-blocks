---
"@khanacademy/wonder-blocks-tooltip": minor
---

Migrate `Tooltip` from Aphrodite to CSS Modules (WB-2333, CSS Modules Phase 5 /
Wave E). The public component API is unchanged: same props, same DOM
structure, and the same `contentStyle` / `backgroundColor` overrides.

- Styling now lives in `tooltip-bubble.module.css`,
  `tooltip-content.module.css` and `tooltip-tail.module.css`.
- `TooltipBubble` and `TooltipContent` nest their rules under a `.root` marker
  class, so their overrides of `View`'s `position`, `flex-direction`, `border`
  and `padding` win on specificity rather than stylesheet load order.
- Popper's positioning, the legacy `backgroundColor` and `contentStyle` are
  still plain style objects, so they keep their precedence (including
  `backgroundColor` over the `strong` variant's background).
- The `Offset` and `ContentStyle` types now use `React.CSSProperties` in place
  of Aphrodite's `CSSProperties`, which resolves to the same types for these
  keys.
- The package now ships `dist/index.css` (auto side-effect import) and declares
  `sideEffects`. `aphrodite` is dropped from `peerDependencies`.
