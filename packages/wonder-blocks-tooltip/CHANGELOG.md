# @khanacademy/wonder-blocks-tooltip

## 2.5.4

### Patch Changes

-   @khanacademy/wonder-blocks-modal@5.1.16

## 2.5.3

### Patch Changes

-   Updated dependencies [6999fd39]
    -   @khanacademy/wonder-blocks-tokens@2.1.0
    -   @khanacademy/wonder-blocks-layout@2.2.2
    -   @khanacademy/wonder-blocks-modal@5.1.15

## 2.5.2

### Patch Changes

-   @khanacademy/wonder-blocks-modal@5.1.14

## 2.5.1

### Patch Changes

-   @khanacademy/wonder-blocks-modal@5.1.13

## 2.5.0

### Minor Changes

-   badad6ee: Adds a `viewportPadding` prop to provide spacing between the popper and the viewport edges. If this prop is not provided, default spacing is applied.

### Patch Changes

-   fcab789b: Only show the `TooltipPopper` contents once the popper has positioned itself. This fixes the issue where Tooltips are initially rendered in the top left corner for a brief moment before moving to the correct position (which was causing a flickering effect).

## 2.4.3

### Patch Changes

-   02a1b298: Make sure we don't package tsconfig and tsbuildinfo files
-   Updated dependencies [02a1b298]
    -   @khanacademy/wonder-blocks-core@7.0.1
    -   @khanacademy/wonder-blocks-layout@2.2.1
    -   @khanacademy/wonder-blocks-modal@5.1.12
    -   @khanacademy/wonder-blocks-tokens@2.0.1
    -   @khanacademy/wonder-blocks-typography@2.1.16

## 2.4.2

### Patch Changes

-   @khanacademy/wonder-blocks-modal@5.1.11

## 2.4.1

### Patch Changes

-   Updated dependencies [07f7f407]
    -   @khanacademy/wonder-blocks-core@7.0.0
    -   @khanacademy/wonder-blocks-layout@2.2.0
    -   @khanacademy/wonder-blocks-modal@5.1.10
    -   @khanacademy/wonder-blocks-typography@2.1.15

## 2.4.0

### Minor Changes

-   79b9fdb1: Update tooltip implementation of Popper to:

    -   Ensure that the popper doesn't disappear when the referenced element is not in view in very small screen sizes. This ensures customers can interact with the popper in extra small screen sizes or +400% zoom without the popper randomly disappearing.
    -   Addition of an optional property to set what the root boundary is for the popper behavior. This is set to "viewport" by default, causing the popper to be positioned based on the user's viewport. If set to "document", it will position itself based on where there is available room within the document body

## 2.3.9

### Patch Changes

-   Updated dependencies [f17dc1ee]
-   Updated dependencies [991eb43f]
    -   @khanacademy/wonder-blocks-tokens@2.0.0
    -   @khanacademy/wonder-blocks-layout@2.1.3
    -   @khanacademy/wonder-blocks-modal@5.1.9

## 2.3.8

### Patch Changes

-   be540444: Fix tooltip bug where it sometimes flickers and stays hidden when the anchor is hovered over in Firefox

## 2.3.7

### Patch Changes

-   559e82d5: Update to build tooling, generating smaller output
-   Updated dependencies [559e82d5]
    -   @khanacademy/wonder-blocks-core@6.4.3
    -   @khanacademy/wonder-blocks-layout@2.1.2
    -   @khanacademy/wonder-blocks-modal@5.1.8
    -   @khanacademy/wonder-blocks-tokens@1.3.1
    -   @khanacademy/wonder-blocks-typography@2.1.14

## 2.3.6

### Patch Changes

-   Updated dependencies [eab37b8b]
    -   @khanacademy/wonder-blocks-core@6.4.2
    -   @khanacademy/wonder-blocks-layout@2.1.1
    -   @khanacademy/wonder-blocks-modal@5.1.7
    -   @khanacademy/wonder-blocks-typography@2.1.13

## 2.3.5

