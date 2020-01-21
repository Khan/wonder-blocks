/**
 * This is the main jest config.  It runs tests using the default
 * test environment: jest-environment-jsdom.
 */
const path = require("path");

module.exports = {
    rootDir: path.join(__dirname, "../../"),
    transform: {
        "^.+\\.jsx?$": "<rootDir>/config/jest/test.transform.js",
    },
    testEnvironment: "jest-environment-jsdom",
    globals: {
        SNAPSHOT_INLINE_APHRODITE: true,
    },
    testMatch: ["<rootDir>/**/*.test.js"],
    setupFilesAfterEnv: ["<rootDir>/config/jest/test-setup.js"],
    moduleNameMapper: {
        "^@khanacademy/wonder-blocks-(.*)$":
            "<rootDir>/packages/wonder-blocks-$1/index.js",
    },
    collectCoverageFrom: [
        "packages/**/*.js",
        "!packages/**/*.stories.js",
        "!packages/**/*.flowtest.js",
        "!packages/**/dist/**/*.js",
        "!<rootDir>/node_modules/",
        "!packages/**/node_modules/",
    ],
    // Only output log messages on test failure. From:
    // https://github.com/facebook/jest/issues/4156#issuecomment-490764080
    reporters: ["<rootDir>/config/jest/log-on-fail-reporter.js"],
};
