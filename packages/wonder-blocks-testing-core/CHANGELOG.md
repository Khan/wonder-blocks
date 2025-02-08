# @khanacademy/wonder-blocks-testing-core

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
