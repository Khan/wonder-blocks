---
"@khanacademy/wonder-blocks-icon-button": major
---

`IconButton` now requires an `aria-label` prop. Since an `IconButton` only renders an icon with no visible text, an accessible name is needed for it to be announced correctly by assistive technology. Making `aria-label` required at the type level prevents call sites from accidentally shipping unlabeled buttons. All existing call sites must be updated to pass an `aria-label`.
