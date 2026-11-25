---
"@khanacademy/wonder-blocks-floating": minor
---

- Add `onMouseEnter` and `onMouseLeave` props, called when the pointer enters or leaves the floating element (including its border and arrow).
- Keep the floating element visible when the reference element is hidden if the floating and reference elements together are taller than the viewport (e.g. on very small screens, at 400% zoom or when pinch-zoomed), so it doesn't disappear while users scroll through it. For `left`/`right` placements, which put the elements side by side, only the taller of the two has to exceed the viewport.
