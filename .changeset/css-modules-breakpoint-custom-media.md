---
"@khanacademy/wonder-blocks-tokens": minor
"@khanacademy/wonder-blocks-tabs": patch
"@khanacademy/wonder-blocks-birthday-picker": patch
---

Add breakpoint custom media queries for CSS. `@khanacademy/wonder-blocks-tokens/custom-media.css`
defines one `@custom-media` per `breakpoint.mediaQuery` token (e.g.
`@media (--wb-breakpoint-mediaQuery-mdOrLarger)`). Expand them at build time by
adding `@csstools/postcss-global-data` (with
`files: [require.resolve("@khanacademy/wonder-blocks-tokens/custom-media.css")]`)
and `postcss-custom-media` to your PostCSS config. `NavigationTabItem` now uses the `mdOrLarger` breakpoint;
its emitted query changes from `(width >= 682px)` to the equivalent
`(min-width: 682px)`, matching the Aphrodite token and supporting Safari < 16.4.

`BirthdayPicker` now stacks its selects at the `xsOrSmaller` breakpoint
(`max-width: 567px`, previously a hard-coded `max-width: 520px`).
