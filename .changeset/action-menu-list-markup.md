---
"@khanacademy/wonder-blocks-dropdown": patch
---

`ActionMenu`, `SingleSelect`, and `MultiSelect` now render their dropdown items using semantic list markup. The dropdown container is rendered as a `<ul>` element and each item is wrapped in a presentational `<li>` (`role="none"`). The `menu`/`menuitem` and `listbox`/`option` ARIA roles are preserved, so behavior is unchanged while assistive technologies can now recognize the items as a list (WB-2148).
