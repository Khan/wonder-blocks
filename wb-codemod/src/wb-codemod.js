/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-commonjs */
const path = require("path");
const chalk = require("chalk");
const jscodeshift = require("jscodeshift/src/Runner");

/**
 * Runs jscodeshift on the given transform file (codemod) and file paths.
 *
 * @param {string} transformFileName The name of the transform file to use.
 * @param {string[]} filePaths The file paths to transform.
 * @param {object} options The options to pass to jscodeshift.
 *
 * @returns {Promise<void>} A promise that resolves when the transformation is
 * complete.
 */
async function run(transformFileName, filePaths, options) {
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
            runInBand: !!options.dryRun,
            silent: false,
            ignorePattern: ["**/node_modules/**", "**/dist/**"],
            // Allows to format the transformed code.
            printOptions: {
                objectCurlySpacing: false,
                quote: "double",
                trailingComma: true,
            },
        });

        console.log(result);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

module.exports = {
    run,
};
