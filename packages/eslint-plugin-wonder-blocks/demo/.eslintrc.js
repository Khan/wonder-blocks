module.exports = {
    root: true,
    plugins: ["@khanacademy/wonder-blocks"],
    parser: "@typescript-eslint/parser",
    rules: {
        "@khanacademy/wonder-blocks/no-custom-tab-role": "error",
    },
};
