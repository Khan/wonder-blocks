---
"@khanacademy/wonder-blocks-labeled-field": patch
---

`LabeledField`: group the error and disabled styles under state classes on the
root element (`.root.error`, `.root.disabled`) instead of per-element modifier
classes. Precedence between rules is now decided by specificity rather than
source order, and the error + disabled combination is spelled out explicitly.
There is no visual change.
