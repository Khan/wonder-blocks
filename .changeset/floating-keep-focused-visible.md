---
"@khanacademy/wonder-blocks-floating": patch
---

Don't hide the floating element (via the `hide` middleware) while a text field inside of it has focus. This fixes the virtual keyboard closing right after focusing a text field inside a popover on mobile devices.
