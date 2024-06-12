# @khanacademy/wonder-blocks-dropdown

## 5.3.6

### Patch Changes

-   cc2d8e86: - Update styling for variants of `SingleSelect` and `MultiSelect`. This addresses some styling edge cases around error/disabled states, focus/hover/active states, and light mode. The `not-allowed` cursor is also applied to the disabled state.
    -   Styling in the `SelectOpener` (`SingleSelect` and `MultiSelect`) is now applied using css pseudo-classes (`:focus-visible`, `:hover`, `:active`) instead of applying styles using js.
    -   Replaced internal use of `ClickableBehaviour` in `SelectOpener` for normalized keyboard interaction behaviour across browsers.
-   13f49f85: Allow `SingleSelect` and `MultiSelect` to be focusable when disabled. These components now have `aria-disabled` when the `disabled` prop is `true`. This makes it so screenreaders will continue to communicate that the component is disabled, while allowing focus on the disabled component. Focus styling is also added to the disabled state.
-   Updated dependencies [47a758b6]
    -   @khanacademy/wonder-blocks-layout@2.1.0
    -   @khanacademy/wonder-blocks-cell@3.3.7
    -   @khanacademy/wonder-blocks-modal@5.1.4
    -   @khanacademy/wonder-blocks-search-field@2.2.15

## 5.3.5

### Patch Changes

-   Updated dependencies [01fce89e]
    -   @khanacademy/wonder-blocks-search-field@2.2.14

## 5.3.4

### Patch Changes

-   @khanacademy/wonder-blocks-search-field@2.2.13

## 5.3.3

### Patch Changes

-   c3a8fa80: Prevent dropdown item focus when enableTypeAhead is false

## 5.3.2

### Patch Changes

-   @khanacademy/wonder-blocks-search-field@2.2.12

## 5.3.1

### Patch Changes

-   Updated dependencies [5dfac06e]
    -   @khanacademy/wonder-blocks-core@6.4.1
    -   @khanacademy/wonder-blocks-cell@3.3.6
    -   @khanacademy/wonder-blocks-clickable@4.2.2
    -   @khanacademy/wonder-blocks-icon@4.1.1
    -   @khanacademy/wonder-blocks-layout@2.0.33
    -   @khanacademy/wonder-blocks-modal@5.1.3
    -   @khanacademy/wonder-blocks-search-field@2.2.11
    -   @khanacademy/wonder-blocks-typography@2.1.12

## 5.3.0

### Minor Changes

-   7030948a: Add `Listbox` component with Single and Multiple selection support

### Patch Changes

-   Updated dependencies [f72f7dd4]
    -   @khanacademy/wonder-blocks-timing@5.0.0
    -   @khanacademy/wonder-blocks-modal@5.1.2

## 5.2.1

### Patch Changes

-   Updated dependencies [9bfeead9]
    -   @khanacademy/wonder-blocks-tokens@1.3.0
    -   @khanacademy/wonder-blocks-cell@3.3.5
    -   @khanacademy/wonder-blocks-clickable@4.2.1
    -   @khanacademy/wonder-blocks-layout@2.0.32
    -   @khanacademy/wonder-blocks-modal@5.1.1
    -   @khanacademy/wonder-blocks-search-field@2.2.10

## 5.2.0

### Minor Changes

-   58075352: Change testId to render the default Testing Library HTML attribute: data-testid (was data-test-id)

### Patch Changes

-   Updated dependencies [58075352]
    -   @khanacademy/wonder-blocks-clickable@4.2.0
    -   @khanacademy/wonder-blocks-modal@5.1.0
    -   @khanacademy/wonder-blocks-core@6.4.0
    -   @khanacademy/wonder-blocks-icon@4.1.0
    -   @khanacademy/wonder-blocks-search-field@2.2.9
    -   @khanacademy/wonder-blocks-cell@3.3.4
    -   @khanacademy/wonder-blocks-layout@2.0.31
    -   @khanacademy/wonder-blocks-typography@2.1.11

## 5.1.11

### Patch Changes

-   Updated dependencies [1b741a83]
    -   @khanacademy/wonder-blocks-modal@5.0.0
    -   @khanacademy/wonder-blocks-search-field@2.2.8

## 5.1.10

### Patch Changes

-   874081aa: Remove wonder-blocks-color dependency in favor of wonder-blocks-tokens
-   Updated dependencies [874081aa]
-   Updated dependencies [874081aa]
-   Updated dependencies [a9bf603a]
    -   @khanacademy/wonder-blocks-tokens@1.2.0
    -   @khanacademy/wonder-blocks-modal@4.2.8
    -   @khanacademy/wonder-blocks-cell@3.3.3
    -   @khanacademy/wonder-blocks-clickable@4.1.3
    -   @khanacademy/wonder-blocks-layout@2.0.30
    -   @khanacademy/wonder-blocks-search-field@2.2.7

## 5.1.9

### Patch Changes

-   Updated dependencies [c39bfd29]
    -   @khanacademy/wonder-blocks-layout@2.0.29
    -   @khanacademy/wonder-blocks-cell@3.3.2
    -   @khanacademy/wonder-blocks-modal@4.2.7
    -   @khanacademy/wonder-blocks-search-field@2.2.6

## 5.1.8

### Patch Changes

-   Updated dependencies [e6433bee]
    -   @khanacademy/wonder-blocks-clickable@4.1.2
    -   @khanacademy/wonder-blocks-cell@3.3.1
    -   @khanacademy/wonder-blocks-search-field@2.2.5
    -   @khanacademy/wonder-blocks-modal@4.2.6

## 5.1.7

### Patch Changes