### Patch Changes

-   @khanacademy/wonder-blocks-modal@5.1.6

## 2.3.4

### Patch Changes

-   @khanacademy/wonder-blocks-modal@5.1.5

## 2.3.3

### Patch Changes

-   Updated dependencies [47a758b6]
    -   @khanacademy/wonder-blocks-layout@2.1.0
    -   @khanacademy/wonder-blocks-modal@5.1.4

## 2.3.2

### Patch Changes

-   Updated dependencies [5dfac06e]
    -   @khanacademy/wonder-blocks-core@6.4.1
    -   @khanacademy/wonder-blocks-layout@2.0.33
    -   @khanacademy/wonder-blocks-modal@5.1.3
    -   @khanacademy/wonder-blocks-typography@2.1.12

## 2.3.1

### Patch Changes

-   @khanacademy/wonder-blocks-modal@5.1.2

## 2.3.0

### Minor Changes

-   d2d84ca2: Removing unusable strings from union in Popover's `placement` prop

### Patch Changes

-   Updated dependencies [9bfeead9]
    -   @khanacademy/wonder-blocks-tokens@1.3.0
    -   @khanacademy/wonder-blocks-layout@2.0.32
    -   @khanacademy/wonder-blocks-modal@5.1.1

## 2.2.1

### Patch Changes

-   Updated dependencies [58075352]
    -   @khanacademy/wonder-blocks-modal@5.1.0
    -   @khanacademy/wonder-blocks-core@6.4.0
    -   @khanacademy/wonder-blocks-layout@2.0.31
    -   @khanacademy/wonder-blocks-typography@2.1.11

## 2.2.0

### Minor Changes

-   98ab6820: Add autoUpdate prop to update the tooltip position when the trigger element changes

### Patch Changes

-   Updated dependencies [1b741a83]
    -   @khanacademy/wonder-blocks-modal@5.0.0

## 2.1.32

### Patch Changes

-   Updated dependencies [874081aa]
-   Updated dependencies [874081aa]
-   Updated dependencies [a9bf603a]
    -   @khanacademy/wonder-blocks-tokens@1.2.0
    -   @khanacademy/wonder-blocks-modal@4.2.8
    -   @khanacademy/wonder-blocks-layout@2.0.30

## 2.1.31

### Patch Changes

-   Updated dependencies [c39bfd29]
    -   @khanacademy/wonder-blocks-layout@2.0.29
    -   @khanacademy/wonder-blocks-modal@4.2.7

## 2.1.30

### Patch Changes

-   @khanacademy/wonder-blocks-modal@4.2.6

## 2.1.29

### Patch Changes

-   Updated dependencies [4cfb4977]
    -   @khanacademy/wonder-blocks-tokens@1.1.0
    -   @khanacademy/wonder-blocks-layout@2.0.28
    -   @khanacademy/wonder-blocks-modal@4.2.5

## 2.1.28

### Patch Changes

-   @khanacademy/wonder-blocks-modal@4.2.4

## 2.1.27

### Patch Changes

-   Updated dependencies [e83f8991]
    -   @khanacademy/wonder-blocks-tokens@1.0.0
    -   @khanacademy/wonder-blocks-layout@2.0.27
    -   @khanacademy/wonder-blocks-modal@4.2.3

## 2.1.26

### Patch Changes

-   60aba5b8: Update internal spacing references (from wb-spacing to wb-tokens)
-   7c51f377: Migrate wb-color imports to use tokens.color
-   Updated dependencies [60aba5b8]
-   Updated dependencies [7cd7f6cc]
-   Updated dependencies [7c51f377]
-   Updated dependencies [7cd7f6cc]
-   Updated dependencies [7c51f377]
    -   @khanacademy/wonder-blocks-layout@2.0.26
    -   @khanacademy/wonder-blocks-modal@4.2.2
    -   @khanacademy/wonder-blocks-tokens@0.2.0

## 2.1.25

### Patch Changes

-   @khanacademy/wonder-blocks-modal@4.2.1

