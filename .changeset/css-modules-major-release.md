---
"@khanacademy/wonder-blocks-banner": major
"@khanacademy/wonder-blocks-button": major
"@khanacademy/wonder-blocks-cell": major
"@khanacademy/wonder-blocks-date-picker": major
"@khanacademy/wonder-blocks-dropdown": major
"@khanacademy/wonder-blocks-filters": major
"@khanacademy/wonder-blocks-form": major
"@khanacademy/wonder-blocks-icon": major
"@khanacademy/wonder-blocks-icon-button": major
"@khanacademy/wonder-blocks-labeled-field": major
"@khanacademy/wonder-blocks-link": major
"@khanacademy/wonder-blocks-modal": major
"@khanacademy/wonder-blocks-progress-spinner": major
"@khanacademy/wonder-blocks-switch": major
"@khanacademy/wonder-blocks-tabs": major
---

**Breaking:** this package now styles its components with CSS Modules instead
of Aphrodite (WB-2120), and its components render unstyled unless its CSS is
loaded. To set it up:

- **Load the CSS.** The JS entry imports `dist/index.css` as a side effect, and
  `"sideEffects": ["**/*.css"]` keeps bundlers from dropping it, so standard
  webpack, Vite and Next.js setups need no change. Builds that can't process
  CSS imports (some SSR or Jest setups) need a CSS loader or mock. The
  stylesheet is also exported as `./css` for apps that load it explicitly.
- **Declare the cascade layer order** before any Wonder Blocks CSS:
  `@layer reset, shared, shared.base, shared.reset, legacy;`. The component
  rules live in `@layer shared`, so unlayered app CSS now beats them
  regardless of specificity. Overrides passed through `style` / `styles`
  props still go through Aphrodite and keep winning.

`filters`, `icon` and `tabs` also gain an `exports` map, so deep imports such
as `@khanacademy/wonder-blocks-icon/dist/...` no longer resolve. Import from
the package root or `./css` instead.

See the package's other changesets for the precedence edge cases that change
behavior, and the "Get Started / CSS setup" guide in Storybook.
