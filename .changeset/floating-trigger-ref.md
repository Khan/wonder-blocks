---
"@khanacademy/wonder-blocks-floating": minor
---

`Floating` resolves its reference (anchor) element through either of two channels, without rendering a wrapper element around the trigger:

- **Ref:** `Floating` injects a ref into triggers that can receive one (host elements and `React.forwardRef` components). Plain function components never get one, so they don't log React's "Function components cannot be given refs" error. A trigger's own `ref` is merged rather than replaced.
- **DOM attribute:** `Floating` also injects the `FloatingReferenceAttributeName` attribute (unique to each instance) along with the interaction props, and looks the element up in the DOM when the ref didn't resolve one.

A trigger therefore only has to attach the ref it is given or spread the props it is given onto its element, and most triggers do both. Its type doesn't matter (host element, `React.forwardRef` component, class component or plain function component). A trigger that renders several elements picks the one to anchor to by attaching the ref (or spreading the props) onto it, and since each instance uses its own attribute value, several open (or nested) floating elements stay independent. In development, `Floating` warns when it can't find the trigger's element.

The ref helpers `canAcceptRef` and `getElementRef` are exported, along with a re-export of floating-ui's `useMergeRefs`, for components that render a trigger on a consumer's behalf (e.g. `PopoverAnchor`) and need to pass the ref along the same way without depending on `@floating-ui/react` themselves.
