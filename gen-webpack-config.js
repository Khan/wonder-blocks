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
        // TODO(kevinb): build both dev and prod
        mode: "development",
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
