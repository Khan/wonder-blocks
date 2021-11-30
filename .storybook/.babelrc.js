/**
 * Storybook doesn't seem to like the "exports a function" style of babel
 * config. And it pics up our root .babelrc.js file that is added to workaround
 * jest. So, we need to provide its own.
 *
 * We should remove this when jest is fixed.
 * See FEI-4139 in Jira.
 */
const babelConfig = require("../build-settings/babel.config.js");
module.exports = babelConfig({
    env: () => false,
});
