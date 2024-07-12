# @khanacademy/wonder-blocks-clickable

## 4.2.4

### Patch Changes

-   Updated dependencies [eab37b8b]
    -   @khanacademy/wonder-blocks-core@6.4.2

## 4.2.3

### Patch Changes

-   f099cf87: Improves accessibility of the checked status on `OptionItem` components used
    within the `ActionMenu` component. The checked status is communicated to
    screenreaders by using a `menuitemcheckbox` role with the `aria-checked`
    attribute (instead of `aria-selected`). - `CellCore` (used by `CompactCell` and `DetailCell`) has a new optional
    prop for `aria-checked` - `ClickableRole` type now supports the `menuitemcheckbox` role - `OptionItem`'s `role` prop now also supports the `menuitemcheckbox` role

## 4.2.2

### Patch Changes

-   Updated dependencies [5dfac06e]
    -   @khanacademy/wonder-blocks-core@6.4.1

## 4.2.1

### Patch Changes

-   Updated dependencies [9bfeead9]
    -   @khanacademy/wonder-blocks-tokens@1.3.0

## 4.2.0

### Minor Changes

-   58075352: Change testId to render the default Testing Library HTML attribute: data-testid (was data-test-id)

### Patch Changes

-   Updated dependencies [58075352]
    -   @khanacademy/wonder-blocks-core@6.4.0

## 4.1.3

### Patch Changes

-   Updated dependencies [874081aa]
-   Updated dependencies [874081aa]
-   Updated dependencies [a9bf603a]
    -   @khanacademy/wonder-blocks-tokens@1.2.0

## 4.1.2

### Patch Changes

-   e6433bee: Fix event bubbling on ClickableBehavior when submit is used.

## 4.1.1

### Patch Changes

-   Updated dependencies [4cfb4977]
    -   @khanacademy/wonder-blocks-tokens@1.1.0

## 4.1.0

### Minor Changes

-   60fdac1c: Added onMouseDown and onMouseUp props to Clickable

## 4.0.14

### Patch Changes

-   Updated dependencies [e83f8991]
    -   @khanacademy/wonder-blocks-tokens@1.0.0

## 4.0.13

### Patch Changes

-   7c51f377: Migrate wb-color imports to use tokens.color
-   Updated dependencies [7cd7f6cc]
-   Updated dependencies [7c51f377]
    -   @khanacademy/wonder-blocks-tokens@0.2.0

## 4.0.12

### Patch Changes

-   Updated dependencies [6df21f71]
    -   @khanacademy/wonder-blocks-core@6.3.1

## 4.0.11

### Patch Changes

-   6b8bf8d5: Fix onFocus handler on Clickable

## 4.0.10

### Patch Changes

-   7b24db93: Get onFocus to work for buttons

## 4.0.9

### Patch Changes

-   Updated dependencies [7055ca94]
    -   @khanacademy/wonder-blocks-core@6.3.0

## 4.0.8

### Patch Changes

-   Updated dependencies [48d3c7e9]
    -   @khanacademy/wonder-blocks-color@3.0.0

## 4.0.7

### Patch Changes

-   80cab317: Include `aria-disabled=false` for `Links` (instead of `undefined`).

## 4.0.6

### Patch Changes

-   Updated dependencies [4b97b9a2]
    -   @khanacademy/wonder-blocks-core@6.2.0

## 4.0.5

### Patch Changes

-   Updated dependencies [2871f0a9]
    -   @khanacademy/wonder-blocks-core@6.1.1

## 4.0.4

### Patch Changes

-   834855e5: Allow 'title' as a prop on Clickable
-   Updated dependencies [efb59c29]
-   Updated dependencies [8bc40ed2]
    -   @khanacademy/wonder-blocks-core@6.1.0

## 4.0.3

### Patch Changes

-   Updated dependencies [f19da46e]
    -   @khanacademy/wonder-blocks-core@6.0.2

## 4.0.2

