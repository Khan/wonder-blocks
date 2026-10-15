---
"@khanacademy/wonder-blocks-floating": patch
---

Don't hide the floating element (via the `hide` middleware) while it contains the focused element. This fixes the virtual keyboard closing right after focusing a text field inside a popover on mobile devices.
