# eslint-plugin-wonder-blocks-demo

## 0.3.1

### Patch Changes

- Updated dependencies [a676ce6]
    - @khanacademy/wonder-blocks-tokens@16.6.0
    - @khanacademy/wonder-blocks-button@11.6.2
    - @khanacademy/wonder-blocks-clickable@8.2.1
    - @khanacademy/wonder-blocks-form@7.6.2
    - @khanacademy/wonder-blocks-icon@5.3.16
    - @khanacademy/wonder-blocks-link@10.3.1
    - @khanacademy/wonder-blocks-typography@4.3.6

## 0.3.0

### Minor Changes

- 73c82e6: Add new lint rule for no-hardcoded-color that suggests semanticColor usage for theming support

## 0.2.5

### Patch Changes

- Updated dependencies [40cb70f]
- Updated dependencies [40cb70f]
- Updated dependencies [c97ece4]
    - @khanacademy/wonder-blocks-button@11.6.1
    - @khanacademy/wonder-blocks-core@12.4.4
    - @khanacademy/wonder-blocks-form@7.6.1
    - @khanacademy/wonder-blocks-clickable@8.2.0
    - @khanacademy/wonder-blocks-link@10.3.0
    - @khanacademy/wonder-blocks-typography@4.3.5

## 0.2.4

### Patch Changes

- Updated dependencies [27a211d]
    - @khanacademy/wonder-blocks-button@11.6.0
    - @khanacademy/wonder-blocks-form@7.6.0
    - @khanacademy/wonder-blocks-link@10.2.0
    - @khanacademy/wonder-blocks-clickable@8.1.10
    - @khanacademy/wonder-blocks-typography@4.3.4

## 0.2.3

### Patch Changes

- @khanacademy/wonder-blocks-button@11.5.4
- @khanacademy/wonder-blocks-clickable@8.1.9
- @khanacademy/wonder-blocks-form@7.5.10
- @khanacademy/wonder-blocks-link@10.1.11
- @khanacademy/wonder-blocks-typography@4.3.3

## 0.2.2

### Patch Changes

- Updated dependencies [0fadf9f]
    - @khanacademy/wonder-blocks-form@7.5.9
    - @khanacademy/wonder-blocks-link@10.1.10
    - @khanacademy/wonder-blocks-button@11.5.3
    - @khanacademy/wonder-blocks-clickable@8.1.8
    - @khanacademy/wonder-blocks-typography@4.3.2

## 0.2.1

### Patch Changes

- @khanacademy/wonder-blocks-button@11.5.2
- @khanacademy/wonder-blocks-clickable@8.1.7
- @khanacademy/wonder-blocks-form@7.5.8
- @khanacademy/wonder-blocks-link@10.1.9
- @khanacademy/wonder-blocks-typography@4.3.1

## 0.2.0

### Minor Changes

- de53ddc: Add two new ESLint rules for BodyText HTML validity and complexity

    - `no-invalid-bodytext-children` (recommended): flags block-level elements inside a phrasing-content BodyText. Accounts for BodyText's `tag` prop and View's `tag` prop — `<View tag="span">` is valid inside BodyText, `<BodyText tag="div">` allows block children.
    - `no-excessive-bodytext-children` (strict): flags BodyText with more direct JSX element children than a configurable threshold (default: 5). Separated from the validity rule so severity and options can be configured independently.

## 0.1.1

### Patch Changes

- Updated dependencies [00e6dda]
- Updated dependencies [00e6dda]
    - @khanacademy/wonder-blocks-form@7.5.7
    - @khanacademy/wonder-blocks-typography@4.3.0
    - @khanacademy/wonder-blocks-button@11.5.1
    - @khanacademy/wonder-blocks-clickable@8.1.6
    - @khanacademy/wonder-blocks-link@10.1.8

## 0.1.0

### Minor Changes

- 6a1134a: Set up `no-custom-tab-role` lint rule.
- abe52a8: Create shared `recommended` and `strict` eslint config
