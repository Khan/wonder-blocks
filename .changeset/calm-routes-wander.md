---
"@khanacademy/wonder-blocks-clickable": major
"@khanacademy/wonder-blocks-config": minor
"@khanacademy/wonder-blocks-testing-core": minor
---

`Clickable` no longer depends on React Router. Client-side navigation now uses the router that the app supplies with `WonderBlocksRouterProvider` from `@khanacademy/wonder-blocks-config`. Without a provider, `Clickable` does a full page navigation. The test harness router adapter and the new `ReactRouterAdapter` supply React Router to Wonder Blocks components.
