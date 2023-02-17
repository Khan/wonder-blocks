/* eslint-disable import/no-commonjs */
import fs from "fs";
import path from "path";
import autoExternal from "rollup-plugin-auto-external";
import babel from "rollup-plugin-babel";

const {presets, plugins} = require("./babel.config.js")({env: () => false});

const createConfig = (pkgName) => {
    const packageJsonPath = path.join("packages", pkgName, "package.json");
    if (!fs.existsSync(packageJsonPath)) {
        return null;
    }

    return {
        output: [
            // Used by production code.
            {
                file: `packages/${pkgName}/dist/es/index.js`,
                format: "esm",
            },
            // Used by Flow enums (and possibly things like Jest, Storybook).
            // TODO(FEI-5000): We will be able to only use the esm version once
            // we fully migrate to TypeScript (as we don't have to depend on the
            // flow-enums-runtime package).
            {
                file: `packages/${pkgName}/dist/index.js`,
                format: "cjs",
            },
        ],
        input: `packages/${pkgName}/src/index.js`,
        plugins: [
            babel({
                presets,
                plugins,
                exclude: "node_modules/**",
                runtimeHelpers: true,
                comments: false,
            }),
            autoExternal({
                packagePath: `packages/${pkgName}/package.json`,
            }),
        ],
    };
};

export default fs.readdirSync("packages").map(createConfig).filter(Boolean);
