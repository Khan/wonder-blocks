/**
 * HACK(somewhatabstract): Due to https://github.com/facebook/jest/issues/11741,
 * we need to have this file, or updating inline snapshots can fail rather
 * cryptically.
 *
 * We should remove this when jest is fixed.
 * See FEI-4139 in Jira.
 */
module.exports = require("./build-settings/babel.config.js");
