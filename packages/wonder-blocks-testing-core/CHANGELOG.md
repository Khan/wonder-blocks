# @khanacademy/wonder-blocks-testing-core

## 5.1.1

### Patch Changes

- d35ae3d: Router test harness adapter: make the context-mode `location` and `initialEntries` config options mutually exclusive at the type level. Previously this exclusivity relied on union excess-property checking, which TypeScript 6.0 relaxed; it is now enforced structurally with `never` guards (mirroring the existing data-routes guards) so combining the two shapes is a hard type error under both TypeScript 5.7 and 6.0.

## 5.1.0

### Minor Changes

- b5618a5: The `router` test harness adapter now supports a data-routes mode for exercising React Router v6 data routers. Passing a `routes` config renders `createMemoryRouter` + `RouterProvider` so that route `loader`s run and `errorElement`s render (`useRouteError`/`useLoaderData`, redirects, deferred data) — unlike context mode, which only provides routing context via `MemoryRouter`/`StaticRouter`.

    The mode is selected purely by config shape: pass `routes` (plus optional `initialEntries`/`initialIndex`/`hydrationData`) for data-routes mode, or a location for the existing context mode. Provide `routes` as a function `(harnessedComponent) => RouteObject[]` for full control over where the harnessed component is mounted (e.g. as an `errorElement`), or as an array to mount it as the matched leaf route's `element` (the leaf must not define its own `element`, `Component`, or `lazy`). Pass `hydrationData` to pre-resolve loaders and render synchronously. Context mode is unchanged and backward-compatible, and combining the two modes is a type error.

    The router adapter's config type is now exported as `RouterAdapterConfig`.

## 5.0.0

### Major Changes

- cf6ddda: Updated Wonder Stuff peer dependencies to latest major releases

## 4.0.3

### Patch Changes

- 8a36c70: Re-publish to publish with Trusted Publishing
- 3e0d137: Re-publishing via Trusted Publishing

## 4.0.2

### Patch Changes

- 6d5c485: Include provenance information when publishing to npmjs

## 4.0.1

### Patch Changes

- 4c03506: Upgrade wonder-blocks infrastructure to use Storybook v9

## 4.0.0

### Major Changes

- 82b5970: Removed Fixtures framework - please use the native Storybook CSFv3 format for stories

## 3.0.1

### Patch Changes

- 30f357a: Deprecate fixtures framework

## 3.0.0

### Major Changes

- 38c926c: Upgrade WB to using react-router-dom-v5-compat.

## 2.2.1

### Patch Changes

- 1d7be37: Use pnpm catalog to pin dependency versions across packages

## 2.2.0

### Minor Changes

- eb47d37: Improve error messaging for the router test harness adapter

## 2.1.1

### Patch Changes

- ee8d95a: Rollback rollup version from v4 to v2 to prevent an issue with CJS builds in unit tests

## 2.1.0

### Minor Changes

- f03298f: Tooling:

    - Switching to `pnpm`.
    - Upgrading `rollup` to v4 and `@babel/runtime` to match the current webapp version.

## 2.0.1

### Patch Changes

- 11a0f5c6: No functional changes. Adding prepublishOnly script.

## 2.0.0

### Major Changes

- e6abdd17: Upgrade to React 18

## 1.1.0

### Minor Changes

- 16565a85: Add support for hard fails to the request mocking features

## 1.0.2

### Patch Changes

- 02a1b298: Make sure we don't package tsconfig and tsbuildinfo files

## 1.0.1

### Patch Changes

- c954464a: Fix how react-dom/server is imported in Wonder Blocks Testing Core
- 559e82d5: Update to build tooling, generating smaller output

## 1.0.0

### Major Changes

- 2a6c85df: New package containing core Testing functionality without dependencies on other WB packages
