---
"@khanacademy/wonder-blocks-styles": major
"@khanacademy/wonder-blocks-clickable": patch
"@khanacademy/wonder-blocks-link": patch
---

Swap out the `::after` pseudo-element for `::before` in `minTargetSizeStyles.minTargetSize` so that Cypress doesn't claim the element is obscured by another element. `::before` paints before the element's children, so when a test targets a descendant of a `Clickable` or `Link`, `elementFromPoint` resolves to that descendant rather than to the clickable ancestor. Pointer events on a pseudo-element still target the originating element, so the 24x24 target size guarantee is unchanged.

**Breaking:** `minTargetSizeStyles.minTargetSize` now defines `::before` instead of `::after`. If you spread `minTargetSize["::after"]` into a rule of your own, change both the key you spread from and the rule you spread into to `::before`:

```tsx
<Clickable
    style={{
        "::before": {
            ...minTargetSizeStyles.minTargetSize["::before"],
            boxShadow: boxShadow.mid,
        },
    }}
>
```

Note that `:before` and `::before` are the same pseudo-element, so a `style` of your own that defines either form now collides with the hit area where a `::after` rule previously did not. `Cell` is the in-repo example: it draws the left bar indicator for its active and press states with `:before`, so it continues to set `disableMinTargetSize` internally.