-   aca7ad76: Don't select disabled items using the "Select all" shortcut
-   f0e82953: Fix an issue where OptionItem is not vertically centered
-   Updated dependencies [4cfb4977]
-   Updated dependencies [dbe7c753]
    -   @khanacademy/wonder-blocks-tokens@1.1.0
    -   @khanacademy/wonder-blocks-cell@3.3.0
    -   @khanacademy/wonder-blocks-clickable@4.1.1
    -   @khanacademy/wonder-blocks-layout@2.0.28
    -   @khanacademy/wonder-blocks-modal@4.2.5
    -   @khanacademy/wonder-blocks-search-field@2.2.4

## 5.1.6

### Patch Changes

-   Updated dependencies [60fdac1c]
    -   @khanacademy/wonder-blocks-clickable@4.1.0
    -   @khanacademy/wonder-blocks-cell@3.2.3
    -   @khanacademy/wonder-blocks-search-field@2.2.3
    -   @khanacademy/wonder-blocks-modal@4.2.4

## 5.1.5

### Patch Changes

-   Updated dependencies [e83f8991]
    -   @khanacademy/wonder-blocks-tokens@1.0.0
    -   @khanacademy/wonder-blocks-cell@3.2.2
    -   @khanacademy/wonder-blocks-clickable@4.0.14
    -   @khanacademy/wonder-blocks-layout@2.0.27
    -   @khanacademy/wonder-blocks-modal@4.2.3
    -   @khanacademy/wonder-blocks-search-field@2.2.2

## 5.1.4

### Patch Changes

-   60aba5b8: Update internal spacing references (from wb-spacing to wb-tokens)
-   7cd7f6cc: Replace theming.tokens with wb-tokens and update callsites to use the new export
-   7c51f377: Migrate wb-color imports to use tokens.color
-   Updated dependencies [60aba5b8]
-   Updated dependencies [7cd7f6cc]
-   Updated dependencies [7c51f377]
-   Updated dependencies [7cd7f6cc]
-   Updated dependencies [7c51f377]
    -   @khanacademy/wonder-blocks-search-field@2.2.1
    -   @khanacademy/wonder-blocks-layout@2.0.26
    -   @khanacademy/wonder-blocks-modal@4.2.2
    -   @khanacademy/wonder-blocks-cell@3.2.1
    -   @khanacademy/wonder-blocks-tokens@0.2.0
    -   @khanacademy/wonder-blocks-clickable@4.0.13

## 5.1.3

### Patch Changes

-   Updated dependencies [0c329565]
    -   @khanacademy/wonder-blocks-search-field@2.2.0

## 5.1.2

### Patch Changes

-   Updated dependencies [80592e75]
    -   @khanacademy/wonder-blocks-theming@1.3.0
    -   @khanacademy/wonder-blocks-modal@4.2.1
    -   @khanacademy/wonder-blocks-search-field@2.1.27

## 5.1.1

### Patch Changes

-   0221ea14: Fix filter functionality (SingleSelect)

## 5.1.0

### Minor Changes

-   c01f6864: Add `opened` state to OpenerProps on Dropdown custom opener function.

## 5.0.2

### Patch Changes

-   0aaf4e6e: Fix focus state on custom openers
-   Updated dependencies [b7bae8f2]
-   Updated dependencies [09c61d25]
    -   @khanacademy/wonder-blocks-modal@4.2.0

## 5.0.1

### Patch Changes

-   5d34b4b4: Fix issue with empty option items
-   Updated dependencies [1b21747a]
    -   @khanacademy/wonder-blocks-modal@4.1.0

## 5.0.0

### Major Changes

-   56a896c6: Allow custom OptionItem elements (internally using cell components)

### Patch Changes

-   70e846cb: Allow changing the popper's height to accomodate for the viewport size
-   Updated dependencies [56a896c6]
-   Updated dependencies [23ab9f8c]
-   Updated dependencies [6df21f71]
    -   @khanacademy/wonder-blocks-cell@3.2.0
    -   @khanacademy/wonder-blocks-icon@4.0.1
    -   @khanacademy/wonder-blocks-core@6.3.1
    -   @khanacademy/wonder-blocks-search-field@2.1.26
    -   @khanacademy/wonder-blocks-clickable@4.0.12
    -   @khanacademy/wonder-blocks-layout@2.0.25
    -   @khanacademy/wonder-blocks-modal@4.0.39
    -   @khanacademy/wonder-blocks-typography@2.1.10

## 4.0.0

### Major Changes

-   860d9ef9: Allow custom `ActionItem` components by using Cell internally.

    -   Removed `ClickableBehavior` from `ActionItem` and replaced it with
        `CompactCell` (which internally uses `Clickable`).
    -   Removed `skipClientNav` from `ActionItem` as it is no longer used/needed.

### Patch Changes

-   Updated dependencies [860d9ef9]
    -   @khanacademy/wonder-blocks-cell@3.1.0
    -   @khanacademy/wonder-blocks-modal@4.0.38
    -   @khanacademy/wonder-blocks-search-field@2.1.25

## 3.1.10

### Patch Changes

-   Updated dependencies [171e3b01]
    -   @khanacademy/wonder-blocks-icon@4.0.0
    -   @khanacademy/wonder-blocks-search-field@2.1.24
    -   @khanacademy/wonder-blocks-modal@4.0.37

## 3.1.9

### Patch Changes

-   Updated dependencies [96f675d2]
    -   @khanacademy/wonder-blocks-icon@3.0.0
    -   @khanacademy/wonder-blocks-search-field@2.1.23
    -   @khanacademy/wonder-blocks-modal@4.0.36

## 3.1.8

### Patch Changes

