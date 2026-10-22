---
"@khanacademy/wonder-blocks-tooltip": major
---

Convert `Tooltip` and `TooltipAnchor` to function components, and stop using the deprecated `ReactDOM.findDOMNode` to find the anchored element.

Breaking / behavior changes:

- `Tooltip` no longer accepts a `ref` (it was a class instance before).
- The anchored element is now resolved through a ref when the anchored content can receive one (host elements and `React.forwardRef` components). Its own ref is kept.
- Content that can't receive a ref (e.g. plain function components such as `LabeledField`, or class components), or that doesn't attach it to a DOM element, is resolved as the first element rendered between two `<template>` marker elements. The markers are never displayed and are valid in any context (e.g. inside a `<tbody>`), but they count as siblings for selectors like `:first-child` or `:nth-child()`. Content that renders no element gets no tooltip.
- `placement` is now typed as optional, matching its `"top"` default.
