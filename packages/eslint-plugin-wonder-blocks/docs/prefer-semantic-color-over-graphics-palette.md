# prefer-semantic-color-over-graphics-palette

Prefer themable `semanticColor` tokens over `graphicsPalette` color tokens,
which stay the same in every theme. `graphicsPalette` is allowed in SVG `fill`
and `stroke` attributes, and elsewhere with a disable comment explaining why the
color must stay the same.

This rule only checks `graphicsPalette`. Hardcoded colors (hex, `rgb()`, named
colors) are reported by [`no-hardcoded-color`](no-hardcoded-color.md).

## Rule Details

`@khanacademy/wonder-blocks-tokens` exports two kinds of color tokens:

- **`semanticColor`** tokens adapt to the current theme. They are the default
  choice for UI.
- **`graphicsPalette`** tokens (`red_01`…`red_90`, the same for orange, yellow,
  green, cyan, blue, magenta and gray, plus `black_100` and `white_100`) are
  **the same in every theme**. They are meant for colors that must not change
  with the theme, such as illustrations and custom assets.

Using `graphicsPalette` for UI means that part of the UI doesn't follow the
theme (for example, it stays light in a dark theme). To make each use a
deliberate choice, this rule reports uses of `graphicsPalette` wherever they
appear: style objects, `style` props, component props, plain constants, chart
and canvas config, `tokenValue(...)` calls, and passing or spreading the whole
object. The one exception is SVG color attributes (see below).

The rule finds `graphicsPalette` through imports from
`@khanacademy/wonder-blocks-tokens`:

```ts
import {graphicsPalette} from "@khanacademy/wonder-blocks-tokens";
import {graphicsPalette as gp} from "@khanacademy/wonder-blocks-tokens";
import * as tokens from "@khanacademy/wonder-blocks-tokens"; // tokens.graphicsPalette
```

It also reports palette CSS variables written out in strings and template
literals, which would otherwise get around the import check:

```ts
const border = `2px solid var(--wb-graphicsPalette-red_20)`;
<path fill="var(--wb-graphicsPalette-yellow_30)" />;
```

Each reference is reported once: `graphicsPalette.red_30` is one report.
Destructuring (`const {red_30} = graphicsPalette`) is reported once, at the
destructuring; uses of the new variables aren't reported again.

Identifiers named `graphicsPalette` that don't come from the tokens package
aren't reported.

### Allowed: SVG `fill` and `stroke`

SVG artwork usually needs colors that stay the same in every theme, so
`graphicsPalette` is allowed in the `fill` and `stroke` attributes of elements
like `<path>`, `<circle>` and `<rect>`:

```tsx
<svg viewBox="0 0 24 24">
    <path fill={graphicsPalette.gray_30} stroke={graphicsPalette.black_100} />
    <circle fill={graphicsPalette.red_30} />
</svg>
```

These are still reported:

- other attributes, including `style` objects, e.g.
  `<path style={{fill: graphicsPalette.gray_30}} />`, and other color
  attributes like `stopColor` and `floodColor`;
- components, e.g. `<PhosphorIcon color={...} />` or `<Icon fill={...} />`,
  even if the component renders an SVG;
- child content, e.g. `<text>{graphicsPalette.gray_30}</text>`;
- functions inside an attribute, e.g. `onClick={() => setColor(...)}`;
- spreading the palette as props, e.g. `<path {...graphicsPalette} />`;
- colors defined outside the SVG and passed in, e.g. `const FILL = graphicsPalette.gray_30` is reported where it's defined.

## When to disable this rule

Disable the rule when a color really must stay the same in every theme, for
example:

- illustration and artwork colors outside SVG `fill` and `stroke` attributes,
  e.g. gradient `stopColor`s;
- canvas drawings or exported images (PNG, PDF) whose colors must not change
  with the theme;
- custom assets that match a fixed brand or artwork color.

Always explain why in the disable comment.

## Examples

### Incorrect

In a `StyleSheet.create` style:

```tsx
StyleSheet.create({card: {backgroundColor: graphicsPalette.blue_80}});
```

In a component prop:

```tsx
<PhosphorIcon icon={star} color={graphicsPalette.yellow_30} />
```

In an inline `style` prop:

```tsx
<div style={{borderColor: graphicsPalette.gray_30}} />
```

Bracket access, including dynamic keys:

```tsx
const accent = graphicsPalette["red_01"];
const fill = graphicsPalette[`blue_${step}`];
```

Destructuring from the palette:

```tsx
const {red_30} = graphicsPalette;
```

Passing the whole palette:

```tsx
renderChart({colors: graphicsPalette});
```

A palette CSS variable written out in a string:

```tsx
const border = "1px solid var(--wb-graphicsPalette-gray_60)";
```

### Correct

Preferred: a themable `semanticColor` token:

```tsx
StyleSheet.create({
    card: {backgroundColor: semanticColor.core.background.base.default},
});
```

SVG `fill` and `stroke` attributes:

```tsx
<svg viewBox="0 0 24 24">
    <path fill={graphicsPalette.gray_30} stroke={graphicsPalette.black_100} />
</svg>
```

Outside SVG, disabled with a reason:

```tsx
StyleSheet.create({
    illustration: {
        // eslint-disable-next-line @khanacademy/wonder-blocks/prefer-semantic-color-over-graphics-palette -- Illustration artwork; colors stay the same in every theme
        backgroundColor: graphicsPalette.gray_30,
    },
});
```
