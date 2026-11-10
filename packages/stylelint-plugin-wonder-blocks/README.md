# stylelint-plugin-wonder-blocks

`@khanacademy/stylelint-plugin-wonder-blocks` is a [Stylelint](https://stylelint.io/)
plugin that includes lint rules that encourage correct usage of the Wonder
Blocks design system in CSS (including CSS modules). It's the CSS counterpart
of `@khanacademy/eslint-plugin-wonder-blocks`: rules that exist in both plugins
have the same name and behave the same way, so the same policies apply in JS
and CSS.

## Installation

1. Install the package and Stylelint (version 16 or later):

    ```sh
    pnpm add -D stylelint @khanacademy/stylelint-plugin-wonder-blocks
    ```

2. Extend the `strict` or `recommended` config from the plugin in your
Stylelint configuration:

    ```js
    // stylelint.config.mjs
    export default {
        extends: ["@khanacademy/stylelint-plugin-wonder-blocks/strict"],
    };
    ```

    Or configure specific rules from the plugin:

    ```js
    // stylelint.config.mjs
    export default {
        plugins: ["@khanacademy/stylelint-plugin-wonder-blocks"],
        rules: {
            "@khanacademy/wonder-blocks/prefer-semantic-color-over-graphics-palette": true,
        },
    };
    ```

## Config

The plugin provides two configs with different levels:

### `recommended`

Includes rules marked as `recommended`. This includes base rules for using
Wonder Blocks.

```js
// stylelint.config.mjs
export default {
    extends: ["@khanacademy/stylelint-plugin-wonder-blocks/recommended"],
};
```

### `strict`

Includes all `recommended` rules plus additional opinionated rules that enforce
stricter Wonder Blocks usage patterns. Intended for projects that want to fully
align with Wonder Blocks best practices.

```js
// stylelint.config.mjs
export default {
    extends: ["@khanacademy/stylelint-plugin-wonder-blocks/strict"],
};
```

## Rules

Rule names use the `@khanacademy/wonder-blocks/` namespace, the same as the
ESLint plugin, e.g.
`@khanacademy/wonder-blocks/prefer-semantic-color-over-graphics-palette`.

The following shows what rules are enabled in each config:

| Rule | Enabled in `recommended`| Enabled in `strict` |
|------|-------------------------|---------------------|
| [`prefer-semantic-color-over-graphics-palette`](docs/prefer-semantic-color-over-graphics-palette.md)|✅|✅|

## Disabling a rule

Use [Stylelint's disable comments](https://stylelint.io/user-guide/ignore-code)
with the full rule name, and explain why after `--`:

```css
.illustration {
    /* stylelint-disable-next-line @khanacademy/wonder-blocks/prefer-semantic-color-over-graphics-palette -- Illustration artwork; colors stay the same in every theme */
    background-color: var(--wb-graphicsPalette-gray_30);
}
```

## Contributing

See [CONTRIBUTING.md](https://github.com/Khan/wonder-blocks/blob/main/packages/stylelint-plugin-wonder-blocks/CONTRIBUTING.md).
