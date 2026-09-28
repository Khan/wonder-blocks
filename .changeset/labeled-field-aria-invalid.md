---
"@khanacademy/wonder-blocks-labeled-field": patch
---

`LabeledField`: match the error state from the field's `aria-invalid="true"`
(via `:has()`) instead of a JS-applied `error` class on the root. Fields that
don't set `aria-invalid` (e.g. `DatePicker`, native inputs) no longer show the
error colour and weight on the label and context label; the error message
itself is unaffected.
