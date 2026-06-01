export default {
    plugins: ["@khanacademy/wonder-blocks"],
    rules: {
        "@khanacademy/wonder-blocks/no-invalid-bodytext-children": "error",
        // require-logical-properties-for-rtl is available in the plugin but
        // intentionally not enabled in the recommended config. It was released
        // without a timely integration plan for consumers and caused widespread
        // failures. It will be re-enabled here once a migration path is ready.
        // To opt in now: "@khanacademy/wonder-blocks/require-logical-properties-for-rtl": "error"
    },
};