## 2.1.24

### Patch Changes

-   Updated dependencies [b7bae8f2]
-   Updated dependencies [09c61d25]
    -   @khanacademy/wonder-blocks-modal@4.2.0

## 2.1.23

### Patch Changes

-   Updated dependencies [1b21747a]
    -   @khanacademy/wonder-blocks-modal@4.1.0

## 2.1.22

### Patch Changes

-   Updated dependencies [6df21f71]
    -   @khanacademy/wonder-blocks-core@6.3.1
    -   @khanacademy/wonder-blocks-layout@2.0.25
    -   @khanacademy/wonder-blocks-modal@4.0.39
    -   @khanacademy/wonder-blocks-typography@2.1.10

## 2.1.21

### Patch Changes

-   @khanacademy/wonder-blocks-modal@4.0.38

## 2.1.20

### Patch Changes

-   @khanacademy/wonder-blocks-modal@4.0.37

## 2.1.19

### Patch Changes

-   @khanacademy/wonder-blocks-modal@4.0.36

## 2.1.18

### Patch Changes

-   @khanacademy/wonder-blocks-modal@4.0.35

## 2.1.17

### Patch Changes

-   @khanacademy/wonder-blocks-modal@4.0.34

## 2.1.16

### Patch Changes

-   @khanacademy/wonder-blocks-modal@4.0.33

## 2.1.15

### Patch Changes

-   @khanacademy/wonder-blocks-modal@4.0.32

## 2.1.14

### Patch Changes

-   Updated dependencies [7055ca94]
    -   @khanacademy/wonder-blocks-core@6.3.0
    -   @khanacademy/wonder-blocks-layout@2.0.24
    -   @khanacademy/wonder-blocks-modal@4.0.31
    -   @khanacademy/wonder-blocks-typography@2.1.9

## 2.1.13

### Patch Changes

-   Updated dependencies [b6fbd635]
-   Updated dependencies [cc6b1950]
    -   @khanacademy/wonder-blocks-layout@2.0.23
    -   @khanacademy/wonder-blocks-modal@4.0.30

## 2.1.12

### Patch Changes

-   @khanacademy/wonder-blocks-modal@4.0.29

## 2.1.11

### Patch Changes

-   Updated dependencies [48d3c7e9]
    -   @khanacademy/wonder-blocks-color@3.0.0
    -   @khanacademy/wonder-blocks-modal@4.0.28

## 2.1.10

### Patch Changes

-   @khanacademy/wonder-blocks-modal@4.0.27

## 2.1.9

### Patch Changes

-   @khanacademy/wonder-blocks-modal@4.0.26

## 2.1.8

### Patch Changes

-   Updated dependencies [4b97b9a2]
    -   @khanacademy/wonder-blocks-core@6.2.0
    -   @khanacademy/wonder-blocks-layout@2.0.22
    -   @khanacademy/wonder-blocks-modal@4.0.25
    -   @khanacademy/wonder-blocks-typography@2.1.8

## 2.1.7

### Patch Changes

-   Updated dependencies [2871f0a9]
    -   @khanacademy/wonder-blocks-core@6.1.1
    -   @khanacademy/wonder-blocks-layout@2.0.21
    -   @khanacademy/wonder-blocks-modal@4.0.24
    -   @khanacademy/wonder-blocks-typography@2.1.7

## 2.1.6

### Patch Changes

-   Updated dependencies [efb59c29]
-   Updated dependencies [8bc40ed2]
    -   @khanacademy/wonder-blocks-core@6.1.0
    -   @khanacademy/wonder-blocks-layout@2.0.20
    -   @khanacademy/wonder-blocks-modal@4.0.23
    -   @khanacademy/wonder-blocks-typography@2.1.6

## 2.1.5

### Patch Changes

-   Updated dependencies [f19da46e]
    -   @khanacademy/wonder-blocks-core@6.0.2
    -   @khanacademy/wonder-blocks-layout@2.0.19
    -   @khanacademy/wonder-blocks-modal@4.0.22
    -   @khanacademy/wonder-blocks-typography@2.1.5

