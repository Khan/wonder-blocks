---
"@khanacademy/wonder-blocks-core": minor
---

Add `getDirection`/`isRtl` utility functions and `useDirection`/`useIsRtl` hooks for resolving an element's writing direction (`"ltr"` | `"rtl"`) from the DOM. These consolidate several duplicate `dir`-detection implementations that previously lived in individual packages.
