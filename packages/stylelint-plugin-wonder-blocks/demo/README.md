# stylelint-plugin-wonder-blocks Demo

This directory is a standalone project used to manually verify that the
`stylelint-plugin-wonder-blocks` rules and configs work correctly end-to-end.

The demo project is configured with the `strict` config from
`stylelint-plugin-wonder-blocks` (see `stylelint.config.mjs`).

## Why this exists

Unit tests for the rules run against inline CSS. This demo project lets you
confirm that the rules also fire correctly when the plugin is consumed as a
real dependency, through its published configs, and run against actual CSS
module files.

## Usage

From the repo root, build the plugin first, then run Stylelint inside the demo:

```sh
# 1. Build the plugin
pnpm build

# 2. Install demo dependencies
cd packages/stylelint-plugin-wonder-blocks/demo && pnpm install

# 3. Run Stylelint on the demo source files
pnpm lint
```

You should see Stylelint errors in the example files. The command exits with
an error code because the examples include invalid code on purpose.

## Adding a new rule demo

1. Create a new file in `src/` following the pattern
   `<rule-name>-example.module.css`.
2. Add valid and invalid usages with `/* ✅ Valid */` / `/* ❌ Invalid */`
   comments.
3. Make sure the rule is enabled in the `strict` config.
