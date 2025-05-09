# @khanacademy/wonder-blocks-icon-button

## 9.0.6

### Patch Changes

- c9a0147: Fixes an issue with the IconButton component not triggering `onClick` when the `Space` key is pressed.
- Updated dependencies [28fa0c0]
- Updated dependencies [28fa0c0]
- Updated dependencies [38042e2]
    - @khanacademy/wonder-blocks-core@12.3.0
    - @khanacademy/wonder-blocks-clickable@7.1.0
    - @khanacademy/wonder-blocks-icon@5.1.4

## 9.0.5

### Patch Changes

- Updated dependencies [b9e4946]
    - @khanacademy/wonder-blocks-tokens@10.0.0
    - @khanacademy/wonder-blocks-clickable@7.0.4
    - @khanacademy/wonder-blocks-styles@0.2.7
    - @khanacademy/wonder-blocks-core@12.2.1
    - @khanacademy/wonder-blocks-icon@5.1.3
    - @khanacademy/wonder-blocks-theming@3.3.0

## 9.0.4

### Patch Changes

- Updated dependencies [0b47477]
    - @khanacademy/wonder-blocks-styles@0.2.6

## 9.0.3

### Patch Changes

- 7bbf311: Simplify IconButton pseudo-classes
- Updated dependencies [2656fd4]
- Updated dependencies [6018552]
- Updated dependencies [7bbf311]
- Updated dependencies [7f79943]
- Updated dependencies [7bbf311]
- Updated dependencies [7f79943]
    - @khanacademy/wonder-blocks-tokens@9.0.0
    - @khanacademy/wonder-blocks-theming@3.3.0
    - @khanacademy/wonder-blocks-clickable@7.0.3
    - @khanacademy/wonder-blocks-styles@0.2.5

## 9.0.2

### Patch Changes

- e63adea: Update `border.width` tokens to use new naming conventions.
- 72c47d8: Fix `IconButton.primary` border/outline to always use the global focus outline color (blue)
- Updated dependencies [e63adea]
- Updated dependencies [e63adea]
- Updated dependencies [72c47d8]
    - @khanacademy/wonder-blocks-tokens@8.0.0
    - @khanacademy/wonder-blocks-clickable@7.0.2
    - @khanacademy/wonder-blocks-styles@0.2.4

## 9.0.1

### Patch Changes

- e8ccf60: Update `borderRadius` styles to use new `border.radius` tokens
- Updated dependencies [e8ccf60]
- Updated dependencies [e8ccf60]
    - @khanacademy/wonder-blocks-styles@0.2.3
    - @khanacademy/wonder-blocks-tokens@7.0.0
    - @khanacademy/wonder-blocks-clickable@7.0.1

## 9.0.0

### Major Changes

- 38c926c: Upgrade WB to using react-router-dom-v5-compat.

### Patch Changes

- Updated dependencies [38c926c]
    - @khanacademy/wonder-blocks-clickable@7.0.0
    - @khanacademy/wonder-blocks-core@12.2.1

## 8.0.1

### Patch Changes

- Updated dependencies [24bf12f]
    - @khanacademy/wonder-blocks-tokens@6.0.0
    - @khanacademy/wonder-blocks-clickable@6.1.6
    - @khanacademy/wonder-blocks-styles@0.2.2

## 8.0.0

### Major Changes

- 4846e9c: - Updated to match `Button` styles.
    - Reworked `kind` styles.
    - Removed `secondary` style.
    - Removed `khanmigo` theme to have a more consistent experience in the current site (OG).

### Minor Changes

- 4846e9c: Add `neutral` value to `actionType` prop.

### Patch Changes

- Updated dependencies [3dc5dac]
    - @khanacademy/wonder-blocks-tokens@5.2.0
    - @khanacademy/wonder-blocks-clickable@6.1.5
    - @khanacademy/wonder-blocks-styles@0.2.1

## 7.0.0

### Major Changes

- 61f7837: Remove `light` variant, and replace it with `actionStyles.inverse` for one-off cases
- 3cacbe7: Rename `color` prop to `actionType`. Also rename the `default` value to `progressive`.

