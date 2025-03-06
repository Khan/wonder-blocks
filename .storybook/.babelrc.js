/**
 * Storybook doesn't seem to like the "exports a function" style of babel
 * config. And it pics up our root .babelrc.js file that is added to workaround
 * jest. So, we need to provide its own.
 *
 * We should remove this when jest is fixed.
 * See FEI-4139 in Jira.
 */
const babelConfig = require("../build-settings/babel.config");

const config = babelConfig({
    env: () => false,
});

module.exports = {
    ...config,
    plugins: [
        ...config.plugins,
        // NOTE(kevinb): `plugin-transform-class-properties` must come before
        // `plugin-transform-classes`.
        ["@babel/plugin-transform-class-properties", {loose: true}],
        ["@babel/plugin-transform-classes", {loose: true}],
        // NOTE(kevinb): these are here just to quiet warnings about these
        // plugins not using `loose: true`.
        ["@babel/plugin-transform-private-property-in-object", {loose: true}],
        ["@babel/plugin-transform-private-methods", {loose: true}],
    ],
};
