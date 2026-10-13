---
"@khanacademy/wonder-blocks-floating": minor
---

Add `size` prop (enabled by default) that constrains the floating element to the space available within the boundary, so it isn't cut off on small screens or at high zoom levels.

The floating element is no longer hidden (via the `hide` middleware) while it contains the focused element. This fixes the virtual keyboard closing right after focusing a text field inside a popover on mobile devices.
