---
---

Phase 0.3 of the CSS Modules migration (WB-2324): static typing + IDE
autocomplete for `*.module.css` imports.

- `typed-css-modules` generates a colocated `*.module.css.d.ts` for every
  `*.module.css` source via `pnpm gen:css-types` (root-level helper wrapping
  the `typed-css-modules` API with the right globs). The generated files
  are gitignored — `prebuild` and `pretypecheck` hooks regenerate them
  before `tsc --noEmit` runs, so `styles.<missingClassName>` is now a
  type error.
- `typescript-plugin-css-modules` is registered in `tsconfig.json` so
  VS Code, WebStorm, and any LSP-aware editor get live autocomplete and
  Go-to-Definition on `styles.<className>` without depending on the
  generated `.d.ts` files.
- `.vscode/extensions.json` recommends `clinyong.vscode-css-modules`.

Tooling-only; no package version impact.
