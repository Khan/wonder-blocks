#!/usr/bin/env -S node -r @swc-node/register
import * as fs from "fs";
import * as path from "path";
import * as fglob from "fast-glob";
import ignore from "ignore";

const rootDir = path.join(__dirname, "..");
const gitIgnorePath = path.join(rootDir, ".gitignore");
const npmIgnorePath = path.join(rootDir, ".npmignore");

// Now we loop each line of npmIgnore and delete the files that match.
// NOTE: We really want to exclude everything listed in the .npmignore file
// but that might include source-controlled files. So, we also check
// the .gitignore file to see if it's matched there as well before we delete
// anything. Ideally, changeset publish will honour the .npmignore file
// and not include those files in the package - if that starts happening,
// we can probably just remove this script.
const npmIgnoreContent = fs.readFileSync(npmIgnorePath, "utf-8");
const npmIgnorer = ignore().add(npmIgnoreContent);
const gitIgnoreContent = fs.readFileSync(gitIgnorePath, "utf-8");
const gitIgnorer = ignore().add(gitIgnoreContent);

const packagePaths = fglob.sync("packages/wonder-blocks-*/**/*", {
    cwd: rootDir,
    onlyFiles: false,
});

for (const fsPath of packagePaths) {
    const absPath = path.join(rootDir, fsPath);
    if (
        fs.existsSync(fsPath) &&
        npmIgnorer.ignores(fsPath) &&
        gitIgnorer.ignores(fsPath)
    ) {
        console.log(`Removing ${fsPath}`);
        fs.rmSync(absPath, {recursive: true});
    }
}
