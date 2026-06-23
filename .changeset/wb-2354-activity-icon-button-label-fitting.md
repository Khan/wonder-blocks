---
"@khanacademy/wonder-blocks-icon-button": minor
---

`ActivityIconButton`: improve fitting of long, translated labels. The visible label now renders at Body/Small and uses locale-aware hyphenation (`hyphens: auto` with `wordBreak: normal` + `overflowWrap: break-word`) so longer international strings stay within two lines instead of being clipped. Hyphenation follows the document/ancestor `lang`. (WB-2354)
