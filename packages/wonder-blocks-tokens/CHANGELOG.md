# @khanacademy/wonder-blocks-tokens

## 11.3.0

### Minor Changes

- dddbe55: Includes css variables for form and labeled-field packages. Adds semanticColor.input.readOnly tokens. Updates TB values for input tokens

### Patch Changes

- a98fe6c: Update LabeledField component css variables
- e21e448: Update tb semantic color value for input foreground

## 11.2.2

### Patch Changes

- d8716ab: Adds CSS variable tokens for WB Form: Checkbox and Radio

## 11.2.1

### Patch Changes

- de9435a: Fixes some semanticColor values. Adds dropdown CSS variables.
- f50aafc: Adds cell component-level tokens to css variables build

## 11.2.0

### Minor Changes

- e457d8c: Export modal tokens. Update `core.shadow.transparent` token value in TB.

## 11.1.1

### Patch Changes

- f26858a: Export modal css vars from the tokens package.

## 11.1.0

### Minor Changes

- 0f4f771: Include css variables for banner component

## 11.0.0

### Major Changes

- 0cb7a69: Moves some TB colors out of the OG primitives, so we ensure that these colors are only available via semanticColor
- cbf58b0: Adds a new learning category in `semanticColor`. Updates yellow_10 and gray_20 TB primivives.

### Patch Changes

- 1ac2ba7: Adds `input` category to TB theme.

## 10.6.0

### Minor Changes

- 7811eb1: Add tokens for themable Switch component

## 10.5.0

### Minor Changes

- 8468d8d: Add tokens to support Gems, Streaks, and Due semantics.
    - Classic:
        - Add magenta, cyan, and orange primitive colors that are the same values as Thunderblocks
    - Thunderblocks and Classic:
        - Add gems, streak, and due semantic core tokens for `background`, `foreground`, and `border`
        - Add semantic feedback color tokens for `info`, `success`, `warning`, and `critical`

## 10.4.0

### Minor Changes

- b1ee2b4: Adds `chonky` category and `ActivityIconButton` component.
- 7abcccf: Add `core.background` and `core.foreground` categories.
- 9bacc1a: Adds new `semanticColor.core` category
- 1c3c335: Adds `semanticColor.link` tokens category
- 689f5d3: Adds `core` category to the ThunderBlocks semanticColor theme

### Patch Changes

- 9bacc1a: Replaces all existing `semanticColor.border` references to use `semanticColor.core.border`

## 10.3.0

### Minor Changes

- dd76e7c: - Update existing font tokens to use themes.
    - Add font.heading and font.body tokens for size and lineHeight.
    - Add font.weight.medium for the Thunderblocks theme with Plus Jakarta Sans.

### Patch Changes

- @khanacademy/wonder-blocks-theming@3.4.0

## 10.2.1

### Patch Changes

- 1338494: - Updates some action tokens (thunderblocks)
    - Adds `sizing.size_260` and `sizing.size_440` to the `sizing` tokens to support
      new Button sizes.

## 10.2.0

### Minor Changes

- c7d95bf: Add `thunderblocks` theme to Wonder Blocks.
- 668093b: Expose mapValuesToCssVars so other WB packages can switch to theming with CSS vars instead of relying on React Context.

### Patch Changes

- Updated dependencies [c7d95bf]
    - @khanacademy/wonder-blocks-theming@3.4.0

## 10.1.0

### Minor Changes

- abf5496: Add semanticColor.input tokens for form fields

### Patch Changes

- a1be4c5: Change secondary.disabled.border to match design specs
- d00a6f1: Fixes `semanticColor.action.secondary.disabled.background` to match the Design specs (transparent instead of offWhite)
- 812c167: Fix `neutral.secondary.press.background` value to be closer to the progressive and destructive backgrounds

## 10.0.0

### Major Changes

- b9e4946: Update font tokens to use REM sizing scale for scalable font-sizing

### Patch Changes

- @khanacademy/wonder-blocks-theming@3.3.0

## 9.0.0

### Major Changes

- 7bbf311: Replaces `semanticColor` values with references to css variables. Creates a build step to convert semanticColor tokens to css variables that can be consumed via CSS imports.

### Minor Changes

- 2656fd4: Export `border` and `sizing` as CSS variables. Map JS tokens to css var counterparts
- 7f79943: Update build script to use the new data-wb-theme attribute to generate styles.css. Fixes vite.config to allow importing css files in Storybbok

### Patch Changes

- 6018552: Export TS types correctly in package.json so consumers can use them correctly
- Updated dependencies [7f79943]
- Updated dependencies [7bbf311]
    - @khanacademy/wonder-blocks-theming@3.3.0

## 8.0.0

### Major Changes

- e63adea: Updated `border.width` tokens to use new structure:

    | Current Token Name | New Token Name | Pixels (px) |
    | ------------------ | -------------- | ----------- |
    | `hairline`         | `thin`         | 1px         |
    | `thin`             | `medium`       | 2px         |

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
