---
"@khanacademy/wonder-blocks-breadcrumbs": minor
---

Migrate `Breadcrumbs` and `BreadcrumbsItem` from Aphrodite to CSS Modules
(WB-2334, CSS Modules Phase 5 / Wave F). The public component API is
unchanged — same props and DOM structure.

- Styling now lives in `breadcrumbs.module.css`. The list, items and separator
  are rendered by `addStyle`, so no other component's classes compete with
  these rules.
- The package now ships `dist/index.css` (auto side-effect import).
  `aphrodite` is dropped from `peerDependencies`. No `exports` map is added:
  the package has none today, and adding one would restrict deep imports.
