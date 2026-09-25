---
"@khanacademy/wonder-blocks-dropdown": minor
---

`ActionMenu` now forwards its `ref` to the opener's DOM element.

This lets components that anchor to their trigger, like `Popover`, wrap an `ActionMenu` directly, because `ActionMenu` can now receive the ref they inject.

`ActionMenu` also no longer uses `ReactDOM.findDOMNode` (removed in React 19) to find its opener. The default opener forwards its ref to the underlying `Button`. Custom openers are resolved from the ref when it reaches a DOM element, and otherwise from the opener `id` that `DropdownOpener` puts on the element.
