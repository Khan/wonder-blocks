# eslint-plugin-wonder-blocks

An ESLint plugin for the Wonder Blocks design system.

## Rules

- [wonder-blocks/no-custom-tabs-role](docs/no-custom-tabs-role.md)

## Creating a new lint rule

Here are some helpful resources for setting up a new lint rule:

- [TypeScript ESLint custom rules](https://typescript-eslint.io/developers/custom-rules/)
- [AST Explorer](https://astexplorer.net/): A tool for showing what the abstract syntax tree (AST) looks like based on code
- [ESTree Spec](https://github.com/estree/estree/tree/master): The spec for learning more about the AST node types

## Demo

The `demo/` directory contains a sample project for verifying that rules work
as expected. To use it:

1. Build the plugin from the repo root: `pnpm build`
2. Install demo dependencies: `cd demo && pnpm install`
3. Run ESLint on the demo: `pnpm lint`
