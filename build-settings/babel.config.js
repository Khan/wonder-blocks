/* eslint-disable import/no-commonjs */
module.exports = (api) => {
    const presets = [
        [
            /**
             * We compile for browsers that support ES Modules
             */
            "@babel/env",
            {
                targets: api.env("test")
                    ? {
                          node: "current",
                      }
                    : {
                          esmodules: true,
                      },
                bugfixes: true,
                loose: true,
            },
        ],

        /**
         * Compile JSX to React.createElement()
         * https://babeljs.io/docs/en/babel-preset-react
         */
        "@babel/react",
    ];

    // NOTE: plugins are run first, in order, followed by presets, in reverse order
    const plugins = [
        [
            /**
             * Fixes "Invalid attempt to spread non-iterable instance" errors
             */
            "@babel/plugin-transform-spread",
            {
                loose: true,
            },
        ],

        /**
         * Strip flow types
         * https://babeljs.io/docs/en/babel-plugin-transform-flow-strip-types
         */
        "@babel/plugin-transform-flow-strip-types",

        /**
         * Adds support for the class properties proposal.
         * https://babeljs.io/docs/en/babel-plugin-proposal-class-properties
         */
        [
            "@babel/plugin-proposal-class-properties",
            {
                loose: true,
            },
        ],
    ];

    if (api.env("test")) {
        // Convert dynamic imports to synchronous requires.  This isn't
        // needed in production because webpack converts dynamic
        // imports for us.
        plugins.unshift("dynamic-import-node");
    } else {
        // If we're building for non-test then we want to transform the babel
        // runtime stuff so that it's all included from a single shared module.
        // This helps to cut down on the code repetition and save bytes.
        plugins.unshift([
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