## 2.1.4

### Patch Changes

-   Updated dependencies [1920feb8]
    -   @khanacademy/wonder-blocks-core@6.0.1
    -   @khanacademy/wonder-blocks-layout@2.0.18
    -   @khanacademy/wonder-blocks-modal@4.0.21
    -   @khanacademy/wonder-blocks-typography@2.1.4

## 2.1.3

### Patch Changes

-   @khanacademy/wonder-blocks-modal@4.0.20

## 2.1.2

### Patch Changes

-   Updated dependencies [674a1e5c]
-   Updated dependencies [674a1e5c]
    -   @khanacademy/wonder-blocks-modal@4.0.19
    -   @khanacademy/wonder-blocks-core@6.0.0
    -   @khanacademy/wonder-blocks-layout@2.0.17
    -   @khanacademy/wonder-blocks-typography@2.1.3

## 2.1.1

### Patch Changes

-   Updated dependencies [1344436f]
    -   @khanacademy/wonder-blocks-core@5.4.0
    -   @khanacademy/wonder-blocks-modal@4.0.18
    -   @khanacademy/wonder-blocks-layout@2.0.16
    -   @khanacademy/wonder-blocks-typography@2.1.2

## 2.1.0

### Minor Changes

-   9f3752d4: Added custom styling for background color, text color, and padding to Tooltip

### Patch Changes

-   Updated dependencies [9f3752d4]
    -   @khanacademy/wonder-blocks-typography@2.1.1
    -   @khanacademy/wonder-blocks-core@5.3.1
    -   @khanacademy/wonder-blocks-modal@4.0.17
    -   @khanacademy/wonder-blocks-layout@2.0.15

## 2.0.16

### Patch Changes

-   Updated dependencies [0423a440]
-   Updated dependencies [c37b99aa]
-   Updated dependencies [afd5a801]
-   Updated dependencies [13c48aa0]
-   Updated dependencies [cade62f3]
-   Updated dependencies [c4cef3e6]
-   Updated dependencies [4c900085]
    -   @khanacademy/wonder-blocks-typography@2.1.0
    -   @khanacademy/wonder-blocks-core@5.3.0
    -   @khanacademy/wonder-blocks-modal@4.0.16
    -   @khanacademy/wonder-blocks-layout@2.0.14

## 2.0.15

### Patch Changes

-   @khanacademy/wonder-blocks-modal@4.0.15

## 2.0.14

### Patch Changes

-   Updated dependencies [d4c412b5]
    -   @khanacademy/wonder-blocks-core@5.2.3
    -   @khanacademy/wonder-blocks-layout@2.0.13
    -   @khanacademy/wonder-blocks-modal@4.0.14
    -   @khanacademy/wonder-blocks-typography@2.0.13

## 2.0.13

### Patch Changes

-   Updated dependencies [64a188e3]
    -   @khanacademy/wonder-blocks-core@5.2.2
    -   @khanacademy/wonder-blocks-layout@2.0.12
    -   @khanacademy/wonder-blocks-modal@4.0.13
    -   @khanacademy/wonder-blocks-typography@2.0.12

## 2.0.12

### Patch Changes

-   86f58e6b: Allow the popover tail to be optional. This is a non-breaking change as it defaults to being visible as before. The TooltipTail export of wonder-blocks-tooltip is modified to support this, but it is a minor change that does not impact the primary API and hence is a patch update. While the Popover change is similar, it has a direct impact to primary uses and so is a minor update.
-   df9a10aa: Update state and props to be readonly in components using getDerivedStateFromProps()
-   Updated dependencies [5a1ea891]
-   Updated dependencies [df9a10aa]
    -   @khanacademy/wonder-blocks-layout@2.0.11
    -   @khanacademy/wonder-blocks-modal@4.0.12
    -   @khanacademy/wonder-blocks-core@5.2.1
    -   @khanacademy/wonder-blocks-typography@2.0.11

## 2.0.11

