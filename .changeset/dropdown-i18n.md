---
"@khanacademy/wonder-blocks-dropdown": minor
---

The default labels, screen reader announcements and required field error message in `SingleSelect`, `MultiSelect` and `Combobox` now read translated strings from `WonderBlocksConfigProvider`. The `labels` and `required` props override the built-in translations.

Combobox announcements now use the correct singular grammar: "1 selected option." and "1 result available." instead of "1 selected options." and "1 results available.".
