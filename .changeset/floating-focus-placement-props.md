---
"@khanacademy/wonder-blocks-floating": minor
---

Add new props to the `Floating` component to support more consumers (e.g. `Popover`):

- `returnFocus`: whether/where focus is returned when the floating element closes.
- `closeOnFocusOut`: whether the floating element closes when focus moves outside of it.
- `onPlacementChange`: called with the resolved placement (after middleware such as `flip` runs).
- `shiftPadding`: padding used by the `shift` middleware to keep the element in view.
- `rootBoundary`: the boundary (`"viewport"` or `"document"`) used by the `flip` and `shift` middleware.

The trigger never has to accept, forward or attach a ref, and its type doesn't matter (host element, `React.forwardRef` component, class component or plain function component). `Floating` no longer injects a ref into the trigger: it injects the `data-wb-floating-reference` attribute (with a value unique to each instance) along with the interaction props, and resolves the reference (anchor) element from the DOM. This means the trigger only has to spread the props it is given onto the element to anchor to, which it needs to do anyway for the interaction and ARIA props. `Floating` still renders no wrapper element around the trigger. In development, it warns when the trigger's element can't be found (e.g. because the trigger drops the props).

A trigger that renders several elements picks the one to anchor to by spreading the props onto it, and each instance uses its own attribute value, so multiple open (or nested) floating elements stay independent.

Additionally, export the `FloatingReferenceAttributeName` constant so consumers that render another component's trigger (e.g. `Popover`) can pass the attribute along to it.

The floating element no longer sets a `max-inline-size` (previously `472px`, carried over from `Tooltip`). It now sizes to its content, so consumers that need a width cap should set one on their own content (or via the `styles.floating` prop).
