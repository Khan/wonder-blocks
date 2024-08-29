import * as fs from "fs";
import * as path from "path";
import * as fglob from "fast-glob";
import ignore from "ignore";

const rootDir = path.join(__dirname, "..");
const gitIgnorePath = path.join(rootDir, ".gitignore");
const npmIgnorePath = path.join(rootDir, ".npmignore");

// Now we loop each line of npmIgnore and delete the files that match.
const npmIgnoreContent = fs.readFileSync(npmIgnorePath, "utf-8");
const npmIgnorer = ignore().add(npmIgnoreContent);
const gitIgnoreContent = fs.readFileSync(gitIgnorePath, "utf-8");
const gitIgnorer = ignore().add(gitIgnoreContent);

const packagePaths = fglob.sync("packages/wonder-blocks-*", {
    cwd: rootDir,
    onlyFiles: false,
});

for (const fsPath of packagePaths) {
    const absPath = path.join(rootDir, fsPath);
    if (npmIgnorer.ignores(fsPath) && gitIgnorer.ignores(fsPath)) {
        if (fs.lstatSync(absPath).isDirectory()) {
            fs.rmdirSync(absPath, {recursive: true});
        } else {
            fs.unlinkSync(absPath);
        }
    }
}
