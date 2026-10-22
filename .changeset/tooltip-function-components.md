---
"@khanacademy/wonder-blocks-tooltip": major
---

Convert `Tooltip` and `TooltipAnchor` to function components, and stop using the deprecated `ReactDOM.findDOMNode` to find the anchored element.

Breaking / behavior changes:

- `Tooltip` no longer accepts a `ref` (it was a class instance before).
- The anchored content now has to cooperate, the same way `Floating`/`Popover` triggers do: it must either pass the props it is given along to its root element (Tooltip injects a `FloatingReferenceAttributeName` attribute along with `aria-describedby`), or attach the ref it is given to its element (host elements and `React.forwardRef` components; its own ref is kept). The element that receives the attribute is preferred over the ref. Content that does neither (e.g. a plain function component that only uses named props, or a `React.Fragment`) gets no tooltip, and a warning is logged in development. Fix it by spreading the props onto the root element, by wrapping it in `React.forwardRef`, or by wrapping the anchor in a `View`.
- `placement` is now typed as optional, matching its `"top"` default.