### Patch Changes

-   fa70c895: Remove all TypeScript error suppressions on JSX attributes
-   Updated dependencies [fa70c895]
-   Updated dependencies [19ab0408]
-   Updated dependencies [fa70c895]
    -   @khanacademy/wonder-blocks-core@5.2.0
    -   @khanacademy/wonder-blocks-modal@4.0.11
    -   @khanacademy/wonder-blocks-layout@2.0.10
    -   @khanacademy/wonder-blocks-typography@2.0.10

## 2.0.10

### Patch Changes

-   @khanacademy/wonder-blocks-modal@4.0.10

## 2.0.9

### Patch Changes

-   Updated dependencies [3c400719]
-   Updated dependencies [a6164ed0]
    -   @khanacademy/wonder-blocks-core@5.1.0
    -   @khanacademy/wonder-blocks-modal@4.0.9
    -   @khanacademy/wonder-blocks-layout@2.0.9
    -   @khanacademy/wonder-blocks-typography@2.0.9

## 2.0.8

### Patch Changes

-   @khanacademy/wonder-blocks-layout@2.0.8
-   @khanacademy/wonder-blocks-modal@4.0.8
-   @khanacademy/wonder-blocks-typography@2.0.8

## 2.0.7

### Patch Changes

-   @khanacademy/wonder-blocks-layout@2.0.7
-   @khanacademy/wonder-blocks-modal@4.0.7
-   @khanacademy/wonder-blocks-typography@2.0.7

## 2.0.6

### Patch Changes

-   c20f48f3: Don't transpile classes when building bundles
-   Updated dependencies [c20f48f3]
    -   @khanacademy/wonder-blocks-core@5.0.4
    -   @khanacademy/wonder-blocks-layout@2.0.6
    -   @khanacademy/wonder-blocks-modal@4.0.6
    -   @khanacademy/wonder-blocks-typography@2.0.6

## 2.0.5

### Patch Changes

-   @khanacademy/wonder-blocks-layout@2.0.5
-   @khanacademy/wonder-blocks-modal@4.0.5
-   @khanacademy/wonder-blocks-typography@2.0.5

## 2.0.4

### Patch Changes

-   @khanacademy/wonder-blocks-layout@2.0.4
-   @khanacademy/wonder-blocks-modal@4.0.4
-   @khanacademy/wonder-blocks-typography@2.0.4

## 2.0.3

### Patch Changes

-   Updated dependencies [b281e2eb]
    -   @khanacademy/wonder-blocks-core@5.0.3
    -   @khanacademy/wonder-blocks-layout@2.0.3
    -   @khanacademy/wonder-blocks-modal@4.0.3
    -   @khanacademy/wonder-blocks-typography@2.0.3

## 2.0.2

### Patch Changes

-   Updated dependencies [21ce20c7]
    -   @khanacademy/wonder-blocks-core@5.0.2
    -   @khanacademy/wonder-blocks-layout@2.0.2
    -   @khanacademy/wonder-blocks-modal@4.0.2
    -   @khanacademy/wonder-blocks-typography@2.0.2

## 2.0.1

### Patch Changes

-   ccb6fe00: Miscellaneous TS type fixes
-   d4c2b18c: Fix a variety of issues with Flow types generated by flowgen
-   Updated dependencies [ccb6fe00]
-   Updated dependencies [d4c2b18c]
    -   @khanacademy/wonder-blocks-core@5.0.1
    -   @khanacademy/wonder-blocks-layout@2.0.1
    -   @khanacademy/wonder-blocks-modal@4.0.1
    -   @khanacademy/wonder-blocks-typography@2.0.1
    -   @khanacademy/wonder-blocks-color@2.0.1
    -   @khanacademy/wonder-blocks-spacing@4.0.1

## 2.0.0

### Major Changes

-   1ca4d7e3: Fix minor issue with generate Flow types (this is a major bump b/c I forgot to do one after doing the TS conversion)

### Patch Changes

