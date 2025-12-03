# @khanacademy/wonder-blocks-tokens

## 14.1.3

### Patch Changes

- 70d6c08: DetailCell: Use `semanticColor.core.foreground.neutral.default` for the subtitle in all themes. This removes the need for a component theme token for the subtitle color

## 14.1.2

### Patch Changes

- 8a36c70: Re-publish to publish with Trusted Publishing
- 3e0d137: Re-publishing via Trusted Publishing
- Updated dependencies [8a36c70]
- Updated dependencies [3e0d137]
    - @khanacademy/wonder-blocks-theming@4.0.2

## 14.1.1

### Patch Changes

- 540371d: Allow the 'default' theme to be nested within the 'thunderblocks' theme

## 14.1.0

### Minor Changes

- 272bf31: Add feedback neutral semantic color tokens

## 14.0.1

### Patch Changes

- 6d5c485: Include provenance information when publishing to npmjs
- Updated dependencies [6d5c485]
    - @khanacademy/wonder-blocks-theming@4.0.1

## 14.0.0

### Major Changes

- 6963849: Updates `core.shadow.transparent` to include `low`, `mid` and `high` tokens. Renames `shadow.chonky.progressive` to `shadow.chonky.instructive`.

### Minor Changes

- f627dca: Adds `boxShadow` tokens to systematize box shadows.

## 13.0.0

### Major Changes

- a70f274: Remove `semanticColor.surface.*` and `semanticColor.core.foreground.inverse.*` and `semanticColor.core.border.inverse.*` tokens. The `semanticColor.core.background.base.*` or `semanticColor.core.background.overlay.default` tokens should be used instead of surface tokens. `semanticColor.core.foreground/border.knockout.default` and other semantic core color tokens can be used instead of the inverse tokens

### Patch Changes

- ede6085: Update `semanticColor.core.background.neutral.subtle` in the Thunderblocks theme from `white` to `gray_80`.

## 12.2.1

### Patch Changes

- 1feec01: Replace use of `surface` tokens in components in favour of `background` tokens

## 12.2.0

### Minor Changes

- 5a02279: Add semantic color core background base and overlay tokens
- aa6ad92: Adds `foreground.knockout.default` and `border.knockout.default` semantic core colors. Tokens that were previously using `foreground.inverse.*` and `border.inverse.*` have been updated to use the knockout token or other core tokens

### Patch Changes

- aa6ad92: Add themed component tokens for Cell for it's disabled state

## 12.1.0

### Minor Changes

- 4aad557: Add new font tokens for Links: textDecoration underlineOffset and thickness, font family, and font weight

## 12.0.2

### Patch Changes

- e559ab0: Update LabeledField css variables
- 98f4272: Update LabeledField component css variables
- b3dd28f: Update LabeledField component theme tokens
- 3c3d8fb: Update LabeledField component theme css variables (required tokens are no longer needed)

## 12.0.1

### Patch Changes

- 9aad939: Updates CSS variables for the wb-form package

## 12.0.0

### Major Changes

- 956f8bd: Removes semanticColor.text category now that we use semanticColor.core.foreground.
- eafcfa3: Removes `semanticColor.icon` category (in favor of `semanticColor.core.foreground`)
- b42b694: Removes semanticColor.border category as it is deprecated (core.border is the replacement)

### Patch Changes

- eafcfa3: Updates CSS variables for banner and form packages
- 956f8bd: Update form component-level tokens
- Updated dependencies [0f16c2e]
    - @khanacademy/wonder-blocks-theming@4.0.0

## 11.4.1

### Patch Changes

- 03415d1: Update css variable tokens for LabeledField

## 11.4.0

### Minor Changes

- 4d207b1: Add new semanticColor tokens for feedback

## 11.3.1

### Patch Changes

- 7cd0ebf: Update `surface.emphasis` value for the classic theme to `fadedBlue16`
- 51b6e69: Update semantic color core background success strong token to use green 20 instead of green 10 for the Thunderblocks theme
- 51b6e69: Update learning.foreground.progress.complete.strong to green 10

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
