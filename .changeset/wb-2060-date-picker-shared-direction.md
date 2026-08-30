---
"@khanacademy/wonder-blocks-date-picker": patch
---

Migrate `DatePicker`'s direction detection onto the shared `useDirection` hook from `wonder-blocks-core`. The public API is unchanged. `DatePicker` now also resolves the direction from `document.documentElement`/`document.body`, where previously it only checked the nearest ancestor carrying a `dir` attribute and otherwise assumed `"ltr"`.
