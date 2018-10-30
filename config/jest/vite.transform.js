/**
 * vite tests require a different babel config b/c vite-server only
 * serves modules using ES6 imports.  This means that we can't
 * transform import statements like we normally do.
 */
const babelJest = require("babel-jest");

const babelConfig = {
    presets: ["@babel/react"],
    plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-transform-modules-commonjs",
        "@babel/plugin-transform-flow-strip-types",
        "@babel/plugin-syntax-dynamic-import",
        "@khanacademy/babel-plugin-vite",
    ],
};

module.exports = babelJest.createTransformer(babelConfig);
