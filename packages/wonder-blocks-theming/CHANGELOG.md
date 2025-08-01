# @khanacademy/wonder-blocks-theming

## 4.0.0

### Major Changes

- 0f16c2e: Remove most of deprecated APIs that use React Context in favor of CSS variables + custom tooling

## 3.4.0

### Minor Changes

- c7d95bf: Add `thunderblocks` theme to Wonder Blocks.

## 3.3.0

### Minor Changes

- 7f79943: Export THEME_DATA_ATTRIBUTE to centralize how the theme is set in WB
- 7bbf311: Add ThemeSwitcher component to change themes using CSS variables

## 3.2.1

### Patch Changes

- 1d7be37: Use pnpm catalog to pin dependency versions across packages

## 3.2.0

### Minor Changes

- 6d37702: Expose WithoutTheme type for use in withScopedTheme HOC.

## 3.1.1

### Patch Changes

- ee8d95a: Rollback rollup version from v4 to v2 to prevent an issue with CJS builds in unit tests

## 3.1.0

### Minor Changes

- f03298f: Tooling:

    - Switching to `pnpm`.
    - Upgrading `rollup` to v4 and `@babel/runtime` to match the current webapp version.

## 3.0.1

### Patch Changes

- 11a0f5c6: No functional changes. Adding prepublishOnly script.

## 3.0.0

### Major Changes

- e6abdd17: Upgrade to React 18

## 2.0.4

### Patch Changes

- 02a1b298: Make sure we don't package tsconfig and tsbuildinfo files

## 2.0.3

### Patch Changes

- 559e82d5: Update to build tooling, generating smaller output

## 2.0.2

### Patch Changes

- 874081aa: Remove wonder-blocks-color dependency in favor of wonder-blocks-tokens

## 2.0.1

### Patch Changes

- e83f8991: Add "dark" to the list of supported themes

## 2.0.0

### Major Changes

- 7cd7f6cc: Move tokens export to wb-tokens

### Patch Changes

- 60aba5b8: Update internal spacing references (from wb-spacing to wb-tokens)

## 1.3.0

### Minor Changes

- 80592e75: Added more colors to Pill, small pills are now 24px tall with 14px font size. Tokens (theming) now include pill colors.

## 1.2.1

### Patch Changes

- edcfbe14: fix font.family.sans value

## 1.2.0

### Minor Changes

- 3f854fe8: Export supported themes list, change WB components to use these new exports

## 1.1.1

### Patch Changes

- Updated dependencies [48d3c7e9]
    - @khanacademy/wonder-blocks-color@3.0.0

## 1.1.0

### Minor Changes

- 5725703a: Add new color tokens (more faded values)
- fc6cec0b: Add theming to Switch and new color tokens for theming

## 1.0.0

### Major Changes

- bad46d23: First public release of theming package

## 0.3.0

### Minor Changes

- b2634f7c: Add `themeName` return value to `useScopedTheme` to allow getting the name of the theme in use.

## 0.2.0

### Minor Changes

- 758eb872: Add useScopedTheme hook
- 0f983e19: Add useStyles hook
- 014cd622: Add mergeTheme utility to extend themes
- 016801b7: Add ThemeSwitcherContext util
- 183ab2b8: Add global tokens
- 014cd622: Add createThemeContext
- abf48091: Add withScopedTheme HOC

## 0.1.0

### Minor Changes

- 9f3752d4: Add theming package

### Patch Changes

- 9f3752d4: Change package settings
