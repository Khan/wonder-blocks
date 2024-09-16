# @khanacademy/wonder-blocks-form

## 4.9.4

### Patch Changes

-   61dc4448: Allow `TextField` to be focusable when disabled. It now sets `aria-disabled` instead of the `disabled` attribute based on the `disabled` prop. This makes it so screenreaders will continue to communicate that the component is disabled, while allowing focus on the disabled component. Focus styling is also added to the disabled state.
-   2dfd5eb6: - Update `TextField` state styling so that it is consistent with other components like `TextArea`, `SingleSelect`, `MultiSelect` (especially the focus styling). The styling also now uses CSS pseudo-classes for easier testing in Chromatic and debugging in browsers.
    -   `TextField` and `TextArea` state styling has also been updated so that any outline styles outside of the component are now applied within the component to prevent cropped focus outlines in places where an ancestor element has `overflow: hidden`.

## 4.9.3

### Patch Changes

-   02a1b298: Make sure we don't package tsconfig and tsbuildinfo files
-   Updated dependencies [02a1b298]
    -   @khanacademy/wonder-blocks-clickable@4.2.8
    -   @khanacademy/wonder-blocks-core@7.0.1
    -   @khanacademy/wonder-blocks-icon@4.1.5
    -   @khanacademy/wonder-blocks-layout@2.2.1
    -   @khanacademy/wonder-blocks-tokens@2.0.1
    -   @khanacademy/wonder-blocks-typography@2.1.16

## 4.9.2

### Patch Changes

-   9ec147a9: Revert updated `TextField` state styling

## 4.9.1

### Patch Changes

-   982f6808: Update `TextField` state styling so that it is consistent with other components like `TextArea`, `SingleSelect`, `MultiSelect` (especially the focus styling). The styling also now uses CSS pseudo-classes for easier testing in Chromatic and debugging in browsers.
-   17f9a337: Improve `LabeledTextField` styling when the `light` prop is `true`. This improves the color contrast of the label, required indicator, description, and error message when the component is used on dark backgrounds.
-   Updated dependencies [07f7f407]
    -   @khanacademy/wonder-blocks-core@7.0.0
    -   @khanacademy/wonder-blocks-layout@2.2.0
    -   @khanacademy/wonder-blocks-clickable@4.2.7
    -   @khanacademy/wonder-blocks-icon@4.1.4
    -   @khanacademy/wonder-blocks-typography@2.1.15

## 4.9.0

### Minor Changes

-   f7390d9d: `TextArea`: Adds `rootStyle` prop for styling to the root node

### Patch Changes

-   f7390d9d: `TextArea`: Updates the `min-height` of the textarea element so that when it is resized vertically using the resize control, the smallest it can get is equivalent to 1 row of the textarea.
-   Updated dependencies [f17dc1ee]
-   Updated dependencies [991eb43f]
    -   @khanacademy/wonder-blocks-tokens@2.0.0
    -   @khanacademy/wonder-blocks-clickable@4.2.6
    -   @khanacademy/wonder-blocks-layout@2.1.3

## 4.8.1

### Patch Changes

-   8ab0b734: Allow `TextArea` to be focusable when disabled. It now sets `aria-disabled` instead of the `disabled` attribute based on the `disabled` prop. This makes it so screenreaders will continue to communicate that the component is disabled, while allowing focus on the disabled component. Focus styling is also added to the disabled state.

## 4.8.0

### Minor Changes

-   4215976f: Adds `TextArea` component

## 4.7.5

### Patch Changes

-   559e82d5: Update to build tooling, generating smaller output
-   Updated dependencies [559e82d5]
    -   @khanacademy/wonder-blocks-clickable@4.2.5
    -   @khanacademy/wonder-blocks-core@6.4.3
    -   @khanacademy/wonder-blocks-icon@4.1.3
    -   @khanacademy/wonder-blocks-layout@2.1.2
    -   @khanacademy/wonder-blocks-tokens@1.3.1
    -   @khanacademy/wonder-blocks-typography@2.1.14

## 4.7.4

### Patch Changes

-   Updated dependencies [eab37b8b]
    -   @khanacademy/wonder-blocks-core@6.4.2
    -   @khanacademy/wonder-blocks-clickable@4.2.4
    -   @khanacademy/wonder-blocks-icon@4.1.2
    -   @khanacademy/wonder-blocks-layout@2.1.1
    -   @khanacademy/wonder-blocks-typography@2.1.13

