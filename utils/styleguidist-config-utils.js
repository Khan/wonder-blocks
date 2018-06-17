/**
 * Methods that are used by a couple of our utility scripts for interacting
 * with the styleguidist configuration.
 */
const glob = require("glob");

// Files that are automatically ignored by styleguidist
// From: https://react-styleguidist.js.org/docs/configuration.html#ignore
const ignored = [
    "**/__tests__/**",
    "**/*.test.{js,jsx,ts,tsx}",
    "**/*.spec.{js,jsx,ts,tsx}",
    "**/*.d.ts",
];

function getComponentFilesFromSection(section) {
    // Per the spec for components, it can be:
    // 1. A single glob
    // 2. A function that returns a list of paths (not globs)
    // 3. A list of file paths (not globs)
    if (typeof section.components === "string") {
        return glob.sync(section.components, {ignore: ignored});
    } else if (typeof section.compontents === "function") {
        return section.components();
    } else {
        return section.components || [];
    }
}

module.exports = {
    getComponentFilesFromSection,
};