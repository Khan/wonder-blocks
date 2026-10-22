---
"@khanacademy/wonder-blocks-floating": minor
---

- Add `onMouseEnter` and `onMouseLeave` props, called when the pointer enters or leaves the floating element (including its border and arrow).
- Keep the floating element visible when the reference element is hidden if the floating and reference elements together are taller than the viewport (e.g. on very small screens or at 400% zoom), so it doesn't disappear while users scroll through it.
