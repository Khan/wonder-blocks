import {execFileSync} from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as fglob from "fast-glob";

const rootDir = path.join(__dirname, "..");
const files = fglob.sync("packages/wonder-blocks-*/dist/**/*.d.ts", {
    cwd: rootDir,
});

for (const inFile of files) {
    const outFile = inFile.replace(".d.ts", ".js.flow");
    const args = ["flowgen", inFile, "-o", outFile, "--add-flow-header"];

    try {
        execFileSync("yarn", args, {cwd: rootDir});
        console.log(`✅ wrote: ${outFile}`);

        // `flowgen` sometimes outputs code that uses `mixins` instead of `extends`
        // so we do some post-processing on the files to clean that up.
        const contents = fs.readFileSync(path.join(rootDir, outFile), "utf-8");
        if (contents.includes(" mixins ")) {
            console.log("replacing 'mixins' with 'extends'");
            fs.writeFileSync(
                path.join(rootDir, outFile),
                contents.replace(/ mixins /g, " extends "),
                "utf-8",
            );
        }
    } catch (e) {
        console.log(`❌ error processing: ${inFile}: ${e}`);
    }
}
