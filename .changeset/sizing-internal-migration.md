---
"@khanacademy/wonder-blocks-accordion": patch
"@khanacademy/wonder-blocks-birthday-picker": patch
"@khanacademy/wonder-blocks-breadcrumbs": patch
"@khanacademy/wonder-blocks-form": patch
"@khanacademy/wonder-blocks-layout": patch
"@khanacademy/wonder-blocks-link": patch
"@khanacademy/wonder-blocks-popover": patch
"@khanacademy/wonder-blocks-search-field": patch
"@khanacademy/wonder-blocks-toolbar": patch
"@khanacademy/wonder-blocks-tooltip": patch
---

Migrate internal usage of the deprecated `spacing` primitive token to the
`sizing` token. No public API or visual changes — each `spacing.<name>`
value maps 1:1 to a `sizing.size_<n>` token with the same rendered value.
A handful of internal `Strut` usages are replaced with CSS `gap` /
`margin` (since `sizing.X` is a CSS variable string at runtime, not a
number). Layout-spec and SVG sites that genuinely need JS numbers use
hardcoded values that mirror the matching `sizing.size_*` tokens (with
comments). Prep for removal of the `spacing` export in a future major
release of `@khanacademy/wonder-blocks-tokens`.