### Patch Changes

- 86e1901: Update IconButton to use `box-shadow` instead of `outline`. Also removed the negative margins around the icon button.
- 4887c59: Use `focus` styles from `wonder-blocks-styles` to match the global focus outline.
- Updated dependencies [aace76a]
- Updated dependencies [61f7837]
    - @khanacademy/wonder-blocks-styles@0.2.0

## 6.1.4

### Patch Changes

- 999101f: Fix IconButton theme to use semanticColor.icon tokens
- 1d7be37: Use pnpm catalog to pin dependency versions across packages
- Updated dependencies [1d7be37]
- Updated dependencies [999101f]
    - @khanacademy/wonder-blocks-clickable@6.1.4
    - @khanacademy/wonder-blocks-theming@3.2.1
    - @khanacademy/wonder-blocks-core@12.2.1
    - @khanacademy/wonder-blocks-icon@5.1.3
    - @khanacademy/wonder-blocks-tokens@5.1.1

## 6.1.3

### Patch Changes

- Updated dependencies [507cf2f]
    - @khanacademy/wonder-blocks-tokens@5.1.0
    - @khanacademy/wonder-blocks-clickable@6.1.3

## 6.1.2

### Patch Changes

- 5655b9f: Switch to use `focus.outer` semanticColor token
- 8f53293: Rename action tokens: `filled` -> `primary`, `outlined` -> `secondary`.
- 051f0f8: Rework action.disabled tokens to include properties per kind (border, background, foreground).
- Updated dependencies [ed26d66]
- Updated dependencies [5655b9f]
- Updated dependencies [5655b9f]
- Updated dependencies [8f53293]
- Updated dependencies [6d37702]
- Updated dependencies [051f0f8]
- Updated dependencies [8fc65a9]
- Updated dependencies [e1b78db]
- Updated dependencies [051f0f8]
    - @khanacademy/wonder-blocks-core@12.2.0
    - @khanacademy/wonder-blocks-tokens@5.0.0
    - @khanacademy/wonder-blocks-clickable@6.1.2
    - @khanacademy/wonder-blocks-theming@3.2.0
    - @khanacademy/wonder-blocks-icon@5.1.2

## 6.1.1

### Patch Changes

- ee8d95a: Rollback rollup version from v4 to v2 to prevent an issue with CJS builds in unit tests
- Updated dependencies [ee8d95a]
    - @khanacademy/wonder-blocks-clickable@6.1.1
    - @khanacademy/wonder-blocks-core@12.1.1
    - @khanacademy/wonder-blocks-icon@5.1.1
    - @khanacademy/wonder-blocks-theming@3.1.1
    - @khanacademy/wonder-blocks-tokens@4.2.1

## 6.1.0

### Minor Changes

- f03298f: Tooling:

    - Switching to `pnpm`.
    - Upgrading `rollup` to v4 and `@babel/runtime` to match the current webapp version.

### Patch Changes

- 969864b: Update internal addStyle variable name to address aphrodite-add-style-variable-name linting rule
- bb2a026: pnpm: Switch to workspace protocol to handle dependency versions with changesets on monorepo setup"
- Updated dependencies [969864b]
- Updated dependencies [bb2a026]
- Updated dependencies [f03298f]
    - @khanacademy/wonder-blocks-clickable@6.1.0
    - @khanacademy/wonder-blocks-core@12.1.0
    - @khanacademy/wonder-blocks-icon@5.1.0
    - @khanacademy/wonder-blocks-theming@3.1.0
    - @khanacademy/wonder-blocks-tokens@4.2.0

## 6.0.9

### Patch Changes

- Updated dependencies [0199324d]
    - @khanacademy/wonder-blocks-clickable@6.0.0
    - @khanacademy/wonder-blocks-core@12.0.0
    - @khanacademy/wonder-blocks-icon@5.0.6

## 6.0.8

### Patch Changes

- c1f420ad: Migrate to semanticColor tokens

## 6.0.7

### Patch Changes

- Updated dependencies [8cfaeab0]
- Updated dependencies [c162abb4]
    - @khanacademy/wonder-blocks-tokens@4.1.0
    - @khanacademy/wonder-blocks-clickable@5.0.7

