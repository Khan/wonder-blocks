---
"@khanacademy/wonder-blocks-form": minor
---

- `TextField`
  - Add `instantValidation` prop
  - No longer calls `validate` prop if the field is disabled during initialization and on change
- `TextArea`
  - Validate the value during initialization if the field is not disabled
