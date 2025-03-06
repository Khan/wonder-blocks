#!/usr/bin/env -S node -r @swc-node/register
/**
 * Check type definition files for anything that doesn't look right.
 *
 * If our packages don't export all the types that other packages reference,
 * even indirectly, then their type definitions will import them from the source
 * files instead. Since we don't want to ship source code in every package,
 * we want to guard against this.
 *
 * This script should be run after `pnpm build:types`. It will scan the type
 * definitions of each package for any types that are being incorrectly
 * imported from other the source code of other packages, and flag them,
 * exiting with a non-zero status code if any are found.
 */
import * as fs from "fs";
import * as path from "path";
import * as fglob from "fast-glob";

const rootDir = path.join(__dirname, "..");
const packagesDir = path.join(rootDir, "packages");

// Find all the type definition files in the packages dist directories.
const typeDefinitionFiles = fglob.sync("**/*.d.ts", {
    cwd: packagesDir,
    onlyFiles: true,
});

let foundErrors = false;
// Scan each one for any imports of types from source.
for (const typeDefinitionFile of typeDefinitionFiles) {
    const regexpImportSrc =
        /import\(".+\/(wonder-blocks-.+)\/src\/.+"\)\.([a-zA-Z]+)/g;
    const content = fs.readFileSync(
        path.join(packagesDir, typeDefinitionFile),
        "utf-8",
    );
    const lines = content.split("\n");
    let match;
    for (let line = 0; line < lines.length; line++) {
        while ((match = regexpImportSrc.exec(lines[line]))) {
            foundErrors = true;
            const position = match.index;
            const lineNo = line + 1;
            const refPath = path.join("packages", typeDefinitionFile);
            console.error(`${refPath}:${lineNo}:${position}`);
            console.error(
                `    Incorrectly imported type ${match[2]} from ${match[1]} source`,
            );
            console.error(
                `    Update the package ${match[1]} to export the type ${match[2]}\n`,
            );
        }
    }
}

if (foundErrors) {
    process.exit(1);
}
