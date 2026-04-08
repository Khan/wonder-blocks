/**
 * This is the main jest config. Most tests run using jest-environment-jsdom.
 * Packages that don't need a DOM (e.g. eslint-plugin-wonder-blocks) run with
 * the node environment and are configured via the `projects` array below.
 */
const fs = require("node:fs");
const path = require("node:path");
const ancesdir = require("ancesdir");

const staticRootDir = ancesdir(__dirname);

const swcrc = JSON.parse(
    fs.readFileSync(path.join(staticRootDir, ".swcrc"), "utf8"),
);
// NOTE: We need to use this plugin in order to turn the module exports into
// module.exports. This will make it so that we can mock exports correctly.
// Check it out - Nullish coalescing _assignment_!
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment
swcrc.jsc ??= {};
swcrc.jsc.experimental ??= {};
swcrc.jsc.experimental.plugins ??= [];
swcrc.jsc.experimental.plugins.push(["swc_mut_cjs_exports", {}]);

const rootDir = path.join(__dirname, "../../");

// Shared config used across all projects (no root-level-only options).
const projectConfig = {
    rootDir,
    transform: {
        "^.+\\.(t|j)sx?$": ["@swc/jest", swcrc],
        // Compile .svg files using a custom transformer that returns the
        // basename of the file being transformed.
        "^.+.svg$": "<rootDir>/config/jest/svg.transform.js",
    },
    // Allow transforming files imported from @phosphor-icons/core.
    // This is required by the .svg transform above.
    transformIgnorePatterns: ["/node_modules/.pnpm/(?!@phosphor-icons.core@)"],
    globals: {
        SNAPSHOT_INLINE_APHRODITE: true,
    },
    testMatch: [
        "<rootDir>/**/*.test.ts",
        "<rootDir>/**/*.test.tsx",
    ],
    moduleNameMapper: {
        "^@khanacademy/wonder-blocks-(.*)$":
            "<rootDir>/packages/wonder-blocks-$1/src/index.ts",
        "\\.(css|less|scss|sass)$": "<rootDir>/config/jest/css.mock.js",
    },
};

module.exports = {
    rootDir,
    collectCoverageFrom: [
        "packages/**/*.{ts,tsx}",
        "!packages/**/src/index.{ts,tsx}",
        "!packages/**/src/**/index.{ts,tsx}",
        "!packages/**/*.stories.{ts,tsx}",
        "!packages/**/*.typestest.{ts,tsx}",
        "!packages/**/types.{ts,tsx}",
        "!packages/**/dist/**/*.ts",
        "!<rootDir>/node_modules/",
        "!packages/**/node_modules/",
    ],
    // Provides more accurate coverage reports by instrumenting more lines
    // than the default provider.
    coverageProvider: "v8",
    // Only output log messages on test failure. From:
    // https://github.com/facebook/jest/issues/4156#issuecomment-490764080
    reporters: [
        "<rootDir>/config/jest/log-on-fail-reporter.js",
        "github-actions",
    ],
    // We turn off Prettier as Prettier v3 is incompatible with Jest v29.
    // Once they release Jest v30 we can switch to that:
    // https://github.com/jestjs/jest/issues/14305
    prettierPath: null,
    projects: [
        // eslint-plugin-wonder-blocks tests don't need a DOM environment.
        {
            ...projectConfig,
            displayName: "eslint-plugin",
            testMatch: [
                "<rootDir>/packages/eslint-plugin-wonder-blocks/**/*.test.ts",
            ],
            testEnvironment: "jest-environment-node",
            setupFilesAfterEnv: [
                "jest-extended/all",
                "<rootDir>/config/jest/rule-tester-setup.js",
            ],
        },
        // All other packages use jsdom.
        {
            ...projectConfig,
            displayName: "packages",
            testEnvironment: "jest-environment-jsdom",
            setupFilesAfterEnv: [
                "@testing-library/jest-dom",
                "<rootDir>/config/jest/test-setup.js",
                "jest-extended/all",
                "<rootDir>/config/jest/matchers/to-have-no-a11y-violations.ts",
            ],
            testPathIgnorePatterns: [
                "<rootDir>/packages/eslint-plugin-wonder-blocks/",
            ],
        },
    ],
};
