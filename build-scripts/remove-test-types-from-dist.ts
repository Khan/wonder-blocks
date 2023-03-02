import * as fs from "fs";
import * as path from "path";
import * as fglob from "fast-glob";

const rootDir = path.join(__dirname, "..");
const files = fglob.sync("packages/wonder-blocks-*/dist/**/*.test.d.ts", {
    cwd: rootDir,
});

for (const file of files) {
    fs.unlinkSync(path.join(rootDir, file));
}

const dirs = fglob.sync("packages/wonder-blocks-*/dist/**/__tests__", {
    cwd: rootDir,
    onlyFiles: false,
});

for (const dir of dirs) {
    fs.rmdirSync(path.join(rootDir, dir));
}
