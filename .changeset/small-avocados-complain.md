---
"@khanacademy/wonder-blocks-clickable": patch
"@khanacademy/wonder-blocks-dropdown": patch
"@khanacademy/wonder-blocks-cell": patch
---

Improves accessibility of the checked status on `OptionItem` components used
within the `ActionMenu` component. The checked status is communicated to
screenreaders by using a `menuitemcheckbox` role with the `aria-checked`
attribute (instead of `aria-selected`).
