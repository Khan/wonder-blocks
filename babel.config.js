/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable import/no-commonjs */
/**
 * HACK(somewhatabstract):
 * Jest looks for the babel config in the cwd of the project and as such we
 * need a file to tell it where the config really lies or it would use it.
 */
module.exports = require("./build-settings/babel.config");
