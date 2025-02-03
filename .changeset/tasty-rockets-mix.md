---
"@khanacademy/wonder-blocks-dropdown": major
---

1. Updates dropdown openers for SingleSelect and MultiSelect to use `role="combobox"` instead of `button`.
2. SingleSelect and MultiSelect should have a paired `<label>` element or `aria-label` attribute for accessibility. They no longer fall back to text content for labeling, as those contents are now used as combobox values.
3. Changes the type names for custom label objects from `Labels` to `LabelsValues` and `SingleSelectLabels` to `SingleSelectLabelsValues`, respectively.