## 6.0.6

### Patch Changes

- Updated dependencies [0de25cd8]
    - @khanacademy/wonder-blocks-tokens@4.0.0
    - @khanacademy/wonder-blocks-clickable@5.0.6

## 6.0.5

### Patch Changes

- Updated dependencies [7516b239]
    - @khanacademy/wonder-blocks-core@11.1.0
    - @khanacademy/wonder-blocks-clickable@5.0.5
    - @khanacademy/wonder-blocks-icon@5.0.5

## 6.0.4

### Patch Changes

- 11a0f5c6: No functional changes. Adding prepublishOnly script.
- Updated dependencies [11a0f5c6]
    - @khanacademy/wonder-blocks-clickable@5.0.4
    - @khanacademy/wonder-blocks-theming@3.0.1
    - @khanacademy/wonder-blocks-tokens@3.0.1
    - @khanacademy/wonder-blocks-core@11.0.1
    - @khanacademy/wonder-blocks-icon@5.0.4

## 6.0.3

### Patch Changes

- Updated dependencies [d23c9c5f]
    - @khanacademy/wonder-blocks-core@11.0.0
    - @khanacademy/wonder-blocks-clickable@5.0.3
    - @khanacademy/wonder-blocks-icon@5.0.3

## 6.0.2

### Patch Changes

- Updated dependencies [b6009b77]
- Updated dependencies [897686bc]
- Updated dependencies [56d961f1]
    - @khanacademy/wonder-blocks-core@10.0.0
    - @khanacademy/wonder-blocks-clickable@5.0.2
    - @khanacademy/wonder-blocks-icon@5.0.2

## 6.0.1

### Patch Changes

- 0955be7e: Fix focus styles: drop Safari v14 support.
- Updated dependencies [f4abd572]
    - @khanacademy/wonder-blocks-core@9.0.0
    - @khanacademy/wonder-blocks-clickable@5.0.1
    - @khanacademy/wonder-blocks-icon@5.0.1

## 6.0.0

### Major Changes

- e6abdd17: Upgrade to React 18

### Patch Changes

- Updated dependencies [e6abdd17]
    - @khanacademy/wonder-blocks-theming@3.0.0
    - @khanacademy/wonder-blocks-core@8.0.0
    - @khanacademy/wonder-blocks-clickable@5.0.0
    - @khanacademy/wonder-blocks-icon@5.0.0
    - @khanacademy/wonder-blocks-tokens@3.0.0

## 5.6.2

### Patch Changes

- Updated dependencies [c1110599]
    - @khanacademy/wonder-blocks-icon@4.2.0

## 5.6.1

### Patch Changes

- Updated dependencies [6999fd39]
    - @khanacademy/wonder-blocks-tokens@2.1.0
    - @khanacademy/wonder-blocks-clickable@4.2.9

## 5.6.0

### Minor Changes

- 75da0046: Adds `id` prop and fixes `type` prop to set 'button' as default value.

## 5.5.0

### Minor Changes

- 3463bde3: Add type=submit prop to allow submitting forms with the button

## 5.4.1

### Patch Changes

- 02a1b298: Make sure we don't package tsconfig and tsbuildinfo files
- Updated dependencies [02a1b298]
    - @khanacademy/wonder-blocks-clickable@4.2.8
    - @khanacademy/wonder-blocks-core@7.0.1
    - @khanacademy/wonder-blocks-icon@4.1.5
    - @khanacademy/wonder-blocks-theming@2.0.4
    - @khanacademy/wonder-blocks-tokens@2.0.1

## 5.4.0

### Minor Changes

- ea506e85: Add onMouseDown prop

## 5.3.5

### Patch Changes

- Updated dependencies [07f7f407]
    - @khanacademy/wonder-blocks-core@7.0.0
    - @khanacademy/wonder-blocks-clickable@4.2.7
    - @khanacademy/wonder-blocks-icon@4.1.4

## 5.3.4

### Patch Changes

