---
"@khanacademy/wonder-blocks-form": minor
---

`Radio` is now composed from `DetailCell` internally (radio input as the cell's `leftAccessory`, label as `title`, description as `subtitle2`). New props:

- `appearance` (`"default" | "cell"`): `"default"` keeps the current compact radio row; `"cell"` renders the radio as an individually bordered, rounded card that shows a colored border when checked (the "radio as cell" look).
- `rightAccessory`: content rendered at the end of the row (e.g. a "Recommended" label), mapped to the underlying `DetailCell`'s `rightAccessory`.

Both `appearance` and `rightAccessory` are forwarded through `Choice`, and `appearance` is also forwarded through `RadioGroup` (setting it on the group renders every radio as a cell). These props only apply to radios (ignored for checkboxes).
