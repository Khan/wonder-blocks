/**
 * HACK(somewhatabstract):
 * Jest looks for babel config in the cwd during the transform step so we need
 * to direct it to the real one.
 */
module.exports = require("./build-settings/babel.config.js");