### Patch Changes

-   8dc4a5a3: Allow 'beforeNav' and 'safeWithNav' to be used without an 'href'
-   Updated dependencies [1920feb8]
    -   @khanacademy/wonder-blocks-core@6.0.1

## 4.0.1

### Patch Changes

-   f230b267: Allow 'safeWithNav()' to be used on its own without 'beforeNav()' in prop types

## 4.0.0

### Major Changes

-   674a1e5c: Props are using discriminated union types to prevent invalid combinations of props

### Minor Changes

-   8c77f29d: Create new Switch component and add 'switch' role to ClickableRole

### Patch Changes

-   674a1e5c: We're no longer building flow types
-   Updated dependencies [674a1e5c]
-   Updated dependencies [674a1e5c]
    -   @khanacademy/wonder-blocks-core@6.0.0

## 3.1.3

### Patch Changes

-   Updated dependencies [1344436f]
    -   @khanacademy/wonder-blocks-core@5.4.0

## 3.1.2

### Patch Changes

-   Updated dependencies [9f3752d4]
    -   @khanacademy/wonder-blocks-core@5.3.1

## 3.1.1

### Patch Changes

-   Updated dependencies [c37b99aa]
-   Updated dependencies [c4cef3e6]
    -   @khanacademy/wonder-blocks-core@5.3.0

## 3.1.0

### Minor Changes

-   ad8beb23: Added new tab index and ref props

## 3.0.13

### Patch Changes

-   Updated dependencies [d4c412b5]
    -   @khanacademy/wonder-blocks-core@5.2.3

## 3.0.12

### Patch Changes

-   Updated dependencies [64a188e3]
    -   @khanacademy/wonder-blocks-core@5.2.2

## 3.0.11

### Patch Changes

-   df9a10aa: Update state and props to be readonly in components using getDerivedStateFromProps()
-   Updated dependencies [5a1ea891]
-   Updated dependencies [df9a10aa]
    -   @khanacademy/wonder-blocks-core@5.2.1

## 3.0.10

### Patch Changes

-   Updated dependencies [fa70c895]
-   Updated dependencies [19ab0408]
-   Updated dependencies [fa70c895]
    -   @khanacademy/wonder-blocks-core@5.2.0

## 3.0.9

### Patch Changes

-   Updated dependencies [3c400719]
-   Updated dependencies [a6164ed0]
    -   @khanacademy/wonder-blocks-core@5.1.0

## 3.0.8

## 3.0.7

## 3.0.6

### Patch Changes

-   c20f48f3: Don't transpile classes when building bundles
-   Updated dependencies [c20f48f3]
    -   @khanacademy/wonder-blocks-core@5.0.4

## 3.0.5

## 3.0.4

## 3.0.3

### Patch Changes

-   Updated dependencies [b281e2eb]
    -   @khanacademy/wonder-blocks-core@5.0.3

## 3.0.2

### Patch Changes

-   Updated dependencies [21ce20c7]
    -   @khanacademy/wonder-blocks-core@5.0.2

## 3.0.1

### Patch Changes

-   ccb6fe00: Miscellaneous TS type fixes
-   d4c2b18c: Fix a variety of issues with Flow types generated by flowgen
-   Updated dependencies [ccb6fe00]
-   Updated dependencies [d4c2b18c]
    -   @khanacademy/wonder-blocks-core@5.0.1
    -   @khanacademy/wonder-blocks-color@2.0.1

## 3.0.0

### Major Changes

-   1ca4d7e3: Fix minor issue with generate Flow types (this is a major bump b/c I forgot to do one after doing the TS conversion)

### Patch Changes

-   Updated dependencies [1ca4d7e3]
    -   @khanacademy/wonder-blocks-color@2.0.0
    -   @khanacademy/wonder-blocks-core@5.0.0

## 2.4.8

### Patch Changes

