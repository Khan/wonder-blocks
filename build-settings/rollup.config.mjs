/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-commonjs */
import fs from "fs";
import path from "path";
import {nodeExternals} from "rollup-plugin-node-externals";
import swc from "@rollup/plugin-swc";
import resolve from "@rollup/plugin-node-resolve";

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
            swc({
                swc: {
                    swcrc: true,
                    minify: true,
                    // We do _not_ specify "env" here (a la @babel/preset-env)
                    // because our TypeScript compiler "target" is set to ES2021
                    // which is compatible with all of Khan Academy's supported
                    // browsers _and_ will protect us against using APIs that
                    // aren't supported in this browser list).
                    // "env": {...}
                },
                exclude: "node_modules/**",
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
