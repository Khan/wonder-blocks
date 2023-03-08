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
        let contents = fs.readFileSync(path.join(rootDir, outFile), "utf-8");
        if (contents.includes(" mixins ")) {
            contents = contents.replace(/ mixins /g, " extends ");
            console.log("replacing 'mixins' with 'extends'");
        }
        if (contents.includes("React.Element<>")) {
            contents = contents.replace(
                /React.Element<>/g,
                "React.Element<any>",
            );
            console.log(
                "replacing 'React.Element<>' with 'React.Element<any>'",
            );
        }
        if (contents.includes("JSX.LibraryManagedAttributes")) {
            contents = contents.replace(
                /JSX\.LibraryManagedAttributes<\s+([^,]+),\s+React\.ComponentProps<[^>]+>\s+>/gm,
                (substr, group) => {
                    const replacement = `React.ElementConfig<${group}>`;
                    console.log(`replacing '${substr}' with '${replacement}'`);
                    return replacement;
                },
            );
        }
        fs.writeFileSync(path.join(rootDir, outFile), contents, "utf-8");
    } catch (e) {
        console.log(`❌ error processing: ${inFile}: ${e}`);
    }
}
