/**
 * This is the main jest config.  It runs tests using the default
 * test environment: jest-environment-jsdom.
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

module.exports = {
    rootDir: path.join(__dirname, "../../"),
    transform: {
        "^.+\\.(t|j)sx?$": ["@swc/jest", swcrc],
        // Compile .svg files using a custom transformer that returns the
        // basename of the file being transformed.
        "^.+.svg$": "<rootDir>/config/jest/svg.transform.js",
    },
    // Allow transforming files imported from @phosphor-icons/core.
    // This is required by the .svg transform above.
    transformIgnorePatterns: ["/node_modules/.pnpm/(?!@phosphor-icons.core@)"],

    testEnvironment: "jest-environment-jsdom",
    globals: {
        SNAPSHOT_INLINE_APHRODITE: true,
    },
    testMatch: [
        "<rootDir>/**/*.test.ts",
        "<rootDir>/**/*.test.ts",
        "<rootDir>/**/*.test.tsx",
    ],
    setupFilesAfterEnv: [
        "@testing-library/jest-dom",
        "<rootDir>/config/jest/test-setup.js",
        "jest-extended/all",
        "<rootDir>/config/jest/matchers/to-have-no-a11y-violations.ts",
    ],
    moduleNameMapper: {
        "^@khanacademy/wonder-blocks-(.*)$":
            "<rootDir>/packages/wonder-blocks-$1/src/index.ts"
    },
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
};