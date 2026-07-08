---
"@khanacademy/wonder-blocks-form": minor
---

`Radio` is now composed from `DetailCell` internally (radio input as the cell's `leftAccessory`, label as `title`, description as `subtitle2`). It also gains an `appearance` prop: `"default"` (the default) keeps the current compact radio row, and `"cell"` opts into the full `DetailCell` styling (padding + horizontal rule).

The `appearance` prop is also forwarded through `Choice` and `RadioGroup`, so setting `appearance="cell"` on a `RadioGroup` renders every radio in the group as a cell. It only applies to radios (ignored for checkboxes).
