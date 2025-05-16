#!/usr/bin/env -S node -r @swc-node/register
/**
 * Merge all the CSS variables from all themes into a single CSS file.
 *
 * This script should be run after `pnpm build`.
 */
import * as fs from "fs";
import * as path from "path";
import * as fglob from "fast-glob";

const rootDir = path.join(__dirname, "..");
const packagesDir = path.join(rootDir, "packages");

// Find all the css files in the packages dist directories.
const cssFiles = fglob.sync("**/vars.css", {
    cwd: packagesDir,
    onlyFiles: true,
    // Avoid scanning node_modules to not include interdependency CSS files.
    ignore: ["**/node_modules/**"],
});

let allContent = "";

// Scan each one for any imports of types from source.
for (const cssFile of cssFiles) {
    allContent += fs.readFileSync(path.join(packagesDir, cssFile), "utf-8");
}

// Merge all the CSS variables into a single file
const dir = path.resolve("packages/wonder-blocks-tokens", "./dist/css");

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const indexFile = path.resolve(dir, "index.css");

if (fs.existsSync(indexFile)) {
    // clear the file if it exists
    fs.writeFileSync(indexFile, "");
}

// Generate the output inside dist/css/index.css
fs.writeFileSync(indexFile, allContent, {
    flag: "w+",
});

// eslint-disable-next-line no-console
console.log("✅ MERGED CSS variables generated successfully in:", indexFile);
