---
"@khanacademy/wonder-blocks-dropdown": patch
---

Allow `SingleSelect` and `MultiSelect` to be focusable when disabled. These components now have `aria-disabled` when the `disabled` prop is `true`. This makes it so screenreaders will continue to communicate that the component is disabled, while allowing focus on the disabled component. Focus styling is also added to the disabled state.
