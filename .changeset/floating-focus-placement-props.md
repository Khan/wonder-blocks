---
"@khanacademy/wonder-blocks-floating": minor
---

Add new props to the `Floating` component to support more consumers (e.g. `Popover`):

- `returnFocus`: whether/where focus is returned when the floating element closes.
- `closeOnFocusOut`: whether the floating element closes when focus moves outside of it.
- `onPlacementChange`: called with the resolved placement (after middleware such as `flip` runs).
- `shiftPadding`: padding used by the `shift` middleware to keep the element in view.
- `rootBoundary`: the boundary (`"viewport"` or `"document"`) used by the `flip` and `shift` middleware.

Additionally, export the `FloatingReferenceAttributeName` constant so consumers that render another component's trigger (e.g. `Popover`) can pass the attribute along to it.

The floating element no longer sets a `max-inline-size` (previously `472px`, carried over from `Tooltip`). It now sizes to its content, so consumers that need a width cap should set one on their own content (or via the `styles.floating` prop).
