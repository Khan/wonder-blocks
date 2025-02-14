# @khanacademy/wonder-blocks-core

## 12.1.1

### Patch Changes

- ee8d95a: Rollback rollup version from v4 to v2 to prevent an issue with CJS builds in unit tests

## 12.1.0

### Minor Changes

- f03298f: Tooling:

    - Switching to `pnpm`.
    - Upgrading `rollup` to v4 and `@babel/runtime` to match the current webapp version.

### Patch Changes

- 969864b: Update internal addStyle variable name to address aphrodite-add-style-variable-name linting rule
- bb2a026: pnpm: Switch to workspace protocol to handle dependency versions with changesets on monorepo setup"

## 12.0.0

### Major Changes

- 0199324d: Fixes keyboard tests in Dropdown and Clickable with specific key events. We now check `event.key` instead of `event.which` or `event.keyCode` to remove deprecated event properties and match the keys returned from Testing Library/userEvent.

## 11.1.0

### Minor Changes

- 7516b239: Update useOnMountEffect to pass isMountedRef to callback

## 11.0.1

### Patch Changes

- 11a0f5c6: No functional changes. Adding prepublishOnly script.

## 11.0.0

### Major Changes

- d23c9c5f: Delete the custom identifier generation API

## 10.0.0

### Major Changes

- b6009b77: Deprecate the ID provider and unique ID utilities

### Minor Changes

- 897686bc: - Add the `Id` component for cases where `useId` cannot be used directly

### Patch Changes

- 56d961f1: - Migrate Wonder Blocks components off old id providers and onto new `Id` component

## 9.0.0

### Major Changes

- f4abd572: - Remove `RenderState.Root` from exported enum
    - Change `useRenderState` to only return `RenderState.Initial` or `RenderState.Standard`

## 8.0.0

### Major Changes

- e6abdd17: Upgrade to React 18

## 7.0.1

### Patch Changes

- 02a1b298: Make sure we don't package tsconfig and tsbuildinfo files

## 7.0.0

### Major Changes

- 07f7f407: Renamed `WithSSRPlaceholder` to `InitialFallback`. This includes changing the `placeholder` prop to `fallback` so it's closer to `Suspense` usage.

## 6.4.3

### Patch Changes

- 559e82d5: Update to build tooling, generating smaller output

## 6.4.2

### Patch Changes

- eab37b8b: Test file changes only. No external changes at all.

## 6.4.1

### Patch Changes

- 5dfac06e: Allow all special characters in IDs, except whitespace.

## 6.4.0

### Minor Changes

- 58075352: Change testId to render the default Testing Library HTML attribute: data-testid (was data-test-id)

## 6.3.1

### Patch Changes

- 6df21f71: Append className if set via props

## 6.3.0

### Minor Changes

- 7055ca94: Make useOnMountEffect accept functions with void return types

## 6.2.0

### Minor Changes

- 4b97b9a2: Remove deps argument from `usePreHydrationEffect`

## 6.1.1

### Patch Changes

- 2871f0a9: Add new usePreHydrationEffect hook to module exports

## 6.1.0

### Minor Changes

- efb59c29: Add `usePreHydrationEffect`

### Patch Changes

- 8bc40ed2: Change the return type of `useLatestRef` from `RefObject<T>` to
  `{readonly current: T}`, so the `current` property is not nullable.

    This fixes a bug introduced by the migration to TypeScript.

## 6.0.2

### Patch Changes

- f19da46e: Allow 'title' on View and typography components

## 6.0.1

### Patch Changes

- 1920feb8: `RenderStateRoot` now wraps children in a React fragment

## 6.0.0

### Major Changes

- 674a1e5c: POJOs have been replace with TS enums

### Patch Changes

- 674a1e5c: We're no longer building flow types

## 5.4.0

### Minor Changes

- 1344436f: Add `PropsFor` type to simplify `JSX.LibraryManagedAttributes` usage

## 5.3.1

### Patch Changes

- 9f3752d4: Used named functions in componenets with forwarded refs

## 5.3.0

### Minor Changes

- c37b99aa: Forward refs for Text and Title
- c4cef3e6: Added ref forwarding to View

## 5.2.3

