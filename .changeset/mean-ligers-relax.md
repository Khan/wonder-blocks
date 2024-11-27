---
"@khanacademy/wonder-blocks-dropdown": minor
---

# SingleSelect

- Add `required`, `validate`, and `onValidate` props to support validation.
- Set `aria-required` on the opener if the `required` prop is `true` or
`aria-required` is set
- DropdownOpener and SelectOpener:
  - Add `onBlur` prop
  - Set `aria-invalid` if it is in an error state.
