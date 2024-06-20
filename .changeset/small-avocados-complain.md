---
"@khanacademy/wonder-blocks-clickable": patch
"@khanacademy/wonder-blocks-dropdown": patch
"@khanacademy/wonder-blocks-cell": minor
---

Improves accessibility of the checked status on `OptionItem` components used
within the `ActionMenu` component. The checked status is communicated to
screenreaders by using a `menuitemcheckbox` role with the `aria-checked`
attribute (instead of `aria-selected`).
    - `CellCore` (used by `CompactCell` and `DetailCell`) has a new optional
    prop for `aria-checked`
    - `ClickableRole` type now supports the `menuitemcheckbox` role
    - `OptionItem`'s `role` prop now also supports the `menuitemcheckbox` role
