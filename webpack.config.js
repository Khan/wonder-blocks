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
    const pkgJson = require(path.join(subPkgRoot, "./package.json"));
    const pkgDeps = pkgJson.dependencies
        ? Object.keys(pkgJson.dependencies)
        : [];
    const pkgPeerDeps = pkgJson.peerDependencies
        ? Object.keys(pkgJson.peerDependencies)
        : [];

    return {
        entry: path.join(subPkgRoot, "index.js"),
        output: {
            libraryTarget: "commonjs2",
            filename: path.relative(
                __dirname,
                path.join(subPkgRoot, "dist/index.js"),
            ),
            path: path.join(__dirname),
        },
        externals: [...pkgPeerDeps, pkgDeps],
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
