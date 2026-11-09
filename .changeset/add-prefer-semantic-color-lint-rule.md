---
"@khanacademy/eslint-plugin-wonder-blocks": minor
---

Add the `prefer-semantic-color` rule to the `strict` config. It reports every use of `graphicsPalette` from `@khanacademy/wonder-blocks-tokens`, since those colors stay the same in every theme. Prefer a themable `semanticColor` token, or disable the rule with a comment explaining why the color must stay the same in every theme.