-   b5ba5568: Ensure that flow lib defs use React.ElementConfig<> isntead of JSX.LibraryManagedAttributes<>
-   Updated dependencies [b5ba5568]
    -   @khanacademy/wonder-blocks-color@1.2.3
    -   @khanacademy/wonder-blocks-core@4.9.1

## 2.4.7

### Patch Changes

-   Updated dependencies [779b031d]
    -   @khanacademy/wonder-blocks-core@4.9.0

## 2.4.6

### Patch Changes

-   d816af08: Update build and test configs use TypeScript
-   3891f544: Update babel config to include plugins that Storybook needed
-   0d28bb1c: Configured TypeScript
-   3d05f764: Fix HOCs and other type errors
-   c2ec4902: Update eslint configuration, fix lint
-   2983c05b: Include 'types' field in package.json
-   77ff6a66: Generate Flow types from TypeScript types
-   ec8d4b7f: Fix miscellaneous TypeScript errors
-   Updated dependencies [d816af08]
-   Updated dependencies [3891f544]
-   Updated dependencies [0d28bb1c]
-   Updated dependencies [873f4a14]
-   Updated dependencies [3d05f764]
-   Updated dependencies [c2ec4902]
-   Updated dependencies [2983c05b]
-   Updated dependencies [77ff6a66]
-   Updated dependencies [ec8d4b7f]
    -   @khanacademy/wonder-blocks-color@1.2.2
    -   @khanacademy/wonder-blocks-core@4.8.0

## 2.4.5

### Patch Changes

-   91cb727c: Remove file extensions from imports
-   91cb727c: Merge disjoint prop types since the codemod doesn't handle these properly.
-   Updated dependencies [91cb727c]
-   Updated dependencies [91cb727c]
    -   @khanacademy/wonder-blocks-color@1.2.1
    -   @khanacademy/wonder-blocks-core@4.7.0

## 2.4.4

### Patch Changes

-   496119f2: Cleanup WB interdependencies
-   Updated dependencies [496119f2]
    -   @khanacademy/wonder-blocks-core@4.6.2

## 2.4.3

### Patch Changes

-   @khanacademy/wonder-blocks-core@4.6.1

## 2.4.2

### Patch Changes

-   Updated dependencies [b561425a]
-   Updated dependencies [a566e232]
-   Updated dependencies [d2b21a6e]
    -   @khanacademy/wonder-blocks-core@4.6.0

## 2.4.1

### Patch Changes

-   4c682709: handleClick no longer redundantly triggers on mouseup

## 2.4.0

### Minor Changes

-   ceb111df: ClickableBehavior no longer has tabIndex 0 by default. It must be passed in.

## 2.3.3

### Patch Changes

-   Updated dependencies [175a2dd2]
    -   @khanacademy/wonder-blocks-core@4.5.0

## 2.3.2

### Patch Changes

-   5b8ba5da: Remove the default value of aria-label ""

## 2.3.1

### Patch Changes

-   Updated dependencies [6ee20af9]
    -   @khanacademy/wonder-blocks-core@4.4.0

## 2.3.0

### Minor Changes

-   ee6fc773: Added keyboard support to search items when the dropdown is focused, included "Enter" as a key to trigger actions with the "option" role

## 2.2.7

### Patch Changes

-   Updated dependencies [5f4a4297]
-   Updated dependencies [2b96fd59]
    -   @khanacademy/wonder-blocks-core@4.3.2

## 2.2.6

### Patch Changes

-   @khanacademy/wonder-blocks-core@4.3.1

## 2.2.5

### Patch Changes

-   Updated dependencies [246a921d]
    -   @khanacademy/wonder-blocks-core@4.3.0

## 2.2.4

### Patch Changes

-   166ecc97: Use `aria-disabled` instead of disabled, fix focused + disabled styles.

## 2.2.3

### Patch Changes

-   @khanacademy/wonder-blocks-core@4.2.1

## 2.2.2

### Patch Changes

-   901bfe82: Change disabled tabindex from -1 to 0
