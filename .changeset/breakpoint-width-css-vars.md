---
"@khanacademy/wonder-blocks-tokens": minor
"@khanacademy/wonder-blocks-modal": patch
---

Add `breakpoint.width` CSS variables to `@khanacademy/wonder-blocks-tokens/styles.css`
(e.g. `--wb-breakpoint-width-mdMin: 682px`), defined once on `:root`.
`DrawerDialog` now uses `--wb-breakpoint-width-xsMax` / `--wb-breakpoint-width-smMax`
instead of hard-coded pixel widths.
