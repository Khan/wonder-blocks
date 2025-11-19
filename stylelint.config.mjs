/** @type {import("stylelint").Config} */
export default {
    extends: ["stylelint-config-standard"],
    plugins: ["stylelint-value-no-unknown-custom-properties"],
    rules: {
        // Standard config overrides
        "custom-property-pattern": null,
        "selector-class-pattern": "^[a-z]+([A-Z][a-z0-9]+)*$",
        // Custom plugins
        "csstools/value-no-unknown-custom-properties": [
            true,
            {
                importFrom: [
                    "./packages/wonder-blocks-tokens/dist/css/index.css",
                ],
            },
        ],
    },
};
