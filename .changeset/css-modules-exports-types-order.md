---
"@khanacademy/wonder-blocks-banner": patch
"@khanacademy/wonder-blocks-button": patch
"@khanacademy/wonder-blocks-date-picker": patch
"@khanacademy/wonder-blocks-dropdown": patch
"@khanacademy/wonder-blocks-filters": patch
"@khanacademy/wonder-blocks-form": patch
"@khanacademy/wonder-blocks-icon": patch
"@khanacademy/wonder-blocks-icon-button": patch
"@khanacademy/wonder-blocks-labeled-field": patch
"@khanacademy/wonder-blocks-link": patch
"@khanacademy/wonder-blocks-modal": patch
"@khanacademy/wonder-blocks-progress-spinner": patch
"@khanacademy/wonder-blocks-switch": patch
"@khanacademy/wonder-blocks-tabs": patch
---

List the `types` condition first in the `.` export of the package.json (where it wasn't already), so TypeScript picks it before `import`/`require`. Make the `./css` export conditional: `import` now resolves to `dist/es/index.css`, the copy the ESM entry already loads, so importing `./css` alongside the components no longer loads the CSS twice. `require` still resolves to `dist/index.css`.
