# @khanacademy/wonder-blocks-tokens

## 7.0.0

### Major Changes

- e8ccf60: Refactor `border.radius` tokens to use new proposed structure:

    | Current Token Name | New Token Name | Pixels (px) |
    | ------------------ | -------------- | ----------- |
    | `xSmall_2`         | `radius_010`   | 1px         |
    | `small_3`          | `radius_040`   | 4px         |
    | `medium_4`         | `radius_040`   | 4px         |
    | `large_6`          | `radius_080`   | 8px         |
    | `xLarge_12`        | `radius_120`   | 12px        |
    | `full`             | `radius_full`  | 50%         |

## 6.0.0

### Major Changes

- 24bf12f: Update sizing primitive tokens to use Base 10 rem units instead of Base 8 to work around minimum size bugs in browsers

## 5.2.0

### Minor Changes

- 3dc5dac: - Added `action.tertiary` category.
    - Added `neutral` subcategory to each `action` kind.
    - Modified `secondary` to use `transparent` bg instead of `white`.

## 5.1.1

### Patch Changes

- 999101f: Update semanticColor.icon.primary to use the new a11y-friendly offBlack72 primitive color

## 5.1.0

### Minor Changes

- 507cf2f: Adds `fadedOffBlack72` color primitive token and sets the `semanticColor.text.secondary` token to this primitive. The slightly darker gray has better color contrast on a variety of backgrounds, including the fadedBlue8 background

## 5.0.0

### Major Changes

- 5655b9f: Rename `semanticColor.border.focus` to `semanticColor.focus.outer`, and add `focus.inner`.
- 8f53293: Rename action tokens: `filled` -> `primary`, `outlined` -> `secondary`.
- 051f0f8: Remove `action.disabled` object in favor of `action.primary.disabled` and `action.secondary.disabled`

### Minor Changes

- e1b78db: Add sizing primitive tokens to support the new tokens with rem units that will be used by the thunderblocks/classroom theme

### Patch Changes

- 5655b9f: Switch to use `focus.outer` semanticColor token
- 051f0f8: Rework action.disabled tokens to include properties per kind (border, background, foreground).

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
