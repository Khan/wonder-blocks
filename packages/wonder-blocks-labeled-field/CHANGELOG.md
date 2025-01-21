# @khanacademy/wonder-blocks-labeled-field

## 1.1.1

### Patch Changes

-   dce7d780: Make labeled-field package public

## 1.1.0

### Minor Changes

-   0869c5ee: - Update `LabeledField` styling to use semantic tokens to match Figma specs
    -   Add error icon to the error message. This addresses accessibility issues related to color being the only way to communicate information
    -   Add a labels prop so that a translated label for the error icon can be passed in
    -   Handle long text overflow with and without word breaks
-   dea7c71e: LabeledField: Wire up attributes for elements and apply attributes to the field element

### Patch Changes

-   fd29f864: LabeledField: Refactor from class component to function component
-   ed8fb7bd: Makes sure custom required messages passed into `LabeledField` or the `field` prop are displayed
-   d9bc865b: Set required, error and light props for LabeledField and field component if it is set on either LabeledField or field component
-   d9bc865b: Use `errorMessage` prop instead of `error` prop for consistency (`error` prop is used for boolean props in form field components).
-   d9bc865b: LabeledField: Let `required` prop be a boolean or string so it can be passed down to the field prop
-   daf459a1: Sets up the initial implementation for LabeledField based on the internal FieldHeading component in the form package

## 1.0.5

### Patch Changes

-   Updated dependencies [7516b239]
    -   @khanacademy/wonder-blocks-core@11.1.0
    -   @khanacademy/wonder-blocks-layout@3.0.5
    -   @khanacademy/wonder-blocks-typography@3.0.5

## 1.0.4

### Patch Changes

-   11a0f5c6: No functional changes. Adding prepublishOnly script.
-   Updated dependencies [11a0f5c6]
    -   @khanacademy/wonder-blocks-typography@3.0.4
    -   @khanacademy/wonder-blocks-layout@3.0.4
    -   @khanacademy/wonder-blocks-tokens@3.0.1
    -   @khanacademy/wonder-blocks-core@11.0.1

## 1.0.3

### Patch Changes

-   Updated dependencies [d23c9c5f]
    -   @khanacademy/wonder-blocks-core@11.0.0
    -   @khanacademy/wonder-blocks-layout@3.0.3
    -   @khanacademy/wonder-blocks-typography@3.0.3

## 1.0.2

### Patch Changes

-   Updated dependencies [b6009b77]
-   Updated dependencies [897686bc]
-   Updated dependencies [56d961f1]
    -   @khanacademy/wonder-blocks-core@10.0.0
    -   @khanacademy/wonder-blocks-layout@3.0.2
    -   @khanacademy/wonder-blocks-typography@3.0.2

## 1.0.1

### Patch Changes

-   Updated dependencies [f4abd572]
    -   @khanacademy/wonder-blocks-core@9.0.0
    -   @khanacademy/wonder-blocks-layout@3.0.1
    -   @khanacademy/wonder-blocks-typography@3.0.1

## 1.0.0

### Major Changes

-   e6abdd17: Upgrade to React 18

### Patch Changes

-   Updated dependencies [e6abdd17]
    -   @khanacademy/wonder-blocks-core@8.0.0
    -   @khanacademy/wonder-blocks-layout@3.0.0
    -   @khanacademy/wonder-blocks-tokens@3.0.0
    -   @khanacademy/wonder-blocks-typography@3.0.0

## 0.1.21

### Patch Changes

-   Updated dependencies [6999fd39]
    -   @khanacademy/wonder-blocks-tokens@2.1.0
    -   @khanacademy/wonder-blocks-layout@2.2.2

## 0.1.20

### Patch Changes

-   02a1b298: Make sure we don't package tsconfig and tsbuildinfo files
-   Updated dependencies [02a1b298]
    -   @khanacademy/wonder-blocks-core@7.0.1
    -   @khanacademy/wonder-blocks-layout@2.2.1
    -   @khanacademy/wonder-blocks-tokens@2.0.1
    -   @khanacademy/wonder-blocks-typography@2.1.16

## 0.1.19

### Patch Changes

-   Updated dependencies [07f7f407]
    -   @khanacademy/wonder-blocks-core@7.0.0
    -   @khanacademy/wonder-blocks-layout@2.2.0
    -   @khanacademy/wonder-blocks-typography@2.1.15

## 0.1.18

### Patch Changes

-   Updated dependencies [f17dc1ee]
-   Updated dependencies [991eb43f]
    -   @khanacademy/wonder-blocks-tokens@2.0.0
    -   @khanacademy/wonder-blocks-layout@2.1.3

## 0.1.17

### Patch Changes

