const babelJest = require("babel-jest");

const babelConfig = require("../../build-settings/babel.config.js");

module.exports = babelJest.createTransformer(babelConfig);
