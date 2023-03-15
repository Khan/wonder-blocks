import {execFileSync} from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as fglob from "fast-glob";

const rootDir = path.join(__dirname, "..");
const files = fglob.sync("packages/wonder-blocks-core/dist/**/*.d.ts", {
    cwd: rootDir,
});

const overrides = fglob.sync("**/*.js.flow", {
    cwd: path.join(rootDir, "build-settings", "overrides"),
});

for (const inFile of files) {
    const outFile = inFile.replace(".d.ts", ".js.flow");

    const outFileRelPath = path.relative("packages", outFile);
    if (overrides.includes(outFileRelPath)) {
        const overridePath = path.join(
            "build-settings",
            "overrides",
            outFileRelPath,
        );
        console.log(`copying\nfrom: ${overridePath}\nto:   ${outFile}`);
        fs.cpSync(
            path.join(rootDir, overridePath),
            path.join(rootDir, outFile),
        );
        continue;
    }

    const args = ["flowgen", inFile, "-o", outFile, "--add-flow-header"];
    const inexact = ["text.d.ts", "view.d.ts"].includes(path.basename(inFile));
    if (!inexact) {
        args.push("--no-inexact");
    }

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
