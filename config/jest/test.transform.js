const babelJest = require("babel-jest");

const babelConfig = require("../../build-settings/babel.config.js")({
    env: () => true,
});

module.exports = babelJest.createTransformer(babelConfig);
