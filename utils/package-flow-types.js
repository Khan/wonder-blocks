/**
 * Packages flow types with build files.
 *
 * Generates dist/index.js.flow in each package which exports everything within
 * index.js.  Published npm packages need to include all source files for the
 * flow types to work in projects that consume the packages.
 */
const path = require("path");
const fs = require("fs");

const packages = fs.readdirSync(path.join(__dirname, "../packages"));

for (const pkg of packages) {
    // eslint-disable-next-line no-console
    console.log(`copying flow files in ${pkg}`);
    const filename = path.join(
        __dirname,
        "../packages",
        pkg,
        "dist",
        "index.js.flow",
    );
    const contents = ["// @flow", 'export * from "../index.js";'].join("\n");
    fs.writeFileSync(filename, contents, "utf8");
}