-   Updated dependencies [edcfbe14]
    -   @khanacademy/wonder-blocks-theming@1.2.1
    -   @khanacademy/wonder-blocks-modal@4.0.35
    -   @khanacademy/wonder-blocks-search-field@2.1.22

## 3.1.7

### Patch Changes

-   Updated dependencies [6b8bf8d5]
    -   @khanacademy/wonder-blocks-clickable@4.0.11
    -   @khanacademy/wonder-blocks-search-field@2.1.21
    -   @khanacademy/wonder-blocks-modal@4.0.34

## 3.1.6

### Patch Changes

-   af26c590: Add PhosphorIcon support to Dropdown
-   Updated dependencies [7b24db93]
-   Updated dependencies [c8e9ce34]
    -   @khanacademy/wonder-blocks-clickable@4.0.10
    -   @khanacademy/wonder-blocks-search-field@2.1.20
    -   @khanacademy/wonder-blocks-modal@4.0.33

## 3.1.5

### Patch Changes

-   Updated dependencies [3f854fe8]
    -   @khanacademy/wonder-blocks-theming@1.2.0
    -   @khanacademy/wonder-blocks-modal@4.0.32
    -   @khanacademy/wonder-blocks-search-field@2.1.19

## 3.1.4

### Patch Changes

-   Updated dependencies [7055ca94]
    -   @khanacademy/wonder-blocks-core@6.3.0
    -   @khanacademy/wonder-blocks-clickable@4.0.9
    -   @khanacademy/wonder-blocks-icon@2.2.1
    -   @khanacademy/wonder-blocks-layout@2.0.24
    -   @khanacademy/wonder-blocks-modal@4.0.31
    -   @khanacademy/wonder-blocks-search-field@2.1.18
    -   @khanacademy/wonder-blocks-typography@2.1.9

## 3.1.3

### Patch Changes

-   Updated dependencies [b6fbd635]
-   Updated dependencies [cc6b1950]
    -   @khanacademy/wonder-blocks-layout@2.0.23
    -   @khanacademy/wonder-blocks-search-field@2.1.17
    -   @khanacademy/wonder-blocks-modal@4.0.30

## 3.1.2

### Patch Changes

-   Updated dependencies [ea0e7c02]
    -   @khanacademy/wonder-blocks-icon@2.2.0
    -   @khanacademy/wonder-blocks-modal@4.0.29
    -   @khanacademy/wonder-blocks-search-field@2.1.16

## 3.1.1

### Patch Changes

-   Updated dependencies [48d3c7e9]
    -   @khanacademy/wonder-blocks-color@3.0.0
    -   @khanacademy/wonder-blocks-clickable@4.0.8
    -   @khanacademy/wonder-blocks-modal@4.0.28
    -   @khanacademy/wonder-blocks-search-field@2.1.15
    -   @khanacademy/wonder-blocks-theming@1.1.1

## 3.1.0

### Minor Changes

-   d1a5796a: Added error prop

## 3.0.29

### Patch Changes

-   Updated dependencies [80cab317]
    -   @khanacademy/wonder-blocks-clickable@4.0.7
    -   @khanacademy/wonder-blocks-modal@4.0.27
    -   @khanacademy/wonder-blocks-search-field@2.1.14

## 3.0.28

### Patch Changes

-   Updated dependencies [695f2567]
    -   @khanacademy/wonder-blocks-timing@4.0.2
    -   @khanacademy/wonder-blocks-modal@4.0.26

## 3.0.27

### Patch Changes

-   Updated dependencies [4b97b9a2]
    -   @khanacademy/wonder-blocks-core@6.2.0
    -   @khanacademy/wonder-blocks-clickable@4.0.6
    -   @khanacademy/wonder-blocks-icon@2.1.6
    -   @khanacademy/wonder-blocks-layout@2.0.22
    -   @khanacademy/wonder-blocks-modal@4.0.25
    -   @khanacademy/wonder-blocks-search-field@2.1.13
    -   @khanacademy/wonder-blocks-typography@2.1.8

## 3.0.26

### Patch Changes

-   Updated dependencies [2871f0a9]
    -   @khanacademy/wonder-blocks-core@6.1.1
    -   @khanacademy/wonder-blocks-clickable@4.0.5
    -   @khanacademy/wonder-blocks-icon@2.1.5
    -   @khanacademy/wonder-blocks-layout@2.0.21
    -   @khanacademy/wonder-blocks-modal@4.0.24
    -   @khanacademy/wonder-blocks-search-field@2.1.12
    -   @khanacademy/wonder-blocks-typography@2.1.7

## 3.0.25

### Patch Changes

-   Updated dependencies [efb59c29]
-   Updated dependencies [834855e5]
-   Updated dependencies [8bc40ed2]
    -   @khanacademy/wonder-blocks-core@6.1.0
    -   @khanacademy/wonder-blocks-clickable@4.0.4
    -   @khanacademy/wonder-blocks-icon@2.1.4
    -   @khanacademy/wonder-blocks-layout@2.0.20
    -   @khanacademy/wonder-blocks-modal@4.0.23
    -   @khanacademy/wonder-blocks-search-field@2.1.11
    -   @khanacademy/wonder-blocks-typography@2.1.6

## 3.0.24

### Patch Changes

-   Updated dependencies [f19da46e]
    -   @khanacademy/wonder-blocks-core@6.0.2
    -   @khanacademy/wonder-blocks-clickable@4.0.3
    -   @khanacademy/wonder-blocks-icon@2.1.3
    -   @khanacademy/wonder-blocks-layout@2.0.19
    -   @khanacademy/wonder-blocks-modal@4.0.22
    -   @khanacademy/wonder-blocks-search-field@2.1.10
    -   @khanacademy/wonder-blocks-typography@2.1.5

