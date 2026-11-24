---
"@khanacademy/wonder-blocks-accordion": major
"@khanacademy/wonder-blocks-badge": major
"@khanacademy/wonder-blocks-birthday-picker": major
"@khanacademy/wonder-blocks-breadcrumbs": major
"@khanacademy/wonder-blocks-card": major
"@khanacademy/wonder-blocks-clickable": major
"@khanacademy/wonder-blocks-core": major
"@khanacademy/wonder-blocks-floating": major
"@khanacademy/wonder-blocks-layout": major
"@khanacademy/wonder-blocks-popover": major
"@khanacademy/wonder-blocks-search-field": major
"@khanacademy/wonder-blocks-toolbar": major
"@khanacademy/wonder-blocks-tooltip": major
"@khanacademy/wonder-blocks-typography": major
---

Add an `exports` map (`.` and `./css`) and `"sideEffects": ["**/*.css"]` to the package.json. `./css` is the component stylesheet. It's conditional: `import` resolves to `dist/es/index.css` and `require` to `dist/index.css`, the same copy each JS entry already loads, so importing `./css` too doesn't duplicate the CSS.

**Breaking:** the new `exports` map blocks deep imports such as `@khanacademy/wonder-blocks-core/dist/...`. Import from the package root instead. No deep imports of these packages were found in Khan/frontend or Khan/perseus.
