---
"@khanacademy/wonder-blocks-banner": patch
"@khanacademy/wonder-blocks-breadcrumbs": patch
"@khanacademy/wonder-blocks-button": patch
"@khanacademy/wonder-blocks-card": patch
"@khanacademy/wonder-blocks-cell": patch
"@khanacademy/wonder-blocks-dropdown": patch
"@khanacademy/wonder-blocks-floating": patch
"@khanacademy/wonder-blocks-form": patch
"@khanacademy/wonder-blocks-labeled-field": patch
"@khanacademy/wonder-blocks-link": patch
"@khanacademy/wonder-blocks-modal": patch
"@khanacademy/wonder-blocks-styles": patch
"@khanacademy/wonder-blocks-tabs": patch
"@khanacademy/wonder-blocks-tooltip": patch
---

Declare packages that were imported but missing from `package.json` `dependencies` (or `peerDependencies`). Fixes "Module not found" errors (e.g. `@khanacademy/wonder-blocks-form` importing `@khanacademy/wonder-blocks-styles`) in setups that don't hoist these packages, and stops copies of them from being bundled into `dist`.