## 3.0.23

### Patch Changes

-   Updated dependencies [8dc4a5a3]
-   Updated dependencies [1920feb8]
    -   @khanacademy/wonder-blocks-clickable@4.0.2
    -   @khanacademy/wonder-blocks-core@6.0.1
    -   @khanacademy/wonder-blocks-icon@2.1.2
    -   @khanacademy/wonder-blocks-layout@2.0.18
    -   @khanacademy/wonder-blocks-modal@4.0.21
    -   @khanacademy/wonder-blocks-search-field@2.1.9
    -   @khanacademy/wonder-blocks-typography@2.1.4

## 3.0.22

### Patch Changes

-   Updated dependencies [f230b267]
    -   @khanacademy/wonder-blocks-clickable@4.0.1
    -   @khanacademy/wonder-blocks-search-field@2.1.8
    -   @khanacademy/wonder-blocks-modal@4.0.20

## 3.0.21

### Patch Changes

-   Updated dependencies [8c77f29d]
-   Updated dependencies [674a1e5c]
-   Updated dependencies [674a1e5c]
-   Updated dependencies [674a1e5c]
    -   @khanacademy/wonder-blocks-clickable@4.0.0
    -   @khanacademy/wonder-blocks-modal@4.0.19
    -   @khanacademy/wonder-blocks-core@6.0.0
    -   @khanacademy/wonder-blocks-icon@2.1.1
    -   @khanacademy/wonder-blocks-layout@2.0.17
    -   @khanacademy/wonder-blocks-search-field@2.1.7
    -   @khanacademy/wonder-blocks-typography@2.1.3

## 3.0.20

### Patch Changes

-   Updated dependencies [ec6a33a4]
-   Updated dependencies [1344436f]
    -   @khanacademy/wonder-blocks-icon@2.1.0
    -   @khanacademy/wonder-blocks-core@5.4.0
    -   @khanacademy/wonder-blocks-search-field@2.1.6
    -   @khanacademy/wonder-blocks-modal@4.0.18
    -   @khanacademy/wonder-blocks-clickable@3.1.3
    -   @khanacademy/wonder-blocks-layout@2.0.16
    -   @khanacademy/wonder-blocks-typography@2.1.2

## 3.0.19

### Patch Changes

-   Updated dependencies [9f3752d4]
    -   @khanacademy/wonder-blocks-typography@2.1.1
    -   @khanacademy/wonder-blocks-core@5.3.1
    -   @khanacademy/wonder-blocks-modal@4.0.17
    -   @khanacademy/wonder-blocks-search-field@2.1.5
    -   @khanacademy/wonder-blocks-clickable@3.1.2
    -   @khanacademy/wonder-blocks-icon@2.0.15
    -   @khanacademy/wonder-blocks-layout@2.0.15

## 3.0.18

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
    -   @khanacademy/wonder-blocks-search-field@2.1.4
    -   @khanacademy/wonder-blocks-modal@4.0.16
    -   @khanacademy/wonder-blocks-clickable@3.1.1
    -   @khanacademy/wonder-blocks-icon@2.0.14
    -   @khanacademy/wonder-blocks-layout@2.0.14

## 3.0.17

### Patch Changes

-   Updated dependencies [ad8beb23]
    -   @khanacademy/wonder-blocks-clickable@3.1.0
    -   @khanacademy/wonder-blocks-search-field@2.1.3
    -   @khanacademy/wonder-blocks-modal@4.0.15

## 3.0.16

### Patch Changes

-   Updated dependencies [d4c412b5]
    -   @khanacademy/wonder-blocks-core@5.2.3
    -   @khanacademy/wonder-blocks-clickable@3.0.13
    -   @khanacademy/wonder-blocks-icon@2.0.13
    -   @khanacademy/wonder-blocks-layout@2.0.13
    -   @khanacademy/wonder-blocks-modal@4.0.14
    -   @khanacademy/wonder-blocks-search-field@2.1.2
    -   @khanacademy/wonder-blocks-typography@2.0.13

## 3.0.15

### Patch Changes

-   Updated dependencies [64a188e3]
    -   @khanacademy/wonder-blocks-core@5.2.2
    -   @khanacademy/wonder-blocks-clickable@3.0.12
    -   @khanacademy/wonder-blocks-icon@2.0.12
    -   @khanacademy/wonder-blocks-layout@2.0.12
    -   @khanacademy/wonder-blocks-modal@4.0.13
    -   @khanacademy/wonder-blocks-search-field@2.1.1
    -   @khanacademy/wonder-blocks-typography@2.0.12

## 3.0.14

### Patch Changes

-   Updated dependencies [3f86013b]
    -   @khanacademy/wonder-blocks-search-field@2.1.0

## 3.0.13

### Patch Changes

-   df9a10aa: Update state and props to be readonly in components using getDerivedStateFromProps()
-   Updated dependencies [5a1ea891]
-   Updated dependencies [df9a10aa]
    -   @khanacademy/wonder-blocks-layout@2.0.11
    -   @khanacademy/wonder-blocks-modal@4.0.12
    -   @khanacademy/wonder-blocks-core@5.2.1
    -   @khanacademy/wonder-blocks-clickable@3.0.11
    -   @khanacademy/wonder-blocks-timing@4.0.1
    -   @khanacademy/wonder-blocks-icon@2.0.11
    -   @khanacademy/wonder-blocks-search-field@2.0.13
    -   @khanacademy/wonder-blocks-typography@2.0.11

## 3.0.12

### Patch Changes

-   @khanacademy/wonder-blocks-search-field@2.0.12

## 3.0.11