- Updated dependencies [f17dc1ee]
- Updated dependencies [991eb43f]
    - @khanacademy/wonder-blocks-tokens@2.0.0
    - @khanacademy/wonder-blocks-clickable@4.2.6

## 5.3.3

### Patch Changes

- 559e82d5: Update to build tooling, generating smaller output
- Updated dependencies [559e82d5]
    - @khanacademy/wonder-blocks-clickable@4.2.5
    - @khanacademy/wonder-blocks-core@6.4.3
    - @khanacademy/wonder-blocks-icon@4.1.3
    - @khanacademy/wonder-blocks-theming@2.0.3
    - @khanacademy/wonder-blocks-tokens@1.3.1

## 5.3.2

### Patch Changes

- Updated dependencies [eab37b8b]
    - @khanacademy/wonder-blocks-core@6.4.2
    - @khanacademy/wonder-blocks-clickable@4.2.4
    - @khanacademy/wonder-blocks-icon@4.1.2

## 5.3.1

### Patch Changes

- Updated dependencies [f099cf87]
    - @khanacademy/wonder-blocks-clickable@4.2.3

## 5.3.0

### Minor Changes

- 16e1635a: IconButton: Add option for `large` value for `size` prop (24x24 icon size with target area of 48x48)

## 5.2.2

### Patch Changes

- Updated dependencies [5dfac06e]
    - @khanacademy/wonder-blocks-core@6.4.1
    - @khanacademy/wonder-blocks-clickable@4.2.2
    - @khanacademy/wonder-blocks-icon@4.1.1

## 5.2.1

### Patch Changes

- Updated dependencies [9bfeead9]
    - @khanacademy/wonder-blocks-tokens@1.3.0
    - @khanacademy/wonder-blocks-clickable@4.2.1

## 5.2.0

### Minor Changes

- 58075352: Change testId to render the default Testing Library HTML attribute: data-testid (was data-test-id)

### Patch Changes

- Updated dependencies [58075352]
    - @khanacademy/wonder-blocks-clickable@4.2.0
    - @khanacademy/wonder-blocks-core@6.4.0
    - @khanacademy/wonder-blocks-icon@4.1.0

## 5.1.14

### Patch Changes

- Updated dependencies [874081aa]
- Updated dependencies [874081aa]
- Updated dependencies [a9bf603a]
    - @khanacademy/wonder-blocks-theming@2.0.2
    - @khanacademy/wonder-blocks-tokens@1.2.0
    - @khanacademy/wonder-blocks-clickable@4.1.3

## 5.1.13

### Patch Changes

- Updated dependencies [e6433bee]
    - @khanacademy/wonder-blocks-clickable@4.1.2

## 5.1.12

### Patch Changes

- Updated dependencies [4cfb4977]
    - @khanacademy/wonder-blocks-tokens@1.1.0
    - @khanacademy/wonder-blocks-clickable@4.1.1

## 5.1.11

### Patch Changes

- Updated dependencies [60fdac1c]
    - @khanacademy/wonder-blocks-clickable@4.1.0

## 5.1.10

### Patch Changes

- Updated dependencies [e83f8991]
- Updated dependencies [e83f8991]
    - @khanacademy/wonder-blocks-tokens@1.0.0
    - @khanacademy/wonder-blocks-theming@2.0.1
    - @khanacademy/wonder-blocks-clickable@4.0.14

## 5.1.9

### Patch Changes

- 7cd7f6cc: Replace theming.tokens with wb-tokens and update callsites to use the new export
- Updated dependencies [7cd7f6cc]
- Updated dependencies [60aba5b8]
- Updated dependencies [7cd7f6cc]
- Updated dependencies [7c51f377]
- Updated dependencies [7c51f377]
    - @khanacademy/wonder-blocks-theming@2.0.0
    - @khanacademy/wonder-blocks-tokens@0.2.0
    - @khanacademy/wonder-blocks-clickable@4.0.13

## 5.1.8

### Patch Changes

- Updated dependencies [80592e75]
    - @khanacademy/wonder-blocks-theming@1.3.0

## 5.1.7

### Patch Changes