## 4.7.3

### Patch Changes

-   Updated dependencies [f099cf87]
    -   @khanacademy/wonder-blocks-clickable@4.2.3

## 4.7.2

### Patch Changes

-   c8b273f0: Update default/resting border color to fix a color contrast issue

## 4.7.1

### Patch Changes

-   Updated dependencies [47a758b6]
    -   @khanacademy/wonder-blocks-layout@2.1.0

## 4.7.0

### Minor Changes

-   01fce89e: Make `id` prop optional in `TextField`.

## 4.6.2

### Patch Changes

-   8fda4a73: Fix onBlur and onFocus props so it gets properly called when it is defined in the call site

## 4.6.1

### Patch Changes

-   29563c0d: Fix onValidate prop so it gets properly called when it is defined in the call site

## 4.6.0

### Minor Changes

-   96515513: TextField number inputs can now use `min`, `max`, and `snap` props

### Patch Changes

-   Updated dependencies [5dfac06e]
    -   @khanacademy/wonder-blocks-core@6.4.1
    -   @khanacademy/wonder-blocks-clickable@4.2.2
    -   @khanacademy/wonder-blocks-icon@4.1.1
    -   @khanacademy/wonder-blocks-layout@2.0.33
    -   @khanacademy/wonder-blocks-typography@2.1.12

## 4.5.1

### Patch Changes

-   Updated dependencies [9bfeead9]
    -   @khanacademy/wonder-blocks-tokens@1.3.0
    -   @khanacademy/wonder-blocks-clickable@4.2.1
    -   @khanacademy/wonder-blocks-layout@2.0.32

## 4.5.0

### Minor Changes

-   58075352: Change testId to render the default Testing Library HTML attribute: data-testid (was data-test-id)

### Patch Changes

-   Updated dependencies [58075352]
    -   @khanacademy/wonder-blocks-clickable@4.2.0
    -   @khanacademy/wonder-blocks-core@6.4.0
    -   @khanacademy/wonder-blocks-icon@4.1.0
    -   @khanacademy/wonder-blocks-layout@2.0.31
    -   @khanacademy/wonder-blocks-typography@2.1.11

## 4.4.8

### Patch Changes

-   41aa4074: Set aria-invalid directly in `TextField` to inform the user when the validation fails and there's an error in the input field.

## 4.4.7

### Patch Changes

-   874081aa: Remove wonder-blocks-color dependency in favor of wonder-blocks-tokens
-   Updated dependencies [874081aa]
-   Updated dependencies [874081aa]
-   Updated dependencies [a9bf603a]
    -   @khanacademy/wonder-blocks-tokens@1.2.0
    -   @khanacademy/wonder-blocks-clickable@4.1.3
    -   @khanacademy/wonder-blocks-layout@2.0.30

## 4.4.6

### Patch Changes

-   Updated dependencies [c39bfd29]
    -   @khanacademy/wonder-blocks-layout@2.0.29

## 4.4.5

### Patch Changes

-   Updated dependencies [e6433bee]
    -   @khanacademy/wonder-blocks-clickable@4.1.2

## 4.4.4

### Patch Changes

-   Updated dependencies [4cfb4977]
    -   @khanacademy/wonder-blocks-tokens@1.1.0
    -   @khanacademy/wonder-blocks-clickable@4.1.1
    -   @khanacademy/wonder-blocks-layout@2.0.28

## 4.4.3

### Patch Changes

-   Updated dependencies [60fdac1c]
    -   @khanacademy/wonder-blocks-clickable@4.1.0

## 4.4.2

### Patch Changes

-   Updated dependencies [e83f8991]
    -   @khanacademy/wonder-blocks-tokens@1.0.0
    -   @khanacademy/wonder-blocks-clickable@4.0.14
    -   @khanacademy/wonder-blocks-layout@2.0.27

## 4.4.1

### Patch Changes

-   60aba5b8: Update internal spacing references (from wb-spacing to wb-tokens)
-   7c51f377: Migrate wb-color imports to use tokens.color
-   Updated dependencies [60aba5b8]
-   Updated dependencies [7cd7f6cc]
-   Updated dependencies [7c51f377]
-   Updated dependencies [7c51f377]
    -   @khanacademy/wonder-blocks-layout@2.0.26
    -   @khanacademy/wonder-blocks-tokens@0.2.0
    -   @khanacademy/wonder-blocks-clickable@4.0.13

