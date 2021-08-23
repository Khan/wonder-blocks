module.exports = {
    stories: ["../packages/**/*.stories.js"],
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
};
