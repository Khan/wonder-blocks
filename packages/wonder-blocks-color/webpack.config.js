const fs = require("fs");
const genWebpackConfig = require("../../gen-webpack-config.js");

module.exports = genWebpackConfig(__dirname);
