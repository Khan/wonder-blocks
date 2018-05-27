/**
 * This file is used by all packages/wonder-blocks-x/webpack.config.js files.
 *
 * It generates an appropriate webpack configuration for each package.  In
 * particular it adds all dependencies from the specific package along with
 * project level dependencies to the list of externals.  This causes webpack
 * to not include those depedencies in the build file it generates.
 */
const path = require("path");

module.exports = function(subPkgRoot) {
    const subPkgJson = require(path.join(subPkgRoot, "./package.json"));
    const subPkgDeps = subPkgJson.dependencies
        ? Object.keys(subPkgJson.dependencies)
        : [];

    const rootPkgJson = require(path.join(subPkgRoot, "../../package.json"));
    const rootPkgDeps = rootPkgJson.dependencies
        ? Object.keys(rootPkgJson.dependencies)
        : [];

    return {
        entry: "./index.js",
        output: {
            libraryTarget: "commonjs2",
            filename: "dist/index.js",
            path: subPkgRoot,
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
    };
};
