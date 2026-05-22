---
---

Phase 0.1 of the CSS Modules migration (WB-2324): Rollup-side CSS emission
and the first real component migration.

- `rollup-plugin-styles` is wired into `build-settings/rollup.config.mjs`.
  Every `*.module.css` imported from a package's source is hashed
  (`wb-[name]-[local]-[hash:8]`), camel-cased (`localsConvention:
  "camelCaseOnly"`), and extracted to that package's `dist/index.css`.
- A `wrap-in-layer` PostCSS plugin in `postcss.config.cjs` moves every
  emitted rule into `@layer shared { … }`. Vite (Storybook) and Rollup
  (build) share the same plugin chain, so authors never write the
  cascade wrap by hand. The spike CSS lost its manual `@layer shared { … }`
  wrap accordingly.
- Packages that ship `*.module.css` files now get an automatic
  `import "./index.css"` (ESM) / `require("./index.css")` (CJS) injected
  into their JS bundle, so npm consumers get styles without extra wiring.

Tooling-only; no public component behavior change beyond what's in
`@khanacademy/wonder-blocks-icon`'s own changeset.
