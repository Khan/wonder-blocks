---
---

Wire the foundational tooling for the CSS Modules migration (Phase 0, sub-tasks 0.1 + 0.2 of WB-2324):

- Root `postcss.config.cjs` with `postcss-import` + `@csstools/postcss-mixins`.
- Cascade-layer order declared in Storybook: `@layer reset, tokens, shared, overrides;`. All Wonder Blocks CSS-Modules output is authored inside `@layer shared`.
- `identity-obj-proxy` wired into Jest for `*.module.css`; plain `*.css` continues to use the existing no-op mock.
- `vite.config.ts` workspace alias regex tightened so subpath imports (e.g. `@khanacademy/wonder-blocks-styles/focus-styles.css`) no longer get rewritten — node resolution + the workspace symlink handles those.
- Throwaway spike fixture under `__docs__/css-modules-spike/` validates the pipeline end-to-end (Vite/Storybook side only — Rollup CSS emission lands in Phase 1 when the first real component migrates).

No package-version impact; tooling only.
