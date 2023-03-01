/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-commonjs */
import fs from "fs";
import path from "path";
import autoExternal from "rollup-plugin-auto-external";
import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";

const {presets, plugins} = require("./babel.config")({env: () => false});

const createConfig = (pkgName) => {
    const packageJsonPath = path.join("packages", pkgName, "package.json");
    if (!fs.existsSync(packageJsonPath)) {
        return null;
    }

    const extensions = [".js", ".jsx", ".ts", ".tsx"];

    return {
        output: [
            {
                file: `packages/${pkgName}/dist/es/index.js`,
                format: "esm",
            },
            // TODO(FEI-5030): Stop building CJS modules
            {
                file: `packages/${pkgName}/dist/index.js`,
                format: "cjs",
            },
        ],
        input: `packages/${pkgName}/src/index.ts`,
        plugins: [
            babel({
                presets,
                plugins,
                exclude: "node_modules/**",
                runtimeHelpers: true,
                comments: false,
                extensions,
            }),
            resolve({
                browser: true,
                extensions,
            }),
            autoExternal({
                packagePath: `packages/${pkgName}/package.json`,
            }),
        ],
    };
};

export default fs.readdirSync("packages").map(createConfig).filter(Boolean);