### Patch Changes

- d4c412b5: Update useForceUpdate to ensure consuming hooks properly refresh

## 5.2.2

### Patch Changes

- 64a188e3: Fix useForceUpdate so that regardless of how many times it is called before a new render, it will always cause a new render

## 5.2.1

### Patch Changes

- 5a1ea891: Make sure that React contexts are named
- df9a10aa: Update state and props to be readonly in components using getDerivedStateFromProps()

## 5.2.0

### Minor Changes

- fa70c895: Add 'lang', 'className' and 'htmlFor' properties to Text and View

### Patch Changes

- 19ab0408: Update flowgen to convert React.ForwardRefExoticComponent<> and React.FowardedRef<> properly
- fa70c895: Remove all TypeScript error suppressions on JSX attributes

## 5.1.0

### Minor Changes

- 3c400719: Add useLatestRef hook to wonder-blocks-core

### Patch Changes

- a6164ed0: Don't use React.FC<> for functional components

## 5.0.4

### Patch Changes

- c20f48f3: Don't transpile classes when building bundles

## 5.0.3

### Patch Changes

- b281e2eb: Fix generate Flow types for real

## 5.0.2

### Patch Changes

- 21ce20c7: Fix issues with generate flow types in wonder-blocks-core

## 5.0.1

### Patch Changes

- ccb6fe00: Miscellaneous TS type fixes
- d4c2b18c: Fix a variety of issues with Flow types generated by flowgen

## 5.0.0

### Major Changes

- 1ca4d7e3: Fix minor issue with generate Flow types (this is a major bump b/c I forgot to do one after doing the TS conversion)

## 4.9.1

### Patch Changes

- b5ba5568: Ensure that flow lib defs use React.ElementConfig<> isntead of JSX.LibraryManagedAttributes<>

## 4.9.0

### Minor Changes

- 779b031d: Update AriaProps to use React's AriaAttributes and AriaRole types

## 4.8.0

### Minor Changes

- 873f4a14: Update aphrodite lib def and StyleType

### Patch Changes

- d816af08: Update build and test configs use TypeScript
- 3891f544: Update babel config to include plugins that Storybook needed
- 0d28bb1c: Configured TypeScript
- 3d05f764: Fix HOCs and other type errors
- c2ec4902: Update eslint configuration, fix lint
- 2983c05b: Include 'types' field in package.json
- 77ff6a66: Generate Flow types from TypeScript types
- ec8d4b7f: Fix miscellaneous TypeScript errors

## 4.7.0

### Minor Changes

- 91cb727c: Convert enums to POJOs

### Patch Changes

- 91cb727c: Remove file extensions from imports

## 4.6.2

### Patch Changes

- 496119f2: Cleanup WB interdependencies

## 4.6.1

## 4.6.0

### Minor Changes

- b561425a: Add useIsMounted() hook
- a566e232: Add useOnMountEffect hook
- d2b21a6e: Export useOnMountEffect hook

## 4.5.0

### Minor Changes

- 175a2dd2: Add 'useRenderState' hook

## 4.4.0

### Minor Changes

- 6ee20af9: Add `useOnline` hook to encapsulate navigator.onLine and the offline/online events

## 4.3.2

### Patch Changes

- 5f4a4297: Make dependency on `flow-enums-runtime` explicit
- 2b96fd59: Change flow-enums-runtime to be peer dependencies

## 4.3.1

## 4.3.0

### Minor Changes

- 246a921d: NEW: `useForceUpdate` hook. This should rarely be used and likely only ever from other hooks.

## 4.2.1

## 4.2.0

### Minor Changes

- 0aed8723: Adds `throwIfNested` required prop to `RenderStateRoot`.

## 4.1.0

### Minor Changes

- 45588e5f: Fix an issue with `useUniqueIdWithMock`/`useUniqueIdWithoutMock`
  rerender more than was needed. The fix introduces `<RenderStateRoot>`
  which must be an ancestor to all components uses these hooks.
- 875b7893: Nesting of `RenderStateRoot`s inside each other can result in extra renders
  and potentially incorrect behavior. `RenderStateRoot` now throws if it
  appears as a descendent of another `RenderStateRoot`.
