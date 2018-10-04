import fs from "fs";
import autoExternal from "rollup-plugin-auto-external";
import babel from "rollup-plugin-babel";

const {presets, plugins} = require("./babel.config.js");

const createConfig = (pkgName) => ({
    output: {
        file: `packages/${pkgName}/dist/es/index.js`,
        format: "esm",
    },
    input: `packages/${pkgName}/index.js`,
    plugins: [
        babel({
            presets,
            plugins,
            exclude: "node_modules/**",
        }),
        autoExternal({
            packagePath: `packages/${pkgName}/package.json`,
        }),
    ],
});

export default fs.readdirSync("packages").map(createConfig);
