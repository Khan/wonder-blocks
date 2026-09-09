/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-commonjs */
import fs from "fs";
import path from "path";
import {nodeExternals} from "rollup-plugin-node-externals";
import swc from "@rollup/plugin-swc";
import resolve from "@rollup/plugin-node-resolve";

/**
 * Entry points a package builds in addition to `src/index.ts`, keyed by
 * package name. Each one is a module under `src/` (without its extension) and
 * needs a matching subpath in that package's `exports` map.
 */
const ADDITIONAL_ENTRY_POINTS = {
    // The English source of Wonder Blocks' own strings, imported by
    // translation tooling rather than by app code, so it must be reachable
    // without pulling in React and every component.
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
