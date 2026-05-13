---
"@khanacademy/wonder-blocks-tokens": patch
---

Make `tokenValue` safe to call in environments without a `document` (e.g. SSR or node-based test environments). Returns an empty string for `var(...)` tokens when `document` is undefined, instead of throwing `ReferenceError: document is not defined`.