-   Updated dependencies [1ca4d7e3]
    -   @khanacademy/wonder-blocks-color@2.0.0
    -   @khanacademy/wonder-blocks-core@5.0.0
    -   @khanacademy/wonder-blocks-layout@2.0.0
    -   @khanacademy/wonder-blocks-modal@4.0.0
    -   @khanacademy/wonder-blocks-spacing@4.0.0
    -   @khanacademy/wonder-blocks-typography@2.0.0

## 1.4.9

### Patch Changes

-   b5ba5568: Ensure that flow lib defs use React.ElementConfig<> isntead of JSX.LibraryManagedAttributes<>
-   Updated dependencies [b5ba5568]
    -   @khanacademy/wonder-blocks-color@1.2.3
    -   @khanacademy/wonder-blocks-core@4.9.1
    -   @khanacademy/wonder-blocks-layout@1.4.19
    -   @khanacademy/wonder-blocks-modal@3.0.10
    -   @khanacademy/wonder-blocks-spacing@3.0.7
    -   @khanacademy/wonder-blocks-typography@1.1.41

## 1.4.8

### Patch Changes

-   Updated dependencies [779b031d]
    -   @khanacademy/wonder-blocks-core@4.9.0
    -   @khanacademy/wonder-blocks-layout@1.4.18
    -   @khanacademy/wonder-blocks-modal@3.0.9
    -   @khanacademy/wonder-blocks-typography@1.1.40

## 1.4.7

### Patch Changes

-   d816af08: Update build and test configs use TypeScript
-   3891f544: Update babel config to include plugins that Storybook needed
-   0d28bb1c: Configured TypeScript
-   3d05f764: Fix HOCs and other type errors
-   c2ec4902: Update eslint configuration, fix lint
-   2983c05b: Include 'types' field in package.json
-   77ff6a66: Generate Flow types from TypeScript types
-   873f4a14: Tweak 'Offset' type to use React.CSSProperties
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
    -   @khanacademy/wonder-blocks-layout@1.4.17
    -   @khanacademy/wonder-blocks-modal@3.0.8
    -   @khanacademy/wonder-blocks-spacing@3.0.6
    -   @khanacademy/wonder-blocks-typography@1.1.39

## 1.4.6

### Patch Changes

-   91cb727c: Remove file extensions from imports
-   Updated dependencies [91cb727c]
-   Updated dependencies [91cb727c]
-   Updated dependencies [91cb727c]
    -   @khanacademy/wonder-blocks-color@1.2.1
    -   @khanacademy/wonder-blocks-core@4.7.0
    -   @khanacademy/wonder-blocks-layout@1.4.16
    -   @khanacademy/wonder-blocks-modal@3.0.7
    -   @khanacademy/wonder-blocks-typography@1.1.38

## 1.4.5

### Patch Changes

-   @khanacademy/wonder-blocks-modal@3.0.6

## 1.4.4

### Patch Changes

-   Updated dependencies [496119f2]
    -   @khanacademy/wonder-blocks-core@4.6.2
    -   @khanacademy/wonder-blocks-modal@3.0.5
    -   @khanacademy/wonder-blocks-layout@1.4.15
    -   @khanacademy/wonder-blocks-typography@1.1.37

## 1.4.3

### Patch Changes

-   @khanacademy/wonder-blocks-core@4.6.1
-   @khanacademy/wonder-blocks-layout@1.4.14
-   @khanacademy/wonder-blocks-modal@3.0.4
-   @khanacademy/wonder-blocks-typography@1.1.36

## 1.4.2

### Patch Changes

-   5712eb36: Remove an unused function in TooltipTail: `_minDistanceFromCorners`
-   Updated dependencies [b561425a]
-   Updated dependencies [a566e232]
-   Updated dependencies [d2b21a6e]
    -   @khanacademy/wonder-blocks-core@4.6.0
    -   @khanacademy/wonder-blocks-layout@1.4.13
    -   @khanacademy/wonder-blocks-modal@3.0.3
    -   @khanacademy/wonder-blocks-typography@1.1.35

