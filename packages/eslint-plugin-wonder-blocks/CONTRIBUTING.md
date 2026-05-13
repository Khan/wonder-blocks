# Contributing to eslint-plugin-wonder-blocks

## Creating a new lint rule

### 1. Generate the rule files

Run the generate lint rule script from the repo root, passing a kebab-case rule
name and an optional one-line description:

```sh
pnpm gen:lint-rule no-foo-bar --description "Disallow the use of foo bar."
```

It will generate and update the necessary files related to adding a new lint
rule including tests, documentation, and example files.

### 2. Fill in the TODOs

Every placeholder in the generated files is tagged `TODO(no-foo-bar):` so you
can find them all in one search:

```sh
grep -r "TODO(no-foo-bar)" packages/eslint-plugin-wonder-blocks/
```

Key things to fill in:

- **Rule logic** — implement the AST visitor in `src/rules/no-foo-bar.ts`
- **Error message** — replace the placeholder in `meta.messages`
- **Tests** — add valid and invalid code examples to the test file
- **Docs** — describe what the rule catches and show correct/incorrect examples
- **Demo** — update `demo/src/no-foo-bar-example.tsx` with real examples that trigger (or don't trigger) the rule

### 3. Helpful resources

- [TypeScript ESLint custom rules](https://typescript-eslint.io/developers/custom-rules/)
- [AST Explorer](https://astexplorer.net/): A tool for showing what the abstract syntax tree (AST) looks like based on code
- [ESTree Spec](https://github.com/estree/estree/tree/master): The spec for learning more about the AST node types

## Demo

The `demo/` directory contains a sample project for verifying that rules work
as expected. See [`demo/README.md`](demo/README.md) for setup and usage instructions.
