/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable import/no-commonjs */

// Returns the preset-env `targets` configuration object for the environment
// being currently built.
const presetEnvTargets = (api) => {
    // NOTE(jeremy). We have two concepts of env in our webpack/babel land.
    // * NODE_ENV is always either "development" or "production" and is usually
    //   set by the various package.json scripts using `env NODE_ENV=...`.
    // * ENV (passed into webpack.common.js can be "prod", "dev", or "test").
    //   However, "ENV" doesn't get passed automatically into Babel, so we pass
    //   it manually from our webpack configs to Babel via the `babel-loader`
    //   options configuration. (eg. `{options: { caller: name: <name> } }`)
    //
    // This means we have to check in different places to decide what `targets`
    // configuration to return
    // NOTE: In some environments (like Jest), `api.caller` is undefined! o_O

    if (api.env("test")) {
        return {node: "current"};
    }

    /**
     * We compile for browsers that support ES Modules
     */
    return {esmodules: true};
};

module.exports = (api) => {
    const presets = [
        "@babel/preset-typescript",

        [
            /**
             * We compile for browsers that support ES Modules
             */
            "@babel/env",
            {
                targets: presetEnvTargets(api),
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
