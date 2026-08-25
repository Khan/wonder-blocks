---
"@khanacademy/wonder-blocks-dropdown": patch
---

SingleSelect / MultiSelect: label the listbox with the same name as the opener so the options have context in a screen reader. The name comes from the opener's associated `<label>` element (e.g. from `LabeledField`), the select's `aria-labelledby`, or its `aria-label`.
