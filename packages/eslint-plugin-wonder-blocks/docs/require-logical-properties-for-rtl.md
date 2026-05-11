# require-logical-properties-for-rtl

Require CSS logical properties (e.g. `marginInlineStart`) instead of physical ones (`marginLeft`) so styles work in both LTR and RTL writing modes.

## Rule Details

CSS physical properties (`left`, `right`, `marginLeft`, `paddingRight`, etc.) are tied to a fixed direction. In right-to-left languages (Arabic, Hebrew, Persian, Urdu), they produce mirrored, incorrect layouts. CSS logical properties (`insetInlineStart`, `marginInlineStart`, `paddingInlineEnd`, etc.) flip automatically based on the writing direction.

This rule flags physical CSS properties and CSS values that are directional, and auto-fixes the common cases.

It detects styles in two places:

- Inline `style={{ ... }}` attributes on JSX elements (including `style={[ ... ]}` arrays, ternaries, and `&&` expressions).
- `StyleSheet.create({ ... })` calls (Aphrodite and similar APIs).

### Examples of **incorrect** code

```tsx
<div style={{marginLeft: "10px"}} />
<div style={{textAlign: "left"}} />
<div style={{float: "left"}} />

StyleSheet.create({
    box: {
        paddingRight: "8px",
        borderTopLeftRadius: "4px",
    },
});
```

### Examples of **correct** code

```tsx
<div style={{marginInlineStart: "10px"}} />
<div style={{textAlign: "start"}} />
<div style={{float: "inline-start"}} /> // no auto-fix; manual swap

StyleSheet.create({
    box: {
        paddingInlineEnd: "8px",
        borderStartStartRadius: "4px",
    },
});
```

## Property mappings (auto-fixed)

| Physical | Logical |
| --- | --- |
| `marginLeft` / `marginRight` | `marginInlineStart` / `marginInlineEnd` |
| `marginTop` / `marginBottom` | `marginBlockStart` / `marginBlockEnd` |
| `paddingLeft` / `paddingRight` | `paddingInlineStart` / `paddingInlineEnd` |
| `paddingTop` / `paddingBottom` | `paddingBlockStart` / `paddingBlockEnd` |
| `left` / `right` | `insetInlineStart` / `insetInlineEnd` |
| `top` / `bottom` | `insetBlockStart` / `insetBlockEnd` |
| `maxWidth` / `minWidth` | `maxInlineSize` / `minInlineSize` |
| `maxHeight` / `minHeight` | `maxBlockSize` / `minBlockSize` |
| `borderLeft` / `borderRight` | `borderInlineStart` / `borderInlineEnd` |
| `borderTop` / `borderBottom` | `borderBlockStart` / `borderBlockEnd` |
| `borderTopLeftRadius` | `borderStartStartRadius` |
| `borderTopRightRadius` | `borderStartEndRadius` |
| `borderBottomLeftRadius` | `borderEndStartRadius` |
| `borderBottomRightRadius` | `borderEndEndRadius` |
| `borderLeftWidth/Color/Style` | `borderInlineStartWidth/Color/Style` |
| `borderRightWidth/Color/Style` | `borderInlineEndWidth/Color/Style` |
| `borderTopWidth/Color/Style` | `borderBlockStartWidth/Color/Style` |
| `borderBottomWidth/Color/Style` | `borderBlockEndWidth/Color/Style` |
| `scrollMarginLeft/Right/Top/Bottom` | `scrollMargin{Inline,Block}{Start,End}` |
| `scrollPaddingLeft/Right/Top/Bottom` | `scrollPadding{Inline,Block}{Start,End}` |
| `textAlign: "left"` / `"right"` | `textAlign: "start"` / `"end"` (value swap) |
| Two-value `padding: "A B"` | `paddingBlock: "A", paddingInline: "B"` |
| Two-value `margin: "A B"` | `marginBlock: "A", marginInline: "B"` |

## Value-based warnings (no auto-fix)

Some CSS values are directional but have no straightforward logical replacement. The rule warns about these so they can be reviewed manually.

| Property | Warning | Default |
| --- | --- | --- |
| `float: "left"` / `"right"` | Use `inline-start` / `inline-end` | always on |
| `clear: "left"` / `"right"` | Use `inline-start` / `inline-end` | always on |
| `direction: "ltr"` / `"rtl"` | Don't force direction in styles; rely on container `dir` | always on |
| `backgroundPosition` containing `left`/`right` | Use percentages or conditional assets | option `warnBackgroundPosition` |
| `backgroundPositionX/Y` with directional keywords | Same | option `warnBackgroundPositionXY` |
| `linear-gradient(to left/right/top/bottom, ...)` | Gradients are physical; verify or flip | option `warnGradients` |
| `transform: "translateX(...)"` | translateX is directional | option `warnDirectionalTransforms` |
| `transformOrigin` containing `left`/`right` | Use percentages instead | option `warnDirectionalTransforms` |
| `boxShadow` / `textShadow` with a horizontal offset | Verify in RTL or conditionally flip the X sign | option `warnShadows` |
| `cursor: "e-resize"` / `"w-resize"` | Use `ew-resize` or conditional swap | option `warnCursorDirections` |

## Options

```ts
{
    "@khanacademy/wonder-blocks/require-logical-properties-for-rtl": ["error", {
        warnBackgroundPosition: true,        // default: true
        warnBackgroundPositionXY: false,     // default: false
        warnGradients: false,                // default: false
        warnDirectionalTransforms: false,    // default: false
        warnShadows: false,                  // default: false
        warnCursorDirections: false,         // default: false
    }],
}
```

All options are booleans. Property-name and `textAlign` fixes always run regardless of options; the options only gate the value-based warnings listed above.

## When not to use

This rule is enabled in the recommended config. Disable per-line with `// eslint-disable-next-line @khanacademy/wonder-blocks/require-logical-properties-for-rtl` when a physical property is genuinely intentional (rare).