### Patch Changes

-   fa70c895: Remove all TypeScript error suppressions on JSX attributes
-   Updated dependencies [fa70c895]
-   Updated dependencies [19ab0408]
-   Updated dependencies [fa70c895]
    -   @khanacademy/wonder-blocks-core@5.2.0
    -   @khanacademy/wonder-blocks-modal@4.0.11
    -   @khanacademy/wonder-blocks-clickable@3.0.10
    -   @khanacademy/wonder-blocks-icon@2.0.10
    -   @khanacademy/wonder-blocks-layout@2.0.10
    -   @khanacademy/wonder-blocks-search-field@2.0.11
    -   @khanacademy/wonder-blocks-typography@2.0.10

## 3.0.10

### Patch Changes

-   Updated dependencies [0c2607e6]
    -   @khanacademy/wonder-blocks-timing@4.0.0
    -   @khanacademy/wonder-blocks-search-field@2.0.10
    -   @khanacademy/wonder-blocks-modal@4.0.10

## 3.0.9

### Patch Changes

-   a6164ed0: Don't use React.FC<> for functional components
-   Updated dependencies [3c400719]
-   Updated dependencies [a6164ed0]
    -   @khanacademy/wonder-blocks-core@5.1.0
    -   @khanacademy/wonder-blocks-modal@4.0.9
    -   @khanacademy/wonder-blocks-timing@3.0.3
    -   @khanacademy/wonder-blocks-search-field@2.0.9
    -   @khanacademy/wonder-blocks-clickable@3.0.9
    -   @khanacademy/wonder-blocks-icon@2.0.9
    -   @khanacademy/wonder-blocks-layout@2.0.9
    -   @khanacademy/wonder-blocks-typography@2.0.9

## 3.0.8

### Patch Changes

-   @khanacademy/wonder-blocks-clickable@3.0.8
-   @khanacademy/wonder-blocks-icon@2.0.8
-   @khanacademy/wonder-blocks-layout@2.0.8
-   @khanacademy/wonder-blocks-modal@4.0.8
-   @khanacademy/wonder-blocks-search-field@2.0.8
-   @khanacademy/wonder-blocks-typography@2.0.8

## 3.0.7

### Patch Changes

-   @khanacademy/wonder-blocks-clickable@3.0.7
-   @khanacademy/wonder-blocks-icon@2.0.7
-   @khanacademy/wonder-blocks-layout@2.0.7
-   @khanacademy/wonder-blocks-modal@4.0.7
-   @khanacademy/wonder-blocks-search-field@2.0.7
-   @khanacademy/wonder-blocks-typography@2.0.7

## 3.0.6

### Patch Changes

-   c20f48f3: Don't transpile classes when building bundles
-   Updated dependencies [c20f48f3]
    -   @khanacademy/wonder-blocks-clickable@3.0.6
    -   @khanacademy/wonder-blocks-core@5.0.4
    -   @khanacademy/wonder-blocks-icon@2.0.6
    -   @khanacademy/wonder-blocks-layout@2.0.6
    -   @khanacademy/wonder-blocks-modal@4.0.6
    -   @khanacademy/wonder-blocks-search-field@2.0.6
    -   @khanacademy/wonder-blocks-timing@3.0.2
    -   @khanacademy/wonder-blocks-typography@2.0.6

## 3.0.5

### Patch Changes

-   @khanacademy/wonder-blocks-clickable@3.0.5
-   @khanacademy/wonder-blocks-icon@2.0.5
-   @khanacademy/wonder-blocks-layout@2.0.5
-   @khanacademy/wonder-blocks-modal@4.0.5
-   @khanacademy/wonder-blocks-search-field@2.0.5
-   @khanacademy/wonder-blocks-typography@2.0.5

## 3.0.4

### Patch Changes

-   @khanacademy/wonder-blocks-clickable@3.0.4
-   @khanacademy/wonder-blocks-icon@2.0.4
-   @khanacademy/wonder-blocks-layout@2.0.4
-   @khanacademy/wonder-blocks-modal@4.0.4
-   @khanacademy/wonder-blocks-search-field@2.0.4
-   @khanacademy/wonder-blocks-typography@2.0.4

## 3.0.3

### Patch Changes

-   Updated dependencies [b281e2eb]
    -   @khanacademy/wonder-blocks-core@5.0.3
    -   @khanacademy/wonder-blocks-clickable@3.0.3
    -   @khanacademy/wonder-blocks-icon@2.0.3
    -   @khanacademy/wonder-blocks-layout@2.0.3
    -   @khanacademy/wonder-blocks-modal@4.0.3
    -   @khanacademy/wonder-blocks-search-field@2.0.3
    -   @khanacademy/wonder-blocks-typography@2.0.3

## 3.0.2

### Patch Changes

-   Updated dependencies [21ce20c7]
    -   @khanacademy/wonder-blocks-core@5.0.2
    -   @khanacademy/wonder-blocks-clickable@3.0.2
    -   @khanacademy/wonder-blocks-icon@2.0.2
    -   @khanacademy/wonder-blocks-layout@2.0.2
    -   @khanacademy/wonder-blocks-modal@4.0.2
    -   @khanacademy/wonder-blocks-search-field@2.0.2
    -   @khanacademy/wonder-blocks-typography@2.0.2

## 3.0.1

### Patch Changes

