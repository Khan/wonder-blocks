const path = require("path");

module.exports = {
    entry: "./index.js",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname),
    },
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
