---
"@khanacademy/wonder-blocks-accordion": patch
"@khanacademy/wonder-blocks-button": patch
"@khanacademy/wonder-blocks-icon-button": patch
"@khanacademy/wonder-blocks-clickable": patch
"@khanacademy/wonder-blocks-dropdown": patch
"@khanacademy/wonder-blocks-modal": patch
"@khanacademy/wonder-blocks-progress-spinner": patch
---

Fix Stylelint warnings: use the `border.width.thin` and `border.width.medium` tokens, the `semanticColor.core.transparent` token, and logical properties (`inline-size`/`block-size`) instead of raw values and physical properties, and document the intentional raw values. Rendering is unchanged; the hashed class names change.