## 4.4.0

### Minor Changes

-   0c329565: `name` prop has been added to SearchField and TextField

## 4.3.19

### Patch Changes

-   Updated dependencies [23ab9f8c]
-   Updated dependencies [6df21f71]
    -   @khanacademy/wonder-blocks-icon@4.0.1
    -   @khanacademy/wonder-blocks-core@6.3.1
    -   @khanacademy/wonder-blocks-clickable@4.0.12
    -   @khanacademy/wonder-blocks-layout@2.0.25
    -   @khanacademy/wonder-blocks-typography@2.1.10

## 4.3.18

### Patch Changes

-   Updated dependencies [171e3b01]
    -   @khanacademy/wonder-blocks-icon@4.0.0

## 4.3.17

### Patch Changes

-   Updated dependencies [96f675d2]
    -   @khanacademy/wonder-blocks-icon@3.0.0

## 4.3.16

### Patch Changes

-   Updated dependencies [6b8bf8d5]
    -   @khanacademy/wonder-blocks-clickable@4.0.11

## 4.3.15

### Patch Changes

-   c8e9ce34: Add PhosphorIcon support (replace Icon)
-   Updated dependencies [7b24db93]
    -   @khanacademy/wonder-blocks-clickable@4.0.10

## 4.3.14

### Patch Changes

-   Updated dependencies [7055ca94]
    -   @khanacademy/wonder-blocks-core@6.3.0
    -   @khanacademy/wonder-blocks-clickable@4.0.9
    -   @khanacademy/wonder-blocks-icon@2.2.1
    -   @khanacademy/wonder-blocks-layout@2.0.24
    -   @khanacademy/wonder-blocks-typography@2.1.9

## 4.3.13

### Patch Changes

-   Updated dependencies [b6fbd635]
    -   @khanacademy/wonder-blocks-layout@2.0.23

## 4.3.12

### Patch Changes

-   Updated dependencies [ea0e7c02]
    -   @khanacademy/wonder-blocks-icon@2.2.0

## 4.3.11

### Patch Changes

-   Updated dependencies [48d3c7e9]
    -   @khanacademy/wonder-blocks-color@3.0.0
    -   @khanacademy/wonder-blocks-clickable@4.0.8

## 4.3.10

### Patch Changes

-   Updated dependencies [80cab317]
    -   @khanacademy/wonder-blocks-clickable@4.0.7

## 4.3.9

### Patch Changes

-   Updated dependencies [4b97b9a2]
    -   @khanacademy/wonder-blocks-core@6.2.0
    -   @khanacademy/wonder-blocks-clickable@4.0.6
    -   @khanacademy/wonder-blocks-icon@2.1.6
    -   @khanacademy/wonder-blocks-layout@2.0.22
    -   @khanacademy/wonder-blocks-typography@2.1.8

## 4.3.8

### Patch Changes

-   Updated dependencies [2871f0a9]
    -   @khanacademy/wonder-blocks-core@6.1.1
    -   @khanacademy/wonder-blocks-clickable@4.0.5
    -   @khanacademy/wonder-blocks-icon@2.1.5
    -   @khanacademy/wonder-blocks-layout@2.0.21
    -   @khanacademy/wonder-blocks-typography@2.1.7

## 4.3.7

### Patch Changes

-   Updated dependencies [efb59c29]
-   Updated dependencies [834855e5]
-   Updated dependencies [8bc40ed2]
    -   @khanacademy/wonder-blocks-core@6.1.0
    -   @khanacademy/wonder-blocks-clickable@4.0.4
    -   @khanacademy/wonder-blocks-icon@2.1.4
    -   @khanacademy/wonder-blocks-layout@2.0.20
    -   @khanacademy/wonder-blocks-typography@2.1.6

## 4.3.6

### Patch Changes

-   Updated dependencies [f19da46e]
    -   @khanacademy/wonder-blocks-core@6.0.2
    -   @khanacademy/wonder-blocks-clickable@4.0.3
    -   @khanacademy/wonder-blocks-icon@2.1.3
    -   @khanacademy/wonder-blocks-layout@2.0.19
    -   @khanacademy/wonder-blocks-typography@2.1.5

## 4.3.5

### Patch Changes

