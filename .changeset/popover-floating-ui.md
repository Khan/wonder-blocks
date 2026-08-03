---
"@khanacademy/wonder-blocks-popover": major
---

Refactor `Popover` to use the `wonder-blocks-floating` package (floating-ui) instead of PopperJS and the `wonder-blocks-tooltip` dependency.

Breaking / behavior changes:

- `Popover` now positions its content with floating-ui via the `Floating` component. The `@popperjs/core` and `react-popper` peer dependencies (and the `@khanacademy/wonder-blocks-tooltip` / `@khanacademy/wonder-blocks-modal` dependencies) have been removed.
- Focus management is now handled by floating-ui's non-modal focus manager rather than the previous custom implementation. Keyboard focus now flows using floating-ui's focus guards instead of the previous circular navigation model.
- `rootBoundary` and `viewportPadding` are now remapped onto floating-ui's `flip`/`shift` middleware (prop names unchanged).
- `autoUpdate` is deprecated and now a no-op: the popover always keeps its position in sync with the anchor (floating-ui's `autoUpdate`).
- `initialFocusDelay` is deprecated and now a no-op: initial focus is applied synchronously when the popover opens.
