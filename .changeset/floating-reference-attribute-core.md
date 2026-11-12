---
"@khanacademy/wonder-blocks-core": minor
"@khanacademy/wonder-blocks-floating": patch
---

Export `FloatingReferenceAttributeName` from `wonder-blocks-core`, the attribute floating components (e.g. `Tooltip`, `Popover`) inject into the element they are anchored to. `wonder-blocks-floating` re-exports it from there, so components that don't depend on Floating can pass it to their root element. It also exports the `FloatingReferenceProps` type, for typing that attribute in a component's props.
