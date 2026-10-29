---
"@khanacademy/wonder-blocks-tooltip": major
---

Refactor `Tooltip` to use the `wonder-blocks-floating` package (floating-ui) instead of PopperJS.

Breaking / behavior changes:

- `Tooltip` now positions its bubble with floating-ui via the `Floating` component. The `@popperjs/core` and `react-popper` peer dependencies (and the `@khanacademy/wonder-blocks-modal` dependency) have been removed.
- The `TooltipPopper` and `TooltipTail` components and the `PopperElementProps` type are no longer exported. They only existed to support PopperJS-based positioning.
- The bubble chrome (background, border, shadow) and the tail are now rendered by `Floating`, so the tail's markup, size and styling match `Popover`'s.
- The tooltip is positioned with floating-ui's `fixed` strategy and hidden (`visibility: hidden`) when its anchor scrolls out of view.
- `autoUpdate` is deprecated and now a no-op: the tooltip always keeps its position in sync with the anchor (floating-ui's `autoUpdate`).
- `viewportPadding` is now applied as the padding of floating-ui's `shift` middleware (prop name unchanged).
- The tooltip stays open while the pointer is over the bubble, its border, its tail, or the gap between the bubble and the anchor.
- Tests that render an open tooltip in jsdom (e.g. with `getByRole("tooltip")`) may need to stub element sizes: jsdom reports zero-size rects, so floating-ui considers the anchor hidden and the tooltip gets `visibility: hidden`, which Testing Library treats as inaccessible. Stub `Element.prototype.getBoundingClientRect` and `document.documentElement.clientWidth`/`clientHeight` (e.g. with `jest.spyOn`), or query with `{hidden: true}`.
