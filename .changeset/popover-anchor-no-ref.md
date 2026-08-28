---
"@khanacademy/wonder-blocks-popover": major
---

`Popover`'s trigger element no longer has to accept or forward a ref.

The trigger can now be of any component type (host element, `React.forwardRef` component, class component, or plain function component). `Popover` no longer injects a ref into it: the anchor element is resolved from the DOM, so the trigger only has to spread the props it is given (`id`, `aria-controls`, `aria-expanded`, the `onClick` handler that opens the popover, and the attribute that identifies the anchor) onto its own element.

A trigger's own `ref` is now left untouched instead of being merged with the anchor ref.
