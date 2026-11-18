---
"@khanacademy/wonder-blocks-tokens": minor
"@khanacademy/wonder-blocks-tabs": patch
"@khanacademy/wonder-blocks-birthday-picker": patch
---

Add breakpoint custom media queries for CSS. `@khanacademy/wonder-blocks-tokens/custom-media.css`
defines one `@custom-media` per `breakpoint.mediaQuery` token (e.g.
`@media (--wb-breakpoint-mediaQuery-mdOrLarger)`); expand them at build time with
`postcss-custom-media`. `NavigationTabItem` now uses the `mdOrLarger` breakpoint;
its emitted query changes from `(width >= 682px)` to the equivalent
`(min-width: 682px)`, matching the Aphrodite token and supporting Safari < 16.4.

`BirthdayPicker` now stacks its selects at the `xsOrSmaller` breakpoint
(`max-width: 567px`, previously a hard-coded `max-width: 520px`).