- Updated dependencies [23ab9f8c]
- Updated dependencies [6df21f71]
    - @khanacademy/wonder-blocks-icon@4.0.1
    - @khanacademy/wonder-blocks-core@6.3.1
    - @khanacademy/wonder-blocks-clickable@4.0.12

## 5.1.6

### Patch Changes

- 9092363d: Fixes keyboard behavior on IconButton:
    - Allows triggering onClick when Enter is pressed. - Fixes the active state from not being sticky on mobile devices.

## 5.1.5

### Patch Changes

- Updated dependencies [171e3b01]
    - @khanacademy/wonder-blocks-icon@4.0.0

## 5.1.4

### Patch Changes

- Updated dependencies [96f675d2]
    - @khanacademy/wonder-blocks-icon@3.0.0

## 5.1.3

### Patch Changes

- Updated dependencies [edcfbe14]
    - @khanacademy/wonder-blocks-theming@1.2.1

## 5.1.2

### Patch Changes

- Updated dependencies [6b8bf8d5]
    - @khanacademy/wonder-blocks-clickable@4.0.11

## 5.1.1

### Patch Changes

- Updated dependencies [7b24db93]
    - @khanacademy/wonder-blocks-clickable@4.0.10

## 5.1.0

### Minor Changes

- ae97aeb6: Add theming support to the IconButton component
- 22ccc5a9: Switch to pseudo-classes (`:hover, :focus-visible, :active`)
- 0d875501: Add khanmigo theme to `IconButton`

### Patch Changes

- Updated dependencies [3f854fe8]
    - @khanacademy/wonder-blocks-theming@1.2.0

## 5.0.1

### Patch Changes

- Updated dependencies [7055ca94]
    - @khanacademy/wonder-blocks-core@6.3.0
    - @khanacademy/wonder-blocks-clickable@4.0.9
    - @khanacademy/wonder-blocks-icon@2.2.1

## 5.0.0

### Major Changes

- cc6b1950: Change `icon` type to use `PhosphorIcon` (instead of `Icon`).

## 4.2.2

### Patch Changes

- Updated dependencies [ea0e7c02]
    - @khanacademy/wonder-blocks-icon@2.2.0

## 4.2.1

### Patch Changes

- Updated dependencies [48d3c7e9]
    - @khanacademy/wonder-blocks-color@3.0.0
    - @khanacademy/wonder-blocks-clickable@4.0.8

## 4.2.0

### Minor Changes

- fb704043: Add size prop to icon button

### Patch Changes

- Updated dependencies [80cab317]
    - @khanacademy/wonder-blocks-clickable@4.0.7

## 4.1.9

### Patch Changes

- Updated dependencies [4b97b9a2]
    - @khanacademy/wonder-blocks-core@6.2.0
    - @khanacademy/wonder-blocks-clickable@4.0.6
    - @khanacademy/wonder-blocks-icon@2.1.6

## 4.1.8

### Patch Changes

- Updated dependencies [2871f0a9]
    - @khanacademy/wonder-blocks-core@6.1.1
    - @khanacademy/wonder-blocks-clickable@4.0.5
    - @khanacademy/wonder-blocks-icon@2.1.5

## 4.1.7

### Patch Changes

- Updated dependencies [efb59c29]
- Updated dependencies [834855e5]
- Updated dependencies [8bc40ed2]
    - @khanacademy/wonder-blocks-core@6.1.0
    - @khanacademy/wonder-blocks-clickable@4.0.4
    - @khanacademy/wonder-blocks-icon@2.1.4

## 4.1.6

### Patch Changes

- Updated dependencies [f19da46e]
    - @khanacademy/wonder-blocks-core@6.0.2
    - @khanacademy/wonder-blocks-clickable@4.0.3
    - @khanacademy/wonder-blocks-icon@2.1.3

## 4.1.5

### Patch Changes

- Updated dependencies [8dc4a5a3]
- Updated dependencies [1920feb8]
    - @khanacademy/wonder-blocks-clickable@4.0.2
    - @khanacademy/wonder-blocks-core@6.0.1
    - @khanacademy/wonder-blocks-icon@2.1.2

## 4.1.4

### Patch Changes

