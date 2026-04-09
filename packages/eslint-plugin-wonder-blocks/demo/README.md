# eslint-plugin-wonder-blocks Demo

This directory is a standalone project used to manually verify that the
`eslint-plugin-wonder-blocks` rules work correctly end-to-end.

## Why this exists

Unit tests for ESLint rules run against synthetic code strings. This demo
project lets you confirm that rules also fire correctly when the plugin is
consumed as a real dependency and run against actual source files.

## Usage

From the repo root, build the plugin first, then run ESLint inside the demo:

```sh
# 1. Build the plugin
pnpm build

# 2. Install demo dependencies
cd packages/eslint-plugin-wonder-blocks/demo && pnpm install

# 3. Run ESLint on the demo source files
pnpm lint
```

You should see ESLint errors in the example files.

> **Note:** The demo directory is listed in the repo's `.eslintignore`, so lint
> errors in these files will **not** appear in your IDE and will **not** fail
> the root's `pnpm lint` script or the pre-push hook. This is intentional — the
> demo files are meant to contain invalid code to verify rule output. To see the
> errors, run `pnpm lint` from within this directory directly (step 3 above).

## Adding a new rule demo

1. Create a new file in `src/` following the pattern `<rule-name>-example.tsx`.
2. Add valid and invalid usages with `// ✅ Valid` / `// ❌ Invalid` comments.
3. Enable the rule in `.eslintrc.js`.
