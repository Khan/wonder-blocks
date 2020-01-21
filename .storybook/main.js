module.exports = {
    stories: ["../packages/**/*.stories.js"],
    addons: [
        "@storybook/addon-actions/register",
        "@storybook/addon-backgrounds/register",
        "@storybook/addon-knobs/register",
        "@storybook/addon-viewport/register",
        "storybook-addon-jsx/register",
    ],
};