- Updated dependencies [f230b267]
    - @khanacademy/wonder-blocks-clickable@4.0.1

## 4.1.3

### Patch Changes

- Updated dependencies [8c77f29d]
- Updated dependencies [674a1e5c]
- Updated dependencies [674a1e5c]
- Updated dependencies [674a1e5c]
    - @khanacademy/wonder-blocks-clickable@4.0.0
    - @khanacademy/wonder-blocks-core@6.0.0
    - @khanacademy/wonder-blocks-icon@2.1.1

## 4.1.2

### Patch Changes

- Updated dependencies [ec6a33a4]
- Updated dependencies [1344436f]
    - @khanacademy/wonder-blocks-icon@2.1.0
    - @khanacademy/wonder-blocks-core@5.4.0
    - @khanacademy/wonder-blocks-clickable@3.1.3

## 4.1.1

### Patch Changes

- 9f3752d4: Used named functions in componenets with forwarded refs
- Updated dependencies [9f3752d4]
    - @khanacademy/wonder-blocks-core@5.3.1
    - @khanacademy/wonder-blocks-clickable@3.1.2
    - @khanacademy/wonder-blocks-icon@2.0.15

## 4.1.0

### Minor Changes

- 0992ff2b: Add ref forwarding to Button and IconButton

### Patch Changes

- Updated dependencies [c37b99aa]
- Updated dependencies [c4cef3e6]
    - @khanacademy/wonder-blocks-core@5.3.0
    - @khanacademy/wonder-blocks-clickable@3.1.1
    - @khanacademy/wonder-blocks-icon@2.0.14

## 4.0.14

### Patch Changes

- Updated dependencies [ad8beb23]
    - @khanacademy/wonder-blocks-clickable@3.1.0

## 4.0.13

### Patch Changes

- Updated dependencies [d4c412b5]
    - @khanacademy/wonder-blocks-core@5.2.3
    - @khanacademy/wonder-blocks-clickable@3.0.13
    - @khanacademy/wonder-blocks-icon@2.0.13

## 4.0.12

### Patch Changes

- Updated dependencies [64a188e3]
    - @khanacademy/wonder-blocks-core@5.2.2
    - @khanacademy/wonder-blocks-clickable@3.0.12
    - @khanacademy/wonder-blocks-icon@2.0.12

## 4.0.11

### Patch Changes

- Updated dependencies [5a1ea891]
- Updated dependencies [df9a10aa]
    - @khanacademy/wonder-blocks-core@5.2.1
    - @khanacademy/wonder-blocks-clickable@3.0.11
    - @khanacademy/wonder-blocks-icon@2.0.11

## 4.0.10

### Patch Changes

- Updated dependencies [fa70c895]
- Updated dependencies [19ab0408]
- Updated dependencies [fa70c895]
    - @khanacademy/wonder-blocks-core@5.2.0
    - @khanacademy/wonder-blocks-clickable@3.0.10
    - @khanacademy/wonder-blocks-icon@2.0.10

## 4.0.9

### Patch Changes

- Updated dependencies [3c400719]
- Updated dependencies [a6164ed0]
    - @khanacademy/wonder-blocks-core@5.1.0
    - @khanacademy/wonder-blocks-clickable@3.0.9
    - @khanacademy/wonder-blocks-icon@2.0.9

## 4.0.8

### Patch Changes

- @khanacademy/wonder-blocks-clickable@3.0.8
- @khanacademy/wonder-blocks-icon@2.0.8

## 4.0.7

### Patch Changes

- @khanacademy/wonder-blocks-clickable@3.0.7
- @khanacademy/wonder-blocks-icon@2.0.7

## 4.0.6

### Patch Changes

- c20f48f3: Don't transpile classes when building bundles
- Updated dependencies [c20f48f3]
    - @khanacademy/wonder-blocks-clickable@3.0.6
    - @khanacademy/wonder-blocks-core@5.0.4
    - @khanacademy/wonder-blocks-icon@2.0.6

## 4.0.5

### Patch Changes

- @khanacademy/wonder-blocks-clickable@3.0.5
- @khanacademy/wonder-blocks-icon@2.0.5

