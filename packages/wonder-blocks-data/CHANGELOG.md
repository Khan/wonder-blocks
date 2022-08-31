# @khanacademy/wonder-blocks-data

## 9.1.0

### Minor Changes

-   944c3071: Make sure objects and arrays in variables are sorted and readable in generated request identifiers

## 9.0.0

### Major Changes

-   778f8e43: `SharedCache` export added for interacting with the shared in-memory cache. `purgeSharedCache` method has been removed.
-   778f8e43: Rename `ScopedCache` type to `RawScopedCache`

## 8.0.5

### Patch Changes

-   08238b89: Export the `getGqlDataFromResponse` method so we can use it in custom `gqlFetch` scenarios for a consistent experience

## 8.0.4

### Patch Changes

-   dc2e00f4: Do not fetch if FetchPolicy is CacheBeforeNetwork and there is already a cached value, even if the requestId changes

## 8.0.3

### Patch Changes

-   5f4a4297: Make dependency on `flow-enums-runtime` explicit
-   2b96fd59: Change flow-enums-runtime to be peer dependencies
-   Updated dependencies [5f4a4297]
-   Updated dependencies [2b96fd59]
    -   @khanacademy/wonder-blocks-core@4.3.2

## 8.0.2

### Patch Changes

-   580141ed: Always initialize SSR-only cache

## 8.0.1

### Patch Changes

-   e5fa4d9e: Make sure ssr-only cache is initialized when purging caches in test environment

## 8.0.0

### Major Changes

-   0720470e: Renamed `initializeCache` to `initializeHydrationCache`, deleted `removeFromCache`, renamed `removeAllFromCache` to `purgeHydrationCache`
-   cf9ed87f: Add `fetchPolicy` to `useCachedEffect` options, add `refetch` to `useCachedEffect` return value (return value is now a tuple of [result, refetch]), add abort API to request fulfillment (not truly aborting though)
-   b882b082: Stop exporting `RequestFulfillment`, update `useCachedEffect` to consider scope with sharing inflight requests
-   0720470e: Rename `fulfillAllDataRequests` to `fetchTrackedRequests`, rename `hasUnfulfilledRequests` to `hasTrackedRequestsToBeFetched`
-   0720470e: Renamed `clearSharedCache` to `purgeSharedCache`

### Minor Changes

-   0720470e: Add `purgeCaches` export for purging all caches with one call
-   75c10036: Add `abortInflightRequests` to exports
-   a85f2f3a: Provide `getGqlRequestId` function

### Patch Changes

-   1385f468: Removed unnecessary `new` on tracking context creation

## 7.0.1

### Patch Changes

-   @khanacademy/wonder-blocks-core@4.3.1

## 7.0.0

### Major Changes

-   34407c4a: `useServerEffect` now has a `skip` option, preventing the request from getting tracked for server-side fulfillment

## 6.0.1

### Patch Changes

-   5ad01891: [FIX] Make sure hydratable effect properly renders when requestId changes

## 6.0.0

### Major Changes

-   1f34c4e8: `Result<TData>` is now the main return type, `useGql` supports context modification, and context overrides that are set explicitly to null now mean those values are deleted when merging
-   885fe62b: [NEW] `useCachedEffect` hook for performing asynchronous work client-side and caching the result. Updated `useHydratableEffect` to use `useCachedEffect`. `useServerEffect` handler is now interceptable with Wonder Blocks Data `InterceptData` component.
-   5c852025: [NEW] Added the `useHydratableEffect` hook and updated the `Data` component to use it. Breaking change: `Data` props have been renamed and retyped to fit `useHydratableResult` API.
-   c91f3959: New `DataError` type and changes to the `GqlError` type. Also changes what errors are thrown in various code
-   753220a4: Exported in-flight request tracking mechanism and reworked Data component so that client-side requests don't get morphed to and from a cache-style value

### Minor Changes

-   5d614ed4: Changed `Result<TData>` error status so that error field is an error object, not a string

### Patch Changes

-   Updated dependencies [246a921d]
    -   @khanacademy/wonder-blocks-core@4.3.0

## 5.0.1

### Patch Changes

-   c9922b34: Export resultFromCachedResponse

## 5.0.0

### Major Changes

-   5b5f85ac: Replace `InterceptData` with `InterceptRequests` and introduce new `useRequestInterception` hook

## 4.0.0

### Major Changes

-   febc7309: Rename types and update signatures
    -   `ValidData` is now `ValidCacheData`
    -   `Cache` type is now `ResponseCache` (old `ResponseCache` can be created with `$ReadOnly<ResponseCache>`)
    -   `CacheEntry` type is now `CachedResponse`
    -   Signatures that were typed as `$ReadOnly<Cache>` previously are now typed as `ResponseCache` which is more appropriate to how they work
-   bffc345e: Simplified, more versatile API

    -   NEW: `useServerEffect` hook - a way to perform asynchronous tasks on the server and have the value available for hydration
    -   UPDATED: `Data` component - New API that does away with the `IRequestHandler` interface. Includes new props to control behavior on hydration and when new requests occur.
    -   UPDATED: `InterceptData` component - New API to reflect changes in `Data` component.

    -   REMOVED: `IRequestHandler` API. All associated call signatures have been updated to reflect this.
    -   REMOVED: `useData` hook - The `Data` component should be used

### Minor Changes

-   7c9dd09b: - New `useSharedData` hook
    -   New `ScopedInMemoryCache` export

## 3.2.0

### Minor Changes

-   6973afa2: useGql method now merges defaultContext and partial context by ignoring values explicitly set to undefined in the partial context. This ensures that that existing default context values are not overridden unless explicitly given a value other than undefined.

## 3.1.3

### Patch Changes

-   9931ae6b: Simplify GQL types

## 3.1.2

### Patch Changes

-   @khanacademy/wonder-blocks-core@4.2.1

## 3.1.1

### Patch Changes

-   4ff59815: Add GraphQL fetch mock support to wonder-blocks-testing

## 3.1.0

### Minor Changes

-   b68cedfe: Add GqlRouter component
-   c7233a97: Implement useGql hook

## 3.0.1

### Patch Changes

-   d281dac8: Ensure server-side request fulfillments can be intercepted

## 3.0.0

### Major Changes

-   b252d9c8: Remove client-side caching
-   b252d9c8: Introduce useData hook