-   ccb6fe00: Miscellaneous TS type fixes
-   d4c2b18c: Fix a variety of issues with Flow types generated by flowgen
-   Updated dependencies [ccb6fe00]
-   Updated dependencies [d4c2b18c]
    -   @khanacademy/wonder-blocks-clickable@3.0.1
    -   @khanacademy/wonder-blocks-core@5.0.1
    -   @khanacademy/wonder-blocks-icon@2.0.1
    -   @khanacademy/wonder-blocks-layout@2.0.1
    -   @khanacademy/wonder-blocks-modal@4.0.1
    -   @khanacademy/wonder-blocks-timing@3.0.1
    -   @khanacademy/wonder-blocks-typography@2.0.1
    -   @khanacademy/wonder-blocks-color@2.0.1
    -   @khanacademy/wonder-blocks-search-field@2.0.1
    -   @khanacademy/wonder-blocks-spacing@4.0.1

## 3.0.0

### Major Changes

-   1ca4d7e3: Fix minor issue with generate Flow types (this is a major bump b/c I forgot to do one after doing the TS conversion)

### Patch Changes

-   Updated dependencies [ef661acf]
-   Updated dependencies [1ca4d7e3]
    -   @khanacademy/wonder-blocks-timing@3.0.0
    -   @khanacademy/wonder-blocks-clickable@3.0.0
    -   @khanacademy/wonder-blocks-color@2.0.0
    -   @khanacademy/wonder-blocks-core@5.0.0
    -   @khanacademy/wonder-blocks-icon@2.0.0
    -   @khanacademy/wonder-blocks-layout@2.0.0
    -   @khanacademy/wonder-blocks-modal@4.0.0
    -   @khanacademy/wonder-blocks-search-field@2.0.0
    -   @khanacademy/wonder-blocks-spacing@4.0.0
    -   @khanacademy/wonder-blocks-typography@2.0.0

## 2.10.10

### Patch Changes

-   b5ba5568: Ensure that flow lib defs use React.ElementConfig<> isntead of JSX.LibraryManagedAttributes<>
-   Updated dependencies [b5ba5568]
    -   @khanacademy/wonder-blocks-clickable@2.4.8
    -   @khanacademy/wonder-blocks-color@1.2.3
    -   @khanacademy/wonder-blocks-core@4.9.1
    -   @khanacademy/wonder-blocks-icon@1.2.40
    -   @khanacademy/wonder-blocks-layout@1.4.19
    -   @khanacademy/wonder-blocks-modal@3.0.10
    -   @khanacademy/wonder-blocks-search-field@1.0.22
    -   @khanacademy/wonder-blocks-spacing@3.0.7
    -   @khanacademy/wonder-blocks-timing@2.1.3
    -   @khanacademy/wonder-blocks-typography@1.1.41

## 2.10.9

### Patch Changes

-   Updated dependencies [779b031d]
    -   @khanacademy/wonder-blocks-core@4.9.0
    -   @khanacademy/wonder-blocks-clickable@2.4.7
    -   @khanacademy/wonder-blocks-icon@1.2.39
    -   @khanacademy/wonder-blocks-layout@1.4.18
    -   @khanacademy/wonder-blocks-modal@3.0.9
    -   @khanacademy/wonder-blocks-search-field@1.0.21
    -   @khanacademy/wonder-blocks-typography@1.1.40

## 2.10.8

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
-   Updated dependencies [3813715d]
-   Updated dependencies [0d28bb1c]
-   Updated dependencies [873f4a14]
-   Updated dependencies [3d05f764]
-   Updated dependencies [c2ec4902]
-   Updated dependencies [2983c05b]
-   Updated dependencies [77ff6a66]
-   Updated dependencies [ec8d4b7f]
    -   @khanacademy/wonder-blocks-clickable@2.4.6
    -   @khanacademy/wonder-blocks-color@1.2.2
    -   @khanacademy/wonder-blocks-core@4.8.0
    -   @khanacademy/wonder-blocks-icon@1.2.38
    -   @khanacademy/wonder-blocks-layout@1.4.17
    -   @khanacademy/wonder-blocks-modal@3.0.8
    -   @khanacademy/wonder-blocks-search-field@1.0.20
    -   @khanacademy/wonder-blocks-spacing@3.0.6
    -   @khanacademy/wonder-blocks-timing@2.1.2
    -   @khanacademy/wonder-blocks-typography@1.1.39

## 2.10.7

### Patch Changes

-   91cb727c: Remove file extensions from imports
-   Updated dependencies [91cb727c]
-   Updated dependencies [91cb727c]
-   Updated dependencies [91cb727c]
-   Updated dependencies [91cb727c]
    -   @khanacademy/wonder-blocks-icon@1.2.37
    -   @khanacademy/wonder-blocks-clickable@2.4.5
    -   @khanacademy/wonder-blocks-color@1.2.1
    -   @khanacademy/wonder-blocks-core@4.7.0
    -   @khanacademy/wonder-blocks-layout@1.4.16
    -   @khanacademy/wonder-blocks-modal@3.0.7
    -   @khanacademy/wonder-blocks-search-field@1.0.19
    -   @khanacademy/wonder-blocks-timing@2.1.1
    -   @khanacademy/wonder-blocks-typography@1.1.38

## 2.10.6

### Patch Changes

-   Updated dependencies [1a5624d4]
    -   @khanacademy/wonder-blocks-icon@1.2.36
    -   @khanacademy/wonder-blocks-modal@3.0.6
    -   @khanacademy/wonder-blocks-search-field@1.0.18

## 2.10.5

### Patch Changes

-   Updated dependencies [496119f2]
    -   @khanacademy/wonder-blocks-clickable@2.4.4
    -   @khanacademy/wonder-blocks-core@4.6.2
    -   @khanacademy/wonder-blocks-modal@3.0.5
    -   @khanacademy/wonder-blocks-search-field@1.0.17
    -   @khanacademy/wonder-blocks-icon@1.2.35
    -   @khanacademy/wonder-blocks-layout@1.4.15
    -   @khanacademy/wonder-blocks-typography@1.1.37

