# @khanacademy/wonder-blocks-testing

## 7.1.6

### Patch Changes

-   @khanacademy/wonder-blocks-data@10.0.2

## 7.1.5

### Patch Changes

-   @khanacademy/wonder-blocks-data@10.0.1

## 7.1.4

### Patch Changes

-   Updated dependencies [5a3ec7f9]
    -   @khanacademy/wonder-blocks-data@10.0.0

## 7.1.3

### Patch Changes

-   @khanacademy/wonder-blocks-data@9.1.2

## 7.1.2

### Patch Changes

-   Updated dependencies [eb59ce34]
    -   @khanacademy/wonder-blocks-data@9.1.1

## 7.1.1

### Patch Changes

-   Updated dependencies [944c3071]
    -   @khanacademy/wonder-blocks-data@9.1.0

## 7.1.0

### Minor Changes

-   17301778: Add `toPromise` method to mock responses

### Patch Changes

-   d5a13e6d: `RespondWith` API now supports a signal for controlling the settlement of the promise. Introduces `SettleController` to support this new feature.

## 7.0.5

### Patch Changes

-   Updated dependencies [778f8e43]
-   Updated dependencies [778f8e43]
    -   @khanacademy/wonder-blocks-data@9.0.0

## 7.0.4

### Patch Changes

-   Updated dependencies [08238b89]
    -   @khanacademy/wonder-blocks-data@8.0.5

## 7.0.3

### Patch Changes

-   Updated dependencies [dc2e00f4]
    -   @khanacademy/wonder-blocks-data@8.0.4

## 7.0.2

### Patch Changes

-   aa7993a8: Make sure wrapper component is used when provided

## 7.0.1

### Patch Changes

-   79a3bc8e: Export more types for the fixtures framework

## 7.0.0

### Major Changes

-   d078f526: Simplify fixtures API to target only CSF/storybook

## 6.1.0

### Minor Changes

-   b79979b8: Add `logHandler` to GetPropsOptions to simplify generic event logging for common use cases

## 6.0.0

### Major Changes

-   af459222: Improve typing for fixtures call

## 5.0.2

### Patch Changes

-   Updated dependencies [5f4a4297]
-   Updated dependencies [2b96fd59]
    -   @khanacademy/wonder-blocks-data@8.0.3

## 5.0.1

### Patch Changes

-   5b1c80d2: Fix test harness types

## 5.0.0

### Major Changes

-   217b2c7b: Add test harness framework
-   a8d9a825: Adapters for fixture framework now exported as `fixtureAdapters`, adapters for test harness framework now exported as `harnessAdapters`. Various types renamed for disambiguation. `FetchMock` and `GqlMock` export types removed.

## 4.0.4

### Patch Changes

-   Updated dependencies [580141ed]
    -   @khanacademy/wonder-blocks-data@8.0.2

## 4.0.3

### Patch Changes

-   Updated dependencies [e5fa4d9e]
    -   @khanacademy/wonder-blocks-data@8.0.1

## 4.0.2

### Patch Changes

-   Updated dependencies [1385f468]
-   Updated dependencies [0720470e]
-   Updated dependencies [0720470e]
-   Updated dependencies [cf9ed87f]
-   Updated dependencies [b882b082]
-   Updated dependencies [0720470e]
-   Updated dependencies [75c10036]
-   Updated dependencies [a85f2f3a]
-   Updated dependencies [0720470e]
    -   @khanacademy/wonder-blocks-data@8.0.0

## 4.0.1

### Patch Changes

-   @khanacademy/wonder-blocks-data@7.0.1

## 4.0.0

### Major Changes

-   fce91b39: Introduced `mockFetch` and expanded `RespondWith` options. `RespondWith` responses will now be real `Response` instances (needs node-fetch peer dependency if no other implementation exists). Breaking changes: `RespondWith.data` is now `RespondWith.graphQLData`.

## 3.0.1

### Patch Changes

-   6e4fbeed: Make sure simplified fixtures call copes with return values from React.forwardRef

## 3.0.0

### Major Changes

-   9a43cc06: Allow for autogenerating titles in Storybook

### Patch Changes

-   222cb8db: Add simplified signature for common usage of `fixtures` function

## 2.0.8

### Patch Changes

-   Updated dependencies [34407c4a]
    -   @khanacademy/wonder-blocks-data@7.0.0

## 2.0.7

### Patch Changes

-   Updated dependencies [5ad01891]
    -   @khanacademy/wonder-blocks-data@6.0.1

## 2.0.6

### Patch Changes

-   Updated dependencies [1f34c4e8]
-   Updated dependencies [885fe62b]
-   Updated dependencies [5c852025]
-   Updated dependencies [c91f3959]
-   Updated dependencies [5d614ed4]
-   Updated dependencies [753220a4]
    -   @khanacademy/wonder-blocks-data@6.0.0

## 2.0.5

### Patch Changes

-   Updated dependencies [c9922b34]
    -   @khanacademy/wonder-blocks-data@5.0.1

## 2.0.4

### Patch Changes

-   Updated dependencies [5b5f85ac]
    -   @khanacademy/wonder-blocks-data@5.0.0

## 2.0.3

### Patch Changes

-   Updated dependencies [7c9dd09b]
-   Updated dependencies [febc7309]
-   Updated dependencies [bffc345e]
    -   @khanacademy/wonder-blocks-data@4.0.0

## 2.0.2

### Patch Changes

-   Updated dependencies [6973afa2]
    -   @khanacademy/wonder-blocks-data@3.2.0

## 2.0.1

### Patch Changes

-   9931ae6b: Simplify GQL types
-   Updated dependencies [9931ae6b]
    -   @khanacademy/wonder-blocks-data@3.1.3

## 2.0.0

### Major Changes

-   274caaac: Remove isolateModules (now implemented by @khanacademy/wonder-stuff-testing), export GQL framework, export fixture framework types

### Patch Changes

-   @khanacademy/wonder-blocks-data@3.1.2

## 1.0.0

### Major Changes

-   4ff59815: Add GraphQL fetch mock support to wonder-blocks-testing

### Patch Changes

-   Updated dependencies [4ff59815]
    -   @khanacademy/wonder-blocks-data@3.1.1

## 0.0.2

### Patch Changes

-   d2dba67a: Implemented the fixture framework and added the storybook adapter for it
-   b7a100f2: Add the new wonder-blocks-testing package