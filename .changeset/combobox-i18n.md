---
"@khanacademy/wonder-blocks-dropdown": minor
---

The default labels and screen reader announcements in `Combobox` now read translated strings from `WonderBlocksConfigProvider`. The `labels` prop overrides the built-in translations. An empty label falls back to the built-in translation. The `labels` prop now accepts a partial object, so you only need to pass the labels you want to override.

Combobox no longer announces the focused option in the listbox (e.g. "Strawberry disabled, 2 of 4. 4 results available.") from its live region, since screen readers already announce it from `aria-activedescendant`. The `labels.liveRegionListboxTotal` label is deprecated and no longer used.

Combobox announcements now use the correct singular grammar: "1 selected option." instead of "1 selected options.".
