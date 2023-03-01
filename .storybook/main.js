const path = require("path");
const webpack = require("webpack");

module.exports = {
    stories: [
        "../__docs__/**/*.stories.@(ts|tsx|mdx)",
    ],
    addons: [
        // Includes core addons (controls, docs, actions, viewport, backgrounds)
        "@storybook/addon-essentials",
        // For accessibility linting
        "@storybook/addon-a11y",
        // To link a component with the Figma spec
        "storybook-addon-designs",
        // To enable interaction testing
        "@storybook/addon-interactions",
    ],
    babel: async (options) => {
        console.log("babel options =", options);
        return {
            ...options,
            plugins: [
                ...options.plugins,
                // NOTE(kevinb): `plugin-proposal-class-properties` must come before
                // `plugin-transform-classes`.
                ["@babel/plugin-proposal-class-properties", {loose: true}],
                ["@babel/plugin-transform-classes", {loose: true}],
                // NOTE(kevinb): these are here just to quiet warnings about these
                // plugins not using `loose: true`.
                ["@babel/plugin-proposal-private-property-in-object", {loose: true}],
                ["@babel/plugin-proposal-private-methods", {loose: true}],
            ]
        };
    },
    features: {
        // Enables playback controls
        interactionsDebugger: true,
    },
    reactOptions: {
        fastRefresh: true,
    },
    staticDirs: ["../static"],
    // Overriding the default webpack config to allow using storybook with our
    // monorepo.
    // See https://storybook.js.org/docs/react/configure/webpack
    webpackFinal: async (config, {configType}) => {
        const wbRegex = /^@khanacademy\/wonder-blocks(-.*)$/;
        // Aliases for internal wonder-blocks packages
        config.plugins.push(
            new webpack.NormalModuleReplacementPlugin(wbRegex, function (
                resource,
            ) {
                // Replace the module with a direct reference to the
                // internal folder.
                // $1 is the unique package name, e.g. cell, birthday-picker
                resource.request = resource.request
                    .replace(
                        wbRegex,
                        path.resolve(__dirname, "../packages/wonder-blocks$1/src"),
                    );
            }),
        );

        // Return the altered config
        return config;
    },
};
