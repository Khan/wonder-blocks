# @khanacademy/wb-codemod

## 2.1.1

### Patch Changes

- ee8d95a: Rollback rollup version from v4 to v2 to prevent an issue with CJS builds in unit tests

## 2.1.0

### Minor Changes

- f03298f: Tooling:

    - Switching to `pnpm`.
    - Upgrading `rollup` to v4 and `@babel/runtime` to match the current webapp version.

## 2.0.0

### Major Changes

- e6abdd17: Upgrade to React 18

## 1.1.0

### Minor Changes

- 3c0b8ec3: Add transform to migrate spacing to tokens
- be8cfa47: Add color transform to migrate color imports to tokens

### Patch Changes

- 81266926: Change script to use Node/JS directly instead of TS

## 1.0.0

### Major Changes

- 95a4bb68: Create wb-codemod package to run code migrations
