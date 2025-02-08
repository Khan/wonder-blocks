# @khanacademy/wonder-blocks-tokens

## 4.2.1

### Patch Changes

- ee8d95a: Rollback rollup version from v4 to v2 to prevent an issue with CJS builds in unit tests

## 4.2.0

### Minor Changes

- f03298f: Tooling:

    - Switching to `pnpm`.
    - Upgrading `rollup` to v4 and `@babel/runtime` to match the current webapp version.

## 4.1.0

### Minor Changes

- 8cfaeab0: Add `icon.disabled` token to semanticColor.
- c162abb4: Add `border.focus` semantic color token to use for the focus outline

## 4.0.0

### Major Changes

- 0de25cd8: - Reworked semanticColor actions to use a new structure. Every `action` now includes `default`, `hover` and `press` states, and each state includes `border`, `background` and `foreground` tokens.

    - Renamed `primary` to `progressive`.

    - Added more categories to actions: `filled` and `outline`.

## 3.0.1

### Patch Changes

- 11a0f5c6: No functional changes. Adding prepublishOnly script.

## 3.0.0

### Major Changes

- e6abdd17: Upgrade to React 18

## 2.1.0

### Minor Changes

- 6999fd39: Add mediaQuery tokens for viewport sizing

## 2.0.1

### Patch Changes

- 02a1b298: Make sure we don't package tsconfig and tsbuildinfo files

## 2.0.0

### Major Changes

- f17dc1ee: Remove pink and lightBlue from brand colors
- 991eb43f: Add semanticColor tokens, remove deprecated Brand color primitives

## 1.3.1

### Patch Changes

- 559e82d5: Update to build tooling, generating smaller output

## 1.3.0

### Minor Changes

- 9bfeead9: Add faded versions of offBlack

## 1.2.0

### Minor Changes

- 874081aa: Add fade and mix functions

### Patch Changes

- 874081aa: Remove wonder-blocks-color dependency in favor of wonder-blocks-tokens
- a9bf603a: Move spacing tokens to wb-tokens

## 1.1.0

### Minor Changes

- 4cfb4977: Add new shades of existing colors (24%).

## 1.0.0

### Major Changes

- e83f8991: Mark wb-tokens as public (first official release)

## 0.2.0

### Minor Changes

- 7cd7f6cc: Move tokens from wb-theming to wb-tokens and split token categories into separate objects/files
- 7c51f377: Add fadedBlue24 color token

## 0.1.0

### Minor Changes

- a95d1323: Add skeleton for tokens package
