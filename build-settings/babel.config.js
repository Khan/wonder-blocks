/* eslint-disable import/no-commonjs */
module.exports = (api) => {
    const presets = [
        "@babel/preset-typescript",

        [
            /**
             * We compile for browsers that support ES Modules
             */
            "@babel/env",
            {
                bugfixes: true,
                corejs: "3.29",
                // Imports require polyfills in those modules
                // that actual use them.
                useBuiltIns: "usage",
            },
        ],

        /**
         * Compile JSX to React.createElement()
         * https://babeljs.io/docs/en/babel-preset-react
         */
        "@babel/react",
    ];

    const plugins = [];

    if (api.env("test")) {
        // Convert dynamic imports to synchronous requires.  This isn't
        // needed in production because webpack converts dynamic
        // imports for us.
        plugins.push("dynamic-import-node");
    } else {
        // If we're building for non-test then we want to transform the babel
        // runtime stuff so that it's all included from a single shared module.
        // This helps to cut down on the code repetition and save bytes.
        plugins.push([
            "@babel/plugin-transform-runtime",
            {
                corejs: false,
                helpers: true,
                regenerator: false,
            },
        ]);
    }

    return {
        presets,
        plugins,
    };
};
