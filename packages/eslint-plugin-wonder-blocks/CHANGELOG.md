# @khanacademy/eslint-plugin-wonder-blocks

## 0.6.0

### Minor Changes

- 40cb70f: Enable `require-logical-properties-for-rtl` in the `recommended` config. Auto-fixes all existing WB violations (physical CSS properties → logical equivalents, `textAlign: "left"|"right"` → `"start"|"end"`). Story files using `direction: "ltr"|"rtl"` in styles are updated to use the `dir` HTML attribute instead. Part of CLASS-14218.
- 40cb70f: Add `require-logical-properties-for-rtl` ESLint rule to `eslint-plugin-wonder-blocks` recommended config, and migrate all Wonder Blocks component source files to use CSS logical properties for improved RTL layout support.
- 40cb70f: Enable RTL logical-properties ESLint rule in recommended config

## 0.5.0

### Minor Changes

- 878205b: Add `require-logical-properties-for-rtl` rule. Enforces CSS logical properties (e.g. `marginInlineStart`) over physical ones (`marginLeft`) so styles work in both LTR and RTL writing modes. Ported from frontend's `@khan/eslint-plugin-frontend` to provide a single source of truth that both wonder-blocks and frontend can consume. Rule is shipped but not yet enabled in any plugin config — consumers must opt in explicitly. A follow-up PR will enable it in the recommended config after auto-fixing existing violations. Auto-fixes property names and the `textAlign: "left"|"right"` value swap.

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