## 4.0.4

### Patch Changes

- @khanacademy/wonder-blocks-clickable@3.0.4
- @khanacademy/wonder-blocks-icon@2.0.4

## 4.0.3

### Patch Changes

- Updated dependencies [b281e2eb]
    - @khanacademy/wonder-blocks-core@5.0.3
    - @khanacademy/wonder-blocks-clickable@3.0.3
    - @khanacademy/wonder-blocks-icon@2.0.3

## 4.0.2

### Patch Changes

- Updated dependencies [21ce20c7]
    - @khanacademy/wonder-blocks-core@5.0.2
    - @khanacademy/wonder-blocks-clickable@3.0.2
    - @khanacademy/wonder-blocks-icon@2.0.2

## 4.0.1

### Patch Changes

- ccb6fe00: Miscellaneous TS type fixes
- d4c2b18c: Fix a variety of issues with Flow types generated by flowgen
- Updated dependencies [ccb6fe00]
- Updated dependencies [d4c2b18c]
    - @khanacademy/wonder-blocks-clickable@3.0.1
    - @khanacademy/wonder-blocks-core@5.0.1
    - @khanacademy/wonder-blocks-icon@2.0.1
    - @khanacademy/wonder-blocks-color@2.0.1

## 4.0.0

### Major Changes

- 1ca4d7e3: Fix minor issue with generate Flow types (this is a major bump b/c I forgot to do one after doing the TS conversion)

### Patch Changes

- Updated dependencies [1ca4d7e3]
    - @khanacademy/wonder-blocks-clickable@3.0.0
    - @khanacademy/wonder-blocks-color@2.0.0
    - @khanacademy/wonder-blocks-core@5.0.0
    - @khanacademy/wonder-blocks-icon@2.0.0

## 3.4.24

### Patch Changes

- b5ba5568: Ensure that flow lib defs use React.ElementConfig<> isntead of JSX.LibraryManagedAttributes<>
- Updated dependencies [b5ba5568]
    - @khanacademy/wonder-blocks-clickable@2.4.8
    - @khanacademy/wonder-blocks-color@1.2.3
    - @khanacademy/wonder-blocks-core@4.9.1
    - @khanacademy/wonder-blocks-icon@1.2.40

## 3.4.23

### Patch Changes

- Updated dependencies [779b031d]
    - @khanacademy/wonder-blocks-core@4.9.0
    - @khanacademy/wonder-blocks-clickable@2.4.7
    - @khanacademy/wonder-blocks-icon@1.2.39

## 3.4.22

### Patch Changes

- d816af08: Update build and test configs use TypeScript
- 3891f544: Update babel config to include plugins that Storybook needed
- 0d28bb1c: Configured TypeScript
- 3d05f764: Fix HOCs and other type errors
- c2ec4902: Update eslint configuration, fix lint
- 2983c05b: Include 'types' field in package.json
- 77ff6a66: Generate Flow types from TypeScript types
- ec8d4b7f: Fix miscellaneous TypeScript errors
- Updated dependencies [d816af08]
- Updated dependencies [3891f544]
- Updated dependencies [3813715d]
- Updated dependencies [0d28bb1c]
- Updated dependencies [873f4a14]
- Updated dependencies [3d05f764]
- Updated dependencies [c2ec4902]
- Updated dependencies [2983c05b]
- Updated dependencies [77ff6a66]
- Updated dependencies [ec8d4b7f]
    - @khanacademy/wonder-blocks-clickable@2.4.6
    - @khanacademy/wonder-blocks-color@1.2.2
    - @khanacademy/wonder-blocks-core@4.8.0
    - @khanacademy/wonder-blocks-icon@1.2.38

## 3.4.21

### Patch Changes

- 91cb727c: Remove file extensions from imports
- Updated dependencies [91cb727c]
- Updated dependencies [91cb727c]
- Updated dependencies [91cb727c]
- Updated dependencies [91cb727c]
    - @khanacademy/wonder-blocks-icon@1.2.37
    - @khanacademy/wonder-blocks-clickable@2.4.5
    - @khanacademy/wonder-blocks-color@1.2.1
    - @khanacademy/wonder-blocks-core@4.7.0

