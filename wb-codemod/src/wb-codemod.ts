/* eslint-disable no-console */
import path from "path";
import chalk from "chalk";
import jscodeshift from "jscodeshift/src/Runner";

type RunOptions = {
    /**
     * Whether to dry run the codemod.
     *
     * If true, the codemod will not be applied in the files, but the
     * transformed code will be printed.
     */
    dryRun?: boolean;
    /**
     * Whether to print the output of the codemod.
     */
    print?: boolean;
};

/**
 * Runs jscodeshift on the given transform file (codemod) and file paths.
 */
export async function run(
    transformFileName: string,
    filePaths: Array<string>,
    options: RunOptions,
) {
    const jsCodemodsDir = path.resolve(__dirname, "../transforms");
    // Transform path
    const transformFile = path.join(jsCodemodsDir, transformFileName + ".ts");

    console.log(
        chalk.cyan(`Transforming ${transformFileName} in: ${filePaths}...`),
    );

    try {
        const result = await jscodeshift.run(transformFile, filePaths, {
            dry: options.dryRun || false,
            print: options.print || false,
            verbose: 2,
            babel: true,
            extensions: "js,jsx,ts,tsx",
            parser: "tsx",
            runInBand: true,
            silent: false,
            ignorePattern: ["**/node_modules/**", "**/dist/**"],
            // Allows to format the transformed code.
            printOptions: {
                objectCurlySpacing: false,
            },
        });

        console.log(result);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
