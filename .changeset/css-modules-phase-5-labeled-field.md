---
"@khanacademy/wonder-blocks-labeled-field": minor
---

Migrate `LabeledField` from Aphrodite to CSS Modules (WB-2332, CSS Modules
Phase 5 / Wave D). The public component API is unchanged — same props, same DOM
structure, and the same `styles.root` / `styles.label` / `styles.contextLabel` /
`styles.description` / `styles.error` / `styles.readOnlyMessage` /
`styles.additionalHelperMessage` overrides — so this is an internal styling
refactor.

- Styling now lives in `labeled-field.module.css`. Theming (default /
  thunderblocks / syl-dark) is unchanged: the module reads the same
  `--wb-c-labeled-field-*` variables that `build:css` already emits from
  `src/theme/*`, switched on `[data-wb-theme]`.
- The `error` and `disabled` axes stay in JS as conditional class names — both
  are derived from the field child's props rather than from the element's own
  DOM state — and are composed through the existing `style` prop.
- Every rule in the module is nested inside a `root` marker class, now applied
  to the outermost element. The component overrides `font-size`, `line-height`,
  `font-weight` and `flex-direction` on `BodyText`, `View` and `PhosphorIcon`,
  which ship single-class rules in the same `@layer shared`; Aphrodite's
  `!important` used to settle that contest, and the compound selector makes the
  outcome depend on specificity instead of stylesheet load order.
- This is the first Wonder Blocks stylesheet to use CSS nesting, and nothing in
  the build flattens it, so `dist/index.css` now ships native nesting. Every
  nested selector is written with an explicit `&`, which puts the browser floor
  at Chrome 112 / Safari 16.5 / Firefox 117.
- The package now ships `dist/index.css` (auto side-effect import) and exposes
  it via the new `@khanacademy/wonder-blocks-labeled-field/css` subpath.
- Packaging fixes that come with the migration: `aphrodite` is dropped from
  `peerDependencies` (the package no longer imports it), and
  `@khanacademy/wonder-blocks-icon` is added to `dependencies` — it was already
  imported for the error and read-only icons but missing from the manifest.
