---
"@khanacademy/wonder-blocks-card": patch
"@khanacademy/wonder-blocks-form": patch
"@khanacademy/wonder-blocks-tabs": patch
---

Declare `@khanacademy/wonder-blocks-styles` as a direct dependency in `wonder-blocks-card`, `wonder-blocks-form`, and `wonder-blocks-tabs`. These packages were already importing `focusStyles` from the styles package but were resolving it transitively through the workspace symlink — once `wonder-blocks-styles` gained an explicit `exports` map, Rollup tried to load its `dist/es/index.js` instead of externalizing the import. Making the dep declaration explicit fixes the build and matches what npm-installed consumers actually need at runtime.
