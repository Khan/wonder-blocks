/* eslint-disable no-console */
/**
 * Packages flow types with build files.
 *
 * Generates dist/index.js.flow in each package which exports everything within
 * index.js.  Published npm packages need to include all source files for the
 * flow types to work in projects that consume the packages.
 */
const path = require("path");
const fs = require("fs");

console.group("Packaging flow types...");

try {
    const packages = fs.readdirSync(path.join(__dirname, "../packages"));

    for (const pkg of packages) {
        console.log(`copying flow files in ${pkg}`);
        const filename = path.join(
            __dirname,
            "../packages",
            pkg,
            "dist",
            "index.js.flow",
        );
        const contents = ["// @flow", 'export * from "../src/index.js";'].join(
            "\n",
        );
        fs.writeFileSync(filename, contents, "utf8");
    }
} catch (e) {
    console.error(e);
} finally {
    console.groupEnd();
}
