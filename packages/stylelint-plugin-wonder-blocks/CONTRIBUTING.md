# Contributing to stylelint-plugin-wonder-blocks

## Creating a new lint rule

1. Add the rule in `src/rules/<rule-name>.ts`. Use `getRuleName` from
   `src/utils/rule-name.ts` so the rule is namespaced as
   `@khanacademy/wonder-blocks/<rule-name>`, and export the plugin created
   with `stylelint.createPlugin` as the default export.
2. Add the plugin to the `rules` array in `src/rules/index.ts`.
3. Enable the rule in `src/configs/recommended.ts` and/or
   `src/configs/strict.ts`.
4. Add tests in `src/rules/__tests__/<rule-name>.test.ts`. Run them with
   `pnpm jest packages/stylelint-plugin-wonder-blocks`.
5. Add docs in `docs/<rule-name>.md`, add the rule to the table in
   `README.md`, and add a Storybook page in
   `__docs__/tools/stylelint-plugin-wonder-blocks/<rule-name>.mdx`.
6. Add an example in `demo/src/<rule-name>-example.module.css`.

If the rule matches an ESLint rule in `@khanacademy/eslint-plugin-wonder-blocks`,
use the same rule name and message so the policy is the same in JS and CSS.

### Helpful resources

- [Writing Stylelint plugins](https://stylelint.io/developer-guide/plugins)
- [Writing Stylelint rules](https://stylelint.io/developer-guide/rules)
- [PostCSS API](https://postcss.org/api/)
- [postcss-value-parser](https://github.com/TrySound/postcss-value-parser)

## Tests and Stylelint's ES modules

Stylelint 17+ is published as ES modules only, which Jest 29 can't load. The
Jest config maps `stylelint` to `config/jest/stylelint.shim.js`, which loads
it with Node's own `require()` instead.

## Demo

The `demo/` directory contains a sample project for verifying that rules work
as expected. See [`demo/README.md`](demo/README.md) for setup and usage instructions.

## Package exports

Stylelint loads plugins and configs with Node's `import()`. Each entry in
`exports` has a `node` condition that points to the CommonJS build, so that
Node doesn't try to load the ES module build (`dist/es`), which isn't marked
as `"type": "module"`. Bundlers still use the `import` condition.
