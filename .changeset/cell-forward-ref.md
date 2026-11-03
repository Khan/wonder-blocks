---
"@khanacademy/wonder-blocks-cell": minor
---

`DetailCell` and `CompactCell` now forward their `ref` to the root DOM element: the `<button>` (with `onClick`) or `<a>` (with `href`) when the cell is pressable, otherwise the wrapping `<div>`.