-   559e82d5: Update to build tooling, generating smaller output
-   Updated dependencies [559e82d5]
    -   @khanacademy/wonder-blocks-core@6.4.3
    -   @khanacademy/wonder-blocks-layout@2.1.2
    -   @khanacademy/wonder-blocks-tokens@1.3.1
    -   @khanacademy/wonder-blocks-typography@2.1.14

## 0.1.16

### Patch Changes

-   Updated dependencies [eab37b8b]
    -   @khanacademy/wonder-blocks-core@6.4.2
    -   @khanacademy/wonder-blocks-layout@2.1.1
    -   @khanacademy/wonder-blocks-typography@2.1.13

## 0.1.15

### Patch Changes

-   Updated dependencies [47a758b6]
    -   @khanacademy/wonder-blocks-layout@2.1.0

## 0.1.14

### Patch Changes

-   Updated dependencies [5dfac06e]
    -   @khanacademy/wonder-blocks-core@6.4.1
    -   @khanacademy/wonder-blocks-layout@2.0.33
    -   @khanacademy/wonder-blocks-typography@2.1.12

## 0.1.13

### Patch Changes

-   Updated dependencies [9bfeead9]
    -   @khanacademy/wonder-blocks-tokens@1.3.0
    -   @khanacademy/wonder-blocks-layout@2.0.32

## 0.1.12

### Patch Changes

-   Updated dependencies [58075352]
    -   @khanacademy/wonder-blocks-core@6.4.0
    -   @khanacademy/wonder-blocks-layout@2.0.31
    -   @khanacademy/wonder-blocks-typography@2.1.11

## 0.1.11

### Patch Changes

-   Updated dependencies [874081aa]
-   Updated dependencies [874081aa]
-   Updated dependencies [a9bf603a]
    -   @khanacademy/wonder-blocks-tokens@1.2.0
    -   @khanacademy/wonder-blocks-layout@2.0.30

## 0.1.10

### Patch Changes

-   Updated dependencies [c39bfd29]
    -   @khanacademy/wonder-blocks-layout@2.0.29

## 0.1.9

### Patch Changes

-   Updated dependencies [4cfb4977]
    -   @khanacademy/wonder-blocks-tokens@1.1.0
    -   @khanacademy/wonder-blocks-layout@2.0.28

## 0.1.8

### Patch Changes

-   Updated dependencies [e83f8991]
    -   @khanacademy/wonder-blocks-tokens@1.0.0
    -   @khanacademy/wonder-blocks-layout@2.0.27

## 0.1.7

### Patch Changes

-   60aba5b8: Update internal spacing references (from wb-spacing to wb-tokens)
-   7c51f377: Migrate wb-color imports to use tokens.color
-   Updated dependencies [60aba5b8]
-   Updated dependencies [7cd7f6cc]
-   Updated dependencies [7c51f377]
    -   @khanacademy/wonder-blocks-layout@2.0.26
    -   @khanacademy/wonder-blocks-tokens@0.2.0

## 0.1.6

### Patch Changes

-   Updated dependencies [6df21f71]
    -   @khanacademy/wonder-blocks-core@6.3.1
    -   @khanacademy/wonder-blocks-layout@2.0.25
    -   @khanacademy/wonder-blocks-typography@2.1.10

## 0.1.5

### Patch Changes

-   Updated dependencies [7055ca94]
    -   @khanacademy/wonder-blocks-core@6.3.0
    -   @khanacademy/wonder-blocks-layout@2.0.24
    -   @khanacademy/wonder-blocks-typography@2.1.9

## 0.1.4

### Patch Changes

-   Updated dependencies [b6fbd635]
    -   @khanacademy/wonder-blocks-layout@2.0.23

## 0.1.3

### Patch Changes

-   Updated dependencies [48d3c7e9]
    -   @khanacademy/wonder-blocks-color@3.0.0

## 0.1.2

### Patch Changes

-   Updated dependencies [4b97b9a2]
    -   @khanacademy/wonder-blocks-core@6.2.0
    -   @khanacademy/wonder-blocks-layout@2.0.22
    -   @khanacademy/wonder-blocks-typography@2.1.8

## 0.1.1

### Patch Changes

-   Updated dependencies [2871f0a9]
    -   @khanacademy/wonder-blocks-core@6.1.1
    -   @khanacademy/wonder-blocks-layout@2.0.21
    -   @khanacademy/wonder-blocks-typography@2.1.7

## 0.1.0

### Minor Changes

-   db74f86f: Add skeleton for new labeled field package

### Patch Changes

-   Updated dependencies [efb59c29]
-   Updated dependencies [8bc40ed2]
    -   @khanacademy/wonder-blocks-core@6.1.0
    -   @khanacademy/wonder-blocks-layout@2.0.20
    -   @khanacademy/wonder-blocks-typography@2.1.6
