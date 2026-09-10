---
"@khanacademy/wonder-blocks-core": major
---

Add the first phase of i18n support: a `strings.ts` declaring the English source of Wonder Blocks' own user-facing strings (published as the `@khanacademy/wonder-blocks-core/strings` subpath for translation tooling), plus `WonderBlocksI18nContextProvider` and the `useWonderBlocksI18n` hook for supplying translated strings and a locale.

Outside tests and Storybook the context has no default value, matching how Perseus and Math Input do this. An app rendering a Wonder Blocks component that reads these strings must mount `WonderBlocksI18nContextProvider` above it, or that component throws.
