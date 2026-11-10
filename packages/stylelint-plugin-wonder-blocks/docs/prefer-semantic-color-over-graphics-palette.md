# prefer-semantic-color-over-graphics-palette

Prefer themable `semanticColor` tokens over `graphicsPalette` color tokens,
which stay the same in every theme. `graphicsPalette` is allowed in the `fill`
and `stroke` properties, and elsewhere with a disable comment explaining why the
color must stay the same.

This is the CSS version of the ESLint rule
[`prefer-semantic-color-over-graphics-palette`](https://github.com/Khan/wonder-blocks/blob/main/packages/eslint-plugin-wonder-blocks/docs/prefer-semantic-color-over-graphics-palette.md)
from `@khanacademy/eslint-plugin-wonder-blocks`. Both rules have the same name,
the same message and the same exemption, so the policy is the same in JS and
CSS.

Full rule name: `@khanacademy/wonder-blocks/prefer-semantic-color-over-graphics-palette`

## Rule Details

`@khanacademy/wonder-blocks-tokens` exports two kinds of color tokens:

- **`semanticColor`** tokens adapt to the current theme. They are the default
  choice for UI.
- **`graphicsPalette`** tokens (`red_01`…`red_90`, the same for orange, yellow,
  green, cyan, blue, magenta and gray, plus `black_100` and `white_100`) are
  **the same in every theme**. They are meant for colors that must not change
  with the theme, such as illustrations and custom assets.

In CSS, each `graphicsPalette` token is a CSS variable,
`var(--wb-graphicsPalette-<name>)`, e.g. `var(--wb-graphicsPalette-blue_30)`.

Using `graphicsPalette` for UI means that part of the UI doesn't follow the
theme (for example, it stays light in a dark theme). To make each use a
deliberate choice, this rule reports every `--wb-graphicsPalette-` variable
reference in a declaration value, wherever it appears:

- on its own, e.g. `color: var(--wb-graphicsPalette-blue_30)`;
- in shorthands, e.g. `border: 1px solid var(--wb-graphicsPalette-gray_60)`;
- in gradients and `box-shadow`;
- in `var()` fallbacks, e.g. `var(--x, var(--wb-graphicsPalette-red_30))`;
- in custom property definitions, e.g.
  `--my-color: var(--wb-graphicsPalette-green_30)`.

Each variable reference is reported once, so a gradient with two palette colors
is two reports.

Other Wonder Blocks variables (e.g. `--wb-semanticColor-…`) aren't reported,
and neither is text that mentions `graphicsPalette` without the variable
prefix, or text in comments and strings.

### Allowed: `fill` and `stroke`

SVG artwork usually needs colors that stay the same in every theme, so
`graphicsPalette` is allowed in the `fill` and `stroke` properties. This
matches the ESLint rule, which allows the SVG `fill` and `stroke` attributes.
In CSS, `fill` and `stroke` only apply to SVG content.

```css
.illustration path {
    fill: var(--wb-graphicsPalette-gray_30);
    stroke: var(--wb-graphicsPalette-black_100);
}
```

These are still reported:

- other SVG color properties, e.g. `stop-color`, `flood-color` and
  `lighting-color`;
- custom properties that are later used in `fill` or `stroke`, e.g.
  `--icon-fill: var(--wb-graphicsPalette-gray_30)` is reported where it's
  defined.

## When to disable this rule

Disable the rule when a color really must stay the same in every theme, for
example:

- illustration and artwork colors outside the `fill` and `stroke`
  properties, e.g. gradient `stop-color`s or an illustration's background;
- custom assets that match a fixed brand or artwork color.

Always explain why in the disable comment, after `--`:

```css
/* stylelint-disable-next-line @khanacademy/wonder-blocks/prefer-semantic-color-over-graphics-palette -- Illustration artwork; colors stay the same in every theme */
```

## Examples

### Incorrect

A color on its own:

```css
.card {
    background-color: var(--wb-graphicsPalette-blue_80);
}
```

In a shorthand:

```css
.card {
    border: 1px solid var(--wb-graphicsPalette-gray_60);
}
```

In a gradient:

```css
.banner {
    background: linear-gradient(
        var(--wb-graphicsPalette-red_30),
        var(--wb-graphicsPalette-blue_30)
    );
}
```

In a `var()` fallback:

```css
.card {
    color: var(--card-color, var(--wb-graphicsPalette-gray_90));
}
```

In a custom property definition:

```css
:root {
    --accent: var(--wb-graphicsPalette-magenta_30);
}
```

### Correct

Preferred: a themable `semanticColor` token:

```css
.card {
    background-color: var(--wb-semanticColor-core-background-base-default);
}
```

The `fill` and `stroke` properties:

```css
.illustration path {
    fill: var(--wb-graphicsPalette-gray_30);
    stroke: var(--wb-graphicsPalette-black_100);
}
```

Outside `fill` and `stroke`, disabled with a reason:

```css
.illustration {
    /* stylelint-disable-next-line @khanacademy/wonder-blocks/prefer-semantic-color-over-graphics-palette -- Illustration artwork; colors stay the same in every theme */
    background-color: var(--wb-graphicsPalette-gray_30);
}
```