-   Updated dependencies [8dc4a5a3]
-   Updated dependencies [1920feb8]
    -   @khanacademy/wonder-blocks-clickable@4.0.2
    -   @khanacademy/wonder-blocks-core@6.0.1
    -   @khanacademy/wonder-blocks-icon@2.1.2
    -   @khanacademy/wonder-blocks-layout@2.0.18
    -   @khanacademy/wonder-blocks-typography@2.1.4

## 4.3.4

### Patch Changes

-   Updated dependencies [f230b267]
    -   @khanacademy/wonder-blocks-clickable@4.0.1

## 4.3.3

### Patch Changes

-   Updated dependencies [8c77f29d]
-   Updated dependencies [674a1e5c]
-   Updated dependencies [674a1e5c]
-   Updated dependencies [674a1e5c]
    -   @khanacademy/wonder-blocks-clickable@4.0.0
    -   @khanacademy/wonder-blocks-core@6.0.0
    -   @khanacademy/wonder-blocks-icon@2.1.1
    -   @khanacademy/wonder-blocks-layout@2.0.17
    -   @khanacademy/wonder-blocks-typography@2.1.3

## 4.3.2

### Patch Changes

-   4f8133ed: Fix props so `variants` doesn't show up in underlying input attributes
-   Updated dependencies [ec6a33a4]
-   Updated dependencies [1344436f]
    -   @khanacademy/wonder-blocks-icon@2.1.0
    -   @khanacademy/wonder-blocks-core@5.4.0
    -   @khanacademy/wonder-blocks-clickable@3.1.3
    -   @khanacademy/wonder-blocks-layout@2.0.16
    -   @khanacademy/wonder-blocks-typography@2.1.2

## 4.3.1

### Patch Changes

-   9f3752d4: Used named functions in componenets with forwarded refs
-   Updated dependencies [9f3752d4]
    -   @khanacademy/wonder-blocks-typography@2.1.1
    -   @khanacademy/wonder-blocks-core@5.3.1
    -   @khanacademy/wonder-blocks-clickable@3.1.2
    -   @khanacademy/wonder-blocks-icon@2.0.15
    -   @khanacademy/wonder-blocks-layout@2.0.15

## 4.3.0

### Minor Changes

-   b05c5344: Forward refs in RadioGroup
-   f84dfb23: Foward refs in CheckboxGroup
-   13f9de9c: Forward refs in Checkbox
-   a5116f0b: Forwards refs in Choice, Radio, and RadioCore

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
    -   @khanacademy/wonder-blocks-clickable@3.1.1
    -   @khanacademy/wonder-blocks-icon@2.0.14
    -   @khanacademy/wonder-blocks-layout@2.0.14

## 4.2.3

### Patch Changes

-   Updated dependencies [ad8beb23]
    -   @khanacademy/wonder-blocks-clickable@3.1.0

## 4.2.2

### Patch Changes

-   Updated dependencies [d4c412b5]
    -   @khanacademy/wonder-blocks-core@5.2.3
    -   @khanacademy/wonder-blocks-clickable@3.0.13
    -   @khanacademy/wonder-blocks-icon@2.0.13
    -   @khanacademy/wonder-blocks-layout@2.0.13
    -   @khanacademy/wonder-blocks-typography@2.0.13

## 4.2.1

### Patch Changes

-   Updated dependencies [64a188e3]
    -   @khanacademy/wonder-blocks-core@5.2.2
    -   @khanacademy/wonder-blocks-clickable@3.0.12
    -   @khanacademy/wonder-blocks-icon@2.0.12
    -   @khanacademy/wonder-blocks-layout@2.0.12
    -   @khanacademy/wonder-blocks-typography@2.0.12

## 4.2.0

### Minor Changes

-   3f86013b: Add autocomplete prop to SearchField and TextField

## 4.1.3

### Patch Changes

-   Updated dependencies [5a1ea891]
-   Updated dependencies [df9a10aa]
    -   @khanacademy/wonder-blocks-layout@2.0.11
    -   @khanacademy/wonder-blocks-core@5.2.1
    -   @khanacademy/wonder-blocks-clickable@3.0.11
    -   @khanacademy/wonder-blocks-icon@2.0.11
    -   @khanacademy/wonder-blocks-typography@2.0.11

## 4.1.2

### Patch Changes

-   43f6328d: Fix flow types

