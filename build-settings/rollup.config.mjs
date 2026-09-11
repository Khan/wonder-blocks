/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-commonjs */
import fs from "fs";
import path from "path";
import {nodeExternals} from "rollup-plugin-node-externals";
import swc from "@rollup/plugin-swc";
import resolve from "@rollup/plugin-node-resolve";

/**
 * What to build for a package, taken from the `source` on each of its
 * `exports` entries, so that adding a subpath is a package.json change rather
 * than a build one. Entries without a `source` — and packages with no
 * `exports` map at all — build `src/index.ts` into `main` and `module`.
 */
const getEntryPoints = (pkgJson) => {
    const fromExports = Object.values(pkgJson.exports ?? {})
        .filter((entry) => entry?.source)
        .map((entry) => ({
            input: entry.source,
            esm: entry.import,
            cjs: entry.require,
        }));

    return fromExports.length > 0
        ? fromExports
        : [{input: "src/index.ts", esm: pkgJson.module, cjs: pkgJson.main}];
};

const createConfig = (pkgName, {input, esm, cjs}) => {
    const extensions = [".js", ".jsx", ".ts", ".tsx"];

    return {
        output: [
            {
                file: path.join("packages", pkgName, esm),
                format: "esm",
            },
            // TODO(FEI-5030): Stop building CJS modules
            {
                file: path.join("packages", pkgName, cjs),
                format: "cjs",
            },
        ],
        input: path.join("packages", pkgName, input),
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

export default fs.readdirSync("packages").flatMap((pkgName) => {
    const packageJsonPath = path.join("packages", pkgName, "package.json");
    if (!fs.existsSync(packageJsonPath)) {
        return [];
    }

    const pkgJson = JSON.parse(fs.readFileSync(packageJsonPath));

    return getEntryPoints(pkgJson).map((entryPoint) =>
        createConfig(pkgName, entryPoint),
    );
});
