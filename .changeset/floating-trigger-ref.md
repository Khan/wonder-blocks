---
"@khanacademy/wonder-blocks-floating": minor
---

`Floating` now resolves its reference (anchor) element from the ref it injects into the trigger as well as from the DOM.

The trigger only has to do one of two things, and most triggers already do both:

- Attach the ref it is given to its element. `Floating` only injects a ref into triggers that can receive one (host elements and `React.forwardRef` components), so plain function components don't get a React "Function components cannot be given refs" error. A trigger's own `ref` is merged rather than replaced.
- Spread the props it is given onto its element, so that `Floating` can find it by the injected `FloatingReferenceAttributeName` attribute.

This fixes triggers that forward a ref but drop the props they don't know about, which previously left the floating element with nothing to anchor to.

The ref helpers `canAcceptRef` and `getElementRef` are exported, alongside a re-export of floating-ui's `useMergeRefs`, for components that render a trigger on a consumer's behalf (e.g. `PopoverAnchor`) and need to pass the ref along the same way without depending on `@floating-ui/react` themselves.
