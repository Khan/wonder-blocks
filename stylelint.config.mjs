/** @type {import("stylelint").Config} */
export default {
    extends: ["stylelint-config-standard"],
    plugins: ["stylelint-value-no-unknown-custom-properties"],
    rules: {
        "custom-property-pattern": null,
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
