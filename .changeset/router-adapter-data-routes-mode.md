---
"@khanacademy/wonder-blocks-testing-core": minor
"@khanacademy/wonder-blocks-testing": minor
---

The `router` test harness adapter now supports a data-routes mode for exercising React Router v6 data routers. Passing a `routes` config renders `createMemoryRouter` + `RouterProvider` so that route `loader`s run and `errorElement`s render (`useRouteError`/`useLoaderData`, redirects, deferred data) — unlike context mode, which only provides routing context via `MemoryRouter`/`StaticRouter`.

The mode is selected purely by config shape: pass `routes` (plus optional `initialEntries`/`initialIndex`/`hydrationData`) for data-routes mode, or a location for the existing context mode. Provide `routes` as a function `(harnessedComponent) => RouteObject[]` for full control over where the harnessed component is mounted (e.g. as an `errorElement`), or as an array to mount it as the matched leaf route's `element` (the leaf must not define its own `element`, `Component`, or `lazy`). Pass `hydrationData` to pre-resolve loaders and render synchronously. Context mode is unchanged and backward-compatible, and combining the two modes is a type error.

The router adapter's config type is now exported as `RouterAdapterConfig`.
