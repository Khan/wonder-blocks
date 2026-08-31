---
"@khanacademy/wonder-blocks-popover": major
---

Refactor `Popover` to use the `wonder-blocks-floating` package (floating-ui) instead of PopperJS and the `wonder-blocks-tooltip` dependency.

Breaking / behavior changes:

- `Popover` now positions its content with floating-ui via the `Floating` component. The `@popperjs/core` and `react-popper` peer dependencies (and the `@khanacademy/wonder-blocks-tooltip` / `@khanacademy/wonder-blocks-modal` dependencies) have been removed.
- `PopoverContentCore` no longer renders the popover "bubble" chrome (background, border, border radius and shadow). That chrome now comes from `Floating`, so a `PopoverContentCore` rendered on its own — outside a `Popover` — no longer looks like a popover bubble and needs its own container styling.
- The popover tail is now rendered by `Floating` (as its arrow) instead of `TooltipTail`. The `showTail` prop is unchanged, but the tail's markup and styling now come from `Floating`.
- The popover is positioned with floating-ui's `fixed` strategy, so it is no longer clipped by scrolling or `overflow`-clipping ancestors the way it could be before.
- Focus management is now handled by floating-ui's non-modal focus manager rather than the previous custom implementation. Keyboard focus now flows using floating-ui's focus guards instead of the previous circular navigation model.
- `rootBoundary` and `viewportPadding` are now remapped onto floating-ui's `flip`/`shift` middleware (prop names unchanged).
- `autoUpdate` is deprecated and now a no-op: the popover always keeps its position in sync with the anchor (floating-ui's `autoUpdate`).
- `initialFocusDelay` is deprecated and now a no-op: initial focus is applied synchronously when the popover opens.
- `onClose` is now called at most once per open/close cycle. floating-ui can request a close through several channels (escape, outside click, focus out), so the callback is guarded against firing more than once for a single dismissal.
- `testId` is now actually applied. It was previously declared on `Popover`'s props but never used; it is now forwarded to the floating element.