## 1.4.1

### Patch Changes

-   @khanacademy/wonder-blocks-modal@3.0.2

## 1.4.0

### Minor Changes

-   b784d7a8: Allow Tooltip to be open/closed by its parent (controlled)

## 1.3.23

### Patch Changes

-   @khanacademy/wonder-blocks-modal@3.0.1

## 1.3.22

### Patch Changes

-   Updated dependencies [13cdc7fe]
    -   @khanacademy/wonder-blocks-modal@3.0.0

## 1.3.21

### Patch Changes

-   Updated dependencies [f3bcc1a9]
    -   @khanacademy/wonder-blocks-modal@2.3.11

## 1.3.20

### Patch Changes

-   Updated dependencies [175a2dd2]
    -   @khanacademy/wonder-blocks-core@4.5.0
    -   @khanacademy/wonder-blocks-layout@1.4.12
    -   @khanacademy/wonder-blocks-modal@2.3.10
    -   @khanacademy/wonder-blocks-typography@1.1.34

## 1.3.19

### Patch Changes

-   @khanacademy/wonder-blocks-modal@2.3.9

## 1.3.18

### Patch Changes

-   @khanacademy/wonder-blocks-modal@2.3.8

## 1.3.17

### Patch Changes

-   Updated dependencies [6ee20af9]
    -   @khanacademy/wonder-blocks-core@4.4.0
    -   @khanacademy/wonder-blocks-layout@1.4.11
    -   @khanacademy/wonder-blocks-modal@2.3.7
    -   @khanacademy/wonder-blocks-typography@1.1.33

## 1.3.16

### Patch Changes

-   e9364406: hide tooltip-tail from screen readers
-   Updated dependencies [2546b126]
    -   @khanacademy/wonder-blocks-modal@2.3.6

## 1.3.15

### Patch Changes

-   Updated dependencies [34c7aacb]
    -   @khanacademy/wonder-blocks-color@1.2.0
    -   @khanacademy/wonder-blocks-modal@2.3.5

## 1.3.14

### Patch Changes

-   @khanacademy/wonder-blocks-modal@2.3.4

## 1.3.13

### Patch Changes

-   @khanacademy/wonder-blocks-modal@2.3.3

## 1.3.12

### Patch Changes

-   Updated dependencies [5f4a4297]
-   Updated dependencies [2b96fd59]
    -   @khanacademy/wonder-blocks-core@4.3.2
    -   @khanacademy/wonder-blocks-layout@1.4.10
    -   @khanacademy/wonder-blocks-modal@2.3.2
    -   @khanacademy/wonder-blocks-typography@1.1.32

## 1.3.11

### Patch Changes

-   @khanacademy/wonder-blocks-core@4.3.1
-   @khanacademy/wonder-blocks-layout@1.4.9
-   @khanacademy/wonder-blocks-modal@2.3.1
-   @khanacademy/wonder-blocks-typography@1.1.31

## 1.3.10

### Patch Changes

-   Updated dependencies [7eaf74bd]
    -   @khanacademy/wonder-blocks-modal@2.3.0

## 1.3.9

### Patch Changes

-   Updated dependencies [246a921d]
    -   @khanacademy/wonder-blocks-core@4.3.0
    -   @khanacademy/wonder-blocks-layout@1.4.8
    -   @khanacademy/wonder-blocks-modal@2.2.3
    -   @khanacademy/wonder-blocks-typography@1.1.30

## 1.3.8

### Patch Changes

-   @khanacademy/wonder-blocks-modal@2.2.2

## 1.3.7

### Patch Changes

-   @khanacademy/wonder-blocks-core@4.2.1
-   @khanacademy/wonder-blocks-layout@1.4.7
-   @khanacademy/wonder-blocks-modal@2.2.1
-   @khanacademy/wonder-blocks-typography@1.1.29

## 1.3.6

### Patch Changes

-   Updated dependencies [e7bbf149]
    -   @khanacademy/wonder-blocks-modal@2.2.0
