---
"@khanacademy/wonder-blocks-dropdown": major
---

`OptionItem` and `ActionItem` now forward their `ref` to the item's root DOM element (the underlying `DetailCell`: a `<button>`, or an `<a>` for an `ActionItem` with `href`) instead of exposing the component instance.

Breaking changes:

- `ref.current` on an `OptionItem` or `ActionItem` is now an `HTMLElement`, not a class instance. Code that called instance methods (e.g. `handleClick`) or read `props` from the instance must use the element instead. Code that passed the instance to `ReactDOM.findDOMNode` can use `ref.current` directly.
- `OptionItem` and `ActionItem` are no longer classes: they can't be extended, used with `instanceof`, or used as an instance type (e.g. `React.RefObject<OptionItem>`), and they no longer have a `defaultProps` static. `OptionItem.isClassOf` and `ActionItem.isClassOf` still work.

Internally, `DropdownCore` now focuses items using the element from their ref instead of `ReactDOM.findDOMNode`.
