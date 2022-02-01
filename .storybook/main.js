const path = require("path");
const webpack = require("webpack");

module.exports = {
    stories: ["../packages/**/*.stories.@(js|mdx)"],
    addons: [
        // Includes core addons (controls, docs, actions, viewport, backgrounds)
        "@storybook/addon-essentials",
        // For accessibility linting
        "@storybook/addon-a11y",
        // To link a component with the Figma spec
        "storybook-addon-designs",
    ],
    reactOptions: {
        fastRefresh: true,
    },
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
                resource.request = resource.request.replace(
                    wbRegex,
                    path.resolve(__dirname, "../packages/wonder-blocks$1/src"),
                );
            }),
        );

        // Return the altered config
        return config;
    },
};
