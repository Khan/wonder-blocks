---
"@khanacademy/wonder-blocks-tokens": minor
---

Add `semanticColor.graphics.dataViz.heatmap` tokens: eleven bands from `band0` to `band100`, each named for the first percentage it covers, so `band0` spans 0-9 and `band90` spans 90-99, while `band100` is only ever an exact 100. The color encodes which band a value falls into, so the band is chosen by the data a cell represents rather than by a UI role such as `critical` or `success`. Each band pairs a `background` fill with a `foreground` for the value shown in the cell. The SYL Dark theme defines its own values for every band.
