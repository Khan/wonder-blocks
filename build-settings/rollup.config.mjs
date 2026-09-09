/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-commonjs */
import fs from "fs";
import path from "path";
import {nodeExternals} from "rollup-plugin-node-externals";
import swc from "@rollup/plugin-swc";
import resolve from "@rollup/plugin-node-resolve";

/**
 * Extra entry points per package, as module names under `src/`. Each needs a
 * matching subpath in that package's `exports` map to be importable.
 */
const ADDITIONAL_ENTRY_POINTS = {
    // Read by translation tooling, so it has to be importable without React.
    "wonder-blocks-core": ["strings"],
};

const createConfig = (pkgName, entryPoint) => {
    const packageJsonPath = path.join("packages", pkgName, "package.json");
    if (!fs.existsSync(packageJsonPath)) {
        return null;
    }

    const extensions = [".js", ".jsx", ".ts", ".tsx"];

    return {
        output: [
            {
                file: `packages/${pkgName}/dist/es/${entryPoint}.js`,
                format: "esm",
            },
            // TODO(FEI-5030): Stop building CJS modules
            {
                file: `packages/${pkgName}/dist/${entryPoint}.js`,
                format: "cjs",
            },
        ],
        input: `packages/${pkgName}/src/${entryPoint}.ts`,
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

export default fs
    .readdirSync("packages")
    .flatMap((pkgName) =>
        ["index", ...(ADDITIONAL_ENTRY_POINTS[pkgName] ?? [])].map(
            (entryPoint) => createConfig(pkgName, entryPoint),
        ),
    )
    .filter(Boolean);
