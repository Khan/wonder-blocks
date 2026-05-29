---
---

Phase 0.4 of the CSS Modules migration (WB-2324): Stylelint with token-strict
values, PostCSS at-rule allow-list, and CI wiring.

- Root `stylelint.config.ts` extending `stylelint-config-standard` +
  `stylelint-config-css-modules`. Allow-lists the PostCSS at-rules used by
  our pipeline (`@apply`, `@mixin`, `@define-mixin`, `@include`, `@layer`).
- `stylelint-declaration-strict-value` flags raw values for color / spacing
  / typography properties at **warning** level. Tightens to **error** once
  Phase 5 component waves complete (per WB-2324 0.4 plan).
- New `pnpm lint:css` script; wired into `node-ci-lint.yml` alongside
  ESLint and Typecheck.
- `.vscode/extensions.json` recommends `stylelint.vscode-stylelint` for
  live editor diagnostics.

Tooling-only; no package version impact.
