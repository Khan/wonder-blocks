/**
 * This is the main jest config.  It runs tests using the default
 * test environment: jest-environment-jsdom.
 */
const path = require("path");

module.exports = {
    rootDir: path.join(__dirname, "../../"),
    transform: {
        "^.+\\.(j|t)sx?$": "<rootDir>/config/jest/test.transform.js",
        // Compile .svg files using a custom transformer that returns the
        // basename of the file being transformed.
        "^.+.svg$": "<rootDir>/config/jest/svg.transform.js",
    },
    // Allow transforming files imported from @phosphor-icons/core.
    // This is required by the .svg transform above.
    transformIgnorePatterns: ["/node_modules/(?!(@phosphor-icons/core)/)"],

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
        "@testing-library/jest-dom/extend-expect",
        "<rootDir>/config/jest/test-setup.js",
        "jest-extended/all",
        "<rootDir>/config/jest/matchers/to-have-no-a11y-violations.ts",
    ],
    moduleNameMapper: {
        "^@khanacademy/wonder-blocks-(.*)$":
            "<rootDir>/packages/wonder-blocks-$1/src/index.ts",
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
};
