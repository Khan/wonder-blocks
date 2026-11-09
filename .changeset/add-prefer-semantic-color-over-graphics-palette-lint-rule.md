---
"@khanacademy/eslint-plugin-wonder-blocks": minor
---

Add the `prefer-semantic-color-over-graphics-palette` rule to the `recommended` and `strict` configs. It reports uses of `graphicsPalette` from `@khanacademy/wonder-blocks-tokens`, since those colors stay the same in every theme. Uses in SVG `fill`, `stroke` and `stopColor` attributes (e.g. `<path fill={graphicsPalette.gray_30} />`) are allowed. Prefer a themable `semanticColor` token, or disable the rule with a comment explaining why the color must stay the same in every theme.