## 4.1.1

### Patch Changes

-   19ab0408: Update flowgen to convert React.ForwardRefExoticComponent<> and React.FowardedRef<> properly
-   fa70c895: Remove all TypeScript error suppressions on JSX attributes
-   Updated dependencies [fa70c895]
-   Updated dependencies [19ab0408]
-   Updated dependencies [fa70c895]
    -   @khanacademy/wonder-blocks-core@5.2.0
    -   @khanacademy/wonder-blocks-clickable@3.0.10
    -   @khanacademy/wonder-blocks-icon@2.0.10
    -   @khanacademy/wonder-blocks-layout@2.0.10
    -   @khanacademy/wonder-blocks-typography@2.0.10

## 4.1.0

### Minor Changes

-   ffe3758d: Add indeterminate state to checkbox

## 4.0.9

### Patch Changes

-   d0f0ce7e: Updates input to StyledInput and uses style prop
-   1269f6e0: Allow text highlighting on choice components
-   f71343d6: Remove ClickableBehavior from Choice to improve screenreader a11y
-   Updated dependencies [3c400719]
-   Updated dependencies [a6164ed0]
    -   @khanacademy/wonder-blocks-core@5.1.0
    -   @khanacademy/wonder-blocks-clickable@3.0.9
    -   @khanacademy/wonder-blocks-icon@2.0.9
    -   @khanacademy/wonder-blocks-layout@2.0.9
    -   @khanacademy/wonder-blocks-typography@2.0.9

## 4.0.8

### Patch Changes

-   @khanacademy/wonder-blocks-clickable@3.0.8
-   @khanacademy/wonder-blocks-icon@2.0.8
-   @khanacademy/wonder-blocks-layout@2.0.8
-   @khanacademy/wonder-blocks-typography@2.0.8

## 4.0.7

### Patch Changes

-   @khanacademy/wonder-blocks-clickable@3.0.7
-   @khanacademy/wonder-blocks-icon@2.0.7
-   @khanacademy/wonder-blocks-layout@2.0.7
-   @khanacademy/wonder-blocks-typography@2.0.7

## 4.0.6

### Patch Changes

-   c20f48f3: Don't transpile classes when building bundles
-   Updated dependencies [c20f48f3]
    -   @khanacademy/wonder-blocks-clickable@3.0.6
    -   @khanacademy/wonder-blocks-core@5.0.4
    -   @khanacademy/wonder-blocks-icon@2.0.6
    -   @khanacademy/wonder-blocks-layout@2.0.6
    -   @khanacademy/wonder-blocks-typography@2.0.6

## 4.0.5

### Patch Changes

-   @khanacademy/wonder-blocks-clickable@3.0.5
-   @khanacademy/wonder-blocks-icon@2.0.5
-   @khanacademy/wonder-blocks-layout@2.0.5
-   @khanacademy/wonder-blocks-typography@2.0.5

## 4.0.4

### Patch Changes

-   @khanacademy/wonder-blocks-clickable@3.0.4
-   @khanacademy/wonder-blocks-icon@2.0.4
-   @khanacademy/wonder-blocks-layout@2.0.4
-   @khanacademy/wonder-blocks-typography@2.0.4

## 4.0.3

### Patch Changes

-   Updated dependencies [b281e2eb]
    -   @khanacademy/wonder-blocks-core@5.0.3
    -   @khanacademy/wonder-blocks-clickable@3.0.3
    -   @khanacademy/wonder-blocks-icon@2.0.3
    -   @khanacademy/wonder-blocks-layout@2.0.3
    -   @khanacademy/wonder-blocks-typography@2.0.3

## 4.0.2

### Patch Changes

-   Updated dependencies [21ce20c7]
    -   @khanacademy/wonder-blocks-core@5.0.2
    -   @khanacademy/wonder-blocks-clickable@3.0.2
    -   @khanacademy/wonder-blocks-icon@2.0.2
    -   @khanacademy/wonder-blocks-layout@2.0.2
    -   @khanacademy/wonder-blocks-typography@2.0.2

## 4.0.1

### Patch Changes

