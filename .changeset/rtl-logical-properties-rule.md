---
"@khanacademy/eslint-plugin-wonder-blocks": minor
---

Add `require-logical-properties-for-rtl` rule. Enforces CSS logical properties (e.g. `marginInlineStart`) over physical ones (`marginLeft`) so styles work in both LTR and RTL writing modes. Ported from frontend's `@khan/eslint-plugin-frontend` to provide a single source of truth that both wonder-blocks and frontend can consume. Rule is shipped but not yet enabled in any plugin config — consumers must opt in explicitly. A follow-up PR will enable it in the recommended config after auto-fixing existing violations. Auto-fixes property names and the `textAlign: "left"|"right"` value swap.
