---
"@khanacademy/wonder-blocks-core": minor
---

Add the first phase of i18n support: a `strings.ts` declaring the English source of Wonder Blocks' own user-facing strings (published as the `@khanacademy/wonder-blocks-core/strings` subpath for translation tooling), plus `WonderBlocksI18nContextProvider` and the `useWonderBlocksI18n` hook for supplying translated strings and a locale. Components fall back to English where no provider is mounted, so adopting the provider is optional.
