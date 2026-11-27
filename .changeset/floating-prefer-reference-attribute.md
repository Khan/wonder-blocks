---
"@khanacademy/wonder-blocks-floating": patch
---

`Floating` now anchors to the element that receives the `FloatingReferenceAttributeName` attribute when there is one, and only falls back to the element its injected ref is attached to. This lets components whose ref points at an inner element (e.g. `Switch` and `Checkbox`, whose ref points at their `<input>`) anchor a `Popover` to their whole root element. Triggers that pass both to the same element are unaffected.
