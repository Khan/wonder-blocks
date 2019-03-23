/* eslint-disable import/no-commonjs */
module.exports = {
    presets: ["@babel/typescript", "@babel/preset-react", "@babel/preset-env"],
    plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-proposal-export-default-from",
        "babel-plugin-dynamic-import-node",
    ],
    env: {
        test: {
            presets: [
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
        },
    },
};
