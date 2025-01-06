# @khanacademy/wonder-blocks-testing

## 15.0.3

### Patch Changes

-   Updated dependencies [faf7bd21]
    -   @khanacademy/wonder-blocks-data@14.0.5

## 15.0.2

### Patch Changes

-   11a0f5c6: No functional changes. Adding prepublishOnly script.
-   Updated dependencies [11a0f5c6]
    -   @khanacademy/wonder-blocks-testing-core@2.0.1
    -   @khanacademy/wonder-blocks-core@11.0.1
    -   @khanacademy/wonder-blocks-data@14.0.4

## 15.0.1

### Patch Changes

-   Updated dependencies [d23c9c5f]
    -   @khanacademy/wonder-blocks-core@11.0.0
    -   @khanacademy/wonder-blocks-data@14.0.3

## 15.0.0

### Major Changes

-   56d961f1: - Migrate Wonder Blocks components off old id providers and onto new `Id` component

### Patch Changes

-   b6009b77: Deprecate the ID provider and unique ID utilities
-   Updated dependencies [b6009b77]
-   Updated dependencies [897686bc]
-   Updated dependencies [56d961f1]
    -   @khanacademy/wonder-blocks-core@10.0.0
    -   @khanacademy/wonder-blocks-data@14.0.2

## 14.0.1

### Patch Changes

-   Updated dependencies [f4abd572]
    -   @khanacademy/wonder-blocks-core@9.0.0
    -   @khanacademy/wonder-blocks-data@14.0.1

## 14.0.0

### Major Changes

-   e6abdd17: Upgrade to React 18

### Patch Changes

-   Updated dependencies [e6abdd17]
    -   @khanacademy/wonder-blocks-testing-core@2.0.0
    -   @khanacademy/wonder-blocks-core@8.0.0
    -   @khanacademy/wonder-blocks-data@14.0.0

## 13.0.0

### Major Changes

-   eb807af8: When mocking GraphQL, consider explicit undefined values in a request to be equivalent to missing keys in a mock

### Minor Changes

-   16565a85: Add support for hard fails to the request mocking features

### Patch Changes

-   Updated dependencies [16565a85]
    -   @khanacademy/wonder-blocks-testing-core@1.1.0

## 12.0.1

### Patch Changes

-   02a1b298: Make sure we don't package tsconfig and tsbuildinfo files
-   Updated dependencies [02a1b298]
    -   @khanacademy/wonder-blocks-core@7.0.1
    -   @khanacademy/wonder-blocks-data@13.0.12
    -   @khanacademy/wonder-blocks-testing-core@1.0.2

## 12.0.0

### Major Changes

-   490b5fa4: Rename ssr adapter to renderState

### Patch Changes

-   Updated dependencies [07f7f407]
    -   @khanacademy/wonder-blocks-core@7.0.0
    -   @khanacademy/wonder-blocks-data@13.0.11

## 11.0.1

### Patch Changes

-   559e82d5: Update to build tooling, generating smaller output
-   Updated dependencies [c954464a]
-   Updated dependencies [559e82d5]
    -   @khanacademy/wonder-blocks-testing-core@1.0.1
    -   @khanacademy/wonder-blocks-core@6.4.3
    -   @khanacademy/wonder-blocks-data@13.0.10

## 11.0.0

### Major Changes

-   2a6c85df: New package containing core Testing functionality without dependencies on other WB packages
-   2a6c85df: - Minimum version for Storybook actions addon increased to 7
    -   Added new `renderHookStatic` utility to replace deprecated `renderHookServer` from `@testing-library/react-hooks`; ready for React 18 updates
    -   Added new `boundary` error boundary adapter for the test harness to capture errors during tests; ready for React 18 updates

### Patch Changes

-   Updated dependencies [2a6c85df]
-   Updated dependencies [eab37b8b]
    -   @khanacademy/wonder-blocks-testing-core@1.0.0
    -   @khanacademy/wonder-blocks-core@6.4.2
    -   @khanacademy/wonder-blocks-data@13.0.9

## 10.1.1

### Patch Changes

-   Updated dependencies [5dfac06e]
    -   @khanacademy/wonder-blocks-core@6.4.1
    -   @khanacademy/wonder-blocks-data@13.0.8

