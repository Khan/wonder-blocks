const fs = require("fs");
const path = require("path");

const packages = fs
    .readdirSync(path.join(__dirname, "packages"))
    .map((dir) => `./packages/${dir}`);

const genWebpackConfig = function(subPkgRoot) {
    const subPkgJson = require(path.join(
        __dirname,
        subPkgRoot,
        "./package.json",
    ));
    const subPkgDeps = subPkgJson.dependencies
        ? Object.keys(subPkgJson.dependencies)
        : [];

    const rootPkgJson = require(path.join(
        __dirname,
        subPkgRoot,
        "../../package.json",
    ));
    const rootPkgDeps = rootPkgJson.dependencies
        ? Object.keys(rootPkgJson.dependencies)
        : [];

    return {
        entry: `./${subPkgRoot}/index.js`,
        output: {
            libraryTarget: "commonjs2",
            filename: "dist/index.js",
            path: path.join(__dirname, subPkgRoot),
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
