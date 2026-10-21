---
"@khanacademy/wonder-blocks-dropdown": patch
---

Declare `@khanacademy/wonder-blocks-button` as a dependency. Dropdown imports `Button`, and without the dependency its build bundled its own copy of `Button`.
