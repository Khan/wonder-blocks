# @khanacademy/wonder-blocks-floating

## 0.1.0

### Minor Changes

- 4aef2da: Adds styles prop to customize the look and feel of the floating element
- 4aef2da: Adds wonder-blocks-floating package
- 4aef2da: Add new props to the `Floating` component to support more consumers (e.g. `Popover`):

    - `returnFocus`: whether/where focus is returned when the floating element closes.
    - `closeOnFocusOut`: whether the floating element closes when focus moves outside of it.
    - `onPlacementChange`: called with the resolved placement (after middleware such as `flip` runs).
    - `shiftPadding`: padding used by the `shift` middleware to keep the element in view.
    - `rootBoundary`: the boundary (`"viewport"` or `"document"`) used by the `flip` and `shift` middleware.

    Additionally, export the `FloatingReferenceAttributeName` constant so consumers that render another component's trigger (e.g. `Popover`) can pass the attribute along to it.

    The floating element no longer sets a `max-inline-size` (previously `472px`, carried over from `Tooltip`). It now sizes to its content, so consumers that need a width cap should set one on their own content (or via the `styles.floating` prop).

- 4aef2da: `Floating` resolves its reference (anchor) element through either of two channels, without rendering a wrapper element around the trigger:

    - **Ref:** `Floating` injects a ref into triggers that can receive one (host elements and `React.forwardRef` components). Plain function components never get one, so they don't log React's "Function components cannot be given refs" error. A trigger's own `ref` is merged rather than replaced.
    - **DOM attribute:** `Floating` also injects the `FloatingReferenceAttributeName` attribute (unique to each instance) along with the interaction props, and looks the element up in the DOM when the ref didn't resolve one.

    A trigger therefore only has to attach the ref it is given or spread the props it is given onto its element, and most triggers do both. Its type doesn't matter (host element, `React.forwardRef` component, class component or plain function component). A trigger that renders several elements picks the one to anchor to by attaching the ref (or spreading the props) onto it, and since each instance uses its own attribute value, several open (or nested) floating elements stay independent. In development, `Floating` warns when it can't find the trigger's element.

    The ref helpers `canAcceptRef` and `getElementRef` are exported, along with a re-export of floating-ui's `useMergeRefs`, for components that render a trigger on a consumer's behalf (e.g. `PopoverAnchor`) and need to pass the ref along the same way without depending on `@floating-ui/react` themselves.

- 4aef2da: Adds focus management support
- 4aef2da: Adds right-to-left support to Floating component.
- 4aef2da: Adds Floating component with basic props (including middlewares)
- 4aef2da: Adds `portal` prop to Floating component. Includes `maybeGetPortalMountedModalHostElement` util to portal floating elements inside modals.
