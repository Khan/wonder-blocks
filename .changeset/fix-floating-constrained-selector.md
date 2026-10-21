---
"@khanacademy/wonder-blocks-floating": patch
---

Fix the `.constrained` selector in `floating.module.css`. A stray colon
(`.constrained: {`) made the rule invalid, so browsers dropped it and
`constrainSize` lost its `display: flex; flex-direction: column` layout.
