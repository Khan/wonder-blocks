---
"@khanacademy/wonder-blocks-button": patch
---

Button: Removes unnecessary aria-hidden on start icon. This opens up the option
to add an accessible name to the icon if needed. By default, the start icon
isn't included in the accessibility tree because PhosphorIcon renders a `span`
and needs `role="image"` and the `aria-label` set explicitly.
