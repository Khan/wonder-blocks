---
"@khanacademy/wonder-blocks-clickable": minor
"@khanacademy/wonder-blocks-link": minor
"@khanacademy/wonder-blocks-styles": minor
"@khanacademy/wonder-blocks-cell": patch
---

`Clickable` and `Link` now guarantee a minimum 24x24 pointer target, satisfying WCAG 2.5.8 (Target Size, Minimum). The hit area is expanded with a transparent `::after` pseudo-element rather than by growing the element, so **visual layout is unchanged**.

The new shared style is exported as `minTargetSizeStyles` from `@khanacademy/wonder-blocks-styles`, alongside `focusStyles` and `actionStyles`, for components that compose their own style arrays.

Both components accept a new `disableMinTargetSize` prop (defaults to `false`) to opt out. Opt out where the expanded hit area would overlap an adjacent target, where a `Clickable` wraps its own interactive elements that the hit area would otherwise cover, or where the element already draws its own `::after`.

That last case matters if you pass a `style` that defines `:after` or `::after`: they are the same pseudo-element, so your rule and the hit area cascade together at equal specificity (both `!important`) and merge per-property by source order, breaking both. `Cell` hits exactly this — it draws its horizontal rule with `:after` on the `Clickable` element — so `Cell` (and `DetailCell`, `OptionItem`, `ActionItem`, which all render through it) sets `disableMinTargetSize` internally. Those are all at least 44px tall already, so no target-size guarantee is lost.

Notes:

- `Link` skips this for `inline` links regardless of the prop. WCAG 2.5.8 exempts targets whose size is constrained by the line-height of surrounding text, and expanding an inline link would steal clicks from adjacent lines.
- Because the hit area extends beyond the element's visual box, small controls placed closer than 24px apart will have overlapping hit areas, and the later-painted one wins. Either space them at least 24px apart (which satisfies WCAG 2.5.8's own spacing exception) or set `disableMinTargetSize`.
- Both components now set `position: relative` when the hit area is applied, which makes them a containing block for any absolutely-positioned descendants that previously resolved against an ancestor.
- Like the other `wonder-blocks-styles` exports, `minTargetSizeStyles.minTargetSize` is a plain object rather than an Aphrodite stylesheet, so it can be spread into a style object. Two consequences for a `style` you pass to `Clickable` or `Link`. A `style` built with `StyleSheet.create` stays its own class and merges with the hit area per-property, but is now applied *before* it — so it can add to the `::after` (a shadow, say) yet no longer override `position: relative`. A plain-object `style` is instead merged into the same class, so a `::after` of your own **replaces** the hit area wholesale rather than merging with it. In either case, compose rather than collide by spreading the hit area into your own rule:

  ```tsx
  <Clickable
      style={{
          "::after": {
              ...minTargetSizeStyles.minTargetSize["::after"],
              boxShadow: boxShadow.mid,
          },
      }}
  >
  ```
- If your Jest setup inlines Aphrodite styles (`SNAPSHOT_INLINE_APHRODITE`, as Wonder Blocks' own config does), nested selectors are not applied on that path, so the `::after` hit area will not appear in snapshots.