## 2.10.4

### Patch Changes

-   @khanacademy/wonder-blocks-clickable@2.4.3
-   @khanacademy/wonder-blocks-core@4.6.1
-   @khanacademy/wonder-blocks-icon@1.2.34
-   @khanacademy/wonder-blocks-layout@1.4.14
-   @khanacademy/wonder-blocks-modal@3.0.4
-   @khanacademy/wonder-blocks-search-field@1.0.16
-   @khanacademy/wonder-blocks-typography@1.1.36

## 2.10.3

### Patch Changes

-   Updated dependencies [b561425a]
-   Updated dependencies [a566e232]
-   Updated dependencies [d2b21a6e]
    -   @khanacademy/wonder-blocks-core@4.6.0
    -   @khanacademy/wonder-blocks-clickable@2.4.2
    -   @khanacademy/wonder-blocks-icon@1.2.33
    -   @khanacademy/wonder-blocks-layout@1.4.13
    -   @khanacademy/wonder-blocks-modal@3.0.3
    -   @khanacademy/wonder-blocks-search-field@1.0.15
    -   @khanacademy/wonder-blocks-typography@1.1.35

## 2.10.2

### Patch Changes

-   Updated dependencies [4c682709]
    -   @khanacademy/wonder-blocks-clickable@2.4.1
    -   @khanacademy/wonder-blocks-modal@3.0.2
    -   @khanacademy/wonder-blocks-search-field@1.0.14

## 2.10.1

### Patch Changes

-   29d57cdc: Fixes bug where going from empty to filled shifts the dropdown box’s position when inline with text

## 2.10.0

### Minor Changes

-   0e773ce6: Add `autoFocus` and `enableTypeAhead` props to improve keyboard navigation with the `SingleSelect` component

## 2.9.5

### Patch Changes

-   ceb111df: ClickableBehavior no longer has tabIndex 0 by default. It must be passed in.
-   Updated dependencies [ceb111df]
    -   @khanacademy/wonder-blocks-clickable@2.4.0
    -   @khanacademy/wonder-blocks-modal@3.0.1
    -   @khanacademy/wonder-blocks-search-field@1.0.13

## 2.9.4

### Patch Changes

-   Updated dependencies [13cdc7fe]
    -   @khanacademy/wonder-blocks-modal@3.0.0

## 2.9.3

### Patch Changes

-   Updated dependencies [f3bcc1a9]
    -   @khanacademy/wonder-blocks-modal@2.3.11

## 2.9.2

### Patch Changes

-   Updated dependencies [175a2dd2]
    -   @khanacademy/wonder-blocks-core@4.5.0
    -   @khanacademy/wonder-blocks-clickable@2.3.3
    -   @khanacademy/wonder-blocks-icon@1.2.32
    -   @khanacademy/wonder-blocks-layout@1.4.12
    -   @khanacademy/wonder-blocks-modal@2.3.10
    -   @khanacademy/wonder-blocks-search-field@1.0.12
    -   @khanacademy/wonder-blocks-typography@1.1.34

## 2.9.1

### Patch Changes

-   Updated dependencies [5b8ba5da]
    -   @khanacademy/wonder-blocks-clickable@2.3.2
    -   @khanacademy/wonder-blocks-modal@2.3.9
    -   @khanacademy/wonder-blocks-search-field@1.0.11

## 2.9.0

### Minor Changes

-   3bae2aba: Added `labels` prop to be able to translate some internal texts (already supported by MultiSelect)

### Patch Changes

-   Updated dependencies [3bae2aba]
    -   @khanacademy/wonder-blocks-icon@1.2.31
    -   @khanacademy/wonder-blocks-modal@2.3.8
    -   @khanacademy/wonder-blocks-search-field@1.0.10

## 2.8.3

### Patch Changes

-   Updated dependencies [6ee20af9]
    -   @khanacademy/wonder-blocks-core@4.4.0
    -   @khanacademy/wonder-blocks-button@3.0.3
    -   @khanacademy/wonder-blocks-clickable@2.3.1
    -   @khanacademy/wonder-blocks-icon@1.2.30
    -   @khanacademy/wonder-blocks-icon-button@3.4.11
    -   @khanacademy/wonder-blocks-layout@1.4.11
    -   @khanacademy/wonder-blocks-modal@2.3.7
    -   @khanacademy/wonder-blocks-search-field@1.0.9
    -   @khanacademy/wonder-blocks-typography@1.1.33

## 2.8.2

### Patch Changes

-   Updated dependencies [2546b126]
    -   @khanacademy/wonder-blocks-modal@2.3.6

## 2.8.1

### Patch Changes

-   Updated dependencies [34c7aacb]
    -   @khanacademy/wonder-blocks-color@1.2.0
    -   @khanacademy/wonder-blocks-button@3.0.2
    -   @khanacademy/wonder-blocks-icon-button@3.4.10
    -   @khanacademy/wonder-blocks-modal@2.3.5
    -   @khanacademy/wonder-blocks-search-field@1.0.8

## 2.8.0

### Minor Changes

-   ee6fc773: Added keyboard support to search items when the dropdown is focused, included "Enter" as a key to trigger actions with the "option" role

### Patch Changes

-   Updated dependencies [ee6fc773]
    -   @khanacademy/wonder-blocks-clickable@2.3.0
    -   @khanacademy/wonder-blocks-button@3.0.1
    -   @khanacademy/wonder-blocks-icon-button@3.4.9
    -   @khanacademy/wonder-blocks-modal@2.3.4
    -   @khanacademy/wonder-blocks-search-field@1.0.7

