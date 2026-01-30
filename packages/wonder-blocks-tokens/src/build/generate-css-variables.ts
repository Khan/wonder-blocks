#!/usr/bin/env -S node -r @swc-node/register
import fs from "fs";
import path from "path";
import {THEME_DATA_ATTRIBUTE} from "@khanacademy/wonder-blocks-theming";
import {generateTokens} from "../internal/generate-tokens";
import {CSS_VAR_PREFIX} from "../util/constants";

/**
 * The directory containing the theme files.
 *
 * NOTE: Make sure that every consumer of this script has the same
 * directory structure. This is important because the script will
 * require the theme files using a relative path.pnpm
 */
const THEMES_DIR = "src/theme/";

/**
 * Process all themes in the theme directory.
 *
 * This step will read all the theme files in the theme directory and generate
 * the CSS variables for each theme.
 */
function processThemeCollection(folderPath: string, prefix?: string) {
    const themesDir = path.resolve(folderPath, THEMES_DIR);
    return (
        fs
            .readdirSync(themesDir, {
                // Needed to determine whether the file is a directory or a
                // file.
                withFileTypes: true,
            })
            // Only include files that contain tokens
            .filter((file) => {
                return (
                    file.isFile() &&
                    file.name.endsWith(".ts") &&
                    file.name !== "index.ts"
                );
            })
            .map((file) => {
                // Remove the file extension
                const filename = file.name.split(".")[0];

                // eslint-disable-next-line @typescript-eslint/no-require-imports
                const {default: themeObject} = require(
                    `${themesDir}/${filename}`,
                );

                // Assign "-c-" if a prefix is provided (this is to know when we
                // are passing component-level tokens)
                const scopedPrefix = prefix
                    ? `${CSS_VAR_PREFIX}c-${prefix}-`
                    : CSS_VAR_PREFIX;

                return {
                    name: filename,
                    tokens: generateTokens(themeObject, scopedPrefix),
                };
            })
    );
}

/**
 * Generate the CSS selectors containing CSS variables for each theme.
 */
function generateCssVariablesDefinitions(folderPath: string, prefix?: string) {
    return processThemeCollection(folderPath, prefix)
        .map((theme) => {
            const cssVariables = Object.entries(theme.tokens)
                .map(([key, value]) => `${key}: ${value};`)
                .join("\n");

            // Use the root selector for the default theme
            const selector =
                theme.name === "default"
                    ? `:root, [${THEME_DATA_ATTRIBUTE}='${theme.name}']`
                    : `[${THEME_DATA_ATTRIBUTE}='${theme.name}']`;

            return `${selector} {${cssVariables}}`;
        })
        .join("\n\n");
}

/**
 * Create the CSS file containing the CSS variables for each theme.
 */
export function createCssFile(folderPath: string, prefix?: string) {
    const dir = path.resolve(folderPath, "./dist/css");

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    // get the prefix from the folder structure
    const parts = path.resolve(folderPath).split(path.sep);
    const currentDir = parts[parts.length - 1].replace(/wonder-blocks-/g, "");
    const packagePrefix = prefix || currentDir === "tokens" ? "" : currentDir;

    // Generate the output inside dist/css/vars.css
    fs.writeFileSync(
        path.resolve(folderPath, `${dir}/vars.css`),
        generateCssVariablesDefinitions(folderPath, packagePrefix),
        {flag: "w+"},
    );

    // eslint-disable-next-line no-console
    console.log("CSS variables generated successfully in:", dir);
}

if (require.main === module) {
    createCssFile("./");
}
