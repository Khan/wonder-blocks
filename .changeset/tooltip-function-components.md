---
"@khanacademy/wonder-blocks-tooltip": minor
---

Convert `Tooltip` and `TooltipAnchor` to function components, and stop using the deprecated `ReactDOM.findDOMNode` to find the anchored element.

- The anchored element is now resolved through a ref when the anchored content can receive one (host elements and `React.forwardRef` components). Its own ref is kept.
- Content that can't receive a ref (e.g. plain function components such as `LabeledField`) is resolved as the element that follows a hidden marker element rendered right before it.
- `Tooltip` no longer accepts a `ref` (it was a class instance before).
- `placement` is now typed as optional, matching its `"top"` default.
