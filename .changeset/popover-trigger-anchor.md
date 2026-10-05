---
"@khanacademy/wonder-blocks-popover": major
---

`Popover` no longer uses `ReactDOM.findDOMNode` (removed in React 19) to find its trigger's element. The trigger now has to do one of two things for the popover to anchor to it, and most triggers already do both:

- Attach the ref it is given to its element. `Popover` only passes a ref to triggers that can receive one (host elements and `React.forwardRef` components), so a plain function component doesn't get React's "Function components cannot be given refs" error.
- Spread the props it is given (`id`, `aria-controls`, `aria-expanded`, the `onClick` handler that opens the popover, and the attribute that identifies the anchor) onto its element. The anchor element is then resolved from the DOM.

The trigger can be any component type (host element, `React.forwardRef` component, class component or plain function component). A trigger that does neither, e.g. a function component that ignores its props, is no longer anchored. Before, `findDOMNode` anchored the popover to the trigger's first DOM node regardless.

A trigger's own `ref` is merged rather than replaced, so it keeps resolving the same element.
