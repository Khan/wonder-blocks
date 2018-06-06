const flowCopySource = require("flow-copy-source");
const path = require("path");
const fs = require("fs");

const packages = fs.readdirSync(path.join(__dirname, "../packages"));

for (const pkg of packages) {
    // eslint-disable-next-line
    console.log(`copying flow files in ${pkg}`);
    flowCopySource(
        [path.join(__dirname, "../packages", pkg)],
        path.join(__dirname, "../packages", pkg, "dist"),
        {
            ignore: ["*.test.js", "**/dist/**"],
        },
    );
}