-   ccb6fe00: Miscellaneous TS type fixes
-   d4c2b18c: Fix a variety of issues with Flow types generated by flowgen
-   Updated dependencies [ccb6fe00]
-   Updated dependencies [d4c2b18c]
    -   @khanacademy/wonder-blocks-clickable@3.0.1
    -   @khanacademy/wonder-blocks-core@5.0.1
    -   @khanacademy/wonder-blocks-icon@2.0.1
    -   @khanacademy/wonder-blocks-layout@2.0.1
    -   @khanacademy/wonder-blocks-typography@2.0.1
    -   @khanacademy/wonder-blocks-color@2.0.1
    -   @khanacademy/wonder-blocks-spacing@4.0.1

## 4.0.0

### Major Changes

-   1ca4d7e3: Fix minor issue with generate Flow types (this is a major bump b/c I forgot to do one after doing the TS conversion)

### Patch Changes

-   Updated dependencies [1ca4d7e3]
    -   @khanacademy/wonder-blocks-clickable@3.0.0
    -   @khanacademy/wonder-blocks-color@2.0.0
    -   @khanacademy/wonder-blocks-core@5.0.0
    -   @khanacademy/wonder-blocks-icon@2.0.0
    -   @khanacademy/wonder-blocks-layout@2.0.0
    -   @khanacademy/wonder-blocks-spacing@4.0.0
    -   @khanacademy/wonder-blocks-typography@2.0.0

## 3.1.14

### Patch Changes

-   b5ba5568: Ensure that flow lib defs use React.ElementConfig<> isntead of JSX.LibraryManagedAttributes<>
-   Updated dependencies [b5ba5568]
    -   @khanacademy/wonder-blocks-clickable@2.4.8
    -   @khanacademy/wonder-blocks-color@1.2.3
    -   @khanacademy/wonder-blocks-core@4.9.1
    -   @khanacademy/wonder-blocks-icon@1.2.40
    -   @khanacademy/wonder-blocks-layout@1.4.19
    -   @khanacademy/wonder-blocks-spacing@3.0.7
    -   @khanacademy/wonder-blocks-typography@1.1.41

## 3.1.13

### Patch Changes

-   Updated dependencies [779b031d]
    -   @khanacademy/wonder-blocks-core@4.9.0
    -   @khanacademy/wonder-blocks-clickable@2.4.7
    -   @khanacademy/wonder-blocks-icon@1.2.39
    -   @khanacademy/wonder-blocks-layout@1.4.18
    -   @khanacademy/wonder-blocks-typography@1.1.40

## 3.1.12

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
    -   @khanacademy/wonder-blocks-spacing@3.0.6
    -   @khanacademy/wonder-blocks-typography@1.1.39

## 3.1.11

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
    -   @khanacademy/wonder-blocks-typography@1.1.38

## 3.1.10

### Patch Changes

-   Updated dependencies [1a5624d4]
    -   @khanacademy/wonder-blocks-icon@1.2.36

## 3.1.9

### Patch Changes

-   Updated dependencies [496119f2]
    -   @khanacademy/wonder-blocks-clickable@2.4.4
    -   @khanacademy/wonder-blocks-core@4.6.2
    -   @khanacademy/wonder-blocks-icon@1.2.35
    -   @khanacademy/wonder-blocks-layout@1.4.15
    -   @khanacademy/wonder-blocks-typography@1.1.37

## 3.1.8

### Patch Changes

-   @khanacademy/wonder-blocks-clickable@2.4.3
-   @khanacademy/wonder-blocks-core@4.6.1
-   @khanacademy/wonder-blocks-icon@1.2.34
-   @khanacademy/wonder-blocks-layout@1.4.14
-   @khanacademy/wonder-blocks-typography@1.1.36

## 3.1.7

### Patch Changes

-   cfbf454c: Rename `TextFieldInternal` to `TextField` (same with `LabeledTextField`)
-   Updated dependencies [b561425a]
-   Updated dependencies [a566e232]
-   Updated dependencies [d2b21a6e]
    -   @khanacademy/wonder-blocks-core@4.6.0
    -   @khanacademy/wonder-blocks-clickable@2.4.2
    -   @khanacademy/wonder-blocks-icon@1.2.33
    -   @khanacademy/wonder-blocks-layout@1.4.13
    -   @khanacademy/wonder-blocks-typography@1.1.35

## 3.1.6

### Patch Changes

-   Updated dependencies [4c682709]
    -   @khanacademy/wonder-blocks-clickable@2.4.1

## 3.1.5

### Patch Changes

-   be4e4cd2: Allow maybe values for `errorMessage` prop on `CheckboxGroup`

