/**
 * This webpack config file return an array of webpack configs, one for each
 * package in the packages/ folder.  This allows a single instance of webpack
 * to build (or watch) all projects.
 */
const fs = require("fs");
const path = require("path");

const packages = fs
    .readdirSync(path.join(__dirname, "packages"))
    .map((dir) => path.join(__dirname, "packages", dir));

const genWebpackConfig = function(subPkgRoot) {
    const subPkgJson = require(path.join(subPkgRoot, "./package.json"));
    const subPkgDeps = subPkgJson.dependencies
        ? Object.keys(subPkgJson.dependencies)
        : [];

    const rootPkgJson = require(path.join(subPkgRoot, "../../package.json"));
    const rootPkgDeps = rootPkgJson.dependencies
        ? Object.keys(rootPkgJson.dependencies)
        : [];

    return {
        entry: path.join(subPkgRoot, "index.js"),
        output: {
            libraryTarget: "commonjs2",
            filename: "dist/index.js",
            path: path.join(subPkgRoot),
        },
        externals: [...rootPkgDeps, ...subPkgDeps],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
            ],
        },
        optimization: {
            minimize: false,
        },
        node: {process: false},
        mode: "production",
    };
};

module.exports = packages.map(genWebpackConfig);
