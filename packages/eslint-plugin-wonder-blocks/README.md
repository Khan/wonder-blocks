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

2. Add the plugin to your ESLint configuration and enable rules from the plugin:

```js
// .eslintrc.js
module.exports = {
    plugins: ["@khanacademy/wonder-blocks"],
    rules: {
        "@khanacademy/wonder-blocks/no-custom-tab-role": "error",
    },
};
```

## Rules

- [wonder-blocks/no-custom-tab-role](docs/no-custom-tab-role.md)
