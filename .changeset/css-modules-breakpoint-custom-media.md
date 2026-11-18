---
"@khanacademy/wonder-blocks-tokens": minor
"@khanacademy/wonder-blocks-tabs": patch
---

Add breakpoint custom media queries for CSS. `@khanacademy/wonder-blocks-tokens/custom-media.css`
defines one `@custom-media` per `breakpoint.mediaQuery` token (e.g.
`@media (--wb-breakpoint-mdOrLarger)`); expand them at build time with
`postcss-custom-media`. `NavigationTabItem` now uses the `mdOrLarger` breakpoint;
its emitted query changes from `(width >= 682px)` to the equivalent
`(min-width: 682px)`, matching the Aphrodite token and supporting Safari < 16.4.
