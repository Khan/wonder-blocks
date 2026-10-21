---
"@khanacademy/wonder-blocks-tooltip": major
---

Refactor `Tooltip` to use the `wonder-blocks-floating` package (floating-ui) instead of PopperJS.

Breaking / behavior changes:

- `Tooltip` now positions its bubble with floating-ui via the `Floating` component. The `@popperjs/core` and `react-popper` peer dependencies (and the `@khanacademy/wonder-blocks-modal` dependency) have been removed.
- The `TooltipPopper` and `TooltipTail` components and the `PopperElementProps` type are no longer exported. They only existed to support PopperJS-based positioning.
- `Tooltip` is now a function component, so it no longer accepts a `ref`.
- The anchored content no longer uses `ReactDOM.findDOMNode`. It must either attach the ref it is given to its element, or spread the props it is given onto it (host elements, string children and most Wonder Blocks components already do both).
- The bubble chrome (background, border, shadow) and the tail are now rendered by `Floating`, so the tail's markup, size and styling match `Popover`'s.
- The tooltip is positioned with floating-ui's `fixed` strategy and hidden (`visibility: hidden`) when its anchor scrolls out of view.
- `autoUpdate` is deprecated and now a no-op: the tooltip always keeps its position in sync with the anchor (floating-ui's `autoUpdate`).
- `viewportPadding` is now applied as the padding of floating-ui's `shift` middleware (prop name unchanged).
