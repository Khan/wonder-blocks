---
"@khanacademy/wonder-blocks-dropdown": patch
---

Declare `@khanacademy/wonder-blocks-button` as a dependency. `ActionMenu`'s
opener and `Combobox`'s selected items import `Button`, but the package
didn't list it, so the build bundled a private copy of `Button` (its JS and,
since Button's move to CSS Modules, its stylesheet) into the dropdown dist.
`Button` is now imported from the shared package instead.
