---
"@khanacademy/wonder-blocks-tabs": patch
---

Migrate `Tabs`'s keyboard navigation direction check onto the shared `isRtl` utility from `wonder-blocks-core`. This also fixes a bug where arrow-key navigation didn't reverse for RTL layouts when only `document.documentElement` (rather than a wrapping element) carried `dir="rtl"`.
