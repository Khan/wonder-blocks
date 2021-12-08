/* eslint-disable import/no-commonjs */
/**
 * This webpack config file return an array of webpack configs, one for each
 * package in the packages/ folder.  This allows a single instance of webpack
 * to build (or watch) all projects.
 */
const fs = require("fs");
const path = require("path");

/**
 * We tell babel to build as test output here (targetting node and not as es6)
 * because we use the output in testing and Jest doesn't yet support es6
 * modules.
 */
const babelOptions = require("./babel.config.js")({env: () => true});

const packages = fs
    .readdirSync(path.join(process.cwd(), "packages"))
    .map((dir) => path.join(process.cwd(), "packages", dir));

const genWebpackConfig = function (subPkgRoot) {
    const pkgJsonPath = path.join(subPkgRoot, "package.json");
    if (!fs.existsSync(pkgJsonPath)) {
        return null;
    }

    const pkgJson = require(pkgJsonPath);
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
            /**
             * We explicitly disable concatenation of modules as this causes
             * mangling of the concatenated module exports, which means the
             * React components get odd names that aren't very friendly.
             */
            concatenateModules: false,
            minimize: false,
        },
        node: {process: false},
        mode: "production",
    };
};

module.exports = packages.map(genWebpackConfig).filter(Boolean);