## 10.1.0

### Minor Changes

-   58075352: Change testId to render the default Testing Library HTML attribute: data-testid (was data-test-id)

### Patch Changes

-   Updated dependencies [58075352]
    -   @khanacademy/wonder-blocks-core@6.4.0
    -   @khanacademy/wonder-blocks-data@13.0.7

## 10.0.1

### Patch Changes

-   Updated dependencies [6df21f71]
    -   @khanacademy/wonder-blocks-core@6.3.1
    -   @khanacademy/wonder-blocks-data@13.0.6

## 10.0.0

### Major Changes

-   a1675f63: Make sure that `MockResponse<TData>` properly enforces `TData` type. This is a breaking change as it affects the usage of the various mocking frameworks, and may result in new type errors in consuming code.

## 9.3.5

### Patch Changes

-   Updated dependencies [7055ca94]
    -   @khanacademy/wonder-blocks-core@6.3.0
    -   @khanacademy/wonder-blocks-data@13.0.5

## 9.3.4

### Patch Changes

-   Updated dependencies [4b97b9a2]
    -   @khanacademy/wonder-blocks-core@6.2.0
    -   @khanacademy/wonder-blocks-data@13.0.4

## 9.3.3

### Patch Changes

-   Updated dependencies [2871f0a9]
    -   @khanacademy/wonder-blocks-core@6.1.1
    -   @khanacademy/wonder-blocks-data@13.0.3

## 9.3.2

### Patch Changes

-   Updated dependencies [efb59c29]
-   Updated dependencies [8bc40ed2]
    -   @khanacademy/wonder-blocks-core@6.1.0
    -   @khanacademy/wonder-blocks-data@13.0.2

## 9.3.1

### Patch Changes

-   9c608281: Make sure ssr adapter doesn't throw if it gets nested

## 9.3.0

### Minor Changes

-   f530fbeb: Fix bug where the test harness was causing the component under test to be remounted when rerendering instead of reusing the existing instance

## 9.2.0

### Minor Changes

-   76883b4e: Make sure Wonder Blocks Testing is dependent on Core

### Patch Changes

-   76883b4e: Output the adapter name with the Adapter component
-   Updated dependencies [f19da46e]
    -   @khanacademy/wonder-blocks-core@6.0.2
    -   @khanacademy/wonder-blocks-data@13.0.1

## 9.1.0

### Minor Changes

-   6ed7e928: Test harness adapters are now rendered as React components which should ensure that contexts are properly available when children are rendered inside the adapters that require those contexts

## 9.0.0

### Major Changes

-   1920feb8: Added new SSR adapter for test harnesses to support `RenderStateRoot` in tests and stories

### Patch Changes

-   Updated dependencies [65c02cff]
    -   @khanacademy/wonder-blocks-data@13.0.0

## 8.0.21

### Patch Changes

-   674a1e5c: We're no longer building flow types
-   Updated dependencies [674a1e5c]
-   Updated dependencies [674a1e5c]
    -   @khanacademy/wonder-blocks-data@12.0.0

## 8.0.20

### Patch Changes

-   @khanacademy/wonder-blocks-data@11.0.16

## 8.0.19

### Patch Changes

-   @khanacademy/wonder-blocks-data@11.0.15

## 8.0.18

### Patch Changes

-   @khanacademy/wonder-blocks-data@11.0.14

## 8.0.17

### Patch Changes

-   @khanacademy/wonder-blocks-data@11.0.13

## 8.0.16

### Patch Changes

-   @khanacademy/wonder-blocks-data@11.0.12

## 8.0.15

### Patch Changes

-   Updated dependencies [5a1ea891]
    -   @khanacademy/wonder-blocks-data@11.0.11

## 8.0.14

### Patch Changes

-   43f6328d: Fix flow types

## 8.0.13

### Patch Changes

-   19ab0408: Update flowgen to convert React.ForwardRefExoticComponent<> and React.FowardedRef<> properly
    -   @khanacademy/wonder-blocks-data@11.0.10

## 8.0.12

### Patch Changes

-   a6164ed0: Don't use React.FC<> for functional components
-   Updated dependencies [a6164ed0]
    -   @khanacademy/wonder-blocks-data@11.0.9

