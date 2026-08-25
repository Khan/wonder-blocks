---
"@khanacademy/wonder-blocks-floating": minor
---

Add new props to the `Floating` component to support more consumers (e.g. `Popover`):

- `returnFocus`: whether/where focus is returned when the floating element closes.
- `closeOnFocusOut`: whether the floating element closes when focus moves outside of it.
- `onPlacementChange`: called with the resolved placement (after middleware such as `flip` runs).
- `shiftPadding`: padding used by the `shift` middleware to keep the element in view.
- `rootBoundary`: the boundary (`"viewport"` or `"document"`) used by the `flip` and `shift` middleware.

Also export a new `useFloatingReference` hook (and the `FloatingReferenceContext` it reads). A trigger that can't receive a ref (a plain function component) can use it to register its own DOM element as the reference (anchor) element of the `Floating` it is rendered in, so it doesn't have to forward refs. `Floating` still renders no wrapper element around the trigger, and each instance only shares its reference setter with its own trigger, so multiple open or nested floating elements stay independent.

Additionally, re-export `useMergeRefs` (from `@floating-ui/react`) so consumers can merge the reference setter with their own refs without depending on `@floating-ui/react` directly.
