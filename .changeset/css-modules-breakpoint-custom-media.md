---
"@khanacademy/wonder-blocks-tabs": patch
"@khanacademy/wonder-blocks-tokens": patch
---

Internal: CSS Modules can now use the `breakpoint.mediaQuery` tokens as
build-time custom media queries (`@media (--wb-breakpoint-mediaQuery-mdOrLarger)`),
generated from `media-queries.ts` and expanded by `postcss-custom-media`.
`NavigationTabItem` uses the `mdOrLarger` token; its emitted query changes
from `(width >= 682px)` to the equivalent `(min-width: 682px)`, matching the
Aphrodite token and supporting Safari < 16.4.