## 8.0.11

### Patch Changes

-   a7fd4c07: Fix regression in error message formatting for fetch mocking

## 8.0.10

### Patch Changes

-   97829726: Fix indentation change in mockGqlFetch

## 8.0.9

### Patch Changes

-   7e79069d: Get the types working properly

## 8.0.8

### Patch Changes

-   @khanacademy/wonder-blocks-data@11.0.8

## 8.0.7

### Patch Changes

-   @khanacademy/wonder-blocks-data@11.0.7

## 8.0.6

### Patch Changes

-   c20f48f3: Don't transpile classes when building bundles
-   Updated dependencies [c20f48f3]
    -   @khanacademy/wonder-blocks-data@11.0.6

## 8.0.5

### Patch Changes

-   Updated dependencies [43155769]
    -   @khanacademy/wonder-blocks-data@11.0.5

## 8.0.4

### Patch Changes

-   Updated dependencies [bedcbcf8]
    -   @khanacademy/wonder-blocks-data@11.0.4

## 8.0.3

### Patch Changes

-   @khanacademy/wonder-blocks-data@11.0.3

## 8.0.2

### Patch Changes

-   @khanacademy/wonder-blocks-data@11.0.2

## 8.0.1

### Patch Changes

-   d4c2b18c: Fix a variety of issues with Flow types generated by flowgen
-   Updated dependencies [ccb6fe00]
-   Updated dependencies [d4c2b18c]
    -   @khanacademy/wonder-blocks-data@11.0.1

## 8.0.0

### Major Changes

-   1ca4d7e3: Fix minor issue with generate Flow types (this is a major bump b/c I forgot to do one after doing the TS conversion)

### Patch Changes

-   Updated dependencies [1ca4d7e3]
    -   @khanacademy/wonder-blocks-data@11.0.0

## 7.1.13

### Patch Changes

-   b5ba5568: Ensure that flow lib defs use React.ElementConfig<> isntead of JSX.LibraryManagedAttributes<>
-   Updated dependencies [b5ba5568]
    -   @khanacademy/wonder-blocks-data@10.1.3

## 7.1.12

### Patch Changes

-   @khanacademy/wonder-blocks-data@10.1.2

## 7.1.11

### Patch Changes

-   873f4a14: Update type narrowing logic to work better with TypeScript
-   d816af08: Update build and test configs use TypeScript
-   3891f544: Update babel config to include plugins that Storybook needed
-   3813715d: Update wonder-stuff dependencies (non-functional changes)
-   0d28bb1c: Configured TypeScript
-   3d05f764: Fix HOCs and other type errors
-   c2ec4902: Update eslint configuration, fix lint
-   2983c05b: Include 'types' field in package.json
-   77ff6a66: Generate Flow types from TypeScript types
-   ec8d4b7f: Fix miscellaneous TypeScript errors
-   Updated dependencies [d816af08]
-   Updated dependencies [3891f544]
-   Updated dependencies [3813715d]
-   Updated dependencies [0d28bb1c]
-   Updated dependencies [3d05f764]
-   Updated dependencies [c2ec4902]
-   Updated dependencies [2983c05b]
-   Updated dependencies [77ff6a66]
-   Updated dependencies [ec8d4b7f]
    -   @khanacademy/wonder-blocks-data@10.1.1

## 7.1.10

### Patch Changes

-   91cb727c: Update wonder-stuff dependencies
-   91cb727c: Remove file extensions from imports
-   Updated dependencies [91cb727c]
-   Updated dependencies [91cb727c]
-   Updated dependencies [91cb727c]
    -   @khanacademy/wonder-blocks-data@10.1.0

## 7.1.9

### Patch Changes

-   1a5624d4: Update wonder-stuff dependencies to use newly published packages after migrating wonder-stuff to TypeScript
-   Updated dependencies [1a5624d4]
    -   @khanacademy/wonder-blocks-data@10.0.5

## 7.1.8

### Patch Changes

-   @khanacademy/wonder-blocks-data@10.0.4

## 7.1.7

### Patch Changes

-   @khanacademy/wonder-blocks-data@10.0.3

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
