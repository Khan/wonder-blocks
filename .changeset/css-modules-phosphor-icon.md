---
"@khanacademy/wonder-blocks-icon": patch
---

Migrate `PhosphorIcon`'s internal styles from Aphrodite to CSS Modules,
completing the `wonder-blocks-icon` migration (CSS Modules Phase 5 / Wave C,
WB-2331) — the package now has zero `aphrodite` imports.

- The static layout styles and size variants move to a colocated
  `phosphor-icon.module.css` consuming `--wb-sizing-*` tokens, authored inside
  the shared `@layer shared` cascade layer.
- The dynamic `mask-image` / `background-color` (driven by the `icon` and
  `color` props) stay inline, and the static `mask-size` / `mask-repeat` /
  `mask-position` are kept inline alongside them so they continue to route
  through `processStyleList` → Aphrodite's vendor prefixer. The CSS Modules
  pipeline has no autoprefixer, and `mask-*` still needs `-webkit-` on older
  browsers, so this preserves the previous prefixed output exactly.

Public API and DOM output are unchanged.
