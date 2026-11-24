---
"@khanacademy/wonder-blocks-accordion": patch
"@khanacademy/wonder-blocks-badge": patch
"@khanacademy/wonder-blocks-banner": patch
"@khanacademy/wonder-blocks-birthday-picker": patch
"@khanacademy/wonder-blocks-breadcrumbs": patch
"@khanacademy/wonder-blocks-button": patch
"@khanacademy/wonder-blocks-card": patch
"@khanacademy/wonder-blocks-cell": patch
"@khanacademy/wonder-blocks-clickable": patch
"@khanacademy/wonder-blocks-core": patch
"@khanacademy/wonder-blocks-date-picker": patch
"@khanacademy/wonder-blocks-dropdown": patch
"@khanacademy/wonder-blocks-filters": patch
"@khanacademy/wonder-blocks-floating": patch
"@khanacademy/wonder-blocks-form": patch
"@khanacademy/wonder-blocks-icon-button": patch
"@khanacademy/wonder-blocks-icon": patch
"@khanacademy/wonder-blocks-labeled-field": patch
"@khanacademy/wonder-blocks-layout": patch
"@khanacademy/wonder-blocks-link": patch
"@khanacademy/wonder-blocks-modal": patch
"@khanacademy/wonder-blocks-popover": patch
"@khanacademy/wonder-blocks-progress-spinner": patch
"@khanacademy/wonder-blocks-search-field": patch
"@khanacademy/wonder-blocks-switch": patch
"@khanacademy/wonder-blocks-tabs": patch
"@khanacademy/wonder-blocks-toolbar": patch
"@khanacademy/wonder-blocks-tooltip": patch
"@khanacademy/wonder-blocks-typography": patch
---

Load each package's CSS after the CSS of the Wonder Blocks packages it depends
on. The published JS imported its own `index.css` before its dependencies, so
bundlers emitted, for example, Button's CSS before Typography's. Both sit in
`@layer shared` with single-class selectors, so the later `BodyText` rule won and
Button labels lost their own `font-weight`, `line-height` and `font-size`. The CSS
import now comes after the dependency imports, matching the source order that
Storybook already uses.
