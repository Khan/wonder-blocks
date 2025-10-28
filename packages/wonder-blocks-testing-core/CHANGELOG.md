# @khanacademy/wonder-blocks-testing-core

## 4.0.2

### Patch Changes

- 6d5c485: Include provenance information when publishing to npmjs

## 4.0.1

### Patch Changes

- 4c03506: Upgrade wonder-blocks infrastructure to use Storybook v9

## 4.0.0

### Major Changes

- 82b5970: Removed Fixtures framework - please use the native Storybook CSFv3 format for stories

## 3.0.1

### Patch Changes

- 30f357a: Deprecate fixtures framework

## 3.0.0

### Major Changes

- 38c926c: Upgrade WB to using react-router-dom-v5-compat.

## 2.2.1

### Patch Changes

- 1d7be37: Use pnpm catalog to pin dependency versions across packages

## 2.2.0

### Minor Changes

- eb47d37: Improve error messaging for the router test harness adapter

## 2.1.1

### Patch Changes

- ee8d95a: Rollback rollup version from v4 to v2 to prevent an issue with CJS builds in unit tests

## 2.1.0

### Minor Changes

- f03298f: Tooling:

    - Switching to `pnpm`.
    - Upgrading `rollup` to v4 and `@babel/runtime` to match the current webapp version.

## 2.0.1

### Patch Changes

- 11a0f5c6: No functional changes. Adding prepublishOnly script.

## 2.0.0

### Major Changes

- e6abdd17: Upgrade to React 18

## 1.1.0

### Minor Changes

- 16565a85: Add support for hard fails to the request mocking features

## 1.0.2

### Patch Changes

- 02a1b298: Make sure we don't package tsconfig and tsbuildinfo files

## 1.0.1

### Patch Changes

- c954464a: Fix how react-dom/server is imported in Wonder Blocks Testing Core
- 559e82d5: Update to build tooling, generating smaller output

## 1.0.0

### Major Changes

- 2a6c85df: New package containing core Testing functionality without dependencies on other WB packages
