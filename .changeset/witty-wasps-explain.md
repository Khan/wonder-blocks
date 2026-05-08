---
"@khanacademy/wonder-blocks-birthday-picker": patch
"@khanacademy/wonder-blocks-search-field": patch
"@khanacademy/wonder-blocks-breadcrumbs": patch
"@khanacademy/wonder-blocks-accordion": patch
"@khanacademy/wonder-blocks-dropdown": patch
"@khanacademy/wonder-blocks-popover": patch
"@khanacademy/wonder-blocks-toolbar": patch
"@khanacademy/wonder-blocks-button": patch
"@khanacademy/wonder-blocks-switch": patch
"@khanacademy/wonder-blocks-badge": patch
"@khanacademy/wonder-blocks-modal": patch
"@khanacademy/wonder-blocks-card": patch
"@khanacademy/wonder-blocks-cell": patch
"@khanacademy/wonder-blocks-core": patch
"@khanacademy/wonder-blocks-form": patch
"@khanacademy/wonder-blocks-tabs": patch
---

Use CSS logical properties for RTL support across components. Replace physical properties (left/right, marginLeft/marginRight, paddingLeft/paddingRight, etc.) with logical equivalents (insetInlineStart/insetInlineEnd, marginInlineStart/marginInlineEnd, paddingInlineStart/paddingInlineEnd, etc.). Add an ESLint rule (local-rules/require-logical-properties-for-rtl) to enforce this going forward.
