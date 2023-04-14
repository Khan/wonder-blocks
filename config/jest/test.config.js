/**
 * This is the main jest config.  It runs tests using the default
 * test environment: jest-environment-jsdom.
 */
const path = require("path");

module.exports = {
    rootDir: path.join(__dirname, "../../"),
    transform: {
        "^.+\\.(j|t)sx?$": "<rootDir>/config/jest/test.transform.js",
    },
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
    ],
    moduleNameMapper: {
        "^@khanacademy/wonder-blocks-(.*)$":
            "<rootDir>/packages/wonder-blocks-$1/src/index.ts",
    },
    collectCoverageFrom: [
        "packages/**/*.ts",
        "!packages/**/src/index.ts",
        "!packages/**/*.typestest.ts",
        "!packages/**/types.ts",
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
