/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-commonjs */
import crypto from "crypto";
import fs from "fs";
import path from "path";
import {nodeExternals} from "rollup-plugin-node-externals";
import swc from "@rollup/plugin-swc";
import resolve from "@rollup/plugin-node-resolve";
import styles from "rollup-plugin-styler";

// Produce kebab-cased hashed selectors (`wb-<name>-<local>-<hash>`) instead
// of styler's default, which routes the placeholder string through
// `@rollup/pluginutils`'s `makeLegalIdentifier` and camel-cases away the
// dashes. Hash is content-derived so the value stays stable across builds.
const generateScopedName = (local, file, css) => {
    const {base, name} = path.parse(file);
    // `path.parse("icon.module.css").name` is `"icon.module"`; strip the
    // `.module` suffix so selectors read as `wb-<component>-<local>-<hash>`
    // (an embedded dot would otherwise render as a compound class anyway).
    const safeName = name.replace(/\.module$/, "");
    const hash = crypto
        .createHash("sha256")
        .update(`${base}:${css}`)
        .digest("hex")
        .slice(0, 8);
    return `wb-${safeName}-${local}-${hash}`;
};

// Recursively check whether a package contains any `*.module.css` files
// in its `src/` tree. Used to decide whether the package's JS bundle needs
// a side-effect import of the extracted `dist/index.css`, so consumers
// installing via npm don't have to wire `@khanacademy/wonder-blocks-*/css`
// themselves.
const hasCssModules = (pkgName) => {
    const srcDir = path.join("packages", pkgName, "src");
    if (!fs.existsSync(srcDir)) return false;
    const entries = fs.readdirSync(srcDir, {recursive: true});
    return entries.some(
        (entry) => typeof entry === "string" && entry.endsWith(".module.css"),
    );
};

const createConfig = (pkgName) => {
    const packageJsonPath = path.join("packages", pkgName, "package.json");
    if (!fs.existsSync(packageJsonPath)) {
        return null;
    }

    const extensions = [".js", ".jsx", ".ts", ".tsx"];
    const cssSideEffect = hasCssModules(pkgName);

    return {
        output: [
            {
                file: `packages/${pkgName}/dist/es/index.js`,
                format: "esm",
                // Single CSS asset per package, regardless of how many
                // `*.module.css` files were imported. Authoring layer-wrap
                // happens in postcss.config.cjs (`@layer shared`).
                assetFileNames: "index.css",
                // Side-effect import of the extracted CSS so npm consumers
                // get styles automatically when they import the package.
                intro: cssSideEffect ? 'import "./index.css";' : "",
            },
            // TODO(FEI-5030): Stop building CJS modules
            {
                file: `packages/${pkgName}/dist/index.js`,
                format: "cjs",
                assetFileNames: "index.css",
                intro: cssSideEffect ? 'require("./index.css");' : "",
            },
        ],
        input: `packages/${pkgName}/src/index.ts`,
        plugins: [
            // PostCSS + CSS Modules. Reads the root `postcss.config.cjs`
            // chain (postcss-import → @csstools/postcss-mixins →
            // wrap-in-layer) and hashes class names deterministically so
            // they round-trip from Vite (Storybook) to Rollup (published
            // dist) for the same source.
            styles({
                mode: "extract",
                modules: {
                    // Embeds the source file `[name]` + the local class
                    // `[local]` and an 8-char content hash. Round-trips
                    // deterministically across builds and stays readable
                    // in DevTools.
                    generateScopedName,
                },
                sourceMap: true,
            }),
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