## 3.4.20

### Patch Changes

- Updated dependencies [1a5624d4]
    - @khanacademy/wonder-blocks-icon@1.2.36

## 3.4.19

### Patch Changes

- Updated dependencies [496119f2]
    - @khanacademy/wonder-blocks-clickable@2.4.4
    - @khanacademy/wonder-blocks-core@4.6.2
    - @khanacademy/wonder-blocks-icon@1.2.35

## 3.4.18

### Patch Changes

- @khanacademy/wonder-blocks-clickable@2.4.3
- @khanacademy/wonder-blocks-core@4.6.1
- @khanacademy/wonder-blocks-icon@1.2.34

## 3.4.17

### Patch Changes

- Updated dependencies [b561425a]
- Updated dependencies [a566e232]
- Updated dependencies [d2b21a6e]
    - @khanacademy/wonder-blocks-core@4.6.0
    - @khanacademy/wonder-blocks-clickable@2.4.2
    - @khanacademy/wonder-blocks-icon@1.2.33

## 3.4.16

### Patch Changes

- Updated dependencies [4c682709]
    - @khanacademy/wonder-blocks-clickable@2.4.1

## 3.4.15

### Patch Changes

- ceb111df: ClickableBehavior no longer has tabIndex 0 by default. It must be passed in.
- Updated dependencies [ceb111df]
    - @khanacademy/wonder-blocks-clickable@2.4.0

## 3.4.14

### Patch Changes

- Updated dependencies [175a2dd2]
    - @khanacademy/wonder-blocks-core@4.5.0
    - @khanacademy/wonder-blocks-clickable@2.3.3
    - @khanacademy/wonder-blocks-icon@1.2.32

## 3.4.13

### Patch Changes

- Updated dependencies [5b8ba5da]
    - @khanacademy/wonder-blocks-clickable@2.3.2

## 3.4.12

### Patch Changes

- Updated dependencies [3bae2aba]
    - @khanacademy/wonder-blocks-icon@1.2.31

## 3.4.11

### Patch Changes

- Updated dependencies [6ee20af9]
    - @khanacademy/wonder-blocks-core@4.4.0
    - @khanacademy/wonder-blocks-clickable@2.3.1
    - @khanacademy/wonder-blocks-icon@1.2.30

## 3.4.10

### Patch Changes

- Updated dependencies [34c7aacb]
    - @khanacademy/wonder-blocks-color@1.2.0

## 3.4.9

### Patch Changes

- Updated dependencies [ee6fc773]
    - @khanacademy/wonder-blocks-clickable@2.3.0

## 3.4.8

### Patch Changes

- Updated dependencies [83486dba]
    - @khanacademy/wonder-blocks-icon@1.2.29

## 3.4.7

### Patch Changes

- Updated dependencies [5f4a4297]
- Updated dependencies [2b96fd59]
    - @khanacademy/wonder-blocks-core@4.3.2
    - @khanacademy/wonder-blocks-clickable@2.2.7
    - @khanacademy/wonder-blocks-icon@1.2.28

## 3.4.6

### Patch Changes

- @khanacademy/wonder-blocks-clickable@2.2.6
- @khanacademy/wonder-blocks-core@4.3.1
- @khanacademy/wonder-blocks-icon@1.2.27

## 3.4.5

### Patch Changes

- Updated dependencies [246a921d]
    - @khanacademy/wonder-blocks-core@4.3.0
    - @khanacademy/wonder-blocks-clickable@2.2.5
    - @khanacademy/wonder-blocks-icon@1.2.26

## 3.4.4

### Patch Changes

- Updated dependencies [166ecc97]
    - @khanacademy/wonder-blocks-clickable@2.2.4

## 3.4.3

### Patch Changes

- @khanacademy/wonder-blocks-clickable@2.2.3
- @khanacademy/wonder-blocks-core@4.2.1
- @khanacademy/wonder-blocks-icon@1.2.25

## 3.4.2

### Patch Changes

- Updated dependencies [901bfe82]
    - @khanacademy/wonder-blocks-clickable@2.2.2
