#!/usr/bin/env -S node -r @swc-node/register
/**
 * Check the built CSS in every package's `dist` folder for at-rules that
 * should have been resolved at build time.
 *
 * The PostCSS pipeline in `postcss.config.cjs` inlines `@import`s of shared
 * styles (postcss-import) and expands mixins (`@csstools/postcss-mixins`). If
 * either step silently fails, the published CSS would contain a literal
 * `@import`/`@apply` that consumers can't resolve, and styles like the focus
 * ring would be dropped without any error.
 *
 * This script should be run after `pnpm build`. It parses each
 * `packages/*\/dist/**\/*.css` file and exits with a non-zero status code if
 * any `@apply`, `@mixin`, `@define-mixin` or `@import` rule remains. Only real
 * at-rules are checked, so mentions of these names in comments (such as the
 * mixin file's doc comment) are ignored.
 */
import * as fs from "fs";
import * as path from "path";
import * as fglob from "fast-glob";
import postcss from "postcss";

const rootDir = path.join(__dirname, "..");
const packagesDir = path.join(rootDir, "packages");

const DISALLOWED_AT_RULES = new Set([
    "apply",
    "mixin",
    "define-mixin",
    "import",
]);

const cssFiles = fglob.sync("*/dist/**/*.css", {
    cwd: packagesDir,
    onlyFiles: true,
    ignore: ["**/node_modules/**"],
});

if (cssFiles.length === 0) {
    // eslint-disable-next-line no-console -- CLI output
    console.error(
        "No dist CSS files found. Run `pnpm build` before this check.",
    );
    process.exit(1);
}

let foundErrors = false;
for (const file of cssFiles) {
    const filePath = path.join(packagesDir, file);
    const root = postcss.parse(fs.readFileSync(filePath, "utf8"), {
        from: filePath,
    });
    root.walkAtRules((atRule) => {
        if (DISALLOWED_AT_RULES.has(atRule.name)) {
            foundErrors = true;
            const line = atRule.source?.start?.line ?? "?";
            // eslint-disable-next-line no-console -- CLI output
            console.error(
                `packages/${file}:${line}: unexpanded \`@${atRule.name} ${atRule.params}\``,
            );
        }
    });
}

if (foundErrors) {
    // eslint-disable-next-line no-console -- CLI output
    console.error(
        "\nFound at-rules in dist CSS that should have been resolved at " +
            "build time. Check that `postcss.config.cjs` inlines the " +
            "`@import` and expands the mixin.",
    );
    process.exit(1);
}

// eslint-disable-next-line no-console -- CLI output
console.log(`Checked ${cssFiles.length} dist CSS files: OK`);
