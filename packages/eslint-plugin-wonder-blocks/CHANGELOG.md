# @khanacademy/eslint-plugin-wonder-blocks

## 1.0.0

### Major Changes

- 9796389: Trim `require-logical-properties-for-rtl` to its high-signal checks and enable it in the `recommended` config as `"error"`.

    - **Removed** the low-signal checks (`transformOrigin`, `boxShadow`/`textShadow`, `linear-gradient` direction, `cursor` resize, `backgroundPositionX/Y`) — no logical fix, almost all false positives.
    - **Narrowed `translateX`**: flags px / non-±50% offsets (directional), exempts the `±50%` centering idiom and `calc()`/`var()`. Report-only.
    - **Extended** the `padding`/`margin` shorthand check to 3- and 4-value forms (autofix); the 4-value form is the real RTL hazard.
    - **Added autofix** for `float`/`clear` `left/right` → `inline-start/inline-end`.
    - **Kept**: property-name fixes, `textAlign`, `float`/`clear`, `direction`, `backgroundPosition` directional detection.

    **Breaking:** the rule now takes no options. Any config passing `warnDirectionalTransforms`, `warnShadows`, `warnGradients`, `warnCursorDirections`, `warnBackgroundPositionXY`, or `warnBackgroundPosition` will now error and must drop it.

    Part of CLASS-14252.

## 0.8.0

### Minor Changes

- d69335d: Add new no-raw-button lint rule to encourage use of WB components instead

## 0.7.0

### Minor Changes

- 73c82e6: Add new lint rule for no-hardcoded-color that suggests semanticColor usage for theming support

### Patch Changes

- 73c82e6: Disable `require-logical-properties-for-rtl` from the recommended (and strict) configs to facilitate intentional rollout. The rule is still available in the plugin for opt-in use.

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
