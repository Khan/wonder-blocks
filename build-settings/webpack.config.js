/* eslint-disable import/no-commonjs */
/**
 * This webpack config file return an array of webpack configs, one for each
 * package in the packages/ folder.  This allows a single instance of webpack
 * to build (or watch) all projects.
 */
const fs = require("fs");
const path = require("path");

const babelOptions = require("./babel.config.js")({env: () => false});

const packages = fs
    .readdirSync(path.join(process.cwd(), "packages"))
    .map((dir) => path.join(process.cwd(), "packages", dir));

const genWebpackConfig = function (subPkgRoot) {
    const pkgJson = require(path.join(subPkgRoot, "./package.json"));
    const pkgDeps = pkgJson.dependencies
        ? Object.keys(pkgJson.dependencies)
        : [];
    const pkgPeerDeps = pkgJson.peerDependencies
        ? Object.keys(pkgJson.peerDependencies)
        : [];

    return {
        entry: path.join(subPkgRoot, "src/index.js"),
        output: {
            libraryTarget: "commonjs2",
            filename: path.relative(
                process.cwd(),
                path.join(subPkgRoot, "dist/index.js"),
            ),
            path: path.join(process.cwd()),
        },
        externals: [...pkgPeerDeps, ...pkgDeps],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: babelOptions,
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
