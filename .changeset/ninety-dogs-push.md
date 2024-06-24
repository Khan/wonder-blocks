---
"@khanacademy/wonder-blocks-dropdown": minor
---

Improves support for providing ids to the opener and dropdown elements. These ids are auto-generated if they are not provided.

Also applies attributes to elements automatically for improved accessibility (`aria-controls`, `aria-haspopup`, `aria-expanded`).

- `ActionMenu`
  - Adds new `dropdownId` and `id` props. If these are not provided, these ids will be generated automatically
  - `aria-controls` is set to the dropdown id for both default and custom openers
  - Ensure `aria-haspopup` and `aria-expanded` attributes are set on both default and custom openers
- `SingleSelect` and `MultiSelect`
  - Adds new `dropdownId` prop. If this is not provided, an id will be generated automatically
  - If the `id` prop is not provided, an id for the component is now generated automatically
  - `aria-controls` is set to the dropdown id for both default and custom openers
  - Ensure `id`, `aria-haspopup` and `aria-expanded` attributes are set on both default and custom openers
