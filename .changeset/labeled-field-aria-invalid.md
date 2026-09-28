---
"@khanacademy/wonder-blocks-labeled-field": patch
---

`LabeledField`: match the error and disabled states from the field's
`aria-invalid="true"` and `aria-disabled="true"` (via `:has()`) instead of
JS-applied classes on the root.

- Fields that don't set `aria-invalid` (e.g. `DatePicker`, native inputs) no
  longer show the error colour and weight on the label and context label; the
  error message itself is unaffected.
- Fields that use the native `disabled` attribute (e.g. `Checkbox`, `Radio`,
  native inputs) no longer show the disabled colours.
- Read only selects set `aria-disabled`, so their label and helper text now use
  the disabled colours. Any `aria-disabled` element inside the field (e.g. a
  disabled option) triggers the disabled styling too.
