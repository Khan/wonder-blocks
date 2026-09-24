---
"@khanacademy/wonder-blocks-popover": major
---

`Popover`'s trigger element no longer has to accept or forward a ref.

The trigger can now be of any component type (host element, `React.forwardRef` component, class component or plain function component), and it is anchored to through either of two channels:

- It attaches the ref it is given to its element. `Popover` only passes a ref to triggers that can receive one, so a plain function component no longer gets a React "Function components cannot be given refs" error.
- It spreads the props it is given (`id`, `aria-controls`, `aria-expanded`, the `onClick` handler that opens the popover, and the attribute that identifies the anchor) onto its element, and the anchor element is resolved from the DOM.

Most triggers already do both, so this only matters for triggers that do just one: a component that forwards a ref but drops the props it doesn't know about used to be unanchored, and a plain function component that spreads its props still works without a ref.

A trigger's own `ref` is merged rather than replaced, so it keeps resolving the same element.