## 2.7.6

### Patch Changes

-   3007ecd7: Move the search field out of the listbox container

## 2.7.5

### Patch Changes

-   Updated dependencies [85c31780]
    -   @khanacademy/wonder-blocks-button@3.0.0

## 2.7.4

### Patch Changes

-   Updated dependencies [83486dba]
    -   @khanacademy/wonder-blocks-icon@1.2.29
    -   @khanacademy/wonder-blocks-button@2.11.7
    -   @khanacademy/wonder-blocks-icon-button@3.4.8
    -   @khanacademy/wonder-blocks-modal@2.3.3
    -   @khanacademy/wonder-blocks-search-field@1.0.6

## 2.7.3

### Patch Changes

-   d0a76cf5: Add live region to announce the number of options (fixing an iOS issue)

## 2.7.2

### Patch Changes

-   Updated dependencies [5f4a4297]
-   Updated dependencies [2b96fd59]
    -   @khanacademy/wonder-blocks-core@4.3.2
    -   @khanacademy/wonder-blocks-button@2.11.6
    -   @khanacademy/wonder-blocks-clickable@2.2.7
    -   @khanacademy/wonder-blocks-icon@1.2.28
    -   @khanacademy/wonder-blocks-icon-button@3.4.7
    -   @khanacademy/wonder-blocks-layout@1.4.10
    -   @khanacademy/wonder-blocks-modal@2.3.2
    -   @khanacademy/wonder-blocks-search-field@1.0.5
    -   @khanacademy/wonder-blocks-typography@1.1.32

## 2.7.1

### Patch Changes

-   9c2580e6: Fixed the search field focus bug in dropdowns

## 2.7.0

### Minor Changes

-   b3960766: Replaced core elements with Wonder Blocks SearchField (added dependency to SearchField)

### Patch Changes

-   Updated dependencies [b3960766]
    -   @khanacademy/wonder-blocks-search-field@1.0.4

## 2.6.10

### Patch Changes

-   0b94d616: Adds a max-height value to the dropdown menu to avoid displaying long lists that might cut off on small screen resolutions

## 2.6.9

### Patch Changes

-   @khanacademy/wonder-blocks-button@2.11.5
-   @khanacademy/wonder-blocks-clickable@2.2.6
-   @khanacademy/wonder-blocks-core@4.3.1
-   @khanacademy/wonder-blocks-icon@1.2.27
-   @khanacademy/wonder-blocks-icon-button@3.4.6
-   @khanacademy/wonder-blocks-layout@1.4.9
-   @khanacademy/wonder-blocks-modal@2.3.1
-   @khanacademy/wonder-blocks-typography@1.1.31

## 2.6.8

### Patch Changes

-   f36d2f21: Use `react-window` conditionally (80+ items)

## 2.6.7

### Patch Changes

-   Updated dependencies [7eaf74bd]
    -   @khanacademy/wonder-blocks-modal@2.3.0

## 2.6.6

### Patch Changes

-   Updated dependencies [246a921d]
    -   @khanacademy/wonder-blocks-core@4.3.0
    -   @khanacademy/wonder-blocks-button@2.11.4
    -   @khanacademy/wonder-blocks-clickable@2.2.5
    -   @khanacademy/wonder-blocks-icon@1.2.26
    -   @khanacademy/wonder-blocks-icon-button@3.4.5
    -   @khanacademy/wonder-blocks-layout@1.4.8
    -   @khanacademy/wonder-blocks-modal@2.2.3
    -   @khanacademy/wonder-blocks-typography@1.1.30

## 2.6.5

### Patch Changes

-   Updated dependencies [166ecc97]
    -   @khanacademy/wonder-blocks-clickable@2.2.4
    -   @khanacademy/wonder-blocks-button@2.11.3
    -   @khanacademy/wonder-blocks-icon-button@3.4.4
    -   @khanacademy/wonder-blocks-modal@2.2.2

## 2.6.4

### Patch Changes

-   77e7523c: Update disabled state to match design specs (offWhite bg)

## 2.6.3

### Patch Changes

-   11c87db3: - Added `wonder-blocks-birthday-picker`.
    -   Dropdown: Updated some styles from `backgroundColor` to `background` to avoid some warnings on unit tests.

## 2.6.2

### Patch Changes

-   @khanacademy/wonder-blocks-button@2.11.2
-   @khanacademy/wonder-blocks-clickable@2.2.3
-   @khanacademy/wonder-blocks-core@4.2.1
-   @khanacademy/wonder-blocks-icon@1.2.25
-   @khanacademy/wonder-blocks-icon-button@3.4.3
-   @khanacademy/wonder-blocks-layout@1.4.7
-   @khanacademy/wonder-blocks-modal@2.2.1
-   @khanacademy/wonder-blocks-typography@1.1.29

## 2.6.1

### Patch Changes

-   Updated dependencies [901bfe82]
-   Updated dependencies [e7bbf149]
    -   @khanacademy/wonder-blocks-clickable@2.2.2
    -   @khanacademy/wonder-blocks-modal@2.2.0
    -   @khanacademy/wonder-blocks-button@2.11.1
    -   @khanacademy/wonder-blocks-icon-button@3.4.2

## 2.6.0

### Minor Changes

-   8bccbc9d: Adds `lang` attribute to the `ActionItem` component

### Patch Changes

-   Updated dependencies [029b4810]
-   Updated dependencies [45588e5f]
-   Updated dependencies [c57cd770]
-   Updated dependencies [29766c8e]
-   Updated dependencies [875b7893]
    -   @khanacademy/wonder-blocks-timing@2.1.0
    -   @khanacademy/wonder-blocks-core@4.1.0
