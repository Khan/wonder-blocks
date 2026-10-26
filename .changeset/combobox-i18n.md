---
"@khanacademy/wonder-blocks-dropdown": minor
---

The default labels and screen reader announcements in `Combobox` now read translated strings from `WonderBlocksConfigProvider`. The `labels` prop overrides the built-in translations. An empty label falls back to the built-in translation. The `labels` prop now accepts a partial object, so you only need to pass the labels you want to override.

Combobox announcements now use the correct singular grammar: "1 selected option." and "1 result available." instead of "1 selected options." and "1 results available.".
