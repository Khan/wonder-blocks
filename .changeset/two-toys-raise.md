---
"@khanacademy/wonder-blocks-form": patch
---

- Update `TextField` state styling so that it is consistent with other components like `TextArea`, `SingleSelect`, `MultiSelect` (especially the focus styling). The styling also now uses CSS pseudo-classes for easier testing in Chromatic and debugging in browsers.
- `TextField` and `TextArea` state styling has also been updated so that any outline styles outside of the component are now applied within the component to prevent cropped focus outlines in places where an ancestor element has `overflow: hidden`.
