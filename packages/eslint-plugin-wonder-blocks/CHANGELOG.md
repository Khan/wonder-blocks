# @khanacademy/eslint-plugin-wonder-blocks

## 0.4.0

### Minor Changes

- de53ddc: Add two new ESLint rules for BodyText HTML validity and complexity

    - `no-invalid-bodytext-children` (recommended): flags block-level elements inside a phrasing-content BodyText. Accounts for BodyText's `tag` prop and View's `tag` prop — `<View tag="span">` is valid inside BodyText, `<BodyText tag="div">` allows block children.
    - `no-excessive-bodytext-children` (strict): flags BodyText with more direct JSX element children than a configurable threshold (default: 5). Separated from the validity rule so severity and options can be configured independently.

## 0.3.0

### Minor Changes

- a421ae1: Add new Typography lint rule for no-invalid-bodytext-parent to avoid nested paragraphs

## 0.2.0

### Minor Changes

- 7c1a1b3: Initialize the eslint-plugin-wonder-blocks package
- 6a1134a: Set up `no-custom-tab-role` lint rule.
- abe52a8: Create shared `recommended` and `strict` eslint config

## 0.1.0

### Minor Changes

- Initial package setup
