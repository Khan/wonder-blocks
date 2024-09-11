---
"@khanacademy/wonder-blocks-form": patch
---

Allow `TextField` to be focusable when disabled. It now sets `aria-disabled` instead of the `disabled` attribute based on the `disabled` prop. This makes it so screenreaders will continue to communicate that the component is disabled, while allowing focus on the disabled component. Focus styling is also added to the disabled state.
