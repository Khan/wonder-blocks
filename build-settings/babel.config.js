/* eslint-disable import/no-commonjs */
module.exports = {
    presets: [
        "@babel/preset-flow",
        "@babel/preset-react",
        [
            "@babel/preset-env",
            {
                useBuiltIns: "usage",
                corejs: {
                    version: 3,
                },
            },
        ],
    ],
    plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-proposal-export-default-from",
    ],
    env: {
        test: {
            presets: [
                "@babel/preset-flow",
                "@babel/preset-react",
                [
                    "@babel/preset-env",
                    {
                        targets: {
                            node: true,
                        },
                    },
                ],
            ],
            plugins: ["babel-plugin-dynamic-import-node"],
        },
    },
};
