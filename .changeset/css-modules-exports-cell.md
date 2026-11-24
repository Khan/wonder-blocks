---
"@khanacademy/wonder-blocks-cell": minor
---

Add `"sideEffects": ["**/*.css"]` and a conditional `./css` export for the component stylesheet (`import` → `dist/es/index.css`, `require` → `dist/index.css`) to the package.json. List the `types` condition first in the `.` export.
