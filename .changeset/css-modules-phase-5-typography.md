---
"@khanacademy/wonder-blocks-typography": minor
---

Migrate the internal styles of `Heading`, `BodyText`, and `BodyMonospace`
from Aphrodite to CSS Modules (WB-2331, CSS Modules Phase 5 / Wave C).

- Each component's size/weight variants now live in colocated
  `heading.module.css` / `body-text.module.css` / `body-monospace.module.css`
  files, consuming the `--wb-font-*` design tokens and authored inside the
  shared `@layer shared` cascade layer.
- The class names route through the existing `Text` / `processStyleList`
  pipeline (Phase 1), so consumer-provided Aphrodite styles, inline styles,
  and `style` props continue to compose exactly as before.
- The package now ships a bundled `dist/index.css`, auto-imported via a
  side-effect import in the JS entry. SSR consumers that can't process CSS
  imports may need a CSS loader / mock in their build (standard webpack /
  Vite / Next.js setups handle this out of the box).

Public API is unchanged. The Aphrodite `styles` export
(`import {styles} from "@khanacademy/wonder-blocks-typography"`) is
intentionally retained for cross-package consumers, so the package still
imports Aphrodite for that export.
