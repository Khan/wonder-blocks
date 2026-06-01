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
| `border{Top,Bottom}{Left,Right}Radius` (all 4 corners) | `border{Start,End}{Start,End}Radius` |
| `border{Left,Right,Top,Bottom}{Width,Color,Style}` (all 4 sides × 3 sub-props) | `border{InlineStart,InlineEnd,BlockStart,BlockEnd}{Width,Color,Style}` |
| `scrollMarginLeft/Right/Top/Bottom` | `scrollMargin{Inline,Block}{Start,End}` |
| `scrollPaddingLeft/Right/Top/Bottom` | `scrollPadding{Inline,Block}{Start,End}` |
| `textAlign: "left"` / `"right"` | `textAlign: "start"` / `"end"` (value swap) |
| `float: "left"` / `"right"` | `float: "inline-start"` / `"inline-end"` (value swap) |
| `clear: "left"` / `"right"` | `clear: "inline-start"` / `"inline-end"` (value swap) |
| `padding: "A B"` / `"A B C"` / `"A B C D"` | `paddingBlock`/`paddingInline`/`paddingBlockStart`/`paddingInlineEnd`/… |
| `margin: "A B"` / `"A B C"` / `"A B C D"` | `marginBlock`/`marginInline`/`marginBlockStart`/`marginInlineEnd`/… |

The 4-value `padding`/`margin` shorthand is the case that genuinely breaks in RTL — its left and right values differ and don't auto-mirror. Values containing functions (`calc()`, `var()`, …) are left alone since they can't be split safely. The `float`/`clear` flow-relative values are [Baseline / widely available](https://developer.mozilla.org/en-US/docs/Web/CSS/clear).

## Value-based warnings (no auto-fix)

Some CSS values are directional but have no logical replacement, so the rule reports them for manual review.

| Property | Warning | Default |
| --- | --- | --- |
| `direction: "ltr"` / `"rtl"` | Don't force direction in styles; rely on container `dir` | always on |
| `backgroundPosition` / `background` containing `left`/`right` | Use percentages or conditional assets | always on |

Directional `transform`/`transformOrigin`, `boxShadow`/`textShadow`, `linear-gradient` directions, `cursor` resize directions, and `backgroundPositionX/Y` are intentionally **not** checked. They have no logical-property fix, and the heuristics produced almost entirely false positives on RTL-safe code (`translateX(-50%)` centering, symmetric gradients, X-offset shadows, block-axis `backgroundPositionY`), forcing `eslint-disable` suppressions on correct code.

## Options

The rule takes no options. Every check above either auto-fixes or always reports. To allow a genuinely intentional physical value, disable it per-line (see below) — the same escape hatch used for `direction` and `backgroundPosition`.

## When not to use

This rule is enabled in the recommended config. Disable per-line with `// eslint-disable-next-line @khanacademy/wonder-blocks/require-logical-properties-for-rtl` when a physical property is genuinely intentional (rare).
