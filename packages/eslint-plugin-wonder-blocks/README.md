# eslint-plugin-wonder-blocks

`@khanacademy/eslint-plugin-wonder-blocks` is an ESLint plugin that includes
lint rules that encourage correct usage of the Wonder Blocks design system.
It helps catch common mistakes and guides developers toward using the right
Wonder Blocks APIs.

## Installation

1. Install the package:

    ```sh
    pnpm add -D @khanacademy/eslint-plugin-wonder-blocks
    ```

2. Add the plugin to your ESLint configuration and extend the `strict` or
`recommended` config from the plugin:

    ```js
    // .eslintrc.js
    module.exports = {
        extends: ["plugin:@khanacademy/wonder-blocks/strict"],
    };
    ```

    Or configure specific rules from the plugin:

    ```js
    // .eslintrc.js
    module.exports = {
        plugins: ["@khanacademy/wonder-blocks"],
        rules: {
            "@khanacademy/wonder-blocks/no-custom-tab-role": "error",
        },
    };
    ```

## Config

The plugin provides two configs with different levels:

### `recommended`

Includes rules marked as `recommended`. This includes base rules for using
Wonder Blocks.

```js
// .eslintrc.js
module.exports = {
    extends: ["plugin:@khanacademy/wonder-blocks/recommended"],
};
```

### `strict`

Includes all `recommended` rules plus additional opinionated rules that enforce
stricter Wonder Blocks usage patterns. Intended for projects that want to fully
align with Wonder Blocks best practices.

```js
// .eslintrc.js
module.exports = {
    extends: ["plugin:@khanacademy/wonder-blocks/strict"],
};
```

## Rules

The following shows what rules are enabled in each config:

| Rule | Enabled in `recommended`| Enabled in `strict` |
|------|-------------------------|---------------------|
| [`wonder-blocks/no-custom-tab-role`](docs/no-custom-tab-role.md)|✅|✅|
