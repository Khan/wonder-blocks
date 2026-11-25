import * as fs from "node:fs";
import * as path from "node:path";

import type {AcceptedPlugin, ProcessOptions} from "postcss";

import {findUnexpandedAtRules} from "../find-unexpanded-at-rules";

// Load PostCSS and the repo's PostCSS config with Node's own `require`, as the
// build does. Some of the config's plugins are ES modules that Jest 29 can't
// load through its own module system. Jest replaces `createRequire` from
// `require("node:module")`, so get the real one from Node.
const {createRequire} = process.getBuiltinModule("node:module");
const rootDir = path.join(__dirname, "../..");
const nodeRequire = createRequire(path.join(rootDir, "package.json"));

const postcss: (plugins: Array<AcceptedPlugin>) => {
    process: (css: string, options: ProcessOptions) => Promise<{css: string}>;
} = nodeRequire("postcss");
const {plugins}: {plugins: Array<AcceptedPlugin>} = nodeRequire(
    path.join(rootDir, "postcss.config.cjs"),
);

// Only scan each package's `src`: walking the packages' `node_modules`
// (symlinked workspace packages) would loop.
const packagesDir = path.join(rootDir, "packages");
const moduleCssFiles = fs
    .readdirSync(packagesDir)
    .map((pkg) => path.join(packagesDir, pkg, "src"))
    .filter((srcDir) => fs.existsSync(srcDir))
    .flatMap((srcDir) =>
        (fs.readdirSync(srcDir, {recursive: true}) as Array<string>)
            .filter((file) => file.endsWith(".module.css"))
            .map((file) => path.relative(rootDir, path.join(srcDir, file))),
    )
    .sort();

/**
 * Run a CSS Module through the same PostCSS pipeline the build uses
 * (`postcss.config.cjs`), without building the package.
 *
 * This complements `pnpm check:dist-css`, which checks the real build output
 * after `pnpm build`: this test runs in the Jest job, which doesn't build, so
 * it gives faster feedback on a mixin that doesn't expand or an `@import` that
 * `postcss-import` skips. It doesn't cover Rollup-only behavior.
 */
const processModuleCss = async (file: string): Promise<string> => {
    const from = path.join(rootDir, file);
    const result = await postcss(plugins).process(
        fs.readFileSync(from, "utf8"),
        {from},
    );
    return result.css;
};

describe("CSS Modules through the PostCSS pipeline", () => {
    it("finds the CSS Modules to check", () => {
        // Arrange
        const files = moduleCssFiles;

        // Act
        const count = files.length;

        // Assert
        expect(count).toBeGreaterThan(0);
    });

    it.each(moduleCssFiles)(
        "%s has no unexpanded @import, @apply or @mixin",
        async (file) => {
            // Arrange
            const css = await processModuleCss(file);

            // Act
            const unexpanded = findUnexpandedAtRules(css, file);

            // Assert
            expect(unexpanded).toEqual([]);
        },
    );
});
