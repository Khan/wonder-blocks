---
"@khanacademy/eslint-plugin-wonder-blocks": minor
---

Enable `require-logical-properties-for-rtl` in the `recommended` config. Auto-fixes all existing WB violations (physical CSS properties → logical equivalents, `textAlign: "left"|"right"` → `"start"|"end"`). Story files using `direction: "ltr"|"rtl"` in styles are updated to use the `dir` HTML attribute instead. Part of CLASS-14218.
