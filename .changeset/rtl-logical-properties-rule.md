---
"@khanacademy/eslint-plugin-wonder-blocks": minor
---

Add `require-logical-properties-for-rtl` rule. Enforces CSS logical properties (e.g. `marginInlineStart`) over physical ones (`marginLeft`) so styles work in both LTR and RTL writing modes. Ported from frontend's `@khan/eslint-plugin-frontend` to provide a single source of truth that both wonder-blocks and frontend can consume. Enabled in the recommended config; auto-fixes property names and the `textAlign: "left"|"right"` value swap.
