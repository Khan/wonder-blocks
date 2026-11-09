---
"@khanacademy/eslint-plugin-wonder-blocks": minor
---

Add the `prefer-semantic-color` rule to the `strict` config. It reports uses of `graphicsPalette` from `@khanacademy/wonder-blocks-tokens`, since those colors stay the same in every theme. Uses in attributes of SVG elements (e.g. `<path fill={graphicsPalette.gray_30} />`) are allowed. Prefer a themable `semanticColor` token, or disable the rule with a comment explaining why the color must stay the same in every theme.
