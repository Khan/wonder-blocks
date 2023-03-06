# @khanacademy/wonder-blocks-core

## 4.9.0

### Minor Changes

-   779b031d: Update AriaProps to use React's AriaAttributes and AriaRole types

## 4.8.0

### Minor Changes

-   873f4a14: Update aphrodite lib def and StyleType

### Patch Changes

-   d816af08: Update build and test configs use TypeScript
-   3891f544: Update babel config to include plugins that Storybook needed
-   0d28bb1c: Configured TypeScript
-   3d05f764: Fix HOCs and other type errors
-   c2ec4902: Update eslint configuration, fix lint
-   2983c05b: Include 'types' field in package.json
-   77ff6a66: Generate Flow types from TypeScript types
-   ec8d4b7f: Fix miscellaneous TypeScript errors

## 4.7.0

### Minor Changes

-   91cb727c: Convert enums to POJOs

### Patch Changes

-   91cb727c: Remove file extensions from imports

## 4.6.2

### Patch Changes

-   496119f2: Cleanup WB interdependencies

## 4.6.1

## 4.6.0

### Minor Changes

-   b561425a: Add useIsMounted() hook
-   a566e232: Add useOnMountEffect hook
-   d2b21a6e: Export useOnMountEffect hook

## 4.5.0

### Minor Changes

-   175a2dd2: Add 'useRenderState' hook

## 4.4.0

### Minor Changes

-   6ee20af9: Add `useOnline` hook to encapsulate navigator.onLine and the offline/online events

## 4.3.2

### Patch Changes

-   5f4a4297: Make dependency on `flow-enums-runtime` explicit
-   2b96fd59: Change flow-enums-runtime to be peer dependencies

## 4.3.1

## 4.3.0

### Minor Changes

-   246a921d: NEW: `useForceUpdate` hook. This should rarely be used and likely only ever from other hooks.

## 4.2.1

## 4.2.0

### Minor Changes

-   0aed8723: Adds `throwIfNested` required prop to `RenderStateRoot`.

## 4.1.0

### Minor Changes

-   45588e5f: Fix an issue with `useUniqueIdWithMock`/`useUniqueIdWithoutMock`
    rerender more than was needed. The fix introduces `<RenderStateRoot>`
    which must be an ancestor to all components uses these hooks.
-   875b7893: Nesting of `RenderStateRoot`s inside each other can result in extra renders
    and potentially incorrect behavior. `RenderStateRoot` now throws if it
    appears as a descendent of another `RenderStateRoot`.
