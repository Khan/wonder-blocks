#!/usr/bin/env -S node -r @swc-node/register
import fs from "fs";
import path from "path";
import ancesdir from "ancesdir";
import {generateTokens} from "../internal/generate-tokens";

const THEMES_DIR = "../theme/color";

/**
 * Process all themes in the theme directory.
 *
 * This step will read all the theme files in the theme directory and generate
 * the CSS variables for each theme.
 */
function processThemeCollection() {
    return fs.readdirSync(path.resolve(__dirname, THEMES_DIR)).map((file) => {
        // Remove the file extension
        const filename = file.split(".")[0];
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const {default: themeObject} = require(`../theme/color/${filename}`);

        return {name: filename, tokens: generateTokens(themeObject)};
    });
}

/**
 * Generate the CSS selectors containing CSS variables for each theme.
 */
function generateCssVariablesDefinitions() {
    return processThemeCollection()
        .map((theme) => {
            const cssVariables = Object.entries(theme.tokens)
                .map(([key, value]) => `${key}: ${value};`)
                .join("");

            // Use the root selector for the default theme
            const selector =
                theme.name === "default" ? ":root" : `.wb-theme-${theme.name}`;

            return `${selector} {${cssVariables}}`;
        })
        .join("\n");
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
