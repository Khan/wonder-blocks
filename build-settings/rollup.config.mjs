/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-commonjs */
import fs from "fs";
import path from "path";
import {nodeExternals} from "rollup-plugin-node-externals";
import {babel} from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
// eslint-disable-next-line import/extensions
import makeBabelConfig from "./babel.config.js";

const {presets, plugins} = makeBabelConfig({env: () => false});

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
        // We're using `builtIns: "usage"` with @babel/preset-env.
        // This results in individual modules being imported from
        // core-js directly.  `autoExternal` doesn't know how to
        // deal with this so we manually externalize these imports.
        external: [/core-js/],
        plugins: [
            babel({
                presets,
                plugins,
                exclude: "node_modules/**",
                babelHelpers: "runtime",
                comments: false,
                extensions,
            }),
            resolve({
                browser: true,
                extensions,
            }),
            nodeExternals({
                packagePath: `packages/${pkgName}/package.json`,
            }),
        ],
    };
};

export default fs.readdirSync("packages").map(createConfig).filter(Boolean);
