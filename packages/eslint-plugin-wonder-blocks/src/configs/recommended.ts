export default {
    plugins: ["@khanacademy/wonder-blocks"],
    rules: {
        "@khanacademy/wonder-blocks/no-invalid-bodytext-children": "error",
        // require-logical-properties-for-rtl is intentionally not enabled here yet.
        // It will be turned on in a follow-up PR once WB's existing violations
        // are auto-fixed via `eslint --fix` as part of CLASS-14218
    },
};
