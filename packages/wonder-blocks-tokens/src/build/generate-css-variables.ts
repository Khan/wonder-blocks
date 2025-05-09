#!/usr/bin/env -S node -r @swc-node/register
import fs from "fs";
import path from "path";
import ancesdir from "ancesdir";
import {THEME_DATA_ATTRIBUTE} from "@khanacademy/wonder-blocks-theming";
import {generateTokens} from "../internal/generate-tokens";

const THEMES_DIR = "../theme";

/**
 * Process all themes in the theme directory.
 *
 * This step will read all the theme files in the theme directory and generate
 * the CSS variables for each theme.
 */
function processThemeCollection() {
    return (
        fs
            .readdirSync(path.resolve(__dirname, THEMES_DIR), {
                // Needed to determine whether the file is a directory or a
                // file.
                withFileTypes: true,
            })
            // Only include files that contain tokens
            .filter((file) => {
                return file.isFile() && file.name.endsWith(".ts");
            })
            .map((file) => {
                // Remove the file extension
                const filename = file.name.split(".")[0];

                // eslint-disable-next-line @typescript-eslint/no-require-imports
                const {default: themeObject} = require(
                    `${THEMES_DIR}/${filename}`,
                );

                return {name: filename, tokens: generateTokens(themeObject)};
            })
    );
}

/**
 * Generate the CSS selectors containing CSS variables for each theme.
 */
function generateCssVariablesDefinitions() {
    return processThemeCollection()
        .map((theme, index) => {
            const cssVariables = Object.entries(theme.tokens)
                .map(([key, value]) => `${key}: ${value};`)
                .join("");

            // Use the root selector for the default theme
            const selector =
                theme.name === "default"
                    ? ":root"
                    : `[${THEME_DATA_ATTRIBUTE}='${theme.name}']`;

            return `${selector} {${cssVariables}}`;
        })
        .join("\n\n");
}

/**
 * Create the CSS file containing the CSS variables for each theme.
 */
function createCssFile() {
    // Get the root package folder; use the CHANGELOG.md file as our root
    // anchor.
    const packageDir = ancesdir(__dirname, "CHANGELOG.md");

    const dir = path.resolve(packageDir, "./dist/css");

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    // Generate the output inside dist/css/index.css
    fs.writeFileSync(
        path.resolve(packageDir, `${dir}/index.css`),
        generateCssVariablesDefinitions(),
        {flag: "w+"},
    );
}

createCssFile();

// eslint-disable-next-line no-console
console.log("CSS variables generated successfully!!");
