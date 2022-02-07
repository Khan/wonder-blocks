# @khanacademy/wonder-blocks-data

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
