---
"@khanacademy/wonder-blocks-link": major
---

Link's external-link icon now takes its accessible name from `WonderBlocksI18nContextProvider`, so an app supplies the translation once instead of at every call site. `labels.externalIconAriaLabel` still overrides it for a single Link.

`Link` therefore requires `WonderBlocksI18nContextProvider` to be mounted above it. Outside tests and Storybook, a `Link` with no provider above it throws.
