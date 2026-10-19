---
"@khanacademy/wonder-blocks-dropdown": minor
---

The default labels, screen reader announcements and required field error message in `SingleSelect` and `MultiSelect` now read translated strings from `WonderBlocksConfigProvider`. The `labels` and `required` props override the built-in translations. An empty label falls back to the built-in translation.

Changes to the `labels` prop of `SingleSelect` and `MultiSelect` now always update the search field's placeholder and clear button label. Before, they only updated when the set of focusable options also changed while the menu was open.
