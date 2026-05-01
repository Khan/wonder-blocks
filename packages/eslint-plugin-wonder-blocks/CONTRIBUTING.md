# Contributing to eslint-plugin-wonder-blocks

## Creating a new lint rule

### 1. Scaffold the rule files

Run the scaffold script from the repo root, passing a kebab-case rule name and
an optional one-line description:

```sh
./packages/eslint-plugin-wonder-blocks/scripts/scaffold-rule.ts no-foo-bar \
    --description "Disallow the use of foo bar."
```

This creates the following files:

| File | Purpose |
|------|---------|
| `src/rules/no-foo-bar.ts` | Rule implementation |
| `src/rules/__tests__/no-foo-bar.test.ts` | Unit tests |
| `docs/no-foo-bar.md` | Rule documentation |
| `demo/src/no-foo-bar-example.tsx` | Demo examples |
| `__docs__/tools/eslint-plugin-wonder-blocks/no-foo-bar.mdx` | Storybook page |

It also patches these existing files:

- `src/rules/index.ts` — registers the rule
- `src/configs/strict.ts` — adds the rule to the strict config
- `README.md` — adds a row to the rules table

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