## 3.1.4

### Patch Changes

-   Updated dependencies [ceb111df]
    -   @khanacademy/wonder-blocks-clickable@2.4.0

## 3.1.3

### Patch Changes

-   Updated dependencies [175a2dd2]
    -   @khanacademy/wonder-blocks-core@4.5.0
    -   @khanacademy/wonder-blocks-clickable@2.3.3
    -   @khanacademy/wonder-blocks-icon@1.2.32
    -   @khanacademy/wonder-blocks-layout@1.4.12
    -   @khanacademy/wonder-blocks-typography@1.1.34

## 3.1.2

### Patch Changes

-   Updated dependencies [5b8ba5da]
    -   @khanacademy/wonder-blocks-clickable@2.3.2

## 3.1.1

### Patch Changes

-   c13dc28e: Don't wrap Choices in a Fragment to so that each child has a 'key' prop

## 3.1.0

### Minor Changes

-   d3f459bf: Allow CheckboxGroup and RadioGroup to accept falsy children

## 3.0.0

### Major Changes

-   3bae2aba: Remove Radio from wonder-blocks-form's exports so that RadioGroup is used

### Patch Changes

-   e91fb6c0: Update label, description, and error props in form components to accept React.Node
-   Updated dependencies [3bae2aba]
    -   @khanacademy/wonder-blocks-icon@1.2.31

## 2.4.8

### Patch Changes

-   Updated dependencies [6ee20af9]
    -   @khanacademy/wonder-blocks-core@4.4.0
    -   @khanacademy/wonder-blocks-clickable@2.3.1
    -   @khanacademy/wonder-blocks-icon@1.2.30
    -   @khanacademy/wonder-blocks-layout@1.4.11
    -   @khanacademy/wonder-blocks-typography@1.1.33

## 2.4.7

### Patch Changes

-   Updated dependencies [34c7aacb]
    -   @khanacademy/wonder-blocks-color@1.2.0

## 2.4.6

### Patch Changes

-   Updated dependencies [ee6fc773]
    -   @khanacademy/wonder-blocks-clickable@2.3.0

## 2.4.5

### Patch Changes

-   Updated dependencies [83486dba]
    -   @khanacademy/wonder-blocks-icon@1.2.29

## 2.4.4

### Patch Changes

-   Updated dependencies [5f4a4297]
-   Updated dependencies [2b96fd59]
    -   @khanacademy/wonder-blocks-core@4.3.2
    -   @khanacademy/wonder-blocks-clickable@2.2.7
    -   @khanacademy/wonder-blocks-icon@1.2.28
    -   @khanacademy/wonder-blocks-layout@1.4.10
    -   @khanacademy/wonder-blocks-typography@1.1.32

## 2.4.3

### Patch Changes

-   @khanacademy/wonder-blocks-clickable@2.2.6
-   @khanacademy/wonder-blocks-core@4.3.1
-   @khanacademy/wonder-blocks-icon@1.2.27
-   @khanacademy/wonder-blocks-layout@1.4.9
-   @khanacademy/wonder-blocks-typography@1.1.31

## 2.4.2

### Patch Changes

-   Updated dependencies [246a921d]
    -   @khanacademy/wonder-blocks-core@4.3.0
    -   @khanacademy/wonder-blocks-clickable@2.2.5
    -   @khanacademy/wonder-blocks-icon@1.2.26
    -   @khanacademy/wonder-blocks-layout@1.4.8
    -   @khanacademy/wonder-blocks-typography@1.1.30

## 2.4.1

### Patch Changes

-   Updated dependencies [166ecc97]
    -   @khanacademy/wonder-blocks-clickable@2.2.4

## 2.4.0

### Minor Changes

-   af4f527c: LabeledTextField component now has a `required` prop that will mark is as required with an asterisk and provide validation

## 2.3.3

### Patch Changes

-   @khanacademy/wonder-blocks-clickable@2.2.3
-   @khanacademy/wonder-blocks-core@4.2.1
-   @khanacademy/wonder-blocks-icon@1.2.25
-   @khanacademy/wonder-blocks-layout@1.4.7
-   @khanacademy/wonder-blocks-typography@1.1.29

## 2.3.2

### Patch Changes

-   Updated dependencies [901bfe82]
    -   @khanacademy/wonder-blocks-clickable@2.2.2
